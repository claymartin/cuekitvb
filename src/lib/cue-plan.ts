// Shared types, data, and plan generation for the cue plan flow.

export type Scores = {
  confidence: number
  anxiety: number
  focus: number
  tension: number
}

export type Answers = Record<string, string>

export type Technique = {
  key: string
  name: string
  color: string
  textColor: string
  accentColor: string
  softColor: string
  strap: string
  description: string
}

export type Plan = {
  summary: string
  scores: Scores
  primary: Technique
  primaryReason: string
  before: string[]
  during: string[]
  secondary: Technique | null
  secondaryReason: string | null
  secondaryBefore: string[]
  secondaryDuring: string[]
}

export const TECHNIQUES: Record<string, Technique> = {
  blue: {
    key: 'blue',
    name: 'Breathing',
    color: '#1E6FD8',
    textColor: '#ffffff',
    accentColor: '#7FB3F0',
    softColor: '#0B3C7A',
    strap: 'Blue strap',
    description: 'Calm your body and reset after mistakes.',
  },
  yellow: {
    key: 'yellow',
    name: 'Imagery',
    color: '#F5C842',
    textColor: '#0C1B3A',
    accentColor: '#B8901F',
    softColor: '#FFE89A',
    strap: 'Yellow strap',
    description: 'Picture yourself executing plays before they happen.',
  },
  orange: {
    key: 'orange',
    name: 'Self-Talk',
    color: '#F4A328',
    textColor: '#0C1B3A',
    accentColor: '#FFD08A',
    softColor: '#7A4A08',
    strap: 'Orange strap',
    description: 'Use short phrases to boost confidence and cut negative thoughts.',
  },
  purple: {
    key: 'purple',
    name: 'Focus Cues',
    color: '#5B3BAE',
    textColor: '#ffffff',
    accentColor: '#B5A0ED',
    softColor: '#2B1A63',
    strap: 'Purple strap',
    description: 'Lock attention onto the one thing that matters this rally.',
  },
  black: {
    key: 'black',
    name: 'Muscle Relaxation',
    color: '#222222',
    textColor: '#ffffff',
    accentColor: '#A1A1A1',
    softColor: '#0A0A0A',
    strap: 'Black strap',
    description: 'Release tension so your body moves freely.',
  },
  white: {
    key: 'white',
    name: 'Reset Routine',
    color: '#f0f0f0',
    textColor: '#222222',
    accentColor: '#7A7A7A',
    softColor: '#D6D6D6',
    strap: 'White strap',
    description: 'Flush the last point and start the next one clean.',
  },
}

export type Question = {
  id: string
  text: string
  options: string[]
}

// ── Adaptive questionnaire flow ───────────────────────────────────────────
// Four variable questions capture the user's current level on each of
// confidence, anxiety, focus, and tension. A final adaptive question then
// deepens the diagnosis on whichever variable is most flagged — always
// producing a 5-question flow.

export type BranchKey = 'conf' | 'anx' | 'foc' | 'ten' | 'steady'
export type FlowAnswers = Record<string, string>

type ScoredOption = { value: string; score: number }

const CONFIDENCE_OPTIONS: ScoredOption[] = [
  { value: "Low — I'm doubting my skills", score: 1 },
  { value: 'Shaky in spots', score: 2 },
  { value: 'Hit or miss right now', score: 3 },
  { value: 'Pretty solid', score: 4 },
  { value: 'Fully trusting my game', score: 5 },
]

const ANXIETY_OPTIONS: ScoredOption[] = [
  { value: 'Calm — no nerves at all', score: 1 },
  { value: 'A little buzz', score: 2 },
  { value: 'Normal pre-match nerves', score: 3 },
  { value: 'Running high', score: 4 },
  { value: "Overwhelmed — it's a lot", score: 5 },
]

const FOCUS_OPTIONS: ScoredOption[] = [
  { value: "Scattered — I can't hold it", score: 1 },
  { value: 'Drifting often', score: 2 },
  { value: 'In and out', score: 3 },
  { value: 'Sharp most points', score: 4 },
  { value: 'Locked in', score: 5 },
]

const TENSION_OPTIONS: ScoredOption[] = [
  { value: 'Loose — body feels free', score: 1 },
  { value: 'A little tight', score: 2 },
  { value: 'Some tension', score: 3 },
  { value: 'Tense — body is tight', score: 4 },
  { value: 'Locked up — body is fighting me', score: 5 },
]

