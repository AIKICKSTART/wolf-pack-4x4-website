import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SearchResultsList } from "../../components/search"
import type { SearchResultItem } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "Results list | UI Primitives — Search",
}

const QUERY = "BA Falcon catback"

const RESULTS: ReadonlyArray<SearchResultItem> = [
  {
    id: "r1",
    title: "Magnaflow 14416 — BA Falcon catback, 2.5 inch",
    href: "#",
    kind: "product",
    kindLabel: "Part",
    snippet:
      "Stainless steel 2.5-inch catback exhaust system for BA Falcon sedan. Includes dual mufflers, polished tip, and ADR-compliant noise certification.",
    meta: ["SKU MF-14416", "In stock · 4", "Supplier Magnaflow"],
  },
  {
    id: "r2",
    title: "Fitment guide · BA Falcon exhaust systems",
    href: "#",
    kind: "doc",
    kindLabel: "Document",
    snippet:
      "Workshop-internal fitment guide for the BA Falcon catback range. Bracket spacing, hangers, and supercharged-variant clearance notes for the assistance of any new technician.",
    meta: ["PDF · 8 pages", "Updated 12 May 2026", "Owner Liv B."],
  },
  {
    id: "r3",
    title: "Job ticket 2415 · CHV-184 BA Falcon catback fit",
    href: "#",
    kind: "job",
    kindLabel: "Job",
    snippet:
      "Active workshop ticket — Bay 04, awaiting sign-off. Customer dropped off a BA Falcon for a Magnaflow catback fitment. Brent Holloway is the lead tech, started 09:14.",
    meta: ["Bay 04", "Status · awaiting sign-off", "Tech Brent H."],
  },
  {
    id: "r4",
    title: "Brent Holloway — Senior technician, Bay 01",
    href: "#",
    kind: "person",
    kindLabel: "Person",
    snippet:
      "Senior fitter; 12 years' experience on Ford and Holden falcon-platform catback installs. Available on shift Wednesday through Saturday at the Oak Flats workshop.",
    meta: ["+61 4 0000 0000", "brent@mufflermen.au", "Active"],
  },
]

export default function ResultsListPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 07"
        title="Results list"
        description="The long-form results list. Snippets and titles highlight matching query tokens via the semantic mark element; each item has a kind chip and a small meta rail. Compact and comfortable densities supported."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Results list" },
        ]}
      />
      <section className={styles.canvas} aria-label="Results list demo">
        <div className={styles.note}>
          <span>Highlighting</span>
          <p>
            The query is rendered as <code>mark</code> tags inside the matched substrings. Screen
            readers announce highlighted text natively, and reduced-motion users still get the same
            visual emphasis without animation churn.
          </p>
        </div>
        <div className={styles.stage}>
          <div className={styles.stageGrid}>
            <div className={styles.subStage}>
              <h4>Comfortable density (default)</h4>
              <SearchResultsList query={QUERY} results={RESULTS} totalCount={427} />
            </div>
            <div className={styles.subStage}>
              <h4>Compact density</h4>
              <SearchResultsList query={QUERY} results={RESULTS} variant="compact" totalCount={427} />
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
