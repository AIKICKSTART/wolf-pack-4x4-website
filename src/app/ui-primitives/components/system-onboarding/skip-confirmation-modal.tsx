"use client"

import { useCallback, useEffect, useId, useRef } from "react"

import type { SkipConsequence } from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./skip-confirmation-modal.module.css"

export interface SkipConfirmationModalProps {
  /** Whether the modal is currently open. */
  open: boolean
  /** Eyebrow eg "Skip step / Workshop". */
  kicker: string
  /** Big title eg "Skip workshop setup?" */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Consequences the user accepts by skipping. */
  consequences: ReadonlyArray<SkipConsequence>
  /** Optional override for the confirm button label. */
  confirmLabel?: string
  /** Optional override for the cancel button label. */
  cancelLabel?: string
  /** Optional "remind me later" label — when present a third tertiary action is rendered. */
  remindLaterLabel?: string
  /** Called when the user confirms skipping. */
  onConfirm: () => void
  /** Called when the user cancels / dismisses the modal. */
  onCancel: () => void
  /** Optional handler for the remind-later action. */
  onRemindLater?: () => void
}

export function SkipConfirmationModal({
  open,
  kicker,
  title,
  description,
  consequences,
  confirmLabel = "Skip step",
  cancelLabel = "Back to setup",
  remindLaterLabel,
  onConfirm,
  onCancel,
  onRemindLater,
}: SkipConfirmationModalProps) {
  const dialogRef = useRef<HTMLDivElement | null>(null)
  const headingId = useId()
  const bodyId = useId()

  const handleKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onCancel()
      }
    },
    [onCancel],
  )

  useEffect(() => {
    if (!open) {
      return
    }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [open, handleKey])

  if (!open) {
    return null
  }

  return (
    <div
      className={styles.backdrop}
      role="presentation"
      onClick={onCancel}
    >
      <div
        ref={dialogRef}
        className={[shell.shell, shell.toneAmber, styles.dialog].join(" ")}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={headingId}
        aria-describedby={bodyId}
        onClick={(event) => event.stopPropagation()}
      >
        <header className={styles.head}>
          <span className={styles.icon} aria-hidden="true">
            <svg viewBox="0 0 24 24" width="22" height="22">
              <path
                d="M12 3 L21 19 L3 19 Z"
                fill="color-mix(in srgb, var(--primitive-amber) 18%, transparent)"
                stroke="var(--primitive-amber)"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
              <path
                d="M12 10 L12 14"
                stroke="var(--primitive-amber)"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="12" cy="17" r="1" fill="var(--primitive-amber)" />
            </svg>
          </span>
          <div className={shell.identity}>
            <span className={shell.kicker}>{kicker}</span>
            <h2 id={headingId} className={shell.title}>{title}</h2>
            <p id={bodyId} className={shell.subtitle}>{description}</p>
          </div>
        </header>

        <section className={styles.consequencesBlock}>
          <span className={shell.sectionLabel}>What happens if you skip</span>
          <ul className={styles.consequenceList}>
            {consequences.map((consequence) => (
              <li
                key={consequence.id}
                className={[
                  styles.consequence,
                  consequence.severe ? styles.consequenceSevere : null,
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span className={styles.consequenceGlyph} aria-hidden="true">
                  {consequence.severe ? "!" : "•"}
                </span>
                <div className={styles.consequenceCopy}>
                  <span className={styles.consequenceLabel}>{consequence.label}</span>
                  {consequence.detail ? (
                    <span className={styles.consequenceDetail}>{consequence.detail}</span>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        </section>

        <footer className={styles.foot}>
          <button
            type="button"
            className={[shell.button, shell.buttonGhost].join(" ")}
            onClick={onCancel}
          >
            {cancelLabel}
          </button>
          {remindLaterLabel ? (
            <button
              type="button"
              className={[shell.button, shell.buttonGhost].join(" ")}
              onClick={onRemindLater}
            >
              {remindLaterLabel}
            </button>
          ) : null}
          <button
            type="button"
            className={[shell.button, shell.buttonPrimary, shell.toneAmber].join(" ")}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </footer>
      </div>
    </div>
  )
}

export default SkipConfirmationModal
