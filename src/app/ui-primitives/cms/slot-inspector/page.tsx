import type { Metadata } from "next"

import { SlotInspector } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_SLOT_GROUPS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Slot inspector | CMS",
  description:
    "Primitive 04 — right-rail props editor with text, textarea, number, colour, image, select and toggle fields.",
}

export default function SlotInspectorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Inspector"
        title="Slot inspector"
        description="Right-rail props editor for the currently selected canvas block. Renders text, textarea, number, colour, image, select and toggle slots, grouped under labelled sections. Every field carries a required marker, hint copy and aria-required where applicable."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Slot inspector" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · loading block schema
          </span>
          <SlotInspector
            blockName="Service feature grid"
            blockCategory="Feature"
            blockSummary="Editing the trust strip — six-up service grid."
            groups={CMS_SLOT_GROUPS}
            loading
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · editable props
          </span>
          <SlotInspector
            blockName="Service feature grid"
            blockCategory="Feature"
            blockSummary="Editing the trust strip — six-up service grid."
            groups={CMS_SLOT_GROUPS}
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · schema rejection
          </span>
          <SlotInspector
            blockName="Service feature grid"
            blockCategory="Feature"
            blockSummary="Editing the trust strip — six-up service grid."
            groups={CMS_SLOT_GROUPS}
            error="Slot schema rejected — column count must be between 1 and 6."
          />
        </div>
      </section>
    </main>
  )
}
