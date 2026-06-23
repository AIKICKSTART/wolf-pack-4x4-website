import Image from "next/image"
import Link from "next/link"
import type { ComponentType } from "react"

import type { IconProps } from "../../icons"
import {
  ClipboardCheckIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  RatchetIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { GlassSurface } from "../../surfaces/glass-surface"
import { Avatar } from "../../primitives/avatar"
import type { ChromeBrandConfig } from "../chrome-types"

import styles from "./sidebar-glass-compact.module.css"

export type SidebarGlassCompactKind =
  | "home"
  | "workshop"
  | "catalog"
  | "performance"
  | "quote"
  | "search"
  | "phone"
  | "exhaust"

export interface SidebarGlassCompactItem {
  id: string
  label: string
  href: string
  kind: SidebarGlassCompactKind
  isActive?: boolean
  badge?: number
}

export interface SidebarGlassCompactProps {
  brand: ChromeBrandConfig
  items: ReadonlyArray<SidebarGlassCompactItem>
  /** Inject a separator after this 0-based index. */
  dividerAfter?: number
  /** User info rendered at the bottom of the sidebar. */
  user?: { name: string }
  layout?: "sticky" | "static"
  className?: string
}

const KIND_ICONS: Record<SidebarGlassCompactKind, ComponentType<IconProps>> = {
  home: CompassRoseIcon,
  workshop: SpannerIcon,
  catalog: MufflerIcon,
  performance: TachometerIcon,
  quote: ClipboardCheckIcon,
  search: RatchetIcon,
  phone: PhoneRingIcon,
  exhaust: ExhaustPipeIcon,
}

export function SidebarGlassCompact({
  brand,
  items,
  dividerAfter,
  user,
  layout = "sticky",
  className,
}: SidebarGlassCompactProps) {
  const classes = [
    styles.sidebar,
    layout === "static" ? styles.sidebarStatic : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <GlassSurface tone="obsidian" intensity="high" className={classes}>
      <nav role="navigation" aria-label="Glass compact navigation">
        <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={42}
            height={42}
          />
        </Link>

        <div className={styles.nav}>
          {items.map((item, index) => {
            const Icon = KIND_ICONS[item.kind]
            return (
              <span key={item.id}>
                <a
                  href={item.href}
                  className={[styles.item, item.isActive && styles.itemActive]
                    .filter(Boolean)
                    .join(" ")}
                  aria-current={item.isActive ? "page" : undefined}
                  aria-label={item.label}
                >
                  <Icon size={22} tone={item.isActive ? "currentColor" : "currentColor"} />
                  {item.badge && item.badge > 0 ? (
                    <span className={styles.badge} aria-hidden="true">
                      {item.badge > 9 ? "9+" : item.badge}
                    </span>
                  ) : null}
                  <span className={styles.label} role="tooltip">
                    {item.label}
                  </span>
                </a>
                {dividerAfter !== undefined && index === dividerAfter ? (
                  <span className={styles.divider} aria-hidden="true" />
                ) : null}
              </span>
            )
          })}
        </div>

        <div className={styles.footer}>
          {user ? (
            <Avatar
              name={user.name}
              size="md"
              tone="amber"
              status="online"
            />
          ) : (
            <span className={styles.avatar} aria-hidden="true">
              OFM
            </span>
          )}
        </div>
      </nav>
    </GlassSurface>
  )
}

export default SidebarGlassCompact
