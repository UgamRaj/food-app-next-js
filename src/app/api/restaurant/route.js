import { connectionStr } from "@/app/lib/Database";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  await mongoose.connect(connectionStr);

  const data = await restaurantSchema.find();
  // console.log("🚀 ~ GET ~ data:", data);

  return NextResponse.json({ result: true, data });
}

//registration
export async function POST(req) {
  let payload = await req.json();
  await mongoose.connect(connectionStr);
  console.log("🚀 ~ POST ~ payload:", payload);
  let result;
  let success = false;

  if (payload.login) {
    // for login
    result = await restaurantSchema.findOne({
      email: payload.email,
      password: payload.password,
    });
    if (result) {
      success = true;
    }
  } else {
    // for sign up
    const restaurant = new restaurantSchema(payload);
    result = await restaurant.save();
    if (result) {
      success = true;
    }
  }

  return NextResponse.json({ result, success });
}
