import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./loyalty.module.css"

export const metadata: Metadata = {
  title: "Loyalty | UI Primitives",
  description:
    "Loyalty, membership, and referral primitives shipped from the Oak Flats Mufflermen workshop — tier cards, points ledger, rewards catalogue, referrals, payouts.",
}

interface LoyaltyScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<LoyaltyScene> = [
  {
    kicker: "Scene 01",
    title: "Loyalty card",
    body: "Holographic member card — tier badge, points balance, holder name, member-since date.",
    href: "/ui-primitives/loyalty/loyalty-card",
    accent: "amber",
    glyph: "M·1",
    state: "Visual · count-up",
    preview: [
      { label: "Tier", value: "Brodie" },
      { label: "Points", value: "32,480" },
    ],
  },
  {
    kicker: "Scene 02",
    title: "Points ledger row",
    body: "Single activity row in the points ledger — timestamp, action, points-earned chip.",
    href: "/ui-primitives/loyalty/points-earning-row",
    accent: "green",
    glyph: "+PTS",
    state: "Visual only",
    preview: [
      { label: "Row", value: "Earn" },
      { label: "Pts", value: "+250" },
    ],
  },
  {
    kicker: "Scene 03",
    title: "Tier progress meter",
    body: "Current → next tier segmented bar with remaining points and next-perk preview.",
    href: "/ui-primitives/loyalty/tier-progress-meter",
    accent: "teal",
    glyph: "GLD→PLT",
    state: "Visual · meter",
    preview: [
      { label: "From", value: "Gold" },
      { label: "Need", value: "1,820 pts" },
    ],
  },
  {
    kicker: "Scene 04",
    title: "Tier benefits card",
    body: "Per-tier benefits list — check / locked icons + upgrade CTA into next tier.",
    href: "/ui-primitives/loyalty/tier-benefits-card",
    accent: "amber",
    glyph: "✓ ✕",
    state: "Visual only",
    preview: [
      { label: "Tier", value: "Platinum" },
      { label: "Unlocked", value: "5 / 8" },
    ],
  },
  {
    kicker: "Scene 05",
    title: "Reward catalogue tile",
    body: "Single redeemable reward — thumbnail, name, points cost, stock chip, redeem CTA.",
    href: "/ui-primitives/loyalty/reward-catalogue-tile",
    accent: "amber",
    glyph: "🎁",
    state: "Stateful · redeem",
    preview: [
      { label: "Reward", value: "Dyno" },
      { label: "Cost", value: "5,000 pts" },
    ],
  },
  {
    kicker: "Scene 06",
    title: "Redeem CTA",
    body: "State machine button — idle → confirming → redeemed (confetti) → fail.",
    href: "/ui-primitives/loyalty/redeem-cta-button",
    accent: "red",
    glyph: "↺",
    state: "Stateful · async",
    preview: [
      { label: "States", value: "4" },
      { label: "FX", value: "Confetti" },
    ],
  },
  {
    kicker: "Scene 07",
    title: "Referral link generator",
    body: "Shareable link + code + QR with email/SMS share buttons.",
    href: "/ui-primitives/loyalty/referral-link-generator",
    accent: "teal",
    glyph: "QR",
    state: "Stateful · copy",
    preview: [
      { label: "Share", value: "Email · SMS" },
      { label: "QR", value: "144px" },
    ],
  },
  {
    kicker: "Scene 08",
    title: "Referral leaderboard",
    body: "Top referrers table — rank chip, avatar, name, referral count, AUD earned.",
    href: "/ui-primitives/loyalty/referral-leaderboard",
    accent: "amber",
    glyph: "#01",
    state: "Visual · sortable",
    preview: [
      { label: "Rows", value: "8" },
      { label: "Period", value: "May 26" },
    ],
  },
  {
    kicker: "Scene 09",
    title: "Affiliate payout history",
    body: "Payout table — date, AUD amount, PayID/BSB method, status chip.",
    href: "/ui-primitives/loyalty/affiliate-payout-history",
    accent: "green",
    glyph: "PAY",
    state: "Visual · sortable",
    preview: [
      { label: "Rows", value: "6" },
      { label: "Status", value: "Paid · Scheduled" },
    ],
  },
  {
    kicker: "Scene 10",
    title: "Milestone celebration",
    body: "Confetti-on-appear surface — headline, earned reward chip, share CTA.",
    href: "/ui-primitives/loyalty/member-milestone-celebration",
    accent: "red",
    glyph: "★",
    state: "Visual · autofire",
    preview: [
      { label: "Kind", value: "Tier-up" },
      { label: "FX", value: "Confetti" },
    ],
  },
  {
    kicker: "Scene 11",
    title: "Renewal banner",
    body: "Sticky CTA bar with days-remaining countdown + auto-renew toggle.",
    href: "/ui-primitives/loyalty/membership-renewal-banner",
    accent: "amber",
    glyph: "↻",
    state: "Stateful · toggle",
    preview: [
      { label: "Days", value: "12 left" },
      { label: "Auto", value: "Off" },
    ],
  },
  {
    kicker: "Scene 12",
    title: "Lapsed-member rescue",
    body: "Win-back surface — friendly headline, reactivation offer, CTA.",
    href: "/ui-primitives/loyalty/lapsed-member-rescue-card",
    accent: "teal",
    glyph: "♥",
    state: "Visual only",
    preview: [
      { label: "Offer", value: "$50 credit" },
      { label: "Lapsed", value: "8 months" },
    ],
  },
  {
    kicker: "Scene 13",
    title: "Benefit chip",
    body: "Tiny chip — benefit label + earned/saved/redeemed amount.",
    href: "/ui-primitives/loyalty/member-benefit-chip",
    accent: "green",
    glyph: "$$",
    state: "Visual only",
    preview: [
      { label: "Variants", value: "4" },
      { label: "Tones", value: "Earned · Saved" },
    ],
  },
  {
    kicker: "Scene 14",
    title: "Birthday reward",
    body: "Birthday card with confetti, bonus-points chip, and claim CTA.",
    href: "/ui-primitives/loyalty/birthday-reward-card",
    accent: "amber",
    glyph: "🎂",
    state: "Stateful · claim",
    preview: [
      { label: "Bonus", value: "+1,000 pts" },
      { label: "FX", value: "Confetti" },
    ],
  },
]

