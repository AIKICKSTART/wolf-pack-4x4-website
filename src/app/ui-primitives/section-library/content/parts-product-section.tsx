/**
 * Parts / product section.
 *
 * Composes the existing `parts-pages` family into a catalogue landing block:
 * catalogue hero, a three-up category bento, a related-parts rail, and a parts
 * FAQ. Real Mufflermen supplier + part copy. Token-driven, light/dark,
 * responsive, reduced-motion + a11y handled by the primitives.
 *
 * Exports `PartsProductSection` and `partsProductManifest`.
 */

import Link from "next/link"
import {
  PartCategoryCard,
  PartsCatalogueHero,
  PartsFaqSection,
  RelatedPartsRail,
} from "../../components/parts-pages"
import type {
  PartCardSummary,
  PartsFaqItem,
} from "../../components/parts-pages"

import type { BlockManifest } from "../../builder/model"
import {
  DEFAULT_RESPONSIVE_RULES,
  sectionAccessibility,
  withCommonTokens,
} from "./_shared/manifest-helpers"
import shell from "./_shared/section-frame.module.css"

const RELATED_PARTS: readonly PartCardSummary[] = [
  {
    id: "p1",
    sku: "MAN-HILUX-N80",
    title: "Manta 3\" cat-back — Hilux N80",
    supplier: "Manta",
    supplierTone: "manta",
    category: "Cat-back",
    categoryTone: "red",
    imageAlt: "Manta 3 inch cat-back system for Hilux N80",
    price: { rrpCents: 189900, currentCents: 169900, installmentHint: "or 4 x $424 fortnightly" },
    fitment: ["Hilux N80 2.8 TD", "2015–2024"],
    href: "/parts/manta-hilux-n80",
  },
  {
    id: "p2",
    sku: "XF-RANGER-PX3",
    title: "XForce twin 3\" — Ranger PX3",
    supplier: "XForce",
    supplierTone: "xforce",
    category: "Cat-back",
    categoryTone: "amber",
    imageAlt: "XForce twin 3 inch cat-back for Ranger PX3",
    price: { rrpCents: 224900, currentCents: 199900 },
    fitment: ["Ranger PX3 3.2 TD", "2018–2022"],
    href: "/parts/xforce-ranger-px3",
  },
  {
    id: "p3",
    sku: "RB-UNI-409",
    title: "Redback universal muffler 409SS",
    supplier: "Redback",
    supplierTone: "redback",
    category: "Muffler",
    categoryTone: "teal",
    imageAlt: "Redback universal 409 stainless muffler",
    price: { rrpCents: 18900 },
    fitment: ["2.5\" inlet", "Universal"],
    href: "/parts/redback-universal-409",
  },
]

const FAQS: readonly PartsFaqItem[] = [
  {
    id: "fitment",
    question: "How do I know a part fits my vehicle?",
    answer:
      "Every listing carries a fitment list checked against the supplier catalogue. If your build is borderline, send us the rego and we will confirm before you buy.",
  },
  {
    id: "supply",
    question: "Can you fit a part I buy here?",
    answer:
      "Yes — order online and book a fit at the Oak Flats workshop, or we will fit a part you supply from another store.",
  },
  {
    id: "stock",
    question: "Are listed parts in stock?",
    answer:
      "Popular Illawarra fitments are stocked on-site; the rest come through our supplier feeds within 1–3 business days.",
  },
]

