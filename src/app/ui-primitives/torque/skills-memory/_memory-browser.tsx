"use client"

import { useMemo, useState } from "react"

import { ApiScopeChip } from "../../components/permissions/api-scope-chip"
import { Avatar } from "../../components/primitives/avatar"
import { Chip } from "../../components/primitives/chip"
import { ProgressRadial } from "../../components/primitives/progress-radial"
import { StatusBadge } from "../../components/data-display/status-badge-grid"

import styles from "./skills-memory.module.css"
import {
  confidenceTone,
  FACT_SCOPE_ACTION,
  FACT_SCOPE_LABEL,
  FACT_SCOPE_TONE,
  MEMORY_FACTS,
  type FactScope,
  type MemoryFact,
} from "./_demo-data"

type ScopeFilter = "all" | FactScope

const SCOPE_FILTERS: ReadonlyArray<ScopeFilter> = ["all", "public", "team", "private"]

const SCOPE_FILTER_LABEL: Readonly<Record<ScopeFilter, string>> = {
  all: "All",
  public: "Customer-facing",
  team: "Bay crew",
  private: "Owner only",
}

interface FactCardProps {
  fact: MemoryFact
}

/**
 * One memory fact: the learned statement, a topic chip, the source (avatar +
 * label), a scope ACL chip describing who can read it, and a confidence ring.
 */
function FactCard({ fact }: FactCardProps) {
  const tone = confidenceTone(fact.confidence)

  return (
    <li className={styles.factCard} data-scope={fact.scope}>
      <div className={styles.factBody}>
        <div className={styles.factTopRow}>
          <Chip label={fact.topic} tone="neutral" />
          <StatusBadge
            tone={FACT_SCOPE_TONE[fact.scope]}
            size="sm"
            shape="pill"
            label={FACT_SCOPE_LABEL[fact.scope]}
          />
        </div>

        <p className={styles.factStatement}>{fact.statement}</p>

        <div className={styles.factMetaRow}>
          <span className={styles.factSource}>
            <Avatar name={fact.source.label} tone={fact.source.avatarTone} size="sm" />
            <span className={styles.factSourceText}>
              <span className={styles.factSourceLabel}>{fact.source.label}</span>
              <time className={styles.factConfirmed} dateTime={fact.confirmedIso}>
                {fact.confirmed}
              </time>
            </span>
          </span>

          <ApiScopeChip
            scope={`memory.${fact.scope}`}
            description={`Readable by: ${FACT_SCOPE_LABEL[fact.scope]}`}
            action={FACT_SCOPE_ACTION[fact.scope]}
          />
        </div>
      </div>

      <div className={styles.factConfidence}>
        <ProgressRadial
          value={fact.confidence}
          tone={tone}
          size="md"
          showLabel
          label={`Confidence ${fact.confidence}%`}
        />
        <span className={styles.factConfidenceLabel}>Confidence</span>
      </div>
    </li>
  )
}

/**
 * Memory browser (right column): a scope filter, an at-a-glance ACL legend and
 * the list of learned facts. Filter state is local interactive client state.
 */
export function MemoryBrowser() {
  const [filter, setFilter] = useState<ScopeFilter>("all")

  const visible = useMemo(
    () => (filter === "all" ? MEMORY_FACTS : MEMORY_FACTS.filter((fact) => fact.scope === filter)),
    [filter],
  )

  return (
    <section className={styles.panel} aria-labelledby="memory-title">
      <header className={styles.panelHead}>
        <span className={styles.panelText}>
          <span className={styles.panelKicker}>Memory facts</span>
          <h2 id="memory-title" className={styles.panelTitle}>
            What Torque remembers
          </h2>
          <p className={styles.panelDesc}>
            The knowledge the assistant holds about the workshop — where each fact came from, who is
            allowed to read it, and how sure Torque is. Owner-only facts never reach a customer.
          </p>
        </span>
        <span className={styles.panelTally} aria-live="polite">
          <strong className={styles.num}>{visible.length}</strong>
          <span>facts</span>
        </span>
      </header>

      <div className={styles.filterRow} role="group" aria-label="Filter facts by scope">
        {SCOPE_FILTERS.map((value) => (
          <Chip
            key={value}
            label={SCOPE_FILTER_LABEL[value]}
            tone={value === "private" ? "amber" : value === "public" ? "green" : "neutral"}
            selected={filter === value}
            onSelect={() => setFilter(value)}
          />
        ))}
      </div>

      {visible.length === 0 ? (
        <p className={styles.emptyNote}>No facts at this scope yet.</p>
      ) : (
        <ul className={styles.factList}>
          {visible.map((fact) => (
            <FactCard key={fact.id} fact={fact} />
          ))}
        </ul>
      )}
    </section>
  )
}

export default MemoryBrowser
