import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { JitAccessBanner } from "../../components/permissions"

import { nextJitExpiry } from "../demo-data"
import styles from "../permissions.module.css"

export const metadata: Metadata = {
  title: "JIT access banner | Permissions",
  description:
    "Primitive 10 — just-in-time elevation banner with live countdown and revoke-now button.",
}

export default function JitBannerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / JIT access banner"
        title="Just-in-time access banner"
        description="When a user is temporarily elevated, this banner sits above the dashboard. Shows the role they hold, the scope it applies to, and a live countdown — the timer ticks every second and shifts to a danger state on expiry. One click revokes the elevation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Permissions", href: "/ui-primitives/permissions" },
          { label: "JIT banner" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Elevated to Workshop Manager · expires ~ 87m</span>
        <JitAccessBanner
          role="Workshop Manager"
          roleTone="workshop"
          expiresAt={nextJitExpiry()}
          scope="Oak Flats workshop only"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Higher scope · Owner-level access</span>
        <JitAccessBanner
          role="Workspace Owner"
          roleTone="owner"
          expiresAt={nextJitExpiry()}
          scope="Albion Park workspace · audit + settings"
        />
      </section>
    </main>
  )
}
