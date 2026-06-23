import type { Metadata, MetadataRoute } from "next"

import { business, siteUrl } from "@/lib/site-data"

import { allPrimitives, families, type PrimitiveEntry } from "./registry"

export const uiPrimitiveSeoLastModified = new Date("2026-06-02")

const collectionPath = "/ui-primitives"
const collectionUrl = absoluteUrl(collectionPath)
const collectionDescription =
  "Production UI primitive catalogue for Oak Flats Muffler Men, covering reusable components, app shells, workflow surfaces, accessibility states, theme behavior, and implementation evidence."

const familyById = new Map(families.map((family) => [family.family, family]))

const uniqueRoutedPrimitives = Array.from(
  new Map(
    allPrimitives
      .filter((primitive): primitive is PrimitiveEntry & { routeHref: string } => Boolean(primitive.routeHref))
      .map((primitive) => [normalisePath(primitive.routeHref), primitive]),
  ).values(),
)

const primitiveByRoute = new Map(
  uniqueRoutedPrimitives.map((primitive) => [normalisePath(primitive.routeHref), primitive]),
)

function absoluteUrl(path = "/") {
  if (path === "/") return siteUrl
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`
}

export type UiPrimitiveSeoRecord = {
  path: string
  url: string
  title: string
  familyTitle: string
  metaTitle: string
  metaDescription: string
  answerSummary: string
  extractableAnswer: string
  primaryCta: string
  secondaryCta: string
  keywords: readonly string[]
  jsonLd: unknown
}

export type UiPrimitiveSeoInput = {
  pathname?: string | null
  title: string
  description?: string
  crumbs?: ReadonlyArray<{ label: string; href?: string }>
  dnaLabel?: string
}

export function normalisePath(path: string | null | undefined) {
  if (!path) return collectionPath
  const withoutQuery = path.split("?")[0]?.split("#")[0] ?? collectionPath
  if (withoutQuery === "/") return "/"
  return withoutQuery.replace(/\/+$/, "") || collectionPath
}

export function getUiPrimitiveByRoute(pathname: string | null | undefined) {
  return primitiveByRoute.get(normalisePath(pathname))
}

export function getUiPrimitivePageSeo(input: UiPrimitiveSeoInput): UiPrimitiveSeoRecord {
  const path = normalisePath(input.pathname)
  const primitive = getUiPrimitiveByRoute(path)
  const family = primitive ? familyById.get(primitive.family) : undefined
  const familyTitle = cleanText(family?.title ?? input.dnaLabel ?? "UI primitives")
  const title = cleanText(primitive?.label ?? input.title)
  const sourceDescription = cleanText(
    primitive?.description ?? input.description ?? family?.summary ?? collectionDescription,
  )
  const kindLabel = primitive ? primitiveKindLabel(primitive.kind) : "primitive route"
  const metaTitle = path === collectionPath
    ? "Oak Flats UI Primitives Catalogue"
    : `${title} | Oak Flats UI Primitive`
  const metaDescription = clampSentence(
    `${title} is a production-ready ${kindLabel} in the Oak Flats Muffler Men design system. ${sourceDescription} Review states, accessibility, theme behavior, and implementation evidence before shipping.`,
    220,
  )
  const answerSummary = clampSentence(
    `${title} documents a production ${kindLabel} for ${familyTitle}. It explains the surface, its workshop use case, and the evidence needed to reuse it safely across Oak Flats Muffler Men workflows.`,
    260,
  )
  const extractableAnswer = clampSentence(
    `${title} is part of the Oak Flats Muffler Men UI primitive catalogue. Use this route to inspect the component purpose, interaction states, accessibility expectations, responsive behavior, theme coverage, and handoff evidence for production builds.`,
    280,
  )
  const primaryCta = primitive && ["scene", "section"].includes(primitive.kind)
    ? `Review ${title} composition`
    : `Inspect ${title} states`
  const secondaryCta = `Apply ${familyTitle} patterns`
  const keywords = [
    title,
    familyTitle,
    "Oak Flats Muffler Men UI primitive",
    "production design system",
    "accessible component states",
    ...(primitive?.tags ?? []),
  ].map(cleanText)

  const record: Omit<UiPrimitiveSeoRecord, "jsonLd"> = {
    path,
    url: absoluteUrl(path),
    title,
    familyTitle,
    metaTitle,
    metaDescription,
    answerSummary,
    extractableAnswer,
    primaryCta,
    secondaryCta,
    keywords,
  }

  return {
    ...record,
    jsonLd: uiPrimitivePageJsonLd(record, input.crumbs),
  }
}

export function uiPrimitivesCollectionSeo(): UiPrimitiveSeoRecord {
  return getUiPrimitivePageSeo({
    pathname: collectionPath,
    title: "Oak Flats UI Primitives Catalogue",
    description: collectionDescription,
    crumbs: [{ label: "UI Primitives", href: collectionPath }],
  })
}

export function uiPrimitivesMetadataForPath(pathname?: string | null): Metadata {
  const seo = getUiPrimitivePageSeo({
    pathname,
    title: "Oak Flats UI Primitives Catalogue",
    description: collectionDescription,
  })

  return {
    title: {
      default: seo.metaTitle,
      template: "%s | Oak Flats UI Primitives",
    },
    description: seo.metaDescription,
    alternates: {
      canonical: seo.url,
    },
    openGraph: {
      type: "website",
      title: seo.metaTitle,
      description: seo.metaDescription,
      url: seo.url,
      siteName: business.name,
      locale: "en_AU",
    },
    twitter: {
      card: "summary_large_image",
      title: seo.metaTitle,
      description: seo.metaDescription,
    },
    robots: uiPrimitivesRobots,
  }
}

export const uiPrimitivesRobots: NonNullable<Metadata["robots"]> = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
}

export function uiPrimitiveRouteEntries(): MetadataRoute.Sitemap {
  const routeEntries = uniqueRoutedPrimitives.map((primitive) => {
    const path = normalisePath(primitive.routeHref)
    const depth = path.split("/").filter(Boolean).length

    return {
      url: absoluteUrl(path),
      priority: depth <= 2 ? 0.62 : depth === 3 ? 0.48 : 0.36,
      changeFrequency: "monthly" as const,
      lastModified: uiPrimitiveSeoLastModified,
    }
  })

  return [
    {
      url: collectionUrl,
      priority: 0.72,
      changeFrequency: "weekly",
      lastModified: uiPrimitiveSeoLastModified,
    },
    ...routeEntries,
  ]
}

export function allUiPrimitiveSeoRecords(): readonly UiPrimitiveSeoRecord[] {
  return [
    uiPrimitivesCollectionSeo(),
    ...uniqueRoutedPrimitives.map((primitive) =>
      getUiPrimitivePageSeo({
        pathname: primitive.routeHref,
        title: primitive.label,
        description: primitive.description,
      }),
    ),
  ]
}

export function uiPrimitivesCollectionJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "CollectionPage",
        "@id": `${collectionUrl}#collection`,
        url: collectionUrl,
        name: "Oak Flats UI Primitives Catalogue",
        description: collectionDescription,
        inLanguage: "en-AU",
        dateModified: uiPrimitiveSeoLastModified.toISOString(),
        publisher: organizationNode(),
        mainEntity: {
          "@type": "ItemList",
          name: "Oak Flats Muffler Men UI primitive routes",
          numberOfItems: uniqueRoutedPrimitives.length,
          itemListElement: uniqueRoutedPrimitives.map((primitive, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: cleanText(primitive.label),
            url: absoluteUrl(primitive.routeHref),
          })),
        },
      },
      organizationNode(),
    ],
  }
}

