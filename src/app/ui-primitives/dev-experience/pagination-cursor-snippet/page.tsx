import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PaginationCursorSnippet } from "../../components/dev-experience"
import type { PaginationStep } from "../../components/dev-experience"
import styles from "../dev-experience.module.css"

export const metadata: Metadata = {
  title: "Pagination cursor snippet | UI Primitives — Dev experience",
}

const FIRST_PAGE: PaginationStep = {
  label: "First page",
  caption: "GET /v1/bookings",
  language: "curl",
  code: `curl https://api.mufflermen.com/v1/bookings?limit=20 \\
  -H "Authorization: Bearer $MUFFLERMEN_API_KEY"`,
}

const RESPONSE: PaginationStep = {
  label: "Response · next_cursor",
  caption: "200 OK",
  language: "json",
  code: `{
  "data": [
    { "id": "bkg_01HQ8E...", "vehicle_id": "veh_2026_ford_ranger_xl", "bay_id": "bay_oak_flats_03" },
    { "id": "bkg_01HQ8F...", "vehicle_id": "veh_2025_toyota_hilux_sr5", "bay_id": "bay_oak_flats_01" }
  ],
  "page": {
    "limit": 20,
    "next_cursor": "cur_b6f9c4d0",
    "has_more": true
  }
}`,
}

const SECOND_PAGE: PaginationStep = {
  label: "Second page",
  caption: "GET /v1/bookings?cursor=...",
  language: "curl",
  code: `curl https://api.mufflermen.com/v1/bookings?limit=20&cursor=cur_b6f9c4d0 \\
  -H "Authorization: Bearer $MUFFLERMEN_API_KEY"`,
}

export default function PaginationCursorSnippetPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="Dev experience · 06"
        title="Pagination cursor snippet"
        description="Three stacked code blocks — first-page request, cursor response, follow-up request — with arrow rails between them."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Dev experience", href: "/ui-primitives/dev-experience" },
          { label: "Pagination cursor snippet" },
        ]}
      />
      <section className={styles.canvas}>
        <div className={styles.demoStage}>
          <span className={styles.demoLabel}>bookings.list — cursor pagination</span>
          <PaginationCursorSnippet steps={[FIRST_PAGE, RESPONSE, SECOND_PAGE]} />
        </div>
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Steps render in an ordered list with explicit numbering chips so a screen
            reader announces them in order. The arrow rail between each step is hidden
            via <code>aria-hidden=&quot;true&quot;</code> — it&apos;s purely a visual flow
            indicator and would otherwise add noise to the reading order.
          </p>
        </div>
      </section>
    </main>
  )
}
