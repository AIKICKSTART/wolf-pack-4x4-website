import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { JsonLd } from "@/components/mufflermen/json-ld"
import {
  campaignPageJsonLd,
  campaignPageMetadata,
  campaignPagePath,
  getPublishedCampaignPageBySlug,
} from "@/lib/cms/content"
import { hasBlocks, isBlockCmsEnabled } from "@/lib/cms/blocks/flags"
import { RenderBlocks } from "@/lib/cms/blocks/render-registry"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { CmsBreadcrumbs, CmsContactBand, CmsHero, CmsPageShell, CmsRichText } from "@/lib/cms/public-ui"

type Props = {
  params: Promise<{ slug: string }>
}

export const dynamic = "force-dynamic"

function cleanText(value: string | null | undefined) {
  const text = value?.trim()
  return text && text.length > 0 ? text : undefined
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const page = await getPublishedCampaignPageBySlug(slug)
  return campaignPageMetadata(page, slug)
}

export default async function CampaignPage({ params }: Props) {
  const { slug } = await params
  const [page, siteSettings] = await Promise.all([
    getPublishedCampaignPageBySlug(slug),
    getPublicSiteSettings(),
  ])

  if (!page) {
    notFound()
  }

  const eyebrow = cleanText(page.hero?.eyebrow) ?? "Campaign"
  const title = cleanText(page.hero?.headline) ?? page.title
  const description =
    cleanText(page.hero?.lede) ??
    cleanText(page.excerpt) ??
    "Published campaign information from Wolfpack 4x4."

  return (
    <>
      <JsonLd data={campaignPageJsonLd(page)} />
      <CmsPageShell settings={siteSettings}>
        <CmsBreadcrumbs
          items={[
            { name: "Home", href: "/" },
            { name: title, href: campaignPagePath(page) },
          ]}
        />
        <CmsHero eyebrow={eyebrow} settings={siteSettings} title={title} description={description} />
        {isBlockCmsEnabled() && hasBlocks(page.blocks) ? (
          <RenderBlocks blocks={page.blocks} updatedAt={page.updatedAt} />
        ) : (
          <CmsRichText data={page.content} fallback={page.excerpt ?? description} />
        )}
        <CmsContactBand
          settings={siteSettings}
          title="Talk to the workshop before booking."
          description="Send your vehicle specs with this campaign enquiry so Wolfpack 4x4 can confirm the right parts, fitment path and booking window."
        />
      </CmsPageShell>
    </>
  )
}
