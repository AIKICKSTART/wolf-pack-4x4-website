/**
 * Shared mock data for the workshop-ops sub-routes + full-workshop composition.
 *
 * Authentic Oak Flats Mufflermen workshop vocabulary — bays 1–6, master tech
 * Tim, Brad, Jase, Kyla apprentice; Falcon GT, Hilux N80, Ranger Raptor,
 * HSV Clubsport, BT-50; suppliers Manta, Pacemaker, X-Force, Genie; NSW RTA
 * pink-slip; AUD inc GST; Mon–Fri 7:30–17:30, Sat 8–13.
 */

import type {
  BayBooking,
  BayDayState,
  CustomerProfile,
  DynoRun,
  InspectionSection,
  LoyaltyCard,
  Mechanic,
  PartPullEntry,
  PaymentCollection,
  QuoteRow,
  RecallRow,
  RoadworthyCert,
  ServiceTicket,
  ShiftBlock,
  SmsMessage,
  SmsTemplate,
  VehicleHealth,
} from "../components/workshop-ops"

/* ------------------------------------------------------------------ *
 * Mechanics — the Mufflermen crew
 * ------------------------------------------------------------------ */

export const MECHANICS: ReadonlyArray<Mechanic> = [
  {
    id: "mech-tim",
    name: "Tim Hollister",
    initials: "TH",
    role: "Master tech · workshop manager",
    level: "master",
    tone: "red",
  },
  {
    id: "mech-brad",
    name: "Brad McKenzie",
    initials: "BM",
    role: "Senior fabricator",
    level: "tech",
    tone: "amber",
  },
  {
    id: "mech-jase",
    name: "Jase Patel",
    initials: "JP",
    role: "Diagnostic tech",
    level: "tech",
    tone: "teal",
  },
  {
    id: "mech-kyla",
    name: "Kyla Robins",
    initials: "KR",
    role: "Apprentice · year 2",
    level: "apprentice",
    tone: "green",
  },
]

export function mechanicById(id: string | undefined): Mechanic | undefined {
  if (!id) return undefined
  return MECHANICS.find((mech) => mech.id === id)
}

/* ------------------------------------------------------------------ *
 * Service tickets
 * ------------------------------------------------------------------ */

export const TICKET_FALCON: ServiceTicket = {
  id: "wo-falcon",
  number: "WO-2847",
  customerName: "Mick Davis",
  vehicleLabel: "2019 Toyota Hilux N80 SR5",
  rego: "BX1-8RT",
  vin: "JTERA71J20J108426",
  mileageKm: 84620,
  bayId: "bay-3",
  mechanicId: "mech-brad",
  status: "in-progress",
  priority: "rush",
  loggedAt: "Tue 26 May · 07:42",
  etaLabel: "Tue 26 May · 14:30",
  totalAud: 1842.5,
  services: [
    { id: "wo-falcon-1", label: "Cat-back exhaust upgrade — Manta 3\"", hours: 2.5, done: true },
    { id: "wo-falcon-2", label: "DPF clean + regen burn", hours: 1.5, done: true },
    { id: "wo-falcon-3", label: "Tune & dyno verification", hours: 1.0, done: false },
    { id: "wo-falcon-4", label: "Underbody coat-back + thread-lock", hours: 0.5, done: false },
  ],
}

export const TICKET_GT: ServiceTicket = {
  id: "wo-gt",
  number: "WO-2851",
  customerName: "Karen Wallis",
  vehicleLabel: "1976 Ford Falcon GT XB",
  rego: "GT-460",
  vin: "JG33HF18M00046521",
  mileageKm: 198400,
  bayId: "bay-4-hoist",
  mechanicId: "mech-tim",
  status: "quality-check",
  priority: "vip",
  loggedAt: "Mon 25 May · 08:10",
  etaLabel: "Wed 27 May · 11:00",
  totalAud: 4280.0,
  services: [
    { id: "wo-gt-1", label: "Pacemaker tri-Y headers — hand-fit", hours: 4.0, done: true },
    { id: "wo-gt-2", label: "2.5\" twin stainless with X-pipe", hours: 3.0, done: true },
    { id: "wo-gt-3", label: "Reverse-flow muffler + glasspacks", hours: 2.0, done: true },
    { id: "wo-gt-4", label: "QC walk-around + sound test", hours: 1.0, done: false },
  ],
}

