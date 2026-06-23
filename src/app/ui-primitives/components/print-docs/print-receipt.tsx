import { BarcodeBlock } from "./barcode-block"
import { PrintSheet } from "./print-sheet"

import styles from "./print-receipt.module.css"

export interface ReceiptLineItem {
  sku: string
  name: string
  quantity: number
  unitPrice: number
}

interface PrintReceiptProps {
  workshopName: string
  workshopAddress: string
  workshopAbn: string
  transactionId: string
  transactionAt: string
  transactionIso: string
  staffName: string
  items: ReadonlyArray<ReceiptLineItem>
  subtotal: number
  gst: number
  total: number
  paid: number
  paymentMethod: string
  change?: number
  currency: string
  footerMessage: string
}

function formatMoney(value: number, currency: string): string {
  return `${currency} ${value.toFixed(2)}`
}

export function PrintReceipt({
  workshopName,
  workshopAddress,
  workshopAbn,
  transactionId,
  transactionAt,
  transactionIso,
  staffName,
  items,
  subtotal,
  gst,
  total,
  paid,
  paymentMethod,
  change,
  currency,
  footerMessage,
}: PrintReceiptProps) {
  return (
    <PrintSheet
      format="Receipt"
      ariaLabel={`Receipt ${transactionId}`}
      header={
        <div className={styles.head}>
          <div className={styles.logo} aria-hidden="true">OFM</div>
          <strong>{workshopName}</strong>
          <span>{workshopAddress}</span>
          <span>ABN {workshopAbn}</span>
        </div>
      }
      footer={
        <div className={styles.footer}>
          <span>{footerMessage}</span>
          <span>Keep this receipt for your records</span>
        </div>
      }
    >
      <div className={styles.txnMeta}>
        <div>
          <span>Txn</span>
          <strong>{transactionId}</strong>
        </div>
        <div>
          <span>When</span>
          <strong>
            <time dateTime={transactionIso}>{transactionAt}</time>
          </strong>
        </div>
        <div>
          <span>Staff</span>
          <strong>{staffName}</strong>
        </div>
      </div>

      <div className={styles.divider} aria-hidden="true" />

      <ul className={styles.items}>
        {items.map((item) => (
          <li key={item.sku} className={styles.item}>
            <div className={styles.itemLine}>
              <span className={styles.itemName}>{item.name}</span>
              <span className={styles.itemAmount}>
                {formatMoney(item.unitPrice * item.quantity, currency)}
              </span>
            </div>
            <div className={styles.itemLine}>
              <span className={styles.itemSku}>{item.sku}</span>
              <span className={styles.itemSku}>
                {item.quantity} × {formatMoney(item.unitPrice, currency)}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <div className={styles.divider} aria-hidden="true" />

      <dl className={styles.totals}>
        <div>
          <dt>Subtotal</dt>
          <dd>{formatMoney(subtotal, currency)}</dd>
        </div>
        <div>
          <dt>GST 10%</dt>
          <dd>{formatMoney(gst, currency)}</dd>
        </div>
        <div className={styles.totalRow}>
          <dt>Total</dt>
          <dd>{formatMoney(total, currency)}</dd>
        </div>
        <div>
          <dt>{paymentMethod}</dt>
          <dd>{formatMoney(paid, currency)}</dd>
        </div>
        {typeof change === "number" ? (
          <div>
            <dt>Change</dt>
            <dd>{formatMoney(change, currency)}</dd>
          </div>
        ) : null}
      </dl>

      <div className={styles.divider} aria-hidden="true" />

      <div className={styles.barcode}>
        <BarcodeBlock value={transactionId} />
      </div>
    </PrintSheet>
  )
}

export default PrintReceipt
