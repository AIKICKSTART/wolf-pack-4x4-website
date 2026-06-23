import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import { WeatherStrip } from "../../components/bay-display"
import styles from "../bay-display.module.css"

export const metadata: Metadata = {
  title: "Weather strip | UI Primitives — Bay Display",
}

const HIGH_TIDE = new Date("2026-05-29T14:32:00+10:00")
const LOW_TIDE = new Date("2026-05-29T20:48:00+10:00")

export default function WeatherStripPage() {
  return (
    <main className={styles.page}>
      <PageHeader
        kicker="42.05 / Bay display"
        title="Weather strip"
        description="Albion Park weather snapshot for the waiting room — temperature in Anton, wind + humidity + tide metadata in Bebas, all numerics tabular for clean re-renders."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Bay display", href: "/ui-primitives/bay-display" },
          { label: "Weather strip" },
        ]}
      />
      <section className={styles.canvas}>
        <WeatherStrip
          tempC={18}
          feelsLikeC={16}
          condition="partly-cloudy"
          windKmh={12}
          windDir="E"
          humidity={64}
          tideHeightM={1.7}
          tideAt={HIGH_TIDE}
          tidePhase="rising"
        />
        <WeatherStrip
          location="Lake Illawarra"
          tempC={17}
          feelsLikeC={15}
          condition="sunny"
          windKmh={9}
          windDir="NE"
          humidity={58}
          tideHeightM={0.4}
          tideAt={LOW_TIDE}
          tidePhase="falling"
        />
        <WeatherStrip
          tempC={14}
          condition="rain"
          windKmh={22}
          windDir="S"
          humidity={88}
          tideHeightM={1.9}
          tideAt={HIGH_TIDE}
          tidePhase="slack"
        />
        <div className={styles.note}>
          <span>Behaviour</span>
          <p>
            Default location is Albion Park (Oak Flats neighbour). Tide is for
            Lake Illawarra — high tide 1.7 m at 14:32. Condition swaps the
            icon between sun, clouds and drops; the panel keeps its teal
            radial background as the signage tonal anchor.
          </p>
        </div>
      </section>
    </main>
  )
}
