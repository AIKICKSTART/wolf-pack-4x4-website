import type { Metadata } from "next"

import {
  RecentFlagChangesLog,
  type FlagChangeRecord,
} from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Recent flag changes log | Feature flags",
  description:
    "Primitive 12 — audit log of flag changes using the shared DataTable primitive.",
}

const RECORDS: ReadonlyArray<FlagChangeRecord> = [
  {
    id: "c-1",
    flagKey: "quote-instant-pricing",
    flagName: "Instant pricing on quotes",
    who: "Jess R",
    whoRole: "Product · Booking",
    when: "10 min ago",
    environment: "prod",
    fromValue: "ramping 25%",
    toValue: "ramping 50%",
    note: "AUSTRAC review cleared",
  },
  {
    id: "c-2",
    flagKey: "parts-3d-viewer",
    flagName: "3D parts viewer",
    who: "Marcus P",
    whoRole: "Engineer · Parts",
    when: "32 min ago",
    environment: "staging",
    fromValue: "off",
    toValue: "on",
  },
  {
    id: "c-3",
    flagKey: "compliance-receipt-qr",
    flagName: "Compliance receipt QR",
    who: "Tom V",
    whoRole: "Compliance",
    when: "1 hr ago",
    environment: "prod",
    fromValue: "on",
    toValue: "killed",
    note: "Incident MUF-2026-0511",
  },
  {
    id: "c-4",
    flagKey: "workshop-bay-availability-realtime",
    flagName: "Realtime bay availability",
    who: "Priya K",
    whoRole: "Engineer · Workshop",
    when: "3 hr ago",
    environment: "dev",
    fromValue: "off",
    toValue: "on",
  },
  {
    id: "c-5",
    flagKey: "muffler-discount-banner",
    flagName: "Promo discount banner",
    who: "Hannah T",
    whoRole: "Growth · Marketing",
    when: "Yesterday",
    environment: "prod",
    fromValue: "off",
    toValue: "on",
    note: "EOFY campaign",
  },
]

export default function RecentFlagChangesLogScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Audit"
        title="Recent flag changes log"
        description="Audit feed of flag changes — five-column DataTable showing the flag (name + key), the environment chip, the visible from-value → to-value diff (struck-through old + green-toned new), the responsible actor + role, and a relative timestamp. Reuses the shared DataTable primitive for sort + zebra striping."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Changes log" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · five recent flag changes</span>
        <RecentFlagChangesLog records={RECORDS} />
      </section>
    </main>
  )
}
