import mongoose from "mongoose";

const foodModel = new mongoose.Schema({
  restoId: mongoose.Schema.Types.ObjectId,
  name: String,
  price: String,
  imagePath: String,
  description: String,
});

export const foodSchema =
  mongoose.models.foods || mongoose.model("foods", foodModel);
