import { NextRequest, NextResponse } from "next/server";
import { YoutubeLoader } from "@langchain/community/document_loaders/web/youtube";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { loadSummarizationChain } from "langchain/chains";
import { TokenTextSplitter } from "langchain/text_splitter";
import { Document } from "@langchain/core/documents";
import { PromptTemplate } from "@langchain/core/prompts";
import fs from "fs/promises";
import { join } from "path";
import { ChatOpenAI } from "@langchain/openai";
import { summaryTemplate } from "@/lib/prompts";

export const GET = async (request: NextRequest) => {
  const url = request.nextUrl.searchParams.get("url");
  if (!url) {
    return NextResponse.json({ message: "Please pass url" }, { status: 404 });
  }
  let text: Document<Record<string, any>>[];
  try {
    const loader = YoutubeLoader.createFromUrl(url!, {
      language: "en",
    });
    text = await loader.load();
  } catch (error) {
    return NextResponse.json(
      {
        message:
          "No Transcript available for this video.Plese try another video",
      },
      { status: 400 }
    );
  }

  const model = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: "gpt-4o-mini",
    temperature: 0.3,
    streaming: true,
    maxTokens: 16000,
  });
  //   const textSplitter = new RecursiveCharacterTextSplitter({
  //     chunkSize: 15000,
  //     chunkOverlap: 250,
  //   });
  //   const docs = await textSplitter.createDocuments([text[0].pageContent]);
  const splitter = new TokenTextSplitter({
    chunkSize: 15000,
    chunkOverlap: 250,
  });

  const docsSummary = await splitter.splitDocuments(text);

  const summaryPrompt = PromptTemplate.fromTemplate(summaryTemplate);

  const summaryChain = loadSummarizationChain(model, {
    type: "map_reduce",
    verbose: true,
    combinePrompt: summaryPrompt,
  });
  const res = await summaryChain.invoke(docsSummary);

  return NextResponse.json({
    message: "Summrized successfully",
    res,
  });
};

export async function POST(request: NextRequest) {
  const { msg } = await request.json();
  if (!msg) {
    return NextResponse.json({ message: "Please pass the query" });
  }
  const model = new ChatGoogleGenerativeAI({
    model: "gemini-1.5-flash",
    maxOutputTokens: 2048,
    apiKey: process.env.GOOGLE_API_KEY,
    temperature: 1,
  });

  const res = await model.stream(msg);
  let content = "";
  for await (const chunk of res) {
    console.log(`${chunk.content}\n---`);
    content += `${chunk.content}\n---`;
  }
  return NextResponse.json({ message: "Gemoni Response", data: content });
}
