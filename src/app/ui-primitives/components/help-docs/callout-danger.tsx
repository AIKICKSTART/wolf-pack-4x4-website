import type { ReactNode } from "react"

import styles from "./callout-danger.module.css"

interface CalloutDangerProps {
  title: string
  children: ReactNode
  ariaLabel?: string
}

export function CalloutDanger({ title, children, ariaLabel }: CalloutDangerProps) {
  return (
    <aside
      className={styles.callout}
      role="region"
      aria-label={ariaLabel ?? `Danger: ${title}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M9 9l6 6" strokeLinecap="round" />
          <path d="M15 9l-6 6" strokeLinecap="round" />
        </svg>
      </span>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.content}>{children}</div>
      </div>
    </aside>
  )
}

export default CalloutDanger
