import type { MetadataRoute } from "next"

import { getSeoSettings } from "@/lib/cms/seo-settings"
import { siteUrl } from "@/lib/site-data"

const privatePaths = [
  "/api",
  "/api/",
  "/admin",
  "/admin/",
  "/control",
  "/control/",
  "/graphql",
  "/graphql-playground",
  "/ui-primitives",
  "/ui-primitives/",
]

function buildRobots(disallow: string[]): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow,
      },
      {
        userAgent: ["Googlebot", "Bingbot", "GPTBot", "ChatGPT-User", "PerplexityBot", "ClaudeBot", "anthropic-ai"],
        allow: "/",
        disallow,
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  }
}

export default async function robots(): Promise<MetadataRoute.Robots> {
  try {
    const seoSettings = await getSeoSettings()

    if (seoSettings.robots.siteNoIndex) {
      return {
        rules: [
          {
            userAgent: "*",
            disallow: "/",
          },
        ],
        sitemap: `${siteUrl}/sitemap.xml`,
        host: siteUrl,
      }
    }

    return buildRobots([...privatePaths, ...seoSettings.robots.additionalDisallow])
  } catch {
    // getSeoSettings already degrades to live-equivalent defaults; this guard
    // keeps the exact pre-CMS behavior if anything unexpected still throws.
    return buildRobots(privatePaths)
  }
}
