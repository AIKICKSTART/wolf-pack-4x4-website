import type { ReactNode } from "react"

import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"
import Image from "next/image"
import Link from "next/link"

import type { CmsContentOverride } from "@/lib/cms/types"
import { PublicNav } from "@/components/mufflermen/public-nav"
import { PublicConversionDock, PublicSiteFooter } from "@/lib/cms/public-ui"
import { hasBlocks, isBlockCmsEnabled } from "@/lib/cms/blocks/flags"
import { RenderBlocks } from "@/lib/cms/blocks/render-registry"
import {
  publicContactFromSettings,
  type PublicSiteSettings,
} from "@/lib/cms/public-settings"
import { siteImages } from "@/lib/site-assets"
import {
  areaPages,
  getLocation,
  locations,
  locationDescription,
  locationWorkshopContext,
  servicePages,
  serviceLocationWorkshopContext,
  serviceLocationDescription,
  serviceLocationFaq,
  serviceLocationPath,
  serviceLocationTitle,
  type AreaPage,
  type LocationPage,
  type ServicePage,
} from "@/lib/seo"
import { PartsLookup } from "@/components/mufflermen/parts-lookup"
import { PartMediaZoom } from "@/components/mufflermen/part-media-zoom"
import { BrandCarbonIcon } from "@/components/mufflermen/shared/brand-icon"
import type { BrandIconName } from "@/components/mufflermen/shared/types"
import { findPartsBrandLogo } from "@/lib/parts-brand-logos"
import { composeWorkshopNote, type WorkshopNoteContent } from "@/lib/workshop-note"
import {
  categoryCount,
  hasRealPartImage,
  cleanProductSummary,
  displayPartTitle,
  PART_CATEGORY_PAGE_SIZE,
  partCategories,
  partCategoryPageCount,
  partCategoryPagePath,
  partsInCategoryPage,
  partSpecEntries,
  type PartCategory,
  type SupplierPart,
} from "@/lib/parts"

type PageCover = {
  alt: string
  src: string
}

type PageOverride = Pick<CmsContentOverride, "blocks" | "body" | "content" | "hero" | "summary" | "updatedAt"> | null | undefined

type SEOHeadingProps = {
  accent?: string
  children: ReactNode
  className?: string
  level?: 1 | 2 | 3
}

const pageCovers = {
  services: {
    src: siteImages.covers.services,
    alt: "Wolfpack 4x4 RAM build with blue and purple off-road lighting",
  },
  serviceDetail: {
    src: siteImages.covers.serviceDetail,
    alt: "Wolfpack 4x4 service cover with off-road truck and wolf brand artwork",
  },
  locations: {
    src: siteImages.covers.locations,
    alt: "Wolfpack 4x4 local workshop cover for Illawarra service areas",
  },
  regionalHubs: {
    src: siteImages.covers.regionalHubs,
    alt: "Wolfpack 4x4 regional service cover for touring and work ute upgrades",
  },
  parts: {
    src: siteImages.covers.parts,
    alt: "Wolfpack 4x4 logo artwork for parts and accessories",
  },
  category: {
    src: siteImages.covers.category,
    alt: "Wolfpack 4x4 logo artwork for 4x4 parts category pages",
  },
} satisfies Record<string, PageCover>

const locationPriorityRank = {
  primary: 0,
  secondary: 1,
  support: 2,
} satisfies Record<LocationPage["priority"], number>

const serviceAreaHighlights = [...locations]
  .filter((location) => location.priority !== "support" && location.source !== "official-radius")
  .sort((a, b) => {
    return (
      locationPriorityRank[a.priority] - locationPriorityRank[b.priority] ||
      (a.distanceKm ?? Number.POSITIVE_INFINITY) - (b.distanceKm ?? Number.POSITIVE_INFINITY) ||
      a.name.localeCompare(b.name)
    )
  })
  .slice(0, 36)

const serviceAreaRegionCount = new Set(locations.map((location) => location.region)).size

function wolfpackLocationIntent(location: LocationPage) {
  const scope =
    location.priority === "primary"
      ? "high-priority local"
      : location.priority === "secondary"
        ? "nearby regional"
        : "support-area"

  return `${scope} customers in ${location.name} planning 4x4 suspension, towing, protection, lighting, recovery or touring accessory upgrades`
}

/* Catalogue page-link clouds up to this size stay inline (one tidy row);
   longer crawl indexes fold behind a SeoFold. */
const CATALOGUE_PAGE_CLOUD_INLINE_MAX = 8

const headingAccentSkipWords = new Set(["and", "for", "from", "in", "near", "of", "page", "the", "to", "with"])

function escapeRegex(value: string) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
}

function autoHeadingAccent(text: string) {
  const words = text.trim().split(/\s+/)

  if (words.length < 2) {
    return ""
  }

  return (
    [...words]
      .reverse()
      .find((word) => {
        const normalized = word.replace(/[^a-z0-9]/gi, "").toLowerCase()
        return normalized.length > 2 && !headingAccentSkipWords.has(normalized)
      }) ?? ""
  )
}

function headingText(children: ReactNode): string {
  if (Array.isArray(children)) {
    return children.map((child) => headingText(child)).join("")
  }

  if (typeof children === "string" || typeof children === "number") {
    return String(children)
  }

  return ""
}

function headingParts(text: string, accent?: string) {
  const accentText = accent ?? autoHeadingAccent(text)

  if (!accentText) {
    return <span className="seo-heading-text">{text}</span>
  }

  const match = new RegExp(escapeRegex(accentText), "i").exec(text)

  if (!match) {
    return <span className="seo-heading-text">{text}</span>
  }

  const before = text.slice(0, match.index)
  const matched = text.slice(match.index, match.index + match[0].length)
  const after = text.slice(match.index + match[0].length)

  return (
    <>
      {before && <span className="seo-heading-text">{before}</span>}
      <span className="seo-heading-accent">{matched}</span>
      {after && <span className="seo-heading-text">{after}</span>}
    </>
  )
}

function SEOHeading({ accent, children, className = "", level = 2 }: SEOHeadingProps) {
  const classes = ["seo-heading", className].filter(Boolean).join(" ")
  const content = headingParts(headingText(children), accent)

  if (level === 1) {
    return <h1 className={classes}>{content}</h1>
  }

  if (level === 3) {
    return <h3 className={classes}>{content}</h3>
  }

  return <h2 className={classes}>{content}</h2>
}

