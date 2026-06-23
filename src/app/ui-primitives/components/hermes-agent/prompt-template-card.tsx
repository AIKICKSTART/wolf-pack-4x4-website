import { FileText, GitBranch } from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { Sparkline } from "../charts/sparkline"
import { toneForScore } from "./hermes-agent-types"
import styles from "./prompt-template-card.module.css"

export interface PromptTemplateTestCase {
  id: string
  title: string
  passed: boolean
  /** Optional human description of the assertion. */
  assertion?: string
}

interface PromptTemplateCardProps {
  id: string
  /** Display title, e.g. "Quote acknowledgement". */
  title: string
  /** Category label. */
  category: string
  version: string
  /** The template body (with {{tokens}}). */
  body: string
  /** Test case results. */
  testCases: ReadonlyArray<PromptTemplateTestCase>
  /** Win rate against the previous version, 0..1. */
  winRate: number
  /** Sample size for the win-rate evaluation. */
  sampleSize: number
  /** Win-rate trend points. */
  winRateTrend?: ReadonlyArray<number>
  className?: string
}

function renderTemplate(body: string): ReactNode {
  const segments = body.split(/(\{\{[^}]+\}\})/g)
  return segments.map((segment, idx) => {
    if (/^\{\{[^}]+\}\}$/.test(segment)) {
      return (
        <span key={idx} className={styles.placeholder}>
          {segment}
        </span>
      )
    }
    return <span key={idx}>{segment}</span>
  })
}

export function PromptTemplateCard({
  id,
  title,
  category,
  version,
  body,
  testCases,
  winRate,
  sampleSize,
  winRateTrend,
  className,
}: PromptTemplateCardProps) {
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const passed = testCases.filter((tc) => tc.passed).length
  const winPct = Math.round(winRate * 100)
  const tone = toneForScore(winPct)
  return (
    <article
      className={classes}
      aria-label={`Prompt template ${title}`}
    >
      <header className={styles.head}>
        <div className={styles.titleBlock}>
          <span className={styles.kicker}>
            <FileText
              size={11}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 4 }}
            />
            {category} · {id}
          </span>
          <h4 className={styles.title}>{title}</h4>
        </div>
        <div className={styles.versionBlock}>
          <Chip
            icon={
              <GitBranch
                size={11}
                strokeWidth={2.4}
                aria-hidden="true"
              />
            }
            label={version}
            tone="teal"
          />
          <Chip
            label={`${passed}/${testCases.length} passing`}
            tone={passed === testCases.length ? "green" : "amber"}
          />
        </div>
      </header>

      <pre className={styles.body}>
        <code>{renderTemplate(body)}</code>
      </pre>

      <div className={styles.testCases}>
        <span className={styles.testCaseLabel}>
          Test cases · last suite run · 14:02 AEST
        </span>
        <ul className={styles.testList}>
          {testCases.map((tc) => (
            <li
              key={tc.id}
              className={styles.testItem}
              data-passed={tc.passed ? "true" : "false"}
            >
              <span
                className={styles.testStatus}
                aria-hidden="true"
              />
              <span>
                <div className={styles.testTitle}>{tc.title}</div>
                {tc.assertion ? (
                  <div className={styles.testMeta}>{tc.assertion}</div>
                ) : null}
              </span>
              <span className={styles.testMeta}>
                {tc.passed ? "PASS" : "FAIL"}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <footer className={styles.footer}>
        <div className={styles.winRate}>
          <span className={styles.winRateLabel}>
            Win-rate vs prev · n={sampleSize.toLocaleString()}
          </span>
          <span className={styles.winRateValue}>
            <Chip
              label={`${winPct}%`}
              tone={tone}
            />
          </span>
        </div>
        {winRateTrend && winRateTrend.length > 0 ? (
          <Sparkline
            points={[...winRateTrend]}
            tone={tone === "neutral" ? "teal" : tone}
            ariaLabel="Win-rate trend"
            width={140}
            height={36}
          />
        ) : null}
      </footer>
    </article>
  )
}

export default PromptTemplateCard
