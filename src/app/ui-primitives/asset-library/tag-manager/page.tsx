import type { Metadata } from "next"

import { TagManager } from "../../components/asset-library"
import { PageHeader } from "../../components/page-header"

import {
  DEMO_DUPLICATE_SUGGESTIONS,
  DEMO_TAGS,
} from "../asset-library-fixtures"
import styles from "../asset-library.module.css"

export const metadata: Metadata = {
  title: "Tag manager | Asset Library",
  description:
    "Primitive 03 — existing tag list, add input with colour picker, and merge-duplicate suggestions.",
}

export default function TagManagerScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Tags"
        title="Tag manager"
        description="A focused surface for managing media tags — existing tags appear with counts, the composer lets you add a tag with a colour, and likely duplicates surface as merge suggestions."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Asset library", href: "/ui-primitives/asset-library" },
          { label: "Tag manager" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <div style={{ maxWidth: 520 }}>
          <TagManager
            tags={DEMO_TAGS}
            duplicateSuggestions={DEMO_DUPLICATE_SUGGESTIONS}
          />
        </div>
      </section>
    </main>
  )
}
