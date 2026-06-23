import type { Metadata } from "next"

import { VariantEditorPair } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "Variant editor pair | A/B runtime",
  description:
    "Primitive 02 — side-by-side control vs treatment editor with live character diff for headline and body.",
}

export default function VariantEditorPairScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Editor"
        title="Variant editor pair"
        description="Side-by-side control vs treatment editor. Lets the experiment author hand-write the two variants of a piece of copy, with a live character-level diff in the footer."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "Variant editor pair" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · Suburb landing CTA</span>
        <VariantEditorPair
          title="Suburb landing CTA — Wollongong"
          controlName="Generic"
          treatmentName="Suburb-pinned"
          defaultControl={{
            headline: "Get a free exhaust quote",
            body: "Book a workshop visit in under 2 minutes. We'll quote your job with no obligation.",
          }}
          defaultTreatment={{
            headline: "Get a free Wollongong exhaust quote",
            body: "Booked into Oak Flats workshop in under 2 minutes. Local team, same-day call back, no obligation.",
          }}
        />
      </section>
    </main>
  )
}
