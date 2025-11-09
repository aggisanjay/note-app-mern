import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import NoteCard from '@/components/NoteCard'
import { useNotes, useCreateNote } from '@/hooks/useNotes'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function Notes() {
  const navigate = useNavigate()
  const [params] = useSearchParams()

  const q        = params.get('q')        || ''
  const category = params.get('category') || ''
  const shared   = params.get('shared')   || ''
  const archived = params.get('archived') || ''
  const trash    = params.get('trash')    || ''

  const { data } = useNotes({ q, category, shared, archived, trash })

  const updateSearch = (e) => {
    const v = e.target.value
    const sp = new URLSearchParams(params)
    if (v) sp.set('q', v); else sp.delete('q')
    navigate(`/notes?${sp.toString()}`)
  }

  const createNote = useCreateNote()

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <Input placeholder="Filter by title/content…" value={q} onChange={updateSearch} className="bg-white" />
        <Button onClick={async () => {
          const created = await createNote.mutateAsync({}) // default content from server
          navigate(`/notes/${created._id}`)
        }}>New Note</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {data?.length ? data.map(n => <NoteCard key={n._id} note={n} />) : <EmptyState />}
      </div>
    </div>
  )
}

function EmptyState() {
  return (
    <div className="col-span-full grid place-items-center py-20 text-center border border-dashed rounded-2xl bg-white">
      <div>
        <h3 className="text-lg font-semibold">No notes yet</h3>
        <p className="text-sm text-gray-600">Create your first note to get started.</p>
      </div>
    </div>
  )
}
