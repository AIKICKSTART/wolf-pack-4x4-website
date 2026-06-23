import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./accounting.module.css"

export const metadata: Metadata = {
  title: "Accounting | UI Primitives",
  description:
    "Fourteen full-ledger accounting primitives for Oak Flats Mufflermen — journal entries, GL, chart of accounts, BAS, reconciliation, AR/AP ageing, depreciation.",
}

interface AccountingScene {
  kicker: string
  title: string
  body: string
  href: string
  accent: "red" | "amber" | "teal" | "green"
  glyph: string
  state: string
  preview: ReadonlyArray<{ label: string; value: string }>
}

const SCENES: ReadonlyArray<AccountingScene> = [
  {
    kicker: "Primitive 01",
    title: "Journal entry row",
    body: "Double-entry journal row — date, line debits and credits, account refs, memo and balance check.",
    href: "/ui-primitives/accounting/journal-entry",
    accent: "teal",
    glyph: "Dr/Cr",
    state: "Visual only",
    preview: [
      { label: "Lines", value: "4" },
      { label: "Check", value: "Dr = Cr" },
    ],
  },
  {
    kicker: "Primitive 02",
    title: "General ledger table",
    body: "Per-account GL — date, ref, description, debit, credit and running balance with period summary.",
    href: "/ui-primitives/accounting/general-ledger",
    accent: "teal",
    glyph: "GL",
    state: "Visual · table",
    preview: [
      { label: "Account", value: "1000 Bank" },
      { label: "Period", value: "Apr 26" },
    ],
  },
  {
    kicker: "Primitive 03",
    title: "Chart of accounts tree",
    body: "Hierarchical chart of accounts across Assets, Liabilities, Equity, Income and Expenses with balances per node.",
    href: "/ui-primitives/accounting/chart-of-accounts",
    accent: "amber",
    glyph: "COA",
    state: "Stateful · tree",
    preview: [
      { label: "Groups", value: "5" },
      { label: "Accounts", value: "25" },
    ],
  },
  {
    kicker: "Primitive 04",
    title: "Profit & loss statement",
    body: "Revenue → COGS → Gross profit → Operating expenses → Net profit, with period selector and trend.",
    href: "/ui-primitives/accounting/profit-loss",
    accent: "green",
    glyph: "P&L",
    state: "Stateful · period",
    preview: [
      { label: "Period", value: "Q4 FY26" },
      { label: "Net", value: "$72,250" },
    ],
  },
  {
    kicker: "Primitive 05",
    title: "Balance sheet view",
    body: "Assets vs Liabilities + Equity with totals and a live match indicator — A = L + E.",
    href: "/ui-primitives/accounting/balance-sheet",
    accent: "teal",
    glyph: "A=L+E",
    state: "Visual · meter",
    preview: [
      { label: "Assets", value: "$229k" },
      { label: "Match", value: "Balanced" },
    ],
  },
  {
    kicker: "Primitive 06",
    title: "Cash flow statement",
    body: "Operating, Investing and Financing sections with net change and trailing-period bar chart.",
    href: "/ui-primitives/accounting/cash-flow",
    accent: "teal",
    glyph: "CF",
    state: "Visual · chart",
    preview: [
      { label: "Sections", value: "3" },
      { label: "Net Δ", value: "−$138k" },
    ],
  },
  {
    kicker: "Primitive 07",
    title: "BAS summary card",
    body: "Quarterly BAS — GST collected vs paid, PAYG withholding, total owing and lodgement status chip.",
    href: "/ui-primitives/accounting/bas-summary",
    accent: "amber",
    glyph: "BAS",
    state: "Visual · alert",
    preview: [
      { label: "Quarter", value: "Q4 FY26" },
      { label: "Owing", value: "$13,640" },
    ],
  },
  {
    kicker: "Primitive 08",
    title: "Reconciliation row",
    body: "Bank statement vs ledger row — amounts, variance, match / unmatch action and status chip.",
    href: "/ui-primitives/accounting/reconciliation",
    accent: "teal",
    glyph: "↔",
    state: "Stateful · row",
    preview: [
      { label: "Variance", value: "$0.00" },
      { label: "Status", value: "Matched" },
    ],
  },
  {
    kicker: "Primitive 09",
    title: "Aged receivables",
    body: "Customer rows by ageing bucket — Current / 1-30 / 31-60 / 60+ — with grand totals.",
    href: "/ui-primitives/accounting/aged-receivables",
    accent: "teal",
    glyph: "AR",
    state: "Visual · grid",
    preview: [
      { label: "Customers", value: "6" },
      { label: "60+", value: "$2,180" },
    ],
  },
  {
    kicker: "Primitive 10",
    title: "Aged payables",
    body: "Supplier rows by ageing bucket — Not due / 1-30 / 31-60 / 60+ — with totals owed.",
    href: "/ui-primitives/accounting/aged-payables",
    accent: "amber",
    glyph: "AP",
    state: "Visual · grid",
    preview: [
      { label: "Suppliers", value: "5" },
      { label: "Owing", value: "$13,700" },
    ],
  },
  {
    kicker: "Primitive 11",
    title: "Tax period banner",
    body: "Current tax period banner with due-date countdown, status chip and file-now CTA.",
    href: "/ui-primitives/accounting/tax-period",
    accent: "red",
    glyph: "GST",
    state: "Visual · alert",
    preview: [
      { label: "Period", value: "Q4 FY26" },
      { label: "Due", value: "28 Jul" },
    ],
  },
  {
    kicker: "Primitive 12",
    title: "Journal entry form",
    body: "Form to create a journal — account picker, debit/credit per line, balance check and post.",
    href: "/ui-primitives/accounting/journal-form",
    accent: "red",
    glyph: "+JE",
    state: "Stateful · form",
    preview: [
      { label: "Lines", value: "Add/remove" },
      { label: "Check", value: "Auto-balance" },
    ],
  },
  {
    kicker: "Primitive 13",
    title: "Account balance tile",
    body: "Individual account balance — classification chip, current value and trailing sparkline.",
    href: "/ui-primitives/accounting/account-tile",
    accent: "teal",
    glyph: "$",
    state: "Visual only",
    preview: [
      { label: "Code", value: "1000" },
      { label: "Trend", value: "12 pts" },
    ],
  },
  {
    kicker: "Primitive 14",
    title: "Depreciation row",
    body: "Fixed asset row — acquisition cost, life, method, accumulated depreciation and book value.",
    href: "/ui-primitives/accounting/depreciation",
    accent: "amber",
    glyph: "DEP",
    state: "Visual · row",
    preview: [
      { label: "Method", value: "Straight" },
      { label: "Life", value: "10 yr" },
    ],
  },
]

