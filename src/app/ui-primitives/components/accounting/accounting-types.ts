/**
 * Shared types for the accounting ledger primitives.
 * Australian SMB workshop accounting vocabulary — GST-aware, NSW flavour.
 */

/** Top-level account classification. */
export type AccountClass = "asset" | "liability" | "equity" | "income" | "expense"

/** Normal balance side for an account class. */
export type NormalBalance = "debit" | "credit"

/** Status of an accounting period. */
export type PeriodStatus = "open" | "closed" | "locked" | "in_review"

/** State of a journal entry. */
export type JournalEntryStatus = "draft" | "posted" | "void" | "reversed"

/** Reconciliation status for a bank line. */
export type ReconciliationStatus =
  | "matched"
  | "unmatched"
  | "needs_review"
  | "auto_matched"

/** Ageing bucket used by AR / AP grids. */
export type AgeingBucket = "current" | "thirty" | "sixty" | "ninetyPlus"

/** Australian BAS tax type. */
export type BasTaxType = "GST_collected" | "GST_paid" | "PAYG_W" | "PAYG_I"

/** BAS lodgement state. */
export type BasLodgementStatus = "pending" | "drafted" | "lodged" | "paid"

/** Depreciation method. */
export type DepreciationMethod = "straight_line" | "diminishing_value" | "units_of_use"

/** Accent tone shared with primitives/chip. */
export type LedgerTone = "red" | "amber" | "teal" | "green" | "neutral"

export interface MoneyAud {
  /** Major units (dollars, not cents). */
  value: number
}

export interface AccountRef {
  /** Account number, e.g. "1000". */
  code: string
  /** Display name, e.g. "Cash at bank — Bendigo". */
  name: string
  /** Classification used to derive normal balance. */
  classification: AccountClass
}

export interface JournalLine {
  id: string
  account: AccountRef
  /** Debit amount in AUD. */
  debit: number
  /** Credit amount in AUD. */
  credit: number
  memo?: string
}

export interface JournalEntryRecord {
  id: string
  entryNumber: string
  dateISO: string
  description: string
  reference?: string
  lines: ReadonlyArray<JournalLine>
  status: JournalEntryStatus
}

export interface LedgerLine {
  id: string
  dateISO: string
  entryNumber: string
  account: AccountRef
  description: string
  debit: number
  credit: number
  runningBalance: number
}

export interface AccountNode {
  id: string
  code: string
  name: string
  classification: AccountClass
  balance: number
  children?: ReadonlyArray<AccountNode>
}

export interface PeriodRef {
  startISO: string
  endISO: string
  label: string
  status: PeriodStatus
}

/** Australian GST rate (10%). */
export const AU_GST_RATE = 0.1

/** Map a class to its normal balance side. */
export function normalBalanceOf(classification: AccountClass): NormalBalance {
  if (classification === "asset" || classification === "expense") {
    return "debit"
  }
  return "credit"
}

/** Friendly label for an account class. */
export function classificationLabel(classification: AccountClass): string {
  switch (classification) {
    case "asset":
      return "Assets"
    case "liability":
      return "Liabilities"
    case "equity":
      return "Equity"
    case "income":
      return "Income"
    case "expense":
      return "Expenses"
  }
}

/** Format an AUD amount with the en-AU locale. */
export function formatAud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

/** Compact AUD formatter for headline figures. */
export function formatAudCompact(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(value)
}

/** Format an ISO date as Australian short form (e.g. "28 May 2026"). */
export function formatDateAu(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(d)
}

/** Format an ISO date as a compact ledger date (e.g. "28/05/26"). */
export function formatLedgerDate(iso: string): string {
  const d = new Date(iso)
  return new Intl.DateTimeFormat("en-AU", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(d)
}

/** Days between a target ISO date and "today" (negative = overdue). */
export function daysUntil(iso: string, now: Date = new Date()): number {
  const target = new Date(iso).getTime()
  const diff = target - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

/** Sum of debit minus credit, in AUD. */
export function netOfLines(lines: ReadonlyArray<JournalLine>): number {
  return lines.reduce((sum, line) => sum + (line.debit - line.credit), 0)
}

/** Total debit / credit sums; for balance verification. */
export function totalsOfLines(lines: ReadonlyArray<JournalLine>): {
  debit: number
  credit: number
  balanced: boolean
} {
  const debit = lines.reduce((s, l) => s + l.debit, 0)
  const credit = lines.reduce((s, l) => s + l.credit, 0)
  return { debit, credit, balanced: Math.abs(debit - credit) < 0.005 }
}

/** Map a reconciliation status to a chip tone. */
export function reconciliationTone(status: ReconciliationStatus): LedgerTone {
  switch (status) {
    case "matched":
      return "green"
    case "auto_matched":
      return "teal"
    case "needs_review":
      return "amber"
    case "unmatched":
      return "red"
  }
}

/** Map a journal entry status to a tone. */
export function entryStatusTone(status: JournalEntryStatus): LedgerTone {
  switch (status) {
    case "posted":
      return "green"
    case "draft":
      return "amber"
    case "void":
      return "red"
    case "reversed":
      return "neutral"
  }
}

/** Map a BAS lodgement status to a tone. */
export function basStatusTone(status: BasLodgementStatus): LedgerTone {
  switch (status) {
    case "paid":
      return "green"
    case "lodged":
      return "teal"
    case "drafted":
      return "amber"
    case "pending":
      return "red"
  }
}
