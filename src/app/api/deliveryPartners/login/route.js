import { connectionStr } from "@/app/lib/Database";
import { deliveryPartnerSchema } from "@/app/lib/deliveryPartnerModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req) => {
  const payload = await req.json();
  let success = false;
  await mongoose.connect(connectionStr);
  const result = await deliveryPartnerSchema.findOne({
    phone: payload.phone,
    password: payload.password,
  });

  if (result) {
    success = true;
  }

  return NextResponse.json({ result, success });
};
