import styles from "./font-big-shoulders.module.css"

const DISPLAY_TEXT = "Built On The Coast Road"

const BODY_TEXT =
  "Big Shoulders Inline frames our headline gallery work. The inline rule reads as a coach-line — perfect for chrome callouts and printed window decals."

const CAPTION_TEXT = "Signage · livery · poster"

const SCALE_WEIGHTS = [
  { weight: "400", label: "Regular 400" },
  { weight: "700", label: "Bold 700" },
  { weight: "900", label: "Black 900" },
]

export function FontBigShoulders() {
  return (
    <article className={styles.tile} aria-labelledby="font-bigshoulders-name">
      <header className={styles.headRow}>
        <h3 id="font-bigshoulders-name" className={styles.name}>
          Big Shoulders Inline
        </h3>
        <span className={styles.categoryBadge}>Display · Inline rule</span>
      </header>

      <p className={styles.display} aria-label={DISPLAY_TEXT}>
        {DISPLAY_TEXT}
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Big Shoulders weight scale">
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
