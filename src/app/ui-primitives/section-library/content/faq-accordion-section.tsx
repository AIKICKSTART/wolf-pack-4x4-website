/**
 * FAQ accordion section.
 *
 * Composed from the existing `services-areas-pages/ServiceFaqBlock` accordion
 * primitive plus the shared section shell + a contact CTA strip. Real Oak Flats
 * Mufflermen FAQ copy. Token-driven, light/dark, responsive, reduced-motion and
 * keyboard accessible (the accordion primitive owns the disclosure semantics).
 *
 * Exports `FaqAccordionSection` and `faqAccordionManifest`.
 */

import { ServiceFaqBlock } from "../../components/services-areas-pages"
import type { ServiceFaq } from "../../components/services-areas-pages"

import type { BlockManifest } from "../../builder/model"
import {
  DEFAULT_RESPONSIVE_RULES,
  sectionAccessibility,
  withCommonTokens,
} from "./_shared/manifest-helpers"
import shell from "./_shared/section-frame.module.css"

const FAQS: readonly ServiceFaq[] = [
  {
    id: "warranty",
    question: "How long is the warranty on a new exhaust system?",
    answer:
      "Every system we fit carries a lifetime warranty on the muffler and a 3-year warranty on welds and mid-pipes against rust-through. Keep your invoice — that is your warranty record.",
  },
  {
    id: "time",
    question: "How long does a cat-back or muffler swap take?",
    answer:
      "A straight muffler replacement is usually 45–90 minutes. A full mandrel-bent cat-back on a common ute or sedan is a half-day; bring it in at 8am and it is ready by lunch in most cases.",
  },
  {
    id: "legal",
    question: "Will a louder exhaust pass an NSW roadworthy?",
    answer:
      "We only fit systems that stay inside the 90 dB(A) stationary limit for your vehicle's build date. Every job leaves with a compliance note so you are covered for a pink slip.",
  },
  {
    id: "diy",
    question: "Can I supply my own muffler and just pay for fitting?",
    answer:
      "Yes. Fitting-only is welcome on supplied parts — we will tell you up front if the part will not seal or hang correctly so you are not paying twice.",
  },
  {
    id: "quote",
    question: "Do I need to book to get a quote?",
    answer:
      "No. Drive in any weekday and we will put it on the hoist and print a fixed-price quote in about 20 minutes, no obligation.",
  },
]

export function FaqAccordionSection() {
  return (
    <section className={shell.section} aria-labelledby="faq-accordion-heading">
      <header className={shell.header}>
        <span className={shell.kicker}>Common questions</span>
        <h2 id="faq-accordion-heading" className={shell.title}>
          Exhaust &amp; muffler FAQ
        </h2>
        <p className={shell.lede}>
          Straight answers to the questions we get most across the Oak Flats and
          Illawarra workshops.
        </p>
      </header>

      <div className={shell.body}>
        <ServiceFaqBlock
          kicker="Workshop answers"
          title="Before you book"
          faqs={FAQS}
          initialOpenId="quote"
        />
      </div>

      <div className={shell.ctaStrip}>
        <div className={shell.ctaStripCopy}>
          <strong>Still not sure?</strong>
          <span>Talk to a fitter, not a call centre</span>
        </div>
        <a className={shell.cta} href="tel:+61242561234">
          Call the workshop
        </a>
      </div>
    </section>
  )
}

export const faqAccordionManifest: BlockManifest = {
  type: "section/faq-accordion",
  name: "FAQ accordion section",
  category: "Content",
  kind: "section",
  version: "1.0.0",
  summary:
    "Disclosure-accordion FAQ section with kicker, heading, lede, a keyboard-operable accordion, and a phone CTA strip.",
  componentPath: "@/app/ui-primitives/section-library/content/faq-accordion-section",
  importName: "FaqAccordionSection",
  propsSchema: { fields: [] },
  defaultProps: {},
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string" },
    { path: "title", label: "Heading", control: "text", valueType: "string" },
    { path: "lede", label: "Intro", control: "textarea", valueType: "richtext" },
    { path: "faqs[]", label: "Questions", control: "repeater", valueType: "array", hint: "Each item is a question + answer." },
    { path: "faqs[].question", label: "Question", control: "text", valueType: "string" },
    { path: "faqs[].answer", label: "Answer", control: "richtext", valueType: "richtext" },
    { path: "initialOpenId", label: "First open question", control: "select", valueType: "enum" },
    { path: "cta.label", label: "CTA label", control: "text", valueType: "string" },
    { path: "cta.href", label: "CTA link", control: "url", valueType: "url" },
  ],
  tokenDependencies: withCommonTokens(),
  iconDependencies: [
    { name: "ChevronDown", importPath: "lucide-react", usage: "accordion disclosure chevron" },
  ],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: DEFAULT_RESPONSIVE_RULES,
  accessibilityRules: sectionAccessibility({
    keyboardOperable: true,
    notes: [
      "Accordion uses button-driven disclosure with aria-expanded.",
      "One panel open at a time; arrow + enter operable.",
    ],
  }),
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "FAQPage",
    requiresAltText: false,
    indexable: true,
  },
  conversionGoal: {
    id: "call-workshop",
    label: "Call the workshop",
    action: "call",
    eventName: "faq_cta_call",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {},
    aspectRatio: "4/3",
    background: "panel",
    thumbnailBreakpoint: "md",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { FaqAccordionSection } from "@/app/ui-primitives/section-library/content/faq-accordion-section"',
      "",
      "export default function Page() {",
      "  return <FaqAccordionSection />",
      "}",
    ].join("\n"),
    caption: "Self-contained FAQ section. Emits FAQPage structured data when wired.",
  },
  setupInstructions: {
    steps: [
      "Render under a `.dashboard`-scoped surface for tokens.",
      "Replace the FAQ entries with your own question/answer pairs.",
      "Optionally emit FAQPage JSON-LD from the same data for rich results.",
    ],
    requires: [],
    notes: ["Keep answers plain-text or lightly formatted for the accordion."],
  },
  tags: ["faq", "accordion", "support", "content"],
}
