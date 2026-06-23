/**
 * Demo data for the accounting showcase routes.
 * NSW workshop chart of accounts. AUD, GST 10%. Numbers are illustrative.
 */

import type {
  AccountClass,
  AccountNode,
  AccountRef,
  AgedCustomerRow,
  AgedSupplierRow,
  CashFlowItem,
  JournalEntryRecord,
  LedgerLine,
  PeriodRef,
  PnlLineItem,
} from "../components/accounting"

export const WORKSHOP = {
  legalName: "Oak Flats Mufflermen Pty Ltd",
  tradingName: "Oak Flats Mufflermen",
  abn: "56 102 998 312",
  address: "12 Mort Estate Lane, Tarrawanna NSW 2518",
}

export const DEMO_PERIOD_CURRENT: PeriodRef = {
  startISO: "2026-04-01",
  endISO: "2026-06-30",
  label: "Q4 FY26",
  status: "open",
}

export const DEMO_PERIODS: ReadonlyArray<PeriodRef> = [
  { startISO: "2025-07-01", endISO: "2025-09-30", label: "Q1 FY26", status: "closed" },
  { startISO: "2025-10-01", endISO: "2025-12-31", label: "Q2 FY26", status: "closed" },
  { startISO: "2026-01-01", endISO: "2026-03-31", label: "Q3 FY26", status: "closed" },
  DEMO_PERIOD_CURRENT,
]

export const DEMO_ACCOUNTS: ReadonlyArray<AccountRef> = [
  { code: "1000", name: "Cash at bank — Bendigo", classification: "asset" },
  { code: "1010", name: "Cash on hand — Float", classification: "asset" },
  { code: "1100", name: "Accounts receivable", classification: "asset" },
  { code: "1200", name: "Parts inventory", classification: "asset" },
  { code: "1500", name: "Workshop equipment", classification: "asset" },
  { code: "1510", name: "Hoists & lifts", classification: "asset" },
  { code: "1550", name: "Accumulated depreciation", classification: "asset" },
  { code: "2000", name: "Accounts payable", classification: "liability" },
  { code: "2100", name: "GST collected (1A)", classification: "liability" },
  { code: "2110", name: "GST paid (1B)", classification: "liability" },
  { code: "2200", name: "PAYG withholding", classification: "liability" },
  { code: "2500", name: "Workshop loan — Bendigo", classification: "liability" },
  { code: "3000", name: "Owner's equity — Reg & Dale", classification: "equity" },
  { code: "3100", name: "Retained earnings", classification: "equity" },
  { code: "4000", name: "Service revenue — Mufflers", classification: "income" },
  { code: "4010", name: "Service revenue — Brakes", classification: "income" },
  { code: "4020", name: "Service revenue — Logbook", classification: "income" },
  { code: "4100", name: "Parts sales revenue", classification: "income" },
  { code: "5000", name: "Cost of parts sold", classification: "expense" },
  { code: "5100", name: "Wages — workshop staff", classification: "expense" },
  { code: "5200", name: "Rent — Industrial Drive", classification: "expense" },
  { code: "5300", name: "Electricity & gas", classification: "expense" },
  { code: "5400", name: "Insurance", classification: "expense" },
  { code: "5500", name: "Marketing & advertising", classification: "expense" },
  { code: "5600", name: "Vehicle fuel & consumables", classification: "expense" },
]

function findAccount(code: string): AccountRef {
  const account = DEMO_ACCOUNTS.find((acc) => acc.code === code)
  if (!account) {
    throw new Error(`Unknown account ${code}`)
  }
  return account
}

