import type { Metadata } from "next"
import Link from "next/link"
import type { ReactNode } from "react"

import styles from "./onboarding.module.css"

export const metadata: Metadata = {
  title: "Onboarding | UI Primitives — Auth",
  description: "Auth scene reference — post-signup workshop onboarding tour for the primitives gallery.",
}

type CardAccent = "red" | "amber" | "teal" | "green"

interface OnboardingCard {
  kicker: string
  title: string
  body: string
  cta: string
  href: string
  accent: CardAccent
  illustration: ReactNode
}

const CARDS: OnboardingCard[] = [
  {
    kicker: "Step 01",
    title: "Map your bays",
    body: "Place each bay on the floor plan so dispatch can hand jobs out by proximity and skill set.",
    cta: "Open floorplan",
    href: "#bays",
    accent: "red",
    illustration: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M4 7h24v18H4z" />
        <path d="M4 13h24M14 7v18M22 7v18" />
        <circle cx="9" cy="20" r="1.6" fill="currentColor" />
        <circle cx="18" cy="10" r="1.6" fill="currentColor" />
      </svg>
    ),
  },
  {
    kicker: "Step 02",
    title: "Onboard the team",
    body: "Invite your team, assign roles, and route quote approvals so the right hands sign off jobs.",
    cta: "Invite mates",
    href: "#team",
    accent: "amber",
    illustration: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <circle cx="11" cy="11" r="4" />
        <circle cx="22" cy="13" r="3.2" />
        <path d="M4 25c0-3.2 3.5-6 7-6s7 2.8 7 6" />
        <path d="M18 25c.4-2.6 2.5-4.8 5-4.8 2.2 0 4 1.8 4 4" />
      </svg>
    ),
  },
  {
    kicker: "Step 03",
    title: "Connect telemetry",
    body: "Link bay sensors and shop-floor cameras so the dashboard streams live signal instead of guesses.",
    cta: "Pair sensors",
    href: "#telemetry",
    accent: "teal",
    illustration: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M16 4v14" />
        <path d="M9 11a8 8 0 0 1 14 0" />
        <path d="M6 7a12 12 0 0 1 20 0" />
        <circle cx="16" cy="22" r="2.4" fill="currentColor" />
        <path d="M12 27h8" />
      </svg>
    ),
  },
  {
    kicker: "Step 04",
    title: "Send your first quote",
    body: "Pull a job from the inbox, set the sound target, attach the rig walk-through and dispatch.",
    cta: "Draft a quote",
    href: "#quote",
    accent: "green",
    illustration: (
      <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" strokeLinecap="round">
        <path d="M6 5h17l3 3v19H6z" />
        <path d="M22 5v4h4" />
        <path d="M11 15h11M11 19h11M11 23h7" />
      </svg>
    ),
  },
]

const ACCENT_CLASS: Record<CardAccent, string> = {
  red: styles.cardAccentRed,
  amber: styles.cardAccentAmber,
  teal: styles.cardAccentTeal,
  green: styles.cardAccentGreen,
}

export default function OnboardingPage() {
  return (
    <main className={styles.page} aria-labelledby="onboarding-heading">
      <header className={styles.header}>
        <span className={styles.kickerRow}>Welcome to the workshop</span>
        <h1 id="onboarding-heading" className={styles.title}>
          Get your workshop running
        </h1>
        <p className={styles.subtitle}>
          Four short setup moves and you&apos;ll be quoting, dispatching, and reading bay telemetry like the rest of the Mufflermen network.
        </p>
      </header>

      <nav className={styles.controls} aria-label="Onboarding progress">
        <span className={styles.progress} aria-hidden="true">
          {CARDS.map((_, i) => (
            <span key={i} data-active={i === 0 || undefined} />
          ))}
        </span>
        <button type="button" className={styles.skipLink}>
          Skip for now
        </button>
      </nav>

      <section
        className={styles.scroller}
        role="region"
        aria-label="Workshop onboarding cards"
        tabIndex={0}
      >
        {CARDS.map((card, index) => (
          <article
            key={card.title}
            className={[styles.card, ACCENT_CLASS[card.accent]].join(" ")}
            aria-labelledby={`onboarding-card-${index}-title`}
          >
            <span className={styles.cardIllustration} aria-hidden="true">
              {card.illustration}
            </span>
            <div className={styles.cardCopy}>
              <span className={styles.cardKicker}>{card.kicker}</span>
              <h2 id={`onboarding-card-${index}-title`} className={styles.cardTitle}>
                {card.title}
              </h2>
              <p className={styles.cardBody}>{card.body}</p>
            </div>
            <a className={styles.cardCta} href={card.href}>
              <span>{card.cta}</span>
              <span aria-hidden="true">→</span>
            </a>
          </article>
        ))}
      </section>

      <footer className={styles.footer}>
        <button type="button" className={styles.dismissButton}>
          Remind me later
        </button>
        <Link className={styles.primaryButton} href="/ui-primitives/auth/login">
          <span>Enter the workshop</span>
          <span aria-hidden="true">→</span>
        </Link>
      </footer>
    </main>
  )
}
