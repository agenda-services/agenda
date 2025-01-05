import mongoose from "mongoose";

export const accountSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  access_token: { type: String, required: false },
  refresh_access_token: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

accountSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
