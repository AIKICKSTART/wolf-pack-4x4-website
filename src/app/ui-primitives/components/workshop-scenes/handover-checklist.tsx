import {
  Camera,
  CheckCircle2,
  FileText,
  Play,
  Printer,
  Send,
  Volume2,
} from "lucide-react"

import styles from "./handover-checklist.module.css"

export interface HandoverPhoto {
  id: string
  label: string
}

export interface HandoverInvoiceLine {
  label: string
  amount: number
}

export type HandoverPaymentState = "paid" | "deposit" | "due"

export interface HandoverChecklistProps {
  jobNumber: string
  customerName: string
  vehicle: string
  photos: ReadonlyArray<HandoverPhoto>
  /** Length of the captured exhaust sound clip, mm:ss. */
  soundClipLength: string
  invoiceLines: ReadonlyArray<HandoverInvoiceLine>
  /** GST rate, default 0.10. */
  gstRate?: number
  paymentState: HandoverPaymentState
  /** Optional verbatim status line, e.g. "EFTPOS · 14:22". */
  paymentMeta?: string
}

const PAYMENT_LABEL: Record<HandoverPaymentState, string> = {
  paid: "Paid",
  deposit: "Deposit only",
  due: "Outstanding",
}

function formatAud(amount: number, fractionDigits = 2): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}

export function HandoverChecklist({
  jobNumber,
  customerName,
  vehicle,
  photos,
  soundClipLength,
  invoiceLines,
  gstRate = 0.1,
  paymentState,
  paymentMeta,
}: HandoverChecklistProps) {
  const subtotal = invoiceLines.reduce((sum, line) => sum + line.amount, 0)
  const gst = subtotal * gstRate
  const total = subtotal + gst

  return (
    <section
      className={styles.handover}
      aria-label={`Handover checklist for job ${jobNumber}`}
    >
      <header className={styles.head}>
        <div className={styles.identity}>
          <span className={styles.kicker}>Handover</span>
          <h3 className={styles.title}>{vehicle}</h3>
          <p className={styles.subhead}>
            Walk {customerName} through the build before keys swap hands.
            Photos, recorded sound check, and invoice — all ready to share.
          </p>
        </div>
      </header>

      <ol className={styles.stage}>
        <li className={styles.stageRow}>
          <span className={styles.stageBadge} aria-hidden="true">
            <Camera />
          </span>
          <div className={styles.stageBody}>
            <strong className={styles.stageTitle}>Photo evidence</strong>
            <span className={styles.stageMeta}>
              {photos.length} captures · before / during / after
            </span>
          </div>
          <div className={styles.thumbStrip} role="list">
            {photos.map((photo) => (
              <span key={photo.id} className={styles.evidenceThumb} role="listitem">
                {photo.label}
              </span>
            ))}
          </div>
        </li>

        <li className={styles.stageRow}>
          <span className={styles.stageBadge} aria-hidden="true">
            <Volume2 />
          </span>
          <div className={styles.stageBody}>
            <strong className={styles.stageTitle}>Sound demo</strong>
            <span className={styles.stageMeta}>
              Captured at bay 2 · {soundClipLength}
            </span>
          </div>
          <button
            type="button"
            className={styles.soundPlay}
            aria-label={`Play exhaust sound clip, length ${soundClipLength}`}
          >
            <Play size={14} strokeWidth={2.4} aria-hidden="true" />
            Play idle + revs
            <span className={styles.soundWave} aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </span>
          </button>
        </li>

        <li className={styles.stageRow}>
          <span className={styles.stageBadge} aria-hidden="true">
            <FileText />
          </span>
          <div className={styles.invoice}>
            <div className={styles.invoiceBody}>
              {invoiceLines.map((line) => (
                <div key={line.label} className={styles.invoiceRow}>
                  <span>{line.label}</span>
                  <strong>{formatAud(line.amount)}</strong>
                </div>
              ))}
              <div className={styles.invoiceRow}>
                <span>GST ({Math.round(gstRate * 100)}%)</span>
                <strong>{formatAud(gst)}</strong>
              </div>
              <div className={`${styles.invoiceRow} ${styles.invoiceTotal}`}>
                <span>Total inc GST</span>
                <strong>{formatAud(total, 0)}</strong>
              </div>
            </div>
            <div className={styles.payment} data-state={paymentState}>
              {PAYMENT_LABEL[paymentState]}
              <strong>{paymentMeta ?? ""}</strong>
            </div>
          </div>
        </li>

        <li className={styles.stageRow}>
          <span className={styles.stageBadge} aria-hidden="true">
            <CheckCircle2 />
          </span>
          <div className={styles.stageBody}>
            <strong className={styles.stageTitle}>Confirmation</strong>
            <span className={styles.stageMeta}>
              Send the customer their build pack and stamp the file complete.
            </span>
          </div>
          <div />
        </li>
      </ol>

      <div className={styles.actions}>
        <button type="button" className={styles.actionPrimary}>
          <Send size={14} strokeWidth={2.4} aria-hidden="true" />
          Send to customer
        </button>
        <button type="button" className={styles.actionSecondary}>
          <Printer size={14} strokeWidth={2.4} aria-hidden="true" />
          Print receipt
        </button>
      </div>
    </section>
  )
}

export default HandoverChecklist
