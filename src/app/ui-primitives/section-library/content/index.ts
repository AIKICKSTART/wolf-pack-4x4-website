/**
 * Section-library — content group barrel.
 *
 * Six production-ready Mufflermen page sections, each composed only from
 * existing primitives, each shipping a `BlockManifest` so the CMS canvas can
 * drag it. Exports the components, their manifests, the registry envelope type,
 * and a flat `CONTENT_SECTIONS` catalogue the showcase + palette consume.
 *
 * TOKEN-DRIVEN ONLY: every section reads central `--primitive-*` tokens.
 */

import { BlogFeatureSection, blogFeatureManifest } from "./blog-feature-section"
import { FaqAccordionSection, faqAccordionManifest } from "./faq-accordion-section"
import {
  ContactEnquirySection,
  contactEnquiryManifest,
} from "./contact-enquiry-section"
import {
  LocalSeoSuburbSection,
  localSeoSuburbManifest,
} from "./local-seo-suburb-section"
import { PartsProductSection, partsProductManifest } from "./parts-product-section"
import { VideoHeroSection, videoHeroManifest } from "./video-hero-section"

import type {
  SectionLibraryCategory,
  SectionLibraryEntry,
} from "./_shared/types"

// — Components ————————————————————————————————————————————
export { BlogFeatureSection } from "./blog-feature-section"
export { FaqAccordionSection } from "./faq-accordion-section"
export { ContactEnquirySection } from "./contact-enquiry-section"
export { LocalSeoSuburbSection } from "./local-seo-suburb-section"
export { PartsProductSection } from "./parts-product-section"
export { VideoHeroSection } from "./video-hero-section"

// — Manifests —————————————————————————————————————————————
export { blogFeatureManifest } from "./blog-feature-section"
export { faqAccordionManifest } from "./faq-accordion-section"
export { contactEnquiryManifest } from "./contact-enquiry-section"
export { localSeoSuburbManifest } from "./local-seo-suburb-section"
export { partsProductManifest } from "./parts-product-section"
export { videoHeroManifest } from "./video-hero-section"

// — Registry types —————————————————————————————————————————
export { SECTION_CATEGORY_LABEL } from "./_shared/types"
export type {
  SectionLibraryCategory,
  SectionLibraryEntry,
} from "./_shared/types"

/** The six content sections, in showcase order. */
export const CONTENT_SECTIONS: readonly SectionLibraryEntry[] = [
  {
    key: blogFeatureManifest.type,
    category: "blog",
    label: blogFeatureManifest.name,
    description: blogFeatureManifest.summary,
    component: BlogFeatureSection,
    manifest: blogFeatureManifest,
  },
  {
    key: faqAccordionManifest.type,
    category: "faq",
    label: faqAccordionManifest.name,
    description: faqAccordionManifest.summary,
    component: FaqAccordionSection,
    manifest: faqAccordionManifest,
  },
  {
    key: contactEnquiryManifest.type,
    category: "contact",
    label: contactEnquiryManifest.name,
    description: contactEnquiryManifest.summary,
    component: ContactEnquirySection,
    manifest: contactEnquiryManifest,
  },
  {
    key: localSeoSuburbManifest.type,
    category: "local-seo",
    label: localSeoSuburbManifest.name,
    description: localSeoSuburbManifest.summary,
    component: LocalSeoSuburbSection,
    manifest: localSeoSuburbManifest,
  },
  {
    key: partsProductManifest.type,
    category: "parts",
    label: partsProductManifest.name,
    description: partsProductManifest.summary,
    component: PartsProductSection,
    manifest: partsProductManifest,
  },
  {
    key: videoHeroManifest.type,
    category: "video-hero",
    label: videoHeroManifest.name,
    description: videoHeroManifest.summary,
    component: VideoHeroSection,
    manifest: videoHeroManifest,
  },
] as const

/** All content-section manifests, for registry/palette wiring. */
export const CONTENT_SECTION_MANIFESTS = CONTENT_SECTIONS.map(
  (entry) => entry.manifest,
)

/** Lookup a content section by its stable key. */
export function getContentSection(key: string): SectionLibraryEntry | undefined {
  return CONTENT_SECTIONS.find((entry) => entry.key === key)
}

/** Group the content sections by category for the showcase rail. */
export function getContentSectionsByCategory(): ReadonlyMap<
  SectionLibraryCategory,
  SectionLibraryEntry[]
> {
  const map = new Map<SectionLibraryCategory, SectionLibraryEntry[]>()
  for (const entry of CONTENT_SECTIONS) {
    const bucket = map.get(entry.category) ?? []
    bucket.push(entry)
    map.set(entry.category, bucket)
  }
  return map
}
