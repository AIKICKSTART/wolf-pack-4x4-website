"use client"

import {
  BatteryCharging,
  ClipboardList,
  Cog,
  Gauge,
  Lightbulb,
  Mountain,
  Package,
  PhoneCall,
  Shield,
  Truck,
  Volume2,
  Wind,
  Wrench,
  type LucideIcon,
} from "lucide-react"

import type { BrandIconName } from "./types"

// Professional vector icons (lucide) replace the crude raster Carbon&Red
// glyphs. Single-stroke line icons read crisp at any size and colour to the
// accent via currentColor, so they sit cleanly on both cream and obsidian.
export const BRAND_ICON_COMPONENTS: Record<BrandIconName, LucideIcon> = {
  exhaust: Gauge,
  muffler: Volume2,
  extractors: Wrench,
  airFilter: Wind,
  suspension: Gauge,
  protection: Shield,
  winch: Mountain,
  lighting: Lightbulb,
  battery: BatteryCharging,
  touring: Package,
  towing: Truck,
  performance: Gauge,
  phone: PhoneCall,
  quote: ClipboardList,
  parts: Package,
  workshop: Cog,
}

export function BrandCarbonIcon({
  className,
  name,
}: {
  className?: string
  name: BrandIconName
}) {
  const Icon = BRAND_ICON_COMPONENTS[name]

  return (
    <Icon
      className={`brand-glyph-icon ${className ?? ""}`}
      strokeWidth={1.75}
      aria-hidden="true"
    />
  )
}
