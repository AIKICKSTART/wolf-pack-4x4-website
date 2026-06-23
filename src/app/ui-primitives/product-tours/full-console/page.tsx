"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  AnnouncementCard,
  AudienceTargetingRules,
  FeatureHintSpotlight,
  InlineTooltipBuilder,
  NpsPromptTrigger,
  StepConfigPane,
  StepProgressDots,
  SurveyPromptCard,
  TooltipPreviewOverlay,
  TourAnalyticsCard,
  TourBuilderCanvas,
  TourLibraryGrid,
  TourStepThumbnail,
  TourTriggerCondition,
  type AudienceRule,
  type AudienceRuleKind,
  type NpsPromptConfig,
  type StepConfig,
  type TooltipBuildState,
  type TriggerCondition,
} from "../../components/product-tours"
import {
  SAMPLE_ANNOUNCEMENT,
  SAMPLE_AUDIENCE_RULES,
  SAMPLE_FUNNEL,
  SAMPLE_NPS_CONFIG,
  SAMPLE_QUOTE_TOUR_STEPS,
  SAMPLE_STEP_CONFIG,
  SAMPLE_SURVEY_CHOICES,
  SAMPLE_THUMB_STEPS,
  SAMPLE_TOOLTIP_STATE,
  SAMPLE_TOUR_LIBRARY,
  SAMPLE_TRIGGER_CONDITION,
} from "../fixtures"

import styles from "../product-tours.module.css"

const SUGGESTED_VALUE: Record<AudienceRuleKind, string> = {
  url: "/dashboard/*",
  segment: "fleet · retail",
  role: "owner · service-advisor",
  "first-time": "true",
  returning: "true",
  device: "desktop · tablet",
  locale: "en-AU",
  plan: "monthly · annual",
}

