/**
 * Local-SEO suburb section.
 *
 * Composes the existing `locations-pages` family into a complete suburb landing
 * block: suburb hero, fast-facts row, localised services grid, suburb FAQ, and
 * a local quote CTA card. Real Illawarra / Albion Park copy. Token-driven,
 * light/dark, responsive, reduced-motion + a11y handled by the primitives.
 *
 * Exports `LocalSeoSuburbSection` and `localSeoSuburbManifest`.
 */

import {
  LocalQuoteCtaCard,
  SuburbFaq,
  SuburbFastFactsRow,
  SuburbHero,
  SuburbServicesGrid,
} from "../../components/locations-pages"
import type {
  SuburbFaqItem,
  SuburbFastFact,
  SuburbServiceTile,
} from "../../components/locations-pages"

import type { BlockManifest } from "../../builder/model"
import {
  DEFAULT_RESPONSIVE_RULES,
  sectionAccessibility,
  withCommonTokens,
} from "./_shared/manifest-helpers"
import shell from "./_shared/section-frame.module.css"

const SUBURB = "Albion Park"

const FACTS: readonly SuburbFastFact[] = [
  { id: "postcode", label: "Postcode", value: "2527", tone: "amber" },
  { id: "lga", label: "LGA", value: "Shellharbour City", tone: "teal" },
  { id: "drive", label: "From workshop", value: "11 min", note: "8.4 km via Princes Hwy", tone: "red" },
  { id: "turnaround", label: "Typical turnaround", value: "Same day", tone: "green" },
]

const SERVICES: readonly SuburbServiceTile[] = [
  {
    id: "muffler",
    title: "Muffler repairs",
    kicker: "Workshop service",
    description: "Re-weld, re-baffle, or replace a worn muffler with a lifetime-warranted unit.",
    localisedChip: "Same-day muffler repair · Albion Park",
    href: "/services/muffler-repairs",
  },
  {
    id: "catback",
    title: "Cat-back systems",
    kicker: "Performance",
    description: "Mandrel-bent 409 stainless cat-back systems built and fitted in-house.",
    localisedChip: "Stainless cat-back · Albion Park utes",
    href: "/services/cat-back",
  },
  {
    id: "exhaust",
    title: "Full exhaust replacement",
    kicker: "Workshop service",
    description: "Rust-through from cat to tip — replaced as a complete compliant run.",
    localisedChip: "Full exhaust replacement · Albion Park",
    href: "/services/full-exhaust",
  },
]

const FAQS: readonly SuburbFaqItem[] = [
  {
    id: "travel",
    question: "Do you cover Albion Park and Albion Park Rail?",
    answer:
      "Yes — both are an 11-minute run from the Oak Flats workshop. Drop-off and mobile-fit are available across the 2527 / 2528 postcodes.",
  },
  {
    id: "booking",
    question: "Can I get a same-day fit in Albion Park?",
    answer:
      "Most common mufflers and cat-backs we stock for popular Illawarra vehicles, so same-day is the norm if you arrive before 10am.",
  },
  {
    id: "mobile",
    question: "Do you do mobile fitting locally?",
    answer:
      "For straightforward muffler swaps we can come to you in Albion Park. Complex mandrel work needs the workshop hoist.",
  },
]

export function LocalSeoSuburbSection() {
  return (
    <section className={shell.section} aria-labelledby="local-seo-suburb-heading">
      <header className={shell.header}>
        <span className={shell.kicker}>Service area</span>
        <h2 id="local-seo-suburb-heading" className={shell.title}>
          Exhaust &amp; muffler service in {SUBURB}
        </h2>
        <p className={shell.lede}>
          A complete suburb landing block — hero, local facts, services, FAQ and
          a quote CTA — composed for organic local search.
        </p>
      </header>

      <div className={shell.body}>
        <SuburbHero
          kicker="Shellharbour service area"
          suburbName={SUBURB}
          postcode="2527"
          state="NSW"
          driveTimeMinutes={11}
          tagline="Lifetime-warranted mufflers and mandrel-bent stainless, fitted by Oak Flats Mufflermen — minutes from Albion Park."
          primaryAction={{ label: "Call (02) 4256 1234", href: "tel:+61242561234" }}
          secondaryAction={{ label: "Book online", href: "/book" }}
        />

        <SuburbFastFactsRow heading={`${SUBURB} fast facts`} facts={FACTS} />

        <SuburbServicesGrid
          heading="What we do locally"
          suburbName={SUBURB}
          services={SERVICES}
        />

        <div className={shell.split}>
          <SuburbFaq suburbName={SUBURB} items={FAQS} defaultOpenId="booking" />
          <LocalQuoteCtaCard
            suburbName={SUBURB}
            phoneDisplay="(02) 4256 1234"
            phoneHref="tel:+61242561234"
            bookHref="/book"
            defaultMode="drop-off"
            body="Drop-off at Oak Flats or book a local mobile fit — pick what suits and we will quote it fast."
          />
        </div>
      </div>
    </section>
  )
}

