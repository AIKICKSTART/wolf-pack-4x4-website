import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { TenantPermissionMatrix } from "../../components/auth-deep"

import {
  PERMISSION_ASSIGNMENT_APPRENTICE,
  PERMISSION_ASSIGNMENT_MANAGER,
  PERMISSION_ASSIGNMENT_TECH,
  PERMISSION_SCOPES,
  PERMISSION_VERBS,
} from "../_mock-data"
import styles from "../auth-deep.module.css"

export const metadata: Metadata = {
  title: "Tenant permission matrix | Auth deep",
  description:
    "Primitive 11 — scope × verb permission matrix with admin inheritance and accessible toggles.",
}

export default function TenantPermissionMatrixPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / RBAC"
        title="Tenant permission matrix"
        description="Per-tenant scope × verb matrix — admin grant cascades to other verbs, inherited cells use a teal dashed style to distinguish from explicit grants."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Auth deep", href: "/ui-primitives/auth-deep" },
          { label: "Tenant permission matrix" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Admin · Mick Davies — everything inherited</span>
        <TenantPermissionMatrix
          tenantId="oak-flats-mufflermen"
          scopes={PERMISSION_SCOPES}
          verbs={PERMISSION_VERBS}
          assignment={PERMISSION_ASSIGNMENT_MANAGER}
        />

        <span className={styles.stageCaption}>Tech · Brad Sterling — bookings + quotes</span>
        <TenantPermissionMatrix
          tenantId="oak-flats-mufflermen"
          scopes={PERMISSION_SCOPES}
          verbs={PERMISSION_VERBS}
          assignment={PERMISSION_ASSIGNMENT_TECH}
        />

        <span className={styles.stageCaption}>Apprentice · Jase Moretti — read-only</span>
        <TenantPermissionMatrix
          tenantId="illawarra-4wd-co"
          scopes={PERMISSION_SCOPES}
          verbs={PERMISSION_VERBS}
          assignment={PERMISSION_ASSIGNMENT_APPRENTICE}
        />
      </section>
    </main>
  )
}
