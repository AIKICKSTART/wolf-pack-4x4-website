import {
  BrakeRotorIcon,
  ClipboardCheckIcon,
  ExhaustPipeIcon,
  ExtractorHeadersIcon,
  MigWelderIcon,
  MufflerIcon,
  TachometerIcon,
} from "../icons"

import {
  SERVICE_CATEGORY_LABEL,
  SERVICE_LEAD_TIME_LABEL,
  formatAudFromPrice,
  type ServiceAccent,
  type ServiceCategory,
  type ServiceLeadTime,
} from "./services-areas-types"
import styles from "./service-tile.module.css"

export interface ServiceTileProps {
  /** Category drives the iconmark and the chip label. */
  category: ServiceCategory
  /** Friendly service name shown as the tile heading. */
  name: string
  /** Two-line short description. */
  description: string
  /** Lead-time chip value. */
  leadTime: ServiceLeadTime
  /** Average price in AUD. Rendered as "From $189". */
  averagePriceAud: number
  /** Tone-coded accent driving the iconmark + top border colour. */
  accent: ServiceAccent
  /** Destination href when the tile is clicked. */
  href: string
}

const ACCENT_TOKEN: Record<ServiceAccent, { accent: string; accentSoft: string }> = {
  red: {
    accent: "var(--primitive-red)",
    accentSoft: "color-mix(in oklab, var(--primitive-red) 16%, transparent)",
  },
  amber: {
    accent: "var(--primitive-amber)",
    accentSoft: "color-mix(in oklab, var(--primitive-amber) 18%, transparent)",
  },
  teal: {
    accent: "var(--primitive-teal)",
    accentSoft: "color-mix(in oklab, var(--primitive-teal) 18%, transparent)",
  },
  green: {
    accent: "var(--primitive-green)",
    accentSoft: "color-mix(in oklab, var(--primitive-green) 16%, transparent)",
  },
}

const ACCENT_TO_ICON_TONE: Record<ServiceAccent, "red" | "amber" | "teal" | "green"> = {
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function CategoryIcon({
  category,
  accent,
}: {
  category: ServiceCategory
  accent: ServiceAccent
}) {
  const tone = ACCENT_TO_ICON_TONE[accent]
  const size = 30
  switch (category) {
    case "custom-exhaust":
      return <ExhaustPipeIcon size={size} tone={tone} />
    case "muffler-repair":
      return <MufflerIcon size={size} tone={tone} />
    case "extractors-headers":
      return <ExtractorHeadersIcon size={size} tone={tone} />
    case "performance-chips":
      return <TachometerIcon size={size} tone={tone} />
    case "cold-air-induction":
      return <BrakeRotorIcon size={size} tone={tone} />
    case "tig-fabrication":
      return <MigWelderIcon size={size} tone={tone} />
    case "audit-inspection":
      return <ClipboardCheckIcon size={size} tone={tone} />
    default:
      return null
  }
}

/**
 * Service tile adapter. Composes the shared `icons` family for the
 * category iconmark so all category artwork stays consistent with the rest
 * of the design system. The tile shell + non-interactive meta chips are
 * service-specific because a single-anchor tile with accent-top-bar
 * anatomy is not provided by any existing primitive.
 */
export function ServiceTile({
  category,
  name,
  description,
  leadTime,
  averagePriceAud,
  accent,
  href,
}: ServiceTileProps) {
  const tokens = ACCENT_TOKEN[accent]
  const style = {
    ["--accent" as string]: tokens.accent,
    ["--accent-soft" as string]: tokens.accentSoft,
  } as Record<string, string>

  return (
    <a className={styles.tile} href={href} style={style} aria-label={`${name} service tile`}>
      <span className={styles.iconmark} aria-hidden="true">
        <CategoryIcon category={category} accent={accent} />
      </span>
      <h3 className={styles.name}>{name}</h3>
      <p className={styles.description}>{description}</p>
      <div className={styles.meta}>
        <span className={styles.chip}>
          <span>Type</span>
          <strong>{SERVICE_CATEGORY_LABEL[category]}</strong>
        </span>
        <span className={`${styles.chip} ${styles.chipLead}`}>
          <span>Lead</span>
          <strong>{SERVICE_LEAD_TIME_LABEL[leadTime]}</strong>
        </span>
        <span className={`${styles.chip} ${styles.chipPrice}`}>
          <strong>{formatAudFromPrice(averagePriceAud)}</strong>
        </span>
      </div>
    </a>
  )
}

export default ServiceTile
