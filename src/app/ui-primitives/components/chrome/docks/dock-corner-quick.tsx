"use client"

import {
  CompassRoseIcon,
  PhoneRingIcon,
  RatchetIcon,
  SpannerIcon,
} from "../../icons"
import { Reveal } from "../../motion/reveal"
import { Chip } from "../../primitives/chip"

import styles from "./dock-corner-quick.module.css"

export interface DockCornerQuickProps {
  /** Primary composer FAB click handler. */
  onComposeClick: () => void
  /** Live chat trigger. */
  onChatClick: () => void
  /** Back-to-top scroll handler. */
  onScrollTopClick?: () => void
  /** Theme toggle handler. */
  onThemeToggleClick?: () => void
  /** Numeric badge for the chat satellite. */
  chatBadge?: number
  /** Show a quick floating chip describing the dock. Defaults to null. */
  hintLabel?: string
  /** Position fixed bottom-right (default), or render in-flow for previews. */
  layout?: "fixed" | "static"
  className?: string
}

export function DockCornerQuick({
  onComposeClick,
  onChatClick,
  onScrollTopClick,
  onThemeToggleClick,
  chatBadge = 0,
  hintLabel,
  layout = "fixed",
  className,
}: DockCornerQuickProps) {
  const classes = [
    styles.dock,
    layout === "static" ? styles.dockStatic : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <Reveal as="div" from="below" distance={16}>
      <div role="toolbar" aria-label="Corner quick actions" className={classes}>
        <div className={styles.satellites}>
          {hintLabel ? (
            <Chip label={hintLabel} tone="amber" />
          ) : null}

          <button
            type="button"
            className={styles.satellite}
            onClick={onChatClick}
            aria-label="Open chat"
          >
            <PhoneRingIcon size={18} tone="currentColor" />
            {chatBadge > 0 ? (
              <span className={styles.badge} aria-hidden="true">
                {chatBadge > 9 ? "9+" : chatBadge}
              </span>
            ) : null}
            <span className={styles.tooltip} role="tooltip">
              Live chat
            </span>
          </button>

          {onScrollTopClick ? (
            <button
              type="button"
              className={styles.satellite}
              onClick={onScrollTopClick}
              aria-label="Back to top"
            >
              <CompassRoseIcon size={18} tone="currentColor" />
              <span className={styles.tooltip} role="tooltip">
                Back to top
              </span>
            </button>
          ) : null}

          {onThemeToggleClick ? (
            <button
              type="button"
              className={styles.satellite}
              onClick={onThemeToggleClick}
              aria-label="Toggle theme"
            >
              <RatchetIcon size={18} tone="currentColor" />
              <span className={styles.tooltip} role="tooltip">
                Theme
              </span>
            </button>
          ) : null}
        </div>

        <button
          type="button"
          className={styles.fab}
          onClick={onComposeClick}
          aria-label="Open composer"
        >
          <SpannerIcon size={28} tone="currentColor" />
          <span className={styles.tooltip} role="tooltip">
            Compose
          </span>
        </button>

      </div>
    </Reveal>
  )
}

export default DockCornerQuick
