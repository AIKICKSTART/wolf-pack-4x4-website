import type { Metadata } from "next"

import { FooterMegamapGrand } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Footer · Megamap grand | UI Primitives — Chrome",
}

export default function FooterMegamapGrandRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Footer 06 / Chrome"
        title="Megamap grand"
        description="Five-column sitemap with brand lockup, newsletter capture, social row, contact details, and legal fineprint."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Megamap grand" },
        ]}
      />

      <FooterMegamapGrand
        brand={{
          logoSrc: siteImages.logoNav,
          logoAlt: "Mufflermen logo",
          wordmark: "Mufflermen",
        }}
        tagline="Oak Flats · Est. 1968 · Stainless catbacks shipped Illawarra wide"
        columns={[
          {
            id: "workshop",
            heading: "Workshop",
            links: [
              { id: "catback", label: "Catback installs", href: "#catback" },
              { id: "dyno", label: "Dyno cell", href: "#dyno" },
              { id: "mobile", label: "Mobile bay", href: "#mobile" },
            ],
          },
          {
            id: "services",
            heading: "Services",
            links: [
              { id: "welding", label: "MIG / TIG welding", href: "#welding" },
              { id: "adr", label: "ADR compliance", href: "#adr" },
              { id: "flow", label: "Flow assessment", href: "#flow" },
            ],
          },
          {
            id: "about",
            heading: "Mufflermen",
            links: [
              { id: "story", label: "Workshop story", href: "#story" },
              { id: "crew", label: "Crew", href: "#crew" },
              { id: "press", label: "Press kit", href: "#press" },
            ],
          },
          {
            id: "support",
            heading: "Support",
            links: [
              { id: "book", label: "Book a bay", href: "#book" },
              { id: "quote", label: "Get a quote", href: "#quote" },
              { id: "contact", label: "Contact desk", href: "#contact" },
            ],
          },
          {
            id: "legal",
            heading: "Legal",
            links: [
              { id: "privacy", label: "Privacy", href: "#privacy" },
              { id: "terms", label: "Terms", href: "#terms" },
              { id: "warranty", label: "Warranty", href: "#warranty" },
            ],
          },
        ]}
        newsletter={{
          heading: "Workshop bulletin",
          description: "Monthly notes on dyno builds, ADR updates, and Manta stock drops. No spam.",
          inputPlaceholder: "your@workshop.au",
          submitLabel: "Subscribe",
        }}
        socials={[
          { id: "about", label: "Mufflermen on Instagram", href: "#instagram" },
          { id: "exhaust", label: "Mufflermen on YouTube", href: "#youtube" },
          { id: "shield", label: "Mufflermen trade portal", href: "#trade" },
          { id: "phone", label: "Email Mufflermen", href: "mailto:fitters@mufflermen.example" },
        ]}
        contact={[
          { label: "Workshop", value: "47 Central Ave, Oak Flats NSW 2529" },
          { label: "Front desk", value: "(02) 4256 7000", href: "tel:+61242567000" },
          { label: "Hours", value: "Mon-Fri 7:30am-5:30pm" },
        ]}
        legal="© 1968-2026 Mufflermen Pty Ltd · ABN 11 222 333 444"
        legalLinks={[
          { id: "privacy", label: "Privacy", href: "#privacy" },
          { id: "terms", label: "Terms", href: "#terms" },
          { id: "cookies", label: "Cookies", href: "#cookies" },
        ]}
      />
    </main>
  )
}
