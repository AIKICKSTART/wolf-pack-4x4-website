import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { GalleryPublicPage } from "@/components/mufflermen/public-pages"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { breadcrumbJsonLd, galleryPageJsonLd, pageAlternates } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: { absolute: "4x4 Build Gallery | Wolfpack 4x4, Illawarra" },
  description:
    "See Wolfpack 4x4 build references, brand artwork and 4x4 upgrade inspiration for suspension, protection, recovery, lighting and touring accessories.",
  alternates: pageAlternates("/gallery"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/gallery")
  return contentOverrideMetadata(override, fallbackMetadata, "/gallery")
}

export default async function GalleryPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/gallery"),
  ])

  return (
    <>
      <JsonLd data={galleryPageJsonLd()} />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Gallery", href: "/gallery" },
        ])}
      />
      <GalleryPublicPage contentOverride={contentOverride} settings={siteSettings} />
    </>
  )
}
