import type { Metadata } from "next"

import { PublicNav } from "@/components/mufflermen/public-nav"
import { contentOverrideMetadata, getPublishedContentOverrideByPath } from "@/lib/cms/content"
import { getPublicSiteSettings } from "@/lib/cms/public-settings"
import { PublicConversionDock, PublicSiteFooter } from "@/lib/cms/public-ui"
import { JsonLd } from "@/components/mufflermen/json-ld"
import { breadcrumbJsonLd, pageAlternates, webPageJsonLd } from "@/lib/seo"
import { business } from "@/lib/site-data"

export const revalidate = 3600

const fallbackMetadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms for Wolfpack 4x4: quotes and pricing, bookings and cancellations, parts and labour warranty, payment and Australian Consumer Law rights.",
  alternates: pageAlternates("/terms"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/terms")
  return contentOverrideMetadata(override, fallbackMetadata, "/terms")
}

export default async function TermsPage() {
  const siteSettings = await getPublicSiteSettings()

  return (
    <>
    <JsonLd data={webPageJsonLd("/terms", "Terms of Service")} />
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Terms of Service", href: "/terms" }])} />
      <PublicNav displayName={business.name} />
      <main className="seo-page seo-legal-page">
        <section className="seo-hero">
          <div className="seo-kicker">Terms of Service</div>
          <h1 className="seo-heading">
            <span className="seo-heading-accent">Terms of Service</span>
          </h1>
          <p className="seo-legal-copy">
            These terms apply to work, parts and quotes provided by Wolfpack 4x4
            at {business.address}. Website information is general only; the workshop will
            confirm recommendations, fitment, availability and pricing for your specific
            vehicle before any parts are ordered or work is booked.
          </p>

          <h2 className="seo-legal-subheading">Quotes &amp; pricing</h2>
          <p className="seo-legal-copy">
            Quotes are based on the vehicle information you provide and an inspection where
            required. Prices may change if the inspection reveals additional work, the
            condition differs from what was described, or part prices change. We will talk
            through any change before proceeding.
          </p>

          <h2 className="seo-legal-subheading">Bookings &amp; cancellations</h2>
          <p className="seo-legal-copy">
            Some jobs can be done while you wait; larger upgrades and fitment work
            may need a booking and lead time for parts or fabrication. If you need to
            change or cancel a booking, please give us as much notice as possible by
            phoning {business.phone} so we can re-allocate the bay.
          </p>

          <h2 className="seo-legal-subheading">Warranty on parts &amp; labour</h2>
          <p className="seo-legal-copy">
            Workmanship is warranted against faulty installation. Parts carry the
            manufacturer&rsquo;s warranty where one applies. Warranty does not cover damage
            from accident, misuse, modification by others, racing or off-road use, or fair
            wear and tear. Keep your invoice as proof of the work performed.
          </p>

          <h2 className="seo-legal-subheading">Your Australian Consumer Law rights</h2>
          <p className="seo-legal-copy">
            Our goods and services come with guarantees that cannot be excluded under the
            Australian Consumer Law. For major failures you are entitled to a replacement
            or refund and compensation for other reasonably foreseeable loss; for failures
            that are not major, you are entitled to have the problem fixed within a
            reasonable time. Nothing in these terms limits those rights.
          </p>

          <h2 className="seo-legal-subheading">Payment</h2>
          <p className="seo-legal-copy">
            Payment is due on completion unless agreed otherwise. Supplied parts and
            completed work remain our property until paid in full.
          </p>

          <p className="seo-legal-copy">
            Questions about these terms? Call {business.phone} or email{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>. Last updated: June
            2026.
          </p>
        </section>
      </main>
      <PublicSiteFooter settings={siteSettings} />
      <PublicConversionDock settings={siteSettings} />
    </>
  )
}
