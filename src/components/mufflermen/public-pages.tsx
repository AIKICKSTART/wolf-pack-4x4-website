import Image from "next/image"
import Link from "next/link"
import { ClipboardList, Clock3, Mail, MapPin, PhoneCall } from "lucide-react"

import { ContactEnquiryForm } from "@/components/mufflermen/contact-enquiry-form"
import { HERO_POSTER } from "@/components/mufflermen/shared/media"
import { WolfpackStoreClient } from "@/components/wolfpack/store/WolfpackStoreClient"
import { cmsMediaAlt, cmsMediaUrl } from "@/lib/cms/content"
import {
  CmsBreadcrumbs,
  CmsContactBand,
  CmsHero,
  CmsPageShell,
} from "@/lib/cms/public-ui"
import type { PublicSiteSettings } from "@/lib/cms/public-settings"
import { publicContactFromSettings } from "@/lib/cms/public-settings"
import type { CmsContentOverride, CmsUpload } from "@/lib/cms/types"
import { business, vehicleGalleryVehicles, siteUrl } from "@/lib/site-data"
import { siteImages } from "@/lib/site-assets"
import { wolfpackAccessoryHeroes, wolfpackAccessoryProducts } from "@/lib/wolfpack-store"

const oldSiteServiceList = [
  "Suspension and lift kits",
  "Bull bars and vehicle protection",
  "Winches and recovery gear",
  "4x4 lighting and electrical",
  "Dual battery systems",
  "Canopies, racks and storage",
  "Towing and GVM support",
  "Performance 4x4 upgrades",
  "4x4 parts and accessories",
  "Staged build advice by appointment",
]

export const productLinks = [
  {
    cta: "View vehicle gallery",
    description: "Badged Australian 4x4 model visuals with the Wolfpack black, blue and purple wrap direction.",
    href: "/gallery",
    image: "/media/wolfpack/vehicles/ford-ranger-raptor-wolfpack.png",
    imageAlt: "Ford Ranger Raptor with Ford badge and Wolfpack wrap",
    imageTitle: "Australian performance 4x4 visuals | Wolfpack 4x4",
    proof: "Ranger Raptor, HiLux GR Sport, Patrol Warrior, D-MAX Blade, Triton GSR and LandCruiser 79.",
    title: "Australian performance 4x4 visuals",
  },
  {
    cta: "View clothing range",
    description: "Wolfpack shirts, jackets, hats, socks and country-ready merch in a dedicated product page.",
    href: "/products/clothing",
    image: "/media/wolfpack/store/founding-pack-technical-tee-front.png",
    imageAlt: "Founding Pack Technical Tee front product render",
    imageTitle: "Wolfpack clothing and apparel | Wolfpack 4x4",
    proof: "Apparel is now grouped under Products with front, back, side and detail images.",
    title: "Wolfpack clothing and apparel",
  },
  {
    cta: "Check suspension fitment",
    description: "Lift kits, shocks, springs and support parts for touring, towing and work utes.",
    href: "/parts/category/suspension-4x4-parts",
    image: "/media/wolfpack/store/suspension-lift-kit-front.png",
    imageAlt: "Wolfpack suspension lift kit product render",
    imageTitle: "4x4 suspension parts | Wolfpack 4x4",
    proof: "Lift and load support planned before parts are ordered.",
    title: "Suspension 4x4 parts",
  },
  {
    cta: "Plan towing support",
    description: "Tow, load and touring accessories for utes, caravans and work vehicles.",
    href: "/parts/category/towing-4x4-accessories",
    image: "/media/wolfpack/store/tow-hitch-kit-front.png",
    imageAlt: "Wolfpack tow hitch kit product render",
    imageTitle: "Towing 4x4 accessories | Wolfpack 4x4",
    proof: "Weight and towing needs checked before fitment.",
    title: "Towing 4x4 accessories",
  },
  {
    cta: "Choose lighting gear",
    description: "Driving lights, light bars and electrical support for road, trail and work use.",
    href: "/parts/category/4x4-lighting-accessories",
    image: "/media/wolfpack/store/driving-light-pair-front.png",
    imageAlt: "Wolfpack driving light pair product render",
    imageTitle: "4x4 lighting accessories | Wolfpack 4x4",
    proof: "Mounting, switching and wiring considered together.",
    title: "4x4 lighting accessories",
  },
  {
    cta: "Check engine-bay support",
    description: "Filters and engine-bay accessories for useful touring and drivability upgrades.",
    href: "/parts/category/filters-engine-bay-accessories",
    image: "/media/wolfpack/store/air-intake-kit-front.png",
    imageAlt: "Wolfpack cold air intake kit product render",
    imageTitle: "Engine bay 4x4 accessories | Wolfpack 4x4",
    proof: "Support parts matched to the vehicle and use case.",
    title: "Filters and engine-bay accessories",
  },
  {
    cta: "Ask about ECU pairing",
    description: "Performance chips, ECU support and drivability planning for 4x4 builds.",
    href: "/parts/category/performance-chips-ecu-remaps",
    image: "/media/wolfpack/store/throttle-controller-front.png",
    imageAlt: "Wolfpack throttle controller product render",
    imageTitle: "4x4 performance chips | Wolfpack 4x4",
    proof: "Performance support planned around towing and touring use.",
    title: "4x4 performance chips",
  },
  {
    cta: "Plan intake support",
    description: "Cold-air induction systems selected around the vehicle and 4x4 goal.",
    href: "/parts/category/cold-air-induction",
    image: "/media/wolfpack/store/snorkel-kit-front.png",
    imageAlt: "Cold air induction kit with filter, couplers and intake piping on a workshop bench",
    imageTitle: "4x4 air intake systems | Wolfpack 4x4",
    proof: "Intake options matched to the vehicle and build goal.",
    title: "4x4 air intake systems",
  },
]

