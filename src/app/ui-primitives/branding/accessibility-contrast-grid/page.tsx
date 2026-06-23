import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AccessibilityContrastGrid,
  type ContrastCellResult,
  type ContrastColor,
} from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Contrast grid | Branding Lab",
  description:
    "Primitive 12 — WCAG AA/AAA pass-fail matrix across foreground and background brand colours.",
}

const FOREGROUNDS: ReadonlyArray<ContrastColor> = [
  { id: "ink", label: "Stencil ink", hex: "#050508" },
  { id: "paper", label: "Paper", hex: "#F6F6F8" },
  { id: "red", label: "Workshop red", hex: "#E62028" },
  { id: "amber", label: "Service amber", hex: "#FFC14F" },
]

const BACKGROUNDS: ReadonlyArray<ContrastColor> = [
  { id: "canvas", label: "Canvas", hex: "#101016" },
  { id: "paper", label: "Paper", hex: "#F6F6F8" },
  { id: "red", label: "Workshop red", hex: "#E62028" },
  { id: "amber", label: "Service amber", hex: "#FFC14F" },
  { id: "green", label: "Telemetry", hex: "#37D67A" },
]

// Pre-computed pairings — display-only fixture for the showcase.
const RESULTS: ReadonlyArray<ReadonlyArray<ContrastCellResult>> = [
  [
    { ratio: 18.32, level: "AAA" },
    { ratio: 18.6, level: "AAA" },
    { ratio: 6.41, level: "AA" },
    { ratio: 13.2, level: "AAA" },
    { ratio: 12.42, level: "AAA" },
  ],
  [
    { ratio: 17.92, level: "AAA" },
    { ratio: 1.06, level: "fail" },
    { ratio: 4.62, level: "AA" },
    { ratio: 1.42, level: "fail" },
    { ratio: 1.51, level: "fail" },
  ],
  [
    { ratio: 5.13, level: "AA" },
    { ratio: 4.32, level: "AA-large" },
    { ratio: 1.0, level: "fail" },
    { ratio: 3.38, level: "AA-large" },
    { ratio: 2.21, level: "fail" },
  ],
  [
    { ratio: 11.84, level: "AAA" },
    { ratio: 1.6, level: "fail" },
    { ratio: 2.71, level: "fail" },
    { ratio: 1.0, level: "fail" },
    { ratio: 1.49, level: "fail" },
  ],
]

export default function AccessibilityContrastGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Contrast grid"
        title="Accessibility contrast grid"
        description="A matrix of every approved foreground colour against every approved background. Cells carry the contrast ratio and a WCAG pass-fail badge — AAA, AA, AA for large text only, or fail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Contrast grid" },
        ]}
      />
      <AccessibilityContrastGrid
        foregrounds={FOREGROUNDS}
        backgrounds={BACKGROUNDS}
        results={RESULTS}
      />
    </main>
  )
}
