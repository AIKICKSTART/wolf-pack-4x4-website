import type { ReactNode } from "react"

import {
  ENVIRONMENT_LABEL,
  STATUS_LABEL,
  type FlagEnvironment,
  type FlagStatusForEnv,
} from "./feature-flag-types"
import styles from "./flag-detail-pane.module.css"

export interface FlagDetailEnvBadge {
  env: FlagEnvironment
  status: FlagStatusForEnv
  rolloutPercent: number
}

export interface FlagDetailChange {
  id: string
  who: string
  when: string
  message: string
}

export interface FlagDetailLinkedExperiment {
  id: string
  name: string
  status: "running" | "paused" | "concluded"
}

export interface FlagDetailPaneProps {
  name: string
  flagKey: string
  description: string
  owner: string
  envBadges: ReadonlyArray<FlagDetailEnvBadge>
  variants: ReactNode
  rules: ReactNode
  rollout: ReactNode
  killSwitch: ReactNode
  recentChanges: ReadonlyArray<FlagDetailChange>
  linkedExperiments?: ReadonlyArray<FlagDetailLinkedExperiment>
  className?: string
}

const STATUS_DOT_CLASS: Record<FlagStatusForEnv, string> = {
  on: styles.statusOn,
  off: styles.statusOff,
  ramping: styles.statusRamping,
  killed: styles.statusKilled,
}

const ENV_TONE_CLASS: Record<FlagEnvironment, string> = {
  dev: styles.envDev,
  staging: styles.envStaging,
  prod: styles.envProd,
}

const EXPERIMENT_TONE_CLASS: Record<FlagDetailLinkedExperiment["status"], string> = {
  running: styles.expRunning,
  paused: styles.expPaused,
  concluded: styles.expConcluded,
}

const EXPERIMENT_LABEL: Record<FlagDetailLinkedExperiment["status"], string> = {
  running: "Running",
  paused: "Paused",
  concluded: "Concluded",
}

export function FlagDetailPane({
  name,
  flagKey,
  description,
  owner,
  envBadges,
  variants,
  rules,
  rollout,
  killSwitch,
  recentChanges,
  linkedExperiments,
  className,
}: FlagDetailPaneProps) {
  return (
    <section
      className={[styles.pane, className].filter(Boolean).join(" ")}
      role="region"
      aria-label={`Flag detail for ${name}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Feature flag</span>
          <h2 className={styles.title}>{name}</h2>
          <code className={styles.key}>{flagKey}</code>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.sideMeta}>
          <span className={styles.metaRow}>
            <span className={styles.metaLabel}>Owner</span>
            <span className={styles.metaValue}>{owner}</span>
          </span>
          <ul className={styles.envBadges} aria-label="Environment status">
            {envBadges.map((badge) => (
              <li
                key={badge.env}
                className={[styles.envBadge, ENV_TONE_CLASS[badge.env]].join(" ")}
              >
                <span className={styles.envBadgeName}>{ENVIRONMENT_LABEL[badge.env]}</span>
                <span className={styles.envBadgeStatus}>
                  <span
                    className={[styles.statusDot, STATUS_DOT_CLASS[badge.status]].join(" ")}
                    aria-hidden="true"
                  />
                  {STATUS_LABEL[badge.status]} · {badge.rolloutPercent}%
                </span>
              </li>
            ))}
          </ul>
        </div>
      </header>

      <div className={styles.grid}>
        <section className={styles.block} aria-labelledby="variants-heading">
          <h3 id="variants-heading" className={styles.blockTitle}>
            Variants
          </h3>
          {variants}
        </section>

        <section className={styles.block} aria-labelledby="rollout-heading">
          <h3 id="rollout-heading" className={styles.blockTitle}>
            Rollout
          </h3>
          {rollout}
        </section>

        <section className={styles.block} aria-labelledby="rules-heading">
          <h3 id="rules-heading" className={styles.blockTitle}>
            Targeting rules
          </h3>
          {rules}
        </section>

        <section className={styles.block} aria-labelledby="kill-heading">
          <h3 id="kill-heading" className={styles.blockTitle}>
            Kill switch
          </h3>
          {killSwitch}
        </section>

        {linkedExperiments && linkedExperiments.length > 0 ? (
          <section className={styles.block} aria-labelledby="experiments-heading">
            <h3 id="experiments-heading" className={styles.blockTitle}>
              Linked experiments
            </h3>
            <ul className={styles.experiments}>
              {linkedExperiments.map((exp) => (
                <li
                  key={exp.id}
                  className={[styles.experiment, EXPERIMENT_TONE_CLASS[exp.status]].join(" ")}
                >
                  <span className={styles.experimentName}>{exp.name}</span>
                  <span className={styles.experimentStatus}>{EXPERIMENT_LABEL[exp.status]}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <section className={styles.block} aria-labelledby="changes-heading">
          <h3 id="changes-heading" className={styles.blockTitle}>
            Recent changes
          </h3>
          <ol className={styles.timeline}>
            {recentChanges.map((change) => (
              <li key={change.id} className={styles.timelineItem}>
                <span className={styles.timelineDot} aria-hidden="true" />
                <span className={styles.timelineWho}>{change.who}</span>
                <span className={styles.timelineWhen}>{change.when}</span>
                <p className={styles.timelineMessage}>{change.message}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </section>
  )
}

export default FlagDetailPane
