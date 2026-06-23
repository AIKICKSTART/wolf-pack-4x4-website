import type { Metadata } from "next"

import { BeneficialOwnerCard } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Beneficial owner card | KYC",
  description:
    "Primitive 09 — beneficial owner card listing each natural person with name, ownership percentage chip, role, verification status, remove action, and an add-owner CTA.",
}

export default function BeneficialOwnerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Owners"
        title="Beneficial owner card"
        description="Beneficial-owner disclosure card. Under AUSTRAC rules, list every natural person or controlling entity at 25 percent ownership or above. Each row shows initials avatar, name, ownership percentage chip, role, verification status, and a remove action. An add-owner CTA at the foot opens the entry form."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Beneficial owner" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Live primitive — three owners (try the remove action)
        </span>
        <BeneficialOwnerCard
          kicker="Step 05 / Owners"
          title="Beneficial owner disclosure"
          body="Capture every natural person or controlling entity at 25% ownership and above. Verification status appears in-line as each owner clears identity checks."
          initialOwners={[
            {
              id: "owner-01",
              name: "Rachel Mercer",
              ownershipPct: 55,
              role: "Director / UBO",
              status: "approved",
            },
            {
              id: "owner-02",
              name: "Ben Halliday",
              ownershipPct: 25,
              role: "Trustee",
              status: "under-review",
            },
            {
              id: "owner-03",
              name: "Leonie Young",
              ownershipPct: 20,
              role: "Operations manager",
              status: "pending",
            },
          ]}
        />
      </section>
    </main>
  )
}
