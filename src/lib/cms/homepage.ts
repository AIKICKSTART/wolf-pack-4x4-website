import "server-only"

import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"

import {
  blogPostPath,
  campaignPagePath,
  cmsMediaAlt,
  cmsMediaUrl,
  formatCmsDate,
  getPublishedBlogPosts,
  getPublishedCampaignPages,
  getPublishedContentOverrideByPath,
  getSiteSettings,
  topicLabels,
} from "@/lib/cms/content"
import type {
  CmsBlogPost,
  CmsContentOverride,
  CmsMarketingPage,
  CmsSiteSettings,
} from "@/lib/cms/types"

export type HomepageCmsPost = {
  excerpt: string
  href: string
  publishedLabel: string | null
  title: string
  topics: string[]
}

export type HomepageCmsCampaign = {
  description: string
  eyebrow: string
  href: string
  title: string
}

export type HomepageCmsSettings = {
  address: string | null
  displayName: string | null
  email: string | null
  emailHref: string | null
  mapHref: string | null
  openingHours: string | null
  phone: string | null
  phoneHref: string | null
  primaryCallToAction: string | null
  announcement: string | null
  socialLinks: Array<{ label: string; url: string }>
}

export type HomepageCmsOverride = {
  eyebrow: string | null
  headline: string | null
  imageAlt: string | null
  imageUrl: string | null
  lede: string | null
  summary: string | null
  title: string | null
}

export type HomepageCmsContent = {
  blocks: Array<Record<string, unknown>> | null
  body: DefaultTypedEditorState | null
  campaign: HomepageCmsCampaign | null
  override: HomepageCmsOverride | null
  posts: HomepageCmsPost[]
  settings: HomepageCmsSettings | null
}

const emptyHomepageCmsContent: HomepageCmsContent = {
  blocks: null,
  body: null,
  campaign: null,
  override: null,
  posts: [],
  settings: null,
}

function cleanText(value: string | null | undefined) {
  const text = value?.trim()
  if (!text || /\$\{[^}]*\}/.test(text)) return null

  return text
}

function phoneHref(value: string | null | undefined) {
  const phone = cleanText(value)
  if (!phone) return null

  const normalized = phone.replace(/[^\d+]/g, "")
  return normalized ? `tel:${normalized.startsWith("+") ? normalized : `+61${normalized.replace(/^0/, "")}`}` : null
}

function emailHref(value: string | null | undefined) {
  const email = cleanText(value)
  return email ? `mailto:${email}` : null
}

function mapHref(value: string | null | undefined) {
  const address = cleanText(value)
  return address
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
    : null
}

function safeHref(value: string | null | undefined) {
  const href = cleanText(value)
  if (!href) return null

  try {
    const url = new URL(href)
    return ["http:", "https:", "mailto:", "tel:"].includes(url.protocol) ? href : null
  } catch {
    return href.startsWith("/") && !href.startsWith("//") ? href : null
  }
}

async function safeHomepageCms<T>(operation: () => Promise<T>, fallback: T) {
  try {
    return await operation()
  } catch {
    return fallback
  }
}

function toHomepagePost(post: CmsBlogPost): HomepageCmsPost | null {
  if (post.seo?.noIndex) return null

  const title = cleanText(post.title)
  const excerpt = cleanText(post.excerpt)

  if (!title || !excerpt) return null

  return {
    excerpt,
    href: blogPostPath(post),
    publishedLabel: formatCmsDate(post.publishedAt ?? post.updatedAt) ?? null,
    title,
    topics: topicLabels(post).slice(0, 2),
  }
}

function isHomepageCampaignCandidate(page: CmsMarketingPage) {
  if (page.seo?.noIndex) return false

  const pageType = cleanText(page.pageType) ?? "standard"
  return pageType === "standard" || pageType === "homepage"
}

function toHomepageCampaign(page: CmsMarketingPage): HomepageCmsCampaign | null {
  if (!isHomepageCampaignCandidate(page)) return null

  const title = cleanText(page.hero?.headline) ?? cleanText(page.title)
  const description = cleanText(page.hero?.lede) ?? cleanText(page.excerpt)

  if (!title || !description) return null

  return {
    description,
    eyebrow: cleanText(page.hero?.eyebrow) ?? "Featured from the workshop",
    href: campaignPagePath(page),
    title,
  }
}

