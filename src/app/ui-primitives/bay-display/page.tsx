import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./bay-display.module.css"

export const metadata: Metadata = {
  title: "Bay Display | UI Primitives",
}

interface PrimitiveEntry {
  index: string
  title: string
  href: string
  description: string
}

const primitives: ReadonlyArray<PrimitiveEntry> = [
  {
    index: "01",
    title: "Bay status hero",
    href: "/ui-primitives/bay-display/bay-status-hero",
    description:
      "Large-format bay card: bay number, vehicle, mechanic, ETA and a pulsing status accent for 5 m reading distance.",
  },
  {
    index: "02",
    title: "Vehicle queue rail",
    href: "/ui-primitives/bay-display/vehicle-queue-rail",
    description:
      "Horizontal rail of next-up vehicles with booked time, pre-assigned bay and time-waited counter.",
  },
  {
    index: "03",
    title: "Customer call banner",
    href: "/ui-primitives/bay-display/customer-call-banner",
    description:
      "Full-width Mr/Ms surname callout with kinetic Anton heading and an opt-in bell sound trigger.",
  },
  {
    index: "04",
    title: "Now serving strip",
    href: "/ui-primitives/bay-display/now-serving-strip",
    description:
      "Ticker strip cycling each bay's current job — bay number, vehicle stack and status badge.",
  },
  {
    index: "05",
    title: "Weather strip",
    href: "/ui-primitives/bay-display/weather-strip",
    description:
      "Albion Park weather panel — temperature, wind, humidity and Lake Illawarra next-tide.",
  },
  {
    index: "06",
    title: "Fuel price strip",
    href: "/ui-primitives/bay-display/fuel-price-strip",
    description:
      "Local fuel ticker — Albion Park Shell, Wollongong Coles Express, with up/down/flat trend.",
  },
  {
    index: "07",
    title: "Workshop clock tile",
    href: "/ui-primitives/bay-display/workshop-clock-tile",
    description:
      "Analog + digital clock tile with date and a tone-mapped shift indicator (morning, arvo, after-hours).",
  },
  {
    index: "08",
    title: "Community ticker",
    href: "/ui-primitives/bay-display/community-ticker",
    description:
      "Around-town ticker — Steelers scores, Albion Park events, Princes Hwy notices.",
  },
  {
    index: "09",
    title: "Service menu board",
    href: "/ui-primitives/bay-display/service-menu-board",
    description:
      "Menu-board style services + from-prices with signature highlights for the waiting room.",
  },
  {
    index: "10",
    title: "Staff recognition card",
    href: "/ui-primitives/bay-display/staff-recognition-card",
    description:
      "Employee-of-the-week card with portrait, role, tenure and a brand reason quote.",
  },
  {
    index: "11",
    title: "Dyno result marquee",
    href: "/ui-primitives/bay-display/dyno-result-marquee",
    description:
      "Latest dyno result reel — peak kW, peak Nm, vs-baseline delta and a customer grin tag.",
  },
  {
    index: "12",
    title: "Safety message tile",
    href: "/ui-primitives/bay-display/safety-message-tile",
    description:
      "Rotating safety message — PPE, escort rules, hot-exhaust caution — tone-mapped info/caution/danger.",
  },
  {
    index: "13",
    title: "Social media wall",
    href: "/ui-primitives/bay-display/social-media-wall",
    description:
      "Instagram-style wall pulling the latest @oakflats.mufflermen posts into a 2 × 2 grid.",
  },
  {
    index: "14",
    title: "QR code call to action",
    href: "/ui-primitives/bay-display/qr-code-call-to-action",
    description:
      "Large QR card — book online, leave a review, follow the build journey, join rewards.",
  },
]

export default function BayDisplayIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42 / Bay display"
        title="Large-format bay display"
        description="Fourteen distance-readable primitives composed out of the typography, primitives, surfaces, motion, charts and icons umbrellas — wired together as the back-wall signage in the Oak Flats waiting room and on the workshop floor."
      />
      <section className={styles.section} aria-label="Bay display index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Dark-canonical signage, 4K-ready typography (Anton headlines, Bebas
            metadata, IBM Plex Mono kickers), tabular numerics, status pulses,
            kinetic call-outs. Each tile drops into its own full-scale sub-route.
            The full-display composition stitches every piece into a single
            wall-mounted screen.
          </p>
        </header>
        <div className={styles.grid}>
          {primitives.map((p) => (
            <Link key={p.href} className={styles.thumb} href={p.href}>
              <span className={styles.thumbIndex}>{p.index}</span>
              <h3 className={styles.thumbTitle}>{p.title}</h3>
              <p className={styles.thumbCopy}>{p.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
          <Link
            className={styles.thumb}
            href="/ui-primitives/bay-display/full-display"
          >
            <span className={styles.thumbIndex}>FD</span>
            <h3 className={styles.thumbTitle}>Full-display composition</h3>
            <p className={styles.thumbCopy}>
              All fourteen primitives wired together as a 4K-ready signage wall
              — bay hero, queue rail, customer call, weather, fuel, clock,
              dyno reel, safety, socials and QR.
            </p>
            <span className={styles.thumbFoot}>
              Review full composition <span aria-hidden="true">→</span>
            </span>
          </Link>
        </div>
      </section>
    </main>
  )
}
