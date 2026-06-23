"use client"

import Link from "next/link"
import { Mail, MapPin, PhoneCall, Search } from "lucide-react"

import { contactFromCms } from "../shared/contact"
import type { HomepageCmsSettings } from "../shared/types"

// Always-available close: fixed dock that fades in after the hero and follows
// the scroll. Reuses the .public-conversion-dock styling from the SEO pages so
// Call / Quote / Parts / Map stay one tap away. Visibility toggled in the
// MufflermenSite scroll effect (adds .is-visible past the hero).
export function ConversionDock({ settings }: { settings: HomepageCmsSettings | null }) {
  const contact = contactFromCms(settings)

  return (
    <nav
      className="public-conversion-dock home-conversion-dock"
      aria-label="Fast workshop actions"
    >
      <a href={contact.phoneHref} data-tone="primary" aria-label={`Call ${contact.phone}`}>
        <PhoneCall aria-hidden="true" />
        <span>Call</span>
      </a>
      <Link href="/quote" data-tone="carbon" aria-label="Request a 4x4 upgrade quote">
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
