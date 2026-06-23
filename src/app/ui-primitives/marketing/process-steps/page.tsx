import type { Metadata } from "next"
import { ClipboardList, Wrench, Gauge, ShieldCheck, Truck } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import { ProcessSteps, type ProcessStep } from "../../components/marketing/process-steps"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Process steps | Marketing Blocks",
  description:
    "Primitive 14 — numbered process-steps section with connecting line, 3-5 steps each with an icon, title, and body.",
}

const STEPS: ReadonlyArray<ProcessStep> = [
  {
    id: "quote",
    icon: <ClipboardList strokeWidth={1.6} aria-hidden="true" />,
    title: "Quote",
    body: "Send your ute model, exhaust photo, and postcode. We respond with a written quote in 24 hours.",
  },
  {
    id: "book",
    icon: <Wrench strokeWidth={1.6} aria-hidden="true" />,
    title: "Book",
    body: "Pick a Stage 1, Stage 2, or custom slot. Workshop bay locked in. Manta parts pulled from the cage.",
  },
  {
    id: "fit",
    icon: <Gauge strokeWidth={1.6} aria-hidden="true" />,
    title: "Fit & dyno",
    body: "TIG welds laid on the bay. Pre and post dyno run at Albion Park. Torque sheet signed off.",
  },
  {
    id: "sign",
    icon: <ShieldCheck strokeWidth={1.6} aria-hidden="true" />,
    title: "ADR sign-off",
    body: "ADR 83/00 docket stamped against your VIN. Lifetime crack warranty on every Mufflermen weld.",
  },
  {
    id: "drive",
    icon: <Truck strokeWidth={1.6} aria-hidden="true" />,
    title: "Drive away",
    body: "Pick up the ute Wednesday afternoon. Sound check on the kerb. Coffee on the front desk.",
  },
]

export default function ProcessStepsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Process steps"
        title="Process steps"
        description="Five numbered steps with a dashed connecting line. Each card animates in on view via Reveal."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Process steps" },
        ]}
      />

      <ProcessSteps
        kicker="How a Mufflermen install runs"
        heading="From quote to kerbside — five steps, five days."
        body="The standard install pipeline. Stage 2 dyno tune adds an extra day. Caravan rigs add two."
        steps={STEPS}
      />
    </main>
  )
}
