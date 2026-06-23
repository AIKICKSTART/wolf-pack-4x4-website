/**
 * Shared showcase fixtures for the POS / checkout primitive pack.
 *
 * Reflects the Oak Flats Mufflermen Bay 1 counter — Tyro EFTPOS, BPay receipts,
 * AUD inc GST, ABN 12 345 678 901. Sample SKUs are muffler-shop staples.
 */

import type {
  AbnDetails,
  DenominationCount,
  PosCartLine,
  PosCustomer,
  QuickProduct,
  ReceiptQueueItem,
  SplitTenderEntry,
} from "../components/pos-checkout"
import type {
  ReceiptPreviewLine,
  ReceiptPreviewTender,
  RefundCandidateItem,
} from "../components/pos-checkout"

export const CART_LINES: ReadonlyArray<PosCartLine> = [
  {
    id: "manta-cb-25",
    sku: "MANTA-CB-25",
    title: "Manta 2.5\" Cat-Back · VF SS Ute",
    unitPrice: 1149.0,
    quantity: 1,
    note: "Aluminised · 6.0L",
  },
  {
    id: "pcmr-ext-30",
    sku: "PCMR-EXT-30",
    title: "Pacemaker Extractors · VT-VZ LS1",
    unitPrice: 689.0,
    quantity: 1,
    note: "1-3/4\" headers · 409 stainless",
  },
  {
    id: "manta-res-30",
    sku: "MANTA-RES-30",
    title: "Manta 3\" Resonator",
    unitPrice: 142.5,
    quantity: 2,
  },
  {
    id: "ofm-wash-12",
    sku: "OFM-WASH-12",
    title: "Workshop Washer Fluid · 5 L",
    unitPrice: 18.5,
    quantity: 2,
    note: "Citrus scent",
  },
]

export const CART_LINES_LITE: ReadonlyArray<PosCartLine> = [
  {
    id: "ofm-oil-5w30",
    sku: "OFM-OIL-5W30",
    title: "Workshop Oil 5W-30 · 5 L",
    unitPrice: 64.95,
    quantity: 1,
  },
  {
    id: "wb-wiper-26",
    sku: "WB-WIPER-26",
    title: "Wiper Blades 26\" Pair",
    unitPrice: 38.0,
    quantity: 1,
  },
]

export const QUICK_PRODUCTS: ReadonlyArray<QuickProduct> = [
  {
    sku: "OFM-OIL-5W30",
    title: "Workshop Oil 5W-30 · 5 L",
    price: 64.95,
    glyph: "OIL",
    tag: "Top seller",
  },
  {
    sku: "OFM-WASH-12",
    title: "Washer Fluid · 5 L",
    price: 18.5,
    glyph: "WSH",
  },
  {
    sku: "WB-WIPER-26",
    title: "Wiper Blades 26\" Pair",
    price: 38.0,
    glyph: "WIP",
  },
  {
    sku: "OFM-AIR-FR",
    title: "Muffler Air Freshener",
    price: 6.5,
    glyph: "AIR",
    tag: "Theme",
  },
  {
    sku: "OFM-CLAMP-3",
    title: "V-Band Clamp 3\"",
    price: 38.95,
    glyph: "VBC",
  },
  {
    sku: "OFM-FLNG-3",
    title: "Slip Flange Kit 3\"",
    price: 64.5,
    glyph: "FLK",
  },
  {
    sku: "OFM-HW-50",
    title: "Heat Wrap 50 mm × 15 m",
    price: 89.0,
    glyph: "HWP",
  },
  {
    sku: "OFM-CAT-200",
    title: "Hi-Flow Cat 3\" · 200 cell",
    price: 348.0,
    glyph: "CAT",
  },
]

export const TENDER_INITIAL: ReadonlyArray<SplitTenderEntry> = [
  { id: "split-cash", method: "cash", amount: 50.0 },
  { id: "split-card", method: "card", amount: 0.0 },
]

export const TENDER_BALANCED: ReadonlyArray<SplitTenderEntry> = [
  { id: "split-cash", method: "cash", amount: 100.0 },
  { id: "split-card", method: "card", amount: 1100.0 },
  { id: "split-voucher", method: "voucher", amount: 79.0 },
]

export const TENDER_OVERPAID: ReadonlyArray<SplitTenderEntry> = [
  { id: "split-cash", method: "cash", amount: 200.0 },
  { id: "split-card", method: "card", amount: 1200.0 },
]

