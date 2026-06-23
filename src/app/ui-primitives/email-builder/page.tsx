import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./email-builder.module.css"

export const metadata: Metadata = {
  title: "Email builder | UI Primitives",
  description:
    "Visual email template builder primitives — drag canvas, block library, style inspector, device preview, image upload, personalisation tokens, send test, preheader editor, footer assembler, spam check, HTML output, theme picker, saved templates, click heatmap, and the full builder composition.",
}

interface EmailBuilderScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<EmailBuilderScene> = [
  {
    kicker: "Primitive 01",
    title: "Email canvas",
    body: "Centre 600px column with drop zones between rows and an inbox-style chrome header.",
    href: "/ui-primitives/email-builder/email-canvas",
    accent: "amber",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Block library palette",
    body: "Left rail of drag-from blocks — heading, image, button, columns, social row, footer, HTML, token.",
    href: "/ui-primitives/email-builder/block-library-palette",
    accent: "teal",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Style inspector pane",
    body: "Right inspector — colour, font, padding + margin sliders, and alignment chip row.",
    href: "/ui-primitives/email-builder/style-inspector-pane",
    accent: "teal",
    glyph: "▣",
    state: "Stateful · slider",
  },
  {
    kicker: "Primitive 04",
    title: "Mobile preview toggle",
    body: "Device chips for mobile + desktop, scale toggle, and a dark-mode preview switch.",
    href: "/ui-primitives/email-builder/mobile-preview-toggle",
    accent: "teal",
    glyph: "◧◨",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 05",
    title: "Inline image upload",
    body: "Drop zone or library picker with alt-text input, link target, and a retina @2x toggle.",
    href: "/ui-primitives/email-builder/inline-image-upload",
    accent: "green",
    glyph: "⤓",
    state: "Stateful · drop",
  },
  {
    kicker: "Primitive 06",
    title: "Personalisation token picker",
    body: "Searchable list of {{first_name}}, {{vehicle.rego}}, {{quote.total}}, {{workshop.bay}} with sample preview.",
    href: "/ui-primitives/email-builder/personalization-token-picker",
    accent: "violet",
    glyph: "{ }",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 07",
    title: "Send test email card",
    body: "Multi-recipient input, A/B/C variant chips, and a send CTA with sent-status indicator.",
    href: "/ui-primitives/email-builder/send-test-email-card",
    accent: "teal",
    glyph: "→",
    state: "Stateful · send",
  },
  {
    kicker: "Primitive 08",
    title: "Preheader editor",
    body: "Subject + preheader inputs with character counters and live spam-trigger chips.",
    href: "/ui-primitives/email-builder/preheader-editor",
    accent: "amber",
    glyph: "Aa",
    state: "Stateful · input",
  },
  {
    kicker: "Primitive 09",
    title: "Footer assembler",
    body: "Address, unsubscribe label, legal-link chips, and a social row toggle with live preview.",
    href: "/ui-primitives/email-builder/footer-assembler",
    accent: "neutral",
    glyph: "◳",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 10",
    title: "Spam score check",
    body: "0–10 deliverability gauge tone-shifted, plus a warnings list with ignore + restore controls.",
    href: "/ui-primitives/email-builder/spam-score-check",
    accent: "red",
    glyph: "⚠",
    state: "Stateful · ignore",
  },
  {
    kicker: "Primitive 11",
    title: "HTML output viewer",
    body: "Tabbed source — HTML, inlined CSS, plain text — rendered via the CodeBlock primitive.",
    href: "/ui-primitives/email-builder/html-output-viewer",
    accent: "teal",
    glyph: "</>",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 12",
    title: "Email theme picker",
    body: "Six pre-built themes — Workshop Dark / Heritage Cream / Cinematic / Newsletter / Receipt / Minimal.",
    href: "/ui-primitives/email-builder/email-theme-picker",
    accent: "amber",
    glyph: "◫",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 13",
    title: "Saved template list",
    body: "Sortable data table — thumb, name, last-edited, send count, open/duplicate/archive actions.",
    href: "/ui-primitives/email-builder/saved-template-list",
    accent: "green",
    glyph: "▥",
    state: "Stateful · sort",
  },
  {
    kicker: "Primitive 14",
    title: "Click heat map",
    body: "Tone-coded hotspots over the preview canvas, with a daily-clicks calendar in the side rail.",
    href: "/ui-primitives/email-builder/click-heat-map",
    accent: "red",
    glyph: "●",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full email builder scene",
    body: "Palette + canvas + inspector, preview toggle, preheader, send test, theme picker, saved list, spam check, HTML output, heatmap, image upload, token picker, footer.",
    href: "/ui-primitives/email-builder/full-builder",
    accent: "red",
    glyph: "≡▤▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<EmailBuilderScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function EmailBuilderIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Email builder / 14 primitives + composition"
        title="Visual email template builder"
        description="A Stripo / Beefree / Mailchimp-style designer cockpit for the Mufflermen workshop. The block palette, drop canvas, style inspector, and preview controls compose the build surface; preheader, footer, spam check, HTML output, theme picker, saved templates and the click heatmap fill out the operational rails. No real send pipeline — these primitives design emails, they don't ship them."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Email builder" },
        ]}
      />

      <span className={styles.notice}>Visual reference only — no real send pipeline wired</span>

      <FormPatternReferences
        ids={["email-campaign-builder", "file-upload", "newsletter"]}
      />

      <section className={styles.grid} aria-label="Email builder primitives">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
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
