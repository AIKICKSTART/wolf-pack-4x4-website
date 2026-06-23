/**
 * Shared mock data for the customer-portal sub-routes + full-portal composition.
 *
 * Customer-facing data for Mick Davis, Karen Wallis and Bec Singh —
 * mufflermen.com.au self-serve. Booking wizard slots, vehicle garage,
 * service history, quotes, invoices, loyalty card, docs, referral, NPS
 * feedback, addresses, notification prefs, account summary, upcoming
 * appointments, and the workshop chat. Australian English, AUD inc GST.
 */

import type {
  BookingServiceOption,
  BookingTimeSlot,
  CustomerChatMessage,
  CustomerInvoice,
  CustomerLoyalty,
  CustomerQuote,
  FeedbackContext,
  NotificationTopic,
  PortalAddress,
  PortalAppointment,
  PortalCustomer,
  PortalDocument,
  PortalVehicle,
  ReferralProgram,
  ServiceHistoryEntry,
} from "../components/customer-portal"

/* ------------------------------------------------------------------ *
 * Customer profile — Mick Davis
 * ------------------------------------------------------------------ */

export const CUSTOMER_MICK: PortalCustomer = {
  id: "cust-mick",
  name: "Mick Davis",
  initials: "MD",
  memberSince: "Apr 2018",
  tier: "gold",
  vehicleCount: 2,
  nextRewardLabel: "1 stamp until dyno + report",
  loyaltyProgressPct: (4 / 8) * 100,
}

export const CUSTOMER_KAREN: PortalCustomer = {
  id: "cust-karen",
  name: "Karen Wallis",
  initials: "KW",
  memberSince: "Aug 2014",
  tier: "platinum",
  vehicleCount: 3,
  nextRewardLabel: "Reward ready · custom tune unlocked",
  loyaltyProgressPct: 100,
}

export const CUSTOMER_BEC: PortalCustomer = {
  id: "cust-bec",
  name: "Bec Singh",
  initials: "BS",
  memberSince: "Jan 2026",
  tier: "starter",
  vehicleCount: 1,
  nextRewardLabel: "6 stamps until wheel align",
  loyaltyProgressPct: (2 / 8) * 100,
}

/* ------------------------------------------------------------------ *
 * Vehicles — Mick's garage
 * ------------------------------------------------------------------ */

export const VEHICLE_HILUX: PortalVehicle = {
  id: "v-hilux",
  label: "Toyota Hilux N80 SR5",
  yearMade: 2021,
  rego: "KFK-23M",
  bodyColour: "Eclipse black",
  odometerKm: 84620,
  lastServiceAt: "12 Feb 2026",
  nextServiceDueAt: "11 Jun 2026",
  daysUntilService: 13,
  serviceState: "due-soon",
  roadworthyExpiresAt: "12 Sep 2026",
  hasActiveRecall: false,
}

export const VEHICLE_FALCON: PortalVehicle = {
  id: "v-falcon",
  label: "Ford Falcon BF XR6",
  yearMade: 2008,
  rego: "DGR-411",
  bodyColour: "Lightning strike",
  odometerKm: 218460,
  lastServiceAt: "04 Mar 2026",
  nextServiceDueAt: "04 Sep 2026",
  daysUntilService: 98,
  serviceState: "fresh",
  roadworthyExpiresAt: "30 Jul 2026",
  hasActiveRecall: true,
}

export const VEHICLE_RAPTOR: PortalVehicle = {
  id: "v-raptor",
  label: "Ford Ranger Raptor",
  yearMade: 2024,
  rego: "RAP-22Z",
  bodyColour: "Conquer grey",
  odometerKm: 12640,
  lastServiceAt: "01 Mar 2026",
  nextServiceDueAt: "21 May 2026",
  daysUntilService: -8,
  serviceState: "overdue",
  roadworthyExpiresAt: "21 May 2027",
  hasActiveRecall: true,
}

export const MICK_GARAGE: ReadonlyArray<PortalVehicle> = [
  VEHICLE_HILUX,
  VEHICLE_FALCON,
]

export const FULL_GARAGE: ReadonlyArray<PortalVehicle> = [
  VEHICLE_HILUX,
  VEHICLE_FALCON,
  VEHICLE_RAPTOR,
]

/* ------------------------------------------------------------------ *
 * Booking wizard
 * ------------------------------------------------------------------ */

