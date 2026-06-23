"use client"

import { RefreshCw } from "lucide-react"

import {
  CHANNEL_CONNECTION_LABEL,
  CHANNEL_CONNECTION_TONE,
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  CHANNEL_TONE,
  type ChannelConnectionState,
  type UnifiedChannel,
} from "./unified-inbox-types"
import styles from "./channel-status-row.module.css"

export interface ChannelStatusEntry {
  channel: UnifiedChannel
  state: ChannelConnectionState
  /** Optional handle / page name, e.g. "Oak Flats Muffler Shop". */
  handle?: string
  /** Last successful sync, e.g. "9m ago". */
  lastSync?: string
  /** Triggered when the operator initiates a reconnect for this channel. */
  onReconnect?: () => void
}

interface ChannelStatusRowProps {
  channels: ReadonlyArray<ChannelStatusEntry>
  className?: string
}

export function ChannelStatusRow({
  channels,
  className,
}: ChannelStatusRowProps) {
  const classes = [styles.row, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Channel connection status">
      {channels.map((entry) => {
        const channelTone = CHANNEL_TONE[entry.channel]
        const stateTone = CHANNEL_CONNECTION_TONE[entry.state]
        const needsAttention =
          entry.state === "expired" || entry.state === "disconnected"
        return (
          <article
            key={`${entry.channel}-${entry.handle ?? "default"}`}
            className={[
              styles.card,
              styles[`channel_${channelTone}`],
              styles[`state_${stateTone}`],
              needsAttention ? styles.needsAttention : "",
            ]
              .filter(Boolean)
              .join(" ")}
            aria-label={`${CHANNEL_LABEL[entry.channel]} status: ${CHANNEL_CONNECTION_LABEL[entry.state]}`}
          >
            <header className={styles.head}>
              <span
                className={[styles.glyph, styles[`channel_${channelTone}`]]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden="true"
              >
                {CHANNEL_GLYPH[entry.channel]}
              </span>
              <span className={styles.identity}>
                <span className={styles.label}>
                  {CHANNEL_LABEL[entry.channel]}
                </span>
                {entry.handle ? (
                  <span className={styles.handle}>{entry.handle}</span>
                ) : null}
              </span>
            </header>

            <div className={styles.meta}>
              <span
                className={[styles.stateChip, styles[`state_${stateTone}`]]
                  .filter(Boolean)
                  .join(" ")}
              >
                <span
                  className={styles.stateDot}
                  aria-hidden="true"
                  data-pulse={
                    entry.state === "connected" ? "true" : undefined
                  }
                />
                {CHANNEL_CONNECTION_LABEL[entry.state]}
              </span>
              {entry.lastSync ? (
                <span className={styles.sync}>Last sync · {entry.lastSync}</span>
              ) : null}
            </div>

            {needsAttention && entry.onReconnect ? (
              <button
                type="button"
                className={styles.reconnectBtn}
                onClick={entry.onReconnect}
              >
                <RefreshCw size={12} strokeWidth={2.4} aria-hidden="true" />
                <span>Reconnect</span>
              </button>
            ) : null}
          </article>
        )
      })}
    </section>
  )
}

export default ChannelStatusRow
