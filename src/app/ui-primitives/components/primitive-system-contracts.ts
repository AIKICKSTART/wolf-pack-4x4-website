import type { IconMotion, IconTone } from "./icons"
import type { ChipTone } from "./primitives/chip"
import type { ProgressLinearTone } from "./primitives/progress-linear"
import type { ToastTone } from "./primitives/toast"
import type { KineticMotionId, TypographyFontId } from "./typography"

export type PrimitiveMotionId = Exclude<IconMotion, "none">

export interface PrimitiveMotionContract {
  iconMotion: PrimitiveMotionId
  fontId: TypographyFontId
  kineticMotion: KineticMotionId
  phrase: string
  tone: ProgressLinearTone
  progress: number
}

export const primitiveMotionContracts: Record<PrimitiveMotionId, PrimitiveMotionContract> = {
  pulse: {
    iconMotion: "pulse",
    fontId: "bricolage",
    kineticMotion: "neon-idle",
    phrase: "Neon approval",
    tone: "green",
    progress: 90,
  },
  rotate: {
    iconMotion: "rotate",
    fontId: "bebas",
    kineticMotion: "dyno-pull",
    phrase: "Dyno rhythm",
    tone: "teal",
    progress: 84,
  },
  wiggle: {
    iconMotion: "wiggle",
    fontId: "ibm-mono",
    kineticMotion: "valve-tick",
    phrase: "tick warning",
    tone: "red",
    progress: 68,
  },
  drift: {
    iconMotion: "drift",
    fontId: "fraunces",
    kineticMotion: "exhaust-wave",
    phrase: "Heritage note",
    tone: "amber",
    progress: 72,
  },
  draw: {
    iconMotion: "draw",
    fontId: "bigshoulders",
    kineticMotion: "grid-lock",
    phrase: "Trace locked",
    tone: "teal",
    progress: 78,
  },
  spark: {
    iconMotion: "spark",
    fontId: "anton",
    kineticMotion: "weld-flicker",
    phrase: "Weld trigger",
    tone: "amber",
    progress: 96,
  },
}

export interface PrimitiveToneContract {
  chipTone: ChipTone
  iconTone: IconTone
  iconMotion: PrimitiveMotionId
  fontId: TypographyFontId
  kineticMotion: KineticMotionId
  progressTone: ProgressLinearTone
  toastTone: ToastTone
  accentHex: string
}

export const primitiveToneContracts: Record<ChipTone, PrimitiveToneContract> = {
  neutral: {
    chipTone: "neutral",
    iconTone: "obsidian",
    iconMotion: "draw",
    fontId: "bigshoulders",
    kineticMotion: "grid-lock",
    progressTone: "teal",
    toastTone: "info",
    accentHex: "#aeb2bd",
  },
  red: {
    chipTone: "red",
    iconTone: "red",
    iconMotion: "wiggle",
    fontId: "anton",
    kineticMotion: "weld-flicker",
    progressTone: "red",
    toastTone: "warning",
    accentHex: "#e62028",
  },
  amber: {
    chipTone: "amber",
    iconTone: "amber",
    iconMotion: "spark",
    fontId: "bebas",
    kineticMotion: "oil-slick",
    progressTone: "amber",
    toastTone: "warning",
    accentHex: "#ffc14f",
  },
  teal: {
    chipTone: "teal",
    iconTone: "teal",
    iconMotion: "rotate",
    fontId: "space-grotesk",
    kineticMotion: "dyno-pull",
    progressTone: "teal",
    toastTone: "info",
    accentHex: "#40bcff",
  },
  green: {
    chipTone: "green",
    iconTone: "green",
    iconMotion: "pulse",
    fontId: "bricolage",
    kineticMotion: "neon-idle",
    progressTone: "green",
    toastTone: "success",
    accentHex: "#37d67a",
  },
}

export const primitiveToneContractList = [
  primitiveToneContracts.red,
  primitiveToneContracts.amber,
  primitiveToneContracts.teal,
  primitiveToneContracts.green,
  primitiveToneContracts.neutral,
] as const

export function getPrimitiveToneContract(tone: ChipTone) {
  return primitiveToneContracts[tone]
}
