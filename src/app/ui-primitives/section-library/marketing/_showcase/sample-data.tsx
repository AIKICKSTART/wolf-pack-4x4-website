import type { ReactNode } from "react"

import type { FeatureGridItem } from "@/app/ui-primitives/components/marketing"
import type {
  ComparisonColumn,
  ComparisonRow,
} from "@/app/ui-primitives/components/data-display/comparison-table"

import { sectionIcon } from "../icons"
import type {
  BeforeAfterItem,
  CtaSectionProps,
  PromoCampaignSectionProps,
  SocialCampaignSectionProps,
  TestimonialsSectionProps,
} from "../index"

/**
 * Live sample props for the showcase. The manifest `defaultProps` carry
 * serialisable data (icon names as strings); the showcase needs real
 * `ReactNode` icons/visuals, so we resolve them here. Mufflermen copy + brand
 * media throughout.
 */

// — 01 CTA banner —————————————————————————————————————————————
export const ctaSampleProps: CtaSectionProps = {
  kicker: "Book your fit-up",
  heading: "Custom exhaust, fitted while you wait",
  body:
    "Bring the ute or the weekend build to Oak Flats. Mandrel-bent, fully TIG-welded, and dyno-tuned for sound and flow. Most cat-back jobs done same day.",
  primaryAction: { label: "Book a bay", href: "/book", variant: "primary" },
  secondaryAction: { label: "Call the workshop", href: "tel:+61242000000", variant: "ghost" },
  assurances: [
    { icon: "shield", label: "Lifetime weld warranty" },
    { icon: "badge", label: "Manta accredited" },
    { icon: "calendar", label: "Same-day fit-ups" },
  ],
  tone: "carbon",
}

// — 02 Before / after gallery —————————————————————————————————
export const beforeAfterItems: ReadonlyArray<BeforeAfterItem> = [
  {
    id: "vdj79",
    title: "VDJ79 — 4in turbo-back",
    summary: "Tired factory system out, 4in mandrel-bent dual in. Quieter cruise, proper bark on boost.",
    beforeSrc: "/media/brand/page-cover-service-detail.webp",
    beforeAlt: "Factory exhaust on a LandCruiser VDJ79 before the upgrade",
    afterSrc: "/media/brand/supplier-systems/hsv-gtsr-w1-manta-mpi/hero.webp",
    afterAlt: "Finished 4in turbo-back install photographed on the hoist",
    result: "+38rwkW",
  },
  {
    id: "ranger",
    title: "Ranger Next-Gen V6 — 4in DPF-back",
    summary: "DPF-back 4in system with a high-flow rear muffler. EGT down, towing temps tamed.",
    beforeSrc: "/media/brand/page-cover-parts.webp",
    beforeAlt: "Stock Ford Ranger exhaust before the DPF-back upgrade",
    afterSrc: "/media/brand/products/demo/exhaust-product-demo-hero.webp",
    afterAlt: "Finished 4in DPF-back system fitted to the Ranger",
    result: "−42°C EGT",
  },
  {
    id: "commodore",
    title: "VE Commodore — 2.5in cat-back",
    summary: "Twin 2.5in cat-back with stainless mufflers. Daily-quiet, mean when you bury it.",
    beforeSrc: "/media/brand/page-cover-category.webp",
    beforeAlt: "Factory Commodore exhaust before the cat-back upgrade",
    afterSrc: "/media/brand/brand-system/mufflermen-brand-system-environment-hero.webp",
    afterAlt: "Finished twin 2.5in cat-back install on the VE Commodore",
    result: "+24rwkW",
  },
]

// — 03 Testimonials & reviews —————————————————————————————————
export const testimonialsSampleProps: Omit<TestimonialsSectionProps, "className"> = {
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
      quote:
        "Booked Monday, fitted Tuesday. The dual on my 79 sounds mean and there's not a single rattle. These blokes know exhaust.",
      name: "Dave R.",
      role: "VDJ79 LandCruiser",
      tone: "red",
      rating: 5,
      span: "tall",
    },
    {
      id: "t2",
      quote: "Quiet on the highway, proper note when you bury it. Exactly what I asked for and done same day.",
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
    {
      id: "t4",
      quote: "Towed the van up the range with the new DPF-back and the temps never blinked. Brilliant work.",
      name: "Geoff H.",
      role: "Silverado 2500",
      tone: "green",
      rating: 5,
    },
    {
      id: "t5",
      quote: "Fair quote, no upsell, and they rang when it was done. Old-school service.",
      name: "Nadia K.",
      role: "Amarok V6",
      tone: "obsidian",
      rating: 5,
      span: "short",
    },
  ],
}

