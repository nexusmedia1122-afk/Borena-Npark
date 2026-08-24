import Link from 'next/link'
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react'

export default function SiteFooter() {
  return (
    <footer className="bg-forest-950 text-ivory-100 border-t border-forest-800/80 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Col 1 & 2: Park Overview */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="inline-flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-white rounded-full p-0.5 flex items-center justify-center shadow-md overflow-hidden border border-gold-400/60 shrink-0">
                <img
                  src="/logo.png"
                  alt="Borana National Park Official Logo"
                  className="w-full h-full object-contain transform scale-110"
                />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-2xl font-bold text-white tracking-tight leading-none">
                  Borena
                </span>
                <span className="text-[10px] tracking-[0.2em] uppercase font-semibold text-gold-400 mt-1">
                  National Park
                </span>
              </div>
            </Link>
            <p className="text-sm text-ivory-200/80 max-w-md leading-relaxed">
              Protecting over 1.2 million hectares of diverse savanna, afro-montane forests, volcanic calderas, and ancient hydrological cultural landscapes in southern Ethiopia.
            </p>

            <div className="pt-2">
              <p className="text-xs uppercase font-semibold tracking-wider text-gold-400 mb-1.5">Park Headquarters</p>
              <p className="text-xs text-ivory-200/90 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-gold-400 shrink-0" />
                <span>Yabelo, Borena Zone, Southern Ethiopia</span>
              </p>
            </div>
          </div>

          {/* Col 3: Explore */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4 tracking-wide">
              Explore
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory-200/80">
              <li>
                <Link href="/wildlife" className="hover:text-gold-300 transition-colors">
                  Wildlife
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-gold-300 transition-colors">
                  Field Stories
                </Link>
              </li>
              <li>
                <Link href="/map" className="hover:text-gold-300 transition-colors">
                  Interactive Map
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:text-gold-300 transition-colors">
                  Photo Gallery
                </Link>
              </li>
              <li>
                <Link href="/experiences" className="hover:text-gold-300 transition-colors">
                  Guided Safaris
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Conservation & Heritage */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4 tracking-wide">
              Heritage & Care
            </h3>
            <ul className="space-y-2.5 text-sm text-ivory-200/80">
              <li>
                <Link href="/conservation" className="hover:text-gold-300 transition-colors">
                  Conservation Efforts
                </Link>
              </li>
              <li>
                <Link href="/culture" className="hover:text-gold-300 transition-colors">
                  Borena Culture & Heritage
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-gold-300 transition-colors">
                  About the Park
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-gold-300 transition-colors">
                  Plan Your Visit
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className="hover:text-gold-300 transition-colors">
                  Staff Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 5: Direct Inquiries */}
          <div>
            <h3 className="font-display font-semibold text-white text-base mb-4 tracking-wide">
              Inquiries
            </h3>
            <ul className="space-y-3 text-sm text-ivory-200/80">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gold-400 shrink-0" />
                <span>+251 (0) 46 444 0210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-gold-400 shrink-0" />
                <a href="mailto:info@borenanationalpark.et" className="hover:text-white transition-colors">
                  info@borenanationalpark.et
                </a>
              </li>
            </ul>

            <div className="flex items-center space-x-3 mt-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-forest-900 border border-forest-800 flex items-center justify-center text-ivory-200 hover:text-white hover:border-gold-500 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-lg bg-forest-900 border border-forest-800 flex items-center justify-center text-ivory-200 hover:text-white hover:border-gold-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-forest-900 flex flex-col sm:flex-row justify-between items-center text-xs text-ivory-200/60 gap-4">
          <p>© {new Date().getFullYear()} Borena National Park. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/about" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="/about" className="hover:text-white transition-colors">Guidelines</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
