import type { DefaultTypedEditorState } from "@payloadcms/richtext-lexical"
import { RichText } from "@payloadcms/richtext-lexical/react"
import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { Mail, MapPin, PhoneCall, Search } from "lucide-react"

import { PublicNav } from "@/components/mufflermen/public-nav"
import {
  publicContactFromSettings,
  type PublicSiteSettings,
} from "@/lib/cms/public-settings"
import { siteImages } from "@/lib/site-assets"

// Premium heading treatment (silver text + one red accent word), same
// rules as seo-pages SEOHeading; replicated here because seo-pages
// imports from this module (importing back would be circular).
const heroAccentSkipWords = new Set(["and", "for", "from", "in", "near", "of", "page", "the", "to", "with"])

function heroHeadingParts(text: string) {
  const words = text.trim().split(/\s+/)
  const accent =
    words.length < 2
      ? ""
      : ([...words]
          .reverse()
          .find((word) => {
            const normalized = word.replace(/[^a-z0-9]/gi, "").toLowerCase()
            return normalized.length > 2 && !heroAccentSkipWords.has(normalized)
          }) ?? "")
  if (!accent) return <span className="seo-heading-text">{text}</span>
  const index = text.toLowerCase().lastIndexOf(accent.toLowerCase())
  if (index < 0) return <span className="seo-heading-text">{text}</span>
  const before = text.slice(0, index)
  const matched = text.slice(index, index + accent.length)
  const after = text.slice(index + accent.length)
  return (
    <>
      {before && <span className="seo-heading-text">{before}</span>}
      <span className="seo-heading-accent">{matched}</span>
      {after && <span className="seo-heading-text">{after}</span>}
    </>
  )
}

export function CmsPageShell({
  children,
  settings,
}: {
  children: ReactNode
  settings?: PublicSiteSettings | null
}) {
  const contact = publicContactFromSettings(settings)

  return (
    <>
      <PublicNav displayName={contact.displayName} />
      <main className="seo-page">{children}</main>
      <PublicSiteFooter settings={settings} />
      <PublicConversionDock settings={settings} />
    </>
  )
}

export function CmsBreadcrumbs({ items }: { items: Array<{ href: string; name: string }> }) {
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

export function CmsHero({
  className,
  cover = {
    alt: "Wolfpack 4x4 service and brand cover image",
    src: siteImages.covers.serviceDetail,
  },
  coverVideo,
  description,
  eyebrow,
  settings,
  title,
}: {
  className?: string
  cover?: { alt: string; src: string }
  coverVideo?: { src: string; poster?: string }
  description: string
  eyebrow: string
  settings?: PublicSiteSettings | null
  title: string
}) {
  const contact = publicContactFromSettings(settings)
  const heroClassName = ["seo-hero has-cover", className].filter(Boolean).join(" ")

  return (
    <section className={heroClassName}>
      <div className="seo-hero-media">
        {coverVideo ? (
          <video
            className="seo-hero-cover seo-hero-cover-video"
            poster={coverVideo.poster ?? cover.src}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label={cover.alt}
          >
            <source src={coverVideo.src} type="video/mp4" />
          </video>
        ) : (
          <Image
            className="seo-hero-cover"
            src={cover.src}
            alt={cover.alt}
            width={1600}
            height={900}
            priority
            fetchPriority="high"
          />
        )}
      </div>
      <div className="seo-hero-copy">
        <div className="seo-kicker">{eyebrow}</div>
        <h1 className="seo-heading">{heroHeadingParts(title)}</h1>
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

export function CmsContactBand({
  description = "Send the vehicle make, model, year, current accessories and the result you want so the workshop can scope the right 4x4 upgrade path.",
  settings,
  title = "Book the right 4x4 upgrade without guessing.",
}: {
  description?: string
  settings?: PublicSiteSettings | null
  title?: string
}) {
  const contact = publicContactFromSettings(settings)

  return (
    <section className="seo-band">
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
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

export function PublicConversionDock({ settings }: { settings?: PublicSiteSettings | null }) {
  const contact = publicContactFromSettings(settings)

  return (
    <nav className="public-conversion-dock" aria-label="Fast workshop actions">
      <a href={contact.phoneHref} data-tone="primary" aria-label={`Call ${contact.phone}`}>
        <PhoneCall aria-hidden="true" />
        <span>Call</span>
      </a>
      <Link href="/contact-us#enquiry" data-tone="carbon" aria-label="Send vehicle details for a 4x4 quote">
        <Mail aria-hidden="true" />
        <span>Quote</span>
      </Link>
      <Link href="/parts" data-tone="chrome" aria-label="Find 4x4 parts and accessories">
        <Search aria-hidden="true" />
        <span>Parts</span>
      </Link>
      <a href={contact.mapHref} data-tone="ghost" aria-label="Open workshop location in Google Maps">
        <MapPin aria-hidden="true" />
        <span>Map</span>
      </a>
    </nav>
  )
}

export function PublicSiteFooter({ settings }: { settings?: PublicSiteSettings | null }) {
  const contact = publicContactFromSettings(settings)

  return (
    <footer className="public-site-footer">
      <div className="public-site-footer-inner">
        <div className="public-site-footer-brand">
          <Image
            src={siteImages.logoNav}
            alt={contact.displayName}
            width={300}
            height={185}
          />
          <p>
            Suspension, protection, recovery, lighting, touring parts and fitment advice
            from the Albion Park Rail workshop near Oak Flats.
          </p>
        </div>
        <nav aria-label="Footer services">
          <span>Services</span>
          <Link href="/services/suspension-lift-kits">Suspension</Link>
          <Link href="/services/bull-bars-protection">Bull bars</Link>
          <Link href="/services/winches-recovery-gear">Winches and recovery</Link>
          <Link href="/parts">Find 4x4 parts</Link>
        </nav>
        <nav aria-label="Footer company">
          <span>Workshop</span>
          <Link href="/about-us">About Us</Link>
          <Link href="/products">Products</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/faq">FAQs</Link>
          <Link href="/contact-us">Contact Us</Link>
          {(settings?.footerLinks ?? []).map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>
        <address>
          <span>Contact</span>
          <a href={contact.mapHref}>{contact.address}</a>
          <a href={contact.phoneHref}>{contact.phone}</a>
          <a href={contact.emailHref}>{contact.email}</a>
        </address>
      </div>
      <div className="public-site-footer-legal">
        <small>
          © 2026 {contact.displayName} · Oak Flats &amp; Albion Park Rail NSW · Built by{" "}
          <a href="https://www.aikickstart.com.au" target="_blank" rel="noopener">
            AiKickstart
          </a>
        </small>
        <div className="public-site-footer-legal-links">
          <a
            href="https://www.facebook.com/p/Wolfpack-4x4-61550788820371/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </div>
    </footer>
  )
}

function hasRichTextContent(data: DefaultTypedEditorState | null | undefined): data is DefaultTypedEditorState {
  return Array.isArray(data?.root?.children) && data.root.children.length > 0
}

export function CmsRichText({
  data,
  fallback,
}: {
  data?: DefaultTypedEditorState | null
  fallback?: string | null
}) {
  if (hasRichTextContent(data)) {
    return <RichText className="seo-section" data={data} />
  }

  if (fallback) {
    return (
      <section className="seo-section">
        <p>{fallback}</p>
      </section>
    )
  }

  return (
    <section className="seo-section">
      <p className="seo-empty">More workshop details are coming soon. Call the team for current 4x4 advice.</p>
    </section>
  )
}
