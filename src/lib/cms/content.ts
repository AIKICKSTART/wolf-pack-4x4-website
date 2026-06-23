import "server-only"

import type { Metadata, MetadataRoute } from "next"
import { draftMode } from "next/headers"

import { absoluteUrl, seoLastModified, pageAlternates } from "@/lib/seo"
import { business, siteUrl } from "@/lib/site-data"

import { hasAnyContentOverrides } from "./override-count"
import { withCms } from "./payload"
import type { CmsBlogPost, CmsContentOverride, CmsMarketingPage, CmsMedia, CmsRedirect, CmsSiteSettings, CmsUpload } from "./types"

const publishedWhere = {
  _status: {
    equals: "published",
  },
} as const

function publishedSlugWhere(slug: string) {
  return {
    and: [
      publishedWhere,
      {
        slug: {
          equals: slug,
        },
      },
    ],
  }
}

/**
 * True while the request is in Next draft mode (live preview). draftMode()
 * throws outside a request scope (sitemap build, CLI) — treat that as false.
 */
async function isDraftPreview() {
  try {
    const draft = await draftMode()
    return draft.isEnabled
  } catch {
    return false
  }
}

function isPublishedWithSlug<T extends { _status?: unknown; slug?: unknown }>(doc: T): doc is T & { slug: string } {
  return typeof doc.slug === "string" && doc.slug.length > 0 && doc._status === "published"
}

function cleanText(value: string | null | undefined) {
  const text = value?.trim()
  return text && text.length > 0 ? text : undefined
}

function hasTemplateToken(value: string) {
  return /\$\{[^}]*\}/.test(value)
}

function cleanSlug(slug: string) {
  return slug.trim().replace(/^\/+|\/+$/g, "")
}

export function blogPostPath(postOrSlug: CmsBlogPost | string) {
  const slug = typeof postOrSlug === "string" ? postOrSlug : postOrSlug.slug
  return `/blog/${cleanSlug(slug)}`
}

export function campaignPagePath(pageOrSlug: CmsMarketingPage | string) {
  const slug = typeof pageOrSlug === "string" ? pageOrSlug : pageOrSlug.slug
  return `/campaigns/${cleanSlug(slug)}`
}

/**
 * Canonical public path for a marketing page. Pages publish at their own
 * `path` (the page-builder contract); legacy docs without a usable path fall
 * back to the historical /campaigns/<slug> route, which still serves them.
 */
export function marketingPagePath(page: CmsMarketingPage) {
  return normalizePublicPath(page.path) ?? campaignPagePath(page)
}

function normalizePath(path: string | null | undefined) {
  const cleanPath = cleanText(path)
  if (!cleanPath) return undefined

  return cleanPath.startsWith("/") ? cleanPath : `/${cleanPath}`
}

function normalizePublicPath(path: string | null | undefined) {
  const normalized = normalizePath(path)
  if (!normalized) return undefined
  if (normalized.startsWith("//") || normalized.includes("\\")) return undefined

  try {
    const url = new URL(normalized, siteUrl)
    const pathname = url.pathname.replace(/\/{2,}/g, "/")
    return pathname.length > 1 ? pathname.replace(/\/+$/g, "") : "/"
  } catch {
    return undefined
  }
}

function cleanRedirectTarget(value: string | null | undefined) {
  const target = cleanText(value)
  if (!target) return undefined

  return target.startsWith("/") && !target.startsWith("//") ? normalizePublicPath(target) : undefined
}

function prefixedCanonicalPath(candidate: string | null | undefined, fallback: string, prefix: string) {
  const path = normalizePath(candidate)
  if (path === prefix || path?.startsWith(`${prefix}/`)) {
    return path
  }

  return fallback
}

function uploadToMedia(upload: CmsUpload): CmsMedia | undefined {
  if (!upload || typeof upload === "string" || typeof upload === "number") {
    return undefined
  }

  return upload
}

function cleanCmsMediaUrl(url: string | null | undefined) {
  const value = cleanText(url)
  if (!value || hasTemplateToken(value)) return undefined

  if (value.startsWith("http://") || value.startsWith("https://")) {
    return value
  }

  return value.startsWith("/") ? absoluteUrl(value) : undefined
}

function cleanCmsMediaFilename(filename: string | null | undefined) {
  const value = cleanText(filename)
  if (!value || hasTemplateToken(value)) return undefined
  if (value.includes("/") || value.includes("\\") || value.includes("?") || value.includes("#")) return undefined
  if (value === "." || value === ".." || value.includes("..")) return undefined
  if (/[\u0000-\u001f\u007f]/.test(value)) return undefined

  return encodeURIComponent(value)
}

