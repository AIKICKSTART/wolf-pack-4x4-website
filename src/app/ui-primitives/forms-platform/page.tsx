import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./forms-platform.module.css"

export const metadata: Metadata = {
  title: "Forms platform | UI Primitives",
  description:
    "Forms-as-a-platform primitives for Oak Flats Mufflermen — drag-drop builder, submission inbox, anti-spam shield, Stripe payment fields, file upload with virus-scan, conditional logic, multi-step wizard, submission detail, notifications, export, webhooks, publish, and the funnel tile.",
}

interface FormsPlatformScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet" | "neutral"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<FormsPlatformScene> = [
  {
    kicker: "Primitive 01",
    title: "Form builder canvas",
    body: "Left rail palette grouped by category plus the centre stage with drop-zone indicators and per-field tone strips.",
    href: "/ui-primitives/forms-platform/form-builder-canvas",
    accent: "teal",
    glyph: "≡▤",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 02",
    title: "Field config panel",
    body: "Inspector for the active field — label, placeholder, required switch, help text, default, and option list.",
    href: "/ui-primitives/forms-platform/field-config-panel",
    accent: "teal",
    glyph: "▣",
    state: "Stateless",
  },
  {
    kicker: "Primitive 03",
    title: "Submission inbox row",
    body: "Compact submission row — form name, submitter, preview, status chip, amount, and timestamp.",
    href: "/ui-primitives/forms-platform/submission-inbox-row",
    accent: "amber",
    glyph: "▥",
    state: "Stateless",
  },
  {
    kicker: "Primitive 04",
    title: "Anti-spam shield card",
    body: "Defence stack — honeypot, Turnstile, rate-limit, reCAPTCHA — each row armed / off / warning with 24h block count.",
    href: "/ui-primitives/forms-platform/anti-spam-shield-card",
    accent: "violet",
    glyph: "◈",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Payment field card",
    body: "Stripe element preview with AUD amount, cardholder + CVC fields, and a tip selector for the workshop crew.",
    href: "/ui-primitives/forms-platform/payment-field-card",
    accent: "green",
    glyph: "$$",
    state: "Stateless",
  },
  {
    kicker: "Primitive 06",
    title: "File upload zone",
    body: "Dashed drop area with browse button plus a file list — progress bar, size meta, and ClamAV scan badge.",
    href: "/ui-primitives/forms-platform/file-upload-zone",
    accent: "teal",
    glyph: "↑",
    state: "Stateful · drag",
  },
  {
    kicker: "Primitive 07",
    title: "Conditional logic card",
    body: "If / then rule editor — chip-based source field, operator, value, then action and target.",
    href: "/ui-primitives/forms-platform/conditional-logic-card",
    accent: "violet",
    glyph: "↬",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 08",
    title: "Multi-step form rail",
    body: "Wizard track with per-step completion bars, current ring, skipped tone, and an overall percentage.",
    href: "/ui-primitives/forms-platform/multi-step-form-rail",
    accent: "teal",
    glyph: "◧◨",
    state: "Stateless",
  },
  {
    kicker: "Primitive 09",
    title: "Submission detail panel",
    body: "Full submission view — answer rows, flagged answers, audit log timeline, and the approve / reject / reply actions.",
    href: "/ui-primitives/forms-platform/submission-detail-panel",
    accent: "amber",
    glyph: "◳",
    state: "Stateless",
  },
  {
    kicker: "Primitive 10",
    title: "Notification rule row",
    body: "Single rule — channel icon (email / SMS / Slack / webhook), trigger, recipient, template, and on / off switch.",
    href: "/ui-primitives/forms-platform/notification-rule-row",
    accent: "green",
    glyph: "◆",
    state: "Stateful · toggle",
  },
  {
    kicker: "Primitive 11",
    title: "Data export card",
    body: "Export submissions — CSV / JSON / XLS / PDF preset tiles with row estimates and a date range badge.",
    href: "/ui-primitives/forms-platform/data-export-card",
    accent: "green",
    glyph: "⇲",
    state: "Stateful · select",
  },
  {
    kicker: "Primitive 12",
    title: "Webhook trigger row",
    body: "Endpoint + event row with delivery status, retry count, and a pretty-printed sample payload.",
    href: "/ui-primitives/forms-platform/webhook-trigger-row",
    accent: "amber",
    glyph: "</>",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Form publish card",
    body: "Publish targets — inline embed, popup, share link, QR — with a copy-ready snippet and the share URL.",
    href: "/ui-primitives/forms-platform/form-publish-card",
    accent: "teal",
    glyph: "▤↗",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 14",
    title: "Analytics funnel tile",
    body: "Started → halfway → submitted → abandoned funnel with retention bars and a 28-day conversion footer.",
    href: "/ui-primitives/forms-platform/analytics-funnel-tile",
    accent: "red",
    glyph: "▽",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full forms-platform scene",
    body: "Operator view — builder canvas top with inspector, multi-step rail, anti-spam shield, payment field, inbox, notifications, webhooks, publish, and the funnel tile.",
    href: "/ui-primitives/forms-platform/full-forms",
    accent: "red",
    glyph: "≡▤▣",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<FormsPlatformScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
  neutral: styles.accentNeutral,
}

export default function FormsPlatformIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Forms platform / 14 primitives + composition"
        title="Forms-as-a-platform primitives"
        description="Operator-facing forms platform for the Mufflermen workshop — drag-drop form builder, submission inbox, Stripe AU payment fields, ClamAV-scanned file uploads, anti-spam shield catching about 12 bots a day, conditional logic, multi-step wizard, notifications across email / SMS / Slack / webhook, data export, Hermes webhook delivery, publish targets, and a started → submitted funnel. Visual reference only."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Forms platform" },
        ]}
      />

      <span className={styles.notice}>Visual reference only — no real persistence wired</span>

      <FormPatternReferences
        ids={["builder-editor-admin-rules", "billing-payment-tax", "file-upload"]}
      />

      <section className={styles.grid} aria-label="Forms platform primitives">
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
