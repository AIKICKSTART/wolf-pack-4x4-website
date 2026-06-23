"use client"

import { useState } from "react"

import {
  ENVIRONMENT_LABEL,
  ENVIRONMENT_SHORT,
  ENVIRONMENT_TONE,
  STATUS_LABEL,
  STATUS_TONE,
  type FlagEnvironment,
  type FlagStatusForEnv,
  type FlagTone,
} from "./feature-flag-types"
import styles from "./flag-card.module.css"

export interface FlagEnvironmentChip {
  env: FlagEnvironment
  status: FlagStatusForEnv
}

export interface FlagVariant {
  id: string
  name: string
  weight: number
}

export interface FlagCardProps {
  name: string
  flagKey: string
  description?: string
  initialOn: boolean
  environments: ReadonlyArray<FlagEnvironmentChip>
  variants?: ReadonlyArray<FlagVariant>
  lastModified: string
  owner?: string
  onToggle?: (next: boolean) => void
  className?: string
}

const TONE_CLASS: Record<FlagTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export function FlagCard({
  name,
  flagKey,
  description,
  initialOn,
  environments,
  variants,
  lastModified,
  owner,
  onToggle,
  className,
}: FlagCardProps) {
  const [isOn, setIsOn] = useState<boolean>(initialOn)

  const toggle = () => {
    const next = !isOn
    setIsOn(next)
    onToggle?.(next)
  }

  const classes = [styles.card, isOn ? styles.cardOn : styles.cardOff, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={`Flag ${name}`}>
      <header className={styles.head}>
        <div className={styles.identity}>
          <h3 className={styles.name}>{name}</h3>
          <code className={styles.key}>{flagKey}</code>
        </div>
        <button
          type="button"
          role="switch"
          aria-checked={isOn}
          aria-label={`Toggle flag ${name}`}
          className={styles.toggle}
          onClick={toggle}
        >
          <span className={styles.toggleTrack} aria-hidden="true">
            <span className={styles.toggleThumb} />
          </span>
          <span className={styles.toggleLabel}>{isOn ? "ON" : "OFF"}</span>
        </button>
      </header>

      {description ? <p className={styles.description}>{description}</p> : null}

      <ul className={styles.envList} aria-label="Environments">
        {environments.map((chip) => {
          const envTone = ENVIRONMENT_TONE[chip.env]
          const statusTone = STATUS_TONE[chip.status]
          return (
            <li
              key={chip.env}
              className={[styles.envChip, TONE_CLASS[envTone]].join(" ")}
            >
              <span className={styles.envShort}>{ENVIRONMENT_SHORT[chip.env]}</span>
              <span className={styles.envName}>{ENVIRONMENT_LABEL[chip.env]}</span>
              <span
                className={[styles.envStatusDot, TONE_CLASS[statusTone]].join(" ")}
                aria-label={STATUS_LABEL[chip.status]}
              />
            </li>
          )
        })}
      </ul>

      {variants && variants.length > 0 ? (
        <ul className={styles.variantRow} aria-label="Variants">
          {variants.map((v) => (
            <li key={v.id} className={styles.variantChip}>
              <span className={styles.variantName}>{v.name}</span>
              <span className={styles.variantWeight}>{v.weight}%</span>
            </li>
          ))}
        </ul>
      ) : null}

      <footer className={styles.foot}>
        <span className={styles.meta}>
          <span className={styles.metaLabel}>Updated</span>
          <span className={styles.metaValue}>{lastModified}</span>
        </span>
        {owner ? (
          <span className={styles.meta}>
            <span className={styles.metaLabel}>Owner</span>
            <span className={styles.metaValue}>{owner}</span>
          </span>
        ) : null}
      </footer>
    </article>
  )
}

export default FlagCard
