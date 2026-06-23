import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { BrandDoDontCard } from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Do / Don't | Branding Lab",
  description:
    "Primitive 08 — side-by-side good and bad treatments of a single brand rule with visual previews.",
}

function MarkClean() {
  return (
    <svg viewBox="0 0 100 60" width="80" height="60" aria-hidden="true">
      <rect width="100" height="60" rx="6" fill="var(--primitive-canvas)" />
      <circle cx="34" cy="30" r="14" fill="var(--primitive-red)" />
      <path
        d="M26 33 L32 27 L36 31 L42 25"
        fill="none"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="56" y="22" width="36" height="6" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 78%, transparent)" />
      <rect x="56" y="32" width="24" height="4" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 42%, transparent)" />
    </svg>
  )
}

function MarkSquished() {
  return (
    <svg viewBox="0 0 100 60" width="80" height="60" aria-hidden="true">
      <rect width="100" height="60" rx="6" fill="var(--primitive-canvas)" />
      <ellipse cx="34" cy="30" rx="22" ry="10" fill="var(--primitive-red)" />
      <path
        d="M22 33 L30 27 L34 31 L40 25"
        fill="none"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <rect x="62" y="20" width="36" height="10" rx="2" fill="color-mix(in oklab, var(--primitive-text-strong) 78%, transparent)" transform="skewX(-12)" />
    </svg>
  )
}

function MarkContrast() {
  return (
    <svg viewBox="0 0 100 60" width="80" height="60" aria-hidden="true">
      <rect width="100" height="60" rx="6" fill="var(--primitive-text-on-accent)" />
      <circle cx="50" cy="30" r="16" fill="var(--primitive-red)" />
      <path
        d="M40 33 L48 25 L54 31 L60 23"
        fill="none"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

function MarkLowContrast() {
  return (
    <svg viewBox="0 0 100 60" width="80" height="60" aria-hidden="true">
      <rect width="100" height="60" rx="6" fill="var(--primitive-red-dark)" />
      <circle cx="50" cy="30" r="16" fill="var(--primitive-red)" />
      <path
        d="M40 33 L48 25 L54 31 L60 23"
        fill="none"
        stroke="color-mix(in oklab, var(--primitive-red) 60%, var(--primitive-red-dark))"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
    </svg>
  )
}

const RULES = [
  {
    rule: "Always keep the mark in its locked aspect ratio.",
    doLabel: "Locked aspect ratio",
    doDetail: "The disc stays a disc. The chevron keeps its 3:1 stroke ratio.",
    doVisual: <MarkClean />,
    dontLabel: "Stretched mark",
    dontDetail: "Never scale on a single axis. The mark loses its silhouette inside 3 metres.",
    dontVisual: <MarkSquished />,
  },
  {
    rule: "Hold a minimum 4.5:1 contrast against the surface.",
    doLabel: "Mark on white",
    doDetail: "Workshop red on white gives a 5.13:1 contrast — safe for any signage.",
    doVisual: <MarkContrast />,
    dontLabel: "Red on red",
    dontDetail: "Lookalike tones drop the contrast under WCAG AA. Never lay the mark on near-tone reds.",
    dontVisual: <MarkLowContrast />,
  },
]

export default function BrandDoDontCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Do & Don't"
        title="Do / Don't card"
        description="A single rule, two examples — green tick for the approved treatment, red cross for the abuse. Lift this primitive into the brand guidelines whenever you need to make a hard governance call obvious."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Do / Don't" },
        ]}
      />
      <section style={{ display: "grid", gap: 18 }}>
        {RULES.map((rule) => (
          <BrandDoDontCard key={rule.rule} {...rule} />
        ))}
      </section>
    </main>
  )
}