function pickHomepageCampaign(pages: CmsMarketingPage[]) {
  const standardCampaigns = pages.filter(
    (page) => (cleanText(page.pageType) ?? "standard") === "standard",
  )
  const homepageCampaigns = pages.filter(
    (page) => (cleanText(page.pageType) ?? "standard") === "homepage",
  )

  for (const page of [...standardCampaigns, ...homepageCampaigns]) {
    const campaign = toHomepageCampaign(page)
    if (campaign) return campaign
  }

  return null
}

function toHomepageSettings(settings: CmsSiteSettings | null): HomepageCmsSettings | null {
  if (!settings) return null

  const address = cleanText(settings.business?.address)
  const displayName = cleanText(settings.business?.displayName)
  const email = cleanText(settings.business?.email)
  const openingHours = cleanText(settings.business?.openingHours)
  const phone = cleanText(settings.business?.phone)
  const primaryCallToAction = cleanText(settings.marketing?.primaryCallToAction)
  const announcement = cleanText(settings.marketing?.announcement)
  const socialLinks = (settings.marketing?.socialLinks ?? [])
    .map((link) => ({
      label: cleanText(link.label),
      url: safeHref(link.url),
    }))
    .filter((link): link is { label: string; url: string } =>
      Boolean(link.label && link.url),
    )

  if (
    !address &&
    !displayName &&
    !email &&
    !openingHours &&
    !phone &&
    !primaryCallToAction &&
    !announcement &&
    socialLinks.length === 0
  ) {
    return null
  }

  return {
    address,
    displayName,
    email,
    emailHref: emailHref(email),
    mapHref: mapHref(address),
    openingHours,
    phone,
    phoneHref: phoneHref(phone),
    primaryCallToAction,
    announcement,
    socialLinks,
  }
}

function toHomepageOverride(override: CmsContentOverride | null): HomepageCmsOverride | null {
  if (!override || override.targetType !== "homepage") return null

  const eyebrow = cleanText(override.hero?.eyebrow)
  const headline = cleanText(override.hero?.headline)
  const imageUrl = cmsMediaUrl(override.hero?.image) ?? null
  const lede = cleanText(override.hero?.lede)
  const summary = cleanText(override.summary)
  const title = cleanText(override.title)

  if (!eyebrow && !headline && !imageUrl && !lede && !summary && !title) {
    return null
  }

  return {
    eyebrow,
    headline,
    imageAlt: cmsMediaAlt(override.hero?.image) ?? title ?? headline,
    imageUrl,
    lede,
    summary,
    title,
  }
}

function homepageOverrideBody(override: CmsContentOverride | null) {
  if (!override || override.targetType !== "homepage") return null

  const body = override.body
  return Array.isArray(body?.root?.children) && body.root.children.length > 0 ? body : null
}

function homepageOverrideBlocks(override: CmsContentOverride | null) {
  if (!override || override.targetType !== "homepage" || !Array.isArray(override.blocks)) return null

  return override.blocks.length > 0 ? override.blocks : null
}

export async function getHomepageCmsContent(): Promise<HomepageCmsContent> {
  const [posts, campaignPages, siteSettings, homepageOverride] = await Promise.all([
    safeHomepageCms(() => getPublishedBlogPosts(6), [] as CmsBlogPost[]),
    safeHomepageCms(() => getPublishedCampaignPages(24), [] as CmsMarketingPage[]),
    safeHomepageCms(() => getSiteSettings(), null as CmsSiteSettings | null),
    safeHomepageCms(
      () => getPublishedContentOverrideByPath("/"),
      null as CmsContentOverride | null,
    ),
  ])

  return {
    blocks: homepageOverrideBlocks(homepageOverride),
    body: homepageOverrideBody(homepageOverride),
    campaign: pickHomepageCampaign(campaignPages),
    override: toHomepageOverride(homepageOverride),
    posts: posts
      .map(toHomepagePost)
      .filter((post): post is HomepageCmsPost => Boolean(post))
      .slice(0, 3),
    settings: toHomepageSettings(siteSettings),
  }
}

export { emptyHomepageCmsContent }
