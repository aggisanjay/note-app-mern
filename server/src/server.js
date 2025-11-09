import 'dotenv/config';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import { createServer } from 'http';
import { Server as SocketServer } from 'socket.io';
import { connectDB } from './db.js';

import authRoutes from './routes/auth.js';
import noteRoutes from './routes/notes.js';
import categoryRoutes from './routes/categories.js';
import shareRoutes from './routes/shares.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: process.env.CLIENT_ORIGIN || 'https://note-app-gamma-eight.vercel.app',
  credentials: true
}));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/shares', shareRoutes);

const httpServer = createServer(app);
const io = new SocketServer(httpServer, {
  cors: { origin: process.env.CLIENT_ORIGIN || 'http://localhost:5173', credentials: true }
});

io.on('connection', (socket) => {
  socket.on('join-note', ({ noteId }) => socket.join(`note:${noteId}`));
  socket.on('note-change', ({ noteId, delta }) => socket.to(`note:${noteId}`).emit('note-change', { delta }));
  socket.on('save-note', ({ noteId, title, content }) => io.to(`note:${noteId}`).emit('note-saved', { title, content }));
});

const PORT = process.env.PORT || 4000;
connectDB(process.env.MONGO_URI).then(() => {
  httpServer.listen(PORT, () => console.log(`🚀 Server on http://localhost:${PORT}`));
});
