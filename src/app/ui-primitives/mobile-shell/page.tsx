import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./mobile-shell.module.css"

export const metadata: Metadata = {
  title: "Mobile Shell | UI Primitives",
}

interface MobileEntry {
  index: string
  title: string
  href: string
  description: string
  bonus?: boolean
}

const entries: ReadonlyArray<MobileEntry> = [
  {
    index: "01",
    title: "Mobile viewport",
    href: "/ui-primitives/mobile-shell/viewport",
    description:
      "Phone simulator frame at 390×844 with bezel, notch, speaker grille and home indicator. Wraps every other mobile primitive in a believable surface.",
  },
  {
    index: "02",
    title: "Top app bar",
    href: "/ui-primitives/mobile-shell/top-app-bar",
    description:
      "Sticky bar with title, back chevron, leading slot, trailing chips. Solid and transparent variants for hero pages.",
  },
  {
    index: "03",
    title: "Bottom nav bar",
    href: "/ui-primitives/mobile-shell/bottom-nav",
    description:
      "Persistent 4 to 5 tab nav with shared layout sliding pill or underline. Active dot, badge counter, aria-current.",
  },
  {
    index: "04",
    title: "Tab indicator strip",
    href: "/ui-primitives/mobile-shell/tab-strip",
    description:
      "Horizontally scrollable topical tabs with sliding underline. Different rhythm from the bottom nav.",
  },
  {
    index: "05",
    title: "Mobile drawer",
    href: "/ui-primitives/mobile-shell/drawer",
    description:
      "Side drawer that slides from the left. Dimmed backdrop, swipe-left to dismiss, Esc support.",
  },
  {
    index: "06",
    title: "Action sheet",
    href: "/ui-primitives/mobile-shell/action-sheet",
    description:
      "iOS-style sectioned actions. Optional title, destructive tone, separate cancel button card.",
  },
  {
    index: "07",
    title: "Pull to refresh",
    href: "/ui-primitives/mobile-shell/pull-to-refresh",
    description:
      "Pull indicator with arrow that rotates and locks into a spinner. Reduced-motion shows a static icon.",
  },
  {
    index: "08",
    title: "Mobile toast",
    href: "/ui-primitives/mobile-shell/toast",
    description:
      "Top-of-screen toast with tone-tinted icon and aria-live announcement. Different from the desktop tray.",
  },
  {
    index: "09",
    title: "Loading bar",
    href: "/ui-primitives/mobile-shell/loading-bar",
    description:
      "Top hairline bar with indeterminate shimmer and a determinate fill. Tone variants for red, amber and teal flows.",
  },
  {
    index: "10",
    title: "Modal sheet",
    href: "/ui-primitives/mobile-shell/modal-sheet",
    description:
      "Bottom-rounded modal with drag handle and peek / half / full snap presets. Body scrolls, title and footer stay.",
  },
  {
    index: "11",
    title: "Status bar",
    href: "/ui-primitives/mobile-shell/status-bar",
    description:
      "Simulated iOS-style status bar with time, signal, carrier and battery rendered as SVG. Light or dark tone.",
  },
  {
    index: "12",
    title: "Floating action button",
    href: "/ui-primitives/mobile-shell/fab",
    description:
      "Icon-only and extended FABs. Press-down state, hover lift, four tones, three corner positions.",
  },
  {
    index: "13",
    title: "Segmented (iOS)",
    href: "/ui-primitives/mobile-shell/segmented",
    description:
      "iOS-style segmented control with shared layout sliding pill. Radio semantics, keyboard accessible.",
  },
  {
    index: "14",
    title: "Chip filter row",
    href: "/ui-primitives/mobile-shell/chip-filter",
    description:
      "Horizontally scrollable filter chips with count badge and a deselect-all chip when any are active.",
  },
  {
    index: "15",
    title: "Swipe action row",
    href: "/ui-primitives/mobile-shell/swipe-actions",
    description:
      "List row with leading and trailing action lanes. Visual swipe revealed via CSS animation demos.",
  },
  {
    index: "16",
    title: "Full mobile app",
    href: "/ui-primitives/mobile-shell/full-mobile-app",
    description:
      "Bonus composition: a working Mufflermen workshop app stack — status bar, top app bar, content, FAB, bottom nav, drawer overlay.",
    bonus: true,
  },
]

export default function MobileShellIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Phone primitives for the workshop floor"
        description="Every surface a mechanic touches on the tablet bracket above the bay — status bar, top app bar, drawer, sheets, FAB, swipe rows. Each primitive lives inside a 390×844 viewport simulator so the rhythm matches the real device."
        dnaSectionId="mobile-shell"
      />
      <section className={styles.section} aria-label="Mobile shell primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 15 primitives + 1 composition</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Every primitive ships with reduced-motion overrides and proper aria semantics so the
            workshop tablet stays usable in bright bay lighting and dark after-hours mode.
          </p>
        </header>
        <div className={styles.grid}>
          {entries.map((entry) => (
            <Link
              key={entry.href}
              className={[styles.thumb, entry.bonus ? styles.thumbBonus : ""].filter(Boolean).join(" ")}
              href={entry.href}
            >
              <span className={styles.thumbIndex}>{entry.index}</span>
              <h3 className={styles.thumbTitle}>{entry.title}</h3>
              <p className={styles.thumbCopy}>{entry.description}</p>
              <span className={styles.thumbFoot}>
                {entry.bonus ? "Review full composition" : "Inspect primitive states"} <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
