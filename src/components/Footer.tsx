import { Link } from '@tanstack/react-router'
import { Home, Info, Sparkles, Palette, BookOpen } from 'lucide-react'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0C1B3A' }} className="text-white">
      <div className="max-w-6xl mx-auto px-5 py-12">
        <div className="flex flex-col md:flex-row justify-between gap-10">
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/ck-logo.png"
                alt="Cue Kit logo"
                className="h-9 w-9 object-contain"
              />
              <span
                className="text-xl font-bold tracking-tight"
                style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
              >
                CUE<span style={{ color: '#F4A328' }}>KIT</span>
              </span>
            </div>
            <p
              className="mt-3 text-lg font-bold tracking-wide uppercase"
              style={{
                fontFamily: 'Barlow Semi Condensed, sans-serif',
                color: '#F4A328',
              }}
            >
              Wear Your Game Plan
            </p>
            <p className="mt-2 text-sm text-blue-200 max-w-xs">
              Mental performance for volleyball athletes. Reflect, plan, recall your cues.
            </p>
          </div>

          <div className="flex gap-16">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3">
                Pages
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    <Home size={14} aria-hidden="true" />
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    <Info size={14} aria-hidden="true" />
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/cue-plan"
                    className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    <Sparkles size={14} aria-hidden="true" />
                    Cue Plan
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-300 mb-3">
                Learn
              </p>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/techniques"
                    className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    <Palette size={14} aria-hidden="true" />
                    Techniques
                  </Link>
                </li>
                <li>
                  <Link
                    to="/about"
                    className="inline-flex items-center gap-2 text-sm text-blue-100 hover:text-white transition-colors"
                  >
                    <BookOpen size={14} aria-hidden="true" />
                    Research
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-blue-900 text-xs text-blue-400">
          &copy; {new Date().getFullYear()} Cue Kit. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
