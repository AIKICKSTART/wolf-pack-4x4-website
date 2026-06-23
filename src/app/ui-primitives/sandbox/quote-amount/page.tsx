import type { Metadata } from "next"
import Link from "next/link"
import { ArrowUpRight, Camera, Gauge, ShieldCheck, Wrench } from "lucide-react"

import { Sparkline } from "../../components/charts"
import { ButtonDnaLink } from "../../components/button-dna-link"

import styles from "./quote-amount.module.css"

export const metadata: Metadata = {
  title: "Live quote estimator | UI Primitives — Sandbox",
  description:
    "Sandbox surface for a live quote amount card. Animated count-up, trend sparkline, and breakdown lines.",
}

interface Breakdown {
  label: string
  amount: number
  note: string
  icon: typeof Wrench
}

const breakdown: Breakdown[] = [
  { label: "Cat-back exhaust", amount: 1180, note: "2.5″ stainless · OEM hanger map", icon: Wrench },
  { label: "Resonator delete", amount: 320, note: "Tig welded, OEM-style flange", icon: Gauge },
  { label: "Inspection + dyno strap", amount: 180, note: "Ramp · 15min · before & after", icon: ShieldCheck },
  { label: "Underbody photo set", amount: 0, note: "Included with every quote", icon: Camera },
]

const total = breakdown.reduce((sum, item) => sum + item.amount, 0)

// 14 day trend of average quote amount — sandbox data only.
const trend = [1280, 1310, 1296, 1340, 1305, 1360, 1402, 1378, 1412, 1456, 1488, 1510, 1542, 1680]

// Latest 3 quotes feed used as ticker source.
const ticker = [
  { ref: "Q-2031", make: "BA Falcon XR6", amount: 1485 },
  { ref: "Q-2032", make: "VE Commodore SS", amount: 1820 },
  { ref: "Q-2033", make: "GU Patrol 4.2TD", amount: 2140 },
]

export default function QuoteAmountSandbox() {
  return (
    <main className={styles.page} aria-labelledby="quote-amount-title">
      <header className={styles.header}>
        <div className={styles.headerCopy}>
          <span className={styles.eyebrow}>Sandbox · Live quote primitive</span>
          <h1 id="quote-amount-title" className={styles.headline}>
            Estimator card with live count-up and 14-day trend
          </h1>
          <p className={styles.subhead}>
            Test bed for the estimate price card before it migrates into the production parts
            catalogue. Numbers animate up from zero on first paint, then the sparkline traces the
            14-day rolling average so customers see momentum, not a static figure.
          </p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "var(--primitive-space-2)", justifyContent: "flex-end" }}>
          <ButtonDnaLink />
          <Link href="/ui-primitives/sandbox" className={styles.backLink}>
            <ArrowUpRight aria-hidden="true" />
            Back to sandbox
          </Link>
        </div>
      </header>

      <section className={styles.stage} aria-label="Live estimator card">
        <article className={styles.estimateCard}>
          <header className={styles.estimateHead}>
            <span className={styles.estimateKicker}>Estimate · Quote Q-2034</span>
            <span className={styles.estimateRef}>VE SS · cat-back · 7-day window</span>
          </header>

          <div className={styles.estimateAmountRow}>
            <span className={styles.estimatePrefix}>From</span>
            <strong className={styles.estimateAmount}>
              <span className={styles.estimateCurrency}>A$</span>
              <span className={styles.estimateDigits}>{total.toLocaleString("en-AU")}</span>
            </strong>
            <span className={styles.estimateDelta} data-tone="green" aria-label="Trend up 6 percent">
              <ArrowUpRight aria-hidden="true" />
              6% vs last fortnight
            </span>
          </div>

          <div className={styles.estimateTrend} aria-label="14-day average estimate trend">
            <Sparkline
              points={trend}
              tone="green"
              ariaLabel={`Average quote trend over 14 days, currently A$${total.toLocaleString("en-AU")}`}
              width={420}
              height={64}
            />
            <span className={styles.estimateTrendCaption}>Last 14 days · workshop average</span>
          </div>

          <ul className={styles.estimateBreakdown}>
            {breakdown.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.label} className={styles.breakdownRow}>
                  <Icon aria-hidden="true" className={styles.breakdownIcon} />
                  <div className={styles.breakdownCopy}>
                    <strong>{item.label}</strong>
                    <small>{item.note}</small>
                  </div>
                  <span className={styles.breakdownAmount} data-zero={item.amount === 0 ? "true" : "false"}>
                    {item.amount === 0 ? "Free" : `A$${item.amount.toLocaleString("en-AU")}`}
                  </span>
                </li>
              )
            })}
          </ul>

          <footer className={styles.estimateFoot}>
            <span className={styles.estimateFootNote}>Quote valid 14 days · ADR-compliant build</span>
            <button type="button" className={styles.estimateCta}>
              Lock this quote
              <ArrowUpRight aria-hidden="true" />
            </button>
          </footer>
        </article>

        <aside className={styles.tickerAside}>
          <h2 className={styles.tickerTitle}>Latest live quotes</h2>
          <ul className={styles.tickerList}>
            {ticker.map((entry, idx) => (
              <li key={entry.ref} className={styles.tickerRow} style={{ animationDelay: `${idx * 140}ms` }}>
                <span className={styles.tickerRef}>{entry.ref}</span>
                <span className={styles.tickerMake}>{entry.make}</span>
                <strong className={styles.tickerAmount}>A${entry.amount.toLocaleString("en-AU")}</strong>
              </li>
            ))}
          </ul>
          <p className={styles.tickerFoot}>
            Sparkline + count-up are CSS-driven so the card stays an SSR-friendly server component;
            no JS state required.
          </p>
        </aside>
      </section>
    </main>
  )
}
