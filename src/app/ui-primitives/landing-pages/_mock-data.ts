/**
 * Realistic mock data for the landing-pages sub-routes.
 *
 * Tone: "Wollongong's most-trusted exhaust workshop since 1972".
 * Suburbs + customer names line up with the Illawarra catchment so the
 * primitives read as a believable workshop landing surface.
 */
import type {
  LandingCaseStudy,
  LandingComparisonAxis,
  LandingComparisonRow,
  LandingEvent,
  LandingFaqEntry,
  LandingFeatureItem,
  LandingMetric,
  LandingPartner,
  LandingPricingTier,
  LandingSocialProofLogo,
  LandingTestimonial,
} from "../components/landing-pages/landing-pages-types"

export const MUFFLERMEN_TAGLINE =
  "Wollongong's most-trusted exhaust workshop since 1972."

export const SOCIAL_PROOF_LOGOS: ReadonlyArray<LandingSocialProofLogo> = [
  { id: "manta", label: "Manta Performance", caption: "Partner since 2014" },
  { id: "pacemaker", label: "Pacemaker Headers", caption: "Authorised fitter" },
  { id: "xforce", label: "X-Force Systems", caption: "South Coast distributor" },
  { id: "genie", label: "Genie Engineering", caption: "Custom tube supply" },
  { id: "redback", label: "Redback Extreme Duty", caption: "Diesel specialist" },
  { id: "magnaflow", label: "MagnaFlow", caption: "Stainless catbacks" },
] as const

export const FEATURE_ITEMS: ReadonlyArray<LandingFeatureItem> = [
  {
    id: "stainless",
    iconId: "wrench",
    title: "Hand-fitted stainless",
    body: "Every catback TIG-welded on the bay in 304-grade stainless. No bolt-on kits.",
  },
  {
    id: "adr",
    iconId: "shield",
    title: "ADR-compliant systems",
    body: "Each install signed off against ADR 83. Paperwork emailed before you drive away.",
  },
  {
    id: "tune",
    iconId: "gauge",
    title: "Dyno-tuned for South Coast roads",
    body: "Tuesday dyno bookings included on Trade Pack and Fleet Plus. Real flow numbers, not guesses.",
  },
  {
    id: "warranty",
    iconId: "flame",
    title: "Five-year weld warranty",
    body: "If a Mufflermen weld cracks within 5 years, we re-weld it free. Even after 200,000 km.",
  },
  {
    id: "fleet",
    iconId: "truck",
    title: "Fleet pickup + drop-off",
    body: "Trade rigs and council fleets serviced overnight. Keys lock-boxed, work logged to your portal.",
  },
  {
    id: "audit",
    iconId: "calendar",
    title: "Quarterly compliance audits",
    body: "Fleet Plus members get a quarterly NSW noise + emissions audit across every vehicle on the roll.",
  },
] as const

export const TESTIMONIALS: ReadonlyArray<LandingTestimonial> = [
  {
    id: "mick",
    quote:
      "Booked the Hilux in on a Thursday, drove out Friday morning with a Manta catback and a torque sheet. Mick's first port of call any time the rig needs welding now.",
    name: "Mick Brennan",
    role: "Albion Park · 2018 Hilux SR5 4WD",
    rating: 5,
    caseStudyHref: "#case-study-mick",
  },
  {
    id: "karen",
    quote:
      "I'm not a car person but Karen at the front desk walked me through the X-Force option and the warranty. Ranger sounds the way I always wanted it to.",
    name: "Karen Withers",
    role: "Kembla Grange · 2021 Ford Ranger Wildtrak",
    rating: 5,
    caseStudyHref: "#case-study-karen",
  },
  {
    id: "bec",
    quote:
      "Got the AU Falcon a 2.5\" stainless system. Welds are tidy, the resonator killed the drone on the highway, and the quote held to the dollar.",
    name: "Bec Tannous",
    role: "Oak Flats · 2002 Ford Falcon AU",
    rating: 5,
  },
  {
    id: "trev",
    quote:
      "Council put the whole fleet onto Mufflermen for compliance audits. Quarterly sign-off lands the same week — saved us a week of paperwork.",
    name: "Trev Castellano",
    role: "Shellharbour City Council · 24 trucks",
    rating: 5,
  },
] as const

