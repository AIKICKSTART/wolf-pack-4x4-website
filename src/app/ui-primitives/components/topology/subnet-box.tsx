import type { CSSProperties, ReactNode } from "react"

import styles from "./subnet-box.module.css"
import type { TopologyTone } from "./topology-types"

interface SubnetBoxProps {
  /** Subnet display label — e.g. `web` / `app` / `db`. */
  label: string
  /** CIDR range chip — e.g. `10.1.1.0/24`. */
  cidr?: string
  /** Availability zone label — e.g. `ap-southeast-2a`. */
  az?: string
  /** Box position as percentage. */
  x: number
  y: number
  /** Box width/height as percentage of the canvas. */
  width: number
  height: number
  tone?: TopologyTone
  children?: ReactNode
}

const TONE_CLASS: Record<TopologyTone, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function SubnetBox({
  label,
  cidr,
  az,
  x,
  y,
  width,
  height,
  tone = "teal",
  children,
}: SubnetBoxProps) {
  const style: CSSProperties = {
    left: `${x}%`,
    top: `${y}%`,
    width: `${width}%`,
    height: `${height}%`,
  }
  const classes = [styles.box, TONE_CLASS[tone]].join(" ")

  return (
    <section
      className={classes}
      style={style}
      role="region"
      aria-label={`Subnet ${label}${cidr ? ` ${cidr}` : ""}`}
    >
      <header className={styles.header}>
        <span className={styles.label}>{label}</span>
        {cidr ? <span className={styles.cidrChip}>{cidr}</span> : null}
        {az ? <span className={styles.azChip}>{az}</span> : null}
      </header>
      <div className={styles.body}>{children}</div>
    </section>
  )
}
