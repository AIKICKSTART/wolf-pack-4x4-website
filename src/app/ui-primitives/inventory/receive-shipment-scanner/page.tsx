import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReceiveShipmentScanner } from "../../components/inventory"

import { RECEIVE_EXPECTED, RECEIVE_SCANNED } from "../fixtures"
import styles from "../inventory.module.css"

export const metadata: Metadata = {
  title: "Receive shipment scanner | Inventory",
  description:
    "Primitive 08 — Receive shipment UI with barcode-scan field, scanned line variance flag and commit CTA.",
}

export default function ReceiveShipmentScannerPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Dock"
        title="Receive shipment scanner"
        description="Barcode-scan field, scanned items list with per-line variance flag and a commit-receipt CTA. State is local; wire onScan / onCommit upstream."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Inventory", href: "/ui-primitives/inventory" },
          { label: "Receive shipment scanner" },
        ]}
      />
      <section className={styles.stageFrame}>
        <ReceiveShipmentScanner
          poRef="PO-2026-0481"
          supplier="Manta Performance"
          expected={RECEIVE_EXPECTED}
          scanned={RECEIVE_SCANNED}
        />
      </section>
    </main>
  )
}
