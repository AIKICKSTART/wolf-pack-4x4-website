import type { Metadata } from "next"

import { PageHeader } from "../../components/page-header"
import {
  AgentLoopCard,
  ChainStepRow,
  CostProjectionTile,
  EvalRunnerCard,
  FlowCanvas,
  FlowTriggerCard,
  ModelSelector,
  OutputGate,
  ParallelBranch,
  PromptBlock,
  PromptVersionHistory,
  SafetyCheckBlock,
  ToolBlock,
  VectorSearchBlock,
} from "../../components/ai-workflow"

import {
  BLOG_PARALLEL_LANES,
  QUOTE_CHAIN_STEPS,
  QUOTE_COST_TREND_USD,
  QUOTE_EVAL_AXES,
  QUOTE_EVAL_SAMPLES,
  QUOTE_FLOW_EDGES,
  QUOTE_FLOW_NODES,
  QUOTE_GATE_LOG,
  QUOTE_GATE_SCHEMA,
  QUOTE_PROMPT_VARS,
  QUOTE_SAFETY_RULES,
  QUOTE_SYSTEM_PROMPT,
  QUOTE_TOOL_MAPPINGS,
  QUOTE_TOOL_SCHEMA,
  QUOTE_TRIGGER_PAYLOAD,
  QUOTE_USER_PROMPT,
  QUOTE_VECTOR_HITS,
  QUOTE_VERSIONS,
  TRIAGE_LOOP_ITERATIONS,
} from "../_mock-data"
import styles from "../ai-workflow.module.css"

export const metadata: Metadata = {
  title: "Full AI workflow studio | AI workflow",
  description:
    "Composed AI workflow studio — trigger + canvas + prompt + model + RAG + chain + gate + eval + loop + cost + safety + history.",
}

export default function FullBuilderScenePage() {
  return (
    <main className={styles.main}>
      <PageHeader
        kicker="Composition / Full studio"
        title="Full AI workflow studio"
        description="The composed builder — every primitive in the family wired together for the Quote estimator workflow. Trigger fires, RAG grounds, prompt assembles, the model drafts, the gate validates and the tool persists. Eval, cost and version history sit alongside so the team can iterate without leaving the canvas."
        crumbs={[
          { label: "UI Primitives", href: "/ui-primitives" },
          { label: "AI workflow", href: "/ui-primitives/ai-workflow" },
          { label: "Full builder" },
        ]}
      />

      <span className={styles.notice}>
        Visual reference only — no real models invoked
      </span>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>Trigger · armed · live</span>
        <div className={styles.headerStrip}>
          <FlowTriggerCard
            title="Shopify quote-request"
            kind="webhook"
            config="POST /hooks/shopify/quote"
            lastFiredLabel="09:14 AEST"
            invocations7d={1246}
            samplePayload={QUOTE_TRIGGER_PAYLOAD}
            armed
          />
          <CostProjectionTile
            title="Quote estimator"
            modelId="claude-opus-4.7"
            inputTokensPerRun={1820}
            outputTokensPerRun={620}
            runsPerDay={142}
            trendUsd={QUOTE_COST_TREND_USD}
            currency="AUD"
          />
          <ModelSelector
            kicker="Active node model"
            models={[
              "claude-opus-4.7",
              "gpt-4o-2024",
              "gemini-2.5-flash",
              "llama-3.3-70b",
            ]}
            defaultSelectedId="claude-opus-4.7"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Canvas · quote estimator · model node mid-stream
        </span>
        <FlowCanvas
          nodes={QUOTE_FLOW_NODES}
          edges={QUOTE_FLOW_EDGES}
          selectedNodeId="n5"
          ariaLabel="Composed quote estimator canvas"
        />
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Inputs · prompt + RAG · selected node
        </span>
        <div className={styles.builderTop}>
          <PromptBlock
            title="Quote estimator prompt"
            kicker="v3.2 · live"
            systemPrompt={QUOTE_SYSTEM_PROMPT}
            userPrompt={QUOTE_USER_PROMPT}
            variables={QUOTE_PROMPT_VARS}
            tokenBudget={8000}
          />
          <VectorSearchBlock
            title="Parts catalogue · fitment context"
            embeddingModel="text-embedding-3-large"
            indexName="parts-catalogue-2026"
            topK={4}
            rerankEnabled
            rerankModel="cohere-rerank-3"
            hits={QUOTE_VECTOR_HITS}
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Chain steps · live trace · running model node
        </span>
        <div className={styles.demoStack}>
          {QUOTE_CHAIN_STEPS.map((step, idx) => (
            <ChainStepRow
              key={step.id}
              index={idx}
              kind={step.kind}
              title={step.title}
              modelId={step.modelId}
              status={step.status}
              inputPreview={step.inputPreview}
              outputPreview={step.outputPreview}
              tokens={step.tokens}
              costUsd={step.costUsd}
              latencyMs={step.latencyMs}
            />
          ))}
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Gate + tool + safety · post-model surface
        </span>
        <div className={styles.builderMid}>
          <OutputGate
            title="Quote shape gate"
            strategy="json-schema"
            rulePreview={QUOTE_GATE_SCHEMA}
            passRate={0.92}
            evaluated={1846}
            log={QUOTE_GATE_LOG.slice(0, 3)}
          />
          <ToolBlock
            toolName="quote.create"
            schemaPreview={QUOTE_TOOL_SCHEMA}
            mappings={QUOTE_TOOL_MAPPINGS}
            retryPolicy="exponential · max 3"
            timeoutMs={4000}
          />
          <SafetyCheckBlock title="Safety guardrails" rules={QUOTE_SAFETY_RULES.slice(0, 3)} />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Parallel + loop · ensemble + agent
        </span>
        <div className={styles.builderTop}>
          <ParallelBranch
            title="Blog draft · 4-model race"
            join="race"
            lanes={BLOG_PARALLEL_LANES}
          />
          <AgentLoopCard
            title="SMS triage · Mick N80"
            goal="Identify intent, capture vehicle, run quote estimator, reply in one SMS."
            maxIterations={8}
            haltConditions={["goal-reached", "max-iterations", "budget-cap"]}
            iterations={TRIAGE_LOOP_ITERATIONS}
            haltedBy="goal-reached"
          />
        </div>
      </section>

      <section className={styles.demoSurface}>
        <span className={styles.demoLabel}>
          Eval + history · iteration loop
        </span>
        <div className={styles.builderBottom}>
          <EvalRunnerCard
            title="Quote estimator · v3.2"
            axes={QUOTE_EVAL_AXES}
            samples={QUOTE_EVAL_SAMPLES}
            lastRunLabel="Today 09:14"
            passThreshold={80}
          />
          <PromptVersionHistory
            title="Quote estimator"
            versions={QUOTE_VERSIONS}
          />
        </div>
      </section>
    </main>
  )
}
