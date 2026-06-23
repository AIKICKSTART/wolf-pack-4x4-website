import type { Metadata } from "next"
import type { ReactNode } from "react"

import { PageHeader } from "../components/page-header"
import {
  AuthorByline,
  BlogCard,
  BlogIndexGrid,
  BlogNewsletterCta,
  BlogPostLayout,
  FeaturedPostHero,
  PrevNextNav,
  RelatedPostsRow,
  ShareRow,
  TableOfContents,
} from "../components/blog-system"

import {
  CATEGORIES,
  POST_BODY,
  POSTS,
  SHARE_TARGETS,
  TOC,
} from "./sample-data"
import styles from "./blog-system.module.css"

export const metadata: Metadata = {
  title: "Blog system | UI Primitives",
  description:
    "A premium, token-driven editorial blog primitive family for Oak Flats Mufflermen — index grid, cards, featured hero, full post layout, byline, filters, related row, newsletter CTA, prev/next nav, and table of contents.",
}

const FEATURED = POSTS[0]
const FILTERABLE = POSTS
const BLOG_DNA = [
  {
    label: "Editorial surfaces",
    value: "Cards, heroes, article shells, TOCs, and related rows share one section taxonomy.",
  },
  {
    label: "Reading rhythm",
    value: "Typography tokens control headline scale, lede density, body cadence, and captions.",
  },
  {
    label: "Conversion handoff",
    value: "Newsletter and share actions inherit Button DNA, focus rings, and feedback states.",
  },
] as const

interface SectionProps {
  index: string
  title: string
  note: string
  children: ReactNode
}

function Section({ index, title, note, children }: SectionProps) {
  return (
    <section className={styles.section} aria-label={title}>
      <header className={styles.sectionHead}>
        <span className={styles.sectionIndex}>{index}</span>
        <h2 className={styles.sectionTitle}>{title}</h2>
        <p className={styles.sectionNote}>{note}</p>
      </header>
      {children}
    </section>
  )
}

