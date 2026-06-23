import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  FitmentCompatibilityList,
  PartDetailHero,
  PartImageGallery,
  PartSpecTable,
  PartsBreadcrumb,
  PartsFaqSection,
  RelatedPartsRail,
} from "../../components/parts-pages"

import {
  FAQ_ITEMS,
  FITMENT_TABLE,
  GALLERY_IMAGES,
  RESULT_CARDS,
  SPEC_GROUPS,
} from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Full part detail experience | Parts pages",
  description: "Bonus — Full part detail composition: Breadcrumb + Detail hero + Gallery + Spec table + Fitment list + Related rail + FAQ.",
}

export default function FullExperiencePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Bonus / Full detail"
        title="Full part detail experience"
        description="Every parts-page primitive composed into a single product detail page — breadcrumb, detail hero with embedded gallery, spec table, vehicle fitment list, related-parts rail, and FAQ."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Full experience" },
        ]}
      />

      <div style={{ display: "grid", gap: "var(--primitive-space-6)" }}>
        <PartsBreadcrumb
          leafTone="red"
          items={[
            { label: "Home", href: "/" },
            { label: "Parts", href: "/parts" },
            { label: "Complete systems", href: "/parts/category/complete-systems" },
            { label: "Manta 3in catback — Hilux N80" },
          ]}
        />

        <PartDetailHero
          sku="OF-001"
          title="Manta 3in catback — Hilux N80 turbo diesel"
          supplier="Manta"
          supplierTone="manta"
          summary="Stainless 3-inch catback engineered for the 2.8L 1GD-FTV Hilux. TIG-welded joints, polished tip, ADR-stamped on collection."
          price={{ rrpCents: 184900, currentCents: 169900, installmentHint: "or 4 x $42.49 fortnightly" }}
          tone="red"
          inStock
          installTime="2.5 hrs"
          fitment={["Hilux N80", "2015-2024", "1GD-FTV 2.8L diesel"]}
          gallerySlot={<PartImageGallery images={GALLERY_IMAGES} />}
        />

        <PartSpecTable kicker="Workshop specs" heading="Full spec sheet" groups={SPEC_GROUPS} />

        <FitmentCompatibilityList kicker="Confirmed fitment" heading="Vehicle fitment for this part" fitments={FITMENT_TABLE} />

        <RelatedPartsRail
          kicker="Customers also fit"
          heading="Parts often paired with this catback"
          description="Cross-sells filtered by category overlap and confirmed fitment."
          parts={RESULT_CARDS}
        />

        <PartsFaqSection
          kicker="Common questions"
          heading="Frequently asked about this part"
          body="Quick answers for fitment, install time, warranty, ADR compliance, sound level, RMS inspection, tuning, and delivery."
          items={FAQ_ITEMS}
          defaultOpenId="fit"
        />
      </div>
    </main>
  )
}
