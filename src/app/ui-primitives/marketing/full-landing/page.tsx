import type { Metadata } from "next"
import {
  Check,
  ShieldCheck,
  Flame,
  Wrench,
  Gauge,
  Truck,
  Calendar,
  MapPin,
  Headset,
  ClipboardList,
} from "lucide-react"

import {
  CookieBanner,
  FaqAccordion,
  FeatureGrid,
  FeatureSpotlight,
  FloatingChatLauncher,
  FooterMegamap,
  LogoCloud,
  NewsletterCta,
  PricingCtaSection,
  ProcessSteps,
  StatCounterRow,
  StickyCtaBar,
  TestimonialWall,
  TextFirstHero,
} from "../../components/marketing"
import { ButtonDnaLink } from "../../components/button-dna-link"
import type {
  FaqAccordionItem,
  FeatureGridItem,
  FooterMegamapColumn,
  FooterMegamapContactDetail,
  FooterMegamapRegion,
  FooterMegamapSocial,
  LogoCloudEntry,
  ProcessStep,
  StatCounterEntry,
  TestimonialEntry,
} from "../../components/marketing"
import type {
  ComparisonColumn,
  ComparisonRow,
} from "../../components/data-display/comparison-table"

export const metadata: Metadata = {
  title: "Full landing composition | Marketing Blocks",
  description:
    "Bonus composition — every marketing primitive sequenced into a single long-scroll landing surface.",
}

const FEATURES: ReadonlyArray<FeatureGridItem> = [
  {
    id: "adr",
    icon: <ShieldCheck strokeWidth={1.6} aria-hidden="true" />,
    title: "ADR-compliant",
    description: "Every catback we fit is stamped against ADR 83/00 and ADR 28/02 at the front desk.",
  },
  {
    id: "tig",
    icon: <Flame strokeWidth={1.6} aria-hidden="true" />,
    title: "MIG + TIG fusion",
    description: "Stainless TIG joints, MIG mounting welds. Argon-purged. Pressure-tested before sign-off.",
  },
  {
    id: "manta",
    icon: <Wrench strokeWidth={1.6} aria-hidden="true" />,
    title: "Manta partner",
    description: "Authorised Manta installer since 2014. Cat-3 inch, 3.5 inch, twin tip from the cage.",
  },
  {
    id: "dyno",
    icon: <Gauge strokeWidth={1.6} aria-hidden="true" />,
    title: "Dyno-tuned",
    description: "Pre and post-fit dyno runs at Albion Park. Every install ships with a torque sheet.",
  },
  {
    id: "callout",
    icon: <Truck strokeWidth={1.6} aria-hidden="true" />,
    title: "Mobile bay",
    description: "Mufflermen ute attends Wollongong, Kiama, Shoalhaven. Stainless welds done roadside.",
  },
  {
    id: "booking",
    icon: <Calendar strokeWidth={1.6} aria-hidden="true" />,
    title: "Same-week booking",
    description: "Drop your ute Monday, drive it home Wednesday. Caravan rigs slotted 5 days out.",
  },
  {
    id: "location",
    icon: <MapPin strokeWidth={1.6} aria-hidden="true" />,
    title: "Oak Flats workshop",
    description: "Two bays at 47 Central Ave. Lift-equipped pit room one. Hoist + dyno pit room two.",
  },
  {
    id: "support",
    icon: <Headset strokeWidth={1.6} aria-hidden="true" />,
    title: "Lifetime backstop",
    description: "Joints we welded come with a lifetime crack guarantee. Bring the ute back. We fix it.",
  },
]

