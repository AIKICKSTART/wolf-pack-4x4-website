import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { LogoCloud, type LogoCloudEntry } from "../../components/marketing/logo-cloud"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Logo cloud | Marketing Blocks",
  description:
    "Primitive 07 — 6-12 brand-mark SVGs in a muted logo wall with subtle entrance animation.",
}

// All marks below are hand-drawn abstract glyphs — NOT real-world company logos.
function MarkChevron() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <path d="M8 28 L24 12 L40 28 L56 12 L72 28" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="40" cy="22" r="3" />
    </svg>
  )
}

function MarkGrid() {
  return (
    <svg viewBox="0 0 80 40" aria-hidden="true">
      <rect x="8" y="10" width="14" height="20" fill="currentColor" />
      <rect x="28" y="10" width="14" height="20" fill="currentColor" opacity="0.6" />
      <rect x="48" y="10" width="14" height="20" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

function MarkRing() {
  return (
    <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <circle cx="22" cy="20" r="12" />
      <circle cx="46" cy="20" r="8" />
      <line x1="32" y1="20" x2="40" y2="20" />
    </svg>
  )
}

function MarkBolt() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <path d="M30 6 L18 22 L30 22 L26 36 L48 18 L36 18 L42 6 Z" />
      <rect x="56" y="8" width="14" height="24" fill="none" stroke="currentColor" strokeWidth="2" />
    </svg>
  )
}

function MarkStripe() {
  return (
    <svg viewBox="0 0 80 40" aria-hidden="true">
      <path d="M8 28 L18 12 H38 L48 28 H28 Z" fill="currentColor" opacity="0.85" />
      <path d="M44 28 L54 12 H72 L62 28 Z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}

function MarkArrow() {
  return (
    <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M10 30 L40 10 L70 30" />
      <path d="M40 12 V32" />
    </svg>
  )
}

function MarkHex() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <polygon points="20,8 36,8 44,20 36,32 20,32 12,20" />
      <polygon points="44,8 60,8 68,20 60,32 44,32 36,20" opacity="0.6" />
    </svg>
  )
}

function MarkLines() {
  return (
    <svg viewBox="0 0 80 40" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden="true">
      <line x1="10" y1="14" x2="70" y2="14" />
      <line x1="10" y1="22" x2="54" y2="22" opacity="0.7" />
      <line x1="10" y1="30" x2="38" y2="30" opacity="0.4" />
    </svg>
  )
}

function MarkCross() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <rect x="32" y="6" width="16" height="28" />
      <rect x="20" y="14" width="40" height="12" opacity="0.7" />
    </svg>
  )
}

function MarkDot() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <circle cx="14" cy="20" r="6" />
      <circle cx="32" cy="20" r="6" opacity="0.7" />
      <circle cx="50" cy="20" r="6" opacity="0.4" />
      <circle cx="68" cy="20" r="6" opacity="0.2" />
    </svg>
  )
}

function MarkSlash() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <path d="M16 32 L34 8 L42 8 L24 32 Z" />
      <path d="M40 32 L58 8 L66 8 L48 32 Z" opacity="0.6" />
    </svg>
  )
}

function MarkPyramid() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <polygon points="40,6 12,34 68,34" />
      <polygon points="40,16 22,32 58,32" fill="rgba(0,0,0,0.45)" />
    </svg>
  )
}

const ENTRIES: ReadonlyArray<LogoCloudEntry> = [
  { id: "stratos", name: "Stratos", mark: <MarkChevron /> },
  { id: "panelworks", name: "Panelworks", mark: <MarkGrid /> },
  { id: "orbital", name: "Orbital Tow", mark: <MarkRing /> },
  { id: "voltbox", name: "Voltbox", mark: <MarkBolt /> },
  { id: "stripeline", name: "Stripeline", mark: <MarkStripe /> },
  { id: "apex", name: "Apex Freight", mark: <MarkArrow /> },
  { id: "hexworks", name: "Hexworks", mark: <MarkHex /> },
  { id: "longline", name: "Longline", mark: <MarkLines /> },
  { id: "kerb", name: "Kerb Co", mark: <MarkCross /> },
  { id: "node", name: "Node Tyres", mark: <MarkDot /> },
  { id: "kelvin", name: "Kelvin Forge", mark: <MarkSlash /> },
  { id: "spire", name: "Spire Auto", mark: <MarkPyramid /> },
]

export default function LogoCloudPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Logo cloud"
        title="Logo cloud"
        description="A muted logo wall — 12 abstract brand-mark SVGs (hand-drawn, not real third-party logos) with subtle entrance animation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Logo cloud" },
        ]}
      />

      <LogoCloud
        kicker="Trusted across the South Coast"
        heading="Tow yards, panel shops, and fleet customers."
        body="A round-up of trade partners we run parts through every week. Marks are illustrative abstractions for showcase purposes."
        entries={ENTRIES}
      />
    </main>
  )
}
