"use client"

import type { ComponentType } from "react"
import { useLayoutEffect, useRef, useState } from "react"

import type { IconProps } from "../../icons"
import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  CompassRoseIcon,
  MufflerIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { NeuoSurface } from "../../surfaces/neuo-surface"

import styles from "./dock-tab-rail.module.css"

export type DockTabRailKind =
  | "home"
  | "workshop"
  | "catalog"
  | "performance"
  | "trade"
  | "motorsport"

export interface DockTabRailItem {
  id: string
  label: string
  kind: DockTabRailKind
  subtitle?: string
  badge?: number
}

export interface DockTabRailProps {
  items: ReadonlyArray<DockTabRailItem>
  activeId: string
  onSelect: (id: string) => void
  /** Render as a fixed floating rail (default) or inline. */
  layout?: "floating" | "inline"
  className?: string
}

const KIND_ICONS: Record<DockTabRailKind, ComponentType<IconProps>> = {
  home: CompassRoseIcon,
  workshop: SpannerIcon,
  catalog: MufflerIcon,
  performance: TachometerIcon,
  trade: ClipboardCheckIcon,
  motorsport: CheckeredFlagIcon,
}

export function DockTabRail({
  items,
  activeId,
  onSelect,
  layout = "floating",
  className,
}: DockTabRailProps) {
  const listRef = useRef<HTMLUListElement | null>(null)
  const [indicator, setIndicator] = useState<{ left: number; width: number } | null>(null)

  useLayoutEffect(() => {
    const list = listRef.current
    if (!list) {
      return
    }
    const activeIndex = items.findIndex((item) => item.id === activeId)
    if (activeIndex < 0) {
      return
    }
    const target = list.querySelectorAll<HTMLLIElement>("li")[activeIndex]
    if (!target) {
      return
    }
    const listRect = list.getBoundingClientRect()
    const targetRect = target.getBoundingClientRect()
    setIndicator({
      left: targetRect.left - listRect.left,
      width: targetRect.width,
    })
  }, [activeId, items])

  const classes = [
    styles.dock,
    layout === "floating" ? styles.dockFloating : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <NeuoSurface tone="ash" className={classes}>
      <div role="toolbar" aria-label="App tab rail">
        <ul className={styles.list} ref={listRef}>
          <span
            className={styles.indicator}
            aria-hidden="true"
            style={
              indicator
                ? {
                    transform: `translateX(${indicator.left - 6}px)`,
                    width: indicator.width,
                  }
                : undefined
            }
          />
          {items.map((item) => {
            const isActive = item.id === activeId
            const Icon = KIND_ICONS[item.kind]
            return (
              <li key={item.id} className={styles.listItem}>
                <button
                  type="button"
                  className={[styles.tab, isActive && styles.tabActive]
                    .filter(Boolean)
                    .join(" ")}
                  onClick={() => onSelect(item.id)}
                  aria-pressed={isActive}
                >
                  <Icon size={20} tone={isActive ? "red" : "currentColor"} />
                  {item.label}
                  {item.badge && item.badge > 0 ? (
                    <span className={styles.badge} aria-hidden="true">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  ) : null}
                  {item.subtitle ? (
                    <span className={styles.subtitle} role="tooltip">
                      {item.subtitle}
                    </span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </NeuoSurface>
  )
}

export default DockTabRail
