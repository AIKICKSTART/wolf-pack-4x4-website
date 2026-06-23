import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ServicePricingBand } from "../../components/services-areas-pages"
import styles from "../services-areas-pages.module.css"

export const metadata: Metadata = {
  title: "Service pricing band | Services & areas | UI Primitives",
  description:
    "Pricing band — From $XXX with GST included, booking deposit, and finance chips.",
}

export default function ServicePricingBandScene() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 07"
        title="Service pricing band"
        description="Pricing band card surfaced on the service detail page. Composes the commerce PriceTag primitive for the From $XXX value and surfaces the three Mufflermen-specific chips: 10% GST included, $80 booking deposit, and Humm finance available."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Services & areas", href: "/ui-primitives/services-areas-pages" },
          { label: "Service pricing band" },
        ]}
      />
      <ServicePricingBand fromPriceAud={1450} />
    </main>
  )
}
