import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartCategoryCard } from "../../components/parts-pages"

import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Part category card | Parts pages",
  description: "Primitive 03 — Single category card with thumbnail mark, part count, and popular supplier chips.",
}

export default function PartCategoryCardPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Category card"
        title="Part category card"
        description="One card per catalogue category. Tone-coded thumbnail mark, part count chip, popular supplier chips, and a category CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Category card" },
        ]}
      />

      <div className={styles.stageFrame}>
        <span className={styles.stageCaption}>Four tone-coded categories</span>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "var(--primitive-space-4)" }}>
          <PartCategoryCard
            title="Complete systems"
            description="Catbacks, turbo-backs, and full performance exhaust kits from ute and 4x4 specialists."
            href="/parts/category/complete-systems"
            tone="red"
            partCount={184}
            popularSuppliers={[
              { id: "manta", label: "Manta", tone: "manta" },
              { id: "redback", label: "Redback", tone: "redback" },
              { id: "xforce", label: "XForce", tone: "xforce" },
            ]}
          />
          <PartCategoryCard
            title="Mufflers"
            description="Sports mufflers, replacement mufflers and resonators with sound and flow specs."
            href="/parts/category/mufflers"
            tone="amber"
            partCount={412}
            popularSuppliers={[
              { id: "lukey", label: "Lukey", tone: "lukey" },
              { id: "redback", label: "Redback", tone: "redback" },
            ]}
          />
          <PartCategoryCard
            title="Pipes"
            description="Mandrel-bent stainless and aluminised pipework, tips, clamps and hangers."
            href="/parts/category/pipes"
            tone="teal"
            partCount={318}
            popularSuppliers={[
              { id: "xforce", label: "XForce", tone: "xforce" },
              { id: "manta", label: "Manta", tone: "manta" },
            ]}
          />
          <PartCategoryCard
            title="Filters"
            description="High-flow dry and oiled filters with installation hardware and replacement schedule."
            href="/parts/category/filters"
            tone="green"
            partCount={144}
            popularSuppliers={[
              { id: "manta", label: "Manta", tone: "manta" },
              { id: "pacemaker", label: "Pacemaker", tone: "pacemaker" },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