const Q_CONFIDENCE: Question = {
  id: 'confidence',
  text: 'How confident are you feeling in your skills right now?',
  options: CONFIDENCE_OPTIONS.map((o) => o.value),
}

const Q_ANXIETY: Question = {
  id: 'anxiety',
  text: 'How much nerves or anxiety are you carrying today?',
  options: ANXIETY_OPTIONS.map((o) => o.value),
}

const Q_FOCUS: Question = {
  id: 'focus',
  text: 'How sharp is your focus right now?',
  options: FOCUS_OPTIONS.map((o) => o.value),
}

const Q_TENSION: Question = {
  id: 'tension',
  text: 'How much physical tension is in your body?',
  options: TENSION_OPTIONS.map((o) => o.value),
}

export const VARIABLE_KEYS = ['confidence', 'anxiety', 'focus', 'tension'] as const
export type VariableKey = (typeof VARIABLE_KEYS)[number]

export const VARIABLE_RATING_OPTIONS: Record<VariableKey, string[]> = {
  confidence: CONFIDENCE_OPTIONS.map((o) => o.value),
  anxiety: ANXIETY_OPTIONS.map((o) => o.value),
  focus: FOCUS_OPTIONS.map((o) => o.value),
  tension: TENSION_OPTIONS.map((o) => o.value),
}

export const VARIABLE_LABELS: Record<VariableKey, { label: string; lowHint: string; highHint: string }> = {
  confidence: { label: 'Confidence', lowHint: 'doubting', highHint: 'trusting' },
  anxiety: { label: 'Anxiety', lowHint: 'calm', highHint: 'overwhelmed' },
  focus: { label: 'Focus', lowHint: 'scattered', highHint: 'locked in' },
  tension: { label: 'Tension', lowHint: 'loose', highHint: 'locked up' },
}

function scoreFor(value: string | undefined, options: ScoredOption[]): number | null {
  if (!value) return null
  const match = options.find((o) => o.value === value)
  return match ? match.score : null
}

function scoresFromFlow(flow: FlowAnswers): Scores {
  return {
    confidence: scoreFor(flow.confidence, CONFIDENCE_OPTIONS) ?? 3,
    anxiety: scoreFor(flow.anxiety, ANXIETY_OPTIONS) ?? 3,
    focus: scoreFor(flow.focus, FOCUS_OPTIONS) ?? 3,
    tension: scoreFor(flow.tension, TENSION_OPTIONS) ?? 3,
  }
}

function determinePrimaryConcern(scores: Scores): BranchKey {
  const flags: Array<{ branch: Exclude<BranchKey, 'steady'>; severity: number }> = []
  if (scores.confidence <= 2) flags.push({ branch: 'conf', severity: 3 - scores.confidence })
  if (scores.anxiety >= 4) flags.push({ branch: 'anx', severity: scores.anxiety - 3 })
  if (scores.focus <= 2) flags.push({ branch: 'foc', severity: 3 - scores.focus })
  if (scores.tension >= 4) flags.push({ branch: 'ten', severity: scores.tension - 3 })
  if (flags.length === 0) return 'steady'

  // Match the tie-break order used by generatePlan: anxiety > tension > confidence > focus.
  const tiePriority: Record<string, number> = { anx: 0, ten: 1, conf: 2, foc: 3 }
  flags.sort((a, b) => {
    if (b.severity !== a.severity) return b.severity - a.severity
    return tiePriority[a.branch] - tiePriority[b.branch]
  })
  return flags[0].branch
}

