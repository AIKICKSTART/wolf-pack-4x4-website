import type { Metadata } from "next"

import { SrmWarningBanner } from "../../components/ab-runtime"
import { PageHeader } from "../../components/page-header"

import styles from "../ab-runtime.module.css"

export const metadata: Metadata = {
  title: "SRM warning banner | A/B runtime",
  description:
    "Primitive 12 — sample ratio mismatch banner with severity, chi-square p-value, and per-arm splits.",
}

export default function SrmWarningBannerScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Warning"
        title="SRM warning banner"
        description="Sample ratio mismatch surface. Fires when observed allocation diverges from expected — a sign your routing, bot filtering or assignment logic is broken and the experiment can't be trusted."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "A/B runtime", href: "/ui-primitives/ab-runtime" },
          { label: "SRM warning banner" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · critical + soft</span>
        <div className={styles.demoStack}>
          <SrmWarningBanner
            severity="critical"
            pValue={0.0003}
            arms={[
              { id: "control", name: "Legacy PDF", expectedPct: 50, observedPct: 56.2, observed: 16_004 },
              { id: "treatment", name: "Brand header v2", expectedPct: 50, observedPct: 43.8, observed: 12_426 },
            ]}
          />
          <SrmWarningBanner
            severity="warning"
            pValue={0.041}
            arms={[
              { id: "control", name: "Generic CTA", expectedPct: 70, observedPct: 72.1, observed: 7100 },
              { id: "treatment", name: "Suburb-pinned", expectedPct: 30, observedPct: 27.9, observed: 2742 },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
