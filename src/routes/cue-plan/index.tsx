import { useMemo, useState } from 'react'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { ArrowLeft, ChevronRight } from 'lucide-react'
import {
  DEEP_DIVE_KEYS,
  type FlowAnswers,
  type Question,
  type Technique,
  VARIABLE_KEYS,
  VARIABLE_LABELS,
  VARIABLE_RATING_OPTIONS,
  type VariableKey,
  generatePlanFromFlow,
  getFlowQuestions,
} from '@/lib/cue-plan'
import { savePlan } from '@/lib/cue-plan-store'

export const Route = createFileRoute('/cue-plan/')({
  component: CuePlanInputsPage,
})

// Step 0 is the combined ratings screen that captures all four variable
// scores in one view. Steps 1+ are the adaptive deep-dive questions that
// follow. Any change to a rating clears every deep-dive answer because
// changing a score can shift which concern leads the plan.
function CuePlanInputsPage() {
  const navigate = useNavigate()
  const [answers, setAnswers] = useState<FlowAnswers>({})
  const [step, setStep] = useState(0)
  const [generating, setGenerating] = useState<Technique | null>(null)

  const questions = useMemo(() => getFlowQuestions(answers), [answers])
  const deepDiveCount = Math.max(1, questions.length - 4)
  const totalScreens = 1 + deepDiveCount

  const isRatingsScreen = step === 0
  const deepDiveIdx = step - 1
  const currentQuestion: Question | undefined = isRatingsScreen
    ? undefined
    : questions[4 + deepDiveIdx]

  function handleRatingSelect(variable: VariableKey, score: number) {
    const options = VARIABLE_RATING_OPTIONS[variable]
    const nextValue = options[score - 1]
    const previous = answers[variable]

    const nextAnswers: FlowAnswers = { ...answers, [variable]: nextValue }

    if (previous !== undefined && previous !== nextValue) {
      for (const key of DEEP_DIVE_KEYS) {
        delete nextAnswers[key]
      }
    }

    setAnswers(nextAnswers)
  }

  function handleRatingsContinue() {
    const allReady = VARIABLE_KEYS.every((k) => answers[k] !== undefined)
    if (!allReady) return
    setStep(1)
  }

  function handleDeepDiveSelect(value: string) {
    if (!currentQuestion) return
    const qid = currentQuestion.id
    const nextAnswers: FlowAnswers = { ...answers, [qid]: value }
    setAnswers(nextAnswers)

    const nextQuestions = getFlowQuestions(nextAnswers)
    const nextDeepDiveLen = Math.max(0, nextQuestions.length - 4)
    const isLastDeepDive = deepDiveIdx >= nextDeepDiveLen - 1

    if (isLastDeepDive) {
      const plan = generatePlanFromFlow(nextAnswers)
      savePlan(plan)
      setGenerating(plan.primary)
      window.setTimeout(() => {
        navigate({ to: '/cue-plan/results' })
      }, 850)
      return
    }

    window.setTimeout(() => setStep(step + 1), 220)
  }

  function handleBack() {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div>
      {generating && <GeneratingOverlay technique={generating} />}

      {/* Header */}
      <section className="py-14 bg-white border-b" style={{ borderColor: '#E5EAF0' }}>
        <div className="max-w-3xl mx-auto px-5">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4"
            style={{ background: '#F5F7FB', color: '#1E6FD8', border: '1px solid #1E6FD820' }}
          >
            No login required
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-4 leading-tight"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Build your cue plan.
          </h1>
          <p className="text-gray-600 text-lg max-w-xl">
            Start with four quick 1–5 ratings — easy to copy straight from your journal — then one short follow-up and you're done.
          </p>
        </div>
      </section>

      {/* Builder */}
      <section style={{ background: '#F5F7FB' }} className="py-12 min-h-screen">
        <div className="max-w-2xl mx-auto px-5">
          {isRatingsScreen ? (
            <RatingsCard
              answers={answers}
              stepIndex={step}
              totalScreens={totalScreens}
              onSelect={handleRatingSelect}
              onContinue={handleRatingsContinue}
            />
          ) : currentQuestion ? (
            <QuestionCard
              question={currentQuestion}
              value={answers[currentQuestion.id]}
              stepIndex={step}
              totalScreens={totalScreens}
              isLast={step >= totalScreens - 1}
              onSelect={handleDeepDiveSelect}
              onBack={handleBack}
            />
          ) : null}
        </div>
      </section>
    </div>
  )
}

