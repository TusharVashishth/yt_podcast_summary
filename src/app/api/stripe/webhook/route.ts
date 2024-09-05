import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  //   const sign = req.headers.get("stripe-signature") as string;
  //   console.log("The stripe webhook", body);
  //   console.log("The stripe signature", sign);
  console.log("The URL is", req.nextUrl.origin);

  return NextResponse.json(
    { message: "Webhook Received", path: req.nextUrl.origin },
    { status: 200 }
  );
}
