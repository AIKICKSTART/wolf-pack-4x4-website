"use client"

import { useMemo, useState } from "react"

import type {
  ChannelMatrixCell,
  NotificationChannelId,
  NotificationChannelMeta,
  NotificationEventId,
  NotificationEventMeta,
} from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface PreferencePanelProps {
  events: ReadonlyArray<NotificationEventMeta>
  channels: ReadonlyArray<NotificationChannelMeta>
  initialValue: ReadonlyArray<ChannelMatrixCell>
  onChange?: (value: ReadonlyArray<ChannelMatrixCell>) => void
  className?: string
}

interface CellKey {
  event: NotificationEventId
  channel: NotificationChannelId
}

function cellId(key: CellKey): string {
  return `${key.event}::${key.channel}`
}

export function PreferencePanel({
  events,
  channels,
  initialValue,
  onChange,
  className,
}: PreferencePanelProps) {
  const [value, setValue] = useState<ReadonlyArray<ChannelMatrixCell>>(initialValue)

  const lookup = useMemo(() => {
    const map = new Map<string, boolean>()
    for (const cell of value) {
      map.set(cellId(cell), cell.enabled)
    }
    return map
  }, [value])

  const toggle = (event: NotificationEventId, channel: NotificationChannelId) => {
    const id = cellId({ event, channel })
    const current = lookup.get(id) ?? false
    const next: ChannelMatrixCell[] = []
    let touched = false
    for (const cell of value) {
      if (cellId(cell) === id) {
        next.push({ ...cell, enabled: !current })
        touched = true
      } else {
        next.push(cell)
      }
    }
    if (!touched) {
      next.push({ event, channel, enabled: !current })
    }
    setValue(next)
    onChange?.(next)
  }

  const classes = [styles.prefPanel, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Notification preferences">
      <header className={styles.prefHead}>
        <p className={styles.prefKicker}>Preferences · Channel matrix</p>
        <p className={styles.prefHelp}>
          Per-event routing — toggle which channel delivers each workshop signal.
        </p>
      </header>

      <div className={styles.prefScroll}>
        <table className={styles.prefTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.prefRowHead}>
                Event
              </th>
              {channels.map((channel) => (
                <th key={channel.id} scope="col" className={styles.prefColHead}>
                  <span className={styles.prefColLabel}>{channel.label}</span>
                  <span className={styles.prefColHint}>{channel.hint}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id}>
                <th scope="row" className={styles.prefRowLabel}>
                  <span className={styles.prefRowTitle}>{event.label}</span>
                  <span className={styles.prefRowHint}>{event.description}</span>
                </th>
                {channels.map((channel) => {
                  const checked = lookup.get(cellId({ event: event.id, channel: channel.id })) ?? false
                  const ariaLabel = `${event.label} via ${channel.label}`
                  return (
                    <td key={channel.id} className={styles.prefCell}>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={checked}
                        aria-label={ariaLabel}
                        className={[
                          styles.prefSwitch,
                          checked ? styles.prefSwitchOn : "",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        onClick={() => toggle(event.id, channel.id)}
                      >
                        <span className={styles.prefSwitchKnob} aria-hidden="true" />
                      </button>
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export default PreferencePanel
