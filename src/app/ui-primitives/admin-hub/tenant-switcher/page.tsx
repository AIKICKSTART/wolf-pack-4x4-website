import type { Metadata } from "next"

import { TenantSwitcher } from "../../components/admin-hub"
import { PageHeader } from "../../components/page-header"

import { TENANTS } from "../_mock-data"
import styles from "../admin-hub.module.css"

export const metadata: Metadata = {
  title: "Tenant switcher | Admin hub",
  description:
    "Primitive 08 — workspace switcher dropdown with logo badge, primary tag, and add-workspace CTA. Three states — closed primary, open list, supplier portal active.",
}

export default function TenantSwitcherScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 08 / Tenant switcher"
        title="Workspace switcher"
        description="Switches between the three Mufflermen workspaces — primary Oak Flats Mufflermen, Illawarra 4WD Co (multi-tenant), and the Pacemaker supplier portal. Three states — closed primary chip, full list open, supplier portal active."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Admin hub", href: "/ui-primitives/admin-hub" },
          { label: "Tenant switcher" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>

        <div className={styles.demoStack}>
          <div>
            <span className={styles.demoStateLabel}>State 1 · primary workspace closed</span>
            <TenantSwitcher tenants={TENANTS} activeTenantId="tenant-ofm" />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 2 · workspace list open</span>
            <TenantSwitcher
              tenants={TENANTS}
              activeTenantId="tenant-ofm"
              defaultOpen
            />
          </div>

          <div>
            <span className={styles.demoStateLabel}>State 3 · supplier portal active</span>
            <TenantSwitcher tenants={TENANTS} activeTenantId="tenant-pacemaker" />
          </div>
        </div>
      </section>
    </main>
  )
}
