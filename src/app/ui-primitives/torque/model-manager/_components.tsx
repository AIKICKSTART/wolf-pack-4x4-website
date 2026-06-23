"use client"

import { useMemo, useState } from "react"

import { ModelSelector } from "../../components/ai/model-selector"
import { TokenUsageChip } from "../../components/ai/token-usage-chip"
import { Sparkline } from "../../components/charts/sparkline"
import type { SparklineTone } from "../../components/charts/sparkline"
import { DataTable } from "../../components/data-display/data-table"
import type { DataTableColumn } from "../../components/data-display/data-table"
import { StatusBadge } from "../../components/data-display/status-badge-grid"
import type { StatusBadgeTone } from "../../components/data-display/status-badge-grid"
import { DateRangePresets } from "../../components/reports/date-range-presets"

import styles from "./model-manager.module.css"
import {
  BUSINESS_NAME,
  BUSINESS_REGION,
  DATE_RANGES,
  DEFAULT_MODEL_ID,
  MODEL_USAGE_ROWS,
  MODEL_USAGE,
  REPORTING_PERIOD,
  TORQUE_MODELS,
  type ModelUsageCard,
  type ModelUsageRow,
} from "./_demo-data"

const RANGE_NOTE: Record<string, string> = {
  "7d": "Last 7 days — 22–28 May 2026",
  "28d": "This reporting period — 1–28 May 2026",
  qtr: "Autumn quarter — Mar–May FY26",
  ytd: "Year to date — since 1 Jan 2026",
}

const HEALTH_LABEL: Record<ModelUsageCard["health"], string> = {
  live: "Live",
  fallback: "Fallback",
  paused: "Paused",
}

const HEALTH_CLASS: Record<ModelUsageCard["health"], string> = {
  live: styles.healthLive,
  fallback: styles.healthFallback,
  paused: styles.healthPaused,
}

const tokenFormatter = new Intl.NumberFormat("en-AU")
const tableNumberFormatter = new Intl.NumberFormat("en-AU")

const STATUS_TONE: Record<ModelUsageRow["status"], StatusBadgeTone> = {
  Live: "success",
  Fallback: "warn",
  Paused: "neutral",
}

const TIER_TONE: Record<ModelUsageRow["tier"], StatusBadgeTone> = {
  Opus: "brand",
  Sonnet: "info",
  Haiku: "success",
  Flash: "neutral",
}

function formatTokens(value: number): string {
  return `${(value / 1_000_000).toFixed(2)}M`
}

/**
 * Manager control band: placeholder circular Torque avatar (initial "T" on a
 * brand-red gradient — real mascot lands later), the business identity, the
 * live default-model selector, and the reporting-period control. State is
 * interactive client state only; it narrates the choice without re-fetching the
 * demo fixtures.
 */
export function ModelManagerControlBand() {
  const [defaultModel, setDefaultModel] = useState<string>(DEFAULT_MODEL_ID)
  const [rangeId, setRangeId] = useState<string>("28d")

  const selected = useMemo(
    () => TORQUE_MODELS.find((model) => model.id === defaultModel) ?? TORQUE_MODELS[0],
    [defaultModel],
  )
  const note = RANGE_NOTE[rangeId] ?? `Reporting period — ${REPORTING_PERIOD}`

  return (
    <section className={styles.controlBand} aria-label="Model manager identity and controls">
      <div className={styles.identity}>
        <span className={styles.torqueAvatar} aria-hidden="true">
          <span>T</span>
        </span>
        <span className={styles.identityText}>
          <span className={styles.torqueName}>Torque · Model manager</span>
          <span className={styles.bizName}>{BUSINESS_NAME}</span>
          <span className={styles.bizRegion}>{BUSINESS_REGION}</span>
        </span>
      </div>

      <div className={styles.controlStack}>
        <div className={styles.controlGroup}>
          <span className={styles.controlLabel} id="default-model-label">
            Default model
          </span>
          <ModelSelector
            models={TORQUE_MODELS}
            selectedId={defaultModel}
            onSelect={setDefaultModel}
          />
          <p className={styles.controlNote} role="status" aria-live="polite">
            New jobs route to <strong>{selected.name}</strong> · {selected.contextWindow} ctx ·{" "}
            {selected.costPerMillion} / 1M tokens
          </p>
        </div>

        <div className={styles.controlGroup}>
          <span className={styles.controlLabel} id="range-label">
            Reporting period
          </span>
          <DateRangePresets presets={DATE_RANGES} initialPresetId="28d" onSelect={setRangeId} />
          <p className={styles.controlNote} role="status" aria-live="polite">
            {note}
          </p>
        </div>
      </div>
    </section>
  )
}

interface ModelUsageCardListProps {
  cards: ReadonlyArray<ModelUsageCard>
}

