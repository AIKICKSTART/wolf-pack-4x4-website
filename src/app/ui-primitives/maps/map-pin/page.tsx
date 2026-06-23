import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { MapPin, StaticMapCanvas } from "../../components/maps"

import styles from "../maps.module.css"

export const metadata: Metadata = {
  title: "Map pin | Maps & Location",
  description:
    "Primitive 02 — drop-animated map pin with optional pulse, index badge, and four tones.",
}

interface DemoPin {
  id: string
  name: string
  x: number
  y: number
  tone: "red" | "amber" | "teal" | "green"
  active: boolean
}

const PINS: ReadonlyArray<DemoPin> = [
  { id: "oak-flats", name: "Oak Flats — Central Ave", x: 38, y: 44, tone: "red", active: true },
  { id: "albion-park", name: "Albion Park — Tongarra Rd", x: 52, y: 30, tone: "amber", active: false },
  { id: "shellharbour", name: "Shellharbour — Lake Entrance Rd", x: 24, y: 62, tone: "teal", active: false },
  { id: "warilla", name: "Warilla — Shellharbour Rd", x: 64, y: 58, tone: "green", active: false },
]

export default function MapPinPage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Primitive 02 / Map pin"
        title="Map pin"
        description="Absolutely positioned pin that drops on mount, pulses when active, and accepts a 1-based index badge. Four tones map to workshop status."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Maps & location", href: "/ui-primitives/maps" },
          { label: "Map pin" },
        ]}
      />

      <section className={styles.stageFrame} aria-label="Map pin demo">
        <div className={styles.canvasWrap}>
          <StaticMapCanvas
            label="Illawarra workshop pins"
            tone="midnight"
          />
          <div className={styles.pinLayer}>
            {PINS.map((pin, index) => (
              <MapPin
                key={pin.id}
                x={pin.x}
                y={pin.y}
                tone={pin.tone}
                label={pin.name}
                active={pin.active}
                index={index + 1}
              />
            ))}
          </div>
        </div>

        <div className={styles.stageLegend}>
          {PINS.map((pin) => (
            <div key={pin.id} className={styles.legendItem}>
              <strong>{pin.name.split(" — ")[0]}</strong>
              {pin.active ? "Active dispatch · pulsing" : "Branch standby"}
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
