"use client"

import { cloneElement, isValidElement, useId } from "react"
import type { CSSProperties, ReactElement, ReactNode } from "react"

import styles from "./tooltip.module.css"

/**
 * Tooltip — Carbon & Red shared-DNA primitive.
 *
 * A CSS-driven label that reveals on hover AND focus-within of its single
 * trigger child. No portal, no JS positioning: the reveal is pure CSS
 * (opacity + translate on a token duration), the bubble is `pointer-events:
 * none`, and a small arrow points back at the trigger. The trigger receives
 * `aria-describedby` pointing at the tooltip (`role="tooltip"`), so screen
 * readers and keyboard users get the same affordance as pointer users.
 *
 * @example
 * ```tsx
 * <Tooltip label="Re-run the diagnostic" placement="top">
 *   <IconButton aria-label="Re-run" icon={<RotateCw />} />
 * </Tooltip>
 *
 * <Tooltip label={<span>Torque: <strong>184 Nm</strong></span>} placement="right" delay={300}>
 *   <button type="button">Specs</button>
 * </Tooltip>
 * ```
 */

export type TooltipPlacement = "top" | "bottom" | "left" | "right"

interface TooltipProps {
  /** Tooltip content. Plain string or rich ReactNode. */
  label: string | ReactNode
  /** Single focusable/hoverable trigger element. */
  children: ReactElement
  /** Side the bubble appears on relative to the trigger. */
  placement?: TooltipPlacement
  /** Reveal delay in ms (CSS transition-delay). Defaults to 0. */
  delay?: number
  className?: string
}

const PLACEMENT_CLASS: Record<TooltipPlacement, string> = {
  top: styles.top,
  bottom: styles.bottom,
  left: styles.left,
  right: styles.right,
}

export function Tooltip({
  label,
  children,
  placement = "top",
  delay,
  className,
}: TooltipProps) {
  const tooltipId = useId()

  const classes = [styles.root, PLACEMENT_CLASS[placement], className]
    .filter(Boolean)
    .join(" ")

  // Merge our describedby onto the trigger without clobbering an existing one.
  const trigger = isValidElement(children)
    ? cloneElement(children as ReactElement<{ "aria-describedby"?: string }>, {
        "aria-describedby": [
          (children.props as { "aria-describedby"?: string })["aria-describedby"],
          tooltipId,
        ]
          .filter(Boolean)
          .join(" "),
      })
    : children

  return (
    <span
      className={classes}
      style={{ "--tooltip-delay": `${delay ?? 0}ms` } as CSSProperties}
    >
      {trigger}
      <span className={styles.bubble} id={tooltipId} role="tooltip">
        <span className={styles.surface}>{label}</span>
        <span className={styles.arrow} aria-hidden="true" />
      </span>
    </span>
  )
}

export default Tooltip
