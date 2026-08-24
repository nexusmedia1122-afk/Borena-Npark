'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/components'
import { X, CheckCircle } from 'lucide-react'

export default function SaveForOffline() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className="hidden md:inline-flex items-center px-3 py-1.5 rounded-lg text-xs font-medium bg-forest-700/50 text-ivory-100 hover:bg-forest-700 transition-colors"
      >
        Save for Offline
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-display font-semibold text-charcoal-900">Essential Park Guide</h2>
                <button onClick={() => setOpen(false)} className="text-charcoal-400 hover:text-charcoal-600"><X className="w-5 h-5" /></button>
              </div>

              <p className="text-sm text-charcoal-600 mb-4">
                Save important park information to access it without an internet connection.
              </p>

              <div className="bg-sand-100 rounded-lg p-3 mb-4 text-sm text-charcoal-600">
                <div className="flex justify-between">
                  <span>Storage used:</span>
                  <span className="font-medium">~2.4 MB / 50 MB</span>
                </div>
                <div className="w-full bg-sand-200 rounded-full h-2 mt-2">
                  <div className="bg-forest-700 h-2 rounded-full transition-all" style={{ width: '5%' }} />
                </div>
              </div>

              <div className="space-y-2 mb-6">
                {[
                  { id: 'park-overview', title: 'Park Overview', size: '~250 KB' },
                  { id: 'visitor-info', title: 'Visitor Information', size: '~180 KB' },
                  { id: 'safety', title: 'Safety Information', size: '~120 KB' },
                  { id: 'park-rules', title: 'Park Rules', size: '~90 KB' },
                  { id: 'wildlife-guide', title: 'Wildlife Guide', size: '~400 KB' },
                  { id: 'map-basics', title: 'Basic Map Information', size: '~150 KB' },
                  { id: 'emergency-contacts', title: 'Emergency Contacts', size: '~40 KB' },
                  { id: 'recent-stories', title: 'Recently Viewed Stories', size: '~300 KB' },
                ].map(item => (
                  <label key={item.id} className="flex items-center justify-between p-3 bg-ivory-50 border border-sand-200 rounded-lg cursor-pointer hover:border-forest-700 transition-colors">
                    <div>
                      <div className="font-medium text-charcoal-900 text-sm">{item.title}</div>
                      <div className="text-xs text-charcoal-500">{item.size}</div>
                    </div>
                    <input type="checkbox" className="w-4 h-4 text-forest-700 rounded" />
                  </label>
                ))}
              </div>

              <div className="flex gap-3">
                <button className="flex-1 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 text-sm">
                  Remove Offline Data
                </button>
                <button onClick={() => setOpen(false)} className="flex-1 px-4 py-2 bg-forest-700 text-ivory-50 rounded-lg hover:bg-forest-900 text-sm">
                  Done
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
