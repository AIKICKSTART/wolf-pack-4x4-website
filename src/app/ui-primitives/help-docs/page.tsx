import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../components/page-header"

import styles from "./help-docs.module.css"

export const metadata: Metadata = {
  title: "Help & Docs | UI Primitives",
}

interface HelpEntry {
  index: string
  title: string
  href: string
  description: string
}

const entries: ReadonlyArray<HelpEntry> = [
  {
    index: "01",
    title: "Spotlight cutout",
    href: "/ui-primitives/help-docs/spotlight",
    description:
      "Full-screen SVG mask that dims everything except a rectangular cutout aligned to the target.",
  },
  {
    index: "02",
    title: "Coach mark",
    href: "/ui-primitives/help-docs/coach-mark",
    description:
      "Floating pointer with title, body, and Next / Skip actions. Composes the rich popover primitive.",
  },
  {
    index: "03",
    title: "Tour controller",
    href: "/ui-primitives/help-docs/tour",
    description:
      "Orchestrates a multi-step guided tour by walking through ordered targets with cutout + coach mark.",
  },
  {
    index: "04",
    title: "Help center landing",
    href: "/ui-primitives/help-docs/help-center",
    description:
      "Help-center hero with search bar, categorised topic cards, popular articles, and contact-support.",
  },
  {
    index: "05",
    title: "Article surface",
    href: "/ui-primitives/help-docs/article",
    description:
      "Long-form article wrapper with byline, table-of-contents aside, prose body, and feedback row.",
  },
  {
    index: "06",
    title: "Callouts",
    href: "/ui-primitives/help-docs/callouts",
    description:
      "Info / warning / tip / danger callouts. Each has its own inline SVG icon, tone, title, and body.",
  },
  {
    index: "07",
    title: "Table of contents",
    href: "/ui-primitives/help-docs/toc",
    description:
      "Sticky right aside that highlights the currently visible heading via IntersectionObserver.",
  },
  {
    index: "08",
    title: "Doc breadcrumb",
    href: "/ui-primitives/help-docs/breadcrumb",
    description:
      "Breadcrumb tuned for docs — reuses the breadcrumb primitive with context-style separators.",
  },
  {
    index: "09",
    title: "Doc sidebar",
    href: "/ui-primitives/help-docs/sidebar",
    description:
      "Left-side nav with collapsible sections, nested links, and active highlight.",
  },
  {
    index: "10",
    title: "Doc search bar",
    href: "/ui-primitives/help-docs/search",
    description:
      "Docs-specific search with `/` to focus, recent searches, popular suggestions, and filters.",
  },
  {
    index: "11",
    title: "API reference card",
    href: "/ui-primitives/help-docs/api-reference",
    description:
      "Method + path + description + parameter table + request / response examples in one block.",
  },
  {
    index: "12",
    title: "Code playground",
    href: "/ui-primitives/help-docs/code-playground",
    description:
      "Side-by-side editor + preview with an Open in StackBlitz CTA. Editor uses the code-block primitive.",
  },
  {
    index: "13",
    title: "Release notes entry",
    href: "/ui-primitives/help-docs/release-notes",
    description:
      "Timeline entry with version badge, date, summary, categorised change chips, and read-more link.",
  },
  {
    index: "14",
    title: "Keyboard shortcuts overlay",
    href: "/ui-primitives/help-docs/keyboard-shortcuts",
    description:
      "Overlay showing every shortcut grouped by section. Uses the existing Kbd primitive.",
  },
  {
    index: "15",
    title: "Full article scene",
    href: "/ui-primitives/help-docs/full-article-page",
    description:
      "Composition scene putting sidebar, breadcrumb, article, table-of-contents, and callouts together.",
  },
]

export default function HelpDocsIndexPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="22 / Help & Docs"
        title="Help center, tours, articles, references"
        description="Every surface the Mufflermen workshop uses to onboard staff, document the platform, walk a customer through a feature, or announce a release. Each primitive lives on its own route with a focused demo."
      />
      <section className={styles.section} aria-label="Help and docs primitives index">
        <header className={styles.sectionHead}>
          <span className={styles.kicker}>Index · 14 primitives + 1 scene</span>
          <h2 className={styles.sectionTitle}>Pick a surface</h2>
          <p className={styles.subhead}>
            Every route opens the primitive in isolation with a workshop-flavoured demo. The
            full article scene composes the docs primitives end to end.
          </p>
        </header>
        <div className={styles.grid}>
          {entries.map((entry) => (
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
