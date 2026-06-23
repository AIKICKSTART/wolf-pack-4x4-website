import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { RegistrationExpiryChip } from "../../components/vehicles/registration-expiry-chip"

import styles from "../vehicles.module.css"

export const metadata: Metadata = {
  title: "Registration expiry chip | Vehicles | UI Primitives",
  description:
    "Registration expiry chip — NSW rego countdown that shifts tone from green to amber to red as expiry approaches, and stays red after expiry.",
}

// Fixed reference date so the demo is deterministic regardless of session time.
const NOW = new Date("2026-05-29T08:00:00+10:00")

export default function RegistrationExpiryChipScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Scene 05"
        title="Registration expiry chip"
        description="Status chip variants based on days remaining on the NSW rego — fresh, 90 days, 30 days, 14 days, 7 days, and expired."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Vehicles", href: "/ui-primitives/vehicles" },
          { label: "Registration expiry chip" },
        ]}
      />
      <section className={styles.sceneShell}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
          <RegistrationExpiryChip expiresISO="2027-02-20" now={NOW} />
          <RegistrationExpiryChip expiresISO="2026-08-20" now={NOW} />
          <RegistrationExpiryChip expiresISO="2026-06-26" now={NOW} />
          <RegistrationExpiryChip expiresISO="2026-06-12" now={NOW} />
          <RegistrationExpiryChip expiresISO="2026-06-04" now={NOW} />
          <RegistrationExpiryChip expiresISO="2026-05-29" now={NOW} />
          <RegistrationExpiryChip expiresISO="2026-04-21" now={NOW} />
        </div>
      </section>
    </main>
  )
}
