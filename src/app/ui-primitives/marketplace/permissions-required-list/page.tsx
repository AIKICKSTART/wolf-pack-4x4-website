import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PermissionsRequiredList } from "../../components/marketplace/permissions-required-list"
import { PERMISSIONS_SAMPLE } from "../marketplace-fixtures"

import styles from "../marketplace.module.css"

export const metadata: Metadata = {
  title: "Permissions list | Marketplace | UI Primitives",
  description: "Permission scope list with sensitivity tone — low / medium / high.",
}

export default function PermissionsRequiredListShowcasePage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22.9 / Permissions list"
        title="Permissions required list"
        description="Every permission scope a plugin can ask for — colour tone follows the sensitivity of the scope rather than the order of the list."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketplace", href: "/ui-primitives/marketplace" },
          { label: "Permissions list" },
        ]}
      />

      <section className={styles.section} aria-labelledby="permissions-list-demo">
        <header className={styles.sectionHead}>
          <span className={styles.sectionKicker}>01 / Scopes</span>
          <h2 id="permissions-list-demo" className={styles.sectionTitle}>
            Five permission scopes — full sensitivity spread
          </h2>
        </header>
        <PermissionsRequiredList scopes={PERMISSIONS_SAMPLE} />
      </section>
    </main>
  )
}
