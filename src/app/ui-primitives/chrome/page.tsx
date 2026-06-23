import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./chrome.module.css"

export const metadata: Metadata = {
  title: "Chrome | UI Primitives",
  description:
    "22 chrome primitives for the Oak Flats Mufflermen design system — 5 headers, 5 footers, 4 floating docks, 4 mobile slide-ups, and 4 sidebars plus a composable showcase shell.",
}

interface ChromeFamily {
  id: string
  kicker: string
  title: string
  description: string
  accent: "red" | "amber" | "teal" | "green"
  variants: ReadonlyArray<{
    id: string
    href: string
    kicker: string
    title: string
    body: string
    token: string
    state: string
  }>
}

const FAMILIES: ReadonlyArray<ChromeFamily> = [
  {
    id: "headers",
    kicker: "Family 01",
    title: "Site headers",
    description:
      "Five distinct top-of-shell variants — from a cinematic full-width bar to a floating magnetic island.",
    accent: "red",
    variants: [
      {
        id: "cinematic-bar",
        href: "/ui-primitives/chrome/headers/cinematic-bar",
        kicker: "Header 01",
        title: "Cinematic bar",
        body: "Full-width sticky header with logo, centered pill nav and a red primary CTA cluster.",
        token: "01",
        state: "Glass · scanline",
      },
      {
        id: "pinstripe-bar",
        href: "/ui-primitives/chrome/headers/pinstripe-bar",
        kicker: "Header 02",
        title: "Pinstripe bar",
        body: "Thin mono-typed bar with brand chip, breadcrumb crumbs and a search shortcut.",
        token: "02",
        state: "Mono · pinstripe",
      },
      {
        id: "stacked-grand",
        href: "/ui-primitives/chrome/headers/stacked-grand",
        kicker: "Header 03",
        title: "Stacked grand",
        body: "Utility bar over a grand wordmark hero with metric tiles and a primary CTA.",
        token: "03",
        state: "Hero · utility",
      },
      {
        id: "mobile-condensed",
        href: "/ui-primitives/chrome/headers/mobile-condensed",
        kicker: "Header 04",
        title: "Mobile condensed",
        body: "Mobile-first header with center logo, hamburger left and cart right — shrinks on scroll.",
        token: "04",
        state: "Mobile · shrink",
      },
      {
        id: "floating-island",
        href: "/ui-primitives/chrome/headers/floating-island",
        kicker: "Header 05",
        title: "Floating island",
        body: "Rounded glass capsule centered with magnetic hover nav and a red CTA pill.",
        token: "05",
        state: "Floating · magnetic",
      },
    ],
  },
  {
    id: "footers",
    kicker: "Family 02",
    title: "Site footers",
    description:
      "Five distinct bottom-of-shell variants — from a five-column megamap to a thermal-paper receipt.",
    accent: "amber",
    variants: [
      {
        id: "megamap-grand",
        href: "/ui-primitives/chrome/footers/megamap-grand",
        kicker: "Footer 06",
        title: "Megamap grand",
        body: "Five-column sitemap with brand lockup, newsletter capture, social row and legal fineprint.",
        token: "06",
        state: "Sitemap",
      },
      {
        id: "cinematic",
        href: "/ui-primitives/chrome/footers/cinematic",
        kicker: "Footer 07",
        title: "Cinematic",
        body: "Full-bleed cover image footer with grand wordmark, tagline, three columns and bottom bar.",
        token: "07",
        state: "Cover · bleed",
      },
      {
        id: "compact-strip",
        href: "/ui-primitives/chrome/footers/compact-strip",
        kicker: "Footer 08",
        title: "Compact strip",
        body: "One-line shell footer with brand chip, four divided links, theme toggle and copyright.",
        token: "08",
        state: "App · strip",
      },
      {
        id: "receipt-style",
        href: "/ui-primitives/chrome/footers/receipt-style",
        kicker: "Footer 09",
        title: "Receipt style",
        body: "Thermal-roll receipt with mono details, ABN, acknowledgement of country and a barcode.",
        token: "09",
        state: "Receipt",
      },
      {
        id: "marquee-band",
        href: "/ui-primitives/chrome/footers/marquee-band",
        kicker: "Footer 10",
        title: "Marquee band",
        body: "Stacked KPI tiles, looping marquee of brand words and a brand-row legal strip.",
        token: "10",
        state: "Marquee",
      },
    ],
  },
  {
    id: "docks",
    kicker: "Family 03",
    title: "Floating docks",
    description:
      "Four distinct overlay dock variants — bottom glass, side magnetic, corner quick, and an app tab rail.",
    accent: "teal",
    variants: [
      {
        id: "bottom-glass",
        href: "/ui-primitives/chrome/docks/bottom-glass",
        kicker: "Dock 11",
        title: "Bottom glass",
        body: "Bottom-center glass dock with 5 primary actions and tooltip labels on hover.",
        token: "11",
        state: "Bottom · glass",
      },
      {
        id: "side-magnetic",
        href: "/ui-primitives/chrome/docks/side-magnetic",
        kicker: "Dock 12",
        title: "Side magnetic",
        body: "Right-side vertical dock with magnetic hover lift and label tooltips.",
        token: "12",
        state: "Side · magnetic",
      },
      {
        id: "corner-quick",
        href: "/ui-primitives/chrome/docks/corner-quick",
        kicker: "Dock 13",
        title: "Corner quick",
        body: "Bottom-right composer FAB with chat, back-to-top and theme satellite buttons.",
        token: "13",
        state: "Corner · FAB",
      },
      {
        id: "tab-rail",
        href: "/ui-primitives/chrome/docks/tab-rail",
        kicker: "Dock 14",
        title: "Tab rail",
        body: "App-scoped bottom tab rail with an animated active indicator pill.",
        token: "14",
        state: "Tab · rail",
      },
    ],
  },
  {
    id: "slide-ups",
    kicker: "Family 04",
    title: "Mobile slide-ups",
    description:
      "Four distinct bottom-sheet variants — iOS action sheet, full takeover, detail card, and multi-step wizard.",
    accent: "green",
    variants: [
      {
        id: "action-sheet",
        href: "/ui-primitives/chrome/slide-ups/action-sheet",
        kicker: "Slide 15",
        title: "Action sheet",
        body: "iOS-style action sheet with grouped actions, descriptions and a cancel pill.",
        token: "15",
        state: "Mobile · action",
      },
      {
        id: "full-takeover",
        href: "/ui-primitives/chrome/slide-ups/full-takeover",
        kicker: "Slide 16",
        title: "Full takeover",
        body: "Edge-to-edge takeover with header, breadcrumb body and footer slot.",
        token: "16",
        state: "Takeover",
      },
      {
        id: "detail-card",
        href: "/ui-primitives/chrome/slide-ups/detail-card",
        kicker: "Slide 17",
        title: "Detail card",
        body: "Half-sheet quote summary with stat tiles, status chips and primary/secondary actions.",
        token: "17",
        state: "Half · sheet",
      },
      {
        id: "multi-step",
        href: "/ui-primitives/chrome/slide-ups/multi-step",
        kicker: "Slide 18",
        title: "Multi-step",
        body: "Three-step wizard with stepper chips, body, and a progress-bar foot row.",
        token: "18",
        state: "Wizard",
      },
    ],
  },
  {
    id: "sidebars",
    kicker: "Family 05",
    title: "Sidebars",
    description:
      "Four distinct side-rail variants — cinematic vertical, glass compact icon rail, mega anchored explorer, and right-side context rail.",
    accent: "red",
    variants: [
      {
        id: "cinematic-vertical",
        href: "/ui-primitives/chrome/sidebars/cinematic-vertical",
        kicker: "Side 19",
        title: "Cinematic vertical",
        body: "Narrow cinematic sidebar with vertical wordmark and per-item active state.",
        token: "19",
        state: "Cinematic",
      },
      {
        id: "glass-compact",
        href: "/ui-primitives/chrome/sidebars/glass-compact",
        kicker: "Side 20",
        title: "Glass compact",
        body: "Floating glass icon-only sidebar with hover label tooltips and an avatar foot.",
        token: "20",
        state: "Glass · icon",
      },
      {
        id: "mega-anchored",
        href: "/ui-primitives/chrome/sidebars/mega-anchored",
        kicker: "Side 21",
        title: "Mega anchored",
        body: "Full sidebar with brand lockup, search shortcut and collapsible group sections.",
        token: "21",
        state: "Mega · explorer",
      },
      {
        id: "context-rail",
        href: "/ui-primitives/chrome/sidebars/context-rail",
        kicker: "Side 22",
        title: "Context rail",
        body: "Right-side metadata rail with stat tiles, related items and action buttons.",
        token: "22",
        state: "Context",
      },
    ],
  },
]

