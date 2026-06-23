import type { Metadata } from "next"

import { BarcodeScannerCard } from "../../components/pos-checkout"
import { PageHeader } from "../../components/page-header"

import { RECENT_SKUS } from "../_mock-data"
import styles from "../pos-checkout.module.css"

export const metadata: Metadata = {
  title: "Barcode scanner | POS checkout",
  description:
    "Primitive 02 — barcode scanner card with camera viewport, animated scanline and manual SKU fallback.",
}

export default function BarcodeScannerCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Barcode scanner"
        title="Barcode scanner card"
        description="Bay 1 camera viewport with scanline + manual SKU fallback. Idle / active / error states and recent-scan tail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "POS checkout", href: "/ui-primitives/pos-checkout" },
          { label: "Barcode scanner" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · active scan, recent tail</span>
        <BarcodeScannerCard
          status="active"
          message="Hold barcode 8 cm from lens · auto focus engaged"
          recentSkus={RECENT_SKUS}
        />
        <span className={styles.stageCaption}>State 02 · idle, awaiting trigger</span>
        <BarcodeScannerCard
          status="idle"
          message="Press shutter to start scanner"
          recentSkus={[]}
        />
        <span className={styles.stageCaption}>State 03 · read failed, fallback prompted</span>
        <BarcodeScannerCard
          status="error"
          message="Could not decode barcode — key SKU manually"
          recentSkus={RECENT_SKUS}
        />
      </section>
    </main>
  )
}