export const DEMO_JOURNAL_ENTRY: JournalEntryRecord = {
  id: "je-2026-04-18-001",
  entryNumber: "JE-04-018",
  dateISO: "2026-04-18",
  description:
    "Brake service for Mr Roberts (Holden Commodore VE) — labour + brake pad set.",
  reference: "INV-30418",
  status: "posted",
  lines: [
    {
      id: "l1",
      account: findAccount("1100"),
      debit: 506.0,
      credit: 0,
      memo: "Invoice 30418 raised",
    },
    {
      id: "l2",
      account: findAccount("4010"),
      debit: 0,
      credit: 320.0,
      memo: "Brake service labour",
    },
    {
      id: "l3",
      account: findAccount("4100"),
      debit: 0,
      credit: 140.0,
      memo: "Brake pad set",
    },
    {
      id: "l4",
      account: findAccount("2100"),
      debit: 0,
      credit: 46.0,
      memo: "GST collected 10%",
    },
  ],
}

export const DEMO_LEDGER_LINES: ReadonlyArray<LedgerLine> = (() => {
  const cashAccount = findAccount("1000")
  const events: ReadonlyArray<{
    dateISO: string
    entryNumber: string
    description: string
    debit: number
    credit: number
  }> = [
    {
      dateISO: "2026-04-01",
      entryNumber: "JE-04-001",
      description: "Opening cash balance",
      debit: 0,
      credit: 0,
    },
    {
      dateISO: "2026-04-03",
      entryNumber: "JE-04-002",
      description: "Cash deposit — daily takings",
      debit: 1840.0,
      credit: 0,
    },
    {
      dateISO: "2026-04-05",
      entryNumber: "JE-04-003",
      description: "Bendigo loan repayment",
      debit: 0,
      credit: 980.0,
    },
    {
      dateISO: "2026-04-08",
      entryNumber: "JE-04-004",
      description: "Customer payment — Roberts",
      debit: 506.0,
      credit: 0,
    },
    {
      dateISO: "2026-04-10",
      entryNumber: "JE-04-005",
      description: "Supplier payment — Brakeman Distribution",
      debit: 0,
      credit: 2310.0,
    },
    {
      dateISO: "2026-04-14",
      entryNumber: "JE-04-006",
      description: "EFT batch — daily takings",
      debit: 3460.0,
      credit: 0,
    },
    {
      dateISO: "2026-04-18",
      entryNumber: "JE-04-018",
      description: "Customer payment — Mr Roberts",
      debit: 506.0,
      credit: 0,
    },
    {
      dateISO: "2026-04-22",
      entryNumber: "JE-04-024",
      description: "Wages run — fortnightly",
      debit: 0,
      credit: 4180.0,
    },
    {
      dateISO: "2026-04-25",
      entryNumber: "JE-04-031",
      description: "Cash sale — exhaust upgrade",
      debit: 1240.0,
      credit: 0,
    },
    {
      dateISO: "2026-04-28",
      entryNumber: "JE-04-038",
      description: "Origin Energy — workshop bill",
      debit: 0,
      credit: 412.0,
    },
  ]

  let running = 18420.5
  return events.map((event, idx) => {
    running += event.debit - event.credit
    return {
      id: `ledger-${idx}`,
      dateISO: event.dateISO,
      entryNumber: event.entryNumber,
      account: cashAccount,
      description: event.description,
      debit: event.debit,
      credit: event.credit,
      runningBalance: running,
    }
  })
})()

