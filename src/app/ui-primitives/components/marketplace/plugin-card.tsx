"use client"

import type { ReactNode } from "react"
import { Star } from "lucide-react"

import {
  PRICING_TIER_LABEL,
  type InstallState,
  type PluginCategory,
  type PricingTier,
} from "./marketplace-types"
import styles from "./plugin-card.module.css"

export interface PluginCardProps {
  name: string
  author: string
  description: string
  category: PluginCategory
  installState: InstallState
  rating: number
  ratingCount: number
  pricingTier: PricingTier
  logo?: ReactNode
  href?: string
  onInstall?: () => void
  className?: string
}

const STATE_LABEL: Record<InstallState, string> = {
  install: "New",
  installing: "Installing",
  installed: "Installed",
  "update-available": "Update",
  uninstall: "Installed",
}

const STATE_TONE_CLASS: Record<InstallState, string> = {
  install: styles.toneNew,
  installing: styles.toneInstalling,
  installed: styles.toneInstalled,
  "update-available": styles.toneUpdate,
  uninstall: styles.toneInstalled,
}

const CTA_LABEL: Record<InstallState, string> = {
  install: "Install",
  installing: "Installing…",
  installed: "Open",
  "update-available": "Update",
  uninstall: "Manage",
}

function FallbackLogo({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return (
    <svg viewBox="0 0 32 32" width="28" height="28" role="img" aria-label={`${name} logo`}>
      <defs>
        <linearGradient id={`pluginLogoGrad-${initials}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="currentColor" stopOpacity="0.92" />
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.32" />
        </linearGradient>
      </defs>
      <rect
        x="2"
        y="2"
        width="28"
        height="28"
        rx="7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        opacity="0.62"
      />
      <text
        x="16"
        y="20"
        textAnchor="middle"
        fontFamily="var(--primitive-font-display)"
        fontSize="12"
        fontWeight="700"
        fill={`url(#pluginLogoGrad-${initials})`}
      >
        {initials}
      </text>
    </svg>
  )
}

export function PluginCard({
  name,
  author,
  description,
  installState,
  rating,
  ratingCount,
  pricingTier,
  logo,
  href,
  onInstall,
  className,
}: PluginCardProps) {
  const classes = [styles.card, STATE_TONE_CLASS[installState], className]
    .filter(Boolean)
    .join(" ")
  const ctaLabel = CTA_LABEL[installState]
  const statusLabel = STATE_LABEL[installState]

  const ctaProps = onInstall
    ? { onClick: onInstall, type: "button" as const }
    : href
      ? { href }
      : { type: "button" as const }

  const CtaComponent = href && !onInstall ? "a" : "button"

  return (
    <article className={classes} aria-label={`${name} plugin card`}>
      <header className={styles.head}>
        <div className={styles.logo} aria-hidden="true">
          {logo ?? <FallbackLogo name={name} />}
        </div>
        <div className={styles.identity}>
          <span className={styles.author}>{author}</span>
          <h3 className={styles.name}>{name}</h3>
        </div>
        <span className={styles.statusChip}>{statusLabel}</span>
      </header>

      <p className={styles.description}>{description}</p>

      <div className={styles.meta}>
        <span className={styles.rating}>
          <Star size={13} strokeWidth={2.2} fill="currentColor" aria-hidden="true" />
          {rating.toFixed(1)}
          <span className={styles.ratingCount}>({ratingCount.toLocaleString("en-AU")})</span>
        </span>
        <span className={styles.priceChip}>{PRICING_TIER_LABEL[pricingTier]}</span>
      </div>

      <CtaComponent className={styles.cta} {...ctaProps}>
        {ctaLabel}
      </CtaComponent>
    </article>
  )
}

export default PluginCard
