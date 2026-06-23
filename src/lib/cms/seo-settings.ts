import "server-only"

import type { GlobalSlug } from "payload"

import { cmsMediaUrl } from "./content"
import { withCms } from "./payload"
import type { CmsUpload } from "./types"

type CmsSeoSettings = {
  titleTemplate?: string | null
  defaultTitle?: string | null
  defaultDescription?: string | null
  defaultOgImage?: CmsUpload
  socialProfiles?: Array<{ label?: string | null; url?: string | null }> | null
  robots?: {
    siteNoIndex?: boolean | null
    additionalDisallow?: Array<{ path?: string | null }> | null
  } | null
  verification?: {
    google?: string | null
    bing?: string | null
  } | null
  localBusiness?: {
    legalName?: string | null
    telephone?: string | null
    priceRange?: string | null
    latitude?: number | null
    longitude?: number | null
    openingHours?: Array<{ days?: string | null; opens?: string | null; closes?: string | null }> | null
    streetAddress?: string | null
    locality?: string | null
    region?: string | null
    postcode?: string | null
  } | null
}

export type SeoSettingsResolved = {
  titleTemplate: string
  defaultTitle: string
  defaultDescription: string
  defaultOgImageUrl?: string
  socialProfiles: Array<{ label: string; url: string }>
  robots: {
    siteNoIndex: boolean
    additionalDisallow: string[]
  }
  verification: {
    google?: string
    bing?: string
  }
  localBusiness: {
    legalName: string
    telephone: string
    priceRange: string
    latitude: number
    longitude: number
    openingHours: Array<{ days: string; opens: string; closes: string }>
    streetAddress: string
    locality: string
    region: string
    postcode: string
  }
}

// Hardcoded fallbacks — exactly today's live values from src/app/layout.tsx,
// src/lib/site-data.ts and the homepageJsonLd opening hours in src/lib/seo.ts.
// The site must render IDENTICALLY when the CMS/database is unavailable.
const fallbackSeoSettings: SeoSettingsResolved = {
  titleTemplate: "%s | Wolfpack 4x4",
  defaultTitle: "Wolfpack 4x4 | Performance 4x4 Upgrades NSW",
  defaultDescription:
    "Wolfpack 4x4 plans and fits suspension, bull bars, winches, recovery gear, lighting, towing support, touring accessories and 4x4 parts across the Illawarra.",
  socialProfiles: [{ label: "Facebook", url: "https://www.facebook.com/p/Wolfpack-4x4-61550788820371/" }],
  robots: {
    siteNoIndex: false,
    additionalDisallow: [],
  },
  verification: {},
  localBusiness: {
    legalName: "Wolfpack 4x4",
    telephone: "02 4256 9256",
    priceRange: "$$",
    latitude: -34.5739,
    longitude: 150.8158,
    openingHours: [
      { days: "Monday", opens: "08:00", closes: "17:00" },
      { days: "Tuesday", opens: "08:00", closes: "16:00" },
      { days: "Wednesday", opens: "08:00", closes: "16:00" },
      { days: "Thursday", opens: "08:00", closes: "16:00" },
      { days: "Friday", opens: "08:00", closes: "15:30" },
      { days: "Saturday", opens: "08:00", closes: "12:00" },
    ],
    streetAddress: "Unit 2/8 Shaban St",
    locality: "Albion Park Rail",
    region: "NSW",
    postcode: "2527",
  },
}

function cleanText(value: string | null | undefined) {
  const text = value?.trim()
  return text && text.length > 0 ? text : undefined
}

function resolveSeoSettings(settings: CmsSeoSettings): SeoSettingsResolved {
  const fallback = fallbackSeoSettings

  const socialProfiles = (settings.socialProfiles ?? [])
    .map((profile) => ({ label: cleanText(profile.label), url: cleanText(profile.url) }))
    .filter((profile): profile is { label: string; url: string } => Boolean(profile.label && profile.url))

  const openingHours = (settings.localBusiness?.openingHours ?? [])
    .map((entry) => ({ days: cleanText(entry.days), opens: cleanText(entry.opens), closes: cleanText(entry.closes) }))
    .filter((entry): entry is { days: string; opens: string; closes: string } =>
      Boolean(entry.days && entry.opens && entry.closes),
    )

  const additionalDisallow = (settings.robots?.additionalDisallow ?? [])
    .map((entry) => cleanText(entry.path))
    .filter((path): path is string => Boolean(path))

  return {
    titleTemplate: cleanText(settings.titleTemplate) ?? fallback.titleTemplate,
    defaultTitle: cleanText(settings.defaultTitle) ?? fallback.defaultTitle,
    defaultDescription: cleanText(settings.defaultDescription) ?? fallback.defaultDescription,
    defaultOgImageUrl: cmsMediaUrl(settings.defaultOgImage),
    socialProfiles: socialProfiles.length > 0 ? socialProfiles : fallback.socialProfiles,
    robots: {
      siteNoIndex: settings.robots?.siteNoIndex === true,
      additionalDisallow,
    },
    verification: {
      google: cleanText(settings.verification?.google),
      bing: cleanText(settings.verification?.bing),
    },
    localBusiness: {
      legalName: cleanText(settings.localBusiness?.legalName) ?? fallback.localBusiness.legalName,
      telephone: cleanText(settings.localBusiness?.telephone) ?? fallback.localBusiness.telephone,
      priceRange: cleanText(settings.localBusiness?.priceRange) ?? fallback.localBusiness.priceRange,
      latitude:
        typeof settings.localBusiness?.latitude === "number"
          ? settings.localBusiness.latitude
          : fallback.localBusiness.latitude,
      longitude:
        typeof settings.localBusiness?.longitude === "number"
          ? settings.localBusiness.longitude
          : fallback.localBusiness.longitude,
      openingHours: openingHours.length > 0 ? openingHours : fallback.localBusiness.openingHours,
      streetAddress: cleanText(settings.localBusiness?.streetAddress) ?? fallback.localBusiness.streetAddress,
      locality: cleanText(settings.localBusiness?.locality) ?? fallback.localBusiness.locality,
      region: cleanText(settings.localBusiness?.region) ?? fallback.localBusiness.region,
      postcode: cleanText(settings.localBusiness?.postcode) ?? fallback.localBusiness.postcode,
    },
  }
}

export async function getSeoSettings(): Promise<SeoSettingsResolved> {
  return withCms(async (payload) => {
    const settings = (await payload.findGlobal({
      // Cast needed until the global is registered in payload.config.ts and
      // `payload generate:types` refreshes payload-types.ts with "seo-settings".
      slug: "seo-settings" as GlobalSlug,
      depth: 1,
      overrideAccess: false,
    })) as unknown as CmsSeoSettings

    return resolveSeoSettings(settings)
  }, fallbackSeoSettings)
}
