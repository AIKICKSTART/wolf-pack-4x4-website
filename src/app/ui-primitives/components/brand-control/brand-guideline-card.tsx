import { BookOpen, Check, Printer, X } from "lucide-react"
import type { ReactNode } from "react"

import type {
  BrandGuidelineRule,
  GuidelineSection,
} from "./brand-control-types"
import styles from "./brand-control.module.css"

interface BrandGuidelineCardProps {
  rule: BrandGuidelineRule
  printMode?: boolean
  className?: string
  /** Render the demo / illustration on the right. */
  illustration?: ReactNode
}

const SECTION_LABEL: Record<GuidelineSection, string> = {
  logo: "Logo usage",
  voice: "Voice",
  do: "Do",
  dont: "Don't",
}

const SECTION_TONE: Record<GuidelineSection, string> = {
  logo: styles.tagRed,
  voice: styles.tagAmber,
  do: styles.tagGreen,
  dont: styles.tagRed,
}

function SectionIcon({ section }: { section: GuidelineSection }) {
  if (section === "do") return <Check size={12} aria-hidden="true" />
  if (section === "dont") return <X size={12} aria-hidden="true" />
  return <BookOpen size={12} aria-hidden="true" />
}

/**
 * Brand guideline card — a single rule (logo clearspace, voice attribute,
 * do/don't) with a print-friendly variant for the brand book export.
 */
export function BrandGuidelineCard({
  rule,
  printMode = false,
  illustration,
  className,
}: BrandGuidelineCardProps) {
  const cardClasses = [
    styles.card,
    printMode && styles.cardElevated,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article
      className={cardClasses}
      aria-label={`Brand guideline — ${rule.title}`}
    >
      <header className={styles.head}>
        <div className={styles.headStack}>
          <span className={styles.kicker}>
            <span className={`${styles.tag} ${SECTION_TONE[rule.section]}`}>
              <SectionIcon section={rule.section} />
              {SECTION_LABEL[rule.section]}
            </span>
          </span>
          <h3 className={styles.title} style={{ fontSize: "var(--primitive-text-lg)" }}>
            {rule.title}
          </h3>
        </div>
        {printMode && (
          <span className={styles.tinyLabel}>
            <Printer size={11} aria-hidden="true" /> Print
          </span>
        )}
      </header>

      <p className={styles.subtitle} style={{ fontSize: "var(--primitive-text-sm)" }}>
        {rule.body}
      </p>

      {illustration && (
        <div className={styles.assetPreview} style={{ height: 120 }}>
          {illustration}
        </div>
      )}

      {rule.emphasis && (
        <p
          className={styles.livePreviewBody}
          style={{
            background: "color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)",
            padding: "var(--primitive-space-2) var(--primitive-space-3)",
            borderLeft: "3px solid var(--primitive-amber)",
            borderRadius: 6,
          }}
        >
          {rule.emphasis}
        </p>
      )}
    </article>
  )
}

export default BrandGuidelineCard
