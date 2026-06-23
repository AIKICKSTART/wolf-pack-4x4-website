import { Chip } from "../primitives/chip"

import styles from "./payment-status-row.module.css"
import type { PaymentState, SupplierTone } from "./supplier-portal-types"

export interface PaymentStatusRowProps {
  /** Supplier invoice number, e.g. "MP-INV-04129". */
  invoiceNumber: string
  /** Reference PO, e.g. "PO-OF-0921". */
  poRef: string
  /** Total amount in AUD inclusive of GST. */
  amountAud: number
  /** Due-date label, e.g. "Due 14 Jun". */
  dueDateLabel: string
  /** Days since the invoice was submitted. */
  daysSinceSubmitted: number
  state: PaymentState
}

const STATE_LABEL: Record<PaymentState, string> = {
  paid: "Paid",
  "in-approval": "In approval",
  disputed: "Disputed",
  overdue: "Overdue",
}

const STATE_TONE: Record<PaymentState, SupplierTone> = {
  paid: "green",
  "in-approval": "teal",
  disputed: "amber",
  overdue: "red",
}

function formatAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount)
}

export function PaymentStatusRow({
  invoiceNumber,
  poRef,
  amountAud,
  dueDateLabel,
  daysSinceSubmitted,
  state,
}: PaymentStatusRowProps) {
  const tone = STATE_TONE[state]
  const isOverdue = state === "overdue"

  return (
    <tr
      className={styles.row}
      data-tone={tone}
      {...(isOverdue ? { role: "alert" } : {})}
      aria-label={`Invoice ${invoiceNumber}, ${STATE_LABEL[state]}`}
    >
      <th scope="row" className={styles.invoiceCell}>
        <span className={styles.invoiceNumber}>{invoiceNumber}</span>
        <span className={styles.poRef}>{poRef}</span>
      </th>
      <td className={styles.amount}>{formatAud(amountAud)}</td>
      <td className={styles.due}>{dueDateLabel}</td>
      <td className={styles.statusCell}>
        <Chip label={STATE_LABEL[state]} tone={tone} />
      </td>
      <td className={styles.daysCell}>
        <Chip
          label={`${daysSinceSubmitted}d since submit`}
          tone={daysSinceSubmitted > 30 ? "red" : daysSinceSubmitted > 14 ? "amber" : "teal"}
        />
      </td>
    </tr>
  )
}

export default PaymentStatusRow
