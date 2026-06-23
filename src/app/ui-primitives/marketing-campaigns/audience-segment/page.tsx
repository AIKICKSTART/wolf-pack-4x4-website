import type { Metadata } from "next"

import { AudienceSegmentBuilder } from "../../components/marketing-campaigns"
import { PageHeader } from "../../components/page-header"

import { DEMO_SEGMENT_GROUPS } from "../demo-data"
import styles from "../marketing-campaigns.module.css"

export const metadata: Metadata = {
  title: "Audience segment builder | Marketing campaigns",
  description:
    "Primitive 02 — compose AND/OR rule groups with attribute, behavior, event and negation chips.",
}

export default function AudienceSegmentScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Audience segment builder"
        title="Audience segment builder"
        description="Compose rule groups with attribute, behavior, event and negation chip kinds. Inline TagInput accepts ad-hoc tag-based rules. The estimated reach updates as you change the operator and rules."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing campaigns", href: "/ui-primitives/marketing-campaigns" },
          { label: "Audience segment" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive</span>
        <AudienceSegmentBuilder
          groups={DEMO_SEGMENT_GROUPS}
          estimate={3284}
          estimateDelta="+184 vs last preview"
        />
      </section>
    </main>
  )
}
