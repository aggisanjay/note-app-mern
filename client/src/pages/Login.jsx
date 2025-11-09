import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, fetchMe, user, loading } = useAuthStore()
  const nav = useNavigate()

  useEffect(() => { fetchMe() }, [])
  useEffect(() => { if (user) nav('/') }, [user, nav])

  const submit = async () => { await login({ email, password }) }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
          <p className="text-sm text-gray-600 mb-6">Sign in to your notes</p>
          <div className="space-y-3">
            <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button onClick={submit} disabled={loading || !email || !password} className="w-full">
              {loading ? 'Signing in…' : 'Sign in'}
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">No account? <Link to="/register" className="underline">Create one</Link></p>
        </CardContent>
      </Card>
    </div>
  )
}
