import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "ai-workflow",
  "title": "AI workflow builder",
  "group": "AI",
  "summary": "14 primitives for composing and inspecting LLM agent workflows — flow canvas, prompt/model/tool/gate blocks, parallel branches, eval and cost surfaces, vector search, agent loops, version history, safety checks, and triggers. Shared WorkflowTone/Node typing and label/const maps.",
  "entries": [
    {
      "key": "ai-workflow/flow-canvas",
      "family": "ai-workflow",
      "name": "FlowCanvas",
      "label": "Flow canvas",
      "description": "Pannable/zoomable node-graph canvas rendering workflow nodes and edges with kind glyphs, status tones, selection, and an optional minimap.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/flow-canvas",
      "tags": [
        "graph",
        "canvas",
        "nodes",
        "workflow"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/prompt-block",
      "family": "ai-workflow",
      "name": "PromptBlock",
      "label": "Prompt block",
      "description": "Editable system/user prompt pair with in-scope variable chips and a live token-estimate budget indicator.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/prompt-block",
      "tags": [
        "prompt",
        "tokens",
        "variables"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/model-selector",
      "family": "ai-workflow",
      "name": "ModelSelector",
      "label": "Model selector",
      "description": "Selectable grid of model cards showing vendor, tier, speed, latency, and per-million cost, with controlled/uncontrolled selection.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/model-selector",
      "tags": [
        "model",
        "selector",
        "cost",
        "tier"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/tool-block",
      "family": "ai-workflow",
      "name": "ToolBlock",
      "label": "Tool block",
      "description": "Tool-call node showing the tool, a JSON schema preview, output-to-scope variable mappings, and optional retry/timeout policy.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/tool-block",
      "tags": [
        "tool",
        "schema",
        "mapping"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/output-gate",
      "family": "ai-workflow",
      "name": "OutputGate",
      "label": "Output gate",
      "description": "Validation gate card with strategy, rule/regex preview, pass-rate metrics, and a recent pass/warn/fail decision log.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/output-gate",
      "tags": [
        "gate",
        "validation",
        "pass-rate"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/parallel-branch",
      "family": "ai-workflow",
      "name": "ParallelBranch",
      "label": "Parallel branch",
      "description": "Fan-out node displaying concurrent lanes with per-lane status, latency, and score plus the join strategy used to merge them.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/parallel-branch",
      "tags": [
        "parallel",
        "fan-out",
        "join"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/eval-runner-card",
      "family": "ai-workflow",
      "name": "EvalRunnerCard",
      "label": "Eval runner card",
      "description": "Evaluation suite card scoring samples across weighted rubric axes with a data table and computed weighted-overall vs pass threshold.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/eval-runner-card",
      "tags": [
        "eval",
        "rubric",
        "scoring",
        "table"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/chain-step-row",
      "family": "ai-workflow",
      "name": "ChainStepRow",
      "label": "Chain step row",
      "description": "Single sequential chain step row with kind icon, model, status, input/output previews, and token/cost/latency figures.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/chain-step-row",
      "tags": [
        "chain",
        "step",
        "row",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/vector-search-block",
      "family": "ai-workflow",
      "name": "VectorSearchBlock",
      "label": "Vector search block",
      "description": "Vector retrieval node showing embedding model, index, top-K, optional rerank, and ranked hits with similarity/rerank scores.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/vector-search-block",
      "tags": [
        "vector",
        "retrieval",
        "embeddings",
        "rerank"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/agent-loop-card",
      "family": "ai-workflow",
      "name": "AgentLoopCard",
      "label": "Agent loop card",
      "description": "ReAct-style agent loop card with goal, iteration cap, halt conditions, a radial progress dial, and thought/action/observation iterations.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/agent-loop-card",
      "tags": [
        "agent",
        "loop",
        "react",
        "iterations"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/prompt-version-history",
      "family": "ai-workflow",
      "name": "PromptVersionHistory",
      "label": "Prompt version history",
      "description": "Versioned prompt changelog listing each version's author, summary, win-rate, run count, avg tokens, and a trend sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/prompt-version-history",
      "tags": [
        "versioning",
        "history",
        "win-rate",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/cost-projection-tile",
      "family": "ai-workflow",
      "name": "CostProjectionTile",
      "label": "Cost projection tile",
      "description": "Cost-forecast tile projecting per-run/day/month spend from token volumes and runs/day, with USD/AUD display and a daily-spend bar chart.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/cost-projection-tile",
      "tags": [
        "cost",
        "projection",
        "tokens",
        "chart"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/safety-check-block",
      "family": "ai-workflow",
      "name": "SafetyCheckBlock",
      "label": "Safety check block",
      "description": "Guardrail panel listing safety rules by kind/action with per-rule 24h inspection and hit counts and an enabled state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/safety-check-block",
      "tags": [
        "safety",
        "guardrails",
        "rules",
        "moderation"
      ],
      "status": "captured"
    },
    {
      "key": "ai-workflow/flow-trigger-card",
      "family": "ai-workflow",
      "name": "FlowTriggerCard",
      "label": "Flow trigger card",
      "description": "Workflow entry-point card for webhook/cron/event/manual triggers showing config, armed state, last-fired, invocation count, and a sample payload.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai-workflow",
      "routeHref": "/ui-primitives/ai-workflow/flow-trigger-card",
      "tags": [
        "trigger",
        "webhook",
        "cron",
        "event"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
