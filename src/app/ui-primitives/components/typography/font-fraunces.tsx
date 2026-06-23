import type { CSSProperties } from "react"

import styles from "./font-fraunces.module.css"

const DISPLAY_TEXT = "Craft, restored"

const BODY_TEXT =
  "Fraunces is a variable serif with theatrical range. We push the weight axis from a hairline 200 up to 900, and the optical-size axis from caption to display, so a single family covers everything from invoice notes to gallery posters."

const CAPTION_TEXT = "Editorial · long-form · invoices"

const SCALE_AXES: Array<{ wght: number; opsz: number; label: string }> = [
  { wght: 200, opsz: 9, label: "wght 200 / opsz 9" },
  { wght: 400, opsz: 14, label: "wght 400 / opsz 14" },
  { wght: 600, opsz: 48, label: "wght 600 / opsz 48" },
  { wght: 900, opsz: 144, label: "wght 900 / opsz 144" },
]

export function FontFraunces() {
  return (
    <article className={styles.tile} aria-labelledby="font-fraunces-name">
      <header className={styles.headRow}>
        <h3 id="font-fraunces-name" className={styles.name}>
          Fraunces
        </h3>
        <span className={styles.categoryBadge}>Serif · Variable axes</span>
      </header>

      <p className={styles.display} aria-label={DISPLAY_TEXT}>
        {DISPLAY_TEXT}
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Fraunces variable axis scale">
        {SCALE_AXES.map((item, index) => {
          const style: CSSProperties = {
            fontVariationSettings: `"wght" ${item.wght}, "opsz" ${item.opsz}`,
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
