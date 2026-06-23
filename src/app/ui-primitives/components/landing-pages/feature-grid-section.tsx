import {
  Calendar,
  Flame,
  Gauge,
  Layers,
  Map as MapIcon,
  Phone,
  Shield,
  Sparkles,
  Truck,
  Wrench,
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"

import type { LandingFeatureIcon, LandingFeatureItem } from "./landing-pages-types"
import styles from "./landing-pages.module.css"

const ICON_MAP: Record<
  LandingFeatureIcon,
  ComponentType<SVGProps<SVGSVGElement> & { size?: number; strokeWidth?: number }>
> = {
  wrench: Wrench,
  shield: Shield,
  flame: Flame,
  gauge: Gauge,
  spark: Sparkles,
  calendar: Calendar,
  map: MapIcon,
  phone: Phone,
  truck: Truck,
  stack: Layers,
}

export interface FeatureGridSectionProps {
  kicker?: string
  heading: string
  body?: string
  features: ReadonlyArray<LandingFeatureItem>
  className?: string
}

/**
 * Primitive 04 — 3-by-2 feature grid. Each cell has an icon, title, and body
 * with an optional inline link. Falls back to two columns on tablets and a
 * single column on phones.
 */
export function FeatureGridSection({
  kicker,
  heading,
  body,
  features,
  className,
}: FeatureGridSectionProps) {
  const sectionClasses = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={sectionClasses} aria-labelledby="features-heading">
      <header className={styles.sectionHeader}>
        {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
        <h2 id="features-heading" className={styles.heading}>
          {heading}
        </h2>
        {body ? <p className={styles.body}>{body}</p> : null}
      </header>

      <ul className={styles.featureGrid}>
        {features.map((feature) => {
          const Icon = ICON_MAP[feature.iconId]
          return (
            <li key={feature.id} className={styles.featureCard}>
              <span className={styles.featureIcon} aria-hidden="true">
                <Icon size={22} strokeWidth={1.6} />
              </span>
              <div>
                <h3 className={styles.featureTitle}>{feature.title}</h3>
                <p className={styles.featureBody}>{feature.body}</p>
              </div>
              {feature.link ? (
                <a className={styles.featureLink} href={feature.link.href}>
                  {feature.link.label} →
                </a>
              ) : null}
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default FeatureGridSection
