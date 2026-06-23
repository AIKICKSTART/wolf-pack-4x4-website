"use client"

import { Paperclip } from "lucide-react"
import { useId, useState, type FormEvent } from "react"

import { CartLineItem } from "../commerce/cart-line-item"
import { Chip } from "../primitives/chip"

import styles from "./invoice-submission-form.module.css"

export interface InvoiceLine {
  id: string
  title: string
  sku: string
  unitPrice: number
  quantity: number
}

export interface InvoiceSubmissionPayload {
  invoiceNumber: string
  poRef: string
  attachmentName: string | null
  inclGst: boolean
}

export interface InvoiceSubmissionFormProps {
  /** Pre-fill PO reference, e.g. "PO-OF-0921". */
  defaultPoRef?: string
  /** Pre-fill supplier invoice number. */
  defaultInvoiceNumber?: string
  /** Whether prices are inclusive of GST. Defaults to false (ex GST). */
  defaultInclGst?: boolean
  lines: ReadonlyArray<InvoiceLine>
  onSubmit?: (payload: InvoiceSubmissionPayload) => void
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function InvoiceSubmissionForm({
  defaultPoRef = "",
  defaultInvoiceNumber = "",
  defaultInclGst = false,
  lines,
  onSubmit,
}: InvoiceSubmissionFormProps) {
  const invoiceId = useId()
  const poRefId = useId()
  const attachmentId = useId()
  const [invoiceNumber, setInvoiceNumber] = useState<string>(defaultInvoiceNumber)
  const [poRef, setPoRef] = useState<string>(defaultPoRef)
  const [inclGst, setInclGst] = useState<boolean>(defaultInclGst)
  const [attachmentName, setAttachmentName] = useState<string | null>(null)

  const subtotal = lines.reduce((sum, line) => sum + line.unitPrice * line.quantity, 0)
  const gst = inclGst ? subtotal - subtotal / 1.1 : subtotal * 0.1
  const total = inclGst ? subtotal : subtotal + gst
  const exSubtotal = inclGst ? subtotal - gst : subtotal

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSubmit?.({ invoiceNumber, poRef, attachmentName, inclGst })
  }

  return (
    <form
      className={styles.form}
      onSubmit={handleSubmit}
      aria-label="Invoice submission"
    >
      <header className={styles.head}>
        <span className={styles.eyebrow}>Invoice submission</span>
        <h3 className={styles.title}>Send invoice to Oak Flats</h3>
      </header>

      <div className={styles.grid}>
        <label className={styles.field} htmlFor={invoiceId}>
          <span className={styles.fieldLabel}>Supplier invoice number</span>
          <input
            id={invoiceId}
            type="text"
            value={invoiceNumber}
            onChange={(event) => setInvoiceNumber(event.target.value)}
            className={styles.input}
            placeholder="MP-INV-04129"
            required
          />
        </label>

        <label className={styles.field} htmlFor={poRefId}>
          <span className={styles.fieldLabel}>Oak Flats PO ref</span>
          <input
            id={poRefId}
            type="text"
            value={poRef}
            onChange={(event) => setPoRef(event.target.value)}
            className={styles.input}
            placeholder="PO-OF-0921"
            required
          />
        </label>
      </div>

      <ul className={styles.lines} aria-label="Invoice line items">
        {lines.map((line) => (
          <li key={line.id}>
            <CartLineItem
              id={line.id}
              title={line.title}
              sku={line.sku}
              unitPrice={line.unitPrice}
              quantity={line.quantity}
            />
          </li>
        ))}
      </ul>

      <div className={styles.totals}>
        <div className={styles.totalRow}>
          <span>Subtotal ex GST</span>
          <strong>{formatAud(exSubtotal)}</strong>
        </div>
        <div className={styles.totalRow}>
          <span>GST 10%</span>
          <strong>{formatAud(gst)}</strong>
        </div>
        <div className={`${styles.totalRow} ${styles.totalRowGrand}`}>
          <span>Total incl GST</span>
          <strong>{formatAud(total)}</strong>
        </div>
        <label className={styles.inclToggle}>
          <input
            type="checkbox"
            checked={inclGst}
            onChange={(event) => setInclGst(event.target.checked)}
          />
          <span>Prices entered are GST inclusive</span>
        </label>
      </div>

      <label className={styles.attachment} htmlFor={attachmentId}>
        <Paperclip size={14} aria-hidden="true" />
        <span>{attachmentName ?? "Attach signed invoice PDF"}</span>
        <input
          id={attachmentId}
          type="file"
          accept="application/pdf"
          className={styles.attachmentInput}
          onChange={(event) => {
            const file = event.target.files?.[0] ?? null
            setAttachmentName(file?.name ?? null)
          }}
        />
      </label>

      <footer className={styles.footer}>
        <Chip
          label={`${lines.length} line${lines.length === 1 ? "" : "s"} · ${formatAud(total)}`}
          tone="teal"
        />
        <button type="submit" className={styles.primary}>
          Submit invoice
          <span aria-hidden="true">→</span>
        </button>
      </footer>
    </form>
  )
}

export default InvoiceSubmissionForm
