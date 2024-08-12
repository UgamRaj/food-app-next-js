import { connectionStr } from "@/app/lib/Database";
import { orderSchema } from "@/app/lib/ordersModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const payload = await req.json();
  await mongoose.connect(connectionStr);
  let success = false;
  const order = await new orderSchema(payload);
  const result = await order.save();
  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
};
