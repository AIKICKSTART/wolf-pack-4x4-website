"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  TourTriggerCondition,
  type TriggerCondition,
  type TriggerKind,
} from "../../components/product-tours"
import { SAMPLE_TRIGGER_CONDITION } from "../fixtures"

import styles from "../product-tours.module.css"

const DEFAULTS: Record<TriggerKind, TriggerCondition> = {
  "page-visit": { kind: "page-visit", urlPattern: "/quote/instant" },
  "time-delay": { kind: "time-delay", delaySeconds: 6 },
  "scroll-depth": { kind: "scroll-depth", scrollPercent: 65 },
  "element-seen": { kind: "element-seen", selector: "[data-tour='bay-availability']" },
  "custom-event": { kind: "custom-event", eventName: "quote.accepted" },
  "exit-intent": { kind: "exit-intent" },
}

export default function TourTriggerConditionScenePage() {
  const [condition, setCondition] = useState<TriggerCondition>(SAMPLE_TRIGGER_CONDITION)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Trigger"
        title="Tour trigger condition"
        description="When the tour fires. Page visit, time delay, scroll depth, element seen, custom event, or exit intent. Tap a chip to change the active kind."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Trigger condition" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live editor · pick a trigger kind</span>
        <TourTriggerCondition
          tourName="Instant quote walk-through"
          condition={condition}
          onKindChange={(kind) => setCondition(DEFAULTS[kind])}
          lastFired="22 May 2026 · 08:14 AEST"
        />
      </section>

      <div className={styles.demoTwo}>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Time delay · 6 seconds</span>
          <TourTriggerCondition
            tourName="ADR cheatsheet"
            condition={{ kind: "time-delay", delaySeconds: 6 }}
            lastFired="29 May · 09:32 AEST"
          />
        </section>
        <section className={styles.demoSurface}>
          <span className={styles.demoLabel}>Scroll depth · 65%</span>
          <TourTriggerCondition
            tourName="Bay availability widget tour"
            condition={{ kind: "scroll-depth", scrollPercent: 65 }}
          />
        </section>
      </div>
    </main>
  )
}
