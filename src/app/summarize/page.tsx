import { getSummary, getUserCoins } from "@/actions/fetchActions";
import DashNav from "@/components/dashboard/DashNav";
import SummaryBase from "@/components/summary/SummaryBase";
import { notFound } from "next/navigation";
import React from "react";
import { authOptions, CustomSession } from "../api/auth/[...nextauth]/options";
import { getServerSession } from "next-auth";

export default async function Summarize({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  if (!searchParams?.["id"]) {
    return notFound();
  }
  const summary = await getSummary(searchParams?.["id"]);
  if (!summary) {
    return notFound();
  }
  const session: CustomSession | null = await getServerSession(authOptions);
  const userCoins = await getUserCoins(session?.user?.id!);


  return (
    <div className="container">
      <DashNav user={session?.user!} userCoins={userCoins} />
      <SummaryBase summary={summary} />
    </div>
  );
}
