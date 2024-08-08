import mongoose from "mongoose";

const userModel = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  city: String,
  address: String,
  phone: String,
});

export const userSchema =
  mongoose.models.users || mongoose.model("users", userModel);