const TESTIMONIALS: ReadonlyArray<TestimonialEntry> = [
  {
    id: "01",
    quote: "Catback fitted in a morning. Sounds factory at idle, deep on boost. Joints look like jewellery.",
    name: "Dale Munro",
    role: "Albion Park · Ranger XLT",
    tone: "red",
    rating: 5,
    span: "regular",
  },
  {
    id: "02",
    quote: "Took our caravan tow rig in for a noise check. Found the cracked flange, rewelded under TIG, and didn't pad the bill.",
    name: "Sue Hennessey",
    role: "Shellharbour · Iveco Daily caravan",
    tone: "amber",
    rating: 5,
    span: "tall",
  },
  {
    id: "03",
    quote: "Mobile bay came to my Kiama yard. Welded a stainless tip on the spot. Cleaned up better than any shop I've used.",
    name: "Tom Davies",
    role: "Kiama · HiLux SR5",
    tone: "teal",
    rating: 5,
    span: "short",
  },
  {
    id: "04",
    quote: "Manta install on the BT-50. Boys at Oak Flats matched the bracket pattern and threw in the dyno sheet.",
    name: "Aaron Cope",
    role: "Wollongong · BT-50",
    tone: "green",
    rating: 5,
    span: "regular",
  },
  {
    id: "05",
    quote: "Welds have held twelve years. No cracks on the cat, no leaks at the flange. Best stainless on the South Coast.",
    name: "Glenys Watson",
    role: "Oak Flats · HQ Premier",
    tone: "obsidian",
    rating: 5,
    span: "tall",
  },
  {
    id: "06",
    quote: "Quoted Monday. Booked Wednesday. Done by Friday. Honest pricing, no padded labour.",
    name: "Brent Sialana",
    role: "Dapto · Triton GLS",
    tone: "red",
    rating: 5,
    span: "short",
  },
]

const STATS: ReadonlyArray<StatCounterEntry> = [
  { id: "years", value: 58, label: "Years on Central Ave", tone: "red" },
  { id: "rigs", value: 14200, label: "Utes & rigs fitted", tone: "amber", suffix: "+" },
  { id: "suburbs", value: 12, label: "Illawarra suburbs", tone: "teal" },
  { id: "warranty", value: 100, label: "Lifetime weld", tone: "green", suffix: "%" },
]

const STEPS: ReadonlyArray<ProcessStep> = [
  {
    id: "quote",
    icon: <ClipboardList strokeWidth={1.6} aria-hidden="true" />,
    title: "Quote",
    body: "Send ute model, photo, and postcode. We respond in writing inside 24 hours.",
  },
  {
    id: "book",
    icon: <Wrench strokeWidth={1.6} aria-hidden="true" />,
    title: "Book",
    body: "Pick a Stage 1 or Stage 2 slot. Bay locked. Manta parts pulled from the cage.",
  },
  {
    id: "fit",
    icon: <Gauge strokeWidth={1.6} aria-hidden="true" />,
    title: "Fit & dyno",
    body: "TIG welds laid. Pre and post dyno run at Albion Park. Torque sheet signed off.",
  },
  {
    id: "sign",
    icon: <ShieldCheck strokeWidth={1.6} aria-hidden="true" />,
    title: "ADR sign-off",
    body: "ADR 83/00 docket stamped against your VIN. Lifetime crack warranty on every Mufflermen weld.",
  },
  {
    id: "drive",
    icon: <Truck strokeWidth={1.6} aria-hidden="true" />,
    title: "Drive away",
    body: "Pick up your ute Wednesday. Sound check on the kerb. Coffee on the front desk.",
  },
]

const FAQ: ReadonlyArray<FaqAccordionItem> = [
  {
    id: "adr",
    question: "Are your catbacks ADR-compliant?",
    answer: (
      <p>
        Every Mufflermen catback ships with an ADR 83/00 stamp logged against your VIN at the Oak Flats front desk.
      </p>
    ),
  },
  {
    id: "warranty",
    question: "How long is the warranty on a Mufflermen weld?",
    answer: (
      <p>
        Lifetime crack guarantee on every joint we lay. Bring the ute back to Central Ave any year, any kilometre.
      </p>
    ),
  },
  {
    id: "booking",
    question: "How quickly can I book a slot?",
    answer: (
      <p>Drop Monday, drive Wednesday. Caravan rigs book 5 days out. Quotes confirmed in writing first.</p>
    ),
  },
]