function deepDiveQuestions(branch: BranchKey): Question[] {
  switch (branch) {
    case 'conf':
      return [
        {
          id: 'deep_dive',
          text: "What's triggering the confidence dip most today?",
          options: [
            'Mistakes on easy plays',
            'Getting targeted by the other team',
            'Coach or teammate reactions',
            'Score or game situation',
          ],
        },
        {
          id: 'deep_dive_2',
          text: 'Which thought is loudest in your head right now?',
          options: [
            'I can do it in practice but not in games',
            'I play tight when people are watching me',
            "My skills aren't good enough for this level",
            "I just haven't found my rhythm yet",
          ],
        },
        {
          id: 'deep_dive_3',
          text: 'After a mistake, what does your inner voice tend to do?',
          options: [
            'Replaying the mistake on loop',
            'Bracing for the next one to go wrong',
            'Going quiet and withdrawing',
            'Quickly shifting to the next ball',
          ],
        },
      ]
    case 'anx':
      return [
        {
          id: 'deep_dive',
          text: 'Where do you feel the anxiety most?',
          options: [
            'Thoughts and overthinking',
            'Body and breathing',
            'Stomach or chest tightness',
            'Nervous energy all over',
          ],
        },
        {
          id: 'deep_dive_2',
          text: 'When does the anxiety peak?',
          options: [
            'Before the match starts',
            'Watching opponents warm up',
            'During key points',
            'After making errors',
          ],
        },
        {
          id: 'deep_dive_3',
          text: "What's it costing you most right now?",
          options: [
            'Trusting my first move',
            'Communicating with teammates',
            'Staying with one play at a time',
            'Keeping my legs under me in the first rotation',
          ],
        },
      ]
    case 'foc':
      return [
        {
          id: 'deep_dive',
          text: 'What pulls your focus away most?',
          options: [
            'Mistakes I just made',
            'Crowd or stadium noise',
            'Coach feedback between points',
            'Thinking about the score',
          ],
        },
        {
          id: 'deep_dive_2',
          text: 'How does the drift usually show up in your play?',
          options: [
            'I react slower than usual',
            'I second-guess decisions',
            'I lose track of my position',
            'I forget the game plan',
          ],
        },
        {
          id: 'deep_dive_3',
          text: 'When you drift mid-set, what usually brings you back?',
          options: [
            'A deep breath',
            'A word from a teammate or coach',
            'A quick mental reset on the next serve',
            'Honestly — nothing, until the next set',
          ],
        },
      ]
    case 'ten':
      return [
        {
          id: 'deep_dive',
          text: 'Where does the tension land in your body?',
          options: [
            'Legs and feet',
            'Shoulders and arms',
            'Hands and wrists',
            'Neck and jaw',
          ],
        },
        {
          id: 'deep_dive_2',
          text: 'When does it show up most?',
          options: [
            'During serve receive',
            'Right before I serve',
            'Late in a long rally',
            'After missing a key play',
          ],
        },
        {
          id: 'deep_dive_3',
          text: "What's it costing you most?",
          options: [
            'A slower first step',
            'Stiff contact with the ball',
            'Shaky timing on approach or swing',
            'Getting tired faster than usual',
          ],
        },
      ]
    case 'steady':
      return [
        {
          id: 'deep_dive',
          text: 'When things feel steady, what are you locking onto?',
          options: [
            'The ball and next play only',
            'My footwork and positioning',
            "Reading the setter's hips",
            'One point at a time',
          ],
        },
      ]
  }
}

/**
 * Returns the ordered list of questions that should be asked given the
 * user's answers so far. Q1–Q4 always ask for the four variable scores;
 * after all four are answered, one-to-three conditional deep-dive
 * questions follow, keyed to whichever score is most flagged. When
 * nothing is flagged (steady state), only a single closing question is
 * asked, so the flow is 5 questions in calm cases and 7 when a concern
 * needs digging into.
 */
export function getFlowQuestions(answers: FlowAnswers): Question[] {
  const questions: Question[] = [Q_CONFIDENCE, Q_ANXIETY, Q_FOCUS, Q_TENSION]
  if (
    answers.confidence === undefined ||
    answers.anxiety === undefined ||
    answers.focus === undefined ||
    answers.tension === undefined
  ) {
    return questions
  }

  const scores = scoresFromFlow(answers)
  const concern = determinePrimaryConcern(scores)
  questions.push(...deepDiveQuestions(concern))
  return questions
}

export function getFlowTotalSteps(answers: FlowAnswers): number {
  return getFlowQuestions(answers).length
}

export const DEEP_DIVE_KEYS = ['deep_dive', 'deep_dive_2', 'deep_dive_3'] as const

export function isFlowComplete(answers: FlowAnswers): boolean {
  const questions = getFlowQuestions(answers)
  return questions.every((q) => answers[q.id] !== undefined)
}

/**
 * Build a Plan from adaptive flow answers. Scores come directly from the
 * four variable questions, so the results page reflects the user's actual
 * inputs on every dimension instead of a default neutral 3. Up to three
 * deep-dive answers are mapped onto the narrative-building answer keys
 * for the most flagged concern, which lets the existing rules engine
 * use its full q1/q2/q3 branching in `buildReason`, `buildBefore`, and
 * `buildDuring` without any changes.
 */
