import mongoose from "mongoose";

const restaurantModel = new mongoose.Schema({
  name: String,
  password: String,
  email: String,
  city: String,
  address: String,
  phone: String,
});

export const restaurantSchema =
  mongoose.models.restaurants || mongoose.model("restaurants", restaurantModel);
