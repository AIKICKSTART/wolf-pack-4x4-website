import { PrintSheet } from "./print-sheet"

import styles from "./print-purchase-order.module.css"

export interface PurchaseOrderParty {
  name: string
  abn?: string
  addressLines: ReadonlyArray<string>
  contactName?: string
  phone?: string
  email?: string
}

export interface PurchaseOrderLine {
  sku: string
  description: string
  quantity: number
  unitPrice: number
}

interface PrintPurchaseOrderProps {
  poNumber: string
  issuedAt: string
  issuedIso: string
  requiredBy: string
  requiredByIso: string
  buyer: PurchaseOrderParty
  supplier: PurchaseOrderParty
  shipTo: PurchaseOrderParty
  lines: ReadonlyArray<PurchaseOrderLine>
  subtotal: number
  gst: number
  total: number
  currency: string
  terms: ReadonlyArray<string>
  authorisedBy: string
}

function formatMoney(value: number, currency: string): string {
  return `${currency} ${value.toFixed(2)}`
}

export function PrintPurchaseOrder({
  poNumber,
  issuedAt,
  issuedIso,
  requiredBy,
  requiredByIso,
  buyer,
  supplier,
  shipTo,
  lines,
  subtotal,
  gst,
  total,
  currency,
  terms,
  authorisedBy,
}: PrintPurchaseOrderProps) {
  return (
    <PrintSheet
      format="A4"
      ariaLabel={`Purchase order ${poNumber}`}
      header={
        <div className={styles.head}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true">OFM</div>
            <div className={styles.brandCopy}>
              <strong>{buyer.name}</strong>
              {buyer.abn ? <small>ABN {buyer.abn}</small> : null}
              {buyer.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
          <div className={styles.docMeta}>
            <h1>Purchase order</h1>
            <dl>
              <div>
                <dt>PO no.</dt>
                <dd>{poNumber}</dd>
              </div>
              <div>
                <dt>Issued</dt>
                <dd>
                  <time dateTime={issuedIso}>{issuedAt}</time>
                </dd>
              </div>
              <div>
                <dt>Required by</dt>
                <dd>
                  <time dateTime={requiredByIso}>{requiredBy}</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      }
      footer={
        <>
          <span>This purchase order is binding upon supplier acceptance. Reference {poNumber} on all correspondence.</span>
          <span>Authorised by {authorisedBy} · {buyer.name}</span>
        </>
      }
    >
      <section className={styles.parties} aria-label="Supplier and ship-to">
        <article className={styles.party}>
          <span className={styles.kicker}>Supplier</span>
          <strong>{supplier.name}</strong>
          {supplier.abn ? <span>ABN {supplier.abn}</span> : null}
          <address>
            {supplier.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {supplier.contactName ? <span>Attn: {supplier.contactName}</span> : null}
            {supplier.phone ? <span>{supplier.phone}</span> : null}
            {supplier.email ? <span>{supplier.email}</span> : null}
          </address>
        </article>
        <article className={styles.party}>
          <span className={styles.kicker}>Deliver to</span>
          <strong>{shipTo.name}</strong>
          <address>
            {shipTo.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {shipTo.contactName ? <span>Attn: {shipTo.contactName}</span> : null}
            {shipTo.phone ? <span>{shipTo.phone}</span> : null}
          </address>
        </article>
      </section>

      <section aria-label="Line items">
        <table className={styles.itemsTable}>
          <thead>
            <tr>
              <th scope="col" className={styles.colSku}>SKU</th>
              <th scope="col">Description</th>
              <th scope="col" className={styles.colNum}>Qty</th>
              <th scope="col" className={styles.colNum}>Unit</th>
              <th scope="col" className={styles.colNum}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {lines.map((line) => (
              <tr key={line.sku}>
                <td className={styles.colSku}>{line.sku}</td>
                <td>{line.description}</td>
                <td className={styles.colNum}>{line.quantity}</td>
                <td className={styles.colNum}>{formatMoney(line.unitPrice, currency)}</td>
                <td className={styles.colNum}>
                  {formatMoney(line.unitPrice * line.quantity, currency)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={4} className={styles.footLabel}>
                Subtotal
              </td>
              <td className={styles.colNum}>{formatMoney(subtotal, currency)}</td>
            </tr>
            <tr>
              <td colSpan={4} className={styles.footLabel}>
                GST 10%
              </td>
              <td className={styles.colNum}>{formatMoney(gst, currency)}</td>
            </tr>
            <tr className={styles.totalRow}>
              <td colSpan={4} className={styles.footLabel}>
                Total
              </td>
              <td className={styles.colNum}>{formatMoney(total, currency)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className={styles.terms} aria-label="Purchase order terms">
        <span className={styles.kicker}>Terms</span>
        <ul>
          {terms.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </section>

      <section className={styles.signoff} aria-label="Authorisation">
        <div>
          <span className={styles.kicker}>Authorised by</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>{authorisedBy} · {buyer.name}</small>
        </div>
        <div>
          <span className={styles.kicker}>Supplier acceptance</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>Signature · Date</small>
        </div>
      </section>
    </PrintSheet>
  )
}

export default PrintPurchaseOrder
