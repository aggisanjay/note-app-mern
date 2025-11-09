import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/store/useAuth'
import { Link, useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { register, loading } = useAuthStore()
  const nav = useNavigate()

  const submit = async () => {
    await register({ name, email, password })
    nav('/')
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Create account</h1>
          <p className="text-sm text-gray-600 mb-6">Start taking great notes</p>
          <div className="space-y-3">
            <Input placeholder="Name" value={name} onChange={(e)=>setName(e.target.value)} />
            <Input placeholder="Email" value={email} onChange={(e)=>setEmail(e.target.value)} />
            <Input placeholder="Password" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
            <Button onClick={submit} disabled={loading || !email || !password || !name} className="w-full">
              {loading ? 'Creating…' : 'Create account'}
            </Button>
          </div>
          <p className="text-sm text-gray-600 mt-4">Have an account? <Link to="/login" className="underline">Sign in</Link></p>
        </CardContent>
      </Card>
    </div>
  )
}
