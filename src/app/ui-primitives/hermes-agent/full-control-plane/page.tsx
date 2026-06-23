"use client"

import { useState } from "react"

import { PageHeader } from "../../components/page-header"
import {
  AgentChatPanel,
  AutomationRuleCard,
  CostBudgetPanel,
  EscalationQueueCard,
  EvaluationRubricGrid,
  HandoffCard,
  KnowledgeSourceRow,
  LiveConversationRow,
  PersonaEditor,
  PromptTemplateCard,
  RunTimeline,
  SafetyFilterStrip,
  ToolPalette,
  TranscriptViewer,
} from "../../components/hermes-agent"
import { FadeIn } from "../../components/motion/fade-in"

import {
  HERMES_CHAT_TURNS,
  HERMES_COST_HOURLY,
  HERMES_ESCALATION,
  HERMES_ESCALATIONS,
  HERMES_FILTERS,
  HERMES_HOURS,
  HERMES_LIVE_CONVERSATIONS,
  HERMES_PROMPT_QUOTE_ACK_BODY,
  HERMES_PROMPT_TESTS,
  HERMES_REFUSAL_RULES,
  HERMES_RUBRIC_SAMPLES,
  HERMES_RULE_AFTER_HOURS,
  HERMES_RULE_QUOTE_FOLLOWUP,
  HERMES_RULE_REFUND_GUARD,
  HERMES_RUN_STEPS,
  HERMES_SYSTEM_PROMPT,
  HERMES_TONE_OPTIONS,
  HERMES_TOOL_PALETTE,
  HERMES_TRANSCRIPT_TURNS,
} from "../_mock-data"
import styles from "../hermes-agent.module.css"

