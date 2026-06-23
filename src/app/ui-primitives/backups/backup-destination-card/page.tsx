import type { Metadata } from "next"

import { BackupDestinationCard } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { DESTINATIONS } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Backup destination card | Backups",
  description:
    "Primitive 09 — Destination card with provider glyph, bucket / path, region, redundancy chip and observed transfer rate.",
}

export default function BackupDestinationCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Destination card"
        title="Backup destination card"
        description="A small card per destination — provider glyph, bucket / path, region, redundancy class (single / zone / geo) and the observed Mbps. Designed to fan out into a multi-destination grid."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Destination card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen destinations</span>
        <div className={styles.miniGrid}>
          {DESTINATIONS.map((destination) => (
            <BackupDestinationCard key={destination.id} destination={destination} />
          ))}
        </div>
      </section>
    </main>
  )
}