function RatingsCard({
  answers,
  stepIndex,
  totalScreens,
  onSelect,
  onContinue,
}: {
  answers: FlowAnswers
  stepIndex: number
  totalScreens: number
  onSelect: (variable: VariableKey, score: number) => void
  onContinue: () => void
}) {
  const filled = VARIABLE_KEYS.filter((k) => answers[k] !== undefined).length
  const allReady = filled === VARIABLE_KEYS.length
  // Ratings screen is the first of `totalScreens`. Its own share of the
  // overall progress bar fills proportionally as ratings are selected.
  const percent = Math.round((filled / VARIABLE_KEYS.length) * (100 / totalScreens))

  return (
    <div
      className="bg-white rounded-2xl p-7 shadow-sm animate-fade-in-up"
      style={{ border: '1px solid #E5EAF0' }}
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Step {stepIndex + 1} of {totalScreens}
        </span>
        <span className="text-xs font-semibold text-gray-400">{percent}%</span>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden mb-6"
        style={{ background: '#E5EAF0' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #1E6FD8 0%, #F4A328 100%)',
          }}
        />
      </div>

      {/* Title */}
      <h2
        className="font-bold text-xl md:text-2xl leading-snug mb-2"
        style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
      >
        Rate yourself right now — 1 is low, 5 is high.
      </h2>
      <p className="text-sm text-gray-600 mb-6">
        Quick check on four things. Tap a number for each — copy straight from your journal if you have one.
      </p>

      {/* Four rating rows */}
      <div className="flex flex-col gap-5">
        {VARIABLE_KEYS.map((key) => {
          const value = answers[key]
          const selectedScore = value
            ? VARIABLE_RATING_OPTIONS[key].indexOf(value) + 1
            : null
          const meta = VARIABLE_LABELS[key]
          return (
            <div key={key}>
              <div className="flex items-baseline justify-between mb-2">
                <span
                  className="font-semibold text-sm md:text-base"
                  style={{ color: '#0C1B3A' }}
                >
                  {meta.label}
                </span>
                <span className="text-[11px] text-gray-500">
                  1 {meta.lowHint} · 5 {meta.highHint}
                </span>
              </div>
              <div
                role="radiogroup"
                aria-label={`${meta.label} rating`}
                className="grid grid-cols-5 gap-2"
              >
                {[1, 2, 3, 4, 5].map((n) => {
                  const selected = selectedScore === n
                  return (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      aria-label={`${meta.label} ${n}`}
                      onClick={() => onSelect(key, n)}
                      className="h-12 rounded-xl text-lg font-bold transition-all border hover:border-brand-blue"
                      style={{
                        background: selected ? '#1E6FD8' : '#F5F7FB',
                        borderColor: selected ? '#1E6FD8' : '#E5EAF0',
                        color: selected ? '#ffffff' : '#0C1B3A',
                      }}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* Continue */}
      <button
        type="button"
        onClick={onContinue}
        disabled={!allReady}
        className="mt-8 w-full h-12 rounded-xl font-semibold inline-flex items-center justify-center gap-2 transition-all"
        style={{
          background: allReady ? '#1E6FD8' : '#E5EAF0',
          color: allReady ? '#ffffff' : '#9CA3AF',
          cursor: allReady ? 'pointer' : 'not-allowed',
        }}
      >
        Continue
        <ChevronRight size={18} />
      </button>
      <p className="text-xs text-gray-400 mt-3 text-center">
        {allReady
          ? 'Ready — one short follow-up next.'
          : `Pick ${VARIABLE_KEYS.length - filled} more to continue.`}
      </p>
    </div>
  )
}

function QuestionCard({
  question,
  value,
  stepIndex,
  totalScreens,
  isLast,
  onSelect,
  onBack,
}: {
  question: Question
  value: string | undefined
  stepIndex: number
  totalScreens: number
  isLast: boolean
  onSelect: (value: string) => void
  onBack?: () => void
}) {
  const completed = Math.min(stepIndex + (value !== undefined ? 1 : 0), totalScreens)
  const percent = Math.round((completed / totalScreens) * 100)

  return (
    <div
      key={question.id}
      className="bg-white rounded-2xl p-7 shadow-sm animate-fade-in-up"
      style={{ border: '1px solid #E5EAF0' }}
    >
      {/* Progress */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-500">
          Step {stepIndex + 1} of {totalScreens}
        </span>
        <span className="text-xs font-semibold text-gray-400">{percent}%</span>
      </div>
      <div
        className="h-1.5 w-full rounded-full overflow-hidden mb-6"
        style={{ background: '#E5EAF0' }}
      >
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: 'linear-gradient(90deg, #1E6FD8 0%, #F4A328 100%)',
          }}
        />
      </div>

      {/* Question */}
      <h2
        className="font-bold text-xl md:text-2xl leading-snug mb-6"
        style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
      >
        {question.text}
      </h2>

      {/* Options */}
      <div className="flex flex-col gap-2.5">
        {question.options.map((opt) => {
          const selected = value === opt
          return (
            <button
              key={opt}
              onClick={() => onSelect(opt)}
              className="flex items-center gap-3 w-full text-left px-4 py-3.5 rounded-xl text-sm md:text-base font-medium transition-all border hover:border-brand-blue"
              style={{
                background: selected ? '#1E6FD810' : '#F5F7FB',
                borderColor: selected ? '#1E6FD8' : '#E5EAF0',
                color: '#0C1B3A',
              }}
            >
              <span
                className="w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center"
                style={{
                  borderColor: selected ? '#1E6FD8' : '#CBD5E1',
                  background: selected ? '#1E6FD8' : 'transparent',
                }}
              >
                {selected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
              </span>
              <span className="flex-1">{opt}</span>
              {selected && isLast && <ChevronRight size={16} style={{ color: '#1E6FD8' }} />}
            </button>
          )
        })}
      </div>

      {/* Footer */}
      <div className="mt-6 flex items-center justify-between">
        {onBack ? (
          <button
            onClick={onBack}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
          >
            <ArrowLeft size={14} />
            Back
          </button>
        ) : (
          <span />
        )}
        <span className="text-xs text-gray-400">
          {isLast ? 'Pick one to see your cue plan' : 'Pick one to continue'}
        </span>
      </div>
    </div>
  )
}

function GeneratingOverlay({ technique }: { technique: Technique }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center animate-fade-in"
      style={{
        background: technique.color,
        color: technique.textColor,
      }}
      role="status"
      aria-live="polite"
    >
      <div className="flex flex-col items-center gap-6 px-6 text-center">
        <span
          className="inline-block w-20 h-20 rounded-full cue-plan-generating-orb"
          style={{
            background: technique.textColor,
            boxShadow: `0 0 0 10px ${hexToRgba(technique.textColor, 0.18)}`,
          }}
        />
        <div className="space-y-1">
          <p
            className="text-xs font-semibold uppercase tracking-[0.3em]"
            style={{ color: hexToRgba(technique.textColor, 0.78) }}
          >
            Building your plan
          </p>
          <p
            className="text-3xl md:text-4xl font-bold"
            style={{
              fontFamily: 'Barlow Semi Condensed, sans-serif',
              letterSpacing: '-0.02em',
            }}
          >
            {technique.name}
          </p>
        </div>
      </div>
    </div>
  )
}

function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const num = parseInt(full, 16)
  const r = (num >> 16) & 255
  const g = (num >> 8) & 255
  const b = num & 255
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}
