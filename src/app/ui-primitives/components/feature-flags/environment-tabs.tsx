"use client"

import { useState, type KeyboardEvent } from "react"

import {
  ENVIRONMENT_LABEL,
  STATUS_LABEL,
  type FlagEnvironment,
  type FlagStatusForEnv,
} from "./feature-flag-types"
import styles from "./environment-tabs.module.css"

export interface EnvironmentTabSpec {
  env: FlagEnvironment
  status: FlagStatusForEnv
  flagCount: number
}

export interface EnvironmentTabsProps {
  tabs: ReadonlyArray<EnvironmentTabSpec>
  activeEnv?: FlagEnvironment
  defaultEnv?: FlagEnvironment
  onChange?: (env: FlagEnvironment) => void
  className?: string
}

const STATUS_DOT_CLASS: Record<FlagStatusForEnv, string> = {
  on: styles.dotOn,
  off: styles.dotOff,
  ramping: styles.dotRamping,
  killed: styles.dotKilled,
}

const ENV_TONE_CLASS: Record<FlagEnvironment, string> = {
  dev: styles.envDev,
  staging: styles.envStaging,
  prod: styles.envProd,
}

export function EnvironmentTabs({
  tabs,
  activeEnv,
  defaultEnv,
  onChange,
  className,
}: EnvironmentTabsProps) {
  const [internal, setInternal] = useState<FlagEnvironment>(
    defaultEnv ?? tabs[0]?.env ?? "dev",
  )
  const isControlled = activeEnv !== undefined
  const current = isControlled ? activeEnv : internal

  const select = (env: FlagEnvironment) => {
    if (!isControlled) setInternal(env)
    onChange?.(env)
  }

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return
    event.preventDefault()
    const index = tabs.findIndex((t) => t.env === current)
    if (index === -1) return
    const offset = event.key === "ArrowLeft" ? -1 : 1
    const nextIndex = (index + offset + tabs.length) % tabs.length
    select(tabs[nextIndex].env)
  }

  return (
    <div
      role="tablist"
      aria-label="Environment"
      className={[styles.tabs, className].filter(Boolean).join(" ")}
      onKeyDown={handleKey}
    >
      {tabs.map((tab) => {
        const isActive = tab.env === current
        return (
          <button
            key={tab.env}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-controls={`env-panel-${tab.env}`}
            id={`env-tab-${tab.env}`}
            tabIndex={isActive ? 0 : -1}
            className={[
              styles.tab,
              ENV_TONE_CLASS[tab.env],
              isActive ? styles.tabActive : "",
            ]
              .filter(Boolean)
              .join(" ")}
            onClick={() => select(tab.env)}
          >
            <span
              className={[styles.dot, STATUS_DOT_CLASS[tab.status]].join(" ")}
              aria-hidden="true"
            />
            <span className={styles.label}>{ENVIRONMENT_LABEL[tab.env]}</span>
            <span className={styles.status}>{STATUS_LABEL[tab.status]}</span>
            <span className={styles.count} aria-label={`${tab.flagCount} flags`}>
              {tab.flagCount}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default EnvironmentTabs
