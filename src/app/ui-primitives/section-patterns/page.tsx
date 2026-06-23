import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import styles from "../ui-primitives.module.css"
import local from "../foundation-dna.module.css"

export const metadata: Metadata = {
  title: "Section Patterns | UI Primitives",
}

const sectionPatterns = [
  ["Hero", "First viewport signal with media, value, proof, and one primary action.", "website / marketing"],
  ["Proof", "Reviews, logos, before-after, metrics, compliance, and workshop evidence.", "trust"],
  ["Feature", "Single feature row, grid, comparison, or spotlight with reversible layout.", "content"],
  ["Process", "Stepper, timeline, workflow, checklist, and service flow sections.", "operations"],
  ["Pricing", "Service packages, comparison tables, tier cards, and quote prompts.", "commerce"],
  ["FAQ", "Searchable question groups, accordions, support notes, and edge-case copy.", "support"],
  ["CTA", "Conversion band, sticky action, newsletter, booking, and quote request.", "conversion"],
  ["Footer", "Megamap, contact, service areas, socials, legal, and local business proof.", "navigation"],
  ["Dashboard", "KPI header, work queue, charts, activity feed, and command bar.", "data"],
  ["Workshop", "Job board, hoist bay, fitment, handover, quote, and proof capture.", "workshop"],
  ["Product", "Product media, fitment, specs, supplier, price, and add-to-quote action.", "parts"],
  ["Form", "Contact, booking, quote, survey, upload, auth, and checkout flows.", "forms"],
  ["Media", "Video hero, gallery, before-after, audio, 3D, and lightbox patterns.", "media"],
  ["State", "Empty, loading, error, offline, success, maintenance, and 404 sections.", "system"],
  ["Utility", "Search, filter, file browser, docs, command, and developer surfaces.", "utility"],
] as const

const patternRules = [
  ["Manifest first", "Section-library entries keep BlockManifest shape unchanged and declare token dependencies."],
  ["Foundation trace", "Every section names the wireframe, layout, sizing, surface, action, and state primitive it consumes."],
  ["No local buttons", "Sections use Actions DNA for command sizing and visual variants."],
  ["No local cards", "Section cards consume Surfaces and Sizing DNA before domain styling."],
  ["Responsive proof", "Each pattern documents desktop, tablet, and mobile behavior before promotion."],
] as const

export default function SectionPatternsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Full-section pattern DNA"
        description="The complete set of full page-section types that downstream websites, CMS pages, workshop tools, dashboards, and agent surfaces can display without fragmenting the primitive system."
        dnaSectionId="section-patterns"
      />

      <div className={local.board}>
        <section className={local.section} aria-labelledby="pattern-library">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Section taxonomy</span>
            <h2 id="pattern-library">The full-section basis of the system</h2>
            <p>
              These are the section-level building blocks. Existing section-library
              groups can keep their local content, but their structure should map to
              this taxonomy so future pages align by default.
            </p>
          </div>

          <div className={local.patternGrid}>
            {sectionPatterns.map(([title, summary, category], index) => (
              <article key={title} className={local.pattern}>
                <span className={local.index}>P-{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{summary}</p>
                <div className={local.tags}>
                  <span>{category}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={local.section} aria-labelledby="pattern-rules">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Promotion rules</span>
            <h2 id="pattern-rules">How sections graduate into the library</h2>
          </div>
          <div className={local.grid}>
            {patternRules.map(([title, rule], index) => (
              <article key={title} className={local.card}>
                <span className={local.index}>G-{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{rule}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
