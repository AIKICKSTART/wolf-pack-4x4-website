import type { Metadata } from "next"

import { MimeTypeFilter } from "../../components/asset-cdn"
import { PageHeader } from "../../components/page-header"

import styles from "../asset-cdn.module.css"

export const metadata: Metadata = {
  title: "MIME-type filter | Asset CDN",
  description: "Primitive 10 — MIME-type allow / block list with patterns and max-size notes.",
}

export default function MimeTypeFilterScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Upload firewall"
        title="MIME-type filter"
        description="A simple CRUD list of allowed and blocked MIME patterns at the upload edge. Each row toggles between allow and block, carries a max-byte note where it makes sense, and exposes a remove action. Add patterns from the form at the top of the panel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset CDN", href: "/ui-primitives/asset-cdn" },
          { label: "MIME-type filter" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · CRUD</span>
        <MimeTypeFilter />
      </section>
    </main>
  )
}