const wolfpackProofAssets = [
  {
    path: "/media/wolfpack/vehicles/ford-ranger-raptor-wolfpack.png",
    label: "Ford Ranger Raptor",
    title: "Badged Raptor platform with Wolfpack wrap",
  },
  {
    path: "/media/wolfpack/vehicles/toyota-hilux-gr-sport-wolfpack.png",
    label: "Toyota HiLux GR Sport",
    title: "Toyota badge and GR Sport cues kept visible",
  },
  {
    path: "/media/wolfpack/vehicles/nissan-patrol-warrior-wolfpack.png",
    label: "Nissan Patrol Warrior",
    title: "Nissan and Warrior identity under Wolfpack graphics",
  },
  {
    path: "/media/wolfpack/merch/founding-wolfpack-shirt.png",
    label: "Founding shirt",
    title: "Founding Wolfpack merch concept",
  },
]

const aboutTrustStats = [
  { label: "Workshop focus", value: "4x4" },
  { label: "Home base", value: "Illawarra" },
  { label: "Build style", value: "Staged" },
]

const aboutStoryParagraphs = [
  "Wolfpack 4x4 is the 4x4-focused sister business for performance upgrades, parts and accessories from the Albion Park Rail workshop. The site keeps the proven local SEO structure, but the offer is suspension, protection, recovery, lighting, towing, touring storage and 4x4 parts.",
  "The workshop promise is simple: help you build the rig in the right order. Call first or send the vehicle details and the team can scope the current setup, the parts, the install path and the right way to stage the job.",
]

const aboutTeamCards = [
  {
    body: "The Wolfpack team anchors each quote around practical advice, clear staging and parts that suit the vehicle instead of forcing a generic accessory list.",
    kicker: "Our Team",
    title: "Wolfpack 4x4",
  },
  {
    body: "The workshop handles suspension, bull bars, recovery gear, lighting, dual battery planning, canopies, racks, towing support, performance 4x4 upgrades and parts advice.",
    kicker: "Our Workshop",
    title: "4x4 upgrade specialists",
  },
  {
    body: "Whether you need one part or a staged touring build, the next step is to send the vehicle details and goal so the workshop can narrow the parts and quote before bay time is booked.",
    kicker: "Customer path",
    title: "Call, plan, fit, check",
  },
]