function uiPrimitivePageJsonLd(
  seo: Omit<UiPrimitiveSeoRecord, "jsonLd">,
  crumbs?: ReadonlyArray<{ label: string; href?: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${seo.url}#webpage`,
        url: seo.url,
        name: seo.metaTitle,
        headline: seo.title,
        description: seo.metaDescription,
        inLanguage: "en-AU",
        dateModified: uiPrimitiveSeoLastModified.toISOString(),
        isPartOf: {
          "@id": `${collectionUrl}#collection`,
        },
        about: {
          "@type": "Thing",
          name: seo.title,
          description: seo.answerSummary,
        },
        publisher: organizationNode(),
      },
      {
        "@type": "TechArticle",
        "@id": `${seo.url}#technical-brief`,
        headline: seo.title,
        description: seo.extractableAnswer,
        articleSection: seo.familyTitle,
        keywords: seo.keywords.join(", "),
        inLanguage: "en-AU",
        author: organizationNode(),
        publisher: organizationNode(),
        mainEntityOfPage: {
          "@id": `${seo.url}#webpage`,
        },
      },
      breadcrumbJsonLdForPath(seo, crumbs),
    ],
  }
}

function breadcrumbJsonLdForPath(
  seo: Pick<UiPrimitiveSeoRecord, "url" | "title" | "path">,
  crumbs?: ReadonlyArray<{ label: string; href?: string }>,
) {
  const sourceCrumbs = crumbs?.length
    ? crumbs
    : [
        { label: "UI Primitives", href: collectionPath },
        { label: seo.title, href: seo.path },
      ]
  const normalizedCrumbs =
    sourceCrumbs[sourceCrumbs.length - 1]?.href === undefined
      ? [...sourceCrumbs.slice(0, -1), { ...sourceCrumbs[sourceCrumbs.length - 1], href: seo.path }]
      : sourceCrumbs

  return {
    "@type": "BreadcrumbList",
    itemListElement: normalizedCrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: cleanText(crumb.label),
      item: absoluteUrl(crumb.href ?? seo.path),
    })),
  }
}

function primitiveKindLabel(kind: PrimitiveEntry["kind"]) {
  const labels: Record<PrimitiveEntry["kind"], string> = {
    block: "CMS content block",
    primitive: "interface primitive",
    widget: "dashboard widget",
    section: "page section",
    scene: "composed scene",
    icon: "icon primitive",
  }

  return labels[kind]
}

function organizationNode() {
  return {
    "@type": "Organization",
    "@id": `${siteUrl}/#organization`,
    name: business.name,
    url: siteUrl,
  }
}

function cleanText(value: string) {
  return value.replace(/\s+/g, " ").trim()
}

function clampSentence(value: string, maxLength: number) {
  const text = cleanText(value)
  if (text.length <= maxLength) return text

  const clipped = text.slice(0, maxLength - 1).replace(/\s+\S*$/, "")
  return `${clipped.replace(/[.,;:\s]+$/, "")}.`
}
