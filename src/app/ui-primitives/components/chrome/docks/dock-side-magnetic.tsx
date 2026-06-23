"use client"

import type { ComponentType } from "react"
import { Fragment } from "react"

import type { IconProps } from "../../icons"
import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  CompassRoseIcon,
  EnvelopeTrailIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  RatchetIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { Magnetic } from "../../motion/magnetic"

import styles from "./dock-side-magnetic.module.css"

export type DockSideMagneticKind =
  | "home"
  | "catalog"
  | "tools"
  | "performance"
  | "quote"
  | "phone"
  | "email"
  | "motorsport"
  | "compass"
  | "search"
  | "exhaust"

export interface DockSideMagneticAction {
  id: string
  label: string
  kind: DockSideMagneticKind
  onClick: () => void
  badge?: number
  isActive?: boolean
}

export interface DockSideMagneticProps {
  actions: ReadonlyArray<DockSideMagneticAction>
  /** Inject a separator after this 0-based index. */
  dividerAfter?: number
  /** Position fixed right-center (default), or render in-flow for previews. */
  layout?: "fixed" | "static"
  className?: string
}

const KIND_ICONS: Record<DockSideMagneticKind, ComponentType<IconProps>> = {
  home: CompassRoseIcon,
  catalog: MufflerIcon,
  tools: SpannerIcon,
  performance: TachometerIcon,
  quote: ClipboardCheckIcon,
  phone: PhoneRingIcon,
  email: EnvelopeTrailIcon,
  motorsport: CheckeredFlagIcon,
  compass: CompassRoseIcon,
  search: RatchetIcon,
  exhaust: ExhaustPipeIcon,
}

export function DockSideMagnetic({
  actions,
  dividerAfter,
  layout = "fixed",
  className,
}: DockSideMagneticProps) {
  const classes = [
    styles.dock,
    layout === "static" ? styles.dockStatic : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <nav
      role="toolbar"
      aria-orientation="vertical"
      aria-label="Side action dock"
      className={classes}
    >
      {actions.map((action, index) => {
        const Icon = KIND_ICONS[action.kind]
        return (
          <Fragment key={action.id}>
            <div className={styles.row}>
              <Magnetic strength={10} stiffness={300} damping={20}>
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
                </button>
              </Magnetic>
              <span className={styles.label} aria-hidden="true">
                {action.label}
              </span>
            </div>
            {dividerAfter !== undefined && index === dividerAfter ? (
              <span className={styles.dividerY} aria-hidden="true" />
            ) : null}
          </Fragment>
        )
      })}
    </nav>
  )
}

export default DockSideMagnetic
