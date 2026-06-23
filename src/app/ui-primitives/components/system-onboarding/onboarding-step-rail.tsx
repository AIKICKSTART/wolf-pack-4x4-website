import {
  STEP_STATE_LABEL,
  STEP_STATE_TONE,
  type OnboardingStepRailItem,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./onboarding-step-rail.module.css"

export interface OnboardingStepRailProps {
  /** Eyebrow eg "Onboarding / Steps". */
  kicker?: string
  /** Big title eg "Setup roadmap". */
  title: string
  /** Steps in display order. */
  steps: ReadonlyArray<OnboardingStepRailItem>
  /** Optional active step id override — defaults to first item with state "active". */
  activeId?: string
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

export function OnboardingStepRail({
  kicker,
  title,
  steps,
  activeId,
  className,
}: OnboardingStepRailProps) {
  const classes = [shell.shell, styles.rail, className].filter(Boolean).join(" ")
  const resolvedActiveId =
    activeId ?? steps.find((step) => step.state === "active")?.id

  return (
    <nav className={classes} aria-label={title}>
      <header className={shell.shellHead}>
        {kicker ? <span className={shell.kicker}>{kicker}</span> : null}
        <h2 className={shell.title}>{title}</h2>
      </header>

      <ol className={styles.list}>
        {steps.map((step, index) => {
          const tone = STEP_STATE_TONE[step.state]
          const isActive = step.id === resolvedActiveId
          const ariaCurrent: "step" | undefined = isActive ? "step" : undefined
          return (
            <li
              key={step.id}
              className={[
                styles.item,
                TONE_CLASS[tone],
                isActive ? styles.itemActive : null,
                step.state === "done" ? styles.itemDone : null,
                step.state === "skipped" ? styles.itemSkipped : null,
              ]
                .filter(Boolean)
                .join(" ")}
              {...(ariaCurrent ? { "aria-current": ariaCurrent } : {})}
            >
              <span className={styles.connector} aria-hidden="true">
                <span className={styles.connectorLine} />
                <span className={styles.connectorDot}>
                  {step.state === "done" ? (
                    <svg viewBox="0 0 12 12" width="10" height="10">
                      <path
                        d="M2 6 L5 9 L10 3"
                        stroke="currentColor"
                        strokeWidth="2"
                        fill="none"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  ) : step.state === "skipped" ? (
                    <svg viewBox="0 0 12 12" width="10" height="10">
                      <path
                        d="M3 6 L9 6"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : step.state === "active" ? (
                    <span className={styles.activePulse} />
                  ) : (
                    <span className={styles.indexLabel}>{index + 1}</span>
                  )}
                </span>
              </span>
              <div className={styles.body}>
                <div className={styles.bodyRow}>
                  {step.href ? (
                    <a className={styles.label} href={step.href}>
                      {step.label}
                    </a>
                  ) : (
                    <span className={styles.label}>{step.label}</span>
                  )}
                  <span className={[shell.chip, TONE_CLASS[tone]].join(" ")}>
                    {STEP_STATE_LABEL[step.state]}
                  </span>
                </div>
                <div className={styles.metaRow}>
                  {step.caption ? (
                    <span className={styles.caption}>{step.caption}</span>
                  ) : null}
                  {step.duration ? (
                    <span className={[styles.duration, shell.mono].join(" ")}>
                      {step.duration}
                    </span>
                  ) : null}
                </div>
              </div>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

export default OnboardingStepRail