/* Reusable collapsed-by-default fold for SEO/support content. Native
   details/summary: server-rendered (content stays in the HTML for
   crawlers), keyboard accessible, browser-managed expanded state.
   Collapsed: heading + 1-2 sentence summary + an action label.
   Expanded: full structured copy + a collapse action. */
export function SeoFold({
  accent,
  action,
  children,
  closeAction = "Collapse section",
  heading,
  level = 2,
  summary,
}: {
  accent?: string
  action: string
  children: ReactNode
  closeAction?: string
  heading: string
  level?: 1 | 2 | 3
  summary: string
}) {
  return (
    <details className="seo-fold">
      <summary className="seo-fold-summary">
        <span className="seo-fold-head">
          <SEOHeading accent={accent} level={level}>
            {heading}
          </SEOHeading>
          <span className="seo-fold-lede">{summary}</span>
        </span>
        <span className="seo-fold-action">
          <span className="seo-fold-action-open">{action}</span>
          <span className="seo-fold-action-close">{closeAction}</span>
        </span>
      </summary>
      <div className="seo-fold-body">{children}</div>
    </details>
  )
}

export function ExpandableSeoSection(props: Parameters<typeof SeoFold>[0] & { className?: string }) {
  const { className = "", ...fold } = props
  return (
    <section className={["seo-section seo-fold-section", className].filter(Boolean).join(" ")}>
      <SeoFold {...fold} />
    </section>
  )
}