export function generatePlanFromFlow(flow: FlowAnswers): Plan {
  const scores = scoresFromFlow(flow)
  const concern = determinePrimaryConcern(scores)
  const answers: Answers = {}

  const prefix =
    concern === 'conf' ? 'conf_low'
    : concern === 'anx' ? 'anx_high'
    : concern === 'foc' ? 'foc_low'
    : concern === 'ten' ? 'ten_high'
    : 'foc_high'

  DEEP_DIVE_KEYS.forEach((key, i) => {
    const value = flow[key]
    if (value) answers[`${prefix}_q${i + 1}`] = value
  })

  return generatePlan(scores, answers)
}

export function generatePlan(scores: Scores, answers: Answers): Plan {
  const { confidence, anxiety, focus, tension } = scores

  const summary = buildSummary(scores, answers)

  // Each flagged score maps directly to its corresponding technique color.
  // Severity (distance from the neutral 3) decides which one leads; ties fall
  // back to a fixed priority so results stay consistent.
  const flags: Array<{ key: string; severity: number }> = []
  if (confidence <= 2) flags.push({ key: 'orange', severity: 3 - confidence })
  if (anxiety >= 4) flags.push({ key: 'blue', severity: anxiety - 3 })
  if (focus <= 2) flags.push({ key: 'purple', severity: 3 - focus })
  if (tension >= 4) flags.push({ key: 'black', severity: tension - 3 })

  const tiePriority: Record<string, number> = { blue: 0, black: 1, orange: 2, purple: 3 }
  flags.sort((a, b) => {
    if (b.severity !== a.severity) return b.severity - a.severity
    return tiePriority[a.key] - tiePriority[b.key]
  })

  let primary: Technique
  let secondary: Technique | null = null

  if (flags.length === 0) {
    primary = TECHNIQUES.purple
  } else {
    primary = TECHNIQUES[flags[0].key]
    if (flags.length > 1) secondary = TECHNIQUES[flags[1].key]
  }

  const primaryReason = buildReason(primary.key, scores, answers)
  const before = buildBefore(primary.key, answers)
  const during = buildDuring(primary.key, answers)

  let secondaryReason: string | null = null
  let secondaryBefore: string[] = []
  let secondaryDuring: string[] = []

  if (secondary) {
    secondaryReason = buildSecondaryReason(secondary.key, primary.name, answers)
    secondaryBefore = buildSecondaryBefore(secondary.key, answers)
    secondaryDuring = buildSecondaryDuring(secondary.key, answers)
  }

  return {
    summary,
    scores,
    primary,
    primaryReason,
    before,
    during,
    secondary,
    secondaryReason,
    secondaryBefore,
    secondaryDuring,
  }
}

function buildSummary(scores: Scores, answers: Answers): string {
  const { confidence, anxiety, focus, tension } = scores
  const lowConfidence = confidence <= 2
  const highAnxiety = anxiety >= 4
  const lowFocus = focus <= 2
  const highTension = tension >= 4

  if (!lowConfidence && !highAnxiety && !lowFocus && !highTension) {
    return 'Your scores look solid across the board today — the focus now is on using that steady state instead of chasing it.'
  }

  const tags: string[] = []
  if (lowConfidence) tags.push('low confidence')
  if (lowFocus) tags.push('drifting focus')

  if (highAnxiety) {
    const anxType = answers['anx_high_q1']
    const anxPeak = answers['anx_high_q2']
    if (anxType === 'Thoughts and overthinking' && anxPeak === 'After making errors') {
      tags.push('anxiety that spikes in your thoughts right after mistakes')
    } else if (anxType === 'Thoughts and overthinking') {
      tags.push('anxiety that runs as overthinking')
    } else if (anxType === 'Body and breathing') {
      tags.push('anxiety you feel in your body and breathing')
    } else if (anxType === 'Stomach or chest tightness') {
      tags.push('anxiety that lands as stomach or chest tightness')
    } else if (anxType === 'Nervous energy all over') {
      tags.push('nervous energy that shows up all over')
    } else if (anxPeak === 'Before the match starts') {
      tags.push('anxiety that peaks before the match starts')
    } else if (anxPeak === 'During key points') {
      tags.push('anxiety that climbs on key points')
    } else if (anxPeak === 'Watching opponents warm up') {
      tags.push('anxiety that starts in warmup')
    } else {
      tags.push('elevated anxiety')
    }
  }

  let first = ''
  if (tags.length === 1) first = capitalize(tags[0]) + '.'
  else if (tags.length === 2) first = `${capitalize(tags[0])} and ${tags[1]}.`
  else if (tags.length > 2) first = `${capitalize(tags[0])}, ${tags.slice(1, -1).join(', ')}, and ${tags[tags.length - 1]}.`

  if (highTension) {
    const loc = answers['ten_high_q1']
    const when = answers['ten_high_q2']
    const cost = answers['ten_high_q3']
    const leadIn = first ? ' You also feel tension' : 'You felt tension'
    let tensionSent = leadIn
    if (loc) tensionSent += ` in your ${loc.toLowerCase()}`
    if (when) tensionSent += `, especially during ${when.toLowerCase()}`
    if (cost === 'A slower first step') tensionSent += ', which makes it harder to move and trust your first step'
    else if (cost === 'Stiff contact with the ball') tensionSent += ', which makes contact feel stiff and less reliable'
    else if (cost === 'Shaky timing on approach or swing') tensionSent += ', which throws off your approach and swing timing'
    else if (cost === 'Getting tired faster than usual') tensionSent += ', which burns energy you need for the later sets'
    else tensionSent += ', which makes it harder to move freely'
    tensionSent += '.'
    return first + tensionSent
  }

  return first
}

