import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, Home, Info, Palette, Menu, X } from 'lucide-react'

export default function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-5 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <img
            src="/ck-logo.png"
            alt="Cue Kit logo"
            className="h-9 w-9 object-contain"
          />
          <span
            className="text-xl font-bold tracking-tight"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            CUE<span style={{ color: '#F4A328' }}>KIT</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors"
          >
            <Home size={16} aria-hidden="true" />
            Home
          </Link>
          <Link
            to="/about"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors"
          >
            <Info size={16} aria-hidden="true" />
            About
          </Link>
          <Link
            to="/techniques"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-brand-navy transition-colors"
          >
            <Palette size={16} aria-hidden="true" />
            Techniques
          </Link>
          <Link
            to="/cue-plan"
            className="ml-2 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#F4A328', color: '#0C1B3A' }}
          >
            Build your cue plan
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-md text-gray-600 hover:text-brand-navy"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="max-w-6xl mx-auto px-5 py-4 flex flex-col gap-4">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-base font-medium text-gray-700 hover:text-brand-navy"
              onClick={() => setOpen(false)}
            >
              <Home size={18} aria-hidden="true" />
              Home
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-base font-medium text-gray-700 hover:text-brand-navy"
              onClick={() => setOpen(false)}
            >
              <Info size={18} aria-hidden="true" />
              About
            </Link>
            <Link
              to="/techniques"
              className="inline-flex items-center gap-2 text-base font-medium text-gray-700 hover:text-brand-navy"
              onClick={() => setOpen(false)}
            >
              <Palette size={18} aria-hidden="true" />
              Techniques
            </Link>
            <Link
              to="/cue-plan"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
              style={{ backgroundColor: '#F4A328', color: '#0C1B3A' }}
              onClick={() => setOpen(false)}
            >
              Build your cue plan
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
