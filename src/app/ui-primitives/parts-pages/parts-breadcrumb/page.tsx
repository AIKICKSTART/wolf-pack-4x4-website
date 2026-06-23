import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsBreadcrumb } from "../../components/parts-pages"

import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Parts breadcrumb | Parts pages",
  description: "Primitive 11 — Adapter over primitives/Breadcrumb with parts-specific home icon and category tone on the leaf segment.",
}

export default function PartsBreadcrumbPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Breadcrumb"
        title="Parts breadcrumb"
        description="Composes the generic primitives/Breadcrumb with a Wrench home icon and a category-tone override on the current-page segment. Each variant below uses a different leaf tone."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Breadcrumb" },
        ]}
      />

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Four breadcrumb instances — leaf tone per category</span>
        <div style={{ display: "grid", gap: 14 }}>
          <PartsBreadcrumb
            leafTone="red"
            items={[
              { label: "Home", href: "/" },
              { label: "Parts", href: "/parts" },
              { label: "Complete systems", href: "/parts/category/complete-systems" },
              { label: "Manta 3in catback — Hilux N80" },
            ]}
          />
          <PartsBreadcrumb
            leafTone="amber"
            items={[
              { label: "Home", href: "/" },
              { label: "Parts", href: "/parts" },
              { label: "Mufflers", href: "/parts/category/mufflers" },
              { label: "Redback twin tip — Ranger PX3" },
            ]}
          />
          <PartsBreadcrumb
            leafTone="teal"
            items={[
              { label: "Home", href: "/" },
              { label: "Parts", href: "/parts" },
              { label: "Pipes", href: "/parts/category/pipes" },
              { label: "XForce 3.5in stainless — Patrol Y62" },
            ]}
          />
          <PartsBreadcrumb
            leafTone="green"
            items={[
              { label: "Home", href: "/" },
              { label: "Parts", href: "/parts" },
              { label: "Filters", href: "/parts/category/filters" },
              { label: "Manta dry-flow filter — Hilux N80" },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
