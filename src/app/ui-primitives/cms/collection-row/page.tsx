import type { Metadata } from "next"

import { CollectionRow } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_COLLECTIONS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Collection row | CMS",
  description:
    "Primitive 11 — collection entry with item count, draft count and last edit metadata.",
}

export default function CollectionRowScenePage() {
  const idleSet = CMS_COLLECTIONS.slice(0, 2)
  const loadedSet = CMS_COLLECTIONS
  const errorTarget = CMS_COLLECTIONS[1]

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 11 / Collection"
        title="Collection row"
        description="Single CMS collection entry — collection kind glyph, name, one-line description, item count, optional draft chip and last edit attribution. Reused inside the collections index and the studio sidebar."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Collection row" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · syncing
          </span>
          <div className={styles.demoStack}>
            {idleSet.map((item) => (
              <CollectionRow key={item.id} item={item} loading />
            ))}
          </div>
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · live counts
          </span>
          <div className={styles.demoStack}>
            {loadedSet.map((item, index) => (
              <CollectionRow key={item.id} item={item} selected={index === 0} />
            ))}
          </div>
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · supplier feed broken
          </span>
          <div className={styles.demoStack}>
            <CollectionRow
              item={errorTarget}
              error="Suburb feed returned an empty page — schema validator rejected payload."
            />
          </div>
        </div>
      </section>
    </main>
  )
}
