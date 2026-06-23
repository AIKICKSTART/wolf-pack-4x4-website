import type { ChipTone } from "../primitives/chip"

export interface PendingQuote {
  id: string
  /** Reference number, e.g. "QTE-2026-0418". */
  reference: string
  customerName: string
  customerSuburb: string
  vehicleYear: number
  vehicleMake: string
  vehicleModel: string
  vehicleRego: string
  vehicleEngine: string
  /** Service chips with optional tone overrides. */
  services: ReadonlyArray<{ label: string; tone?: ChipTone }>
  /** Quoted total, AUD inc GST. */
  totalAud: number
}

export const QUOTE_CARD_STACK_QUOTES: ReadonlyArray<PendingQuote> = [
  {
    id: "q-1",
    reference: "QTE-2026-0418",
    customerName: "Bryce Cattermole",
    customerSuburb: "Albion Park Rail",
    vehicleYear: 2024,
    vehicleMake: "Toyota",
    vehicleModel: "Hilux N80",
    vehicleRego: "ECC-714",
    vehicleEngine: "2.8L turbodiesel",
    services: [
      { label: "3in DPF-back", tone: "red" },
      { label: "Twin tips", tone: "amber" },
      { label: "ADR 80/13", tone: "amber" },
      { label: "Lambda re-tune", tone: "teal" },
    ],
    totalAud: 2950,
  },
  {
    id: "q-2",
    reference: "QTE-2026-0419",
    customerName: "Lacey O'Connell",
    customerSuburb: "Shellharbour",
    vehicleYear: 2023,
    vehicleMake: "Nissan",
    vehicleModel: "Patrol Y62",
    vehicleRego: "BRR-902",
    vehicleEngine: "5.6L V8",
    services: [
      { label: "Twin 3in cat-back", tone: "red" },
      { label: "Cabin sound damping", tone: "teal" },
    ],
    totalAud: 4180,
  },
  {
    id: "q-3",
    reference: "QTE-2026-0420",
    customerName: "Jeff Crowther",
    customerSuburb: "Warilla",
    vehicleYear: 2019,
    vehicleMake: "Mazda",
    vehicleModel: "MX-5 NB",
    vehicleRego: "MX-NB",
    vehicleEngine: "1.8L 4-cyl",
    services: [
      { label: "2.25in single-out", tone: "red" },
      { label: "Track-day tip", tone: "amber" },
    ],
    totalAud: 1295,
  },
  {
    id: "q-4",
    reference: "QTE-2026-0421",
    customerName: "Tahira Mansell",
    customerSuburb: "Oak Flats",
    vehicleYear: 2022,
    vehicleMake: "Ford",
    vehicleModel: "Ranger PX3",
    vehicleRego: "BUG-440",
    vehicleEngine: "3.2L 5-cyl diesel",
    services: [
      { label: "DPF-back mid", tone: "red" },
      { label: "EGT sender", tone: "amber" },
    ],
    totalAud: 1875,
  },
]

export function formatQuoteTotalAud(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

export function getQuoteTone(quote: PendingQuote): ChipTone {
  return quote.services[0]?.tone ?? "neutral"
}

export function getQuoteVehicleLabel(quote: PendingQuote): string {
  return `${quote.vehicleYear} ${quote.vehicleMake} ${quote.vehicleModel}`
}
