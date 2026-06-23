import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { QuoteBuilderWorkspace } from "../../components/workshop-scenes/quote-builder-workspace"
import type {
  QuoteBuilderLibraryItem,
  QuoteBuilderLineItem,
} from "../../components/workshop-scenes/quote-builder-workspace"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Quote builder | UI Primitives — Workshop Scenes",
}

const library: ReadonlyArray<QuoteBuilderLibraryItem> = [
  {
    id: "lib-1",
    sku: "MAN-MK24-405",
    title: "Manta 3in stainless cat-back",
    supplier: "Manta",
    unitPrice: 1289.0,
  },
  {
    id: "lib-2",
    sku: "XFC-PX3-MAN",
    title: "XForce twin-tip mid-muffler",
    supplier: "XForce",
    unitPrice: 489.5,
  },
  {
    id: "lib-3",
    sku: "PAC-LC79-HDR",
    title: "Pacemaker 5-into-1 headers",
    supplier: "Pacemaker",
    unitPrice: 2185.0,
  },
  {
    id: "lib-4",
    sku: "BST-NP300-2X",
    title: "Beast twin 2.5in tip kit",
    supplier: "Beast",
    unitPrice: 412.0,
  },
  {
    id: "lib-5",
    sku: "WIG-BT50-MUF",
    title: "Wigwam mid-mount muffler",
    supplier: "Wigwam",
    unitPrice: 312.0,
  },
  {
    id: "lib-6",
    sku: "OFM-LAMBDA",
    title: "Lambda sensor + dyno tune",
    supplier: "In-house",
    unitPrice: 320.0,
  },
]

const selected: ReadonlyArray<QuoteBuilderLineItem> = [
  {
    id: "line-1",
    sku: "MAN-MK24-405",
    title: "Manta 3in stainless cat-back",
    qty: 1,
    unitPrice: 1289.0,
  },
  {
    id: "line-2",
    sku: "XFC-PX3-MAN",
    title: "XForce twin-tip mid-muffler",
    qty: 1,
    unitPrice: 489.5,
  },
  {
    id: "line-3",
    sku: "OFM-LAMBDA",
    title: "Lambda sensor + dyno tune",
    qty: 1,
    unitPrice: 320.0,
  },
]

export default function QuoteBuilderScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.04 / Workshop scenes"
        title="Quote builder workspace"
        description="The full quoting surface — library on the left, draft in the middle, customer & vehicle context on the right. Drag a part across to compose the quote line by line."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Quote builder" },
        ]}
      />
      <section className={styles.canvas}>
        <QuoteBuilderWorkspace
          library={library}
          selected={selected}
          customer={{
            name: "Lacey O'Connell",
            suburb: "Albion Park Rail · NSW 2527",
            phone: "0428 117 304",
          }}
          vehicle={{
            year: 2023,
            make: "Nissan",
            model: "Patrol Y62 Ti-L",
            rego: "BRR-902",
            engine: "5.6L V8 petrol",
          }}
          labour={620}
          notes={[
            "Customer wants mid-range torque, not noise. Keep the cabin quiet.",
            "ADR 80/13 compliance must hold — supply paperwork at handover.",
            "Tip alignment: 14mm rolled rear, dual exit RHS.",
          ]}
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The line totals update against the unit price ex GST. The
            grand-total tile applies the Australian 10% GST so the customer sees
            a familiar inc-GST figure. Drag-and-drop is the primary affordance,
            but keyboard users can press Enter on a library item to add it.
          </p>
        </div>
      </section>
    </main>
  )
}
