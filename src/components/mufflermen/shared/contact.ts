import type { HomepageCmsContent, HomepageCmsSettings } from "./types"

export const EMPTY_HOMEPAGE_CMS: HomepageCmsContent = {
  campaign: null,
  override: null,
  posts: [],
  settings: null,
}

export const DEFAULT_CONTACT = {
  address: "Unit 2/8 Shaban St, Albion Park Rail NSW 2527",
  displayName: "Wolfpack 4x4",
  email: "Info@wolfpack4x4.au",
  emailHref: "mailto:Info@wolfpack4x4.au",
  mapHref:
    "https://www.google.com/maps/search/?api=1&query=Unit%202%2F8%20Shaban%20St%20Albion%20Park%20Rail%20NSW%202527",
  openingHours: "Mon-Fri 8:00am-5:00pm",
  phone: "02 4256 9256",
  phoneHref: "tel:+61242569256",
  primaryCallToAction: "Request a 4x4 upgrade quote",
} as const

export function cmsText(value: string | null | undefined, fallback: string) {
  const text = value?.trim()
  return text || fallback
}

export function contactFromCms(settings: HomepageCmsSettings | null) {
  return {
    address: cmsText(settings?.address, DEFAULT_CONTACT.address),
    displayName: cmsText(settings?.displayName, DEFAULT_CONTACT.displayName),
    email: cmsText(settings?.email, DEFAULT_CONTACT.email),
    emailHref: cmsText(settings?.emailHref, DEFAULT_CONTACT.emailHref),
    mapHref: cmsText(settings?.mapHref, DEFAULT_CONTACT.mapHref),
    openingHours: cmsText(settings?.openingHours, DEFAULT_CONTACT.openingHours),
    phone: cmsText(settings?.phone, DEFAULT_CONTACT.phone),
    phoneHref: cmsText(settings?.phoneHref, DEFAULT_CONTACT.phoneHref),
    primaryCallToAction: cmsText(
      settings?.primaryCallToAction,
      DEFAULT_CONTACT.primaryCallToAction,
    ),
  }
}

export function splitHeroHeadline(headline: string | null | undefined) {
  const cleanHeadline = headline?.trim()
  // Default H1 leads with the primary service + location keywords (SEO), with the
  // brand tagline carried by the eyebrow/lede above and below it.
  if (!cleanHeadline) return ["Performance 4x4 upgrades", "for Illawarra rigs"]

  const words = cleanHeadline.split(/\s+/)
  if (words.length < 5) return [cleanHeadline, ""]

  const midpoint = Math.ceil(words.length / 2)
  return [words.slice(0, midpoint).join(" "), words.slice(midpoint).join(" ")]
}
