import mongoose from "mongoose";

export const appointmentSchema = new mongoose.Schema({
  _id: String,
  person_id: String,
  date: Date,
  status: String,
  service_id: String,
  created_at: Date,
  updated_at: Date
});

appointmentSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
