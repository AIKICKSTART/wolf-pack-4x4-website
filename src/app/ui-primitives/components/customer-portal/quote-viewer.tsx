"use client"

import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"
import { CatBackSystemIcon } from "../icons/cat-back-system"
import { SpannerIcon } from "../icons/spanner"
import { PriceTagIcon } from "../icons/price-tag"
import {
  QUOTE_STATUS_LABEL,
  QUOTE_STATUS_TONE,
  formatAud,
  portalToneToChip,
  type CustomerQuote,
  type QuoteLineKind,
  type QuoteStatus,
} from "./customer-portal-types"

import styles from "./quote-viewer.module.css"

interface QuoteViewerProps {
  quote: CustomerQuote
  /** Optional accept handler. */
  onAccept?: (id: string) => void
  /** Optional decline handler. */
  onDecline?: (id: string) => void
  /** Optional download handler for the PDF copy. */
  onDownload?: (id: string) => void
  className?: string
}

interface QuoteTotals {
  subtotal: number
  gst: number
  total: number
}

const KIND_ICON: Readonly<Record<QuoteLineKind, typeof CatBackSystemIcon>> = {
  part: CatBackSystemIcon,
  labour: SpannerIcon,
  fee: PriceTagIcon,
}

const KIND_LABEL: Readonly<Record<QuoteLineKind, string>> = {
  part: "Part",
  labour: "Labour",
  fee: "Fee",
}

const KIND_TONE: Readonly<Record<QuoteLineKind, "amber" | "teal" | "neutral">> = {
  part: "amber",
  labour: "teal",
  fee: "neutral",
}

function lineSubtotal(unit: number, qty: number, gstIncluded?: boolean): number {
  const gross = unit * qty
  if (gstIncluded) return gross / 1.1
  return gross
}

function calculateTotals(quote: CustomerQuote): QuoteTotals {
  let subtotal = 0
  for (const item of quote.lineItems) {
    subtotal += lineSubtotal(item.unitAud, item.quantity, item.gstIncluded)
  }
  const gst = subtotal * 0.1
  return {
    subtotal,
    gst,
    total: subtotal + gst,
  }
}

export function QuoteViewer({
  quote,
  onAccept,
  onDecline,
  onDownload,
  className,
}: QuoteViewerProps) {
  const [decision, setDecision] = useState<QuoteStatus>(quote.status)
  const totals = useMemo(() => calculateTotals(quote), [quote])
  const classes = [styles.viewer, className].filter(Boolean).join(" ")
  const statusTone = portalToneToChip(QUOTE_STATUS_TONE[decision])
  const isLocked =
    decision === "accepted" ||
    decision === "declined" ||
    decision === "expired"

  const handleAccept = () => {
    setDecision("accepted")
    onAccept?.(quote.id)
  }

  const handleDecline = () => {
    setDecision("declined")
    onDecline?.(quote.id)
  }

  return (
    <article
      className={classes}
      data-quote={quote.id}
      aria-label={`Quote ${quote.number} for ${quote.vehicleLabel}`}
    >
      <header className={styles.head}>
        <div className={styles.headIdentity}>
          <span className={styles.kicker}>Quote {quote.number}</span>
          <h3 className={styles.title}>{quote.vehicleLabel}</h3>
          <div className={styles.metaRow}>
            <span>
              Rego <strong>{quote.rego}</strong>
            </span>
            <span>
              Prepared by <strong>{quote.preparedBy}</strong>
            </span>
            <span>
              <time>{quote.preparedAt}</time>
            </span>
          </div>
        </div>
        <Chip label={QUOTE_STATUS_LABEL[decision]} tone={statusTone} />
      </header>

      {quote.note ? (
        <p className={styles.note}>
          <span className={styles.noteKicker}>From the workshop</span>
          {quote.note}
        </p>
      ) : null}

      <section className={styles.tableWrap} aria-label="Quote line items">
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" className={styles.tableQty}>
                Qty
              </th>
              <th scope="col" className={styles.tableUnit}>
                Unit
              </th>
              <th scope="col" className={styles.tableTotal}>
                Subtotal
              </th>
            </tr>
          </thead>
          <tbody>
            {quote.lineItems.map((item) => {
              const Icon = KIND_ICON[item.kind]
              const subtotalAud = lineSubtotal(
                item.unitAud,
                item.quantity,
                item.gstIncluded,
              )
              return (
                <tr key={item.id}>
                  <td>
                    <div className={styles.itemHead}>
                      <span
                        className={styles.itemIcon}
                        aria-hidden="true"
                      >
                        <Icon size={20} tone="currentColor" motion="none" />
                      </span>
                      <div className={styles.itemText}>
                        <span className={styles.itemLabel}>{item.label}</span>
                        {item.detail ? (
                          <span className={styles.itemDetail}>
                            {item.detail}
                          </span>
                        ) : null}
                      </div>
                      <Chip
                        label={KIND_LABEL[item.kind]}
                        tone={KIND_TONE[item.kind]}
                      />
                    </div>
                  </td>
                  <td className={styles.tableQty}>{item.quantity}</td>
                  <td className={styles.tableUnit}>
                    {formatAud(item.unitAud)}
                  </td>
                  <td className={styles.tableTotal}>
                    {formatAud(subtotalAud)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </section>

      <section className={styles.totals} aria-label="Quote totals">
        <dl>
          <div>
            <dt>Subtotal (ex GST)</dt>
            <dd>{formatAud(totals.subtotal)}</dd>
          </div>
          <div>
            <dt>GST 10%</dt>
            <dd>{formatAud(totals.gst)}</dd>
          </div>
          <div className={styles.totalsGrand}>
            <dt>Total inc GST</dt>
            <dd>{formatAud(totals.total)}</dd>
          </div>
        </dl>
      </section>

      <footer className={styles.foot}>
        <div className={styles.validity}>
          Valid until <time>{quote.validUntil}</time>
        </div>
        <div className={styles.actions}>
          {onDownload ? (
            <button
              type="button"
              className={styles.actionGhost}
              onClick={() => onDownload(quote.id)}
            >
              Download PDF
            </button>
          ) : null}
          <button
            type="button"
            className={styles.actionGhost}
            onClick={handleDecline}
            disabled={isLocked}
            aria-pressed={decision === "declined"}
          >
            Decline
          </button>
          <button
            type="button"
            className={styles.actionPrimary}
            onClick={handleAccept}
            disabled={isLocked}
            aria-pressed={decision === "accepted"}
          >
            {decision === "accepted" ? "Accepted" : "Accept quote"}
          </button>
        </div>
      </footer>
    </article>
  )
}

export default QuoteViewer
