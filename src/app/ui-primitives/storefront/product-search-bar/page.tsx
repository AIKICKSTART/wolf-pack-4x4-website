import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { ProductSearchBar } from "../../components/storefront"

import {
  SEARCH_RECENT,
  SEARCH_SUGGESTIONS,
  SEARCH_TRENDING,
} from "../_mock-data"
import styles from "../storefront.module.css"

export const metadata: Metadata = {
  title: "Product search bar | Storefront",
  description: "Primitive 09 — search with autocomplete, trending and recent.",
}

export default function ProductSearchBarPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Product search bar"
        title="Product search bar"
        description="Search with autocomplete that matches products, categories, fitments and AU regos. Trending and recent searches surface on empty query."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Storefront", href: "/ui-primitives/storefront" },
          { label: "Product search bar" },
        ]}
      />
      <section className={styles.stageFrame}>
        <span className={styles.stageCaption}>State 01 · empty · trending + recent</span>
        <ProductSearchBar
          suggestions={SEARCH_SUGGESTIONS}
          trending={SEARCH_TRENDING}
          recent={SEARCH_RECENT}
        />
        <span className={styles.stageCaption}>State 02 · trending only · no recent</span>
        <ProductSearchBar
          suggestions={SEARCH_SUGGESTIONS}
          trending={SEARCH_TRENDING}
        />
        <span className={styles.stageCaption}>State 03 · suggestions only · no trending or recent</span>
        <ProductSearchBar suggestions={SEARCH_SUGGESTIONS} />
      </section>
    </main>
  )
}
