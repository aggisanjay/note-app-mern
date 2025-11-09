import { create } from 'zustand'
import { api } from '@/api/client'

export const useAuthStore = create((set) => ({
  user: null,
  loading: false,

  fetchMe: async () => {
    try {
      const { data } = await api.get('/auth/me')
      set({ user: { id: data.id, name: data.name, email: data.email } })
    } catch {
      set({ user: null })
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true })
    const { data } = await api.post('/auth/login', { email, password })
    set({ user: { id: data.id, name: data.name, email: data.email }, loading: false })
  },

  register: async ({ name, email, password }) => {
    set({ loading: true })
    const { data } = await api.post('/auth/register', { name, email, password })
    set({ user: { id: data.id, name: data.name, email: data.email }, loading: false })
  },

  logout: async () => {
    await api.post('/auth/logout')
    set({ user: null })
  }
}))
