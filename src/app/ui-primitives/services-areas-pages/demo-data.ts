/**
 * Demo data for the services + area-hub primitive showcase routes.
 * Each constant is intentionally realistic for the Mufflermen workshop —
 * the same vehicle archetypes and Illawarra suburb mix the live site
 * actually serves.
 */

import type {
  AreaServiceEntry,
  AreaStat,
  AreaSuburb,
  ServiceDescriptor,
  ServiceFaq,
  ServiceProcessStep,
  ServiceTestimonial,
  ServicesCrumb,
} from "../components/services-areas-pages"
import type { AreaCoverageMapMiniWorkshop } from "../components/services-areas-pages/area-coverage-map-mini"

export const DEMO_SERVICES: ReadonlyArray<ServiceDescriptor> = [
  {
    id: "custom-exhaust",
    category: "custom-exhaust",
    name: "Custom exhaust",
    shortDescription:
      "Mandrel-bent stainless cat-back built to the vehicle, sound target, and clearance.",
    leadTime: "two-weeks",
    averagePriceAud: 1450,
    accent: "red",
  },
  {
    id: "muffler-repair",
    category: "muffler-repair",
    name: "Muffler repair",
    shortDescription:
      "Repair-first muffler, hanger, and pipework fixes for daily-driver utes and family cars.",
    leadTime: "same-day",
    averagePriceAud: 220,
    accent: "amber",
  },
  {
    id: "extractors",
    category: "extractors-headers",
    name: "Extractors",
    shortDescription:
      "Tuned-length extractors, fitment-matched pipework, gasket and hanger refresh.",
    leadTime: "this-week",
    averagePriceAud: 980,
    accent: "teal",
  },
  {
    id: "performance-chips",
    category: "performance-chips",
    name: "Performance chips",
    shortDescription:
      "ECU remap and chip programming alongside exhaust and intake upgrades.",
    leadTime: "next-day",
    averagePriceAud: 690,
    accent: "red",
  },
  {
    id: "cold-air",
    category: "cold-air-induction",
    name: "Cold air induction",
    shortDescription:
      "Cold air intake selection, snorkel fit, and tune-back for ute, 4WD, and performance builds.",
    leadTime: "next-day",
    averagePriceAud: 540,
    accent: "teal",
  },
  {
    id: "tig-fabrication",
    category: "tig-fabrication",
    name: "TIG fabrication",
    shortDescription:
      "Workshop TIG welding for stainless exhaust, fab repairs, and one-off fitment.",
    leadTime: "this-week",
    averagePriceAud: 320,
    accent: "amber",
  },
  {
    id: "audit-inspection",
    category: "audit-inspection",
    name: "Audit & inspection",
    shortDescription:
      "Pink-slip-friendly exhaust inspection, noise check, and ADR compliance report.",
    leadTime: "same-day",
    averagePriceAud: 110,
    accent: "green",
  },
]

export const DEMO_PROCESS_STEPS: ReadonlyArray<ServiceProcessStep> = [
  {
    id: "drop-off",
    number: 1,
    title: "Vehicle drop-off",
    body: "Drop the vehicle at Albion Park Rail with the booking reference and rego ready.",
    iconKey: "drop-off",
  },
  {
    id: "fitment",
    number: 2,
    title: "Fitment check",
    body: "The team checks fitment, clearance, and the existing exhaust before any parts are cut.",
    iconKey: "fitment",
  },
  {
    id: "build",
    number: 3,
    title: "Build",
    body: "Pipework is bent, welded, and finished in stainless or mild steel as specified.",
    iconKey: "build",
  },
  {
    id: "test",
    number: 4,
    title: "Test",
    body: "Sound check, leak test, and a short road test confirm the system performs as planned.",
    iconKey: "test",
  },
  {
    id: "handover",
    number: 5,
    title: "Handover",
    body: "Vehicle handed back with a written summary of work and care instructions.",
    iconKey: "handover",
  },
]

export const DEMO_FAQS: ReadonlyArray<ServiceFaq> = [
  {
    id: "lead-time",
    question: "How long does a custom exhaust build take?",
    answer:
      "Most stainless cat-backs are built and fitted across one workshop day. Complex turbo-back or one-off fab jobs typically run 2–3 days depending on parts and tuning support.",
  },
  {
    id: "warranty",
    question: "Is the exhaust work warranted?",
    answer:
      "Yes. Pipework, welds, and hangers carry a 12-month workmanship warranty. Brand-name mufflers and extractors carry the manufacturer warranty.",
  },
  {
    id: "rwc",
    question: "Will the new exhaust pass a pink slip?",
    answer:
      "Builds are kept ADR-compliant for daily-driven cars. The team will flag anything that crosses into off-road-only territory before fabrication starts.",
  },
  {
    id: "finance",
    question: "Can I finance the job?",
    answer:
      "Yes — Humm finance is available for jobs over $500 with same-day approval. A standard $80 booking deposit secures the workshop slot.",
  },
]