// — 04 Promo campaign —————————————————————————————————————————
function spotlightVisual(): ReactNode {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/media/brand/products/demo/exhaust-product-demo-square.webp"
      alt="Mandrel-bent stainless system on the bench, ready to fit"
      width={640}
      height={640}
      loading="lazy"
      decoding="async"
      style={{ width: "100%", height: "auto", borderRadius: "var(--primitive-radius-lg)" }}
    />
  )
}

export const promoSampleProps: PromoCampaignSectionProps = {
  kicker: "Winter dyno season",
  heading: "Cat-back + tune, save $200",
  body:
    "Book a full cat-back system with a dyno tune before 30 June and we'll knock $200 off the install. Limited bays each week.",
  offerLabel: "Save $200 · ends 30 Jun",
  ctaLabel: "Claim the offer",
  ctaHref: "/promo/winter-dyno",
  stats: [
    { id: "s1", label: "Jobs booked this month", value: 142, suffix: "+", tone: "red" },
    { id: "s2", label: "Avg power gain", value: 31, prefix: "+", suffix: "rwkW", tone: "amber" },
    { id: "s3", label: "Same-day fit-ups", value: 86, suffix: "%", tone: "teal" },
    { id: "s4", label: "5-star reviews", value: 1042, tone: "green" },
  ],
  spotlightVisual: spotlightVisual(),
  spotlightHeading: "Mandrel-bent, dyno-proven",
  spotlightBody:
    "Every promo system is mandrel-bent, fully TIG-welded, and signed off on the in-house dyno so you leave with a printout, not a promise.",
  spotlightBullets: [
    { icon: sectionIcon("shield"), label: "409 stainless, lifetime weld warranty" },
    { icon: sectionIcon("gauge"), label: "Dyno before/after printout included" },
    { icon: sectionIcon("volume"), label: "Bi-modal valve integration retained" },
  ],
}

// — 05 Social campaign ————————————————————————————————————————
export const socialChannels: SocialCampaignSectionProps["channels"] = [
  { id: "ig", name: "Instagram", handle: "@oakflatsmufflermen", audience: "18.4k", href: "https://instagram.com", icon: "instagram" },
  { id: "fb", name: "Facebook", handle: "/oakflatsmufflermen", audience: "9.1k", href: "https://facebook.com", icon: "review" },
  { id: "yt", name: "YouTube", handle: "Mufflermen Garage", audience: "6.7k", href: "https://youtube.com", icon: "volume" },
]

export const socialSteps: SocialCampaignSectionProps["steps"] = [
  { id: "1", icon: sectionIcon("calendar"), title: "We book the job", body: "Pick a bay; we confirm the system and the slot." },
  { id: "2", icon: sectionIcon("wrench"), title: "We film the fit-up", body: "Cut, bend, weld, fit — captured on the hoist." },
  { id: "3", icon: sectionIcon("gauge"), title: "We post the dyno", body: "Before/after numbers and the sound clip go live." },
]

export const socialSampleProps: Omit<SocialCampaignSectionProps, "channels" | "steps" | "className"> = {
  kicker: "Follow the build",
  heading: "Catch every cut, weld & dyno run",
  body:
    "We post every notable job — before/after, weld macros, dyno pulls. Follow along or get the weekly drop in your inbox.",
  captureHeading: "Get the weekly workshop drop",
  captureBody: "One email a week — featured builds, sound clips, and member-only fit-up offers.",
}

// — 06 Pricing & service ——————————————————————————————————————
export const pricingColumns: ReadonlyArray<ComparisonColumn> = [
  { id: "axle", name: "Axle-back", caption: "From $690 fitted" },
  { id: "cat", name: "Cat-back", caption: "From $1,290 fitted", popular: true },
  { id: "turbo", name: "Turbo-back", caption: "From $2,490 fitted" },
]

export const pricingRows: ReadonlyArray<ComparisonRow> = [
  { feature: "Mandrel-bent piping", values: ["check", "check", "check"] },
  { feature: "Full TIG welds", values: ["check", "check", "check"] },
  { feature: "Stainless muffler", values: ["dot", "check", "check"] },
  { feature: "High-flow cat", values: ["cross", "dot", "check"] },
  { feature: "Dyno tune included", values: ["cross", "cross", "check"] },
  { feature: "Lifetime weld warranty", values: ["check", "check", "check"] },
]

export const pricingIncluded: ReadonlyArray<FeatureGridItem> = [
  { id: "f1", icon: sectionIcon("shield"), title: "Lifetime weld warranty", description: "Every weld backed for as long as you own the vehicle." },
  { id: "f2", icon: sectionIcon("gauge"), title: "Flow-matched sizing", description: "Pipe diameter matched to your engine, not a one-size kit." },
  { id: "f3", icon: sectionIcon("volume"), title: "Sound to spec", description: "We tune the note — daily-quiet or track-loud, your call." },
]
