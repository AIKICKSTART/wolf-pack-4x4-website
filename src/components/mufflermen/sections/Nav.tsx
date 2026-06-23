"use client"

import Link from "next/link"
import { Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import * as React from "react"

import { PublicThemeToggle } from "@/components/mufflermen/public-theme-toggle"
import { contactFromCms } from "../shared/contact"
import { LOGO, LOGO_DIMENSIONS } from "../shared/media"
import type { HomepageCmsSettings } from "../shared/types"

// ── Nav ────────────────────────────────────────────────────────
export function Nav({ settings }: { settings: HomepageCmsSettings | null }) {
  const contact = contactFromCms(settings)
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)
  const mobileMenuId = React.useId()
  const links = [
    { href: "/", label: "Home" },
    { href: "/about-us", label: "About Us" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/gallery", label: "Gallery" },
    { href: "/blog", label: "Blog" },
    { href: "/contact-us", label: "Contact Us" },
  ]

  return (
    <header className="nav">
      <div className="wrap nav-inner">
        <Link href="/" className="nav-logo" aria-label={`${contact.displayName} home`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={LOGO}
            alt={contact.displayName}
            width={LOGO_DIMENSIONS.width}
            height={LOGO_DIMENSIONS.height}
          />
        </Link>
        <nav className="nav-links" aria-label="Primary navigation">
          {links.map((link) => {
            const isActive = pathname === link.href
            return (
              <Link key={link.href} className={`nav-link ${isActive ? "active" : ""}`} href={link.href}>
                {link.label}
              </Link>
            )
          })}
        </nav>
        <div className="nav-spacer" />
        <div className="nav-meta">
          <div>
            <span className="label">Albion Park Rail NSW</span>
            <span className="nav-phone">{contact.phone}</span>
          </div>
          <PublicThemeToggle compact />
          <a className="btn btn-red" href={contact.phoneHref}>
            <span>4x4 quote</span>
            <span className="arrow" />
          </a>
        </div>
        <div className="nav-mobile-toggle">
          <PublicThemeToggle compact />
        </div>
        <button
          type="button"
          className="nav-menu-toggle"
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          aria-controls={mobileMenuId}
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen((current) => !current)}
        >
          {isMenuOpen ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
        <div
          id={mobileMenuId}
          className={`nav-mobile-panel ${isMenuOpen ? "is-open" : ""}`}
          aria-hidden={!isMenuOpen}
          inert={!isMenuOpen}
        >
          <nav className="nav-mobile-links" aria-label="Mobile navigation">
            {links.map((link) => {
              const isActive = pathname === link.href
              return (
                <Link
                  key={link.href}
                  className={`nav-mobile-link ${isActive ? "active" : ""}`}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="nav-mobile-actions">
            <PublicThemeToggle compact />
            <a className="nav-mobile-phone" href={contact.phoneHref}>
              {contact.phone}
            </a>
            <a className="btn btn-red" href={contact.phoneHref} onClick={() => setIsMenuOpen(false)}>
              <span>4x4 quote</span>
              <span className="arrow" />
            </a>
          </div>
        </div>
      </div>
      <div className="chrome-stripe" />
    </header>
  )
}