export function PartsProductSection() {
  return (
    <section className={shell.section} aria-labelledby="parts-product-heading">
      <header className={shell.header}>
        <span className={shell.kicker}>Parts catalogue</span>
        <h2 id="parts-product-heading" className={shell.title}>
          Exhaust parts, fitted or shipped
        </h2>
        <p className={shell.lede}>
          A catalogue landing block — hero, category bento, related parts rail
          and a buyer FAQ — built from the parts-pages primitives.
        </p>
      </header>

      <div className={shell.body}>
        <PartsCatalogueHero
          kicker="Five supplier feeds, one bench"
          headline="Mufflers, cat-backs & mid-pipes"
          description="Authorised stock from Manta, XForce, Redback, Pacemaker and Lukey — fitted in-house or shipped Australia-wide."
          tone="amber"
          supplierCoverageLabel="5 supplier feeds connected"
          partCountLabel="19,412 parts indexed"
          suppliers={[
            { id: "manta", name: "Manta", tone: "manta" },
            { id: "xforce", name: "XForce", tone: "xforce" },
            { id: "redback", name: "Redback", tone: "redback" },
            { id: "pacemaker", name: "Pacemaker", tone: "pacemaker" },
          ]}
        />

        <div className={shell.grid3}>
          <PartCategoryCard
            title="Cat-back systems"
            description="Mandrel-bent stainless from cat to tip."
            href="/parts/cat-back"
            tone="red"
            partCount={1840}
            popularSuppliers={[
              { id: "manta", label: "Manta", tone: "manta" },
              { id: "xforce", label: "XForce", tone: "xforce" },
            ]}
          />
          <PartCategoryCard
            title="Mufflers"
            description="Universal and direct-fit, lifetime-warranted."
            href="/parts/mufflers"
            tone="amber"
            partCount={3120}
            popularSuppliers={[
              { id: "redback", label: "Redback", tone: "redback" },
              { id: "lukey", label: "Lukey", tone: "lukey" },
            ]}
          />
          <PartCategoryCard
            title="Headers & extractors"
            description="Tuned-length headers for common Illawarra rigs."
            href="/parts/headers"
            tone="teal"
            partCount={960}
            popularSuppliers={[
              { id: "pacemaker", label: "Pacemaker", tone: "pacemaker" },
            ]}
          />
        </div>

        <RelatedPartsRail
          kicker="Popular this month"
          heading="Top-selling fitments"
          description="What Illawarra owners are buying right now."
          parts={RELATED_PARTS}
        />

        <PartsFaqSection
          kicker="Buyer questions"
          heading="Buying & fitting parts"
          body="The things customers ask before they order."
          items={FAQS}
          defaultOpenId="fitment"
        />
      </div>

      <div className={shell.ctaStrip}>
        <div className={shell.ctaStripCopy}>
          <strong>Not sure which system?</strong>
          <span>Send your rego — we will match the fitment</span>
        </div>
        <Link className={shell.cta} href="/contact">
          Check my fitment
        </Link>
      </div>
    </section>
  )
}

export const partsProductManifest: BlockManifest = {
  type: "section/parts-product",
  name: "Parts & product section",
  category: "Commerce",
  kind: "section",
  version: "1.0.0",
  summary:
    "Parts catalogue landing block — catalogue hero with supplier badges, a three-up category bento, a top-sellers rail, and a buyer FAQ, capped by a fitment CTA.",
  componentPath: "@/app/ui-primitives/section-library/content/parts-product-section",
  importName: "PartsProductSection",
  propsSchema: { fields: [] },
  defaultProps: {},
  editableFields: [
    { path: "kicker", label: "Hero kicker", control: "text", valueType: "string" },
    { path: "headline", label: "Hero headline", control: "text", valueType: "string" },
    { path: "description", label: "Hero description", control: "textarea", valueType: "richtext" },
    { path: "suppliers[]", label: "Supplier badges", control: "repeater", valueType: "array" },
    { path: "categories[]", label: "Category cards", control: "repeater", valueType: "array" },
    { path: "relatedParts[]", label: "Top-seller parts", control: "repeater", valueType: "array" },
    { path: "faqs[]", label: "Buyer FAQ", control: "repeater", valueType: "array" },
    { path: "cta.label", label: "CTA label", control: "text", valueType: "string" },
    { path: "cta.href", label: "CTA link", control: "url", valueType: "url" },
  ],
  tokenDependencies: withCommonTokens([
    { token: "--primitive-teal", category: "color", usage: "category + supplier accents" },
    { token: "--primitive-green", category: "color", usage: "in-stock badge accent" },
  ]),
  iconDependencies: [
    { name: "Wrench", importPath: "lucide-react", usage: "parts category mark" },
    { name: "ChevronDown", importPath: "lucide-react", usage: "FAQ disclosure" },
  ],
  assetDependencies: [
    { id: "part-thumbs", type: "image", required: false, description: "Optional product thumbnails; falls back to tile when absent." },
  ],
  allowedChildren: [],
  responsiveRules: DEFAULT_RESPONSIVE_RULES,
  accessibilityRules: sectionAccessibility({
    keyboardOperable: true,
    notes: [
      "Category cards + part cards are links with accessible names.",
      "FAQ accordion is keyboard operable; price figures use tabular-nums.",
    ],
  }),
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "ItemList",
    requiresAltText: true,
    indexable: true,
  },
  conversionGoal: {
    id: "check-fitment",
    label: "Check my fitment",
    action: "navigate",
    eventName: "parts_check_fitment",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {},
    aspectRatio: "16/12",
    background: "panel",
    thumbnailBreakpoint: "xl",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { PartsProductSection } from "@/app/ui-primitives/section-library/content/parts-product-section"',
      "",
      "export default function PartsPage() {",
      "  return <PartsProductSection />",
      "}",
    ].join("\n"),
    caption: "Catalogue landing section assembled from parts-pages primitives.",
  },
  setupInstructions: {
    steps: [
      "Render under a `.dashboard`-scoped surface for tokens.",
      "Feed real categories, top-sellers, and FAQ from your parts catalogue.",
      "Wire the category + part hrefs to your product routes.",
    ],
    requires: [],
    notes: ["Prices are in cents (AUD) and render with tabular figures."],
  },
  tags: ["parts", "product", "catalogue", "commerce"],
}