export const DEMO_COA_GROUPS: ReadonlyArray<{
  classification: AccountClass
  nodes: ReadonlyArray<AccountNode>
}> = [
  {
    classification: "asset",
    nodes: [
      {
        id: "asset-current",
        code: "1000",
        name: "Current assets",
        classification: "asset",
        balance: 86420.5,
        children: [
          { id: "asset-bank", code: "1000", name: "Cash at bank — Bendigo", classification: "asset", balance: 21340.2 },
          { id: "asset-float", code: "1010", name: "Cash on hand — Float", classification: "asset", balance: 800.0 },
          { id: "asset-ar", code: "1100", name: "Accounts receivable", classification: "asset", balance: 28412.4 },
          { id: "asset-inv", code: "1200", name: "Parts inventory", classification: "asset", balance: 35867.9 },
        ],
      },
      {
        id: "asset-fixed",
        code: "1500",
        name: "Fixed assets",
        classification: "asset",
        balance: 142800.0,
        children: [
          { id: "asset-equip", code: "1500", name: "Workshop equipment", classification: "asset", balance: 88200.0 },
          { id: "asset-hoists", code: "1510", name: "Hoists & lifts", classification: "asset", balance: 78600.0 },
          { id: "asset-dep", code: "1550", name: "Accumulated depreciation", classification: "asset", balance: -24000.0 },
        ],
      },
    ],
  },
  {
    classification: "liability",
    nodes: [
      {
        id: "liab-current",
        code: "2000",
        name: "Current liabilities",
        classification: "liability",
        balance: 32480.6,
        children: [
          { id: "liab-ap", code: "2000", name: "Accounts payable", classification: "liability", balance: 18420.6 },
          { id: "liab-gst", code: "2100", name: "GST collected (1A)", classification: "liability", balance: 8420.0 },
          { id: "liab-payg", code: "2200", name: "PAYG withholding", classification: "liability", balance: 5640.0 },
        ],
      },
      {
        id: "liab-long",
        code: "2500",
        name: "Long term liabilities",
        classification: "liability",
        balance: 64200.0,
        children: [
          { id: "liab-loan", code: "2500", name: "Workshop loan — Bendigo", classification: "liability", balance: 64200.0 },
        ],
      },
    ],
  },
  {
    classification: "equity",
    nodes: [
      { id: "eq-owners", code: "3000", name: "Owner's equity — Reg & Dale", classification: "equity", balance: 80000.0 },
      { id: "eq-retained", code: "3100", name: "Retained earnings", classification: "equity", balance: 52539.9 },
    ],
  },
  {
    classification: "income",
    nodes: [
      { id: "inc-muffler", code: "4000", name: "Service revenue — Mufflers", classification: "income", balance: 168420.0 },
      { id: "inc-brakes", code: "4010", name: "Service revenue — Brakes", classification: "income", balance: 92140.0 },
      { id: "inc-logbook", code: "4020", name: "Service revenue — Logbook", classification: "income", balance: 48230.0 },
      { id: "inc-parts", code: "4100", name: "Parts sales revenue", classification: "income", balance: 124680.0 },
    ],
  },
  {
    classification: "expense",
    nodes: [
      { id: "exp-cogs", code: "5000", name: "Cost of parts sold", classification: "expense", balance: 102340.0 },
      { id: "exp-wages", code: "5100", name: "Wages — workshop staff", classification: "expense", balance: 184260.0 },
      { id: "exp-rent", code: "5200", name: "Rent — Industrial Drive", classification: "expense", balance: 42000.0 },
      { id: "exp-power", code: "5300", name: "Electricity & gas", classification: "expense", balance: 8820.0 },
      { id: "exp-insure", code: "5400", name: "Insurance", classification: "expense", balance: 12480.0 },
      { id: "exp-mkt", code: "5500", name: "Marketing & advertising", classification: "expense", balance: 6240.0 },
      { id: "exp-fuel", code: "5600", name: "Vehicle fuel & consumables", classification: "expense", balance: 4180.0 },
    ],
  },
]

export const DEMO_PNL_REVENUE: ReadonlyArray<PnlLineItem> = [
  { id: "muff", account: "Service revenue — Mufflers", amount: 168420.0 },
  { id: "brake", account: "Service revenue — Brakes", amount: 92140.0 },
  { id: "logbook", account: "Service revenue — Logbook", amount: 48230.0 },
  { id: "parts", account: "Parts sales revenue", amount: 124680.0 },
]

export const DEMO_PNL_COGS: ReadonlyArray<PnlLineItem> = [
  { id: "cogs-parts", account: "Cost of parts sold", amount: 102340.0 },
  { id: "cogs-consumables", account: "Vehicle fuel & consumables", amount: 4180.0 },
]

