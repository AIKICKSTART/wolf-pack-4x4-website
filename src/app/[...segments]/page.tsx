import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { hasBlocks, isBlockCmsEnabled } from "@/lib/cms/blocks/flags"
import { RenderBlocks } from "@/lib/cms/blocks/render-registry"
import {
  campaignPageJsonLd,
  campaignPageMetadata,
  getPublishedMarketingPageByPath,
  marketingPagePath,
} from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import {
  CmsBreadcrumbs,
  CmsContactBand,
  CmsHero,
  CmsPageShell,
  CmsRichText,
} from "@/lib/cms/public-ui"
import { isPublishablePath } from "@/lib/cms/reserved-paths"

// CMS page-builder catch-all: serves published MarketingPages at their own
// `path`. Next route precedence guarantees every static app route wins over
// this catch-all, so built-in pages can never be shadowed; the reserved-path
// guard makes the miss case a fast 404 without a CMS query.
type Props = {
  params: Promise<{ segments: string[] }>
}

export const dynamic = "force-dynamic"

function pathFromSegments(segments: string[]) {
  return `/${segments.map((segment) => decodeURIComponent(segment)).join("/")}`
}

function cleanText(value: string | null | undefined) {
  const text = value?.trim()
  return text && text.length > 0 ? text : undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { segments } = await params
  const path = pathFromSegments(segments)
  if (!isPublishablePath(path)) {
    return { robots: { index: false, follow: false } }
  }

  const page = await getPublishedMarketingPageByPath(path)
  if (!page) {
    return { robots: { index: false, follow: false } }
  }

  return campaignPageMetadata(page, page.slug)
}

export default async function CmsBuiltPage({ params }: Props) {
  const { segments } = await params
  const path = pathFromSegments(segments)

  if (!isPublishablePath(path)) {
    notFound()
  }

  const [page, siteSettings] = await Promise.all([
    getPublishedMarketingPageByPath(path),
    getPublicSiteSettings(),
  ])

  if (!page) {
    notFound()
  }

  const eyebrow = cleanText(page.hero?.eyebrow)
  const title = cleanText(page.hero?.headline) ?? page.title
  const description =
    cleanText(page.hero?.lede) ??
    cleanText(page.excerpt) ??
    "Published page from Wolfpack 4x4."
  const showHero = page.showHero !== false
  const showContactBand = page.showContactBand !== false

  return (
    <>
      <JsonLd data={campaignPageJsonLd(page)} />
      <CmsPageShell settings={siteSettings}>
        <CmsBreadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: title, href: marketingPagePath(page) },
          ]}
        />
        {showHero ? (
          <CmsHero
            eyebrow={eyebrow ?? "Wolfpack 4x4"}
            settings={siteSettings}
            title={title}
            description={description}
          />
        ) : null}
        {isBlockCmsEnabled() && hasBlocks(page.blocks) ? (
          <RenderBlocks blocks={page.blocks} updatedAt={page.updatedAt} />
        ) : (
          <CmsRichText data={page.content} fallback={page.excerpt ?? description} />
        )}
        {showContactBand ? (
          <CmsContactBand
            settings={siteSettings}
            title="Talk to the workshop before booking."
            description="Send your vehicle details with this enquiry so Wolfpack 4x4 can confirm parts, fitment and a booking window."
          />
        ) : null}
      </CmsPageShell>
    </>
  )
}
