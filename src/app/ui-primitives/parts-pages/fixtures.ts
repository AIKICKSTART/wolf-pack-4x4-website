import type {
  FitmentNote,
  PartCardSummary,
  PartCategoryRef,
  PartGalleryImage,
  PartSpecGroup,
  PartSupplierBadge,
  PartsFaqItem,
} from "../components/parts-pages"
import type { PartsSearchRailSupplierChip } from "../components/parts-pages/parts-search-rail"

export const CATEGORIES: ReadonlyArray<PartCategoryRef & { active?: boolean; count?: number }> = [
  { slug: "complete-systems", title: "Complete systems", tone: "red", group: "Performance", count: 184, active: true },
  { slug: "mufflers", title: "Mufflers", tone: "amber", group: "Sound", count: 412 },
  { slug: "pipes", title: "Pipes", tone: "teal", group: "Hardware", count: 318 },
  { slug: "extractors", title: "Extractors", tone: "red", group: "Performance", count: 96 },
  { slug: "filters", title: "Filters", tone: "green", group: "Intake", count: 144 },
  { slug: "fittings", title: "Fittings", tone: "teal", group: "Hardware", count: 1208 },
]

export const SUPPLIER_TAGS: ReadonlyArray<PartsSearchRailSupplierChip> = [
  { id: "manta", label: "Manta", tone: "manta" },
  { id: "redback", label: "Redback", tone: "redback" },
  { id: "xforce", label: "XForce", tone: "xforce" },
  { id: "pacemaker", label: "Pacemaker", tone: "pacemaker" },
  { id: "lukey", label: "Lukey", tone: "lukey" },
]

export const HERO_SUPPLIERS: ReadonlyArray<Pick<PartSupplierBadge, "id" | "name" | "tone">> = [
  { id: "manta", name: "Manta", tone: "manta" },
  { id: "redback", name: "Redback", tone: "redback" },
  { id: "xforce", name: "XForce", tone: "xforce" },
  { id: "pacemaker", name: "Pacemaker", tone: "pacemaker" },
  { id: "lukey", name: "Lukey", tone: "lukey" },
]

export const FITMENT_CHIPS: ReadonlyArray<string> = [
  "Hilux N80",
  "Patrol Y62",
  "Ranger PX3",
  "Triton MR",
  "Commodore VE",
]

export const RESULT_CARDS: ReadonlyArray<PartCardSummary> = [
  {
    id: "of-001",
    sku: "OF-001",
    title: "Manta 3in catback — Hilux N80 turbo diesel",
    supplier: "Manta",
    supplierTone: "manta",
    category: "Complete systems",
    categoryTone: "red",
    imageAlt: "Manta 3 inch catback exhaust system polished tip",
    supplierWatermark: true,
    price: { rrpCents: 184900, currentCents: 169900, installmentHint: "or 4 x $42.49 fortnightly" },
    fitment: ["Hilux N80", "2015-2024"],
    href: "/ui-primitives/parts-pages/part-detail-hero",
  },
  {
    id: "of-002",
    sku: "OF-002",
    title: "Redback twin tip rear muffler — Ranger PX3",
    supplier: "Redback",
    supplierTone: "redback",
    category: "Mufflers",
    categoryTone: "amber",
    imageAlt: "Redback twin chrome tip rear muffler exhaust assembly",
    price: { rrpCents: 89900, currentCents: 79900 },
    fitment: ["Ranger PX3", "2018+"],
    href: "/ui-primitives/parts-pages/part-result-card",
  },
  {
    id: "of-003",
    sku: "OF-003",
    title: "XForce 3.5in stainless pipework — Patrol Y62",
    supplier: "XForce",
    supplierTone: "xforce",
    category: "Pipes",
    categoryTone: "teal",
    imageAlt: "XForce 3.5 inch stainless steel exhaust pipework",
    price: { rrpCents: 124900 },
    fitment: ["Patrol Y62", "2013+"],
    href: "/ui-primitives/parts-pages/part-result-card",
  },
  {
    id: "of-004",
    sku: "OF-004",
    title: "Pacemaker 4-into-1 extractors — Commodore VE",
    supplier: "Pacemaker",
    supplierTone: "pacemaker",
    category: "Extractors",
    categoryTone: "red",
    imageAlt: "Pacemaker tri-Y stainless extractors for V6 Commodore",
    price: { rrpCents: 138900, currentCents: 128900 },
    fitment: ["Commodore VE", "V6 + V8"],
    href: "/ui-primitives/parts-pages/part-result-card",
  },
  {
    id: "of-005",
    sku: "OF-005",
    title: "Lukey 14in resonator — Triton MR",
    supplier: "Lukey",
    supplierTone: "lukey",
    category: "Mufflers",
    categoryTone: "amber",
    imageAlt: "Lukey stainless 14 inch sports resonator straight-through",
    price: { rrpCents: 54900 },
    fitment: ["Triton MR", "2015-2023"],
    href: "/ui-primitives/parts-pages/part-result-card",
  },
  {
    id: "of-006",
    sku: "OF-006",
    title: "Manta high-flow filter — Hilux N80",
    supplier: "Manta",
    supplierTone: "manta",
    category: "Filters",
    categoryTone: "green",
    imageAlt: "Manta dry-flow performance filter for Hilux N80",
    supplierWatermark: true,
    price: { rrpCents: 14900, currentCents: 12900 },
    fitment: ["Hilux N80"],
    href: "/ui-primitives/parts-pages/part-result-card",
  },
]

