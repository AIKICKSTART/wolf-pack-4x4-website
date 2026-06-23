/**
 * Shared mock data for the AI workflow builder showcase routes.
 *
 * Realistic Mufflermen workflows:
 *  - "Quote estimator" → RAG over parts catalogue → LLM → JSON validate
 *  - "Customer SMS triage" → intent classify → route to tool or human
 *  - "Blog draft" → research → outline → draft → SEO check → publish
 *
 * No real backend wired — presentational only.
 */

import type {
  AgentLoopIteration,
  EvalRubricAxis,
  EvalSampleRow,
  OutputGateLogEntry,
  ParallelBranchLane,
  PromptBlockVariable,
  PromptVersionEntry,
  SafetyCheckRule,
  ToolBlockMapping,
  VectorSearchHit,
  WorkflowEdge,
  WorkflowNode,
} from "../components/ai-workflow"

// ── Canvas — Quote estimator flow ─────────────────────────────────────────
export const QUOTE_FLOW_NODES: ReadonlyArray<WorkflowNode> = [
  {
    kind: "trigger",
    id: "n1",
    x: 40,
    y: 60,
    title: "Customer asks for quote",
    subtitle: "webhook · shopify",
    status: "passed",
    trigger: "webhook",
  },
  {
    kind: "safety",
    id: "n2",
    x: 240,
    y: 60,
    title: "Strip PII + ABN",
    subtitle: "redact phone · email",
    status: "passed",
    safetyKind: "pii",
  },
  {
    kind: "vector",
    id: "n3",
    x: 240,
    y: 200,
    title: "Parts catalogue RAG",
    subtitle: "top 6 · hybrid",
    status: "passed",
    topK: 6,
  },
  {
    kind: "prompt",
    id: "n4",
    x: 440,
    y: 60,
    title: "Quote estimator prompt",
    subtitle: "v3 · 412 tok system",
    status: "passed",
    tokens: 412,
  },
  {
    kind: "model",
    id: "n5",
    x: 640,
    y: 60,
    title: "Draft the quote",
    subtitle: "claude-opus-4.7",
    status: "running",
    modelId: "claude-opus-4.7",
  },
  {
    kind: "gate",
    id: "n6",
    x: 840,
    y: 60,
    title: "Validate quote JSON",
    subtitle: "schema · totalIncGstAud",
    status: "idle",
    strategy: "json-schema",
  },
  {
    kind: "tool",
    id: "n7",
    x: 1040,
    y: 60,
    title: "Persist quote",
    subtitle: "quote.create",
    status: "idle",
    toolName: "quote.create",
  },
  {
    kind: "output",
    id: "n8",
    x: 1040,
    y: 200,
    title: "Send to Hermes",
    subtitle: "SMS · email · push",
    status: "idle",
  },
]

export const QUOTE_FLOW_EDGES: ReadonlyArray<WorkflowEdge> = [
  { id: "e1", from: "n1", to: "n2" },
  { id: "e2", from: "n2", to: "n4" },
  { id: "e3", from: "n3", to: "n4", label: "context", tone: "teal" },
  { id: "e4", from: "n4", to: "n5" },
  { id: "e5", from: "n5", to: "n6" },
  { id: "e6", from: "n6", to: "n7", label: "pass", tone: "green" },
  { id: "e7", from: "n6", to: "n8", label: "fail · escalate", tone: "amber", dashed: true },
  { id: "e8", from: "n7", to: "n8" },
]

// ── Idle canvas (paused) ──────────────────────────────────────────────────
export const QUOTE_FLOW_NODES_IDLE: ReadonlyArray<WorkflowNode> = QUOTE_FLOW_NODES.map(
  (node) => ({ ...node, status: "idle" }),
)

// ── Failure canvas ────────────────────────────────────────────────────────
export const QUOTE_FLOW_NODES_FAILED: ReadonlyArray<WorkflowNode> = QUOTE_FLOW_NODES.map(
  (node) => {
    if (node.id === "n5") return { ...node, status: "passed" }
    if (node.id === "n6") return { ...node, status: "failed" }
    if (node.id === "n7") return { ...node, status: "skipped" }
    if (node.id === "n8") return { ...node, status: "running" }
    return { ...node, status: "passed" }
  },
)

