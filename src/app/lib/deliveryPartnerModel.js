import mongoose from "mongoose";

const deliveryPartnerModel = new mongoose.Schema({
  name: String,
  password: String,
  city: String,
  address: String,
  phone: String,
});

export const deliveryPartnerSchema =
  mongoose.models.deliverypartners ||
  mongoose.model("deliverypartners", deliveryPartnerModel);
