import { ProgressLinear } from "../primitives/progress-linear"

import {
  STEP_STATE_LABEL,
  STEP_STATE_TONE,
  type ChecklistProgressItem,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./checklist-progress-tile.module.css"

export interface ChecklistProgressTileProps {
  /** Eyebrow eg "Onboarding / Progress". */
  kicker: string
  /** Big title eg "You're 4 of 6 steps in". */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Items in the onboarding checklist. */
  items: ReadonlyArray<ChecklistProgressItem>
  /** Estimated remaining time eg "3 min". */
  remainingTime: string
  /** Optional CTA label rendered when there are more steps to do. */
  resumeLabel?: string
  /** Optional CTA href. */
  resumeHref?: string
  className?: string
}

const TONE_CLASS = {
  red: shell.toneRed,
  amber: shell.toneAmber,
  teal: shell.toneTeal,
  green: shell.toneGreen,
  neutral: shell.toneNeutral,
  violet: shell.toneViolet,
} as const

function computeProgress(items: ReadonlyArray<ChecklistProgressItem>): number {
  if (items.length === 0) return 0
  const done = items.filter((item) => item.state === "done" || item.state === "skipped").length
  return Math.round((done / items.length) * 100)
}

export function ChecklistProgressTile({
  kicker,
  title,
  description,
  items,
  remainingTime,
  resumeLabel = "Resume onboarding",
  resumeHref,
  className,
}: ChecklistProgressTileProps) {
  const percent = computeProgress(items)
  const tone = percent === 100 ? "green" : percent === 0 ? "neutral" : "teal"
  const classes = [shell.shell, TONE_CLASS[tone], styles.tile, className]
    .filter(Boolean)
    .join(" ")
  const remaining = items.filter((item) => item.state === "todo" || item.state === "active").length

  return (
    <article className={classes} aria-label={title}>
      <header className={shell.shellHead}>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={shell.title}>{title}</h2>
        <p className={shell.subtitle}>{description}</p>
      </header>

      <div className={styles.metrics}>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Complete</span>
          <span className={[styles.metricValue, shell.tabular].join(" ")}>{percent}%</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Time left</span>
          <span className={[styles.metricValue, shell.tabular].join(" ")}>{remainingTime}</span>
        </div>
        <div className={styles.metric}>
          <span className={styles.metricLabel}>Steps left</span>
          <span className={[styles.metricValue, shell.tabular].join(" ")}>{remaining}</span>
        </div>
      </div>

      <ProgressLinear
        value={percent}
        tone={tone === "neutral" ? "teal" : tone}
        variant="segmented"
        segments={items.length || 6}
        showLabel={false}
      />

      <ul className={styles.list}>
        {items.map((item) => {
          const itemTone = STEP_STATE_TONE[item.state]
          return (
            <li
              key={item.id}
              className={[
                styles.row,
                TONE_CLASS[itemTone],
                item.state === "done" ? styles.rowDone : null,
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <span className={styles.rowGlyph} aria-hidden="true">
                {item.state === "done" ? (
                  <svg viewBox="0 0 12 12" width="12" height="12">
                    <path
                      d="M2 6 L5 9 L10 3"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : item.state === "skipped" ? (
                  <svg viewBox="0 0 12 12" width="12" height="12">
                    <path
                      d="M3 6 L6 6 M6 6 L9 6"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                ) : item.state === "active" ? (
                  <span className={styles.spinner} />
                ) : (
                  <span className={styles.dot} />
                )}
              </span>
              <span className={styles.rowLabel}>{item.label}</span>
              <span className={styles.rowMeta}>
                {item.duration ? (
                  <span className={[shell.chip, shell.chipQuiet].join(" ")}>
                    {item.duration}
                  </span>
                ) : null}
                <span className={[shell.chip, TONE_CLASS[itemTone]].join(" ")}>
                  {STEP_STATE_LABEL[item.state]}
                </span>
              </span>
            </li>
          )
        })}
      </ul>

      {percent < 100 ? (
        <footer className={styles.foot}>
          <a
            className={[shell.button, shell.buttonPrimary, shell.toneTeal].join(" ")}
            href={resumeHref ?? "#"}
          >
            {resumeLabel}
            <span aria-hidden="true">→</span>
          </a>
        </footer>
      ) : null}
    </article>
  )
}

export default ChecklistProgressTile
