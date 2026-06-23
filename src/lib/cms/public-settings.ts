import "server-only"

import { business } from "@/lib/site-data"

import { getSiteSettings } from "./content"
import type { CmsSiteSettings } from "./types"

export type PublicSiteSettings = {
  address: string | null
  displayName: string | null
  email: string | null
  emailHref: string | null
  mapHref: string | null
  openingHours: string | null
  phone: string | null
  phoneHref: string | null
  primaryCallToAction: string | null
  socialLinks: Array<{ label: string; url: string }>
  footerLinks: Array<{ label: string; href: string }>
}

const fallbackPublicSiteSettings = {
  address: business.address,
  displayName: business.name,
  email: business.email,
  emailHref: `mailto:${business.email}`,
  mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(business.address)}`,
  phone: business.phone,
  phoneHref: "tel:+61242569256",
  primaryCallToAction: "Request a 4x4 upgrade quote",
} as const

function cleanText(value: string | null | undefined) {
  const text = value?.trim()
  return text && !/\$\{[^}]*\}/.test(text) ? text : null
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

export function publicSiteSettingsFromCms(settings: CmsSiteSettings | null): PublicSiteSettings | null {
  if (!settings) return null

  const address = cleanText(settings.business?.address)
  const displayName = cleanText(settings.business?.displayName)
  const email = cleanText(settings.business?.email)
  const openingHours = cleanText(settings.business?.openingHours)
  const phone = cleanText(settings.business?.phone)
  const primaryCallToAction = cleanText(settings.marketing?.primaryCallToAction)
  const socialLinks = (settings.marketing?.socialLinks ?? [])
    .map((link) => ({
      label: cleanText(link.label),
      url: safeHref(link.url),
    }))
    .filter((link): link is { label: string; url: string } => Boolean(link.label && link.url))
  const footerLinks = (settings.marketing?.footerLinks ?? [])
    .map((link) => ({
      label: cleanText(link.label),
      href: safeHref(link.href),
    }))
    .filter((link): link is { label: string; href: string } => Boolean(link.label && link.href))

  if (!address && !displayName && !email && !openingHours && !phone && !primaryCallToAction && !socialLinks.length && !footerLinks.length) {
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
    socialLinks,
    footerLinks,
  }
}

export function publicContactFromSettings(settings: PublicSiteSettings | null | undefined) {
  return {
    address: settings?.address ?? fallbackPublicSiteSettings.address,
    displayName: settings?.displayName ?? fallbackPublicSiteSettings.displayName,
    email: settings?.email ?? fallbackPublicSiteSettings.email,
    emailHref: settings?.emailHref ?? fallbackPublicSiteSettings.emailHref,
    mapHref: settings?.mapHref ?? fallbackPublicSiteSettings.mapHref,
    phone: settings?.phone ?? fallbackPublicSiteSettings.phone,
    phoneHref: settings?.phoneHref ?? fallbackPublicSiteSettings.phoneHref,
    primaryCallToAction: settings?.primaryCallToAction ?? fallbackPublicSiteSettings.primaryCallToAction,
  }
}

export async function getPublicSiteSettings() {
  return publicSiteSettingsFromCms(await getSiteSettings())
}
