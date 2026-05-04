import { Link, createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export const Route = createFileRoute('/techniques')({
  component: TechniquesPage,
})

type Strategy = {
  title: string
  how: string
  why: string
}

type Technique = {
  key: string
  color: string
  textColor: string
  accent: string
  border?: boolean
  name: string
  tagline: string
  what: string
  when: string
  strategies: Strategy[]
}

const TECHNIQUES: Technique[] = [
  {
    key: 'blue',
    color: '#1E6FD8',
    textColor: '#ffffff',
    accent: '#7FB3F0',
    name: 'Breathing',
    tagline: 'Deliberate, paced breathing to regulate arousal.',
    what:
      'Paced diaphragmatic breathing is a deliberate, slow breathing pattern — typically with an exhale that is longer than the inhale (for example, 4 counts in and 6 out) — used to downshift the autonomic nervous system. Lehrer and colleagues (2014) and subsequent sport-psychology research show that slow breathing increases heart-rate variability and activates the parasympathetic ("rest and digest") response, which directly counteracts the fight-or-flight activation athletes feel as pre-match anxiety.',
    when: 'Elevated anxiety, a racing heart, shallow chest breathing, or carry-over from a string of errors.',
    strategies: [
      {
        title: 'Box breathing (4-4-4-4) during warmup',
        how: 'Inhale four counts, hold four, exhale four, hold four. Repeat for about two minutes while lacing shoes.',
        why: 'Used by U.S. Navy SEAL training and featured in applied sport-psych protocols, box breathing stabilizes respiratory rhythm before adrenaline fixes it into a fast, shallow pattern. The equal phases give the nervous system a predictable baseline to return to.',
      },
      {
        title: '4-in / 6-out between points',
        how: 'Between rallies, inhale through the nose for four counts and exhale through pursed lips for six.',
        why: 'An exhale longer than the inhale is the single most reliable input for vagal-nerve activation, which drops heart rate within seconds (Russo et al., 2017). This is why it is the go-to pattern in both clinical anxiety treatment and performance settings.',
      },
      {
        title: 'One slow breath after every error',
        how: 'After a missed play, glance at the blue strap and take one full slow exhale before stepping back into position.',
        why: 'A single paced breath functions as a psychological "reset signal." It marks the end of the prior rally, so arousal from that point does not stack onto the next — a mechanism known as error carry-over, which is well-documented in racket-sport and volleyball performance research.',
      },
      {
        title: 'Paced breathing during opponent warmup',
        how: 'While the other team warms up, match your breath to a slow internal count and keep your attention on your own side.',
        why: 'Shifting attention from external threat cues (their biggest hitter, their serve) to your own internal breath cycle reduces anticipatory anxiety. It also primes the parasympathetic system before the first whistle, so you begin the match nearer your optimal arousal zone.',
      },
    ],
  },
  {
    key: 'yellow',
    color: '#F5C842',
    textColor: '#0C1B3A',
    accent: '#B8901F',
    name: 'Imagery',
    tagline: 'Vividly rehearse the play before it happens.',
    what:
      'Mental imagery is the deliberate, multi-sensory rehearsal of a skill, situation, or outcome in the mind. A meta-analysis of 133 studies (Driskell, Copper & Moran, 1994) and later work on the PETTLEP model (Holmes & Collins, 2001) show that imagery activates many of the same motor and cognitive pathways as physical practice. When imagery is vivid, task-relevant, and performed from the athlete\'s own perspective, it measurably improves skill execution and confidence.',
    when: 'Pre-match preparation, learning or refining a specific skill, or rehearsing for a known-tough opponent.',
    strategies: [
      {
        title: 'Pre-match skill rehearsal (first-person)',
        how: 'In the five minutes before warmup, close your eyes and run three clean reps of your serve, pass, and attack — seeing the court through your own eyes, feeling the contact, hearing the ball.',
        why: 'First-person (internal) imagery recruits the motor cortex more strongly than third-person imagery, which is why PETTLEP-based protocols specifically prescribe it for technical skills. The goal is "functional equivalence" — your brain treats the rehearsal like real practice.',
      },
      {
        title: 'Scenario rehearsal for known challenges',
        how: 'Picture the opponent\'s best hitter swinging at you and see yourself taking the hit cleanly and transitioning forward.',
        why: 'Pre-imagined challenges lose their surprise value. Research on stress inoculation in sport (Hanton et al., 2008) shows rehearsing anticipated threats reduces their emotional intensity when they actually occur, so you respond rather than react.',
      },
      {
        title: 'Role imagery, not just skill imagery',
        how: 'Picture yourself calling the ball early, communicating in the seam, and getting to base on time — your full job on the court, not just the highlight touches.',
        why: 'Cumming and Williams (2012) distinguish between skill and strategy imagery. Rehearsing your role keeps you anchored to team patterns under pressure, so attention does not drift toward "hero plays" when the score gets tight.',
      },
      {
        title: 'Positive replay after a clean rep',
        how: 'After a good pass or kill, take three seconds to replay the movement exactly as it happened before the next serve.',
        why: 'Consolidation research suggests a short replay strengthens the motor trace of the just-performed skill. Rehearsing the win instead of the miss loads the next attempt with the movement pattern you want to repeat.',
      },
    ],
  },
  {
    key: 'orange',
    color: '#F4A328',
    textColor: '#0C1B3A',
    accent: '#9B5E0F',
    name: 'Self-Talk',
    tagline: 'Short cue phrases that direct attention and confidence.',
    what:
      'Self-talk is the internal or spoken dialogue athletes direct at themselves. A meta-analysis by Hatzigeorgiadis, Zourbanos, Galanis and Theodorakis (2011) across 32 studies found that structured self-talk reliably improves performance across a range of sports. Researchers distinguish two effective types: instructional self-talk (technique-focused cues such as "see seam, full swing") and motivational self-talk (effort- and confidence-focused phrases such as "I trust this rep"). Both work best when phrases are short, specific, and rehearsed in advance.',
    when: 'Low confidence, a negative or critical inner voice, or tightening up when people are watching.',
    strategies: [
      {
        title: 'One instructional cue per role',
        how: 'Write a short technical cue for each of your touches — for example, "early feet, strong platform" for serve receive and "see seam, full swing" for attacking.',
        why: 'Instructional self-talk narrows attention to one relevant technical focus per action. This directly replaces the default post-mistake pattern of replaying the error, which research links to longer recovery times and subsequent performance drops.',
      },
      {
        title: '"Next ball" as a motivational reset',
        how: 'After any missed play, glance at the orange strap and say "next ball" silently before the next whistle.',
        why: 'A two-word motivational cue is short enough to complete between serves and long enough to interrupt rumination. Hatzigeorgiadis and colleagues report the largest effect sizes for motivational self-talk on tasks requiring fast recovery from errors, which matches this use case.',
      },
      {
        title: 'Reframe, do not argue',
        how: 'If "I can do it in practice, not in games" shows up, swap it for "I have hit this a thousand times — this is rep 1,001."',
        why: 'Cognitive reframing (from Beck\'s cognitive therapy, adapted for sport by Meichenbaum) is more effective than trying to suppress the thought. A factually true replacement phrase is harder for the inner critic to argue with than a purely positive affirmation.',
      },
      {
        title: 'External self-talk to teammates',
        how: 'Call the ball, call the seam, call "mine" and "yours" — verbally, even when the play seems obvious.',
        why: 'Speaking out loud is a form of externalized self-talk that also cues teammates. When confidence dips, the first thing that goes quiet is the athlete\'s voice; staying verbal keeps both the individual and the team in sync.',
      },
    ],
  },
  {
    key: 'purple',
    color: '#5B3BAE',
    textColor: '#ffffff',
    accent: '#B5A0ED',
    name: 'Focus Cues',
    tagline: 'One specific external target per rally.',
    what:
      'Focus cues are short prompts that direct attention to a single, task-relevant external target for the next action. Gabriele Wulf\'s extensive research on the constrained-action hypothesis (summarized in Wulf, 2013) shows that an external focus — on the outcome of the movement or a relevant feature of the environment (the ball, the setter\'s hips) — produces faster, more accurate, and more automatic motor performance than an internal focus on the body itself. In team sports, a single cue per play outperforms multi-item reminders because attention is a limited resource.',
    when: 'Scattered attention, pressure from the scoreboard or crowd, or too many coaching reminders competing at once.',
    strategies: [
      {
        title: 'One cue per rally — never a list',
        how: 'Pick a single focus for each point — for example, "watch the setter\'s hips," "first move on read," or "see the ball, hear the court." Repeat it silently before the serve.',
        why: 'Attention capacity is narrow (Kahneman, 1973). Holding multiple reminders splits attention and tends to degrade performance. A single cue gives the motor system an unambiguous target to act on.',
      },
      {
        title: 'Keep the focus external',
        how: 'Aim cues at objects and opponents — the ball, the setter, the seam — rather than your own body parts.',
        why: 'Wulf\'s meta-analyses repeatedly show external-focus cues produce better accuracy, balance, and force production than internal cues such as "bend your knees." The brain runs movement more automatically when you are not monitoring your own body.',
      },
      {
        title: 'Make the cue physically visible',
        how: 'Write the cue on the inside of your wrist, or let the purple strap act as the visual trigger between points.',
        why: 'Visual anchors reduce the cognitive load of remembering to use the cue. Between points — the exact moment focus tends to slip — your eye already has a target to land on, so the cue is recalled passively rather than actively.',
      },
      {
        title: 'Positional cue when the body feels lost',
        how: 'Use "base, read, move" — feet to base, eyes to the hitter, step on contact.',
        why: 'A three-part positional cue provides an ordered external checklist your body can run without deliberation. When attention fragments, movement pulls the mind back faster than effort alone.',
      },
    ],
  },
  {
    key: 'black',
    color: '#222222',
    textColor: '#ffffff',
    accent: '#A1A1A1',
    name: 'Muscle Relaxation',
    tagline: 'Release unnecessary tension so the body moves freely.',
    what:
      'Progressive muscle relaxation (PMR), developed by Edmund Jacobson (1938) and later shortened for applied settings by Bernstein and Borkovec, teaches the body to recognize and drop excess muscle tension. In sport settings, a brief release-only variant is used before and between plays: the athlete scans for tightness and consciously lets it go. Research (e.g., Öst, 1987; applied sport-psych adaptations) shows PMR reliably lowers somatic anxiety and improves movement economy.',
    when: 'Physical tension in the shoulders, legs, hands, or jaw — especially during serve-receive pressure or late-set fatigue.',
    strategies: [
      {
        title: 'Head-to-toe tension scan during warmup',
        how: 'Run a slow scan from jaw to feet. Wherever you find tightness, contract for two seconds and release.',
        why: 'Jacobson\'s core insight is that most athletes cannot release tension they do not notice. A scan surfaces the hot spots while there is still time to drop them, so the match does not start with the shoulders already up.',
      },
      {
        title: 'Shake-outs between points',
        how: 'Between every point, shake your legs loose, unclench your toes inside your shoes, and let your knees soften before getting into ready position.',
        why: 'Short, repeatable releases prevent carried tension from compounding across a set. Tight muscles shorten stride length and slow reaction time, both of which are decisive in defensive volleyball plays.',
      },
      {
        title: 'Soft hands before contact',
        how: 'Before every platform or set, unclench your fingers and let your forearms drop for a single count.',
        why: 'Tense hands produce stiff contact — research on ball-sport kinematics links grip tension to reduced absorption on the platform, which is the mechanical cause of "overpass" passes and inconsistent set heights.',
      },
      {
        title: 'Drop jaw and shoulders after errors',
        how: 'After a missed key play, consciously let your jaw fall and your shoulders drop before the next rally.',
        why: 'The jaw and upper trapezius are among the first places frustration registers physically. Releasing them is a fast body-first signal that the point is over, which (per embodied-cognition research) also tends to soften the matching emotional response.',
      },
    ],
  },
  {
    key: 'white',
    color: '#FFFFFF',
    textColor: '#222222',
    accent: '#7A7A7A',
    border: true,
    name: 'Reset Routine',
    tagline: 'A consistent ritual to close one point and open the next.',
    what:
      'A reset routine is a short, pre-rehearsed sequence used between plays to end one point and prepare cleanly for the next. Research on pre-performance and between-point routines (Cotterill, 2010; Lidor & Mayan, 2005) consistently finds that consistent routines reduce error carry-over, stabilize performance under pressure, and free working memory from having to improvise under stress. Effective routines share three features: they are brief, repeatable, and the same every time.',
    when: 'After unforced errors, momentum swings, called timeouts, or any sequence that puts the score in the athlete\'s head.',
    strategies: [
      {
        title: 'Three-step reset: breathe, move, refocus',
        how: 'One slow exhale, one physical move (shake out or quick step), one cue word for the next play — in that order, every time.',
        why: 'Each step closes a different loop: breath regulates the body, movement discharges carried tension, and the cue sets attention. Running them as a fixed sequence turns what would be three separate decisions into one ritual.',
      },
      {
        title: 'Physical anchor gesture',
        how: 'Tap the strap, tug the jersey, or touch the court line — the same gesture, every time, at the moment you decide the last point is done.',
        why: 'A consistent motor action functions as a conditioned trigger (classical conditioning applied to sport routines). When the mind struggles to step forward, the hand can, and the body tends to pull the mind behind it.',
      },
      {
        title: 'Use on momentum swings, not just errors',
        how: 'Run the reset after a run of opposing points, a timeout called against your team, or a referee-disputed call.',
        why: 'Momentum research (Adler, 1981; Iso-Ahola & Dotson, 2014) shows runs tend to extend when emotional reactions to the previous points leak into the next. A reset at the exact moment of the swing stops the run from becoming the story of the set.',
      },
      {
        title: 'Do not improvise under pressure',
        how: 'Keep the sequence identical through warmup, regular play, timeouts, and tiebreakers. Do not shorten or change it under stress.',
        why: 'Cotterill (2010) found that athletes who modify their routines under pressure lose the routine\'s stabilizing effect exactly when it is most needed. Consistency is the mechanism — not the specific steps — so change the routine in training, not mid-match.',
      },
    ],
  },
]

function TechniquesPage() {
  const [activeKey, setActiveKey] = useState<string>(TECHNIQUES[0].key)
  const active = TECHNIQUES.find((t) => t.key === activeKey) ?? TECHNIQUES[0]

  return (
    <div>
      {/* ── HERO / VALUE PROP ────────────────────────────────────────── */}
      <section className="py-20 md:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-5">
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-5"
            style={{ background: '#F5F7FB', color: '#1E6FD8', border: '1px solid #1E6FD820' }}
          >
            The Techniques
          </span>
          <h1
            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Six researched mental-performance methods, one strap each.
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mb-8">
            Each cue color is tied to a specific technique that has been studied in sport and performance psychology for decades. The page below explains what each method is, how to use it, and why it helps — so when you glance at the strap on your laces, you know exactly what you are recalling and why it works.
          </p>
          <div
            className="rounded-2xl p-6 md:p-7"
            style={{ background: '#F5F7FB', border: '1px solid #E5EAF0' }}
          >
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: '#1E6FD8' }}
            >
              What you get from this page
            </p>
            <ul className="space-y-2.5">
              {[
                'A plain-language definition of each method, grounded in published research.',
                'Four practical ways to use it in a match or practice.',
                'The mechanism behind each — the reason it actually changes performance.',
              ].map((line) => (
                <li key={line} className="flex gap-3 items-start text-gray-700">
                  <CheckCircle2
                    size={18}
                    className="shrink-0 mt-0.5"
                    style={{ color: '#1E6FD8' }}
                  />
                  <span className="text-sm md:text-base leading-relaxed">{line}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── COLOR TABS (sticky) ──────────────────────────────────────── */}
      <div
        className="sticky top-16 z-40 border-b border-gray-200"
        style={{ background: '#F5F7FB' }}
      >
        <div className="max-w-6xl mx-auto px-5 py-4">
          <p className="text-xs font-semibold uppercase tracking-widest mb-3 text-gray-500">
            Pick a color
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1"
            role="tablist"
            aria-label="Technique colors"
          >
            {TECHNIQUES.map(({ key, color, textColor, name, border }) => {
              const isActive = key === activeKey
              return (
                <button
                  key={key}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${key}`}
                  id={`tab-${key}`}
                  onClick={() => setActiveKey(key)}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all active:scale-95 shrink-0"
                  style={{
                    background: isActive ? color : '#ffffff',
                    color: isActive ? textColor : '#0C1B3A',
                    border: isActive
                      ? border
                        ? '1.5px solid #ddd'
                        : `1.5px solid ${color}`
                      : '1.5px solid #E5EAF0',
                    boxShadow: isActive ? '0 2px 8px rgba(12,27,58,0.12)' : 'none',
                    opacity: isActive ? 1 : 0.85,
                  }}
                >
                  <span
                    className="w-3 h-3 rounded-full shrink-0"
                    style={{
                      background: color,
                      border: border && !isActive ? '1px solid #ddd' : undefined,
                      boxShadow: isActive
                        ? `0 0 0 2px ${isActive ? textColor : color}40`
                        : undefined,
                    }}
                  />
                  {name}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── ACTIVE TECHNIQUE PANEL ───────────────────────────────────── */}
      <TechniqueSection key={active.key} technique={active} />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section style={{ background: '#0C1B3A' }} className="py-20">
        <div className="max-w-2xl mx-auto px-5 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
          >
            Not sure which color is yours?
          </h2>
          <p className="text-blue-200 mb-8">
            Enter your four journal scores and Cue Kit will match a primary technique to what you are actually dealing with today — so you have one cue to recall on court tomorrow.
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

function TechniqueSection({ technique }: { technique: Technique }) {
  const { key, color, textColor, accent, border, name, tagline, what, when, strategies } = technique
  const isLight = textColor === '#0C1B3A' || textColor === '#222222'
  const bodyColor = isLight ? 'rgba(12,27,58,0.82)' : 'rgba(255,255,255,0.92)'
  const labelColor = isLight ? 'rgba(12,27,58,0.65)' : 'rgba(255,255,255,0.78)'
  const panelSurface = isLight ? 'rgba(255,255,255,0.55)' : 'rgba(255,255,255,0.14)'
  const panelBorder = isLight
    ? '1px solid rgba(12,27,58,0.12)'
    : '1px solid rgba(255,255,255,0.24)'

  return (
    <section
      id={`panel-${key}`}
      role="tabpanel"
      aria-labelledby={`tab-${key}`}
    >
      {/* colored hero block */}
      <div
        style={{
          background: color,
          color: textColor,
          borderTop: border ? '1px solid #E5EAF0' : undefined,
          borderBottom: border ? '1px solid #E5EAF0' : undefined,
        }}
      >
        <div className="max-w-5xl mx-auto px-5 py-14 md:py-16">
          <div className="flex items-center gap-3 mb-5">
            <span
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-widest"
              style={{
                background: isLight ? 'rgba(12,27,58,0.08)' : 'rgba(255,255,255,0.18)',
                color: textColor,
              }}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ background: textColor, opacity: 0.8 }}
              />
              {name} strap
            </span>
          </div>
          <h2
            className="text-4xl md:text-5xl font-bold mb-3 leading-tight"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif' }}
          >
            {name}
          </h2>
          <p
            className="text-xl md:text-2xl leading-snug mb-6 max-w-3xl"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', opacity: 0.92 }}
          >
            {tagline}
          </p>

          <div className="grid md:grid-cols-2 gap-4 max-w-4xl">
            <div
              className="rounded-xl p-5"
              style={{ background: panelSurface, border: panelBorder }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: labelColor }}
              >
                What this method is
              </p>
              <p className="text-sm md:text-[15px] leading-relaxed" style={{ color: bodyColor }}>
                {what}
              </p>
            </div>

            <div
              className="rounded-xl p-5"
              style={{ background: panelSurface, border: panelBorder }}
            >
              <p
                className="text-xs font-semibold uppercase tracking-widest mb-1.5"
                style={{ color: labelColor }}
              >
                When to reach for it
              </p>
              <p className="text-sm md:text-[15px] leading-relaxed" style={{ color: bodyColor }}>
                {when}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* strategies on white */}
      <div className="bg-white py-14 md:py-16">
        <div className="max-w-5xl mx-auto px-5">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: accent }}
          >
            How to use it
          </p>
          <h3
            className="text-2xl md:text-3xl font-bold mb-3"
            style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
          >
            Four researched ways to put {name.toLowerCase()} to work.
          </h3>
          <p className="text-gray-600 max-w-3xl mb-10 leading-relaxed">
            Each strategy below explains how to run the drill in practice or a match, and why that specific form of the method is the one sport-psych research keeps coming back to.
          </p>

          <div className="grid md:grid-cols-2 gap-5">
            {strategies.map((s, idx) => (
              <div
                key={s.title}
                className="rounded-2xl p-6 md:p-7 flex flex-col gap-4"
                style={{ background: '#F5F7FB', border: '1px solid #E5EAF0' }}
              >
                <div className="flex items-start gap-4">
                  <div
                    className="shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold"
                    style={{ background: color, color: textColor, border: border ? '1.5px solid #ddd' : undefined }}
                  >
                    {idx + 1}
                  </div>
                  <h4
                    className="text-lg md:text-xl font-bold leading-snug"
                    style={{ fontFamily: 'Barlow Semi Condensed, sans-serif', color: '#0C1B3A' }}
                  >
                    {s.title}
                  </h4>
                </div>
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-widest mb-1.5 text-gray-500"
                  >
                    How to use it
                  </p>
                  <p className="text-sm md:text-[15px] leading-relaxed text-gray-700">
                    {s.how}
                  </p>
                </div>
                <div>
                  <p
                    className="text-[11px] font-semibold uppercase tracking-widest mb-1.5"
                    style={{ color: accent }}
                  >
                    Why it helps
                  </p>
                  <p className="text-sm md:text-[15px] leading-relaxed text-gray-700">
                    {s.why}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
