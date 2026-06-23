/**
 * Navigation (chrome) family doc entries — part A (headers + footers).
 * Split from `navigation.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./navigation.shared"
import {
  BRAND_SNIPPET,
  CHROME_PATH,
  FOOTER_RESPONSIVE,
  HEADER_RESPONSIVE,
  NAV_CTA_TOKENS,
  NAV_GLASS_TOKENS,
  NAV_LANDMARK_A11Y,
  NAV_SURFACE_TOKENS,
  NAV_TEXTURE_TOKENS,
} from "./navigation.shared"

const headerCinematicBar: ComponentDocEntry = {
  key: "navigation/header-cinematic-bar",
  importName: "HeaderCinematicBar",
  name: "Header — cinematic bar",
  summary: "Hero top bar with brand, nav, and a metallic primary CTA over a cinematic surface.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/headers/cinematic-bar",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "nav", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "primaryCta", type: "object", required: true, description: "{ label, href }." },
      { key: "secondaryCta", type: "object", required: false, description: "{ label, href }." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_CTA_TOKENS, ...NAV_TEXTURE_TOKENS],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "media", aspectRatio: "16/5", thumbnailBreakpoint: "lg" },
  codeExample: {
    language: "tsx",
    caption: "A cinematic site header.",
    code: `import { HeaderCinematicBar } from "@/app/ui-primitives/components/chrome"
import { siteImages } from "@/lib/site-images"

${BRAND_SNIPPET}

export function SiteHeader() {
  return (
    <HeaderCinematicBar
      brand={brand}
      nav={[
        { id: "services", label: "Services", href: "/services" },
        { id: "parts", label: "Parts", href: "/parts" },
      ]}
      primaryCta={{ label: "Book now", href: "/book" }}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import HeaderCinematicBar.", "Pass a ChromeBrandConfig + nav items.", "Provide primaryCta (CTA uses the metallic button standard)."], notes: ["brand.logoSrc must be a siteImages value."] },
  accessibility: NAV_LANDMARK_A11Y,
  responsive: HEADER_RESPONSIVE,
  cms: { cmsBlock: true, blockType: "navigation/header-cinematic", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Page header block; brand + nav + CTA are owner-editable."] },
  agent: { whenToUse: "Use as the marketing site's primary header.", steps: ["Build the brand config.", "Define nav items.", "Set the primary CTA."], pitfalls: ["Do not restyle the CTA — it must use the metallic button tokens."] },
  tags: ["header", "navigation", "hero"],
}

const headerPinstripeBar: ComponentDocEntry = {
  key: "navigation/header-pinstripe-bar",
  importName: "HeaderPinstripeBar",
  name: "Header — pinstripe bar",
  summary: "App header with breadcrumbs, utility links, and a search shortcut chip.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/headers/pinstripe-bar",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "crumbs", type: "array", required: true, description: "HeaderPinstripeBarCrumb list." },
      { key: "links", type: "array", required: true, description: "HeaderPinstripeBarLink list." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS],
  iconDependencies: [{ name: "search", importPath: "lucide-react", usage: "search shortcut chip" }],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "An app header with breadcrumbs.",
    code: `import { HeaderPinstripeBar } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function AppHeader() {
  return (
    <HeaderPinstripeBar
      brand={brand}
      crumbs={[{ id: "h", label: "Dashboard", href: "/" }, { id: "j", label: "Jobs" }]}
      links={[{ id: "settings", label: "Settings", href: "/settings" }]}
      onOpenSearch={() => openCommandPalette()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import HeaderPinstripeBar.", "Pass crumbs + utility links.", "Wire onOpenSearch."] },
  accessibility: { ...NAV_LANDMARK_A11Y, notes: ["Breadcrumbs render as an ordered nav with aria-current on the last crumb."] },
  responsive: HEADER_RESPONSIVE,
  cms: { cmsBlock: false, blockKind: "section", draggable: true, acceptsChildren: false, notes: ["App-shell header bound to the current route."] },
  agent: { whenToUse: "Use as a dashboard/app header with breadcrumbs.", steps: ["Build the crumb trail from the route.", "Add utility links."], pitfalls: ["Last crumb is the current page — no href."] },
  tags: ["header", "breadcrumbs", "app"],
}

const headerStackedGrand: ComponentDocEntry = {
  key: "navigation/header-stacked-grand",
  importName: "HeaderStackedGrand",
  name: "Header — stacked grand",
  summary: "Two-tier header with a utility strip, tagline, stats, and a primary CTA.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/headers/stacked-grand",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "tagline", type: "string", required: true },
      { key: "stats", type: "array", required: true, description: "HeaderStackedGrandStat list." },
      { key: "utility", type: "object", required: true, description: "{ statusMessage, phoneLabel, phoneHref, bookHref }." },
      { key: "primaryCta", type: "object", required: true, description: "{ label, href }." },
      { key: "nav", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_CTA_TOKENS],
  iconDependencies: [{ name: "phone", importPath: "lucide-react", usage: "utility phone link" }],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/6", thumbnailBreakpoint: "lg" },
  codeExample: {
    language: "tsx",
    caption: "A grand two-tier header.",
    code: `import { HeaderStackedGrand } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function GrandHeader() {
  return (
    <HeaderStackedGrand
      brand={brand}
      tagline="Oak Flats exhaust specialists since 1968"
      stats={[{ label: "Jobs", value: "12k+" }]}
      utility={{ statusMessage: "Open today", phoneLabel: "02 4256 0000", phoneHref: "tel:0242560000", bookHref: "/book" }}
      primaryCta={{ label: "Book now", href: "/book" }}
      nav={[{ id: "services", label: "Services", href: "/services" }]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import HeaderStackedGrand.", "Provide brand, tagline, stats, utility, nav, CTA."] },
  accessibility: NAV_LANDMARK_A11Y,
  responsive: HEADER_RESPONSIVE,
  cms: { cmsBlock: true, blockType: "navigation/header-stacked", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Marketing header block; all copy is owner-editable."] },
  agent: { whenToUse: "Use for a flagship marketing header with stats + utility strip.", steps: ["Fill the utility object.", "Set the CTA."], pitfalls: ["utility requires all four fields."] },
  tags: ["header", "marketing", "stats"],
}

const headerMobileCondensed: ComponentDocEntry = {
  key: "navigation/header-mobile-condensed",
  importName: "HeaderMobileCondensed",
  name: "Header — mobile condensed",
  summary: "Compact scroll-shrinking mobile header with menu + cart triggers.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/headers/mobile-condensed",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "cartCount", type: "number", required: false, min: 0 },
      { key: "shrinkThreshold", type: "number", required: false, description: "Scroll px before shrinking; default 24." },
      { key: "hideCart", type: "boolean", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS],
  iconDependencies: [
    { name: "menu", importPath: "lucide-react", usage: "open drawer" },
    { name: "shopping-bag", importPath: "lucide-react", usage: "open cart" },
  ],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: { cartCount: 2 }, background: "panel", aspectRatio: "16/4", thumbnailBreakpoint: "sm" },
  codeExample: {
    language: "tsx",
    caption: "A condensed mobile header.",
    code: `"use client"

import { HeaderMobileCondensed } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function MobileHeader() {
  return (
    <HeaderMobileCondensed
      brand={brand}
      cartCount={2}
      onOpenMenu={() => openDrawer()}
      onOpenCart={() => openCart()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import HeaderMobileCondensed.", "Wire onOpenMenu / onOpenCart.", "Set cartCount or hideCart."], notes: ["Shrinks after shrinkThreshold px of scroll (default 24)."] },
  accessibility: { ...NAV_LANDMARK_A11Y, notes: ["Menu + cart buttons are labelled; cart badge is announced."] },
  responsive: { mobile: "Primary target — compact bar with menu + cart.", tablet: "Still compact.", desktop: "Prefer a desktop header at wide widths." },
  cms: { cmsBlock: false, blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Mobile app-shell header."] },
  agent: { whenToUse: "Use as the mobile header with a menu drawer + cart.", steps: ["Wire the drawer + cart triggers.", "Reflect the cart count."], pitfalls: ["Set hideCart on marketing routes without a cart."] },
  tags: ["header", "mobile", "cart"],
}

const headerFloatingIsland: ComponentDocEntry = {
  key: "navigation/header-floating-island",
  importName: "HeaderFloatingIsland",
  name: "Header — floating island",
  summary: "Detached glass pill header that floats above the page with a single CTA.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/headers/floating-island",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "nav", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "cta", type: "object", required: true, description: "{ label, href }." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_CTA_TOKENS, ...NAV_GLASS_TOKENS],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "media", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "A floating glass header.",
    code: `import { HeaderFloatingIsland } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function FloatingHeader() {
  return (
    <HeaderFloatingIsland
      brand={brand}
      nav={[{ id: "work", label: "Our work", href: "/work" }]}
      cta={{ label: "Book", href: "/book" }}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import HeaderFloatingIsland.", "Pass brand + nav + cta."] },
  accessibility: NAV_LANDMARK_A11Y,
  responsive: HEADER_RESPONSIVE,
  cms: { cmsBlock: true, blockType: "navigation/header-floating", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Floating header block; nav + CTA are owner-editable."] },
  agent: { whenToUse: "Use for a modern floating glass header over imagery.", steps: ["Pass nav + a single CTA."], pitfalls: ["Ensure sufficient contrast over the hero image."] },
  tags: ["header", "glass", "floating"],
}

// — Footers ————————————————————————————————————————————————

const footerMegamapGrand: ComponentDocEntry = {
  key: "navigation/footer-megamap-grand",
  importName: "FooterMegamapGrand",
  name: "Footer — megamap grand",
  summary: "Large footer with link columns, newsletter, socials, contact, and legal row.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/footers/megamap-grand",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "tagline", type: "string", required: true },
      { key: "columns", type: "array", required: true, description: "FooterMegamapGrandColumn list." },
      { key: "newsletter", type: "object", required: true, description: "{ heading, description, inputPlaceholder, submitLabel }." },
      { key: "socials", type: "array", required: true, description: "ChromeSocialLink list." },
      { key: "contact", type: "array", required: true, description: "ChromeContactDetail list." },
      { key: "legal", type: "string", required: true },
      { key: "legalLinks", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, ...NAV_CTA_TOKENS],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/9", thumbnailBreakpoint: "lg" },
  codeExample: {
    language: "tsx",
    caption: "A grand site footer.",
    code: `import { FooterMegamapGrand } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function SiteFooter() {
  return (
    <FooterMegamapGrand
      brand={brand}
      tagline="Quiet exhausts, loud reputation."
      columns={[{ id: "shop", heading: "Shop", links: [{ id: "parts", label: "Parts", href: "/parts" }] }]}
      newsletter={{ heading: "Stay in the loop", description: "Specials + news.", inputPlaceholder: "Email", submitLabel: "Subscribe" }}
      socials={[{ id: "ig", label: "Instagram", href: "https://instagram.com" }]}
      contact={[{ label: "Phone", value: "02 4256 0000", href: "tel:0242560000" }]}
      legal="© 2026 Oak Flats Mufflermen"
      legalLinks={[{ id: "privacy", label: "Privacy", href: "/privacy" }]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import FooterMegamapGrand.", "Provide columns, newsletter, socials, contact, legal."] },
  accessibility: { ...NAV_LANDMARK_A11Y, role: "contentinfo", notes: ["Newsletter input is labelled; renders inside a <footer> landmark."] },
  responsive: FOOTER_RESPONSIVE,
  cms: { cmsBlock: true, blockType: "navigation/footer-megamap", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Global footer block; all content is owner-editable."] },
  agent: { whenToUse: "Use as the main site footer.", steps: ["Define link columns.", "Configure the newsletter + socials + contact."], pitfalls: ["Provide absolute social URLs."] },
  tags: ["footer", "megamap", "newsletter"],
}

const footerCinematic: ComponentDocEntry = {
  key: "navigation/footer-cinematic",
  importName: "FooterCinematic",
  name: "Footer — cinematic",
  summary: "Image-backed footer with columns and a legal strip.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/footers/cinematic",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "bgImageSrc", type: "image", required: true, description: "siteImages.covers value." },
      { key: "bgImageAlt", type: "string", required: true },
      { key: "tagline", type: "string", required: true },
      { key: "columns", type: "array", required: true, description: "FooterCinematicColumn list." },
      { key: "legal", type: "string", required: true },
      { key: "legalLinks", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, { token: "--primitive-media-overlay", category: "color", usage: "image darkening scrim" }],
  iconDependencies: [],
  assetDependencies: [
    { id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." },
    { id: "footer-bg", type: "image", required: true, description: "siteImages.covers background." },
  ],
  previewConfig: { sampleProps: {}, background: "media", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "A cinematic image footer.",
    code: `import { FooterCinematic } from "@/app/ui-primitives/components/chrome"
import { siteImages } from "@/lib/site-images"

${BRAND_SNIPPET}

export function CinematicFooter() {
  return (
    <FooterCinematic
      brand={brand}
      bgImageSrc={siteImages.covers.workshop}
      bgImageAlt="The Oak Flats workshop floor"
      tagline="Built right, sounds right."
      columns={[{ id: "co", heading: "Company", links: [{ id: "about", label: "About", href: "/about" }] }]}
      legal="© 2026 Oak Flats Mufflermen"
      legalLinks={[{ id: "terms", label: "Terms", href: "/terms" }]}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import FooterCinematic.", "Pass a covers image + alt.", "Provide columns + legal."], notes: ["bgImageSrc must be a siteImages.covers value."] },
  accessibility: { ...NAV_LANDMARK_A11Y, role: "contentinfo", notes: ["Background image needs alt text; scrim preserves text contrast."] },
  responsive: FOOTER_RESPONSIVE,
  cms: { cmsBlock: true, blockType: "navigation/footer-cinematic", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Image footer block; columns + image are owner-editable."] },
  agent: { whenToUse: "Use for an atmospheric image-backed footer.", steps: ["Pick a covers image.", "Provide columns."], pitfalls: ["Always set bgImageAlt."] },
  tags: ["footer", "cinematic", "image"],
}

const footerCompactStrip: ComponentDocEntry = {
  key: "navigation/footer-compact-strip",
  importName: "FooterCompactStrip",
  name: "Footer — compact strip",
  summary: "Single-row footer with links, copyright, a theme toggle, and a status label.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/footers/compact-strip",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "links", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "copyright", type: "string", required: true },
      { key: "themeLabel", type: "string", required: false },
      { key: "statusLabel", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS],
  iconDependencies: [{ name: "sun-moon", importPath: "lucide-react", usage: "theme toggle chip" }],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/3" },
  codeExample: {
    language: "tsx",
    caption: "A compact footer strip.",
    code: `import { FooterCompactStrip } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function CompactFooter() {
  return (
    <FooterCompactStrip
      brand={brand}
      links={[{ id: "privacy", label: "Privacy", href: "/privacy" }]}
      copyright="© 2026 Oak Flats Mufflermen"
      statusLabel="Online · Bay 2 live"
      onToggleTheme={() => toggleTheme()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import FooterCompactStrip.", "Pass links + copyright.", "Wire onToggleTheme."] },
  accessibility: { ...NAV_LANDMARK_A11Y, role: "contentinfo", notes: ["Theme toggle is a labelled button."] },
  responsive: { mobile: "Wraps to two rows.", tablet: "Single row.", desktop: "Single row." },
  cms: { cmsBlock: true, blockType: "navigation/footer-compact", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Minimal footer block."] },
  agent: { whenToUse: "Use for app/dashboard footers needing little chrome.", steps: ["Pass links + copyright.", "Wire the theme toggle."], pitfalls: ["Keep the link set short."] },
  tags: ["footer", "compact", "theme-toggle"],
}

const footerReceiptStyle: ComponentDocEntry = {
  key: "navigation/footer-receipt-style",
  importName: "FooterReceiptStyle",
  name: "Footer — receipt style",
  summary: "Thermal-receipt footer with detail lines, ABN, acknowledgement, and barcode number.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/footers/receipt-style",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "details", type: "array", required: true, description: "FooterReceiptDetail list." },
      { key: "abn", type: "string", required: true },
      { key: "acknowledgement", type: "string", required: true },
      { key: "legalLinks", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "receiptNumber", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, { token: "--primitive-font-mono", category: "typography", usage: "receipt line type" }],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "3/4" },
  codeExample: {
    language: "tsx",
    caption: "A receipt-style footer.",
    code: `import { FooterReceiptStyle } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function ReceiptFooter() {
  return (
    <FooterReceiptStyle
      brand={brand}
      details={[{ label: "Hours", value: "Mon–Fri 8–5" }]}
      abn="12 345 678 901"
      acknowledgement="We acknowledge the Dharawal people."
      legalLinks={[{ id: "privacy", label: "Privacy", href: "/privacy" }]}
      receiptNumber="OF-2026-0001"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import FooterReceiptStyle.", "Provide detail lines, ABN, acknowledgement."] },
  accessibility: { ...NAV_LANDMARK_A11Y, role: "contentinfo" },
  responsive: { mobile: "Narrow receipt column.", tablet: "Centered receipt.", desktop: "Centered receipt." },
  cms: { cmsBlock: true, blockType: "navigation/footer-receipt", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["Distinctive footer block; details are owner-editable."] },
  agent: { whenToUse: "Use for a branded receipt-style footer.", steps: ["Provide detail lines + ABN + acknowledgement."], pitfalls: ["Keep the ABN accurate."] },
  tags: ["footer", "receipt", "thermal"],
}

const footerMarqueeBand: ComponentDocEntry = {
  key: "navigation/footer-marquee-band",
  importName: "FooterMarqueeBand",
  name: "Footer — marquee band",
  summary: "Footer with KPIs and a scrolling marquee of tags above the legal row.",
  category: "Chrome",
  kind: "section",
  componentPath: CHROME_PATH,
  routeHref: "/ui-primitives/chrome/footers/marquee-band",
  propsSchema: {
    fields: [
      { key: "brand", type: "object", required: true, description: "ChromeBrandConfig." },
      { key: "kpis", type: "array", required: true, description: "FooterMarqueeKpi list." },
      { key: "marqueeWords", type: "array", required: true, items: { key: "word", type: "string", required: true } },
      { key: "legalLinks", type: "array", required: true, description: "ChromeNavItem list." },
      { key: "copyright", type: "string", required: true },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [...NAV_SURFACE_TOKENS, { token: "--primitive-duration-slower", category: "motion", usage: "marquee scroll speed" }],
  iconDependencies: [],
  assetDependencies: [{ id: "brand-logo", type: "image", required: true, description: "siteImages logo mark." }],
  previewConfig: { sampleProps: {}, background: "panel", aspectRatio: "16/6", animate: false },
  codeExample: {
    language: "tsx",
    caption: "A marquee-band footer.",
    code: `import { FooterMarqueeBand } from "@/app/ui-primitives/components/chrome"

${BRAND_SNIPPET}

export function MarqueeFooter() {
  return (
    <FooterMarqueeBand
      brand={brand}
      kpis={[{ label: "Jobs done", value: "12,400" }]}
      marqueeWords={["Exhausts", "Mufflers", "Custom", "Dyno"]}
      legalLinks={[{ id: "privacy", label: "Privacy", href: "/privacy" }]}
      copyright="© 2026 Oak Flats Mufflermen"
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import FooterMarqueeBand.", "Provide KPIs + marquee words + legal."] },
  accessibility: { ...NAV_LANDMARK_A11Y, role: "contentinfo", notes: ["Marquee animation pauses under prefers-reduced-motion."] },
  responsive: FOOTER_RESPONSIVE,
  cms: { cmsBlock: true, blockType: "navigation/footer-marquee", blockKind: "section", draggable: true, acceptsChildren: false, notes: ["KPIs + marquee words are owner-editable."] },
  agent: { whenToUse: "Use for an energetic footer with stats + a moving band.", steps: ["Provide KPIs + marquee words."], pitfalls: ["Keep marquee words short."] },
  tags: ["footer", "marquee", "kpi"],
}

// — Docks ——————————————————————————————————————————————————

export const NAVIGATION_ENTRIES_A: readonly ComponentDocEntry[] = [
  headerCinematicBar,
  headerPinstripeBar,
  headerStackedGrand,
  headerMobileCondensed,
  headerFloatingIsland,
  footerMegamapGrand,
  footerCinematic,
  footerCompactStrip,
  footerReceiptStyle,
  footerMarqueeBand,
]
