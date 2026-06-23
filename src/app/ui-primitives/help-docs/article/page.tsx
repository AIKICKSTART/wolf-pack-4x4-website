import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ArticleSurface, TableOfContents } from "../../components/help-docs"
import styles from "../help-docs.module.css"

export const metadata: Metadata = {
  title: "Article surface | UI Primitives — Help & Docs",
}

const toc = [
  { id: "article-intro", label: "Why we built it", depth: 2 as const },
  { id: "article-pricing", label: "Pricing rules", depth: 2 as const },
  { id: "article-pricing-margin", label: "Margin floor", depth: 3 as const },
  { id: "article-pricing-rebate", label: "Magnaflow rebate", depth: 3 as const },
  { id: "article-handoff", label: "Workshop handoff", depth: 2 as const },
  { id: "article-faq", label: "FAQ", depth: 2 as const },
]

export default function ArticleSurfacePage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="22 / Help & Docs · 05"
        title="Article surface"
        description="Long-form article wrapper: title, byline, last-updated, optional sticky TOC, prose body, and a 'was this helpful' feedback row at the end."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Help & Docs", href: "/ui-primitives/help-docs" },
          { label: "Article surface" },
        ]}
      />
      <section className={styles.canvas} aria-label="Article surface demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Every help article uses this shell. Pass the TOC aside in for long pieces; omit it
            for short answers under two screenfuls.
          </p>
        </div>
        <ArticleSurface
          title="How to build a quote for a custom catback in under twenty minutes"
          category="Quoting workflow"
          author={{
            name: "Tom Halloran",
            role: "Workshop manager · Oak Flats",
            avatarInitials: "TH",
          }}
          publishedAt="11 May 2026"
          publishedIso="2026-05-11"
          updatedAt="24 May 2026"
          updatedIso="2026-05-24"
          readMinutes={6}
          toc={<TableOfContents items={toc} />}
        >
          <h2 id="article-intro">Why we built it</h2>
          <p>
            The custom catback quote used to take two staff and roughly forty-five minutes — one
            person on the parts catalogue and another building the line items in the quote
            tool. Here is the consolidated workflow we now use.
          </p>
          <h2 id="article-pricing">Pricing rules</h2>
          <p>
            Pricing follows three rules. Margin floor, Magnaflow rebate stack, and the
            workshop labour band.
          </p>
          <h3 id="article-pricing-margin">Margin floor</h3>
          <p>
            Every line item must clear the 28% margin floor. The quote tool blocks save when
            margin slips below that threshold.
          </p>
          <h3 id="article-pricing-rebate">Magnaflow rebate</h3>
          <p>
            Volume rebates from Magnaflow ANZ stack on a per-quarter basis. The settlement
            shows up in the supplier ledger 14 days after quarter close.
          </p>
          <h2 id="article-handoff">Workshop handoff</h2>
          <p>
            Once signed, the job moves to Workshop floor. The bay supervisor accepts the
            handoff and confirms the parts ETA.
          </p>
          <h2 id="article-faq">FAQ</h2>
          <ul>
            <li>What happens if the customer changes their mind? Roll the quote to v2.</li>
            <li>Can we discount below margin? Only with director sign-off.</li>
            <li>How long is a quote valid? Fourteen calendar days.</li>
          </ul>
        </ArticleSurface>
      </section>
    </main>
  )
}
