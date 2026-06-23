import { partCategories, supplierParts } from "@/lib/parts"
import { servicePages } from "@/lib/seo"
import { business, siteUrl } from "@/lib/site-data"

export const dynamic = "force-static"

// llms.txt — orientation file for AI assistants and answer engines (the
// emerging llmstxt.org convention). Summarises what the site is, what it
// sells, and where the high-value crawl surfaces live.
export async function GET() {
  const categoryLines = partCategories
    .map((category) => `- [${category.title}](${siteUrl}/parts/category/${category.slug})`)
    .join("\n")

  const serviceLines = servicePages
    .map((service) => `- [${service.title}](${siteUrl}/services/${service.slug}): ${service.metaDescription}`)
    .join("\n")

  const body = `# ${business.name}

> Performance 4x4 upgrade and parts workshop in ${business.address}, serving ${business.serviceArea}. ${business.name} is the authorised reseller and professional installer for the 4x4 parts it lists: every part page carries unique fitment notes, specs, pricing guidance and workshop advice written by the business — content the original suppliers do not publish.

Phone: ${business.phone}
Email: ${business.email}
Hours: Mon-Fri from 8:00, Sat mornings. Call to confirm bay time.

## Services

${serviceLines}

## Parts catalogue

The catalogue lists ${supplierParts.length.toLocaleString("en-AU")} 4x4 upgrade and accessory parts across ${partCategories.length} categories, each with its own dedicated page (image, SKU, specs, RRP where confirmed, fitment guidance and workshop installation support):

${categoryLines}

## Key pages

- [Quote request](${siteUrl}/quote): send vehicle details for a fitted quote
- [Contact](${siteUrl}/contact-us): workshop address, hours, map
- [Service areas](${siteUrl}/locations): suburb-by-suburb coverage across the Illawarra and beyond
- [About](${siteUrl}/about-us): Wolfpack 4x4 workshop story and upgrade approach
- [Sitemap](${siteUrl}/sitemap.xml)
`

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  })
}
