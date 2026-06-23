"use client"

import Link from "next/link"
import { Search, X } from "lucide-react"
import * as React from "react"

type PartSearchItem = {
  slug: string
  sku: string
  title: string
  supplier: string
  category: string
  image: string
  rrp: number
  q?: string
  rowIndex: number
}

type PreparedPartSearchItem = PartSearchItem & {
  searchText: string
  skuText: string
  titleText: string
  supplierText: string
  categoryText: string
}

type CompactPartSearchPayloadV2 = {
  v: 2
  suppliers: string[]
  categories: string[]
  images: string[]
  items: Array<[string, string, string, number, number, number, number, string?]>
}

type CompactPartSearchPayloadV3 = {
  v: 3
  suppliers: string[]
  categories: string[]
  items: Array<[string, string, string, number, number, number, string?]>
}

type CompactPartSearchMediaPayload = {
  v: 1
  placeholder?: string
  images: string[]
  itemImages: number[]
}

type PartSearchPayload =
  | PartSearchItem[]
  | CompactPartSearchPayloadV2
  | CompactPartSearchPayloadV3

type IdleWindow = Window & {
  requestIdleCallback?: (callback: () => void, options?: { timeout?: number }) => number
  cancelIdleCallback?: (handle: number) => void
}

const PART_PLACEHOLDER_IMAGE = "/media/parts/placeholder.webp"

const categoryLabels: Record<string, string> = {
  "complete-exhaust-systems": "Performance systems",
  "mufflers-resonators": "Accessory components",
  "exhaust-pipes-tips": "Fitment hardware",
  "extractors-headers": "Engine support",
  "performance-chips-ecu-remaps": "ECU and chips",
  "cold-air-induction": "Intakes",
  "fasteners-fittings": "Fittings",
  "4x4-lighting-accessories": "4x4 lighting",
  "towing-4x4-accessories": "Towing accessories",
  "suspension-4x4-parts": "Suspension",
  "filters-engine-bay-accessories": "Filters",
}

function normalizePartsPayload(payload: PartSearchPayload): PartSearchItem[] {
  if (Array.isArray(payload)) {
    return payload.map((item, rowIndex) => ({
      ...item,
      image: item.image || PART_PLACEHOLDER_IMAGE,
      rowIndex,
    }))
  }

  if (payload.v === 2) {
    return payload.items.map(([slug, sku, title, supplierIndex, categoryIndex, imageIndex, rrp, q], rowIndex) => ({
      slug,
      sku,
      title,
      supplier: payload.suppliers[supplierIndex] ?? "",
      category: payload.categories[categoryIndex] ?? "",
      image: payload.images[imageIndex] ?? PART_PLACEHOLDER_IMAGE,
      rrp,
      q,
      rowIndex,
    }))
  }

  return payload.items.map(([slug, sku, title, supplierIndex, categoryIndex, rrp, q], rowIndex) => ({
    slug,
    sku,
    title,
    supplier: payload.suppliers[supplierIndex] ?? "",
    category: payload.categories[categoryIndex] ?? "",
    image: PART_PLACEHOLDER_IMAGE,
    rrp,
    q,
    rowIndex,
  }))
}

function hydratePartsMedia(
  items: PartSearchItem[],
  payload: CompactPartSearchMediaPayload,
): PartSearchItem[] {
  const placeholder = payload.placeholder ?? PART_PLACEHOLDER_IMAGE
  return items.map((item) => {
    const imageIndex = payload.itemImages[item.rowIndex]
    const image = payload.images[imageIndex] ?? placeholder
    return image === item.image ? item : { ...item, image }
  })
}

function hasRealImage(image: string) {
  const normalized = image.replace(/\\/g, "/").toLowerCase()
  return Boolean(normalized && normalized !== PART_PLACEHOLDER_IMAGE && !normalized.endsWith("/placeholder.webp"))
}

function hasSupplierWatermark(item: PartSearchItem) {
  return /\b(mpi|manta)\b/i.test(item.supplier)
}

