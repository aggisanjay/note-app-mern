import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useNote, useUpdateNote } from '@/hooks/useNotes'
import { Button } from '@/components/ui/button'
import ShareDialog from '@/components/ShareDialog'
import { Textarea } from '@/components/ui/textarea'
import {api} from '@/api/client'
import { Archive, Trash2 } from 'lucide-react'

export default function NoteView() {
  const { id } = useParams()
  const nav = useNavigate()
  const { data, isLoading, error } = useNote(id)
  const update = useUpdateNote(id)

  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [open, setOpen] = useState(false)
  const [dirty, setDirty] = useState(false)

  useEffect(() => { if (data) { setTitle(data.title || ''); setContent(data.content || '') } }, [data])

  useEffect(() => {
    const t = setInterval(() => {
      if (!dirty) return
      update.mutate({ title, content })
      setDirty(false)
    }, 1200)
    return () => clearInterval(t)
  }, [dirty, title, content])

  if (error?.response?.status === 403) { nav('/notes'); return null }
  if (isLoading) return <div>Loading…</div>

  const archiveNote = async () => { await api.put(`/notes/${id}/archive`); nav('/notes') }
  const trashNote = async () => { await api.put(`/notes/${id}/trash`); nav('/notes') }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm text-gray-500">{dirty ? 'Saving…' : 'Saved'}</span>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" title="Archive" onClick={archiveNote}><Archive size={18} /></Button>
          <Button variant="ghost" size="icon" title="Trash" onClick={trashNote}><Trash2 size={18} /></Button>
          <Button onClick={() => setOpen(true)}>Share</Button>
        </div>
      </div>

      <input
        className="w-full text-3xl font-bold bg-transparent outline-none mb-3"
        value={title}
        onChange={(e) => { setTitle(e.target.value); setDirty(true) }}
        placeholder="Untitled"
      />

      <Textarea
        className="min-h-[60vh] bg-white border border-border rounded-2xl p-4 shadow-sm"
        value={content}
        onChange={(e) => { setContent(e.target.value); setDirty(true) }}
        placeholder="Start writing…"
      />

      <ShareDialog open={open} setOpen={setOpen} noteId={id} />
    </div>
  )
}
