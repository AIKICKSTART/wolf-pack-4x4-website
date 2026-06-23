import type { Metadata } from "next"
import { ShieldCheck, Flame, Wrench, Gauge, Truck, Calendar, MapPin, Headset } from "lucide-react"

import { PageHeader } from "../../components/page-header"
import { FeatureGrid, type FeatureGridItem } from "../../components/marketing/feature-grid"

import styles from "../marketing.module.css"

export const metadata: Metadata = {
  title: "Feature grid | Marketing Blocks",
  description:
    "Primitive 02 — feature grid with 2/3/4 columns. Each card has an icon, title, body, and optional link.",
}

const FEATURES: ReadonlyArray<FeatureGridItem> = [
  {
    id: "adr",
    icon: <ShieldCheck strokeWidth={1.6} aria-hidden="true" />,
    title: "ADR-compliant",
    description: "Every catback we fit is stamped against ADR 83/00. No bush plates, no shop-bought downpipes.",
    href: "#adr",
    linkLabel: "Compliance log",
  },
  {
    id: "tig",
    icon: <Flame strokeWidth={1.6} aria-hidden="true" />,
    title: "MIG + TIG fusion",
    description: "Stainless TIG joints on the catback. MIG welds on mounting brackets. Both purged.",
    href: "#welding",
    linkLabel: "Workshop tour",
  },
  {
    id: "manta",
    icon: <Wrench strokeWidth={1.6} aria-hidden="true" />,
    title: "Manta partner",
    description: "Authorised Manta installer since 2014. Cat-3 inch, 3.5 inch, twin tip — pulled from our cage.",
    href: "#manta",
    linkLabel: "Manta catalogue",
  },
  {
    id: "dyno",
    icon: <Gauge strokeWidth={1.6} aria-hidden="true" />,
    title: "Dyno-tuned",
    description: "Pre and post-fit dyno runs at the Albion Park cell. Every install ships with a torque sheet.",
  },
  {
    id: "callout",
    icon: <Truck strokeWidth={1.6} aria-hidden="true" />,
    title: "Mobile bay",
    description: "Mufflermen ute attends Wollongong, Kiama, Shoalhaven. Stainless welds done roadside.",
    href: "#mobile",
    linkLabel: "Coverage map",
  },
  {
    id: "booking",
    icon: <Calendar strokeWidth={1.6} aria-hidden="true" />,
    title: "Same-week booking",
    description: "Drop your ute Monday, drive it home Wednesday. Caravan rigs slotted 5 days out.",
    href: "#book",
    linkLabel: "Book a bay",
  },
  {
    id: "location",
    icon: <MapPin strokeWidth={1.6} aria-hidden="true" />,
    title: "Oak Flats workshop",
    description: "Two bays at 47 Central Ave. Lift-equipped pit room one. Hoist + dyno pit room two.",
  },
  {
    id: "support",
    icon: <Headset strokeWidth={1.6} aria-hidden="true" />,
    title: "Lifetime backstop",
    description: "Joints we welded come with a lifetime crack guarantee. Bring the ute back. We fix it.",
    href: "#warranty",
    linkLabel: "Warranty terms",
  },
]

export default function FeatureGridPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Feature grid"
        title="Feature grid"
        description="Reveal-animated feature grid — 2, 3, or 4 columns. Icons sit on a token-tinted plate; each card optionally links downstream."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Marketing", href: "/ui-primitives/marketing" },
          { label: "Feature grid" },
        ]}
      />

      <FeatureGrid
        kicker="Why Mufflermen"
        heading="What every Oak Flats install includes."
        body="Eight reasons our cars come back. Every one of these is part of the standard sign-off — not an upsell."
        columns={4}
        features={FEATURES}
      />

      <span className={styles.stageCaption}>Three-column variant</span>
      <FeatureGrid columns={3} features={FEATURES.slice(0, 6)} />

      <span className={styles.stageCaption}>Two-column variant</span>
      <FeatureGrid columns={2} features={FEATURES.slice(0, 4)} />
    </main>
  )
}
