import type { Metadata } from "next"

import { UtmParameterBuilder } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "UTM parameter builder | Marketing campaigns",
  description:
    "Primitive 13 — source / medium / campaign / term / content inputs with generated URL preview and copy.",
}

export default function UtmBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / UTM parameter builder"
        title="UTM parameter builder"
        description="Fill in source, medium, campaign, term and content. The URL preview re-renders as you type and supports a one-click copy. Required fields are marked with a red asterisk."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "UTM builder" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <UtmParameterBuilder />
      </section>
    </main>
  )
}
