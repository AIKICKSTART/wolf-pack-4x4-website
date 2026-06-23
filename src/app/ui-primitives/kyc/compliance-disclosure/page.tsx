import type { Metadata } from "next"

import { ComplianceDisclosureBlock } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Compliance disclosure | KYC",
  description:
    "Primitive 14 — compact legal disclosure block: privacy paragraph, governing policies (Australian Privacy Principles, GDPR), retention summary, and a privacy contact email.",
}

export default function ComplianceDisclosureScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Disclosure"
        title="Compliance disclosure block"
        description="Compact disclosure block used at the bottom of KYC flows. Privacy paragraph, governing policy bullets (APP, GDPR, AUSTRAC AML/CTF), retention policy summary, last-updated timestamp and a privacy contact email. Visually quiet so it doesn’t fight the active step above."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Compliance disclosure" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — bottom-of-flow placement</span>
        <ComplianceDisclosureBlock
          title="How we handle your information"
          privacyBody="We collect this information to satisfy Australian AML/CTF (Anti-Money Laundering and Counter-Terrorism Financing) obligations and to verify your workshop entity. Data is encrypted in transit and at rest, and only accessible to the compliance team and the original reviewer of your case."
          policies={[
            {
              id: "p1",
              label: "Australian Privacy Principles (APP)",
              href: "https://www.oaic.gov.au/privacy/australian-privacy-principles",
            },
            { id: "p2", label: "AUSTRAC AML/CTF Act 2006", href: "https://www.austrac.gov.au/" },
            {
              id: "p3",
              label: "NSW Fair Trading record-keeping",
              href: "https://www.fairtrading.nsw.gov.au/",
            },
            { id: "p4", label: "GDPR (where applicable)", href: "https://gdpr-info.eu/" },
          ]}
          retentionLabel="Data retention"
          retentionDetail="Documents and identity records are held for seven years after the workshop relationship ends, per AUSTRAC reporting-entity requirements. You can request deletion of optional fields at any time."
          contactEmail="privacy@verridian.ai"
          lastUpdated="Last updated 12 March 2026"
        />
      </section>
    </main>
  )
}
