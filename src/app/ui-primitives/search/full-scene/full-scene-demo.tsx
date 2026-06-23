"use client"

import { useMemo, useState, type ChangeEvent } from "react"

import { Pagination } from "../../components/primitives"
import {
  ActiveFilterChipBar,
  FacetedFilterSidebar,
  GlobalSearchBar,
  RelevanceBar,
  SearchResultFile,
  SearchResultPerson,
  SearchResultProduct,
} from "../../components/search"
import type { ActiveFilter, FacetGroup } from "../../components/search"
import styles from "../search.module.css"

type SortOption = "relevance" | "newest" | "price-asc" | "price-desc"

interface SidebarState {
  categories: ReadonlySet<string>
  fitments: ReadonlySet<string>
  maxPrice: number
  inStock: boolean
}

const INITIAL: SidebarState = {
  categories: new Set(["mufflers", "catbacks"]),
  fitments: new Set(["ba-falcon"]),
  maxPrice: 2500,
  inStock: true,
}

const SORT_LABELS: Record<SortOption, string> = {
  relevance: "Relevance",
  newest: "Newest",
  "price-asc": "Price · low → high",
  "price-desc": "Price · high → low",
}

interface MixedResultBase {
  id: string
  kind: "product" | "file" | "person"
  score: number
}

interface ProductResult extends MixedResultBase {
  kind: "product"
  title: string
  sku: string
  price: string
  supplier: string
  fitment: string
  inStock: boolean
  stockCount?: number
}

interface FileResult extends MixedResultBase {
  kind: "file"
  name: string
  path: string
  size: string
  modifiedAt: string
  modifiedLabel: string
  fileKind: "pdf" | "doc" | "image" | "sheet" | "zip"
  ownerName: string
}

interface PersonResult extends MixedResultBase {
  kind: "person"
  name: string
  role: string
  workshop: string
  email?: string
  phone?: string
  available: boolean
}

type MixedResult = ProductResult | FileResult | PersonResult

const RESULTS: ReadonlyArray<MixedResult> = [
  {
    id: "p1",
    kind: "product",
    score: 96,
    title: "Magnaflow 14416 — BA Falcon catback, 2.5 inch",
    sku: "MF-14416",
    price: "$1,890",
    supplier: "Magnaflow",
    fitment: "Fits BA Falcon",
    inStock: true,
    stockCount: 4,
  },
  {
    id: "f1",
    kind: "file",
    score: 88,
    name: "BA Falcon catback fitment guide.pdf",
    path: "/wiki/exhaust/ba-falcon/fitment-guide.pdf",
    size: "1.2 MB",
    modifiedAt: "2026-05-12T10:14:00+10:00",
    modifiedLabel: "12 May 2026",
    fileKind: "pdf",
    ownerName: "Liv Bartolomeo",
  },
  {
    id: "p2",
    kind: "product",
    score: 84,
    title: "Redback RH-3001 headers, 4-into-1 stainless",
    sku: "RH-3001",
    price: "$1,240",
    supplier: "Redback",
    fitment: "Fits BA / BF Falcon",
    inStock: true,
    stockCount: 2,
  },
  {
    id: "u1",
    kind: "person",
    score: 76,
    name: "Brent Holloway",
    role: "Senior technician · BA Falcon specialist",
    workshop: "Bay 01 · Oak Flats",
    email: "brent@mufflermen.au",
    phone: "+61400000001",
    available: true,
  },
  {
    id: "p3",
    kind: "product",
    score: 64,
    title: "Manta MM-220 midpipe, mandrel-bent 3 inch",
    sku: "MM-220",
    price: "$640",
    supplier: "Manta",
    fitment: "Universal · 3-inch",
    inStock: false,
  },
  {
    id: "f2",
    kind: "file",
    score: 58,
    name: "Bay 04 — VE Commodore catback.jpg",
    path: "/jobs/2415/photos/bay-04-catback-fit.jpg",
    size: "3.8 MB",
    modifiedAt: "2026-05-27T15:22:00+10:00",
    modifiedLabel: "Yesterday",
    fileKind: "image",
    ownerName: "Brent Holloway",
  },
  {
    id: "p4",
    kind: "product",
    score: 47,
    title: "X-Force XF-Tip-04 polished exhaust tip 4 inch",
    sku: "XF-TIP-04",
    price: "$118",
    supplier: "X-Force",
    fitment: "Universal",
    inStock: true,
    stockCount: 26,
  },
]

