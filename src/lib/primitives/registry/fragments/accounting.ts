import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "accounting",
  "title": "Accounting",
  "group": "Operations",
  "summary": "14 Australian-bookkeeping primitives — journals, general ledger, chart of accounts, the four core financial statements (P&L, balance sheet, cash flow), BAS/PAYG tax surfaces, AR/AP ageing, bank reconciliation, account tiles, and fixed-asset depreciation — all sharing the accounting-types money/date/tone helpers.",
  "entries": [
    {
      "key": "accounting/journal-entry-row",
      "family": "accounting",
      "name": "JournalEntryRow",
      "label": "Journal entry row",
      "description": "Double-entry journal card showing dated lines with debit/credit columns, status chip, and a Dr=Cr balance check.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/journal-entry",
      "tags": [
        "journal",
        "double-entry",
        "ledger"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/general-ledger-table",
      "family": "accounting",
      "name": "GeneralLedgerTable",
      "label": "General ledger table",
      "description": "Per-account ledger with opening/closing/period-delta summary and a DataTable of dated movements with running balance.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/general-ledger",
      "tags": [
        "ledger",
        "table",
        "running-balance"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/chart-of-accounts-tree",
      "family": "accounting",
      "name": "ChartOfAccountsTree",
      "label": "Chart of accounts tree",
      "description": "Collapsible account tree grouped by classification with normal-balance chips and per-group totals.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/chart-of-accounts",
      "tags": [
        "chart-of-accounts",
        "tree",
        "classification"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/profit-loss-statement",
      "family": "accounting",
      "name": "ProfitLossStatement",
      "label": "Profit & loss statement",
      "description": "Income statement with period picker, revenue/COGS/opex sections, gross & net profit totals, margin metrics, and a net-profit sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/profit-loss",
      "tags": [
        "p-and-l",
        "income-statement",
        "report"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/balance-sheet-view",
      "family": "accounting",
      "name": "BalanceSheetView",
      "label": "Balance sheet",
      "description": "Statement of position rendering assets vs liabilities+equity with an A=L+E balance meter and variance check.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/balance-sheet",
      "tags": [
        "balance-sheet",
        "report",
        "position"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/cash-flow-statement",
      "family": "accounting",
      "name": "CashFlowStatement",
      "label": "Cash flow statement",
      "description": "Statement of cash flows with operating/investing/financing sections, opening/net/closing cash summary, and a category bar-chart trend.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/cash-flow",
      "tags": [
        "cash-flow",
        "report",
        "bar-chart"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/bas-summary-card",
      "family": "accounting",
      "name": "BasSummaryCard",
      "label": "BAS summary card",
      "description": "Australian Business Activity Statement card with GST collected/paid, net GST, PAYG, total owing, due-date countdown, and lodgement progress.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/bas-summary",
      "tags": [
        "bas",
        "gst",
        "tax",
        "compliance"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/account-reconciliation-row",
      "family": "accounting",
      "name": "AccountReconciliationRow",
      "label": "Reconciliation row",
      "description": "Bank-vs-ledger reconciliation row showing both amounts, computed variance, status chip, and match/unmatch action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/reconciliation",
      "tags": [
        "reconciliation",
        "bank-feed",
        "variance"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/aged-receivables-grid",
      "family": "accounting",
      "name": "AgedReceivablesGrid",
      "label": "Aged receivables grid",
      "description": "Aged debtors table bucketing customer balances into current/30/60/90+ columns with per-row and per-bucket totals and overdue highlighting.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/aged-receivables",
      "tags": [
        "receivables",
        "ageing",
        "debtors"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/aged-payables-grid",
      "family": "accounting",
      "name": "AgedPayablesGrid",
      "label": "Aged payables grid",
      "description": "Aged creditors table bucketing supplier balances into not-due/30/60/90+ columns with per-row and per-bucket totals and overdue highlighting.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/aged-payables",
      "tags": [
        "payables",
        "ageing",
        "creditors"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/tax-period-banner",
      "family": "accounting",
      "name": "TaxPeriodBanner",
      "label": "Tax period banner",
      "description": "Tax-period banner showing reporting range, lodgement status, due-date countdown, provisional amount owing, and a file/pay-now CTA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/tax-period",
      "tags": [
        "tax",
        "bas",
        "deadline",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/journal-entry-form",
      "family": "accounting",
      "name": "JournalEntryForm",
      "label": "Journal entry form",
      "description": "Interactive double-entry posting form with account picker, debit/credit line editor, live balance validation, and gated post action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/journal-form",
      "tags": [
        "journal",
        "form",
        "double-entry",
        "posting"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/account-balance-tile",
      "family": "accounting",
      "name": "AccountBalanceTile",
      "label": "Account balance tile",
      "description": "Compact account KPI tile showing balance, classification/normal-balance chip, period change percentage, and a trend sparkline.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/account-tile",
      "tags": [
        "kpi",
        "tile",
        "balance",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "accounting/fixed-asset-depreciation-row",
      "family": "accounting",
      "name": "FixedAssetDepreciationRow",
      "label": "Fixed asset depreciation row",
      "description": "Fixed-asset row showing acquisition cost/date, depreciation method and life, accumulated depreciation with consumed-life meter, and book value.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/accounting",
      "routeHref": "/ui-primitives/accounting/depreciation",
      "tags": [
        "fixed-asset",
        "depreciation",
        "book-value"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
