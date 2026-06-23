import type { Metadata } from "next"

import { PageTree } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_PAGE_TREE } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Page tree | CMS",
  description:
    "Primitive 05 — hierarchical workshop site outline with state chips, owner initials and page-level CRUD.",
}

export default function PageTreeScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Outline"
        title="Page tree"
        description="Hierarchical workshop site outline — every page renders its slug, current publish state chip and owner initials. Editors can filter, expand or collapse branches and trigger the new-page action from the header."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Page tree" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · indexing
          </span>
          <PageTree nodes={CMS_PAGE_TREE} loading />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · live outline
          </span>
          <PageTree
            nodes={CMS_PAGE_TREE}
            selectedId="page-wollongong"
            defaultExpandedIds={["page-home", "page-suburbs", "page-services", "page-parts"]}
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · stale cache
          </span>
          <PageTree
            nodes={CMS_PAGE_TREE}
            error="Tree cache is stale — refresh failed (504 gateway)."
          />
        </div>
      </section>
    </main>
  )
}
