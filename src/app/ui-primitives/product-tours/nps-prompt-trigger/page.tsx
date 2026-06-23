"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  NpsPromptTrigger,
  type NpsPromptConfig,
} from "../../components/product-tours"
import { SAMPLE_NPS_CONFIG } from "../fixtures"

import styles from "../product-tours.module.css"

export default function NpsPromptTriggerScenePage() {
  const [config, setConfig] = useState<NpsPromptConfig>(SAMPLE_NPS_CONFIG)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / NPS prompt"
        title="NPS prompt trigger"
        description="Configure the in-app Net Promoter Score prompt — timing rule, segment, question, sampling rate slider, and a cool-down preset so customers aren't pestered."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "NPS prompt trigger" },
        ]}
      />

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Editable · after service</span>
          <NpsPromptTrigger
            config={config}
            onChange={(patch) => setConfig((prev) => ({ ...prev, ...patch }))}
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Reference · monthly active fleet</span>
          <NpsPromptTrigger
            config={{
              timing: "monthly-active",
              segment: "Fleet operators on monthly plan",
              question:
                "How are we doing? On a scale of 0-10, would you recommend us to another fleet manager?",
              samplingRate: 40,
              cooldownDays: 90,
            }}
            onChange={() => undefined}
            tone="teal"
          />
        </section>
      </div>
    </main>
  )
}