// ── Prompt block ──────────────────────────────────────────────────────────
export const QUOTE_PROMPT_VARS: ReadonlyArray<PromptBlockVariable> = [
  { id: "v1", name: "customer.firstName", sample: "Mick", tone: "teal" },
  { id: "v2", name: "vehicle.year", sample: "2018", tone: "teal" },
  { id: "v3", name: "vehicle.model", sample: "Hilux N80", tone: "teal" },
  { id: "v4", name: "parts.skuList", sample: "[3 items]", tone: "amber" },
  { id: "v5", name: "labour.hours", sample: "2.5", tone: "amber" },
]

export const QUOTE_SYSTEM_PROMPT = `You are the Mufflermen quote estimator.

Voice: friendly Aussie tradie. AUD inc GST. Never guess fitment — if {{vehicle.model}} is ambiguous, ask one clarifying question.

Hard rules:
- Always include partsAud, labourAud, totalIncGstAud as integers.
- Pull labour hours from {{labour.hours}}.
- Quote must list each part with sku + retail + supplier lead time.

Tools: parts.search, quote.create. Use parts.search before quoting any non-stock SKU.`

export const QUOTE_USER_PROMPT = `G'day {{customer.firstName}}.

Draft a quote for the following job:
Vehicle: {{vehicle.year}} {{vehicle.model}}
SKUs: {{parts.skuList}}
Estimated labour: {{labour.hours}} hours

Use the retrieved fitment notes. Return JSON only.`

// ── Tool block ────────────────────────────────────────────────────────────
export const QUOTE_TOOL_SCHEMA = `{
  "name": "quote.create",
  "description": "Persist a quote with line items + totals.",
  "input_schema": {
    "type": "object",
    "properties": {
      "customerId":     { "type": "string", "pattern": "^cust_[a-z0-9_]+$" },
      "vehicleSummary": { "type": "string", "maxLength": 80 },
      "lineItems": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "sku":       { "type": "string" },
            "qty":       { "type": "integer", "minimum": 1 },
            "retailAud": { "type": "number", "minimum": 0 }
          },
          "required": ["sku", "qty", "retailAud"]
        }
      },
      "labourHours":     { "type": "number" },
      "totalIncGstAud":  { "type": "number" }
    },
    "required": ["customerId", "lineItems", "totalIncGstAud"]
  }
}`

export const QUOTE_TOOL_MAPPINGS: ReadonlyArray<ToolBlockMapping> = [
  { from: "result.quoteId", to: "quote.id", tone: "teal" },
  { from: "result.totalIncGstAud", to: "quote.totalAud", tone: "green" },
  { from: "result.stripePaymentLink", to: "quote.paymentLink", tone: "amber" },
]

// ── Output gate ───────────────────────────────────────────────────────────
export const QUOTE_GATE_SCHEMA = `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["totalIncGstAud", "lineItems"],
  "properties": {
    "totalIncGstAud": { "type": "integer", "minimum": 1, "maximum": 25000 },
    "lineItems":      { "type": "array", "minItems": 1 }
  }
}`

export const QUOTE_GATE_LOG: ReadonlyArray<OutputGateLogEntry> = [
  {
    id: "g1",
    timestamp: "10:14:03",
    sample: "Mick N80 cat-back · $1,695",
    outcome: "pass",
  },
  {
    id: "g2",
    timestamp: "10:09:48",
    sample: "Leah Commodore SS · $2,180",
    outcome: "pass",
  },
  {
    id: "g3",
    timestamp: "10:02:18",
    sample: "Manta DPF · $480",
    outcome: "warn",
    reason: "totalIncGstAud rounded · soft accept",
  },
  {
    id: "g4",
    timestamp: "09:58:11",
    sample: "Falcon BA mid-pipe · $-12",
    outcome: "fail",
    reason: "totalIncGstAud < minimum",
  },
  {
    id: "g5",
    timestamp: "09:51:42",
    sample: "Hilux LPG conversion · $3,940",
    outcome: "pass",
  },
]

// ── Parallel branch — Blog draft fan-out ──────────────────────────────────
export const BLOG_PARALLEL_LANES: ReadonlyArray<ParallelBranchLane> = [
  {
    id: "p1",
    name: "GPT-4o draft",
    detail: "Concise · keyword density target 1.2%",
    status: "passed",
    latencyMs: 1240,
    score: 82,
  },
  {
    id: "p2",
    name: "Claude Opus 4.7 draft",
    detail: "Editorial · workshop voice",
    status: "passed",
    latencyMs: 2380,
    score: 91,
  },
  {
    id: "p3",
    name: "Gemini Flash draft",
    detail: "Speed pass · short variant",
    status: "running",
    latencyMs: 380,
  },
  {
    id: "p4",
    name: "Llama 3.3 70B draft",
    detail: "On-prem · local fallback",
    status: "failed",
    latencyMs: 640,
  },
]