export const TICKET_RANGER: ServiceTicket = {
  id: "wo-ranger",
  number: "WO-2853",
  customerName: "Bec Singh",
  vehicleLabel: "2024 Ford Ranger Raptor",
  rego: "RAP-22Z",
  vin: "WF0LXXTACMNP56281",
  mileageKm: 18420,
  bayId: "bay-6-dyno",
  mechanicId: "mech-jase",
  status: "ready",
  priority: "standard",
  loggedAt: "Tue 26 May · 09:15",
  etaLabel: "Tue 26 May · 16:30",
  totalAud: 980.0,
  services: [
    { id: "wo-ranger-1", label: "X-Force 3\" turbo-back fit-up", hours: 2.5, done: true },
    { id: "wo-ranger-2", label: "Dyno baseline + tune verification", hours: 1.5, done: true },
    { id: "wo-ranger-3", label: "Roadworthy pink-slip", hours: 0.5, done: true },
  ],
}

export const SERVICE_TICKETS: ReadonlyArray<ServiceTicket> = [
  TICKET_FALCON,
  TICKET_GT,
  TICKET_RANGER,
]

/* ------------------------------------------------------------------ *
 * Bay scheduler
 * ------------------------------------------------------------------ */

export const BAY_HOURS: ReadonlyArray<number> = [7.5, 9, 10.5, 12, 13.5, 15, 16.5, 17.5]

export const BAY_BOOKINGS: ReadonlyArray<BayBooking> = [
  {
    id: "bb-1",
    bayId: "bay-1",
    startHour: 7.5,
    durationHours: 1.5,
    customerLabel: "Pete Lawson",
    vehicleLabel: "VE Commodore SS",
    mechanicId: "mech-jase",
    priority: "standard",
    status: "diagnosed",
  },
  {
    id: "bb-2",
    bayId: "bay-1",
    startHour: 10,
    durationHours: 2.5,
    customerLabel: "Saanvi Naidu",
    vehicleLabel: "BT-50 GT",
    mechanicId: "mech-kyla",
    priority: "standard",
    status: "in-progress",
  },
  {
    id: "bb-3",
    bayId: "bay-2",
    startHour: 8,
    durationHours: 3,
    customerLabel: "Lou Whitford",
    vehicleLabel: "AU Falcon ute",
    mechanicId: "mech-brad",
    priority: "rush",
    status: "in-progress",
  },
  {
    id: "bb-4",
    bayId: "bay-3",
    startHour: 7.5,
    durationHours: 5.5,
    customerLabel: "Mick Davis",
    vehicleLabel: "Hilux N80 SR5",
    mechanicId: "mech-brad",
    priority: "rush",
    status: "in-progress",
    pinned: true,
  },
  {
    id: "bb-5",
    bayId: "bay-4-hoist",
    startHour: 8,
    durationHours: 8,
    customerLabel: "Karen Wallis",
    vehicleLabel: "Falcon GT XB '76",
    mechanicId: "mech-tim",
    priority: "vip",
    status: "quality-check",
    pinned: true,
  },
  {
    id: "bb-6",
    bayId: "bay-5-alignment",
    startHour: 9,
    durationHours: 1.5,
    customerLabel: "Aliana Romeo",
    vehicleLabel: "Mazda 3 sport",
    mechanicId: "mech-kyla",
    priority: "standard",
    status: "in-progress",
  },
  {
    id: "bb-7",
    bayId: "bay-5-alignment",
    startHour: 12,
    durationHours: 1,
    customerLabel: "Garry Cole",
    vehicleLabel: "Subaru Forester XT",
    mechanicId: "mech-jase",
    priority: "standard",
    status: "drop-off",
  },
  {
    id: "bb-8",
    bayId: "bay-6-dyno",
    startHour: 11,
    durationHours: 2,
    customerLabel: "Bec Singh",
    vehicleLabel: "Ranger Raptor",
    mechanicId: "mech-jase",
    priority: "standard",
    status: "ready",
  },
  {
    id: "bb-9",
    bayId: "bay-6-dyno",
    startHour: 14,
    durationHours: 2,
    customerLabel: "Trent Calloway",
    vehicleLabel: "HSV Clubsport R8",
    mechanicId: "mech-tim",
    priority: "vip",
    status: "drop-off",
  },
]

