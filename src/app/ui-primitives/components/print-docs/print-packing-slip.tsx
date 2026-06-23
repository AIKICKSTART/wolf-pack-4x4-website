import { BarcodeBlock } from "./barcode-block"
import { PrintSheet } from "./print-sheet"

import styles from "./print-packing-slip.module.css"

export interface PackingAddress {
  name: string
  addressLines: ReadonlyArray<string>
  contact?: string
}

export interface PackingLineItem {
  sku: string
  description: string
  quantityOrdered: number
  quantityPacked: number
}

interface PrintPackingSlipProps {
  orderRef: string
  packedAt: string
  packedIso: string
  shipFrom: PackingAddress
  shipTo: PackingAddress
  items: ReadonlyArray<PackingLineItem>
  freightMethod: string
  freightTrackingNumber: string
  packedBy: string
  notes?: string
}

export function PrintPackingSlip({
  orderRef,
  packedAt,
  packedIso,
  shipFrom,
  shipTo,
  items,
  freightMethod,
  freightTrackingNumber,
  packedBy,
  notes,
}: PrintPackingSlipProps) {
  const totalOrdered = items.reduce((sum, item) => sum + item.quantityOrdered, 0)
  const totalPacked = items.reduce((sum, item) => sum + item.quantityPacked, 0)

  return (
    <PrintSheet
      format="A4"
      ariaLabel={`Packing slip ${orderRef}`}
      header={
        <div className={styles.head}>
          <div>
            <span className={styles.kicker}>Outbound</span>
            <h1>Packing slip</h1>
          </div>
          <dl className={styles.docMeta}>
            <div>
              <dt>Order ref</dt>
              <dd>{orderRef}</dd>
            </div>
            <div>
              <dt>Packed</dt>
              <dd>
                <time dateTime={packedIso}>{packedAt}</time>
              </dd>
            </div>
            <div>
              <dt>Packed by</dt>
              <dd>{packedBy}</dd>
            </div>
          </dl>
        </div>
      }
      footer={
        <>
          <span>Verify all items against this slip before signing. Damaged goods must be reported within 48 hours.</span>
          <span>Oak Flats Mufflermen · Workshop dispatch</span>
        </>
      }
    >
      <section className={styles.addresses} aria-label="Ship from and ship to">
        <article className={styles.address}>
          <span className={styles.kicker}>Ship from</span>
          <strong>{shipFrom.name}</strong>
          <address>
            {shipFrom.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {shipFrom.contact ? <span>{shipFrom.contact}</span> : null}
          </address>
        </article>
        <article className={styles.address}>
          <span className={styles.kicker}>Ship to</span>
          <strong>{shipTo.name}</strong>
          <address>
            {shipTo.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {shipTo.contact ? <span>{shipTo.contact}</span> : null}
          </address>
        </article>
        <article className={styles.address}>
          <span className={styles.kicker}>Freight</span>
          <strong>{freightMethod}</strong>
          <span>Tracking: {freightTrackingNumber}</span>
          <div className={styles.barcodeWrap}>
            <BarcodeBlock value={freightTrackingNumber} />
          </div>
        </article>
      </section>

      <section aria-label="Packed items">
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.colSku}>SKU</th>
              <th scope="col">Description</th>
              <th scope="col" className={styles.colNum}>Ordered</th>
              <th scope="col" className={styles.colNum}>Packed</th>
              <th scope="col" className={styles.colCheck}>Check</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.sku}>
                <td className={styles.colSku}>{item.sku}</td>
                <td>{item.description}</td>
                <td className={styles.colNum}>{item.quantityOrdered}</td>
                <td className={styles.colNum}>{item.quantityPacked}</td>
                <td className={styles.colCheck}>
                  <span className={styles.checkBox} aria-hidden="true" />
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className={styles.footLabel}>
                Totals
              </td>
              <td className={styles.colNum}>{totalOrdered}</td>
              <td className={styles.colNum}>{totalPacked}</td>
              <td />
            </tr>
          </tfoot>
        </table>
      </section>

      {notes ? (
        <section className={styles.notes} aria-label="Notes">
          <span className={styles.kicker}>Notes</span>
          <p>{notes}</p>
        </section>
      ) : null}

      <section className={styles.signoff} aria-label="Sign-off">
        <div>
          <span className={styles.kicker}>Packed by</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>{packedBy} · <time dateTime={packedIso}>{packedAt}</time></small>
        </div>
        <div>
          <span className={styles.kicker}>Received by</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>Signature · Date</small>
        </div>
      </section>
    </PrintSheet>
  )
}

export default PrintPackingSlip
