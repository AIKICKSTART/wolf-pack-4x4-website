import { Chip } from "../primitives/chip"

import {
  entryStatusTone,
  formatAud,
  formatLedgerDate,
  netOfLines,
  totalsOfLines,
  type JournalEntryRecord,
  type JournalEntryStatus,
} from "./accounting-types"
import styles from "./journal-entry-row.module.css"

interface JournalEntryRowProps {
  entry: JournalEntryRecord
  className?: string
}

const STATUS_LABEL: Record<JournalEntryStatus, string> = {
  draft: "Draft",
  posted: "Posted",
  void: "Void",
  reversed: "Reversed",
}

export function JournalEntryRow({ entry, className }: JournalEntryRowProps) {
  const totals = totalsOfLines(entry.lines)
  const net = netOfLines(entry.lines)
  const isBalanced = totals.balanced
  const tone = entryStatusTone(entry.status)

  const classes = [styles.row, !isBalanced && styles.unbalanced, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={classes}
      data-tone={tone}
      aria-label={`Journal entry ${entry.entryNumber} on ${formatLedgerDate(entry.dateISO)}`}
    >
      <header className={styles.head}>
        <div className={styles.headLeft}>
          <span className={styles.date}>{formatLedgerDate(entry.dateISO)}</span>
          <span className={styles.entryNumber}>{entry.entryNumber}</span>
        </div>
        <div className={styles.headRight}>
          {entry.reference ? (
            <span className={styles.reference}>{entry.reference}</span>
          ) : null}
          <Chip label={STATUS_LABEL[entry.status]} tone={tone === "neutral" ? "neutral" : tone} />
        </div>
      </header>

      <p className={styles.description}>{entry.description}</p>

      <table className={styles.lines}>
        <caption className={styles.sr}>Journal lines</caption>
        <thead>
          <tr>
            <th scope="col" className={styles.accountCol}>Account</th>
            <th scope="col" className={styles.memoCol}>Memo</th>
            <th scope="col" className={styles.amountCol}>Debit</th>
            <th scope="col" className={styles.amountCol}>Credit</th>
          </tr>
        </thead>
        <tbody>
          {entry.lines.map((line) => (
            <tr key={line.id}>
              <th scope="row" className={styles.account}>
                <span className={styles.accountCode}>{line.account.code}</span>
                <span className={styles.accountName}>{line.account.name}</span>
              </th>
              <td className={styles.memo}>{line.memo ?? "—"}</td>
              <td className={styles.amount}>
                {line.debit > 0 ? formatAud(line.debit) : <span aria-hidden="true">—</span>}
              </td>
              <td className={styles.amount}>
                {line.credit > 0 ? formatAud(line.credit) : <span aria-hidden="true">—</span>}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row" colSpan={2} className={styles.totalLabel}>
              Totals
            </th>
            <td className={styles.amountTotal}>{formatAud(totals.debit)}</td>
            <td className={styles.amountTotal}>{formatAud(totals.credit)}</td>
          </tr>
        </tfoot>
      </table>

      <footer
        className={styles.foot}
        role="status"
        aria-label={isBalanced ? "Entry balanced" : "Entry unbalanced"}
      >
        <span className={styles.footLabel}>Balance check</span>
        <span className={isBalanced ? styles.footOk : styles.footBad}>
          {isBalanced ? "Dr = Cr" : `Off by ${formatAud(Math.abs(net))}`}
        </span>
      </footer>
    </article>
  )
}

export default JournalEntryRow
