import type { ReactNode } from "react"

import styles from "./callout-tip.module.css"

interface CalloutTipProps {
  title: string
  children: ReactNode
  ariaLabel?: string
}

export function CalloutTip({ title, children, ariaLabel }: CalloutTipProps) {
  return (
    <aside
      className={styles.callout}
      role="region"
      aria-label={ariaLabel ?? `Tip: ${title}`}
    >
      <span className={styles.icon} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18h6" strokeLinecap="round" />
          <path d="M10 21h4" strokeLinecap="round" />
          <path
            d="M12 3a6 6 0 0 0-3.6 10.8c.4.3.6.8.6 1.2v.5h6V15c0-.4.2-.9.6-1.2A6 6 0 0 0 12 3Z"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className={styles.body}>
        <h4 className={styles.title}>{title}</h4>
        <div className={styles.content}>{children}</div>
      </div>
    </aside>
  )
}

export default CalloutTip