const ACCENT_CLASS: Record<AccountingScene["accent"], string> = {
  red: styles.accentRed,
  amber: styles.accentAmber,
  teal: styles.accentTeal,
  green: styles.accentGreen,
}

export default function AccountingIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Accounting primitives"
        title="Accounting — full ledger"
        description="Fourteen full-ledger accounting primitives for Oak Flats Mufflermen — double-entry journals, general ledger, chart of accounts, profit & loss, balance sheet, cash flow, BAS summary, bank reconciliation, aged receivables and payables, fixed-asset depreciation."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Accounting" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no live MYOB / Xero wiring
      </span>

      <Link className={styles.fullCenterCta} href="/ui-primitives/accounting/full-ledger">
        Open full ledger console composition <span aria-hidden="true">→</span>
      </Link>

      <section className={styles.grid} aria-label="Accounting primitives gallery">
        {SCENES.map((scene) => (
          <Link
            key={scene.href}
            href={scene.href}
            className={[styles.card, ACCENT_CLASS[scene.accent]].join(" ")}
          >
            <div className={styles.thumb} aria-hidden="true">
              <div className={styles.thumbInner}>
                <span className={styles.thumbGlyph}>{scene.glyph}</span>
                {scene.preview.map((row) => (
                  <span key={row.label} className={styles.thumbField}>
                    <span>{row.label}</span>
                    <span>{row.value}</span>
                  </span>
                ))}
              </div>
            </div>
            <header className={styles.head}>
              <span className={styles.cardKicker}>{scene.kicker}</span>
              <h2 className={styles.cardTitle}>{scene.title}</h2>
              <p className={styles.cardBody}>{scene.body}</p>
            </header>
            <footer className={styles.meta}>
              <span>{scene.state}</span>
              <span className={styles.metaAction}>
                Open <span aria-hidden="true">→</span>
              </span>
            </footer>
          </Link>
        ))}
      </section>
    </main>
  )
}
