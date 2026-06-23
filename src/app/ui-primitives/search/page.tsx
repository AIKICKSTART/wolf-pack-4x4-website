import type { Metadata } from "next"
import Link from "next/link"

import { FormPatternReferences } from "../components/forms-system"
import { PageHeader } from "../components/page-header"
import styles from "./search.module.css"

export const metadata: Metadata = {
  title: "Search Experience | UI Primitives",
}

interface SearchEntry {
  index: string
  title: string
  href: string
  description: string
  bonus?: boolean
}

const entries: ReadonlyArray<SearchEntry> = [
  {
    index: "01",
    title: "Global search bar",
    href: "/ui-primitives/search/global-bar",
    description:
      "Persistent top-of-app workshop search bar with kbd hint, clear button, and tone variants. Wider than the spotlight palette — designed to live in the masthead.",
  },
  {
    index: "02",
    title: "Inline search input",
    href: "/ui-primitives/search/inline-input",
    description:
      "In-page filter input with debounced pulse indicator and live result-count chip. Use above any list that supports client-side filtering.",
  },
  {
    index: "03",
    title: "Suggestion list",
    href: "/ui-primitives/search/suggestions",
    description:
      "Dropdown suggestions grouped by Recent, Popular, and Quick links. Keyboard-navigable with arrow keys plus Enter, ARIA listbox semantics.",
  },
  {
    index: "04",
    title: "History row",
    href: "/ui-primitives/search/history-row",
    description:
      "Single search-history entry: query text, semantic time element, optional result count, and a one-click remove control.",
  },
  {
    index: "05",
    title: "Faceted filter sidebar",
    href: "/ui-primitives/search/faceted-sidebar",
    description:
      "Sticky left rail with collapsible groups — checkboxes, chip facets, range sliders, toggles. Powers the long-form search results page.",
  },
  {
    index: "06",
    title: "Active filter chip bar",
    href: "/ui-primitives/search/active-filters",
    description:
      "Horizontal row of currently-applied filter chips. Each chip is dismissable; a Clear all pill blasts the whole set.",
  },
  {
    index: "07",
    title: "Results list",
    href: "/ui-primitives/search/results-list",
    description:
      "Vertical results list with mark-highlighted snippets, kind chips, and metadata. Supports compact and comfortable densities.",
  },
  {
    index: "08",
    title: "Result card",
    href: "/ui-primitives/search/result-card",
    description:
      "Generic search result card variant: thumbnail, source line, URL, snippet with query highlighting, and a tag rail.",
  },
  {
    index: "09",
    title: "Product result",
    href: "/ui-primitives/search/result-product",
    description:
      "Product-specific result card with SKU, supplier, fitment, stock state, price block, and a view-part CTA.",
  },
  {
    index: "10",
    title: "File result",
    href: "/ui-primitives/search/result-file",
    description:
      "File-type result card with kind-tinted icon (pdf, doc, image, sheet, zip), full path, size, modified time, and open CTA.",
  },
  {
    index: "11",
    title: "Person result",
    href: "/ui-primitives/search/result-person",
    description:
      "Person result card with avatar fallback, presence dot, role and workshop labels, and quick contact actions (mail / phone / chat).",
  },
  {
    index: "12",
    title: "Relevance bar",
    href: "/ui-primitives/search/relevance-bar",
    description:
      "Compact relevance score bar: 0–100% fill with tone-shifting gradient and a paired confidence chip — strong / partial / loose.",
  },
  {
    index: "13",
    title: "No results state",
    href: "/ui-primitives/search/no-results",
    description:
      "Search-specific empty state with alternative query chips, a request-this-search CTA, and a back-to-all-results link.",
  },
  {
    index: "14",
    title: "Analytics card",
    href: "/ui-primitives/search/analytics",
    description:
      "Admin-side search-analytics card composing the DataTable primitive with a 14-day Sparkline trend and zero-result-rate readout.",
  },
  {
    index: "15",
    title: "Full search scene",
    href: "/ui-primitives/search/full-scene",
    description:
      "Bonus composition: global bar, faceted sidebar, active filter chips, mixed result types (product / file / person), pagination, sort, and live count — all glued together.",
    bonus: true,
  },
]

export default function SearchIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="01 / Shared DNA"
        title="Search the workshop"
        description="The long-form search experience for the Mufflermen catalog, document store, and people directory — distinct from the spotlight command palette. Persistent search bars, faceted filters, results-list cards, relevance scoring, and the analytics card that powers the admin view."
        dnaSectionId="search"
      />
      <FormPatternReferences ids={["search-filter"]} />
      <section className={styles.section} aria-label="Search primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 search primitives</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Each route opens the primitive in isolation with a focused demo, an explanation of the
            Oak Flats use case, and accessible keyboard interaction. The full-scene composition
            wires them all together as a complete search page.
          </p>
        </header>
        <div className={styles.grid}>
          {entries.map((entry) => {
            const classes = [styles.thumb, entry.bonus && styles.thumbBonus]
              .filter(Boolean)
              .join(" ")
            return (
              <Link key={entry.href} className={classes} href={entry.href}>
                <span className={styles.thumbIndex}>{entry.index}</span>
                <h3 className={styles.thumbTitle}>{entry.title}</h3>
                <p className={styles.thumbCopy}>{entry.description}</p>
                <span className={styles.thumbFoot}>
                  {entry.bonus ? "Review full composition" : "Inspect primitive states"} <span aria-hidden="true">→</span>
                </span>
              </Link>
            )
          })}
        </div>
      </section>
    </main>
  )
}
