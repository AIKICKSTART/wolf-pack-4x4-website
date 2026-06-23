import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ReportShareCard } from "../../components/reports"

import styles from "../reports.module.css"

export const metadata: Metadata = {
  title: "Report share card | Reports",
  description:
    "Primitive 14 — share dialog with public URL chip, expires-on date, access scope chips, and embed code.",
}

const EMBED_SNIPPET = `<iframe
  src="https://reports.mufflermen.com.au/embed/wbu-21-28"
  width="720"
  height="480"
  loading="lazy"
  sandbox="allow-scripts">
</iframe>`

export default function ReportShareCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Report share card"
        title="Report share card"
        description="The dialog content shown after Share — public URL chip with copy affordance, expiry date, access scope chips, and the embed code rendered through the CodeBlock primitive."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Reports", href: "/ui-primitives/reports" },
          { label: "Report share card" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <ReportShareCard
          reportTitle="Weekly bay utilisation · Oak Flats"
          publicUrl="https://reports.mufflermen.com.au/wbu-21-28"
          expiresOn="04 Jun 2026"
          activeScopes={["team", "organisation"]}
          embedCode={EMBED_SNIPPET}
        />
      </section>
    </main>
  )
}