export default function HermesFullControlPlanePage() {
  const [activeId, setActiveId] = useState<string>("c1")

  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Hermes operations console"
        title="Mufflermen Hermes control plane"
        description="The full Hermes operations console composed end-to-end — live conversation rail on the left, active chat in the middle, run inspector on the right, plus escalation queue, tool palette, automation rules, cost budget, safety filter chain, evaluation rubric, persona snapshot, prompt template winner, knowledge source health and a sampled transcript. Realistic Mick Davis Hilux scenario driving the centre."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "Hermes agent", href: "/ui-primitives/hermes-agent" },
          { label: "Full control plane" },
        ]}
      />

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Composition · Hermes v1.4 · operator Daniel · 5 live conversations
        </span>

        <FadeIn>
          <div className={styles.consoleShell}>
            <div className={styles.headerStrip}>
              <CostBudgetPanel
                windowLabel="Today"
                spentCents={284}
                budgetCents={480}
                projectedCents={412}
                tokensUsed={184_212}
                costPerConversationCents={42}
                hourlyCents={HERMES_COST_HOURLY}
              />
              <SafetyFilterStrip
                filters={HERMES_FILTERS}
                totalInspected={1846}
                totalBlocked={52}
                totalEscalated={18}
              />
              <EscalationQueueCard
                title="Escalation queue"
                items={HERMES_ESCALATIONS.slice(0, 3)}
                counts={{ open: 4, breached: 1, resolved24h: 18 }}
              />
            </div>

            <div className={styles.consoleGrid}>
              <div className={styles.consoleCol}>
                <section aria-label="Live conversations" className={styles.colStack}>
                  <h3 className={styles.colHeading}>Live conversations</h3>
                  {HERMES_LIVE_CONVERSATIONS.map((conv) => (
                    <LiveConversationRow
                      key={conv.id}
                      id={conv.id}
                      customerName={conv.customerName}
                      channel={conv.channel}
                      state={conv.state}
                      lastMessage={conv.lastMessage}
                      queueTimeSeconds={conv.queueTimeSeconds}
                      confidence={conv.confidence}
                      active={activeId === conv.id}
                      onSelect={setActiveId}
                    />
                  ))}
                </section>

                <ToolPalette tools={HERMES_TOOL_PALETTE.slice(0, 4)} />
              </div>

              <div className={styles.consoleCol}>
                <AgentChatPanel
                  customerName="Mick Davis"
                  customerMeta="Oak Flats NSW · web-chat · 14m on site"
                  channels={["web-chat", "sms"]}
                  turns={HERMES_CHAT_TURNS}
                  suggestedPrompts={[
                    "Confirm Bay 2 booking",
                    "Send fitment cheatsheet",
                    "Quote LPG conversion",
                  ]}
                />

                <HandoffCard
                  id="esc_9183"
                  customerName="Karen W."
                  channel="phone-voice"
                  priority="p1-critical"
                  reason="Refund > $200 AUD requested · disputed Manta DPF warranty claim."
                  assigneeName="Bec Singh"
                  assigneeRole="Front desk · manager"
                  slaRemainingMinutes={4}
                />
              </div>

              <div className={styles.consoleCol}>
                <RunTimeline
                  runId="run_8847"
                  customerName="Mick Davis"
                  steps={HERMES_RUN_STEPS}
                  tokenTotal={1843}
                  costCents={42}
                  totalDurationMs={3284}
                />

                <PersonaEditor
                  name="Hermes · v1.4"
                  version="v1.4"
                  systemPrompt={HERMES_SYSTEM_PROMPT}
                  toneOptions={HERMES_TONE_OPTIONS}
                  refusals={HERMES_REFUSAL_RULES.slice(0, 3)}
                  hours={HERMES_HOURS}
                  escalation={HERMES_ESCALATION.slice(0, 3)}
                  readOnly
                />
              </div>
            </div>

            <div className={styles.consoleSection}>
              <h3 className={styles.colHeading}>Knowledge sources</h3>
              <KnowledgeSourceRow
                id="kb-cms"
                title="Mufflermen CMS · workshop docs"
                kind="cms-docs"
                metadata="172 docs · /workshop-hours · /policies"
                status="synced"
                lastSyncLabel="00:14m"
                recordCount={172}
              />
              <KnowledgeSourceRow
                id="kb-manta"
                title="Manta supplier feed"
                kind="supplier-feed"
                metadata="Hourly poll · price + stock + lead time"
                status="syncing"
                lastSyncLabel="01:02m"
                recordCount={812}
                syncProgress={64}
              />
              <KnowledgeSourceRow
                id="kb-transcripts"
                title="Phone transcripts · 14d window"
                kind="transcripts"
                metadata="Whisper auto-transcription · OAuth Twilio"
                status="stale"
                lastSyncLabel="4d ago"
                recordCount={246}
              />
            </div>

            <div className={styles.headerStrip}>
              <AutomationRuleCard {...HERMES_RULE_QUOTE_FOLLOWUP} />
              <AutomationRuleCard {...HERMES_RULE_AFTER_HOURS} />
              <AutomationRuleCard {...HERMES_RULE_REFUND_GUARD} />
            </div>

            <div className={styles.demoSplit}>
              <PromptTemplateCard
                id="tpl_quote_ack"
                title="Quote acknowledgement · SMS"
                category="Sales"
                version="v2.1"
                body={HERMES_PROMPT_QUOTE_ACK_BODY}
                testCases={HERMES_PROMPT_TESTS}
                winRate={0.78}
                sampleSize={612}
                winRateTrend={[42, 48, 51, 56, 60, 65, 68, 72, 74, 76, 78, 79]}
              />
              <EvaluationRubricGrid
                title="Weekly QA sample"
                samplePeriod="27 May → 02 Jun 2026"
                samples={HERMES_RUBRIC_SAMPLES}
              />
            </div>

            <TranscriptViewer
              conversationId="conv_44521"
              customerName="Mick Davis"
              channel="web-chat"
              duration="8m 14s"
              outcomeLabel="Booked · Bay 2"
              turns={HERMES_TRANSCRIPT_TURNS}
            />
          </div>
        </FadeIn>
      </section>
    </main>
  )
}
