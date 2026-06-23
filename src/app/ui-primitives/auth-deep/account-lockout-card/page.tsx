import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { AccountLockoutCard } from "../../components/auth-deep"

import {
  LOCKOUT_BRUTEFORCE,
  LOCKOUT_COMPLIANCE,
  LOCKOUT_COMPROMISED,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Account lockout card | Auth deep",
  description:
    "Primitive 14 — locked account card with reason, incident reference and unlock options.",
}

export default function AccountLockoutCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Lockout"
        title="Account lockout card"
        description="Locked-account surface — reason, incident reference, masked recovery email and a graduated unlock path (self-service → support ticket → admin override)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Account lockout card" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Brute-force protection · self-service available</span>
        <AccountLockoutCard {...LOCKOUT_BRUTEFORCE} />

        <span className={styles.stageCaption}>Compromised credentials · identity verified</span>
        <AccountLockoutCard {...LOCKOUT_COMPROMISED} />

        <span className={styles.stageCaption}>Compliance hold · support-only path</span>
        <AccountLockoutCard {...LOCKOUT_COMPLIANCE} />
      </section>
    </main>
  )
}
