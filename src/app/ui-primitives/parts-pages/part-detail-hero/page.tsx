import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartDetailHero, PartImageGallery } from "../../components/parts-pages"

import { GALLERY_IMAGES } from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Part detail hero | Parts pages",
  description: "Primitive 05 — Part detail hero with gallery on left and product summary on right.",
}

export default function PartDetailHeroPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 05 / Detail hero"
        title="Part detail hero"
        description="Product hero — gallery on the left, supplier badge + price chip + in-stock chip + install-time chip + fitment chip row + primary CTA on the right."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Detail hero" },
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
        ctaLabel="Get a quote"
        ctaHref="#quote"
      />
    </main>
  )
}