export const BOOKING_SERVICES: ReadonlyArray<BookingServiceOption> = [
  {
    id: "svc-exhaust-upgrade",
    label: "Exhaust upgrade",
    description: "Cat-back, headers or muffler swap with dyno verify.",
    durationHours: 4.5,
    estimateAud: 1820,
    iconKey: "exhaust",
  },
  {
    id: "svc-major-service",
    label: "Major service",
    description: "Full 60k inspection, fluids, filters and brake bleed.",
    durationHours: 3,
    estimateAud: 620,
    iconKey: "spanner",
  },
  {
    id: "svc-dyno-tune",
    label: "Dyno tune session",
    description: "Two-hour rolling road tune with before/after report.",
    durationHours: 2,
    estimateAud: 480,
    iconKey: "tachometer",
  },
  {
    id: "svc-pink-slip",
    label: "Pink-slip (NSW eSafety)",
    description: "Standard rego renewal safety check + RTA submission.",
    durationHours: 1,
    estimateAud: 49,
    iconKey: "shield",
  },
  {
    id: "svc-brake-service",
    label: "Brake service",
    description: "Pads, rotors, fluid flush — all axles.",
    durationHours: 2.5,
    estimateAud: 540,
    iconKey: "brake",
  },
  {
    id: "svc-coolant-flush",
    label: "Coolant flush",
    description: "System drain, refill, pressure-test and bleed.",
    durationHours: 1.5,
    estimateAud: 220,
    iconKey: "coolant",
  },
]

export const BOOKING_SLOTS: ReadonlyArray<BookingTimeSlot> = [
  { id: "slot-1", date: "2026-06-04", startHour: 8 },
  { id: "slot-2", date: "2026-06-04", startHour: 9.5, taken: true },
  { id: "slot-3", date: "2026-06-04", startHour: 11 },
  { id: "slot-4", date: "2026-06-04", startHour: 14 },
  { id: "slot-5", date: "2026-06-05", startHour: 7.5 },
  { id: "slot-6", date: "2026-06-05", startHour: 10, taken: true },
  { id: "slot-7", date: "2026-06-05", startHour: 13 },
  { id: "slot-8", date: "2026-06-05", startHour: 15.5 },
  { id: "slot-9", date: "2026-06-06", startHour: 8 },
  { id: "slot-10", date: "2026-06-06", startHour: 11 },
]

/* ------------------------------------------------------------------ *
 * Quote — 2.5" Manta cat-back + fit
 * ------------------------------------------------------------------ */

export const QUOTE_HILUX: CustomerQuote = {
  id: "quote-hilux",
  number: "QTE-2847",
  vehicleLabel: "2021 Toyota Hilux N80 SR5",
  rego: "KFK-23M",
  preparedBy: "Brad McKenzie",
  preparedAt: "Mon 25 May · 16:42",
  validUntil: "Tue 09 Jun 2026",
  status: "sent",
  note:
    "Mick — pricing locked for the Manta 2.5\" cat-back with the polished tip you liked on Saturday. ADR 83/00 compliant. Dyno verify included.",
  lineItems: [
    {
      id: "ql-1",
      kind: "part",
      label: "Manta 2.5\" cat-back system (Hilux N80 spec)",
      detail: "Aluminised pipework · polished tip · ADR 83/00",
      quantity: 1,
      unitAud: 1080,
    },
    {
      id: "ql-2",
      kind: "part",
      label: "Exhaust hanger + clamp kit",
      quantity: 1,
      unitAud: 96,
    },
    {
      id: "ql-3",
      kind: "labour",
      label: "Cat-back fit-up + heat shield trim",
      detail: "2.5h @ $165 — Brad on Bay 3",
      quantity: 1,
      unitAud: 412.5,
    },
    {
      id: "ql-4",
      kind: "labour",
      label: "Dyno verify run + report",
      detail: "1h @ $165 — Jase on Bay 6 dyno",
      quantity: 1,
      unitAud: 165,
    },
    {
      id: "ql-5",
      kind: "fee",
      label: "Eco disposal — old cat-back",
      quantity: 1,
      unitAud: 40,
    },
  ],
}

export const QUOTE_FALCON_ACCEPTED: CustomerQuote = {
  ...QUOTE_HILUX,
  id: "quote-falcon",
  number: "QTE-2812",
  vehicleLabel: "2008 Ford Falcon BF XR6",
  rego: "DGR-411",
  preparedBy: "Tim Hollister",
  preparedAt: "Thu 12 Mar · 09:14",
  validUntil: "Thu 26 Mar 2026",
  status: "accepted",
  note: undefined,
  lineItems: [
    {
      id: "ql-f-1",
      kind: "part",
      label: "X-Force varex twin tip",
      quantity: 1,
      unitAud: 1280,
    },
    {
      id: "ql-f-2",
      kind: "labour",
      label: "Hand-fit + dyno verify",
      detail: "5h @ $165",
      quantity: 1,
      unitAud: 825,
    },
  ],
}

