import styles from "./translation-key-row.module.css"
import {
  isRtlTag,
  REVIEWER_STATE_LABEL,
  STATUS_LABEL,
  type ReviewerState,
  type TranslationStatus,
} from "./localization-types"

export interface TranslationKeyTarget {
  locale: string
  value: string
  status: TranslationStatus
  reviewer: ReviewerState
}

export interface TranslationKeyRowProps {
  /** Source key, e.g. "checkout.cta.confirm". */
  translationKey: string
  /** Source string in the canonical locale. */
  sourceString: string
  /** Canonical source locale, e.g. "en-AU". */
  sourceLocale: string
  /** Target locales with translation + reviewer status. */
  targets: ReadonlyArray<TranslationKeyTarget>
}

export function TranslationKeyRow({
  translationKey,
  sourceString,
  sourceLocale,
  targets,
}: TranslationKeyRowProps) {
  const missingCount = targets.filter((t) => t.status === "missing").length

  return (
    <article className={styles.row} aria-labelledby={`tk-${translationKey}`}>
      <header className={styles.head}>
        <div className={styles.keyBlock}>
          <code id={`tk-${translationKey}`} className={styles.key}>
            {translationKey}
          </code>
          <span className={styles.sourceTag}>{sourceLocale}</span>
        </div>
        {missingCount > 0 ? (
          <span className={styles.missingChip}>
            {missingCount} missing
          </span>
        ) : (
          <span className={styles.completeChip}>All translated</span>
        )}
      </header>

      <p className={styles.source} dir={isRtlTag(sourceLocale) ? "rtl" : "ltr"}>
        {sourceString}
      </p>

      <ol className={styles.targets}>
        {targets.map((target) => {
          const rtl = isRtlTag(target.locale)
          return (
            <li key={target.locale} className={styles.target}>
              <div className={styles.targetMeta}>
                <span className={styles.targetTag}>{target.locale}</span>
                <span
                  className={styles.statusChip}
                  data-status={target.status}
                  title={STATUS_LABEL[target.status]}
                >
                  {STATUS_LABEL[target.status]}
                </span>
                <span
                  className={styles.reviewerChip}
                  data-reviewer={target.reviewer}
                  title={REVIEWER_STATE_LABEL[target.reviewer]}
                >
                  {REVIEWER_STATE_LABEL[target.reviewer]}
                </span>
              </div>
              <p
                className={styles.targetValue}
                dir={rtl ? "rtl" : "ltr"}
                data-empty={target.status === "missing"}
              >
                {target.status === "missing" ? "— Awaiting translation —" : target.value}
              </p>
            </li>
          )
        })}
      </ol>
    </article>
  )
}

export default TranslationKeyRow
