import type { Metadata } from "next"

import { SidebarMegaAnchored } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Sidebar · Mega anchored | UI Primitives — Chrome",
}

export default function SidebarMegaAnchoredRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Side 21 / Chrome"
        title="Mega anchored"
        description="Full sidebar with brand lockup, search shortcut, and collapsible group sections. Built for app shells with deep IA."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Mega anchored" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live sidebar preview
          <span>Mega · explorer</span>
        </span>
        <div className={styles.demoFrameBody} style={{ display: "grid", gridTemplateColumns: "auto 1fr", minHeight: 620 }}>
          <SidebarMegaAnchored
            layout="static"
            brand={{
              logoSrc: siteImages.logoNav,
              logoAlt: "Mufflermen logo",
              wordmark: "Mufflermen",
              caption: "Oak Flats · Est. 1968",
            }}
            groups={[
              {
                id: "workshop",
                heading: "Workshop",
                items: [
                  { id: "home", label: "Overview", href: "#home", kind: "home", isActive: true },
                  { id: "workshop", label: "Bays", href: "#bays", kind: "workshop" },
                  { id: "exhaust", label: "Catbacks", href: "#catback", kind: "exhaust", badge: "Hot" },
                ],
              },
              {
                id: "catalog",
                heading: "Catalog",
                items: [
                  { id: "catalog", label: "Manta range", href: "#manta", kind: "catalog" },
                  { id: "performance", label: "Performance", href: "#performance", kind: "performance" },
                  { id: "motorsport", label: "Motorsport", href: "#motorsport", kind: "motorsport" },
                ],
              },
              {
                id: "ops",
                heading: "Operations",
                items: [
                  { id: "trade", label: "Trade portal", href: "#trade", kind: "trade" },
                  { id: "shield", label: "Compliance", href: "#compliance", kind: "shield" },
                  { id: "phone", label: "Contact desk", href: "#contact", kind: "phone" },
                ],
                initiallyOpen: false,
              },
            ]}
            footerCard={{ title: "Daniel Fleuren", subtitle: "Bay 2 · Online" }}
          />
          <div style={{ padding: "var(--primitive-space-6)", color: "var(--primitive-body)", fontSize: "var(--primitive-text-sm)" }}>
            <p>Page content sits to the right of the sidebar.</p>
          </div>
        </div>
      </div>
    </main>
  )
}
