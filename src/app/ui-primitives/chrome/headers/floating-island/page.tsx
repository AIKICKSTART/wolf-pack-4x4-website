import type { Metadata } from "next"

import { HeaderFloatingIsland } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Header · Floating island | UI Primitives — Chrome",
}

export default function HeaderFloatingIslandRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Header 05 / Chrome"
        title="Floating island"
        description="Rounded glass capsule centered with magnetic hover nav and a red CTA pill. Pairs well with editorial landing pages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Floating island" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live header preview
          <span>Floating · magnetic</span>
        </span>
        <div className={styles.demoFrameBody} style={{ minHeight: 140 }}>
          <HeaderFloatingIsland
            brand={{
              logoSrc: siteImages.logoNav,
              logoAlt: "Mufflermen logo",
              wordmark: "Mufflermen",
            }}
            nav={[
              { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
              { id: "services", label: "Services", href: "#services" },
              { id: "catalog", label: "Catalog", href: "#catalog" },
              { id: "performance", label: "Performance", href: "#performance" },
              { id: "motorsport", label: "Motorsport", href: "#motorsport" },
            ]}
            cta={{ label: "Book a bay", href: "#book" }}
          />
        </div>
      </div>
    </main>
  )
}
