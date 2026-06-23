"use client"

import { useState } from "react"

import { GiftCardRedeem, type GiftCardRedeemResult } from "../../components/commerce/gift-card-redeem"

import styles from "../commerce.module.css"

interface RecentRedemption {
  id: string
  code: string
  redeemedAt: string
  amount: number
}

const RECENT: ReadonlyArray<RecentRedemption> = [
  { id: "r1", code: "OFM-WORK-2024-XMAS", redeemedAt: "12 Dec 2024 · 14:08", amount: 100 },
  { id: "r2", code: "MUFFLER-PROMO-WAVE", redeemedAt: "04 Aug 2024 · 09:22", amount: 50 },
  { id: "r3", code: "FATHERS-DAY-FOR-MICK", redeemedAt: "01 Sep 2023 · 11:40", amount: 250 },
]

export function GiftCardScene() {
  const [redeemed, setRedeemed] = useState<GiftCardRedeemResult | null>(null)
  const [error, setError] = useState<string | undefined>(undefined)

  const handleRedeem = (code: string) => {
    setError(undefined)
    if (code.startsWith("OFM") || code.startsWith("MUFFLER")) {
      setRedeemed({ balance: 150.0, currency: "AUD" })
      return
    }
    setRedeemed(null)
    setError("That code is not active. Check the back of the card.")
  }

  return (
    <div className={styles.giftLayout}>
      <GiftCardRedeem
        redeemed={redeemed}
        onRedeem={handleRedeem}
        error={error}
      />

      <section aria-labelledby="recent-redemptions-title">
        <header className={styles.sectionHeader}>
          <h2 id="recent-redemptions-title" className={styles.sectionTitle}>Recent redemptions</h2>
          <span className={styles.sectionMeta}>3 cards</span>
        </header>
        <ul className={styles.recentList} style={{ padding: 0, margin: "var(--primitive-space-3) 0 0", listStyle: "none" }}>
          {RECENT.map((item) => (
            <li key={item.id} className={styles.recentItem}>
              <div>
                <span className={styles.recentLabel}>{item.code}</span>
                <span className={styles.recentMeta}>{item.redeemedAt}</span>
              </div>
              <span className={styles.recentAmount}>+${item.amount.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
