import { clearCache } from "@/actions/commonActions";
import prisma from "@/lib/db.config";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

export default async function CancelTxn({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const transaction = await prisma.transactions.findUnique({
    where: {
      status: 2,
      id: searchParams["txnId"],
    },
  });
  console.log("The transaction is", transaction);
  if (!transaction) {
    return notFound();
  }
  await prisma.transactions.update({
    data: {
      status: 0,
    },
    where: {
      id: searchParams["txnId"],
    },
  });
  clearCache("transactions");

  return (
    <div className="h-screen flex justify-center items-center flex-col ">
      <Image src="/images/cancel.png" width={512} height={512} alt="cancel" />
      <h1 className="text-3xl font-bold text-red-400">
        Payment Canceled by the user
      </h1>
    </div>
  );
}
