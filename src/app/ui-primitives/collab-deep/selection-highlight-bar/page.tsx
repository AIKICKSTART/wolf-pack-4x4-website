import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SelectionHighlightBar } from "../../components/collab-deep"

import {
  SELECTION_BULLET,
  SELECTION_PARA,
  SELECTION_TITLE,
} from "../_mock-data"
import styles from "../collab-deep.module.css"

export const metadata: Metadata = {
  title: "Selection highlight bar | Collab deep",
  description:
    "Primitive 10 — coloured selection bar that mirrors a remote collaborator's current text selection.",
}

export default function SelectionHighlightBarPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Selection"
        title="Selection highlight bar"
        description="Tinted selection bar that flags what a remote collaborator has selected. Flag chip carries their name; selection block shows the selected copy + character count."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Collab deep", href: "/ui-primitives/collab-deep" },
          { label: "Selection highlight bar" },
        ]}
      />

      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>Mia on title block</span>
        <SelectionHighlightBar
          selection={SELECTION_TITLE}
          contextLabel="Title"
        />

        <span className={styles.stageCaption}>Tim on description paragraph</span>
        <SelectionHighlightBar
          selection={SELECTION_PARA}
          contextLabel="Description · paragraph 1"
        />

        <span className={styles.stageCaption}>Daniel on bullet</span>
        <SelectionHighlightBar
          selection={SELECTION_BULLET}
          contextLabel="Description · bullet 3"
        />
      </section>
    </main>
  )
}
