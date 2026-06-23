export type IconTone =
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "obsidian"
  | "currentColor"

export type IconMotion =
  | "pulse"
  | "rotate"
  | "wiggle"
  | "drift"
  | "draw"
  | "spark"
  | "none"

export type IconState = "idle" | "hover" | "active" | "loading"

export type IconVariant = "outline" | "filled" | "monoline"

export interface IconProps {
  size?: number | string
  tone?: IconTone
  state?: IconState
  motion?: IconMotion
  variant?: IconVariant
  title?: string
  className?: string
}

export const TONE_VALUES: Record<IconTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  obsidian: "var(--primitive-icon-obsidian)",
  currentColor: "currentColor",
}
