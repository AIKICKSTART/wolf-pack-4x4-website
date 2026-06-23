/**
 * Demo fixtures for the "Torque on mobile" screen.
 *
 * Customer-facing identity is "Torque — your Mufflermen business assistant".
 * (Dev note: the upstream agent runtime is internally codenamed differently; that
 * codename must never surface in customer-visible copy here.)
 */

export interface MobileNavItemData {
  id: string
  label: string
  badge?: number
}

/** Bottom tab destinations for the on-the-go owner app. */
export const NAV_ITEMS: ReadonlyArray<MobileNavItemData> = [
  { id: "today", label: "Today" },
  { id: "approvals", label: "Approvals", badge: 2 },
  { id: "torque", label: "Torque" },
  { id: "shop", label: "Shop" },
]

export interface DrawerLinkData {
  id: string
  label: string
  hint: string
}

/** Side-drawer destinations — the owner's quick jump list. */
export const DRAWER_LINKS: ReadonlyArray<DrawerLinkData> = [
  { id: "dashboard", label: "Workshop dashboard", hint: "Bays, bookings, takings" },
  { id: "quotes", label: "Quotes & invoices", hint: "12 open · 3 awaiting reply" },
  { id: "campaigns", label: "Marketing campaigns", hint: "Winter exhaust special live" },
  { id: "reviews", label: "Google reviews", hint: "4.9 · 312 reviews" },
  { id: "settings", label: "App settings", hint: "Notifications, account, theme" },
]

export interface FilterChipData {
  id: string
  label: string
  count?: number
}

/** Quick filters above today's feed. */
export const FILTER_CHIPS: ReadonlyArray<FilterChipData> = [
  { id: "needs-you", label: "Needs you", count: 2 },
  { id: "quotes", label: "Quotes", count: 5 },
  { id: "bookings", label: "Bookings", count: 7 },
  { id: "supplier", label: "Supplier", count: 1 },
]

export type ChatRole = "owner" | "torque"

export interface ChatTurn {
  id: string
  role: ChatRole
  timestamp: string
  paragraphs: ReadonlyArray<string>
}

/**
 * A short transcript: the owner (Daniel) checks in from his phone and Torque
 * surfaces a customer quote that needs sign-off. Realistic Oak Flats copy —
 * Illawarra NSW, coastal stainless, volume-legal exhausts.
 */
export const CHAT_TURNS: ReadonlyArray<ChatTurn> = [
  {
    id: "t1",
    role: "owner",
    timestamp: "7:42 am",
    paragraphs: ["Morning Torque — anything need me before I get to Oak Flats?"],
  },
  {
    id: "t2",
    role: "torque",
    timestamp: "7:42 am",
    paragraphs: [
      "Morning Daniel. One quote is waiting on your sign-off and a supplier ETA came through overnight.",
      "Mark Stevens wants a 3\" cat-back fitted to his Ranger Raptor. I've priced it volume-legal for NSW and held a Thursday bay. Want to send it?",
    ],
  },
]

export interface QuoteLineData {
  id: string
  label: string
  detail: string
  amount: string
}

export interface ApprovalQuoteData {
  reference: string
  customerName: string
  vehicle: string
  noiseNote: string
  lines: ReadonlyArray<QuoteLineData>
  totalLabel: string
  total: string
}

/** The approval snippet Torque drops into the thread for one-tap sign-off. */
export const APPROVAL_QUOTE: ApprovalQuoteData = {
  reference: "Q-2418",
  customerName: "Mark Stevens",
  vehicle: "Ford Ranger Raptor 3.0L V6 (2024)",
  noiseNote: "89.4 dB(A) bench — under the NSW 90 dB(A) static cap.",
  lines: [
    {
      id: "l1",
      label: 'Manta 3" cat-back, 304 stainless',
      detail: "Coastal-grade for the Illawarra salt air",
      amount: "$1,640.00",
    },
    {
      id: "l2",
      label: "Fit & tune — 2.5 hrs labour",
      detail: "Thursday, Bay 2 · held 30 min",
      amount: "$412.50",
    },
    {
      id: "l3",
      label: "EPA-compliant rear muffler",
      detail: "Keeps the factory cat, warranty-safe",
      amount: "$284.00",
    },
  ],
  totalLabel: "Fitted, incl. GST",
  total: "$2,336.50",
}

export interface SupplierNoteData {
  supplier: string
  message: string
  eta: string
}

/** A supplier note Torque flags in the action sheet / toast flow. */
export const SUPPLIER_NOTE: SupplierNoteData = {
  supplier: "Manta Performance",
  message: "Ranger Raptor cat-back back in stock — freight booked to Oak Flats.",
  eta: "Wed 9:30 am",
}

/** Marketing hero copy shown in the page chrome around the device frame. */
export const MARKETING_COPY = {
  kicker: "Torque / Mobile · Composition",
  title: "Torque on mobile",
  description:
    "Oak Flats Muffler Men run the Illawarra from the workshop floor — and from a phone. Torque, your Mufflermen business assistant, puts the day's quotes, bookings and supplier news one tap away: read the thread, sign off a customer quote, and get back under the car.",
  framePitch:
    "The owner pulls up at the lights, opens Torque, and approves Mark's Ranger Raptor cat-back before the green. Exhausts, servicing and coastal-grade stainless — handled on the go.",
} as const

/** Torque assistant identity used across the screen. */
export const TORQUE_ASSISTANT = {
  name: "Torque",
  role: "your Mufflermen business assistant",
  avatarInitial: "T",
} as const
