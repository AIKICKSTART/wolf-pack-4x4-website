"use client"

import { useMemo, useState } from "react"

import { Chip } from "../primitives/chip"

import {
  formatAud,
  totalsOfLines,
  type AccountRef,
  type JournalLine,
} from "./accounting-types"
import styles from "./journal-entry-form.module.css"

interface DraftLine {
  id: string
  accountCode: string
  debit: string
  credit: string
  memo: string
}

export interface JournalEntryFormProps {
  /** Accounts the picker can choose from. */
  accounts: ReadonlyArray<AccountRef>
  /** Optional starting lines. Defaults to two empty lines. */
  initialLines?: ReadonlyArray<Partial<DraftLine>>
  /** Default date prefilled in the form (ISO). */
  defaultDateISO?: string
  /** Called once the form is balanced and the operator hits post. */
  onPost?: (entry: { dateISO: string; description: string; lines: JournalLine[] }) => void
  className?: string
}

function emptyLine(id: string): DraftLine {
  return { id, accountCode: "", debit: "", credit: "", memo: "" }
}

function parseAmount(raw: string): number {
  const cleaned = raw.replace(/[, ]/g, "")
  const num = Number.parseFloat(cleaned)
  return Number.isFinite(num) && num > 0 ? num : 0
}

export function JournalEntryForm({
  accounts,
  initialLines,
  defaultDateISO,
  onPost,
  className,
}: JournalEntryFormProps) {
  const seedLines: DraftLine[] = useMemo(() => {
    if (initialLines && initialLines.length > 0) {
      return initialLines.map((line, idx) => ({
        ...emptyLine(`line-${idx}`),
        ...line,
      }))
    }
    return [emptyLine("line-0"), emptyLine("line-1")]
  }, [initialLines])

  const [dateISO, setDateISO] = useState(defaultDateISO ?? new Date().toISOString().slice(0, 10))
  const [description, setDescription] = useState("")
  const [lines, setLines] = useState<ReadonlyArray<DraftLine>>(seedLines)

  const updateLine = (id: string, patch: Partial<DraftLine>) => {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)))
  }

  const addLine = () => {
    setLines((current) => [...current, emptyLine(`line-${current.length}-${Date.now()}`)])
  }

  const removeLine = (id: string) => {
    setLines((current) => (current.length <= 2 ? current : current.filter((line) => line.id !== id)))
  }

  // Build live numeric lines.
  const resolved: JournalLine[] = lines.map((line) => {
    const account =
      accounts.find((acc) => acc.code === line.accountCode) ??
      ({ code: "", name: "—", classification: "expense" } as AccountRef)
    return {
      id: line.id,
      account,
      debit: parseAmount(line.debit),
      credit: parseAmount(line.credit),
      memo: line.memo || undefined,
    }
  })

  const totals = totalsOfLines(resolved)
  const canPost =
    totals.balanced &&
    totals.debit > 0 &&
    description.trim().length > 0 &&
    resolved.every((line) => line.account.code !== "" && (line.debit > 0 || line.credit > 0))

  const handlePost = () => {
    if (!canPost || !onPost) {
      return
    }
    onPost({ dateISO, description, lines: resolved })
  }

  return (
    <form
      className={[styles.form, className].filter(Boolean).join(" ")}
      onSubmit={(e) => {
        e.preventDefault()
        handlePost()
      }}
      aria-label="New journal entry"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>New journal entry</span>
        <h3 className={styles.title}>Double-entry posting</h3>
      </header>

      <div className={styles.meta}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Date</span>
          <input
            type="date"
            value={dateISO}
            onChange={(e) => setDateISO(e.target.value)}
            className={styles.input}
            required
          />
        </label>
        <label className={`${styles.field} ${styles.fieldWide}`}>
          <span className={styles.fieldLabel}>Description</span>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.input}
            placeholder="e.g. Brake pad sale — Brakeman Distribution"
            required
          />
        </label>
      </div>

      <div className={styles.linesWrap}>
        <div className={styles.linesHead}>
          <span>Account</span>
          <span>Memo</span>
          <span className={styles.alignRight}>Debit</span>
          <span className={styles.alignRight}>Credit</span>
          <span aria-hidden="true" />
        </div>

        <ul className={styles.lines}>
          {lines.map((line) => (
            <li key={line.id} className={styles.lineRow}>
              <label className={styles.cellLabel}>
                <span className={styles.sr}>Account</span>
                <select
                  className={styles.select}
                  value={line.accountCode}
                  onChange={(e) => updateLine(line.id, { accountCode: e.target.value })}
                  required
                >
                  <option value="">— Select account —</option>
                  {accounts.map((acc) => (
                    <option key={acc.code} value={acc.code}>
                      {acc.code} · {acc.name}
                    </option>
                  ))}
                </select>
              </label>
              <label className={styles.cellLabel}>
                <span className={styles.sr}>Memo</span>
                <input
                  type="text"
                  value={line.memo}
                  onChange={(e) => updateLine(line.id, { memo: e.target.value })}
                  className={styles.input}
                  placeholder="Memo"
                />
              </label>
              <label className={styles.cellLabel}>
                <span className={styles.sr}>Debit</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={line.debit}
                  onChange={(e) =>
                    updateLine(line.id, { debit: e.target.value, credit: e.target.value ? "" : line.credit })
                  }
                  className={`${styles.input} ${styles.alignRight}`}
                  placeholder="0.00"
                />
              </label>
              <label className={styles.cellLabel}>
                <span className={styles.sr}>Credit</span>
                <input
                  type="text"
                  inputMode="decimal"
                  value={line.credit}
                  onChange={(e) =>
                    updateLine(line.id, { credit: e.target.value, debit: e.target.value ? "" : line.debit })
                  }
                  className={`${styles.input} ${styles.alignRight}`}
                  placeholder="0.00"
                />
              </label>
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() => removeLine(line.id)}
                disabled={lines.length <= 2}
                aria-label="Remove line"
              >
                ×
              </button>
            </li>
          ))}
        </ul>

        <button type="button" className={styles.addBtn} onClick={addLine}>
          + Add line
        </button>
      </div>

      <footer className={styles.foot}>
        <div className={styles.totalsRow} role="status" aria-live="polite">
          <span className={styles.totalCell}>
            <span className={styles.totalLabel}>Total debit</span>
            <span className={styles.totalValue}>{formatAud(totals.debit)}</span>
          </span>
          <span className={styles.totalCell}>
            <span className={styles.totalLabel}>Total credit</span>
            <span className={styles.totalValue}>{formatAud(totals.credit)}</span>
          </span>
          <Chip
            label={totals.balanced ? "Balanced" : `Off by ${formatAud(Math.abs(totals.debit - totals.credit))}`}
            tone={totals.balanced ? "green" : "red"}
          />
        </div>
        <button
          type="submit"
          className={styles.postBtn}
          disabled={!canPost}
          aria-disabled={!canPost}
        >
          Post entry
        </button>
      </footer>
    </form>
  )
}

export default JournalEntryForm
