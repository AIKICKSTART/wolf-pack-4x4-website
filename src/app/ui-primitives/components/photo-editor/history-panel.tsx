"use client"

import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"

import type { HistoryActionKind, HistoryStep } from "./photo-editor-types"
import styles from "./history-panel.module.css"

interface HistoryPanelProps {
  /** History entries — oldest first (open document → most recent). */
  steps: ReadonlyArray<HistoryStep>
  /** Index of the current step. Anything after this is shown as future / dimmed. */
  currentIndex: number
  /** Optional callback when a step's jump-back button is pressed. */
  onJumpTo?: (step: HistoryStep) => void
}

const ACTION_LABEL: Record<HistoryActionKind, string> = {
  open: "Open",
  crop: "Crop",
  brush: "Brush",
  levels: "Levels",
  curves: "Curves",
  filter: "Filter",
  text: "Text",
  mask: "Mask",
  transform: "Transform",
  clone: "Clone",
  export: "Export",
}

const ACTION_TONE: Record<HistoryActionKind, ChipTone> = {
  open: "neutral",
  crop: "amber",
  brush: "amber",
  levels: "teal",
  curves: "teal",
  filter: "teal",
  text: "green",
  mask: "red",
  transform: "amber",
  clone: "red",
  export: "green",
}

export function HistoryPanel({ steps, currentIndex, onJumpTo }: HistoryPanelProps) {
  return (
    <aside className={styles.panel} aria-label="Edit history">
      <header className={styles.head}>
        <span className={styles.title}>History</span>
        <span className={styles.kicker}>
          {currentIndex + 1} / {steps.length} steps
        </span>
      </header>

      <ul className={styles.list} role="list">
        {steps.map((step) => {
          const isCurrent = step.index === currentIndex
          const isFuture = step.index > currentIndex
          const classes = [
            styles.step,
            isCurrent ? styles.stepCurrent : "",
            isFuture ? styles.stepFuture : "",
          ]
            .filter(Boolean)
            .join(" ")

          return (
            <li
              key={step.index}
              className={classes}
              aria-current={isCurrent ? "step" : undefined}
              aria-disabled={isFuture}
              tabIndex={0}
              role="button"
              onClick={() => onJumpTo?.(step)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault()
                  onJumpTo?.(step)
                }
              }}
            >
              <span
                className={[styles.idx, isCurrent ? styles.idxCurrent : ""].join(" ")}
                aria-label={`Step ${step.index + 1}`}
              >
                {String(step.index + 1).padStart(2, "0")}
              </span>
              <span className={styles.snap} aria-hidden="true" />
              <div className={styles.body}>
                <span className={styles.label}>{step.label}</span>
                <span className={styles.meta}>
                  <Chip label={ACTION_LABEL[step.action]} tone={ACTION_TONE[step.action]} />
                  {!isCurrent && !isFuture ? (
                    <span className={styles.jumpBtn} aria-hidden="true">
                      Jump
                    </span>
                  ) : null}
                </span>
              </div>
              <time className={styles.time} dateTime={step.timestamp}>
                {step.timestamp}
              </time>
            </li>
          )
        })}
      </ul>
    </aside>
  )
}
