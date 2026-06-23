"use client"

import type { ReactNode } from "react"

import { FeatureGrid, type FeatureGridItem } from "../../../components/marketing"
import {
  CatBackSystemIcon,
  ExtractorHeadersIcon,
  HoistArmIcon,
  MufflerIcon,
  ShieldTickIcon,
  WeldBeadIcon,
} from "../../../components/icons"

import styles from "./service-overview-section.module.css"

export interface ServiceOverviewItem {
  id: string
  icon: ReactNode
  title: string
  description: string
  href?: string
  linkLabel?: string
}

export interface ServiceOverviewSectionProps {
  kicker?: string
  heading?: string
  body?: string
  /** 2-6 service cards. Defaults to the six core Mufflermen services. */
  services?: ReadonlyArray<ServiceOverviewItem>
  columns?: 2 | 3 | 4
  className?: string
}

const DEFAULT_SERVICES: ReadonlyArray<ServiceOverviewItem> = [
  {
    id: "custom-exhaust",
    icon: <MufflerIcon size={28} tone="red" title="Custom exhaust" />,
    title: "Custom exhaust",
    description: "Mandrel-bent, mig-welded systems tailored to your vehicle, your sound, and your budget.",
    href: "/services/custom-exhaust",
    linkLabel: "Build a system",
  },
  {
    id: "cat-back",
    icon: <CatBackSystemIcon size={28} tone="amber" title="Cat-back systems" />,
    title: "Cat-back systems",
    description: "Bolt-in cat-back kits from Manta, XForce and Redback — flowed and fitted in-house.",
    href: "/services/cat-back",
    linkLabel: "Shop kits",
  },
  {
    id: "extractors",
    icon: <ExtractorHeadersIcon size={28} tone="teal" title="Extractors & headers" />,
    title: "Extractors & headers",
    description: "Tuned-length extractors and headers to free up your engine from the manifold back.",
    href: "/services/extractors",
    linkLabel: "Learn more",
  },
  {
    id: "repairs",
    icon: <WeldBeadIcon size={28} tone="green" title="Repairs & welding" />,
    title: "Repairs & welding",
    description: "Blowing gaskets, cracked flanges, rusted-out mufflers — patched or replaced, done properly.",
    href: "/services/repairs",
    linkLabel: "Get it fixed",
  },
  {
    id: "rego-checks",
    icon: <ShieldTickIcon size={28} tone="teal" title="Rego & compliance" />,
    title: "Rego & compliance",
    description: "Noise-compliant systems and pink-slip-ready repairs that keep you legal on the road.",
    href: "/services/compliance",
    linkLabel: "Stay legal",
  },
  {
    id: "fleet",
    icon: <HoistArmIcon size={28} tone="amber" title="Fleet & 4WD" />,
    title: "Fleet & 4WD",
    description: "Turbo-back diesel systems and DPF-back upgrades for utes, wagons and work fleets.",
    href: "/services/fleet",
    linkLabel: "Talk fleet",
  },
]

/**
 * Service overview — a grid of the core Oak Flats Mufflermen services. Wraps the
 * `FeatureGrid` marketing primitive with brand domain icons. Token-driven,
 * light/dark, responsive, reduced-motion safe (FeatureGrid handles reveal).
 */
export function ServiceOverviewSection({
  kicker = "What we do",
  heading = "Every job, under one roof",
  body = "From a quiet daily-driver muffler swap to a full mandrel-bent performance system, the Mufflermen crew fabricates, welds and fits it all on-site at Oak Flats.",
  services = DEFAULT_SERVICES,
  columns = 3,
  className,
}: ServiceOverviewSectionProps) {
  const classes = [styles.host, className].filter(Boolean).join(" ")

  const features: ReadonlyArray<FeatureGridItem> = services.map((service) => ({
    id: service.id,
    icon: service.icon,
    title: service.title,
    description: service.description,
    href: service.href,
    linkLabel: service.linkLabel,
  }))

  return (
    <div className={classes}>
      <span className={styles.weave} aria-hidden="true" />
      <FeatureGrid
        className={styles.grid}
        kicker={kicker}
        heading={heading}
        body={body}
        columns={columns}
        features={features}
      />
    </div>
  )
}

export default ServiceOverviewSection
