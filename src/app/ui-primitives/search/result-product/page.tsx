import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { SearchResultProduct } from "../../components/search"
import styles from "../search.module.css"

export const metadata: Metadata = {
  title: "Product result | UI Primitives — Search",
}

export default function ResultProductPage() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Search · 09"
        title="Product result"
        description="Search result variant tuned for catalog parts — SKU, supplier, fitment chip, stock state, price block in display type, and a view-part CTA on the right edge."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Search", href: "/ui-primitives/search" },
          { label: "Product result" },
        ]}
      />
      <section className={styles.canvas} aria-label="Product result demo">
        <div className={styles.note}>
          <span>Use case</span>
          <p>
            Parts catalog search and supplier ledger search. Stock state has two tones — in-stock
            (green) and back-order (amber). The price block uses the Anton display face for parity
            with hero pricing tiles elsewhere in the system.
          </p>
        </div>
        <div className={styles.stage}>
          <div style={{ display: "grid", gap: "var(--primitive-space-3)" }}>
            <SearchResultProduct
              href="#"
              title="Magnaflow 14416 — BA Falcon catback, 2.5 inch"
              sku="MF-14416"
              price="$1,890"
              supplier="Magnaflow"
              fitment="Fits BA Falcon"
              inStock={true}
              stockCount={4}
            />
            <SearchResultProduct
              href="#"
              title="Redback RH-3001 headers, 4-into-1 stainless"
              sku="RH-3001"
              price="$1,240"
              supplier="Redback"
              fitment="Fits BA / BF Falcon"
              inStock={true}
              stockCount={2}
            />
            <SearchResultProduct
              href="#"
              title="Manta MM-220 midpipe, mandrel-bent 3 inch"
              sku="MM-220"
              price="$640"
              supplier="Manta"
              fitment="Universal · 3-inch"
              inStock={false}
            />
            <SearchResultProduct
              href="#"
              title="X-Force XF-Tip-04 polished exhaust tip 4 inch"
              sku="XF-TIP-04"
              price="$118"
              supplier="X-Force"
              fitment="Universal"
              inStock={true}
              stockCount={26}
            />
          </div>
        </div>
      </section>
    </main>
  )
}
