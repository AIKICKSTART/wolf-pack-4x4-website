import type { Metadata } from "next"

import { ReceiptPreviewCard } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import {
  RECEIPT_PREVIEW_LINES,
  RECEIPT_PREVIEW_TENDERS,
} from "../_mock-data"
import styles from "../pos-checkout.module.css"

export const metadata: Metadata = {
  title: "Receipt preview | POS checkout",
  description:
    "Primitive 14 — A6-ish thermal receipt preview with OFM logo, line items, GST footer, BPay note and pseudo-random barcode glyph.",
}

const TIP_LINE = {
  id: "rpl-fitting",
  title: "Workshop fitting · 2 hours",
  sku: "SVC-FIT-02",
  quantity: 1,
  unitPrice: 240.0,
}

const SMALL_LINE = {
  id: "rpl-oil",
  title: "Workshop Oil 5W-30 · 5 L",
  sku: "OFM-OIL-5W30",
  quantity: 1,
  unitPrice: 64.95,
}

const TINY_LINE = {
  id: "rpl-air",
  title: "Muffler air freshener",
  sku: "OFM-AIR-FR",
  quantity: 1,
  unitPrice: 6.5,
}

export default function ReceiptPreviewCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Receipt preview"
        title="Receipt preview card"
        description="A6-ish thermal receipt preview — OFM monogram, header, GST-split line items, tender breakdown and a pseudo-random barcode glyph derived from the receipt number."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Receipt preview" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · full sale · cat-back + extractors + resonator</span>
        <ReceiptPreviewCard
          receiptNumber="OFM-30418"
          issuedLabel="29 May 2026 · 13:42"
          operator="Mia"
          customerNote="Dean Patel · workshop crew"
          lines={[...RECEIPT_PREVIEW_LINES, TIP_LINE]}
          tenders={RECEIPT_PREVIEW_TENDERS}
        />
        <span className={styles.stageCaption}>State 02 · counter sale · workshop oil</span>
        <ReceiptPreviewCard
          receiptNumber="OFM-30419"
          issuedLabel="29 May 2026 · 13:55"
          operator="Mia"
          lines={[SMALL_LINE]}
          tenders={[{ method: "Tyro EFTPOS · contactless", amount: 64.95 }]}
        />
        <span className={styles.stageCaption}>State 03 · single-item sale · cash float pad</span>
        <ReceiptPreviewCard
          receiptNumber="OFM-30420"
          issuedLabel="29 May 2026 · 14:08"
          operator="Daniel"
          lines={[TINY_LINE]}
          tenders={[{ method: "Cash", amount: 10.0 }]}
          footerNote="Workshop pickup · gold-medal pit crew"
        />
      </section>
    </main>
  )
}
