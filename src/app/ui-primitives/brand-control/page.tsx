import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./brand-control.module.css"

export const metadata: Metadata = {
  title: "Brand Control | UI Primitives",
  description:
    "Fourteen brand-control primitives — design tokens, palette, typography, motion, assets, roles, audit, deploy, guidelines, umbrella graph, coverage, accessibility gate, and release channels.",
}

interface Block {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  role: string
}

const BLOCKS: ReadonlyArray<Block> = [
  {
    kicker: "Primitive 01",
    title: "Token editor",
    body: "Colour, spacing, radius, shadow, font tokens with live preview and history rail.",
    href: "/ui-primitives/brand-control/token-editor",
    accent: "red",
    role: "Tokens",
  },
  {
    kicker: "Primitive 02",
    title: "Palette builder",
    body: "OKLCH wheel, contrast checker, WCAG verdict — pick swatches that pass.",
    href: "/ui-primitives/brand-control/palette-builder",
    accent: "amber",
    role: "Colour",
  },
  {
    kicker: "Primitive 03",
    title: "Typography pairing",
    body: "Display × body pairing card with live sample and usage rationale.",
    href: "/ui-primitives/brand-control/typography-pairing",
    accent: "teal",
    role: "Type",
  },
  {
    kicker: "Primitive 04",
    title: "Motion system",
    body: "Duration × easing tokens with a live scrubber. Reduced-motion aware.",
    href: "/ui-primitives/brand-control/motion-system-panel",
    accent: "green",
    role: "Motion",
  },
  {
    kicker: "Primitive 05",
    title: "Asset CDN tile",
    body: "Brand asset card with usage count, variant detector, and uploader trace.",
    href: "/ui-primitives/brand-control/asset-cdn-tile",
    accent: "amber",
    role: "Assets",
  },
  {
    kicker: "Primitive 06",
    title: "Role matrix",
    body: "Role × permission matrix with inheritance arrows.",
    href: "/ui-primitives/brand-control/role-matrix",
    accent: "red",
    role: "Access",
  },
  {
    kicker: "Primitive 07",
    title: "Team roster card",
    body: "Member card with role pill, last-active stamp, and access scope.",
    href: "/ui-primitives/brand-control/team-roster-card",
    accent: "teal",
    role: "People",
  },
  {
    kicker: "Primitive 08",
    title: "Audit log row",
    body: "Single audit entry — actor, action, resource, timestamp, and diff.",
    href: "/ui-primitives/brand-control/audit-log-row",
    accent: "amber",
    role: "Audit",
  },
  {
    kicker: "Primitive 09",
    title: "Theme deploy panel",
    body: "Staging → production promotion with rollout % and halt control.",
    href: "/ui-primitives/brand-control/theme-deploy-panel",
    accent: "green",
    role: "Deploy",
  },
  {
    kicker: "Primitive 10",
    title: "Brand guideline card",
    body: "Single guideline rule (logo, voice, do, don't) with print-friendly mode.",
    href: "/ui-primitives/brand-control/brand-guideline-card",
    accent: "red",
    role: "Guidelines",
  },
  {
    kicker: "Primitive 11",
    title: "Umbrella impact graph",
    body: "Which primitives consume this token. The umbrella made visible.",
    href: "/ui-primitives/brand-control/umbrella-impact-graph",
    accent: "amber",
    role: "Impact",
  },
  {
    kicker: "Primitive 12",
    title: "Usage coverage strip",
    body: "Token adoption rate across every primitive family.",
    href: "/ui-primitives/brand-control/usage-coverage-strip",
    accent: "teal",
    role: "Coverage",
  },
  {
    kicker: "Primitive 13",
    title: "Accessibility gate",
    body: "WCAG check summary (contrast / focus / motion / aria) with verdict.",
    href: "/ui-primitives/brand-control/accessibility-gate-card",
    accent: "green",
    role: "A11y",
  },
  {
    kicker: "Primitive 14",
    title: "Release channel pill",
    body: "Channel selector — alpha / beta / production with diff badge.",
    href: "/ui-primitives/brand-control/release-channel-pill",
    accent: "red",
    role: "Channels",
  },
  {
    kicker: "Composition",
    title: "Full brand-control hub",
    body: "Every primitive composed into the central umbrella-effect hub.",
    href: "/ui-primitives/brand-control/full-hub",
    accent: "teal",
    role: "Hub",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.cardAccentRed,
  amber: styles.cardAccentAmber,
  teal: styles.cardAccentTeal,
  green: styles.cardAccentGreen,
}

export default function BrandControlIndexPage() {
  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <PageHeader
          kicker="Umbrella · Brand control"
          title="Brand control primitives"
          description="Fourteen reusable surfaces for the central brand-control hub — design tokens, palette, typography, motion, assets, roles, audit, deploy, guidelines, impact graph, coverage, accessibility gate, and release channels. One token edit cascades to every consuming primitive."
          crumbs={[
            { label: "UI Primitives", href: "/ui-primitives" },
            { label: "Brand control" },
          ]}
        />

        <span className={styles.notice}>
          Umbrella effect — one source of truth for design tokens, brand assets, roles, and deploys.
        </span>

        <section className={styles.grid} aria-label="Brand control primitives index">
          {BLOCKS.map((block) => (
            <Link
              key={block.href}
              href={block.href}
              className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
            >
              <header>
                <span className={styles.cardKicker}>{block.kicker}</span>
                <h2 className={styles.cardTitle}>{block.title}</h2>
                <p className={styles.cardBody}>{block.body}</p>
              </header>
              <span aria-hidden="true" />
              <footer className={styles.meta}>
                <span>{block.role}</span>
                <span className={styles.metaAction}>
                  Open <span aria-hidden="true">→</span>
                </span>
              </footer>
            </Link>
          ))}
        </section>
      </div>
    </main>
  )
}
