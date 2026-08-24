import { Button } from '@/components/ui/components'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory-50 px-4">
      <div className="max-w-md text-center">
        <h1 className="text-6xl font-display font-semibold text-charcoal-900 mb-4">404</h1>
        <p className="text-lg text-charcoal-700 mb-8">The page you are looking for does not exist or has been moved.</p>
        <Button href="/">Return home</Button>
      </div>
    </div>
  )
}