function WorkshopNoteBody({ note, sectionsOnly = false }: { note: WorkshopNoteContent; sectionsOnly?: boolean }) {
  return (
    <div className="workshop-note">
      {!sectionsOnly &&
        note.lede.map((paragraph) => (
          <p key={paragraph} className="workshop-note-lede">
            {paragraph}
          </p>
        ))}
      {note.sections.map((section) => (
        <div key={section.heading} className="workshop-note-section">
          <SEOHeading accent={section.accent} level={3}>
            {section.heading}
          </SEOHeading>
          {section.paragraphs?.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets && (
            <ul className="workshop-note-list">
              {section.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

function PageShell({
  children,
  siteSettings,
}: {
  children: ReactNode
  siteSettings?: PublicSiteSettings | null
}) {
  const contact = publicContactFromSettings(siteSettings)

  return (
    <>
      <PublicNav displayName={contact.displayName} />
      <main className="seo-page">{children}</main>
      <PublicSiteFooter settings={siteSettings} />
      <PublicConversionDock settings={siteSettings} />
    </>
  )
}

function Hero({
  cover,
  eyebrow,
  siteSettings,
  title,
  description,
}: {
  cover?: PageCover
  eyebrow: string
  siteSettings?: PublicSiteSettings | null
  title: string
  description: string
}) {
  const contact = publicContactFromSettings(siteSettings)

  return (
    <section className={cover ? "seo-hero has-cover" : "seo-hero"}>
      {cover && (
        <div className="seo-hero-media">
          <Image
            className="seo-hero-cover"
            src={cover.src}
            alt={cover.alt}
            width={1600}
            height={900}
            priority
          />
        </div>
      )}
      <div className="seo-hero-copy">
        <div className="seo-kicker">{eyebrow}</div>
        <SEOHeading level={1}>{title}</SEOHeading>
        <p>{description}</p>
        <div className="seo-hero-proof" aria-label="Workshop proof points">
          <span>4x4 upgrades and parts</span>
          <span>Albion Park Rail workshop</span>
          <span>Built around your rig</span>
        </div>
        <div className="seo-actions">
          <a className="btn btn-red" href={contact.phoneHref}>
            Request a 4x4 quote
          </a>
          <Link className="btn btn-chrome" href="/contact-us#enquiry">
            Send vehicle details
          </Link>
        </div>
      </div>
    </section>
  )
}

function overrideText(value: string | null | undefined) {
  const text = value?.trim()
  return text && !/\$\{[^}]*\}/.test(text) ? text : undefined
}

function overrideList<T, R>(rows: T[] | null | undefined, map: (row: T) => R | undefined, fallback: R[]): R[] {
  const mapped = (rows ?? []).map(map).filter((v): v is R => v !== undefined && v !== null && v !== ("" as unknown as R))
  return mapped.length > 0 ? mapped : fallback
}

function overrideHero(
  override: PageOverride,
  fallback: { description: string; eyebrow: string; title: string },
) {
  return {
    description: overrideText(override?.hero?.lede) ?? overrideText(override?.summary) ?? fallback.description,
    eyebrow: overrideText(override?.hero?.eyebrow) ?? fallback.eyebrow,
    title: overrideText(override?.hero?.headline) ?? fallback.title,
  }
}

function hasRichTextContent(data: DefaultTypedEditorState | null | undefined): data is DefaultTypedEditorState {
  return Array.isArray(data?.root?.children) && data.root.children.length > 0
}

function OverrideBody({ override }: { override: PageOverride }) {
  const body = hasRichTextContent(override?.body) ? override?.body : undefined
  const blocks = isBlockCmsEnabled() && hasBlocks(override?.blocks) ? override?.blocks : undefined

  if (!body && !blocks) return null

  return (
    <>
      {body ? <RichText className="seo-section" data={body} /> : null}
      {blocks ? (
        <section className="seo-section dashboard" aria-label="Wolfpack 4x4 content sections">
          <RenderBlocks blocks={blocks} updatedAt={override?.updatedAt} />
        </section>
      ) : null}
    </>
  )
}

function Breadcrumbs({ items }: { items: Array<{ name: string; href: string }> }) {
  return (
    <nav className="seo-breadcrumbs" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.href}>
          {index > 0 && <span aria-hidden="true">/</span>}
          <Link href={item.href}>{item.name}</Link>
        </span>
      ))}
    </nav>
  )
}

function ContactBand({ siteSettings }: { siteSettings?: PublicSiteSettings | null }) {
  const contact = publicContactFromSettings(siteSettings)

  return (
    <section className="seo-band">
      <div>
        <SEOHeading accent="without guessing">Book the right 4x4 upgrade without guessing.</SEOHeading>
        <p>
          Send the vehicle make, model, year, engine, current accessories, intended use, towing or touring load,
          and clear photos of the fitment area where available.
        </p>
      </div>
      <div className="seo-contact-card glass">
        <a className="seo-contact-row" href={contact.mapHref}>{contact.address}</a>
        <a className="seo-contact-row" href={contact.phoneHref}>{contact.phone}</a>
        <a className="seo-contact-row" href={contact.emailHref}>{contact.email}</a>
        <Link href="/contact-us#enquiry">Send vehicle details</Link>
      </div>
    </section>
  )
}

const servicesIndexStats = [
  { label: "Core service paths", value: servicePages.length.toString() },
  { label: "Workshop base", value: "Albion Park Rail" },
  { label: "Best next step", value: "Send vehicle specs" },
]

const servicesIndexSteps = [
  {
    body: "Tell the workshop the vehicle, engine, current accessories, load, towing needs and the upgrade outcome you want.",
    title: "Start with the vehicle",
  },
  {
    body: "Choose the closest service path, then let the team confirm whether suspension, protection, power, recovery or touring gear should come first.",
    title: "Match the service",
  },
  {
    body: "The workshop checks fitment, parts, accessory weight and bay time before the job is booked.",
    title: "Quote with context",
  },
]

/* Dedicated branded service-card media. The real founder photo remains
   separate; these generated workshop scenes do not depict a named staff member. */
const serviceCardPhotos: Record<string, { alt: string; src: string; title: string }> = {
  "suspension-lift-kits": {
    alt: "Wolfpack 4x4 suspension and lift kit service card with full lifted ute and coilover components",
    src: "/media/wolfpack/services/suspension-lift-kits.webp",
    title: "Suspension and lift kits | Wolfpack 4x4",
  },
  "bull-bars-protection": {
    alt: "Wolfpack 4x4 bull bar and protection service card with full front bar assembly",
    src: "/media/wolfpack/services/bull-bars-protection.webp",
    title: "Bull bars and protection | Wolfpack 4x4",
  },
  "winches-recovery-gear": {
    alt: "Wolfpack 4x4 winch and recovery gear service card with winch drum hook and recovery boards",
    src: "/media/wolfpack/services/winches-recovery-gear.webp",
    title: "Winches and recovery gear | Wolfpack 4x4",
  },
  "4x4-lighting-electrical": {
    alt: "Wolfpack 4x4 lighting and electrical service card with light bar driving lights and wiring",
    src: "/media/wolfpack/services/4x4-lighting-electrical.webp",
    title: "4x4 lighting and electrical | Wolfpack 4x4",
  },
  "dual-battery-systems": {
    alt: "Wolfpack 4x4 dual battery system service card with battery boxes charger and wiring",
    src: "/media/wolfpack/services/dual-battery-systems.webp",
    title: "Dual battery systems | Wolfpack 4x4",
  },
  "canopies-roof-racks-storage": {
    alt: "Wolfpack 4x4 canopy roof rack and storage service card with ute canopy drawer and awning layout",
    src: "/media/wolfpack/services/canopies-roof-racks-storage.webp",
    title: "Canopies roof racks and storage | Wolfpack 4x4",
  },
  "towing-gvm-upgrades": {
    alt: "Wolfpack 4x4 towing and GVM service card with tow hitch load support and rear ute stance",
    src: "/media/wolfpack/services/towing-gvm-upgrades.webp",
    title: "Towing and GVM support | Wolfpack 4x4",
  },
  "performance-4x4-upgrades": {
    alt: "Wolfpack 4x4 performance upgrade service card with snorkel intake and engine bay support parts",
    src: "/media/wolfpack/services/performance-4x4-upgrades.webp",
    title: "Performance 4x4 upgrades | Wolfpack 4x4",
  },
  "4x4-parts-accessories": {
    alt: "Wolfpack 4x4 parts and accessories service card with organised upgrade parts on a workshop bench",
    src: "/media/wolfpack/services/4x4-parts-accessories.webp",
    title: "4x4 parts and accessories | Wolfpack 4x4",
  },
}

const serviceCardGlyphs: Record<string, BrandIconName> = {
  "suspension-lift-kits": "suspension",
  "bull-bars-protection": "protection",
  "winches-recovery-gear": "winch",
  "4x4-lighting-electrical": "lighting",
  "dual-battery-systems": "battery",
  "canopies-roof-racks-storage": "touring",
  "towing-gvm-upgrades": "towing",
  "performance-4x4-upgrades": "performance",
  "4x4-parts-accessories": "parts",
}

function ServiceCard({ service }: { service: ServicePage }) {
  const primaryProof = service.proof[0]
  const primaryScope = service.includes.slice(0, 3)
  const photo = serviceCardPhotos[service.slug]
  const kicker =
    service.serviceType.trim().toLowerCase() === service.title.trim().toLowerCase()
      ? "Workshop service"
      : service.serviceType

  return (
    <article className="seo-card glass seo-service-card">
      <div className="seo-service-media" aria-hidden={photo ? undefined : true}>
        {photo ? (
          <Image
            src={photo.src}
            alt={photo.alt}
            title={photo.title}
            width={1280}
            height={560}
            sizes="(max-width: 640px) 92vw, (max-width: 1080px) 44vw, 31vw"
          />
        ) : (
          <span className="seo-service-media-fallback">
            <BrandCarbonIcon name={serviceCardGlyphs[service.slug] ?? "parts"} />
            <span className="seo-service-media-slug">{service.slug.replace(/-/g, " ")}</span>
          </span>
        )}
      </div>
      <span className="seo-kicker">{kicker}</span>
      <SEOHeading>{service.title}</SEOHeading>
      <p>{service.metaDescription}</p>
      <ul className="seo-service-scope" aria-label={`${service.title} scope`}>
        {primaryScope.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      {primaryProof && <span className="seo-service-proof">{primaryProof}</span>}
      <div className="seo-service-actions">
        <Link href={`/services/${service.slug}`}>View service</Link>
        <Link className="seo-cta-ghost" href="/contact-us#enquiry">
          Send vehicle details
        </Link>
      </div>
    </article>
  )
}

function LocalServiceCard({ service, location }: { service: ServicePage; location: LocationPage }) {
  return (
    <article className="seo-card glass">
      <span className="seo-kicker">{location.name}</span>
      <SEOHeading>{`${service.shortTitle} ${location.name}`}</SEOHeading>
      <p>{serviceLocationDescription(service, location)}</p>
      <Link href={serviceLocationPath(service, location)}>View local service</Link>
    </article>
  )
}

function LocationCard({ location }: { location: LocationPage }) {
  return (
    <article className="seo-card glass">
      <span className="seo-kicker">{location.region}</span>
      <SEOHeading>{location.name}</SEOHeading>
      <p>{wolfpackLocationIntent(location)}.</p>
      <Link href={`/locations/${location.slug}`}>View area</Link>
    </article>
  )
}

export function ServicesIndexPage({
  contentOverride,
  siteSettings,
}: {
  contentOverride?: PageOverride
  siteSettings?: PublicSiteSettings | null
}) {
  const hero = overrideHero(contentOverride, {
    description:
      "Choose the right 4x4 upgrade path before booking. Every service page covers scope, fitment notes, FAQs and related local service areas.",
    eyebrow: "4x4 services",
    title: "Suspension, protection, recovery and touring upgrades for the Illawarra",
  })
  const stats = overrideList(
    contentOverride?.content?.servicesHub?.stats,
    (row) => {
      const value = row.value?.trim()
      const label = row.label?.trim()
      return value && label ? { label, value } : undefined
    },
    servicesIndexStats,
  )
  const steps = overrideList(
    contentOverride?.content?.servicesHub?.steps,
    (row) => {
      const title = row.title?.trim()
      const body = row.body?.trim()
      return title && body ? { body, title } : undefined
    },
    servicesIndexSteps,
  )

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
        ]}
      />
      <Hero
        cover={pageCovers.services}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />
      <section className="seo-section seo-services-decision">
        <div className="seo-services-decision-copy">
          <span className="seo-kicker">Choose the right bay path</span>
          <SEOHeading accent="before you book">Choose the service, then request a quote before you book.</SEOHeading>
          <p>
            4x4 upgrades are easier to quote when the workshop knows the vehicle, current accessories,
            load, towing needs and whether the goal is touring, work, recovery or everyday drivability.
            Pick the closest path, then send the details for practical advice.
          </p>
          <div className="seo-services-actions" aria-label="Services page actions">
            <Link className="btn btn-red" href="/contact-us#enquiry">
              <span>Request quote</span>
              <span className="arrow" />
            </Link>
            <Link className="btn btn-chrome" href="/parts">
              <span>Check parts lookup</span>
              <span className="arrow" />
            </Link>
          </div>
        </div>
        <div className="seo-services-stats" aria-label="Services proof points">
          {stats.map((stat) => (
            <span key={stat.label}>
              <strong>{stat.value}</strong>
              <small>{stat.label}</small>
            </span>
          ))}
        </div>
        <div className="seo-services-steps" aria-label="How to choose a service">
          {steps.map((step, index) => (
            <article key={step.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <strong>{step.title}</strong>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="seo-grid seo-services-grid">
        {servicePages.map((service) => (
          <ServiceCard key={service.slug} service={service} />
        ))}
      </section>
      <ContactBand siteSettings={siteSettings} />
    </PageShell>
  )
}

export function ServiceDetailPage({
  contentOverride,
  service,
  siteSettings,
}: {
  contentOverride?: PageOverride
  service: ServicePage
  siteSettings?: PublicSiteSettings | null
}) {
  const related = service.related
    .map((slug) => servicePages.find((item) => item.slug === slug))
    .filter(Boolean) as ServicePage[]
  const hero = overrideHero(contentOverride, {
    description: service.lede,
    eyebrow: "Workshop service",
    title: service.h1,
  })
  const includes = overrideList(
    contentOverride?.content?.service?.includes,
    (row) => row.item?.trim() || undefined,
    service.includes,
  )
  const proof = overrideList(
    contentOverride?.content?.service?.proof,
    (row) => row.item?.trim() || undefined,
    service.proof,
  )
  const faq = overrideList(
    contentOverride?.content?.service?.faq,
    (row) => {
      const question = row.question?.trim()
      const answer = row.answer?.trim()
      return question && answer ? { answer, question } : undefined
    },
    service.faq,
  )

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Services", href: "/services" },
          { name: service.title, href: `/services/${service.slug}` },
        ]}
      />
      <Hero
        cover={pageCovers.serviceDetail}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />

      <section className="seo-two-col">
        <div>
          <SEOHeading accent="covers">What this service covers</SEOHeading>
          <ul className="seo-list">
            {includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <SEOHeading accent="book it here">Why customers book it here</SEOHeading>
          <ul className="seo-list">
            {proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <ExpandableSeoSection
        accent={service.shortTitle}
        action="Show suburb coverage"
        heading={`Service areas for ${service.shortTitle.toLowerCase()}`}
        summary={`${serviceAreaHighlights.length} priority catchments from Oak Flats and Shellharbour to Wollongong and Kiama, backed by the full index of ${locations.length.toLocaleString()} suburbs across ${serviceAreaRegionCount.toLocaleString()} regions.`}
      >
        <p className="seo-service-area-copy">
          Showing the priority workshop catchments first. The full suburb index covers {locations.length.toLocaleString()} areas across {serviceAreaRegionCount.toLocaleString()} regions for local search and generated suburb routes.
        </p>
        <div className="seo-link-cloud seo-link-cloud-compact seo-service-area-cloud">
          {serviceAreaHighlights.map((location) => (
            <Link key={location.slug} href={serviceLocationPath(service, location)}>
              {service.shortTitle} {location.name}
            </Link>
          ))}
          <Link className="seo-link-cloud-primary" href="/locations">
            View all service areas
          </Link>
        </div>
      </ExpandableSeoSection>

      <ExpandableSeoSection
        accent="Questions"
        action="Read the answers"
        heading="Questions customers ask"
        summary={`${faq.length} straight answers on ${service.shortTitle.toLowerCase()}: scope, booking and what the workshop checks before quoting.`}
      >
        <div className="seo-faq">
          {faq.map((item) => (
            <article key={item.question} className="seo-card glass">
              <SEOHeading level={3}>{item.question}</SEOHeading>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </ExpandableSeoSection>

      {related.length > 0 && (
        <section className="seo-section">
          <SEOHeading accent="Related">Related workshop services</SEOHeading>
          <div className="seo-grid compact seo-related-grid">
            {related.map((item) => (
              <ServiceCard key={item.slug} service={item} />
            ))}
          </div>
        </section>
      )}

      <ContactBand siteSettings={siteSettings} />
    </PageShell>
  )
}

export function LocationsIndexPage({
  contentOverride,
  siteSettings,
}: {
  contentOverride?: PageOverride
  siteSettings?: PublicSiteSettings | null
}) {
  const grouped = locations.reduce<Record<string, LocationPage[]>>((acc, location) => {
    acc[location.region] ??= []
    acc[location.region].push(location)
    return acc
  }, {})
  const hero = overrideHero(contentOverride, {
    description:
      "Wolfpack 4x4 serves drivers from the Albion Park Rail workshop near Oak Flats, with suburb pages across the Illawarra and broader 100 km service footprint. Find the closest suburb coverage and relevant 4x4 services before calling or sending vehicle details.",
    eyebrow: "Suburb pages",
    title: "4x4 upgrade suburb pages around Oak Flats",
  })

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/locations" },
        ]}
      />
      <Hero
        cover={pageCovers.locations}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />
      {Object.entries(grouped).map(([region, items]) => {
        const sampleNames = items.slice(0, 3).map((item) => item.name).join(", ")
        return (
          <ExpandableSeoSection
            key={region}
            accent={region.split(/\s+/)[0]}
            action={items.length === 1 ? "Show the suburb page" : `Show all ${items.length} suburbs`}
            heading={region}
            summary={
              items.length > 3
                ? `Suburb pages for ${sampleNames} and ${items.length - 3} more areas in this region, each with local 4x4 upgrade advice.`
                : `Suburb pages for ${sampleNames}, each with local 4x4 upgrade advice.`
            }
          >
            <div className="seo-grid compact">
              {items.map((location) => (
                <LocationCard key={location.slug} location={location} />
              ))}
            </div>
          </ExpandableSeoSection>
        )
      })}
      <ContactBand siteSettings={siteSettings} />
    </PageShell>
  )
}

export function LocationDetailPage({
  contentOverride,
  location,
  siteSettings,
}: {
  contentOverride?: PageOverride
  location: LocationPage
  siteSettings?: PublicSiteSettings | null
}) {
  const locationContent = contentOverride?.content?.location
  const mergedLocation: LocationPage = {
    ...location,
    localIntent: overrideText(locationContent?.localIntent) ?? wolfpackLocationIntent(location),
    nearby: overrideList(locationContent?.nearby, (row) => row.name?.trim() || undefined, location.nearby),
  }
  const workshopContext = overrideText(locationContent?.workshopContext) ?? locationWorkshopContext(mergedLocation)
  const hero = overrideHero(contentOverride, {
    description: locationDescription(mergedLocation),
    eyebrow: location.region,
    title: `4x4 upgrades and accessories near ${location.name}`,
  })

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/locations" },
          { name: location.name, href: `/locations/${location.slug}` },
        ]}
      />
      <Hero
        cover={pageCovers.locations}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />
      <section className="seo-two-col">
        <div>
          <SEOHeading accent={location.name}>Why {location.name} drivers call Wolfpack 4x4</SEOHeading>
          <p>{workshopContext}</p>
        </div>
        <div>
          <SeoFold
            accent="Nearby"
            action="Show nearby suburbs"
            heading="Nearby areas covered"
            summary={`${mergedLocation.nearby.length} neighbouring areas around ${location.name} share the same Albion Park Rail workshop run, including ${mergedLocation.nearby.slice(0, 2).join(" and ")}.`}
          >
            <div className="seo-link-cloud seo-link-cloud-compact">
              {mergedLocation.nearby.map((name) => {
                const nearby = locations.find((item) => item.name === name)
                return nearby ? (
                  <Link key={name} href={`/locations/${nearby.slug}`}>
                    {name}
                  </Link>
                ) : (
                  <span key={name}>{name}</span>
                )
              })}
            </div>
          </SeoFold>
        </div>
      </section>

      <ExpandableSeoSection
        accent={location.name}
        action={`Show all ${servicePages.length} services`}
        heading={`4x4 services available for ${location.name}`}
        summary={`All ${servicePages.length} workshop services are bookable from ${location.name}, from suspension and bull bars to recovery, lighting, towing and touring accessories.`}
      >
        <div className="seo-grid compact">
          {servicePages.map((service) => (
            <LocalServiceCard key={service.slug} service={service} location={location} />
          ))}
        </div>
      </ExpandableSeoSection>

      <ContactBand siteSettings={siteSettings} />
    </PageShell>
  )
}

export function ServiceLocationDetailPage({
  contentOverride,
  service,
  location,
  siteSettings,
}: {
  contentOverride?: PageOverride
  service: ServicePage
  location: LocationPage
  siteSettings?: PublicSiteSettings | null
}) {
  const related = service.related
    .map((slug) => servicePages.find((item) => item.slug === slug))
    .filter(Boolean) as ServicePage[]
  const nearbyLocations = location.nearby
    .map((name) => locations.find((item) => item.name === name))
    .filter(Boolean) as LocationPage[]
  const faqs = serviceLocationFaq(service, location)
  const hero = overrideHero(contentOverride, {
    description: serviceLocationDescription(service, location),
    eyebrow: `${location.region} service`,
    title: serviceLocationTitle(service, location),
  })

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Service areas", href: "/locations" },
          { name: location.name, href: `/locations/${location.slug}` },
          { name: service.shortTitle, href: serviceLocationPath(service, location) },
        ]}
      />
      <Hero
        cover={pageCovers.locations}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />

      <section className="seo-two-col">
        <div>
          <SEOHeading accent={location.name}>What {location.name} drivers usually need</SEOHeading>
          <p>{serviceLocationWorkshopContext(service, location)}</p>
        </div>
        <div>
          <SEOHeading accent="scope">{service.shortTitle} scope</SEOHeading>
          <ul className="seo-list">
            {service.includes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="seo-two-col">
        <div>
          <SEOHeading accent="Wolfpack">Why book it through Wolfpack 4x4</SEOHeading>
          <ul className="seo-list">
            {service.proof.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
        <div>
          <SeoFold
            accent="Nearby"
            action="Show nearby suburbs"
            heading="Nearby suburbs"
            summary={`${service.shortTitle} coverage extends to ${location.nearby.length} suburbs near ${location.name}, including ${location.nearby.slice(0, 2).join(" and ")}.`}
          >
            <div className="seo-link-cloud seo-link-cloud-compact">
              {nearbyLocations.map((nearby) => (
                <Link key={nearby.slug} href={serviceLocationPath(service, nearby)}>
                  {service.shortTitle} {nearby.name}
                </Link>
              ))}
              {location.nearby
                .filter((name) => !nearbyLocations.some((nearby) => nearby.name === name))
                .map((name) => (
                  <span key={name}>{name}</span>
                ))}
            </div>
          </SeoFold>
        </div>
      </section>

      <ExpandableSeoSection
        accent={location.name}
        action="Read the answers"
        heading={`Questions about ${service.shortTitle.toLowerCase()} in ${location.name}`}
        summary={`${faqs.length} quick answers for ${location.name} drivers: coverage, what to send for a quote and when to book before travelling.`}
      >
        <div className="seo-faq">
          {faqs.map((item) => (
            <article key={item.question} className="seo-card glass">
              <SEOHeading level={3}>{item.question}</SEOHeading>
              <p>{item.answer}</p>
            </article>
          ))}
        </div>
      </ExpandableSeoSection>

      {related.length > 0 && (
        <section className="seo-section">
          <SEOHeading accent={location.name}>Related services for {location.name}</SEOHeading>
          <div className="seo-grid compact seo-related-grid">
            {related.map((item) => (
              <LocalServiceCard key={item.slug} service={item} location={location} />
            ))}
          </div>
        </section>
      )}

      <ContactBand siteSettings={siteSettings} />
    </PageShell>
  )
}

