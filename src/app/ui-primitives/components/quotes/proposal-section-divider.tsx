import type { QuoteTone } from "./quote-types"
import styles from "./proposal-section-divider.module.css"

interface ProposalSectionDividerProps {
  sectionNumber: string
  title: string
  subtitle?: string
  tone?: QuoteTone
}

const TONE_CLASS: Record<QuoteTone, string> = {
  neutral: styles.toneNeutral,
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
}

export function ProposalSectionDivider({
  sectionNumber,
  title,
  subtitle,
  tone = "amber",
}: ProposalSectionDividerProps) {
  return (
    <div className={[styles.divider, TONE_CLASS[tone]].join(" ")}>
      <span className={styles.number} aria-hidden="true">{sectionNumber}</span>
      <div className={styles.body}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
      </div>
      <span className={styles.rule} aria-hidden="true" />
    </div>
  )
}

export default ProposalSectionDivider
