import type { Metadata } from "next"

import { FooterReceiptStyle } from "@/app/ui-primitives/components/chrome"
import { PageHeader } from "@/app/ui-primitives/components/page-header"
import { siteImages } from "@/lib/site-assets"

import styles from "../../chrome.module.css"

export const metadata: Metadata = {
  title: "Footer · Receipt style | UI Primitives — Chrome",
}

export default function FooterReceiptStyleRoute() {
  return (
    <main className={styles.subRoute}>
      <PageHeader
        kicker="Footer 09 / Chrome"
        title="Receipt style"
        description="Thermal-roll receipt with mono details, ABN, acknowledgement of country and a printed-look barcode."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Chrome", href: "/ui-primitives/chrome" },
          { label: "Receipt style" },
        ]}
      />

      <FooterReceiptStyle
        brand={{
          logoSrc: siteImages.logoNav,
          logoAlt: "Mufflermen logo",
          wordmark: "Mufflermen",
          caption: "Oak Flats · Est. 1968",
        }}
        details={[
          { id: "workshop", label: "Workshop", value: "47 Central Ave, Oak Flats NSW 2529" },
          { id: "phone", label: "Phone", value: "(02) 4256 7000", href: "tel:+61242567000" },
          { id: "email", label: "Email", value: "fitters@mufflermen.example", href: "mailto:fitters@mufflermen.example" },
          { id: "hours", label: "Hours", value: "Mon-Fri 7:30am-5:30pm · Sat by appt" },
        ]}
        abn="11 222 333 444"
        acknowledgement="Mufflermen acknowledges the Dharawal people, traditional custodians of the land where our Oak Flats workshop stands, and pays respect to Elders past and present."
        legalLinks={[
          { id: "privacy", label: "Privacy", href: "#privacy" },
          { id: "cookies", label: "Cookies", href: "#cookies" },
          { id: "terms", label: "Terms", href: "#terms" },
        ]}
        receiptNumber="OFM-1968-2415"
      />
    </main>
  )
}
