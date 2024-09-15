import mongoose from "mongoose";

export const personSchema = new mongoose.Schema({
  _id: String,
  firstname: String,
  lastname: String,
  phone_number: String,
  created_at: Date,
  updated_at: Date
});

personSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
