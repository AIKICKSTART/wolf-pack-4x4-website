import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"
import styles from "./workshop-floor-live.module.css"

export const metadata: Metadata = {
  title: "Workshop Floor Live | UI Primitives",
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
    title: "Bay live status card",
    href: "/ui-primitives/workshop-floor-live/bay-status",
    description:
      "Per-bay live card: bay number, current vehicle, technician, elapsed clock, ETA to handover, and a tone-mapped status chip.",
  },
  {
    index: "02",
    title: "Workshop floor plan",
    href: "/ui-primitives/workshop-floor-live/floor-plan",
    description:
      "Top-down SVG floor plan with bays, roller door, hoist, parts area and dyno — overlaid with technician avatars positioned by location.",
  },
  {
    index: "03",
    title: "Live job progress strip",
    href: "/ui-primitives/workshop-floor-live/job-progress",
    description:
      "Strip per active job with a progress bar and checkpoints across Drop-off, Diagnostic, Build, Test and Handover.",
  },
  {
    index: "04",
    title: "Technician location pin",
    href: "/ui-primitives/workshop-floor-live/tech-pin",
    description:
      "Pin showing each technician's current bay or zone with avatar, role, doing-what, and on/away status.",
  },
  {
    index: "05",
    title: "Next-up queue",
    href: "/ui-primitives/workshop-floor-live/next-up",
    description:
      "Queue of vehicles waiting to come into bays — service code, booked time, pre-assigned bay, arrived chip.",
  },
  {
    index: "06",
    title: "Bay hourly utilisation",
    href: "/ui-primitives/workshop-floor-live/bay-hourly",
    description:
      "Per-bay hourly utilisation strip across the workshop day with a five-level idle → peak colour ramp.",
  },
  {
    index: "07",
    title: "Incoming customer banner",
    href: "/ui-primitives/workshop-floor-live/incoming-customer",
    description:
      "Banner that fires when a booked customer is about to arrive — vehicle, ETA, bay assignment, phone.",
  },
  {
    index: "08",
    title: "Parts pull request row",
    href: "/ui-primitives/workshop-floor-live/parts-pull",
    description:
      "Row representing a request from a bay for parts — SKU, qty, originating bay, status from Queued through Delivered.",
  },
  {
    index: "09",
    title: "Live sound band chip",
    href: "/ui-primitives/workshop-floor-live/sound-band",
    description:
      "Live sound-band readout from the current dyno run, composing the ADR ComplianceBandChip with measured dB(A).",
  },
  {
    index: "10",
    title: "Bay camera feed card",
    href: "/ui-primitives/workshop-floor-live/bay-camera",
    description:
      "Bay camera feed card with placeholder video, scanline animation, timecode and last-snapshot meta.",
  },
  {
    index: "11",
    title: "Handover ready banner",
    href: "/ui-primitives/workshop-floor-live/handover-ready",
    description:
      "Job-ready-for-pickup banner with photo evidence chip and signal-to-front-desk badge.",
  },
  {
    index: "12",
    title: "Dyno active readout",
    href: "/ui-primitives/workshop-floor-live/dyno-active",
    description:
      "Active dyno readout with peak kW, peak torque, current RPM gauge and air/fuel lambda assessment.",
  },
  {
    index: "13",
    title: "Customer waiting area",
    href: "/ui-primitives/workshop-floor-live/waiting-area",
    description:
      "Waiting area card listing waiting customers, estimated wait window and coffee / waiting-room offer chips.",
  },
  {
    index: "14",
    title: "Live revenue pulse",
    href: "/ui-primitives/workshop-floor-live/revenue-pulse",
    description:
      "Live revenue pulse: today's AUD billed, jobs completed, vs-yesterday delta and a trend sparkline.",
  },
]

export default function WorkshopFloorLiveIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23 / Workshop floor live"
        title="Real-time floor monitor"
        description="Fourteen production primitives stitched out of the data-display, primitives, charts, calendar, roster, vehicles, workshop-scenes, motion and adr-compliance umbrellas — wired together as the live monitor the Oak Flats floor leads keep open on the back wall."
      />
      <section className={styles.section} aria-label="Workshop floor live index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives</span>
          <h2 className={styles.sectionTitle}>Pick a primitive</h2>
          <p className={styles.subhead}>
            Real-time view of bays 1–4, dyno cell, parts area, waiting room and
            the revenue pulse rolling through POS. Each tile drops into its own
            full-scale sub-route. The full-floor composition stitches every
            piece into a single ops monitor.
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
            href="/ui-primitives/workshop-floor-live/full-floor"
          >
            <span className={styles.thumbIndex}>FF</span>
            <h3 className={styles.thumbTitle}>Full-floor composition</h3>
            <p className={styles.thumbCopy}>
              All fourteen primitives wired together as the back-wall monitor —
              bays, plan, dyno, parts pulls, waiting area, revenue pulse.
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