export default function BlogSystemPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Editorial / Blog system"
        title="Blog system"
        description="Eleven token-driven editorial primitives for the Oak Flats Mufflermen public site — a filterable index grid, cards, a featured hero, the full post layout with rich body slots, author byline, category filters, related row, newsletter CTA, prev/next nav, and a scroll-spy table of contents. Every value is drawn from the central design tokens, so light, dark, and responsive all re-theme from one place."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Blog system" },
        ]}
        dnaSectionId="section-patterns"
      />

      <section className={styles.dnaPanel} aria-labelledby="blog-dna-title">
        <div>
          <span className={styles.dnaKicker}>Blog shared DNA</span>
          <h2 id="blog-dna-title">Connected editorial primitives</h2>
          <p>
            The blog system now advertises its shared contract at the index level:
            section patterns provide layout, typography sets reading hierarchy, surfaces
            frame editorial cards, and action DNA handles conversion and sharing.
          </p>
        </div>
        <dl>
          {BLOG_DNA.map((item) => (
            <div key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      <span className={styles.notice}>
        Composable editorial surfaces — drop-in for the public blog
      </span>

      {/* 01 — Featured post hero */}
      <Section
        index="Primitive 01"
        title="Featured post hero"
        note="Large editorial hero for the lead story — image, category chip, headline, dek, expanded byline, and a metallic-paint CTA. Reverses to a stacked layout under 880px."
      >
        <div className={styles.well}>
          <FeaturedPostHero post={FEATURED} />
        </div>
      </Section>

      {/* 02 — Blog card */}
      <Section
        index="Primitive 02"
        title="Blog card"
        note="The atomic unit — cover image with category chip, clamped title and excerpt, and an author byline footer. Vertical for grids, horizontal for list rows. Hover lifts the card and gently scales the cover."
      >
        <div className={styles.viewports}>
          <div className={styles.viewportRow}>
            <div className={`${styles.viewport} ${styles.viewportMobile}`}>
              <span className={styles.viewportLabel}>320 — mobile</span>
              <div className={styles.device}>
                <BlogCard post={POSTS[1]} />
              </div>
            </div>
            <div className={`${styles.viewport} ${styles.deviceWide}`}>
              <span className={styles.viewportLabel}>Horizontal — list row</span>
              <div className={styles.device}>
                <BlogCard post={POSTS[2]} orientation="horizontal" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 03 — Blog index grid (filterable) */}
      <Section
        index="Primitive 03"
        title="Blog index grid"
        note="A responsive, filterable card grid. The category filter is a keyboard-operable radio group; selecting a section narrows the grid live. Auto-fills from three columns down to one."
      >
        <div className={styles.well}>
          <BlogIndexGrid posts={FILTERABLE} categories={CATEGORIES} />
        </div>
      </Section>

      {/* 04 — Category filter bar is shown inside the grid; demo standalone byline */}
      <Section
        index="Primitive 04"
        title="Author byline"
        note="Avatar (image or initials monogram), name, dateline, and reading time. Compact for cards; expanded adds the role and bio for post headers."
      >
        <div className={`${styles.well} ${styles.demoStack}`}>
          <div className={styles.toolbar}>
            <AuthorByline
              author={POSTS[0].author}
              date={POSTS[0].date}
              readingMinutes={POSTS[0].readingMinutes}
            />
          </div>
          <AuthorByline author={POSTS[2].author} size="expanded" />
        </div>
      </Section>

      {/* 05 — Table of contents */}
      <Section
        index="Primitive 05"
        title="Table of contents"
        note="Scroll-spy navigation that highlights the section in view via IntersectionObserver. Anchors are keyboard focusable with a visible ring; the active marker extends and turns brand-red."
      >
        <div className={styles.well}>
          <TableOfContents entries={TOC} />
        </div>
      </Section>

      {/* 06 — Share row */}
      <Section
        index="Primitive 06"
        title="Share row"
        note="Round share controls with hover tooltips. The copy-link action writes the canonical URL to the clipboard and announces the result to assistive tech."
      >
        <div className={styles.well}>
          <ShareRow targets={SHARE_TARGETS} url="https://oakflatsmufflermen.example/blog" />
        </div>
      </Section>

      {/* 07 — Prev / next nav */}
      <Section
        index="Primitive 07"
        title="Prev / next nav"
        note="Two-up post navigation with direction arrows, category, and a clamped title. Falls back to muted end-of-log placeholders when there is no neighbour, and stacks under 640px."
      >
        <div className={styles.well}>
          <PrevNextNav previous={POSTS[2]} next={POSTS[0]} />
        </div>
      </Section>

      {/* 08 — Related posts row */}
      <Section
        index="Primitive 08"
        title="Related posts row"
        note="A three-up row of related cards under an article. Collapses to two, then one column on narrow viewports."
      >
        <div className={styles.well}>
          <RelatedPostsRow posts={[POSTS[1], POSTS[2], POSTS[5]]} />
        </div>
      </Section>

      {/* 09 — Newsletter CTA */}
      <Section
        index="Primitive 09"
        title="Blog newsletter CTA"
        note="Conversion block built on the central button DNA — metallic-red primary that shifts to metallic-amber on hover. Carbon-fibre weave under the surface, single email field, and status feedback."
      >
        <div className={styles.well}>
          <BlogNewsletterCta
            heading="Get the next teardown in your inbox"
            body="One email a month — what's been on the dyno, what we learned, and any Illawarra trade nights coming up."
            ctaLabel="Subscribe"
          />
        </div>
      </Section>

      {/* 10 — Category filter (standalone responsive) */}
      <Section
        index="Primitive 10"
        title="Responsive composition"
        note="The index grid at three breakpoints — 320 mobile, 768 tablet, and full desktop — proving the grid, filter bar, and cards reflow cleanly across the range."
      >
        <div className={styles.viewports}>
          <div className={styles.viewportRow}>
            <div className={`${styles.viewport} ${styles.viewportMobile}`}>
              <span className={styles.viewportLabel}>320 — mobile</span>
              <div className={styles.device}>
                <BlogIndexGrid
                  posts={POSTS.slice(0, 3)}
                  categories={CATEGORIES}
                  heading="Mobile"
                  kicker="320px"
                />
              </div>
            </div>
            <div className={`${styles.viewport} ${styles.viewportTablet}`}>
              <span className={styles.viewportLabel}>768 — tablet</span>
              <div className={styles.device}>
                <BlogIndexGrid
                  posts={POSTS.slice(0, 4)}
                  categories={CATEGORIES}
                  heading="Tablet"
                  kicker="768px"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 11 — Full sample post */}
      <Section
        index="Primitive 11"
        title="Full post layout — sample article"
        note="The complete reading experience: header chip + dateline, hero, lede, rich body slots (headings, paragraphs, list, inline media, pull-quote), a sticky table-of-contents aside, then tags and a share row in the footer."
      >
        <div className={styles.well}>
          <BlogPostLayout
            categoryLabel={FEATURED.categoryLabel}
            accent={FEATURED.accent}
            title={FEATURED.title}
            date={FEATURED.date}
            readingMinutes={FEATURED.readingMinutes}
            author={FEATURED.author}
            imageAlt={FEATURED.imageAlt}
            body={POST_BODY}
            tags={["mandrel", "flow-bench", "fabrication", "stainless"]}
            shareTargets={SHARE_TARGETS}
            shareUrl="https://oakflatsmufflermen.example/blog/mandrel-vs-crush"
            aside={<TableOfContents entries={TOC} />}
            headingLevel={2}
          />
        </div>
      </Section>

      {/* Bonus — full editorial composition */}
      <Section
        index="Composition"
        title="Editorial index composition"
        note="Featured hero, filterable index grid, related row, and the newsletter CTA composed into one long-scroll blog landing surface."
      >
        <div className={styles.well}>
          <div className={styles.section}>
            <FeaturedPostHero post={FEATURED} />
            <BlogIndexGrid
              posts={FILTERABLE}
              categories={CATEGORIES}
              heading="The full log"
              kicker="Every entry"
            />
            <RelatedPostsRow
              posts={[POSTS[3], POSTS[4], POSTS[5]]}
              kicker="Editor's picks"
              heading="Worth a second look"
            />
            <BlogNewsletterCta heading="Don't miss the next build log" />
          </div>
        </div>
      </Section>
    </main>
  )
}
