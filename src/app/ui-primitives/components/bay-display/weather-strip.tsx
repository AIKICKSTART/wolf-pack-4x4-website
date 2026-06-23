import { Cloud, Compass, Droplets, Sun, Waves, Wind } from "lucide-react"

import {
  formatClock24,
  type TidePhase,
  type WindDirection,
} from "./bay-display-types"
import styles from "./weather-strip.module.css"

export type WeatherCondition =
  | "sunny"
  | "partly-cloudy"
  | "cloudy"
  | "rain"

export interface WeatherStripProps {
  /** Location name shown on the strip — defaults to Albion Park. */
  location?: string
  /** Temperature in °C. */
  tempC: number
  /** Apparent / feels-like in °C. */
  feelsLikeC?: number
  /** Sky condition. */
  condition: WeatherCondition
  /** Wind speed km/h. */
  windKmh: number
  /** Wind direction. */
  windDir: WindDirection
  /** Humidity percent. */
  humidity: number
  /** Next high-tide height for Lake Illawarra (m). */
  tideHeightM: number
  /** Time of next tide. */
  tideAt: Date
  /** Phase of the tide. */
  tidePhase: TidePhase
  className?: string
}

const CONDITION_LABEL: Readonly<Record<WeatherCondition, string>> = {
  sunny: "Sunny",
  "partly-cloudy": "Partly cloudy",
  cloudy: "Cloudy",
  rain: "Showers",
}

const TIDE_LABEL: Readonly<Record<TidePhase, string>> = {
  rising: "Rising",
  falling: "Falling",
  slack: "Slack",
}

function ConditionIcon({ condition }: { condition: WeatherCondition }) {
  if (condition === "sunny") return <Sun size={28} strokeWidth={2.2} aria-hidden="true" />
  if (condition === "rain") return <Droplets size={28} strokeWidth={2.2} aria-hidden="true" />
  return <Cloud size={28} strokeWidth={2.2} aria-hidden="true" />
}

export function WeatherStrip({
  location = "Albion Park",
  tempC,
  feelsLikeC,
  condition,
  windKmh,
  windDir,
  humidity,
  tideHeightM,
  tideAt,
  tidePhase,
  className,
}: WeatherStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")
  const tide = formatClock24(tideAt)

  return (
    <section
      className={classes}
      aria-label={`Local weather and tides for ${location}`}
    >
      <header className={styles.head}>
        <ConditionIcon condition={condition} />
        <span>
          <em>{location}</em>
          <strong>{CONDITION_LABEL[condition]}</strong>
        </span>
      </header>

      <div className={styles.bigTemp}>
        <strong className={styles.temp}>
          {Math.round(tempC)}°
        </strong>
        {typeof feelsLikeC === "number" && (
          <span className={styles.feels}>
            feels {Math.round(feelsLikeC)}°
          </span>
        )}
      </div>

      <ul className={styles.metrics}>
        <li>
          <Wind size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>
            <em>Wind</em>
            <strong className={styles.tabular}>
              {Math.round(windKmh)} km/h {windDir}
            </strong>
          </span>
        </li>
        <li>
          <Compass size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>
            <em>Humidity</em>
            <strong className={styles.tabular}>{Math.round(humidity)}%</strong>
          </span>
        </li>
        <li>
          <Waves size={18} strokeWidth={2.2} aria-hidden="true" />
          <span>
            <em>Lake Illawarra · {TIDE_LABEL[tidePhase]}</em>
            <strong className={styles.tabular}>
              {tideHeightM.toFixed(1)} m · {tide}
            </strong>
          </span>
        </li>
      </ul>
    </section>
  )
}

export default WeatherStrip
