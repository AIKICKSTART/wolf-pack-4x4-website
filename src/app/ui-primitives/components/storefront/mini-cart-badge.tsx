"use client"

import { ShoppingBag } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import styles from "./mini-cart-badge.module.css"

interface MiniCartBadgeProps {
  count: number
  totalLabel?: string
  onOpen?: () => void
  ariaLabel?: string
  variant?: "solid" | "outline"
}

export function MiniCartBadge({
  count,
  totalLabel,
  onOpen,
  ariaLabel,
  variant = "solid",
}: MiniCartBadgeProps) {
  const safeCount = Math.max(0, Math.min(99, count))
  const display = count > 99 ? "99+" : String(safeCount)
  const lastCount = useRef<number>(safeCount)
  const [pulse, setPulse] = useState<boolean>(false)

  useEffect(() => {
    if (safeCount > lastCount.current) {
      setPulse(true)
      const timer = window.setTimeout(() => setPulse(false), 600)
      return () => window.clearTimeout(timer)
    }
    lastCount.current = safeCount
    return undefined
  }, [safeCount])

  const label =
    ariaLabel ??
    (safeCount === 0
      ? "Cart is empty"
      : `Open cart, ${safeCount} ${safeCount === 1 ? "item" : "items"}${
          totalLabel ? `, total ${totalLabel}` : ""
        }`)

  return (
    <button
      type="button"
      className={`${styles.btn} ${variant === "outline" ? styles.outline : styles.solid}`}
      onClick={onOpen}
      aria-label={label}
    >
      <ShoppingBag size={16} aria-hidden="true" />
      <span className={styles.text}>Cart</span>
      {safeCount > 0 && (
        <span
          className={`${styles.badge} ${pulse ? styles.pulse : ""}`}
          aria-hidden="true"
        >
          {display}
        </span>
      )}
      {totalLabel && safeCount > 0 && (
        <span className={styles.total} aria-hidden="true">
          {totalLabel}
        </span>
      )}
    </button>
  )
}

export default MiniCartBadge