export const PRICING_TIERS: ReadonlyArray<LandingPricingTier> = [
  {
    id: "workshop-pass",
    name: "Workshop Pass",
    tagline: "DIY-ers who lift their own diff",
    monthlyPrice: 49,
    setupNote: "Includes 4 bay visits per year",
    features: [
      { label: "Bay access on rostered Saturdays", included: true },
      { label: "Hoist + welder use (supervised)", included: true },
      { label: "Member-only Manta catalogue pricing", included: true },
      { label: "Dyno Tuesday slots", included: false },
      { label: "ADR sign-off included", included: false },
      { label: "Fleet portal access", included: false },
    ],
    cta: { label: "Start Workshop Pass", href: "#workshop-pass", variant: "secondary" },
    accent: "amber",
  },
  {
    id: "trade-pack",
    name: "Trade Pack",
    tagline: "Tradies with 3 work utes",
    monthlyPrice: 179,
    setupNote: "Covers 3 vehicles on the roll",
    features: [
      { label: "Priority bay booking inside 48 hours", included: true },
      { label: "Quarterly weld + flange inspection", included: true },
      { label: "Loan ute for jobs over 6 hours", included: true },
      { label: "Dyno Tuesday slots — 2 per quarter", included: true },
      { label: "ADR sign-off included", included: true },
      { label: "Fleet portal access", included: false },
    ],
    cta: { label: "Talk to the workshop", href: "#trade-pack", variant: "primary" },
    recommended: true,
    accent: "red",
  },
  {
    id: "fleet-plus",
    name: "Fleet Plus",
    tagline: "Councils + 10+ vehicle fleets",
    monthlyPrice: 589,
    setupNote: "From 10 vehicles · unlimited bay visits",
    features: [
      { label: "Same-day pickup + drop-off", included: true },
      { label: "Quarterly NSW noise + emissions audit", included: true },
      { label: "Dedicated foreman on every job", included: true },
      { label: "Unlimited Dyno Tuesday bookings", included: true },
      { label: "ADR sign-off + records in your portal", included: true },
      { label: "Fleet portal access", included: true },
    ],
    cta: { label: "Request fleet quote", href: "#fleet-plus", variant: "secondary" },
    accent: "teal",
  },
] as const

export const COMPARISON_AXES: ReadonlyArray<LandingComparisonAxis> = [
  { id: "mufflermen", label: "Oak Flats Mufflermen" },
  { id: "chain", label: "National chain franchise" },
  { id: "mobile", label: "Mobile-only fitter" },
] as const

export const COMPARISON_ROWS: ReadonlyArray<LandingComparisonRow> = [
  {
    id: "tig-welds",
    label: "TIG-welded stainless catbacks",
    values: [
      { state: "yes" },
      { state: "partial", detail: "Bolt-on kits only" },
      { state: "yes", detail: "If they carry a welder" },
    ],
  },
  {
    id: "adr",
    label: "ADR-compliant sign-off",
    values: [
      { state: "yes" },
      { state: "partial", detail: "Some states" },
      { state: "no" },
    ],
  },
  {
    id: "warranty",
    label: "5-year weld warranty",
    values: [
      { state: "yes" },
      { state: "partial", detail: "12 months" },
      { state: "no" },
    ],
  },
  {
    id: "fleet-portal",
    label: "Fleet portal + audit logging",
    values: [
      { state: "yes" },
      { state: "no" },
      { state: "no" },
    ],
  },
  {
    id: "dyno",
    label: "Dyno Tuesday on-site",
    values: [
      { state: "yes" },
      { state: "no" },
      { state: "no" },
    ],
  },
  {
    id: "pickup",
    label: "Fleet pickup + return",
    values: [
      { state: "yes" },
      { state: "no" },
      { state: "yes" },
    ],
  },
] as const

export const FAQ_ENTRIES: ReadonlyArray<LandingFaqEntry> = [
  {
    id: "how-long",
    question: "How long does a typical catback install take?",
    answer:
      "Most direct-fit catbacks take 3-4 hours on the bay. Full custom stainless systems with TIG welds usually run 6-8 hours — we'll quote the exact time before you book.",
    tags: ["install", "time"],
  },
  {
    id: "warranty",
    question: "What does the 5-year weld warranty actually cover?",
    answer:
      "Every TIG weld done by a Mufflermen technician. If a weld cracks within 5 years, we re-weld it free of charge — even if you've changed cars, sold the system on, or driven 200,000 km.",
    tags: ["warranty"],
  },
  {
    id: "loud",
    question: "Will my car be too loud after a Manta install?",
    answer:
      "Not unless you ask us to make it that way. Every Manta system we fit is signed off against ADR 83. We do a stationary noise reading before you collect the car.",
    tags: ["noise", "compliance"],
  },
  {
    id: "fleet",
    question: "Can you handle a council fleet?",
    answer:
      "Yes. Shellharbour City Council, NSW Maritime, and three civil contractors run their fleets through us. Quarterly audits, locked-key drop-offs, portal logging.",
    tags: ["fleet", "council"],
  },
  {
    id: "parts",
    question: "Do you fit parts I've bought elsewhere?",
    answer:
      "We will, but the weld warranty only applies to parts pulled from the Mufflermen cage upstairs. Bring your own and we'll quote install only.",
    tags: ["parts"],
  },
  {
    id: "drone",
    question: "I've got highway drone — can you fix it without a full system?",
    answer:
      "Almost always. We add a Helmholtz resonator or re-pack the muffler core to kill drone in the 1,800-2,200 rpm range. Quoted as a sub-2-hour job.",
    tags: ["noise"],
  },
] as const

