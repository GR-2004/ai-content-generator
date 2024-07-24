import { NextRequest, NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(req: NextRequest, res: NextResponse) {
  // Validate environment variables
  const keyId = process.env.RAZORPAY_KEY_ID;
  const keySecret = process.env.RAZORPAY_SECRET_KEY;
  const planId = process.env.SUBSCRIPTION_PLAN_ID;

  if (!keyId || !keySecret || !planId) {
    return NextResponse.json(
      { error: "Missing Razorpay configuration" },
      { status: 500 }
    );
  }

  // Parse request body if needed
  const body = await req.json();

  let instance = new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  });

  try {
    const result = await instance.subscriptions.create({
      plan_id: planId,
      customer_notify: 1,
      quantity: 1,
      total_count: 1,
      addons: [],
      notes: {
        key1: "Note",
        ...body.notes, // Allow additional notes from the request body
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error creating subscription:", error);
    return NextResponse.json(
      { error: "Failed to create subscription" },
      { status: 500 }
    );
  }
}