// ── Eval runner — Quote estimator rubric ──────────────────────────────────
export const QUOTE_EVAL_AXES: ReadonlyArray<EvalRubricAxis> = [
  { id: "accuracy", label: "Accuracy", weight: 0.4 },
  { id: "tone", label: "Tone", weight: 0.2 },
  { id: "safety", label: "Safety", weight: 0.25 },
  { id: "cost", label: "Cost", weight: 0.15 },
]

export const QUOTE_EVAL_SAMPLES: ReadonlyArray<EvalSampleRow> = [
  {
    id: "ev1",
    label: "Hilux N80 cat-back · long-range",
    scores: { accuracy: 96, tone: 92, safety: 100, cost: 78 },
  },
  {
    id: "ev2",
    label: "Commodore SS quote follow-up",
    scores: { accuracy: 82, tone: 88, safety: 100, cost: 88 },
  },
  {
    id: "ev3",
    label: "Manta DPF warranty rattle",
    scores: { accuracy: 64, tone: 72, safety: 92, cost: 84 },
  },
  {
    id: "ev4",
    label: "Falcon BA mid-pipe stock",
    scores: { accuracy: 90, tone: 84, safety: 100, cost: 92 },
  },
  {
    id: "ev5",
    label: "Saturday booking confirmation",
    scores: { accuracy: 98, tone: 96, safety: 100, cost: 96 },
  },
  {
    id: "ev6",
    label: "Engineered exhaust ADR cert",
    scores: { accuracy: 58, tone: 76, safety: 100, cost: 82 },
  },
]

// ── Vector search hits — Hilux N80 cat-back lookup ────────────────────────
export const QUOTE_VECTOR_HITS: ReadonlyArray<VectorSearchHit> = [
  {
    id: "vh1",
    title: "Manta high-clearance cat-back · N80 fitment guide",
    snippet:
      "12mm clearance offset required for N80 trucks running the 130L long-range tank. Bay 2 hoist setup notes inline.",
    similarity: 0.92,
    rerankScore: 0.95,
    source: "fitment/hilux-n80-manta.md",
  },
  {
    id: "vh2",
    title: "Hilux N80 2.8 GD-6 — supplier price brackets",
    snippet:
      "Manta 3in mid-pipe $440 + cat-back $1,055 + dump pipe optional $620. Lead time 3 business days.",
    similarity: 0.88,
    rerankScore: 0.93,
    source: "supplier-feeds/manta-2026-04.csv",
  },
  {
    id: "vh3",
    title: "Bay labour matrix — exhaust fitment",
    snippet:
      "Cat-back swap N80: 2.5h flat rate. Add 0.4h for long-range tank shield. Bay 2 tooling required.",
    similarity: 0.84,
    rerankScore: 0.88,
    source: "labour/exhaust-matrix.md",
  },
  {
    id: "vh4",
    title: "Cat-back warranty terms",
    snippet:
      "Manta cat-back parts 24-month warranty. Fitting warranty 12 months from invoice date.",
    similarity: 0.71,
    rerankScore: 0.62,
    source: "policies/warranty.md",
  },
  {
    id: "vh5",
    title: "Workshop hours — Oak Flats NSW",
    snippet: "Mon–Fri 7:30–17:00, Sat 8:00–12:00. Bay 1/2/3 availability sync nightly.",
    similarity: 0.43,
    rerankScore: 0.18,
    source: "policies/hours.md",
  },
  {
    id: "vh6",
    title: "After-hours emergency protocol",
    snippet: "On-call mobile rotation. Sam W primary Tue/Thu, Jordan R Mon/Wed/Fri.",
    similarity: 0.31,
    rerankScore: 0.06,
    source: "policies/after-hours.md",
  },
]

