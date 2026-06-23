"use client"

import { useState } from "react"

import { FooterCompactStrip } from "@/app/ui-primitives/components/chrome"
import { siteImages } from "@/lib/site-assets"

export function CompactStripDemo() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  return (
    <FooterCompactStrip
      brand={{
        logoSrc: siteImages.logoNav,
        logoAlt: "Mufflermen logo",
        wordmark: "Mufflermen",
      }}
      links={[
        { id: "shop", label: "Shop", href: "#shop" },
        { id: "about", label: "About", href: "#about" },
        { id: "contact", label: "Contact", href: "#contact" },
        { id: "trade", label: "Trade", href: "#trade" },
      ]}
      copyright="© 1968-2026 Mufflermen"
      statusLabel="Online"
      onToggleTheme={() => setTheme((value) => (value === "dark" ? "light" : "dark"))}
      themeLabel={`${theme} theme`}
    />
  )
}
