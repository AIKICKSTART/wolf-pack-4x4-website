import type { Metadata } from "next"

import { BlockLibraryPanel } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_BLOCKS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Block library panel | CMS",
  description:
    "Primitive 01 — categorised block palette with search, idle / loaded / error states.",
}

export default function BlockLibraryPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Palette"
        title="Block library panel"
        description="Categorised palette of every block the editor can drag onto the page — hero, feature, text, media, CTA, form and embed. Includes a search filter, category chip strip, brand-locked indicators and idle / loaded / error states."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Block library panel" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · empty filter
          </span>
          <BlockLibraryPanel
            blocks={CMS_BLOCKS.filter((block) => block.category === "embed")}
            defaultCategory="embed"
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · all blocks
          </span>
          <BlockLibraryPanel blocks={CMS_BLOCKS} />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · supplier feed
          </span>
          <BlockLibraryPanel
            blocks={CMS_BLOCKS}
            error="Block catalogue feed timed out — retrying every 30s."
          />
        </div>
      </section>
    </main>
  )
}
