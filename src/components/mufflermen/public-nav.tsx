"use client"

import Image from "next/image"
import Link from "next/link"
import { Home, Menu, X } from "lucide-react"
import { usePathname } from "next/navigation"
import * as React from "react"

import { PublicThemeToggle } from "@/components/mufflermen/public-theme-toggle"
import { siteImages } from "@/lib/site-assets"

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact Us" },
]

// Shared header for every public/SEO page (services, products, parts, locations,
// about, contact, gallery, quote). Desktop shows inline links; mobile collapses
// to a hamburger panel with the theme toggle pinned top-right next to the logo.
export function PublicNav({ displayName }: { displayName: string }) {
  const pathname = usePathname()
  const [open, setOpen] = React.useState(false)
  const menuId = React.useId()

  return (
    <header className="seo-nav">
      <Link className="seo-brand" href="/" aria-label={`${displayName} home`}>
        <Image
          className="seo-brand-logo"
          src={siteImages.logoNav}
          alt={displayName}
          width={200}
          height={124}
          sizes="(max-width: 860px) 66px, 100px"
          priority
        />
      </Link>

      <nav aria-label="Primary">
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={pathname === link.href ? "is-active" : undefined}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <Link href="/" className="seo-nav-home" aria-label="Home">
        <Home aria-hidden="true" />
      </Link>

      <PublicThemeToggle compact />

      <button
        type="button"
        className="seo-nav-toggle"
        aria-label={open ? "Close navigation menu" : "Open navigation menu"}
        aria-controls={menuId}
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
      </button>

      <div
        id={menuId}
        className={`seo-nav-panel ${open ? "is-open" : ""}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!open}
        inert={!open}
      >
        {LINKS.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`seo-nav-panel-link ${pathname === link.href ? "is-active" : ""}`}
            onClick={() => setOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>
    </header>
  )
}