function toggleSetMember(
  current: ReadonlySet<string>,
  id: string,
  next: boolean,
): Set<string> {
  const out = new Set(current)
  if (next) out.add(id)
  else out.delete(id)
  return out
}

function formatPrice(value: number): string {
  return `$${value.toLocaleString()}`
}

export function FullSceneDemo() {
  const [query, setQuery] = useState<string>("BA Falcon catback")
  const [state, setState] = useState<SidebarState>(INITIAL)
  const [sort, setSort] = useState<SortOption>("relevance")
  const [page, setPage] = useState<number>(1)

  const groups = useMemo<ReadonlyArray<FacetGroup>>(
    () => [
      {
        id: "category",
        heading: "Category",
        kind: "checkbox",
        defaultOpen: true,
        options: [
          { id: "mufflers", label: "Mufflers", count: 184, checked: state.categories.has("mufflers") },
          { id: "headers", label: "Headers", count: 92, checked: state.categories.has("headers") },
          { id: "midpipes", label: "Midpipes", count: 142, checked: state.categories.has("midpipes") },
          { id: "catbacks", label: "Catbacks", count: 76, checked: state.categories.has("catbacks") },
        ],
      },
      {
        id: "price",
        heading: "Max price",
        kind: "range",
        defaultOpen: true,
        range: { min: 0, max: 4000, step: 50, current: state.maxPrice, format: formatPrice },
      },
      {
        id: "fitment",
        heading: "Vehicle",
        kind: "chip",
        defaultOpen: true,
        options: [
          { id: "ba-falcon", label: "BA Falcon", selected: state.fitments.has("ba-falcon") },
          { id: "ve-commodore", label: "VE Commodore", selected: state.fitments.has("ve-commodore") },
          { id: "hilux", label: "Hilux", selected: state.fitments.has("hilux") },
          { id: "ranger", label: "Ranger", selected: state.fitments.has("ranger") },
        ],
      },
      {
        id: "stock",
        heading: "Availability",
        kind: "toggle",
        defaultOpen: true,
        toggleLabel: "In stock only",
        toggleOn: state.inStock,
      },
    ],
    [state],
  )

  const activeFilters = useMemo<ReadonlyArray<ActiveFilter>>(() => {
    const out: ActiveFilter[] = []
    state.categories.forEach((id) => {
      out.push({ id: `cat-${id}`, group: "Category", label: id, value: id })
    })
    state.fitments.forEach((id) => {
      out.push({ id: `fit-${id}`, group: "Vehicle", label: id, value: id })
    })
    if (state.maxPrice < 4000) {
      out.push({
        id: "price-max",
        group: "Max price",
        label: formatPrice(state.maxPrice),
        value: String(state.maxPrice),
      })
    }
    if (state.inStock) {
      out.push({ id: "stock-in", group: "Stock", label: "In stock", value: "in-stock" })
    }
    return out
  }, [state])

  const handleCheckbox = (groupId: string, optionId: string, next: boolean) => {
    if (groupId !== "category") return
    setState((prev) => ({ ...prev, categories: toggleSetMember(prev.categories, optionId, next) }))
  }
  const handleChip = (groupId: string, optionId: string, next: boolean) => {
    if (groupId !== "fitment") return
    setState((prev) => ({ ...prev, fitments: toggleSetMember(prev.fitments, optionId, next) }))
  }
  const handleRange = (groupId: string, value: number) => {
    if (groupId !== "price") return
    setState((prev) => ({ ...prev, maxPrice: value }))
  }
  const handleToggle = (groupId: string, next: boolean) => {
    if (groupId !== "stock") return
    setState((prev) => ({ ...prev, inStock: next }))
  }
  const handleClear = () => setState({ categories: new Set(), fitments: new Set(), maxPrice: 4000, inStock: false })

  const handleDismissFilter = (filter: ActiveFilter) => {
    setState((prev) => {
      if (filter.group === "Category") {
        return { ...prev, categories: toggleSetMember(prev.categories, filter.value, false) }
      }
      if (filter.group === "Vehicle") {
        return { ...prev, fitments: toggleSetMember(prev.fitments, filter.value, false) }
      }
      if (filter.group === "Max price") {
        return { ...prev, maxPrice: 4000 }
      }
      if (filter.group === "Stock") {
        return { ...prev, inStock: false }
      }
      return prev
    })
  }

  const handleSortChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSort(event.target.value as SortOption)
    setPage(1)
  }

  const totalCount = 427

  return (
    <div className={styles.stage}>
      <div style={{ display: "grid", gap: 18 }}>
        <GlobalSearchBar
          value={query}
          onValueChange={setQuery}
          tone="neutral"
          placeholder="Search the workshop — parts, jobs, vehicles, people…"
        />

        <div className={styles.scene}>
          <FacetedFilterSidebar
            heading="Refine"
            groups={groups}
            appliedCount={activeFilters.length}
            onCheckboxToggle={handleCheckbox}
            onChipToggle={handleChip}
            onRangeChange={handleRange}
            onToggleChange={handleToggle}
            onClearAll={handleClear}
          />

          <div className={styles.sceneMain}>
            <ActiveFilterChipBar
              filters={activeFilters}
              onDismiss={handleDismissFilter}
              onClearAll={handleClear}
            />

            <div className={styles.sceneToolbar}>
              <span
                className={styles.sceneCount}
                role="status"
                aria-live="polite"
              >
                {totalCount.toLocaleString()} results · page {page} of 18
              </span>
              <div className={styles.sortGroup}>
                <label htmlFor="full-scene-sort" className={styles.sortLabel}>
                  Sort
                </label>
                <select
                  id="full-scene-sort"
                  className={styles.sortSelect}
                  value={sort}
                  onChange={handleSortChange}
                >
                  {(Object.keys(SORT_LABELS) as ReadonlyArray<SortOption>).map((option) => (
                    <option key={option} value={option}>
                      {SORT_LABELS[option]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className={styles.resultsWrap}>
              {RESULTS.map((result) => (
                <div key={result.id} style={{ display: "grid", gap: "var(--primitive-space-1-5)" }}>
                  {result.kind === "product" ? (
                    <SearchResultProduct
                      href="#"
                      title={result.title}
                      sku={result.sku}
                      price={result.price}
                      supplier={result.supplier}
                      fitment={result.fitment}
                      inStock={result.inStock}
                      stockCount={result.stockCount}
                    />
                  ) : null}
                  {result.kind === "file" ? (
                    <SearchResultFile
                      href="#"
                      kind={result.fileKind}
                      name={result.name}
                      path={result.path}
                      size={result.size}
                      modifiedAt={result.modifiedAt}
                      modifiedLabel={result.modifiedLabel}
                      ownerName={result.ownerName}
                    />
                  ) : null}
                  {result.kind === "person" ? (
                    <SearchResultPerson
                      name={result.name}
                      role={result.role}
                      workshop={result.workshop}
                      email={result.email}
                      phone={result.phone}
                      available={result.available}
                    />
                  ) : null}
                  <RelevanceBar score={result.score} size="sm" />
                </div>
              ))}
            </div>

            <div style={{ paddingTop: "var(--primitive-space-1-5)" }}>
              <Pagination
                page={page}
                pageCount={18}
                onPageChange={setPage}
                showGoTo={false}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
