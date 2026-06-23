"use client"

import { useCallback, useEffect, useRef, useState } from "react"

import { ConfettiOnSuccess } from "../components/motion"
import { Chip } from "../components/primitives/chip"
import { Kbd } from "../components/primitives/kbd"
import { ProgressLinear } from "../components/primitives/progress-linear"

import styles from "./motion.module.css"

export function ConfettiDemo() {
  const [active, setActive] = useState<boolean>(false)
  const resetTimer = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (resetTimer.current !== null) {
        window.clearTimeout(resetTimer.current)
      }
    }
  }, [])

  const handleFire = useCallback(() => {
    if (resetTimer.current !== null) {
      window.clearTimeout(resetTimer.current)
    }
    setActive(true)
    resetTimer.current = window.setTimeout(() => {
      setActive(false)
      resetTimer.current = null
    }, 1200)
  }, [])

  return (
    <div className={styles.demoBody}>
      <div className={styles.successPanel}>
        <div className={styles.successHeader}>
          <div className={styles.metaRow} aria-label="Confetti demo state">
            <Chip label={active ? "Firing" : "Ready"} tone={active ? "red" : "green"} selected />
            <Kbd size="sm">Enter</Kbd>
          </div>
          <span role="status" aria-live="polite">
            {active ? "Success animation active" : "Waiting for success event"}
          </span>
        </div>
        <button
          type="button"
          className={styles.demoButton}
          aria-pressed={active}
          disabled={active}
          onClick={handleFire}
        >
          {active ? "Completing" : "Mark job complete"}
        </button>
        <ProgressLinear
          label="Burst lifecycle"
          value={active ? 100 : 0}
          tone={active ? "red" : "green"}
          variant={active ? "striped" : "segmented"}
          segments={6}
          showLabel
        />
      </div>
      <ConfettiOnSuccess active={active} mode="cannon" />
    </div>
  )
}
