"use client"

import Image from "next/image"
import Link from "next/link"

import {
  CheckeredFlagIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { Magnetic } from "../../motion/magnetic"
import type { ChromeBrandConfig, ChromeNavItem } from "../chrome-types"

import styles from "./header-floating-island.module.css"

export interface HeaderFloatingIslandProps {
  brand: ChromeBrandConfig
  nav: ReadonlyArray<ChromeNavItem>
  cta: { label: string; href: string }
  className?: string
}

const NAV_ICONS = {
  workshop: SpannerIcon,
  services: ExhaustPipeIcon,
  catalog: MufflerIcon,
  performance: TachometerIcon,
  motorsport: CheckeredFlagIcon,
  about: CompassRoseIcon,
} as const

type NavIconKey = keyof typeof NAV_ICONS

function isNavIconKey(value: string): value is NavIconKey {
  return value in NAV_ICONS
}

export function HeaderFloatingIsland({
  brand,
  nav,
  cta,
  className,
}: HeaderFloatingIslandProps) {
  const classes = [styles.host, className].filter(Boolean).join(" ")

  return (
    <header role="banner" aria-label="Site header" className={classes}>
      <div className={styles.island}>
        <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={28}
            height={28}
            priority
          />
          <span className={styles.brandWordmark}>{brand.wordmark}</span>
        </Link>

        <nav aria-label="Section navigation">
          <ul className={styles.nav}>
            {nav.map((item) => {
              const Icon = isNavIconKey(item.id) ? NAV_ICONS[item.id] : CompassRoseIcon
              return (
                <li key={item.id}>
                  <Magnetic strength={6} stiffness={320} damping={22}>
                    <a
                      href={item.href}
                      className={styles.navLink}
                      aria-current={item.isActive ? "page" : undefined}
                    >
                      <Icon size={12} tone="currentColor" />
                      {item.label}
                    </a>
                  </Magnetic>
                </li>
              )
            })}
          </ul>
        </nav>

        <Magnetic strength={8} stiffness={300} damping={22}>
          <a href={cta.href} className={styles.cta}>
            <PhoneRingIcon size={12} tone="currentColor" />
            {cta.label}
          </a>
        </Magnetic>
      </div>
    </header>
  )
}

export default HeaderFloatingIsland
