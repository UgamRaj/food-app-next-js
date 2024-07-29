import { connectionStr } from "@/app/lib/Database";
import { restaurantSchema } from "@/app/lib/restaurantModel";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const GET = async () => {
  await mongoose.connect(connectionStr);
  let success = false;
  let cities = [];
  //! first method
  cities = await restaurantSchema.distinct("city");

  cities = cities.map((city) => city[0].toUpperCase() + city.slice(1));

  cities = [...new Set(cities)];
  //! Second method and use map
  //   let result = await restaurantSchema.find({}, { city: 1, _id: 0 });

  //! third method
  //   result = await restaurantSchema.aggregate([
  //     {
  //       $group: {
  //         _id: { $toLower: "$city" },
  //         originalCity: { $first: "$city" },
  //       },
  //     },
  //     {
  //       $group: {
  //         _id: null,
  //         cities: { $push: "$originalCity" },
  //       },
  //     },
  //     {
  //       $project: {
  //         _id: 0,
  //         cities: 1,
  //       },
  //     },
  //   ]);
  //   result[0]?.cities || [];

  if (cities) {
    success = true;
  }
  return NextResponse.json({ cities, success });
};