export const QUOTE_RAPTOR_EXPIRED: CustomerQuote = {
  ...QUOTE_HILUX,
  id: "quote-raptor",
  number: "QTE-2701",
  vehicleLabel: "2024 Ford Ranger Raptor",
  rego: "RAP-22Z",
  preparedBy: "Jase Patel",
  preparedAt: "Fri 06 Feb · 11:08",
  validUntil: "Fri 20 Feb 2026",
  status: "expired",
  note: undefined,
  lineItems: [
    {
      id: "ql-r-1",
      kind: "part",
      label: "X-Force 3\" turbo-back",
      quantity: 1,
      unitAud: 2280,
    },
    {
      id: "ql-r-2",
      kind: "labour",
      label: "Fit-up + dyno tune",
      detail: "4h @ $165",
      quantity: 1,
      unitAud: 660,
    },
  ],
}

/* ------------------------------------------------------------------ *
 * Invoices
 * ------------------------------------------------------------------ */

const STANDARD_PAY_OPTIONS = [
  {
    id: "pay-apple",
    label: "Apple Pay",
    brand: "apple-pay" as const,
    hint: "Touch ID confirm",
  },
  {
    id: "pay-card",
    label: "Card",
    brand: "stripe" as const,
    hint: "Visa · Mastercard · Amex",
  },
  {
    id: "pay-gpay",
    label: "Google Pay",
    brand: "google-pay" as const,
    hint: "Phone confirm",
  },
  {
    id: "pay-bank",
    label: "Bank transfer",
    brand: "bank-transfer" as const,
    hint: "OSKO instant — 0468 1188",
  },
]

export const INVOICE_HILUX_OUTSTANDING: CustomerInvoice = {
  id: "inv-hilux",
  number: "INV-9482",
  vehicleLabel: "2021 Hilux N80 SR5",
  rego: "KFK-23M",
  amountAud: 1842.5,
  gstAud: 167.5,
  dueAt: "Fri 05 Jun 2026",
  status: "outstanding",
  paymentOptions: STANDARD_PAY_OPTIONS,
}

export const INVOICE_FALCON_PARTIAL: CustomerInvoice = {
  id: "inv-falcon",
  number: "INV-9412",
  vehicleLabel: "2008 Falcon BF XR6",
  rego: "DGR-411",
  amountAud: 2105.0,
  gstAud: 191.36,
  paidAud: 800,
  dueAt: "Mon 02 Jun 2026",
  status: "partial",
  paymentOptions: STANDARD_PAY_OPTIONS,
}

export const INVOICE_RAPTOR_PAID: CustomerInvoice = {
  id: "inv-raptor",
  number: "INV-9388",
  vehicleLabel: "2024 Ranger Raptor",
  rego: "RAP-22Z",
  amountAud: 980,
  gstAud: 89.1,
  paidAud: 980,
  dueAt: "Tue 26 May 2026",
  status: "paid",
  paymentOptions: STANDARD_PAY_OPTIONS,
}

/* ------------------------------------------------------------------ *
 * Service history — Hilux
 * ------------------------------------------------------------------ */

export const HISTORY_HILUX: ReadonlyArray<ServiceHistoryEntry> = [
  {
    id: "hist-h-1",
    vehicleId: "v-hilux",
    date: "Tue 26 May 2026",
    kind: "exhaust",
    title: "Cat-back upgrade + DPF burn",
    summary:
      "Manta 3\" cat-back fit-up, DPF clean, dyno verify. Gained 18kW & 64Nm.",
    odometerKm: 84620,
    techName: "Brad McKenzie",
    invoiceAud: 1842.5,
    pdfHref: "#receipt-h-1",
    pdfLabel: "Download receipt + dyno chart",
  },
  {
    id: "hist-h-2",
    vehicleId: "v-hilux",
    date: "Thu 12 Feb 2026",
    kind: "service",
    title: "60k major service",
    summary: "Fluids, filters, brake bleed, tyre rotation. All within spec.",
    odometerKm: 79480,
    techName: "Tim Hollister",
    invoiceAud: 720,
    pdfHref: "#receipt-h-2",
    pdfLabel: "Download receipt PDF",
  },
  {
    id: "hist-h-3",
    vehicleId: "v-hilux",
    date: "Mon 19 Aug 2025",
    kind: "roadworthy",
    title: "Pink-slip rego renewal",
    summary:
      "NSW eSafety pink-slip submitted via RTA portal. No defects flagged.",
    odometerKm: 72148,
    techName: "Tim Hollister",
    invoiceAud: 49,
    pdfHref: "#receipt-h-3",
    pdfLabel: "Download pink-slip PDF",
  },
  {
    id: "hist-h-4",
    vehicleId: "v-hilux",
    date: "Fri 14 Mar 2025",
    kind: "warranty",
    title: "Toyota DPF sensor — covered",
    summary: "Sensor harness replaced under TSB 25-1108 — Toyota goodwill.",
    odometerKm: 68210,
    techName: "Jase Patel",
    invoiceAud: 0,
    pdfHref: "#receipt-h-4",
    pdfLabel: "Download warranty docket",
  },
]

