import {
  AtSign,
  Check,
  Clock,
  MessageCircle,
  PhoneCall,
  Store,
} from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import type { CadenceStatus, CadenceTouchKind } from "./sales-leads-types"

import styles from "./follow-up-cadence-card.module.css"

export interface CadenceTouchpoint {
  step: number
  kind: CadenceTouchKind
  /** How many days after the previous touch. */
  dayOffset: number
  label: string
  status: CadenceStatus
}

interface FollowUpCadenceCardProps {
  cadenceName: string
  audience: string
  touchpoints: ReadonlyArray<CadenceTouchpoint>
  className?: string
}

const KIND_GLYPH: Record<CadenceTouchKind, ReactNode> = {
  call: <PhoneCall size={14} strokeWidth={2} aria-hidden="true" />,
  email: <AtSign size={14} strokeWidth={2} aria-hidden="true" />,
  sms: <MessageCircle size={14} strokeWidth={2} aria-hidden="true" />,
  dm: <MessageCircle size={14} strokeWidth={2} aria-hidden="true" />,
  visit: <Store size={14} strokeWidth={2} aria-hidden="true" />,
}

const KIND_LABEL: Record<CadenceTouchKind, string> = {
  call: "Call",
  email: "Email",
  sms: "SMS",
  dm: "DM",
  visit: "Visit",
}

const STATUS_TONE: Record<
  CadenceStatus,
  "green" | "amber" | "red" | "neutral"
> = {
  completed: "green",
  due: "amber",
  upcoming: "neutral",
  skipped: "red",
}

const STATUS_LABEL: Record<CadenceStatus, string> = {
  completed: "Completed",
  due: "Due now",
  upcoming: "Upcoming",
  skipped: "Skipped",
}

export function FollowUpCadenceCard({
  cadenceName,
  audience,
  touchpoints,
  className,
}: FollowUpCadenceCardProps) {
  const completed = touchpoints.filter((t) => t.status === "completed").length
  const total = touchpoints.length

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article
      className={classes}
      aria-label={`Follow-up cadence ${cadenceName} for ${audience}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Cadence</span>
          <h3 className={styles.name}>{cadenceName}</h3>
          <span className={styles.audience}>{audience}</span>
        </div>
        <div className={styles.progress}>
          <span className={styles.progressValue}>
            {completed}
            <em>/{total}</em>
          </span>
          <span className={styles.progressLabel}>completed</span>
        </div>
      </header>

      <ol className={styles.timeline}>
        {touchpoints.map((touch, index) => {
          const isLast = index === touchpoints.length - 1
          return (
            <li
              key={touch.step}
              className={styles.step}
              data-status={touch.status}
            >
              <span className={styles.stepDot} aria-hidden="true">
                {touch.status === "completed" ? (
                  <Check size={12} strokeWidth={2.6} />
                ) : (
                  <span className={styles.stepNum}>{touch.step}</span>
                )}
              </span>
              {!isLast ? (
                <span className={styles.stepConnector} aria-hidden="true" />
              ) : null}
              <div className={styles.stepBody}>
                <div className={styles.stepHead}>
                  <span className={styles.stepIcon} aria-hidden="true">
                    {KIND_GLYPH[touch.kind]}
                  </span>
                  <span className={styles.stepKind}>{KIND_LABEL[touch.kind]}</span>
                  <span className={styles.stepOffset}>
                    <Clock size={11} strokeWidth={2} aria-hidden="true" />
                    {touch.dayOffset === 0
                      ? "Day 0"
                      : `+${touch.dayOffset}d`}
                  </span>
                </div>
                <span className={styles.stepLabel}>{touch.label}</span>
                <Chip
                  label={STATUS_LABEL[touch.status]}
                  tone={STATUS_TONE[touch.status]}
                />
              </div>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default FollowUpCadenceCard
