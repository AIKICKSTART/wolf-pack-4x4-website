import type { ReactNode } from "react"

import { Reveal } from "../motion"

import styles from "./process-steps.module.css"

export interface ProcessStep {
  id: string
  icon: ReactNode
  title: string
  body: string
}

export interface ProcessStepsProps {
  kicker?: string
  heading?: string
  body?: string
  /** 3-5 ordered steps connected by a line. */
  steps: ReadonlyArray<ProcessStep>
  className?: string
}

export function ProcessSteps({
  kicker,
  heading,
  body,
  steps,
  className,
}: ProcessStepsProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading ?? "Process"}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}

      <ol className={styles.steps}>
        <span className={styles.connector} aria-hidden="true" />
        {steps.map((step, index) => (
          <Reveal
            key={step.id}
            as="li"
            from="below"
            delay={index * 120}
            className={styles.step}
          >
            <span className={styles.indexBadge} aria-hidden="true">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className={styles.icon} aria-hidden="true">
              {step.icon}
            </span>
            <h3 className={styles.stepTitle}>{step.title}</h3>
            <p className={styles.stepBody}>{step.body}</p>
          </Reveal>
        ))}
      </ol>
    </section>
  )
}

export default ProcessSteps
