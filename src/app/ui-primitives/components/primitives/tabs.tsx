"use client"

import { useRef, type KeyboardEvent, type ReactNode } from "react"

import styles from "./tabs.module.css"

/**
 * Tabs — controlled ARIA tablist of triggers (the caller owns the panels).
 *
 * Carbon & Red shared-DNA tab control used across hub pages. Renders a
 * `role="tablist"` of `role="tab"` triggers with roving tabindex and full
 * arrow-key navigation (Left/Right/Home/End). It does NOT render panels —
 * wire `value`/`onValueChange` to your own content and point each panel's
 * `aria-labelledby` at `${idBase}-tab-${id}`.
 *
 * Variants: `underline` (active bottom rule in --primitive-red),
 * `pill` and `segmented` (active rides the metallic button surface).
 *
 * @example
 * const [tab, setTab] = useState("overview")
 * <Tabs
 *   items={[
 *     { id: "overview", label: "Overview", icon: <LayoutGrid /> },
 *     { id: "activity", label: "Activity", badge: 12 },
 *     { id: "archived", label: "Archived", disabled: true },
 *   ]}
 *   value={tab}
 *   onValueChange={setTab}
 *   variant="segmented"
 * />
 * <section role="tabpanel" aria-labelledby="tabs-tab-overview">…</section>
 */

export type TabsVariant = "underline" | "pill" | "segmented"
export type TabsSize = "sm" | "md" | "lg"

export interface TabItem {
  id: string
  label: string
  icon?: ReactNode
  badge?: ReactNode
  disabled?: boolean
}

interface TabsProps {
  items: TabItem[]
  value: string
  onValueChange: (id: string) => void
  variant?: TabsVariant
  size?: TabsSize
  fullWidth?: boolean
  /** Stable prefix for generated tab ids (point panel aria-labelledby here). */
  idBase?: string
  /** Accessible name for the tablist. */
  ariaLabel?: string
  className?: string
}

const VARIANT_CLASS: Record<TabsVariant, string> = {
  underline: styles.variantUnderline,
  pill: styles.variantPill,
  segmented: styles.variantSegmented,
}

const SIZE_CLASS: Record<TabsSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

function nextEnabledIndex(items: TabItem[], from: number, step: number): number {
  const count = items.length
  let index = from
  for (let i = 0; i < count; i += 1) {
    index = (index + step + count) % count
    if (!items[index]?.disabled) {
      return index
    }
  }
  return from
}

function edgeEnabledIndex(items: TabItem[], step: number): number {
  const start = step > 0 ? -1 : items.length
  return nextEnabledIndex(items, start, step)
}

export function Tabs({
  items,
  value,
  onValueChange,
  variant = "underline",
  size = "md",
  fullWidth = false,
  idBase = "tabs",
  ariaLabel,
  className,
}: TabsProps) {
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  const classes = [
    styles.root,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth && styles.fullWidth,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const activeIndex = items.findIndex((item) => item.id === value)
  const focusIndex = activeIndex >= 0 ? activeIndex : edgeEnabledIndex(items, 1)

  const moveTo = (index: number) => {
    const item = items[index]
    if (!item || item.disabled) {
      return
    }
    tabRefs.current[index]?.focus()
    onValueChange(item.id)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault()
        moveTo(nextEnabledIndex(items, index, 1))
        break
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault()
        moveTo(nextEnabledIndex(items, index, -1))
        break
      case "Home":
        event.preventDefault()
        moveTo(edgeEnabledIndex(items, 1))
        break
      case "End":
        event.preventDefault()
        moveTo(edgeEnabledIndex(items, -1))
        break
      default:
        break
    }
  }

  return (
    <div
      className={classes}
      role="tablist"
      aria-label={ariaLabel}
      aria-orientation="horizontal"
    >
      {items.map((item, index) => {
        const isActive = item.id === value
        const tabId = `${idBase}-tab-${item.id}`
        return (
          <button
            key={item.id}
            ref={(node) => {
              tabRefs.current[index] = node
            }}
            type="button"
            id={tabId}
            role="tab"
            className={[styles.tab, isActive && styles.tabActive].filter(Boolean).join(" ")}
            aria-selected={isActive}
            aria-controls={`${idBase}-panel-${item.id}`}
            tabIndex={index === focusIndex && !item.disabled ? 0 : -1}
            disabled={item.disabled}
            onClick={() => !item.disabled && onValueChange(item.id)}
            onKeyDown={(event) => handleKeyDown(event, index)}
          >
            {item.icon && (
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
            )}
            <span className={styles.label}>{item.label}</span>
            {item.badge != null && item.badge !== false && (
              <span className={styles.badge}>{item.badge}</span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export default Tabs
