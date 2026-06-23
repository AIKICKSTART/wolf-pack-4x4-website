import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./maps.module.css"

export const metadata: Metadata = {
  title: "Maps & Location | UI Primitives",
  description:
    "Twelve map and location primitives — pure SVG cartography for the Oak Flats Mufflermen design system. Workshop locators, service radii, route previews, region heatmaps, postcode bounds, and live job tracking.",
}

interface MapScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  state: string
}

const SCENES: ReadonlyArray<MapScene> = [
  {
    kicker: "Primitive 01",
    title: "Static map canvas",
    body: "Hand-drawn SVG landmass, harbour, and roads. Four tonal variants for downstream apps.",
    href: "/ui-primitives/maps/static-map",
    accent: "teal",
    state: "Base layer",
  },
  {
    kicker: "Primitive 02",
    title: "Map pin",
    body: "Drop-animated pin with optional pulse, index badge, and four tones for workshop status.",
    href: "/ui-primitives/maps/map-pin",
    accent: "red",
    state: "Marker",
  },
  {
    kicker: "Primitive 03",
    title: "Service radius",
    body: "Concentric service-radius rings centered on the workshop with km labels at each tier.",
    href: "/ui-primitives/maps/service-radius",
    accent: "amber",
    state: "Coverage overlay",
  },
  {
    kicker: "Primitive 04",
    title: "Workshop locator",
    body: "Map left, locator list right — entries highlight matching pins and announce distance.",
    href: "/ui-primitives/maps/workshop-locator",
    accent: "teal",
    state: "Discovery surface",
  },
  {
    kicker: "Primitive 05",
    title: "Route preview line",
    body: "SVG path between two pins with animated dash plus a floating distance/ETA chip.",
    href: "/ui-primitives/maps/route-preview",
    accent: "amber",
    state: "Wayfinding",
  },
  {
    kicker: "Primitive 06",
    title: "Region heatmap",
    body: "Hex-bin grid overlay with intensity tones for region performance and hover tooltips.",
    href: "/ui-primitives/maps/region-heatmap",
    accent: "red",
    state: "Analytics",
  },
  {
    kicker: "Primitive 07",
    title: "Suburb finder",
    body: "Postcode input plus Locate-me CTA with an auto-suggest preview of Illawarra suburbs.",
    href: "/ui-primitives/maps/suburb-finder",
    accent: "teal",
    state: "Form",
  },
  {
    kicker: "Primitive 08",
    title: "Distance + duration chip",
    body: "Compact car-iconed chip showing distance and minutes with traffic-tone status pip.",
    href: "/ui-primitives/maps/distance-chip",
    accent: "green",
    state: "Inline meta",
  },
  {
    kicker: "Primitive 09",
    title: "Nearest CTA",
    body: "Primary closest-workshop card with route CTA plus an alternative-options stack.",
    href: "/ui-primitives/maps/nearest-cta",
    accent: "red",
    state: "Conversion surface",
  },
  {
    kicker: "Primitive 10",
    title: "Postcode bounds",
    body: "SVG polygon overlay for postcode boundaries with a label tag at each anchor.",
    href: "/ui-primitives/maps/postcode-bounds",
    accent: "amber",
    state: "Boundary overlay",
  },
  {
    kicker: "Primitive 11",
    title: "Country flag picker",
    body: "Searchable country selector with inline flag SVGs — AU, NZ, US, UK, IE, CA, ZA first.",
    href: "/ui-primitives/maps/country-flag-picker",
    accent: "amber",
    state: "Form picker",
  },
  {
    kicker: "Primitive 12",
    title: "Live job tracker",
    body: "Workshop center plus drifting technician pins, animated via framer-motion (reduced-motion safe).",
    href: "/ui-primitives/maps/live-job-tracker",
    accent: "teal",
    state: "Realtime ops",
  },
]

const ACCENT_CLASS: Record<MapScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

const MAP_DNA = [
  {
    label: "Foundation chain",
    value: "SVG -> shell -> app renderer",
    body: "Each map primitive starts as a tokenized SVG contract, then downstream apps can swap in live tiles without changing the surrounding UI.",
  },
  {
    label: "Token surface",
    value: "12 primitives",
    body: "Pins, radius rings, route lines, chips, finder forms, and locator cards consume shared color, spacing, radius, focus, and motion tokens.",
  },
  {
    label: "Domain proof",
    value: "Oak Flats + Illawarra",
    body: "Coverage examples stay grounded in workshop, suburb, postcode, drive-time, and live job-tracking scenarios.",
  },
] as const

export default function MapsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="19 / Maps & location"
        title="Cartography primitives"
        description="Twelve map and location primitives built as pure SVG — no Mapbox, no Leaflet, no Google Maps. Downstream apps swap their real tile renderer into the same component shape. Domain data is Oak Flats workshop + Illawarra suburbs."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location" },
        ]}
      />

      <span className={styles.notice}>
        SVG-only — zero external map dependencies
      </span>

      <section className={styles.dnaPanel} aria-labelledby="maps-dna-title">
        <div className={styles.dnaCopy}>
          <span className={styles.dnaKicker}>Maps shared DNA</span>
          <h2 id="maps-dna-title">Cartography is a primitive contract, not a one-off illustration</h2>
          <p>
            The maps family now exposes the shared contract before the gallery: base canvas,
            marker layer, coverage overlays, route telemetry, form handoff, and conversion CTA.
            Every card below maps back to that same chain.
          </p>
        </div>
        <div className={styles.dnaGrid}>
          {MAP_DNA.map((item) => (
            <article key={item.label} className={styles.dnaCard}>
              <span>{item.label}</span>
              <strong>{item.value}</strong>
              <p>{item.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.grid} aria-label="Map primitives index">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbLand} />
                <span className={`${styles.thumbPin} ${styles.thumbPin1}`} />
                <span className={`${styles.thumbPin} ${styles.thumbPin2}`} />
                <span className={`${styles.thumbPin} ${styles.thumbPin3}`} />
              </div>
            </div>
            <header className={styles.head}>
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
