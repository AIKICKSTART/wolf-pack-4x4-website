/**
 * Agent workflow — Operations section.
 *
 * A production-ready page section composing the Hermes agent primitives into a
 * run-inspector surface: the live conversation, the step-by-step run timeline,
 * and the tool palette with usage telemetry. Shows how the workshop's
 * customer-facing AI assistant quotes, checks parts and books a fitting.
 *
 * Fully token-driven; CTAs use the metallic red→amber button DNA. Light/dark,
 * responsive 320→1920, reduced-motion (delegated to the primitives), a11y.
 *
 * Composed from (no primitives rebuilt — imported by path):
 *   - hermes-agent/AgentChatPanel, RunTimeline, ToolPalette
 */

import { AgentChatPanel } from "../../components/hermes-agent/agent-chat-panel"
import Link from "next/link"
import { RunTimeline } from "../../components/hermes-agent/run-timeline"
import { ToolPalette } from "../../components/hermes-agent/tool-palette"

import {
  AGENT_CHANNELS,
  AGENT_CHAT_TURNS,
  AGENT_RUN_STEPS,
  AGENT_SUGGESTED_PROMPTS,
  AGENT_TOOLS,
} from "./_mock-data"
import styles from "./sections-ops.module.css"

export interface AgentWorkflowSectionProps {
  kicker?: string
  title?: string
  lede?: string
  /** Primary CTA label (metallic red→amber button DNA). */
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

export function AgentWorkflowSection({
  kicker = "Hermes agent",
  title = "One message, the whole job done",
  lede = "Watch Hermes — the Oak Flats assistant — quote a cat-back, check parts and hold a fitting slot, every step traced and on the record.",
  ctaLabel = "Open Hermes console",
  ctaHref = "/ui-primitives/hermes-agent",
  className,
}: AgentWorkflowSectionProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section
      className={classes}
      aria-labelledby="ops-agent-title"
      role="region"
    >
      <header className={styles.sectionHead}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 id="ops-agent-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.lede}>{lede}</p>
        <div className={styles.agentMetaRow}>
          <span className={styles.agentChip}>Run #RUN-4821</span>
          <span className={styles.agentChip}>5 steps</span>
          <span className={`${styles.agentChip} ${styles.agentChipAccent}`}>
            Tools live
          </span>
        </div>
        <div className={styles.actionRow}>
          <a className={styles.ctaPrimary} href={ctaHref}>
            {ctaLabel}
          </a>
          <Link className={styles.ctaSecondary} href="/ui-primitives/workflow-engine">
            Workflow engine
          </Link>
        </div>
      </header>

      <div className={styles.agentSplit}>
        <AgentChatPanel
          customerName="Jordan M."
          customerMeta="2018 Hilux N80 · Web chat"
          channels={AGENT_CHANNELS}
          turns={AGENT_CHAT_TURNS}
          suggestedPrompts={AGENT_SUGGESTED_PROMPTS}
          readOnlyNotice="Hermes drafts; the front desk approves before anything is sent."
        />
        <div className={styles.agentStack}>
          <RunTimeline
            runId="RUN-4821"
            customerName="Jordan M."
            steps={AGENT_RUN_STEPS}
            tokenTotal={3840}
            costCents={6}
            totalDurationMs={4870}
          />
          <ToolPalette tools={AGENT_TOOLS} />
        </div>
      </div>
    </section>
  )
}

export default AgentWorkflowSection
