/**
 * Curated icon palette for the CMS section blocks.
 *
 * `ICON_OPTIONS` feeds Payload `select` fields (see `section-blocks.ts`) and
 * `resolveBlockIcon` turns the stored value back into a lucide element at
 * render time (see `section-renderers.tsx`). Values are kebab-case lucide
 * names; the list covers the icons the section-library sections actually use
 * plus the common workshop/marketing marks.
 *
 * Plain `.ts` on purpose — icons are created via `createElement`, unsized and
 * `aria-hidden`, so the host section's `--primitive-icon-*` tokens control
 * size, stroke, and colour (via `currentColor`).
 */

import { createElement, type ReactNode } from "react"
import {
  ArrowRight,
  Award,
  BadgeCheck,
  Calendar,
  Car,
  Check,
  Clock,
  DollarSign,
  Flame,
  Gauge,
  Hammer,
  MapPin,
  MessageCircle,
  Phone,
  Quote,
  Settings,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  ThumbsUp,
  Timer,
  Truck,
  Volume2,
  Wrench,
  Zap,
} from "lucide-react"

/** All lucide icons share one component type. */
type BlockIconComponent = typeof Wrench

const ICON_COMPONENTS: Readonly<Record<string, BlockIconComponent>> = {
  "arrow-right": ArrowRight,
  award: Award,
  "badge-check": BadgeCheck,
  calendar: Calendar,
  car: Car,
  check: Check,
  clock: Clock,
  "dollar-sign": DollarSign,
  flame: Flame,
  gauge: Gauge,
  hammer: Hammer,
  "map-pin": MapPin,
  "message-circle": MessageCircle,
  phone: Phone,
  quote: Quote,
  settings: Settings,
  "shield-check": ShieldCheck,
  sparkles: Sparkles,
  star: Star,
  tag: Tag,
  "thumbs-up": ThumbsUp,
  timer: Timer,
  truck: Truck,
  "volume-2": Volume2,
  wrench: Wrench,
  zap: Zap,
}

/**
 * The curated icon choices offered by section-block `select` fields. Order
 * controls the admin dropdown order — workshop marks first, generic last.
 */
export const ICON_OPTIONS: { label: string; value: string }[] = [
  { label: "Wrench", value: "wrench" },
  { label: "Gauge", value: "gauge" },
  { label: "Shield check", value: "shield-check" },
  { label: "Badge check", value: "badge-check" },
  { label: "Flame", value: "flame" },
  { label: "Car", value: "car" },
  { label: "Truck", value: "truck" },
  { label: "Settings", value: "settings" },
  { label: "Hammer", value: "hammer" },
  { label: "Volume", value: "volume-2" },
  { label: "Timer", value: "timer" },
  { label: "Zap", value: "zap" },
  { label: "Phone", value: "phone" },
  { label: "Map pin", value: "map-pin" },
  { label: "Clock", value: "clock" },
  { label: "Calendar", value: "calendar" },
  { label: "Message circle", value: "message-circle" },
  { label: "Star", value: "star" },
  { label: "Check", value: "check" },
  { label: "Award", value: "award" },
  { label: "Thumbs up", value: "thumbs-up" },
  { label: "Dollar sign", value: "dollar-sign" },
  { label: "Tag", value: "tag" },
  { label: "Quote", value: "quote" },
  { label: "Sparkles", value: "sparkles" },
  { label: "Arrow right", value: "arrow-right" },
]

/**
 * Resolve a stored icon value to its lucide element (`<Icon aria-hidden />`).
 * Returns `null` for empty or unknown values so callers can pass the result
 * straight into a section's `ReactNode` icon slot.
 */
export function resolveBlockIcon(name?: string | null): ReactNode {
  if (!name) {
    return null
  }

  const Icon = ICON_COMPONENTS[name]

  if (!Icon) {
    return null
  }

  return createElement(Icon, { "aria-hidden": true })
}
