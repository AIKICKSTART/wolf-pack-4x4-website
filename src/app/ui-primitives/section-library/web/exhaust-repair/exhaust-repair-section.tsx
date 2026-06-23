"use client"

import {
  FeatureSpotlight,
  ProcessSteps,
  type ProcessStep,
} from "../../../components/marketing"
import {
  ClipboardCheckIcon,
  HoistArmIcon,
  MufflerIcon,
  ShieldTickIcon,
  WeldBeadIcon,
} from "../../../components/icons"

import styles from "./exhaust-repair-section.module.css"

export interface ExhaustRepairSectionProps {
  kicker?: string
  heading?: string
  body?: string
  primaryLabel?: string
  primaryHref?: string
  /** Process steps for the repair workflow. Defaults to the 4-step flow. */
  steps?: ReadonlyArray<ProcessStep>
  className?: string
}

const DEFAULT_STEPS: ReadonlyArray<ProcessStep> = [
  {
    id: "inspect",
    icon: <ClipboardCheckIcon size={24} tone="teal" title="Inspect" />,
    title: "Up on the hoist",
    body: "We put the car up, find the real fault, and show you exactly what's blown, cracked or rusted.",
  },
  {
    id: "quote",
    icon: <HoistArmIcon size={24} tone="amber" title="Quote" />,
    title: "Honest quote",
    body: "A clear, written price — patch where it's smart, replace where it matters. No surprise add-ons.",
  },
  {
    id: "weld",
    icon: <WeldBeadIcon size={24} tone="red" title="Weld" />,
    title: "Fabricate & weld",
    body: "Mig and tig welds, mandrel bends, and quality clamps and hangers — done on-site, same day.",
  },
  {
    id: "warranty",
    icon: <ShieldTickIcon size={24} tone="green" title="Warranty" />,
    title: "Backed for life",
    body: "Every repair leaves quiet, sealed and road-legal — and our workmanship is warrantied for life.",
  },
]

const SPOTLIGHT_BULLETS = [
  { label: "Blowing or droning exhaust diagnosed in minutes" },
  { label: "Rusted mufflers and resonators replaced same day" },
  { label: "Cracked flanges, flex pipes and gaskets re-welded" },
  { label: "Noise-tested so you pass your next pink slip" },
] as const

/**
 * Exhaust repair — a storytelling spotlight paired with a numbered repair
 * workflow. Composes `FeatureSpotlight` + `ProcessSteps`. Token-driven,
 * light/dark, responsive, reduced-motion safe (both primitives handle motion).
 */
export function ExhaustRepairSection({
  kicker = "Exhaust repair",
  heading = "Blowing, droning, or hanging low?",
  body = "If your exhaust has gone loud, rattly, or scrapes the driveway, bring it in. We diagnose the real cause, give you a straight price, and fix it properly — most repairs are in and out the same day.",
  primaryLabel = "Book a repair",
  primaryHref = "/book/repair",
  steps = DEFAULT_STEPS,
  className,
}: ExhaustRepairSectionProps) {
  const classes = [styles.host, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <span className={styles.weave} aria-hidden="true" />
      <FeatureSpotlight
        className={styles.spotlight}
        kicker={kicker}
        heading={heading}
        body={body}
        bullets={[...SPOTLIGHT_BULLETS]}
        action={{ label: primaryLabel, href: primaryHref }}
        visual={
          <div className={styles.visual} aria-hidden="true">
            <span className={styles.visualSheen} />
            <MufflerIcon size={120} tone="red" motion="none" title="Muffler repair" />
            <span className={styles.visualCaption}>Mandrel-bent · mig &amp; tig · same-day</span>
          </div>
        }
      />

      <ProcessSteps
        className={styles.steps}
        kicker="How a repair runs"
        heading="Four steps, one visit"
        steps={steps}
      />
    </div>
  )
}

export default ExhaustRepairSection
