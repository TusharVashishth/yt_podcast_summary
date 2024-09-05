"use server";
import prisma from "@/lib/db.config";
import { revalidateTag, unstable_cache } from "next/cache";

export async function updateSummary(id: string, data: string): Promise<void> {
  await prisma.summary.update({
    data: {
      response: data,
    },
    where: {
      id: id,
    },
  });
}

export async function minusCoins(user_id: string | number): Promise<void> {
  await prisma.user.update({
    where: {
      id: Number(user_id),
    },
    data: {
      coins: {
        decrement: 10,
      },
    },
  });
}

export async function addCoins(
  user_id: string | number,
  coins: number
): Promise<void> {
  await prisma.user.update({
    where: {
      id: Number(user_id),
    },
    data: {
      coins: {
        increment: coins,
      },
    },
  });
}

export async function coinsSpend(
  user_id: string | number,
  summaryId: string
): Promise<void> {
  await prisma.coinSpend.create({
    data: {
      user_id: Number(user_id),
      summary_id: summaryId,
    },
  });
}

export const clearCache = (key: string) => {
  revalidateTag(key);
};

