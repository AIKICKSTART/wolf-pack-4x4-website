import type { Metadata } from "next"

import { PageHeader } from "../components/page-header"
import styles from "../ui-primitives.module.css"
import local from "../foundation-dna.module.css"

export const metadata: Metadata = {
  title: "Layouts | UI Primitives",
}

const layouts = [
  {
    title: "Balanced split",
    ratio: "50 / 50",
    className: local.split5050,
    rule: "Use for equal copy/media, paired comparisons, or two related work panes.",
  },
  {
    title: "Primary split",
    ratio: "60 / 40",
    className: local.split6040,
    rule: "Use when one side carries the decision and the other side carries proof or media.",
  },
  {
    title: "Workbench split",
    ratio: "70 / 30",
    className: local.split7030,
    rule: "Use for editor/canvas plus inspector, dense dashboards, and operational consoles.",
  },
  {
    title: "Rail layout",
    ratio: "rail / body",
    className: local.railLayout,
    rule: "Use for navigation, filters, file trees, command palettes, and inspector rails.",
  },
  {
    title: "Full band",
    ratio: "header / body / footer",
    className: local.bandLayout,
    rule: "Use for full-width sections, heroes, CTAs, tables, and page-level state bands.",
  },
  {
    title: "Responsive stack",
    ratio: "single column",
    className: local.stackLayout,
    rule: "Use below tablet width; content stacks before text, controls, or media squeeze.",
  },
] as const

const spacingRules = [
  ["Page gutter", "28px desktop, 18px mobile, inherited from the Shared DNA shell."],
  ["Section gap", "Use space 7/8 for dense app routes and space 12+ for marketing bands."],
  ["Card gap", "Use space 3/4 for internal card rhythm; do not invent local micro-grids."],
  ["Split collapse", "All two-column splits collapse to one column before content overflows."],
  ["Rails", "Rails keep fixed intent and flexible body; avoid nested scroll containers unless needed."],
  ["Full bleed", "Full sections may fill width, but inner content still has a constrained readable line."],
] as const

export default function LayoutsPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Layout, spacing, and splits"
        description="Gutters, max widths, split ratios, rails, full-width bands, stacks, and responsive collapse rules that stop downstream primitives from inventing page structure."
        dnaSectionId="layouts"
      />

      <div className={local.board}>
        <section className={local.section} aria-labelledby="layout-patterns">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Layout contracts</span>
            <h2 id="layout-patterns">The approved structural moves</h2>
            <p>
              These are the only default page and section structures. Product routes can
              compose them, but they should not create unrelated split ratios, hidden
              gutters, or isolated responsive behavior.
            </p>
          </div>

          <div className={local.threeGrid}>
            {layouts.map((item, index) => (
              <article key={item.title} className={local.card}>
                <span className={local.index}>L-{String(index + 1).padStart(2, "0")}</span>
                <div className={`${local.layoutDiagram} ${item.className}`} aria-hidden="true">
                  <div className={`${local.wire} ${local.wireStrong}`} />
                  <div className={local.wire} />
                  <div className={`${local.wire} ${local.wireAmber}`} />
                  <div className={local.wire} />
                </div>
                <h3>{item.title}</h3>
                <span className={local.meta}>{item.ratio}</span>
                <p>{item.rule}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={local.section} aria-labelledby="spacing-rules">
          <div className={local.sectionHeader}>
            <span className={local.kicker}>Spacing rules</span>
            <h2 id="spacing-rules">Rhythm that every section inherits</h2>
          </div>
          <div className={local.grid}>
            {spacingRules.map(([title, rule], index) => (
              <article key={title} className={local.pattern}>
                <span className={local.index}>S-{String(index + 1).padStart(2, "0")}</span>
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
