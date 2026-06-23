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
  title: "Privacy Policy",
  description:
    "How Wolfpack 4x4 collects, uses, stores and protects personal information from website enquiries and quote requests, under the Privacy Act 1988 (Cth).",
  alternates: pageAlternates("/privacy"),
}

export async function generateMetadata(): Promise<Metadata> {
  const override = await getPublishedContentOverrideByPath("/privacy")
  return contentOverrideMetadata(override, fallbackMetadata, "/privacy")
}

export default async function PrivacyPage() {
  const siteSettings = await getPublicSiteSettings()

  return (
    <>
    <JsonLd data={webPageJsonLd("/privacy", "Privacy Policy")} />
    <JsonLd data={breadcrumbJsonLd([{ name: "Home", href: "/" }, { name: "Privacy Policy", href: "/privacy" }])} />
      <PublicNav displayName={business.name} />
      <main className="seo-page seo-legal-page">
        <section className="seo-hero">
          <div className="seo-kicker">Privacy Policy</div>
          <h1 className="seo-heading">
            <span className="seo-heading-accent">Privacy Policy</span>
          </h1>
          <p className="seo-legal-copy">
            Wolfpack 4x4 (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) is committed to protecting
            your privacy. This policy explains how we handle personal information in
            accordance with the Privacy Act 1988 (Cth) and the Australian Privacy
            Principles (APPs). It applies to enquiries made through this website and to
            our workshop at {business.address}.
          </p>

          <h2 className="seo-legal-subheading">Information we collect</h2>
          <p className="seo-legal-copy">
            We collect the information you choose to provide through our contact and
            quote forms, by phone, or by email. This typically includes your name, phone
            number, email address, and the vehicle and accessory details you send so we can
            quote and complete work &mdash; for example make, model, year, engine, the
            current setup and the touring, towing or off-road result you want. Please do not send
            sensitive information (such as government identifiers or payment card numbers)
            through the website.
          </p>

          <h2 className="seo-legal-subheading">How we use it</h2>
          <p className="seo-legal-copy">
            We use your information to respond to enquiries, prepare quotes, book and carry
            out 4x4 upgrade work, supply parts, and keep records of the services we
            provide. We do not sell your personal information. We use it only for the
            purpose you provided it, or a directly related purpose you would reasonably
            expect.
          </p>

          <h2 className="seo-legal-subheading">Disclosure</h2>
          <p className="seo-legal-copy">
            We may disclose limited information to trusted suppliers and contractors where
            it is necessary to source parts or complete your job, and where required by
            law. Our website uses an embedded Google map on the contact page; Google may
            receive standard technical information when that map loads. We do not otherwise
            disclose your details to third parties for marketing.
          </p>

          <h2 className="seo-legal-subheading">Storage &amp; security</h2>
          <p className="seo-legal-copy">
            We take reasonable steps to protect personal information from misuse, loss, and
            unauthorised access, and to destroy or de-identify it when it is no longer
            needed for the purpose it was collected.
          </p>

          <h2 className="seo-legal-subheading">Access, correction &amp; complaints</h2>
          <p className="seo-legal-copy">
            You can ask us to access or correct the personal information we hold about you,
            or raise a privacy concern, by phoning {business.phone} or emailing{" "}
            <a href={`mailto:${business.email}`}>{business.email}</a>. We will respond
            within a reasonable time. If you are not satisfied with our response, you may
            contact the Office of the Australian Information Commissioner (OAIC) at
            oaic.gov.au.
          </p>

          <p className="seo-legal-copy">Last updated: June 2026.</p>
        </section>
      </main>
      <PublicSiteFooter settings={siteSettings} />
      <PublicConversionDock settings={siteSettings} />
    </>
  )
}
