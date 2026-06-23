"use client"

import type { ReactNode } from "react"

import styles from "./state-region-blocked.module.css"

export interface StateRegionBlockedProps {
  headline?: string
  message?: string
  detectedRegion?: string
  supportedRegions?: ReadonlyArray<string>
  vpnNote?: string
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_SUPPORTED: ReadonlyArray<string> = [
  "NSW — Illawarra",
  "NSW — South Coast",
  "NSW — Sydney metro",
  "ACT — Canberra ring",
  "VIC — Melbourne north",
  "QLD — Brisbane bayside",
]

export function StateRegionBlocked({
  headline = "Not on the route sheet",
  message = "This corner of the site is geo-fenced to the regions we service from Oak Flats. We park interstate orders until our courier partners can confirm pickup.",
  detectedRegion,
  supportedRegions = DEFAULT_SUPPORTED,
  vpnNote = "VPNs and proxies sometimes throw off the geo check. Drop the tunnel, reload, and we will retry the lookup.",
  primaryAction,
  secondaryAction,
}: StateRegionBlockedProps) {
  return (
    <article
      className={styles.surface}
      role="alert"
      aria-labelledby="state-region-blocked-heading"
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
            <linearGradient id="rbBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a414c" />
              <stop offset="50%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>
            <linearGradient id="rbDial" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>
            <linearGradient id="rbNeedle" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--primitive-red)" />
              <stop offset="50%" stopColor="#7a0a0e" />
              <stop offset="50.1%" stopColor="#f0f4f8" />
              <stop offset="100%" stopColor="#6f7783" />
            </linearGradient>
          </defs>
          <ellipse cx="160" cy="222" rx="100" ry="8" fill="#000" opacity="0.42" />

          {/* Compass outer ring */}
          <g>
            <circle cx="160" cy="124" r="92" fill="url(#rbBody)" stroke="#0a0c10" strokeWidth="2" />
            <circle cx="160" cy="124" r="92" fill="none" stroke="var(--primitive-text-strong)" strokeWidth="1" opacity="0.18" />
            {/* tick marks */}
            <g stroke="var(--primitive-text-strong)" strokeWidth="1.2" opacity="0.4">
              <line x1="160" y1="38" x2="160" y2="48" />
              <line x1="160" y1="200" x2="160" y2="210" />
              <line x1="74" y1="124" x2="84" y2="124" />
              <line x1="236" y1="124" x2="246" y2="124" />
              <line x1="100" y1="64" x2="106" y2="70" />
              <line x1="220" y1="64" x2="214" y2="70" />
              <line x1="100" y1="184" x2="106" y2="178" />
              <line x1="220" y1="184" x2="214" y2="178" />
            </g>
            {/* cardinal letters */}
            <g fill="var(--primitive-text-strong)" fontFamily="monospace" fontSize="11" fontWeight="800" textAnchor="middle" opacity="0.78">
              <text x="160" y="36">N</text>
              <text x="160" y="218">S</text>
              <text x="68" y="128">W</text>
              <text x="252" y="128">E</text>
            </g>
          </g>

          {/* Inner dial */}
          <circle cx="160" cy="124" r="64" fill="url(#rbDial)" stroke="#3a414c" strokeWidth="1" />

          {/* Needle */}
          <g className={styles.needle}>
            <path
              d="M 160 70 L 168 124 L 160 178 L 152 124 Z"
              fill="url(#rbNeedle)"
              stroke="#0a0c10"
              strokeWidth="1.5"
            />
          </g>

          {/* Pivot */}
          <circle cx="160" cy="124" r="8" fill="var(--primitive-amber)" stroke="#7c4513" strokeWidth="2" />
          <circle cx="160" cy="124" r="3" fill="#7c4513" />

          {/* Diagonal slash through */}
          <g>
            <line
              x1="92"
              y1="56"
              x2="228"
              y2="192"
              stroke="var(--primitive-red)"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.95"
            />
            <line
              x1="92"
              y1="56"
              x2="228"
              y2="192"
              stroke="var(--primitive-text-strong)"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.35"
            />
          </g>
        </svg>
        <figcaption className={styles.caption}>Geo lookup — outside service area</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>451 · REGION OUT OF SCOPE</span>
        <h1 id="state-region-blocked-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.message}>{message}</p>

        {detectedRegion ? (
          <p className={styles.message} style={{ color: "var(--primitive-muted)" }}>
            <strong style={{ color: "var(--primitive-amber)" }}>Detected location:</strong>{" "}
            <code style={{ color: "var(--primitive-amber)", fontFamily: "var(--primitive-font-mono)" }}>
              {detectedRegion}
            </code>
          </p>
        ) : null}

        {supportedRegions.length > 0 ? (
          <section className={styles.supported} aria-label="Supported regions">
            <span className={styles.supportedLabel}>Covered service areas</span>
            <ul className={styles.regionGrid}>
              {supportedRegions.map((region) => (
                <li key={region}>
                  <span aria-hidden="true" />
                  <span>{region}</span>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {vpnNote ? (
          <aside className={styles.vpnNote}>
            <strong>VPN / proxy note</strong>
            <span>{vpnNote}</span>
          </aside>
        ) : null}

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

export default StateRegionBlocked
