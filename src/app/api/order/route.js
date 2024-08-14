import { connectionStr } from "@/app/lib/Database";
import { orderSchema } from "@/app/lib/ordersModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
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

export const GET = async (req) => {
  const userId = req.nextUrl.searchParams.get("id");
  let success = false;
  await mongoose.connect(connectionStr);
  let result = await orderSchema.find({ userId: userId });
  if (result) {
    // console.log("🚀 ~ GET ~ result:", result);

    let restoData = await Promise.all(
      result.map(async (item) => {
        let restoInfo = {};
        restoInfo.data = await restaurantSchema.findOne({ _id: item.restoId });
        restoInfo.amount = item.amount;
        restoInfo.status = item.status;
        return restoInfo;
      })
    );
    result = restoData;
    success = true;
  }

  return NextResponse.json({ result, success });
};