const PRICING_COLUMNS: ReadonlyArray<ComparisonColumn> = [
  { id: "essentials", name: "Bay Visit", caption: "Drop-in muffler swap" },
  { id: "stage1", name: "Stage 1 Catback", caption: "Manta 3-inch stainless", popular: true },
  { id: "stage2", name: "Stage 2 Twin Tip", caption: "Catback + dyno tune" },
]

const PRICING_ROWS: ReadonlyArray<ComparisonRow> = [
  { feature: "MIG mounting weld", description: "Bracket and hanger fixings", values: ["check", "check", "check"] },
  { feature: "Argon-purged TIG", description: "304-grade stainless joints", values: ["cross", "check", "check"] },
  { feature: "Manta tip + heat shield", description: "Polished or blued finish", values: ["dot", "check", "check"] },
  { feature: "Pre/post dyno sheet", description: "Albion Park dyno cell", values: ["cross", "dot", "check"] },
  { feature: "ADR 83/00 stamped", description: "Compliance docket included", values: ["check", "check", "check"] },
  { feature: "Workshop hire", description: "Per bay-hour bracket", values: ["1 hr", "3 hr", "5 hr"] },
  { feature: "Lifetime warranty", description: "Covers our welds", values: ["check", "check", "check"] },
]

const FOOTER_COLUMNS: ReadonlyArray<FooterMegamapColumn> = [
  {
    id: "workshop",
    heading: "Workshop",
    links: [
      { label: "Catback installs", href: "#catback" },
      { label: "Manta partner range", href: "#manta" },
      { label: "Dyno cell", href: "#dyno" },
      { label: "Mobile bay", href: "#mobile" },
    ],
  },
  {
    id: "services",
    heading: "Services",
    links: [
      { label: "MIG / TIG welding", href: "#welding" },
      { label: "ADR compliance", href: "#adr" },
      { label: "Tip + heat shield", href: "#tip" },
      { label: "Lifetime warranty", href: "#warranty" },
    ],
  },
  {
    id: "about",
    heading: "Mufflermen",
    links: [
      { label: "Workshop story", href: "#story" },
      { label: "Since 1968", href: "#heritage" },
      { label: "Crew", href: "#crew" },
      { label: "Press kit", href: "#press" },
    ],
  },
  {
    id: "support",
    heading: "Support",
    links: [
      { label: "Book a bay", href: "#book" },
      { label: "Get a quote", href: "#quote" },
      { label: "Returns", href: "#returns" },
      { label: "Contact desk", href: "#contact" },
    ],
  },
]

const FOOTER_CONTACT: ReadonlyArray<FooterMegamapContactDetail> = [
  { label: "Workshop", value: "47 Central Ave, Oak Flats NSW 2529" },
  { label: "Front desk", value: "(02) 4256 7000", href: "tel:+61242567000" },
  { label: "Email", value: "fitters@mufflermen.example", href: "mailto:fitters@mufflermen.example" },
  { label: "Hours", value: "Mon-Fri 7:30am-5:30pm" },
]

const FOOTER_REGIONS: ReadonlyArray<FooterMegamapRegion> = [
  { code: "au-nsw", label: "Australia · NSW" },
  { code: "au-vic", label: "Australia · VIC" },
  { code: "nz", label: "New Zealand" },
]

function GenericGlyph({ children }: { children: string }) {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <text x="12" y="16" textAnchor="middle" fontFamily="Anton, Impact, sans-serif" fontSize="13" fill="currentColor">
        {children}
      </text>
    </svg>
  )
}

const FOOTER_SOCIALS: ReadonlyArray<FooterMegamapSocial> = [
  { id: "fb", label: "Mufflermen on Facebook", href: "#facebook", icon: <GenericGlyph>f</GenericGlyph> },
  { id: "ig", label: "Mufflermen on Instagram", href: "#instagram", icon: <GenericGlyph>i</GenericGlyph> },
  { id: "yt", label: "Mufflermen on YouTube", href: "#youtube", icon: <GenericGlyph>y</GenericGlyph> },
]

