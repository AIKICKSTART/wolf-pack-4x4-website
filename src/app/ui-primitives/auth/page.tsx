import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./page.module.css"

export const metadata: Metadata = {
  title: "Auth scenes | UI Primitives",
  description: "Reference library for the auth route group — login, signup, reset, two-factor, and onboarding scenes.",
}

interface AuthScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "rose"
  glyph: string
  state: string
}

const SCENES: AuthScene[] = [
  {
    kicker: "Scene 01",
    title: "Login",
    body: "Email + password split-screen with OAuth row, label-floats, and an animated gradient submit button.",
    href: "/ui-primitives/auth/login",
    accent: "red",
    glyph: "OFM",
    state: "Stateful · client",
  },
  {
    kicker: "Scene 02",
    title: "Signup",
    body: "Three-step provisioning stepper with live password strength and a final review summary card.",
    href: "/ui-primitives/auth/signup",
    accent: "amber",
    glyph: "01·02·03",
    state: "Stateful · stepper",
  },
  {
    kicker: "Scene 03",
    title: "Reset",
    body: "Email-entry surface toggles in-place to the magic-link sent confirmation with a resend countdown.",
    href: "/ui-primitives/auth/reset",
    accent: "teal",
    glyph: "@→✉",
    state: "Two-state",
  },
  {
    kicker: "Scene 04",
    title: "Two-factor",
    body: "Six-cell OTP pad with auto-advance, paste support, expiry timer, and a help quote-bubble tooltip.",
    href: "/ui-primitives/auth/two-factor",
    accent: "rose",
    glyph: "0 0 0 — 0 0 0",
    state: "Mid-flow",
  },
  {
    kicker: "Scene 05",
    title: "Onboarding",
    body: "Four-card scroll-snap tour: map bays, onboard team, connect telemetry, send first quote.",
    href: "/ui-primitives/auth/onboarding",
    accent: "green",
    glyph: "→ → → →",
    state: "Post-signup",
  },
]

const ACCENT_CLASS: Record<AuthScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  rose: styles.accentRose,
}

export default function AuthIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="16 / Auth"
        title="Auth scenes — design system reference"
        description="The auth route group ships the visual primitives for every workshop sign-in flow. These are visual references — no real authentication is wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth scenes" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real authentication wired
      </span>

      <FormPatternReferences ids={["auth-security"]} />

      <section className={styles.grid} aria-label="Auth scenes">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <span>{scene.glyph}</span>
            </div>
            <header className={styles.head}>
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
