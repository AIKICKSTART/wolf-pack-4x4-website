import type { Metadata } from "next"

import {
  FlagDetailPane,
  KillSwitchButton,
  RolloutSlider,
  VariantPicker,
  type FlagDetailChange,
  type FlagDetailEnvBadge,
  type FlagDetailLinkedExperiment,
} from "../../components/feature-flags"
import { PageHeader } from "../../components/page-header"

import styles from "../feature-flags.module.css"
import { DetailRulesList } from "./detail-rules-client"

export const metadata: Metadata = {
  title: "Flag detail pane | Feature flags",
  description:
    "Primitive 02 — full detail pane composing variants, rollout, targeting, kill-switch, linked experiments, and recent changes.",
}

const ENV_BADGES: ReadonlyArray<FlagDetailEnvBadge> = [
  { env: "dev", status: "on", rolloutPercent: 100 },
  { env: "staging", status: "ramping", rolloutPercent: 50 },
  { env: "prod", status: "ramping", rolloutPercent: 25 },
]

const CHANGES: ReadonlyArray<FlagDetailChange> = [
  {
    id: "ch-1",
    who: "Jess R · Product",
    when: "10 min ago",
    message: "Bumped Production from 5% → 25% after AUSTRAC review cleared.",
  },
  {
    id: "ch-2",
    who: "Marcus P · Engineering",
    when: "2 hr ago",
    message: "Added rule workspace IN (oak-flats, wollongong-east).",
  },
  {
    id: "ch-3",
    who: "Tom V · Compliance",
    when: "Yesterday",
    message: "Linked experiment exp-pricing-uplift-v3.",
  },
]

const EXPERIMENTS: ReadonlyArray<FlagDetailLinkedExperiment> = [
  { id: "exp-1", name: "exp-pricing-uplift-v3", status: "running" },
  { id: "exp-2", name: "exp-bay-availability-pilot", status: "paused" },
  { id: "exp-3", name: "exp-mobile-launch-banner", status: "concluded" },
]

export default function FlagDetailPaneScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Pane"
        title="Flag detail pane"
        description="Composed detail surface for a single flag. role='region' wrapper, header with title + key + description + env status badges, then a responsive auto-fit grid composing variants, rollout, targeting rules, kill switch, linked experiments and a recent-changes timeline. Wraps the smaller primitives directly so the same pieces work standalone or composed."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Feature flags", href: "/ui-primitives/feature-flags" },
          { label: "Flag detail pane" },
        ]}
      />
      <FlagDetailPane
        name="Instant pricing on quotes"
        flagKey="quote-instant-pricing"
        description="Recalculates the quote total on each line edit instead of waiting for save. Reduces booking-funnel drop-off when customers iterate on parts."
        owner="Jess R · Booking"
        envBadges={ENV_BADGES}
        variants={
          <VariantPicker
            label="Variants"
            variants={[
              { id: "control", name: "Control", weight: 50, tone: "teal", description: "Save-then-price." },
              { id: "live", name: "Live preview", weight: 50, tone: "amber", description: "Recalc on edit." },
            ]}
          />
        }
        rollout={<RolloutSlider defaultValue={25} label="Production rollout" snap />}
        rules={<DetailRulesList />}
        killSwitch={
          <KillSwitchButton
            flagName="quote-instant-pricing"
            label="Kill quote-instant-pricing"
          />
        }
        recentChanges={CHANGES}
        linkedExperiments={EXPERIMENTS}
      />
    </main>
  )
}
