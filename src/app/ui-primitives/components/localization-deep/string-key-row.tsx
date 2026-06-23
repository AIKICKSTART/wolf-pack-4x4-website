import { isRtlTag } from "../localization/localization-types"
import { Chip } from "../primitives/chip"

import styles from "./string-key-row.module.css"

export interface StringKeyRowProps {
  /** Flat key, e.g. "checkout.cta.confirm". */
  translationKey: string
  /** Namespace prefix shown as a chip. */
  namespace: string
  /** Source locale for direction inference. */
  sourceLocale: string
  /** Source string in the canonical locale. */
  sourceString: string
  /** Number of usages found in the codebase or screens. */
  usageCount: number
  /** Optional label for usage scope (e.g. "screens"). */
  usageLabel?: string
  /** ISO timestamp or display string of last edit. */
  lastEdited: string
  /** Optional editor name. */
  lastEditor?: string
  /** Whether this key is flagged as critical (header/CTA/legal). */
  critical?: boolean
}

export function StringKeyRow({
  translationKey,
  namespace,
  sourceLocale,
  sourceString,
  usageCount,
  usageLabel = "uses",
  lastEdited,
  lastEditor,
  critical = false,
}: StringKeyRowProps) {
  const dir = isRtlTag(sourceLocale) ? "rtl" : "ltr"

  return (
    <article
      className={styles.row}
      data-critical={critical ? "true" : "false"}
      aria-label={`String key ${translationKey}`}
    >
      <div className={styles.identity}>
        <div className={styles.head}>
          <Chip label={namespace} tone="teal" />
          {critical ? <Chip label="Critical" tone="red" /> : null}
        </div>
        <code className={styles.key}>{translationKey}</code>
        <p className={styles.source} dir={dir}>
          {sourceString}
        </p>
      </div>

      <dl className={styles.meta}>
        <div className={styles.metaCell}>
          <dt>{usageLabel}</dt>
          <dd className={styles.usage}>
            <span className={styles.usageValue}>{usageCount}</span>
          </dd>
        </div>
        <div className={styles.metaCell}>
          <dt>Last edit</dt>
          <dd>
            <span className={styles.lastEdit}>{lastEdited}</span>
            {lastEditor ? (
              <span className={styles.lastEditor}>by {lastEditor}</span>
            ) : null}
          </dd>
        </div>
        <div className={styles.metaCell}>
          <dt>Source</dt>
          <dd className={styles.locale}>{sourceLocale}</dd>
        </div>
      </dl>
    </article>
  )
}

export default StringKeyRow
