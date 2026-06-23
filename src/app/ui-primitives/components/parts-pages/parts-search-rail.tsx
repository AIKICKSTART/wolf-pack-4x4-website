"use client"

import { useState } from "react"
import Link from "next/link"

import {
  FacetedFilterSidebar,
  type FacetCheckboxOption,
  type FacetChipOption,
  type FacetGroup,
} from "../search/faceted-filter-sidebar"
import { InlineSearchInput } from "../search/inline-search-input"

import type { PartCategoryRef, SupplierTone } from "./parts-pages-types"

import styles from "./parts-search-rail.module.css"

export interface PartsSearchRailSupplierChip {
  id: string
  label: string
  tone: SupplierTone
}

export interface PartsSearchRailProps {
  /** Category list with active flag. */
  categories: ReadonlyArray<PartCategoryRef & { active?: boolean; count?: number }>
  /** Supplier filter chips. */
  suppliers: ReadonlyArray<PartsSearchRailSupplierChip>
  /** Fitment chips, e.g. ["Hilux N80", "Ranger PX3"]. */
  fitment: ReadonlyArray<string>
  /** Price range bounds in dollars. */
  priceMin?: number
  priceMax?: number
  /** Optional default search value. */
  defaultQuery?: string
  /** Optional result count for the live region. */
  resultCount?: number
  className?: string
}

const TONE_LINE_CLASS = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
} as const

export function PartsSearchRail({
  categories,
  suppliers,
  fitment,
  priceMin = 0,
  priceMax = 4500,
  defaultQuery = "",
  resultCount,
  className,
}: PartsSearchRailProps) {
  const [query, setQuery] = useState<string>(defaultQuery)
  const [selectedSuppliers, setSelectedSuppliers] = useState<ReadonlyArray<string>>([])
  const [selectedFitment, setSelectedFitment] = useState<ReadonlyArray<string>>([])
  const [price, setPrice] = useState<number>(priceMax)
  const [inStock, setInStock] = useState<boolean>(true)

  const supplierOptions: ReadonlyArray<FacetChipOption> = suppliers.map((s) => ({
    id: s.id,
    label: s.label,
    selected: selectedSuppliers.includes(s.id),
  }))

  const fitmentOptions: ReadonlyArray<FacetCheckboxOption> = fitment.map((label) => ({
    id: label,
    label,
    checked: selectedFitment.includes(label),
  }))

  const facetGroups: ReadonlyArray<FacetGroup> = [
    {
      id: "suppliers",
      heading: "Suppliers",
      kind: "chip",
      options: supplierOptions,
      defaultOpen: true,
    },
    {
      id: "price",
      heading: "Max price",
      kind: "range",
      range: {
        min: priceMin,
        max: priceMax,
        current: price,
        step: 50,
        format: (value: number) => `$${value.toLocaleString()}`,
      },
    },
    {
      id: "stock",
      heading: "Stock",
      kind: "toggle",
      toggleLabel: "In-stock only",
      toggleOn: inStock,
    },
    {
      id: "fitment",
      heading: "Fitment",
      kind: "checkbox",
      options: fitmentOptions,
      defaultOpen: false,
    },
  ]

  const toggle = (list: ReadonlyArray<string>, value: string, next: boolean): ReadonlyArray<string> =>
    next ? [...new Set([...list, value])] : list.filter((id) => id !== value)

  const appliedCount =
    selectedSuppliers.length +
    selectedFitment.length +
    (inStock ? 1 : 0) +
    (price < priceMax ? 1 : 0)

  return (
    <aside
      className={[styles.rail, className].filter(Boolean).join(" ")}
      role="search"
      aria-label="Parts catalogue search and filters"
    >
      <InlineSearchInput
        label="Search parts"
        placeholder="SKU, brand, or vehicle"
        defaultValue={defaultQuery}
        onValueChange={setQuery}
        resultCount={resultCount}
        resultNoun="parts"
      />

      <nav className={styles.section} aria-label="Categories">
        <span className={styles.label}>Categories</span>
        <ul className={styles.categoryList}>
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                href={`/parts/category/${category.slug}`}
                aria-current={category.active ? "page" : undefined}
                className={`${styles.categoryLink} ${TONE_LINE_CLASS[category.tone]}`}
              >
                <span className={styles.categoryLabel}>{category.title}</span>
                {typeof category.count === "number" && (
                  <span className={styles.categoryCount}>{category.count.toLocaleString()}</span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <FacetedFilterSidebar
        heading="Filters"
        appliedCount={appliedCount}
        groups={facetGroups}
        onChipToggle={(groupId, optionId, next) => {
          if (groupId === "suppliers") {
            setSelectedSuppliers((list) => toggle(list, optionId, next))
          }
        }}
        onCheckboxToggle={(groupId, optionId, next) => {
          if (groupId === "fitment") {
            setSelectedFitment((list) => toggle(list, optionId, next))
          }
        }}
        onRangeChange={(groupId, value) => {
          if (groupId === "price") setPrice(value)
        }}
        onToggleChange={(groupId, next) => {
          if (groupId === "stock") setInStock(next)
        }}
        onClearAll={() => {
          setSelectedSuppliers([])
          setSelectedFitment([])
          setPrice(priceMax)
          setInStock(true)
        }}
      />

      {/* Capture query in the DOM tree so SSR snapshots reflect the current value */}
      <span hidden aria-hidden="true" data-query={query} />
    </aside>
  )
}

export default PartsSearchRail
