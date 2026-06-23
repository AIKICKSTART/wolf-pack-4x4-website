import type { Metadata } from "next"

import { PlanSwitcher } from "../../components/billing"
import { PageHeader } from "../../components/page-header"
import { DEMO_FEATURES, DEMO_PLANS } from "../demo-data"
import styles from "../billing.module.css"

export const metadata: Metadata = {
  title: "Plan switcher | Billing | UI Primitives",
  description:
    "Plan switcher primitive — three plans side-by-side with current badge, feature comparison matrix, and monthly / annual toggle.",
}

export default function PlanSwitcherPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02"
        title="Plan switcher"
        description="Side-by-side plan comparison. Each card shows price for the selected interval, current-plan badge, and a switch CTA. Feature matrix below lists per-feature inclusion across plans."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Billing", href: "/ui-primitives/billing" },
          { label: "Plan switcher" },
        ]}
      />
      <PlanSwitcher
        plans={DEMO_PLANS}
        currentPlanId="workshop_pro"
        features={DEMO_FEATURES}
      />
    </main>
  )
}
