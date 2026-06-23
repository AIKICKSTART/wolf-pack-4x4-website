import type { Metadata } from "next"

import {
  HeaderPinstripeBar,
} from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Header · Pinstripe bar | UI Primitives — Chrome",
}

export default function HeaderPinstripeBarRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Header 02 / Chrome"
        title="Pinstripe bar"
        description="Thin mono-typed bar with brand chip, breadcrumb crumbs and a search shortcut. Built for app shells where the chrome should stay quiet."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Pinstripe bar" },
        ]}
      />

      <div className={styles.demoFrame}>
        <span className={styles.demoFrameLabel}>
          Live header preview
          <span>Mono · pinstripe</span>
        </span>
        <div className={styles.demoFrameBody}>
          <HeaderPinstripeBar
            brand={{
              logoSrc: siteImages.logoNav,
              logoAlt: "Mufflermen logo",
              wordmark: "Mufflermen",
            }}
            crumbs={[
              { label: "Workshop", href: "#workshop" },
              { label: "Bay 2", href: "#bay-2" },
              { label: "Job 2415" },
            ]}
            links={[
              { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
              { id: "trade", label: "Trade", href: "#trade" },
              { id: "contact", label: "Contact", href: "#contact" },
            ]}
          />
        </div>
      </div>
    </main>
  )
}