export const DEMO_PNL_OPEX: ReadonlyArray<PnlLineItem> = [
  { id: "wages", account: "Wages — workshop staff", amount: 184260.0 },
  { id: "rent", account: "Rent — Industrial Drive", amount: 42000.0 },
  { id: "power", account: "Electricity & gas", amount: 8820.0 },
  { id: "insure", account: "Insurance", amount: 12480.0 },
  { id: "mkt", account: "Marketing & advertising", amount: 6240.0 },
]

export const DEMO_NET_TREND: ReadonlyArray<number> = [
  18420, 19840, 22130, 20580, 24180, 26340, 25210, 27840, 29110, 28420, 30560, 31840,
]

export const DEMO_BS_ASSETS: ReadonlyArray<AccountNode> = [
  { id: "bs-bank", code: "1000", name: "Cash at bank", classification: "asset", balance: 21340.2 },
  { id: "bs-float", code: "1010", name: "Cash on hand", classification: "asset", balance: 800.0 },
  { id: "bs-ar", code: "1100", name: "Accounts receivable", classification: "asset", balance: 28412.4 },
  { id: "bs-inv", code: "1200", name: "Parts inventory", classification: "asset", balance: 35867.9 },
  { id: "bs-equip", code: "1500", name: "Workshop equipment", classification: "asset", balance: 88200.0 },
  { id: "bs-hoist", code: "1510", name: "Hoists & lifts", classification: "asset", balance: 78600.0 },
  { id: "bs-dep", code: "1550", name: "Less: accumulated depreciation", classification: "asset", balance: -24000.0 },
]

export const DEMO_BS_LIABILITIES: ReadonlyArray<AccountNode> = [
  { id: "bs-ap", code: "2000", name: "Accounts payable", classification: "liability", balance: 18420.6 },
  { id: "bs-gst", code: "2100", name: "GST collected", classification: "liability", balance: 8420.0 },
  { id: "bs-payg", code: "2200", name: "PAYG withholding", classification: "liability", balance: 5640.0 },
  { id: "bs-loan", code: "2500", name: "Workshop loan — Bendigo", classification: "liability", balance: 64200.0 },
]

export const DEMO_BS_EQUITY: ReadonlyArray<AccountNode> = [
  { id: "bs-owner", code: "3000", name: "Owner's equity — Reg & Dale", classification: "equity", balance: 80000.0 },
  { id: "bs-retained", code: "3100", name: "Retained earnings", classification: "equity", balance: 52539.9 },
]

export const DEMO_CASHFLOW_OPERATING: ReadonlyArray<CashFlowItem> = [
  { id: "cf-rev", description: "Receipts from customers", amount: 248160.0 },
  { id: "cf-supp", description: "Payments to suppliers", amount: -108420.0 },
  { id: "cf-wages", description: "Wages & salaries paid", amount: -184260.0 },
  { id: "cf-rent", description: "Rent paid", amount: -42000.0 },
  { id: "cf-gst", description: "Net GST remitted", amount: -8420.0 },
]

export const DEMO_CASHFLOW_INVESTING: ReadonlyArray<CashFlowItem> = [
  { id: "cf-hoist", description: "Purchase of new hoist (Hoists & lifts)", amount: -14800.0 },
  { id: "cf-sell-old", description: "Disposal of bead-blaster", amount: 1200.0 },
]

export const DEMO_CASHFLOW_FINANCING: ReadonlyArray<CashFlowItem> = [
  { id: "cf-loan", description: "Bendigo loan repayments", amount: -11800.0 },
  { id: "cf-draw", description: "Owner drawings", amount: -18000.0 },
]

export const DEMO_CASHFLOW_TREND = {
  labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Jan", "Feb", "Mar", "Apr"],
  operating: [3.6, 4.1, 5.8, 4.4, 5.2, 6.1, 5.8, 6.4, 6.0, 6.8],
  investing: [-0.4, -0.4, -0.6, -1.2, -0.4, -0.4, -0.4, -1.4, -0.4, -1.0],
  financing: [-1.2, -1.2, -1.4, -1.2, -1.2, -1.2, -1.4, -1.2, -1.2, -2.0],
}

