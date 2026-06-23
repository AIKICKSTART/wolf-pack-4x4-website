import type { Metadata } from "next"

import { SecurityPostureScore } from "../../components/compliance"
import { PageHeader } from "../../components/page-header"

import styles from "../compliance.module.css"

export const metadata: Metadata = {
  title: "Security posture score | Compliance",
  description:
    "Primitive 13 — 0-100 security posture score with contributing factors and a 14-day trend sparkline.",
}

export default function SecurityPostureScoreScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Posture"
        title="Security posture score"
        description="A single big number summary of security health, 0 to 100. Backed by role='meter' + aria-valuenow on the SVG dial. Contributing-factor chips show the inputs (MFA enforced, DLP active, Endpoint EDR, etc.) and a small SVG sparkline shows the 14-day trend. Tone shifts green / amber / red as the score drops."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Compliance", href: "/ui-primitives/compliance" },
          { label: "Security posture score" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · three tone bands</span>
        <SecurityPostureScore
          score={88}
          title="Workshop security posture"
          factors={[
            { id: "mfa", label: "MFA enforced 100%", tone: "positive" },
            { id: "edr", label: "Endpoint EDR", tone: "positive" },
            { id: "patch", label: "Patch SLA <14d", tone: "positive" },
            { id: "dlp", label: "DLP active", tone: "positive" },
            { id: "iam", label: "Privileged access review overdue", tone: "warn" },
          ]}
          trend={[80, 82, 81, 84, 83, 85, 84, 86, 85, 87, 86, 88, 87, 88]}
        />
        <SecurityPostureScore
          score={62}
          title="Pre-IRAP baseline"
          factors={[
            { id: "mfa", label: "MFA enforced 96%", tone: "warn" },
            { id: "edr", label: "Endpoint EDR", tone: "positive" },
            { id: "patch", label: "Patch SLA 21d", tone: "warn" },
            { id: "lock", label: "Local admin lockdown pending", tone: "negative" },
          ]}
          trend={[70, 68, 67, 65, 63, 62, 64, 63, 62, 61, 60, 62, 62, 62]}
        />
      </section>
    </main>
  )
}
