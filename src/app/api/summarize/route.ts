import { NextRequest, NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { summaryTemplate } from "@/lib/prompts";
import { gptModal } from "@/lib/langchain";
import { getServerSession } from "next-auth";
import { authOptions, CustomSession } from "../auth/[...nextauth]/options";
import { getUserCoins } from "@/actions/fetchActions";
import { coinsSpend, minusCoins, updateSummary } from "@/actions/commonActions";
import prisma from "@/lib/db.config";

interface SummarizePayload {
  url: string;
  id: string;
}

export async function POST(req: NextRequest) {
  try {
    const session: CustomSession | null = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }
    const body: SummarizePayload = await req.json();

    // * Check if user has sufficient coins or not
    const userConis = await getUserCoins(session?.user?.id!);
    if (userConis === null || (userConis?.coins && userConis.coins < 10)) {
      return NextResponse.json(
        {
          message:
            "You don't have sufficient coins for summary.Please add your coins.",
        },
        { status: 400 }
      );
    }

    // * Check if is there any summary available for URL
    const oldSummary = await prisma.summary.findFirst({
      select: {
        response: true,
      },
      where: {
        url: body.url,
      },
    });

    if (oldSummary != null && oldSummary.response) {
      // * Do things
      await minusCoins(session?.user?.id!);
      await coinsSpend(session?.user?.id!, body?.id!);
      return NextResponse.json({
        message: "Podcast video Summary",
        data: oldSummary.response,
      });
    }

    // * extract video transcript
    let text: Document<Record<string, any>>[];
    try {
      const loader = YoutubeLoader.createFromUrl(body.url!, {
        language: "en",
        addVideoInfo: true,
      });
      text = await loader.load();
    } catch (error) {
      return NextResponse.json(
        {
          message:
            "No Transcript available for this video.Plese try another video",
        },
        { status: 404 }
      );
    }

    const splitter = new TokenTextSplitter({
      chunkSize: 15000,
      chunkOverlap: 250,
    });
    const docsSummary = await splitter.splitDocuments(text);
    const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);
    const summaryChain = loadSummarizationChain(gptModal, {
      type: "map_reduce",
      verbose: true,
      combinePrompt: summaryPrompt,
    });
    const res = await summaryChain.invoke({ input_documents: docsSummary });

    // * Do things
    await minusCoins(session?.user?.id!);
    await coinsSpend(session?.user?.id!, body?.id!);
    await updateSummary(body?.id!, res?.text);

    return NextResponse.json({
      message: "Podcast video Summary",
      data: res?.text,
    });
  } catch (error) {
    console.log("The error is", error);
    return NextResponse.json(
      { message: "Something went wrong.please try again!" },
      { status: 500 }
    );
  }
}