/* ------------------------------------------------------------------ *
 * Loyalty
 * ------------------------------------------------------------------ */

export const LOYALTY_MICK: CustomerLoyalty = {
  id: "loy-mick",
  customerLabel: "Mick Davis",
  tier: "gold",
  currentStamps: 4,
  totalStamps: 8,
  nextReward: "Free dyno run + service report",
  rewardReady: false,
  joinedAt: "Apr 2018",
  lastVisitAt: "Tue 26 May",
  visitsCount: 18,
}

export const LOYALTY_KAREN: CustomerLoyalty = {
  id: "loy-karen",
  customerLabel: "Karen Wallis",
  tier: "platinum",
  currentStamps: 8,
  totalStamps: 8,
  nextReward: "Custom 2hr dyno tune session",
  rewardReady: true,
  joinedAt: "Aug 2014",
  lastVisitAt: "Wed 27 May",
  visitsCount: 34,
}

export const LOYALTY_BEC: CustomerLoyalty = {
  id: "loy-bec",
  customerLabel: "Bec Singh",
  tier: "starter",
  currentStamps: 2,
  totalStamps: 8,
  nextReward: "Free wheel alignment + balance",
  rewardReady: false,
  joinedAt: "Jan 2026",
  lastVisitAt: "Tue 26 May",
  visitsCount: 3,
}

/* ------------------------------------------------------------------ *
 * Documents
 * ------------------------------------------------------------------ */

export const DOC_RECEIPT: PortalDocument = {
  id: "doc-receipt",
  title: "Tax invoice — Cat-back upgrade",
  kind: "receipt",
  vehicleLabel: "2021 Hilux N80 SR5",
  issuedAt: "Tue 26 May 2026",
  byteSizeKb: 184,
  pageCount: 2,
}

export const DOC_ROADWORTHY: PortalDocument = {
  id: "doc-pink",
  title: "Pink-slip eSafety certificate",
  kind: "roadworthy",
  vehicleLabel: "2021 Hilux N80 SR5",
  issuedAt: "Mon 19 Aug 2025",
  byteSizeKb: 92,
  pageCount: 1,
}

export const DOC_DYNO: PortalDocument = {
  id: "doc-dyno",
  title: "Dyno chart — before/after",
  kind: "dyno-chart",
  vehicleLabel: "2021 Hilux N80 SR5",
  issuedAt: "Tue 26 May 2026",
  byteSizeKb: 612,
  pageCount: 4,
}

export const DOC_WARRANTY: PortalDocument = {
  id: "doc-warranty",
  title: "Manta cat-back warranty card",
  kind: "warranty",
  vehicleLabel: "2021 Hilux N80 SR5",
  issuedAt: "Tue 26 May 2026",
  byteSizeKb: 142,
  pageCount: 1,
}

export const DOC_MANUAL: PortalDocument = {
  id: "doc-manual",
  title: "Owner care guide — exhaust break-in",
  kind: "manual",
  issuedAt: "Tue 26 May 2026",
  byteSizeKb: 1024,
  pageCount: 6,
}

export const DOCS_ALL: ReadonlyArray<PortalDocument> = [
  DOC_RECEIPT,
  DOC_DYNO,
  DOC_ROADWORTHY,
  DOC_WARRANTY,
  DOC_MANUAL,
]

/* ------------------------------------------------------------------ *
 * Referral
 * ------------------------------------------------------------------ */

