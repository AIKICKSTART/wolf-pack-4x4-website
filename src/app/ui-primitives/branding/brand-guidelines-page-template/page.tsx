import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  BrandGuidelinesPageTemplate,
  BrandVoiceSlider,
  ColorRolesGrid,
  LogoLockup,
  TypePairingCard,
  type BrandGuidelinesSection,
  type BrandVoiceAxis,
  type ColorRoleEntry,
} from "../../components/branding"

import styles from "../branding.module.css"

export const metadata: Metadata = {
  title: "Guidelines template | Branding Lab",
  description:
    "Primitive 14 — long-form brand guidelines template scaffold with cover, table of contents, and chapter slots.",
}

const ROLES: ReadonlyArray<ColorRoleEntry> = [
  {
    role: "Primary",
    description: "Workshop red. Reserved for the brand mark and primary actions.",
    background: "#E62028",
    foreground: "#FFFFFF",
    pairingLabel: "PRIMARY",
  },
  {
    role: "Surface",
    description: "Bay graphite. The default canvas for marketing and product surfaces.",
    background: "#101016",
    foreground: "#F6F6F8",
    pairingLabel: "SURFACE",
  },
  {
    role: "Accent",
    description: "Service amber. Used sparingly for hot tips and emphasis.",
    background: "#FFC14F",
    foreground: "#1A1306",
    pairingLabel: "ACCENT",
  },
]

const AXES: ReadonlyArray<BrandVoiceAxis> = [
  {
    id: "formality",
    leftLabel: "Formal",
    rightLabel: "Casual",
    defaultValue: 72,
    helper: "Counter-warm, never mate-y. Stay short of mateship clichés.",
  },
  {
    id: "tone",
    leftLabel: "Serious",
    rightLabel: "Playful",
    defaultValue: 34,
    helper: "Serious by default. Playful only on staff comms and social.",
  },
  {
    id: "restraint",
    leftLabel: "Restrained",
    rightLabel: "Bold",
    defaultValue: 68,
    helper: "Bold in marketing; restrained in docs and invoices.",
  },
]

const SECTIONS: ReadonlyArray<BrandGuidelinesSection> = [
  {
    id: "identity",
    number: "01",
    title: "Identity",
    description: "Mark, lockups, clear-space, and approved configurations.",
    content: (
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 18 }}>
        <LogoLockup variant="stacked" />
        <LogoLockup variant="horizontal" />
      </div>
    ),
  },
  {
    id: "colour",
    number: "02",
    title: "Colour",
    description: "Semantic colour roles and the surfaces they belong on.",
    content: <ColorRolesGrid roles={ROLES} />,
  },
  {
    id: "typography",
    number: "03",
    title: "Typography",
    description: "Display + body pairing and the rationale behind the voice it carries.",
    content: (
      <TypePairingCard
        pairingName="Display + Body"
        headingFont="Anton, Impact, sans-serif"
        bodyFont="Inter, Arial, sans-serif"
        headingExample="Built properly. Not pretty — proper."
        bodyExample="Anton carries the workshop marquee. Inter handles every label, paragraph, and number underneath it."
        rationale="Industrial cut + neutral body. The pair lets the headline shout without making the page feel salesy."
      />
    ),
  },
  {
    id: "voice",
    number: "04",
    title: "Voice",
    description: "Three sliders capture where the brand sits across formality, tone, and restraint.",
    content: <BrandVoiceSlider axes={AXES} />,
  },
]

export default function BrandGuidelinesPageTemplatePage() {
  return (
    <main className={styles.bookMain}>
      <PageHeader
        kicker="Primitive 14 / Guidelines"
        title="Brand guidelines template"
        description="A long-form template — cover spread, table of contents, and four numbered chapters that compose the other branding primitives into a printable brand book."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Branding lab", href: "/ui-primitives/branding" },
          { label: "Guidelines template" },
        ]}
      />
      <BrandGuidelinesPageTemplate
        workmark="Oak Flats Mufflermen"
        tagline="Workshop · Exhaust · Tuning"
        versionLabel="Brand book · v3.2"
        intro="The Oak Flats Mufflermen brand book is the workshop's identity, voice, and asset bible. Every customer-facing surface — invoices, signage, marketing pages, livery — follows the rules in here."
        sections={SECTIONS}
      />
    </main>
  )
}
