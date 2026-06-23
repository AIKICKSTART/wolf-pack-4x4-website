"use client"

import { useEffect, type ComponentType } from "react"

import type { IconProps } from "../../icons"
import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  ExhaustPipeIcon,
  FlameJetIcon,
  MufflerIcon,
  PriceTagIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { Chip } from "../../primitives/chip"

import styles from "./slide-up-detail-card.module.css"

export type SlideUpDetailStatKind =
  | "muffler"
  | "tach"
  | "spanner"
  | "flame"
  | "tag"
  | "flag"
  | "exhaust"

export interface SlideUpDetailStat {
  id: string
  label: string
  value: string
  kind: SlideUpDetailStatKind
}

export interface SlideUpDetailCardProps {
  open: boolean
  onClose: () => void
  kicker: string
  title: string
  /** Chips rendered under the title (e.g. status tags). */
  metas?: ReadonlyArray<{ id: string; label: string; tone?: "neutral" | "red" | "amber" | "teal" | "green" }>
  stats: ReadonlyArray<SlideUpDetailStat>
  /** Body description rendered above the stats. */
  description?: string
  primaryCta: { label: string; onClick: () => void }
  secondaryCta?: { label: string; onClick: () => void }
  className?: string
}

const STAT_ICONS: Record<SlideUpDetailStatKind, ComponentType<IconProps>> = {
  muffler: MufflerIcon,
  tach: TachometerIcon,
  spanner: SpannerIcon,
  flame: FlameJetIcon,
  tag: PriceTagIcon,
  flag: CheckeredFlagIcon,
  exhaust: ExhaustPipeIcon,
}

export function SlideUpDetailCard({
  open,
  onClose,
  kicker,
  title,
  metas,
  stats,
  description,
  primaryCta,
  secondaryCta,
  className,
}: SlideUpDetailCardProps) {
  useEffect(() => {
    if (!open) {
      return
    }
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [open, onClose])

  return (
    <div
      className={[styles.root, open ? styles.rootOpen : null, className]
        .filter(Boolean)
        .join(" ")}
      aria-hidden={!open}
    >
      <button
        type="button"
        className={styles.backdrop}
        onClick={onClose}
        aria-label="Dismiss detail card"
        tabIndex={open ? 0 : -1}
      />
      <div
        className={styles.sheet}
        role="dialog"
        aria-modal="true"
        aria-label={title}
      >
        <span className={styles.handle} aria-hidden="true" />
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>{kicker}</span>
            <h2 className={styles.title}>{title}</h2>
            {metas && metas.length > 0 ? (
              <div className={styles.metaRow}>
                {metas.map((meta) => (
                  <Chip key={meta.id} label={meta.label} tone={meta.tone ?? "amber"} />
                ))}
              </div>
            ) : null}
          </div>
          <ClipboardCheckIcon size={28} tone="amber" />
        </header>

        <div className={styles.body}>
          {description ? <p>{description}</p> : null}
          <div className={styles.statGrid}>
            {stats.map((stat) => {
              const Icon = STAT_ICONS[stat.kind]
              return (
                <div key={stat.id} className={styles.statTile}>
                  <Icon size={18} tone="amber" />
                  <span>{stat.label}</span>
                  <strong>{stat.value}</strong>
                </div>
              )
            })}
          </div>
        </div>

        <footer className={styles.foot}>
          <div className={styles.footActions}>
            <button type="button" className={styles.primary} onClick={primaryCta.onClick}>
              <SpannerIcon size={14} tone="currentColor" />
              {primaryCta.label}
            </button>
            {secondaryCta ? (
              <button type="button" className={styles.secondary} onClick={secondaryCta.onClick}>
                {secondaryCta.label}
              </button>
            ) : null}
          </div>
        </footer>
      </div>
    </div>
  )
}

export default SlideUpDetailCard
