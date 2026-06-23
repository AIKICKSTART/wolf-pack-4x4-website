"use client"

import { useId, useState } from "react"

import styles from "./fallback-rule-card.module.css"
import { type FallbackPolicy } from "./localization-deep-types"

export interface FallbackRuleCardProps {
  /** Locale this fallback chain serves, e.g. "zh-CN". */
  locale: string
  /** Ordered chain from first-resolved to last. Index 0 = locale itself. */
  initialChain: ReadonlyArray<string>
  /** Resolution policy when even the last fallback misses. */
  policy: FallbackPolicy
  /** Optional descriptive note shown beside the policy switcher. */
  note?: string
  /** Optional callback when the chain order changes. */
  onChainChange?: (chain: ReadonlyArray<string>) => void
  /** Optional callback when the policy changes. */
  onPolicyChange?: (policy: FallbackPolicy) => void
}

const POLICY_LABEL: Record<FallbackPolicy, string> = {
  "show-source": "Show source",
  "show-key": "Show key",
  "show-empty": "Show empty",
}

const POLICY_HELP: Record<FallbackPolicy, string> = {
  "show-source": "Render the en-AU source if the entire chain misses.",
  "show-key": "Render the literal translation key, e.g. cart.cta.confirm.",
  "show-empty": "Render an empty string. Best for hidden labels only.",
}

export function FallbackRuleCard({
  locale,
  initialChain,
  policy: initialPolicy,
  note,
  onChainChange,
  onPolicyChange,
}: FallbackRuleCardProps) {
  const groupId = useId()
  const [chain, setChain] = useState<ReadonlyArray<string>>(initialChain)
  const [policy, setPolicy] = useState<FallbackPolicy>(initialPolicy)

  const move = (index: number, direction: -1 | 1) => {
    const next = [...chain]
    const target = index + direction
    if (target < 0 || target >= next.length) return
    const tmp = next[index]
    const other = next[target]
    if (tmp === undefined || other === undefined) return
    next[index] = other
    next[target] = tmp
    setChain(next)
    onChainChange?.(next)
  }

  const handlePolicy = (nextPolicy: FallbackPolicy) => {
    setPolicy(nextPolicy)
    onPolicyChange?.(nextPolicy)
  }

  return (
    <article className={styles.wrap} aria-labelledby={`${groupId}-title`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Fallback chain</span>
        <h3 id={`${groupId}-title`} className={styles.title}>
          {locale}
        </h3>
      </header>

      <ol className={styles.chain} aria-label={`Fallback chain for ${locale}`}>
        {chain.map((tag, index) => {
          const isLocale = index === 0
          const isLast = index === chain.length - 1
          return (
            <li
              key={`${tag}-${index}`}
              className={styles.step}
              data-primary={isLocale}
            >
              <span className={styles.stepIndex}>{index + 1}</span>
              <span className={styles.stepTag}>{tag}</span>
              <span className={styles.stepRole}>
                {isLocale ? "Primary" : `Fallback ${index}`}
              </span>
              <div className={styles.stepActions}>
                <button
                  type="button"
                  className={styles.stepButton}
                  onClick={() => move(index, -1)}
                  disabled={index === 0}
                  aria-label={`Move ${tag} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.stepButton}
                  onClick={() => move(index, 1)}
                  disabled={isLast}
                  aria-label={`Move ${tag} down`}
                >
                  ↓
                </button>
              </div>
            </li>
          )
        })}
      </ol>

      <section className={styles.policy} aria-label="Final fallback policy">
        <div className={styles.policyHead}>
          <span className={styles.policyKicker}>Final policy</span>
          {note ? <span className={styles.policyNote}>{note}</span> : null}
        </div>
        <div className={styles.policyChoices} role="radiogroup" aria-label="Fallback policy">
          {(Object.keys(POLICY_LABEL) as ReadonlyArray<FallbackPolicy>).map((value) => {
            const selected = value === policy
            return (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={selected}
                className={styles.policyChoice}
                data-selected={selected}
                onClick={() => handlePolicy(value)}
              >
                <span className={styles.policyLabel}>{POLICY_LABEL[value]}</span>
                <span className={styles.policyHelp}>{POLICY_HELP[value]}</span>
              </button>
            )
          })}
        </div>
      </section>
    </article>
  )
}

export default FallbackRuleCard