export const BAY_STATES: ReadonlyArray<BayDayState> = [
  { bayId: "bay-1", state: "in-use" },
  { bayId: "bay-2", state: "in-use" },
  { bayId: "bay-3", state: "in-use" },
  { bayId: "bay-4-hoist", state: "in-use" },
  { bayId: "bay-5-alignment", state: "free", note: "Hunter rack idle 12:00–13:00" },
  { bayId: "bay-6-dyno", state: "in-use" },
]

/* ------------------------------------------------------------------ *
 * Mechanic shift timeline
 * ------------------------------------------------------------------ */

export const SHIFT_HOURS: ReadonlyArray<number> = [7.5, 9, 10.5, 12, 13.5, 15, 16.5, 17.5]

export const SHIFT_BLOCKS: ReadonlyArray<ShiftBlock> = [
  { id: "sh-tim-1", mechanicId: "mech-tim", kind: "shift", startHour: 7.5, durationHours: 4.5 },
  { id: "sh-tim-2", mechanicId: "mech-tim", kind: "lunch", startHour: 12, durationHours: 0.5 },
  { id: "sh-tim-3", mechanicId: "mech-tim", kind: "shift", startHour: 12.5, durationHours: 5 },
  { id: "sh-brad-1", mechanicId: "mech-brad", kind: "shift", startHour: 7.5, durationHours: 2.5 },
  { id: "sh-brad-2", mechanicId: "mech-brad", kind: "break", startHour: 10, durationHours: 0.25 },
  { id: "sh-brad-3", mechanicId: "mech-brad", kind: "shift", startHour: 10.25, durationHours: 1.75 },
  { id: "sh-brad-4", mechanicId: "mech-brad", kind: "lunch", startHour: 12, durationHours: 0.5 },
  { id: "sh-brad-5", mechanicId: "mech-brad", kind: "shift", startHour: 12.5, durationHours: 5 },
  { id: "sh-jase-1", mechanicId: "mech-jase", kind: "shift", startHour: 8, durationHours: 4 },
  { id: "sh-jase-2", mechanicId: "mech-jase", kind: "training", startHour: 12, durationHours: 1.5, note: "X-Force dealer training" },
  { id: "sh-jase-3", mechanicId: "mech-jase", kind: "shift", startHour: 13.5, durationHours: 4 },
  { id: "sh-kyla-1", mechanicId: "mech-kyla", kind: "sick", startHour: 7.5, durationHours: 10, note: "TAFE absent + flu" },
]

/* ------------------------------------------------------------------ *
 * Parts pull list
 * ------------------------------------------------------------------ */

export const PARTS_PULL: ReadonlyArray<PartPullEntry> = [
  {
    id: "pp-1",
    partNumber: "MNT-3CB-N80",
    label: "Manta 3\" cat-back system",
    supplier: "Manta",
    bin: "A-3-12",
    stock: "in-stock",
    quantity: 1,
    unitPriceAud: 1240.0,
    pulled: true,
  },
  {
    id: "pp-2",
    partNumber: "MNT-CLM-N80",
    label: "Manta exhaust clamp set (×4)",
    supplier: "Manta",
    bin: "A-1-04",
    stock: "in-stock",
    quantity: 1,
    unitPriceAud: 82.0,
    pulled: true,
  },
  {
    id: "pp-3",
    partNumber: "ELR-DPF-2024",
    label: "DPF regen burn additive 1L",
    supplier: "Elring",
    bin: "C-2-09",
    stock: "low",
    quantity: 2,
    unitPriceAud: 48.5,
    pulled: false,
  },
  {
    id: "pp-4",
    partNumber: "XFC-O2-22UN",
    label: "X-Force universal O2 bung kit",
    supplier: "X-Force",
    bin: "B-4-22",
    stock: "in-stock",
    quantity: 1,
    unitPriceAud: 38.0,
    pulled: false,
  },
  {
    id: "pp-5",
    partNumber: "GEN-MTR-CRT",
    label: "Genie carbon-tip 4\" exit",
    supplier: "Genie",
    bin: "—",
    stock: "back-order",
    quantity: 1,
    unitPriceAud: 240.0,
    pulled: false,
  },
  {
    id: "pp-6",
    partNumber: "PCM-HG-4G",
    label: "Pacemaker header gasket — 4G54",
    supplier: "Pacemaker",
    bin: "B-2-08",
    stock: "supplier-pull",
    quantity: 1,
    unitPriceAud: 28.0,
    pulled: false,
  },
]

