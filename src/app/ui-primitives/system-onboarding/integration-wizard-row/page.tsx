import type { Metadata } from "next"

import { IntegrationWizardRow } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  INTEGRATION_FULL_LIST,
  INTEGRATION_ROW_CONNECTED,
  INTEGRATION_ROW_CONNECTING,
  INTEGRATION_ROW_NEEDS_ATTENTION,
  INTEGRATION_ROW_NOT_CONNECTED,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Integration wizard | System onboarding",
  description:
    "Primitive 04 — single integration step row for the onboarding wizard. Three states: not-connected, connecting, connected, plus a needs-attention variant and a four-up gallery.",
}

export default function IntegrationWizardRowScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Integration"
        title="Integration wizard row"
        description="A single integration row in the onboarding integration step — vendor mark, label, region, status pill and a connect / manage CTA. Used in a stack for Stripe / Twilio / Shopify / MYOB."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Integration wizard" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Not connected — Stripe AU required to launch</span>
        <IntegrationWizardRow row={INTEGRATION_ROW_NOT_CONNECTED} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Connecting — Twilio AU number provisioning</span>
        <IntegrationWizardRow row={INTEGRATION_ROW_CONNECTING} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Connected — Shopify storefront synced</span>
        <IntegrationWizardRow row={INTEGRATION_ROW_CONNECTED} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Edge · Needs attention — MYOB token rotated</span>
        <IntegrationWizardRow row={INTEGRATION_ROW_NEEDS_ATTENTION} />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Gallery · Full integration step list</span>
        <div className={styles.demoStack}>
          {INTEGRATION_FULL_LIST.map((row) => (
            <IntegrationWizardRow key={row.id} row={row} />
          ))}
        </div>
      </section>
    </main>
  )
}
