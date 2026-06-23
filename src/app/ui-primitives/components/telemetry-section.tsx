import { Flame, Gauge, Radio, Thermometer, Waves, Zap } from "lucide-react"

import styles from "../ui-primitives.module.css"
import { ConicGauge } from "./conic-gauge"
import { SignalBars } from "./signal-bars"
import { TelemetryTile } from "./telemetry-tile"

export function TelemetrySection() {
  return (
    <div className={styles.telemetryGrid}>
      <article className={styles.gaugeCluster}>
        <header>
          <span className={styles.kicker}>Cluster · Live readouts</span>
          <h3>Workshop telemetry</h3>
        </header>
        <div className={styles.gaugeRow}>
          <ConicGauge label="Coverage" value={94.2} max={100} unit="%" tone="green" redline={92} />
          <ConicGauge label="Latency" value={14} max={60} unit="ms" tone="teal" redline={45} />
          <ConicGauge label="Boost" value={1.8} max={3} unit=" bar" tone="red" redline={2.4} />
        </div>
      </article>

      <article className={styles.tilesPanel}>
        <header>
          <span className={styles.kicker}>OBD · Status</span>
          <h3>Diagnostic tiles</h3>
        </header>
        <div className={styles.tilesGrid}>
          <TelemetryTile icon={Gauge} label="RPM" value="4,820" delta="peak 6,200" tone="red" />
          <TelemetryTile icon={Thermometer} label="EGT" value="687°C" delta="+12°" tone="amber" />
          <TelemetryTile icon={Zap} label="Volt" value="14.2 V" delta="stable" tone="teal" />
          <TelemetryTile icon={Flame} label="Lambda" value="0.89" delta="rich" tone="amber" />
          <TelemetryTile icon={Waves} label="Resonance" value="98 dB" delta="legal" tone="green" />
          <TelemetryTile icon={Radio} label="Signal" value="-42 dBm" delta="clean" tone="teal" />
        </div>
      </article>

      <article className={styles.signalPanel}>
        <header>
          <span className={styles.kicker}>Diagnostic bars</span>
          <h3>Channel integrity</h3>
        </header>
        <SignalBars label="Token sync" active={6} count={7} />
        <SignalBars label="Asset cache" active={5} count={7} />
        <SignalBars label="Render budget" active={6} count={7} />
        <SignalBars label="Render bus" active={4} count={7} />
      </article>
    </div>
  )
}
