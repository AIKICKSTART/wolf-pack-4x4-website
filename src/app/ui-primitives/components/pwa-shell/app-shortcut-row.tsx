"use client"

import { ChevronRight } from "lucide-react"

import type { PwaShortcutAction, PwaShortcutTone } from "./pwa-shell-types"
import styles from "./app-shortcut-row.module.css"

interface AppShortcutRowProps {
  title?: string
  subtitle?: string
  actions: ReadonlyArray<PwaShortcutAction>
  onSelect?: (action: PwaShortcutAction) => void
  className?: string
}

const ICON_TONE_CLASS: Record<PwaShortcutTone, string> = {
  neutral: styles.iconNeutral,
  red: styles.iconRed,
  amber: styles.iconAmber,
  teal: "",
}

export function AppShortcutRow({
  title = "Quick actions",
  subtitle,
  actions,
  onSelect,
  className,
}: AppShortcutRowProps) {
  const classes = [styles.root, className].filter(Boolean).join(" ")
  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <h3 className={styles.title}>{title}</h3>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </header>
      <ul className={styles.list}>
        {actions.map((action) => {
          const iconClass = [styles.icon, ICON_TONE_CLASS[action.tone ?? "teal"]]
            .filter(Boolean)
            .join(" ")
          const ariaLabel = action.hint ? `${action.label} · ${action.hint}` : action.label
          if (action.href) {
            return (
              <li key={action.id}>
                <a className={styles.row} href={action.href} aria-label={ariaLabel}>
                  <span className={iconClass} aria-hidden="true">
                    {action.icon}
                  </span>
                  <span className={styles.copy}>
                    <span className={styles.label}>{action.label}</span>
                    {action.hint && <span className={styles.hint}>{action.hint}</span>}
                  </span>
                  <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" className={styles.chevron} />
                </a>
              </li>
            )
          }
          return (
            <li key={action.id}>
              <button
                type="button"
                className={styles.row}
                onClick={() => onSelect?.(action)}
                aria-label={ariaLabel}
              >
                <span className={iconClass} aria-hidden="true">
                  {action.icon}
                </span>
                <span className={styles.copy}>
                  <span className={styles.label}>{action.label}</span>
                  {action.hint && <span className={styles.hint}>{action.hint}</span>}
                </span>
                <ChevronRight size={16} strokeWidth={2.2} aria-hidden="true" className={styles.chevron} />
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default AppShortcutRow
