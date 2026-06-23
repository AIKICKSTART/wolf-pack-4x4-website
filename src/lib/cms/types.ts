import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"

export type CmsPublishStatus = "draft" | "published"

export type CmsMedia = {
  id?: number | string
  alt?: string | null
  filename?: string | null
  height?: number | null
  mimeType?: string | null
  url?: string | null
  width?: number | null
}

export type CmsUpload = CmsMedia | number | string | null | undefined

export type CmsSeo = {
  canonicalPath?: string | null
  focusKeyword?: string | null
  metaDescription?: string | null
  metaTitle?: string | null
  noIndex?: boolean | null
}

export type CmsSocial = {
  description?: string | null
  image?: CmsUpload
  title?: string | null
}

export type CmsDocumentBase = {
  id?: number | string
  createdAt?: string | null
  _status?: CmsPublishStatus | null
  seo?: CmsSeo | null
  slug: string
  social?: CmsSocial | null
  title: string
  updatedAt?: string | null
}

export type CmsBlogPost = CmsDocumentBase & {
  content?: DefaultTypedEditorState | null
  excerpt: string
  heroImage?: CmsUpload
  publishedAt?: string | null
  topics?: Array<{ id?: number | string; label?: string | null }> | null
}

export type CmsMarketingPage = CmsDocumentBase & {
  blocks?: Array<Record<string, unknown>> | null
  content?: DefaultTypedEditorState | null
  excerpt?: string | null
  hero?: {
    eyebrow?: string | null
    headline?: string | null
    image?: CmsUpload
    lede?: string | null
  } | null
  pageType?: string | null
  path?: string | null
  showContactBand?: boolean | null
  showHero?: boolean | null
}

export type CmsContentOverride = CmsDocumentBase & {
  blocks?: Array<Record<string, unknown>> | null
  body?: DefaultTypedEditorState | null
  content?: {
    service?: { includes?: Array<{ item?: string | null }> | null; proof?: Array<{ item?: string | null }> | null; faq?: Array<{ question?: string | null; answer?: string | null }> | null } | null
    location?: { localIntent?: string | null; workshopContext?: string | null; nearby?: Array<{ name?: string | null }> | null } | null
    area?: { description?: string | null } | null
    partCategory?: { description?: string | null } | null
    servicesHub?: { stats?: Array<{ value?: string | null; label?: string | null }> | null; steps?: Array<{ title?: string | null; body?: string | null }> | null } | null
    about?: { storyParagraphs?: Array<{ text?: string | null }> | null; cards?: Array<{ title?: string | null; body?: string | null }> | null; steps?: Array<{ title?: string | null; body?: string | null }> | null; serviceList?: Array<{ item?: string | null }> | null } | null
    products?: { introHeading?: string | null; introBody?: string | null; productLinks?: Array<{ label?: string | null; href?: string | null; description?: string | null }> | null } | null
    gallery?: { items?: Array<{ image?: CmsUpload; src?: string | null; alt?: string | null; caption?: string | null }> | null } | null
    faqPage?: { generalFaqs?: Array<{ question?: string | null; answer?: string | null }> | null } | null
    homepage?: { services?: Array<{ title?: string | null; blurb?: string | null }> | null; marquee?: Array<{ text?: string | null }> | null } | null
  } | null
  hero?: {
    eyebrow?: string | null
    headline?: string | null
    image?: CmsUpload
    lede?: string | null
  } | null
  summary?: string | null
  targetPath: string
  targetType?:
    | "homepage"
    | "location"
    | "part"
    | "part-category"
    | "service"
    | "service-location"
    | "standard-page"
    | string
    | null
}

export type CmsRedirect = {
  fromPath: string
  id?: number | string
  isActive?: boolean | null
  statusCode?: "301" | "302" | string | null
  toPath: string
}

export type CmsSiteSettings = {
  business?: {
    address?: string | null
    displayName?: string | null
    email?: string | null
    openingHours?: string | null
    phone?: string | null
  } | null
  marketing?: {
    announcement?: string | null
    primaryCallToAction?: string | null
    socialLinks?: Array<{ label?: string | null; url?: string | null }> | null
    footerLinks?: Array<{ label?: string | null; href?: string | null }> | null
  } | null
}
