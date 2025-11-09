import { Router } from "express";
import Category from "../models/Category.js";
import { requireAuth } from "../middleware/auth.js";

const r = Router();
r.use(requireAuth);

r.get("/", async (req, res) => {
  const list = await Category.find({ owner: req.user.id }).sort({ name: 1 });
  res.json(list);
});

r.post("/", async (req, res) => {
  const c = await Category.create({ name: req.body.name, owner: req.user.id });
  res.status(201).json(c);
});

r.delete("/:id", async (req, res) => {
  const c = await Category.findOne({ _id: req.params.id, owner: req.user.id });
  if (!c) return res.sendStatus(404);
  await c.deleteOne();
  res.json({ ok: true });
});

export default r;
