import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  WorkshopLocator,
  type LocatorEntry,
} from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Workshop locator | Maps & Location",
  description:
    "Primitive 04 — interactive workshop locator with map and selectable list of Illawarra branches.",
}

const ENTRIES: ReadonlyArray<LocatorEntry> = [
  {
    id: "oak-flats",
    name: "Oak Flats HQ",
    suburb: "Unit 4, 132 Central Ave, Oak Flats",
    distance: 0.4,
    status: "Open · until 5pm",
    tone: "red",
    x: 38,
    y: 44,
  },
  {
    id: "albion-park",
    name: "Albion Park",
    suburb: "232 Tongarra Rd, Albion Park",
    distance: 3.2,
    status: "Open · until 5pm",
    tone: "amber",
    x: 52,
    y: 30,
  },
  {
    id: "shellharbour",
    name: "Shellharbour Village",
    suburb: "14 Lake Entrance Rd, Shellharbour",
    distance: 4.8,
    status: "Open · until 5pm",
    tone: "teal",
    x: 24,
    y: 62,
  },
  {
    id: "warilla",
    name: "Warilla",
    suburb: "188 Shellharbour Rd, Warilla",
    distance: 6.6,
    status: "Open · until 5pm",
    tone: "green",
    x: 64,
    y: 58,
  },
  {
    id: "dapto",
    name: "Dapto",
    suburb: "94 Princes Hwy, Dapto",
    distance: 12.4,
    status: "Open · until 4pm",
    tone: "amber",
    x: 18,
    y: 24,
  },
  {
    id: "kiama",
    name: "Kiama Industrial",
    suburb: "12 Brown St, Kiama",
    distance: 18.2,
    status: "Closed · opens Mon 7am",
    tone: "teal",
    x: 78,
    y: 78,
  },
]

export default function WorkshopLocatorPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 04 / Workshop locator"
        title="Workshop locator"
        description="Map left, locator list right. Click a list entry to highlight the matching pin — the pin pulses and shines through its tone glow. Six Illawarra branches loaded."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Workshop locator" },
        ]}
      />
      <WorkshopLocator
        entries={ENTRIES}
        caption="Illawarra · 6 branches"
      />
    </main>
  )
}
