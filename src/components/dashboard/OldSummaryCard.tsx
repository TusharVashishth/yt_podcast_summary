"use client";
import Link from "next/link";
import React from "react";

export default function OldSummaryCard({
  summary,
}: {
  summary: UserSummaries;
}) {
  return (
    <div className="bg-white shadow-md rounded-md p-4 h-52">
      <h1 className="text-lg font-semibold">{summary.title}</h1>
      <Link href={`/summarize?id=${summary.id}`}>
        <h1 className="">{summary.url}</h1>
      </Link>
      <p className="mt-2">
        Created At :- {new Date(summary.created_at).toDateString()}
      </p>
    </div>
  );
}
