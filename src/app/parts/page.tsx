import type { Metadata } from "next"

import { JsonLd } from "@/components/mufflermen/json-ld"
import { PartsIndexPage } from "@/components/mufflermen/seo-pages"
import {
  contentOverrideMetadata,
  getPublishedContentOverrideByPath,
} from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { breadcrumbJsonLd, pageAlternates } from "@/lib/seo"

export const revalidate = 300

const fallbackMetadata: Metadata = {
  title: { absolute: "4x4 Parts and Accessories Catalogue | Wolfpack 4x4" },
  description:
    "Browse the Wolfpack 4x4 parts catalogue — suspension, towing, lighting, engine-bay, performance and intake accessories with Illawarra fitment advice.",
  alternates: pageAlternates("/parts"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/parts")
  return contentOverrideMetadata(override, fallbackMetadata, "/parts")
}

export default async function PartsPage() {
  const [siteSettings, contentOverride] = await Promise.all([
    getPublicSiteSettings(),
    getPublishedContentOverrideByPath("/parts"),
  ])

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", href: "/" },
          { name: "Parts", href: "/parts" },
        ])}
      />
      <PartsIndexPage contentOverride={contentOverride} siteSettings={siteSettings} />
    </>
  )
}
