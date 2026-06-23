"use client"

import { useMemo, useState } from "react"

import { ChannelMatrix } from "../notifications/channel-matrix"
import type {
  ChannelMatrixChannel,
  ChannelMatrixRow,
  ChannelMatrixValue,
} from "../notifications/channel-matrix"
import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"

import styles from "./channel-mix-picker.module.css"
import { CHANNEL_LABEL, type ChannelKind } from "./marketing-campaigns-types"

export interface ChannelMixOption {
  kind: ChannelKind
  /** Cost per recipient (en-AU display, e.g. "$0.014"). */
  costLabel: string
  /** Reach factor 0-1. */
  reach: number
  /** Optional tone override for the cost chip. */
  costTone?: ChipTone
}

interface ChannelMixPickerProps {
  options: ReadonlyArray<ChannelMixOption>
  /** Pre-selected channels. */
  defaultActive?: ReadonlyArray<ChannelKind>
  /** Optional event types for the included matrix below the toggles. */
  matrixRows?: ReadonlyArray<ChannelMatrixRow>
  className?: string
}

const REACH_TONE = (reach: number): ChipTone => {
  if (reach >= 0.7) return "green"
  if (reach >= 0.4) return "teal"
  return "amber"
}

function formatReach(reach: number): string {
  return `${Math.round(reach * 100)}%`
}

export function ChannelMixPicker({
  options,
  defaultActive = ["email", "sms"],
  matrixRows,
  className,
}: ChannelMixPickerProps) {
  const [active, setActive] = useState<Set<ChannelKind>>(
    () => new Set(defaultActive),
  )
  const classes = [styles.wrapper, className].filter(Boolean).join(" ")

  const matrixChannels = useMemo<ChannelMatrixChannel[]>(() => {
    const toMatrixId: Record<ChannelKind, ChannelMatrixChannel["id"]> = {
      email: "email",
      sms: "sms",
      push: "push",
      inapp: "inapp",
      banner: "slack", // map non-existent to closest matrix toggle
      social: "slack",
    }
    return options
      .filter((opt) => active.has(opt.kind))
      .map((opt) => ({
        id: toMatrixId[opt.kind],
        label: CHANNEL_LABEL[opt.kind],
      }))
  }, [options, active])

  const matrixDefault = useMemo<ChannelMatrixValue>(() => {
    const out: ChannelMatrixValue = {}
    if (!matrixRows) return out
    for (const row of matrixRows) {
      out[row.id] = {
        email: true,
        sms: false,
        push: false,
        inapp: false,
        slack: false,
      }
    }
    return out
  }, [matrixRows])

  const toggle = (kind: ChannelKind) => {
    setActive((prev) => {
      const next = new Set(prev)
      if (next.has(kind)) {
        next.delete(kind)
      } else {
        next.add(kind)
      }
      return next
    })
  }

  return (
    <section
      className={classes}
      role="region"
      aria-label="Channel mix picker"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Channel mix</span>
        <span className={styles.count}>
          {active.size} of {options.length} active
        </span>
      </header>

      <ul className={styles.channelList}>
        {options.map((opt) => {
          const selected = active.has(opt.kind)
          return (
            <li key={opt.kind} className={styles.channelRow}>
              <button
                type="button"
                className={styles.channelToggle}
                aria-pressed={selected}
                data-tone={opt.kind}
                onClick={() => toggle(opt.kind)}
              >
                <span className={styles.channelDot} aria-hidden="true" />
                <span className={styles.channelLabel}>
                  {CHANNEL_LABEL[opt.kind]}
                </span>
              </button>
              <div className={styles.metaChips}>
                <Chip
                  label={`Cost · ${opt.costLabel}`}
                  tone={opt.costTone ?? "neutral"}
                />
                <Chip
                  label={`Reach · ${formatReach(opt.reach)}`}
                  tone={REACH_TONE(opt.reach)}
                />
              </div>
            </li>
          )
        })}
      </ul>

      {matrixRows && matrixChannels.length > 0 ? (
        <div className={styles.matrixWrap}>
          <ChannelMatrix
            rows={matrixRows}
            channels={matrixChannels}
            defaultValue={matrixDefault}
            legend="Per-event channel routing"
          />
        </div>
      ) : null}
    </section>
  )
}

export default ChannelMixPicker