// Abstract brand-mark glyphs for the logo cloud — hand-drawn, not real third-party logos.
function MarkChevron() {
  return (
    <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M8 28 L24 12 L40 28 L56 12 L72 28" />
    </svg>
  )
}
function MarkGrid() {
  return (
    <svg viewBox="0 0 80 40" aria-hidden="true">
      <rect x="8" y="10" width="14" height="20" fill="currentColor" />
      <rect x="28" y="10" width="14" height="20" fill="currentColor" opacity="0.6" />
      <rect x="48" y="10" width="14" height="20" fill="currentColor" opacity="0.3" />
    </svg>
  )
}
function MarkRing() {
  return (
    <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
      <circle cx="22" cy="20" r="12" />
      <circle cx="46" cy="20" r="8" />
    </svg>
  )
}
function MarkBolt() {
  return (
    <svg viewBox="0 0 80 40" fill="currentColor" aria-hidden="true">
      <path d="M30 6 L18 22 L30 22 L26 36 L48 18 L36 18 L42 6 Z" />
    </svg>
  )
}
function MarkStripe() {
  return (
    <svg viewBox="0 0 80 40" aria-hidden="true">
      <path d="M8 28 L18 12 H38 L48 28 H28 Z" fill="currentColor" opacity="0.85" />
      <path d="M44 28 L54 12 H72 L62 28 Z" fill="currentColor" opacity="0.55" />
    </svg>
  )
}
function MarkArrow() {
  return (
    <svg viewBox="0 0 80 40" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
      <path d="M10 30 L40 10 L70 30" />
    </svg>
  )
}

const LOGOS: ReadonlyArray<LogoCloudEntry> = [
  { id: "stratos", name: "Stratos", mark: <MarkChevron /> },
  { id: "panelworks", name: "Panelworks", mark: <MarkGrid /> },
  { id: "orbital", name: "Orbital Tow", mark: <MarkRing /> },
  { id: "voltbox", name: "Voltbox", mark: <MarkBolt /> },
  { id: "stripeline", name: "Stripeline", mark: <MarkStripe /> },
  { id: "apex", name: "Apex Freight", mark: <MarkArrow /> },
]

function ExhaustVisual() {
  return (
    <svg
      viewBox="0 0 320 240"
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-label="Stainless steel exhaust diagram"
      style={{ width: "100%", height: "100%", minHeight: 280 }}
    >
      <defs>
        <linearGradient id="full-pipe" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#cfd6df" />
          <stop offset="0.5" stopColor="#6e7682" />
          <stop offset="1" stopColor="#2a2e36" />
        </linearGradient>
      </defs>
      <rect width="320" height="240" fill="#080a10" />
      <rect x="40" y="100" width="140" height="40" rx="6" fill="url(#full-pipe)" />
      <rect x="180" y="92" width="100" height="56" rx="14" fill="url(#full-pipe)" />
      <circle cx="184" cy="120" r="3" fill="#e62028" />
      <text x="160" y="200" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#868b98">
        3 INCH STAINLESS · TIG-WELDED
      </text>
    </svg>
  )
}

function MapVisual() {
  return (
    <svg viewBox="0 0 320 240" role="img" aria-label="Illawarra coverage map" style={{ width: "100%", height: "100%", minHeight: 280 }}>
      <rect width="320" height="240" fill="#080a10" />
      <path d="M40 100 Q120 60 200 80 T280 140 Q200 200 120 180 T40 100" fill="rgba(64,188,255,0.18)" stroke="rgba(64,188,255,0.42)" />
      <circle cx="160" cy="120" r="6" fill="#e62028" />
      <circle cx="160" cy="120" r="18" fill="none" stroke="#e62028" opacity="0.42" />
      <circle cx="120" cy="86" r="4" fill="#ffc14f" />
      <circle cx="208" cy="146" r="4" fill="#40bcff" />
      <circle cx="92" cy="160" r="4" fill="#37d67a" />
      <text x="160" y="220" textAnchor="middle" fontFamily="JetBrains Mono, monospace" fontSize="9" fill="#868b98">
        OAK FLATS · ILLAWARRA · 12 SUBURBS
      </text>
    </svg>
  )
}

