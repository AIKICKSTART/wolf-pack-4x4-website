import styles from "./tone-of-voice-card.module.css"

export interface ToneVoiceExample {
  do: string
  dont: string
}

export interface ToneOfVoiceCardProps {
  attributes: ReadonlyArray<string>
  summary: string
  examples: ReadonlyArray<ToneVoiceExample>
}

export function ToneOfVoiceCard({ attributes, summary, examples }: ToneOfVoiceCardProps) {
  return (
    <article className={styles.card} aria-label="Voice and tone">
      <header className={styles.head}>
        <span className={styles.kicker}>Voice & tone</span>
        <h3 className={styles.title}>How Oak Flats speaks</h3>
        <p className={styles.summary}>{summary}</p>
      </header>
      <ul className={styles.attributeRow} aria-label="Voice attributes">
        {attributes.map((attribute) => (
          <li key={attribute} className={styles.attribute}>
            {attribute}
          </li>
        ))}
      </ul>
      <div className={styles.examples}>
        {examples.map((example, index) => (
          <div key={`${example.do}-${index}`} className={styles.exampleRow}>
            <div className={`${styles.example} ${styles.exampleDo}`}>
              <span className={styles.exampleHeader}>Do</span>
              <p className={styles.exampleBody}>{example.do}</p>
            </div>
            <div className={`${styles.example} ${styles.exampleDont}`}>
              <span className={styles.exampleHeader}>Don&apos;t</span>
              <p className={styles.exampleBody}>{example.dont}</p>
            </div>
          </div>
        ))}
      </div>
    </article>
  )
}
