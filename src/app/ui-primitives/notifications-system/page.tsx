import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./notifications-system.module.css"

export const metadata: Metadata = {
  title: "Notifications System | UI Primitives",
  description:
    "Production notification surface for Oak Flats Mufflermen — toasts, banners, push permission, preference matrix, snooze, DND, digest scheduler, sound presets, priority rules, quiet hours, templates, delivery reports, and a full notification centre.",
}

interface NotificationScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "teal" | "amber" | "red" | "green" | "violet"
  glyph: string
  state: string
}

const SCENES: ReadonlyArray<NotificationScene> = [
  {
    kicker: "Primitive 01",
    title: "Toast stack",
    body: "Corner toast stack — top-right + bottom-center placements with collapse / expand.",
    href: "/ui-primitives/notifications-system/toast-stack",
    accent: "teal",
    glyph: "▤▤▤",
    state: "Stateful · collapse",
  },
  {
    kicker: "Primitive 02",
    title: "Toast card",
    body: "Single toast — info / success / warning / danger with optional action + countdown timer.",
    href: "/ui-primitives/notifications-system/toast-card",
    accent: "amber",
    glyph: "▭",
    state: "Stateful · timer",
  },
  {
    kicker: "Primitive 03",
    title: "Banner strip",
    body: "Page-top banner — announcement, alert, promo, maintenance with dismiss.",
    href: "/ui-primitives/notifications-system/banner-strip",
    accent: "amber",
    glyph: "═══",
    state: "Stateful · dismiss",
  },
  {
    kicker: "Primitive 04",
    title: "Push permission card",
    body: "Browser push prompt with three-state allow / decline / granted benefit list.",
    href: "/ui-primitives/notifications-system/push-permission-card",
    accent: "teal",
    glyph: "📱",
    state: "Stateful · 3 states",
  },
  {
    kicker: "Primitive 05",
    title: "Preference panel",
    body: "Event × channel matrix — per-row switches across SMS, email, push, in-app.",
    href: "/ui-primitives/notifications-system/preference-panel",
    accent: "teal",
    glyph: "▤×▥",
    state: "Stateful · matrix",
  },
  {
    kicker: "Primitive 06",
    title: "Snooze controller",
    body: "Snooze duration picker — 15m, 1h, today, until Mon — with active chip + clear.",
    href: "/ui-primitives/notifications-system/snooze-controller",
    accent: "violet",
    glyph: "Zz",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 07",
    title: "Digest scheduler",
    body: "Daily / weekly digest scheduler with weekday picker, timezone, send time.",
    href: "/ui-primitives/notifications-system/digest-scheduler",
    accent: "amber",
    glyph: "📅",
    state: "Stateful · cadence",
  },
  {
    kicker: "Primitive 08",
    title: "Sound preset row",
    body: "Sound picker with click-to-preview button — never auto-plays audio.",
    href: "/ui-primitives/notifications-system/sound-preset-row",
    accent: "violet",
    glyph: "♪",
    state: "Stateful · preview",
  },
  {
    kicker: "Primitive 09",
    title: "Do not disturb",
    body: "DND schedule — weekday picker, hush window, enable toggle, summary.",
    href: "/ui-primitives/notifications-system/do-not-disturb-card",
    accent: "violet",
    glyph: "🌙",
    state: "Stateful · schedule",
  },
  {
    kicker: "Primitive 10",
    title: "Notification centre",
    body: "Sliding panel with grouped notifications, filter tabs, search, mark-all.",
    href: "/ui-primitives/notifications-system/notification-center-panel",
    accent: "teal",
    glyph: "▣",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 11",
    title: "Priority rule row",
    body: "Escalation rule — if unread N minutes then page / email / SMS on-call.",
    href: "/ui-primitives/notifications-system/priority-rule-row",
    accent: "amber",
    glyph: "⚡",
    state: "Stateful · enable",
  },
  {
    kicker: "Primitive 12",
    title: "Quiet hours pill",
    body: "Current quiet-hours status pill — active / inactive / scheduled with edit.",
    href: "/ui-primitives/notifications-system/quiet-hours-pill",
    accent: "violet",
    glyph: "⏱",
    state: "Stateless · pill",
  },
  {
    kicker: "Primitive 13",
    title: "Event template card",
    body: "Per-event message template with merge tags and channel-aware subject hide.",
    href: "/ui-primitives/notifications-system/event-template-card",
    accent: "green",
    glyph: "{{ }}",
    state: "Stateful · text",
  },
  {
    kicker: "Primitive 14",
    title: "Delivery report row",
    body: "Per-message delivery status — sent / delivered / opened / clicked / failed / bounced.",
    href: "/ui-primitives/notifications-system/delivery-report-row",
    accent: "green",
    glyph: "✓✓",
    state: "Stateless · status",
  },
  {
    kicker: "Composition",
    title: "Full notification centre",
    body: "All 14 primitives composed into a complete notification operations scene.",
    href: "/ui-primitives/notifications-system/full-center",
    accent: "red",
    glyph: "▣ × 14",
    state: "Composition",
  },
]

const ACCENT_CLASS: Record<NotificationScene["accent"], string> = {
  teal: styles.accentTeal,
  amber: styles.accentAmber,
  red: styles.accentRed,
  green: styles.accentGreen,
  violet: styles.accentViolet,
}

export default function NotificationsSystemIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Family / Notifications system"
        title="Notifications system — production surface"
        description="Fourteen notification primitives for the Oak Flats Mufflermen workshop — toasts, banners, push, preferences, snooze, DND, digest, sounds, priority rules, quiet hours, templates, delivery reports, and a composed centre."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications system" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real delivery transports wired
      </span>

      <section className={styles.grid} aria-label="Notifications system primitives">
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
