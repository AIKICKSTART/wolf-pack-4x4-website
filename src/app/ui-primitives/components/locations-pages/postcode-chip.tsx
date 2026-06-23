"use client"

import { Chip } from "../primitives/chip"
import { Popover } from "../primitives/popover"

import type { SuburbState } from "./locations-pages-types"

import styles from "./postcode-chip.module.css"

export interface PostcodeChipProps {
  postcode: string
  state: SuburbState
  /** Local Government Area name — shown in the popover. */
  lga: string
  /** Optional short suburb label for screen readers. */
  ariaSuburbLabel?: string
  className?: string
}

/**
 * Postcode chip — adapter over `primitives/Chip` + `primitives/Popover`.
 *
 * The Chip carries the postcode value with the amber tone, and the
 * Popover surfaces state + LGA when the trigger is hovered or focused.
 */
export function PostcodeChip({
  postcode,
  state,
  lga,
  ariaSuburbLabel,
  className,
}: PostcodeChipProps) {
  const triggerLabel = ariaSuburbLabel
    ? `Postcode ${postcode}, ${ariaSuburbLabel}`
    : `Postcode ${postcode}`

  const trigger = (
    <span className={styles.trigger}>
      <Chip label={`${postcode}`} tone="amber" />
    </span>
  )

  return (
    <span className={[styles.wrap, className].filter(Boolean).join(" ")}>
      <Popover trigger={trigger} placement="top" align="center">
        <div className={styles.popover} aria-label={triggerLabel}>
          <span className={styles.popoverRow}>
            <span className={styles.popoverLabel}>State</span>
            <span className={styles.popoverValue}>{state}</span>
          </span>
          <span className={styles.popoverRow}>
            <span className={styles.popoverLabel}>LGA</span>
            <span className={styles.popoverValue}>{lga}</span>
          </span>
        </div>
      </Popover>
    </span>
  )
}

export default PostcodeChip