/* ------------------------------------------------------------------ *
 * Customer 360
 * ------------------------------------------------------------------ */

export const CUSTOMER_MICK: CustomerProfile = {
  id: "cu-mick",
  name: "Mick Davis",
  initials: "MD",
  phone: "0412 884 920",
  email: "mick.davis@outlook.com",
  suburb: "Albion Park Rail · 2527",
  joinedAt: "Mar 2018",
  lifetimeValueAud: 14620,
  visitsCount: 18,
  loyaltyTier: "champion",
  vehicles: [
    {
      id: "v-mick-1",
      label: "2019 Hilux N80 SR5",
      rego: "BX1-8RT",
      bodyColour: "Glacier white",
      yearMade: 2019,
    },
    {
      id: "v-mick-2",
      label: "1968 HK Premier (project)",
      rego: "VINTAGE",
      bodyColour: "Heron gold",
      yearMade: 1968,
    },
  ],
  comms: [
    {
      id: "co-mick-1",
      channel: "sms",
      when: "Tue 26 May · 11:42",
      summary: "Sent dyno-graph preview, asked about pickup time.",
      mechanicId: "mech-brad",
      inbound: false,
    },
    {
      id: "co-mick-2",
      channel: "call",
      when: "Tue 26 May · 09:08",
      summary: "Mick rang to push pickup to 16:30.",
      inbound: true,
    },
    {
      id: "co-mick-3",
      channel: "in-person",
      when: "Mon 25 May · 17:20",
      summary: "Dropped Hilux key + cash deposit $400.",
      mechanicId: "mech-tim",
      inbound: true,
    },
    {
      id: "co-mick-4",
      channel: "email",
      when: "Mon 25 May · 11:05",
      summary: "Sent itemised quote PDF + ADR-49 brief.",
      mechanicId: "mech-tim",
      inbound: false,
    },
  ],
}

/* ------------------------------------------------------------------ *
 * SMS conversation
 * ------------------------------------------------------------------ */

export const SMS_MESSAGES: ReadonlyArray<SmsMessage> = [
  {
    id: "sm-1",
    direction: "out",
    body: "G'day Mick, your Hilux is on Bay 3 hoist. Quick heads-up — DPF was choked, doing a burn now. Hold tight.",
    sentAt: "Tue 26 May · 08:24",
    status: "read",
    templateUsed: "Job underway",
  },
  {
    id: "sm-2",
    direction: "in",
    body: "Cheers mate. Any rough ETA? Got the missus on standby for school run pickup 3pm.",
    sentAt: "Tue 26 May · 08:31",
    status: "delivered",
  },
  {
    id: "sm-3",
    direction: "out",
    body: "Ready 14:30 latest. Will text once tune passes the dyno run.",
    sentAt: "Tue 26 May · 08:33",
    status: "read",
  },
  {
    id: "sm-4",
    direction: "in",
    body: "Beauty. Send the dyno graph through when you can?",
    sentAt: "Tue 26 May · 11:38",
    status: "delivered",
  },
  {
    id: "sm-5",
    direction: "out",
    body: "Sent through — gained 18kW & 64Nm at the wheels. Photos on the way.",
    sentAt: "Tue 26 May · 11:42",
    status: "delivered",
    templateUsed: "Dyno result",
  },
]

export const SMS_TEMPLATES: ReadonlyArray<SmsTemplate> = [
  {
    id: "tpl-arrive",
    label: "Arrival window",
    body: "Hi {name}, your {vehicle} arrival window is {window}. Let us know if that suits.",
  },
  {
    id: "tpl-ready",
    label: "Ready for pickup",
    body: "Good news — your {vehicle} is ready. Cash, card, or transfer all welcome.",
  },
  {
    id: "tpl-quote",
    label: "Quote sent",
    body: "Quote on its way — sit tight while I send the PDF. Holler with questions.",
  },
  {
    id: "tpl-delay",
    label: "Delay heads-up",
    body: "Heads up — we're running about {minutes} mins behind on your {vehicle}. Sorry mate.",
  },
  {
    id: "tpl-dyno",
    label: "Dyno result",
    body: "Dyno done — gained {kw}kW & {nm}Nm at the wheels. Sending the graph now.",
  },
  {
    id: "tpl-recall",
    label: "Recall reach-out",
    body: "Hi {name}, your {vehicle} is named on a {manufacturer} recall ({code}). Free fix — book in?",
  },
]