export const REFERRAL_MICK: ReferralProgram = {
  code: "MICKMUFF",
  shareUrl: "mufflermen.com.au/r/MICKMUFF",
  rewardLabel: "Mate gets $50 off · You bank $100 in workshop credit",
  invitedCount: 6,
  bookedCount: 3,
  rewardedTotalAud: 300,
  activity: [
    {
      id: "ref-1",
      mateName: "Trent Calloway",
      status: "rewarded",
      rewardAud: 100,
      when: "Mon 25 May",
    },
    {
      id: "ref-2",
      mateName: "Aliana Romeo",
      status: "booked",
      when: "Sat 23 May",
    },
    {
      id: "ref-3",
      mateName: "Garry Cole",
      status: "invited",
      when: "Wed 20 May",
    },
  ],
}

export const REFERRAL_FRESH: ReferralProgram = {
  code: "BECSINGH",
  shareUrl: "mufflermen.com.au/r/BECSINGH",
  rewardLabel: "Mate gets $50 off · You bank $100 in workshop credit",
  invitedCount: 0,
  bookedCount: 0,
  rewardedTotalAud: 0,
  activity: [],
}

export const REFERRAL_VETERAN: ReferralProgram = {
  code: "KARENW8",
  shareUrl: "mufflermen.com.au/r/KARENW8",
  rewardLabel: "Mate gets $50 off · You bank $100 in workshop credit",
  invitedCount: 18,
  bookedCount: 11,
  rewardedTotalAud: 1100,
  activity: [
    {
      id: "ref-v-1",
      mateName: "Lou Whitford",
      status: "rewarded",
      rewardAud: 100,
      when: "Fri 22 May",
    },
    {
      id: "ref-v-2",
      mateName: "Saanvi Naidu",
      status: "rewarded",
      rewardAud: 100,
      when: "Mon 18 May",
    },
    {
      id: "ref-v-3",
      mateName: "Pete Lawson",
      status: "booked",
      when: "Fri 15 May",
    },
    {
      id: "ref-v-4",
      mateName: "Bec Singh",
      status: "invited",
      when: "Wed 13 May",
    },
  ],
}

/* ------------------------------------------------------------------ *
 * Feedback / NPS
 * ------------------------------------------------------------------ */

export const FEEDBACK_MICK: FeedbackContext = {
  vehicleLabel: "2021 Hilux N80 SR5",
  serviceLabel: "Cat-back upgrade + DPF burn",
  techName: "Brad McKenzie",
  servicedAt: "Tue 26 May 2026",
  promptLabel: "Tap a star to rate yesterday's job",
}

export const FEEDBACK_KAREN: FeedbackContext = {
  vehicleLabel: "1976 Falcon GT XB",
  serviceLabel: "Pacemaker tri-Y headers",
  techName: "Tim Hollister",
  servicedAt: "Wed 27 May 2026",
}

/* ------------------------------------------------------------------ *
 * Addresses
 * ------------------------------------------------------------------ */

export const ADDRESSES_MICK: ReadonlyArray<PortalAddress> = [
  {
    id: "addr-home",
    label: "Home — Albion Park Rail",
    street: "32 Lakelands Drive",
    suburb: "Albion Park Rail",
    postcode: "2527",
    state: "nsw",
    use: "service",
    isDefault: true,
  },
  {
    id: "addr-work",
    label: "BHP yard — Port Kembla",
    street: "Site gate 4, Tom Thumb Rd",
    suburb: "Port Kembla",
    postcode: "2505",
    state: "nsw",
    use: "delivery",
  },
  {
    id: "addr-bill",
    label: "Davis Earthworks",
    street: "Unit 6, 18 Industrial Pde",
    suburb: "Oak Flats",
    postcode: "2529",
    state: "nsw",
    use: "billing",
  },
]

/* ------------------------------------------------------------------ *
 * Notification topics
 * ------------------------------------------------------------------ */

export const NOTIFICATION_TOPICS: ReadonlyArray<NotificationTopic> = [
  {
    id: "nt-booking",
    label: "Booking reminders",
    description: "Day-before and morning-of reminders for upcoming services.",
    channels: { sms: true, email: true, push: true },
  },
  {
    id: "nt-job-update",
    label: "Job updates",
    description: "Live updates while your vehicle is on the hoist.",
    channels: { sms: true, email: false, push: true },
  },
  {
    id: "nt-invoice",
    label: "Invoices & receipts",
    description: "PDF invoice when payment is captured.",
    channels: { sms: false, email: true, push: false },
  },
  {
    id: "nt-roadworthy",
    label: "Rego & roadworthy",
    description: "60-day heads-up before your pink-slip expires.",
    channels: { sms: true, email: true, push: false },
  },
  {
    id: "nt-promo",
    label: "Workshop news + offers",
    description: "Quarterly newsletter and members-only specials.",
    channels: { sms: false, email: true, push: false },
  },
]

