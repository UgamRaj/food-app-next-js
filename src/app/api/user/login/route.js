import { connectionStr } from "@/app/lib/Database";
import { userSchema } from "@/app/lib/userModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await userSchema.findOne({
    email: payload.email,
    password: payload.password,
  });

  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
};
