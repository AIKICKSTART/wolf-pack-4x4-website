import { PrintSheet } from "./print-sheet"

import styles from "./print-quote.module.css"

export interface QuoteParty {
  name: string
  abn?: string
  addressLines: ReadonlyArray<string>
  phone?: string
  email?: string
}

export interface QuoteScopeItem {
  index: string
  title: string
  detail: string
}

export interface QuotePricingItem {
  description: string
  quantity: number
  unitPrice: number
}

interface PrintQuoteProps {
  quoteNumber: string
  issuedAt: string
  issuedIso: string
  validUntil: string
  validUntilIso: string
  from: QuoteParty
  customer: QuoteParty
  vehicle: string
  scopeItems: ReadonlyArray<QuoteScopeItem>
  pricing: ReadonlyArray<QuotePricingItem>
  subtotal: number
  gst: number
  total: number
  currency: string
  termsAndConditions: ReadonlyArray<string>
}

function formatMoney(value: number, currency: string): string {
  return `${currency} ${value.toFixed(2)}`
}

export function PrintQuote({
  quoteNumber,
  issuedAt,
  issuedIso,
  validUntil,
  validUntilIso,
  from,
  customer,
  vehicle,
  scopeItems,
  pricing,
  subtotal,
  gst,
  total,
  currency,
  termsAndConditions,
}: PrintQuoteProps) {
  return (
    <PrintSheet
      format="A4"
      ariaLabel={`Quote ${quoteNumber}`}
      header={
        <div className={styles.head}>
          <div className={styles.brand}>
            <div className={styles.logo} aria-hidden="true">OFM</div>
            <div>
              <strong>{from.name}</strong>
              {from.abn ? <span>ABN {from.abn}</span> : null}
              {from.addressLines.map((line) => (
                <span key={line}>{line}</span>
              ))}
            </div>
          </div>
          <div className={styles.docMeta}>
            <h1>Quotation</h1>
            <dl>
              <div>
                <dt>Quote no.</dt>
                <dd>{quoteNumber}</dd>
              </div>
              <div>
                <dt>Issued</dt>
                <dd>
                  <time dateTime={issuedIso}>{issuedAt}</time>
                </dd>
              </div>
              <div>
                <dt>Valid until</dt>
                <dd>
                  <time dateTime={validUntilIso}>{validUntil}</time>
                </dd>
              </div>
            </dl>
          </div>
        </div>
      }
      footer={
        <>
          <span>Prepared by {from.name}. Quote subject to terms below. Acceptance authorises the works listed.</span>
          <span>Generated digitally — replaces all prior verbal estimates.</span>
        </>
      }
    >
      <section className={styles.customerRow} aria-label="Customer">
        <article className={styles.customerBlock}>
          <span className={styles.kicker}>Prepared for</span>
          <strong>{customer.name}</strong>
          {customer.abn ? <span>ABN {customer.abn}</span> : null}
          <address>
            {customer.addressLines.map((line) => (
              <span key={line}>{line}</span>
            ))}
            {customer.phone ? <span>{customer.phone}</span> : null}
            {customer.email ? <span>{customer.email}</span> : null}
          </address>
        </article>
        <article className={styles.customerBlock}>
          <span className={styles.kicker}>Vehicle / Project</span>
          <strong>{vehicle}</strong>
          <p>
            All works to comply with NSW Vehicle Standards (in-service) and ADR 83/00 exhaust
            emissions, where applicable.
          </p>
        </article>
      </section>

      <section className={styles.scope} aria-label="Scope">
        <span className={styles.sectionKicker}>Scope of work</span>
        <ol className={styles.scopeList}>
          {scopeItems.map((item) => (
            <li key={item.index}>
              <span className={styles.scopeIndex}>{item.index}</span>
              <div>
                <strong>{item.title}</strong>
                <p>{item.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className={styles.pricing} aria-label="Pricing breakdown">
        <span className={styles.sectionKicker}>Pricing breakdown</span>
        <table className={styles.pricingTable}>
          <thead>
            <tr>
              <th scope="col">Description</th>
              <th scope="col" className={styles.numCol}>Qty</th>
              <th scope="col" className={styles.numCol}>Unit</th>
              <th scope="col" className={styles.numCol}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {pricing.map((row) => (
              <tr key={row.description}>
                <td>{row.description}</td>
                <td className={styles.numCol}>{row.quantity}</td>
                <td className={styles.numCol}>{formatMoney(row.unitPrice, currency)}</td>
                <td className={styles.numCol}>
                  {formatMoney(row.unitPrice * row.quantity, currency)}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className={styles.footLabel}>
                Subtotal
              </td>
              <td className={styles.numCol}>{formatMoney(subtotal, currency)}</td>
            </tr>
            <tr>
              <td colSpan={3} className={styles.footLabel}>
                GST 10%
              </td>
              <td className={styles.numCol}>{formatMoney(gst, currency)}</td>
            </tr>
            <tr className={styles.totalRow}>
              <td colSpan={3} className={styles.footLabel}>
                Total
              </td>
              <td className={styles.numCol}>{formatMoney(total, currency)}</td>
            </tr>
          </tfoot>
        </table>
      </section>

      <section className={styles.terms} aria-label="Terms and conditions">
        <span className={styles.sectionKicker}>Terms and conditions</span>
        <ul>
          {termsAndConditions.map((term) => (
            <li key={term}>{term}</li>
          ))}
        </ul>
      </section>

      <section className={styles.signature} aria-label="Acceptance signature">
        <div>
          <span className={styles.kicker}>Accepted by</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>Customer signature · Date</small>
        </div>
        <div>
          <span className={styles.kicker}>Authorised by</span>
          <div className={styles.signLine} aria-hidden="true" />
          <small>Oak Flats Mufflermen · Date</small>
        </div>
      </section>
    </PrintSheet>
  )
}

export default PrintQuote
