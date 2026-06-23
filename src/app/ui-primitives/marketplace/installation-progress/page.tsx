import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  InstallationProgress,
  type InstallationStep,
} from "../../components/marketplace/installation-progress"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Installation progress | Marketplace | UI Primitives",
  description:
    "Step-by-step installation progress — Downloading, Verifying, Configuring, Permissions, Done.",
}

const STEPS: ReadonlyArray<InstallationStep> = [
  {
    id: "downloading",
    label: "Downloading",
    description: "Fetching the Stripe payments package from the workshop registry.",
    status: "done",
  },
  {
    id: "verifying",
    label: "Verifying signature",
    description: "Checking the Verridian sigstore signature against the publisher fingerprint.",
    status: "done",
  },
  {
    id: "configuring",
    label: "Configuring",
    description: "Wiring up Apple Pay, Afterpay, and the Xero overnight reconciliation hook.",
    status: "active",
  },
  {
    id: "permissions",
    label: "Granting permissions",
    description: "Awaiting workshop owner approval for the webhook + write-data scopes.",
    status: "pending",
  },
  {
    id: "done",
    label: "Done",
    description: "Plugin will appear in the bay floor sidebar once permissions are granted.",
    status: "pending",
  },
]

export default function InstallationProgressShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.14 / Installation"
        title="Installation progress"
        description="Five-step install flow with live progress, step status chips, and an aria-live region for screen readers tracking the install."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Installation progress" },
        ]}
      />

      <section className={styles.section} aria-labelledby="installation-progress-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Live install</span>
          <h2 id="installation-progress-demo" className={styles.sectionTitle}>
            Stripe payments — configuring
          </h2>
        </header>
        <InstallationProgress
          steps={STEPS}
          subtitle="Installing Stripe payments into the Oak Flats workshop. Live status updates announced to assistive tech."
        />
      </section>
    </main>
  )
}
