import { ArrowUpRight, ScanLine } from "lucide-react"

import {
  QR_CAMPAIGN_LABEL,
  type QrCampaign,
} from "./bay-display-types"
import styles from "./qr-code-call-to-action.module.css"

export interface QrCodeCallToActionProps {
  campaign: QrCampaign
  /** Destination URL to encode (presentational here — render with a real QR lib at integration). */
  url: string
  /** Optional override headline — defaults from campaign. */
  headline?: string
  /** Subhead copy — defaults to a campaign blurb. */
  subhead?: string
  /** Optional rendered QR image src (a real QR PNG/SVG) — if absent, decorative grid is shown. */
  qrSrc?: string
  className?: string
}

const CAMPAIGN_HEADLINE: Readonly<Record<QrCampaign, string>> = {
  book: "Book online in under a minute",
  review: "Share how we did",
  follow: "Follow the build journey",
  rewards: "Join Mufflermen Rewards",
}

const CAMPAIGN_SUBHEAD: Readonly<Record<QrCampaign, string>> = {
  book: "Scan to pick a time, drop your reg, lock in a quote.",
  review: "Scan to leave a Google review — keeps the Oak Flats wheels turning.",
  follow: "Scan to follow @oakflats.mufflermen — daily Hilux, Patrol and Cruiser builds.",
  rewards: "Scan to join — service punch-card, birthday discounts, early-access dates.",
}

/**
 * Deterministic decorative QR mock — 25×25 cells from URL hash.
 * Real signage swaps qrSrc for an encoded image at integration.
 */
function hashCells(url: string): boolean[] {
  const cells: boolean[] = []
  let seed = 0
  for (let i = 0; i < url.length; i += 1) {
    seed = (seed * 31 + url.charCodeAt(i)) | 0
  }
  for (let i = 0; i < 625; i += 1) {
    seed = (seed * 1103515245 + 12345) | 0
    cells.push((seed & 0x4000) !== 0)
  }
  return cells
}

export function QrCodeCallToAction({
  campaign,
  url,
  headline,
  subhead,
  qrSrc,
  className,
}: QrCodeCallToActionProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const finalHeadline = headline ?? CAMPAIGN_HEADLINE[campaign]
  const finalSubhead = subhead ?? CAMPAIGN_SUBHEAD[campaign]
  const cells = qrSrc ? null : hashCells(url)

  return (
    <article
      className={classes}
      aria-label={`${QR_CAMPAIGN_LABEL[campaign]} — ${finalHeadline}`}
    >
      <div className={styles.qrWrap}>
        {qrSrc ? (
          // eslint-disable-next-line @next/next/no-img-element -- decorative QR rendered downstream
          <img src={qrSrc} alt={`${QR_CAMPAIGN_LABEL[campaign]} QR code`} className={styles.qrImg} />
        ) : (
          <div
            className={styles.qrGrid}
            aria-hidden="true"
            data-cells="25"
          >
            {cells?.map((on, i) => (
              <span key={i} data-on={on ? "1" : "0"} />
            ))}
            <span className={`${styles.eye} ${styles.eyeTl}`} />
            <span className={`${styles.eye} ${styles.eyeTr}`} />
            <span className={`${styles.eye} ${styles.eyeBl}`} />
          </div>
        )}
      </div>
      <div className={styles.body}>
        <span className={styles.kicker}>
          <ScanLine size={18} strokeWidth={2.4} aria-hidden="true" />
          {QR_CAMPAIGN_LABEL[campaign]}
        </span>
        <h2 className={styles.headline}>{finalHeadline}</h2>
        <p className={styles.subhead}>{finalSubhead}</p>
        <span className={styles.urlChip}>
          <ArrowUpRight size={14} strokeWidth={2.4} aria-hidden="true" />
          {url}
        </span>
      </div>
    </article>
  )
}

export default QrCodeCallToAction
