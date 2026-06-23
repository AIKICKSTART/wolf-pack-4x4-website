"use client"

import { useId, useState, type ReactNode } from "react"

import styles from "./rtl-layout-toggle.module.css"
import type { LocaleDirection } from "./localization-types"

export interface RtlLayoutToggleProps {
  /** Preview content rendered inside the frame. */
  children: ReactNode
  /** Initial direction. Defaults to "ltr". */
  initialDirection?: LocaleDirection
  /** Optional eyebrow label above the toggle. */
  label?: string
}

export function RtlLayoutToggle({
  children,
  initialDirection = "ltr",
  label = "Direction preview",
}: RtlLayoutToggleProps) {
  const groupId = useId()
  const [direction, setDirection] = useState<LocaleDirection>(initialDirection)

  return (
    <section className={styles.root} aria-labelledby={groupId}>
      <header className={styles.head}>
        <span id={groupId} className={styles.label}>
          {label}
        </span>
        <div className={styles.switch} role="radiogroup" aria-labelledby={groupId}>
          <button
            type="button"
            role="radio"
            aria-checked={direction === "ltr"}
            className={`${styles.switchButton} ${direction === "ltr" ? styles.switchActive : ""}`}
            onClick={() => setDirection("ltr")}
          >
            LTR
          </button>
          <button
            type="button"
            role="radio"
            aria-checked={direction === "rtl"}
            className={`${styles.switchButton} ${direction === "rtl" ? styles.switchActive : ""}`}
            onClick={() => setDirection("rtl")}
          >
            RTL
          </button>
        </div>
      </header>

      <div className={styles.frame} dir={direction} data-direction={direction}>
        {children}
      </div>

      <footer className={styles.helper}>
        <code>dir=&quot;{direction}&quot;</code>
        <span>
          Direction flips inline padding, scroll axis, and logical properties. Reduced-motion
          shows an instant swap.
        </span>
      </footer>
    </section>
  )
}

export default RtlLayoutToggle
