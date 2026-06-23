import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./kyc.module.css"

export const metadata: Metadata = {
  title: "KYC & Verification | UI Primitives",
  description:
    "KYC + verification primitives for the Mufflermen workshop — ID upload, selfie capture, document status, address verification, phone OTP, sanctions screening, tax form, business registration, beneficial owner card, KYC progress stepper, risk rating meter, manual review banner, success state, and compliance disclosure block, plus a composed full KYC journey.",
}

interface KycScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<KycScene> = [
  {
    kicker: "Primitive 01",
    title: "ID upload step",
    body: "Document upload step with ID frame outline, front + back uploaders, constraint chips, camera CTA, and verification progress meter.",
    href: "/ui-primitives/kyc/id-upload",
    accent: "red",
    glyph: "▭",
    state: "Stateful · upload",
  },
  {
    kicker: "Primitive 02",
    title: "Selfie capture card",
    body: "Circular selfie capture frame with tap-to-take CTA, instruction list and retake action after preview.",
    href: "/ui-primitives/kyc/selfie",
    accent: "amber",
    glyph: "◉",
    state: "Stateful · capture",
  },
  {
    kicker: "Primitive 03",
    title: "Document verification status",
    body: "Status card showing pending / under-review / approved / rejected / requires-additional-info with reviewer + ETA chip.",
    href: "/ui-primitives/kyc/document-status",
    accent: "teal",
    glyph: "⟳",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Address verification row",
    body: "Address row with proof-on-file / proof-needed chip and an upload-proof CTA when proof is missing.",
    href: "/ui-primitives/kyc/address",
    accent: "amber",
    glyph: "⌂",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Phone OTP entry",
    body: "Verification-specific 6-cell OTP with country code prefix, sent-to label and a resend timer.",
    href: "/ui-primitives/kyc/phone-otp",
    accent: "teal",
    glyph: "•••",
    state: "Stateful · cells",
  },
  {
    kicker: "Primitive 06",
    title: "Sanctions screen result",
    body: "AUSTRAC / OFAC / UN / DFAT screening card with scan timestamp, status chip and collapsible matched records.",
    href: "/ui-primitives/kyc/sanctions",
    accent: "green",
    glyph: "⌽",
    state: "Stateful · accordion",
  },
  {
    kicker: "Primitive 07",
    title: "Tax info form",
    body: "Country-first tax form — fields adapt for AU (TFN/ABN), US (SSN/ITIN/W-9), UK (UTR), NZ (IRD), or other (W-8BEN).",
    href: "/ui-primitives/kyc/tax-info",
    accent: "amber",
    glyph: "§",
    state: "Stateful · country",
  },
  {
    kicker: "Primitive 08",
    title: "Business registration",
    body: "ABN lookup with auto-fill, business structure radio chips (Sole trader / Pty Ltd / Partnership / Trust), trading-since.",
    href: "/ui-primitives/kyc/business-registration",
    accent: "red",
    glyph: "⌂⌂",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 09",
    title: "Beneficial owner card",
    body: "Owner list with name + ownership % chip + role + verification status + remove. Includes add-owner CTA.",
    href: "/ui-primitives/kyc/beneficial-owner",
    accent: "teal",
    glyph: "◐",
    state: "Stateful · add/remove",
  },
  {
    kicker: "Primitive 10",
    title: "KYC progress stepper",
    body: "Horizontal multi-step progress (Identity / Address / Business / Owners / Tax / Bank) with locked indicators.",
    href: "/ui-primitives/kyc/progress-stepper",
    accent: "amber",
    glyph: "◆◇◇",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Risk rating meter",
    body: "Risk rating meter (Low / Medium / High / Manual review) with tone-shifting fill and contributing factor chips.",
    href: "/ui-primitives/kyc/risk-rating",
    accent: "green",
    glyph: "↑",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Manual review banner",
    body: "Top banner indicating Under manual review by compliance team — ETA chip, case reference, contact CTA.",
    href: "/ui-primitives/kyc/manual-review-banner",
    accent: "amber",
    glyph: "!",
    state: "Stateless · alert",
  },
  {
    kicker: "Primitive 13",
    title: "Success state",
    body: "Final all-set card with large check, headline, follow-up CTAs (Connect Stripe, Start first quote) and confetti on appear.",
    href: "/ui-primitives/kyc/success-state",
    accent: "green",
    glyph: "✓",
    state: "Stateful · confetti",
  },
  {
    kicker: "Primitive 14",
    title: "Compliance disclosure",
    body: "Compact legal block — privacy paragraph, APP / GDPR policies, retention summary, privacy contact email.",
    href: "/ui-primitives/kyc/compliance-disclosure",
    accent: "neutral",
    glyph: "§",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full KYC journey",
    body: "Multi-step journey composing the stepper, ID upload, selfie, OTP, address, business, owners, tax, sanctions, risk + success state.",
    href: "/ui-primitives/kyc/full-journey",
    accent: "red",
    glyph: "✓◆◐",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<KycScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
  neutral: styles.accentNeutral,
}

export default function KycIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="KYC & Verification / 14 primitives + composition"
        title="KYC + verification primitives"
        description="Visual primitives for the Mufflermen onboarding KYC flow — built against Australian compliance vocabulary (AUSTRAC, ATO, ABN lookup, APP, NSW Fair Trading) plus US/UK/NZ adaptations. Visual reference only — no real backend wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC & Verification" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real backend wired
      </span>

      <FormPatternReferences
        ids={["compliance-kyc-consent", "file-upload", "address", "auth-security"]}
      />

      <section className={styles.grid} aria-label="KYC primitives">
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
