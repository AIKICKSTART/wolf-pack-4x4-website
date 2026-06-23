"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

import {
  CompassRoseIcon,
  MufflerIcon,
  PriceTagIcon,
} from "../../icons"
import type { ChromeBrandConfig } from "../chrome-types"

import styles from "./header-mobile-condensed.module.css"

export interface HeaderMobileCondensedProps {
  brand: ChromeBrandConfig
  /** Triggers the drawer open. */
  onOpenMenu: () => void
  /** Triggers the cart drawer / page. */
  onOpenCart: () => void
  cartCount?: number
  /** Pixel scroll threshold before the header shrinks. Defaults to 24. */
  shrinkThreshold?: number
  /** Hide the cart button entirely. Useful for marketing routes. */
  hideCart?: boolean
  className?: string
}

function getReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function HeaderMobileCondensed({
  brand,
  onOpenMenu,
  onOpenCart,
  cartCount = 0,
  shrinkThreshold = 24,
  hideCart = false,
  className,
}: HeaderMobileCondensedProps) {
  const [shrunk, setShrunk] = useState(false)

  useEffect(() => {
    if (getReducedMotion()) {
      return
    }
    const onScroll = () => {
      setShrunk(window.scrollY > shrinkThreshold)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [shrinkThreshold])

  const classes = [styles.header, shrunk && styles.headerShrunk, className]
    .filter(Boolean)
    .join(" ")

  return (
    <header role="banner" aria-label="Site header" className={classes}>
      <button
        type="button"
        className={styles.iconBtn}
        onClick={onOpenMenu}
        aria-label="Open navigation menu"
      >
        <CompassRoseIcon size={18} tone="currentColor" />
      </button>

      <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
        <Image
          src={brand.logoSrc}
          alt={brand.logoAlt}
          width={32}
          height={32}
          priority
        />
        <span className={styles.brandWordmark}>{brand.wordmark}</span>
      </Link>

      <div className={styles.iconRow}>
        {!hideCart ? (
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onOpenCart}
            aria-label={`Open cart${cartCount ? ` (${cartCount} items)` : ""}`}
          >
            <PriceTagIcon size={18} tone="currentColor" />
            {cartCount > 0 ? (
              <span className={styles.cartBadge} aria-hidden="true">
                {cartCount > 9 ? "9+" : cartCount}
              </span>
            ) : null}
          </button>
        ) : (
          <button
            type="button"
            className={styles.iconBtn}
            onClick={onOpenCart}
            aria-label="Open catalog"
          >
            <MufflerIcon size={18} tone="currentColor" />
          </button>
        )}
      </div>
    </header>
  )
}

export default HeaderMobileCondensed
