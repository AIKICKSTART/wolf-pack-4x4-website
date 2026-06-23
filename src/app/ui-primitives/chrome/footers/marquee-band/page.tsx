import type { Metadata } from "next"

import { FooterMarqueeBand } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Footer · Marquee band | UI Primitives — Chrome",
}

export default function FooterMarqueeBandRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Footer 10 / Chrome"
        title="Marquee band"
        description="Stacked KPI tiles, a looping marquee of brand words and a brand-row legal strip. Best as the bottom of editorial landing pages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Marquee band" },
        ]}
      />

      <FooterMarqueeBand
        brand={{
          logoSrc: siteImages.logoNav,
          logoAlt: "Mufflermen logo",
          wordmark: "Mufflermen",
        }}
        kpis={[
          { id: "jobs", label: "Jobs completed", value: 14400 },
          { id: "warranty", label: "ADR-stamped", value: 100, suffix: "%" },
          { id: "motorsport", label: "Race weekends", value: 312 },
          { id: "dyno", label: "Dyno pulls", value: 1860 },
        ]}
        marqueeWords={[
          "Mufflermen",
          "Manta",
          "Catback",
          "MIG · TIG",
          "ADR Stamped",
          "Oak Flats",
        ]}
        legalLinks={[
          { id: "privacy", label: "Privacy", href: "#privacy" },
          { id: "terms", label: "Terms", href: "#terms" },
          { id: "warranty", label: "Warranty", href: "#warranty" },
        ]}
        copyright="© 1968-2026 · ABN 11 222 333 444"
      />
    </main>
  )
}
