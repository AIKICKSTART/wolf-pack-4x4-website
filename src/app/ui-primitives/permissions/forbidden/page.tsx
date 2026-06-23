import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { ForbiddenState } from "../../components/permissions"

import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "Forbidden state | Permissions",
  description:
    "Primitive 05 — 403 state surface with missing-permission detail, request-access CTA and switch-role link.",
}

export default function ForbiddenScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Forbidden state"
        title="403 forbidden state"
        description="When the user hits a permission wall. Names the specific permission missing, the action they tried, their current role, and the role they would need. CTAs let them request access or switch to a workspace where they already have it."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "Forbidden" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Quote approval — Apprentice tried to approve</span>
        <ForbiddenState
          missingPermission="quotes.approve"
          attemptedAction="Approve quote Q-2415 ($3,840) for Coastal Logistics"
          currentRole="Apprentice"
          requiredRole="Workshop Manager or Owner"
          requestAccessAction={
            <Link href="/ui-primitives/permissions/request-access" className={styles.cta}>
              Request access
            </Link>
          }
          switchRoleAction={
            <Link href="/ui-primitives/permissions/workspace-switcher" className={styles.ctaGhost}>
              Switch workspace
            </Link>
          }
        />
      </section>
    </main>
  )
}