// ── Agent loop — SMS triage ────────────────────────────────────────────────
export const TRIAGE_LOOP_ITERATIONS: ReadonlyArray<AgentLoopIteration> = [
  {
    id: "i1",
    iteration: 1,
    thought:
      "Inbound SMS from +61 411 ... — 'How much for an N80 cat-back?'. Classify as quote request.",
    action: "classifyIntent({ text, candidates: ['quote','booking','question','other'] })",
    observation: "intent = quote · confidence 0.92 · vehicle = Hilux N80 (year unknown)",
    confidence: 0.92,
  },
  {
    id: "i2",
    iteration: 2,
    thought:
      "Vehicle year required for fitment. Ask one clarifying question — but only if not in CRM.",
    action: "customer.lookup({ phone: '+61411...' })",
    observation: "customer = Mick Davis · last vehicle = 2018 Hilux N80 (matched)",
    confidence: 0.96,
  },
  {
    id: "i3",
    iteration: 3,
    thought:
      "Year matched from CRM. Run the quote estimator workflow with the captured params.",
    action: "invokeWorkflow('quote-estimator', { vehicle, sku: 'manta-cat-back-hc' })",
    observation: "workflow returned quoteId = q_44521 · totalIncGstAud = 1695",
    confidence: 0.94,
  },
  {
    id: "i4",
    iteration: 4,
    thought:
      "Goal reached. Send SMS reply with quote refresher and Bay 2 slot offer.",
    action: "hermes.respond({ template: 'quote.ack', vars: { quoteId: 'q_44521' } })",
    observation: "SMS sent · message-id sm_88421 · delivered receipt pending",
    confidence: 0.98,
  },
]

// ── Prompt version history — Quote estimator timeline ─────────────────────
export const QUOTE_VERSIONS: ReadonlyArray<PromptVersionEntry> = [
  {
    id: "pv1",
    version: "v3.2",
    timestamp: "Today · 09:14 AEST",
    author: "bec.s",
    summary:
      "Tightened JSON shape — totalIncGstAud now required integer. Added long-range tank clarifying ask.",
    winRate: 0.91,
    runs: 142,
    avgTokens: 1820,
    trend: [62, 64, 68, 71, 74, 79, 82, 86, 88, 91],
    live: true,
  },
  {
    id: "pv2",
    version: "v3.1",
    timestamp: "Yesterday · 16:48",
    author: "sam.w",
    summary:
      "Restored Aussie tradie register · trimmed the 'Voice:' block · cut 64 system tokens.",
    winRate: 0.86,
    runs: 318,
    avgTokens: 1748,
    trend: [54, 60, 62, 68, 72, 78, 84, 86, 86, 88],
  },
  {
    id: "pv3",
    version: "v3.0",
    timestamp: "May 14 · 11:02",
    author: "jordan.r",
    summary:
      "Migrated to JSON-only output. Removed prose preamble. Output gate enforces totalIncGstAud.",
    winRate: 0.78,
    runs: 412,
    avgTokens: 1612,
    trend: [44, 48, 52, 58, 64, 68, 72, 74, 76, 78],
  },
  {
    id: "pv4",
    version: "v2.4",
    timestamp: "May 02 · 14:28",
    author: "bec.s",
    summary:
      "Added parts.search guardrail · refused to quote non-stock SKUs without lookup.",
    winRate: 0.68,
    runs: 588,
    avgTokens: 1948,
    trend: [40, 44, 48, 52, 58, 60, 62, 65, 67, 68],
  },
]

// ── Cost projection — Quote estimator trend ───────────────────────────────
export const QUOTE_COST_TREND_USD: ReadonlyArray<number> = [
  4.2, 5.1, 6.8, 5.4, 7.2, 8.1, 6.9,
]

// ── Safety checks ────────────────────────────────────────────────────────
export const QUOTE_SAFETY_RULES: ReadonlyArray<SafetyCheckRule> = [
  {
    id: "s1",
    kind: "pii",
    description: "Strip phone, email and ABN before logging the payload.",
    action: "redact",
    inspected24h: 1846,
    hits24h: 32,
    enabled: true,
  },
  {
    id: "s2",
    kind: "jailbreak",
    description: "Block prompt-injection attempts disguised as customer messages.",
    action: "block",
    inspected24h: 1846,
    hits24h: 4,
    enabled: true,
  },
  {
    id: "s3",
    kind: "moderation",
    description: "OpenAI moderation pass on outbound copy.",
    action: "flag",
    inspected24h: 1742,
    hits24h: 8,
    enabled: true,
  },
  {
    id: "s4",
    kind: "topic-fence",
    description:
      "Refuse engine ECU tuning advice · escalate to Sam W (workshop lead).",
    action: "escalate",
    inspected24h: 1742,
    hits24h: 2,
    enabled: true,
  },
  {
    id: "s5",
    kind: "pii",
    description: "Mask rego plates in transcripts archived to S3.",
    action: "redact",
    inspected24h: 1742,
    hits24h: 18,
    enabled: false,
  },
]

