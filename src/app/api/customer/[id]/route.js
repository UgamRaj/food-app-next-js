import { connectionStr } from "@/app/lib/Database";
import { foodSchema } from "@/app/lib/foodModel";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req, content) => {
  //   console.log("🚀 ~ GET ~ content:", content.params.id);
  const { id } = content.params;

  await mongoose.connect(connectionStr);
  const details = await restaurantSchema.findOne({ _id: id });
  const foodItems = await foodSchema.find({ restoId: id });

  return NextResponse.json({ foodItems, details, success: true });
};
