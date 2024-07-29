import { connectionStr } from "@/app/lib/Database";
import { foodSchema } from "@/app/lib/foodModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

// Getting perticular id item
export async function GET(req, content) {
  const { id } = content.params;
  let success = false;
  await mongoose.connect(connectionStr);

  const result = await foodSchema.findOne({ _id: id });
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}

// Updating food item

export async function PUT(req, content) {
  const { id } = content.params;

  const payload = await req.json();

  let success = false;
  await mongoose.connect(connectionStr);

  const result = await foodSchema.findOneAndUpdate({ _id: id }, payload);
  if (result) {
    success = true;
  }
  return NextResponse.json({ result, success });
}
