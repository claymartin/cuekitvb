import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight, CheckCircle, ChevronDown } from 'lucide-react'

const ctaPrimaryClasses =
  'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-95'
const ctaPrimaryStyle = { backgroundColor: '#F4A328', color: '#0C1B3A' }

export const Route = createFileRoute('/')({
  component: HomePage,
})

const CUE_COLORS = [
  {
    key: 'blue',
    color: '#1E6FD8',
    textColor: '#fff',
    name: 'Breathing',
    tagline: 'Calm your body and reset after mistakes.',
  },
  {
    key: 'yellow',
    color: '#F5C842',
    textColor: '#0C1B3A',
    name: 'Imagery',
    tagline: 'Picture yourself executing plays before they happen.',
  },
  {
    key: 'orange',
    color: '#F4A328',
    textColor: '#0C1B3A',
    name: 'Self-Talk',
    tagline: 'Use short phrases to boost confidence and cut negative thoughts.',
  },
  {
    key: 'purple',
    color: '#5B3BAE',
    textColor: '#fff',
    name: 'Focus Cues',
    tagline: 'Lock attention onto the one thing that matters this rally.',
  },
  {
    key: 'black',
    color: '#222222',
    textColor: '#fff',
    name: 'Muscle Relaxation',
    tagline: 'Release tension so your body moves freely.',
  },
  {
    key: 'white',
    color: '#FFFFFF',
    textColor: '#222222',
    border: true,
    name: 'Reset Routine',
    tagline: 'Flush the last point and start the next one clean.',
  },
]

