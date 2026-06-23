import type {
  AppliedPromo,
  BillingPeriod,
  CreditLedgerEntry,
  InvoiceLineItem,
  MeteredFeatureUsage,
  MoneyAmount,
  PlanFeatureRow,
  PlanOption,
  RefundableInvoice,
} from "../components/billing"

export const CUSTOMER = {
  name: "Tarrawanna Marine Pty Ltd",
  email: "accounts@tarrawanna.marine",
  address: ["12 Mort Estate Lane", "Tarrawanna NSW 2518", "Australia"],
  abn: "82 614 778 109",
} as const

export const DEMO_PLANS: ReadonlyArray<PlanOption> = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Solo workshop hands.",
    monthly: { value: 49, currency: "AUD" },
    annual: { value: 488, currency: "AUD" },
    perUnitNote: "Up to 1 bay · 1 user",
  },
  {
    id: "workshop_pro",
    name: "Workshop Pro",
    tagline: "Best for established muffler shops.",
    monthly: { value: 129, currency: "AUD" },
    annual: { value: 1290, currency: "AUD" },
    perUnitNote: "Up to 6 bays · 8 users",
  },
  {
    id: "fleet_ops",
    name: "Fleet Ops",
    tagline: "Multi-site dealer + fleet contracts.",
    monthly: { value: 349, currency: "AUD" },
    annual: { value: 3490, currency: "AUD" },
    perUnitNote: "Unlimited bays · 25 users",
  },
] as const

export const DEMO_FEATURES: ReadonlyArray<PlanFeatureRow> = [
  {
    label: "Service bays",
    byPlan: { starter: "1", workshop_pro: "6", fleet_ops: "Unlimited" },
  },
  {
    label: "Team seats",
    byPlan: { starter: "1", workshop_pro: "8", fleet_ops: "25" },
  },
  {
    label: "Quote → invoice",
    byPlan: { starter: true, workshop_pro: true, fleet_ops: true },
  },
  {
    label: "Customer portal",
    byPlan: { starter: false, workshop_pro: true, fleet_ops: true },
  },
  {
    label: "Fleet contract pricing",
    byPlan: { starter: false, workshop_pro: false, fleet_ops: true },
  },
  {
    label: "Priority phone support",
    byPlan: { starter: false, workshop_pro: true, fleet_ops: true },
  },
] as const

export const DEMO_INVOICE_LINES: ReadonlyArray<InvoiceLineItem> = [
  {
    id: "ln-1",
    description: "Workshop Pro — Apr 2026",
    quantity: 1,
    unitAmount: { value: 129, currency: "AUD" },
    taxable: true,
  },
  {
    id: "ln-2",
    description: "Additional team seats × 2",
    quantity: 2,
    unitAmount: { value: 12, currency: "AUD" },
    taxable: true,
  },
  {
    id: "ln-3",
    description: "API call overage — 4,800 calls",
    quantity: 4800,
    unitAmount: { value: 0.0025, currency: "AUD" },
    taxable: true,
  },
  {
    id: "ln-4",
    description: "Bank transfer surcharge (pass-through)",
    quantity: 1,
    unitAmount: { value: 0.55, currency: "AUD" },
    taxable: false,
  },
] as const

export const DEMO_CREDIT_LEDGER: ReadonlyArray<CreditLedgerEntry> = [
  { id: "c-1", reason: "Goodwill — outage Mar 12", appliedISO: "2026-03-14", amount: { value: 35, currency: "AUD" } },
  { id: "c-2", reason: "Annual upgrade incentive", appliedISO: "2026-02-02", amount: { value: 100, currency: "AUD" } },
  { id: "c-3", reason: "Pro-rata for plan downgrade", appliedISO: "2026-01-18", amount: { value: 49.5, currency: "AUD" } },
] as const

export const DEMO_REFUNDABLE: ReadonlyArray<RefundableInvoice> = [
  {
    id: "inv-30418",
    invoiceNumber: "OFM-30418",
    customerName: "Tarrawanna Marine",
    paidISO: "2026-05-04",
    amount: { value: 141.0, currency: "AUD" },
  },
  {
    id: "inv-30297",
    invoiceNumber: "OFM-30297",
    customerName: "Coniston Auto Centre",
    paidISO: "2026-04-29",
    amount: { value: 89.0, currency: "AUD" },
  },
  {
    id: "inv-30210",
    invoiceNumber: "OFM-30210",
    customerName: "Tarrawanna Marine",
    paidISO: "2026-04-04",
    amount: { value: 141.0, currency: "AUD" },
  },
] as const

export const DEMO_USAGE_FEATURES: ReadonlyArray<MeteredFeatureUsage> = [
  {
    metric: "api_calls",
    label: "API calls",
    used: 14800,
    included: 10000,
    unitLabel: "call",
    ratePerUnitAUD: 0.0025,
  },
  {
    metric: "active_users",
    label: "Active users",
    used: 6,
    included: 8,
    unitLabel: "seat",
    ratePerUnitAUD: 12,
  },
  {
    metric: "storage_gb",
    label: "Storage",
    used: 78,
    included: 50,
    unitLabel: "GB",
    ratePerUnitAUD: 0.18,
  },
  {
    metric: "sms_sent",
    label: "SMS notifications",
    used: 1240,
    included: 1500,
    unitLabel: "SMS",
    ratePerUnitAUD: 0.09,
  },
] as const

export const DEMO_USAGE_TREND: Record<string, ReadonlyArray<number>> = {
  api_calls: [320, 380, 410, 360, 400, 450, 500, 470, 520, 530, 540, 580, 600, 620, 580, 600, 640, 660, 680, 700, 720, 700, 740, 760, 780, 800, 820, 800, 840, 860],
  active_users: [3, 4, 4, 5, 5, 5, 5, 5, 5, 5, 5, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6],
  storage_gb: [40, 42, 44, 46, 47, 49, 52, 54, 56, 58, 60, 62, 63, 64, 66, 68, 69, 70, 71, 72, 73, 74, 75, 76, 76, 77, 77, 78, 78, 78],
  sms_sent: [30, 35, 40, 32, 48, 50, 45, 38, 52, 60, 64, 58, 50, 48, 44, 42, 38, 36, 32, 30, 32, 36, 38, 42, 44, 46, 48, 46, 44, 42],
}

export const DEMO_PERIOD: BillingPeriod = {
  startISO: "2026-05-01",
  endISO: "2026-05-31",
}

export const DEMO_PROMO_APPLIED: AppliedPromo = {
  code: "MUFFLER10",
  description: "10% off your next billing cycle",
  expiresISO: "2026-12-31",
  benefitLabel: "10%",
}

export const DEMO_AMOUNTS = {
  monthlyTotal: { value: 141.0, currency: "AUD" } as MoneyAmount,
  availableCredit: { value: 184.5, currency: "AUD" } as MoneyAmount,
  pastDue: { value: 141.0, currency: "AUD" } as MoneyAmount,
  prorationUnusedCredit: { value: 36.0, currency: "AUD" } as MoneyAmount,
  prorationNewCharge: { value: 129.0, currency: "AUD" } as MoneyAmount,
  receiptAmount: { value: 329.0, currency: "AUD" } as MoneyAmount,
}
