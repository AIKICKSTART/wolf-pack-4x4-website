import * as React from "react"

declare global {
  interface Window {
    __mufflermenSound?: boolean
  }
}

export type SoundEvent = CustomEvent<{ soundOn: boolean }>

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
  campaign: HomepageCmsCampaign | null
  override: HomepageCmsOverride | null
  posts: HomepageCmsPost[]
  settings: HomepageCmsSettings | null
}

export type MufflermenSiteProps = {
  cmsPrimitiveContent?: React.ReactNode
  homepageCms?: HomepageCmsContent
}

export type PublicCardIconItem = {
  body: string
  cta?: string
  href: string
  iconName: BrandIconName
  kicker?: string
  n?: string
  title: string
}

export type BrandIconName =
  | "exhaust"
  | "muffler"
  | "extractors"
  | "airFilter"
  | "suspension"
  | "protection"
  | "winch"
  | "lighting"
  | "battery"
  | "touring"
  | "towing"
  | "performance"
  | "phone"
  | "quote"
  | "parts"
  | "workshop"
