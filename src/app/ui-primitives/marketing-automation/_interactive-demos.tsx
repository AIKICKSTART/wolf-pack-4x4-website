"use client"

import { JourneyNodeCard } from "../components/marketing-automation"

import styles from "./marketing-automation.module.css"

export function ConfigurableJourneyNodeDemos() {
  return (
    <div className={styles.variantGrid}>
      <JourneyNodeCard
        kind="action"
        title="Send SMS - Bay 2 slot"
        subtitle="Personalised slot offer"
        onConfigure={() => undefined}
      />
      <JourneyNodeCard
        kind="goal"
        title="Service booked"
        subtitle="Conversion target"
        onConfigure={() => undefined}
      />
      <JourneyNodeCard
        kind="exit"
        title="Exit journey"
        subtitle="After 7 days - no action"
        onConfigure={() => undefined}
      />
    </div>
  )
}
