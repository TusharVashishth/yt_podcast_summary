import { NextRequest, NextResponse } from "next/server";
import vine, { errors } from "@vinejs/vine";
import { summarySchema } from "@/validations/summaryValidation";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import { summaryTemplate } from "@/lib/prompts";
import { gptModal } from "@/lib/langchain";
import { getToken } from "next-auth/jwt";
export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });
    if (!token) {
      return NextResponse.json({ message: "UnAuthorized" }, { status: 401 });
    }
    const body = await req.json();
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
    return NextResponse.json({ message: "Podcast video Summary", data: res });
  } catch (error) {
    console.log("The error is", error);
    return NextResponse.json(
      { message: "Something went wrong.please try again!" },
      { status: 500 }
    );
  }
}
