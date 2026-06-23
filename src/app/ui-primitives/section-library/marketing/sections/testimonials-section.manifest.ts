import type { BlockManifest } from "../../../builder/model/manifest"

import {
  CONTENT_SECTION_TOKENS,
  STACK_RESPONSIVE_RULES,
} from "../manifest-shared"

const COMPONENT_PATH =
  "@/app/ui-primitives/section-library/marketing/sections/testimonials-section"

/** BlockManifest for the testimonials / reviews section. */
export const testimonialsSectionManifest: BlockManifest = {
  type: "marketing-section/testimonials",
  name: "Testimonials & reviews",
  category: "Marketing",
  kind: "section",
  version: "1.0.0",
  summary:
    "Aggregate ReviewSummaryCard (rating, breakdown, sentiment donut, trend) beside a masonry TestimonialWall of customer quotes.",
  componentPath: COMPONENT_PATH,
  importName: "TestimonialsSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "heading", type: "string", required: true },
      { key: "body", type: "string", required: false },
      {
        key: "summary",
        type: "object",
        required: true,
        fields: [
          { key: "overallRating", type: "number", required: true, min: 0, max: 5 },
          { key: "totalReviews", type: "number", required: true, min: 0 },
          { key: "tiers", type: "array", required: true },
          { key: "sentimentSegments", type: "array", required: true },
          { key: "trend", type: "array", required: true },
          { key: "recommendPercentage", type: "number", required: true, min: 0, max: 100 },
          { key: "meta", type: "string", required: false },
        ],
      },
      { key: "testimonials", type: "array", required: true },
    ],
  },
  defaultProps: {
    kicker: "What the Illawarra says",
    heading: "Reviews from the bay",
    body: "Aggregated from Google, Facebook, and post-job surveys across every Mufflermen install.",
    summary: {
      overallRating: 4.92,
      totalReviews: 1187,
      tiers: [
        { stars: 5, count: 1042 },
        { stars: 4, count: 96 },
        { stars: 3, count: 31 },
        { stars: 2, count: 11 },
        { stars: 1, count: 7 },
      ],
      sentimentSegments: [
        { label: "Glowing", value: 78, tone: "green" },
        { label: "Positive", value: 16, tone: "teal" },
        { label: "Neutral", value: 4, tone: "amber" },
        { label: "Critical", value: 2, tone: "red" },
      ],
      trend: [4.7, 4.8, 4.75, 4.85, 4.9, 4.88, 4.92, 4.95],
      recommendPercentage: 98,
      meta: "Across all jobs · last 90 days",
    },
    testimonials: [
      {
        id: "t1",
        quote: "Booked Monday, fitted Tuesday. The dual on my 79 sounds mean and there's not a single rattle.",
        name: "Dave R.",
        role: "VDJ79 LandCruiser",
        tone: "red",
        rating: 5,
        span: "tall",
      },
      {
        id: "t2",
        quote: "Quiet on the highway, proper note when you bury it. Exactly what I asked for.",
        name: "Priya S.",
        role: "Ranger Next-Gen",
        tone: "amber",
        rating: 5,
      },
      {
        id: "t3",
        quote: "Welds are art. You can tell these blokes have been doing it for decades.",
        name: "Macca",
        role: "VE Commodore",
        tone: "teal",
        rating: 5,
        span: "short",
      },
    ],
  },
  editableFields: [
    { path: "kicker", label: "Kicker", control: "text", valueType: "string", optional: true },
    { path: "heading", label: "Heading", control: "text", valueType: "string" },
    { path: "body", label: "Intro copy", control: "textarea", valueType: "string", optional: true },
    { path: "summary.overallRating", label: "Overall rating", control: "number", valueType: "number" },
    { path: "summary.totalReviews", label: "Total reviews", control: "number", valueType: "number" },
    { path: "summary.recommendPercentage", label: "Would-recommend %", control: "number", valueType: "number" },
    { path: "summary.meta", label: "Summary meta", control: "text", valueType: "string", optional: true },
    {
      path: "testimonials",
      label: "Testimonials",
      control: "repeater",
      valueType: "array",
      hint: "Each quote shows an avatar, name, role, and 1–5 star rating.",
    },
    { path: "testimonials[].quote", label: "Quote", control: "textarea", valueType: "string" },
    { path: "testimonials[].name", label: "Name", control: "text", valueType: "string" },
    { path: "testimonials[].role", label: "Vehicle / role", control: "text", valueType: "string" },
  ],
  tokenDependencies: CONTENT_SECTION_TOKENS,
  iconDependencies: [
    { name: "star", importPath: "lucide-react", usage: "testimonial star ratings" },
  ],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: STACK_RESPONSIVE_RULES,
  accessibilityRules: {
    role: "region",
    requiresLabel: true,
    keyboardOperable: false,
    visibleFocus: false,
    respectsReducedMotion: true,
    headingLevel: 2,
    notes: [
      "Composes ReviewSummaryCard (region) + TestimonialWall (list of quotes).",
      "Star ratings carry text alternatives via the underlying primitives.",
    ],
  },
  seoRules: {
    contributesHeading: true,
    schemaOrgType: "AggregateRating",
    indexable: true,
  },
  previewConfig: {
    sampleProps: {
      kicker: "What the Illawarra says",
      heading: "Reviews from the bay",
      testimonials: [],
    },
    aspectRatio: "16/9",
    background: "canvas",
    thumbnailBreakpoint: "xl",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    caption: "Pair the aggregate panel with a wall of quotes.",
    code: `import { TestimonialsSection } from "@/app/ui-primitives/section-library/marketing/sections/testimonials-section"

export function SocialProof() {
  return (
    <TestimonialsSection
      heading="Reviews from the bay"
      summary={{
        overallRating: 4.92,
        totalReviews: 1187,
        tiers: [{ stars: 5, count: 1042 }, { stars: 4, count: 96 }],
        sentimentSegments: [{ label: "Glowing", value: 78, tone: "green" }],
        trend: [4.7, 4.85, 4.92],
        recommendPercentage: 98,
      }}
      testimonials={[
        { id: "t1", quote: "Sounds mean, zero rattles.", name: "Dave R.", role: "VDJ79", rating: 5 },
      ]}
    />
  )
}`,
  },
  setupInstructions: {
    steps: [
      "Import TestimonialsSection.",
      "Provide a summary object (rating, tiers, sentiment, trend, recommend %).",
      "Provide a testimonials array of quotes.",
      "Heading is required; kicker and body are optional.",
    ],
    requires: [],
    notes: [
      "Composes ReviewSummaryCard (reviews family) and TestimonialWall (marketing family).",
      "Sentiment donut and trend sparkline come from the charts family.",
    ],
  },
  tags: ["testimonials", "reviews", "social-proof", "ratings", "marketing"],
}

export default testimonialsSectionManifest
