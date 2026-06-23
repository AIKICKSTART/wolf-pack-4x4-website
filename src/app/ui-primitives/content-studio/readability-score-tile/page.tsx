import type { Metadata } from "next"

import { ReadabilityScoreTile } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { READABILITY_VARIANTS } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Readability score tile | Content studio",
  description:
    "Primitive 13 — Flesch reading-ease dial with grade level, sentence length, and long-word ratio. Three states — plain English, tech explainer, customer story.",
}

export default function ReadabilityScoreTileScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 13 / Readability"
        title="Readability score tile"
        description="A Flesch reading-ease radial dial backed by grade level, average sentence length, and long-word ratio. Three states — plain English (default), tech explainer draft (denser), customer story polish (lighter)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Readability score tile" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoTriple}>
          {READABILITY_VARIANTS.map((variant) => (
            <ReadabilityScoreTile
              key={variant.label}
              score={variant.score}
              label={variant.label}
            />
          ))}
        </div>
      </section>
    </main>
  )
}
