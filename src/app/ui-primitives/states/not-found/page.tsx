import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateNotFound } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Not found · 404 | UI Primitives — System States",
}

export default function NotFoundShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.01 / System states"
        title="Off the map · 404"
        description="The workshop-themed not-found surface. A misplaced muffler illustration, suggested route list, and twin CTAs to push the customer back into the funnel."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Not found" },
        ]}
      />
      <section className={styles.canvas}>
        <StateNotFound
          routeHint="/ui-primitives/quote/albion-park-rail/v8-falcon"
          suggestedRoutes={[
            { code: "01", label: "Workshop dashboard", href: "/ui-primitives" },
            { code: "02", label: "Book a fitment slot", href: "/ui-primitives/forms-gallery" },
            { code: "03", label: "Browse parts catalogue", href: "/ui-primitives/data-display" },
          ]}
          primaryAction={
            <Link href="/ui-primitives" className={styles.btnRed}>
              Back to dashboard
            </Link>
          }
          secondaryAction={
            <a
              href="mailto:hello@mufflermen.com.au?subject=Broken link"
              className={styles.btnGhost}
            >
              Report broken link
            </a>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Rendered as an article with aria-labelledby pointing at the headline. The suggested
            route list is exposed via aria-label so screen-readers announce it independently of the
            surrounding copy.
          </p>
        </aside>
      </section>
    </main>
  )
}
