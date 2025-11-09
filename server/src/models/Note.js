import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema({
  title: { type: String, trim: true, default: '' },
  content: { type: String, default: '' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
  tags: [{ type: String, trim: true }],
  isArchived: { type: Boolean, default: false },
  isTrashed: { type: Boolean, default: false },
  lastEditedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  version: { type: Number, default: 1 }
}, { timestamps: true });

NoteSchema.index({ title: 'text', content: 'text' });
NoteSchema.index({ tags: 1 });

export default mongoose.model("Note", NoteSchema);
