import type { CSSProperties } from "react"

import styles from "./receipt-preview-card.module.css"

export interface ReceiptPreviewLine {
  /** Stable id. */
  id: string
  /** Display title for the line. */
  title: string
  /** SKU shown beneath the title. */
  sku: string
  /** Quantity sold. */
  quantity: number
  /** Unit price inc GST in AUD. */
  unitPrice: number
}

export interface ReceiptPreviewTender {
  /** Tender method label. */
  method: string
  /** Amount in AUD. */
  amount: number
}

interface ReceiptPreviewCardProps {
  /** Receipt number, e.g. "OFM-30418". */
  receiptNumber: string
  /** Sale date / time label, e.g. "29 May 2026 · 14:32". */
  issuedLabel: string
  /** Operator who served the customer. */
  operator: string
  /** Customer note line. */
  customerNote?: string
  /** Sale line items. */
  lines: ReadonlyArray<ReceiptPreviewLine>
  /** AUD GST rate. */
  gstRate?: number
  /** Tender breakdown. */
  tenders: ReadonlyArray<ReceiptPreviewTender>
  /** Footer message printed under the barcode. */
  footerNote?: string
}

function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

function makeBarcodeBits(seed: string): ReadonlyArray<{ empty: boolean; thin: boolean }> {
  let hash = 0
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) & 0xffffffff
  }
  const bits: Array<{ empty: boolean; thin: boolean }> = []
  let state = Math.abs(hash) || 1
  for (let i = 0; i < 40; i++) {
    state = (state * 1664525 + 1013904223) & 0xffffffff
    const value = (state >>> 0) & 0xff
    bits.push({ empty: value < 96, thin: value > 192 })
  }
  return bits
}

export function ReceiptPreviewCard({
  receiptNumber,
  issuedLabel,
  operator,
  customerNote,
  lines,
  gstRate = 0.1,
  tenders,
  footerNote = "Thanks for choosing Oak Flats Mufflermen",
}: ReceiptPreviewCardProps) {
  const totalIncGst = lines.reduce(
    (acc, line) => acc + line.unitPrice * line.quantity,
    0,
  )
  const totalExGst = totalIncGst / (1 + gstRate)
  const gst = totalIncGst - totalExGst
  const totalTendered = tenders.reduce((acc, tender) => acc + tender.amount, 0)
  const bits = makeBarcodeBits(receiptNumber)

  return (
    <article className={styles.frame} aria-label={`Receipt preview ${receiptNumber}`}>
      <span className={styles.receiptKicker}>Receipt · A6 thermal preview</span>
      <div className={styles.frameMeta}>
        <span>Bay 1 · register</span>
        <span>{receiptNumber}</span>
      </div>

      <div className={styles.paper}>
        <header className={styles.brand}>
          <span className={styles.logo}>OFM</span>
          <h3 className={styles.brandName}>Oak Flats Mufflermen</h3>
          <p className={styles.brandTag}>149 Lake Entrance Rd · Oak Flats NSW</p>
          <p className={styles.brandTag}>ABN 12 345 678 901 · 02 4256 0000</p>
        </header>

        <hr className={styles.divider} />

        <div className={styles.totalsRow}>
          <span>{issuedLabel}</span>
          <span>{operator}</span>
        </div>
        {customerNote && (
          <div className={styles.totalsRow}>
            <span className={styles.muted}>Customer</span>
            <span>{customerNote}</span>
          </div>
        )}

        <hr className={styles.divider} />

        {lines.map((line) => (
          <div key={line.id} className={styles.lineRow}>
            <span className={styles.lineTitle}>{line.title}</span>
            <span className={styles.linePrice}>
              {formatAud(line.unitPrice * line.quantity)}
            </span>
            <span className={styles.lineMeta}>
              SKU {line.sku} · {line.quantity} × {formatAud(line.unitPrice)}
            </span>
          </div>
        ))}

        <hr className={styles.divider} />

        <div className={styles.totalsRow}>
          <span>Subtotal ex GST</span>
          <span>{formatAud(totalExGst)}</span>
        </div>
        <div className={styles.totalsRow}>
          <span>GST {Math.round(gstRate * 100)}%</span>
          <span>{formatAud(gst)}</span>
        </div>
        <div className={styles.grand}>
          <span>Total inc GST</span>
          <span>{formatAud(totalIncGst)}</span>
        </div>

        {tenders.map((tender, index) => (
          <div key={`${tender.method}-${index}`} className={styles.tenderRow}>
            <span>{tender.method}</span>
            <span>{formatAud(tender.amount)}</span>
          </div>
        ))}

        <div className={styles.tenderRow}>
          <strong>Tendered</strong>
          <strong>{formatAud(totalTendered)}</strong>
        </div>

        <hr className={styles.divider} />

        <div
          className={styles.barcode}
          aria-label="Receipt barcode"
          role="img"
        >
          {bits.map((bit, index) => (
            <span
              key={index}
              className={styles.barcodeBit}
              data-empty={bit.empty}
              data-thin={bit.thin}
              style={{ "--barcode-bit": String(index) } as CSSProperties}
            />
          ))}
        </div>

        <p className={styles.footer}>{footerNote}</p>
        <p className={styles.muted}>{receiptNumber} · keep for warranty</p>
      </div>
    </article>
  )
}

export default ReceiptPreviewCard
