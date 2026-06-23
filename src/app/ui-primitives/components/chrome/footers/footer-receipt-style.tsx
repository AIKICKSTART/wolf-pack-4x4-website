import Image from "next/image"
import { Fragment } from "react"

import {
  ClipboardCheckIcon,
  CompassRoseIcon,
  EnvelopeTrailIcon,
  PhoneRingIcon,
  ShieldTickIcon,
  SpannerIcon,
} from "../../icons"
import { NeuoSurface } from "../../surfaces/neuo-surface"
import type { ChromeBrandConfig, ChromeNavItem } from "../chrome-types"

import styles from "./footer-receipt-style.module.css"

export interface FooterReceiptDetail {
  id: string
  label: string
  value: string
  href?: string
}

export interface FooterReceiptStyleProps {
  brand: ChromeBrandConfig
  details: ReadonlyArray<FooterReceiptDetail>
  abn: string
  acknowledgement: string
  legalLinks: ReadonlyArray<ChromeNavItem>
  /** Optional barcode number string rendered under the lines. */
  receiptNumber?: string
  className?: string
}

const DETAIL_ICONS = {
  workshop: SpannerIcon,
  phone: PhoneRingIcon,
  email: EnvelopeTrailIcon,
  hours: ClipboardCheckIcon,
  address: CompassRoseIcon,
  abn: ShieldTickIcon,
} as const

type DetailIconKey = keyof typeof DETAIL_ICONS

function isDetailIconKey(value: string): value is DetailIconKey {
  return value in DETAIL_ICONS
}

const BARCODE_BARS = 56

export function FooterReceiptStyle({
  brand,
  details,
  abn,
  acknowledgement,
  legalLinks,
  receiptNumber = "OFM-1968-XXXX",
  className,
}: FooterReceiptStyleProps) {
  const classes = [styles.footer, className].filter(Boolean).join(" ")

  return (
    <footer role="contentinfo" aria-label="Site footer" className={classes}>
      <NeuoSurface tone="amber" className={styles.receipt}>
        <div className={styles.brandHead}>
          <Image
            src={brand.logoSrc}
            alt={brand.logoAlt}
            width={40}
            height={40}
          />
          <strong>{brand.wordmark}</strong>
          <span>{brand.caption}</span>
        </div>

        <p className={styles.divider}>· · · · · · · · · · · · · · · · · · · ·</p>

        <dl style={{ display: "grid", gap: 10, margin: 0 }}>
          {details.map((detail) => {
            const Icon = isDetailIconKey(detail.id) ? DETAIL_ICONS[detail.id] : SpannerIcon
            return (
              <div key={detail.id} className={styles.row}>
                <Icon size={14} tone="currentColor" />
                <dt>{detail.label}</dt>
                <span className={styles.dots} aria-hidden="true" />
                <dd>
                  {detail.href ? (
                    <a href={detail.href}>{detail.value}</a>
                  ) : (
                    detail.value
                  )}
                </dd>
              </div>
            )
          })}
          <div className={styles.row}>
            <ShieldTickIcon size={14} tone="currentColor" />
            <dt>ABN</dt>
            <span className={styles.dots} aria-hidden="true" />
            <dd>{abn}</dd>
          </div>
        </dl>

        <p className={styles.divider}>· · · · · · · · · · · · · · · · · · · ·</p>

        <p className={styles.acknowledgement}>{acknowledgement}</p>

        <nav className={styles.legalLinks} aria-label="Legal">
          {legalLinks.map((link, index) => (
            <Fragment key={link.id}>
              {index > 0 ? <span aria-hidden="true">·</span> : null}
              <a href={link.href}>{link.label}</a>
            </Fragment>
          ))}
        </nav>

        <div className={styles.barcode} aria-hidden="true">
          <div className={styles.barcodeLines}>
            {Array.from({ length: BARCODE_BARS }).map((_, i) => (
              <span key={i} />
            ))}
          </div>
          <span className={styles.barcodeText}>{receiptNumber}</span>
        </div>
      </NeuoSurface>
    </footer>
  )
}

export default FooterReceiptStyle
