"use client"

import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

import {
  CompassRoseIcon,
  MufflerIcon,
  PhoneRingIcon,
  RatchetIcon,
  ShieldTickIcon,
} from "../../icons"
import { Kbd } from "../../primitives/kbd"
import type { ChromeBrandConfig } from "../chrome-types"

import styles from "./header-pinstripe-bar.module.css"

export interface HeaderPinstripeBarCrumb {
  label: string
  href?: string
}

export interface HeaderPinstripeBarLink {
  id: string
  label: string
  href: string
  isActive?: boolean
}

export interface HeaderPinstripeBarProps {
  brand: ChromeBrandConfig
  crumbs: ReadonlyArray<HeaderPinstripeBarCrumb>
  links: ReadonlyArray<HeaderPinstripeBarLink>
  /** Optional click handler for the search shortcut chip. */
  onOpenSearch?: () => void
  className?: string
}

export function HeaderPinstripeBar({
  brand,
  crumbs,
  links,
  onOpenSearch,
  className,
}: HeaderPinstripeBarProps) {
  const classes = [styles.header, className].filter(Boolean).join(" ")

  return (
    <header role="banner" aria-label="Site header" className={classes}>
      <Link href="/" className={styles.brandChip} aria-label={`${brand.wordmark} home`}>
        <Image
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={22}
          height={22}
          priority
        />
        <span className={styles.brandWordmark}>{brand.wordmark}</span>
      </Link>

      <span className={styles.divider} aria-hidden="true" />

      <nav className={styles.crumbs} aria-label="Breadcrumb">
        <ol>
          {crumbs.map((crumb, index) => {
            const isLast = index === crumbs.length - 1
            return (
              <Fragment key={`${crumb.label}-${index}`}>
                <li>
                  {!isLast && crumb.href ? (
                    <a href={crumb.href}>{crumb.label}</a>
                  ) : (
                    <span aria-current={isLast ? "page" : undefined}>{crumb.label}</span>
                  )}
                </li>
                {!isLast ? (
                  <li className={styles.sep} aria-hidden="true">
                    /
                  </li>
                ) : null}
              </Fragment>
            )
          })}
        </ol>
      </nav>

      <div className={styles.minimal}>
        {links.map((link) => {
          const Icon = isLinkIconKey(link.id) ? LINK_ICONS[link.id] : CompassRoseIcon
          return (
            <a
              key={link.id}
              href={link.href}
              className={styles.minimalLink}
              aria-current={link.isActive ? "page" : undefined}
            >
              <Icon size={12} tone="currentColor" />
              {link.label}
            </a>
          )
        })}
        <button
          type="button"
          className={styles.search}
          onClick={onOpenSearch}
          aria-label="Open search"
        >
          <RatchetIcon size={12} tone="currentColor" />
          Search
          <Kbd size="sm">/</Kbd>
        </button>
      </div>
    </header>
  )
}

const LINK_ICONS = {
  workshop: MufflerIcon,
  trade: ShieldTickIcon,
  contact: PhoneRingIcon,
  about: CompassRoseIcon,
} as const

type LinkIconKey = keyof typeof LINK_ICONS

function isLinkIconKey(value: string): value is LinkIconKey {
  return value in LINK_ICONS
}

export default HeaderPinstripeBar