export const DEMO_TESTIMONIALS: ReadonlyArray<ServiceTestimonial> = [
  {
    id: "t1",
    customerName: "Lachlan W.",
    vehicle: "2019 Holden Colorado",
    rating: 5,
    quote:
      "Lifted the colorado last year and the muffler-men sorted a custom rear section that clears the towbar mount perfectly. Sound is exactly what I wanted.",
  },
  {
    id: "t2",
    customerName: "Mia T.",
    vehicle: "2014 Subaru WRX",
    rating: 5,
    quote:
      "Stainless cat-back done in a day. They actually listened when I said I wanted a deeper note for the daily, not a fart can.",
  },
  {
    id: "t3",
    customerName: "Greg P.",
    vehicle: "2008 HiLux work ute",
    rating: 4,
    quote:
      "Repaired the muffler instead of replacing the whole system. Saved me $400 and the ute is back on the road same day.",
  },
]

export const DEMO_SUBURB_CHIPS: ReadonlyArray<string> = [
  "Oak Flats",
  "Albion Park",
  "Shellharbour",
  "Warilla",
  "Dapto",
  "Kiama",
  "Wollongong",
  "Helensburgh",
  "Berry",
  "Nowra",
]

export const DEMO_AREA_SUBURBS: ReadonlyArray<AreaSuburb> = [
  { id: "oak-flats", name: "Oak Flats", postcode: "2529", driveTimeMinutes: 4, servicesCount: 7 },
  { id: "albion-park", name: "Albion Park", postcode: "2527", driveTimeMinutes: 7, servicesCount: 7 },
  { id: "shellharbour", name: "Shellharbour", postcode: "2529", driveTimeMinutes: 9, servicesCount: 7 },
  { id: "warilla", name: "Warilla", postcode: "2528", driveTimeMinutes: 11, servicesCount: 6 },
  { id: "dapto", name: "Dapto", postcode: "2530", driveTimeMinutes: 14, servicesCount: 6 },
  { id: "wollongong", name: "Wollongong", postcode: "2500", driveTimeMinutes: 22, servicesCount: 6 },
  { id: "kiama", name: "Kiama", postcode: "2533", driveTimeMinutes: 18, servicesCount: 5 },
  { id: "berry", name: "Berry", postcode: "2535", driveTimeMinutes: 36, servicesCount: 4 },
]

export const DEMO_AREA_STATS: ReadonlyArray<AreaStat> = [
  { id: "workshops", label: "Workshops", value: "1", helper: "Albion Park Rail head shop" },
  { id: "suburbs", label: "Suburbs covered", value: "82", helper: "Illawarra + Shoalhaven mix" },
  { id: "response", label: "Avg response", value: "12 min", helper: "Phone callback target" },
]

export const DEMO_AREA_SERVICES: ReadonlyArray<AreaServiceEntry> = [
  {
    id: "as-custom-exhaust",
    category: "custom-exhaust",
    localisedName: "Custom exhaust — Illawarra",
    description: "Stainless cat-back builds with Illawarra-driver clearance and tone targets.",
    bookHref: "/ui-primitives/services-areas-pages/service-detail-hero",
  },
  {
    id: "as-muffler-repair",
    category: "muffler-repair",
    localisedName: "Muffler repair — Illawarra",
    description: "Repair-first muffler work for Lake Illawarra commuters, often same-day.",
    bookHref: "/ui-primitives/services-areas-pages/service-detail-hero",
  },
  {
    id: "as-extractors",
    category: "extractors-headers",
    localisedName: "Extractors — Illawarra",
    description: "Extractor supply and fitment matched to the Illawarra ute and 4WD mix.",
    bookHref: "/ui-primitives/services-areas-pages/service-detail-hero",
  },
  {
    id: "as-tig",
    category: "tig-fabrication",
    localisedName: "TIG fabrication — Illawarra",
    description: "Workshop TIG welding for one-off Illawarra fab jobs and trailer repairs.",
    bookHref: "/ui-primitives/services-areas-pages/service-detail-hero",
  },
  {
    id: "as-audit",
    category: "audit-inspection",
    localisedName: "Audit & inspection — Illawarra",
    description: "Pink-slip exhaust inspections for Illawarra rego renewals.",
    bookHref: "/ui-primitives/services-areas-pages/service-detail-hero",
  },
  {
    id: "as-perf-chip",
    category: "performance-chips",
    localisedName: "Performance chips — Illawarra",
    description: "ECU remap support to match Illawarra commute/tow workloads.",
    bookHref: "/ui-primitives/services-areas-pages/service-detail-hero",
  },
]

export const DEMO_WORKSHOPS_PINS: ReadonlyArray<AreaCoverageMapMiniWorkshop> = [
  { id: "ofm", label: "Albion Park Rail workshop", x: 48, y: 56, index: 1, active: true },
  { id: "wgg-partner", label: "Wollongong partner", x: 38, y: 32, index: 2 },
  { id: "kiama-mobile", label: "Kiama mobile run", x: 64, y: 70, index: 3 },
]

export const DEMO_SERVICE_CRUMBS: ReadonlyArray<ServicesCrumb> = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Custom exhaust" },
]

export const DEMO_AREA_CRUMBS: ReadonlyArray<ServicesCrumb> = [
  { label: "Home", href: "/" },
  { label: "Regional hubs", href: "/areas" },
  { label: "Illawarra" },
]
