import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"

import styles from "./notifications.module.css"

export const metadata: Metadata = {
  title: "Notification System | UI Primitives",
  description:
    "Deep notification system primitives — bell, popover, card, history timeline, snooze, quiet hours, channel matrix, rule builder, push and email previews, preview modal, unsubscribe template.",
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
    title: "Notification bell",
    body: "Top-bar bell icon with badge count and pulsing dot for new unread alerts.",
    href: "/ui-primitives/notifications/bell",
    accent: "red",
    glyph: "🔔",
    state: "Stateful · badge",
  },
  {
    kicker: "Primitive 02",
    title: "Notification popover",
    body: "Compact dropdown with All / Unread / Mentions tabs and live-updating list.",
    href: "/ui-primitives/notifications/popover",
    accent: "amber",
    glyph: "▽",
    state: "Stateful · tabs",
  },
  {
    kicker: "Primitive 03",
    title: "Notification card",
    body: "Standalone card with icon, title, excerpt, timestamp, tone, action row.",
    href: "/ui-primitives/notifications/card",
    accent: "teal",
    glyph: "▭",
    state: "Stateful · read",
  },
  {
    kicker: "Primitive 04",
    title: "History timeline",
    body: "Long-form notification history grouped by date with unread count chips.",
    href: "/ui-primitives/notifications/history-timeline",
    accent: "amber",
    glyph: "○─○",
    state: "Stateless",
  },
  {
    kicker: "Primitive 05",
    title: "Read-state toggle",
    body: "Tiny circular dot toggling between filled unread and hollow read state.",
    href: "/ui-primitives/notifications/read-state-toggle",
    accent: "red",
    glyph: "●○",
    state: "Stateful · pressed",
  },
  {
    kicker: "Primitive 06",
    title: "Snooze controls",
    body: "Snooze option panel with presets and inline custom date+time picker.",
    href: "/ui-primitives/notifications/snooze",
    accent: "teal",
    glyph: "Zz",
    state: "Stateful · radio",
  },
  {
    kicker: "Primitive 07",
    title: "Quiet hours scheduler",
    body: "Day-of-week chips, start/end times, exceptions for urgent and mentions.",
    href: "/ui-primitives/notifications/quiet-hours",
    accent: "violet",
    glyph: "◐",
    state: "Stateful · multi",
  },
  {
    kicker: "Primitive 08",
    title: "Channel matrix",
    body: "Preferences matrix — event types × delivery channels with per-cell toggle.",
    href: "/ui-primitives/notifications/channel-matrix",
    accent: "green",
    glyph: "▦",
    state: "Stateful · grid",
  },
  {
    kicker: "Primitive 09",
    title: "Rule builder",
    body: "Compose rules: when [event], send to [channel] after [delay], unless [cond].",
    href: "/ui-primitives/notifications/rule-builder",
    accent: "amber",
    glyph: "▻",
    state: "Stateful · slots",
  },
  {
    kicker: "Primitive 10",
    title: "Subscribe toggle",
    body: "Subscribe/Unsubscribe button with subtle bell-shake animation on opt-in.",
    href: "/ui-primitives/notifications/subscribe",
    accent: "red",
    glyph: "↑",
    state: "Stateful · pressed",
  },
  {
    kicker: "Primitive 11",
    title: "Push preview",
    body: "Realistic iOS / Android / lockscreen push notification mock with tone toggle.",
    href: "/ui-primitives/notifications/push-preview",
    accent: "teal",
    glyph: "▢",
    state: "Stateful · tone",
  },
  {
    kicker: "Primitive 12",
    title: "Email digest preview",
    body: "Mock email card styled as an inbox preview — sender, subject, preheader.",
    href: "/ui-primitives/notifications/email-digest",
    accent: "teal",
    glyph: "✉",
    state: "Stateless",
  },
  {
    kicker: "Primitive 13",
    title: "Preview modal",
    body: "Cross-channel preview — email + sms + push + in-app side by side.",
    href: "/ui-primitives/notifications/preview-modal",
    accent: "violet",
    glyph: "◇",
    state: "Stateless",
  },
  {
    kicker: "Primitive 14",
    title: "Unsubscribe template",
    body: "Post-link-click unsubscribe page with re-subscribe and manage CTAs.",
    href: "/ui-primitives/notifications/unsubscribe-template",
    accent: "amber",
    glyph: "✂",
    state: "Stateless",
  },
  {
    kicker: "Composition",
    title: "Full notification center",
    body: "Bell + open popover + history + matrix + quiet hours + preferences side panel.",
    href: "/ui-primitives/notifications/full-center",
    accent: "red",
    glyph: "🔔▦",
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

export default function NotificationsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Notifications / 14 primitives + composition"
        title="Notification system primitives"
        description="The deep notification stack — bell badging, popover, full history, snooze and quiet hours, channel matrix, rule builder, cross-channel previews, and the post-click unsubscribe page. Visual references — no real delivery wired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Notifications" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real delivery wired
      </span>

      <FormPatternReferences
        ids={["notification-permissions", "email-campaign-builder"]}
      />

      <section className={styles.grid} aria-label="Notification primitives">
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
