import type { Metadata } from "next"

import { BrandSetupCard } from "../../components/system-onboarding"
import { PageHeader } from "../../components/page-header"

import {
  BRAND_LOGO_EMPTY,
  BRAND_LOGO_UPLOADED,
  BRAND_PALETTE,
  BRAND_TYPOGRAPHIES,
} from "../_mock-data"
import styles from "../system-onboarding.module.css"

export const metadata: Metadata = {
  title: "Brand setup | System onboarding",
  description:
    "Primitive 06 — brand kit capture step. Three states: empty logo + default selection, uploaded logo + custom palette, and alternative typography pairing chosen.",
}

export default function BrandSetupCardScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 06 / Brand"
        title="Brand setup card"
        description="Wizard step capturing the tenant's logo, palette accent and typography pairing. Pre-seeded with the Mufflermen Red default — tenants can override to their own accent."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "System onboarding", href: "/ui-primitives/system-onboarding" },
          { label: "Brand setup" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 1 · Empty — no logo yet, Mufflermen Red as default</span>
        <BrandSetupCard
          kicker="Step 5 of 6 · Brand"
          title="Make Mufflermen look like Illawarra TB"
          description="Drop a logo, lock in your accent and pick a typography mood. You can refine the kit anytime from the brand-control surface later."
          logo={BRAND_LOGO_EMPTY}
          palettes={BRAND_PALETTE}
          typographies={BRAND_TYPOGRAPHIES}
          selectedTypographyId="t-anton-inter"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 2 · Logo uploaded — custom file ready to ship</span>
        <BrandSetupCard
          kicker="Step 5 of 6 · Brand"
          title="Make Mufflermen look like Illawarra TB"
          description="Looks good. Quotes, invoices and customer SMS will now carry your logo and Workshop Red accent."
          logo={BRAND_LOGO_UPLOADED}
          palettes={BRAND_PALETTE}
          typographies={BRAND_TYPOGRAPHIES}
          selectedTypographyId="t-anton-inter"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>State 3 · Editorial type — chose serif heading instead</span>
        <BrandSetupCard
          kicker="Step 5 of 6 · Brand"
          title="Make Mufflermen look like Illawarra TB"
          description="Serif headings read more editorial — good for fleet contracts and B2B paperwork. Body stays in your standard sans."
          logo={BRAND_LOGO_UPLOADED}
          palettes={BRAND_PALETTE.map((swatch) =>
            swatch.id === "p-red" ? { ...swatch, accent: false } : swatch.id === "p-charcoal" ? { ...swatch, accent: true } : swatch,
          )}
          typographies={BRAND_TYPOGRAPHIES}
          selectedTypographyId="t-serif-sans"
        />
      </section>
    </main>
  )
}
