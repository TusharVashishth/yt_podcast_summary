"use server";
import prisma from "@/lib/db.config";

export async function getUserOldSummaries(
  id: number
): Promise<Array<UserSummaries>> {
  const summaries = await prisma.summary.findMany({
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

  return summaries;
}

export async function getSummary(id: string): Promise<ChatType | null> {
  const summary = await prisma.summary.findUnique({
    where: {
      id: id,
    },
  });
  return summary;
}

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
