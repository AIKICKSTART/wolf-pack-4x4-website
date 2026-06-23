import type { Metadata } from "next"

import { RoleSwitcher } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import {
  ADMIN_ROLES,
  ADMIN_USER_DANIEL,
  ADMIN_USER_IMPERSONATING_TIM,
  ADMIN_USER_MIA,
} from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Role switcher | Admin hub",
  description:
    "Primitive 07 — current-role chip with switcher dropdown and impersonation banner. Three states — closed admin chip, open menu, impersonation notice.",
}

export default function RoleSwitcherScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07 / Role switcher"
        title="Role switcher dropdown"
        description="Compact role chip with avatar, name and current role badge. Opens a dropdown with each role's description and permissions chips. Three states — admin closed, content menu open, manager being impersonated by Daniel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Role switcher" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · admin chip closed</span>
            <RoleSwitcher user={ADMIN_USER_DANIEL} roles={ADMIN_ROLES} />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · content role menu open</span>
            <RoleSwitcher user={ADMIN_USER_MIA} roles={ADMIN_ROLES} defaultOpen />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · impersonation in progress</span>
            <RoleSwitcher
              user={ADMIN_USER_IMPERSONATING_TIM}
              roles={ADMIN_ROLES}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