const ACCENT_CLASS: Record<LoyaltyScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function LoyaltyIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22 / Loyalty"
        title="Loyalty, membership, referral"
        description="Fourteen loyalty primitives used across the Oak Flats workshop — Bronze through Brodie tiers, points ledger, rewards catalogue, referrals, payouts, milestones, renewals, and lapsed-member rescue."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Loyalty" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real points or payouts wired
      </span>

      <section className={styles.grid} aria-label="Loyalty gallery patterns">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbGlyph}>{scene.glyph}</span>
                {scene.preview.map((row) => (
                  <span key={row.label} className={styles.thumbField}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </span>
                ))}
              </div>
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
        <Link
          href="/ui-primitives/loyalty/full-member-portal"
          className={[styles.card, styles.accentRed].join(" ")}
        >
          <div className={styles.thumb} aria-hidden="true">
            <div className={styles.thumbInner}>
              <span className={styles.thumbGlyph}>PORTAL</span>
              <span className={styles.thumbField}>
                <span>Scene</span>
                <span>Full member</span>
              </span>
              <span className={styles.thumbField}>
                <span>Combos</span>
                <span>11 primitives</span>
              </span>
            </div>
          </div>
          <header className={styles.head}>
            <span className={styles.cardKicker}>Bonus</span>
            <h2 className={styles.cardTitle}>Full member portal</h2>
            <p className={styles.cardBody}>
              Full member portal scene composing loyalty card, tier progress, benefits, rewards catalogue,
              ledger, referrals, leaderboard, payouts, renewal banner, milestone, and birthday reward.
            </p>
          </header>
          <footer className={styles.meta}>
            <span>Stateful · composition</span>
            <span className={styles.metaAction}>
              Open <span aria-hidden="true">→</span>
            </span>
          </footer>
        </Link>
      </section>
    </main>
  )
}
