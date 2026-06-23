import type { MetadataRoute } from "next"

import rawSupplierParts from "../../data/parts/parts.json"

import { absoluteUrl, seoLastModified } from "@/lib/seo"

export type PartSeoMode = "rich" | "standard"

export type SupplierPart = {
  slug: string
  sourceUid?: string
  sourceOrdinal?: number
  sku: string
  title: string
  supplier: string
  supplierCode?: string
  brand?: string
  category: string
  rawCategories?: string[]
  tags?: string[]
  subcategory?: string
  image: string
  images?: string[]
  imageAlt: string
  rrp: number
  salePrice?: number
  currency: "AUD"
  stockStatus?: string
  specs: Record<string, string>
  summary?: string
  commentary?: string
  seoMode: PartSeoMode
  metaTitle?: string
  metaDescription?: string
  keywords?: string[]
  vehicleFitment?: string
  targetVehicle?: string
  sourceUrl?: string
}

export type PartCategory = {
  slug: string
  title: string
  description: string
  seoMode: PartSeoMode
}

export const PART_CATEGORY_PAGE_SIZE = 96

const WOLFPACK_PART_CATEGORY_SLUGS = new Set([
  "suspension-4x4-parts",
  "towing-4x4-accessories",
  "4x4-lighting-accessories",
  "filters-engine-bay-accessories",
  "performance-chips-ecu-remaps",
  "cold-air-induction",
])

export const partCategories: PartCategory[] = [
  {
    slug: "performance-chips-ecu-remaps",
    title: "Performance 4x4 engine support",
    description:
      "Performance chips, ECU support and drivability parts that suit towing, touring and work utes.",
    seoMode: "rich",
  },
  {
    slug: "cold-air-induction",
    title: "Cold air induction and intake support",
    description:
      "Cold air induction systems and intake support parts for practical 4x4 performance upgrades.",
    seoMode: "rich",
  },
  {
    slug: "4x4-lighting-accessories",
    title: "4x4 lighting and accessories",
    description:
      "Off-road lighting and accessory catalogue rows for bars, racks, work lights and touring setups.",
    seoMode: "rich",
  },
  {
    slug: "towing-4x4-accessories",
    title: "Towing and 4x4 accessories",
    description:
      "Towbar, wiring, recovery and 4x4 accessory rows with supplier specs and RRP pricing for lookup support.",
    seoMode: "rich",
  },
  {
    slug: "suspension-4x4-parts",
    title: "Suspension and lift components",
    description:
      "Shock absorbers, springs and 4x4 suspension catalogue rows for lift, load and touring support.",
    seoMode: "rich",
  },
  {
    slug: "filters-engine-bay-accessories",
    title: "Filters and engine bay accessories",
    description:
      "Filter kits, catch cans and engine bay accessory rows for 4x4 maintenance and performance support.",
    seoMode: "standard",
  },
]

export const supplierParts = (rawSupplierParts as SupplierPart[]).filter((part) =>
  WOLFPACK_PART_CATEGORY_SLUGS.has(part.category),
)

export function getPart(slug: string) {
  return supplierParts.find((part) => part.slug === slug)
}

export function getPartCategory(slug: string) {
  return partCategories.find((category) => category.slug === slug)
}

export function partsInCategory(slug: string) {
  return supplierParts.filter((part) => part.category === slug)
}

export function categoryCount(slug: string) {
  return supplierParts.reduce((count, part) => count + (part.category === slug ? 1 : 0), 0)
}

export function sortedPartsInCategory(slug: string) {
  return supplierParts
    .filter((part) => part.category === slug)
    .sort(
      (a, b) =>
        Number(hasRealPartImage(b)) - Number(hasRealPartImage(a)) ||
        Number(b.seoMode === "rich") - Number(a.seoMode === "rich") ||
        b.rrp - a.rrp,
    )
}

export function featuredPartsInCategory(slug: string, limit = PART_CATEGORY_PAGE_SIZE) {
  return sortedPartsInCategory(slug)
    .slice(0, limit)
}

export function partCategoryPageCount(slug: string, pageSize = PART_CATEGORY_PAGE_SIZE) {
  return Math.max(1, Math.ceil(categoryCount(slug) / pageSize))
}

export function partCategoryPagePath(slug: string, page: number) {
  return page <= 1 ? `/parts/category/${slug}` : `/parts/category/${slug}/page/${page}`
}

