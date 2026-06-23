import type { Metadata } from "next"

import { CompressedSizeBadge } from "../../components/backups"
import { PageHeader } from "../../components/page-header"

import styles from "../backups.module.css"

export const metadata: Metadata = {
  title: "Compressed size badge | Backups",
  description:
    "Primitive 10 — Tiny badge showing raw → compressed bytes with savings percentage.",
}

export default function CompressedSizeBadgeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Compressed size badge"
        title="Compressed size badge"
        description="Tiny inline badge — strikethrough raw size, arrow, compressed size, and a savings chip. Designed to drop into table rows or chip rows without dominating them."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Backups", href: "/ui-primitives/backups" },
          { label: "Compressed size badge" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Per-resource compression</span>
        <div className={styles.demoInline}>
          <CompressedSizeBadge info={{ rawBytes: 14_682_000_000, compressedBytes: 4_640_000_000 }} />
          <CompressedSizeBadge info={{ rawBytes: 2_120_000_000, compressedBytes: 712_000_000 }} />
          <CompressedSizeBadge info={{ rawBytes: 38_412_000_000, compressedBytes: 32_400_000_000 }} />
          <CompressedSizeBadge info={{ rawBytes: 412_000_000, compressedBytes: 124_000_000 }} />
        </div>
      </section>
    </main>
  )
}
