import { Server } from 'socket.io';
import Note from './models/Note.js';
import Share from './models/Share.js';

export function initSocket(httpServer, origin) {
  const io = new Server(httpServer, {
    cors: { origin, credentials: true }
  });

  io.on('connection', (socket) => {
    socket.on('join-note', ({ noteId }) => {
      socket.join(noteId);
      socket.to(noteId).emit('presence', { type: 'join' });
    });

    socket.on('note-change', ({ noteId, delta }) => {
      socket.to(noteId).emit('note-change', { delta });
    });

    socket.on('save-note', async ({ noteId, title, content }) => {
      await Note.findByIdAndUpdate(noteId, { title, content });
      io.to(noteId).emit('saved', { noteId });
    });

    socket.on('disconnecting', () => {
      for (const room of socket.rooms) {
        socket.to(room).emit('presence', { type: 'leave' });
      }
    });
  });

  return io;
}
