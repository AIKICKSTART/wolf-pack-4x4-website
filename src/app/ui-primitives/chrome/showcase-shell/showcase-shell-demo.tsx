"use client"

import { useState, type ReactNode } from "react"

import {
  DockBottomGlass,
  DockCornerQuick,
  DockSideMagnetic,
  DockTabRail,
  FooterCinematic,
  FooterCompactStrip,
  FooterMarqueeBand,
  FooterMegamapGrand,
  FooterReceiptStyle,
  HeaderCinematicBar,
  HeaderFloatingIsland,
  HeaderMobileCondensed,
  HeaderPinstripeBar,
  HeaderStackedGrand,
  SidebarCinematicVertical,
  SidebarContextRail,
  SidebarGlassCompact,
  SidebarMegaAnchored,
} from "@/app/ui-primitives/components/chrome"
import { ThemeController } from "@/app/ui-primitives/components/theming/theme-controller"
import { siteImages } from "@/lib/site-assets"

import styles from "../chrome.module.css"

type HeaderId =
  | "cinematic-bar"
  | "pinstripe-bar"
  | "stacked-grand"
  | "mobile-condensed"
  | "floating-island"

type FooterId =
  | "megamap-grand"
  | "cinematic"
  | "compact-strip"
  | "receipt-style"
  | "marquee-band"

type DockId = "none" | "bottom-glass" | "side-magnetic" | "corner-quick" | "tab-rail"

type SidebarId =
  | "none"
  | "cinematic-vertical"
  | "glass-compact"
  | "mega-anchored"
  | "context-rail"

const BRAND = {
  logoSrc: siteImages.logoNav,
  logoAlt: "Mufflermen logo",
  wordmark: "Mufflermen",
  caption: "Oak Flats · Est. 1968",
}

