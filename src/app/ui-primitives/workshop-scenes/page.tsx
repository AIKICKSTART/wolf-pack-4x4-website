import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"
import styles from "./workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Workshop Scenes | UI Primitives",
}

interface SceneEntry {
  index: string
  title: string
  href: string
  description: string
}

const scenes: ReadonlyArray<SceneEntry> = [
  {
    index: "01",
    title: "Parts catalog card",
    href: "/ui-primitives/workshop-scenes/parts-catalog",
    description:
      "Reusable catalog tile with SKU, supplier and fitment chips, stock-state pill, AUD RRP and an add-to-quote CTA. Hover lifts with a soft glow.",
  },
  {
    index: "02",
    title: "Job ticket",
    href: "/ui-primitives/workshop-scenes/job-ticket",
    description:
      "Full job ticket — customer, year/make/model + rego plate, service chips, bay, time budget, photo evidence and the actions floor leads use.",
  },
  {
    index: "03",
    title: "Vehicle profile card",
    href: "/ui-primitives/workshop-scenes/vehicle-profile",
    description:
      "Photo + year/make/model + rego + engine + body + on-file visit count. Links straight into the full vehicle file.",
  },
  {
    index: "04",
    title: "Quote builder workspace",
    href: "/ui-primitives/workshop-scenes/quote-builder",
    description:
      "Three-column workspace: parts library, live quote, customer + vehicle context. Drag a part across to build the quote.",
  },
  {
    index: "05",
    title: "Fitment compatibility checker",
    href: "/ui-primitives/workshop-scenes/fitment-checker",
    description:
      "Cascading make / model / year selects against a selected part with a colour-coded compatibility result and explanation.",
  },
  {
    index: "06",
    title: "Supplier dashboard",
    href: "/ui-primitives/workshop-scenes/supplier-dashboard",
    description:
      "Supplier health summary — contact, last call, outstanding POs, top-moving SKUs table, media readiness sparkline, donut health.",
  },
  {
    index: "07",
    title: "Weld bay allocation",
    href: "/ui-primitives/workshop-scenes/weld-bay-allocation",
    description:
      "Live availability grid for four weld bays across today plus an unassigned-job pool ready to drag onto a bay.",
  },
  {
    index: "08",
    title: "Handover checklist",
    href: "/ui-primitives/workshop-scenes/handover-checklist",
    description:
      "Customer handover sequence — photos, recorded sound demo, itemised invoice and payment status, send & print actions.",
  },
  {
    index: "09",
    title: "Quote card stack",
    href: "/ui-primitives/workshop-scenes/quote-card-stack",
    description:
      "Stack of pending quotes rendered like a swipe deck. The top card is interactive — approve, amend, decline.",
  },
  {
    index: "10",
    title: "Job board",
    href: "/ui-primitives/workshop-scenes/job-board",
    description:
      "Kanban view of every active workshop job across Backlog, In Progress, Quality Check and Done — with priority tinting.",
  },
  {
    index: "11",
    title: "Workshop week schedule",
    href: "/ui-primitives/workshop-scenes/week-schedule",
    description:
      "Weld bay swimlanes across today's hours with event blocks showing job number + rego plate per booked slot.",
  },
  {
    index: "12",
    title: "Mobile tech card",
    href: "/ui-primitives/workshop-scenes/mobile-tech",
    description:
      "Dispatch card for the mobile fitting van — avatar, status, current job, ETA, distance and contact CTAs.",
  },
]

export default function WorkshopScenesIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22 / Workshop scenes"
        title="Production scenes for Oak Flats"
        description="Twelve workshop-grade compositions stitched out of the primitive umbrella — quoting, fitment, bay scheduling, supplier health, handover, and dispatch — all wearing real Oak Flats Mufflermen vocabulary."
      />
      <FormPatternReferences
        ids={["quote-request", "vehicle-intake", "quote-authoring-signature", "roster-workshop-ops"]}
      />
      <section className={styles.section} aria-label="Workshop scenes index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 12 scenes</span>
          <h2 className={styles.sectionTitle}>Pick a scene</h2>
          <p className={styles.subhead}>
            Each scene lives in its own sub-route at full scale with realistic
            domain data — Hilux dual-cabs, Patrol Y62 cat-backs, ADR-checked
            Manta exhaust, weld bays 1 through 4, and Albion Park Rail
            customers.
          </p>
        </header>
        <div className={styles.grid}>
          {scenes.map((scene) => (
            <Link key={scene.href} className={styles.thumb} href={scene.href}>
              <span className={styles.thumbIndex}>{scene.index}</span>
              <h3 className={styles.thumbTitle}>{scene.title}</h3>
              <p className={styles.thumbCopy}>{scene.description}</p>
              <span className={styles.thumbFoot}>
                Open scene <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
