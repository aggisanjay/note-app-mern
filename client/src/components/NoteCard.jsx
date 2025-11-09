import { Card, CardContent } from '@/components/ui/card'
import { useNavigate } from 'react-router-dom'
import { Archive, Trash2 } from 'lucide-react'
import {api} from '@/api/client'

export default function NoteCard({ note }) {
  const navigate = useNavigate()

  const archiveNote = async (e) => {
    e.stopPropagation()
    await api.put(`/notes/${note._id}/archive`)
    window.location.reload()
  }

  const trashNote = async (e) => {
    e.stopPropagation()
    await api.put(`/notes/${note._id}/trash`)
    window.location.reload()
  }

  return (
    <Card onClick={() => navigate(`/notes/${note._id}`)} className="cursor-pointer hover:shadow-md transition hover:scale-[1.01]">
      <CardContent>
        <h3 className="text-lg font-semibold line-clamp-1">{note.title || 'Untitled'}</h3>
        <p className="text-sm text-gray-600 line-clamp-2 mt-1">{strip(note.content)}</p>
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            <button onClick={archiveNote} className="text-gray-500 hover:text-black" title="Archive">
              <Archive size={18} />
            </button>
            <button onClick={trashNote} className="text-gray-500 hover:text-red-600" title="Move to Trash">
              <Trash2 size={18} />
            </button>
          </div>
          <span className="text-xs text-gray-500">{new Date(note.updatedAt).toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  )
}
function strip(s = '') { return s.replace(/<[^>]+>/g, '').slice(0, 140) }
