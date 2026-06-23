import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./overlays.module.css"

export const metadata: Metadata = {
  title: "Overlays | UI Primitives",
}

interface OverlayEntry {
  index: string
  title: string
  href: string
  description: string
}

const overlays: ReadonlyArray<OverlayEntry> = [
  {
    index: "01",
    title: "Basic dialog",
    href: "/ui-primitives/overlays/basic-dialog",
    description:
      "Centred dialog with blurred backdrop, header, scroll body, and a footer action row. Default for everyday flows.",
  },
  {
    index: "02",
    title: "Confirm dialog",
    href: "/ui-primitives/overlays/confirm-dialog",
    description:
      "Two-button confirmation with a destructive variant for purge / cancel / refund-style workshop actions.",
  },
  {
    index: "03",
    title: "Alert dialog",
    href: "/ui-primitives/overlays/alert-dialog",
    description:
      "Hard alert with a pulsing warning ring. Single acknowledge button; cannot be dismissed by outside click.",
  },
  {
    index: "04",
    title: "Side sheet",
    href: "/ui-primitives/overlays/side-sheet",
    description:
      "Right / left side sheet with sticky header, scrollable body and sticky footer for detail editing.",
  },
  {
    index: "05",
    title: "Bottom sheet",
    href: "/ui-primitives/overlays/bottom-sheet",
    description:
      "Mobile-first bottom sheet with drag handle, title, body, and footer actions. Animates up from the floor.",
  },
  {
    index: "06",
    title: "Top banner sheet",
    href: "/ui-primitives/overlays/top-banner-sheet",
    description:
      "Top-anchored sheet for site-wide announcements, cookie consent, scheduled outage notices.",
  },
  {
    index: "07",
    title: "Full takeover",
    href: "/ui-primitives/overlays/full-takeover",
    description:
      "Full-viewport modal with optional minimise affordance. Use for focus-mode review screens.",
  },
  {
    index: "08",
    title: "Image lightbox",
    href: "/ui-primitives/overlays/image-lightbox",
    description:
      "Image lightbox with zoom, pan, thumbnail strip, and arrow / Esc keyboard navigation.",
  },
  {
    index: "09",
    title: "Video lightbox",
    href: "/ui-primitives/overlays/video-lightbox",
    description:
      "Video lightbox with native controls. Reduced-motion replaces playback with a still poster.",
  },
  {
    index: "10",
    title: "Wizard modal",
    href: "/ui-primitives/overlays/wizard-modal",
    description:
      "Multi-step modal with internal stepper. Skip-able stages, back-stepping, and a finish action.",
  },
  {
    index: "11",
    title: "Command modal",
    href: "/ui-primitives/overlays/command-modal",
    description:
      "Spotlight-style command palette with grouped results, kbd shortcuts, recents, and auto-animated list.",
  },
  {
    index: "12",
    title: "Rich popover",
    href: "/ui-primitives/overlays/popover-rich",
    description:
      "Anchored popover with header / body / footer slots. Use for detail cards, in-place edits, helper menus.",
  },
  {
    index: "13",
    title: "Toast tray",
    href: "/ui-primitives/overlays/toast-tray",
    description:
      "Stacked toast region with per-corner placement, tone-tinted edge, optional action, and dismiss.",
  },
  {
    index: "14",
    title: "Loading overlay",
    href: "/ui-primitives/overlays/loading-overlay",
    description:
      "Translucent loading veil with brand-tinted spinner and optional descriptive copy.",
  },
  {
    index: "15",
    title: "Confetti modal",
    href: "/ui-primitives/overlays/confetti-modal",
    description:
      "Celebration modal that fires confetti on open. Used for milestone moments like first job completed.",
  },
]

export default function OverlaysIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Dialogs, sheets, lightboxes, palettes"
        description="Every floating surface the Mufflermen workshop uses to interrupt, confirm, escalate, celebrate, or surface dense detail without leaving the page. Each primitive is on its own route with realistic Oak Flats domain content."
        dnaSectionId="overlays"
      />
      <section className={styles.section} aria-label="Overlay primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 15 overlays</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Each route opens the primitive in isolation with a focused demo button, an explanation
            of the typical Oak Flats use case, and accessible keyboard interaction.
          </p>
        </header>
        <div className={styles.grid}>
          {overlays.map((overlay) => (
            <Link key={overlay.href} className={styles.thumb} href={overlay.href}>
              <span className={styles.thumbIndex}>{overlay.index}</span>
              <h3 className={styles.thumbTitle}>{overlay.title}</h3>
              <p className={styles.thumbCopy}>{overlay.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
