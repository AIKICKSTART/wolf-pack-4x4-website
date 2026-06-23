import type { ReactNode } from "react"

import styles from "./callout-warning.module.css"

interface CalloutWarningProps {
  title: string
  children: ReactNode
  ariaLabel?: string
}

export function CalloutWarning({ title, children, ariaLabel }: CalloutWarningProps) {
  return (
    <aside
      className={styles.callout}
      role="region"
      aria-label={ariaLabel ?? `Warning: ${title}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3 22 20H2Z" strokeLinejoin="round" />
          <path d="M12 10v4" strokeLinecap="round" />
          <path d="M12 17h.01" strokeLinecap="round" />
        </svg>
      </span>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.content}>{children}</div>
      </div>
    </aside>
  )
}

export default CalloutWarning
