import type { Metadata } from "next"
import Link from "next/link"

import { PageHeader } from "../../components/page-header"
import { StateRegionBlocked } from "../../components/states"
import styles from "../states.module.css"

export const metadata: Metadata = {
  title: "Region blocked · 451 | UI Primitives — System States",
}

export default function RegionBlockedShowcase() {
  return (
    <main className={styles.subPage}>
      <PageHeader
        kicker="14.06 / System states"
        title="Outside the run sheet · 451"
        description="Geo-fenced compass surface for unsupported regions. Supported region grid, VPN note, and a primary 'request expansion' CTA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System states", href: "/ui-primitives/states" },
          { label: "Region blocked" },
        ]}
      />
      <section className={styles.canvas}>
        <StateRegionBlocked
          detectedRegion="WA · Perth metro (203.45.0.0/24)"
          supportedRegions={[
            "NSW — Illawarra",
            "NSW — South Coast",
            "NSW — Sydney metro",
            "NSW — Wollongong CBD",
            "ACT — Canberra ring",
            "VIC — Melbourne north",
            "QLD — Brisbane bayside",
            "TAS — Hobart",
          ]}
          primaryAction={
            <a
              href="mailto:hello@mufflermen.com.au?subject=Service expansion request"
              className={styles.btnRed}
            >
              Request my region
            </a>
          }
          secondaryAction={
            <Link href="/ui-primitives" className={styles.btnGhost}>
              Back to dashboard
            </Link>
          }
        />
        <aside className={styles.note}>
          <span>Accessibility</span>
          <p>
            Role=&quot;alert&quot; — interrupts so the customer knows the action will not proceed.
            The supported region grid is wrapped in a labelled section and the VPN guidance sits
            inside an aside.
          </p>
        </aside>
      </section>
    </main>
  )
}