/* ------------------------------------------------------------------ *
 * Quote
 * ------------------------------------------------------------------ */

export const QUOTE_ROWS: ReadonlyArray<QuoteRow> = [
  {
    id: "qr-1",
    kind: "part",
    label: "Manta 3\" cat-back system (Hilux N80 spec)",
    quantity: 1,
    unitAud: 1240,
    markupPct: 18,
    notes: "Aluminised pipework · stainless tips · ADR 83/00 compliant.",
  },
  {
    id: "qr-2",
    kind: "part",
    label: "X-Force universal O2 bung",
    quantity: 1,
    unitAud: 38,
    markupPct: 28,
  },
  {
    id: "qr-3",
    kind: "part",
    label: "Manta exhaust clamp set (×4)",
    quantity: 1,
    unitAud: 82,
    markupPct: 20,
  },
  {
    id: "qr-4",
    kind: "labour",
    label: "Cat-back fit-up + DPF clean + dyno verify",
    quantity: 1,
    unitAud: 0,
    hours: 4.5,
    ratePerHourAud: 165,
  },
  {
    id: "qr-5",
    kind: "fee",
    label: "Eco disposal · old DPF + cat",
    quantity: 1,
    unitAud: 40,
    notes: "Handled via Illawarra metals recyclers.",
  },
]

/* ------------------------------------------------------------------ *
 * Inspection
 * ------------------------------------------------------------------ */

