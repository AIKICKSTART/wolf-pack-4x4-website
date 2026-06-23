"use client"

import { useState } from "react"

import { PaymentReceiptModal, type MoneyAmount } from "../../components/billing"
import styles from "../billing.module.css"

interface ReceiptTriggerProps {
  amount: MoneyAmount
}

export function ReceiptTrigger({ amount }: ReceiptTriggerProps) {
  const [open, setOpen] = useState(true)

  return (
    <div>
      {!open ? (
        <button
          type="button"
          className={styles.fullCenterCta}
          onClick={() => setOpen(true)}
        >
          Re-open receipt modal <span aria-hidden="true">→</span>
        </button>
      ) : null}

      <PaymentReceiptModal
        open={open}
        amount={amount}
        cardBrand="visa"
        cardLast4="4242"
        transactionId="ch_3PqLm09Aa8b29Yz"
        paidISO="2026-05-04T14:32:00+10:00"
        customerEmail="accounts@tarrawanna.marine"
        onClose={() => setOpen(false)}
        onDownloadReceipt={() => undefined}
        onEmailReceipt={() => undefined}
      />
    </div>
  )
}

export default ReceiptTrigger
