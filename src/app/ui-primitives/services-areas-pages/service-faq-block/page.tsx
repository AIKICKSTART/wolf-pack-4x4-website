import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceFaqBlock } from "../../components/services-areas-pages"
import { DEMO_FAQS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Service FAQ block | Services & areas | UI Primitives",
  description: "Service-specific FAQ accordion with Base UI accessibility wiring.",
}

export default function ServiceFaqBlockScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05"
        title="Service FAQ block"
        description="Service-specific FAQ accordion. Composes the marketing FaqAccordion primitive (built on Base UI) and supplies the typed FAQ shape so the section heading, kicker, and default-open item are easy to pass through."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Service FAQ block" },
        ]}
      />
      <ServiceFaqBlock title="Questions customers ask" faqs={DEMO_FAQS} />
    </main>
  )
}
