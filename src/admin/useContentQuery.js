import { useState, useEffect } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

export function useContentQuery(table, options = {}) {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const perPage = options.perPage || 20

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setLoading(false)
      return
    }
    load()
  }, [table, page, search, statusFilter])

  async function load() {
    setLoading(true)
    setError(null)
    try {
      let query = supabase.from(table).select('*', { count: 'exact' })

      if (options.typeFilter) {
        query = query.eq('type', options.typeFilter)
      }
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter)
      }
      if (search) {
        query = query.or(`title.ilike.%${search}%,slug.ilike.%${search}%`)
      }

      const from = (page - 1) * perPage
      const to = from + perPage - 1

      const [result, countResult] = await Promise.all([
        query.order('updated_at', { ascending: false }).range(from, to),
        supabase.from(table).select('*', { count: 'exact', head: true })
      ])

      if (result.error) throw result.error
      setData(result.data || [])
      options.onTotal?.(countResult.count || 0)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return { data, loading, error, page, setPage, search, setSearch, statusFilter, setStatusFilter, refetch: load }
}

export async function deleteRecord(table, id) {
  const { error } = await supabase.from(table).delete().eq('id', id)
  if (error) throw error
}

export async function updateStatus(table, id, status) {
  const { error } = await supabase.from(table).update({ status, published_at: status === 'published' ? new Date().toISOString() : null }).eq('id', id)
  if (error) throw error
}