export const localSeoSuburbManifest: BlockManifest = {
  type: "section/local-seo-suburb",
  name: "Local-SEO suburb section",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary:
    "Complete suburb landing block for organic local search — suburb hero, fast-facts row, localised services grid, suburb FAQ, and a drop-off/mobile quote CTA.",
  componentPath: "@/app/ui-primitives/section-library/content/local-seo-suburb-section",
  importName: "LocalSeoSuburbSection",
  propsSchema: { fields: [] },
  defaultProps: {},
  editableFields: [
    { path: "suburbName", label: "Suburb name", control: "text", valueType: "string" },
    { path: "postcode", label: "Postcode", control: "text", valueType: "string" },
    { path: "state", label: "State", control: "select", valueType: "enum", options: ["NSW", "VIC", "QLD", "SA", "WA", "TAS", "NT", "ACT"] },
    { path: "driveTimeMinutes", label: "Drive time (min)", control: "number", valueType: "number" },
    { path: "tagline", label: "Hero tagline", control: "textarea", valueType: "richtext" },
    { path: "facts[]", label: "Fast facts", control: "repeater", valueType: "array" },
    { path: "services[]", label: "Local services", control: "repeater", valueType: "array" },
    { path: "faqs[]", label: "Suburb FAQ", control: "repeater", valueType: "array" },
    { path: "phoneHref", label: "Phone link", control: "url", valueType: "url" },
    { path: "bookHref", label: "Booking link", control: "url", valueType: "url" },
  ],
  tokenDependencies: withCommonTokens([
    { token: "--primitive-teal", category: "color", usage: "fact + service accents" },
    { token: "--primitive-green", category: "color", usage: "turnaround accent" },
    { token: "--primitive-glass-strong", category: "color", usage: "glass hero surface" },
  ]),
  iconDependencies: [
    { name: "MapPin", importPath: "lucide-react", usage: "suburb / location markers" },
    { name: "Phone", importPath: "lucide-react", usage: "quote CTA call action" },
  ],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: DEFAULT_RESPONSIVE_RULES,
  accessibilityRules: sectionAccessibility({
    keyboardOperable: true,
    notes: [
      "Fast facts render as a semantic description list.",
      "Quote CTA mode toggle and FAQ accordion are keyboard operable.",
    ],
  }),
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "LocalBusiness",
    requiresAltText: false,
    indexable: true,
  },
  conversionGoal: {
    id: "local-quote",
    label: "Request a local quote",
    action: "call",
    eventName: "local_seo_quote",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {},
    aspectRatio: "16/12",
    background: "canvas",
    thumbnailBreakpoint: "xl",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { LocalSeoSuburbSection } from "@/app/ui-primitives/section-library/content/local-seo-suburb-section"',
      "",
      "export default function SuburbPage() {",
      "  return <LocalSeoSuburbSection />",
      "}",
    ].join("\n"),
    caption: "One block per suburb landing page.",
  },
  setupInstructions: {
    steps: [
      "Render under a `.dashboard`-scoped surface for tokens.",
      "Duplicate per suburb and swap suburb name, postcode, drive time, and copy.",
      "Emit LocalBusiness + areaServed JSON-LD from the same data for local rich results.",
    ],
    requires: [],
    notes: ["Drive time + facts should reflect the real distance from your workshop."],
  },
  tags: ["local-seo", "suburb", "location", "marketing"],
}