export function AreasIndexPage({
  contentOverride,
  siteSettings,
}: {
  contentOverride?: PageOverride
  siteSettings?: PublicSiteSettings | null
}) {
  const hero = overrideHero(contentOverride, {
    description:
      "Regional hub pages connect Wollongong, Shellharbour, Kiama, Shoalhaven, Southern Highlands, Macarthur, Wollondilly and Sutherland Shire pages so users and search engines can crawl the service footprint without relying on hidden suburb lists.",
    eyebrow: "Regional hubs",
    title: "Regional 4x4 service hubs",
  })

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Regional hubs", href: "/areas" },
        ]}
      />
      <Hero
        cover={pageCovers.regionalHubs}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />
      <section className="seo-grid">
        {areaPages.map((area) => (
          <article className="seo-card glass" key={area.slug}>
            <span className="seo-kicker">{area.region}</span>
            <SEOHeading>{area.name}</SEOHeading>
            <p>{area.description}</p>
            <Link href={`/areas/${area.slug}`}>View hub</Link>
          </article>
        ))}
      </section>
    </PageShell>
  )
}

export function AreaDetailPage({
  area,
  contentOverride,
  siteSettings,
}: {
  area: AreaPage
  contentOverride?: PageOverride
  siteSettings?: PublicSiteSettings | null
}) {
  const areaLocations = area.locationSlugs
    .map((slug) => getLocation(slug))
    .filter(Boolean) as LocationPage[]
  const hero = overrideHero(contentOverride, {
    description: overrideText(contentOverride?.content?.area?.description) ?? area.description,
    eyebrow: area.region,
    title: area.title,
  })

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Regional hubs", href: "/areas" },
          { name: area.name, href: `/areas/${area.slug}` },
        ]}
      />
      <Hero
        cover={pageCovers.regionalHubs}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />
      <ExpandableSeoSection
        accent={area.name}
        action={`Show all ${areaLocations.length} suburbs`}
        heading={`${area.name} suburb coverage`}
        summary={`${areaLocations.length} suburb pages sit under this hub, including ${areaLocations
          .slice(0, 3)
          .map((location) => location.name)
          .join(", ")}, each linking through to local 4x4 upgrade services.`}
      >
        <div className="seo-grid compact">
          {areaLocations.map((location) => (
            <LocationCard key={location.slug} location={location} />
          ))}
        </div>
      </ExpandableSeoSection>
      <ContactBand siteSettings={siteSettings} />
    </PageShell>
  )
}

