"use client"

import { useMemo, useState, type ReactNode } from "react"

import {
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  CHANNEL_TONE,
  type SupportChannel,
  type SupportTone,
} from "./support-types"
import styles from "./multi-channel-inbox.module.css"

export interface MultiChannelInboxTab {
  channel: SupportChannel
  count: number
}

export interface MultiChannelInboxFilter {
  id: string
  label: string
  /** True when filter is active. */
  active?: boolean
}

export interface MultiChannelInboxProps {
  tabs: ReadonlyArray<MultiChannelInboxTab>
  /** Initial active tab. */
  initialChannel?: SupportChannel
  filters?: ReadonlyArray<MultiChannelInboxFilter>
  /** Children render the ticket list pane. */
  children: ReactNode
  className?: string
}

const TONE_CLASS: Record<SupportTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
  violet: styles.toneViolet,
}

export function MultiChannelInbox({
  tabs,
  initialChannel,
  filters = [],
  children,
  className,
}: MultiChannelInboxProps) {
  const [activeChannel, setActiveChannel] = useState<SupportChannel>(
    initialChannel ?? tabs[0]?.channel ?? "email",
  )
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>(
    () => {
      const initial: Record<string, boolean> = {}
      filters.forEach((f) => {
        if (f.active) initial[f.id] = true
      })
      return initial
    },
  )

  const totalOpen = useMemo(
    () => tabs.reduce((sum, tab) => sum + tab.count, 0),
    [tabs],
  )

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const classes = [styles.inbox, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-label={`Unified inbox — ${totalOpen} open across ${tabs.length} channels`}
    >
      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Channels"
      >
        {tabs.map((tab) => {
          const tone = CHANNEL_TONE[tab.channel]
          const selected = tab.channel === activeChannel
          return (
            <button
              key={tab.channel}
              type="button"
              role="tab"
              aria-selected={selected}
              tabIndex={selected ? 0 : -1}
              className={[
                styles.tab,
                TONE_CLASS[tone],
                selected ? styles.tabActive : "",
              ].join(" ")}
              onClick={() => setActiveChannel(tab.channel)}
            >
              <span className={styles.tabGlyph} aria-hidden="true">
                {CHANNEL_GLYPH[tab.channel]}
              </span>
              <span className={styles.tabLabel}>{CHANNEL_LABEL[tab.channel]}</span>
              <span className={styles.tabCount}>{tab.count}</span>
            </button>
          )
        })}
      </div>

      {filters.length > 0 ? (
        <div className={styles.filters} aria-label="Filters">
          {filters.map((filter) => {
            const active = activeFilters[filter.id] ?? false
            return (
              <button
                key={filter.id}
                type="button"
                className={[
                  styles.filterChip,
                  active ? styles.filterChipActive : "",
                ].join(" ")}
                aria-pressed={active}
                onClick={() => toggleFilter(filter.id)}
              >
                {filter.label}
              </button>
            )
          })}
        </div>
      ) : null}

      <div
        className={styles.pane}
        role="tabpanel"
        aria-label={`${CHANNEL_LABEL[activeChannel]} tickets`}
      >
        {children}
      </div>
    </section>
  )
}

export default MultiChannelInbox
