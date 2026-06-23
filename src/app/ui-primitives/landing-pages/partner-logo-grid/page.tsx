import type { Metadata } from "next"

import { PartnerLogoGrid } from "../../components/landing-pages"
import { PageHeader } from "../../components/page-header"

import { PARTNERS } from "../_mock-data"
import styles from "../landing-pages.module.css"

export const metadata: Metadata = {
  title: "Partner logo grid | Landing Pages",
  description: "Primitive 14 — partner / supplier logo grid with link-out cards.",
}

export default function PartnerLogoGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Partners"
        title="Partner logo grid"
        description="Partner / supplier logo grid. Three states: full 8-partner grid, performance-only filter, and a trade-supply only filter."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Landing pages", href: "/ui-primitives/landing-pages" },
          { label: "Partner logo grid" },
        ]}
      />

      <span className={styles.stageCaption}>State · Full 8-partner grid</span>
      <PartnerLogoGrid
        kicker="Suppliers + partners"
        heading="The brands welded into every Mufflermen install."
        body="South Coast distribution for the brands tradies trust — Manta, Pacemaker, X-Force, Redback, Genie."
        partners={PARTNERS}
      />

      <span className={styles.stageCaption}>State · Performance only</span>
      <PartnerLogoGrid
        heading="Performance partners"
        partners={PARTNERS.filter((partner) =>
          ["manta", "pacemaker", "xforce", "magnaflow"].includes(partner.id),
        )}
      />

      <span className={styles.stageCaption}>State · Trade supply</span>
      <PartnerLogoGrid
        kicker="Trade supply"
        heading="Workshop consumables + tooling"
        partners={PARTNERS.filter((partner) =>
          ["genie", "kuga", "milwaukee", "redback"].includes(partner.id),
        )}
      />
    </main>
  )
}