export function PartsIndexPage({
  contentOverride,
  siteSettings,
}: {
  contentOverride?: PageOverride
  siteSettings?: PublicSiteSettings | null
}) {
  const crawlIndexGroups = partCategories
    .map((category) => ({
      category,
      pageCount: partCategoryPageCount(category.slug),
    }))
    .filter(({ pageCount }) => pageCount > 0)
  const crawlIndexPageTotal = crawlIndexGroups.reduce((total, { pageCount }) => total + pageCount, 0)
  const hero = overrideHero(contentOverride, {
    description:
      "Find 4x4 suspension, towing, lighting, recovery, storage and engine-bay accessory options before speaking with the workshop about fitment.",
    eyebrow: "4x4 parts",
    title: "4x4 parts and fitment advice",
  })

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Parts", href: "/parts" },
        ]}
      />
      <Hero
        cover={pageCovers.parts}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />
      <PartsLookup />
      <section className="seo-section">
        <SEOHeading accent="Catalogue">Catalogue categories</SEOHeading>
        <div className="seo-grid compact seo-catalogue-grid">
          {partCategories.map((category) => (
            <PartCategoryCard key={category.slug} category={category} />
          ))}
        </div>
      </section>
      <section className="seo-section seo-crawl-index seo-crawl-only" aria-label="Search engine crawl index">
        <div className="seo-crawl-index-head">
          <div>
            <span className="seo-crawl-kicker">Search engine index</span>
            <SEOHeading accent="crawl" className="seo-crawl-title">
              Full crawl index
            </SEOHeading>
            <p className="seo-crawl-copy">
              These static category page links keep every product detail URL discoverable for
              search engines while customers use the faster live SKU, vehicle and part lookup above.
            </p>
          </div>
          <span className="seo-crawl-count">{crawlIndexPageTotal} static pages</span>
        </div>
        <details className="seo-crawl-details">
          <summary>
            <span>Open category page archive</span>
            <span>SEO links stay crawlable in the page HTML</span>
          </summary>
          <div className="seo-crawl-groups">
            {crawlIndexGroups.map(({ category, pageCount }) => (
              <div className="seo-crawl-group" key={category.slug}>
                <h3>{category.title}</h3>
                <div className="seo-crawl-links">
                  {Array.from({ length: pageCount }, (_, index) => {
                    const page = index + 1
                    return (
                      <Link key={`${category.slug}-${page}`} href={partCategoryPagePath(category.slug, page)}>
                        Page {page}
                      </Link>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </details>
      </section>
      <section className="seo-band">
        <div>
          <SEOHeading accent="4x4 parts">Find the right 4x4 part faster</SEOHeading>
          <p>
            The catalogue is filtered toward non-muffler 4x4 categories so customers can compare
            suspension, towing, lighting, recovery, storage and accessory parts, then contact the
            workshop for fitment advice before ordering.
          </p>
        </div>
      </section>
    </PageShell>
  )
}

function PartCategoryCard({ category }: { category: PartCategory }) {
  const count = categoryCount(category.slug)

  return (
    <article className="seo-card glass">
      <span className="seo-kicker">{category.seoMode === "rich" ? "Buying guide" : "Specs and price"}</span>
      <SEOHeading>{category.title}</SEOHeading>
      <p>{category.description}</p>
      <Link href={`/parts/category/${category.slug}`}>{count ? `${count} parts` : "View category"}</Link>
    </article>
  )
}

export function PartCategoryPage({
  category,
  contentOverride,
  page = 1,
  siteSettings,
}: {
  category: PartCategory
  contentOverride?: PageOverride
  page?: number
  siteSettings?: PublicSiteSettings | null
}) {
  const total = categoryCount(category.slug)
  const pageCount = partCategoryPageCount(category.slug)
  const safePage = Math.min(Math.max(1, Math.floor(page) || 1), pageCount)
  const parts = partsInCategoryPage(category.slug, safePage)
  const firstItem = total ? (safePage - 1) * PART_CATEGORY_PAGE_SIZE + 1 : 0
  const lastItem = Math.min(total, firstItem + parts.length - 1)
  const hero = overrideHero(contentOverride, {
    description: overrideText(contentOverride?.content?.partCategory?.description) ?? category.description,
    eyebrow: "Part category",
    title: safePage > 1 ? `${category.title} parts page ${safePage}` : category.title,
  })
  const cataloguePageLinks = Array.from({ length: pageCount }, (_, index) => {
    const itemPage = index + 1
    return (
      <Link
        key={itemPage}
        href={partCategoryPagePath(category.slug, itemPage)}
        aria-current={itemPage === safePage ? "page" : undefined}
      >
        Page {itemPage}
      </Link>
    )
  })

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Parts", href: "/parts" },
          { name: category.title, href: partCategoryPagePath(category.slug, 1) },
          ...(safePage > 1 ? [{ name: `Page ${safePage}`, href: partCategoryPagePath(category.slug, safePage) }] : []),
        ]}
      />
      <Hero
        cover={pageCovers.category}
        eyebrow={hero.eyebrow}
        siteSettings={siteSettings}
        title={hero.title}
        description={hero.description}
      />
      <OverrideBody override={contentOverride} />
      <section className="seo-section">
        <SEOHeading accent={total ? "parts" : "pending"}>
          {total
            ? `${firstItem.toLocaleString()}-${lastItem.toLocaleString()} of ${total.toLocaleString()} parts`
            : "Supplier feed pending"}
        </SEOHeading>
        {pageCount > 1 && pageCount <= CATALOGUE_PAGE_CLOUD_INLINE_MAX && (
          <div className="seo-link-cloud" aria-label={`${category.title} catalogue pages`}>
            {cataloguePageLinks}
          </div>
        )}
        {pageCount > CATALOGUE_PAGE_CLOUD_INLINE_MAX && (
          <SeoFold
            accent="Catalogue"
            action={`Show all ${pageCount} pages`}
            heading="Catalogue page index"
            level={3}
            summary={`${category.title} runs to ${pageCount} catalogue pages of up to ${PART_CATEGORY_PAGE_SIZE} parts each. You are on page ${safePage}.`}
          >
            <div className="seo-link-cloud seo-link-cloud-compact" aria-label={`${category.title} catalogue pages`}>
              {cataloguePageLinks}
            </div>
          </SeoFold>
        )}
        {parts.length ? (
          <div className="seo-grid compact">
            {parts.map((part) => (
              <PartCard key={part.slug} part={part} />
            ))}
          </div>
        ) : (
          <p className="seo-empty">
            This category is ready for the supplied parts list, images, specs, RRP pricing and SEO copy.
          </p>
        )}
      </section>
    </PageShell>
  )
}

function PartCard({ part }: { part: SupplierPart }) {
  const hasImage = hasRealPartImage(part)
  const hasSupplierWatermark = isSupplierWatermarkMedia(part)
  const title = displayPartTitle(part)
  const summary = cleanProductSummary(part)

  return (
    <article className={`seo-card seo-part-card glass ${hasImage ? "has-media" : "needs-media"}`}>
      <div className={`seo-part-media ${hasSupplierWatermark ? "supplier-watermark-media" : ""}`}>
        {hasImage ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="seo-part-thumb"
            src={part.image}
            alt={part.imageAlt}
            width={520}
            height={520}
            loading="lazy"
            decoding="async"
          />
        ) : (
          <div className="seo-part-fallback" aria-label="Product media pending">
            <span>{part.category.replace(/-/g, " ")}</span>
          </div>
        )}
      </div>
      <span className="seo-kicker">{part.sku}</span>
      <SEOHeading>{title}</SEOHeading>
      <p>{summary}</p>
      <Link href={`/parts/${part.slug}`}>View part</Link>
    </article>
  )
}

function partBrandLabel(part: SupplierPart) {
  return (part.brand || part.supplier || "Workshop part").trim()
}

function partBrandInitials(label: string) {
  const normalized = label.replace(/&/g, " and ").replace(/[^a-z0-9\s]/gi, " ")
  const words = normalized.split(/\s+/).filter(Boolean)

  if (!words.length) {
    return "OF"
  }

  if (words.length === 1) {
    return words[0].slice(0, 3).toUpperCase()
  }

  return words
    .filter((word) => !/^(and|the|pty|ltd|automotive)$/i.test(word))
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase()
}

function isSupplierWatermarkMedia(part: SupplierPart) {
  const mediaSource = `${part.supplierCode ?? ""} ${part.supplier ?? ""} ${part.brand ?? ""}`.toLowerCase()
  return /\b(mpi|manta)\b/.test(mediaSource)
}

function partLogoBrandHints(part: SupplierPart) {
  const source = `${part.title} ${part.brand ?? ""} ${part.supplier ?? ""}`.toLowerCase()
  const hints: string[] = []

  if (part.supplierCode === "mpi") hints.push("manta")
  if (/\bx[-\s]?force\b|\bvarex\b/.test(source)) hints.push("xforce")
  if (/\bredback\b/.test(source)) hints.push("redback")
  if (/\blukey\b/.test(source)) hints.push("lukey")
  if (/\bflow\s?tech\b/.test(source)) hints.push("flowtech advantage")
  if (/\bsilverback\b/.test(source)) hints.push("silverback armour")
  if (/\bblue diamond\b/.test(source)) hints.push("blue diamond")
  if (/\bmission euro\b/.test(source)) hints.push("mission euro")
  if (/\bthermal armour\b/.test(source)) hints.push("thermal armour")
  if (/\btorctite\b/.test(source)) hints.push("torctite clamps")
  if (/\bultibend\b/.test(source)) hints.push("ultibend stainless")
  if (/\bxtraseal\b/.test(source)) hints.push("xtraseal")
  if (/\bdinex\b/.test(source)) hints.push("dinex")
  if (/\bwombat\b/.test(source)) hints.push("wombat")
  if (/\bufi\b/.test(source)) hints.push("ufi filters")
  if (/\bdiode dynamics\b/.test(source)) hints.push("diode dynamics")

  return hints
}

function PartBrandBadge({ part }: { part: SupplierPart }) {
  const fallbackLabel = partBrandLabel(part)
  const supplier = part.supplier?.trim()
  const brandLogo = findPartsBrandLogo(
    ...partLogoBrandHints(part),
    part.brand,
    part.supplier,
    part.supplierCode,
    fallbackLabel,
  )
  // When a logo matched (e.g. Manta detected from the title), name the brand
  // after the logo so the badge text and mark never disagree.
  const label = brandLogo?.name ?? fallbackLabel
  const showSupplier = supplier && supplier.toLowerCase() !== label.toLowerCase()
  const markClass = [
    "seo-product-brand-mark",
    brandLogo ? "seo-product-brand-mark--logo" : "",
    brandLogo?.surface === "dark" ? "seo-product-brand-mark--dark" : "",
    brandLogo?.surface === "light" ? "seo-product-brand-mark--light" : "",
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className="seo-product-brand" aria-label={`Brand: ${label}`}>
      <span className={markClass} aria-hidden="true">
        {brandLogo ? (
          <Image
            className="seo-product-brand-logo"
            src={brandLogo.src}
            alt=""
            width={1200}
            height={420}
            sizes="116px"
          />
        ) : (
          partBrandInitials(label)
        )}
      </span>
      <span className="seo-product-brand-copy">
        <small>Brand</small>
        <strong>{label}</strong>
        {showSupplier && <em>{supplier}</em>}
      </span>
    </div>
  )
}

export function PartDetailPage({
  category,
  contentOverride,
  part,
  siteSettings,
}: {
  category?: PartCategory
  contentOverride?: PageOverride
  part: SupplierPart
  siteSettings?: PublicSiteSettings | null
}) {
  const localPartLocations = locations.filter((location) => location.priority !== "support").slice(0, 18)
  const hasImage = hasRealPartImage(part)
  const gallery = hasImage ? (part.images?.length ? part.images : [part.image]) : []
  const zoomImages = hasImage ? Array.from(new Set([part.image, ...gallery.slice(0, 4)])) : []
  const specs = partSpecEntries(part)
  const hasSupplierWatermark = isSupplierWatermarkMedia(part)
  const title = overrideText(contentOverride?.hero?.headline) ?? displayPartTitle(part, 88)
  const summary =
    overrideText(contentOverride?.hero?.lede) ??
    overrideText(contentOverride?.summary) ??
    cleanProductSummary(part, 88)
  const workshopNote = composeWorkshopNote(part)

  return (
    <PageShell siteSettings={siteSettings}>
      <Breadcrumbs
        items={[
          { name: "Home", href: "/" },
          { name: "Parts", href: "/parts" },
          ...(category ? [{ name: category.title, href: `/parts/category/${category.slug}` }] : []),
          { name: title, href: `/parts/${part.slug}` },
        ]}
      />
      <section className="seo-product">
        <div>
          <span className="seo-kicker">{part.sku}</span>
          <SEOHeading level={1}>{title}</SEOHeading>
          <p>{summary}</p>
          <PartBrandBadge part={part} />
          {category && (
            <p className="seo-product-category">
              Category: <Link href={`/parts/category/${category.slug}`}>{category.title}</Link>
            </p>
          )}
          <div className="seo-price">
            {part.rrp > 0 ? `RRP $${part.rrp.toFixed(2)} ${part.currency}` : "RRP pending"}
          </div>
          <div className="seo-part-cta">
            <Link className="btn btn-red" href="/quote">
              <span>Request fitted quote</span>
              <span className="arrow" />
            </Link>
            <a className="btn btn-chrome" href={publicContactFromSettings(siteSettings).phoneHref}>
              <span>Call the workshop</span>
            </a>
          </div>
        </div>
        <div
          className={`seo-product-media ${hasImage ? "has-media" : "needs-media"} ${
            hasSupplierWatermark ? "supplier-watermark-media" : ""
          }`}
        >
          {hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={part.image}
              alt={part.imageAlt}
              width={720}
              height={720}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              data-zoom-index={0}
            />
          ) : (
            <div className="seo-product-fallback" aria-label="Product media pending">
              <span>{part.sku}</span>
              <strong>Media being sourced</strong>
              <small>Specs and fitment details are available now.</small>
            </div>
          )}
          {gallery.length > 1 && (
            <div className="seo-product-gallery" aria-label="Part image gallery">
              {gallery.slice(0, 4).map((image) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={image}
                  src={image}
                  alt={`${title} alternate view`}
                  width={520}
                  height={520}
                  loading="lazy"
                  decoding="async"
                  data-zoom-index={Math.max(0, zoomImages.indexOf(image))}
                />
              ))}
            </div>
          )}
          {hasImage && <PartMediaZoom images={zoomImages} title={title} />}
        </div>
      </section>
      <OverrideBody override={contentOverride} />
      <section className="seo-two-col">
        <div>
          <SEOHeading accent="specs">Part specs</SEOHeading>
          <dl className="seo-specs">
            {specs.map(([name, value]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          {workshopNote.lede.map((paragraph) => (
            <p key={paragraph} className="workshop-note-lede">
              {paragraph}
            </p>
          ))}
          <SeoFold
            accent="Workshop"
            action="Read the full workshop note"
            heading="Workshop note"
            summary={workshopNote.summary}
          >
            <WorkshopNoteBody note={workshopNote} sectionsOnly />
          </SeoFold>
        </div>
      </section>
      <ExpandableSeoSection
        accent="Illawarra"
        action="Show nearby fitment areas"
        heading="Fitment support across the Illawarra"
        summary={`Fitment checks near you across ${localPartLocations.length} Illawarra suburbs, from Oak Flats and Shellharbour to Wollongong and Kiama.`}
      >
        <p>
          Wolfpack 4x4 can check this part against supplier specs, part number, image,
          RRP and vehicle details for customers around Oak Flats, Shellharbour, Wollongong,
          Dapto, Albion Park, Kiama and the northern suburbs.
        </p>
        <div className="seo-link-cloud seo-link-cloud-compact">
          {localPartLocations.map((location) => (
            <Link key={location.slug} href={`/locations/${location.slug}`}>
              Check fitment near {location.name}
            </Link>
          ))}
        </div>
      </ExpandableSeoSection>
      <ContactBand siteSettings={siteSettings} />
    </PageShell>
  )
}
