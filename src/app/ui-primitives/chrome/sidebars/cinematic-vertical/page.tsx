import type { Metadata } from "next"

import { SidebarCinematicVertical } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Sidebar · Cinematic vertical | UI Primitives — Chrome",
}

export default function SidebarCinematicVerticalRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Side 19 / Chrome"
        title="Cinematic vertical"
        description="Narrow cinematic sidebar with vertical wordmark and per-item active state. Pairs with editorial landing layouts."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Cinematic vertical" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live sidebar preview
          <span>Cinematic</span>
        </span>
        <div className={styles.demoFrameBody} style={{ display: "grid", gridTemplateColumns: "auto 1fr", minHeight: 560 }}>
          <SidebarCinematicVertical
            layout="static"
            brand={{
              logoSrc: siteImages.logoNav,
              logoAlt: "Mufflermen logo",
              wordmark: "Mufflermen",
            }}
            items={[
              { id: "home", label: "Home", href: "#home", kind: "home", isActive: true },
              { id: "workshop", label: "Workshop", href: "#workshop", kind: "workshop" },
              { id: "catalog", label: "Catalog", href: "#catalog", kind: "catalog" },
              { id: "performance", label: "Performance", href: "#performance", kind: "performance" },
              { id: "motorsport", label: "Motorsport", href: "#motorsport", kind: "motorsport" },
              { id: "trade", label: "Trade", href: "#trade", kind: "trade" },
              { id: "contact", label: "Contact", href: "#contact", kind: "contact" },
            ]}
            footerLabel="Est. 1968"
          />
          <div style={{ padding: "var(--primitive-space-6)", color: "var(--primitive-body)", fontSize: "var(--primitive-text-sm)" }}>
            <p>Page content sits to the right of the sidebar rail.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
