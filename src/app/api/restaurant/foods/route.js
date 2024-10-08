import { connectionStr } from "@/app/lib/Database";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

//Food Post
export async function POST(req) {
  const payload = await req.json();
  console.log("🚀 ~ POST ~ payload:", payload);

  await mongoose.connect(connectionStr);
  let success = false;
  const food = new foodSchema(payload);
  const result = await food.save();
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
