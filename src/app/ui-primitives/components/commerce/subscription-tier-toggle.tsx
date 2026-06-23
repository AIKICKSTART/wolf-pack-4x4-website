"use client"

import { useId } from "react"

import styles from "./subscription-tier-toggle.module.css"

export type SubscriptionTier = "monthly" | "annual" | "lifetime"

export interface SubscriptionTierOption {
  key: SubscriptionTier
  label: string
  savingsBadge?: string
}

interface SubscriptionTierToggleProps {
  options: ReadonlyArray<SubscriptionTierOption>
  value: SubscriptionTier
  onChange: (next: SubscriptionTier) => void
  ariaLabel?: string
}

export function SubscriptionTierToggle({
  options,
  value,
  onChange,
  ariaLabel = "Billing cycle",
}: SubscriptionTierToggleProps) {
  const groupId = useId()

  return (
    <div
      className={styles.toggle}
      role="radiogroup"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = option.key === value
        const id = `${groupId}-${option.key}`
        return (
          <label
            key={option.key}
            htmlFor={id}
            className={`${styles.option} ${isActive ? styles.optionActive : ""}`}
          >
            <input
              type="radio"
              id={id}
              name={groupId}
              value={option.key}
              checked={isActive}
              onChange={() => onChange(option.key)}
              className={styles.input}
            />
            <span className={styles.label}>{option.label}</span>
            {option.savingsBadge && (
              <span className={styles.badge}>{option.savingsBadge}</span>
            )}
          </label>
        )
      })}
      <span
        className={styles.thumb}
        aria-hidden="true"
        style={{
          insetInlineStart: `calc(${(options.findIndex((opt) => opt.key === value) / Math.max(options.length, 1)) * 100}% + 4px)`,
          width: `calc(${100 / Math.max(options.length, 1)}% - 8px)`,
        }}
      />
    </div>
  )
}

export default SubscriptionTierToggle
