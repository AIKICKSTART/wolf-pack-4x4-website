"use client"

import {
  LogoCloud,
  TestimonialWall,
  type LogoCloudEntry,
  type TestimonialEntry,
} from "../../../components/marketing"
import {
  BeaudesertMarkIcon,
  HushpowerMarkIcon,
  MagnaflowMarkIcon,
  MantaMarkIcon,
  PacemakerMarkIcon,
  RedbackMarkIcon,
  XforceMarkIcon,
} from "../../../components/icons"

import styles from "./workshop-trust-section.module.css"

export interface WorkshopTrustSectionProps {
  kicker?: string
  heading?: string
  body?: string
  /** Customer testimonials. Defaults to five Mufflermen reviews. */
  testimonials?: ReadonlyArray<TestimonialEntry>
  /** Supplier brand marks. Defaults to the seven house brands. */
  brands?: ReadonlyArray<LogoCloudEntry>
  className?: string
}

const DEFAULT_TESTIMONIALS: ReadonlyArray<TestimonialEntry> = [
  {
    id: "kane",
    quote:
      "Booked my Ranger in for a turbo-back system. Sounds mean, tows better, and they had it done by lunch. Won't go anywhere else.",
    name: "Kane R.",
    role: "Ford Ranger · Shellharbour",
    rating: 5,
    tone: "red",
    span: "tall",
  },
  {
    id: "deb",
    quote: "Honest blokes. My old muffler was blowing — they patched it instead of selling me a whole system. Fair price.",
    name: "Deb M.",
    role: "Mazda 3 · Oak Flats",
    rating: 5,
    tone: "teal",
    span: "regular",
  },
  {
    id: "trent",
    quote: "Custom 3-inch on the Commodore. The weld work is art. Quiet at cruise, proper roar when you plant it.",
    name: "Trent W.",
    role: "VE SS · Albion Park",
    rating: 5,
    tone: "amber",
    span: "regular",
  },
  {
    id: "sandra",
    quote: "Got my LandCruiser sorted for the next big trip. DPF-back done right, lower EGTs, and a lifetime warranty.",
    name: "Sandra K.",
    role: "200 Series · Kiama",
    rating: 5,
    tone: "green",
    span: "short",
  },
  {
    id: "joey",
    quote: "Same-day fix when the flex pipe let go. Squeezed me in, no fuss. These are the muffler men, alright.",
    name: "Joey P.",
    role: "Hilux · Dapto",
    rating: 5,
    tone: "obsidian",
    span: "short",
  },
]

const DEFAULT_BRANDS: ReadonlyArray<LogoCloudEntry> = [
  { id: "manta", name: "Manta", mark: <MantaMarkIcon size={120} tone="currentColor" /> },
  { id: "xforce", name: "XForce", mark: <XforceMarkIcon size={120} tone="currentColor" /> },
  { id: "redback", name: "Redback", mark: <RedbackMarkIcon size={120} tone="currentColor" /> },
  { id: "magnaflow", name: "MagnaFlow", mark: <MagnaflowMarkIcon size={120} tone="currentColor" /> },
  { id: "pacemaker", name: "Pacemaker", mark: <PacemakerMarkIcon size={120} tone="currentColor" /> },
  { id: "hushpower", name: "Hushpower", mark: <HushpowerMarkIcon size={120} tone="currentColor" /> },
  { id: "beaudesert", name: "Beaudesert", mark: <BeaudesertMarkIcon size={120} tone="currentColor" /> },
]

/**
 * Workshop trust — social proof and supplier credibility. Composes the
 * `TestimonialWall` and `LogoCloud` marketing primitives with real Mufflermen
 * reviews and house supplier brand marks. Token-driven, light/dark, responsive,
 * reduced-motion safe.
 */
export function WorkshopTrustSection({
  kicker = "Why locals trust us",
  heading = "20 years, one reputation",
  body = "Family-run since the early days, the Oak Flats Mufflermen have earned their name one clean weld at a time. We fit only brands we'd run ourselves.",
  testimonials = DEFAULT_TESTIMONIALS,
  brands = DEFAULT_BRANDS,
  className,
}: WorkshopTrustSectionProps) {
  const classes = [styles.host, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <span className={styles.weave} aria-hidden="true" />
      <TestimonialWall
        className={styles.wall}
        kicker={kicker}
        heading={heading}
        body={body}
        entries={testimonials}
      />

      <LogoCloud
        className={styles.brands}
        kicker="House brands"
        heading="Names we stand behind"
        body="Genuine systems and parts from the brands that back their gear — fitted by people who know them."
        entries={brands}
      />
    </div>
  )
}

export default WorkshopTrustSection
