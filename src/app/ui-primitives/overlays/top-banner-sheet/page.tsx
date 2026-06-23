import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import styles from "../overlays.module.css"

import { TopBannerSheetDemo } from "./top-banner-sheet-demo"

export const metadata: Metadata = {
  title: "Top banner sheet | UI Primitives — Overlays",
}

export default function TopBannerSheetPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="11 / Overlays · 06"
        title="Top banner sheet"
        description="Top-anchored, full-width sheet for global announcements — cookie consent, scheduled maintenance windows, supplier price-rise notices. Three tones (info / warning / danger)."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Overlays", href: "/ui-primitives/overlays" },
          { label: "Top banner sheet" },
        ]}
      />
      <section className={styles.canvas} aria-label="Top banner sheet demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Stays at the top of the page until dismissed. Pair with a primary action when the
            user needs to do something (accept consent, view a maintenance schedule).
          </p>
        </div>
        <TopBannerSheetDemo />
      </section>
    </main>
  )
}
