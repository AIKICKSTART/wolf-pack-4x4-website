import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./adr-compliance.module.css"

export const metadata: Metadata = {
  title: "ADR compliance + sound testing | UI Primitives",
  description:
    "Australian Design Rules (ADR) sound + emissions compliance primitives — sound meter, compliance band chips, test reports, drive-by results, RPM correlation, rule reference, declaration form, certificate template, inspector sign-off, pass-fail counter, education snippet, approval workflow, roadworthy vs ADR comparison, equipment status.",
}

interface AdrScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<AdrScene> = [
  {
    kicker: "Primitive 01",
    title: "ADR sound meter card",
    body: "Live dB(A) reading with ADR limit, radial peak indicator and tone-shifting compliance band chip.",
    href: "/ui-primitives/adr-compliance/adr-sound-meter-card",
    accent: "teal",
    glyph: "dB",
    state: "Stateless · meter",
  },
  {
    kicker: "Primitive 02",
    title: "Compliance band chip",
    body: "Legal / borderline / over chip with tone-shifting waveform glyph + role=alert for over-limit.",
    href: "/ui-primitives/adr-compliance/compliance-band-chip",
    accent: "amber",
    glyph: "▍▎",
    state: "Stateless · chip",
  },
  {
    kicker: "Primitive 03",
    title: "Sound test report",
    body: "Pre-mod / post-mod dB readings with delta, microphone position diagram and signed-by chip.",
    href: "/ui-primitives/adr-compliance/sound-test-report",
    accent: "red",
    glyph: "▲▼",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Drive-by noise test result",
    body: "Pass / fail stamp + speed + measured dB + ambient dB + traffic chip.",
    href: "/ui-primitives/adr-compliance/drive-by-noise-test-result",
    accent: "green",
    glyph: "PASS",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "RPM correlation chart",
    body: "Stacked area chart of dB(A) across the rev range with ADR limit overlay.",
    href: "/ui-primitives/adr-compliance/rpm-correlation-chart",
    accent: "teal",
    glyph: "∿",
    state: "Stateless · chart",
  },
  {
    kicker: "Primitive 06",
    title: "ADR rule reference card",
    body: "Rule number, title and plain-English summary plus link to the official PDF.",
    href: "/ui-primitives/adr-compliance/adr-rule-reference-card",
    accent: "amber",
    glyph: "ADR",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Modification declaration form",
    body: "Customer declaration — vehicle details, modification scope, e-signature pad and evidence upload.",
    href: "/ui-primitives/adr-compliance/modification-declaration-form",
    accent: "amber",
    glyph: "✎",
    state: "Stateful · form",
  },
  {
    kicker: "Primitive 08",
    title: "Certificate of compliance",
    body: "In-app preview of the ADR certificate with crest, vehicle details, ADR ref, and verification QR.",
    href: "/ui-primitives/adr-compliance/certificate-of-compliance-template",
    accent: "violet",
    glyph: "§",
    state: "Stateless · preview",
  },
  {
    kicker: "Primitive 09",
    title: "Inspector sign-off card",
    body: "Technician avatar + qualification + sign-off timestamp + photo evidence count.",
    href: "/ui-primitives/adr-compliance/inspector-signoff-card",
    accent: "teal",
    glyph: "✓",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Pass / fail counter",
    body: "Today / week / month aggregates with a pass rate radial meter at the side.",
    href: "/ui-primitives/adr-compliance/pass-fail-counter",
    accent: "green",
    glyph: "%",
    state: "Stateless · meter",
  },
  {
    kicker: "Primitive 11",
    title: "ADR education snippet",
    body: "Customer education spotlight — what ADR means plus key rule chips and further reading.",
    href: "/ui-primitives/adr-compliance/adr-education-snippet",
    accent: "neutral",
    glyph: "i",
    state: "Stateless · marketing",
  },
  {
    kicker: "Primitive 12",
    title: "Modification approval workflow",
    body: "Five-step process: declaration → pre-test → modification → post-test → certificate.",
    href: "/ui-primitives/adr-compliance/modification-approval-workflow",
    accent: "violet",
    glyph: "→→",
    state: "Stateless · steps",
  },
  {
    kicker: "Primitive 13",
    title: "Roadworthy vs ADR",
    body: "Side-by-side comparison of NSW roadworthy scope and the federal ADR programme.",
    href: "/ui-primitives/adr-compliance/roadworthy-vs-adr-comparison",
    accent: "amber",
    glyph: "⇆",
    state: "Stateless · table",
  },
  {
    kicker: "Primitive 14",
    title: "Test equipment status",
    body: "Sound meter, accelerometer and microphone — calibration dates, faults and last-checked chips.",
    href: "/ui-primitives/adr-compliance/test-equipment-status",
    accent: "red",
    glyph: "CAL",
    state: "Stateless · dashboard",
  },
  {
    kicker: "Composition",
    title: "Full compliance flow",
    body: "End-to-end composition — declaration → meter → reports → rpm chart → drive-by → sign-off → certificate.",
    href: "/ui-primitives/adr-compliance/full-compliance-flow",
    accent: "red",
    glyph: "▦▦",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<AdrScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
  violet: styles.accentViolet,
}

export default function AdrComplianceIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="ADR / 14 primitives + composition"
        title="ADR compliance + sound testing primitives"
        description="Australian Design Rules sound, emissions and modification primitives for the Oak Flats Mufflermen workshop. Built around ADR 28/01 (90 dB(A) stationary), ADR 28/02 (92 dB(A) extended), ADR 79/04 emissions, ADR 83/00 motorcycles, and the NSW VSI 08 + VSI 14 vehicle standards information sheets. Visual reference only — no real measurements wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "ADR compliance" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real measurements wired
      </span>

      <section className={styles.grid} aria-label="ADR compliance primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            prefetch={false}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span className={styles.thumbGlyph}>{scene.glyph}</span>
            </div>
            <header>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
