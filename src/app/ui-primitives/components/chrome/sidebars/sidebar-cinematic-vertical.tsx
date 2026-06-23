import Image from "next/image"
import Link from "next/link"
import type { ComponentType } from "react"

import type { IconProps } from "../../icons"
import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  CompassRoseIcon,
  MufflerIcon,
  PhoneRingIcon,
  ShieldTickIcon,
  SignalPulseIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import type { ChromeBrandConfig } from "../chrome-types"

import styles from "./sidebar-cinematic-vertical.module.css"

export type SidebarCinematicVerticalKind =
  | "home"
  | "workshop"
  | "catalog"
  | "performance"
  | "motorsport"
  | "trade"
  | "contact"
  | "shield"

export interface SidebarCinematicVerticalItem {
  id: string
  label: string
  href: string
  kind: SidebarCinematicVerticalKind
  isActive?: boolean
}

export interface SidebarCinematicVerticalProps {
  brand: ChromeBrandConfig
  items: ReadonlyArray<SidebarCinematicVerticalItem>
  /** Year line at the bottom (e.g. "EST. 1968"). */
  footerLabel: string
  layout?: "sticky" | "static"
  className?: string
}

const KIND_ICONS: Record<SidebarCinematicVerticalKind, ComponentType<IconProps>> = {
  home: CompassRoseIcon,
  workshop: SpannerIcon,
  catalog: MufflerIcon,
  performance: TachometerIcon,
  motorsport: CheckeredFlagIcon,
  trade: ClipboardCheckIcon,
  contact: PhoneRingIcon,
  shield: ShieldTickIcon,
}

export function SidebarCinematicVertical({
  brand,
  items,
  footerLabel,
  layout = "sticky",
  className,
}: SidebarCinematicVerticalProps) {
  const classes = [
    styles.sidebar,
    layout === "static" ? styles.sidebarStatic : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <nav
      role="navigation"
      aria-label="Cinematic vertical navigation"
      className={classes}
    >
      <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
        <Image
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={56}
          height={56}
        />
        <span className={styles.wordmark}>{brand.wordmark}</span>
      </Link>

      <div className={styles.nav}>
        {items.map((item) => {
          const Icon = KIND_ICONS[item.kind]
          return (
            <a
              key={item.id}
              href={item.href}
              className={[styles.item, item.isActive && styles.itemActive]
                .filter(Boolean)
                .join(" ")}
              aria-current={item.isActive ? "page" : undefined}
            >
              <Icon size={26} tone={item.isActive ? "red" : "currentColor"} />
              <span>{item.label}</span>
            </a>
          )
        })}
      </div>

      <div className={styles.footer}>
        <span className={styles.footerStatus} aria-label="Workshop online">
          <SignalPulseIcon size={18} tone="green" />
        </span>
        <span className={styles.footerYear}>{footerLabel}</span>
      </div>
    </nav>
  )
}

export default SidebarCinematicVertical
