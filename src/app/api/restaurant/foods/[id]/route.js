import { connectionStr } from "@/app/lib/Database";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET(req, content) {
  const { id } = content.params;
  //   console.log("🚀 ~ GET ~ id:", id);
  let success = false;

  await mongoose.connect(connectionStr);
  const result = await foodSchema.find({ restoId: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
