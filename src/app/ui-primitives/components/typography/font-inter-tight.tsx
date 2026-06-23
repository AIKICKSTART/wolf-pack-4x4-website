import styles from "./font-inter-tight.module.css"

const DISPLAY_TEXT = "Tuned For The Road Ahead"

const BODY_TEXT =
  "Inter Tight tightens the metrics of Inter so headlines sit closer without losing rhythm. We let the gradient sweep wash through the heading colour-by-colour to mark dynamic product callouts."

const CAPTION_TEXT = "Product · marketing · hero"

const SCALE_WEIGHTS = [
  { weight: "300", label: "Light 300" },
  { weight: "400", label: "Regular 400" },
  { weight: "500", label: "Medium 500" },
  { weight: "700", label: "Bold 700" },
  { weight: "900", label: "Black 900" },
]

export function FontInterTight() {
  return (
    <article className={styles.tile} aria-labelledby="font-inter-tight-name">
      <header className={styles.headRow}>
        <h3 id="font-inter-tight-name" className={styles.name}>
          Inter Tight
        </h3>
        <span className={styles.categoryBadge}>Sans · Variable wght</span>
      </header>

      <p className={styles.display} aria-label={DISPLAY_TEXT}>
        {DISPLAY_TEXT}
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Inter Tight weight scale">
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
