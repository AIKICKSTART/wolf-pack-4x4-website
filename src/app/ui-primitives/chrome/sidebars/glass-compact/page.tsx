import type { Metadata } from "next"

import { SidebarGlassCompact } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Sidebar · Glass compact | UI Primitives — Chrome",
}

export default function SidebarGlassCompactRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Side 20 / Chrome"
        title="Glass compact"
        description="Floating glass icon-only sidebar with hover label tooltips and an avatar foot."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Glass compact" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live sidebar preview
          <span>Glass · icon-only</span>
        </span>
        <div className={styles.demoFrameBody} style={{ display: "grid", gridTemplateColumns: "auto 1fr", minHeight: 520 }}>
          <SidebarGlassCompact
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
              { id: "quote", label: "Quotes", href: "#quote", kind: "quote", badge: 3 },
              { id: "search", label: "Search", href: "#search", kind: "search" },
              { id: "phone", label: "Contact", href: "#contact", kind: "phone" },
            ]}
            dividerAfter={3}
            user={{ name: "Daniel Fleuren" }}
          />
          <div style={{ padding: "var(--primitive-space-6)", color: "var(--primitive-body)", fontSize: "var(--primitive-text-sm)" }}>
            <p>Page content sits to the right.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
