'use client'

import React, { useState } from 'react'
import { Calculator, Check, Users, Car, Tent, Shield, Video, ArrowRight, RefreshCw, FileText } from 'lucide-react'
import Link from 'next/link'
import { OFFICIAL_TARIFFS } from '@/data/park-data'

type VisitorType = 'foreign_non_resident' | 'foreign_resident' | 'ethiopian_citizen'

export default function PermitCalculator() {
  const [visitorType, setVisitorType] = useState<VisitorType>('foreign_non_resident')
  const [adults, setAdults] = useState(2)
  const [students, setStudents] = useState(0)
  const [days, setDays] = useState(2)
  const [vehicles, setVehicles] = useState(1)
  const [scouts, setScouts] = useState(1)
  const [campingNights, setCampingNights] = useState(1)
  const [includeFilming, setIncludeFilming] = useState(false)

  // Tariff lookups
  const adultRate = visitorType === 'foreign_non_resident' ? 20 : visitorType === 'foreign_resident' ? 10 : 100
  const studentRate = visitorType === 'foreign_non_resident' ? 10 : visitorType === 'foreign_resident' ? 5 : 40
  const scoutRate = visitorType === 'foreign_non_resident' ? 15 : visitorType === 'foreign_resident' ? 10 : 450
  const campingRate = visitorType === 'foreign_non_resident' ? 10 : visitorType === 'foreign_resident' ? 5 : 150
  const vehicleRate = visitorType === 'foreign_non_resident' ? 10 : visitorType === 'foreign_resident' ? 5 : 200
  const filmingRate = visitorType === 'foreign_non_resident' ? 250 : visitorType === 'foreign_resident' ? 150 : 8000

  const isETB = visitorType === 'ethiopian_citizen'
  const currencySymbol = isETB ? 'ETB ' : '$'

  // Calculations
  const entryTotal = (adults * adultRate + students * studentRate) * days
  const scoutTotal = scouts * scoutRate * days
  const vehicleTotal = vehicles * vehicleRate * days
  const campingTotal = campingNights * campingRate * Math.max(1, Math.ceil((adults + students) / 2))
  const filmingTotal = includeFilming ? filmingRate * days : 0

  const grandTotal = entryTotal + scoutTotal + vehicleTotal + campingTotal + filmingTotal

  const handleReset = () => {
    setVisitorType('foreign_non_resident')
    setAdults(2)
    setStudents(0)
    setDays(2)
    setVehicles(1)
    setScouts(1)
    setCampingNights(1)
    setIncludeFilming(false)
  }

  return (
    <div className="bg-white rounded-2xl border border-sand-200 shadow-card overflow-hidden">
      {/* Card Header */}
      <div className="bg-gradient-to-r from-forest-900 to-forest-800 p-6 sm:p-8 text-ivory-50">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gold-600/20 border border-gold-500/40 flex items-center justify-center text-gold-400">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider text-gold-400 font-semibold">Official Tariff Tool</span>
              <h3 className="text-2xl font-display font-semibold text-white">Park Fee & Permit Calculator</h3>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 text-xs text-ivory-200 hover:text-white bg-forest-800/80 px-3 py-1.5 rounded-lg border border-forest-700 hover:border-gold-500/40 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
        <p className="mt-3 text-sm text-ivory-200/90 max-w-2xl">
          Calculate official entrance permits, scout services, camping tariffs, and vehicle passes authorized by the Ethiopian Wildlife Conservation Authority.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Visitor Category */}
          <div>
            <label className="block text-xs uppercase font-semibold text-charcoal-700 tracking-wider mb-2">
              1. Select Visitor Category
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                { id: 'foreign_non_resident', label: 'International Tourist', sub: 'Non-resident (USD)' },
                { id: 'foreign_resident', label: 'Resident Expatriate', sub: 'With valid permit (USD)' },
                { id: 'ethiopian_citizen', label: 'Ethiopian Citizen', sub: 'National ID card (ETB)' },
              ].map(cat => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setVisitorType(cat.id as VisitorType)}
                  className={`p-3.5 rounded-xl border text-left transition-all ${
                    visitorType === cat.id
                      ? 'border-forest-700 bg-forest-50/70 shadow-sm ring-1 ring-forest-700'
                      : 'border-sand-200 bg-white hover:border-sand-300 hover:bg-sand-50/40'
                  }`}
                >
                  <p className={`text-sm font-semibold ${visitorType === cat.id ? 'text-forest-900' : 'text-charcoal-900'}`}>
                    {cat.label}
                  </p>
                  <p className="text-xs text-charcoal-700 mt-0.5">{cat.sub}</p>
                </button>
              ))}
            </div>
          </div>

          {/* Group Composition & Duration */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
                Adult Visitors ({currencySymbol}{adultRate}/day)
              </label>
              <div className="flex items-center">
                <input
                  type="number"
                  min={1}
                  max={50}
                  value={adults}
                  onChange={e => setAdults(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
                Children / Students ({currencySymbol}{studentRate}/day)
              </label>
              <input
                type="number"
                min={0}
                max={50}
                value={students}
                onChange={e => setStudents(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
                Visit Duration (Days)
              </label>
              <input
                type="number"
                min={1}
                max={30}
                value={days}
                onChange={e => setDays(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Park Services & Transport */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 flex items-center gap-1">
                <Shield className="w-3.5 h-3.5 text-forest-700" />
                Certified Scouts ({currencySymbol}{scoutRate}/day)
              </label>
              <input
                type="number"
                min={1}
                max={10}
                value={scouts}
                onChange={e => setScouts(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
              />
              <span className="text-[10px] text-charcoal-700 mt-1 block">1 scout mandatory per 5 visitors</span>
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 flex items-center gap-1">
                <Car className="w-3.5 h-3.5 text-forest-700" />
                Vehicles 4WD ({currencySymbol}{vehicleRate}/day)
              </label>
              <input
                type="number"
                min={0}
                max={10}
                value={vehicles}
                onChange={e => setVehicles(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 mb-1.5 flex items-center gap-1">
                <Tent className="w-3.5 h-3.5 text-forest-700" />
                Camping Nights ({currencySymbol}{campingRate}/night)
              </label>
              <input
                type="number"
                min={0}
                max={30}
                value={campingNights}
                onChange={e => setCampingNights(Math.max(0, parseInt(e.target.value) || 0))}
                className="w-full px-3 py-2 border border-sand-200 rounded-lg text-sm focus:ring-2 focus:ring-forest-700 focus:outline-none"
              />
            </div>
          </div>

          {/* Filming & Drone Permit Toggle */}
          <div className="bg-sand-50/70 p-4 rounded-xl border border-sand-200 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Video className="w-5 h-5 text-forest-800" />
              <div>
                <p className="text-sm font-semibold text-charcoal-900">Commercial Filming / Cinema / Drone Permit</p>
                <p className="text-xs text-charcoal-700">Official ministerial media credential ({currencySymbol}{filmingRate}/day)</p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={includeFilming}
              onChange={e => setIncludeFilming(e.target.checked)}
              className="w-5 h-5 text-forest-700 rounded border-sand-300 focus:ring-forest-700 cursor-pointer"
            />
          </div>
        </div>

        {/* Right Summary Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-sand-50 rounded-2xl border border-sand-200 p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-sand-200 pb-3 mb-4">
              <h4 className="font-display font-semibold text-charcoal-900 text-lg">Estimated Tariff Summary</h4>
              <span className="text-[11px] font-semibold text-forest-800 bg-forest-100 px-2.5 py-0.5 rounded-full">
                {visitorType === 'ethiopian_citizen' ? 'Ethiopian Birr (ETB)' : 'US Dollars (USD)'}
              </span>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-charcoal-700">
                <span>Entry Permits ({adults + students} pers. × {days} days)</span>
                <span className="font-semibold text-charcoal-900">{currencySymbol}{entryTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-charcoal-700">
                <span>Certified Scouts ({scouts} × {days} days)</span>
                <span className="font-semibold text-charcoal-900">{currencySymbol}{scoutTotal.toLocaleString()}</span>
              </div>
              {vehicles > 0 && (
                <div className="flex justify-between text-charcoal-700">
                  <span>Vehicle Passes ({vehicles} × {days} days)</span>
                  <span className="font-semibold text-charcoal-900">{currencySymbol}{vehicleTotal.toLocaleString()}</span>
                </div>
              )}
              {campingNights > 0 && (
                <div className="flex justify-between text-charcoal-700">
                  <span>Campsite Fee ({campingNights} nights)</span>
                  <span className="font-semibold text-charcoal-900">{currencySymbol}{campingTotal.toLocaleString()}</span>
                </div>
              )}
              {includeFilming && (
                <div className="flex justify-between text-charcoal-700">
                  <span>Media & Filming Permit ({days} days)</span>
                  <span className="font-semibold text-charcoal-900">{currencySymbol}{filmingTotal.toLocaleString()}</span>
                </div>
              )}
            </div>

            <div className="border-t border-sand-300 mt-6 pt-4">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-xs uppercase font-semibold text-charcoal-700 tracking-wider">Total Estimated Tariff</p>
                  <p className="text-[11px] text-charcoal-700">Includes all park taxes & conservation levies</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-display font-bold text-forest-900">
                    {currencySymbol}{grandTotal.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              href={`/contact?visitType=Tourism&guests=${adults + students}&days=${days}&scouts=${scouts}&camping=${campingNights > 0 ? 'yes' : 'no'}`}
              className="w-full inline-flex items-center justify-center gap-2 bg-gold-600 hover:bg-gold-500 text-charcoal-900 font-semibold py-3 px-4 rounded-xl shadow-md transition-colors text-sm"
            >
              <span>Submit Official Permit Inquiry</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <p className="text-[11px] text-center text-charcoal-700">
              Permits are payable upon arrival at the Yabelo Visitor Headquarters or via official electronic bank transfer.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
