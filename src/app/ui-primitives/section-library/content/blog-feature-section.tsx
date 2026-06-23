/**
 * Blog feature section — long-form editorial composition.
 *
 * Composed entirely from the existing `block-editor` family (callout, quote,
 * gallery, timeline) plus the shared section shell. Real Oak Flats Mufflermen
 * copy. Token-driven, light/dark, responsive 320 → 1920, reduced-motion safe.
 *
 * Exports the `BlogFeatureSection` component and its `blogFeatureManifest`
 * `BlockManifest` so the CMS canvas can drag it.
 */

import Link from "next/link"
import {
  CalloutBlock,
  GalleryBlock,
  QuoteBlock,
  TimelineBlock,
} from "../../components/block-editor"
import type {
  BlockData,
  CalloutPayload,
  GalleryPayload,
  QuotePayload,
  TimelinePayload,
} from "../../components/block-editor"

import type { BlockManifest } from "../../builder/model"
import {
  DEFAULT_RESPONSIVE_RULES,
  sectionAccessibility,
  withCommonTokens,
} from "./_shared/manifest-helpers"
import shell from "./_shared/section-frame.module.css"

const ISO = "2026-05-12T08:00:00.000Z"

function block<T>(id: string, payload: T): BlockData<T> {
  return { id, payload, version: 1, updatedAt: ISO }
}

const intro: BlockData<CalloutPayload> = block("blog-intro", {
  kind: "tip",
  title: "Why your exhaust note changed",
  body: "A sudden drone, a rattle over speed bumps, or a louder idle almost always traces back to one of three things — a blown muffler baffle, a cracked flange gasket, or a corroded mid-pipe. Here is how the Oak Flats workshop diagnoses it in under twenty minutes.",
  dismissible: false,
})

const gallery: BlockData<GalleryPayload> = block("blog-gallery", {
  layout: "grid",
  caption: "Mandrel-bent 409 stainless, TIG-welded in-house at Oak Flats.",
  items: [
    { id: "g1", src: "", alt: "Mandrel-bent 2.5\" stainless mid-pipe on the bench", caption: "2.5\" mandrel bend", ratio: 1.4 },
    { id: "g2", src: "", alt: "TIG weld bead on a stainless muffler inlet", caption: "TIG inlet weld", ratio: 1.2 },
    { id: "g3", src: "", alt: "Hilux N80 cat-back fitted on the hoist", caption: "Hilux N80 cat-back", ratio: 1.6 },
    { id: "g4", src: "", alt: "Polished tip after final fitment", caption: "Polished 4\" tip", ratio: 1.1 },
  ],
})

const pullQuote: BlockData<QuotePayload> = block("blog-quote", {
  variant: "plain",
  text: "We do not sell you a system you do not need. If a $90 gasket and a re-weld fixes the drone, that is the job we book.",
  author: "Macca",
  citation: "Workshop foreman · Oak Flats Mufflermen",
})

const timeline: BlockData<TimelinePayload> = block("blog-timeline", {
  title: "A typical drone diagnosis, start to finish",
  events: [
    { id: "t1", date: "0 min", label: "Hoist + cold start", description: "Engine cold-started on the hoist so leaks hiss before the system heats and seals.", granularity: "event", tone: "teal" },
    { id: "t2", date: "8 min", label: "Joint + hanger check", description: "Every flange, clamp and rubber hanger is pressure-checked along the run.", granularity: "event", tone: "amber" },
    { id: "t3", date: "15 min", label: "Baffle scope", description: "Borescope down the muffler confirms whether the internal baffle has collapsed.", granularity: "event", tone: "red" },
    { id: "t4", date: "20 min", label: "Quote on the spot", description: "Fixed-price quote printed before any cutting starts — no surprises.", granularity: "event", tone: "green" },
  ],
})

