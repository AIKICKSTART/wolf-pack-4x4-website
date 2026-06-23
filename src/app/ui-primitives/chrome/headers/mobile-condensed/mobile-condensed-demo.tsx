"use client"

import { useState } from "react"

import { HeaderMobileCondensed } from "@/app/ui-primitives/components/chrome"
import { siteImages } from "@/lib/site-assets"

export function MobileCondensedDemo() {
  const [cart, setCart] = useState<number>(2)

  return (
    <HeaderMobileCondensed
      brand={{
        logoSrc: siteImages.logoNav,
        logoAlt: "Mufflermen logo",
        wordmark: "Mufflermen",
      }}
      onOpenMenu={() => undefined}
      onOpenCart={() => setCart((value) => value + 1)}
      cartCount={cart}
    />
  )
}
