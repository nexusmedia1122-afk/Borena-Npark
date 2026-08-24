'use client'

import { useState } from 'react'
import { Send, CheckCircle2 } from 'lucide-react'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <p className="inline-flex items-center gap-2 rounded-full bg-forest-700/10 px-5 py-3 text-sm font-medium text-forest-700">
        <CheckCircle2 className="h-5 w-5" />
        Thank you — you're on the list for field updates.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto flex w-full max-w-md items-center gap-2">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        className="h-12 w-full rounded-lg border border-earth-300/60 bg-white px-4 text-sm text-charcoal-900 placeholder:text-charcoal-700/50 shadow-sm transition-colors focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/30"
      />
      <button
        type="submit"
        className="inline-flex h-12 flex-shrink-0 items-center gap-2 rounded-lg bg-forest-700 px-5 text-sm font-semibold text-ivory-50 shadow-sm transition-all duration-300 hover:bg-forest-900 hover:shadow-card active:scale-95"
      >
        Subscribe
        <Send className="h-4 w-4" />
      </button>
    </form>
  )
}