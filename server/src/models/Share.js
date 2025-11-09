import mongoose from 'mongoose';

export default mongoose.model(
  "Share",
  new mongoose.Schema({
    note: { type: mongoose.Schema.Types.ObjectId, ref: "Note", required: true, index: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    role: { type: String, enum: ["reader", "editor"], default: "reader" }
  }, { timestamps: true })
);
