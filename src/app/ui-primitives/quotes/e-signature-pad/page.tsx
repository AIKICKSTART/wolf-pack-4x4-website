import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ESignaturePad } from "../../components/quotes"

import styles from "../quotes.module.css"

export const metadata: Metadata = {
  title: "E-signature pad | Quotes | UI Primitives",
  description:
    "Electronic signature pad — typed, drawn, or uploaded signature with binding acceptance checkbox.",
}

export default function ESignaturePadPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Quote 07"
        title="E-signature pad"
        description="Where the customer actually signs the quote. Three input methods (type / draw / upload), live preview, clear and reset actions, and a binding-acceptance checkbox that gates the submit CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Quotes", href: "/ui-primitives/quotes" },
          { label: "E-signature pad" },
        ]}
      />
      <ESignaturePad signerName="Mikhail Petrov" />
    </main>
  )
}
