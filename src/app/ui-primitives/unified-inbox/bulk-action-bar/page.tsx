"use client"

import { useState } from "react"

import { BulkActionBar } from "../../components/unified-inbox"
import { PageHeader } from "../../components/page-header"

import styles from "../unified-inbox.module.css"

export default function BulkActionBarScenePage() {
  const [count, setCount] = useState<number>(7)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Bulk actions"
        title="Bulk action bar"
        description="Sticky toolbar that appears once the operator multi-selects conversations. Four canonical verbs — assign / move / close / spam — plus an X to dismiss the selection. The bar greys itself out when nothing is selected so it can stay mounted underneath the list."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Unified inbox", href: "/ui-primitives/unified-inbox" },
          { label: "Bulk action bar" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Selected count · {count} · across 3 channels
        </span>
        <BulkActionBar
          selectedCount={count}
          contextLabel="across 3 channels"
          onDismiss={() => setCount(0)}
        />
        <div className={styles.fullActions}>
          <button
            type="button"
            className={styles.fullActionBtn}
            onClick={() => setCount((value) => value + 1)}
          >
            Add 1 to selection
          </button>
          <button
            type="button"
            className={styles.fullActionBtn}
            onClick={() => setCount(0)}
          >
            Clear selection
          </button>
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Empty state · hidden / dimmed</span>
        <BulkActionBar selectedCount={0} contextLabel="select to enable" />
      </section>
    </main>
  )
}
