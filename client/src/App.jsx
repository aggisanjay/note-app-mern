import { Routes, Route, Navigate } from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import Login from './pages/Login'
import Register from './pages/Register'
import Notes from './pages/Notes'
import NoteView from './pages/NoteView'
import Categories from './pages/Categories'
import { useAuthStore } from '@/store/useAuth'
import { useEffect } from 'react'

function Private({ children }) {
  const { user, fetchMe } = useAuthStore()
  useEffect(() => { fetchMe() }, [])
  if (!user) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      <Route path="/" element={<Private><AppLayout /></Private>}>
        <Route index element={<Navigate to="/notes" replace />} />
        <Route path="notes" element={<Notes />} />
        <Route path="notes/:id" element={<NoteView />} />
        <Route path="categories" element={<Categories />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}
