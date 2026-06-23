import Link from "next/link"

import { contactFromCms } from "../shared/contact"
import { LOGO, LOGO_DIMENSIONS } from "../shared/media"
import { business } from "@/lib/site-data"
import type { HomepageCmsSettings } from "../shared/types"

// ── Footer (minimal) ───────────────────────────────────────────
// Small footer: brand + a few key links + contact. The closing CTA lives in
// the RolloutCinema section directly above, so the footer stays light.
export function Footer({ settings }: { settings: HomepageCmsSettings | null }) {
  const contact = contactFromCms(settings)

  return (
    <footer className="footer footer-min">
      <div className="wrap">
        <div className="footer-min-row">
          <Link href="/" className="footer-min-brand" aria-label={contact.displayName}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={LOGO}
              alt={contact.displayName}
              width={LOGO_DIMENSIONS.width}
              height={LOGO_DIMENSIONS.height}
              loading="lazy"
            />
          </Link>
          <nav className="footer-min-links" aria-label="Footer navigation">
            <Link href="/services">Services</Link>
            <Link href="/products">Products</Link>
            <Link href="/gallery">Gallery</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQs</Link>
            <Link href="/quote">Quote</Link>
            <Link href="/contact-us">Contact</Link>
          </nav>
        </div>

        <div className="footer-bottom">
          <small>
            © 2026 {contact.displayName} · Oak Flats &amp; Albion Park Rail NSW · Built by{" "}
            <a href="https://www.aikickstart.com.au" target="_blank" rel="noopener">
              AiKickstart
            </a>
          </small>
          <div className="links">
            <a href={business.sameAs[0]} target="_blank" rel="noopener noreferrer">
              Facebook
            </a>
            <a href={contact.mapHref}>Map</a>
            <Link href="/terms">Terms</Link>
            <Link href="/privacy">Privacy</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
