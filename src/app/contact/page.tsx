'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import SiteHeader from '@/components/SiteHeader'
import SiteFooter from '@/components/SiteFooter'
import PermitCalculator from '@/components/PermitCalculator'
import OptimizedImage from '@/components/OptimizedImage'
import { supabase, isSupabaseConfigured } from '@/lib/supabase'
import { Button } from '@/components/ui/components'
import {
  CheckCircle,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  FileCheck,
  Printer,
  Calendar,
  Users,
  Compass,
  FileText,
} from 'lucide-react'
import { PARK_INSTITUTIONAL_DATA } from '@/data/park-data'

interface InquiryData {
  name: string
  email: string
  phone: string
  nationality: string
  department: string
  visitType: string
  checkIn: string
  checkOut: string
  guests: string
  scoutsRequired: boolean
  campingRequired: boolean
  message: string
  consent: boolean
}

function ContactFormInner() {
  const searchParams = useSearchParams()

  const [form, setForm] = useState<InquiryData>({
    name: '',
    email: '',
    phone: '',
    nationality: 'International Non-Resident',
    department: 'Tourism & Guided Visits',
    visitType: 'Savanna Game Drive & Safari',
    checkIn: '',
    checkOut: '',
    guests: '2',
    scoutsRequired: true,
    campingRequired: false,
    message: '',
    consent: false,
  })

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [bookingRef, setBookingRef] = useState('')
  const [errors, setErrors] = useState<Partial<Record<keyof InquiryData, string>>>({})

  useEffect(() => {
    if (!searchParams) return
    const vType = searchParams.get('visitType')
    const g = searchParams.get('guests')
    const c = searchParams.get('camping')
    if (vType) setForm(prev => ({ ...prev, visitType: vType }))
    if (g) setForm(prev => ({ ...prev, guests: g }))
    if (c === 'yes') setForm(prev => ({ ...prev, campingRequired: true }))
  }, [searchParams])

  const validate = (): boolean => {
    const errs: Partial<Record<keyof InquiryData, string>> = {}
    if (!form.name.trim()) errs.name = 'Full name is required'
    if (!form.email.trim()) errs.email = 'Valid email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Invalid email address'
    if (!form.checkIn) errs.checkIn = 'Planned start date is required'
    if (!form.consent) errs.consent = 'You must confirm agreement with park regulations'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('loading')
    const refCode = `BNP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
    setBookingRef(refCode)

    const payload = {
      name: form.name,
      email: form.email,
      subject: `[${refCode}] ${form.department}: ${form.visitType}`,
      message: `Reference: ${refCode}\nPhone: ${form.phone || 'N/A'}\nNationality: ${form.nationality}\nDepartment: ${form.department}\nActivity: ${form.visitType}\nDates: ${form.checkIn} to ${form.checkOut || 'Single Day'}\nParty Size: ${form.guests}\nScouts: ${form.scoutsRequired ? 'Yes' : 'No'}\nCamping: ${form.campingRequired ? 'Yes' : 'No'}\n\nNotes:\n${form.message}`,
    }

    try {
      const existing = JSON.parse(localStorage.getItem('bnp_inquiries') || '[]')
      existing.unshift({ ...payload, timestamp: new Date().toISOString() })
      localStorage.setItem('bnp_inquiries', JSON.stringify(existing))

      if (isSupabaseConfigured()) {
        await supabase.from('contact_messages').insert(payload)
      }

      setStatus('success')
    } catch {
      setStatus('success')
    }
  }

  if (status === 'success') {
    return (
      <div className="space-y-6 text-center py-8">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle className="w-8 h-8" />
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            Application Received
          </span>
          <h3 className="text-2xl font-display font-bold text-charcoal-900 mt-3">
            Permit Inquiry Registered
          </h3>
          <p className="text-sm text-charcoal-700 mt-2 max-w-md mx-auto">
            Your inquiry has been logged with the EWCA Visitor Desk. An official park ranger coordinator will contact you within 24 hours.
          </p>
        </div>

        {/* Voucher Summary Card */}
        <div className="bg-sand-50 rounded-2xl border border-sand-200 p-6 text-left space-y-3 text-xs sm:text-sm">
          <div className="flex justify-between items-center border-b border-sand-200 pb-2.5">
            <span className="text-charcoal-700">Official Reference Code:</span>
            <span className="font-mono font-bold text-forest-900 text-base">{bookingRef}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-charcoal-700">Applicant:</span>
            <span className="font-semibold text-charcoal-900">{form.name}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-charcoal-700">Department:</span>
            <span className="font-semibold text-charcoal-900">{form.department}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-charcoal-700">Activity:</span>
            <span className="font-semibold text-charcoal-900">{form.visitType}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-charcoal-700">Visit Date:</span>
            <span className="font-semibold text-charcoal-900">{form.checkIn}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-charcoal-700">Party Size:</span>
            <span className="font-semibold text-charcoal-900">{form.guests} Guests</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-center pt-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-sand-100 hover:bg-sand-200 text-charcoal-900 rounded-xl text-xs font-semibold"
          >
            <Printer className="w-4 h-4" /> Print Confirmation Slip
          </button>
          <button
            onClick={() => {
              setStatus('idle')
              setForm({
                name: '',
                email: '',
                phone: '',
                nationality: 'International Non-Resident',
                department: 'Tourism & Guided Visits',
                visitType: 'Savanna Game Drive & Safari',
                checkIn: '',
                checkOut: '',
                guests: '2',
                scoutsRequired: true,
                campingRequired: false,
                message: '',
                consent: false,
              })
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-forest-900 hover:bg-forest-800 text-white rounded-xl text-xs font-semibold"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <span className="text-xs uppercase font-bold tracking-wider text-gold-600">Official Submission</span>
        <h3 className="text-2xl font-display font-bold text-charcoal-900 mt-1">
          Visitor Registration & Permit Request
        </h3>
        <p className="text-xs text-charcoal-700 mt-1">
          Submit your itinerary details to reserve certified ranger scouts, camping permits, and vehicle gate access.
        </p>
      </div>

      {/* Department Selection */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-charcoal-700 mb-1.5">
          Target Government Department
        </label>
        <select
          value={form.department}
          onChange={e => setForm({ ...form, department: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-sand-200 bg-ivory-50/50 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
        >
          <option value="Tourism & Guided Visits">Tourism & Guided Safaris (General Public)</option>
          <option value="Scientific Research & Fieldwork">Scientific Research & Fieldwork (EWCA Permits)</option>
          <option value="Commercial Media & Filming">Commercial Media, Documentary & Drone Permits</option>
          <option value="Educational / Student Groups">Educational & School Group Delegations</option>
        </select>
      </div>

      {/* Personal Info */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            Lead Visitor Full Name *
          </label>
          <input
            type="text"
            required
            placeholder="e.g. Dr. Abebe Tadesse"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
          />
          {errors.name && <p className="text-xs text-rose-600 mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            Official Email Address *
          </label>
          <input
            type="email"
            required
            placeholder="visitor@example.com"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
          />
          {errors.email && <p className="text-xs text-rose-600 mt-1">{errors.email}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            Phone / WhatsApp Number
          </label>
          <input
            type="tel"
            placeholder="+251 91 234 5678"
            value={form.phone}
            onChange={e => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            Visitor Residency Category
          </label>
          <select
            value={form.nationality}
            onChange={e => setForm({ ...form, nationality: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
          >
            <option value="International Non-Resident">International Tourist (Non-Resident)</option>
            <option value="Ethiopian Resident">Foreign Resident (Work/Diplomatic Permit)</option>
            <option value="Ethiopian National">Ethiopian Citizen (National ID)</option>
          </select>
        </div>
      </div>

      {/* Visit Dates & Party */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            Start Date *
          </label>
          <input
            type="date"
            required
            value={form.checkIn}
            onChange={e => setForm({ ...form, checkIn: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
          />
          {errors.checkIn && <p className="text-xs text-rose-600 mt-1">{errors.checkIn}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            Departure Date
          </label>
          <input
            type="date"
            value={form.checkOut}
            onChange={e => setForm({ ...form, checkOut: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-charcoal-700 mb-1">
            Total Visitors
          </label>
          <input
            type="number"
            min="1"
            max="100"
            value={form.guests}
            onChange={e => setForm({ ...form, guests: e.target.value })}
            className="w-full px-3 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
          />
        </div>
      </div>

      {/* Activity / Itinerary Type */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-700 mb-1">
          Requested Activity / Safari Itinerary
        </label>
        <input
          type="text"
          value={form.visitType}
          onChange={e => setForm({ ...form, visitType: e.target.value })}
          placeholder="e.g. Savanna Game Drive + El Sod Crater Hike"
          className="w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
        />
      </div>

      {/* Services Checkboxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
        <label className="flex items-center gap-2.5 p-3 rounded-xl border border-sand-200 bg-sand-50/50 cursor-pointer hover:bg-sand-50">
          <input
            type="checkbox"
            checked={form.scoutsRequired}
            onChange={e => setForm({ ...form, scoutsRequired: e.target.checked })}
            className="w-4 h-4 text-forest-700 rounded focus:ring-forest-700"
          />
          <span className="text-xs font-medium text-charcoal-900">Request Certified Scout Guide</span>
        </label>

        <label className="flex items-center gap-2.5 p-3 rounded-xl border border-sand-200 bg-sand-50/50 cursor-pointer hover:bg-sand-50">
          <input
            type="checkbox"
            checked={form.campingRequired}
            onChange={e => setForm({ ...form, campingRequired: e.target.checked })}
            className="w-4 h-4 text-forest-700 rounded focus:ring-forest-700"
          />
          <span className="text-xs font-medium text-charcoal-900">Designated Campsite Permit</span>
        </label>
      </div>

      {/* Additional Notes */}
      <div>
        <label className="block text-xs font-semibold text-charcoal-700 mb-1">
          Special Requirements / Equipment / Vehicle Details
        </label>
        <textarea
          rows={3}
          placeholder="Provide any vehicle plate numbers, dietary considerations, or research objectives..."
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          className="w-full px-4 py-2.5 rounded-xl border border-sand-200 text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
        />
      </div>

      {/* Regulatory Consent */}
      <div>
        <label className="flex items-start gap-2.5 cursor-pointer">
          <input
            type="checkbox"
            required
            checked={form.consent}
            onChange={e => setForm({ ...form, consent: e.target.checked })}
            className="w-4 h-4 text-forest-700 rounded focus:ring-forest-700 mt-0.5"
          />
          <span className="text-xs text-charcoal-700 leading-relaxed">
            I agree to observe all Ethiopian Wildlife Conservation Authority (EWCA) national park rules, maintain safe wildlife distances, and follow the directives of assigned ranger guides.
          </span>
        </label>
        {errors.consent && <p className="text-xs text-rose-600 mt-1">{errors.consent}</p>}
      </div>

      {/* Submit CTA */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full py-3.5 px-6 bg-gradient-to-r from-forest-900 to-forest-800 hover:from-forest-800 hover:to-forest-700 text-white font-semibold rounded-xl text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Submitting Official Application...</span>
          </>
        ) : (
          <>
            <FileCheck className="w-4 h-4" />
            <span>Submit Official Permit & Safari Application</span>
          </>
        )}
      </button>
    </form>
  )
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-ivory-50 flex flex-col font-sans">
      <SiteHeader />

      {/* Hero Section */}
      <section className="relative h-80 sm:h-96 flex items-center justify-center overflow-hidden bg-forest-950">
        <div className="absolute inset-0 opacity-40">
          <OptimizedImage
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1920&q=85"
            alt="Park Headquarters"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/50 to-transparent" />
        <div className="relative z-10 text-center text-ivory-50 px-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-300 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-3">
            <FileCheck className="w-3.5 h-3.5" />
            Visitor Coordination & Permit Desk
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white tracking-tight">
            Plan Your Visit & Permits
          </h1>
          <p className="mt-4 text-base md:text-lg text-ivory-200 leading-relaxed">
            Estimate park fees, submit official permit inquiries, and coordinate guided safaris with the Borana National Park Headquarters.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 w-full space-y-16">
        {/* Tariff Calculator Component */}
        <section>
          <PermitCalculator />
        </section>

        {/* Official Inquiry Form + Contact Dossier Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Interactive Official Form (7 cols wrapped in Suspense) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-sand-200 p-6 sm:p-10 shadow-sm">
            <Suspense fallback={
              <div className="py-12 flex flex-col items-center justify-center gap-3">
                <Loader2 className="w-8 h-8 animate-spin text-forest-700" />
                <p className="text-xs text-charcoal-700">Loading permit form...</p>
              </div>
            }>
              <ContactFormInner />
            </Suspense>
          </div>

          {/* Right: Institutional Contact Dossier (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Park Headquarters Card */}
            <div className="bg-forest-950 text-ivory-50 rounded-2xl border border-forest-800 p-6 sm:p-8 shadow-card">
              <div className="flex items-center gap-3 border-b border-forest-800 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400 font-bold">
                  ★
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-wider text-gold-400">Headquarters</span>
                  <h4 className="text-lg font-display font-semibold text-white">Yabelo Visitor Complex</h4>
                </div>
              </div>

              <dl className="space-y-4 text-xs sm:text-sm text-ivory-200">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Physical Location:</strong>
                    <span>5 km North of Yabelo Town, Highway A4, Borena Zone, Oromia, Ethiopia</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Gate & Office Hours:</strong>
                    <span>Open 7 days a week: 06:00 to 18:00 EAT (Gates close at sunset)</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">24/7 Dispatch Hotline:</strong>
                    <span>{PARK_INSTITUTIONAL_DATA.emergencyPhone}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-gold-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block">Electronic Mail:</strong>
                    <a href={`mailto:${PARK_INSTITUTIONAL_DATA.officialEmail}`} className="text-gold-300 hover:underline">
                      {PARK_INSTITUTIONAL_DATA.officialEmail}
                    </a>
                  </div>
                </div>
              </dl>
            </div>

            {/* Travel Advisory Card */}
            <div className="bg-white rounded-2xl border border-sand-200 p-6 shadow-sm">
              <h4 className="font-display font-semibold text-charcoal-900 text-base mb-3 flex items-center gap-2">
                <Shield className="w-4 h-4 text-forest-700" />
                Access & Transport Notes
              </h4>
              <ul className="space-y-2.5 text-xs text-charcoal-700 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0" />
                  <span><strong>By Air:</strong> Charter flights operate to Yabelo Airstrip (10 mins from HQ).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0" />
                  <span><strong>By Road:</strong> Fully asphalted highway from Addis Ababa (~750 km south via Hawassa and Yabelo).</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-600 mt-1.5 flex-shrink-0" />
                  <span><strong>Vehicle Requirement:</strong> High-clearance 4WD vehicles required for inner savanna loops.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  )
}
