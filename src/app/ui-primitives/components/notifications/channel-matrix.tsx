"use client"

import { useCallback, useState } from "react"

import styles from "./channel-matrix.module.css"

export type ChannelId = "email" | "sms" | "push" | "inapp" | "slack"
export type EventTypeId = string

export interface ChannelMatrixChannel {
  id: ChannelId
  label: string
}

export interface ChannelMatrixRow {
  id: EventTypeId
  label: string
}

export type ChannelMatrixValue = Record<EventTypeId, Record<ChannelId, boolean>>

interface ChannelMatrixProps {
  rows: ReadonlyArray<ChannelMatrixRow>
  channels: ReadonlyArray<ChannelMatrixChannel>
  defaultValue: ChannelMatrixValue
  onChange?: (value: ChannelMatrixValue) => void
  legend?: string
  className?: string
}

export function ChannelMatrix({
  rows,
  channels,
  defaultValue,
  onChange,
  legend = "Notification channels",
  className,
}: ChannelMatrixProps) {
  const [value, setValue] = useState<ChannelMatrixValue>(defaultValue)

  const toggle = useCallback(
    (rowId: EventTypeId, channelId: ChannelId) => {
      const row = value[rowId] ?? {}
      const next: ChannelMatrixValue = {
        ...value,
        [rowId]: { ...row, [channelId]: !row[channelId] } as Record<ChannelId, boolean>,
      }
      setValue(next)
      onChange?.(next)
    },
    [value, onChange],
  )

  const classes = [styles.matrix, className].filter(Boolean).join(" ")

  return (
    <fieldset className={classes}>
      <legend className={styles.legend}>{legend}</legend>
      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col" className={styles.rowHead} aria-label="Event type" />
              {channels.map((channel) => (
                <th key={channel.id} scope="col" className={styles.colHead}>
                  {channel.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className={styles.row}>
                <th scope="row" className={styles.rowHead}>
                  {row.label}
                </th>
                {channels.map((channel) => {
                  const on = Boolean(value[row.id]?.[channel.id])
                  return (
                    <td key={channel.id} className={styles.cell}>
                      <button
                        type="button"
                        className={styles.toggle}
                        data-tone={channel.id}
                        aria-pressed={on}
                        aria-label={`${row.label} via ${channel.label} ${on ? "on" : "off"}`}
                        onClick={() => toggle(row.id, channel.id)}
                      />
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </fieldset>
  )
}

export default ChannelMatrix