const aboutWorkshopSteps = [
  {
    body: "The team starts with the vehicle, current accessories, load, tyre size and any fitment limits.",
    title: "Inspect the rig",
  },
  {
    body: "You get a practical path for suspension, protection, recovery, power, touring storage or parts.",
    title: "Quote the right stage",
  },
  {
    body: "Parts are fitted around weight, clearance, wiring, access and how the vehicle is used.",
    title: "Fit and configure",
  },
  {
    body: "Before handover, the result is checked for clearance, finish, function and the outcome you asked for.",
    title: "Check the result",
  },
]

function googleSatelliteMapSrc(address: string) {
  const query = encodeURIComponent(address)
  return `https://maps.google.com/maps?q=${query}&t=k&z=18&output=embed`
}

type PublicContentOverride = CmsContentOverride | null | undefined

function overrideText(value: string | null | undefined) {
  const text = value?.trim()
  return text && !/\$\{[^}]*\}/.test(text) ? text : undefined
}

function overrideList<Row, Value>(
  rows: Row[] | null | undefined,
  toValue: (row: Row, index: number) => Value | undefined,
) {
  const list = (rows ?? [])
    .map(toValue)
    .filter((value): value is Value => value !== undefined)
  return list.length > 0 ? list : undefined
}

// next/image only accepts local paths (plus the configured remote hosts), so
// CMS uploads resolve to a root-relative path; anything else keeps the default.
function localCmsMediaSrc(upload: CmsUpload) {
  const url = cmsMediaUrl(upload)
  if (!url) return undefined
  if (url.startsWith("/")) return url
  if (url.startsWith(siteUrl)) {
    const path = url.slice(siteUrl.length)
    return path.startsWith("/") ? path : `/${path}`
  }
  return undefined
}

function overrideHero(
  override: PublicContentOverride,
  fallback: { description: string; eyebrow: string; title: string },
) {
  return {
    description:
      overrideText(override?.hero?.lede) ?? overrideText(override?.summary) ?? fallback.description,
    eyebrow: overrideText(override?.hero?.eyebrow) ?? fallback.eyebrow,
    title: overrideText(override?.hero?.headline) ?? fallback.title,
  }
}

function overrideCover(override: PublicContentOverride, fallback: { alt: string; src: string }) {
  const src = localCmsMediaSrc(override?.hero?.image)
  if (!src) return fallback
  return { alt: cmsMediaAlt(override?.hero?.image) ?? fallback.alt, src }
}

function PublicFooterContact({ settings }: { settings?: PublicSiteSettings | null }) {
  return (
    <CmsContactBand
      settings={settings}
      title="Need a clearer 4x4 upgrade path?"
      description="Call first or send your vehicle specs so the team can scope parts, bay time, fitment and the right staged build before you arrive."
    />
  )
}