function HeaderSlot({ id }: { id: HeaderId }): ReactNode {
  switch (id) {
    case "cinematic-bar":
      return (
        <HeaderCinematicBar
          brand={BRAND}
          nav={[
            { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
            { id: "services", label: "Services", href: "#services" },
            { id: "catalog", label: "Catalog", href: "#catalog" },
            { id: "about", label: "About", href: "#about" },
          ]}
          primaryCta={{ label: "Book a bay", href: "#book" }}
          secondaryCta={{ label: "Call", href: "tel:+61242567000" }}
        />
      )
    case "pinstripe-bar":
      return (
        <HeaderPinstripeBar
          brand={BRAND}
          crumbs={[
            { label: "Workshop", href: "#workshop" },
            { label: "Bay 2", href: "#bay-2" },
            { label: "Job 2415" },
          ]}
          links={[
            { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
            { id: "trade", label: "Trade", href: "#trade" },
            { id: "contact", label: "Contact", href: "#contact" },
          ]}
        />
      )
    case "stacked-grand":
      return (
        <HeaderStackedGrand
          brand={{ ...BRAND, logoSrc: siteImages.logoIcon }}
          tagline="Stainless catbacks · MIG / TIG · ADR stamped"
          stats={[
            { label: "Bays", value: "6" },
            { label: "Since", value: "1968" },
            { label: "Vehicles", value: "12.4k" },
          ]}
          utility={{
            statusMessage: "Workshop online · Bay 2 dyno",
            phoneLabel: "(02) 4256 7000",
            phoneHref: "tel:+61242567000",
            bookHref: "#book",
          }}
          primaryCta={{ label: "Book a bay", href: "#book" }}
          nav={[
            { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
            { id: "services", label: "Services", href: "#services" },
            { id: "catalog", label: "Catalog", href: "#catalog" },
            { id: "performance", label: "Performance", href: "#performance" },
            { id: "motorsport", label: "Motorsport", href: "#motorsport" },
          ]}
        />
      )
    case "mobile-condensed":
      return (
        <HeaderMobileCondensed
          brand={BRAND}
          onOpenMenu={() => undefined}
          onOpenCart={() => undefined}
          cartCount={3}
        />
      )
    case "floating-island":
      return (
        <HeaderFloatingIsland
          brand={BRAND}
          nav={[
            { id: "workshop", label: "Workshop", href: "#workshop", isActive: true },
            { id: "services", label: "Services", href: "#services" },
            { id: "catalog", label: "Catalog", href: "#catalog" },
            { id: "motorsport", label: "Motorsport", href: "#motorsport" },
          ]}
          cta={{ label: "Book", href: "#book" }}
        />
      )
  }
}

function FooterSlot({ id }: { id: FooterId }): ReactNode {
  switch (id) {
    case "megamap-grand":
      return (
        <FooterMegamapGrand
          brand={BRAND}
          tagline="Oak Flats · Est. 1968"
          columns={[
            { id: "workshop", heading: "Workshop", links: [{ id: "catback", label: "Catbacks", href: "#" }, { id: "dyno", label: "Dyno", href: "#" }] },
            { id: "services", heading: "Services", links: [{ id: "welding", label: "Welding", href: "#" }, { id: "adr", label: "ADR", href: "#" }] },
            { id: "about", heading: "About", links: [{ id: "story", label: "Story", href: "#" }, { id: "crew", label: "Crew", href: "#" }] },
            { id: "support", heading: "Support", links: [{ id: "book", label: "Book", href: "#" }, { id: "contact", label: "Contact", href: "#" }] },
            { id: "legal", heading: "Legal", links: [{ id: "privacy", label: "Privacy", href: "#" }, { id: "terms", label: "Terms", href: "#" }] },
          ]}
          newsletter={{ heading: "Workshop bulletin", description: "Monthly notes", inputPlaceholder: "you@workshop.au", submitLabel: "Join" }}
          socials={[
            { id: "about", label: "Mufflermen on Instagram", href: "#" },
            { id: "exhaust", label: "Mufflermen on YouTube", href: "#" },
            { id: "shield", label: "Trade portal", href: "#" },
            { id: "phone", label: "Email Mufflermen", href: "mailto:fitters@mufflermen.example" },
          ]}
          contact={[
            { label: "Phone", value: "(02) 4256 7000", href: "tel:+61242567000" },
            { label: "Hours", value: "Mon-Fri 7:30am-5:30pm" },
          ]}
          legal="© 1968-2026 Mufflermen Pty Ltd"
          legalLinks={[{ id: "privacy", label: "Privacy", href: "#" }, { id: "terms", label: "Terms", href: "#" }]}
        />
      )
    case "cinematic":
      return (
        <FooterCinematic
          brand={BRAND}
          bgImageSrc={siteImages.covers.services}
          bgImageAlt="Workshop cover"
          tagline="Stainless catbacks. ADR-stamped welds. Manta-fit performance gear."
          columns={[
            { id: "workshop", heading: "Workshop", links: [{ id: "catback", label: "Catbacks", href: "#" }] },
            { id: "motorsport", heading: "Motorsport", links: [{ id: "rally", label: "Rally", href: "#" }] },
            { id: "trade", heading: "Trade", links: [{ id: "fleet", label: "Fleet", href: "#" }] },
          ]}
          legal="© 1968-2026 Mufflermen"
          legalLinks={[{ id: "privacy", label: "Privacy", href: "#" }]}
        />
      )
    case "compact-strip":
      return (
        <FooterCompactStrip
          brand={BRAND}
          links={[
            { id: "shop", label: "Shop", href: "#" },
            { id: "about", label: "About", href: "#" },
            { id: "contact", label: "Contact", href: "#" },
            { id: "trade", label: "Trade", href: "#" },
          ]}
          copyright="© 1968-2026"
          statusLabel="Online"
        />
      )
    case "receipt-style":
      return (
        <FooterReceiptStyle
          brand={BRAND}
          details={[
            { id: "workshop", label: "Workshop", value: "47 Central Ave, Oak Flats NSW" },
            { id: "phone", label: "Phone", value: "(02) 4256 7000", href: "tel:+61242567000" },
          ]}
          abn="11 222 333 444"
          acknowledgement="We acknowledge the Dharawal people, traditional custodians of the land where our Oak Flats workshop stands."
          legalLinks={[{ id: "privacy", label: "Privacy", href: "#" }, { id: "terms", label: "Terms", href: "#" }]}
        />
      )
    case "marquee-band":
      return (
        <FooterMarqueeBand
          brand={BRAND}
          kpis={[
            { id: "jobs", label: "Jobs", value: 14400 },
            { id: "warranty", label: "ADR", value: 100, suffix: "%" },
            { id: "motorsport", label: "Race weekends", value: 312 },
            { id: "dyno", label: "Dyno pulls", value: 1860 },
          ]}
          marqueeWords={["Mufflermen", "Manta", "Catback", "MIG · TIG"]}
          legalLinks={[{ id: "privacy", label: "Privacy", href: "#" }]}
          copyright="© 1968-2026"
        />
      )
  }
}

function DockSlot({ id }: { id: DockId }): ReactNode {
  switch (id) {
    case "none":
      return null
    case "bottom-glass":
      return (
        <DockBottomGlass
          layout="static"
          actions={[
            { id: "home", label: "Home", kind: "home", onClick: () => undefined, isActive: true },
            { id: "catalog", label: "Catalog", kind: "catalog", onClick: () => undefined },
            { id: "tools", label: "Tools", kind: "tools", onClick: () => undefined },
            { id: "phone", label: "Phone", kind: "phone", onClick: () => undefined },
            { id: "search", label: "Search", kind: "search", onClick: () => undefined },
          ]}
        />
      )
    case "side-magnetic":
      return (
        <DockSideMagnetic
          layout="static"
          dividerAfter={3}
          actions={[
            { id: "home", label: "Home", kind: "home", onClick: () => undefined, isActive: true },
            { id: "catalog", label: "Catalog", kind: "catalog", onClick: () => undefined },
            { id: "tools", label: "Tools", kind: "tools", onClick: () => undefined },
            { id: "performance", label: "Performance", kind: "performance", onClick: () => undefined },
            { id: "phone", label: "Phone", kind: "phone", onClick: () => undefined },
          ]}
        />
      )
    case "corner-quick":
      return (
        <DockCornerQuick
          layout="static"
          chatBadge={2}
          onComposeClick={() => undefined}
          onChatClick={() => undefined}
          onScrollTopClick={() => undefined}
          onThemeToggleClick={() => undefined}
        />
      )
    case "tab-rail":
      return (
        <DockTabRail
          layout="inline"
          activeId="workshop"
          onSelect={() => undefined}
          items={[
            { id: "home", label: "Home", kind: "home" },
            { id: "workshop", label: "Workshop", kind: "workshop" },
            { id: "catalog", label: "Catalog", kind: "catalog" },
            { id: "performance", label: "Performance", kind: "performance" },
            { id: "motorsport", label: "Motorsport", kind: "motorsport" },
          ]}
        />
      )
  }
}

function SidebarSlot({ id }: { id: SidebarId }): ReactNode {
  switch (id) {
    case "none":
      return null
    case "cinematic-vertical":
      return (
        <SidebarCinematicVertical
          layout="static"
          brand={BRAND}
          items={[
            { id: "home", label: "Home", href: "#home", kind: "home", isActive: true },
            { id: "workshop", label: "Workshop", href: "#workshop", kind: "workshop" },
            { id: "catalog", label: "Catalog", href: "#catalog", kind: "catalog" },
            { id: "performance", label: "Performance", href: "#performance", kind: "performance" },
            { id: "trade", label: "Trade", href: "#trade", kind: "trade" },
          ]}
          footerLabel="Est. 1968"
        />
      )
    case "glass-compact":
      return (
        <SidebarGlassCompact
          layout="static"
          brand={BRAND}
          items={[
            { id: "home", label: "Home", href: "#", kind: "home", isActive: true },
            { id: "workshop", label: "Workshop", href: "#", kind: "workshop" },
            { id: "catalog", label: "Catalog", href: "#", kind: "catalog" },
            { id: "quote", label: "Quote", href: "#", kind: "quote", badge: 3 },
          ]}
          user={{ name: "Daniel F" }}
        />
      )
    case "mega-anchored":
      return (
        <SidebarMegaAnchored
          layout="static"
          brand={BRAND}
          groups={[
            {
              id: "workshop",
              heading: "Workshop",
              items: [
                { id: "home", label: "Overview", href: "#", kind: "home", isActive: true },
                { id: "workshop", label: "Bays", href: "#", kind: "workshop" },
              ],
            },
            {
              id: "catalog",
              heading: "Catalog",
              items: [
                { id: "catalog", label: "Manta", href: "#", kind: "catalog" },
                { id: "performance", label: "Performance", href: "#", kind: "performance" },
              ],
            },
          ]}
          footerCard={{ title: "Daniel F", subtitle: "Bay 2" }}
        />
      )
    case "context-rail":
      return (
        <SidebarContextRail
          layout="static"
          kicker="Job · OFM-2415"
          title="Manta catback · VE Ute"
          metas={[{ id: "status", label: "In progress" }]}
          stats={[
            { id: "muffler", label: "Mufflers", value: "1", kind: "muffler" },
            { id: "spanner", label: "Labour", value: "4.5h", kind: "spanner" },
          ]}
          related={[
            { id: "r1", label: "Past VE Ute installs", href: "#" },
            { id: "r2", label: "Manta catalog", href: "#" },
          ]}
          primaryAction={{ label: "Mark complete", onClick: () => undefined }}
        />
      )
  }
}

export function ShowcaseShellDemo() {
  const [headerId, setHeaderId] = useState<HeaderId>("cinematic-bar")
  const [footerId, setFooterId] = useState<FooterId>("megamap-grand")
  const [dockId, setDockId] = useState<DockId>("bottom-glass")
  const [sidebarId, setSidebarId] = useState<SidebarId>("mega-anchored")

  const sidebarOnRight = sidebarId === "context-rail"
  const sidebarPresent = sidebarId !== "none"

  const stageClass = [
    styles.showcaseStage,
    sidebarPresent && !sidebarOnRight ? styles.showcaseStageWithSidebar : null,
    sidebarPresent && sidebarOnRight ? styles.showcaseStageWithSidebarRight : null,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <ThemeController initialPresetId="performance-teal">
      <div className={styles.showcaseShellPage}>
        <HeaderSlot id={headerId} />

        <div className={styles.showcaseControls} role="group" aria-label="Showcase controls">
          <label className={styles.controlGroup}>
            <span className={styles.controlLabel}>Header</span>
            <select
              className={styles.controlSelect}
              value={headerId}
              onChange={(event) => setHeaderId(event.target.value as HeaderId)}
            >
              <option value="cinematic-bar">01 · Cinematic bar</option>
              <option value="pinstripe-bar">02 · Pinstripe bar</option>
              <option value="stacked-grand">03 · Stacked grand</option>
              <option value="mobile-condensed">04 · Mobile condensed</option>
              <option value="floating-island">05 · Floating island</option>
            </select>
          </label>
          <label className={styles.controlGroup}>
            <span className={styles.controlLabel}>Footer</span>
            <select
              className={styles.controlSelect}
              value={footerId}
              onChange={(event) => setFooterId(event.target.value as FooterId)}
            >
              <option value="megamap-grand">06 · Megamap grand</option>
              <option value="cinematic">07 · Cinematic</option>
              <option value="compact-strip">08 · Compact strip</option>
              <option value="receipt-style">09 · Receipt style</option>
              <option value="marquee-band">10 · Marquee band</option>
            </select>
          </label>
          <label className={styles.controlGroup}>
            <span className={styles.controlLabel}>Dock</span>
            <select
              className={styles.controlSelect}
              value={dockId}
              onChange={(event) => setDockId(event.target.value as DockId)}
            >
              <option value="none">None</option>
              <option value="bottom-glass">11 · Bottom glass</option>
              <option value="side-magnetic">12 · Side magnetic</option>
              <option value="corner-quick">13 · Corner quick</option>
              <option value="tab-rail">14 · Tab rail</option>
            </select>
          </label>
          <label className={styles.controlGroup}>
            <span className={styles.controlLabel}>Sidebar</span>
            <select
              className={styles.controlSelect}
              value={sidebarId}
              onChange={(event) => setSidebarId(event.target.value as SidebarId)}
            >
              <option value="none">None</option>
              <option value="cinematic-vertical">19 · Cinematic vertical</option>
              <option value="glass-compact">20 · Glass compact</option>
              <option value="mega-anchored">21 · Mega anchored</option>
              <option value="context-rail">22 · Context rail</option>
            </select>
          </label>
        </div>

        <div className={stageClass}>
          {sidebarPresent && !sidebarOnRight ? <SidebarSlot id={sidebarId} /> : null}

          <section className={styles.showcaseContent} aria-label="Mock workshop content">
            <h2>Mufflermen workshop</h2>
            <p className={styles.showcaseLead}>
              This stage renders mock content between the selected chrome
              variants. Every variant carries the real brand and uses the same
              token system, so light + dark, glass + cinematic compose cleanly.
            </p>

            <div className={styles.showcaseCards}>
              {[
                { value: "6", label: "Bays running" },
                { value: "12.4k", label: "Vehicles served" },
                { value: "100%", label: "ADR compliant" },
                { value: "1968", label: "Established" },
              ].map((card) => (
                <div key={card.label} className={styles.showcaseCard}>
                  <strong>{card.value}</strong>
                  <span>{card.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.showcaseDockMount}>
              <DockSlot id={dockId} />
            </div>
          </section>

          {sidebarPresent && sidebarOnRight ? <SidebarSlot id={sidebarId} /> : null}
        </div>

        <FooterSlot id={footerId} />
      </div>
    </ThemeController>
  )
}
