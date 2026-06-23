import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { PartsCategoryPageShell } from "../../components/parts-pages"

import {
  CATEGORIES,
  FAQ_ITEMS,
  FITMENT_CHIPS,
  FITMENT_TABLE,
  HERO_SUPPLIERS,
  RESULT_CARDS,
  SUPPLIER_TAGS,
} from "../fixtures"
import styles from "../parts-pages.module.css"

export const metadata: Metadata = {
  title: "Parts category page shell | Parts pages",
  description: "Primitive 14 — Composition shell — Breadcrumb + Catalogue hero + Search rail + Result grid + Pagination + Fitment list + FAQ.",
}

export default function PartsCategoryPageShellRoute() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 14 / Category shell"
        title="Parts category page shell"
        description="One composed surface for a parts category page. Stacks the breadcrumb, catalogue hero, search rail with grid and pagination, optional fitment table, and a parts FAQ."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Parts pages", href: "/ui-primitives/parts-pages" },
          { label: "Category shell" },
        ]}
      />

      <PartsCategoryPageShell
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Parts", href: "/parts" },
          { label: "Complete systems" },
        ]}
        hero={{
          kicker: "Complete exhaust systems",
          headline: "Catbacks built for the bay floor, not the brochure.",
          description: "TIG-welded catbacks and turbo-backs from five supplier feeds. ADR-stamped, lifetime crack guarantee, and fitted by the team that designs them.",
          tone: "red",
          partCountLabel: "184 parts on file",
          supplierCoverageLabel: "5 supplier feeds connected",
          suppliers: HERO_SUPPLIERS,
        }}
        rail={{
          categories: CATEGORIES,
          suppliers: SUPPLIER_TAGS,
          fitment: FITMENT_CHIPS,
        }}
        results={RESULT_CARDS}
        fitmentTable={FITMENT_TABLE}
        page={1}
        pageCount={5}
        faq={FAQ_ITEMS}
      />
    </main>
  )
}
