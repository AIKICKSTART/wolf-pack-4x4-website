import styles from "./font-space-grotesk.module.css"

const DISPLAY_TEXT = "Diagnostic ready, idle stable"

const BODY_TEXT =
  "Space Grotesk is our day-to-day workhorse. Slightly tightened tracking, generous x-height, and consistent rhythm down to body sizes — it sits clean over diagrams, charts, and live data."

const CAPTION_TEXT = "Body · UI · telemetry"

const SCALE_WEIGHTS = [
  { weight: "300", label: "Light 300" },
  { weight: "400", label: "Regular 400" },
  { weight: "500", label: "Medium 500" },
  { weight: "600", label: "SemiBold 600" },
  { weight: "700", label: "Bold 700" },
]

export function FontSpaceGrotesk() {
  return (
    <article className={styles.tile} aria-labelledby="font-space-grotesk-name">
      <header className={styles.headRow}>
        <h3 id="font-space-grotesk-name" className={styles.name}>
          Space Grotesk
        </h3>
        <span className={styles.categoryBadge}>Sans · 300 → 700</span>
      </header>

      <p className={styles.displayShell} aria-label={DISPLAY_TEXT}>
        <span className={styles.typeBox} aria-hidden="true">
          {DISPLAY_TEXT}
        </span>
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Space Grotesk weight scale">
        {SCALE_WEIGHTS.map((item, index) => (
          <div key={`${item.label}-${index}`} className={styles.scaleItem}>
            <span
              className={styles.scaleSample}
              style={{ fontWeight: Number(item.weight) }}
              aria-hidden="true"
            >
              Aa
            </span>
            <span className={styles.scaleLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
