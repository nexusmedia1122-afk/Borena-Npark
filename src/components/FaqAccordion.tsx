'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="mx-auto max-w-3xl divide-y divide-sand-200/80 rounded-2xl border border-sand-200/80 bg-white shadow-subtle overflow-hidden">
      {items.map((item, i) => {
        const isOpen = openIndex === i
        return (
          <div key={i} className="transition-colors">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-sand-50/60 focus:outline-none focus-visible:bg-sand-50"
            >
              <span className="font-display text-base font-bold text-charcoal-950 md:text-lg">
                {item.question}
              </span>
              <span
                className={cn(
                  'flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border transition-transform duration-200',
                  isOpen
                    ? 'rotate-180 border-gold-500 bg-gold-50 text-gold-800'
                    : 'border-sand-200 text-charcoal-600'
                )}
              >
                <ChevronDown className="h-4 w-4" />
              </span>
            </button>
            <div
              className={cn(
                'grid transition-all duration-250 ease-out',
                isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
              )}
            >
              <div className="overflow-hidden">
                <p className="px-6 pb-6 text-sm leading-relaxed text-charcoal-700 font-light md:text-base border-t border-sand-100 pt-3">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}