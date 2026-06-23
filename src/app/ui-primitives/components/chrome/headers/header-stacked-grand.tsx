import Image from "next/image"
import Link from "next/link"

import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  SignalPulseIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { NeuoSurface } from "../../surfaces/neuo-surface"
import type { ChromeBrandConfig, ChromeNavItem } from "../chrome-types"

import styles from "./header-stacked-grand.module.css"

export interface HeaderStackedGrandStat {
  label: string
  value: string
}

export interface HeaderStackedGrandProps {
  brand: ChromeBrandConfig
  tagline: string
  stats: ReadonlyArray<HeaderStackedGrandStat>
  utility: {
    statusMessage: string
    phoneLabel: string
    phoneHref: string
    bookHref: string
  }
  primaryCta: { label: string; href: string }
  nav: ReadonlyArray<ChromeNavItem>
  className?: string
}

const NAV_ICONS = {
  workshop: SpannerIcon,
  services: ExhaustPipeIcon,
  catalog: MufflerIcon,
  performance: TachometerIcon,
  motorsport: CheckeredFlagIcon,
  about: CompassRoseIcon,
  trade: ClipboardCheckIcon,
  contact: PhoneRingIcon,
} as const

type NavIconKey = keyof typeof NAV_ICONS

function isNavIconKey(value: string): value is NavIconKey {
  return value in NAV_ICONS
}

export function HeaderStackedGrand({
  brand,
  tagline,
  stats,
  utility,
  primaryCta,
  nav,
  className,
}: HeaderStackedGrandProps) {
  const classes = [styles.header, className].filter(Boolean).join(" ")

  return (
    <header role="banner" aria-label="Site header" className={classes}>
      <div className={styles.utility}>
        <div className={styles.utilityLeft}>
          <span>
            <span className={styles.statusDot} aria-hidden="true" />
            <SignalPulseIcon size={12} tone="green" />
            {utility.statusMessage}
          </span>
        </div>
        <div className={styles.utilityRight}>
          <a href={utility.phoneHref}>
            <PhoneRingIcon size={12} tone="currentColor" />
            {utility.phoneLabel}
          </a>
          <a href={utility.bookHref}>
            <ClipboardCheckIcon size={12} tone="currentColor" />
            Book a bay
          </a>
        </div>
      </div>

      <NeuoSurface tone="obsidian" className={styles.hero}>
        <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={56}
            height={56}
            className={styles.brandImg}
            priority
          />
          <span className={styles.brandLockup}>
            <strong className={styles.brandWordmark}>{brand.wordmark}</strong>
            <span className={styles.brandTagline}>{tagline}</span>
          </span>
        </Link>

        <div role="presentation" className={styles.metrics}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.metric}>
              <span className={styles.metricNumber}>{stat.value}</span>
              <span className={styles.metricLabel}>{stat.label}</span>
            </div>
          ))}
        </div>

        <a href={primaryCta.href} className={styles.heroCta}>
          <SpannerIcon size={14} tone="currentColor" />
          {primaryCta.label}
        </a>
      </NeuoSurface>

      <nav className={styles.navRail} aria-label="Primary navigation">
        <ul>
          {nav.map((item) => {
            const Icon = isNavIconKey(item.id) ? NAV_ICONS[item.id] : SpannerIcon
            return (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={styles.navRailLink}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  <Icon size={14} tone="currentColor" />
                  {item.label}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </header>
  )
}

export default HeaderStackedGrand
