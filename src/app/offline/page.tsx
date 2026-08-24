'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/components'
import { CheckCircle, WifiOff, RefreshCw } from 'lucide-react'

export default function OfflinePage() {
  const [saved, setSaved] = useState(false)

  return (
    <div className="min-h-screen bg-ivory-50 flex items-center justify-center p-6">
      <div className="max-w-lg text-center">
        <div className="w-20 h-20 bg-sand-200 rounded-full flex items-center justify-center mx-auto mb-6">
          <WifiOff className="w-10 h-10 text-charcoal-700" />
        </div>
        <h1 className="text-3xl font-display font-semibold text-charcoal-900 mb-4">You&apos;re exploring offline</h1>
        <p className="text-lg text-charcoal-700 mb-8 leading-relaxed">
          You can still access information saved on this device. Some features require an internet connection and will be available when you reconnect.
        </p>

        <div className="bg-white rounded-xl border border-sand-200 p-6 text-left mb-8">
          <h2 className="text-lg font-semibold text-charcoal-900 mb-4">Available offline</h2>
          <ul className="space-y-3 text-sm text-charcoal-700">
            {[
              'Park overview',
              'Essential visitor information',
              'Safety information',
              'Park rules',
              'Selected wildlife information',
              'Basic map information',
              'Emergency / contact information',
              'Recently viewed stories',
              'Frequently accessed pages',
            ].map(item => (
              <li key={item} className="flex items-center">
                <CheckCircle className="w-4 h-4 text-forest-700 mr-2 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button onClick={() => window.location.reload()} variant="secondary" className="inline-flex items-center justify-center">
            <RefreshCw className="w-4 h-4 mr-2" />
            Try reconnecting
          </Button>
          <Button href="/" variant="outline">Go to homepage</Button>
        </div>

        {!saved && (
          <p className="mt-6 text-xs text-charcoal-500">
            Offline guide last updated: {new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        )}
      </div>
    </div>
  )
}
