import type { Metadata } from "next"

import { CdnPurgeConfirmation } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import { DEMO_PURGE_PATHS } from "../asset-cdn-fixtures"
import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "CDN purge confirmation | Asset CDN",
  description: "Primitive 14 — destructive purge modal with affected paths and a typed confirmation word.",
}

export default function CdnPurgeConfirmationScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Purge confirmation"
        title="CDN purge confirmation"
        description="The last line of defence before a hard purge runs. Affected path list, total URL count, and a typed confirmation that has to match the destructive token before the purge button activates. Cancel keeps everything in place."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "Purge confirmation" },
        ]}
      />
      <section className={styles.demoModalBackdrop}>
        <CdnPurgeConfirmation paths={DEMO_PURGE_PATHS} />
      </section>
    </main>
  )
}
