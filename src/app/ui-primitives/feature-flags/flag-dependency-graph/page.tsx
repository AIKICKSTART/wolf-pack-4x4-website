import type { Metadata } from "next"

import { FlagDependencyGraph } from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"

export const metadata: Metadata = {
  title: "Flag dependency graph | Feature flags",
  description:
    "Primitive 11 — SVG dependency graph between feature flags with cycle warning.",
}

export default function FlagDependencyGraphScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Graph"
        title="Flag dependency graph"
        description="Compact SVG visualisation of which flags depend on which. Nodes are laid out per layer (column) and edges use bezier curves with arrow-marker ends. A cycle-detection pass tags self-recursive dependency chains and surfaces a red 'Cycle detected' warning chip when found. Killed flags render with a dashed stroke + strike-through label."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Dependency graph" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · healthy graph (no cycle)</span>
        <FlagDependencyGraph
          height={260}
          nodes={[
            { id: "auth-v2", label: "auth-v2", layer: 0, tone: "teal" },
            { id: "quote-instant-pricing", label: "quote-instant-pricing", layer: 1, tone: "amber" },
            { id: "parts-3d-viewer", label: "parts-3d-viewer", layer: 1, tone: "amber" },
            { id: "workshop-bay-availability-realtime", label: "workshop-bay-availability-realtime", layer: 2, tone: "green" },
            { id: "compliance-receipt-qr", label: "compliance-receipt-qr", layer: 2, tone: "red" },
          ]}
          edges={[
            { from: "auth-v2", to: "quote-instant-pricing" },
            { from: "auth-v2", to: "parts-3d-viewer" },
            { from: "quote-instant-pricing", to: "workshop-bay-availability-realtime" },
            { from: "quote-instant-pricing", to: "compliance-receipt-qr" },
          ]}
        />
        <span className={styles.demoLabel}>Live primitive · with a deliberate cycle</span>
        <FlagDependencyGraph
          height={220}
          nodes={[
            { id: "a", label: "feature-a", layer: 0, tone: "amber" },
            { id: "b", label: "feature-b", layer: 1, tone: "red", killed: true },
            { id: "c", label: "feature-c", layer: 2, tone: "neutral" },
          ]}
          edges={[
            { from: "a", to: "b" },
            { from: "b", to: "c" },
            { from: "c", to: "a" },
          ]}
        />
      </section>
    </main>
  )
}
