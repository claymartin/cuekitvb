import { useEffect, useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, CheckCircle, RotateCcw } from 'lucide-react'
import type { Plan } from '@/lib/cue-plan'
import { clearPlan, loadPlan } from '@/lib/cue-plan-store'

export const Route = createFileRoute('/cue-plan/results')({
  component: CuePlanResultsPage,
})

function CuePlanResultsPage() {
  const navigate = useNavigate()
  const [plan, setPlan] = useState<Plan | null | undefined>(undefined)

  useEffect(() => {
    const p = loadPlan()
    if (!p) {
      navigate({ to: '/cue-plan', replace: true })
      return
    }
    setPlan(p)
  }, [navigate])

  useEffect(() => {
    if (!plan) return
    const prevHtml = document.documentElement.style.backgroundColor
    const prevBody = document.body.style.backgroundColor
    document.documentElement.style.backgroundColor = plan.primary.color
    document.body.style.backgroundColor = plan.primary.color
    return () => {
      document.documentElement.style.backgroundColor = prevHtml
      document.body.style.backgroundColor = prevBody
    }
  }, [plan])

  if (plan === undefined) {
    return <div className="min-h-screen" style={{ background: '#0C1B3A' }} />
  }
  if (plan === null) return null

  const { primary } = plan
  const isLightTheme = isLightColor(primary.color)
  const deepBg = isLightTheme
    ? mix(primary.color, '#222222', 0.28)
    : mix(primary.color, '#000000', 0.58)
  const topBg = isLightTheme
    ? mix(primary.color, '#ffffff', 0.08)
    : mix(primary.color, '#ffffff', 0.04)
  const subtleBorder = withAlpha(primary.textColor, isLightTheme ? 0.28 : 0.3)
  const softText = withAlpha(primary.textColor, 0.96)
  const fadedText = withAlpha(primary.textColor, 0.78)
  const mutedText = withAlpha(primary.textColor, 0.74)

  // Glass panel tokens — neutral fill moves the interior luminance *away*
  // from textColor, keeping contrast AA+ across every theme.
  const glassFill = isLightTheme ? 'rgba(255,255,255,0.42)' : 'rgba(0,0,0,0.30)'
  const glassEdge = withAlpha(primary.textColor, 0.22)
  const glassEdgeStrong = withAlpha(primary.textColor, 0.42)
  const glassSheen = withAlpha(primary.textColor, 0.14)
  const glassDivider = withAlpha(primary.textColor, isLightTheme ? 0.18 : 0.14)
  const glassHighlight = withAlpha(primary.textColor, isLightTheme ? 0.35 : 0.18)

  const glassVars = {
    '--cue-glass-fill': glassFill,
    '--cue-glass-edge': glassEdge,
    '--cue-glass-edge-strong': glassEdgeStrong,
    '--cue-glass-sheen': glassSheen,
    '--cue-glass-divider': glassDivider,
    '--cue-glass-highlight': glassHighlight,
  } as React.CSSProperties

  function handleStartOver() {
    clearPlan()
    navigate({ to: '/cue-plan' })
  }

  return (
    <div
      className="relative overflow-hidden"
      style={{
        background: `linear-gradient(180deg, ${topBg} 0%, ${primary.color} 32%, ${deepBg} 100%)`,
        color: primary.textColor,
        minHeight: '100vh',
      }}
    >
      {/* Ambient accent glows */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 -left-32 w-[520px] h-[520px] rounded-full blur-3xl cue-plan-ambient"
        style={{
          background: primary.accentColor,
          opacity: 0.45,
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-[38%] -right-40 w-[480px] h-[480px] rounded-full blur-3xl cue-plan-ambient"
        style={{
          background: primary.softColor,
          opacity: 0.5,
          animationDelay: '-3s',
        }}
      />

      <div className="relative">
        {/* Top bar */}
        <div className="max-w-5xl mx-auto px-5 pt-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{ background: primary.textColor }}
            />
            <span
              className="text-xs font-semibold uppercase tracking-[0.25em]"
              style={{ color: fadedText }}
            >
              Cue Kit · {primary.strap}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Link
              to="/cue-plan"
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-3 py-1.5 transition-opacity hover:opacity-100"
              style={{
                color: primary.textColor,
                opacity: 0.9,
                background: withAlpha(primary.textColor, 0.12),
                border: `1px solid ${subtleBorder}`,
              }}
            >
              <ArrowLeft size={14} />
              Edit inputs
            </Link>
            <button
              onClick={handleStartOver}
              className="inline-flex items-center gap-2 text-sm font-semibold rounded-full px-3 py-1.5 transition-opacity hover:opacity-100"
              style={{
                color: primary.textColor,
                opacity: 0.9,
                background: withAlpha(primary.textColor, 0.12),
                border: `1px solid ${subtleBorder}`,
              }}
            >
              <RotateCcw size={14} />
              Start over
            </button>
          </div>
        </div>

        {/* Hero */}
        <section className="max-w-5xl mx-auto px-5 pt-10 md:pt-16 pb-14 md:pb-20 animate-fade-in-up">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em] mb-6"
            style={{ color: fadedText }}
          >
            Your cue for next match
          </p>

          <div className="flex items-baseline gap-4 md:gap-6 mb-6 flex-wrap">
            <span
              className="inline-block w-12 h-12 md:w-14 md:h-14 rounded-full shrink-0 cue-plan-hero-orb"
              style={{
                background: primary.textColor,
                '--hero-glow-soft': withAlpha(primary.textColor, 0.18),
                '--hero-glow-strong': withAlpha(primary.accentColor, 0.55),
              } as React.CSSProperties}
            />
            <h1
              className="font-bold leading-none"
              style={{
                fontFamily: 'Barlow Semi Condensed, sans-serif',
                fontSize: 'clamp(3.25rem, 10vw, 7rem)',
                color: primary.textColor,
                letterSpacing: '-0.03em',
              }}
            >
              {primary.name}
            </h1>
          </div>

          <p
            className="text-lg md:text-2xl max-w-2xl leading-snug font-medium"
            style={{ color: softText }}
          >
            {primary.description}
          </p>

          <div className="mt-8 flex items-center gap-3 flex-wrap text-sm">
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-semibold"
              style={{
                background: withAlpha(primary.textColor, 0.14),
                color: primary.textColor,
                border: `1px solid ${subtleBorder}`,
              }}
            >
              <span
                className="inline-block w-2.5 h-2.5 rounded-full"
                style={{ background: primary.textColor }}
              />
              {primary.strap}
            </span>
            <span
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold uppercase tracking-widest"
              style={{
                background: 'transparent',
                color: fadedText,
                border: `1px solid ${withAlpha(primary.textColor, 0.2)}`,
              }}
            >
              Glance down to recall this cue
            </span>
          </div>
        </section>

        {/* Body: one large glass panel with hairline-divided rows */}
        <section className="max-w-3xl mx-auto px-5 pb-24">
          <div className="cue-plan-glass animate-fade-in-up delay-100" style={glassVars}>
            <div className="cue-plan-glass-row">
              <SectionLabel color={fadedText}>Today you were mostly dealing with</SectionLabel>
              <p className="text-base md:text-lg leading-relaxed" style={{ color: softText }}>
                {plan.summary}
              </p>
              <ScoreStrip scores={plan.scores} textColor={primary.textColor} accent={fadedText} />
            </div>

            <div className="cue-plan-glass-row">
              <SectionLabel color={fadedText}>Why {primary.name.toLowerCase()}</SectionLabel>
              <p className="text-base leading-relaxed" style={{ color: softText }}>
                {plan.primaryReason}
              </p>
            </div>

            <div className="cue-plan-glass-row">
              <SectionLabel color={fadedText}>Before your next match</SectionLabel>
              <RoutineList items={plan.before} textColor={primary.textColor} softText={softText} />
            </div>

            <div className="cue-plan-glass-row">
              <SectionLabel color={fadedText}>During the match</SectionLabel>
              <RoutineList items={plan.during} textColor={primary.textColor} softText={softText} />
            </div>
          </div>

          {plan.secondary && plan.secondaryReason && (
            <div className="pt-8 animate-fade-in-up delay-500">
              <p
                className="text-xs font-semibold uppercase tracking-[0.25em] mb-3"
                style={{ color: fadedText }}
              >
                Optional secondary cue
              </p>

              <div className="cue-plan-glass" style={glassVars}>
                <div
                  className="cue-plan-glass-header"
                  style={{
                    background: plan.secondary.color,
                    color: plan.secondary.textColor,
                    borderTopLeftRadius: 'inherit',
                    borderTopRightRadius: 'inherit',
                  }}
                >
                  <p
                    className="text-2xl font-bold"
                    style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
                  >
                    {plan.secondary.name}
                  </p>
                  <p className="text-sm opacity-80">{plan.secondary.strap}</p>
                </div>
                <div className="cue-plan-glass-row">
                  <p className="text-sm leading-relaxed" style={{ color: softText }}>
                    {plan.secondaryReason}
                  </p>
                </div>
                {plan.secondaryBefore.length > 0 && (
                  <div className="cue-plan-glass-row">
                    <SectionLabel color={fadedText} size="small">
                      Before your next match
                    </SectionLabel>
                    <RoutineList
                      items={plan.secondaryBefore}
                      textColor={primary.textColor}
                      softText={softText}
                    />
                  </div>
                )}
                {plan.secondaryDuring.length > 0 && (
                  <div className="cue-plan-glass-row">
                    <SectionLabel color={fadedText} size="small">
                      During the match
                    </SectionLabel>
                    <RoutineList
                      items={plan.secondaryDuring}
                      textColor={primary.textColor}
                      softText={softText}
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="pt-8 flex flex-col sm:flex-row gap-3 animate-fade-in-up delay-600">
            <button
              onClick={handleStartOver}
              className="flex-1 py-3 rounded-xl text-sm font-semibold transition-all"
              style={{
                background: primary.textColor,
                color: primary.color,
              }}
            >
              Build another plan
            </button>
            <Link
              to="/cue-plan"
              className="flex-1 py-3 rounded-xl text-sm font-semibold text-center transition-all"
              style={{
                color: primary.textColor,
                background: 'transparent',
                border: `1px solid ${subtleBorder}`,
              }}
            >
              Back to inputs
            </Link>
          </div>

          <p
            className="pt-4 text-xs font-semibold uppercase tracking-[0.25em] text-center animate-fade-in-up delay-600"
            style={{ color: mutedText }}
          >
            Wear Your Game Plan
          </p>
        </section>
      </div>
    </div>
  )
}

// ── Presentational helpers ────────────────────────────────────────────────

function SectionLabel({
  children,
  color,
  size = 'default',
}: {
  children: React.ReactNode
  color: string
  size?: 'default' | 'small'
}) {
  return (
    <p
      className={`font-semibold uppercase tracking-[0.22em] ${
        size === 'small' ? 'text-[10px] mb-2' : 'text-xs mb-3'
      }`}
      style={{ color }}
    >
      {children}
    </p>
  )
}

function RoutineList({
  items,
  textColor,
  softText,
}: {
  items: string[]
  textColor: string
  softText: string
}) {
  return (
    <ul className="space-y-3">
      {items.map((line, i) => (
        <li
          key={i}
          className="flex gap-3 text-sm md:text-base leading-relaxed"
          style={{ color: softText }}
        >
          <CheckCircle size={16} className="shrink-0 mt-1" style={{ color: textColor }} />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  )
}

function ScoreStrip({
  scores,
  textColor,
  accent,
}: {
  scores: Plan['scores']
  textColor: string
  accent: string
}) {
  const entries: { label: string; value: number }[] = [
    { label: 'Confidence', value: scores.confidence },
    { label: 'Anxiety', value: scores.anxiety },
    { label: 'Focus', value: scores.focus },
    { label: 'Tension', value: scores.tension },
  ]
  return (
    <div
      className="mt-5 grid grid-cols-4 gap-3"
      style={{ borderTop: `1px solid ${withAlpha(textColor, 0.12)}`, paddingTop: '1rem' }}
    >
      {entries.map((e) => (
        <div key={e.label} className="flex flex-col items-start">
          <span
            className="text-[10px] font-semibold uppercase tracking-widest"
            style={{ color: accent }}
          >
            {e.label}
          </span>
          <span
            className="text-2xl font-bold"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: textColor }}
          >
            {e.value}
            <span className="text-sm font-medium" style={{ color: accent }}>
              /5
            </span>
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Color utilities ───────────────────────────────────────────────────────

function hexToRgb(hex: string): { r: number; g: number; b: number } {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const num = parseInt(full, 16)
  return { r: (num >> 16) & 255, g: (num >> 8) & 255, b: num & 255 }
}

function rgbToHex(r: number, g: number, b: number): string {
  const to = (n: number) => Math.round(n).toString(16).padStart(2, '0')
  return `#${to(r)}${to(g)}${to(b)}`
}

function mix(a: string, b: string, t: number): string {
  const ca = hexToRgb(a)
  const cb = hexToRgb(b)
  return rgbToHex(
    ca.r + (cb.r - ca.r) * t,
    ca.g + (cb.g - ca.g) * t,
    ca.b + (cb.b - ca.b) * t,
  )
}

function withAlpha(hex: string, alpha: number): string {
  const { r, g, b } = hexToRgb(hex)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function isLightColor(hex: string): boolean {
  const { r, g, b } = hexToRgb(hex)
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255
  return luminance > 0.6
}
