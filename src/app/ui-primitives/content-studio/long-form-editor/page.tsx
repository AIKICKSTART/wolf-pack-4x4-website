import type { Metadata } from "next"

import { LongFormEditor } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { FOCUSED_BLOCK_ID, HERO_BLOCKS } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Long-form editor | Content studio",
  description:
    "Primitive 01 — block-based rich-text editor with floating toolbar — focused, unfocused, and toolbar-hidden states.",
}

const FIRST_FIVE = HERO_BLOCKS.slice(0, 5)
const FIRST_SIX = HERO_BLOCKS.slice(0, 6)

export default function LongFormEditorScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 01 / Long-form editor"
        title="Block-based long-form editor"
        description="Each block carries a paragraph, heading, list, quote, embed, code, or media. The focused block lifts and shows a floating formatting toolbar. Three states — focused on H2, focused on the lead paragraph, and toolbar-hidden review mode."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Long-form editor" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <LongFormEditor
            blocks={HERO_BLOCKS}
            focusedBlockId={FOCUSED_BLOCK_ID}
            title="Why your Falcon's twin pipes are growling"
            byline="Daniel Fleuren · Mia Pellegrino · Ben Sokolic"
          />
          <LongFormEditor
            blocks={FIRST_SIX}
            focusedBlockId="b-paragraph-1"
            title="Falcon twin pipes — lead paragraph focused"
            byline="Daniel Fleuren"
          />
          <LongFormEditor
            blocks={FIRST_FIVE}
            focusedBlockId={undefined}
            showToolbar={false}
            title="Read-only review mode"
            byline="No active selection"
          />
        </div>
      </section>
    </main>
  )
}
