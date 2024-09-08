"use server";
import prisma from "@/lib/db.config";
import { unstable_cache } from "next/cache";

export const getUserOldSummaries = unstable_cache(
  async (id: number) => {
    return await prisma.summary.findMany({
      where: {
        user_id: id,
      },
      select: {
        id: true,
        url: true,
        created_at: true,
        title: true,
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
  ["oldSummaries"],
  { revalidate: 60 * 60, tags: ["oldSummaries"] }
);

export async function getSummary(id: string): Promise<ChatType | null> {
  const summary = await prisma.summary.findUnique({
    where: {
      id: id,
    },
  });
  return summary;
}

export const getUserCoins = unstable_cache(
  async (user_id: number | string) => {
    return await prisma.user.findUnique({
      select: {
        coins: true,
      },
      where: {
        id: Number(user_id),
      },
    });
  },
  ["userCoins"],
  { revalidate: 30 * 60, tags: ["userCoins"] }
);

export const getTransactions = unstable_cache(
  async (user_id: number | string) => {
    return await prisma.transactions.findMany({
      where: {
        user_id: Number(user_id),
      },
      orderBy: {
        created_at: "desc",
      },
    });
  },
  ["transactions"],
  { revalidate: 60 * 60, tags: ["transactions"] }
);

export const getCoinsSpend = unstable_cache(
  async (user_id: number | string) => {
    return await prisma.coinSpend.findMany({
      where: {
        user_id: Number(user_id),
      },
      include: {
        summary: {
          select: {
            id: true,
            url: true,
            title: true,
          },
        },
      },
      orderBy: {
        id: "desc",
      },
    });
  },
  ["coinsSpend"],
  { revalidate: 60 * 60, tags: ["coinsSpend"] }
);