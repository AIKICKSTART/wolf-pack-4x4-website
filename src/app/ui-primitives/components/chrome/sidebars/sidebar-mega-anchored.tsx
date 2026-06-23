"use client"

import { ChevronRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, type ComponentType } from "react"

import type { IconProps } from "../../icons"
import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  RatchetIcon,
  ShieldTickIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { Kbd } from "../../primitives/kbd"
import type { ChromeBrandConfig } from "../chrome-types"

import styles from "./sidebar-mega-anchored.module.css"

export type SidebarMegaAnchoredKind =
  | "home"
  | "workshop"
  | "catalog"
  | "performance"
  | "trade"
  | "motorsport"
  | "exhaust"
  | "phone"
  | "shield"

export interface SidebarMegaAnchoredItem {
  id: string
  label: string
  href: string
  kind: SidebarMegaAnchoredKind
  badge?: string
  isActive?: boolean
}

export interface SidebarMegaAnchoredGroup {
  id: string
  heading: string
  items: ReadonlyArray<SidebarMegaAnchoredItem>
  initiallyOpen?: boolean
}

export interface SidebarMegaAnchoredProps {
  brand: ChromeBrandConfig
  groups: ReadonlyArray<SidebarMegaAnchoredGroup>
  /** Optional bottom-card metadata (e.g. user name + workshop). */
  footerCard?: { title: string; subtitle: string }
  onOpenSearch?: () => void
  layout?: "sticky" | "static"
  className?: string
}

const KIND_ICONS: Record<SidebarMegaAnchoredKind, ComponentType<IconProps>> = {
  home: CompassRoseIcon,
  workshop: SpannerIcon,
  catalog: MufflerIcon,
  performance: TachometerIcon,
  trade: ClipboardCheckIcon,
  motorsport: CheckeredFlagIcon,
  exhaust: ExhaustPipeIcon,
  phone: PhoneRingIcon,
  shield: ShieldTickIcon,
}

export function SidebarMegaAnchored({
  brand,
  groups,
  footerCard,
  onOpenSearch,
  layout = "sticky",
  className,
}: SidebarMegaAnchoredProps) {
  const [openIds, setOpenIds] = useState<Set<string>>(() => {
    const set = new Set<string>()
    for (const group of groups) {
      if (group.initiallyOpen !== false) {
        set.add(group.id)
      }
    }
    return set
  })

  const toggleGroup = (id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const classes = [
    styles.sidebar,
    layout === "static" ? styles.sidebarStatic : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <nav role="navigation" aria-label="Mega anchored navigation" className={classes}>
      <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
        <Image src={brand.logoSrc} alt={brand.logoAlt} width={42} height={42} />
        <span className={styles.brandLockup}>
          <strong>{brand.wordmark}</strong>
          {brand.caption ? <span>{brand.caption}</span> : null}
        </span>
      </Link>

      <button
        type="button"
        className={styles.search}
        onClick={onOpenSearch}
        aria-label="Open command bar"
      >
        <RatchetIcon size={14} tone="currentColor" />
        Search workshop
        <Kbd size="sm">⌘K</Kbd>
      </button>

      <div className={styles.nav}>
        {groups.map((group) => {
          const isOpen = openIds.has(group.id)
          return (
            <div
              key={group.id}
              className={[
                styles.group,
                isOpen ? styles.groupOpen : styles.groupCollapsed,
              ].join(" ")}
            >
              <button
                type="button"
                className={styles.groupHeader}
                onClick={() => toggleGroup(group.id)}
                aria-expanded={isOpen}
              >
                {group.heading}
                <ChevronRight className={styles.chevron} aria-hidden="true" />
              </button>
              <div className={styles.groupItems}>
                {group.items.map((item) => {
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
                      <Icon size={16} tone="currentColor" />
                      <span>{item.label}</span>
                      {item.badge ? (
                        <span className={styles.itemBadge}>{item.badge}</span>
                      ) : null}
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {footerCard ? (
        <div className={styles.footer}>
          <span>{footerCard.subtitle}</span>
          <strong>{footerCard.title}</strong>
        </div>
      ) : null}
    </nav>
  )
}

export default SidebarMegaAnchored