/**
 * Per-model usage cards: the model name + role, a token-usage meter against the
 * model's slice of the budget, request volume, cost-to-date, a 7-day request
 * sparkline, and a health pill. The card matching the default route is flagged.
 */
export function ModelUsageCardList({ cards }: ModelUsageCardListProps) {
  return (
    <ul className={styles.cardList}>
      {cards.map((card) => {
        const model = TORQUE_MODELS.find((m) => m.id === card.id)
        const isDefault = card.id === DEFAULT_MODEL_ID
        return (
          <li key={card.id} className={styles.usageCard} data-default={isDefault ? "true" : "false"}>
            <div className={styles.usageHead}>
              <div className={styles.usageTitleGroup}>
                <h3 className={styles.usageName}>
                  {model?.name ?? card.id}
                  {isDefault ? <span className={styles.defaultTag}>Default</span> : null}
                </h3>
                <p className={styles.usageRole}>{card.role}</p>
              </div>
              <span className={`${styles.healthPill} ${HEALTH_CLASS[card.health]}`}>
                <span className={styles.healthDot} aria-hidden="true" />
                {HEALTH_LABEL[card.health]}
              </span>
            </div>

            <TokenUsageChip
              used={card.tokensUsed}
              budget={card.tokenBudget}
              label="Tokens"
              className={styles.usageMeter}
            />

            <dl className={styles.usageStats}>
              <div className={styles.usageStat}>
                <dt>Requests</dt>
                <dd>{tokenFormatter.format(card.requests)}</dd>
              </div>
              <div className={styles.usageStat}>
                <dt>Cost (28d)</dt>
                <dd>{card.costToDate}</dd>
              </div>
              <div className={styles.usageStat}>
                <dt>Per 1M</dt>
                <dd>{model?.costPerMillion ?? "—"}</dd>
              </div>
            </dl>

            <div className={styles.usageSpark}>
              <span className={styles.usageSparkLabel}>7-day requests</span>
              <Sparkline
                points={[...card.spark]}
                tone={card.sparkTone}
                width={160}
                height={34}
                ariaLabel={`${model?.name ?? card.id} request volume over the last 7 days`}
              />
            </div>
          </li>
        )
      })}
    </ul>
  )
}

interface TrendCellProps {
  points: ReadonlyArray<number>
  tone: SparklineTone
  label: string
}

/** Inline sparkline cell for the per-model usage table. */
export function TrendCell({ points, tone, label }: TrendCellProps) {
  return (
    <span className={styles.trendCell}>
      <Sparkline
        points={[...points]}
        tone={tone}
        width={96}
        height={28}
        ariaLabel={`${label} token usage over the last 7 days`}
      />
    </span>
  )
}

const MODEL_USAGE_COLUMNS: ReadonlyArray<DataTableColumn<ModelUsageRow>> = [
  {
    id: "model",
    header: "Model",
    cell: (row) => (
      <span className={styles.modelCell}>
        <span className={styles.modelName}>{row.model}</span>
        <span className={styles.modelRoute}>{row.route}</span>
      </span>
    ),
  },
  {
    id: "tier",
    header: "Tier",
    cell: (row) => <StatusBadge tone={TIER_TONE[row.tier]} size="sm" shape="pill" label={row.tier} />,
  },
  {
    id: "tokens",
    header: "Tokens",
    align: "right",
    sortable: true,
    cell: (row) => <span className={styles.num}>{formatTokens(row.tokens)}</span>,
  },
  {
    id: "requests",
    header: "Requests",
    align: "right",
    sortable: true,
    cell: (row) => <span className={styles.num}>{tableNumberFormatter.format(row.requests)}</span>,
  },
  {
    id: "cost",
    header: "Cost (28d)",
    align: "right",
    sortable: true,
    cell: (row) => <span className={styles.num}>{row.cost}</span>,
  },
  {
    id: "status",
    header: "Status",
    cell: (row) => (
      <StatusBadge tone={STATUS_TONE[row.status]} size="sm" shape="pill" label={row.status} />
    ),
  },
  {
    id: "trend",
    header: "7d tokens",
    align: "right",
    cell: (row) => <TrendCell points={row.trend} tone={row.trendTone} label={row.model} />,
  },
]

interface ModelUsageTableProps {
  rows?: ReadonlyArray<ModelUsageRow>
}

/** Client-side table wrapper keeps render callbacks inside the client boundary. */
export function ModelUsageTable({ rows = MODEL_USAGE_ROWS }: ModelUsageTableProps) {
  return (
    <DataTable
      rows={[...rows]}
      columns={MODEL_USAGE_COLUMNS}
      getRowId={(row) => row.id}
      density="comfortable"
      caption="Token, request and cost usage per Torque model"
      kicker="Sorted by tokens"
      zebra
    />
  )
}

/** Default export keeps the per-model card list reusable from the page. */
export function ModelUsageCards() {
  return <ModelUsageCardList cards={MODEL_USAGE} />
}