export const RECEIPT_QUEUE: ReadonlyArray<ReceiptQueueItem> = [
  {
    id: "rcpt-30418",
    receiptNumber: "OFM-30418",
    kind: "sale",
    operator: "Mia",
    enqueuedLabel: "32s ago",
    status: "printed",
  },
  {
    id: "rcpt-30419",
    receiptNumber: "OFM-30419",
    kind: "tax-invoice",
    operator: "Mia",
    enqueuedLabel: "12s ago",
    status: "printing",
  },
  {
    id: "rcpt-30420",
    receiptNumber: "OFM-30420",
    kind: "duplicate",
    operator: "Daniel",
    enqueuedLabel: "now",
    status: "queued",
  },
  {
    id: "rcpt-30417",
    receiptNumber: "OFM-30417",
    kind: "refund",
    operator: "Daniel",
    enqueuedLabel: "3m ago",
    status: "failed",
  },
]

export const REFUND_CANDIDATES: ReadonlyArray<RefundCandidateItem> = [
  {
    id: "ref-line-1",
    title: "Manta 2.5\" Cat-Back · VF SS Ute",
    sku: "MANTA-CB-25",
    amount: 1149.0,
  },
  {
    id: "ref-line-2",
    title: "Pacemaker Extractors · VT-VZ LS1",
    sku: "PCMR-EXT-30",
    amount: 689.0,
  },
  {
    id: "ref-line-3",
    title: "Manta 3\" Resonator",
    sku: "MANTA-RES-30",
    amount: 285.0,
  },
]

export const REFUND_REASONS: ReadonlyArray<string> = [
  "Wrong fitment",
  "Customer changed mind",
  "Damaged in transit",
  "Workshop error",
  "Goodwill",
]

export const DISCOUNT_REASONS: ReadonlyArray<string> = [
  "Trade rate",
  "Manager override",
  "Loyalty perk",
  "Price match",
  "Workshop staff",
]

export const COUPON_OPTIONS: ReadonlyArray<{
  code: string
  description: string
  discount: number
}> = [
  { code: "MUFFLER10", description: "10% off exhaust hardware", discount: 200.0 },
  { code: "TRADE15", description: "Trade · 15% off any extractor", discount: 103.35 },
  { code: "VTVZ50", description: "$50 off VT-VZ headers", discount: 50.0 },
]

export const CUSTOMER_VIP: PosCustomer = {
  id: "OFM-CUS-0142",
  name: "Dean Patel",
  phone: "0432 188 207",
  email: "dean.patel@workshopcrew.au",
  rego: "BVA42K",
  tier: "vip",
  lifetimeSpend: 18420.5,
  visitCount: 22,
}

export const CUSTOMER_TRADE: PosCustomer = {
  id: "OFM-CUS-0314",
  name: "Bay Auto Electrical Pty Ltd",
  phone: "02 4256 1111",
  email: "trade@bayauto.com.au",
  tier: "trade",
  lifetimeSpend: 42180.0,
  visitCount: 64,
}

export const DENOMINATIONS_FLOAT: ReadonlyArray<DenominationCount> = [
  { denomination: 100, count: 1 },
  { denomination: 50, count: 4 },
  { denomination: 20, count: 8 },
  { denomination: 10, count: 6 },
  { denomination: 5, count: 8 },
  { denomination: 2, count: 14 },
  { denomination: 1, count: 30 },
  { denomination: 0.5, count: 20 },
]

export const DENOMINATIONS_VARIANT: ReadonlyArray<DenominationCount> = [
  { denomination: 100, count: 3 },
  { denomination: 50, count: 6 },
  { denomination: 20, count: 11 },
  { denomination: 10, count: 9 },
  { denomination: 5, count: 12 },
  { denomination: 2, count: 18 },
  { denomination: 1, count: 24 },
  { denomination: 0.5, count: 8 },
]

export const ABN_EMPTY: AbnDetails = {
  abn: "",
  tradingName: "",
}

export const ABN_FILLED: AbnDetails = {
  abn: "12345678901",
  tradingName: "Oak Flats Mufflermen Pty Ltd",
}

export const RECEIPT_PREVIEW_LINES: ReadonlyArray<ReceiptPreviewLine> = [
  {
    id: "rpl-1",
    title: "Manta 2.5\" Cat-Back · VF SS Ute",
    sku: "MANTA-CB-25",
    quantity: 1,
    unitPrice: 1149.0,
  },
  {
    id: "rpl-2",
    title: "Pacemaker Extractors · VT-VZ LS1",
    sku: "PCMR-EXT-30",
    quantity: 1,
    unitPrice: 689.0,
  },
  {
    id: "rpl-3",
    title: "Manta 3\" Resonator",
    sku: "MANTA-RES-30",
    quantity: 2,
    unitPrice: 142.5,
  },
]

export const RECEIPT_PREVIEW_TENDERS: ReadonlyArray<ReceiptPreviewTender> = [
  { method: "Cash", amount: 100.0 },
  { method: "Tyro EFTPOS · Visa 4242", amount: 2023.0 },
]

export const RECENT_SKUS: ReadonlyArray<string> = [
  "MANTA-CB-25",
  "PCMR-EXT-30",
  "OFM-OIL-5W30",
  "OFM-WASH-12",
]
