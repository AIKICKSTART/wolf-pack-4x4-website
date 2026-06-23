import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MfaEnrollmentCard } from "../../components/auth-deep"

import {
  MFA_CODE_ISSUED,
  MFA_ENROLLED,
  MFA_SELECT,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "MFA enrolment card | Auth deep",
  description:
    "Primitive 01 — wizard-style MFA enrolment with TOTP, SMS, email, security-key and backup-codes paths.",
}

export default function MfaEnrollmentCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / MFA"
        title="MFA enrolment card"
        description="Multi-factor enrolment wizard with method picker, code issuance (always masked) and accessibility-first live region updates."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "MFA enrolment card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Method picker · admin policy</span>
        <MfaEnrollmentCard {...MFA_SELECT} />

        <span className={styles.stageCaption}>Code issued · 42s countdown</span>
        <MfaEnrollmentCard {...MFA_CODE_ISSUED} />

        <span className={styles.stageCaption}>Enrolled · hardware key on file</span>
        <MfaEnrollmentCard {...MFA_ENROLLED} />
      </section>
    </main>
  )
}