export function cmsMediaUrl(upload: CmsUpload) {
  const media = uploadToMedia(upload)
  const url = cleanCmsMediaUrl(media?.url)
  if (url) return url

  const filename = cleanCmsMediaFilename(media?.filename)
  return filename ? absoluteUrl(["", "media", "cms", filename].join("/")) : undefined
}

export function cmsMediaAlt(upload: CmsUpload) {
  return cleanText(uploadToMedia(upload)?.alt)
}

function cmsLastModified(doc: { publishedAt?: string | null; updatedAt?: string | null }) {
  const value = doc.updatedAt ?? doc.publishedAt
  if (!value) return seoLastModified

  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? seoLastModified : date
}

export function formatCmsDate(value: string | null | undefined) {
  if (!value) return undefined

  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined

  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date)
}

export function topicLabels(post: CmsBlogPost) {
  return (post.topics ?? [])
    .map((topic) => cleanText(topic.label))
    .filter((label): label is string => Boolean(label))
}

export async function getPublishedBlogPosts(limit = 24) {
  return withCms(async (payload) => {
    const result = await payload.find({
      collection: "blog-posts",
      depth: 1,
      limit,
      overrideAccess: false,
      sort: ["-publishedAt", "-updatedAt"],
      where: publishedWhere,
    })

    return (result.docs as unknown as CmsBlogPost[]).filter(isPublishedWithSlug)
  }, [] as CmsBlogPost[])
}

export async function getPublishedBlogPostBySlug(slug: string) {
  const clean = cleanSlug(slug)
  if (!clean) return null

  const draft = await isDraftPreview()

  return withCms(async (payload) => {
    const result = await payload.find({
      collection: "blog-posts",
      depth: 1,
      draft,
      limit: 1,
      overrideAccess: draft,
      where: draft ? { slug: { equals: clean } } : publishedSlugWhere(clean),
    })

    const [post] = result.docs as unknown as CmsBlogPost[]
    if (!post) return null
    return draft || isPublishedWithSlug(post) ? post : null
  }, null as CmsBlogPost | null)
}

export async function getPublishedCampaignPages(limit = 1000) {
  return withCms(async (payload) => {
    const result = await payload.find({
      collection: "marketing-pages",
      depth: 1,
      limit,
      overrideAccess: false,
      sort: "-updatedAt",
      where: publishedWhere,
    })

    return (result.docs as unknown as CmsMarketingPage[]).filter(isPublishedWithSlug)
  }, [] as CmsMarketingPage[])
}

export async function getPublishedCampaignPageBySlug(slug: string) {
  const clean = cleanSlug(slug)
  if (!clean) return null

  const draft = await isDraftPreview()

  return withCms(async (payload) => {
    const result = await payload.find({
      collection: "marketing-pages",
      depth: 1,
      draft,
      limit: 1,
      overrideAccess: draft,
      where: draft ? { slug: { equals: clean } } : publishedSlugWhere(clean),
    })

    const [page] = result.docs as unknown as CmsMarketingPage[]
    if (!page) return null
    return draft || isPublishedWithSlug(page) ? page : null
  }, null as CmsMarketingPage | null)
}

export async function getPublishedMarketingPageByPath(path: string) {
  const pagePath = normalizePublicPath(path)
  if (!pagePath || pagePath === "/") return null

  const draft = await isDraftPreview()

  return withCms(async (payload) => {
    const result = await payload.find({
      collection: "marketing-pages",
      depth: 1,
      draft,
      limit: 1,
      overrideAccess: draft,
      where: draft
        ? { path: { equals: pagePath } }
        : {
            and: [
              publishedWhere,
              {
                path: {
                  equals: pagePath,
                },
              },
            ],
          },
    })

    const [page] = result.docs as unknown as CmsMarketingPage[]
    if (!page) return null
    return draft || page._status === "published" ? page : null
  }, null as CmsMarketingPage | null)
}

export async function getPublishedContentOverrideByPath(path: string) {
  const targetPath = normalizePublicPath(path)
  if (!targetPath) return null

  const draft = await isDraftPreview()

  // Cheap short-circuit: with zero overrides in the CMS (the steady state for
  // most of the ~20k programmatic pages) skip the per-path query entirely.
  if (!draft && !(await hasAnyContentOverrides())) return null

  return withCms(async (payload) => {
    const result = await payload.find({
      collection: "content-overrides",
      depth: 1,
      draft,
      limit: 1,
      overrideAccess: draft,
      where: draft
        ? { targetPath: { equals: targetPath } }
        : {
            and: [
              publishedWhere,
              {
                targetPath: {
                  equals: targetPath,
                },
              },
            ],
          },
    })

    const [override] = result.docs as unknown as CmsContentOverride[]
    if (!override) return null
    return draft || override._status === "published" ? override : null
  }, null as CmsContentOverride | null)
}