export const METRICS: ReadonlyArray<LandingMetric> = [
  {
    id: "years",
    value: 53,
    suffix: "+",
    label: "Years welding under Illawarra utes",
    caption: "Since 1972 · still one tin roof",
  },
  {
    id: "vehicles",
    value: 8240,
    label: "Vehicles serviced",
    caption: "Logged across the workshop ledger",
  },
  {
    id: "reviews",
    value: 612,
    label: "Five-star reviews",
    caption: "Google + Facebook · April 2026",
  },
  {
    id: "fleet",
    value: 124,
    label: "Fleet vehicles on rolling audit",
    caption: "Across councils, civil + trade fleets",
  },
] as const

export const CASE_STUDIES: ReadonlyArray<LandingCaseStudy> = [
  {
    id: "shellharbour-council",
    client: "Shellharbour City Council",
    vehicle: "24-vehicle civil fleet",
    problem:
      "Fleet failing roadside noise audits twice a quarter. Each fail blocked a tip-truck from a job site for 48 hours.",
    solution:
      "Mufflermen scoped, replaced, and recertified every exhaust on the roll. Quarterly audit baked into the Fleet Plus contract.",
    results: [
      { label: "Roadside fails (year on year)", value: "−92%" },
      { label: "Tip-truck downtime hours saved", value: "1,820" },
      { label: "Annual compliance cost reduction", value: "$54k" },
    ],
    pdfHref: "#case-study-shellharbour.pdf",
  },
  {
    id: "kembla-grange-rideshare",
    client: "Kembla Grange Rideshare Co-op",
    vehicle: "11 hybrid hatchbacks",
    problem:
      "Catalytic converter theft from the depot took 6 cars off the road in a single week.",
    solution:
      "Welded protective cages around every cat, fitted serial-stamped Pacemaker headers, and registered each VIN with NSW Police.",
    results: [
      { label: "Cat thefts (since install)", value: "0" },
      { label: "Average install per vehicle", value: "4.5 hrs" },
      { label: "Insurance excess reduced", value: "−$1,200" },
    ],
    pdfHref: "#case-study-kembla.pdf",
  },
] as const

export const EVENTS: ReadonlyArray<LandingEvent> = [
  {
    id: "dyno-tuesday",
    title: "Dyno Tuesday — weekly",
    date: "Every Tuesday · 9am-5pm",
    isoDate: "2026-06-02T09:00:00+10:00",
    location: "Workshop bay 3 · Oak Flats",
    summary:
      "Bring the ute in for a 30-minute dyno pull. Power, torque, and air-fuel chart emailed before you collect.",
    rsvpHref: "#dyno-tuesday",
    capacity: { taken: 6, total: 12 },
    tone: "amber",
  },
  {
    id: "manta-launch",
    title: "Manta 2026 Launch Day",
    date: "Saturday 14 Aug 2026 · 10am-3pm",
    isoDate: "2026-08-14T10:00:00+10:00",
    location: "Showroom + bay 1",
    summary:
      "Manta unveils the 2026 Hilux / Ranger / Triton lineup. Test fits, factory tech on site, member-only pricing.",
    rsvpHref: "#manta-launch",
    capacity: { taken: 42, total: 80 },
    tone: "red",
  },
  {
    id: "falcon-nationals",
    title: "Falcon Nationals — South Coast",
    date: "Fri 8 – Sun 10 Nov 2026",
    isoDate: "2026-11-08T08:00:00+11:00",
    location: "Oak Flats showroom + bay tour",
    summary:
      "Three-day Falcon meet. Sound-off booth on Friday, dyno shoot-out Saturday, cruise Sunday morning.",
    rsvpHref: "#falcon-nationals",
    capacity: { taken: 88, total: 140 },
    tone: "teal",
  },
] as const

export const PARTNERS: ReadonlyArray<LandingPartner> = [
  {
    id: "manta",
    name: "Manta Performance",
    href: "#partner-manta",
    category: "Catbacks · Headers",
    caption: "Partner since 2014",
  },
  {
    id: "pacemaker",
    name: "Pacemaker Headers",
    href: "#partner-pacemaker",
    category: "Headers",
    caption: "Authorised fitter",
  },
  {
    id: "xforce",
    name: "X-Force Systems",
    href: "#partner-xforce",
    category: "Stainless · Twin systems",
    caption: "South Coast distributor",
  },
  {
    id: "genie",
    name: "Genie Engineering",
    href: "#partner-genie",
    category: "Mandrel-bent tube",
    caption: "Trade supply",
  },
  {
    id: "redback",
    name: "Redback Extreme Duty",
    href: "#partner-redback",
    category: "Diesel · DPF-back",
    caption: "Diesel specialist",
  },
  {
    id: "magnaflow",
    name: "MagnaFlow",
    href: "#partner-magnaflow",
    category: "Catbacks · Mufflers",
    caption: "Stainless line",
  },
  {
    id: "kuga",
    name: "Kuga Welding",
    href: "#partner-kuga",
    category: "Consumables",
    caption: "Wire + filler rod",
  },
  {
    id: "milwaukee",
    name: "Milwaukee Trade",
    href: "#partner-milwaukee",
    category: "Tools",
    caption: "Workshop hand tools",
  },
] as const
