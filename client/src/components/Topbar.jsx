import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import AnimatedAvatar from '@/components/AnimatedAvatar'
import { useAuthStore } from '@/store/useAuth'
import { useSearchParams, useNavigate } from 'react-router-dom'

export default function Topbar() {
  const { user, logout } = useAuthStore()
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const q = params.get('q') || ''

  const updateSearch = (e) => {
    const v = e.target.value
    const sp = new URLSearchParams(params)
    if (v) sp.set('q', v); else sp.delete('q')
    navigate(`/notes?${sp.toString()}`)
  }

  return (
    <header className="sticky top-0 z-10 bg-white border-b px-4 md:px-6 py-3 flex items-center gap-3 justify-between">
      <Input placeholder="Search notes..." className="max-w-md bg-gray-50" value={q} onChange={updateSearch} />
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700 font-medium hidden sm:block">{user?.name}</span>
        <AnimatedAvatar name={user?.name} />
        <Button onClick={logout} variant="secondary">Logout</Button>
      </div>
    </header>
  )
}