export function partsInCategoryPage(slug: string, page: number, pageSize = PART_CATEGORY_PAGE_SIZE) {
  const safePage = Math.max(1, Math.floor(page) || 1)
  const start = (safePage - 1) * pageSize
  return sortedPartsInCategory(slug).slice(start, start + pageSize)
}

export function isPlaceholderPartImage(image?: string) {
  const normalized = image?.replace(/\\/g, "/").toLowerCase() ?? ""
  return normalized === "/media/parts/placeholder.webp" || normalized.endsWith("/placeholder.webp")
}

export function hasRealPartImage(part: SupplierPart) {
  return Boolean(part.image && !isPlaceholderPartImage(part.image))
}

export function cleanSpecialOrderText(value: string) {
  return value
    .replace(/\*{2,}\s*special\s+order\s+item\s*\*{2,}/gi, "Special order item")
    .replace(/\*{2,}/g, "")
    .replace(/\s+/g, " ")
    .trim()
}

export function cleanProductFeedCopy(value: string) {
  return cleanSpecialOrderText(value)
    // Owner rule: no em or en dashes anywhere in rendered copy; feed
    // summaries also bake "•" artifacts mid-word.
    .replace(/(\w)•(\w)/g, "$1-$2")
    .replace(/\s*•\s*/g, ", ")
    .replace(/\s*[—–]\s*/g, ", ")
    .replace(/\s*RRP\s+pending\s+at\s+[^.]+\.{0,3}/gi, "")
    .replace(/\s+at\s+RRP\s+pending\b/gi, " with price confirmed before ordering")
    .replace(/\bRRP\s*:\s*pending\b/gi, "RRP: confirm with supplier")
    .replace(/\bRRP\s+pending\b/gi, "price confirmed before ordering")
    .replace(/\s+at\s+[^.]+\.{2,}$/i, "")
    // Feed summaries arrive truncated mid-word ("quality. Fast sh..."); drop
    // the dangling fragment (up to two tokens) so copy ends on a whole sentence.
    .replace(/(?:\s+\S+){0,2}\.{2,}\s*$/, ".")
    .replace(/\.{2,}/g, ".")
    .replace(/\s+([,.;:])/g, "$1")
    .replace(/\s+/g, " ")
    .trim()
}

export function displayPartTitle(part: SupplierPart | string, maxLength = 72) {
  const title = typeof part === "string" ? part : part.title
  return compactPartTitle(
    cleanSpecialOrderText(title)
      .replace(/^(shop|buy)\s+/i, "")
      .replace(/\s+/g, " ")
      .trim(),
    maxLength,
  )
}

export function cleanProductSummary(part: SupplierPart, fallbackLength = 72) {
  const raw =
    part.summary ??
    `${displayPartTitle(part, fallbackLength)} supplied by ${part.supplier} with specs available for workshop fitment checks.`
  const cleaned = cleanProductFeedCopy(raw)
    .replace(/^(shop|buy)\s+(this\s+)?/i, "")
    .trim()

  if (cleaned.length >= 32) return cleaned
  return `${displayPartTitle(part, fallbackLength)} supplied by ${part.supplier} with specs available for workshop fitment checks.`
}

export function compactPartTitle(title: string, maxLength = 54) {
  const normalized = title.replace(/\s+/g, " ").trim()
  if (normalized.length <= maxLength) return normalized

  const words = normalized.split(" ")
  let compact = ""
  for (const word of words) {
    const next = compact ? `${compact} ${word}` : word
    if (next.length > maxLength) break
    compact = next
  }

  return (compact || normalized.slice(0, maxLength)).replace(/[\s,.;:-]+$/, "")
}

export function partMetadataTitle(part: SupplierPart) {
  // Feed metaTitle fields hide em dashes (4,401 of them) — the page-wide
  // dash ban includes the SERP-visible title.
  const base = part.metaTitle
    ? cleanSpecialOrderText(part.metaTitle).replace(/\s*[—–]\s*/g, ", ").replace(/\s*•\s*/g, ", ")
    : displayPartTitle(part)
  return `${compactPartTitle(base, 58)} | ${part.sku}`
}

export function partMetadataDescription(part: SupplierPart) {
  return part.metaDescription
    ? cleanProductFeedCopy(part.metaDescription)
    : cleanProductSummary(part, 82)
}

export function shouldEmitPartProductJsonLd(part: SupplierPart) {
  // Emit Product + image structured data for every part that has a real image
  // so each part image is registered with Google (price `offers` are still only
  // added when the RRP is known — see partJsonLd). This makes all ~19.5k part
  // pages first-class, image-backed content assets for search.
  return hasRealPartImage(part)
}

