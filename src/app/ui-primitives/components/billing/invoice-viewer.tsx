"use client"

import {
  AU_GST_RATE,
  formatMoney,
  invoiceStatusToLabel,
  type InvoiceLineItem,
  type InvoiceStatus,
  type MoneyAmount,
} from "./billing-types"
import styles from "./invoice-viewer.module.css"

interface InvoiceViewerProps {
  invoiceNumber: string
  status: InvoiceStatus
  issuedISO: string
  dueISO: string
  customerName: string
  customerAddress: ReadonlyArray<string>
  lineItems: ReadonlyArray<InvoiceLineItem>
  /** ABN to print on invoice. */
  abn: string
  onDownloadPdf?: () => void
  onMarkAsPaid?: () => void
  onSendToCustomer?: () => void
}

const STATUS_CLASS: Record<InvoiceStatus, string> = {
  draft: styles.statusDraft,
  open: styles.statusOpen,
  paid: styles.statusPaid,
  overdue: styles.statusOverdue,
  uncollectible: styles.statusUncollectible,
  void: styles.statusVoid,
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(iso))
}

function lineTotal(item: InvoiceLineItem): MoneyAmount {
  return {
    value: item.quantity * item.unitAmount.value,
    currency: item.unitAmount.currency,
  }
}

export function InvoiceViewer({
  invoiceNumber,
  status,
  issuedISO,
  dueISO,
  customerName,
  customerAddress,
  lineItems,
  abn,
  onDownloadPdf,
  onMarkAsPaid,
  onSendToCustomer,
}: InvoiceViewerProps) {
  const currency = lineItems[0]?.unitAmount.currency ?? "AUD"
  const subtotalValue = lineItems.reduce((sum, item) => sum + item.unitAmount.value * item.quantity, 0)
  const taxableValue = lineItems.reduce(
    (sum, item) => sum + (item.taxable ? item.unitAmount.value * item.quantity : 0),
    0,
  )
  const gstValue = taxableValue * AU_GST_RATE
  const totalValue = subtotalValue + gstValue

  const subtotal: MoneyAmount = { value: subtotalValue, currency }
  const gst: MoneyAmount = { value: gstValue, currency }
  const total: MoneyAmount = { value: totalValue, currency }

  return (
    <article className={styles.invoice} aria-label={`Invoice ${invoiceNumber}`}>
      <header className={styles.head}>
        <div className={styles.headTitle}>
          <span className={styles.kicker}>Invoice</span>
          <h3 className={styles.number}>{invoiceNumber}</h3>
          <span className={styles.abn}>ABN {abn}</span>
        </div>
        <span className={`${styles.status} ${STATUS_CLASS[status]}`}>
          {invoiceStatusToLabel(status)}
        </span>
      </header>

      <div className={styles.meta}>
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Billed to</span>
          <span className={styles.metaCustomer}>{customerName}</span>
          {customerAddress.map((line) => (
            <span key={line} className={styles.metaAddress}>{line}</span>
          ))}
        </div>
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Issued</span>
          <span className={styles.metaValue}>{formatDate(issuedISO)}</span>
        </div>
        <div className={styles.metaBlock}>
          <span className={styles.metaLabel}>Due</span>
          <span className={styles.metaValue}>{formatDate(dueISO)}</span>
        </div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th scope="col" className={styles.thDesc}>Description</th>
            <th scope="col" className={styles.thQty}>Qty</th>
            <th scope="col" className={styles.thUnit}>Unit</th>
            <th scope="col" className={styles.thAmount}>Amount</th>
          </tr>
        </thead>
        <tbody>
          {lineItems.map((item) => (
            <tr key={item.id}>
              <td className={styles.tdDesc}>
                {item.description}
                {!item.taxable ? <span className={styles.gstFree}> · GST free</span> : null}
              </td>
              <td className={styles.tdQty}>{item.quantity}</td>
              <td className={styles.tdUnit}>{formatMoney(item.unitAmount)}</td>
              <td className={styles.tdAmount}>{formatMoney(lineTotal(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <dl className={styles.totals}>
        <div className={styles.totalRow}>
          <dt>Subtotal</dt>
          <dd>{formatMoney(subtotal)}</dd>
        </div>
        <div className={styles.totalRow}>
          <dt>GST (10%)</dt>
          <dd>{formatMoney(gst)}</dd>
        </div>
        <div className={`${styles.totalRow} ${styles.totalRowGrand}`}>
          <dt>Total due</dt>
          <dd>{formatMoney(total)}</dd>
        </div>
      </dl>

      <footer className={styles.actions}>
        {onDownloadPdf ? (
          <button type="button" className={styles.actionPrimary} onClick={onDownloadPdf}>
            Download PDF
          </button>
        ) : null}
        {onMarkAsPaid && status !== "paid" ? (
          <button type="button" className={styles.actionGhost} onClick={onMarkAsPaid}>
            Mark as paid
          </button>
        ) : null}
        {onSendToCustomer ? (
          <button type="button" className={styles.actionGhost} onClick={onSendToCustomer}>
            Send to customer
          </button>
        ) : null}
      </footer>
    </article>
  )
}

export default InvoiceViewer