function capitalize(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function buildReason(key: string, scores: Scores, answers: Answers): string {
  const { confidence, anxiety, focus, tension } = scores
  const lowConf = confidence <= 2
  const lowFocus = focus <= 2

  const confStatement = answers['conf_low_q2']
  const confShaken = answers['conf_low_q1']
  const innerVoice = answers['conf_low_q3']
  const anxType = answers['anx_high_q1']
  const anxPeak = answers['anx_high_q2']
  const anxCost = answers['anx_high_q3']
  const focusPull = answers['foc_low_q1']
  const focusShow = answers['foc_low_q2']
  const tensionLoc = answers['ten_high_q1']
  const tensionWhen = answers['ten_high_q2']
  const tensionCost = answers['ten_high_q3']

  switch (key) {
    case 'orange': {
      const triggers: string[] = []
      if (lowConf) triggers.push('low confidence')
      if (lowFocus) triggers.push('drifting focus')
      let opener = `You reported ${triggers.join(' and ') || 'mental noise'}`

      if (confStatement === 'I can do it in practice but not in games') {
        opener += `, especially on "easy" mistakes where you can do the skill in practice but not in games`
      } else if (confStatement === 'I play tight when people are watching me') {
        opener += ', especially when you feel people watching you'
      } else if (confStatement === "My skills aren't good enough for this level") {
        opener += ", along with a quiet sense that your skills don't belong at this level"
      } else if (confShaken === 'Mistakes on easy plays') {
        opener += ', especially after mistakes on plays you know you can make'
      } else if (confShaken === 'Getting targeted by the other team') {
        opener += ', especially when the other team starts picking on you'
      }
      opener += '.'

      if (innerVoice === 'Replaying the mistake on loop') {
        opener += ' And once a mistake happens, your inner voice keeps replaying it instead of moving on.'
      } else if (innerVoice === 'Bracing for the next one to go wrong') {
        opener += ' And after a mistake, you find yourself bracing for the next ball to go wrong before it even arrives.'
      } else if (innerVoice === 'Going quiet and withdrawing') {
        opener += ' You also tend to go quiet and pull away from your teammates when it starts spiraling.'
      }

      let mechanism = ` Short, specific self-talk cues give you something concrete to return to. A phrase clipped to your laces interrupts overthinking before it takes hold, keeps you communicating with teammates, and helps you trust your training when the next ball comes your way.`

      if (focusPull === 'Mistakes I just made' || focusShow === 'I second-guess decisions') {
        mechanism += ` Because the thing that pulls you out is usually the last mistake, the cue's job is to cut that loop and point you at the next play.`
      }

      return opener + mechanism
    }

    case 'blue': {
      let opener = `Your anxiety score (${anxiety}/5) is elevated`
      if (anxType === 'Body and breathing' || anxType === 'Stomach or chest tightness' || anxType === 'Nervous energy all over') {
        opener += `—your body is already running hot before the first serve.`
      } else if (anxType === 'Thoughts and overthinking') {
        opener += `, and it's pulling you into your head instead of into the play.`
      } else {
        opener += ', and your nervous system is already in a heightened state.'
      }

      let mechanism = ` Breathing is the most direct, repeatable way to downshift that system.`
      if (anxPeak === 'Before the match starts') {
        mechanism += ` Used in warmup and between sets, a slow 4-in / 6-out pattern keeps pre-match nerves from stealing your legs in the first rotation.`
      } else if (anxPeak === 'After making errors') {
        mechanism += ` One slow breath after each error tells your body the point is over, so the next one starts fresh instead of stacked on the last.`
      } else if (anxPeak === 'During key points') {
        mechanism += ` A single intentional breath before a key point keeps your heart rate from running ahead of your hands.`
      } else if (anxPeak === 'Watching opponents warm up') {
        mechanism += ` Paced breathing during the opposing team's warmup pulls your attention back to your own body and your own routine.`
      }

      if (anxCost === 'Trusting my first move') {
        mechanism += ` Because anxiety is costing you your first move, the breath's job is to hand your body back to you before the ball leaves their side.`
      } else if (anxCost === 'Communicating with teammates') {
        mechanism += ` Because anxiety is cutting your communication, the breath frees up enough space to call the ball and talk to your teammates again.`
      } else if (anxCost === 'Staying with one play at a time') {
        mechanism += ` Because anxiety is pulling you off one-play-at-a-time, the breath becomes the reset between every rally.`
      }

      return opener + mechanism
    }

    case 'purple': {
      if (!lowFocus) {
        return `Your scores are steady across the board. The biggest lever right now is precision — picking one thing per rally and locking onto it, instead of letting your focus drift between plays. The purple strap is your anchor for that single-point attention.`
      }

      let opener = `Your focus score (${focus}/5) dipped today`
      if (focusPull === 'Mistakes I just made') {
        opener += ', and the thing pulling you out is usually the last mistake.'
      } else if (focusPull === 'Crowd or stadium noise') {
        opener += ", and external noise is breaking your attention between plays."
      } else if (focusPull === 'Coach feedback between points') {
        opener += ", and coach feedback between points is pulling you away from the next play."
      } else if (focusPull === 'Thinking about the score') {
        opener += ", and the scoreboard is pulling your attention away from the rally in front of you."
      } else {
        opener += '.'
      }

      let mechanism = ` Focus Cues give you a single, specific anchor to return to — one thing per rally, not a list. A cue word clipped in your line of sight interrupts the drift before it turns into a missed read.`
      if (focusShow === 'I react slower than usual') {
        mechanism += ` Because drift is costing you reaction time, the cue's job is to hand your eyes back to the ball before it leaves their side.`
      } else if (focusShow === 'I second-guess decisions') {
        mechanism += ` Because drift shows up as second-guessing, the cue replaces that internal debate with one clear thing to look for.`
      } else if (focusShow === 'I lose track of my position') {
        mechanism += ` Because drift shows up as losing your position, a positional cue ("base, read, move") keeps your feet oriented to the play.`
      } else if (focusShow === 'I forget the game plan') {
        mechanism += ` Because drift shows up as losing the game plan, the cue becomes the one piece of the plan you can hold across the whole match.`
      }

      return opener + mechanism
    }

    case 'black': {
      let opener = `You reported physical tension at ${tension}/5`
      if (tensionLoc) opener += `, concentrated in your ${tensionLoc.toLowerCase()}`
      if (tensionWhen) opener += `, especially during ${tensionWhen.toLowerCase()}`
      opener += '.'

      let mechanism = ` Tension shortens your range of motion and slows your first step, so your body ends up fighting itself when the ball comes.`
      if (tensionCost === 'A slower first step') {
        mechanism += ` Muscle relaxation drills in warmup and shakeouts between points keep your legs ready to move on read, not on reaction.`
      } else if (tensionCost === 'Stiff contact with the ball') {
        mechanism += ` Loosening your hands, shoulders, and jaw before contact gives the ball somewhere soft to land, which shows up as cleaner platforms and hits.`
      } else if (tensionCost === 'Shaky timing on approach or swing') {
        mechanism += ` Releasing tension during your pre-approach routine restores the rhythm your swing needs to stay on time.`
      } else if (tensionCost === 'Getting tired faster than usual') {
        mechanism += ` Dropping carried tension between points saves the energy you'd otherwise be burning just holding your body tight.`
      } else {
        mechanism += ` Muscle relaxation addresses the root cause directly, not just the symptoms.`
      }

      return opener + mechanism
    }

    default:
      return `This technique matches your current mental state and gives you something concrete to use on court.`
  }
}

function buildBefore(primary: string, answers: Answers = {}): string[] {
  const lines: string[] = []
  switch (primary) {
    case 'orange':
      lines.push('Write one self-talk cue for serve receive (for example, "early feet, strong platform").')
      lines.push('Write one self-talk cue for attacking or your main offensive role (for example, "see seam, full swing").')
      lines.push('Clip the Orange — Self-Talk strap to your laces so it\'s in your line of sight.')
      break
    case 'blue':
      lines.push('Do 2–3 rounds of slow breathing while you lace your shoes (4 counts in, 6 counts out).')
      lines.push('Clip the Blue — Breathing strap. Each time you see it during warmup, take one deliberate breath.')
      lines.push('Set a mental trigger for the match: strap → breath → ready position.')
      break
    case 'purple': {
      const pull = answers['foc_low_q1']
      let example = 'Watch the setter\'s hips'
      if (pull === 'Mistakes I just made') example = 'Next ball, nothing else'
      else if (pull === 'Crowd or stadium noise') example = 'See the ball, hear the court'
      else if (pull === 'Coach feedback between points') example = 'One play at a time'
      else if (pull === 'Thinking about the score') example = 'This rally only'
      lines.push(`Pick one focus cue for tonight (for example, "${example}").`)
      lines.push('Write it on your wrist or repeat it silently three times during warmup.')
      lines.push('Clip the Purple — Focus Cues strap as your attention anchor.')
      break
    }
    case 'black':
      lines.push('Do a quick tension scan from neck to feet during warmup.')
      lines.push('Add leg shakeouts or hip circles wherever you feel tightness.')
      lines.push('Clip the Black — Muscle Relaxation strap as a reminder to keep your body loose.')
      break
    default:
      lines.push('Review your cue plan one more time before warmup.')
      lines.push('Clip your primary strap.')
      lines.push('Take three slow breaths before the first serve.')
  }
  return lines
}

function buildDuring(primary: string, answers: Answers = {}): string[] {
  const lines: string[] = []
  switch (primary) {
    case 'orange':
      lines.push('After any mistake, glance at the orange clip and repeat your serve-receive cue once in your head before the next ball.')
      lines.push('On every rally where you started to overthink last time, repeat your attacking cue as you transition into your role.')
      lines.push('Between serves, use it as a reset: one phrase, one breath, ready.')
      break
    case 'blue':
      lines.push('Between every point, glance at the blue strap and take one slow breath.')
      lines.push('After errors, use the breath to close out the point before stepping back into position.')
      lines.push('Signal to yourself each time: strap → exhale → ready.')
      break
    case 'purple': {
      const recover = answers['foc_low_q3']
      lines.push('Between points, glance at the purple strap and repeat your focus cue.')
      lines.push('Lock onto one thing per rally — no more, no less.')
      if (recover === 'Honestly — nothing, until the next set') {
        lines.push('If you drift mid-rally, let the strap be the thing that pulls you back — you do not have to wait for the next set.')
      } else if (recover === 'A deep breath') {
        lines.push('If you drift, pair the strap with one slow breath to bring your attention back before the next serve.')
      } else {
        lines.push('If you drift mid-set, let the strap bring you back.')
      }
      break
    }
    case 'black':
      lines.push('Between points, shake out your legs and soften your knees.')
      lines.push('Roll your shoulders and exhale tension before each serve.')
      lines.push('If tightness builds, glance at the black strap and release it before the next play.')
      break
    default:
      lines.push('Glance at your strap between points to stay anchored.')
      lines.push('Reset with one breath after each error.')
      lines.push('Focus on the next play only — not the last one.')
  }
  return lines
}

function buildSecondaryReason(key: string, primaryName: string, answers: Answers): string {
  const tensionLoc = answers['ten_high_q1']
  const tensionWhen = answers['ten_high_q2']
  const anxType = answers['anx_high_q1']
  const confShaken = answers['conf_low_q1']
  const focusPull = answers['foc_low_q1']

  if (key === 'black') {
    let sentence = 'Because you reported a lot of tension'
    if (tensionLoc) sentence += ` in your ${tensionLoc.toLowerCase()}`
    if (tensionWhen) sentence += ` during ${tensionWhen.toLowerCase()}`
    sentence += `, Black — Muscle Relaxation is a good backup cue to pair with your ${primaryName.toLowerCase()}, helping you move more freely and trust your first contact.`
    return sentence
  }
  if (key === 'blue') {
    let sentence = `Pair Blue — Breathing as a secondary for moments when anxiety spikes`
    if (anxType) sentence += ` in your ${anxType.toLowerCase()}`
    sentence += `. One slow breath between points keeps your body from overriding the mental plan.`
    return sentence
  }
  if (key === 'orange') {
    let sentence = `Pair Orange — Self-Talk as a secondary for moments when confidence dips`
    if (confShaken) sentence += ` (especially after ${confShaken.toLowerCase()})`
    sentence += `. A short phrase clipped to your laces gives you something concrete to return to between points.`
    return sentence
  }
  if (key === 'purple') {
    let sentence = `Pair Purple — Focus Cues as a secondary for moments when your attention drifts`
    if (focusPull) sentence += ` (especially ${focusPull.toLowerCase()})`
    sentence += `. One cue word per rally keeps you locked onto the next play instead of the last one.`
    return sentence
  }
  return `Use this technique as a backup when your primary cue isn't landing. Rotate between them based on what the match is asking for.`
}

function buildSecondaryBefore(key: string, answers: Answers): string[] {
  if (key === 'black') {
    const loc = (answers['ten_high_q1'] || '').toLowerCase()
    const locWord =
      loc.includes('leg') ? 'calves and quads'
      : loc.includes('shoulder') ? 'shoulders and arms'
      : loc.includes('hand') ? 'hands, wrists, and forearms'
      : loc.includes('neck') ? 'neck and jaw'
      : 'body'
    return [
      `During warm-up, add 1–2 quick stretches or mobility drills that help your ${locWord} feel loose.`,
      `As you finish warm-up, do one short scan from hips to toes and release any extra tightness.`,
      `Clip the Black — Muscle Relaxation strap next to your primary so you see both cues at once.`,
    ]
  }
  if (key === 'blue') {
    return [
      'While you lace your shoes, do 2–3 rounds of slow breathing (4 in, 6 out).',
      'Clip the Blue — Breathing strap alongside your primary.',
      'Set a simple reset trigger: strap → breath → ready.',
    ]
  }
  if (key === 'orange') {
    return [
      'Write one short self-talk phrase you can repeat after mistakes (for example, "next ball").',
      'Clip the Orange — Self-Talk strap next to your primary so both cues are in sight.',
    ]
  }
  if (key === 'purple') {
    const pull = answers['foc_low_q1']
    let example = 'Watch the setter\'s hips'
    if (pull === 'Mistakes I just made') example = 'Next ball, nothing else'
    else if (pull === 'Crowd or stadium noise') example = 'See the ball, hear the court'
    else if (pull === 'Coach feedback between points') example = 'One play at a time'
    else if (pull === 'Thinking about the score') example = 'This rally only'
    return [
      `Pick one focus cue for the match (for example, "${example}").`,
      'Clip the Purple — Focus Cues strap alongside your primary.',
    ]
  }
  return ['Clip this strap next to your primary as a backup visual.']
}

function buildSecondaryDuring(key: string, answers: Answers): string[] {
  if (key === 'black') {
    const when = (answers['ten_high_q2'] || '').toLowerCase()
    const contextLine =
      when.includes('serve receive') ? 'If you notice your legs tightening again in serve receive, glance at the Black clip as a reminder to drop your tension and trust your first step.'
      : when.includes('serve') ? 'Before your next serve, glance at the Black clip and let your shoulders and arms drop before the toss.'
      : when.includes('rally') ? 'Mid-rally, if you feel yourself locking up, use a quick exhale between contacts to keep your body loose.'
      : when.includes('missing') ? 'After a missed key play, glance at the Black clip and release your jaw, shoulders, and hands before stepping back into position.'
      : 'If tightness creeps back, glance at the Black clip as a reminder to drop tension before the next play.'
    return [
      'Between points, briefly shake out your legs, unclench your toes inside your shoes, and let your knees soften before you get into your ready position.',
      contextLine,
    ]
  }
  if (key === 'blue') {
    return [
      'When anxiety spikes, glance at the Blue clip and take one slow breath before the next serve.',
      'Between sets, reset with three rounds of 4-in / 6-out breathing before you step back on.',
    ]
  }
  if (key === 'orange') {
    return [
      'After any mistake, glance at the Orange clip and repeat your phrase once before the next ball.',
      'Between serves, use the phrase as a reset: strap → phrase → ready.',
    ]
  }
  if (key === 'purple') {
    return [
      'Between points, glance at the Purple clip and repeat your focus cue.',
      'Lock onto one thing per rally — if you drift, let the strap bring you back.',
    ]
  }
  return ["Use this strap between points whenever your primary cue isn't landing."]
}