export const GALLERY_IMAGES: ReadonlyArray<PartGalleryImage> = [
  { id: "view-1", alt: "Manta catback front three quarter", caption: "Front three-quarter view" },
  { id: "view-2", alt: "Manta catback tip detail", caption: "Polished tip detail" },
  { id: "view-3", alt: "Manta catback hanger detail", caption: "Hanger detail", supplierWatermark: true },
  { id: "view-4", alt: "Manta catback flange detail", caption: "Flange detail" },
]

export const SPEC_GROUPS: ReadonlyArray<PartSpecGroup> = [
  {
    id: "dimensions",
    title: "Dimensions",
    rows: [
      { label: "Pipe diameter", value: "3.0 in (76 mm)" },
      { label: "Overall length", value: "2,180 mm" },
      { label: "Tip diameter", value: "4.0 in polished" },
    ],
  },
  {
    id: "materials",
    title: "Materials",
    rows: [
      { label: "Body", value: "T-409 stainless steel" },
      { label: "Tips", value: "T-304 polished stainless" },
      { label: "Welds", value: "TIG-fused" },
    ],
  },
  {
    id: "sound",
    title: "Sound profile",
    rows: [
      { label: "Idle (dB)", value: "82 dB(A) @ 750 rpm" },
      { label: "Cruise (dB)", value: "88 dB(A) @ 100 km/h" },
      { label: "Wide-open (dB)", value: "98 dB(A) @ 4,500 rpm" },
    ],
  },
  {
    id: "compliance",
    title: "Compliance",
    rows: [
      { label: "ADR", value: "Compliant ADR 83/00, 28/02" },
      { label: "Warranty", value: "Lifetime crack guarantee" },
      { label: "Country", value: "Designed + assembled in Australia" },
    ],
  },
  {
    id: "fitment",
    title: "Fitment",
    rows: [
      { label: "Bolt-on", value: "Yes — direct fit" },
      { label: "Hardware", value: "Includes clamps + gaskets" },
      { label: "Install time", value: "~2.5 hr workshop" },
    ],
  },
]

export const FITMENT_TABLE: ReadonlyArray<FitmentNote> = [
  { id: "f1", make: "Toyota", model: "Hilux N80", years: "2015-2024", body: "Dual cab", engine: "2.8L 1GD-FTV", notes: "Direct fit" },
  { id: "f2", make: "Ford", model: "Ranger PX3", years: "2018-2022", body: "Dual cab", engine: "2.0L bi-turbo", notes: "Direct fit" },
  { id: "f3", make: "Nissan", model: "Patrol Y62", years: "2013-2024", body: "Wagon", engine: "5.6L V8 petrol", adapterRequired: true },
  { id: "f4", make: "Mitsubishi", model: "Triton MR", years: "2019-2023", body: "Dual cab", engine: "2.4L 4N15", notes: "Direct fit" },
  { id: "f5", make: "Holden", model: "Commodore VE", years: "2006-2013", body: "Sedan + wagon", engine: "V6 + V8", notes: "Trims to mounts" },
]

export const FAQ_ITEMS: ReadonlyArray<PartsFaqItem> = [
  { id: "fit", question: "Will this fit my vehicle without adapters?", answer: "Confirmed direct fit on Hilux N80, Ranger PX3, Triton MR. Patrol Y62 and some VE wagons need a short adapter pipe — included free with order." },
  { id: "time", question: "How long will installation take?", answer: "Workshop install runs ~2.5 hours for catbacks, ~3.5 hours for full systems with extractors. Same-day book-in is available Tuesday to Friday." },
  { id: "warranty", question: "What warranty is on the welds and parts?", answer: "Lifetime crack guarantee on every TIG joint we lay. Manufacturer warranty on the part itself runs 3 years against defects." },
  { id: "adr", question: "Is the part ADR-compliant?", answer: "Yes — ADR 83/00 and ADR 28/02 compliant. Stamped at our Oak Flats bay with the ADR docket left in the centre console on collection." },
  { id: "sound", question: "How loud will it be after fitting?", answer: "Idle sits at 82 dB(A), cruise at 88 dB(A). Roughly 8-10 dB louder than factory — sharp tone, no drone at 100 km/h." },
  { id: "compliance", question: "Will it pass an RMS defect inspection?", answer: "Yes, when fitted with the supplied resonator and tip orientation. We log the install against your VIN — paperwork lines up if RMS asks." },
  { id: "tuning", question: "Does it need a tune to work properly?", answer: "Catback alone — no. Full system with extractors — yes, a flash tune is recommended to capture the gain and remove any check-engine codes." },
  { id: "delivery", question: "How quickly can you order this in?", answer: "Stocked items leave the workshop the same day. Special-order items typically arrive within 3 to 5 business days." },
]
