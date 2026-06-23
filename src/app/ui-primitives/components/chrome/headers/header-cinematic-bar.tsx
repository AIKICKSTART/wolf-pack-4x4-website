import Image from "next/image"
import Link from "next/link"
import type { ComponentType } from "react"

import {
  ClipboardCheckIcon,
  CompassRoseIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  SpannerIcon,
} from "../../icons"
import type { IconProps } from "../../icons"
import { Reveal } from "../../motion/reveal"
import type { ChromeBrandConfig, ChromeNavItem } from "../chrome-types"

import styles from "./header-cinematic-bar.module.css"

export interface HeaderCinematicBarProps {
  brand: ChromeBrandConfig
  nav: ReadonlyArray<ChromeNavItem>
  primaryCta: { label: string; href: string }
  secondaryCta?: { label: string; href: string }
  className?: string
}

type IconComponent = ComponentType<IconProps>

const NAV_ICONS: Record<string, IconComponent> = {
  workshop: SpannerIcon,
  services: ExhaustPipeIcon,
  catalog: MufflerIcon,
  about: CompassRoseIcon,
  trade: ClipboardCheckIcon,
  contact: PhoneRingIcon,
}

function NavIconFor({ id }: { id: string }) {
  const Icon = NAV_ICONS[id] ?? SpannerIcon
  return <Icon size={14} tone="currentColor" />
}

export function HeaderCinematicBar({
  brand,
  nav,
  primaryCta,
  secondaryCta,
  className,
}: HeaderCinematicBarProps) {
  const classes = [styles.header, className].filter(Boolean).join(" ")

  return (
    <Reveal as="div" from="above" distance={20}>
      <header role="banner" aria-label="Site header" className={classes}>
        <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={40}
            height={40}
            className={styles.brandImg}
            priority
          />
          <span className={styles.brandLockup}>
            <strong className={styles.brandWordmark}>{brand.wordmark}</strong>
            {brand.caption ? (
              <span className={styles.brandCaption}>{brand.caption}</span>
            ) : null}
          </span>
        </Link>

        <nav className={styles.nav} aria-label="Primary navigation">
          <ul className={styles.navList}>
            {nav.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  className={styles.navLink}
                  aria-current={item.isActive ? "page" : undefined}
                >
                  <NavIconFor id={item.id} />
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className={styles.cta}>
          {secondaryCta ? (
            <a href={secondaryCta.href} className={styles.ctaSecondary}>
              <PhoneRingIcon size={14} tone="currentColor" />
              {secondaryCta.label}
            </a>
          ) : null}
          <a href={primaryCta.href} className={styles.ctaPrimary}>
            <SpannerIcon size={14} tone="currentColor" />
            {primaryCta.label}
          </a>
        </div>
      </header>
    </Reveal>
  )
}

export default HeaderCinematicBar
