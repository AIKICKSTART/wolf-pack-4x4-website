import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./branding.module.css"

export const metadata: Metadata = {
  title: "Branding Lab | UI Primitives",
  description:
    "Fourteen reusable branding primitives — logo lockups, mark builder, palette extractor, colour roles, mood board, type pairings, voice and tone, do/don't, favicon, asset grid, voice axes, contrast grid, pattern library, and a brand guidelines template.",
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
    title: "Logo lockup",
    body: "Stacked, horizontal, mark-only, wordmark-only — every approved configuration with usage notes.",
    href: "/ui-primitives/branding/logo-lockup",
    accent: "red",
    role: "Identity",
  },
  {
    kicker: "Primitive 02",
    title: "Logo mark builder",
    body: "Mini editor for the mark — pick a silhouette, tone, and stroke treatment. Renders live.",
    href: "/ui-primitives/branding/logo-mark-builder",
    accent: "amber",
    role: "Exploration",
  },
  {
    kicker: "Primitive 03",
    title: "Palette extractor",
    body: "Pull a five-colour palette from any source frame. Hex, role chip, and named swatch.",
    href: "/ui-primitives/branding/palette-extractor",
    accent: "teal",
    role: "Colour",
  },
  {
    kicker: "Primitive 04",
    title: "Colour roles grid",
    body: "Semantic colour cascade — primary, surface, critical, success, muted, accent.",
    href: "/ui-primitives/branding/color-roles-grid",
    accent: "red",
    role: "Colour",
  },
  {
    kicker: "Primitive 05",
    title: "Mood board",
    body: "Masonry composition of references — images, textures, type, swatches, quotes.",
    href: "/ui-primitives/branding/mood-board",
    accent: "amber",
    role: "Direction",
  },
  {
    kicker: "Primitive 06",
    title: "Type pairing",
    body: "Display + body pairing card with rationale copy and full sample.",
    href: "/ui-primitives/branding/type-pairing-card",
    accent: "teal",
    role: "Typography",
  },
  {
    kicker: "Primitive 07",
    title: "Tone of voice",
    body: "Voice attributes chips with side-by-side do and don't writing examples.",
    href: "/ui-primitives/branding/tone-of-voice-card",
    accent: "green",
    role: "Voice",
  },
  {
    kicker: "Primitive 08",
    title: "Do / Don't",
    body: "Side-by-side good and bad treatment for a single brand rule with visual previews.",
    href: "/ui-primitives/branding/brand-do-dont-card",
    accent: "red",
    role: "Governance",
  },
  {
    kicker: "Primitive 09",
    title: "Favicon preview",
    body: "Tab strip preview plus 16, 32, 180, 192 favicon sizes with usage notes.",
    href: "/ui-primitives/branding/favicon-preview",
    accent: "teal",
    role: "Identity",
  },
  {
    kicker: "Primitive 10",
    title: "Logo asset grid",
    body: "Every logo variation — full colour, mono, inverse, outline, stencil, duotone — with download formats.",
    href: "/ui-primitives/branding/logo-asset-grid",
    accent: "amber",
    role: "Assets",
  },
  {
    kicker: "Primitive 11",
    title: "Brand voice slider",
    body: "Calibrate the brand on three voice axes — formality, seriousness, restraint.",
    href: "/ui-primitives/branding/brand-voice-slider",
    accent: "red",
    role: "Voice",
  },
  {
    kicker: "Primitive 12",
    title: "Contrast grid",
    body: "WCAG AA/AAA pass-fail matrix across foreground and background colours.",
    href: "/ui-primitives/branding/accessibility-contrast-grid",
    accent: "green",
    role: "Accessibility",
  },
  {
    kicker: "Primitive 13",
    title: "Pattern library tile",
    body: "Repeating SVG patterns — carbon fibre, diamond plate, herringbone, dots, hatch, brushed metal.",
    href: "/ui-primitives/branding/pattern-library-tile",
    accent: "teal",
    role: "Surfaces",
  },
  {
    kicker: "Primitive 14",
    title: "Guidelines template",
    body: "Long-form brand guidelines page — composes every other primitive into one document.",
    href: "/ui-primitives/branding/brand-guidelines-page-template",
    accent: "red",
    role: "Composition",
  },
  {
    kicker: "Bonus",
    title: "Brand book composition",
    body: "Every branding primitive composed into one navigable, scrollable brand book scene.",
    href: "/ui-primitives/branding/brand-book",
    accent: "amber",
    role: "Composition",
  },
]

const ACCENT_CLASS: Record<Block["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

function ThumbMark() {
  return (
    <svg viewBox="0 0 200 100" className={styles.thumbSvg} aria-hidden="true">
      <rect x="6" y="14" width="86" height="72" rx="10" fill="color-mix(in oklab, var(--primitive-text-strong) 6%, transparent)" />
      <circle cx="49" cy="50" r="22" fill="var(--primitive-red)" />
      <path
        d="M36 56 L46 44 L52 52 L60 40"
        fill="none"
        stroke="var(--primitive-text-on-accent)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <rect x="104" y="20" width="92" height="14" rx="3" fill="color-mix(in oklab, var(--primitive-text-strong) 32%, transparent)" />
      <rect x="104" y="40" width="62" height="8" rx="3" fill="color-mix(in oklab, var(--primitive-text-strong) 18%, transparent)" />
      <rect x="104" y="54" width="78" height="8" rx="3" fill="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
      <rect x="104" y="68" width="54" height="8" rx="3" fill="color-mix(in oklab, var(--primitive-text-strong) 10%, transparent)" />
    </svg>
  )
}

export default function BrandingIndexPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="22 / Branding lab"
        title="Branding primitives"
        description="Fourteen reusable branding-lab surfaces for the Oak Flats Mufflermen workshop identity — logo lockups, a mark builder, a palette extractor, colour roles, a mood board, type pairings, voice + tone, do/don't, favicons, an asset grid, voice axes, contrast grids, pattern library, and a long-form guidelines template."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab" },
        ]}
      />

      <span className={styles.notice}>
        Branding lab — distinct from runtime theming. Identity, voice, and asset governance.
      </span>

      <section className={styles.grid} aria-label="Branding primitives index">
        {BLOCKS.map((block) => (
          <Link
            key={block.href}
            href={block.href}
            className={[styles.card, ACCENT_CLASS[block.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <ThumbMark />
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{block.kicker}</span>
              <h2 className={styles.cardTitle}>{block.title}</h2>
              <p className={styles.cardBody}>{block.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{block.role}</span>
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
