"use client"

import type { ReactNode } from "react"

import { FirstActionGrid, type FirstActionCard } from "./first-action-grid"
import { MilestoneTracker, type Milestone } from "./milestone-tracker"
import { SetupChecklist, type SetupChecklistStep } from "./setup-checklist"
import styles from "./get-started-page-template.module.css"

interface GetStartedPageTemplateProps {
  /** Eyebrow label at the very top. */
  kicker: string
  /** Big welcome headline. */
  headline: string
  /** Sub-line explaining what's on this page. */
  intro: string
  /** Milestone tracker data. */
  milestones: ReadonlyArray<Milestone>
  /** Setup checklist data. */
  checklist: ReadonlyArray<SetupChecklistStep>
  /** Checklist kicker label. */
  checklistKicker?: string
  /** Checklist title. */
  checklistTitle?: string
  /** First action grid cards. */
  firstActions: ReadonlyArray<FirstActionCard>
  /** First action grid kicker. */
  firstActionsKicker?: string
  /** First action grid title. */
  firstActionsTitle?: string
  /** Optional banner slot rendered above the headline (e.g. SampleDataBanner). */
  banner?: ReactNode
  /** Optional aside slot rendered to the right of the checklist (e.g. ProfileCompletionMeter). */
  aside?: ReactNode
  className?: string
}

export function GetStartedPageTemplate({
  kicker,
  headline,
  intro,
  milestones,
  checklist,
  checklistKicker = "Setup checklist",
  checklistTitle = "Get Oak Flats workshop live",
  firstActions,
  firstActionsKicker = "First things to do",
  firstActionsTitle = "Pick somewhere to start",
  banner,
  aside,
  className,
}: GetStartedPageTemplateProps) {
  const classes = [styles.template, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`${kicker}: ${headline}`}>
      {banner ? <div className={styles.bannerSlot}>{banner}</div> : null}

      <header className={styles.heroHead}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.intro}>{intro}</p>
      </header>

      <MilestoneTracker
        kicker="Activation"
        title="Mufflermen onboarding milestones"
        milestones={milestones}
      />

      <div className={styles.split}>
        <div className={styles.splitMain}>
          <SetupChecklist
            kicker={checklistKicker}
            title={checklistTitle}
            steps={checklist}
          />
        </div>
        {aside ? <aside className={styles.splitAside}>{aside}</aside> : null}
      </div>

      <FirstActionGrid
        kicker={firstActionsKicker}
        title={firstActionsTitle}
        cards={firstActions}
      />
    </section>
  )
}

export default GetStartedPageTemplate
