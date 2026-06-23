"use client"

import { Chip } from "../primitives/chip"

import {
  SESSION_RISK_TONE,
  type SessionRiskTone,
} from "./auth-deep-types"
import styles from "./session-manager-panel.module.css"

export interface ActiveSession {
  /** Stable id. */
  id: string
  /** Friendly device label, e.g. "MacBook Pro · Chrome 138". */
  device: string
  /** OS hint, e.g. "macOS 15.4", "iOS 18.4". */
  os: string
  /** Geolocation hint, e.g. "Oak Flats NSW · 2528". */
  location: string
  /** Approximate IP — masked in render. */
  ipMasked: string
  /** Last activity (ISO). */
  lastActiveIso: string
  /** Risk classification. */
  risk: SessionRiskTone
  /** True when this is the session the viewer is on. */
  isCurrent: boolean
}

export interface SessionManagerPanelProps {
  /** Display owner, e.g. "Mick Davies — admin". */
  ownerLabel: string
  /** Tenant context label. */
  tenantLabel: string
  /** Active sessions, latest first. */
  sessions: ReadonlyArray<ActiveSession>
  /** Fires when single session revoked. */
  onRevoke?: (id: string) => void
  /** Fires when sign-out everywhere clicked. */
  onRevokeAll?: () => void
}

const RISK_LABEL: Record<SessionRiskTone, string> = {
  trusted: "Trusted",
  watchlist: "Watchlist",
  blocked: "Blocked",
}

function formatRelative(iso: string): string {
  const diff = Date.now() - new Date(iso).getTime()
  const mins = Math.floor(diff / 60_000)
  if (mins < 1) return "Active now"
  if (mins < 60) return `${mins}m ago`
  const hrs = Math.floor(mins / 60)
  if (hrs < 24) return `${hrs}h ago`
  const days = Math.floor(hrs / 24)
  return `${days}d ago`
}

export function SessionManagerPanel({
  ownerLabel,
  tenantLabel,
  sessions,
  onRevoke,
  onRevokeAll,
}: SessionManagerPanelProps) {
  const watchCount = sessions.filter((s) => s.risk === "watchlist").length

  return (
    <section
      className={styles.wrap}
      aria-label={`Active sessions for ${ownerLabel}`}
    >
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>{tenantLabel} · Sessions</span>
          <h3 className={styles.title}>{ownerLabel}</h3>
        </div>
        <div className={styles.headMeta}>
          <Chip
            label={`${sessions.length} active`}
            tone={sessions.length > 0 ? "teal" : "neutral"}
          />
          {watchCount > 0 ? (
            <Chip label={`${watchCount} watchlisted`} tone="amber" />
          ) : null}
        </div>
      </header>

      <div className={styles.tableWrap} role="region" aria-labelledby="sessions-table-caption">
        <table className={styles.table}>
          <caption id="sessions-table-caption" className={styles.srOnly}>
            Active sessions for {ownerLabel} — revoke any device to force sign-out.
          </caption>
          <thead>
            <tr>
              <th scope="col">Device</th>
              <th scope="col">Location</th>
              <th scope="col">Last active</th>
              <th scope="col">Risk</th>
              <th scope="col" className={styles.actionCol}>
                <span className={styles.srOnly}>Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sessions.map((session) => (
              <tr key={session.id} className={styles.row} data-risk={session.risk}>
                <th scope="row" className={styles.deviceCell}>
                  <span className={styles.device}>
                    {session.device}
                    {session.isCurrent ? (
                      <span className={styles.currentBadge}>This device</span>
                    ) : null}
                  </span>
                  <span className={styles.os}>{session.os}</span>
                </th>
                <td className={styles.cell}>
                  <span className={styles.location}>{session.location}</span>
                  <span className={styles.ip}>{session.ipMasked}</span>
                </td>
                <td className={`${styles.cell} ${styles.numeric}`}>
                  {formatRelative(session.lastActiveIso)}
                </td>
                <td className={styles.cell}>
                  <Chip
                    label={RISK_LABEL[session.risk]}
                    tone={SESSION_RISK_TONE[session.risk]}
                  />
                </td>
                <td className={styles.actionCell}>
                  <button
                    type="button"
                    className={styles.revokeBtn}
                    onClick={() => onRevoke?.(session.id)}
                    disabled={session.isCurrent}
                    aria-label={`Revoke session on ${session.device}`}
                  >
                    Revoke
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className={styles.foot}>
        <button
          type="button"
          className={styles.revokeAllBtn}
          onClick={onRevokeAll}
          disabled={sessions.length <= 1}
          aria-label={`Sign out of ${Math.max(0, sessions.length - 1)} other sessions`}
        >
          Sign out everywhere else
        </button>
      </footer>
    </section>
  )
}

export default SessionManagerPanel