export function AboutUsPublicPage({
  contentOverride,
  settings,
}: {
  contentOverride?: PublicContentOverride
  settings?: PublicSiteSettings | null
}) {
  const aboutContent = contentOverride?.content?.about
  const hero = overrideHero(contentOverride, {
    description:
      "Locally operated 4x4 upgrade and parts specialists for Illawarra drivers.",
    eyebrow: "About Us",
    title: "Local 4x4 specialists for upgrades, parts and staged builds",
  })
  const cover = overrideCover(contentOverride, {
    alt: "Wolfpack 4x4 wrapped RAM and wolf logo hero artwork",
    src: HERO_POSTER,
  })
  const storyParagraphs =
    overrideList(aboutContent?.storyParagraphs, (row) => overrideText(row.text)) ??
    aboutStoryParagraphs
  const teamCards =
    overrideList(aboutContent?.cards, (row, index) => {
      const title = overrideText(row.title)
      const body = overrideText(row.body)
      return title && body ? { body, kicker: aboutTeamCards[index]?.kicker, title } : undefined
    }) ?? aboutTeamCards
  const workshopSteps =
    overrideList(aboutContent?.steps, (row) => {
      const title = overrideText(row.title)
      const body = overrideText(row.body)
      return title && body ? { body, title } : undefined
    }) ?? aboutWorkshopSteps
  const serviceList =
    overrideList(aboutContent?.serviceList, (row) => overrideText(row.item)) ?? oldSiteServiceList

  return (
    <CmsPageShell settings={settings}>
      <CmsBreadcrumbs
        items={[
          { href: "/", name: "Home" },
          { href: "/about-us", name: "About Us" },
        ]}
      />
      <CmsHero
        cover={cover}
        description={hero.description}
        eyebrow={hero.eyebrow}
        settings={settings}
        title={hero.title}
      />

      <section className="seo-section public-story-grid">
        <div className="public-about-story-copy">
          <span className="seo-kicker">Local workshop</span>
          <h2>Stance, clearance and advice built around the vehicle.</h2>
          {storyParagraphs.map((text, index) => (
            <p key={`${text.slice(0, 40)}-${index}`}>{text}</p>
          ))}
          <div className="public-about-actions" aria-label="About page workshop actions">
            <Link className="btn btn-red" href="/contact-us#enquiry">
              <span>Request quote</span>
              <span className="arrow" />
            </Link>
            <Link className="btn btn-chrome" href="/services">
              <span>View workshop services</span>
              <span className="arrow" />
            </Link>
          </div>
          <div className="public-about-stats about-stat-strip" aria-label="Workshop proof points">
            {aboutTrustStats.map((stat) => (
              <span key={stat.label}>
                <strong>{stat.value}</strong>
                <small>{stat.label}</small>
              </span>
            ))}
          </div>
        </div>
        <div className="public-image-card">
          <Image
            src="/media/wolfpack/wolfpack-mascot-service-shirt.png"
            alt="Wolfpack 4x4 mascot wearing a button-up workshop service shirt"
            width={900}
            height={900}
          />
          <div className="public-image-card-caption">
            <span>4x4 focused workshop</span>
            <strong>Wolfpack keeps the quote practical before the bay is booked.</strong>
          </div>
        </div>
      </section>

      <section className="seo-section public-founder-team about-team-band">
        {teamCards.map((card, index) => (
          <article
            key={`${card.title}-${index}`}
            className={`seo-card glass about-team-card${index === 0 ? " about-team-card-featured" : ""}`}
          >
            {index === 0 ? (
              <div className="about-team-portrait">
                <Image
                  src="/media/wolfpack/wolfpack-logo-transparent.png"
                  alt="Wolfpack 4x4 mascot and technical brand artwork"
                  width={720}
                  height={720}
                />
              </div>
            ) : null}
            <div className="about-team-copy">
              <span className="about-team-index" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              {card.kicker ? <span className="seo-kicker">{card.kicker}</span> : null}
              <h2>{card.title}</h2>
              <p>{card.body}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="seo-section public-about-process">
        <div className="public-about-process-head">
          <span className="seo-kicker">How the workshop scopes a job</span>
          <h2>A clearer path from idea to fitted 4x4 upgrade.</h2>
        </div>
        <div className="public-about-process-grid about-process-rail">
          {workshopSteps.map((step, index) => (
            <article key={`${step.title}-${index}`} className="seo-card glass">
              <span className="public-about-step-count" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3>{step.title}</h3>
              <p>{step.body}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="seo-section about-services-board">
        <span className="seo-kicker">Products and services available</span>
        <h2>Everything from single accessories to staged 4x4 builds.</h2>
        <p className="public-about-service-copy">
          Check the common service paths before calling. If the job is not obvious, send vehicle
          details and the workshop can tell you which upgrade, part or staged build path fits best.
        </p>
        <div className="public-service-list" aria-label="Products and services available">
          {serviceList.map((item, index) => (
            <span key={`${item}-${index}`}>{item}</span>
          ))}
        </div>
      </section>

      <PublicFooterContact settings={settings} />
    </CmsPageShell>
  )
}

export function ProductsPublicPage({
  contentOverride,
  settings,
}: {
  contentOverride?: PublicContentOverride
  settings?: PublicSiteSettings | null
}) {
  const productsContent = contentOverride?.content?.products
  const hero = overrideHero(contentOverride, {
    description:
      "High-quality 4x4 parts, suspension, towing, lighting, recovery, performance and intake support organised into clear product paths.",
    eyebrow: "Products",
    title: "4x4 parts and accessories",
  })
  const cover = overrideCover(contentOverride, {
    alt: "Wolfpack 4x4 parts and brand artwork",
    src: siteImages.covers.parts,
  })
  const introHeading =
    overrideText(productsContent?.introHeading) ?? "Choose the part path, then request the quote."
  const introBody =
    overrideText(productsContent?.introBody) ??
    "Start with the product family below, then call or send your vehicle specs so the workshop can confirm fitment, parts availability, bay time and the right install path before you arrive."
  const overrideProductLinks = overrideList(productsContent?.productLinks, (row) => {
    const label = overrideText(row.label)
    const href = overrideText(row.href)
    return label && href ? { description: overrideText(row.description), href, label } : undefined
  })

  return (
    <CmsPageShell settings={settings}>
      <CmsBreadcrumbs
        items={[
          { href: "/", name: "Home" },
          { href: "/products", name: "Products" },
        ]}
      />
      <CmsHero
        cover={cover}
        description={hero.description}
        eyebrow={hero.eyebrow}
        settings={settings}
        title={hero.title}
      />

      <section className="seo-section public-product-intro">
        <div>
        <span className="seo-kicker">4x4 product categories</span>
          <h2>{introHeading}</h2>
          <p>{introBody}</p>
        </div>
        <div className="public-product-actions" aria-label="Product quote actions">
          <Link className="btn btn-red" href="/parts">
            <span>Open parts lookup</span>
            <span className="arrow" />
          </Link>
          <Link className="btn btn-chrome" href="/contact-us#enquiry">
            <span>Send vehicle details</span>
            <span className="arrow" />
          </Link>
        </div>
      </section>

      <section className="seo-section public-product-grid">
        {overrideProductLinks
          ? overrideProductLinks.map((product, index) => (
              <article key={`${product.href}-${index}`} className="seo-card glass public-product-card">
                <span className="seo-kicker">Product category</span>
                <h2>{product.label}</h2>
                {product.description ? <p>{product.description}</p> : null}
                <Link href={product.href}>View product category</Link>
              </article>
            ))
          : productLinks.map((product) => (
              <article key={product.title} className="seo-card glass public-product-card">
                <Image
                  src={product.image}
                  alt={product.imageAlt}
                  title={product.imageTitle}
                  width={1280}
                  height={800}
                  sizes="(max-width: 640px) 92vw, (max-width: 1080px) 44vw, 31vw"
                />
                <span className="seo-kicker">Product category</span>
                <h2>{product.title}</h2>
                <p>{product.description}</p>
                <span className="public-product-proof">{product.proof}</span>
                <Link href={product.href}>{product.cta}</Link>
              </article>
            ))}
      </section>

      <section className="seo-section public-brand-strip">
        {wolfpackProofAssets.map((asset) => (
          <article key={asset.path} className="public-brand-asset">
            <Image src={asset.path} alt={asset.title} width={640} height={360} />
            <div>
              <span>{asset.label}</span>
              <strong>{asset.title}</strong>
            </div>
          </article>
        ))}
      </section>

      <WolfpackStoreClient
        products={wolfpackAccessoryProducts}
        heroes={wolfpackAccessoryHeroes}
        variant="accessories"
      />

      <PublicFooterContact settings={settings} />
    </CmsPageShell>
  )
}

export function GalleryPublicPage({
  contentOverride,
  settings,
}: {
  contentOverride?: PublicContentOverride
  settings?: PublicSiteSettings | null
}) {
  const hero = overrideHero(contentOverride, {
    description:
      "Use these workshop, product and vehicle references to brief the stance, clearance, lighting, protection and touring outcome you want before the quote starts.",
    eyebrow: "Gallery",
    title: "Pick the build direction. Quote the right 4x4 upgrade.",
  })
  const cover = overrideCover(contentOverride, {
    alt: "Ford Ranger Raptor side view with Wolfpack black blue purple wrap",
    src: "/media/wolfpack/vehicles/views/ford-ranger-raptor-side.png",
  })
  return (
    <CmsPageShell settings={settings}>
      <CmsBreadcrumbs
        items={[
          { href: "/", name: "Home" },
          { href: "/gallery", name: "Gallery" },
        ]}
      />
      <CmsHero
        cover={cover}
        description={hero.description}
        eyebrow={hero.eyebrow}
        settings={settings}
        title={hero.title}
      />

      <section className="seo-section public-gallery-grid public-gallery-vehicle-grid">
        {vehicleGalleryVehicles.map((vehicle) => (
          <article key={vehicle.slug} className="public-gallery-vehicle">
            <div className="public-gallery-vehicle-heading">
              <span className="seo-kicker">{vehicle.label}</span>
              <h2>{vehicle.title}</h2>
              <p>{vehicle.detail}</p>
            </div>
            <div className="public-gallery-vehicle-views" aria-label={`${vehicle.label} view set`}>
              {vehicle.views.map((view) => (
                <figure key={view.key} className="public-gallery-item public-gallery-angle">
                  <Image src={view.src} alt={view.alt} width={1200} height={900} />
                  <figcaption>
                    <span>{view.label}</span>
                    <strong>{vehicle.label}</strong>
                  </figcaption>
                </figure>
              ))}
            </div>
          </article>
        ))}
      </section>

      <PublicFooterContact settings={settings} />
    </CmsPageShell>
  )
}

export function ContactUsPublicPage({
  contentOverride,
  settings,
}: {
  contentOverride?: PublicContentOverride
  settings?: PublicSiteSettings | null
}) {
  const hero = overrideHero(contentOverride, {
    description:
      "Call the workshop or send your vehicle specs through the enquiry form. The team will call back during business hours.",
    eyebrow: "Contact Us",
    title: "Talk to the workshop",
  })
  const cover = overrideCover(contentOverride, {
    alt: "Wolfpack 4x4 workshop contact and brand hero",
    src: HERO_POSTER,
  })
  const contact = publicContactFromSettings(settings)
  const mapSrc = googleSatelliteMapSrc(contact.address)
  const hoursSummary = "Mon-Fri workshop hours, Saturday by appointment"
  const contactPoints = [
    {
      href: contact.phoneHref,
      icon: PhoneCall,
      label: "Phone",
      value: contact.phone,
    },
    {
      href: contact.mapHref,
      icon: MapPin,
      label: "Workshop",
      value: contact.address,
    },
    {
      icon: Clock3,
      label: "Hours",
      value: hoursSummary,
    },
    {
      href: contact.emailHref,
      icon: Mail,
      label: "Email",
      value: contact.email,
    },
  ]

  return (
    <CmsPageShell settings={settings}>
      <CmsBreadcrumbs
        items={[
          { href: "/", name: "Home" },
          { href: "/contact-us", name: "Contact Us" },
        ]}
      />
      <CmsHero
        cover={cover}
        description={hero.description}
        eyebrow={hero.eyebrow}
        settings={settings}
        title={hero.title}
      />

      <section className="seo-section public-contact-primitive-shell" aria-labelledby="contact-workshop-heading">
        <header className="public-contact-section-head">
          <span className="seo-kicker">Get in touch</span>
          <h2 id="contact-workshop-heading">Contact the Albion Park Rail bay</h2>
          <p>
            Call the workshop, send your vehicle specs, or check the workshop location before heading to Unit 2/8
            Shaban Street.
          </p>
        </header>

        <ul className="public-contact-points" aria-label="Workshop contact options">
          {contactPoints.map((point) => {
            const Icon = point.icon
            return (
              <li key={point.label} className="public-contact-point">
                <Icon aria-hidden="true" />
                <span>{point.label}</span>
                {point.href ? <a href={point.href}>{point.value}</a> : <strong>{point.value}</strong>}
              </li>
            )
          })}
        </ul>

        <div className="public-contact-layout">
          <aside className="public-contact-details glass">
            <span className="seo-kicker">Contact info</span>
            <h2>{contact.displayName}</h2>
            <dl>
              <div>
                <dt>Address</dt>
                <dd>
                  <a href={contact.mapHref}>{contact.address}</a>
                </dd>
              </div>
              <div>
                <dt>Phone</dt>
                <dd>
                  <a href={contact.phoneHref}>{contact.phone}</a>
                </dd>
              </div>
              <div>
                <dt>Email</dt>
                <dd>
                  <a href={contact.emailHref}>{contact.email}</a>
                </dd>
              </div>
            </dl>
            <div className="public-hours">
              <span className="seo-kicker">Hours</span>
              {business.hours.map(([day, hours]) => (
                <div key={day}>
                  <span>{day}</span>
                  <strong>{hours}</strong>
                </div>
              ))}
            </div>
          </aside>
          <ContactEnquiryForm />
        </div>

        <div className="public-contact-map glass" aria-labelledby="contact-map-heading">
          <div className="public-contact-map-copy">
            <span className="seo-kicker">Workshop location</span>
            <h2 id="contact-map-heading">Find the workshop</h2>
            <p>{contact.address}</p>
            <a className="btn btn-chrome" href={contact.mapHref}>
              <span>Open Google Maps</span>
              <span className="arrow" />
            </a>
          </div>
          <iframe
            title="Google satellite map for Wolfpack 4x4"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </CmsPageShell>
  )
}

export function QuoteRequestPublicPage({ settings }: { settings?: PublicSiteSettings | null }) {
  const contact = publicContactFromSettings(settings)
  const mapSrc = googleSatelliteMapSrc(contact.address)
  const quoteChecklist = [
    "Vehicle make, model, year and engine",
    "Current accessories, suspension, tyre size and intended use",
    "Photos of the bull bar, suspension, tray, canopy, wiring or fitment area",
    "The towing, touring, work or recovery result you want",
  ]
  const proofPoints = [
    { label: "Local workshop", value: "Oak Flats / Albion Park Rail" },
    { label: "Best first step", value: "Call before booking the bay" },
    { label: "Quoted work", value: "Suspension, protection, recovery, lighting and parts" },
  ]

  return (
    <CmsPageShell settings={settings}>
      <CmsHero
        className="quote-hero"
        cover={{
          alt: "Wolfpack 4x4 upgrade planning and fitment hero",
          src: HERO_POSTER,
        }}
        description="The fastest quote starts with the vehicle, current setup and the result you want. Wolfpack 4x4 can then steer you toward the right upgrade, accessory, parts or staged build path."
        eyebrow="Quote request · 4x4-ready details"
        settings={settings}
        title="Send the vehicle details. Get the right 4x4 upgrade path."
      />

      <section className="seo-section quote-request-section" aria-labelledby="quote-request-title">
        <header className="public-contact-section-head">
          <span className="seo-kicker">Workshop enquiry</span>
          <h2 id="quote-request-title">Request a 4x4 quote</h2>
          <p>
            Include make, model, year, engine, current accessories and the
            towing, touring, work or recovery result you want quoted.
          </p>
        </header>

        <div className="public-contact-layout">
          <ContactEnquiryForm />
          <aside className="quote-capture-support">
            <div className="quote-capture-contact">
              <a className="btn btn-red" href={contact.phoneHref}>
                <span>Call the workshop</span>
                <span className="arrow" />
              </a>
              <a className="btn btn-ghost" href={contact.emailHref}>
                <span>Email vehicle details</span>
                <span className="arrow" />
              </a>
            </div>

            <div className="quote-capture-mini" aria-label="Workshop contact details">
              <span>{contact.phone}</span>
              <span>Mon-Fri 8:00am-5:00pm</span>
              <a href={contact.mapHref}>Map and directions</a>
            </div>

            <div className="quote-capture-proof" aria-label="Quote proof points">
              {proofPoints.map((item) => (
                <div key={item.label}>
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>

            <div className="quote-capture-card glass">
              <div className="quote-capture-icon" aria-hidden="true">
                <ClipboardList />
              </div>
              <div>
                <h3>What to send</h3>
                <ul className="quote-capture-list">
                  {quoteChecklist.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>

        <div className="public-contact-map glass" aria-labelledby="quote-map-heading">
          <div className="public-contact-map-copy">
            <span className="seo-kicker">Workshop location</span>
            <h2 id="quote-map-heading">Map and directions</h2>
            <p>{contact.address}</p>
            <a className="btn btn-chrome" href={contact.mapHref}>
              <span>Open Google Maps</span>
              <span className="arrow" />
            </a>
          </div>
          <iframe
            title="Google satellite map for Wolfpack 4x4"
            src={mapSrc}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        </div>
      </section>
    </CmsPageShell>
  )
}
