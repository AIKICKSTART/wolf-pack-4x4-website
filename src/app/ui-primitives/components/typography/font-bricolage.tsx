import type { CSSProperties } from "react"

import styles from "./font-bricolage.module.css"

const DISPLAY_TEXT = "Coastal precision engineering"

const BODY_TEXT =
  "Bricolage Grotesque has a width axis from 75 to 125 and an optical-size axis up to 96. We use the narrow cut in tight metadata strips and the widest cut for hero headlines that need to anchor a full row."

const CAPTION_TEXT = "Variable wdth · opsz"

const SCALE_AXES: Array<{ wdth: number; opsz: number; label: string }> = [
  { wdth: 75, opsz: 12, label: "wdth 75 / opsz 12" },
  { wdth: 100, opsz: 24, label: "wdth 100 / opsz 24" },
  { wdth: 110, opsz: 48, label: "wdth 110 / opsz 48" },
  { wdth: 125, opsz: 96, label: "wdth 125 / opsz 96" },
]

export function FontBricolage() {
  return (
    <article className={styles.tile} aria-labelledby="font-bricolage-name">
      <header className={styles.headRow}>
        <h3 id="font-bricolage-name" className={styles.name}>
          Bricolage Grotesque
        </h3>
        <span className={styles.categoryBadge}>Grotesque · wdth · opsz</span>
      </header>

      <p className={styles.display} aria-label={DISPLAY_TEXT}>
        {DISPLAY_TEXT}
      </p>

      <p className={styles.body}>{BODY_TEXT}</p>
      <p className={styles.caption}>{CAPTION_TEXT}</p>

      <div className={styles.scale} aria-label="Bricolage variable axis scale">
        {SCALE_AXES.map((item, index) => {
          const style: CSSProperties = {
            fontVariationSettings: `"wdth" ${item.wdth}, "opsz" ${item.opsz}`,
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