function normalizeSearchText(value?: string) {
  return (value ?? "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
}

function compactSearchText(value: string) {
  return value.replace(/\s+/g, "")
}

function prepareSearchItem(item: PartSearchItem): PreparedPartSearchItem {
  const skuText = normalizeSearchText(item.sku)
  const titleText = normalizeSearchText(item.title)
  const supplierText = normalizeSearchText(item.supplier)
  const categoryText = normalizeSearchText(`${categoryLabels[item.category] ?? item.category} ${item.category}`)
  const extraText = normalizeSearchText(item.q)
  const searchText = [
    skuText,
    compactSearchText(skuText),
    titleText,
    supplierText,
    categoryText,
    extraText,
  ]
    .filter(Boolean)
    .join(" ")

  return {
    ...item,
    searchText,
    skuText,
    titleText,
    supplierText,
    categoryText,
  }
}

function scoreSearchItem(item: PreparedPartSearchItem, terms: string[]) {
  if (terms.length === 0) {
    return Number(hasRealImage(item.image)) * 10 + Math.min(item.rrp / 1000, 10)
  }

  let score = 0
  const compactSku = compactSearchText(item.skuText)

  for (const term of terms) {
    const compactTerm = compactSearchText(term)
    if (!item.searchText.includes(term) && !compactSku.includes(compactTerm)) {
      return -1
    }

    if (item.skuText === term || compactSku === compactTerm) score += 260
    else if (item.skuText.startsWith(term) || compactSku.startsWith(compactTerm)) score += 210
    else if (item.skuText.includes(term) || compactSku.includes(compactTerm)) score += 150

    if (item.titleText.startsWith(term)) score += 100
    else if (item.titleText.includes(` ${term}`)) score += 78
    else if (item.titleText.includes(term)) score += 46

    if (item.supplierText.includes(term)) score += 34
    if (item.categoryText.includes(term)) score += 28
  }

  return score + Number(hasRealImage(item.image)) * 18 + Math.min(item.rrp / 1500, 8)
}

export function PartsLookup() {
  const [items, setItems] = React.useState<PartSearchItem[]>([])
  const [query, setQuery] = React.useState("")
  const [category, setCategory] = React.useState("all")
  const [isLoaded, setIsLoaded] = React.useState(false)
  const deferredQuery = React.useDeferredValue(query)

  React.useEffect(() => {
    let active = true
    let idleHandle: number | undefined
    let timeoutHandle: number | undefined

    const loadMedia = () => {
      fetch("/data/parts-search-media.json")
        .then((response) => (response.ok ? response.json() : null))
        .then((payload: CompactPartSearchMediaPayload | null) => {
          if (active && payload?.v === 1) {
            setItems((current) => hydratePartsMedia(current, payload))
          }
        })
        .catch(() => {
          // Search remains usable with placeholders if deferred thumbnails fail.
        })
    }

    const scheduleMediaLoad = () => {
      const idleWindow = window as IdleWindow
      if (idleWindow.requestIdleCallback) {
        idleHandle = idleWindow.requestIdleCallback(loadMedia, { timeout: 2000 })
        return
      }
      timeoutHandle = window.setTimeout(loadMedia, 300)
    }

    fetch("/data/parts-search.json")
      .then((response) => (response.ok ? response.json() : []))
      .then((payload: PartSearchPayload) => {
        if (active) {
          setItems(normalizePartsPayload(payload))
          setIsLoaded(true)
          scheduleMediaLoad()
        }
      })
      .catch(() => {
        if (active) {
          setItems([])
          setIsLoaded(true)
        }
      })
    return () => {
      active = false
      const idleWindow = window as IdleWindow
      if (idleHandle !== undefined && idleWindow.cancelIdleCallback) {
        idleWindow.cancelIdleCallback(idleHandle)
      }
      if (timeoutHandle !== undefined) {
        window.clearTimeout(timeoutHandle)
      }
    }
  }, [])

  const preparedItems = React.useMemo(() => items.map(prepareSearchItem), [items])

  const categories = React.useMemo(() => {
    return Array.from(new Set(items.map((item) => item.category))).sort()
  }, [items])

  const searchState = React.useMemo(() => {
    const terms = normalizeSearchText(deferredQuery)
      .split(/\s+/)
      .map((term) => term.trim())
      .filter(Boolean)

    const ranked = preparedItems
      .filter((item) => category === "all" || item.category === category)
      .map((item) => ({ item, score: scoreSearchItem(item, terms) }))
      .filter((entry) => entry.score >= 0)
      .sort((a, b) => {
        return (
          b.score - a.score ||
          Number(hasRealImage(b.item.image)) - Number(hasRealImage(a.item.image)) ||
          b.item.rrp - a.item.rrp
        )
      })
      .map((entry) => entry.item)

    return {
      results: ranked.slice(0, 48),
      total: ranked.length,
      terms,
    }
  }, [category, deferredQuery, preparedItems])

  const { results, total, terms } = searchState
  const selectedCategoryLabel = category === "all" ? "all categories" : (categoryLabels[category] ?? category)
  const isFiltering = terms.length > 0 || category !== "all"

  return (
    <section className="parts-lookup" aria-label="Parts lookup">
      <div className="parts-lookup-head">
        <div>
          <span className="seo-kicker">Live catalogue lookup</span>
          <h2>Search by part number, vehicle, brand or 4x4 category</h2>
        </div>
        <span className="parts-count">
          {isLoaded ? `${items.length.toLocaleString()} parts loaded` : "Loading catalogue"}
        </span>
      </div>

      <div className="parts-search-row">
        <label className="parts-search-field">
          <Search aria-hidden="true" size={18} />
          <span className="sr-only">Search parts</span>
          <input
            aria-label="Search parts"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Try Hilux, Patrol, suspension, lighting, recovery..."
            autoComplete="off"
          />
          {query && (
            <button
              className="parts-search-clear"
              type="button"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <X aria-hidden="true" size={16} />
            </button>
          )}
        </label>
        <label className="parts-filter">
          <span className="sr-only">Filter category</span>
          <select
            aria-label="Filter category"
            value={category}
            onChange={(event) => setCategory(event.target.value)}
          >
            <option value="all">All categories</option>
            {categories.map((slug) => (
              <option key={slug} value={slug}>
                {categoryLabels[slug] ?? slug}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="parts-lookup-status" aria-live="polite">
        {isLoaded ? (
          <span>
            Showing {results.length.toLocaleString()} of {total.toLocaleString()} matches in {selectedCategoryLabel}.
          </span>
        ) : (
          <span>Loading parts, images and prices.</span>
        )}
        {isFiltering && (
          <button type="button" onClick={() => {
            setQuery("")
            setCategory("all")
          }}>
            Reset filters
          </button>
        )}
      </div>

      <div className="parts-results">
        {results.length ? results.map((item) => {
          const hasImage = hasRealImage(item.image)
          const hasWatermark = hasSupplierWatermark(item)

          return (
            <Link
              className={`part-result glass ${hasImage ? "has-media" : "needs-media"}`}
              key={item.slug}
              href={`/parts/${item.slug}`}
            >
              <span className={`part-result-media ${hasWatermark ? "supplier-watermark-media" : ""}`}>
                {hasImage ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={item.image}
                    alt={`${item.title} product thumbnail`}
                    width={120}
                    height={120}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span className="part-result-fallback" aria-label="Product media pending">
                    {categoryLabels[item.category] ?? "Specs"}
                  </span>
                )}
              </span>
              <span className="seo-kicker">{item.sku}</span>
              <strong>{item.title}</strong>
              <small>{item.supplier}</small>
              <span className="part-result-price">
                {item.rrp > 0 ? (
                  <>
                    <span className="part-result-price-prefix">RRP</span>
                    {`$${item.rrp.toFixed(2)}`}
                  </>
                ) : (
                  <span className="part-result-price-prefix">RRP pending</span>
                )}
              </span>
            </Link>
          )
        }) : (
          <div className="parts-empty glass">
            <strong>{isLoaded ? "No matching parts found" : "Loading parts"}</strong>
            <span>
              {isLoaded
                ? "Try a shorter part number, vehicle model, supplier name or category."
                : "The catalogue index is being prepared."}
            </span>
          </div>
        )}
      </div>
    </section>
  )
}