export const INSPECTION_SECTIONS: ReadonlyArray<InspectionSection> = [
  {
    id: "i-body",
    label: "Body & chassis",
    items: [
      { id: "i-body-1", label: "Underbody rust survey", result: "pass" },
      { id: "i-body-2", label: "Chassis rail straightness", result: "pass" },
      { id: "i-body-3", label: "Tow-bar mount integrity", result: "warn", note: "Slight surface rust — note for next service." },
    ],
  },
  {
    id: "i-tyres",
    label: "Tyres & wheels",
    items: [
      { id: "i-tyres-1", label: "Front tread depth (≥1.6mm)", result: "pass", note: "Left 5.2mm · right 5.4mm" },
      { id: "i-tyres-2", label: "Rear tread depth", result: "pass", note: "Both 6.1mm" },
      { id: "i-tyres-3", label: "Sidewall cracks / bulges", result: "pass" },
      { id: "i-tyres-4", label: "Spare condition", result: "skip" },
    ],
  },
  {
    id: "i-brakes",
    label: "Brakes",
    items: [
      { id: "i-brakes-1", label: "Front pad wear (≥3mm)", result: "warn", note: "4mm — book replace within 5,000km." },
      { id: "i-brakes-2", label: "Rear pad wear", result: "pass" },
      { id: "i-brakes-3", label: "Disc warpage / scoring", result: "pass" },
      { id: "i-brakes-4", label: "Hydraulic lines (no weeps)", result: "pass" },
    ],
  },
  {
    id: "i-exhaust",
    label: "Exhaust & emissions",
    items: [
      { id: "i-exhaust-1", label: "Manifold to cat seal", result: "fail", note: "Hairline crack at flange — replace gasket." },
      { id: "i-exhaust-2", label: "Cat-back hanger condition", result: "pass" },
      { id: "i-exhaust-3", label: "DPF differential pressure", result: "pass", note: "Within spec after burn." },
      { id: "i-exhaust-4", label: "Tail-pipe alignment", result: "pass" },
    ],
  },
  {
    id: "i-elec",
    label: "Electrical & lighting",
    items: [
      { id: "i-elec-1", label: "Battery health (CCA)", result: "pass", note: "92% of spec." },
      { id: "i-elec-2", label: "Alternator charge under load", result: "pass" },
      { id: "i-elec-3", label: "Tail/brake/indicator function", result: "pass" },
      { id: "i-elec-4", label: "Trailer wiring continuity", result: "skip" },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Dyno run — Hilux N80 cat-back upgrade
 * ------------------------------------------------------------------ */

function curve(
  baseKw: number,
  baseTorque: number,
  shift: number,
  jitter: number,
) {
  const rpms = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500]
  const peakIdx = 4
  return rpms.map((rpm, idx) => {
    const distance = Math.abs(idx - peakIdx)
    const falloff = 1 - (distance / rpms.length) * 0.6
    const wobble = ((idx * 37) % jitter) / 100
    return {
      rpm,
      power: baseKw * falloff + shift + wobble,
      torque: baseTorque * (1 - (distance / rpms.length) * 0.4) + shift * 2.4,
    }
  })
}

export const DYNO_HILUX: DynoRun = {
  id: "dyno-hilux",
  label: "Hilux N80 SR5 — Manta 3\" upgrade",
  recordedAt: "Tue 26 May · 11:24",
  peakPowerKw: 142.8,
  peakTorqueNm: 462,
  peakRpm: 3500,
  beforeCurve: curve(118, 392, 0, 24),
  afterCurve: curve(118, 392, 22, 24),
  notes:
    "Net gain on rolling road: +18.6 kW at the wheels & +64 Nm peak. Curve flatter through the 2500–4000 rpm band — typical of DPF-equipped diesels post-burn.",
}

/* ------------------------------------------------------------------ *
 * Payment
 * ------------------------------------------------------------------ */

export const PAYMENT_MICK: PaymentCollection = {
  id: "pay-mick",
  invoiceNumber: "INV-9482",
  amountAud: 1842.5,
  gstAud: 167.5,
  provider: "tyro",
  status: "pending",
  reference: "MUF-9482-N80",
  customerLabel: "Mick Davis · Hilux N80 SR5",
}

export const PAYMENT_GT: PaymentCollection = {
  id: "pay-gt",
  invoiceNumber: "INV-9466",
  amountAud: 4280,
  gstAud: 389,
  provider: "stripe",
  status: "settled",
  collectedAt: "Wed 27 May · 11:34",
  reference: "MUF-9466-GTXB",
  customerLabel: "Karen Wallis · Falcon GT XB",
}

export const PAYMENT_RANGER: PaymentCollection = {
  id: "pay-ranger",
  invoiceNumber: "INV-9477",
  amountAud: 980,
  gstAud: 89.1,
  provider: "square",
  status: "refunded",
  collectedAt: "Tue 26 May · 16:42",
  reference: "MUF-9477-RAP",
  customerLabel: "Bec Singh · Ranger Raptor",
  partialRefund: true,
  refundedAud: 120,
}

/* ------------------------------------------------------------------ *
 * Roadworthy certificates
 * ------------------------------------------------------------------ */

export const CERT_PINK: RoadworthyCert = {
  id: "cert-pink",
  certType: "pink-slip",
  status: "issued",
  rego: "RAP-22Z",
  vehicleLabel: "2024 Ford Ranger Raptor",
  customerLabel: "Bec Singh",
  inspectorName: "Tim Hollister · MVRIA 84412",
  certNumber: "MVRIA-PS-184290",
  issuedAt: "Tue 26 May · 15:18",
  expiresAt: "Tue 25 May 2027",
  ervVerifiedAt: "Tue 26 May · 15:24",
  faultCount: 0,
}

export const CERT_BLUE: RoadworthyCert = {
  id: "cert-blue",
  certType: "blue-slip",
  status: "in-progress",
  rego: "GT-460",
  vehicleLabel: "1976 Ford Falcon GT XB",
  customerLabel: "Karen Wallis",
  inspectorName: "Tim Hollister · AUVIS 11082",
  certNumber: "AUVIS-BS-098214",
  faultCount: 2,
}

export const CERT_SAFETY: RoadworthyCert = {
  id: "cert-safety",
  certType: "safety-check",
  status: "pre-inspection",
  rego: "BX1-8RT",
  vehicleLabel: "2019 Hilux N80 SR5",
  customerLabel: "Mick Davis",
  inspectorName: "Brad McKenzie",
  certNumber: "SC-2147",
  faultCount: 1,
}

/* ------------------------------------------------------------------ *
 * Recalls
 * ------------------------------------------------------------------ */

export const RECALL_FORD: RecallRow = {
  id: "recall-ford",
  manufacturer: "Ford",
  campaignCode: "REC-24-085",
  title: "Ranger Raptor — turbo coolant return line chafe",
  description:
    "Affected vehicles may experience turbo coolant return line chafing against the engine harness, risking coolant loss. Replace clip kit and route harness per service bulletin SB-24-085.",
  severity: "high",
  status: "reaching-out",
  affectedCount: 142,
  reachedCount: 64,
  affectedYearRange: "2022–2024",
  affectedModel: "Ranger Raptor",
  noticeIssuedAt: "12 May 2026",
}

export const RECALL_HSV: RecallRow = {
  id: "recall-hsv",
  manufacturer: "HSV",
  campaignCode: "REC-26-002",
  title: "Clubsport R8 — fuel pump driver software",
  description:
    "Fuel pump driver software may misreport rail pressure under sustained high-load operation, causing stall on overrun. Reflash ECM with PCM update 26.7.",
  severity: "moderate",
  status: "open",
  affectedCount: 38,
  reachedCount: 4,
  affectedYearRange: "2018–2020",
  affectedModel: "Clubsport R8 LSA",
  noticeIssuedAt: "22 May 2026",
}

export const RECALL_TOYOTA: RecallRow = {
  id: "recall-toyota",
  manufacturer: "Toyota",
  campaignCode: "REC-25-1108",
  title: "Hilux N80 — DPF temperature sensor harness",
  description:
    "DPF temperature sensor harness may overheat near the catalyst. Replace harness shroud per TSB 25-1108. Stop-drive only if dash warning persists after restart.",
  severity: "stop-drive",
  status: "scheduled",
  affectedCount: 286,
  reachedCount: 248,
  affectedYearRange: "2017–2020",
  affectedModel: "Hilux N80 diesel",
  noticeIssuedAt: "04 May 2026",
}

/* ------------------------------------------------------------------ *
 * Loyalty
 * ------------------------------------------------------------------ */

export const LOYALTY_MICK: LoyaltyCard = {
  id: "loy-mick",
  customerLabel: "Mick Davis",
  currentStamps: 7,
  totalStamps: 8,
  reward: "Free DPF clean + filter swap",
  rewardReady: false,
  joinedAt: "Mar 2018",
  lastVisit: "Tue 26 May",
}

export const LOYALTY_KAREN: LoyaltyCard = {
  id: "loy-karen",
  customerLabel: "Karen Wallis",
  currentStamps: 8,
  totalStamps: 8,
  reward: "Custom dyno tune session — 2hr",
  rewardReady: true,
  joinedAt: "Aug 2014",
  lastVisit: "Wed 27 May",
}

export const LOYALTY_BEC: LoyaltyCard = {
  id: "loy-bec",
  customerLabel: "Bec Singh",
  currentStamps: 2,
  totalStamps: 8,
  reward: "Free wheel alignment + balance",
  rewardReady: false,
  joinedAt: "Jan 2026",
  lastVisit: "Tue 26 May",
}

/* ------------------------------------------------------------------ *
 * Vehicle health
 * ------------------------------------------------------------------ */

export const HEALTH_HILUX: VehicleHealth = {
  vehicleId: "v-hilux-mick",
  vehicleLabel: "2019 Hilux N80 SR5",
  rego: "BX1-8RT",
  ownerLabel: "Mick Davis · Albion Park Rail",
  lastServiceAt: "12 Feb 2026",
  lastServiceMileageKm: 79480,
  nextServiceDueAt: "11 Aug 2026",
  daysUntilNextService: 74,
  oilDial: { score: 62, label: "Oil life" },
  brakeDial: { score: 48, label: "Brake pads" },
  tyreDial: { score: 78, label: "Tyre tread" },
}

export const HEALTH_FALCON_GT: VehicleHealth = {
  vehicleId: "v-falcon-gt",
  vehicleLabel: "1976 Falcon GT XB",
  rego: "GT-460",
  ownerLabel: "Karen Wallis · Kembla Grange",
  lastServiceAt: "20 Apr 2026",
  lastServiceMileageKm: 197820,
  nextServiceDueAt: "20 Oct 2026",
  daysUntilNextService: 144,
  oilDial: { score: 88, label: "Oil life" },
  brakeDial: { score: 72, label: "Brake pads" },
  tyreDial: { score: 92, label: "Tyre tread" },
}

export const HEALTH_RAPTOR: VehicleHealth = {
  vehicleId: "v-raptor-bec",
  vehicleLabel: "2024 Ranger Raptor",
  rego: "RAP-22Z",
  ownerLabel: "Bec Singh · Oak Flats",
  lastServiceAt: "01 Mar 2026",
  lastServiceMileageKm: 12640,
  nextServiceDueAt: "21 May 2026",
  daysUntilNextService: -8,
  oilDial: { score: 18, label: "Oil life" },
  brakeDial: { score: 86, label: "Brake pads" },
  tyreDial: { score: 94, label: "Tyre tread" },
}
