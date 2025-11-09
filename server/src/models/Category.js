import mongoose from "mongoose";

export default mongoose.model(
  "Category",
  new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  }, { timestamps: true })
);
