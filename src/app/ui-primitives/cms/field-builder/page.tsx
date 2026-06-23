import type { Metadata } from "next"

import { FieldBuilder } from "../../components/cms"
import { PageHeader } from "../../components/page-header"

import { CMS_PARTS_FIELDS } from "../_mock-data"
import styles from "../cms.module.css"

export const metadata: Metadata = {
  title: "Field builder | CMS",
  description:
    "Primitive 12 — schema field builder with text, rich-text, number, boolean, date, image, reference, JSON, geo and money kinds.",
}

export default function FieldBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 12 / Schema"
        title="Field builder"
        description="Schema field builder for any CMS collection. Editors add fields from a typed palette — text, rich-text, number, boolean, date, image, reference, JSON, geo or money — and reorder them with arrow controls. Required + localized chips communicate validation intent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "CMS", href: "/ui-primitives/cms" },
          { label: "Field builder" },
        ]}
      />
      <section className={styles.demoStates}>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateIdle}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Idle · syncing schema
          </span>
          <FieldBuilder
            collectionName="Parts catalogue"
            initialFields={CMS_PARTS_FIELDS}
            loading
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateLoaded}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Loaded · editable
          </span>
          <FieldBuilder
            collectionName="Parts catalogue"
            initialFields={CMS_PARTS_FIELDS}
          />
        </div>
        <div className={styles.demoSurface}>
          <span className={`${styles.stateLabel} ${styles.stateError}`}>
            <span className={styles.stateDot} aria-hidden="true" />
            Error · schema lock
          </span>
          <FieldBuilder
            collectionName="Parts catalogue"
            initialFields={CMS_PARTS_FIELDS}
            error="Schema is locked — another editor (Ben S.) is editing it right now."
          />
        </div>
      </section>
    </main>
  )
}
