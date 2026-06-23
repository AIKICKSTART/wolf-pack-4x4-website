import type { Metadata } from "next"

import {
  HeaderStackedGrand,
} from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Header · Stacked grand | UI Primitives — Chrome",
}

export default function HeaderStackedGrandRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Header 03 / Chrome"
        title="Stacked grand"
        description="Utility status bar, grand wordmark hero with metric tiles and a chromed primary CTA, and an underline-active nav rail."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Stacked grand" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live header preview
          <span>Hero · utility</span>
        </span>
        <div className={styles.demoFrameBody}>
          <HeaderStackedGrand
            brand={{
              logoSrc: siteImages.logoIcon,
              logoAlt: "Mufflermen logo",
              wordmark: "Mufflermen",
            }}
            tagline="Stainless catbacks · MIG / TIG · ADR stamped"
            stats={[
              { label: "Bays", value: "6" },
              { label: "Since", value: "1968" },
              { label: "Vehicles", value: "12.4k" },
            ]}
            utility={{
              statusMessage: "Workshop online · Bay 2 dyno running",
              phoneLabel: "(02) 4256 7000",
              phoneHref: "tel:+61242567000",
              bookHref: "#book",
            }}
            primaryCta={{ label: "Book a bay", href: "#book" }}
            nav={[
              { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
              { id: "services", label: "Services", href: "#services" },
              { id: "catalog", label: "Catalog", href: "#catalog" },
              { id: "performance", label: "Performance", href: "#performance" },
              { id: "motorsport", label: "Motorsport", href: "#motorsport" },
              { id: "trade", label: "Trade", href: "#trade" },
              { id: "contact", label: "Contact", href: "#contact" },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
