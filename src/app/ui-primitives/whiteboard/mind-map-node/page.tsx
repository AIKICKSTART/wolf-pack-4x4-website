"use client"

import { useState } from "react"

import { MindMapNode } from "../../components/whiteboard"
import { PageHeader } from "../../components/page-header"
import styles from "../whiteboard.module.css"

export default function MindMapNodePage() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Whiteboard · 14"
        title="Mind map node"
        description="Mind-map node with depth-driven tone, child-count chip and a collapse toggle."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Whiteboard", href: "/ui-primitives/whiteboard" },
          { label: "Mind map node" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>
            Collapse state: {collapsed ? "collapsed" : "expanded"}
          </span>
          <div className={styles.demoStack} role="tree" aria-label="Customer pain points map">
            <MindMapNode
              label="Customer pain points"
              childCount={3}
              width={320}
              onToggleCollapsed={setCollapsed}
            />
            {!collapsed ? (
              <>
                <MindMapNode label="Unsure which exhaust fits" depth={1} width={280} />
                <MindMapNode label="Quote approval friction" depth={2} width={260} />
                <MindMapNode label="No photo evidence after pickup" depth={3} width={300} />
              </>
            ) : null}
          </div>
        </div>
      </section>
    </main>
  )
}
