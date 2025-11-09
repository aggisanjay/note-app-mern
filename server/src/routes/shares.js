import { Router } from "express";
import Share from "../models/Share.js";
import User from "../models/User.js";
import Note from "../models/Note.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);

r.post("/:noteId", async (req, res) => {
  const note = await Note.findById(req.params.noteId);
  if (!note) return res.sendStatus(404);
  if (String(note.owner) !== req.user.id) return res.sendStatus(403);

  const { email, role = 'reader' } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const doc = await Share.findOneAndUpdate(
    { note: note._id, user: user._id },
    { role },
    { upsert: true, new: true }
  );
  res.json(doc);
});

export default r;
