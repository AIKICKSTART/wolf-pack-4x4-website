"use client"

import { ChevronRight } from "lucide-react"
import type { ComponentType } from "react"

import type { IconProps } from "../../icons"
import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
  FlameJetIcon,
  MufflerIcon,
  PriceTagIcon,
  ShieldTickIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { Reveal } from "../../motion/reveal"

import styles from "./sidebar-context-rail.module.css"

export type SidebarContextRailStatKind =
  | "muffler"
  | "tach"
  | "spanner"
  | "flame"
  | "tag"
  | "flag"
  | "exhaust"

export interface SidebarContextRailStat {
  id: string
  label: string
  value: string
  kind: SidebarContextRailStatKind
}

export interface SidebarContextRailMeta {
  id: string
  label: string
}

export interface SidebarContextRailRelated {
  id: string
  label: string
  href: string
}

export interface SidebarContextRailProps {
  kicker: string
  title: string
  metas: ReadonlyArray<SidebarContextRailMeta>
  stats: ReadonlyArray<SidebarContextRailStat>
  related: ReadonlyArray<SidebarContextRailRelated>
  primaryAction: { label: string; onClick: () => void }
  secondaryAction?: { label: string; onClick: () => void }
  layout?: "sticky" | "static"
  className?: string
}

const STAT_ICONS: Record<SidebarContextRailStatKind, ComponentType<IconProps>> = {
  muffler: MufflerIcon,
  tach: TachometerIcon,
  spanner: SpannerIcon,
  flame: FlameJetIcon,
  tag: PriceTagIcon,
  flag: CheckeredFlagIcon,
  exhaust: ExhaustPipeIcon,
}

export function SidebarContextRail({
  kicker,
  title,
  metas,
  stats,
  related,
  primaryAction,
  secondaryAction,
  layout = "sticky",
  className,
}: SidebarContextRailProps) {
  const classes = [
    styles.rail,
    layout === "static" ? styles.railStatic : null,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <aside
      role="navigation"
      aria-label="Context rail"
      className={classes}
    >
      <header className={styles.headerBlock}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.metaRow}>
          {metas.map((meta) => (
            <span key={meta.id} className={styles.metaChip}>
              <ShieldTickIcon size={11} tone="currentColor" />
              {meta.label}
            </span>
          ))}
        </div>
      </header>

      <div className={styles.statsGrid}>
        {stats.map((stat) => {
          const Icon = STAT_ICONS[stat.kind]
          return (
            <div key={stat.id} className={styles.statTile}>
              <Icon size={16} tone="amber" />
              <span>{stat.label}</span>
              <strong>{stat.value}</strong>
            </div>
          )
        })}
      </div>

      <Reveal as="div" from="below" distance={14} className={styles.body}>
        <div className={styles.section}>
          <h4>Related</h4>
          <ul className={styles.relatedList}>
            {related.map((item) => (
              <li key={item.id}>
                <a href={item.href}>
                  <CompassRoseIcon size={14} tone="amber" />
                  <span>{item.label}</span>
                  <ChevronRight className={styles.chev} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Reveal>

      <footer className={styles.actions}>
        <button
          type="button"
          className={styles.actionPrimary}
          onClick={primaryAction.onClick}
        >
          <ClipboardCheckIcon size={14} tone="currentColor" />
          {primaryAction.label}
        </button>
        {secondaryAction ? (
          <button
            type="button"
            className={styles.actionSecondary}
            onClick={secondaryAction.onClick}
          >
            {secondaryAction.label}
          </button>
        ) : null}
      </footer>
    </aside>
  )
}

export default SidebarContextRail
