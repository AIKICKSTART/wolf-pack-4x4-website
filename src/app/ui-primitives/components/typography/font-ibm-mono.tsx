import styles from "./font-ibm-mono.module.css"

const DISPLAY_TEXT = "uptime: 99.94% / 0xMUFF"

const BODY_TEXT =
  "IBM Plex Mono is the canonical pick for code, telemetry, and event logs. We pair the 400 cut with 600 for emphasis, and let the scanline wipe across the heading to signal that a stream is live."

const CAPTION_TEXT = "Code · logs · diagnostics"

const SCALE_WEIGHTS = [
  { weight: "400", label: "Regular 400" },
  { weight: "600", label: "SemiBold 600" },
]

export function FontIbmMono() {
  return (
    <article className={styles.tile} aria-labelledby="font-ibm-mono-name">
      <header className={styles.headRow}>
        <h3 id="font-ibm-mono-name" className={styles.name}>
          IBM Plex Mono
        </h3>
        <span className={styles.categoryBadge}>Mono · 400 / 600</span>
      </header>

      <p className={styles.displayShell} aria-label={DISPLAY_TEXT}>
        <span aria-hidden="true">{DISPLAY_TEXT}</span>
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="IBM Plex Mono weight scale">
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
