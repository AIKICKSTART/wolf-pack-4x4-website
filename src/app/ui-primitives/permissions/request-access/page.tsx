import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RequestAccessFlow } from "../../components/permissions"

import {
  DEMO_REQUEST_REVIEWER,
  DEMO_REQUEST_ROLE_OPTIONS,
} from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Request access flow | Permissions",
  description:
    "Primitive 08 — three-step request-access wizard with reviewer info and SLA chip.",
}

export default function RequestAccessScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Request access"
        title="Request access flow"
        description="Three steps — explain why, choose the role, review and submit. Shows the reviewer (workshop owner Marcus) and the estimated SLA chip so the requester knows what to expect."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Request access" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Wizard — step 1 by default</span>
        <RequestAccessFlow
          roleOptions={DEMO_REQUEST_ROLE_OPTIONS}
          reviewer={DEMO_REQUEST_REVIEWER}
          estimatedSla="Reviewed within 1 business hour"
        />
      </section>
    </main>
  )
}