// ALL-CAPS makes from the feed ("CHEVROLET") read as shouting in the
// visible specs table, and feed taxonomy ("4x4 Exhausts - Toyota") is
// not a vehicle: junk renders nothing.
function titleCaseFitment(value: string) {
  if (!value) return value
  if (/( - )|\b(exhausts?|mufflers?|extractors?|performance car|universal|commercial|accessor)/i.test(value)) return ""
  if (value !== value.toUpperCase()) return value
  return value
    .toLowerCase()
    .replace(/(^|[\s/-])([a-z])/g, (m, pre: string, ch: string) => pre + ch.toUpperCase())
}

export function partSpecEntries(part: SupplierPart) {
  const sourceSpecs = Object.entries(part.specs ?? {}).filter(([, value]) => String(value).trim())
  if (sourceSpecs.length) return sourceSpecs

  const fallbackSpecs: Array<[string, string]> = [
    ["SKU", part.sku],
    ["Supplier", part.supplier],
    ["Category", getPartCategory(part.category)?.title ?? part.category],
    ["RRP", part.rrp > 0 ? `$${part.rrp.toLocaleString("en-AU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${part.currency}` : "RRP pending"],
    ["Brand", part.brand ?? ""],
    ["Vehicle fitment", titleCaseFitment(part.vehicleFitment || part.targetVehicle || "")],
    [
      "Stock status",
      part.stockStatus === "IN_STOCK"
        ? "In stock at supplier"
        : part.stockStatus === "OUT_OF_STOCK"
          ? "Order in"
          : part.stockStatus
            ? "Confirmed on order"
            : "",
    ],
    ["Source ID", part.sourceUid ?? ""],
  ]

  return fallbackSpecs.filter(([, value]) => value.trim())
}

export function partRouteEntries(): MetadataRoute.Sitemap {
  const categoryRoutes = partCategories.map((category) => ({
    url: absoluteUrl(`/parts/category/${category.slug}`),
    priority: category.seoMode === "rich" ? 0.72 : 0.45,
    changeFrequency: "weekly" as const,
    lastModified: seoLastModified,
  }))

  const paginatedCategoryRoutes = partCategories.flatMap((category) =>
    Array.from({ length: Math.max(0, partCategoryPageCount(category.slug) - 1) }, (_, index) => {
      const page = index + 2
      return {
        url: absoluteUrl(partCategoryPagePath(category.slug, page)),
        priority: category.seoMode === "rich" ? 0.6 : 0.38,
        changeFrequency: "weekly" as const,
        lastModified: seoLastModified,
      }
    }),
  )

  const partRoutes = supplierParts.filter(hasRealPartImage).map((part) => ({
    url: absoluteUrl(`/parts/${part.slug}`),
    priority: part.seoMode === "rich" ? 0.66 : 0.48,
    changeFrequency: "weekly" as const,
    lastModified: seoLastModified,
    images: [absoluteUrl(part.image)],
  }))

  return [
    {
      url: absoluteUrl("/parts"),
      priority: 0.78,
      changeFrequency: "weekly",
      lastModified: seoLastModified,
    },
    ...categoryRoutes,
    ...paginatedCategoryRoutes,
    ...partRoutes,
  ]
}

export function partJsonLd(part: SupplierPart) {
  const product: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "Product",
    "@id": `${absoluteUrl(`/parts/${part.slug}`)}#product`,
    url: absoluteUrl(`/parts/${part.slug}`),
    name: displayPartTitle(part, 110),
    sku: part.sku,
    brand: part.brand
      ? {
          "@type": "Brand",
          name: part.brand,
        }
      : undefined,
    description: cleanProductSummary(part, 110),
    category: getPartCategory(part.category)?.title ?? part.category,
    additionalProperty: partSpecEntries(part).map(([name, value]) => ({
      "@type": "PropertyValue",
      name,
      value,
    })),
  }

  if (hasRealPartImage(part)) {
    product.image = absoluteUrl(part.image)
  }

  if (part.rrp > 0) {
    product.offers = {
      "@type": "Offer",
      price: part.rrp,
      priceCurrency: part.currency,
      itemCondition: "https://schema.org/NewCondition",
      availability:
        part.stockStatus && /out/i.test(part.stockStatus)
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      seller: {
        "@type": "AutoPartsStore",
        name: "Wolfpack 4x4",
        url: absoluteUrl("/"),
      },
    }
  }

  return product
}
