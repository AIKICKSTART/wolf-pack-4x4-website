import type { Metadata } from "next"

import { FrontmatterPanel } from "../../components/content-studio"
import { PageHeader } from "../../components/page-header"

import { AUTHORS, HERO_FRONTMATTER } from "../_mock-data"
import styles from "../content-studio.module.css"

export const metadata: Metadata = {
  title: "Frontmatter panel | Content studio",
  description:
    "Primitive 03 — title, slug, excerpt, cover alt, category, tag, and author editor. Three states — Workshop tale, Tech explainer, Customer story.",
}

const TECH_EXPLAINER = {
  ...HERO_FRONTMATTER,
  title: "ADR 83/00 in plain English — what 'loud' really means",
  slug: "adr-83-00-plain-english",
  excerpt:
    "Decibels, drive-by tests, and the 90 dB(A) bit roadside cops actually measure — for everyone who copped a defect notice last week.",
  category: "tech-explainers" as const,
  tags: ["adr-49", "adr-83-00", "exhaust-noise", "compliance"],
  authorIds: [AUTHORS.hermes.id, AUTHORS.mia.id],
  estimatedReadMinutes: 10,
}

const CUSTOMER_STORY = {
  ...HERO_FRONTMATTER,
  title: "Sam's 1986 LandCruiser restoration — exhaust chapter",
  slug: "sam-1986-landcruiser-restoration",
  excerpt:
    "Why we walked away from the original cast-iron manifold and built Sam's HJ60 a custom mandrel-bent stainless 2.5\" system from scratch.",
  category: "customer-stories" as const,
  tags: ["landcruiser-hj60", "restoration", "stainless-steel", "custom-build"],
  authorIds: [AUTHORS.daniel.id, AUTHORS.ben.id, AUTHORS.jordan.id],
  estimatedReadMinutes: 8,
}

const AUTHOR_CHIPS_HERO = [
  { id: AUTHORS.daniel.id, label: "Daniel F." },
  { id: AUTHORS.mia.id, label: "Mia P." },
  { id: AUTHORS.ben.id, label: "Ben S." },
]

const AUTHOR_CHIPS_TECH = [
  { id: AUTHORS.hermes.id, label: "Hermes Bot" },
  { id: AUTHORS.mia.id, label: "Mia P." },
]

const AUTHOR_CHIPS_CUSTOMER = [
  { id: AUTHORS.daniel.id, label: "Daniel F." },
  { id: AUTHORS.ben.id, label: "Ben S." },
  { id: AUTHORS.jordan.id, label: "Jordan M." },
]

export default function FrontmatterPanelScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 03 / Frontmatter panel"
        title="Frontmatter panel"
        description="Every long-form article carries title, slug, excerpt, cover alt text, category, tags, authors, and a scheduled publish time. Three states — Workshop Tales (default), Tech Explainers, Customer Stories."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Content studio", href: "/ui-primitives/content-studio" },
          { label: "Frontmatter panel" },
        ]}
      />
      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Live primitive · 3 states</span>
        <div className={styles.demoStack}>
          <FrontmatterPanel
            frontmatter={HERO_FRONTMATTER}
            authorChips={AUTHOR_CHIPS_HERO}
          />
          <FrontmatterPanel
            frontmatter={TECH_EXPLAINER}
            authorChips={AUTHOR_CHIPS_TECH}
          />
          <FrontmatterPanel
            frontmatter={CUSTOMER_STORY}
            authorChips={AUTHOR_CHIPS_CUSTOMER}
          />
        </div>
      </section>
    </main>
  )
}