/* ------------------------------------------------------------------ *
 * Appointments
 * ------------------------------------------------------------------ */

export const APPT_UPCOMING: PortalAppointment = {
  id: "appt-hilux",
  serviceLabel: "Cat-back fit-up + dyno verify",
  serviceSummary:
    "Manta 2.5\" cat-back hand-fit by Brad, then 1hr dyno verify on Bay 6.",
  vehicleLabel: "2021 Hilux N80 SR5",
  rego: "KFK-23M",
  startsAt: "2026-06-04T08:00",
  durationMinutes: 270,
  bayLabel: "Bay 3 · Hoist",
  techName: "Brad McKenzie",
  status: "confirmed",
}

export const APPT_PENDING: PortalAppointment = {
  id: "appt-falcon",
  serviceLabel: "Tyre rotation + brake check",
  serviceSummary:
    "Standard rotation + brake pad measure on the family runabout.",
  vehicleLabel: "2008 Falcon BF XR6",
  rego: "DGR-411",
  startsAt: "2026-06-12T13:30",
  durationMinutes: 75,
  bayLabel: "Bay 5 · Alignment",
  techName: "Kyla Robins",
  status: "pending",
}

export const APPT_LOCKED: PortalAppointment = {
  id: "appt-locked",
  serviceLabel: "Pink-slip rego renewal",
  serviceSummary: "30-min eSafety inspection + RTA portal submit.",
  vehicleLabel: "2024 Ranger Raptor",
  rego: "RAP-22Z",
  startsAt: "2026-05-30T09:30",
  durationMinutes: 60,
  bayLabel: "Bay 2",
  techName: "Tim Hollister",
  status: "needs-review",
  rescheduleLocked: true,
}

/* ------------------------------------------------------------------ *
 * Workshop chat
 * ------------------------------------------------------------------ */

export const CHAT_MESSAGES: ReadonlyArray<CustomerChatMessage> = [
  {
    id: "ch-1",
    sender: "customer",
    body: "G'day Brad — could you give me a heads-up when the Hilux is on the hoist? Want to head over for a look at the headers.",
    sentAt: "Tue 26 May · 07:48",
    status: "read",
  },
  {
    id: "ch-2",
    sender: "workshop",
    authorName: "Brad McKenzie",
    body: "All good mate. On Bay 3 now, DPF burn underway. Pop in any time after 10.",
    sentAt: "Tue 26 May · 08:24",
  },
  {
    id: "ch-3",
    sender: "customer",
    body: "Cheers. Any chance you can send the dyno graph once you're done?",
    sentAt: "Tue 26 May · 11:38",
    status: "delivered",
  },
  {
    id: "ch-4",
    sender: "hermes",
    authorName: "Hermes",
    body: "Hi Mick — Brad's on Bay 3 hand-fitting the cat-back. I'll auto-attach the dyno chart to your portal as soon as it lands. ETA ~14:30.",
    sentAt: "Tue 26 May · 11:39",
  },
]

export const CHAT_MESSAGES_FRESH: ReadonlyArray<CustomerChatMessage> = [
  {
    id: "ch-f-1",
    sender: "hermes",
    authorName: "Hermes",
    body: "Welcome aboard, Bec. I'll keep an eye on your booking and ping Brad if anything moves. Anything you'd like me to pre-fill before drop-off?",
    sentAt: "Mon 25 May · 09:10",
  },
]

export const CHAT_MESSAGES_RESOLVED: ReadonlyArray<CustomerChatMessage> = [
  {
    id: "ch-r-1",
    sender: "customer",
    body: "Hey team — has the GT made it through the QC walk-around?",
    sentAt: "Wed 27 May · 09:42",
    status: "read",
  },
  {
    id: "ch-r-2",
    sender: "workshop",
    authorName: "Tim Hollister",
    body: "All sorted Karen. Sound test passed, paperwork done. Pickup any time today, kettle's on.",
    sentAt: "Wed 27 May · 11:34",
  },
  {
    id: "ch-r-3",
    sender: "customer",
    body: "Beauty. On my way over.",
    sentAt: "Wed 27 May · 11:36",
    status: "read",
  },
]
