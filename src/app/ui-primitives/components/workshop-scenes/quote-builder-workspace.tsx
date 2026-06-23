import { Search, X } from "lucide-react"

import { Chip } from "../primitives/chip"
import styles from "./quote-builder-workspace.module.css"

export interface QuoteBuilderLibraryItem {
  id: string
  sku: string
  title: string
  supplier: string
  /** Unit price ex GST, AUD. */
  unitPrice: number
}

export interface QuoteBuilderLineItem {
  id: string
  sku: string
  title: string
  /** Whole-unit quantity. */
  qty: number
  /** Unit price ex GST, AUD. */
  unitPrice: number
}

export interface QuoteBuilderCustomer {
  name: string
  suburb: string
  /** E.g. "0428 117 304" */
  phone: string
}

export interface QuoteBuilderVehicle {
  year: number
  make: string
  model: string
  rego: string
  engine: string
}

export interface QuoteBuilderWorkspaceProps {
  library: ReadonlyArray<QuoteBuilderLibraryItem>
  selected: ReadonlyArray<QuoteBuilderLineItem>
  customer: QuoteBuilderCustomer
  vehicle: QuoteBuilderVehicle
  /** Labour amount applied to the quote, AUD ex GST. */
  labour: number
  /** Free-form fitment notes shown in the context column. */
  notes?: ReadonlyArray<string>
  /** GST rate as fraction, default 0.10 (Australia). */
  gstRate?: number
}

function formatAud(amount: number, fractionDigits = 2): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount)
}

export function QuoteBuilderWorkspace({
  library,
  selected,
  customer,
  vehicle,
  labour,
  notes,
  gstRate = 0.1,
}: QuoteBuilderWorkspaceProps) {
  const lineSubtotal = selected.reduce(
    (sum, line) => sum + line.qty * line.unitPrice,
    0,
  )
  const subtotal = lineSubtotal + labour
  const gst = subtotal * gstRate
  const grand = subtotal + gst

  return (
    <section className={styles.workspace} aria-label="Quote builder workspace">
      <aside className={styles.column} aria-label="Parts library">
        <header className={styles.columnHead}>
          <span className={styles.kicker}>01 · Parts library</span>
          <h3 className={styles.columnTitle}>Drag a part across</h3>
          <div className={styles.search} role="search">
            <Search aria-hidden="true" />
            <span>Search SKU, supplier, or fitment</span>
          </div>
        </header>
        <div className={styles.libraryList} role="list">
          {library.map((item) => (
            <button
              key={item.id}
              type="button"
              className={styles.libraryItem}
              role="listitem"
              aria-label={`${item.title} from ${item.supplier} at ${formatAud(item.unitPrice)} per unit`}
              draggable
            >
              <span className={styles.libraryThumb} aria-hidden="true">
                {item.sku.split("-").pop()}
              </span>
              <span className={styles.libraryBody}>
                <span className={styles.libraryTitle}>{item.title}</span>
                <span className={styles.librarySub}>
                  {item.supplier} · {item.sku}
                </span>
              </span>
              <span className={styles.libraryPrice}>
                {formatAud(item.unitPrice)}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <section className={styles.column} aria-label="Quote draft">
        <header className={styles.columnHead}>
          <span className={styles.kicker}>02 · Quote draft</span>
          <h3 className={styles.columnTitle}>Drop parts here</h3>
        </header>
        <div className={styles.quoteBody}>
          <div className={styles.quoteList} role="list">
            {selected.map((line) => (
              <div key={line.id} className={styles.quoteRow} role="listitem">
                <span className={styles.libraryThumb} aria-hidden="true">
                  {line.sku.split("-").pop()}
                </span>
                <strong>{line.title}</strong>
                <span>QTY {line.qty}</span>
                <span>@ {formatAud(line.unitPrice)}</span>
                <span className={styles.lineTotal}>
                  {formatAud(line.qty * line.unitPrice)}
                </span>
                <button
                  type="button"
                  className={styles.removeBtn}
                  aria-label={`Remove ${line.title} from quote`}
                >
                  <X size={14} strokeWidth={2.4} aria-hidden="true" />
                </button>
              </div>
            ))}
          </div>
          <footer className={styles.quoteFoot}>
            <div className={styles.totalRow}>
              <span>Parts subtotal</span>
              <strong>{formatAud(lineSubtotal)}</strong>
            </div>
            <div className={styles.totalRow}>
              <span>Workshop labour</span>
              <strong>{formatAud(labour)}</strong>
            </div>
            <div className={styles.totalRow}>
              <span>GST ({Math.round(gstRate * 100)}%)</span>
              <strong>{formatAud(gst)}</strong>
            </div>
            <div className={`${styles.totalRow} ${styles.grandTotal}`}>
              <span>Quote total inc GST</span>
              <strong>{formatAud(grand, 0)}</strong>
            </div>
          </footer>
        </div>
      </section>

      <aside className={styles.column} aria-label="Customer and vehicle context">
        <header className={styles.columnHead}>
          <span className={styles.kicker}>03 · Context</span>
          <h3 className={styles.columnTitle}>Who & what</h3>
        </header>
        <div className={styles.contextStack}>
          <div className={styles.contextBlock}>
            <span className={styles.contextLabel}>Customer</span>
            <div className={styles.contextBody}>
              <strong>{customer.name}</strong>
              <span>{customer.suburb}</span>
              <span>{customer.phone}</span>
            </div>
          </div>
          <div className={styles.contextBlock}>
            <span className={styles.contextLabel}>Vehicle</span>
            <div className={styles.contextBody}>
              <strong>
                {vehicle.year} {vehicle.make} {vehicle.model}
              </strong>
              <span>{vehicle.engine}</span>
              <Chip label={vehicle.rego} tone="amber" />
            </div>
          </div>
          {notes && notes.length > 0 && (
            <div className={styles.contextBlock}>
              <span className={styles.contextLabel}>Fitment notes</span>
              <ul className={styles.noteList}>
                {notes.map((note, index) => (
                  <li key={index}>{note}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>
    </section>
  )
}

export default QuoteBuilderWorkspace
