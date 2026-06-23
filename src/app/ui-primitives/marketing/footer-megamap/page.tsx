import type { Metadata } from "next"
import { Mail } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import {
  FooterMegamap,
  type FooterMegamapColumn,
  type FooterMegamapContactDetail,
  type FooterMegamapRegion,
  type FooterMegamapSocial,
} from "../../components/marketing/footer-megamap"

// Abstract glyph marks for "social" entries — not real third-party logos.
function FacebookGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M14 8h3V5h-3a4 4 0 0 0-4 4v3H7v3h3v6h3v-6h2.5l.5-3H13V9a1 1 0 0 1 1-1Z" />
    </svg>
  )
}

function InstagramGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  )
}

function YoutubeGlyph() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
      <path d="M21.6 7.2a2.5 2.5 0 0 0-1.76-1.77C18.27 5 12 5 12 5s-6.27 0-7.84.43A2.5 2.5 0 0 0 2.4 7.2 26 26 0 0 0 2 12a26 26 0 0 0 .4 4.8 2.5 2.5 0 0 0 1.76 1.77C5.73 19 12 19 12 19s6.27 0 7.84-.43A2.5 2.5 0 0 0 21.6 16.8 26 26 0 0 0 22 12a26 26 0 0 0-.4-4.8ZM10 15V9l5.2 3Z" />
    </svg>
  )
}

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Footer megamap | Marketing Blocks",
  description:
    "Primitive 10 — comprehensive site footer with 4-column sitemap, brand block, contact, social row, legal fineprint, region selector.",
}

const COLUMNS: ReadonlyArray<FooterMegamapColumn> = [
  {
    id: "workshop",
    heading: "Workshop",
    links: [
      { label: "Catback installs", href: "#catback" },
      { label: "Manta partner range", href: "#manta" },
      { label: "Dyno cell", href: "#dyno" },
      { label: "Mobile bay", href: "#mobile" },
      { label: "Caravan rigs", href: "#caravan" },
    ],
  },
  {
    id: "services",
    heading: "Services",
    links: [
      { label: "MIG / TIG welding", href: "#welding" },
      { label: "ADR compliance", href: "#adr" },
      { label: "Flow assessment", href: "#flow" },
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
      { label: "Trade partners", href: "#partners" },
    ],
  },
  {
    id: "support",
    heading: "Support",
    links: [
      { label: "Book a bay", href: "#book" },
      { label: "Get a quote", href: "#quote" },
      { label: "Service centre", href: "#service" },
      { label: "Returns", href: "#returns" },
      { label: "Contact desk", href: "#contact" },
    ],
  },
]

const CONTACT: ReadonlyArray<FooterMegamapContactDetail> = [
  { label: "Workshop", value: "47 Central Ave, Oak Flats NSW 2529" },
  { label: "Front desk", value: "(02) 4256 7000", href: "tel:+61242567000" },
  { label: "Email", value: "fitters@mufflermen.example", href: "mailto:fitters@mufflermen.example" },
  { label: "Hours", value: "Mon-Fri 7:30am-5:30pm" },
]

const SOCIALS: ReadonlyArray<FooterMegamapSocial> = [
  { id: "fb", label: "Mufflermen on Facebook", href: "#facebook", icon: <FacebookGlyph /> },
  { id: "ig", label: "Mufflermen on Instagram", href: "#instagram", icon: <InstagramGlyph /> },
  { id: "yt", label: "Mufflermen on YouTube", href: "#youtube", icon: <YoutubeGlyph /> },
  { id: "mail", label: "Email Mufflermen", href: "mailto:fitters@mufflermen.example", icon: <Mail strokeWidth={1.6} /> },
]

const REGIONS: ReadonlyArray<FooterMegamapRegion> = [
  { code: "au-nsw", label: "Australia · NSW" },
  { code: "au-vic", label: "Australia · VIC" },
  { code: "au-qld", label: "Australia · QLD" },
  { code: "nz", label: "New Zealand" },
]

function BrandMark() {
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

export default function FooterMegamapPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 10 / Footer megamap"
        title="Footer megamap"
        description="Comprehensive site footer — brand block, 4-column sitemap, contact details, social row, legal fineprint, and a region selector."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Footer megamap" },
        ]}
      />

      <FooterMegamap
        brand={<BrandMark />}
        description="Stainless catbacks, ADR-stamped welds, and Manta-fit performance gear. Oak Flats since 1968."
        columns={COLUMNS}
        contact={CONTACT}
        socials={SOCIALS}
        legal="© 1968-2026 Mufflermen Pty Ltd. ABN 11 222 333 444. Workshop dispatches across the Illawarra & Shoalhaven."
        legalLinks={[
          { label: "Privacy", href: "#privacy" },
          { label: "Terms", href: "#terms" },
          { label: "Warranty", href: "#warranty" },
        ]}
        regions={REGIONS}
        selectedRegion="au-nsw"
      />
    </main>
  )
}
