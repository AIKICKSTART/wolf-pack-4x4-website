import { PrintSheet } from "./print-sheet"

import styles from "./print-invoice.module.css"

export interface InvoiceParty {
  name: string
  abn?: string
  addressLines: ReadonlyArray<string>
  email?: string
  phone?: string
}

export interface InvoiceLineItem {
  sku: string
  description: string
  quantity: number
  unitPrice: number
}

export interface InvoiceTotals {
  subtotal: number
  gst: number
  total: number
  currency: string
}

interface PrintInvoiceProps {
  invoiceNumber: string
  issuedAt: string
  issuedIso: string
  dueAt: string
  dueIso: string
  from: InvoiceParty
  billTo: InvoiceParty
  items: ReadonlyArray<InvoiceLineItem>
  totals: InvoiceTotals
  paymentTerms: string
  paymentInstructions: ReadonlyArray<string>
  notes?: string
}

function formatMoney(value: number, currency: string): string {
  return `${currency} ${value.toFixed(2)}`
}

export function PrintInvoice({
  invoiceNumber,
  issuedAt,
  issuedIso,
  dueAt,
  dueIso,
  from,
  billTo,
  items,
  totals,
  paymentTerms,
  paymentInstructions,
  notes,
}: PrintInvoiceProps) {
  return (
    <PrintSheet
      format="A4"
      ariaLabel={`Tax invoice ${invoiceNumber}`}
      header={
        <div className={styles.head}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true">
              OFM
            </div>
            <div className={styles.brandCopy}>
              <strong>{from.name}</strong>
              <span>
                {from.addressLines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </span>
              {from.abn ? <small>ABN {from.abn}</small> : null}
            </div>
          </div>
          <div className={styles.docMeta}>
            <h1>Tax Invoice</h1>
            <dl>
              <div>
                <dt>Invoice no.</dt>
                <dd>{invoiceNumber}</dd>
              </div>
              <div>
                <dt>Issued</dt>
                <dd>
                  <time dateTime={issuedIso}>{issuedAt}</time>
                </dd>
              </div>
              <div>
                <dt>Due</dt>
                <dd>
                  <time dateTime={dueIso}>{dueAt}</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      }
      footer={
        <>
          <span>This document is a tax invoice for GST purposes — keep for your records.</span>
          <span>{from.name} · {from.email ?? ""} · {from.phone ?? ""}</span>
        </>
      }
    >
      <section className={styles.parties} aria-label="Invoice parties">
        <article className={styles.party}>
          <span className={styles.partyKicker}>Bill to</span>
          <strong>{billTo.name}</strong>
          {billTo.abn ? <span>ABN {billTo.abn}</span> : null}
          <address>
            {billTo.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {billTo.email ? <span>{billTo.email}</span> : null}
            {billTo.phone ? <span>{billTo.phone}</span> : null}
          </address>
        </article>
        <article className={styles.party}>
          <span className={styles.partyKicker}>Terms</span>
          <strong>{paymentTerms}</strong>
          <span>Currency: {totals.currency}</span>
          <span>GST included where indicated</span>
        </article>
      </section>

      <section className={styles.itemsSection} aria-label="Invoice line items">
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.colSku}>SKU</th>
              <th scope="col">Description</th>
              <th scope="col" className={styles.colQty}>Qty</th>
              <th scope="col" className={styles.colMoney}>Unit</th>
              <th scope="col" className={styles.colMoney}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sku}>
                <td className={styles.colSku}>{item.sku}</td>
                <td>{item.description}</td>
                <td className={styles.colQty}>{item.quantity}</td>
                <td className={styles.colMoney}>{formatMoney(item.unitPrice, totals.currency)}</td>
                <td className={styles.colMoney}>
                  {formatMoney(item.unitPrice * item.quantity, totals.currency)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className={styles.summary} aria-label="Invoice totals">
        <dl className={styles.totals}>
          <div>
            <dt>Subtotal</dt>
            <dd>{formatMoney(totals.subtotal, totals.currency)}</dd>
          </div>
          <div>
            <dt>GST (10%)</dt>
            <dd>{formatMoney(totals.gst, totals.currency)}</dd>
          </div>
          <div className={styles.totalRow}>
            <dt>Total due</dt>
            <dd>{formatMoney(totals.total, totals.currency)}</dd>
          </div>
        </dl>
      </section>

      <section className={styles.paymentSection} aria-label="Payment instructions">
        <h2>How to pay</h2>
        <ul>
          {paymentInstructions.map((instruction) => (
            <li key={instruction}>{instruction}</li>
          ))}
        </ul>
        {notes ? (
          <p className={styles.notes}>
            <strong>Notes:</strong> {notes}
          </p>
        ) : null}
      </section>
    </PrintSheet>
  )
}

export default PrintInvoice
