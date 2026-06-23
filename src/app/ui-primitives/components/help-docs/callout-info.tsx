import type { ReactNode } from "react"

import styles from "./callout-info.module.css"

interface CalloutInfoProps {
  title: string
  children: ReactNode
  ariaLabel?: string
}

export function CalloutInfo({ title, children, ariaLabel }: CalloutInfoProps) {
  return (
    <aside
      className={styles.callout}
      role="region"
      aria-label={ariaLabel ?? `Info: ${title}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 8h.01" strokeLinecap="round" />
          <path d="M11 12h1v5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.content}>{children}</div>
      </div>
    </aside>
  )
}

export default CalloutInfo
