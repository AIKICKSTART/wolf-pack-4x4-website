import styles from "./font-bebas.module.css"

const DISPLAY_TEXT = "Mufflermen Workshop Floor"

const MARQUEE_PHRASES = [
  "Mufflermen Workshop Floor",
  "Bay 04 · Ute · Final Tune",
  "Performance Built Properly",
  "Oak Flats · NSW · Since 1962",
]

const BODY_TEXT =
  "Bebas Neue runs along the workshop banner — a single condensed cap that holds the eye at any speed. We use it for live status bars and rolling marquee notices."

const CAPTION_TEXT = "Marquee · ticker · banner rail"

const SCALE_WEIGHTS = [
  { weight: "400", label: "Regular 400 — only cut" },
  { weight: "400", label: "+ letter-spacing 0.06em" },
  { weight: "400", label: "+ marquee 28s loop" },
]

export function FontBebas() {
  return (
    <article className={styles.tile} aria-labelledby="font-bebas-name">
      <header className={styles.headRow}>
        <h3 id="font-bebas-name" className={styles.name}>
          Bebas Neue
        </h3>
        <span className={styles.categoryBadge}>Display · Condensed</span>
      </header>

      <div className={styles.displayBanner} aria-label={DISPLAY_TEXT}>
        <div className={styles.displayTrack} aria-hidden="true">
          {[...MARQUEE_PHRASES, ...MARQUEE_PHRASES].map((phrase, index) => (
            <span key={`${phrase}-${index}`}>
              {phrase}
              <i className={styles.dot} aria-hidden="true" />
            </span>
          ))}
        </div>
      </div>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Bebas Neue weight scale">
        {SCALE_WEIGHTS.map((item, index) => (
          <div key={`${item.label}-${index}`} className={styles.scaleItem}>
            <span className={styles.scaleSample} aria-hidden="true">
              Aa
            </span>
            <span className={styles.scaleLabel}>{item.label}</span>
          </div>
        ))}
      </div>
    </article>
  )
}
