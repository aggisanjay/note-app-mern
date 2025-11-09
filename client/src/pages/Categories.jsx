import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useCategories } from '@/hooks/useCategories'
import { api } from '@/api/client'

export default function Categories() {
  const { data, refetch } = useCategories()
  const [name, setName] = useState('')

  const create = async () => { await api.post('/categories', { name }); setName(''); refetch() }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Categories</h2>
      <div className="flex gap-2 mb-6">
        <Input placeholder="Category name" value={name} onChange={(e)=>setName(e.target.value)} />
        <Button onClick={create} disabled={!name.trim()}>Add</Button>
      </div>

      <ul className="space-y-2">
        {data?.map((c) => (
          <li key={c._id} className="flex items-center justify-between bg-white border rounded-xl px-4 py-2">
            <span>{c.name}</span>
            <Button variant="secondary" onClick={async ()=>{ await api.delete(`/categories/${c._id}`); refetch() }}>Delete</Button>
          </li>
        ))}
      </ul>
    </div>
  )
}
