import type { Metadata } from "next"

import { PageCanvas } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_CANVAS_BLOCKS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Page canvas | CMS",
  description:
    "Primitive 02 — drag-and-drop canvas with rulers, grid overlay, zoom controls and three render states.",
}

export default function PageCanvasScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Canvas"
        title="Page canvas"
        description="Drag-and-drop building surface for the editor. Includes top and side rulers, an editor-only grid overlay and a zoom control with reset. Each composed block exposes inline settings, duplicate and delete affordances."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Page canvas" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · empty canvas
          </span>
          <PageCanvas
            pageTitle="New suburb landing"
            pageSlug="suburbs/draft"
            blocks={[]}
            showDropZone
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · 5 composed blocks
          </span>
          <PageCanvas
            pageTitle="Wollongong workshop landing"
            pageSlug="suburbs/wollongong"
            blocks={CMS_CANVAS_BLOCKS}
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · render failed
          </span>
          <PageCanvas
            pageTitle="Shellharbour suburb"
            pageSlug="suburbs/shellharbour"
            blocks={CMS_CANVAS_BLOCKS}
            error="Render worker returned 500 — schema validation failed on block canvas-prose."
          />
        </div>
      </section>
    </main>
  )
}
