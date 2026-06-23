import Image from "next/image"

import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  ShieldTickIcon,
  SpannerIcon,
} from "../../icons"
import { ScrollReveal } from "../../motion/scroll-reveal"
import type { ChromeBrandConfig, ChromeNavItem } from "../chrome-types"

import styles from "./footer-cinematic.module.css"

export interface FooterCinematicColumn {
  id: string
  heading: string
  links: ReadonlyArray<ChromeNavItem>
}

export interface FooterCinematicProps {
  brand: ChromeBrandConfig
  /** Background hero image — must be a `siteImages.covers.*` value. */
  bgImageSrc: string
  bgImageAlt: string
  tagline: string
  columns: ReadonlyArray<FooterCinematicColumn>
  legal: string
  legalLinks: ReadonlyArray<ChromeNavItem>
  className?: string
}

const COL_ICONS = {
  workshop: SpannerIcon,
  services: ExhaustPipeIcon,
  catalog: MufflerIcon,
  motorsport: CheckeredFlagIcon,
  trade: ClipboardCheckIcon,
  shield: ShieldTickIcon,
  contact: PhoneRingIcon,
} as const

type ColIconKey = keyof typeof COL_ICONS

function isColIconKey(value: string): value is ColIconKey {
  return value in COL_ICONS
}

export function FooterCinematic({
  brand,
  bgImageSrc,
  bgImageAlt,
  tagline,
  columns,
  legal,
  legalLinks,
  className,
}: FooterCinematicProps) {
  const classes = [styles.footer, className].filter(Boolean).join(" ")

  return (
    <footer role="contentinfo" aria-label="Site footer" className={classes}>
      <div className={styles.bgFrame} aria-hidden="true">
        <Image src={bgImageSrc} alt={bgImageAlt} fill sizes="100vw" />
      </div>

      <ScrollReveal className={styles.content}>
        <div className={styles.brandBlock}>
          <div className={styles.brandHero}>
            <Image
              src={brand.logoSrc}
              alt={brand.logoAlt}
              width={80}
              height={80}
            />
            <div>
              <strong className={styles.brandWordmark}>{brand.wordmark}</strong>
              {brand.caption ? (
                <span className={styles.brandCaption}>{brand.caption}</span>
              ) : null}
            </div>
          </div>
          <p className={styles.tagline}>{tagline}</p>
        </div>

        {columns.map((column) => {
          const Icon = isColIconKey(column.id) ? COL_ICONS[column.id] : SpannerIcon
          return (
            <div key={column.id} className={styles.col}>
              <h4>{column.heading}</h4>
              <ul>
                {column.links.map((link) => (
                  <li key={link.id}>
                    <a href={link.href}>
                      <Icon size={14} tone="amber" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </ScrollReveal>

      <div className={styles.bottomBar}>
        <small>{legal}</small>
        <nav aria-label="Legal">
          {legalLinks.map((link) => (
            <a key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

export default FooterCinematic
