"use client"

import type { ReactNode } from "react"

import styles from "./state-payment-required.module.css"

export interface StatePaymentRequiredPlan {
  name: string
  priceLabel: string
  cadence: string
  inclusions: ReadonlyArray<string>
}

export interface StatePaymentRequiredProps {
  headline?: string
  message?: string
  plan?: StatePaymentRequiredPlan
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_PLAN: StatePaymentRequiredPlan = {
  name: "Workshop Plus",
  priceLabel: "A$48",
  cadence: "per bay / month",
  inclusions: [
    "Unlimited quotes + ADR-aligned invoicing",
    "Telemetry on five sensor lanes per bay",
    "Customer SMS reminders + waitlist sweeps",
  ],
}

export function StatePaymentRequired({
  headline = "Settle up to keep rolling",
  message = "Your trial parked at the kerb. Tap upgrade to keep your bay slots, telemetry feeds, and customer notifications live.",
  plan = DEFAULT_PLAN,
  primaryAction,
  secondaryAction,
}: StatePaymentRequiredProps) {
  return (
    <article
      className={styles.surface}
      role="status"
      aria-live="polite"
      aria-labelledby="state-payment-required-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 320 240"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="prPaper" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fdfdfa" />
              <stop offset="100%" stopColor="#d8d3c4" />
            </linearGradient>
            <linearGradient id="prRibbon" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#f0f4f8" />
              <stop offset="48%" stopColor="var(--primitive-teal)" />
              <stop offset="100%" stopColor="#1d222b" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="222" rx="100" ry="8" fill="#000" opacity="0.42" />

          {/* Receipt body */}
          <g transform="translate(80 36)">
            {/* zigzag tear top */}
            <path
              d="M 0 0 L 14 6 L 28 0 L 42 6 L 56 0 L 70 6 L 84 0 L 98 6 L 112 0 L 126 6 L 140 0 L 154 6 L 158 6 L 158 168 L 154 174 L 140 168 L 126 174 L 112 168 L 98 174 L 84 168 L 70 174 L 56 168 L 42 174 L 28 168 L 14 174 L 0 168 Z"
              fill="url(#prPaper)"
              stroke="#0a0c10"
              strokeWidth="1.5"
            />
            {/* header rule */}
            <line x1="14" y1="22" x2="146" y2="22" stroke="#0a0c10" strokeWidth="1" opacity="0.45" />
            <text x="14" y="18" fill="#0a0c10" fontFamily="monospace" fontSize="9" fontWeight="700">
              MUFFLERMEN · OAK FLATS
            </text>
            {/* line items */}
            <g fill="#3a414c" fontFamily="monospace" fontSize="8">
              <text x="14" y="38">3-INCH MID PIPE</text>
              <text x="124" y="38" textAnchor="end">A$ 480</text>
              <text x="14" y="52">DYNO TUNE 2HR</text>
              <text x="124" y="52" textAnchor="end">A$ 360</text>
              <text x="14" y="66">FITMENT SLOT</text>
              <text x="124" y="66" textAnchor="end">A$ 220</text>
              <text x="14" y="80">ADR INSPECT</text>
              <text x="124" y="80" textAnchor="end">A$  90</text>
            </g>
            <line x1="14" y1="92" x2="146" y2="92" stroke="#0a0c10" strokeWidth="0.5" opacity="0.45" />
            <line x1="14" y1="94" x2="146" y2="94" stroke="#0a0c10" strokeWidth="0.5" opacity="0.45" />
            <text x="14" y="108" fill="#0a0c10" fontFamily="monospace" fontSize="9" fontWeight="700">
              TOTAL DUE
            </text>
            <text x="124" y="108" textAnchor="end" fill="#0a0c10" fontFamily="monospace" fontSize="12" fontWeight="800">
              A$ 1,150
            </text>
            {/* barcode */}
            <g transform="translate(14 122)" fill="#0a0c10">
              <rect x="0" y="0" width="2" height="22" />
              <rect x="4" y="0" width="1" height="22" />
              <rect x="7" y="0" width="3" height="22" />
              <rect x="12" y="0" width="1" height="22" />
              <rect x="16" y="0" width="2" height="22" />
              <rect x="22" y="0" width="1" height="22" />
              <rect x="25" y="0" width="3" height="22" />
              <rect x="32" y="0" width="2" height="22" />
              <rect x="38" y="0" width="1" height="22" />
              <rect x="42" y="0" width="3" height="22" />
              <rect x="48" y="0" width="2" height="22" />
              <rect x="54" y="0" width="1" height="22" />
              <rect x="58" y="0" width="3" height="22" />
              <rect x="64" y="0" width="2" height="22" />
              <rect x="70" y="0" width="1" height="22" />
              <rect x="74" y="0" width="3" height="22" />
              <rect x="80" y="0" width="2" height="22" />
              <rect x="86" y="0" width="1" height="22" />
              <rect x="90" y="0" width="3" height="22" />
              <rect x="96" y="0" width="2" height="22" />
              <rect x="102" y="0" width="1" height="22" />
              <rect x="106" y="0" width="3" height="22" />
              <rect x="112" y="0" width="2" height="22" />
              <rect x="118" y="0" width="1" height="22" />
              <rect x="122" y="0" width="3" height="22" />
              <rect x="128" y="0" width="2" height="22" />
              <rect x="134" y="0" width="1" height="22" />
            </g>
          </g>

          {/* Chrome ribbon diagonally across */}
          <g className={styles.ribbon}>
            <path
              d="M 24 96 L 296 76 L 304 116 L 28 142 Z"
              fill="url(#prRibbon)"
              stroke="#0a0c10"
              strokeWidth="1.5"
              opacity="0.95"
            />
            <path
              d="M 24 96 L 296 76 L 296 86 L 24 102 Z"
              fill="var(--primitive-text-strong)"
              opacity="0.28"
            />
            <text
              x="160"
              y="116"
              textAnchor="middle"
              fill="#0a0c10"
              fontFamily="monospace"
              fontSize="13"
              fontWeight="800"
              letterSpacing="2"
            >
              PAYMENT DUE
            </text>
          </g>
        </svg>
        <figcaption className={styles.caption}>Quote ready — awaiting payment</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>402 · PAYMENT REQUIRED</span>
        <h1 id="state-payment-required-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.message}>{message}</p>

        <section className={styles.planCard} aria-labelledby="state-payment-required-plan">
          <header className={styles.planHead}>
            <span id="state-payment-required-plan" className={styles.planName}>
              {plan.name}
            </span>
            <span className={styles.planPrice}>
              <strong>{plan.priceLabel}</strong>
              <small>{plan.cadence}</small>
            </span>
          </header>
          <ul className={styles.planList}>
            {plan.inclusions.map((inclusion, index) => (
              <li key={`${inclusion.slice(0, 8)}-${index}`}>
                <span>{inclusion}</span>
              </li>
            ))}
          </ul>
        </section>

        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </article>
  )
}

export default StatePaymentRequired
