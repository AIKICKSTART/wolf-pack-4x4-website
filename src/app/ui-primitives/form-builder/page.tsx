import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./form-builder.module.css"

export const metadata: Metadata = {
  title: "Form builder | UI Primitives",
  description:
    "Visual form builder primitives — field palette, canvas, inspector, preview, theme picker, multi-page wizard, embed code generator, submission analytics, validation editor, logic builders, and the full composition.",
}

interface FormBuilderScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<FormBuilderScene> = [
  {
    kicker: "Primitive 01",
    title: "Field palette",
    body: "Left rail palette grouped by category — text, numeric, selection, media, payments — each draggable affordance with type icon, name, hint.",
    href: "/ui-primitives/form-builder/field-palette",
    accent: "teal",
    glyph: "≡",
    state: "Stateless",
  },
  {
    kicker: "Primitive 02",
    title: "Form canvas",
    body: "Vertical drop zones with idle, hover, and active visual states. Selected field gets an amber highlight ring.",
    href: "/ui-primitives/form-builder/form-canvas",
    accent: "amber",
    glyph: "▤",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Field config pane",
    body: "Right inspector — label, placeholder, required toggle, default value, validation chips, and a collapsible Advanced block.",
    href: "/ui-primitives/form-builder/field-config-pane",
    accent: "teal",
    glyph: "▣",
    state: "Stateful · expand",
  },
  {
    kicker: "Primitive 04",
    title: "Field type icon",
    body: "Single component dispatching 15 inline SVG glyphs — short text through signature, payment, yes / no — sized by prop.",
    href: "/ui-primitives/form-builder/field-type-icon",
    accent: "neutral",
    glyph: "◐",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Logic rule builder",
    body: "Chip-based show / hide rule editor — When [field] [operator] [value], then [action] [target] — visual reference only.",
    href: "/ui-primitives/form-builder/logic-rule-builder",
    accent: "violet",
    glyph: "≪≫",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "Field preview",
    body: "Live respondent-side preview of any field — text, dropdown, rating, file upload, signature, payment, yes / no.",
    href: "/ui-primitives/form-builder/field-preview",
    accent: "green",
    glyph: "◳",
    state: "Stateless",
  },
  {
    kicker: "Primitive 07",
    title: "Form theme picker",
    body: "Four mini preview tiles — Minimal / Workshop dark / Editorial light / Brutalist — radiogroup with active ring.",
    href: "/ui-primitives/form-builder/form-theme-picker",
    accent: "amber",
    glyph: "◫",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 08",
    title: "Multi-page wizard",
    body: "Page tabs with per-page field count, an add-page action, and reorder / preview controls in the footer.",
    href: "/ui-primitives/form-builder/multi-page-wizard",
    accent: "teal",
    glyph: "◧◨",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 09",
    title: "Embed code generator",
    body: "Mode selector — inline, popup, slider, fullscreen — plus a copy-ready snippet rendered via the CodeBlock primitive.",
    href: "/ui-primitives/form-builder/embed-code",
    accent: "teal",
    glyph: "</>",
    state: "Stateful · mode",
  },
  {
    kicker: "Primitive 10",
    title: "Submission analytics",
    body: "Totals, average time-to-complete, completion gauge, plus per-field drop-off bars tone-coded high / mid / low.",
    href: "/ui-primitives/form-builder/submission-analytics",
    accent: "green",
    glyph: "▥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 11",
    title: "Validation editor",
    body: "Required / regex / length / value range / file size / file type — each rule as an aria-pressed chip toggle.",
    href: "/ui-primitives/form-builder/validation-editor",
    accent: "teal",
    glyph: "✓",
    state: "Stateless",
  },
  {
    kicker: "Primitive 12",
    title: "Required toggle chip",
    body: "Compact aria-pressed chip with red asterisk indicator and On / Off micro-label. Stateful on click.",
    href: "/ui-primitives/form-builder/required-toggle",
    accent: "red",
    glyph: "*",
    state: "Stateful · press",
  },
  {
    kicker: "Primitive 13",
    title: "Default value editor",
    body: "Adapts UI by field type — text input, date picker, dropdown, rating, multi-select chips, yes / no, file row.",
    href: "/ui-primitives/form-builder/default-value-editor",
    accent: "amber",
    glyph: "↩",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Conditional logic flow",
    body: "Source → conditions → target dependency graph with tone-coded SVG edges and a legend chip for each action.",
    href: "/ui-primitives/form-builder/conditional-logic-flow",
    accent: "violet",
    glyph: "↬",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full form builder scene",
    body: "Palette left + Canvas centre + Inspector right with Wizard top, Logic visualizer below, and Analytics in the side rail.",
    href: "/ui-primitives/form-builder/full-builder",
    accent: "red",
    glyph: "≡▤▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<FormBuilderScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function FormBuilderIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Form builder / 14 primitives + composition"
        title="Visual form builder primitives"
        description="Visual references for a Typeform / Tally-style form designer — a palette of field types, a drop-zone canvas, an inspector with validation and default value editors, logic rule builders and a flow visualiser, embed code, analytics, theming, and a multi-page wizard. No real form persistence — these primitives design forms, they don't ship them."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Form builder" },
        ]}
      />

      <span className={styles.notice}>Visual reference only — no real persistence wired</span>

      <FormPatternReferences
        ids={["builder-editor-admin-rules", "survey-nps", "contact"]}
      />

      <section className={styles.grid} aria-label="Form builder primitives">
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
