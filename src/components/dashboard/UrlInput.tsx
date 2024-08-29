"use client";
import { CustomUser } from "@/app/api/auth/[...nextauth]/options";
import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function UrlInput({ user }: { user: CustomUser }) {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<AddUrlErrorType>({});

  const handleSubmit = async (event: React.FormEvent) => {
    try {
      event.preventDefault();
      setLoading(true);
      const { data } = await axios.post("/api/add-url", {
        url: url,
        user_id: user.id,
      });
      const newChat: ChatType = data?.data;
      if (newChat) {
        toast.success("Url is correct redirecting you to the summarize window");
        router.push(`/summarize/?id=${newChat.id}`);
      }
    } catch (error) {
      setLoading(false);
      if (error instanceof AxiosError) {
        if (error.response?.status === 422) {
          setErrors(error.response?.data?.errors);
        } else {
          toast.error(error.response?.data?.message);
        }
      }
    }
  };
  return (
    <div className="text-center mt-10">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="h-12 rounded-lg bg-muted border-none p-2 w-full md:w-[500px] outline-none"
          placeholder="Enter your Podcast URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={loading}
        />
      </form>
      <span className="text-red-500">{errors?.url}</span>
    </div>
  );
}
