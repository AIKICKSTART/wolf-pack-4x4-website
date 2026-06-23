"use client"

import Image from "next/image"
import Link from "next/link"

import {
  ClipboardCheckIcon,
  CompassRoseIcon,
  PhoneRingIcon,
  ShieldTickIcon,
  SignalPulseIcon,
} from "../../icons"
import { Chip } from "../../primitives/chip"
import type { ChromeBrandConfig, ChromeNavItem } from "../chrome-types"

import styles from "./footer-compact-strip.module.css"

export interface FooterCompactStripProps {
  brand: ChromeBrandConfig
  links: ReadonlyArray<ChromeNavItem>
  copyright: string
  /** Click handler for the theme toggle chip. */
  onToggleTheme?: () => void
  /** Current theme label rendered on the toggle. Defaults to "Theme". */
  themeLabel?: string
  /** Status text rendered next to the copyright (e.g. "Online · Bay 2 live"). */
  statusLabel?: string
  className?: string
}

const LINK_ICONS = {
  shop: ClipboardCheckIcon,
  about: CompassRoseIcon,
  contact: PhoneRingIcon,
  trade: ShieldTickIcon,
} as const

type LinkIconKey = keyof typeof LINK_ICONS

function isLinkIconKey(value: string): value is LinkIconKey {
  return value in LINK_ICONS
}

export function FooterCompactStrip({
  brand,
  links,
  copyright,
  onToggleTheme,
  themeLabel = "Theme",
  statusLabel,
  className,
}: FooterCompactStripProps) {
  const classes = [styles.footer, className].filter(Boolean).join(" ")

  return (
    <footer role="contentinfo" aria-label="Site footer" className={classes}>
      <Link href="/" className={styles.brandChip} aria-label={`${brand.wordmark} home`}>
        <Image
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={20}
          height={20}
        />
        <span className={styles.brandWord}>{brand.wordmark}</span>
      </Link>

      <ul className={styles.links}>
        {links.map((link) => {
          const Icon = isLinkIconKey(link.id) ? LINK_ICONS[link.id] : CompassRoseIcon
          return (
            <li key={link.id}>
              <a href={link.href} aria-current={link.isActive ? "page" : undefined}>
                <Icon size={12} tone="currentColor" />
                {link.label}
              </a>
            </li>
          )
        })}
      </ul>

      <div className={styles.right}>
        <span>{copyright}</span>
        {statusLabel ? (
          <Chip
            label={statusLabel}
            tone="green"
            icon={<SignalPulseIcon size={12} tone="green" />}
          />
        ) : null}
        <button
          type="button"
          className={styles.themeBtn}
          onClick={onToggleTheme}
          aria-label="Toggle theme"
        >
          <CompassRoseIcon size={12} tone="currentColor" />
          {themeLabel}
        </button>
      </div>
    </footer>
  )
}

export default FooterCompactStrip
