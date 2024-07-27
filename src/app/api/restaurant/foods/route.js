import { connectionStr } from "@/app/lib/Database";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(req) {
  const payload = await req.json();
  console.log("🚀 ~ POST ~ payload:", payload);

  await mongoose.connect(connectionStr);

  const food = new foodSchema(payload);
  const result = await food.save();

  return NextResponse.json({ result, success: true });
}
