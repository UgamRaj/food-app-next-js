import { connectionStr } from "@/app/lib/Database";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const queryParams = req.nextUrl.searchParams;
  //   console.log("🚀 ~ GET ~ queryParams:", queryParams.get("location"));
  let result = [],
    filter = {};
  let success = false;

  if (queryParams.get("location")) {
    const city = queryParams.get("location");
    filter = {
      city: { $regex: new RegExp(city, "i") },
    };
  } else if (queryParams.get("resto")) {
    const name = queryParams.get("resto");
    filter = {
      name: { $regex: new RegExp(name, "i") },
    };
  }
  //! Connection
  await mongoose.connect(connectionStr);
  result = await restaurantSchema.find(filter);
  return NextResponse.json({ result, success });
};
