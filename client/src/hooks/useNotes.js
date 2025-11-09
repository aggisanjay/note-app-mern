import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/api/client'

export function useNotes(filters) {
  const clean = Object.fromEntries(
    Object.entries(filters).filter(([_, v]) => v !== '' && v !== null && v !== undefined)
  )
  return useQuery({
    queryKey: ['notes', clean],
    queryFn: async () => (await api.get('/notes', { params: clean })).data
  })
}

export function useNote(id) {
  return useQuery({
    enabled: !!id,
    queryKey: ['note', id],
    queryFn: async () => (await api.get(`/notes/${id}`)).data
  })
}

export function useCreateNote() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => (await api.post('/notes', payload)).data,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['notes'] })
  })
}

export function useUpdateNote(id) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: async (payload) => (await api.put(`/notes/${id}`, payload)).data,
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['note', id] })
      qc.invalidateQueries({ queryKey: ['notes'] })
    }
  })
}
