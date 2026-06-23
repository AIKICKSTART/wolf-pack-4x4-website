import * as React from "react"

import styles from "../ui-primitives.module.css"

export function HudFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.hudFrame}>
      <span className={styles.hudCornerTL} aria-hidden="true" />
      <span className={styles.hudCornerTR} aria-hidden="true" />
      <span className={styles.hudCornerBL} aria-hidden="true" />
      <span className={styles.hudCornerBR} aria-hidden="true" />
      {children}
    </div>
  )
}
