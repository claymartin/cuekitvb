// Tiny sessionStorage-backed store for the computed cue plan, used to hand the
// result off from the inputs page to the dedicated results page.

import type { Plan } from './cue-plan'

const STORAGE_KEY = 'cuekit:last-plan'

export function savePlan(plan: Plan): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(plan))
  } catch {
    // no-op — sessionStorage may be unavailable (private mode, SSR, etc.)
  }
}

export function loadPlan(): Plan | null {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    return JSON.parse(raw) as Plan
  } catch {
    return null
  }
}

export function clearPlan(): void {
  if (typeof window === 'undefined') return
  try {
    window.sessionStorage.removeItem(STORAGE_KEY)
  } catch {
    // no-op
  }
}
