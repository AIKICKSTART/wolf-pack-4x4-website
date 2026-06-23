import type { Metadata } from "next"

import { SanctionsScreenResult } from "../../components/kyc"
import { PageHeader } from "../../components/page-header"

import styles from "../kyc.module.css"

export const metadata: Metadata = {
  title: "Sanctions screen result | KYC",
  description:
    "Primitive 06 — sanctions / PEP screening result card with scan timestamp, status chip (Clear / Hit / Review) and a collapsible matched-records list.",
}

export default function SanctionsScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Sanctions"
        title="Sanctions screen result"
        description="Sanctions and politically-exposed-person screening result card. Lists checked across AUSTRAC, OFAC, UN, DFAT, UK HMT and EU CFSP. Status chip shifts tone (Clear / Review / Hit) and a collapsible accordion shows individual matched records with confidence percentages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "KYC", href: "/ui-primitives/kyc" },
          { label: "Sanctions" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive — three result states</span>
        <div className={styles.demoStack}>
          <SanctionsScreenResult
            kicker="Director — sole trader"
            subject="Daniel Fleuren"
            status="clear"
            scannedAt="28 May 2026, 9:14 AM AEST"
          />
          <SanctionsScreenResult
            kicker="Entity screening"
            subject="Oak Flats Mufflermen Pty Ltd"
            status="review"
            scannedAt="28 May 2026, 7:56 PM AEST"
            defaultExpanded
            matches={[
              {
                id: "match-01",
                name: "Oak Flat Muffler Works LLC",
                list: "OFAC adverse media",
                confidence: 64,
                notes:
                  "Name similarity only — country mismatch (TX vs NSW) and no matching directors.",
              },
              {
                id: "match-02",
                name: "Mercer Holdings Trust",
                list: "AUSTRAC PEP",
                confidence: 41,
                notes:
                  "Beneficial owner surname overlap. Needs reviewer sign-off.",
              },
            ]}
          />
          <SanctionsScreenResult
            kicker="Beneficial owner"
            subject="Konstantin V."
            status="hit"
            scannedAt="28 May 2026, 10:02 AM AEST"
            defaultExpanded
            matches={[
              {
                id: "match-03",
                name: "Konstantin Vlasov",
                list: "UN consolidated list",
                confidence: 93,
                notes:
                  "Strong DOB + nationality match. Halt onboarding and escalate to compliance team.",
              },
            ]}
          />
        </div>
      </section>
    </main>
  )
}
