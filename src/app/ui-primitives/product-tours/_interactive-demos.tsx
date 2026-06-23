"use client"

import { AnnouncementCard, FeatureHintSpotlight, SurveyPromptCard } from "../components/product-tours"
import { SAMPLE_ANNOUNCEMENT, SAMPLE_SURVEY_CHOICES } from "./fixtures"

import styles from "./product-tours.module.css"

export function DismissableAnnouncementDemos() {
  return (
    <>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Full card - fleet bulk pricing</span>
        <AnnouncementCard
          kicker={SAMPLE_ANNOUNCEMENT.kicker}
          title={SAMPLE_ANNOUNCEMENT.title}
          body={SAMPLE_ANNOUNCEMENT.body}
          imageSrc="/media/oak-flats-muffler-men-team.webp"
          imageAlt="Oak Flats Mufflermen team posed in Bay 2"
          ctaLabel={SAMPLE_ANNOUNCEMENT.ctaLabel}
          tone="amber"
          onDismiss={() => undefined}
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Compact bar - status mode</span>
        <AnnouncementCard
          compact
          kicker="Bay rollover"
          title="Bay 2 closed Mon 1 Jun - 8am-12pm for hoist cert"
          body="Bookings auto-rolled to Bay 3 or Sat morning. We'll text affected customers."
          ctaLabel="See booking changes"
          tone="amber"
          onDismiss={() => undefined}
        />
      </section>
    </>
  )
}

export function DismissableFeatureHintDemos() {
  return (
    <>
      <FeatureHintSpotlight
        badge="What's new - 28 May"
        title="Fleet bulk pricing is live"
        body="Add 3+ vehicles to unlock the tiered fleet pricing card right in the quote screen. No more email back-and-forth - Stuart's team confirms within the hour."
        ctaLabel="See the new pricing card"
        tone="violet"
        glyph="*"
        onDismiss={() => undefined}
      />

      <FeatureHintSpotlight
        badge="Beta"
        title="Bay availability widget"
        body="Live-updating bay heatmap on the workshop dashboard - see which bay is free in 30-minute blocks across the week. Shipped to fleet operators only for now."
        ctaLabel="Open the widget"
        tone="teal"
        glyph="<>"
        onDismiss={() => undefined}
      />
    </>
  )
}

export function SurveyPromptDemos() {
  return (
    <div className={styles.demoTwo}>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Single-select - after quote</span>
        <SurveyPromptCard
          kicker="Quick survey - 30s"
          question="Did this quote help you book a service?"
          helper="Your answer goes straight to Stuart - no spam, no follow-up emails."
          choices={SAMPLE_SURVEY_CHOICES}
          onSend={() => undefined}
          onDismiss={() => undefined}
        />
      </section>
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Multi-select - feature feedback</span>
        <SurveyPromptCard
          kicker="Feature feedback"
          question="Which new feature should we ship next quarter?"
          helper="Pick up to three. Results decide which two we build."
          multi
          tone="violet"
          choices={[
            { id: "f1", label: "SMS reminders for service due" },
            { id: "f2", label: "Loyalty unlocks visible everywhere" },
            { id: "f3", label: "Photos in service history" },
            { id: "f4", label: "Tap-to-pay deposits in the quote" },
            { id: "f5", label: "Pickup + delivery for fleet" },
          ]}
          onSend={() => undefined}
          onDismiss={() => undefined}
        />
      </section>
    </div>
  )
}
