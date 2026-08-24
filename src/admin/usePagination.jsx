import { useState } from 'react'

export function usePagination(total, perPage = 20) {
  const [page, setPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(total / perPage))

  useEffect(() => {
    if (page > totalPages) setPage(totalPages)
  }, [totalPages, page])

  const goTo = (p) => setPage(Math.max(1, Math.min(p, totalPages)))
  const next = () => goTo(page + 1)
  const prev = () => goTo(page - 1)

  return { page, totalPages, total, goTo, next, prev, hasNext: page < totalPages, hasPrev: page > 1 }
}

export function SearchAndFilter({ search, setSearch, statusFilter, setStatusFilter, statuses = ['all', 'draft', 'published', 'archived'] }) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent flex-1"
      />
      <select
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
        className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
      >
        {statuses.map(s => (
          <option key={s} value={s}>{s === 'all' ? 'All Statuses' : s.charAt(0).toUpperCase() + s.slice(1)}</option>
        ))}
      </select>
    </div>
  )
}

export function Pagination({ page, totalPages, goTo, hasNext, hasPrev }) {
  if (totalPages <= 1) return null

  const pages = []
  const maxVisible = 5
  let start = Math.max(1, page - Math.floor(maxVisible / 2))
  let end = Math.min(totalPages, start + maxVisible - 1)
  if (end - start < maxVisible - 1) start = Math.max(1, end - maxVisible + 1)

  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <div className="flex items-center justify-between mt-4">
      <button onClick={goTo(page - 1)} disabled={!hasPrev} className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50 text-sm">
        Previous
      </button>
      <div className="flex items-center gap-1">
        {start > 1 && <><button onClick={() => goTo(1)} className="px-3 py-1 border border-slate-300 rounded text-sm">1</button><span className="text-slate-400">...</span></>}
        {pages.map(p => (
          <button key={p} onClick={() => goTo(p)} className={`px-3 py-1 border rounded text-sm ${p === page ? 'bg-green-700 text-white border-green-700' : 'border-slate-300'}`}>
            {p}
          </button>
        ))}
        {end < totalPages && <><span className="text-slate-400">...</span><button onClick={() => goTo(totalPages)} className="px-3 py-1 border border-slate-300 rounded text-sm">{totalPages}</button></>}
      </div>
      <button onClick={goTo(page + 1)} disabled={!hasNext} className="px-3 py-1 border border-slate-300 rounded disabled:opacity-50 text-sm">
        Next
      </button>
    </div>
  )
}

export function EmptyState({ message, action, actionLabel }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">📭</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{message}</h3>
      {action && actionLabel && (
        <button onClick={action} className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
          {actionLabel}
        </button>
      )}
    </div>
  )
}

export function ErrorState({ message, retry }) {
  return (
    <div className="text-center py-12">
      <div className="text-4xl mb-4">⚠️</div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">Something went wrong</h3>
      <p className="text-slate-600 mb-4">{message}</p>
      {retry && (
        <button onClick={retry} className="px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800">
          Retry
        </button>
      )}
    </div>
  )
}
