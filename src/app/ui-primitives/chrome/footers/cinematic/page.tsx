import type { Metadata } from "next"

import { FooterCinematic } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Footer · Cinematic | UI Primitives — Chrome",
}

export default function FooterCinematicRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Footer 07 / Chrome"
        title="Cinematic"
        description="Full-bleed cover image footer with grand wordmark, tagline, three columns and a bottom legal bar."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Cinematic" },
        ]}
      />

      <FooterCinematic
        brand={{
          logoSrc: siteImages.logoNav,
          logoAlt: "Mufflermen logo",
          wordmark: "Mufflermen",
          caption: "Oak Flats · Est. 1968",
        }}
        bgImageSrc={siteImages.covers.services}
        bgImageAlt="Workshop bay cover"
        tagline="Stainless catbacks. ADR-stamped welds. Manta-fit performance gear. Built where the Illawarra meets the coast."
        columns={[
          {
            id: "workshop",
            heading: "Workshop",
            links: [
              { id: "catback", label: "Catback installs", href: "#catback" },
              { id: "dyno", label: "Dyno cell", href: "#dyno" },
              { id: "mobile", label: "Mobile bay", href: "#mobile" },
            ],
          },
          {
            id: "motorsport",
            heading: "Motorsport",
            links: [
              { id: "rally", label: "Rally builds", href: "#rally" },
              { id: "circuit", label: "Circuit days", href: "#circuit" },
              { id: "drag", label: "Drag prep", href: "#drag" },
            ],
          },
          {
            id: "trade",
            heading: "Trade",
            links: [
              { id: "fleet", label: "Fleet care", href: "#fleet" },
              { id: "wholesale", label: "Wholesale", href: "#wholesale" },
              { id: "subcontract", label: "Subcontract welds", href: "#subcontract" },
            ],
          },
        ]}
        legal="© 1968-2026 Mufflermen Pty Ltd · ABN 11 222 333 444"
        legalLinks={[
          { id: "privacy", label: "Privacy", href: "#privacy" },
          { id: "terms", label: "Terms", href: "#terms" },
          { id: "warranty", label: "Warranty", href: "#warranty" },
        ]}
      />
    </main>
  )
}
