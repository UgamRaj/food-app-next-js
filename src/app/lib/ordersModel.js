import mongoose from "mongoose";

const orderModel = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  foodItemIds: String,
  restoId: mongoose.Schema.Types.ObjectId,
  deliveryBoyId: mongoose.Schema.Types.ObjectId,
  status: String,
  amount: String,
});

export const orderSchema =
  mongoose.models.orders || mongoose.model("orders", orderModel);
