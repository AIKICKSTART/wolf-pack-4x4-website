import { Activity, Coins, TrendingUp } from "lucide-react"

import { Chip } from "../primitives/chip"
import { ProgressLinear } from "../primitives/progress-linear"
import type { ProgressLinearTone } from "../primitives/progress-linear"
import { ProgressRadial } from "../primitives/progress-radial"
import type { ProgressRadialTone } from "../primitives/progress-radial"
import { BarChart } from "../charts/bar-chart"
import { toneForScore, type HermesTone } from "./hermes-agent-types"
import styles from "./cost-budget-panel.module.css"

interface CostBudgetPanelProps {
  /** Window label, e.g. "Today" or "Last 24h". */
  windowLabel: string
  /** Spend so far in cents. */
  spentCents: number
  /** Budget cap in cents. */
  budgetCents: number
  /** Projected end-of-window spend in cents. */
  projectedCents: number
  /** Tokens consumed in the window. */
  tokensUsed: number
  /** Cost per conversation in cents (rolling average). */
  costPerConversationCents: number
  /** Burn-rate samples by hour bucket (24 buckets). */
  hourlyCents: ReadonlyArray<number>
  className?: string
}

const RADIAL_TONE: Record<HermesTone, ProgressRadialTone> = {
  neutral: "neutral",
  red: "red",
  amber: "amber",
  teal: "teal",
  green: "green",
}

function formatCents(cents: number): string {
  return `$${(cents / 100).toFixed(2)}`
}

export function CostBudgetPanel({
  windowLabel,
  spentCents,
  budgetCents,
  projectedCents,
  tokensUsed,
  costPerConversationCents,
  hourlyCents,
  className,
}: CostBudgetPanelProps) {
  const classes = [styles.panel, className].filter(Boolean).join(" ")
  const burnPct = budgetCents > 0
    ? Math.min(100, Math.round((spentCents / budgetCents) * 100))
    : 0
  const projectedPct = budgetCents > 0
    ? Math.min(140, Math.round((projectedCents / budgetCents) * 100))
    : 0
  // Inverse score: lower burn = better. We map low burn → green, high burn → red.
  const burnTone: HermesTone = toneForScore(100 - burnPct)
  const overBudget = projectedCents > budgetCents

  const radialTone = RADIAL_TONE[burnTone]
  const linearTone: ProgressLinearTone =
    radialTone === "neutral" ? "teal" : radialTone

  return (
    <section
      className={classes}
      role="region"
      aria-label="Cost budget panel"
    >
      <header className={styles.head}>
        <div>
          <h3 className={styles.title}>
            <Coins
              size={13}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 6 }}
            />
            Token budget · {windowLabel}
          </h3>
          <span className={styles.kicker}>
            <Activity
              size={10}
              strokeWidth={2.4}
              aria-hidden="true"
              style={{ marginInlineEnd: 4 }}
            />
            Burn rate per hour · projected end-of-day
          </span>
        </div>
        <Chip
          label={overBudget ? "Projected overrun" : "Within budget"}
          tone={overBudget ? "red" : burnTone}
        />
      </header>

      <div className={styles.layout}>
        <div className={styles.gauge}>
          <ProgressRadial
            value={burnPct}
            max={100}
            tone={radialTone}
            size="lg"
            showLabel
            label={`${burnPct}% of budget burned`}
          />
        </div>
        <div className={styles.stats}>
          <div className={styles.statRow}>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Spent</span>
              <span className={styles.statValue}>
                {formatCents(spentCents)}
                <small>of {formatCents(budgetCents)}</small>
              </span>
            </div>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Tokens</span>
              <span className={styles.statValue}>
                {tokensUsed.toLocaleString()}
              </span>
            </div>
          </div>
          <div>
            <span className={styles.statLabel}>Burn rate vs cap</span>
            <ProgressLinear
              value={burnPct}
              max={100}
              tone={linearTone}
              variant="segmented"
              segments={20}
            />
          </div>
          <div className={styles.projection}>
            <span className={styles.projectionLabel}>
              <TrendingUp
                size={11}
                strokeWidth={2.4}
                aria-hidden="true"
                style={{ marginInlineEnd: 4 }}
              />
              Projected end of {windowLabel.toLowerCase()}
            </span>
            <span className={styles.projectionValue}>
              {formatCents(projectedCents)}{" "}
              <small style={{ fontSize: 11, color: "var(--primitive-muted)" }}>
                · {projectedPct}% of cap
              </small>
            </span>
          </div>
          <div className={styles.statBlock}>
            <span className={styles.statLabel}>Cost / conversation</span>
            <span className={styles.statValue}>
              {formatCents(costPerConversationCents)}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.tail}>
        <BarChart
          series={[
            {
              label: "Hourly burn",
              values: [...hourlyCents].map((cents) => cents / 100),
              tone: linearTone,
            },
          ]}
          xLabels={hourlyCents.map((_, idx) =>
            `${String(idx).padStart(2, "0")}h`,
          )}
          ariaLabel="Hourly spend in AUD"
          unit="$"
          height={140}
          valueLabels={false}
        />
        <div className={styles.legend}>
          <span>
            <span
              className={styles.legendDot}
              style={{ background: "var(--primitive-teal)" }}
              aria-hidden="true"
            />
            Burn rate
          </span>
          <span>
            <span
              className={styles.legendDot}
              style={{ background: "var(--primitive-amber)" }}
              aria-hidden="true"
            />
            Cap · {formatCents(budgetCents)}
          </span>
        </div>
      </div>
    </section>
  )
}

export default CostBudgetPanel