export async function getSiteSettings() {
  return withCms(async (payload) => {
    return (await payload.findGlobal({
      slug: "site-settings",
      depth: 0,
      overrideAccess: false,
    })) as unknown as CmsSiteSettings
  }, null as CmsSiteSettings | null)
}

export async function getActiveRedirect(path: string) {
  const fromPath = normalizePublicPath(path)
  if (!fromPath) return null

  return withCms(async (payload) => {
    const result = await payload.find({
      collection: "redirects",
      depth: 0,
      limit: 1,
      overrideAccess: true,
      where: {
        and: [
          {
            isActive: {
              equals: true,
            },
          },
          {
            fromPath: {
              equals: fromPath,
            },
          },
        ],
      },
    })

    const [redirect] = result.docs as unknown as CmsRedirect[]
    const destination = cleanRedirectTarget(redirect?.toPath)
    const statusCode = redirect?.statusCode === "302" ? 302 : 301

    if (!destination || destination === fromPath) return null

    return {
      destination,
      statusCode,
    }
  }, null as { destination: string; statusCode: 301 | 302 } | null)
}

export function contentOverrideMetadata(
  override: CmsContentOverride | null,
  fallback: Metadata,
  canonicalPath: string,
): Metadata {
  if (!override) return fallback

  const title = cleanText(override.seo?.metaTitle) ?? cleanText(override.hero?.headline) ?? cleanText(override.title)
  const description =
    cleanText(override.seo?.metaDescription) ?? cleanText(override.hero?.lede) ?? cleanText(override.summary)
  const canonical = prefixedCanonicalPath(override.seo?.canonicalPath, canonicalPath, "/")
  // Social cards change ONLY when social fields are set (same convention as
  // blogPostMetadata/campaignPageMetadata). This keeps a metadata-only override
  // byte-identical to the page's existing og/twitter output — required by the
  // seeded page inventory, where seo.metaTitle mirrors the live <title>.
  const socialTitle = cleanText(override.social?.title)
  const socialDescription = cleanText(override.social?.description)
  const image = cmsMediaUrl(override.social?.image) ?? cmsMediaUrl(override.hero?.image)
  const hasSocialOverride = Boolean(socialTitle || socialDescription || image)

  // Build via spread so og/twitter/robots keys are only PRESENT when they
  // actually change: an explicit `twitter: undefined` key would null out the
  // layout-level inheritance in Next's metadata merge (drops twitter:card).
  // Mirror the fallback's title MODE: pages that opt out of the layout title
  // template via `title: { absolute }` (about-us, products, contact-us,
  // gallery, parts) must keep that opt-out when the override supplies the
  // title, or the template re-appends the brand suffix.
  const fallbackTitleIsAbsolute =
    typeof fallback.title === "object" && fallback.title !== null && "absolute" in fallback.title

  return {
    ...fallback,
    ...(title ? { title: fallbackTitleIsAbsolute ? { absolute: title } : title } : {}),
    ...(description ? { description } : {}),
    alternates: {
      ...fallback.alternates,
      ...pageAlternates(canonical),
    },
    ...(override.seo?.noIndex
      ? {
          robots: {
            follow: false,
            index: false,
          },
        }
      : {}),
    ...(hasSocialOverride
      ? {
          openGraph: {
            ...fallback.openGraph,
            ...(socialTitle ? { title: socialTitle } : {}),
            ...(socialDescription ? { description: socialDescription } : {}),
            url: absoluteUrl(canonical),
            ...(image ? { images: [{ url: image, alt: cmsMediaAlt(override.social?.image) ?? cmsMediaAlt(override.hero?.image) ?? socialTitle ?? "Content image" }] } : {}),
          },
          twitter: {
            ...fallback.twitter,
            ...(socialTitle ? { title: socialTitle } : {}),
            ...(socialDescription ? { description: socialDescription } : {}),
            ...(image ? { card: "summary_large_image" as const, images: [image] } : {}),
          },
        }
      : {}),
  }
}

