import { Router } from 'express';
import Note from '../models/Note.js';
import Share from '../models/Share.js';
import { requireAuth } from '../middleware/auth.js';
import mongoose from 'mongoose';

const r = Router();
r.use(requireAuth);

async function canReadOrWrite(userId, noteId, needWrite = false) {
  const note = await Note.findById(noteId);
  if (!note) return { ok: false, status: 404 };
  if (String(note.owner) === userId) return { ok: true, note, role: 'owner' };
  const share = await Share.findOne({ note: noteId, user: userId });
  if (!share) return { ok: false, status: 403 };
  if (needWrite && share.role !== 'editor') return { ok: false, status: 403 };
  return { ok: true, note, role: share.role };
}

// List
r.get('/', async (req, res) => {
  const { q, category, shared, archived, trash } = req.query;
  const userId = req.user.id;

  let filter = {};
  if (trash === '1') filter = { owner: userId, isTrashed: true };
  else if (archived === '1') filter = { owner: userId, isArchived: true, isTrashed: false };
  else if (shared === '1') {
    const sharedIds = await Share.find({ user: userId }).distinct('note');
    filter = { _id: { $in: sharedIds }, isTrashed: false };
  } else filter = { owner: userId, isArchived: false, isTrashed: false };

  if (category) filter.categories = new mongoose.Types.ObjectId(category);
  if (q) filter.$text = { $search: q };

  const notes = await Note.find(filter).sort({ updatedAt: -1 });
  res.json(notes);
});

// Create
r.post('/', async (req, res) => {
  const defaultContent = `# New Note

Start writing here…

## Ideas
- Jot down important thoughts
- Add reminders or plans

## Tasks
- [ ] First task
- [ ] Second task

## Notes
Use this space to expand on your ideas or keep important details.
`;
  const payload = {
    title: req.body?.title ?? 'Untitled',
    content: req.body?.content ?? defaultContent,
    owner: req.user.id
  };
  const note = await Note.create(payload);
  res.status(201).json(note);
});

// Read
r.get('/:id', async (req, res) => {
  const check = await canReadOrWrite(req.user.id, req.params.id, false);
  if (!check.ok) return res.sendStatus(check.status);
  res.json(check.note);
});

// Update
r.put('/:id', async (req, res) => {
  const check = await canReadOrWrite(req.user.id, req.params.id, true);
  if (!check.ok) return res.sendStatus(check.status);
  const updated = await Note.findByIdAndUpdate(
    req.params.id,
    { ...req.body, lastEditedBy: req.user.id, $inc: { version: 1 } },
    { new: true }
  );
  res.json(updated);
});

// Archive
r.put('/:id/archive', async (req, res) => {
  const check = await canReadOrWrite(req.user.id, req.params.id, true);
  if (!check.ok) return res.sendStatus(check.status);
  check.note.isArchived = true; check.note.isTrashed = false;
  await check.note.save();
  res.json(check.note);
});

// Unarchive
r.put('/:id/unarchive', async (req, res) => {
  const check = await canReadOrWrite(req.user.id, req.params.id, true);
  if (!check.ok) return res.sendStatus(check.status);
  check.note.isArchived = false;
  await check.note.save();
  res.json(check.note);
});

// Trash
r.put('/:id/trash', async (req, res) => {
  const check = await canReadOrWrite(req.user.id, req.params.id, true);
  if (!check.ok) return res.sendStatus(check.status);
  check.note.isTrashed = true; check.note.isArchived = false;
  await check.note.save();
  res.json(check.note);
});

// Restore
r.put('/:id/restore', async (req, res) => {
  const check = await canReadOrWrite(req.user.id, req.params.id, true);
  if (!check.ok) return res.sendStatus(check.status);
  check.note.isTrashed = false;
  await check.note.save();
  res.json(check.note);
});

// Delete (owner only)
r.delete('/:id', async (req, res) => {
  const note = await Note.findById(req.params.id);
  if (!note) return res.sendStatus(404);
  if (String(note.owner) !== req.user.id) return res.sendStatus(403);
  await note.deleteOne();
  res.json({ ok: true });
});

export default r;
