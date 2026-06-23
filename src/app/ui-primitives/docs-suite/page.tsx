import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./docs-suite.module.css"

export const metadata: Metadata = {
  title: "Docs Suite | UI Primitives",
}

interface DocsSuiteEntry {
  index: string
  title: string
  href: string
  description: string
}

const ENTRIES: ReadonlyArray<DocsSuiteEntry> = [
  {
    index: "01",
    title: "Article browser grid",
    href: "/ui-primitives/docs-suite/article-browser",
    description:
      "Filterable article grid keyed by surface (Operator Manual, Trade API, Pricing, Hermes) with read time + difficulty.",
  },
  {
    index: "02",
    title: "Version selector",
    href: "/ui-primitives/docs-suite/version-selector",
    description:
      "Picks between v1.0, v2.0 (current), and v3.0-beta. Flags breaking-change releases inline.",
  },
  {
    index: "03",
    title: "MDX block renderer",
    href: "/ui-primitives/docs-suite/mdx-block-renderer",
    description:
      "Renders the six MDX block kinds the docs platform supports: prose, code, note, warning, diff, tabs.",
  },
  {
    index: "04",
    title: "Footer nav row",
    href: "/ui-primitives/docs-suite/footer-nav-row",
    description:
      "Previous / next article cells at the bottom of every doc. Carries the relation hint when present.",
  },
  {
    index: "05",
    title: "Docs search modal",
    href: "/ui-primitives/docs-suite/docs-search-modal",
    description:
      "Cmd+K command palette grouped by Manual, API, Playbook, and History. Keyboard navigable end to end.",
  },
  {
    index: "06",
    title: "Table of contents rail",
    href: "/ui-primitives/docs-suite/toc-rail",
    description:
      "Auto-built TOC with IntersectionObserver scroll-spy and a section-progress bar.",
  },
  {
    index: "07",
    title: "Article meta card",
    href: "/ui-primitives/docs-suite/article-meta",
    description:
      "Author, editor, last-update timestamp, version, and the rolling contributor list in one card.",
  },
  {
    index: "08",
    title: "Feedback helpful strip",
    href: "/ui-primitives/docs-suite/feedback-strip",
    description:
      "Was this helpful? thumbs strip with an optional 280-char comment box that submits in place.",
  },
  {
    index: "09",
    title: "Related articles grid",
    href: "/ui-primitives/docs-suite/related-articles",
    description:
      "Three-up grid of related reads keyed by surface label, with a per-card read-time and excerpt.",
  },
  {
    index: "10",
    title: "Glossary tooltip trigger",
    href: "/ui-primitives/docs-suite/glossary-tooltip",
    description:
      "Underlined inline term that reveals its definition on hover or focus. Links into the full glossary.",
  },
  {
    index: "11",
    title: "API reference card",
    href: "/ui-primitives/docs-suite/api-reference-card",
    description:
      "Method + path + parameter table + try-it link for any trade-account API endpoint.",
  },
  {
    index: "12",
    title: "Changelog strip",
    href: "/ui-primitives/docs-suite/changelog-strip",
    description:
      "Compact strip of recent changes on the current doc page. Added / Fixed / Changed / Deprecated.",
  },
  {
    index: "13",
    title: "Breadcrumb doc trail",
    href: "/ui-primitives/docs-suite/breadcrumb-doc-trail",
    description:
      "Hierarchical breadcrumb with a page-tree dropdown on the last crumb to jump between sibling pages.",
  },
  {
    index: "14",
    title: "Edit on GitHub banner",
    href: "/ui-primitives/docs-suite/edit-on-github",
    description:
      "Banner showing last-commit info + repo path with an Edit-this-page CTA into mufflermen/docs.",
  },
  {
    index: "15",
    title: "Full docs scene",
    href: "/ui-primitives/docs-suite/full-docs",
    description:
      "Composition scene that wires breadcrumb, banner, meta card, MDX, TOC, feedback, related, and footer.",
  },
]

export default function DocsSuiteIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="23 / Docs Suite"
        title="Docs platform for the Mufflermen workshop"
        description="The 14 primitives that compose the Mufflermen docs platform — operator manual, trade-account API, pricing engine, and the Hermes chat playbook. Each surface lives on its own route with a workshop-flavoured demo."
      />
      <section className={styles.section} aria-label="Docs suite primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives + 1 scene</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Every route opens the primitive in isolation with a Mufflermen-flavoured demo. The
            full docs scene composes everything end to end.
          </p>
        </header>
        <div className={styles.grid}>
          {ENTRIES.map((entry) => (
            <Link key={entry.href} className={styles.thumb} href={entry.href}>
              <span className={styles.thumbIndex}>{entry.index}</span>
              <h3 className={styles.thumbTitle}>{entry.title}</h3>
              <p className={styles.thumbCopy}>{entry.description}</p>
              <span className={styles.thumbFoot}>
                Inspect primitive states <span aria-hidden="true">→</span>
              </span>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
