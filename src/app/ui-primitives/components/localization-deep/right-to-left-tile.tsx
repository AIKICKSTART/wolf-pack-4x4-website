"use client"

import { useId, useState } from "react"

import { isRtlTag } from "../localization/localization-types"

import styles from "./right-to-left-tile.module.css"

export interface RightToLeftTileProps {
  /** Locale tag — drives default direction. */
  locale: string
  /** Sample headline to render in the preview. */
  headline: string
  /** Sample body paragraph. */
  body: string
  /** Optional call-to-action label. */
  cta?: string
  /** Optional secondary metadata (e.g. price). */
  meta?: string
  /** Initial mirror state. When true the whole layout is flipped. */
  initialMirror?: boolean
}

export function RightToLeftTile({
  locale,
  headline,
  body,
  cta = "Continue",
  meta,
  initialMirror,
}: RightToLeftTileProps) {
  const groupId = useId()
  const inferredRtl = isRtlTag(locale)
  const [mirror, setMirror] = useState(initialMirror ?? inferredRtl)
  const dir = mirror ? "rtl" : "ltr"

  return (
    <article className={styles.wrap} aria-labelledby={`${groupId}-title`}>
      <header className={styles.head}>
        <div>
          <span className={styles.kicker}>RTL preview</span>
          <h3 id={`${groupId}-title`} className={styles.title}>
            {locale}
          </h3>
        </div>
        <div className={styles.controls}>
          <span className={styles.directionPill} data-dir={dir}>
            {dir.toUpperCase()}
          </span>
          <label className={styles.toggle}>
            <input
              type="checkbox"
              className={styles.toggleInput}
              checked={mirror}
              onChange={(event) => setMirror(event.target.checked)}
            />
            <span className={styles.toggleTrack} aria-hidden="true">
              <span className={styles.toggleThumb} />
            </span>
            <span className={styles.toggleLabel}>Mirror layout</span>
          </label>
        </div>
      </header>

      <div className={styles.frame} dir={dir} data-mirror={mirror}>
        <div className={styles.surface}>
          <div className={styles.surfaceHead}>
            <span className={styles.tag}>{locale}</span>
            {meta ? <span className={styles.meta}>{meta}</span> : null}
          </div>
          <h4 className={styles.headline}>{headline}</h4>
          <p className={styles.body}>{body}</p>
          <div className={styles.row}>
            <button type="button" className={styles.primary}>
              {cta}
              <span className={styles.primaryArrow} aria-hidden="true">
                {mirror ? "←" : "→"}
              </span>
            </button>
            <button type="button" className={styles.secondary}>
              Skip
            </button>
          </div>
        </div>
      </div>

      <ul className={styles.notes} aria-label="RTL mirroring notes">
        <li className={styles.note}>
          Inline icons rotate {mirror ? "right → left" : "left → right"}.
        </li>
        <li className={styles.note}>
          Padding / margin start/end swap automatically with{" "}
          <code>dir=&quot;{dir}&quot;</code>.
        </li>
        <li className={styles.note}>
          Numbers stay LTR — preserved with tabular-nums.
        </li>
      </ul>
    </article>
  )
}

export default RightToLeftTile
