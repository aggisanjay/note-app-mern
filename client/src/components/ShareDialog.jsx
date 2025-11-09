import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { api } from '@/api/client'

export default function ShareDialog({ open, setOpen, noteId }) {
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('reader')
  const [loading, setLoading] = useState(false)

  const invite = async () => {
    setLoading(true)
    try { await api.post(`/shares/${noteId}`, { email, role }); setOpen(false) }
    finally { setLoading(false) }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Share note</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          <Input placeholder="user@example.com" value={email} onChange={(e)=>setEmail(e.target.value)} />
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="w-full rounded-lg border px-3 py-2 text-sm">
            <option value="reader">Reader</option>
            <option value="editor">Editor</option>
          </select>
          <Button onClick={invite} disabled={!email || loading} className="w-full">
            {loading ? 'Inviting…' : 'Invite'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
