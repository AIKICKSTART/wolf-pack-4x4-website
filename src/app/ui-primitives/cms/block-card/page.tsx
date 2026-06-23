import type { Metadata } from "next"

import { BlockCard } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_BLOCKS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Block card | CMS",
  description:
    "Primitive 03 — single block preview tile used in the palette and inserter.",
}

export default function BlockCardScenePage() {
  const idleSample = CMS_BLOCKS.slice(0, 4)
  const loadedSample = CMS_BLOCKS.slice(0, 6)
  const errorSample = CMS_BLOCKS.slice(0, 4)
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Tile"
        title="Block card"
        description="Single block preview tile reused by the block library palette and the canvas inserter. Carries the block name, category kicker, optional summary, brand-locked indicator and a drag handle hint. Supports selected, grabbed and loading states via aria-pressed, aria-grabbed and data-loading."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Block card" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · resting
          </span>
          <div className={styles.demoSplit}>
            {idleSample.map((block) => (
              <BlockCard
                key={block.id}
                name={block.name}
                category={block.category}
                tone={block.tone}
                summary={block.description}
                glyph={block.glyph}
                branded={block.branded}
              />
            ))}
          </div>
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · second tile selected, fourth grabbed
          </span>
          <div className={styles.demoTriple}>
            {loadedSample.map((block, index) => (
              <BlockCard
                key={block.id}
                name={block.name}
                category={block.category}
                tone={block.tone}
                summary={block.description}
                glyph={block.glyph}
                branded={block.branded}
                selected={index === 1}
                grabbed={index === 3}
              />
            ))}
          </div>
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · supplier blocks stuck loading
          </span>
          <div className={styles.demoSplit}>
            {errorSample.map((block) => (
              <BlockCard
                key={block.id}
                name={block.name}
                category={block.category}
                tone={block.tone}
                summary={block.description}
                glyph={block.glyph}
                loading
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