export function blogPostMetadata(post: CmsBlogPost | null, slug: string): Metadata {
  if (!post) {
    const title = cleanSlug(slug).replace(/-/g, " ") || "Workshop article"

    return {
      title,
      robots: {
        follow: false,
        index: false,
      },
    }
  }

  const path = blogPostPath(post)
  const canonical = prefixedCanonicalPath(post.seo?.canonicalPath, path, "/blog")
  const title = cleanText(post.seo?.metaTitle) ?? post.title
  const description = cleanText(post.seo?.metaDescription) ?? post.excerpt
  const socialTitle = cleanText(post.social?.title) ?? title
  const socialDescription = cleanText(post.social?.description) ?? description
  const image = cmsMediaUrl(post.social?.image) ?? cmsMediaUrl(post.heroImage)

  return {
    title,
    description,
    alternates: pageAlternates(canonical),
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: absoluteUrl(path),
      type: "article",
      publishedTime: post.publishedAt ?? undefined,
      modifiedTime: post.updatedAt ?? undefined,
      ...(image ? { images: [{ url: image, alt: cmsMediaAlt(post.social?.image) ?? cmsMediaAlt(post.heroImage) ?? title }] } : {}),
    },
    robots: post.seo?.noIndex
      ? {
          follow: false,
          index: false,
        }
      : undefined,
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description: socialDescription,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export function campaignPageMetadata(page: CmsMarketingPage | null, slug: string): Metadata {
  if (!page) {
    const title = cleanSlug(slug).replace(/-/g, " ") || "Campaign"

    return {
      title,
      robots: {
        follow: false,
        index: false,
      },
    }
  }

  const path = marketingPagePath(page)
  const canonical = normalizePublicPath(page.seo?.canonicalPath) ?? path
  const title = cleanText(page.seo?.metaTitle) ?? cleanText(page.hero?.headline) ?? page.title
  const description =
    cleanText(page.seo?.metaDescription) ??
    cleanText(page.hero?.lede) ??
    cleanText(page.excerpt) ??
    `${business.name} campaign information and workshop booking details.`
  const socialTitle = cleanText(page.social?.title) ?? title
  const socialDescription = cleanText(page.social?.description) ?? description
  const image = cmsMediaUrl(page.social?.image) ?? cmsMediaUrl(page.hero?.image)

  return {
    title,
    description,
    alternates: pageAlternates(canonical),
    openGraph: {
      title: socialTitle,
      description: socialDescription,
      url: absoluteUrl(path),
      type: "website",
      ...(image ? { images: [{ url: image, alt: cmsMediaAlt(page.social?.image) ?? cmsMediaAlt(page.hero?.image) ?? title }] } : {}),
    },
    robots: page.seo?.noIndex
      ? {
          follow: false,
          index: false,
        }
      : undefined,
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: socialTitle,
      description: socialDescription,
      ...(image ? { images: [image] } : {}),
    },
  }
}

export function blogPostJsonLd(post: CmsBlogPost) {
  const path = blogPostPath(post)
  const image = cmsMediaUrl(post.heroImage)

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    dateModified: post.updatedAt ?? post.publishedAt,
    datePublished: post.publishedAt ?? post.updatedAt,
    image,
    mainEntityOfPage: absoluteUrl(path),
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: absoluteUrl("/"),
    },
    url: absoluteUrl(path),
  }
}

export function campaignPageJsonLd(page: CmsMarketingPage) {
  const path = marketingPagePath(page)
  const title = cleanText(page.hero?.headline) ?? page.title
  const description = cleanText(page.hero?.lede) ?? cleanText(page.excerpt)

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    dateModified: page.updatedAt,
    description,
    name: title,
    publisher: {
      "@type": "Organization",
      name: business.name,
      url: absoluteUrl("/"),
    },
    url: absoluteUrl(path),
  }
}

export async function publishedCmsSitemapEntries(): Promise<MetadataRoute.Sitemap> {
  const [posts, campaignPages] = await Promise.all([getPublishedBlogPosts(1000), getPublishedCampaignPages(1000)])

  const postEntries = posts
    .filter((post) => !post.seo?.noIndex)
    .map((post) => {
      const image = cmsMediaUrl(post.heroImage)
      return {
        url: absoluteUrl(blogPostPath(post)),
        priority: 0.58,
        changeFrequency: "weekly" as const,
        lastModified: cmsLastModified(post),
        ...(image ? { images: [image] } : {}),
      }
    })

  const campaignEntries = campaignPages
    .filter((page) => !page.seo?.noIndex)
    .map((page) => {
      const image = cmsMediaUrl(page.hero?.image)
      return {
        url: absoluteUrl(marketingPagePath(page)),
        priority: 0.62,
        changeFrequency: "weekly" as const,
        lastModified: cmsLastModified(page),
        ...(image ? { images: [image] } : {}),
      }
    })

  const blogIndexEntry =
    postEntries.length > 0
      ? [
          {
            url: absoluteUrl("/blog"),
            priority: 0.64,
            changeFrequency: "weekly" as const,
            lastModified: postEntries[0]?.lastModified ?? seoLastModified,
          },
        ]
      : []

  return [...blogIndexEntry, ...postEntries, ...campaignEntries]
}
