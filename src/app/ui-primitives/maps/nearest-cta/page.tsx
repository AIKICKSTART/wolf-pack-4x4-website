import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { NearestCta, type NearestOption } from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Nearest CTA | Maps & Location",
  description:
    "Primitive 09 — find nearest workshop surface with primary card and alternative options stack.",
}

const NEAREST: NearestOption = {
  name: "Oak Flats HQ",
  suburb: "Unit 4, 132 Central Ave",
  distance: "0.4 km",
  duration: "1 min",
  traffic: "free",
}

const ALTERNATIVES: ReadonlyArray<NearestOption> = [
  {
    name: "Albion Park",
    suburb: "232 Tongarra Rd",
    distance: "3.2 km",
    duration: "6 min",
    traffic: "free",
  },
  {
    name: "Shellharbour Village",
    suburb: "14 Lake Entrance Rd",
    distance: "4.8 km",
    duration: "9 min",
    traffic: "moderate",
  },
  {
    name: "Warilla",
    suburb: "188 Shellharbour Rd",
    distance: "6.6 km",
    duration: "11 min",
    traffic: "free",
  },
  {
    name: "Dapto",
    suburb: "94 Princes Hwy",
    distance: "12.4 km",
    duration: "18 min",
    traffic: "moderate",
  },
]

export default function NearestCtaPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 09 / Nearest CTA"
        title="Nearest workshop CTA"
        description="Primary closest-workshop card with a red CTA, plus a stack of alternative options each carrying their own distance + duration chip. Useful as the hero CTA on coverage pages."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Nearest CTA" },
        ]}
      />
      <NearestCta
        heading="We're 1 minute from your address"
        copy="Oak Flats HQ is your nearest workshop. We have one bay free at 2:30pm today, or pick a window that works."
        nearest={NEAREST}
        alternatives={ALTERNATIVES}
        ctaLabel="Book this workshop"
      />
    </main>
  )
}