// ── Triggers ──────────────────────────────────────────────────────────────
export const QUOTE_TRIGGER_PAYLOAD = `{
  "type": "shopify.order.requested",
  "customer": {
    "id": "cust_mick_davis_8821",
    "firstName": "Mick",
    "phone": "+61411xxx482"
  },
  "vehicle": {
    "year": 2018,
    "make": "Toyota",
    "model": "Hilux N80",
    "variantHints": ["long-range", "GD-6"]
  },
  "skuRequest": ["manta-cat-back-hc"],
  "channel": "web-form",
  "receivedAt": "2026-05-29T09:14:11+10:00"
}`

export const TRIAGE_TRIGGER_PAYLOAD = `{
  "type": "sms.inbound",
  "from": "+61411xxx482",
  "to": "+61213000888",
  "body": "How much for an N80 cat-back?",
  "messageId": "sm_88420",
  "receivedAt": "2026-05-29T07:22:48+10:00"
}`

export const BLOG_TRIGGER_PAYLOAD = `{
  "type": "cron.fire",
  "schedule": "0 6 * * MON",
  "lastFire": "2026-05-22T06:00:00+10:00",
  "nextFire": "2026-05-29T06:00:00+10:00",
  "payload": {
    "topic": "DPF cleaning vs replacement"
  }
}`

// ── Chain steps — composed view ───────────────────────────────────────────
export interface MockChainStep {
  id: string
  kind: "trigger" | "prompt" | "model" | "tool" | "vector" | "gate" | "safety" | "output"
  title: string
  modelId?: "claude-opus-4.7" | "gpt-4o-2024" | "gemini-2.5-flash" | "llama-3.3-70b"
  status: "idle" | "running" | "passed" | "failed" | "skipped"
  inputPreview: string
  outputPreview: string
  tokens: number
  costUsd: number
  latencyMs?: number
}

export const QUOTE_CHAIN_STEPS: ReadonlyArray<MockChainStep> = [
  {
    id: "c1",
    kind: "safety",
    title: "Strip PII",
    status: "passed",
    inputPreview:
      "Mick Davis · +61 411 xxx 482 asks about an N80 cat-back for his 2018 Hilux.",
    outputPreview:
      "[customer] asks about an N80 cat-back for his 2018 Hilux. {phone:[redacted]}",
    tokens: 64,
    costUsd: 0,
    latencyMs: 18,
  },
  {
    id: "c2",
    kind: "vector",
    title: "Pull fitment + supplier price",
    status: "passed",
    inputPreview: "query = 'Hilux N80 long-range cat-back Manta clearance' · top 6",
    outputPreview:
      "6 hits · top similarity 0.92 (fitment/hilux-n80-manta.md) · rerank 0.95",
    tokens: 412,
    costUsd: 0.00012,
    latencyMs: 142,
  },
  {
    id: "c3",
    kind: "prompt",
    title: "Compose estimator prompt",
    status: "passed",
    inputPreview:
      "system = quote-estimator v3.2 · user injects {{vehicle}}, {{parts.skuList}}, {{labour.hours}}",
    outputPreview:
      "1,820 tokens of context handed to the model. Output gate awaits JSON.",
    tokens: 1820,
    costUsd: 0,
    latencyMs: 6,
  },
  {
    id: "c4",
    kind: "model",
    title: "Draft the quote",
    modelId: "claude-opus-4.7",
    status: "running",
    inputPreview:
      "Generate JSON quote — parts inc GST, labour 2.5h × $80, total rounded.",
    outputPreview:
      '{ "totalIncGstAud": 1695, "lineItems": [ … 3 items ] } — streaming',
    tokens: 1280,
    costUsd: 0.054,
    latencyMs: 2380,
  },
  {
    id: "c5",
    kind: "gate",
    title: "Validate JSON schema",
    status: "idle",
    inputPreview: "Awaiting JSON output from upstream model.",
    outputPreview: "—",
    tokens: 0,
    costUsd: 0,
  },
]

// ── Eval samples (compact for the chain composition) ──────────────────────
export const SMS_EVAL_AXES: ReadonlyArray<EvalRubricAxis> = QUOTE_EVAL_AXES

export const SMS_EVAL_SAMPLES: ReadonlyArray<EvalSampleRow> = [
  {
    id: "se1",
    label: "Intent · quote · 0.92",
    scores: { accuracy: 92, tone: 88, safety: 100, cost: 95 },
  },
  {
    id: "se2",
    label: "Intent · booking · 0.86",
    scores: { accuracy: 86, tone: 90, safety: 100, cost: 94 },
  },
  {
    id: "se3",
    label: "Intent · question · 0.74",
    scores: { accuracy: 74, tone: 84, safety: 100, cost: 91 },
  },
]
