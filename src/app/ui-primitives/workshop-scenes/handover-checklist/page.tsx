import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { HandoverChecklist } from "../../components/workshop-scenes/handover-checklist"
import type {
  HandoverInvoiceLine,
  HandoverPhoto,
} from "../../components/workshop-scenes/handover-checklist"
import styles from "../workshop-scenes.module.css"

export const metadata: Metadata = {
  title: "Handover checklist | UI Primitives — Workshop Scenes",
}

const photos: ReadonlyArray<HandoverPhoto> = [
  { id: "p1", label: "01 BEFORE" },
  { id: "p2", label: "02 RAW PIPE" },
  { id: "p3", label: "03 WELD" },
  { id: "p4", label: "04 TIPS" },
  { id: "p5", label: "05 PLATE" },
  { id: "p6", label: "06 ADR" },
  { id: "p7", label: "07 FINAL" },
]

const invoiceLines: ReadonlyArray<HandoverInvoiceLine> = [
  { label: "Manta MK24-405 3in cat-back", amount: 1729.0 },
  { label: "AC-401 adapter flange (in-house)", amount: 145.0 },
  { label: "Lambda sensor + mounting bung", amount: 215.0 },
  { label: "Bay 2 labour · 5.5 hours", amount: 522.5 },
  { label: "ADR 80/13 paperwork", amount: 65.0 },
]

export default function HandoverChecklistScenePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.08 / Workshop scenes"
        title="Handover checklist"
        description="The final stage before a customer drives off. Photo evidence, recorded sound clip, itemised invoice and payment state — everything stamped before keys swap hands."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Workshop scenes", href: "/ui-primitives/workshop-scenes" },
          { label: "Handover checklist" },
        ]}
      />
      <section className={styles.canvas}>
        <HandoverChecklist
          jobNumber="JOB-2026-0418"
          customerName="Bryce Cattermole"
          vehicle="2024 Hilux N80 dual cab · ECC-714"
          photos={photos}
          soundClipLength="00:42"
          invoiceLines={invoiceLines}
          paymentState="paid"
          paymentMeta="EFTPOS · 14:22"
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            The play button is a visual placeholder for the audio capture
            workflow — production wires the click into HTML5 audio with the
            stored MP3. Payment chip flips between paid (green), deposit
            (amber) and outstanding (red) so reception knows whether to take
            money at the desk.
          </p>
        </div>
      </section>
    </main>
  )
}
