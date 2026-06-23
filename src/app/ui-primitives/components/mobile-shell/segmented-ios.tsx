"use client"

import { motion } from "framer-motion"

import styles from "./segmented-ios.module.css"

export interface SegmentedOption {
  id: string
  label: string
}

interface SegmentedIosProps {
  options: ReadonlyArray<SegmentedOption>
  value: string
  onChange: (id: string) => void
  size?: "sm" | "md"
  label?: string
  className?: string
}

const PILL_LAYOUT_ID = "mufflermen-segmented-ios-pill"

export function SegmentedIos({
  options,
  value,
  onChange,
  size = "md",
  label = "Segment selector",
  className,
}: SegmentedIosProps) {
  const classes = [
    styles.root,
    size === "sm" ? styles.sizeSm : styles.sizeMd,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div role="radiogroup" aria-label={label} className={classes}>
      {options.map((option) => {
        const isActive = option.id === value
        return (
          <button
            key={option.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            className={[styles.option, isActive ? styles.optionActive : ""].filter(Boolean).join(" ")}
            onClick={() => onChange(option.id)}
          >
            {isActive ? (
              <motion.span
                layoutId={PILL_LAYOUT_ID}
                className={styles.pill}
                transition={{ type: "spring", stiffness: 380, damping: 32 }}
              />
            ) : null}
            <span className={styles.optionLabel}>{option.label}</span>
          </button>
        )
      })}
    </div>
  )
}

export default SegmentedIos