function MockupDevice() {
  const primaryColor = '#F4A328'
  const primaryText = '#0C1B3A'
  const deepBg = '#B97A1A'
  const surfaceBg = 'rgba(12,27,58,0.10)'
  const subtleBorder = 'rgba(12,27,58,0.28)'
  const softText = 'rgba(12,27,58,0.96)'
  const fadedText = 'rgba(12,27,58,0.70)'

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-2xl"
      style={{ border: '1px solid #E5EAF0' }}
    >
      <div
        className="px-3 py-2 flex gap-1.5 items-center"
        style={{ background: '#E5EAF0' }}
      >
        <span className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <span className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      <div
        className="p-5 space-y-4"
        style={{
          background: `linear-gradient(180deg, ${primaryColor} 0%, ${primaryColor} 32%, ${deepBg} 100%)`,
          color: primaryText,
        }}
      >
        <p
          className="text-[9px] font-semibold uppercase tracking-[0.25em]"
          style={{ color: fadedText }}
        >
          Your cue for next match
        </p>

        <div className="flex items-baseline gap-2.5">
          <span
            className="inline-block w-5 h-5 rounded-full shrink-0"
            style={{
              background: primaryText,
              boxShadow: '0 0 0 3px rgba(255,255,255,0.15)',
            }}
          />
          <h4
            className="font-bold leading-none"
            style={{
              fontFamily: 'Barlow Semi Condensed, sans-serif',
              fontSize: '28px',
              letterSpacing: '-0.02em',
            }}
          >
            Self-Talk
          </h4>
        </div>

        <p className="text-[11px] leading-snug" style={{ color: softText }}>
          Short self-talk cues give you something concrete to return to and interrupt overthinking before it takes hold.
        </p>

        <span
          className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] font-semibold"
          style={{
            background: 'rgba(255,255,255,0.14)',
            border: `1px solid ${subtleBorder}`,
            color: primaryText,
          }}
        >
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: primaryText }}
          />
          Orange strap
        </span>

        <div
          className="rounded-xl p-3 backdrop-blur-sm"
          style={{ background: surfaceBg, border: `1px solid ${subtleBorder}` }}
        >
          <p
            className="text-[9px] font-semibold uppercase tracking-[0.22em] mb-2"
            style={{ color: fadedText }}
          >
            Before your next match
          </p>
          <ul className="space-y-1.5">
            {['Write one self-talk cue for serve receive.', 'Clip the Orange strap to your laces.'].map((b) => (
              <li
                key={b}
                className="flex gap-1.5 text-[11px] leading-snug"
                style={{ color: softText }}
              >
                <CheckCircle size={11} className="shrink-0 mt-0.5" style={{ color: primaryText }} />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>

        <div
          className="rounded-xl p-3 backdrop-blur-sm"
          style={{ background: surfaceBg, border: `1px solid ${subtleBorder}` }}
        >
          <p
            className="text-[9px] font-semibold uppercase tracking-[0.22em] mb-2"
            style={{ color: fadedText }}
          >
            During the match
          </p>
          <ul className="space-y-1.5">
            {['Glance at the orange clip after a mistake and repeat your cue.', 'One phrase, one breath, ready.'].map((d) => (
              <li
                key={d}
                className="flex gap-1.5 text-[11px] leading-snug"
                style={{ color: softText }}
              >
                <CheckCircle size={11} className="shrink-0 mt-0.5" style={{ color: primaryText }} />
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function ShoeStrap() {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col items-center gap-3 shadow-md"
      style={{ background: '#0C1B3A' }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest text-blue-300">
        Wear your gameplan
      </p>
      <div className="flex gap-2.5 items-end">
        {['#1E6FD8', '#F4A328', '#222222', '#5B3BAE'].map((c, i) => (
          <div
            key={c}
            className="rounded-full shadow-md"
            style={{
              background: c,
              width: 14 + i * 2,
              height: 40 + i * 4,
            }}
          />
        ))}
      </div>
      <p className="text-[11px] text-blue-400 text-center max-w-[180px]">
        One glance down, the color reminds you which cue to use
      </p>
    </div>
  )
}

function HomePage() {
  return (
    <div>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28" style={{ background: '#fff' }}>
        <div className="max-w-6xl mx-auto px-5 grid md:grid-cols-2 gap-10 md:gap-14 items-center">
          <div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5 animate-fade-in"
              style={{ background: '#F5F7FB', color: '#1E6FD8', border: '1px solid #1E6FD820' }}
            >
              Mental performance for college volleyball
            </span>
            <h1
              className="text-5xl md:text-6xl font-bold leading-[1.05] mb-5 animate-fade-in-up"
              style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
            >
              Struggle mentally during matches?
            </h1>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed animate-fade-in-up delay-100">
              Cue Kit turns post match reflections into a single color coded shoe strap. The strap has one job: make mental cues easy to recall in the middle of a match, so you can look down, remember, and move on.
            </p>
            <div className="flex flex-wrap gap-4 animate-fade-in-up delay-200">
              <Link
                to="/cue-plan"
                className={ctaPrimaryClasses}
                style={ctaPrimaryStyle}
              >
                Build your cue plan
                <ArrowRight size={16} />
              </Link>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:bg-gray-50"
                style={{ color: '#1E6FD8', border: '1.5px solid #1E6FD8' }}
              >
                How Cue Kit works
                <ChevronDown size={16} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4 animate-fade-in-up delay-300 w-full max-w-md mx-auto md:mx-0 md:ml-auto">
            <MockupDevice />
            <ShoeStrap />
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────────────────── */}
      <section id="how-it-works" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 text-center"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Three pieces, one loop.
          </h2>
          <p className="text-center text-gray-500 mb-14">Reflect. Plan. Recall.</p>

          <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
            <div className="order-2 md:order-1">
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-3"
                style={{ color: '#1E6FD8' }}
              >
                The Cue Kit journal
              </p>
              <h3
                className="text-2xl md:text-3xl font-bold mb-4"
                style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
              >
                Start with the journal.
              </h3>
              <p className="text-gray-600 leading-relaxed">
                The Cue Kit journal is where every game plan begins. Rate your confidence, anxiety, focus, and tension after each practice or match, then note the moments that shaped them. Those reflections become the raw material for your next cue plan.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div
                className="rounded-2xl overflow-hidden shadow-2xl max-w-sm w-full"
                style={{ background: '#0C1B3A' }}
              >
                <img
                  src="/cuekit-journal.jpg"
                  alt="Cue Kit journal — Wear Your Game Plan"
                  className="w-full h-auto block"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {[
              {
                step: '01',
                color: '#1E6FD8',
                title: 'Reflect in your journal',
                body: 'After practices or matches, athletes spend 3–5 minutes rating confidence, anxiety, focus, and physical tension from 1–5 and noting key moments.',
              },
              {
                step: '02',
                color: '#F4A328',
                title: 'Build your cue plan',
                body: 'On match day, they enter those scores, answer a few quick questions, and get one primary mental technique plus a simple routine.',
              },
              {
                step: '03',
                color: '#5B3BAE',
                title: 'Recall the cue on court',
                body: 'A color-coded shoe strap sits in your line of sight. Between points, one glance at the color is enough to recall the technique and reset for the next rally.',
              },
            ].map(({ step, color, title, body }) => (
              <div key={step} className="relative">
                <div
                  className="text-5xl font-bold mb-4 leading-none"
                  style={{
                    fontFamily: 'Barlow Semi Condensed, sans-serif',
                    color,
                    opacity: 0.18,
                  }}
                >
                  {step}
                </div>
                <h3
                  className="text-xl font-bold mb-2"
                  style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
                >
                  {title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">{body}</p>
                <div className="mt-5 h-1 rounded-full" style={{ background: color, width: 40 }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CUE COLORS ───────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B3A' }} className="py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2
            className="text-3xl md:text-4xl font-bold mb-3 text-white text-center"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
          >
            Your cue colors.
          </h2>
          <p className="text-blue-300 text-center mb-12">Six techniques. One strap. Infinite recall.</p>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {CUE_COLORS.map(({ key, color, textColor, name, tagline, border }) => (
              <div
                key={key}
                className="rounded-2xl p-6 flex flex-col gap-2 transition-transform hover:-translate-y-0.5"
                style={{
                  background: color,
                  color: textColor,
                  border: border ? '1.5px solid #ddd' : undefined,
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    className="text-xl font-bold"
                    style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
                  >
                    {name}
                  </span>
                  <span
                    className="w-4 h-4 rounded-full border-2"
                    style={{
                      background: color,
                      borderColor: textColor === '#fff' ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)',
                    }}
                  />
                </div>
                <p className="text-sm opacity-80 leading-snug">{tagline}</p>
                <a
                  href="/techniques"
                  className="mt-1 text-xs font-semibold underline underline-offset-2 opacity-60 hover:opacity-100 w-fit"
                >
                  Learn more
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PERSONA ──────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-5">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Built around real players like Alexis.
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <div
                className="rounded-2xl p-8"
                style={{ background: '#F5F7FB', border: '1px solid #E5EAF0' }}
              >
                <p
                  className="text-xs font-semibold uppercase tracking-widest mb-4"
                  style={{ color: '#1E6FD8' }}
                >
                  Player profile
                </p>
                <p
                  className="text-2xl font-bold mb-3"
                  style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
                >
                  Alexis, collegiate libero
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Alexis tends to overthink after early passing errors. She notices tension building in her legs during serve receive, and struggles to reset between points when the team is down.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-gray-700 leading-relaxed">
                After a tough road loss, Alexis spent five minutes in her journal rating her confidence at 2 and her physical tension at 4. The next morning, she opened the Cue Plan Builder, entered her scores, and answered a few questions about where her anxiety shows up most.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Her plan came back: orange strap for self-talk, with black as a secondary for leg tension. She wrote one phrase on her wrist and clipped the straps. By the third set of the next match, she was glancing at her laces instead of the scoreboard.
              </p>
              <div className="flex gap-2 mt-2">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{ background: '#F4A328', color: '#0C1B3A' }}
                >
                  Orange — Self-Talk
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                  style={{ background: '#222222' }}
                >
                  Black — Relaxation
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F7FB' }} className="py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Recall your gameplan in the moment.
          </h2>
          <p className="text-gray-600 mb-8">
            Enter today's scores, answer a few quick questions, and leave with one phrase and one color on your laces — a simple recall cue you can use on the next rally.
          </p>
          <Link
            to="/cue-plan"
            className={ctaPrimaryClasses}
            style={ctaPrimaryStyle}
          >
            Build your cue plan
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
