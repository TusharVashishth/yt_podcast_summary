"use client";
import React, { useEffect, useState } from "react";
import SummarizeLoader from "./SummarizeLoader";
import axios, { AxiosError } from "axios";
import { toast } from "sonner";
import Markdown from "react-markdown";
import { updateSummary } from "@/actions/commonActions";

export default function SummaryBase({ summary }: { summary: ChatType | null }) {
  const [loading, setLoading] = useState(true);
  const [response, setResponse] = useState("");

  useEffect(() => {
    if (summary?.response) {
      setResponse(summary.response);
      setLoading(false);
    } else {
      // summarize();
    }
  }, []);

  const summarize = async () => {
    try {
      const { data } = await axios.post("/api/summarize", {
        url: summary?.url,
      });
      setLoading(false);
      const res = data?.data;
      if (res) {
        setResponse(res?.text);
        updateSummary(summary?.id!, res?.text).catch((err) =>
          toast.error("Something went wrong.while updateing summary")
        );
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 500) {
          toast.error(error.response?.data?.message);
        } else if (error.response?.status === 500) {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };

  return (
    <div className="flex items-center flex-col w-full">
      <h1 className="text-2xl font-bold my-4">{summary?.title}</h1>
      {loading && <SummarizeLoader />}
      {response && (
        <div className="w-full md:w-[700px] rounded-lg bg-slate-100 shadow-md p-8">
          <Markdown>{response}</Markdown>
        </div>
      )}
    </div>
  );
}
