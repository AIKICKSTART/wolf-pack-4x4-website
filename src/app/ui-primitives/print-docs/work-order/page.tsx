import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PrintPreviewFrame, PrintWorkOrder } from "../../components/print-docs"

import styles from "../print-docs.module.css"

export const metadata: Metadata = {
  title: "Work order | UI Primitives — Print & PDF",
}

export default function PrintWorkOrderDemoPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="23 / Print & PDF · 04"
        title="Work order"
        description="Workshop job sheet — customer block, vehicle block, scope, requested tasks, technician assignments, hours log, parts used, and dual sign-off."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Print & PDF", href: "/ui-primitives/print-docs" },
          { label: "Work order" },
        ]}
      />
      <section className={styles.canvas} aria-label="Work order demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Printed on bay intake and travels with the vehicle through every workshop touchpoint
            — technicians tick off requested tasks, log hours, list parts used, and capture the
            customer signature on collection.
          </p>
        </div>
        <PrintPreviewFrame
          documentId="OFM-WO-26-1142"
          documentLabel="Work order — VF SS Manta catback install"
          format="A4"
        >
          <PrintWorkOrder
            workOrderNumber="OFM-WO-26-1142"
            openedAt="24 May 2026 · 08:15"
            openedIso="2026-05-24T08:15:00+10:00"
            customer={{
              name: "Jared Whittaker",
              phone: "+61 412 884 901",
              email: "jared.whittaker@example.com",
              address: "14 Tongarra Road, Albion Park NSW 2527",
            }}
            vehicle={{
              rego: "CCV-12K",
              make: "Holden",
              model: "Commodore VF SS",
              year: 2015,
              vin: "6H8VFK8KW1L420881",
              odometer: "187 432 km",
            }}
            scope="Replace OEM exhaust system with Manta MK4M3 3.0in stainless catback. Verify clearance over fuel tank, retain factory hangers where possible. Tune verification on chassis dyno post-fit."
            requestedTasks={[
              {
                id: "T1",
                description: "Remove OEM catback assembly, inspect hangers and rubber isolators",
                estimatedHours: 0.5,
              },
              {
                id: "T2",
                description: "Fit Manta MK4M3 stainless catback, weld bay 04",
                estimatedHours: 2,
              },
              {
                id: "T3",
                description: "Install MM01 chrome muffler, align tips",
                estimatedHours: 0.75,
              },
              {
                id: "T4",
                description: "Chassis dyno run — verify AFR and idle, supply pull sheet",
                estimatedHours: 0.5,
              },
            ]}
            technicians={["Brett K. (lead)", "Pho N.", "Manny W."]}
            partsUsed={[
              {
                sku: "MANTA-MK4M3-CB-001",
                description: "Manta MK4M3 catback assembly",
                quantity: 1,
              },
              {
                sku: "MANTA-MUF-MM01-CHR",
                description: "Manta MM01 chrome muffler 3.0in",
                quantity: 1,
              },
              {
                sku: "OFM-CLP-30-SS",
                description: "Stainless clamp 3.0in",
                quantity: 2,
              },
              {
                sku: "OFM-GSKT-FLG-3",
                description: "3-bolt flange gasket",
                quantity: 2,
              },
            ]}
            hoursLog={[
              {
                bay: "Bay 04",
                technician: "Brett K.",
                startedAt: "09:05",
                endedAt: "11:35",
              },
              {
                bay: "Bay 04",
                technician: "Pho N.",
                startedAt: "10:15",
                endedAt: "11:35",
              },
              {
                bay: "Dyno",
                technician: "Manny W.",
                startedAt: "12:10",
                endedAt: "12:42",
              },
            ]}
            hoursBudget={3.75}
          />
        </PrintPreviewFrame>
      </section>
    </main>
  )
}
