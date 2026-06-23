"use client"

import { useState } from "react"

import { Pagination } from "../primitives/pagination"

import { FitmentCompatibilityList } from "./fitment-compatibility-list"
import { PartResultCard } from "./part-result-card"
import { PartsBreadcrumb } from "./parts-breadcrumb"
import { PartsCatalogueHero } from "./parts-catalogue-hero"
import { PartsFaqSection } from "./parts-faq-section"
import { PartsSearchRail, type PartsSearchRailSupplierChip } from "./parts-search-rail"

import type {
  FitmentNote,
  PartBreadcrumbItem,
  PartCardSummary,
  PartCategoryRef,
  PartSupplierBadge,
  PartTone,
  PartsFaqItem,
} from "./parts-pages-types"

import styles from "./parts-category-page-shell.module.css"

export interface PartsCategoryPageShellProps {
  crumbs: ReadonlyArray<PartBreadcrumbItem>
  hero: {
    kicker: string
    headline: string
    description: string
    tone: PartTone
    partCountLabel: string
    supplierCoverageLabel: string
    suppliers: ReadonlyArray<Pick<PartSupplierBadge, "id" | "name" | "tone">>
  }
  /** Rail config — category nav + filter facets. */
  rail: {
    categories: ReadonlyArray<PartCategoryRef & { active?: boolean; count?: number }>
    suppliers: ReadonlyArray<PartsSearchRailSupplierChip>
    fitment: ReadonlyArray<string>
  }
  /** Result grid contents (pre-filtered + paginated). */
  results: ReadonlyArray<PartCardSummary>
  /** Optional confirmed fitment table — useful on category page when only one vehicle line. */
  fitmentTable?: ReadonlyArray<FitmentNote>
  /** Pagination total + initial page. */
  page: number
  pageCount: number
  faq: ReadonlyArray<PartsFaqItem>
  className?: string
}

export function PartsCategoryPageShell({
  crumbs,
  hero,
  rail,
  results,
  fitmentTable,
  page,
  pageCount,
  faq,
  className,
}: PartsCategoryPageShellProps) {
  const [currentPage, setCurrentPage] = useState<number>(page)

  return (
    <main className={[styles.shell, className].filter(Boolean).join(" ")}>
      <PartsBreadcrumb items={crumbs} leafTone={hero.tone} />

      <PartsCatalogueHero
        kicker={hero.kicker}
        headline={hero.headline}
        description={hero.description}
        tone={hero.tone}
        partCountLabel={hero.partCountLabel}
        supplierCoverageLabel={hero.supplierCoverageLabel}
        suppliers={hero.suppliers}
      />

      <div className={styles.body}>
        <PartsSearchRail
          categories={rail.categories}
          suppliers={rail.suppliers}
          fitment={rail.fitment}
          resultCount={results.length}
        />

        <section className={styles.results} aria-label="Catalogue results">
          <header className={styles.resultsHead}>
            <span className={styles.resultsCount}>
              {results.length} parts on page {currentPage}
            </span>
            <span className={styles.resultsSort}>Sorted by relevance</span>
          </header>

          <ul className={styles.grid} aria-label="Parts grid">
            {results.map((part) => (
              <li key={part.id}>
                <PartResultCard {...part} />
              </li>
            ))}
          </ul>

          <Pagination
            page={currentPage}
            pageCount={pageCount}
            onPageChange={setCurrentPage}
            ariaLabel="Catalogue pagination"
            showGoTo={false}
          />
        </section>
      </div>

      {fitmentTable && fitmentTable.length > 0 && (
        <FitmentCompatibilityList
          fitments={fitmentTable}
          kicker="Confirmed fitment"
          heading="Vehicle fitment in this category"
        />
      )}

      <PartsFaqSection
        kicker="Parts FAQ"
        heading="Common questions for this category"
        body="Quick answers about fitment, fitting time, warranty, and ADR compliance."
        items={faq}
      />
    </main>
  )
}

export default PartsCategoryPageShell
