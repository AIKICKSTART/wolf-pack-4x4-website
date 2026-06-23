import type { ReactNode } from "react"
import {
  ArrowRight,
  BadgeCheck,
  CalendarClock,
  Flame,
  Gauge,
  Images,
  MapPin,
  MessageSquareHeart,
  PhoneCall,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Tag,
  Volume2,
  Wrench,
} from "lucide-react"

/**
 * Section-library icon set — thin wrappers over lucide marks used by the
 * marketing sections. Size + stroke come from the central `--primitive-icon-*`
 * tokens (via CSS `width/height`/`stroke-width` on a `currentColor` SVG), never
 * hardcoded here; colour is inherited via `currentColor` from a token-driven
 * parent. Each helper returns a `ReactNode` so it can drop into a section's
 * icon slots.
 */

export type SectionIconName =
  | "wrench"
  | "flame"
  | "gauge"
  | "volume"
  | "shield"
  | "badge"
  | "calendar"
  | "phone"
  | "pin"
  | "tag"
  | "star"
  | "quote"
  | "sparkles"
  | "arrow"
  | "instagram"
  | "review"

const ICONS: Record<SectionIconName, ReactNode> = {
  wrench: <Wrench aria-hidden="true" />,
  flame: <Flame aria-hidden="true" />,
  gauge: <Gauge aria-hidden="true" />,
  volume: <Volume2 aria-hidden="true" />,
  shield: <ShieldCheck aria-hidden="true" />,
  badge: <BadgeCheck aria-hidden="true" />,
  calendar: <CalendarClock aria-hidden="true" />,
  phone: <PhoneCall aria-hidden="true" />,
  pin: <MapPin aria-hidden="true" />,
  tag: <Tag aria-hidden="true" />,
  star: <Star aria-hidden="true" />,
  quote: <Quote aria-hidden="true" />,
  sparkles: <Sparkles aria-hidden="true" />,
  arrow: <ArrowRight aria-hidden="true" />,
  instagram: <Images aria-hidden="true" />,
  review: <MessageSquareHeart aria-hidden="true" />,
}

/** Resolve a section icon by name. Sizing/colour are token-driven by the host. */
export function sectionIcon(name: SectionIconName): ReactNode {
  return ICONS[name]
}
