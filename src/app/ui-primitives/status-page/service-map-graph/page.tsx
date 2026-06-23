import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServiceMapGraph } from "../../components/status-page"

import { SERVICE_MAP_EDGES, SERVICE_MAP_NODES } from "../_mock-data"
import styles from "../status-page.module.css"

export const metadata: Metadata = {
  title: "Service map graph | Status page",
  description:
    "Primitive 06 — visual SVG dependency graph with tone-coded edges and zoom controls.",
}

export default function ServiceMapGraphScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Graph"
        title="Service map graph"
        description="A small, opinionated dependency view — Edge → Quote engine → Parts catalogue and Workshop scheduler → Customer SMS / Payment gateway → Warehouse. Edges adopt the worst status between endpoints. Zoom in/out/reset is visual-only and stays on the compositor."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Status page", href: "/ui-primitives/status-page" },
          { label: "Service map graph" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 7 nodes · SMS edge degraded</span>
        <ServiceMapGraph
          caption="Mufflermen production dependency map"
          nodes={SERVICE_MAP_NODES}
          edges={SERVICE_MAP_EDGES}
        />
      </section>
    </main>
  )
}
