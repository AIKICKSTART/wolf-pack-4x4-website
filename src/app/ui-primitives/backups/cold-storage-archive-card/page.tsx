import type { Metadata } from "next"

import { ColdStorageArchiveCard } from "../../components/backups"
import { PageHeader } from "../../components/page-header"
import { COLD_ARCHIVES } from "../demo-data"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Cold storage archive | Backups",
  description:
    "Primitive 14 — Cold archive card with archive id, storage tier (Glacier / Deep / Archive Tier), retrieval-time estimate and a thaw CTA.",
}

export default function ColdStorageArchiveCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Cold archive"
        title="Cold storage archive card"
        description="Card for a long-lived archive in cold storage. The tier chip flips tone for Glacier, Deep Archive, and Archive Tier so the retrieval cost / time is immediately obvious."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Cold archive" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Mufflermen long-term archives</span>
        <div className={styles.miniGrid}>
          {COLD_ARCHIVES.map((archive) => (
            <ColdStorageArchiveCard key={archive.id} archive={archive} />
          ))}
        </div>
      </section>
    </main>
  )
}
