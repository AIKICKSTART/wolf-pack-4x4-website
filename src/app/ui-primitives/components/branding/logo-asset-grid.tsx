import type { ReactNode } from "react"

import styles from "./logo-asset-grid.module.css"

export type LogoAssetFormat = "SVG" | "PNG" | "PDF" | "EPS"

export interface LogoAsset {
  id: string
  name: string
  description: string
  surfaceClass: "fullColor" | "mono" | "inverse" | "outline" | "stencil" | "duotone"
  formats: ReadonlyArray<LogoAssetFormat>
  mark: ReactNode
}

export interface LogoAssetGridProps {
  assets: ReadonlyArray<LogoAsset>
}

function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      width="14"
      height="14"
    >
      <path d="M12 4 V14" />
      <path d="M7 11 L12 16 L17 11" />
      <path d="M5 20 H19" />
    </svg>
  )
}

export function LogoAssetGrid({ assets }: LogoAssetGridProps) {
  return (
    <section className={styles.wrapper} aria-label="Logo asset library">
      <header className={styles.head}>
        <span className={styles.kicker}>Asset library</span>
        <h2 className={styles.title}>Logo + lockup downloads</h2>
        <p className={styles.lede}>
          Every approved logo variation, packaged as SVG, PNG, and PDF. Mono and inverse versions are
          colour-locked — no recolouring.
        </p>
      </header>
      <div className={styles.grid}>
        {assets.map((asset) => (
          <article key={asset.id} className={styles.card}>
            <div className={`${styles.surface} ${styles[`surface-${asset.surfaceClass}`]}`} aria-hidden="true">
              {asset.mark}
            </div>
            <div className={styles.body}>
              <strong className={styles.name}>{asset.name}</strong>
              <p className={styles.note}>{asset.description}</p>
            </div>
            <footer className={styles.footer}>
              <ul className={styles.formats} aria-label={`${asset.name} formats`}>
                {asset.formats.map((format) => (
                  <li key={format} className={styles.formatChip}>
                    {format}
                  </li>
                ))}
              </ul>
              <button type="button" className={styles.download}>
                <DownloadIcon /> Download
              </button>
            </footer>
          </article>
        ))}
      </div>
    </section>
  )
}
