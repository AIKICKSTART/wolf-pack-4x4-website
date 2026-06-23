import type { CSSProperties } from "react"

import styles from "./font-anton.module.css"

const DISPLAY_TEXT = "Performance Built Properly"
const DISPLAY_WORDS = DISPLAY_TEXT.split(" ")

const BODY_TEXT =
  "Anton carries marquee weight in a single cut. We use it for hero callouts where every glyph has to clear a fifty-foot read distance through workshop glass."

const CAPTION_TEXT = "Bay 04 — final road test"

const SCALE_WEIGHTS = [
  { weight: "400", label: "Regular 400 — only cut" },
  { weight: "400", label: "+ letter-spacing 0.04em" },
  { weight: "400", label: "+ uppercase + tabular" },
]

export function FontAnton() {
  let letterIndex = 0

  return (
    <article className={styles.tile} aria-labelledby="font-anton-name">
      <header className={styles.headRow}>
        <h3 id="font-anton-name" className={styles.name}>
          Anton
        </h3>
        <span className={styles.categoryBadge}>Display · Single cut</span>
      </header>

      <p className={styles.display} aria-label={DISPLAY_TEXT}>
        {DISPLAY_WORDS.map((word, wordIndex) => (
          <span key={`${word}-${wordIndex}`} className={styles.word} aria-hidden="true">
            {Array.from(word).map((char, charIndex) => {
              const index = letterIndex
              letterIndex += 1

              return (
                <span
                  key={`${char}-${wordIndex}-${charIndex}`}
                  data-letter
                  style={{ "--anton-i": index } as CSSProperties}
                >
                  {char}
                </span>
              )
            })}
          </span>
        ))}
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Anton weight scale">
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