export default function FullProductToursConsolePage() {
  const [selectedThumb, setSelectedThumb] = useState<string>("thumb3")
  const [step, setStep] = useState<StepConfig>(SAMPLE_STEP_CONFIG)
  const [audienceRules, setAudienceRules] = useState<ReadonlyArray<AudienceRule>>(SAMPLE_AUDIENCE_RULES)
  const [match, setMatch] = useState<"all" | "any">("all")
  const [condition, setCondition] = useState<TriggerCondition>(SAMPLE_TRIGGER_CONDITION)
  const [tooltipState, setTooltipState] = useState<TooltipBuildState>(SAMPLE_TOOLTIP_STATE)
  const [nps, setNps] = useState<NpsPromptConfig>(SAMPLE_NPS_CONFIG)

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full product-tours console"
        title="Full product-tours console"
        description="Composes every primitive into a working in-app messaging surface for the Mufflermen instant-quote tour. Builder canvas headers the page; step inspector + audience + trigger sit aside; library, analytics, and message primitives anchor the lower stack."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Product tours", href: "/ui-primitives/product-tours" },
          { label: "Full console" },
        ]}
      />

      <FeatureHintSpotlight
        badge="What's new · 28 May"
        title="Fleet bulk pricing is live"
        body="Add 3+ vehicles on file to unlock fleet pricing right in the quote screen. The new tiered card pre-fills volume discounts and pickup-delivery options."
        ctaLabel="See the pricing card"
        tone="violet"
      />

      <AnnouncementCard
        compact
        kicker="Bay rollover"
        title="Bay 2 closed Mon 1 Jun · 8am-12pm for hoist cert"
        body="Bookings auto-rolled to Bay 3 or Sat morning."
        ctaLabel="See booking changes"
        tone="amber"
        onDismiss={() => undefined}
      />

      <div className={styles.console}>
        <div className={styles.consoleMain}>
          <TourBuilderCanvas
            tourName="Instant quote walk-through"
            steps={SAMPLE_QUOTE_TOUR_STEPS}
          />

          <TourAnalyticsCard
            tourName="Instant quote walk-through"
            starts={2_184}
            completions={996}
            dropOffStep={3}
            totalSteps={6}
            window="Last 30 days"
            funnel={SAMPLE_FUNNEL}
          />

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Tour library · workspace</span>
            <TourLibraryGrid
              tours={SAMPLE_TOUR_LIBRARY}
              nowIso="2026-05-29T09:00:00+10:00"
            />
          </section>

          <div className={styles.demoTwo}>
            <section className={styles.demoSurface}>
              <span className={styles.demoLabel}>Tooltip composer · live</span>
              <InlineTooltipBuilder
                state={tooltipState}
                onChange={(patch) =>
                  setTooltipState((prev) => ({ ...prev, ...patch }))
                }
              />
            </section>
            <section className={styles.demoSurface}>
              <span className={styles.demoLabel}>Tooltip preview · live</span>
              <TooltipPreviewOverlay
                title={tooltipState.title}
                body={tooltipState.body}
                direction={tooltipState.direction}
                align={tooltipState.align}
                showCloseCta={tooltipState.closeCta}
                ctaLabel={tooltipState.ctaLabel}
                caption={`Anchored ${tooltipState.direction} · align ${tooltipState.align}`}
              />
            </section>
          </div>

          <div className={styles.demoTwo}>
            <section className={styles.demoSurface}>
              <span className={styles.demoLabel}>Announcement · what&apos;s new</span>
              <AnnouncementCard
                kicker={SAMPLE_ANNOUNCEMENT.kicker}
                title={SAMPLE_ANNOUNCEMENT.title}
                body={SAMPLE_ANNOUNCEMENT.body}
                ctaLabel={SAMPLE_ANNOUNCEMENT.ctaLabel}
                tone="amber"
                onDismiss={() => undefined}
              />
            </section>
            <section className={styles.demoSurface}>
              <span className={styles.demoLabel}>Survey prompt · after quote</span>
              <SurveyPromptCard
                kicker="Quick survey · 30s"
                question="Did this quote help you book a service?"
                helper="Your answer goes straight to Stuart."
                choices={SAMPLE_SURVEY_CHOICES}
                onSend={() => undefined}
                onDismiss={() => undefined}
              />
            </section>
          </div>

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>End-user progress · variants</span>
            <div className={styles.demoInline}>
              <StepProgressDots currentStep={3} totalSteps={6} variant="dots" tone="teal" />
              <StepProgressDots currentStep={3} totalSteps={6} variant="bars" tone="amber" />
              <StepProgressDots currentStep={3} totalSteps={6} variant="counter" tone="violet" />
            </div>
          </section>
        </div>

        <aside className={styles.consoleSide}>
          <StepConfigPane
            step={step}
            onChange={(patch) => setStep((prev) => ({ ...prev, ...patch }))}
          />

          <section className={styles.demoSurface}>
            <span className={styles.demoLabel}>Step list · select to inspect</span>
            <div className={styles.demoStack}>
              {SAMPLE_THUMB_STEPS.map((thumb) => (
                <TourStepThumbnail
                  key={thumb.id}
                  index={thumb.index}
                  title={thumb.title}
                  excerpt={thumb.excerpt}
                  shape={thumb.shape}
                  targetSelector={thumb.targetSelector}
                  delayLabel={thumb.delayLabel}
                  tone={thumb.tone}
                  selected={selectedThumb === thumb.id}
                  onClick={() => setSelectedThumb(thumb.id)}
                />
              ))}
            </div>
          </section>

          <AudienceTargetingRules
            tourName="Instant quote walk-through"
            rules={audienceRules}
            match={match}
            estimatedReach={12_840}
            onAddRule={(kind) =>
              setAudienceRules((prev) => [
                ...prev,
                {
                  id: `ar-${Date.now()}-${kind}`,
                  kind,
                  comparator: kind === "first-time" || kind === "returning" ? "is" : "matches",
                  value: SUGGESTED_VALUE[kind],
                },
              ])
            }
            onRemoveRule={(id) =>
              setAudienceRules((prev) => prev.filter((rule) => rule.id !== id))
            }
            onToggleMatch={() => setMatch((prev) => (prev === "all" ? "any" : "all"))}
          />

          <TourTriggerCondition
            tourName="Instant quote walk-through"
            condition={condition}
            onKindChange={(kind) => {
              const defaults: Record<typeof kind, TriggerCondition> = {
                "page-visit": { kind: "page-visit", urlPattern: "/quote/instant" },
                "time-delay": { kind: "time-delay", delaySeconds: 6 },
                "scroll-depth": { kind: "scroll-depth", scrollPercent: 65 },
                "element-seen": {
                  kind: "element-seen",
                  selector: "[data-tour='bay-availability']",
                },
                "custom-event": { kind: "custom-event", eventName: "quote.accepted" },
                "exit-intent": { kind: "exit-intent" },
              }
              setCondition(defaults[kind])
            }}
            lastFired="22 May · 08:14 AEST"
          />

          <NpsPromptTrigger
            config={nps}
            onChange={(patch) => setNps((prev) => ({ ...prev, ...patch }))}
          />
        </aside>
      </div>
    </main>
  )
}
