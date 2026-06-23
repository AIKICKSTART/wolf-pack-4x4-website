import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./states.module.css"

export const metadata: Metadata = {
  title: "System States | UI Primitives",
}

type ThumbTone = "red" | "amber" | "teal" | "green"

interface StateEntry {
  index: string
  title: string
  href: string
  description: string
  tone: ThumbTone
}

const TONE_CLASS: Record<ThumbTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

const states: ReadonlyArray<StateEntry> = [
  {
    index: "404",
    title: "Not found",
    href: "/ui-primitives/states/not-found",
    description:
      "Workshop-themed misplaced muffler. Headline 'Off the map' plus suggested routes back to the booking surface.",
    tone: "red",
  },
  {
    index: "500",
    title: "Server error",
    href: "/ui-primitives/states/server-error",
    description:
      "Snapped exhaust with sparks. Hard alert with incident id, retry CTA, and a status page link.",
    tone: "red",
  },
  {
    index: "503",
    title: "Maintenance",
    href: "/ui-primitives/states/maintenance",
    description:
      "Crossed wrenches over a spinning rotor, hazard band across the top. Service window + ETA timestamps.",
    tone: "amber",
  },
  {
    index: "423",
    title: "Account locked",
    href: "/ui-primitives/states/account-locked",
    description:
      "Padlock + brake-rotor motif. Reasons list, unlock CTA, and a workshop desk contact line.",
    tone: "red",
  },
  {
    index: "402",
    title: "Payment required",
    href: "/ui-primitives/states/payment-required",
    description:
      "Receipt + chrome ribbon. Plan summary card with feature list and upgrade CTA.",
    tone: "teal",
  },
  {
    index: "451",
    title: "Region blocked",
    href: "/ui-primitives/states/region-blocked",
    description:
      "Compass with diagonal slash. Supported regions grid plus a VPN troubleshooting note.",
    tone: "teal",
  },
  {
    index: "INBOX",
    title: "Empty inbox",
    href: "/ui-primitives/states/empty-inbox",
    description:
      "Open envelope with tick stamp. Stats trio plus encouraging 'all caught up' copy.",
    tone: "green",
  },
  {
    index: "SEARCH",
    title: "Empty results",
    href: "/ui-primitives/states/empty-results",
    description:
      "Magnifying glass over a blueprint. Suggestion chip cloud and a refine-search CTA.",
    tone: "teal",
  },
  {
    index: "OFFLINE",
    title: "Offline",
    href: "/ui-primitives/states/offline",
    description:
      "Signal tower with strike-through. Retry counter, last-online timestamp, and a cached data note.",
    tone: "red",
  },
  {
    index: "SLOW",
    title: "Slow connection",
    href: "/ui-primitives/states/slow-connection",
    description:
      "Tortoise inside a buffering ring. Ping + throughput meters plus a 'switch to lite mode' toggle.",
    tone: "amber",
  },
  {
    index: "SOON",
    title: "Coming soon",
    href: "/ui-primitives/states/coming-soon",
    description:
      "Covered car silhouette under workshop lights. Countdown grid and a waitlist email field.",
    tone: "teal",
  },
  {
    index: "WIN",
    title: "Success confirmed",
    href: "/ui-primitives/states/success-confirmed",
    description:
      "Chequered flag + tick badge. Summary rows, confetti burst trigger, and primary follow-up CTA.",
    tone: "green",
  },
]

export default function StatesIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="14 / System states"
        title="Errors, empties, holds, wins"
        description="Twelve full-surface states for every moment a Mufflermen flow needs to pause, redirect, celebrate, or apologise. Bespoke illustrations, semantic roles, and reduced-motion fallbacks baked in."
      />
      <section className={styles.section} aria-label="System state primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 12 states</span>
          <h2 className={styles.sectionTitle}>Pick a state</h2>
          <p className={styles.subhead}>
            Each state lives in its own sub-route with realistic Oak Flats copy — Albion Park Rail
            suburbs, ADR checks, fitment slots, and AUD pricing.
          </p>
        </header>
        <div className={styles.grid}>
          {states.map((state) => (
            <Link
              key={state.href}
              className={`${styles.thumb} ${TONE_CLASS[state.tone]}`}
              href={state.href}
            >
              <span className={styles.thumbIndex}>{state.index}</span>
              <h3 className={styles.thumbTitle}>{state.title}</h3>
              <p className={styles.thumbCopy}>{state.description}</p>
              <span className={styles.thumbFoot}>
                Open state <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
