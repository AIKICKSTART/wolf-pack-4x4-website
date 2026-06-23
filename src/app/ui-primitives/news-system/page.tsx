import type { Metadata } from "next"
import type { ReactNode } from "react"

import { PageHeader } from "../components/page-header"
import {
  BreakingNewsBanner,
  FeaturedNewsHero,
  NewsCard,
  NewsCategoryTabs,
  NewsIndex,
  NewsMetaRow,
  NewsTickerStrip,
  PressReleaseLayout,
} from "../components/news-system"
import {
  BREAKING_NEWS,
  CATEGORY_TABS,
  FEATURED_NEWS,
  NEWS_ITEMS,
  PRESS_RELEASE,
  TICKER_ENTRIES,
} from "../components/news-system"

import styles from "./news-system.module.css"

export const metadata: Metadata = {
  title: "News system | UI Primitives",
  description:
    "Token-driven news primitives for Oak Flats Mufflermen — index list/grid, news cards, breaking banner, featured hero, press-release layout, category tabs, ticker strip, and meta row.",
}

interface ShowcaseSpec {
  id: string
  index: string
  title: string
  blurb: string
  /** Frame width hint demonstrated for this primitive. */
  viewport?: "mobile" | "tablet" | "desktop" | "fluid"
}

const SECTIONS: ReadonlyArray<ShowcaseSpec> = [
  { id: "ticker", index: "01", title: "News ticker strip", blurb: "Auto-scrolling newswire marquee, pauses on hover/focus, halts under reduced-motion.", viewport: "fluid" },
  { id: "breaking", index: "02", title: "Breaking news banner", blurb: "Dismissible high-priority alert with metallic-red CTA and live sweep.", viewport: "fluid" },
  { id: "hero", index: "03", title: "Featured news hero", blurb: "Editorial lead story with secondary rail and primary CTA.", viewport: "desktop" },
  { id: "tabs", index: "04", title: "Category tabs", blurb: "Roving-tabindex ARIA tablist with per-category tone and counts.", viewport: "fluid" },
  { id: "index", index: "05", title: "News index", blurb: "Grid/list switch over the full story collection.", viewport: "desktop" },
  { id: "card", index: "06", title: "News card", blurb: "Grid and list card variants with timestamp, source tag, headline, summary.", viewport: "tablet" },
  { id: "meta", index: "07", title: "News meta row", blurb: "Composable source tag + timestamp + read-time row, default and compact.", viewport: "mobile" },
  { id: "press", index: "08", title: "Press release layout", blurb: "Formal dateline, standfirst, sections, and media-contact block.", viewport: "tablet" },
]

const VIEWPORT_CLASS: Record<NonNullable<ShowcaseSpec["viewport"]>, string> = {
  mobile: styles.frameMobile,
  tablet: styles.frameTablet,
  desktop: styles.frameDesktop,
  fluid: styles.frameFluid,
}

const VIEWPORT_LABEL: Record<NonNullable<ShowcaseSpec["viewport"]>, string> = {
  mobile: "320–420px",
  tablet: "768px",
  desktop: "1024px+",
  fluid: "Fluid 320–1920px",
}

function SectionShell({ spec, children }: { spec: ShowcaseSpec; children: ReactNode }) {
  const viewport = spec.viewport ?? "fluid"
  return (
    <section className={styles.section} id={spec.id} aria-labelledby={`${spec.id}-title`}>
      <header className={styles.sectionHead}>
        <span className={styles.sectionIndex}>{spec.index}</span>
        <div className={styles.sectionMeta}>
          <h2 className={styles.sectionTitle} id={`${spec.id}-title`}>
            {spec.title}
          </h2>
          <p className={styles.sectionBlurb}>{spec.blurb}</p>
        </div>
        <span className={styles.viewportBadge}>{VIEWPORT_LABEL[viewport]}</span>
      </header>
      <div className={styles.stage}>
        <div className={[styles.frame, VIEWPORT_CLASS[viewport]].join(" ")}>{children}</div>
      </div>
    </section>
  )
}

export default function NewsSystemShowcasePage() {
  const specBy = (id: string): ShowcaseSpec => SECTIONS.find((s) => s.id === id) as ShowcaseSpec

  return (
    <main className={styles.page}>
      <PageHeader
        kicker="News system / 8 primitives"
        title="News system"
        description="The Oak Flats Mufflermen newsroom kit — index, cards, breaking banner, featured hero, press-release layout, category tabs, ticker, and meta row. Fully token-driven across light and dark; responsive from 320 to 1920."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "News system" },
        ]}
      />

      <p className={styles.themeNote}>
        Every surface reads from the central <code>--primitive-*</code> tokens — flip the theme
        toggle in the shell to see light and dark parity. Each stage below is width-constrained to
        demonstrate its responsive behaviour.
      </p>

      <div className={styles.sections}>
        <SectionShell spec={specBy("ticker")}>
          <NewsTickerStrip entries={TICKER_ENTRIES} />
        </SectionShell>

        <SectionShell spec={specBy("breaking")}>
          <BreakingNewsBanner item={BREAKING_NEWS} />
        </SectionShell>

        <SectionShell spec={specBy("hero")}>
          <FeaturedNewsHero item={FEATURED_NEWS} secondary={NEWS_ITEMS.slice(2, 5)} />
        </SectionShell>

        <SectionShell spec={specBy("tabs")}>
          <NewsCategoryTabs tabs={CATEGORY_TABS} />
        </SectionShell>

        <SectionShell spec={specBy("index")}>
          <NewsIndex items={NEWS_ITEMS} />
        </SectionShell>

        <SectionShell spec={specBy("card")}>
          <div className={styles.cardPair}>
            <NewsCard item={NEWS_ITEMS[2]} layout="grid" />
            <NewsCard item={NEWS_ITEMS[3]} layout="list" />
          </div>
        </SectionShell>

        <SectionShell spec={specBy("meta")}>
          <div className={styles.metaStack}>
            <NewsMetaRow
              source={NEWS_ITEMS[0].source}
              publishedAt={NEWS_ITEMS[0].publishedAt}
              readMinutes={NEWS_ITEMS[0].readMinutes}
              category={NEWS_ITEMS[0].category}
            />
            <NewsMetaRow
              source={NEWS_ITEMS[4].source}
              publishedAt={NEWS_ITEMS[4].publishedAt}
              category={NEWS_ITEMS[4].category}
              timestamp="absolute"
            />
            <NewsMetaRow
              source={NEWS_ITEMS[3].source}
              publishedAt={NEWS_ITEMS[3].publishedAt}
              category={NEWS_ITEMS[3].category}
              size="compact"
            />
          </div>
        </SectionShell>

        <SectionShell spec={specBy("press")}>
          <PressReleaseLayout
            dateline={PRESS_RELEASE.dateline}
            location={PRESS_RELEASE.location}
            title={PRESS_RELEASE.title}
            standfirst={PRESS_RELEASE.standfirst}
            sections={PRESS_RELEASE.sections}
            contact={PRESS_RELEASE.contact}
          />
        </SectionShell>
      </div>

      <p className={styles.footnote} aria-hidden="true">
        {NEWS_ITEMS.length} stories · 8 primitives · visual reference only
      </p>
    </main>
  )
}