const ACCENT_CLASS: Record<ChromeFamily["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function ChromeIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="21 / Chrome variants"
        title="Chrome primitives"
        description="22 chrome variants for the Oak Flats Mufflermen design system — five headers, five footers, four floating docks, four mobile slide-ups and four sidebars. Each variant carries the real brand and is composable inside the showcase shell."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome" },
        ]}
      />

      <span className={styles.notice}>
        22 variants · headers · footers · docks · slide-ups · sidebars
      </span>

      <Link
        href="/ui-primitives/chrome/showcase-shell"
        className={styles.showcaseCallout}
      >
        <div>
          <strong>Showcase shell</strong>
          <p>
            Compose any header + footer + dock + sidebar around mock workshop
            content — a single switchable showroom for every chrome variant.
          </p>
        </div>
        <span className={styles.showcaseLink}>
          Open showcase <span aria-hidden="true">→</span>
        </span>
      </Link>

      {FAMILIES.map((family) => (
        <section key={family.id} className={styles.family} aria-labelledby={`family-${family.id}`}>
          <header className={styles.familyHead}>
            <span className={styles.familyKicker}>{family.kicker}</span>
            <div>
              <h2 id={`family-${family.id}`} className={styles.familyTitle}>
                {family.title}
              </h2>
              <p className={styles.familyDescription}>{family.description}</p>
            </div>
          </header>

          <div className={styles.grid}>
            {family.variants.map((variant) => (
              <Link
                key={variant.href}
                href={variant.href}
                className={[styles.card, ACCENT_CLASS[family.accent]].join(" ")}
              >
                <div className={styles.thumb} aria-hidden="true">
                  <span className={styles.thumbToken}>{variant.token}</span>
                </div>
                <header>
                  <span className={styles.cardKicker}>{variant.kicker}</span>
                  <h3 className={styles.cardTitle}>{variant.title}</h3>
                  <p className={styles.cardBody}>{variant.body}</p>
                </header>
                <footer className={styles.meta}>
                  <span>{variant.state}</span>
                  <span className={styles.metaAction}>
                    Open <span aria-hidden="true">→</span>
                  </span>
                </footer>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </main>
  )
}
