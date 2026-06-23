"use client"

import { ChevronRight } from "lucide-react"
import type { ReactNode } from "react"

import styles from "./wallet-row.module.css"

interface WalletRowProps {
  icon: ReactNode
  label: string
  caption?: string
  balance: number
  currency?: string
  href?: string
  onClick?: () => void
  tone?: "neutral" | "amber" | "teal" | "green"
}

const TONE_CLASS: Record<NonNullable<WalletRowProps["tone"]>, string> = {
  neutral: styles.toneNeutral,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

function formatCurrency(value: number, currency: string): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(value)
}

export function WalletRow({
  icon,
  label,
  caption,
  balance,
  currency = "AUD",
  href,
  onClick,
  tone = "neutral",
}: WalletRowProps) {
  const content = (
    <>
      <span className={styles.iconWrap} aria-hidden="true">
        {icon}
      </span>
      <span className={styles.text}>
        <span className={styles.label}>{label}</span>
        {caption && <span className={styles.caption}>{caption}</span>}
      </span>
      <span className={styles.balance}>
        <span className={styles.balanceValue}>{formatCurrency(balance, currency)}</span>
        <span className={styles.balanceCurrency}>{currency}</span>
      </span>
      <ChevronRight size={16} className={styles.chevron} aria-hidden="true" />
    </>
  )

  const classes = `${styles.row} ${TONE_CLASS[tone]}`

  if (href) {
    return (
      <a className={classes} href={href}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" className={classes} onClick={onClick}>
      {content}
    </button>
  )
}

export default WalletRow
