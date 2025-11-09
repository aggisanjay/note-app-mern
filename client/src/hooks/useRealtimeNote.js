import { useEffect, useRef } from 'react'
import { io } from 'socket.io-client'


export function useRealtimeNote(noteId, onRemote) {
const socketRef = useRef(null)
useEffect(() => {
const s = io(import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000', { withCredentials: true })
socketRef.current = s
s.emit('join-note', { noteId })
s.on('note-change', ({ delta }) => onRemote && onRemote(delta))
return () => s.disconnect()
}, [noteId, onRemote])


const broadcast = (delta) => socketRef.current?.emit('note-change', { noteId, delta })
const save = (payload) => socketRef.current?.emit('save-note', { noteId, ...payload })
return { broadcast, save }
}