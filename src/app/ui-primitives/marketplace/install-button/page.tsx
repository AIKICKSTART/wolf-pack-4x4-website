import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { InstallButton } from "../../components/marketplace/install-button"
import type { InstallState } from "../../components/marketplace/marketplace-types"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Install button | Marketplace | UI Primitives",
  description: "All five install button states — install, installing, installed, update available, uninstall.",
}

const STATES: ReadonlyArray<{ state: InstallState; pluginName: string }> = [
  { state: "install", pluginName: "ABN lookup" },
  { state: "installing", pluginName: "Hermes content sync" },
  { state: "installed", pluginName: "Stripe payments" },
  { state: "update-available", pluginName: "Twilio SMS" },
  { state: "uninstall", pluginName: "HubSpot CRM" },
]

export default function InstallButtonShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.4 / Install button"
        title="Install button"
        description="Single-responsibility install button covering every state the marketplace surface can express, with live region announcements for state transitions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Install button" },
        ]}
      />

      <section className={styles.section} aria-labelledby="install-button-states">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / States</span>
          <h2 id="install-button-states" className={styles.sectionTitle}>
            Every install state
          </h2>
          <p className={styles.sectionLead}>
            Each button broadcasts its state through <code>role=&quot;status&quot;</code> and{" "}
            <code>aria-live=&quot;polite&quot;</code> so screen readers receive the change without losing focus.
          </p>
        </header>
        <div className={styles.actionRow}>
          {STATES.map(({ state, pluginName }) => (
            <InstallButton key={state} state={state} pluginName={pluginName} />
          ))}
        </div>
      </section>
    </main>
  )
}
