import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { DataMappingRow } from "../../components/connectors"

import { MAPPING_SHOPIFY_TO_PAYLOAD } from "../_mock-data"
import styles from "../connectors.module.css"

export const metadata: Metadata = {
  title: "Data mapping row | Connectors",
  description:
    "Primitive 10 — source-field → target-field mapping row with transform chip.",
}

const IDENTITY_ROWS = MAPPING_SHOPIFY_TO_PAYLOAD.slice(0, 2)
const TRANSFORM_ROWS = MAPPING_SHOPIFY_TO_PAYLOAD.slice(2, 4)
const ALL_ROWS = MAPPING_SHOPIFY_TO_PAYLOAD

export default function DataMappingRowScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Row"
        title="Data mapping row"
        description="Source-field → target-field row with type chips on both sides and a transform-function chip in the middle (1:1, lowercase, E.164, ISO, currency-aud, split). Three live states — light transforms, heavy transforms and full Shopify → Payload mapping."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Connectors", href: "/ui-primitives/connectors" },
          { label: "Data mapping row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · light transforms (email + phone)</span>
        <div className={styles.demoStack}>
          {IDENTITY_ROWS.map((row) => (
            <DataMappingRow key={`${row.sourceField}-${row.targetField}`} {...row} />
          ))}
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · heavy transforms (currency + date)</span>
        <div className={styles.demoStack}>
          {TRANSFORM_ROWS.map((row) => (
            <DataMappingRow key={`${row.sourceField}-${row.targetField}`} {...row} />
          ))}
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · full mapping (Shopify → Payload)</span>
        <div className={styles.demoStack}>
          {ALL_ROWS.map((row) => (
            <DataMappingRow key={`${row.sourceField}-${row.targetField}`} {...row} />
          ))}
        </div>
      </section>
    </main>
  )
}
