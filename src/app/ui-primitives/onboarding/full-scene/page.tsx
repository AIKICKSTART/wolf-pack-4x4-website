import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"

import { FullSceneStage } from "./full-scene-stage"
import styles from "../onboarding.module.css"

export const metadata: Metadata = {
  title: "Full first-run scene | Onboarding",
  description:
    "Composition — a complete first-run scene combining sample-data banner, welcome modal (open by default), setup checklist, first-action grid, milestone tracker, feature highlight, integration steps and a delayed achievement-unlock toast.",
}

export default function OnboardingFullScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full first-run"
        title="Full first-run scene"
        description="Onboarding primitives composed into a single post-signup landing. SampleDataBanner sits across the top. WelcomeModal is open by default to show how the splash overlays the dashboard. SetupChecklist + MilestoneTracker + FirstActionGrid form the main surface. FeatureHighlightCard and three ConnectIntegrationSteps live below. After a short delay an AchievementUnlockToast fires."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Onboarding", href: "/ui-primitives/onboarding" },
          { label: "Full scene" },
        ]}
      />
      <FullSceneStage />
    </main>
  )
}
