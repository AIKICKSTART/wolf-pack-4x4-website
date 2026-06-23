"use client"

import {
  ClipboardCheckIcon,
  CompassRoseIcon,
  MufflerIcon,
  PhoneRingIcon,
  RatchetIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { GlassSurface } from "../../surfaces/glass-surface"
import type { ComponentType } from "react"
import type { IconProps } from "../../icons"

import styles from "./dock-bottom-glass.module.css"

export type DockBottomGlassActionKind =
  | "home"
  | "search"
  | "quote"
  | "phone"
  | "tools"
  | "catalog"
  | "dashboard"
  | "performance"

export interface DockBottomGlassAction {
  id: string
  label: string
  kind: DockBottomGlassActionKind
  onClick: () => void
  isActive?: boolean
  badge?: number
}

export interface DockBottomGlassProps {
  actions: ReadonlyArray<DockBottomGlassAction>
  /** Position fixed bottom-center (default), or render in-flow for previews. */
  layout?: "fixed" | "static"
  className?: string
}

const KIND_ICONS: Record<DockBottomGlassActionKind, ComponentType<IconProps>> = {
  home: CompassRoseIcon,
  search: RatchetIcon,
  quote: ClipboardCheckIcon,
  phone: PhoneRingIcon,
  tools: SpannerIcon,
  catalog: MufflerIcon,
  dashboard: ClipboardCheckIcon,
  performance: TachometerIcon,
}

export function DockBottomGlass({
  actions,
  layout = "fixed",
  className,
}: DockBottomGlassProps) {
  const classes = [
    styles.dock,
    layout === "static" ? styles.dockStatic : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div role="toolbar" aria-label="Quick action dock" className={classes}>
      <GlassSurface
        tone="obsidian"
        intensity="high"
        className={styles.glassInner}
      >
        {actions.map((action, index) => {
          const Icon = KIND_ICONS[action.kind]
          const showDividerBefore = index > 0 && index === Math.floor(actions.length / 2)
          return (
            <span
              key={action.id}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              {showDividerBefore ? (
                <span className={styles.divider} aria-hidden="true" />
              ) : null}
              <button
                type="button"
                className={[styles.btn, action.isActive && styles.btnActive]
                  .filter(Boolean)
                  .join(" ")}
                onClick={action.onClick}
                aria-label={action.label}
                aria-pressed={action.isActive ? true : undefined}
              >
                <Icon size={22} tone="currentColor" />
                {action.badge && action.badge > 0 ? (
                  <span className={styles.badge} aria-hidden="true">
                    {action.badge > 9 ? "9+" : action.badge}
                  </span>
                ) : null}
                <span className={styles.tooltip} role="tooltip">
                  {action.label}
                </span>
              </button>
            </span>
          )
        })}
      </GlassSurface>
    </div>
  )
}

export default DockBottomGlass
