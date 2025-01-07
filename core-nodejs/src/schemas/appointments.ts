import mongoose from "mongoose";

export const appointmentSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  person_id: { type: String, required: true },
  account_id: { type: String, required: true },
  date: Date,
  status: { type: String, required: true },
  service_id: { type: String, required: false },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

appointmentSchema.set("toObject", {
  transform: (doc, ret) => {
    delete ret.__v;
  }
});