export function BlogFeatureSection() {
  return (
    <section className={shell.section} aria-labelledby="blog-feature-heading">
      <header className={shell.header}>
        <span className={shell.kicker}>Workshop journal</span>
        <h2 id="blog-feature-heading" className={shell.title}>
          Chasing an exhaust drone the right way
        </h2>
        <p className={shell.lede}>
          A field guide from the Oak Flats bay — how we find the real cause of a
          noisy exhaust before we quote a single dollar of stainless.
        </p>
        <div className={shell.metaRow}>
          <span>
            <span className={shell.metaDot} aria-hidden="true" />
            By Macca
          </span>
          <span>12 May 2026</span>
          <span>6 min read</span>
        </div>
      </header>

      <div className={shell.body}>
        <CalloutBlock data={intro} mode="render" />

        <div className={shell.split}>
          <GalleryBlock data={gallery} mode="render" />
          <div className={shell.rail}>
            <QuoteBlock data={pullQuote} mode="render" />
            <CalloutBlock
              data={block("blog-warn", {
                kind: "warning",
                title: "Do not ignore a ticking header",
                body: "A tick that fades as the engine warms is a manifold leak — left alone it warps the head over time. Book it early.",
                dismissible: false,
              })}
              mode="render"
            />
          </div>
        </div>

        <TimelineBlock data={timeline} mode="render" />
      </div>

      <div className={shell.ctaStrip}>
        <div className={shell.ctaStripCopy}>
          <strong>Got a drone, rattle, or louder idle?</strong>
          <span>Free 20-minute diagnosis at Oak Flats</span>
        </div>
        <Link className={shell.cta} href="/contact">
          Book a diagnosis
        </Link>
      </div>
    </section>
  )
}

export const blogFeatureManifest: BlockManifest = {
  type: "section/blog-feature",
  name: "Blog feature section",
  category: "Content",
  kind: "section",
  version: "1.0.0",
  summary:
    "Long-form editorial blog section — intro callout, image gallery, pull quote, warning callout, and a diagnosis timeline, capped by a metallic CTA strip.",
  componentPath: "@/app/ui-primitives/section-library/content/blog-feature-section",
  importName: "BlogFeatureSection",
  propsSchema: { fields: [] },
  defaultProps: {},
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", hint: "Eyebrow above the title." },
    { path: "title", label: "Headline", control: "text", valueType: "string" },
    { path: "lede", label: "Standfirst", control: "textarea", valueType: "richtext" },
    { path: "author", label: "Author", control: "text", valueType: "string" },
    { path: "publishedAt", label: "Published date", control: "text", valueType: "string" },
    { path: "readingMinutes", label: "Reading time (min)", control: "number", valueType: "number" },
    { path: "intro.body", label: "Intro callout body", control: "textarea", valueType: "richtext" },
    { path: "gallery.items[]", label: "Gallery images", control: "repeater", valueType: "array" },
    { path: "quote.text", label: "Pull quote", control: "textarea", valueType: "richtext" },
    { path: "timeline.events[]", label: "Timeline events", control: "repeater", valueType: "array" },
    { path: "cta.label", label: "CTA label", control: "text", valueType: "string" },
    { path: "cta.href", label: "CTA link", control: "url", valueType: "url" },
  ],
  tokenDependencies: withCommonTokens([
    { token: "--primitive-teal", category: "color", usage: "timeline + callout accents" },
    { token: "--primitive-green", category: "color", usage: "timeline completion accent" },
  ]),
  iconDependencies: [
    { name: "Lightbulb", importPath: "lucide-react", usage: "tip callout icon" },
    { name: "AlertTriangle", importPath: "lucide-react", usage: "warning callout icon" },
  ],
  assetDependencies: [
    { id: "blog-gallery", type: "image", required: false, description: "Up to 4 workshop photos, ~1200px wide webp." },
  ],
  allowedChildren: [],
  responsiveRules: DEFAULT_RESPONSIVE_RULES,
  accessibilityRules: sectionAccessibility({
    keyboardOperable: true,
    notes: ["Gallery + timeline keep semantic order at every breakpoint."],
  }),
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "BlogPosting",
    requiresAltText: true,
    indexable: true,
  },
  conversionGoal: {
    id: "book-diagnosis",
    label: "Book a diagnosis",
    action: "navigate",
    eventName: "blog_cta_book_diagnosis",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: {},
    aspectRatio: "16/10",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { BlogFeatureSection } from "@/app/ui-primitives/section-library/content/blog-feature-section"',
      "",
      "export default function Page() {",
      "  return <BlogFeatureSection />",
      "}",
    ].join("\n"),
    caption: "Drop the blog feature section onto any page.",
  },
  setupInstructions: {
    steps: [
      "Render inside a surface scoped by `.dashboard` so the central tokens resolve.",
      "Swap the gallery, quote, and timeline payloads for your post content.",
      "Point the CTA href at your booking or contact route.",
    ],
    requires: [],
    notes: ["All copy is placeholder Mufflermen content — edit before publishing."],
  },
  tags: ["blog", "editorial", "content", "long-form"],
}
