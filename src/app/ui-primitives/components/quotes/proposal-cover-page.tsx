import styles from "./proposal-cover-page.module.css"

interface ProposalCoverPageProps {
  projectTitle: string
  clientName: string
  proposalDate: string
  proposalNumber: string
  author: string
  authorRole: string
  footerNote: string
}

export function ProposalCoverPage({
  projectTitle,
  clientName,
  proposalDate,
  proposalNumber,
  author,
  authorRole,
  footerNote,
}: ProposalCoverPageProps) {
  return (
    <article className={styles.page} aria-labelledby="cover-page-title">
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.brand}>Oak Flats Mufflermen</span>
          <span className={styles.kicker}>Proposal · {proposalNumber}</span>
        </div>
        <div className={styles.heroMark} aria-hidden="true">
          <span>OFM</span>
        </div>
      </div>

      <header className={styles.head}>
        <span className={styles.preparedFor}>Prepared for</span>
        <p className={styles.client}>{clientName}</p>
        <h1 id="cover-page-title" className={styles.title}>{projectTitle}</h1>
      </header>

      <dl className={styles.meta}>
        <div>
          <dt>Proposal date</dt>
          <dd>{proposalDate}</dd>
        </div>
        <div>
          <dt>Proposal number</dt>
          <dd>{proposalNumber}</dd>
        </div>
        <div>
          <dt>Prepared by</dt>
          <dd>{author}<span>{authorRole}</span></dd>
        </div>
      </dl>

      <footer className={styles.footer}>
        <span className={styles.footerSwatch} aria-hidden="true" />
        <span className={styles.footerNote}>{footerNote}</span>
      </footer>
    </article>
  )
}

export default ProposalCoverPage
