import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../search.module.css"

import { FullSceneDemo } from "./full-scene-demo"

export const metadata: Metadata = {
  title: "Full search scene | UI Primitives — Search",
}

export default function FullScenePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 15 · Composition"
        title="Full search scene"
        description="Bonus composition that glues every search primitive into a single working scene: persistent global search bar, faceted filter sidebar, active filter chip bar, mixed result types (product / file / person), pagination, sort dropdown, and a live result count."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Full search scene" },
        ]}
      />
      <section className={styles.canvas} aria-label="Full search scene composition">
        <div className={styles.note}>
          <span>End-to-end search</span>
          <p>
            This scene composes everything in the section. State for filters, query, sort, and
            page index lives at the scene root and flows down to each child primitive.
          </p>
        </div>
        <FullSceneDemo />
      </section>
    </main>
  )
}
