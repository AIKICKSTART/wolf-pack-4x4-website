/* =========================================================
   TORQUE MASCOT — shared types
   Torque is the customer-facing Mufflermen AI assistant
   avatar. One component, ten distinct states. Types are kept
   in their own module so the showcase + the registry can
   import the union without pulling in the component tree.
   ========================================================= */

/**
 * The full set of assistant states Torque can express. Each
 * state maps to a distinct animated pose in `TorqueMascot`.
 */
export type TorqueMascotState =
  | "idle"
  | "thinking"
  | "typing"
  | "working"
  | "analysing"
  | "generating"
  | "deploying"
  | "approval"
  | "warning"
  | "success"

/** Avatar render size. Drives the SVG box + ring scale. */
export type TorqueMascotSize = "sm" | "md" | "lg" | "xl"

export interface TorqueMascotProps {
  /** Which assistant state to render. Controls pose + motion. */
  state: TorqueMascotState
  /** Visual size of the avatar. Defaults to `"md"`. */
  size?: TorqueMascotSize
  /**
   * Human label appended to the derived aria-label, e.g.
   * "Torque" or "Mufflermen assistant". The accessible name
   * always describes the active state.
   */
  label?: string
  /** Extra class applied to the avatar root. */
  className?: string
}

export interface TorqueMascotBadgeProps {
  /** Which assistant state to render in the inline badge. */
  state: TorqueMascotState
  /** Short text shown beside the mini avatar. */
  label?: string
  /** Extra class applied to the badge root. */
  className?: string
}

/** Per-state accessible phrasing used to build the aria-label. */
export const TORQUE_STATE_PHRASE: Record<TorqueMascotState, string> = {
  idle: "ready and idle",
  thinking: "thinking",
  typing: "typing a reply",
  working: "working on a task",
  analysing: "analysing data",
  generating: "generating content",
  deploying: "deploying changes",
  approval: "waiting for your approval",
  warning: "needs your attention",
  success: "task complete",
}
