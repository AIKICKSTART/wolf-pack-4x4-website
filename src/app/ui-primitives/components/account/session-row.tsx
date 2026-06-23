"use client"

import { Globe, Laptop, Smartphone, Tablet, type LucideIcon } from "lucide-react"

import { Chip } from "../primitives/chip"
import styles from "./session-row.module.css"

export type SessionDevice = "desktop" | "laptop" | "phone" | "tablet" | "browser"

export interface SessionRowItem {
  id: string
  device: SessionDevice
  label: string
  browser: string
  ip: string
  location: string
  lastActive: string
  current?: boolean
}

interface SessionRowProps {
  session: SessionRowItem
  onRevoke?: (id: string) => void
  className?: string
}

const DEVICE_ICON: Record<SessionDevice, LucideIcon> = {
  desktop: Laptop,
  laptop: Laptop,
  phone: Smartphone,
  tablet: Tablet,
  browser: Globe,
}

export function SessionRow({ session, onRevoke, className }: SessionRowProps) {
  const Icon = DEVICE_ICON[session.device]
  const classes = [styles.row, session.current ? styles.current : "", className]
    .filter(Boolean)
    .join(" ")

  const handleRevoke = () => {
    if (session.current) {
      return
    }
    onRevoke?.(session.id)
  }

  return (
    <div className={classes} role="listitem">
      <div className={styles.identity}>
        <span className={styles.iconWrap} aria-hidden="true">
          <Icon size={18} strokeWidth={2.1} />
        </span>
        <div className={styles.identityText}>
          <span className={styles.label}>{session.label}</span>
          <span className={styles.browser}>{session.browser}</span>
        </div>
      </div>

      <dl className={styles.meta}>
        <div className={styles.metaItem}>
          <dt>IP</dt>
          <dd>{session.ip}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Location</dt>
          <dd>{session.location}</dd>
        </div>
        <div className={styles.metaItem}>
          <dt>Last active</dt>
          <dd>{session.lastActive}</dd>
        </div>
      </dl>

      <div className={styles.actions}>
        {session.current ? (
          <Chip label="This device" tone="teal" />
        ) : (
          <button
            type="button"
            className={styles.revokeBtn}
            onClick={handleRevoke}
            aria-label={`Revoke session on ${session.label}`}
          >
            Revoke
          </button>
        )}
      </div>
    </div>
  )
}

export default SessionRow
