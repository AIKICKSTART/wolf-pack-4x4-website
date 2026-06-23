import type { Metadata } from "next"

import {
  HeaderCinematicBar,
  type HeaderCinematicBarProps,
} from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Header · Cinematic bar | UI Primitives — Chrome",
}

const HEADER_PROPS: HeaderCinematicBarProps = {
  brand: {
    logoSrc: siteImages.logoNav,
    logoAlt: "Mufflermen logo",
    wordmark: "Mufflermen",
    caption: "Oak Flats · Est. 1968",
  },
  nav: [
    { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
    { id: "services", label: "Services", href: "#services" },
    { id: "catalog", label: "Catalog", href: "#catalog" },
    { id: "about", label: "About", href: "#about" },
    { id: "trade", label: "Trade", href: "#trade" },
  ],
  secondaryCta: { label: "(02) 4256 7000", href: "tel:+61242567000" },
  primaryCta: { label: "Book a bay", href: "#book" },
}

export default function HeaderCinematicBarRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Header 01 / Chrome"
        title="Cinematic bar"
        description="Full-width sticky header with logo, centered pill nav and a red primary CTA cluster. Glass surface with a subtle scanline overlay."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Cinematic bar" },
        ]}
      />

      <div className={styles.demoCanvas}>
        <div className={styles.demoFrame}>
          <span className={styles.demoFrameLabel}>
            Live header preview
            <span>Sticky · cinematic</span>
          </span>
          <div className={styles.demoFrameBody}>
            <HeaderCinematicBar {...HEADER_PROPS} />
          </div>
        </div>
      </div>
    </main>
  )
}
