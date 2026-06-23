"use client"

import type { ReactNode } from "react"

import styles from "./connect-integration-step.module.css"

export type IntegrationStatus = "not-started" | "in-progress" | "connected"

interface ConnectIntegrationStepProps {
  /** Eyebrow label, e.g. "Payments". */
  kicker: string
  /** Headline, e.g. "Connect Stripe to accept payments". */
  title: string
  /** Body copy explaining what gets unlocked. */
  description: string
  /** Inline integration logo / mark — SVG node. */
  logo: ReactNode
  /** Two-letter logo fallback if logo prop is absent (visually rendered inside the mark slot). */
  logoFallback?: string
  /** Current connection status. */
  status: IntegrationStatus
  /** Label for the connect CTA when not yet connected. */
  connectLabel?: string
  /** Label for the manage CTA when connected. */
  manageLabel?: string
  /** href for the action button. */
  href?: string
  /** Click handler used when href is absent. */
  onAction?: () => void
  className?: string
}

const STATUS_COPY: Record<IntegrationStatus, string> = {
  "not-started": "Not started",
  "in-progress": "In progress",
  connected: "Connected",
}

export function ConnectIntegrationStep({
  kicker,
  title,
  description,
  logo,
  logoFallback,
  status,
  connectLabel = "Connect",
  manageLabel = "Manage",
  href,
  onAction,
  className,
}: ConnectIntegrationStepProps) {
  const classes = [
    styles.card,
    styles[`status_${status.replace("-", "_")}`],
    className,
  ]
    .filter(Boolean)
    .join(" ")
  const actionLabel = status === "connected" ? manageLabel : connectLabel

  return (
    <article className={classes} aria-label={title}>
      <div className={styles.logo} aria-hidden="true">
        {logo}
        {!logo && logoFallback ? (
          <span className={styles.logoFallback}>{logoFallback}</span>
        ) : null}
      </div>
      <div className={styles.body}>
        <header className={styles.head}>
          <span className={styles.kicker}>{kicker}</span>
          <span className={styles.statusChip}>
            <span className={styles.statusDot} aria-hidden="true" />
            {STATUS_COPY[status]}
          </span>
        </header>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
      </div>
      <div className={styles.actions}>
        {href ? (
          <a className={styles.actionCta} href={href}>
            {actionLabel}
            <span aria-hidden="true">→</span>
          </a>
        ) : (
          <button type="button" className={styles.actionCta} onClick={onAction}>
            {actionLabel}
            <span aria-hidden="true">→</span>
          </button>
        )}
      </div>
    </article>
  )
}

export default ConnectIntegrationStep
