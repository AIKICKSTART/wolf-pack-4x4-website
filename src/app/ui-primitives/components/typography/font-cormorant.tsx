import type { CSSProperties } from "react"

import styles from "./font-cormorant.module.css"

const DISPLAY_TEXT = "Heritage, in motion"

const BODY_TEXT =
  "Cormorant Garamond is the most romantic of the Garamond revivals — long ascenders, swept terminals, and a confident italic. We use it on heritage stories, certificate copy, and longform editorial pages that anchor the brand."

const CAPTION_TEXT = "Heritage · editorial · invitations"

const SCALE_WEIGHTS: Array<{ weight: number; italic: boolean; label: string }> = [
  { weight: 400, italic: false, label: "Regular 400" },
  { weight: 400, italic: true, label: "Regular Italic" },
  { weight: 700, italic: false, label: "Bold 700" },
  { weight: 700, italic: true, label: "Bold Italic" },
]

export function FontCormorant() {
  return (
    <article className={styles.tile} aria-labelledby="font-cormorant-name">
      <header className={styles.headRow}>
        <h3 id="font-cormorant-name" className={styles.name}>
          Cormorant Garamond
        </h3>
        <span className={styles.categoryBadge}>Serif · 400 / 700 · italics</span>
      </header>

      <p className={styles.display} aria-label={DISPLAY_TEXT}>
        {DISPLAY_TEXT}
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Cormorant Garamond weight scale">
        {SCALE_WEIGHTS.map((item, index) => {
          const style: CSSProperties = {
            fontWeight: item.weight,
            fontStyle: item.italic ? "italic" : "normal",
          }
          return (
            <div key={`${item.label}-${index}`} className={styles.scaleItem}>
              <span className={styles.scaleSample} style={style} aria-hidden="true">
                Aa
              </span>
              <span className={styles.scaleLabel}>{item.label}</span>
            </div>
          )
        })}
      </div>
    </article>
  )
}
