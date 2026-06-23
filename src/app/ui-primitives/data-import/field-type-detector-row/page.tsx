import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { FieldTypeDetectorRow } from "../../components/data-import"

import styles from "../data-import.module.css"

export const metadata: Metadata = {
  title: "Field type detector row | Data import",
  description:
    "Primitive 04 — Per-column detected type chip with override picker and sample value.",
}

export default function FieldTypeDetectorRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Field type detector row"
        title="Field type detector row"
        description="The parser auto-detects a type per column; operators can override when the sample is ambiguous. RRP looks like a number but it really wants to be currency; phone is text not a number."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Data import", href: "/ui-primitives/data-import" },
          { label: "Field type detector row" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Parts CSV detected types</span>
        <div className={styles.demoStack}>
          <FieldTypeDetectorRow
            columnName="SKU"
            detectedType="text"
            sampleValue="MFM-EX-2010-COMM"
          />
          <FieldTypeDetectorRow
            columnName="Title"
            detectedType="text"
            sampleValue="VE Commodore cat-back exhaust — 2.5&quot;"
          />
          <FieldTypeDetectorRow
            columnName="RRP"
            detectedType="number"
            sampleValue="1,498.00"
            override="currency"
          />
          <FieldTypeDetectorRow
            columnName="Stock"
            detectedType="number"
            sampleValue="6"
          />
        </div>
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Customer CSV detected types</span>
        <div className={styles.demoStack}>
          <FieldTypeDetectorRow
            columnName="Email"
            detectedType="email"
            sampleValue="steph.m@example.com"
          />
          <FieldTypeDetectorRow
            columnName="Phone"
            detectedType="number"
            sampleValue="(02) 4296 1188"
            override="phone"
          />
          <FieldTypeDetectorRow
            columnName="Suburb"
            detectedType="text"
            sampleValue="Oak Flats"
          />
        </div>
      </section>
    </main>
  )
}
