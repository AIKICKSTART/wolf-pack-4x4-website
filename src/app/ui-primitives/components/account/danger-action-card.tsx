"use client"

import { AlertTriangle, Download, KeyRound, Trash2, Users, type LucideIcon } from "lucide-react"
import { useCallback, useId, useState, type ChangeEvent } from "react"

import styles from "./danger-action-card.module.css"

export type DangerActionTone = "critical" | "warning"
export type DangerActionIcon = "alert" | "download" | "key" | "trash" | "users"

interface DangerActionCardProps {
  title: string
  description: string
  confirmationPhrase: string
  actionLabel: string
  tone?: DangerActionTone
  icon?: DangerActionIcon
  consequences?: ReadonlyArray<string>
  helperText?: string
  onConfirm?: () => void
  className?: string
}

const TONE_CLASS: Record<DangerActionTone, string> = {
  critical: styles.toneCritical,
  warning: styles.toneWarning,
}

const ICONS: Record<DangerActionIcon, LucideIcon> = {
  alert: AlertTriangle,
  download: Download,
  key: KeyRound,
  trash: Trash2,
  users: Users,
}

export function DangerActionCard({
  title,
  description,
  confirmationPhrase,
  actionLabel,
  tone = "critical",
  icon = "alert",
  consequences,
  helperText,
  onConfirm,
  className,
}: DangerActionCardProps) {
  const phraseId = useId()
  const helperId = useId()
  const [inputValue, setInputValue] = useState("")
  const Icon = ICONS[icon]

  const matches = inputValue.trim() === confirmationPhrase
  const showError = inputValue.length > 0 && !matches

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value)
  }, [])

  const handleConfirm = useCallback(() => {
    if (matches) {
      onConfirm?.()
    }
  }, [matches, onConfirm])

  const classes = [styles.card, TONE_CLASS[tone], className].filter(Boolean).join(" ")

  return (
    <article className={classes} role="alert" aria-labelledby={`${phraseId}-title`}>
      <header className={styles.head}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={18} strokeWidth={2.2} />
        </span>
        <div className={styles.headText}>
          <h3 id={`${phraseId}-title`} className={styles.title}>
            {title}
          </h3>
          <p className={styles.description}>{description}</p>
        </div>
      </header>

      {consequences && consequences.length > 0 && (
        <ul className={styles.consequences} aria-label="Consequences">
          {consequences.map((line) => (
            <li key={line}>{line}</li>
          ))}
        </ul>
      )}

      <div className={styles.confirmRow}>
        <label htmlFor={phraseId} className={styles.confirmLabel}>
          Type{" "}
          <code className={styles.phrase}>{confirmationPhrase}</code>{" "}
          to confirm
        </label>
        <input
          id={phraseId}
          type="text"
          className={styles.confirmInput}
          value={inputValue}
          onChange={handleChange}
          aria-invalid={showError}
          aria-describedby={helperText ? helperId : undefined}
          autoComplete="off"
          spellCheck={false}
        />
        {helperText && (
          <span id={helperId} className={styles.helper}>
            {helperText}
          </span>
        )}
      </div>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.confirmBtn}
          disabled={!matches}
          onClick={handleConfirm}
        >
          {actionLabel}
        </button>
      </footer>
    </article>
  )
}

export default DangerActionCard
