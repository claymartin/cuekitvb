import { Link, createFileRoute } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Route = createFileRoute('/about')({
  component: AboutPage,
})

function AboutPage() {
  return (
    <div>
      {/* ── INTRO ────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ background: '#F5F7FB', color: '#1E6FD8', border: '1px solid #1E6FD820' }}
          >
            About Cue Kit
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Why Cue Kit exists.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
            Cue Kit was built around a simple gap: athletes finish matches with real insight about what went wrong mentally, but have no structured way to convert that insight into a concrete plan for the next one. Drawing on self-regulated learning theory—forethought, performance, reflection—and research interviews with a sport psychology coach, Cue Kit closes that loop with a tool athletes actually use on court.
          </p>
        </div>
      </section>

      {/* ── RESEARCH ─────────────────────────────────────────────────── */}
      <section style={{ background: '#F5F7FB' }} className="py-20">
        <div className="max-w-4xl mx-auto px-5">
          <h2
            className="text-3xl md:text-4xl font-bold mb-12"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            What we know.
          </h2>

          <div className="space-y-6">
            {[
              {
                num: '01',
                color: '#1E6FD8',
                title: 'Reflection shapes readiness',
                body: 'Forethought quality depends on how an athlete interprets their last performance. Without honest reflection, pre-match plans are guesses. Structured journaling gives that reflection a place to go.',
              },
              {
                num: '02',
                color: '#F4A328',
                title: 'Mental routines fail when they feel forced',
                body: "Athletes stick with routines that feel personally useful and self-directed—not just evidence-based or coach-mandated. Cue Kit puts the athlete in the driver's seat. The plan comes from their own scores, not a generic template.",
              },
              {
                num: '03',
                color: '#5B3BAE',
                title: 'Good preparation needs structure and flexibility',
                body: 'Athletes need enough structure to avoid overload, and enough flexibility to adapt cues across opponents and emotional states. A single primary technique with an optional secondary keeps the plan simple without being rigid.',
              },
            ].map(({ num, color, title, body }) => (
              <div
                key={num}
                className="bg-white rounded-2xl p-8 flex gap-6 items-start"
                style={{ border: '1px solid #E5EAF0' }}
              >
                <div
                  className="text-3xl font-bold shrink-0 leading-none mt-0.5"
                  style={{
                    fontFamily: 'Barlow Semi Condensed, sans-serif',
                    color,
                    opacity: 0.22,
                    minWidth: 40,
                  }}
                >
                  {num}
                </div>
                <div>
                  <h3
                    className="text-xl font-bold mb-2"
                    style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
                  >
                    {title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TECHNIQUES LINK ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Curious about the techniques?
          </h2>
          <p className="text-gray-600 mb-8 leading-relaxed max-w-2xl">
            Each cue color is anchored in a specific mental-performance technique. See the full breakdown—when to use each color, example strategies, and why they work.
          </p>
          <Link
            to="/techniques"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#F5F7FB', color: '#1E6FD8', border: '1px solid #1E6FD820' }}
          >
            Explore the six techniques
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B3A' }} className="py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
          >
            See how the plan comes together.
          </h2>
          <p className="text-blue-200 mb-8">
            Enter your journal scores and get a cue plan in under two minutes. No login, no cost.
          </p>
          <Link
            to="/cue-plan"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-lg font-semibold transition-all hover:opacity-90 active:scale-95"
            style={{ backgroundColor: '#F4A328', color: '#0C1B3A' }}
          >
            Build a Cue Plan
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </div>
  )
}
