// routes/api/subscriptions.ts

import { NextResponse } from "next/server";
import { getSubscriptions } from "@/data/subscription";

export async function GET() {
  try {
    const subscriptions = await getSubscriptions();
    return NextResponse.json(subscriptions, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching subscriptions" },
      { status: 500 }
    );
  }
}
