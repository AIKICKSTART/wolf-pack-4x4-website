import {
  ArrowRightCircle,
  CalendarPlus,
  Coins,
  PackageSearch,
  Receipt,
  Shield,
  ShieldAlert,
} from "lucide-react"
import type { ReactNode } from "react"

import { Chip } from "../primitives/chip"
import { Sparkline } from "../charts/sparkline"
import {
  TOOL_DESCRIPTION,
  TOOL_LABEL,
  type HermesTone,
  type HermesToolName,
} from "./hermes-agent-types"
import styles from "./tool-palette.module.css"

export interface ToolPaletteEntry {
  name: HermesToolName
  /** Successful invocations over the last 24h. */
  usage24h: number
  /** Median latency in ms. */
  medianLatencyMs: number
  /** Failure rate 0..1. */
  failureRate: number
  /** Trend points (last 12 buckets). */
  trend: ReadonlyArray<number>
  /** Whether the tool is enabled. */
  enabled?: boolean
  /** Override the accent tone. */
  tone?: HermesTone
}

interface ToolPaletteProps {
  tools: ReadonlyArray<ToolPaletteEntry>
  className?: string
}

const TOOL_ICON: Record<HermesToolName, ReactNode> = {
  "quote.estimate": <Receipt size={16} strokeWidth={2.2} aria-hidden="true" />,
  "parts.search": <PackageSearch size={16} strokeWidth={2.2} aria-hidden="true" />,
  "bookings.create": <CalendarPlus size={16} strokeWidth={2.2} aria-hidden="true" />,
  "payment.collect": <Coins size={16} strokeWidth={2.2} aria-hidden="true" />,
  "refund.process": <ShieldAlert size={16} strokeWidth={2.2} aria-hidden="true" />,
  "escalate.to_human": <ArrowRightCircle size={16} strokeWidth={2.2} aria-hidden="true" />,
}

const DEFAULT_TONE: Record<HermesToolName, HermesTone> = {
  "quote.estimate": "teal",
  "parts.search": "teal",
  "bookings.create": "green",
  "payment.collect": "amber",
  "refund.process": "red",
  "escalate.to_human": "amber",
}

function formatLatency(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`
  return `${(ms / 1000).toFixed(2)}s`
}

function formatRate(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`
}

export function ToolPalette({ tools, className }: ToolPaletteProps) {
  const classes = [styles.palette, className].filter(Boolean).join(" ")
  const enabledCount = tools.filter((tool) => tool.enabled !== false).length

  return (
    <section
      className={classes}
      role="region"
      aria-label="Hermes tool palette"
    >
      <header className={styles.head}>
        <h3 className={styles.title}>Tool palette</h3>
        <span className={styles.subtitle}>
          <Shield size={11} strokeWidth={2.2} aria-hidden="true" />{" "}
          {enabledCount} of {tools.length} enabled
        </span>
      </header>
      <ul
        className={styles.grid}
        aria-label="Available tools"
        style={{ listStyle: "none", padding: 0, margin: 0 }}
      >
        {tools.map((tool) => {
          const tone = tool.tone ?? DEFAULT_TONE[tool.name]
          const disabled = tool.enabled === false
          return (
            <li
              key={tool.name}
              className={styles.card}
              data-tone={tone}
              data-disabled={disabled ? "true" : "false"}
            >
              <div className={styles.head2}>
                <span className={styles.icon} aria-hidden="true">
                  {TOOL_ICON[tool.name]}
                </span>
                <Chip
                  label={disabled ? "Disabled" : "Enabled"}
                  tone={disabled ? "neutral" : "green"}
                />
              </div>
              <h4 className={styles.name}>{TOOL_LABEL[tool.name]}</h4>
              <p className={styles.desc}>{TOOL_DESCRIPTION[tool.name]}</p>
              <div className={styles.stats}>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>Usage / 24h</span>
                  <span className={styles.statValue}>
                    {tool.usage24h.toLocaleString()}
                  </span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statLabel}>p50 latency</span>
                  <span className={styles.statValue}>
                    {formatLatency(tool.medianLatencyMs)}
                  </span>
                </div>
              </div>
              <Sparkline
                points={[...tool.trend]}
                tone={
                  tone === "neutral"
                    ? "teal"
                    : (tone as "red" | "amber" | "teal" | "green")
                }
                ariaLabel={`${TOOL_LABEL[tool.name]} usage trend, last 12 buckets`}
                height={28}
                width={200}
              />
              <div className={styles.footer}>
                <span>Failure {formatRate(tool.failureRate)}</span>
                <span>Hermes · v1</span>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}

export default ToolPalette
