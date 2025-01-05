import { MONGO_URI } from "../shared/constants";
import mongoose from "mongoose";

export const connect = async () => {
  await mongoose.connect(MONGO_URI);
};
