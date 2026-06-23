import type { Metadata } from "next"

import {
  FileContextMenu,
  FileTypeIcon,
} from "../../components/file-browser"
import { PageHeader } from "../../components/page-header"

import styles from "../file-browser.module.css"

export const metadata: Metadata = {
  title: "File context menu | File Browser",
  description:
    "Primitive 09 — right-click context menu with keyboard hints and destructive variant.",
}

export default function FileContextMenuScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Menu"
        title="File context menu"
        description="Open with right-click. Renders an Open / Rename / Move / Copy / Share / Download / Delete menu with kbd hint chips alongside each item. The destructive item gets the red treatment."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "File browser", href: "/ui-primitives/file-browser" },
          { label: "Context menu" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Right-click anywhere inside the canvas below
        </span>
        <FileContextMenu>
          <div
            style={{
              display: "grid",
              placeItems: "center",
              gap: 12,
              height: 280,
              border: "1.4px dashed var(--primitive-line-strong)",
              borderRadius: 14,
              background: "color-mix(in oklab, var(--primitive-text-strong) 2%, transparent)",
              padding: 20,
              textAlign: "center",
            }}
          >
            <FileTypeIcon kind="image" extension="raw" size="lg" />
            <strong style={{ color: "var(--primitive-text-strong)" }}>ute-engine-side.raw</strong>
            <span
              style={{
                fontFamily: "var(--primitive-font-mono)",
                fontSize: 11,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--primitive-muted)",
              }}
            >
              Right-click to open the action menu
            </span>
          </div>
        </FileContextMenu>
      </section>
    </main>
  )
}