export const DEMO_AR_ROWS: ReadonlyArray<AgedCustomerRow> = [
  { id: "ar-1", name: "Wollongong Brewery", subtitle: "ABN 78 211 980 422", current: 1240.0, thirty: 0, sixty: 0, ninetyPlus: 0 },
  { id: "ar-2", name: "South Coast Plumbing", subtitle: "ABN 11 044 109 882", current: 880.0, thirty: 460.0, sixty: 0, ninetyPlus: 0 },
  { id: "ar-3", name: "Roberts, Mr A.", subtitle: "Cash customer", current: 506.0, thirty: 0, sixty: 0, ninetyPlus: 0 },
  { id: "ar-4", name: "Bulli Tilers Pty Ltd", subtitle: "ABN 49 803 119 040", current: 0, thirty: 1240.0, sixty: 980.0, ninetyPlus: 0 },
  { id: "ar-5", name: "Steel Park Removalists", subtitle: "ABN 23 902 884 014", current: 0, thirty: 0, sixty: 0, ninetyPlus: 2180.0 },
  { id: "ar-6", name: "Coal Cliff Coffee", subtitle: "ABN 66 901 002 880", current: 320.0, thirty: 0, sixty: 0, ninetyPlus: 0 },
]

export const DEMO_AP_ROWS: ReadonlyArray<AgedSupplierRow> = [
  { id: "ap-1", name: "Brakeman Distribution", subtitle: "ABN 12 332 880 412", current: 4280.0, thirty: 1280.0, sixty: 0, ninetyPlus: 0 },
  { id: "ap-2", name: "Penrite Lubricants", subtitle: "ABN 88 200 116 008", current: 1820.0, thirty: 0, sixty: 0, ninetyPlus: 0 },
  { id: "ap-3", name: "Walker Exhausts AU", subtitle: "ABN 41 001 990 320", current: 0, thirty: 2240.0, sixty: 1620.0, ninetyPlus: 0 },
  { id: "ap-4", name: "Repco Trade", subtitle: "ABN 79 002 118 002", current: 980.0, thirty: 0, sixty: 0, ninetyPlus: 0 },
  { id: "ap-5", name: "Sealey Industrial Tools", subtitle: "ABN 24 700 003 102", current: 0, thirty: 0, sixty: 0, ninetyPlus: 1480.0 },
]

export const DEMO_ACCOUNT_TILES: ReadonlyArray<{
  code: string
  name: string
  classification: AccountClass
  balance: number
  changePct: number
  trend: ReadonlyArray<number>
}> = [
  {
    code: "1000",
    name: "Cash at bank",
    classification: "asset",
    balance: 21340.2,
    changePct: 8.4,
    trend: [16, 17, 18.4, 17.2, 19, 20.1, 19.8, 22, 21.6, 20.8, 21.1, 21.3],
  },
  {
    code: "1100",
    name: "Accounts receivable",
    classification: "asset",
    balance: 28412.4,
    changePct: -2.2,
    trend: [30, 29.4, 31, 29.8, 28.4, 27.2, 26.8, 28.4, 29, 28.4, 28.2, 28.4],
  },
  {
    code: "2000",
    name: "Accounts payable",
    classification: "liability",
    balance: 18420.6,
    changePct: 4.1,
    trend: [16, 17, 16.4, 17.8, 18.2, 17.8, 18.4, 17.6, 18.2, 18, 18.4, 18.4],
  },
  {
    code: "4000",
    name: "Service revenue — Mufflers",
    classification: "income",
    balance: 168420.0,
    changePct: 11.8,
    trend: [12, 14, 12.8, 14.4, 15, 15.6, 14.8, 16.8, 17.6, 16.4, 17.8, 18.2],
  },
]
