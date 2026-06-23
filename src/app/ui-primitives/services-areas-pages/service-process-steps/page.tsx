import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceProcessSteps } from "../../components/services-areas-pages"
import { DEMO_PROCESS_STEPS } from "../demo-data"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Service process steps | Services & areas | UI Primitives",
  description:
    "Numbered service process steps row — vehicle drop-off, fitment check, build, test, handover.",
}

export default function ServiceProcessStepsScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04"
        title="Service process steps"
        description="Numbered process steps row for the service detail page. Composes the marketing ProcessSteps primitive and supplies workshop-specific icons (car drop-off, clipboard fitment, TIG build, tachometer test, checkered flag handover) from the shared icons library."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Service process steps" },
        ]}
      />
      <ServiceProcessSteps
        title="From drop-off to handover"
        steps={DEMO_PROCESS_STEPS}
      />
    </main>
  )
}
