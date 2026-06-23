import Image from "next/image"
import Link from "next/link"
import { Fragment } from "react"

import {
  CheckeredFlagIcon,
  ClipboardCheckIcon,
  FlameJetIcon,
  MufflerIcon,
  RatchetIcon,
  ShieldTickIcon,
  SpannerIcon,
  TachometerIcon,
} from "../../icons"
import { CountUp } from "../../primitives/count-up"
import type { ChromeBrandConfig, ChromeNavItem } from "../chrome-types"

import styles from "./footer-marquee-band.module.css"

export interface FooterMarqueeKpi {
  id: string
  label: string
  value: number
  suffix?: string
}

export interface FooterMarqueeBandProps {
  brand: ChromeBrandConfig
  kpis: ReadonlyArray<FooterMarqueeKpi>
  /** Words/tags to scroll in the marquee band. */
  marqueeWords: ReadonlyArray<string>
  legalLinks: ReadonlyArray<ChromeNavItem>
  copyright: string
  className?: string
}

const KPI_ICONS = {
  jobs: SpannerIcon,
  warranty: ShieldTickIcon,
  motorsport: CheckeredFlagIcon,
  dyno: TachometerIcon,
  flow: FlameJetIcon,
  catalog: MufflerIcon,
  trade: ClipboardCheckIcon,
} as const

type KpiIconKey = keyof typeof KPI_ICONS

function isKpiIconKey(value: string): value is KpiIconKey {
  return value in KPI_ICONS
}

export function FooterMarqueeBand({
  brand,
  kpis,
  marqueeWords,
  legalLinks,
  copyright,
  className,
}: FooterMarqueeBandProps) {
  const classes = [styles.footer, className].filter(Boolean).join(" ")

  // Duplicate words for seamless marquee loop.
  const loopedWords = [...marqueeWords, ...marqueeWords]

  return (
    <footer role="contentinfo" aria-label="Site footer" className={classes}>
      <div className={styles.kpiRow}>
        {kpis.map((kpi) => {
          const Icon = isKpiIconKey(kpi.id) ? KPI_ICONS[kpi.id] : SpannerIcon
          return (
            <div key={kpi.id} className={styles.kpi}>
              <span className={styles.kpiValue}>
                <Icon size={28} tone="amber" />
                <CountUp to={kpi.value} suffix={kpi.suffix} />
              </span>
              <span className={styles.kpiLabel}>{kpi.label}</span>
            </div>
          )
        })}
      </div>

      <div className={styles.marqueeBand} aria-hidden="true">
        <div className={styles.marqueeTrack}>
          {loopedWords.map((word, i) => (
            <Fragment key={`${word}-${i}`}>
              <span className={styles.marqueeWord}>{word}</span>
              <span className={styles.marqueeIcon}>
                <RatchetIcon size={36} tone="amber" />
              </span>
              <span className={styles.marqueeBullet} />
            </Fragment>
          ))}
        </div>
      </div>

      <div className={styles.brandRow}>
        <Link href="/" className={styles.brand} aria-label={`${brand.wordmark} home`}>
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={36}
            height={36}
          />
          <strong>{brand.wordmark}</strong>
        </Link>

        <nav className={styles.legalLinks} aria-label="Legal">
          {legalLinks.map((link) => (
            <a key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <small className={styles.copyright}>{copyright}</small>
      </div>
    </footer>
  )
}

export default FooterMarqueeBand