function FullBrandMark() {
  return (
    <>
      <strong
        style={{
          display: "block",
          fontFamily: "var(--primitive-font-display)",
          fontSize: "var(--primitive-text-2xl)",
          fontWeight: 400,
          textTransform: "uppercase",
          color: "var(--primitive-text-strong)",
        }}
      >
        Mufflermen
      </strong>
      <small
        style={{
          color: "var(--primitive-muted)",
          fontFamily: "var(--primitive-font-mono)",
          fontSize: "var(--primitive-text-2xs)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        Oak Flats · Est. 1968
      </small>
    </>
  )
}

function QuickChatList() {
  return (
    <ul
      style={{
        display: "grid",
        gap: "var(--primitive-space-2)",
        margin: 0,
        padding: 0,
        listStyle: "none",
      }}
    >
      {[
        "Do you fit Manta on a HiLux SR5?",
        "Mobile bay coverage to Kiama?",
        "How fast is a Stage 1?",
      ].map((question) => (
        <li key={question}>
          <button
            type="button"
            style={{
              display: "block",
              width: "100%",
              padding: "var(--primitive-space-2-5) var(--primitive-space-3)",
              border: "1px solid var(--primitive-line)",
              borderRadius: "var(--primitive-radius-md)",
              background: "var(--primitive-glass-soft)",
              color: "var(--primitive-body)",
              fontFamily: "var(--primitive-font-body)",
              fontSize: "var(--primitive-text-xs)",
              textAlign: "left",
              cursor: "pointer",
            }}
          >
            {question}
          </button>
        </li>
      ))}
    </ul>
  )
}

export default function FullLandingPage() {
  return (
    <main
      style={{
        display: "grid",
        gap: 0,
        paddingTop: 76,
        paddingBottom: "var(--primitive-space-6)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "flex-end", padding: "0 clamp(20px, 4vw, 56px)" }}>
        <ButtonDnaLink />
      </div>

      <StickyCtaBar
        message="End-of-month catback specials — save on Manta installs"
        badge="Limited"
        primaryAction={{ label: "Book a bay", href: "#book" }}
        secondaryAction={{ label: "See pricing", href: "#pricing" }}
      />

      <TextFirstHero
        kicker="Oak Flats / Est. 1968"
        headline={
          <>
            Hand-built exhaust
            <br />
            <span style={{ color: "var(--primitive-red)" }}>since the South Coast</span>
            <br />
            roared.
          </>
        }
        subhead="MIG and TIG welds, ADR-compliant catbacks, and full Manta installs — fitted at the Oak Flats bay that's been welding stainless under Illawarra utes since 1968."
        primaryAction={{ label: "Book a workshop slot", href: "#book", tone: "red" }}
        secondaryAction={{ label: "View Manta catalogue", href: "#manta", tone: "chrome" }}
        trust={[
          { value: "1968", label: "Workshop opened" },
          { value: "12+", label: "Illawarra suburbs" },
          { value: "ADR", label: "Compliant systems" },
          { value: "Manta", label: "Partner since 2014" },
        ]}
        layout="left-aligned"
        routeHeader
      />

      <LogoCloud
        kicker="Trade partners"
        heading="Tow yards, panel shops, and fleet customers."
        entries={LOGOS}
      />

      <FeatureGrid
        kicker="Why Mufflermen"
        heading="What every Oak Flats install includes."
        body="Eight reasons our cars come back. Every one of these is part of the standard sign-off."
        columns={4}
        features={FEATURES}
      />

      <FeatureSpotlight
        kicker="The catback"
        heading="Mandrel-bent in one piece — three inch stainless throughout."
        body="We mandrel bend our catbacks from a single length of 304-grade stainless steel. No crush-bent radii. No off-cuts welded in the middle."
        visual={<ExhaustVisual />}
        bullets={[
          { icon: <Check size={12} strokeWidth={2.6} />, label: "304-grade stainless, 3-inch or 3.5-inch ID" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Mandrel-bent — never crush-bent" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Manta-spec fit for HiLux, Ranger, BT-50" },
        ]}
        action={{ label: "See catback options", href: "#catbacks" }}
      />

      <FeatureSpotlight
        kicker="The coverage"
        heading="Mobile bay on every Illawarra suburb between Wollongong and Gerroa."
        body="When you can't bring the rig in, the Mufflermen ute attends. Stainless TIG welds done bay-side. Larger fabrication comes back to Oak Flats."
        visual={<MapVisual />}
        bullets={[
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Mobile bay services 12 suburbs" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Wollongong to Gerroa" },
          { icon: <Check size={12} strokeWidth={2.6} />, label: "Trade rig priority bookings" },
        ]}
        action={{ label: "Coverage map", href: "#coverage" }}
        reversed
      />

      <StatCounterRow
        kicker="Mufflermen, by the numbers"
        heading="58 years. 14,200 utes. One pit on Central Ave."
        body="The South Coast workshop, weighed and measured."
        entries={STATS}
      />

      <TestimonialWall
        kicker="What our drivers say"
        heading="Five-star reviews from Illawarra utes, caravans, and old-school muscle."
        entries={TESTIMONIALS}
      />

      <ProcessSteps
        kicker="How a Mufflermen install runs"
        heading="From quote to kerbside — five steps, five days."
        body="The standard install pipeline. Stage 2 dyno tune adds a day. Caravan rigs add two."
        steps={STEPS}
      />

      <PricingCtaSection
        kicker="Workshop pricing"
        heading="Three packages. One bay. One torque-tested signature."
        body="Pricing is per ute, per bay, fitted on-site at Oak Flats."
        columns={PRICING_COLUMNS}
        rows={PRICING_ROWS}
        footnote="All prices are GST-inclusive. Drive-away quotes confirmed at the front desk."
        actions={[
          { label: "Book a Stage 1 fit", href: "#book", variant: "primary" },
          { label: "Compare full spec sheet", href: "#spec", variant: "secondary" },
        ]}
      />

      <FaqAccordion
        kicker="Asked in the bay"
        heading="The three things every driver asks first."
        items={FAQ}
        defaultOpenId="adr"
      />

      <NewsletterCta
        kicker="Workshop dispatch"
        heading="Get the next Manta drop in your inbox."
        body="One email a month — what's landed in the cage upstairs, what's on the dyno, and any Illawarra trade nights coming up."
        ctaLabel="Subscribe"
      />

      <FooterMegamap
        brand={<FullBrandMark />}
        description="Stainless catbacks, ADR-stamped welds, and Manta-fit performance gear. Oak Flats since 1968."
        columns={FOOTER_COLUMNS}
        contact={FOOTER_CONTACT}
        socials={FOOTER_SOCIALS}
        legal="© 1968-2026 Mufflermen Pty Ltd. ABN 11 222 333 444. Workshop dispatches across the Illawarra & Shoalhaven."
        legalLinks={[
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
          { label: "Warranty", href: "#warranty" },
        ]}
        regions={FOOTER_REGIONS}
        selectedRegion="au-nsw"
      />

      <FloatingChatLauncher
        heading="Need a hand on the bay?"
        body="The fitters are between welds. Drop a question — we'll answer once the helmet's off."
        preview={<QuickChatList />}
        notificationCount={2}
      />

      <CookieBanner
        kicker="Heads up"
        heading="We use cookies to log workshop bookings"
        body="Mufflermen uses essential cookies for bookings and analytics for visit counts. Choose what's okay."
        acceptLabel="Accept all"
        manageLabel="Manage choices"
      />
    </main>
  )
}
