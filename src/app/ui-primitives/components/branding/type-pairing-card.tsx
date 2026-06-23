import styles from "./type-pairing-card.module.css"

export interface TypePairingCardProps {
  pairingName: string
  headingFont: string
  bodyFont: string
  headingExample: string
  bodyExample: string
  rationale: string
}

export function TypePairingCard({
  pairingName,
  headingFont,
  bodyFont,
  headingExample,
  bodyExample,
  rationale,
}: TypePairingCardProps) {
  return (
    <article className={styles.card}>
      <header className={styles.head}>
        <span className={styles.kicker}>Type pairing</span>
        <h3 className={styles.pairingName}>{pairingName}</h3>
      </header>
      <div className={styles.sample}>
        <h4 className={styles.heading} style={{ fontFamily: headingFont }}>
          {headingExample}
        </h4>
        <p className={styles.body} style={{ fontFamily: bodyFont }}>
          {bodyExample}
        </p>
      </div>
      <dl className={styles.spec}>
        <div>
          <dt>Display</dt>
          <dd>{headingFont}</dd>
        </div>
        <div>
          <dt>Body</dt>
          <dd>{bodyFont}</dd>
        </div>
      </dl>
      <p className={styles.rationale}>{rationale}</p>
    </article>
  )
}
