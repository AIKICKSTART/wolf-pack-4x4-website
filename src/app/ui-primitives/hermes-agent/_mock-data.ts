/**
 * Shared mock data for the Hermes agent showcase routes.
 *
 * Mufflermen-flavoured throughout — Australian English, tradie register,
 * Oak Flats NSW. Customers running Hilux, Commodore, Falcon and Manta jobs.
 * Hermes is the workshop's customer-facing AI assistant on mufflermen.com.au.
 */

import type {
  AgentChatTurn,
  AutomationRuleCardProps,
  EscalationQueueItem,
  HermesChannel,
  HermesConversationState,
  HermesPriority,
  PersonaEscalationPath,
  PersonaHourSlot,
  PersonaRefusalRule,
  PersonaToneOption,
  PromptTemplateTestCase,
  RubricSample,
  RuleRunHistoryEntry,
  RunTimelineStep,
  SafetyFilterStep,
  ToolPaletteEntry,
  TranscriptTurn,
} from "../components/hermes-agent"

// ── Chat panel — Mick Davis Hilux fitment scenario ─────────────────────────
export const HERMES_CHAT_TURNS: ReadonlyArray<AgentChatTurn> = [
  {
    kind: "customer",
    id: "t1",
    authorName: "Mick Davis",
    timestamp: "10:14 am",
    content:
      "G'day Hermes. Got a 2018 Hilux N80 with the long-range tank — what's the damage on a Manta 3in cat-back?",
  },
  {
    kind: "agent",
    id: "t2",
    timestamp: "10:14 am",
    content:
      "Morning Mick. For the N80 with the 130L long-range you'll want the high-clearance variant. Out the door it's $1,695 fitted at our Oak Flats bays. Bay 2 is open Friday arvo — want me to pencil you in?",
    citations: [
      {
        index: 1,
        title: "Manta high-clearance cat-back · N80 fitment guide",
        url: "https://docs.mufflermen.com.au/fitment/hilux-n80-manta",
        snippet:
          "Step-by-step on the 12mm clearance offset required for N80 trucks running the 130L long-range tank.",
      },
      {
        index: 2,
        title: "Workshop hours · Oak Flats NSW",
        url: "https://docs.mufflermen.com.au/policies/hours",
        snippet: "Mon–Fri 7:30–17:00, Sat 8:00–12:00, Sun closed.",
      },
    ],
    toolTraces: [
      {
        toolName: "quote.estimate",
        status: "done",
        durationMs: 412,
        inputJson: JSON.stringify(
          {
            vehicle: "Hilux N80 (2018)",
            fitment: "long-range tank",
            sku: "manta-3in-cat-back-hc",
          },
          null,
          2,
        ),
        outputJson: JSON.stringify(
          {
            partsAud: 1495,
            labourHours: 2.5,
            labourAud: 200,
            totalIncGstAud: 1695,
          },
          null,
          2,
        ),
      },
    ],
  },
  {
    kind: "customer",
    id: "t3",
    authorName: "Mick Davis",
    timestamp: "10:15 am",
    content: "Sweet, Friday arvo works. Around 1:30 if it's free.",
  },
  {
    kind: "agent",
    id: "t4",
    timestamp: "10:15 am",
    streaming: true,
    content:
      "Locked in Bay 2 · Fri 1:30 pm. I'll flick the confirmation through to your email + send a calendar invite. Anything else I can pre-pull for the job?",
    toolTraces: [
      {
        toolName: "bookings.create",
        status: "running",
        inputJson: JSON.stringify(
          {
            bay: "bay-2",
            slot: "2026-06-05T13:30:00+10:00",
            customerId: "cust_mick_davis_8821",
            jobSku: "manta-3in-cat-back-hc",
          },
          null,
          2,
        ),
      },
    ],
  },
]

// ── Run timeline ───────────────────────────────────────────────────────────
export const HERMES_RUN_STEPS: ReadonlyArray<RunTimelineStep> = [
  {
    id: "s1",
    kind: "plan",
    title: "Plan response",
    detail:
      "User asking for cat-back price for a 2018 Hilux N80 with long-range tank. Need fitment lookup → quote → check bay availability.",
    status: "done",
    timestamp: "10:14:02",
    durationMs: 184,
  },
  {
    id: "s2",
    kind: "tool",
    title: "quote.estimate",
    detail: "Pull Manta high-clear cat-back price for N80 long-range.",
    payload:
      '{\n  "vehicle": "Hilux N80",\n  "fitment": "long-range",\n  "sku": "manta-3in-cat-back-hc"\n}',
    status: "done",
    timestamp: "10:14:02",
    durationMs: 412,
    toolName: "quote.estimate",
  },
  {
    id: "s3",
    kind: "reflection",
    title: "Reflect on grounding",
    detail:
      "Price + fitment doc both retrieved. Confidence high. Offering Friday Bay 2 slot to capture the booking intent.",
    status: "done",
    timestamp: "10:14:03",
    durationMs: 96,
  },
  {
    id: "s4",
    kind: "response",
    title: "Compose response",
    detail:
      "Friendly tradie tone, AUD inc GST callout, soft booking ask. Two citations attached.",
    status: "done",
    timestamp: "10:14:03",
    durationMs: 312,
  },
  {
    id: "s5",
    kind: "tool",
    title: "bookings.create",
    detail: "Reserve Bay 2 · Fri 1:30 pm AEST for Mick Davis.",
    payload:
      '{\n  "bay": "bay-2",\n  "slot": "2026-06-05T13:30:00+10:00",\n  "customerId": "cust_mick_davis_8821"\n}',
    status: "running",
    timestamp: "10:15:11",
    durationMs: 1840,
    toolName: "bookings.create",
  },
  {
    id: "s6",
    kind: "response",
    title: "Confirm booking",
    detail: "Send email + calendar invite once the bay write succeeds.",
    status: "queued",
    timestamp: "10:15:13",
  },
]

// ── Tool palette ────────────────────────────────────────────────────────────
export const HERMES_TOOL_PALETTE: ReadonlyArray<ToolPaletteEntry> = [
  {
    name: "quote.estimate",
    usage24h: 412,
    medianLatencyMs: 380,
    failureRate: 0.012,
    trend: [18, 22, 19, 26, 31, 28, 36, 41, 38, 44, 49, 52],
    enabled: true,
  },
  {
    name: "parts.search",
    usage24h: 1186,
    medianLatencyMs: 142,
    failureRate: 0.004,
    trend: [62, 58, 72, 80, 76, 88, 94, 102, 96, 108, 116, 124],
    enabled: true,
  },
  {
    name: "bookings.create",
    usage24h: 86,
    medianLatencyMs: 720,
    failureRate: 0.028,
    trend: [4, 6, 5, 8, 9, 11, 12, 10, 14, 13, 15, 18],
    enabled: true,
  },
  {
    name: "payment.collect",
    usage24h: 44,
    medianLatencyMs: 1280,
    failureRate: 0.045,
    trend: [2, 3, 5, 4, 6, 7, 5, 8, 6, 9, 7, 10],
    enabled: true,
  },
  {
    name: "refund.process",
    usage24h: 6,
    medianLatencyMs: 880,
    failureRate: 0,
    trend: [0, 0, 1, 1, 0, 1, 2, 1, 1, 0, 1, 1],
    enabled: false,
  },
  {
    name: "escalate.to_human",
    usage24h: 18,
    medianLatencyMs: 96,
    failureRate: 0,
    trend: [1, 2, 1, 2, 3, 2, 3, 4, 3, 2, 3, 4],
    enabled: true,
  },
]

// ── Automation rules ───────────────────────────────────────────────────────
const ON_HISTORY: ReadonlyArray<RuleRunHistoryEntry> = [
  { id: "h1", label: "13:02", status: "done" },
  { id: "h2", label: "12:48", status: "done" },
  { id: "h3", label: "12:31", status: "done" },
  { id: "h4", label: "12:14", status: "skipped" },
  { id: "h5", label: "11:55", status: "done" },
  { id: "h6", label: "11:31", status: "failed" },
]

export const HERMES_RULE_QUOTE_FOLLOWUP: AutomationRuleCardProps = {
  id: "rule-quote-followup",
  name: "Quote follow-up · 48h chase",
  category: "Sales",
  trigger: "Quote sent · no reply within 48h",
  condition: "Quote total ≥ $500 AUD · customer not on Do-Not-Contact",
  action: "Send SMS via Hermes with quote refresher + Bay 2 slot offer",
  defaultEnabled: true,
  runs7d: 142,
  successRate: 0.86,
  lastRunLabel: "13:02 AEST",
  history: ON_HISTORY,
}

export const HERMES_RULE_AFTER_HOURS: AutomationRuleCardProps = {
  id: "rule-afterhours-triage",
  name: "After-hours triage",
  category: "Service",
  trigger: "New chat arrives · workshop closed",
  condition: "Channel is not phone · message not flagged as urgent",
  action: "Reply with hours + offer to book first available slot",
  defaultEnabled: true,
  runs7d: 286,
  successRate: 0.94,
  lastRunLabel: "06:41 AEST",
  history: [
    { id: "h1", label: "06:41", status: "done" },
    { id: "h2", label: "05:58", status: "done" },
    { id: "h3", label: "04:32", status: "done" },
    { id: "h4", label: "03:15", status: "done" },
  ],
}

export const HERMES_RULE_REFUND_GUARD: AutomationRuleCardProps = {
  id: "rule-refund-guard",
  name: "Refund > $200 · human approval",
  category: "Compliance",
  trigger: "Hermes proposes refund.process",
  condition: "Refund amount > $200 AUD",
  action: "Pause · route to manager queue with full transcript",
  defaultEnabled: true,
  runs7d: 8,
  successRate: 1,
  lastRunLabel: "Yesterday 16:48",
  history: [
    { id: "h1", label: "Yest", status: "done" },
    { id: "h2", label: "Mon", status: "done" },
    { id: "h3", label: "Sat", status: "done" },
  ],
}

// ── Persona ─────────────────────────────────────────────────────────────────
export const HERMES_TONE_OPTIONS: ReadonlyArray<PersonaToneOption> = [
  { id: "tradie", label: "Friendly tradie", selected: true, tone: "green" },
  { id: "neutral", label: "Neutral pro", tone: "teal" },
  { id: "concise", label: "Tight + concise", tone: "teal" },
  { id: "formal", label: "Formal", tone: "neutral" },
]

export const HERMES_REFUSAL_RULES: ReadonlyArray<PersonaRefusalRule> = [
  {
    id: "ref1",
    text: "No medical or legal advice — route to a qualified human.",
    tone: "red",
  },
  {
    id: "ref2",
    text: "Always confirm fitment year + variant before quoting.",
    tone: "amber",
  },
  {
    id: "ref3",
    text: "Never promise stock outside the supplier feed window.",
    tone: "amber",
  },
  {
    id: "ref4",
    text: "Pause + escalate any refund over $200 AUD.",
    tone: "red",
  },
  {
    id: "ref5",
    text: "Australian English only · use AEST when timestamping.",
    tone: "teal",
  },
]

export const HERMES_HOURS: ReadonlyArray<PersonaHourSlot> = [
  { day: "Mon", range: "7:30–17:00" },
  { day: "Tue", range: "7:30–17:00" },
  { day: "Wed", range: "7:30–17:00" },
  { day: "Thu", range: "7:30–17:00" },
  { day: "Fri", range: "7:30–17:00" },
  { day: "Sat", range: "8:00–12:00" },
  { day: "Sun", closed: true, range: "—" },
]

export const HERMES_ESCALATION: ReadonlyArray<PersonaEscalationPath> = [
  {
    id: "esc1",
    trigger: "Missing fitment data",
    target: "Bay 2 lead · Sam Whittaker",
  },
  {
    id: "esc2",
    trigger: "Refund > $200 AUD",
    target: "Front desk manager · Bec Singh",
  },
  {
    id: "esc3",
    trigger: "Active customer dispute",
    target: "Manager queue · Jordan Riley",
  },
  {
    id: "esc4",
    trigger: "After-hours emergency",
    target: "On-call mobile · Sam W.",
  },
]

export const HERMES_SYSTEM_PROMPT = `You are Hermes — the Oak Flats Mufflermen workshop assistant.

Voice: friendly tradie, Australian English, no jargon dumps. Always quote AUD inc GST.

Guardrails:
- Confirm vehicle year + variant before quoting.
- Never promise stock you can't see in the supplier feed.
- Refunds over $200 → pause and escalate.
- After hours → offer hours + next slot, never invent availability.

Tools available: quote.estimate, parts.search, bookings.create, payment.collect, refund.process, escalate.to_human.

If unsure, escalate. Customers are mates first.`

// ── Evaluation samples ─────────────────────────────────────────────────────
export const HERMES_RUBRIC_SAMPLES: ReadonlyArray<RubricSample> = [
  {
    runId: "run_8842",
    topic: "Hilux N80 cat-back quote",
    scores: { accuracy: 96, tone: 92, safety: 100, resolution: 88 },
    reviewer: "Bec S.",
  },
  {
    runId: "run_8843",
    topic: "Commodore SS quote follow-up",
    scores: { accuracy: 82, tone: 88, safety: 100, resolution: 76 },
    reviewer: "Bec S.",
  },
  {
    runId: "run_8844",
    topic: "Manta DPF warranty rattle",
    scores: { accuracy: 64, tone: 72, safety: 92, resolution: 48 },
    reviewer: "Sam W.",
  },
  {
    runId: "run_8845",
    topic: "Falcon BA mid-pipe stock",
    scores: { accuracy: 90, tone: 84, safety: 100, resolution: 92 },
    reviewer: "Jordan R.",
  },
  {
    runId: "run_8846",
    topic: "Saturday booking confirmation",
    scores: { accuracy: 98, tone: 96, safety: 100, resolution: 100 },
    reviewer: "Jordan R.",
  },
]

// ── Prompt template ────────────────────────────────────────────────────────
export const HERMES_PROMPT_QUOTE_ACK_BODY = `Cheers {{customer.firstName}} — quote {{quote.reference}} for {{quote.totalAud}} AUD inc GST is yours for 14 days.

If you'd like to lock in Bay 2 while parts are still in stock, I can pencil you in for {{slot.label}}. Just say the word.

— Hermes
Oak Flats Mufflermen`

export const HERMES_PROMPT_TESTS: ReadonlyArray<PromptTemplateTestCase> = [
  {
    id: "tc1",
    title: "Mentions AUD inc GST",
    assertion: "Response must include `inc GST` token.",
    passed: true,
  },
  {
    id: "tc2",
    title: "Names a Bay 2 slot",
    assertion: "Response includes slot.label placeholder substitution.",
    passed: true,
  },
  {
    id: "tc3",
    title: "Stays under 90 words",
    assertion: "Word count ≤ 90 to keep SMS-safe.",
    passed: true,
  },
  {
    id: "tc4",
    title: "No legal disclaimer dump",
    assertion: "No `T&Cs apply` boilerplate.",
    passed: false,
  },
]

// ── Cost budget ────────────────────────────────────────────────────────────
export const HERMES_COST_HOURLY: ReadonlyArray<number> = [
  4, 3, 2, 2, 1, 2, 8, 18, 32, 48, 56, 62, 58, 71, 78, 84, 92, 88, 76, 62, 48, 32, 20, 12,
]

// ── Safety filters ─────────────────────────────────────────────────────────
export const HERMES_FILTERS: ReadonlyArray<SafetyFilterStep> = [
  {
    id: "f1",
    name: "PII redactor",
    phase: "pre",
    hits24h: 28,
    inspected24h: 1846,
    detail: "Strips ABNs · phone numbers · address fragments.",
    tone: "teal",
  },
  {
    id: "f2",
    name: "Profanity & abuse",
    phase: "pre",
    hits24h: 4,
    inspected24h: 1846,
    detail: "Mufflermen civility threshold.",
    tone: "green",
  },
  {
    id: "f3",
    name: "Grounding check",
    phase: "post",
    hits24h: 12,
    inspected24h: 1742,
    detail: "Block responses that drift from retrieved sources.",
    tone: "teal",
  },
  {
    id: "f4",
    name: "Out-of-scope advice",
    phase: "post",
    hits24h: 2,
    inspected24h: 1742,
    detail: "Catches medical · legal · engineering sign-off attempts.",
    tone: "amber",
  },
  {
    id: "f5",
    name: "Tone moderation",
    phase: "post",
    hits24h: 6,
    inspected24h: 1742,
    detail: "Soften any sharp replies before send.",
    tone: "teal",
  },
]

// ── Live conversations ─────────────────────────────────────────────────────
export interface MockLiveConversation {
  id: string
  customerName: string
  channel: HermesChannel
  state: HermesConversationState
  lastMessage: string
  queueTimeSeconds: number
  confidence: number
}

export const HERMES_LIVE_CONVERSATIONS: ReadonlyArray<MockLiveConversation> = [
  {
    id: "c1",
    customerName: "Mick Davis",
    channel: "web-chat",
    state: "active",
    lastMessage: "Sweet, Friday arvo works. Around 1:30 if it's free.",
    queueTimeSeconds: 12,
    confidence: 92,
  },
  {
    id: "c2",
    customerName: "Leah O'Donnell",
    channel: "sms",
    state: "queued",
    lastMessage: "Following up on Tuesday's quote — still good for next week?",
    queueTimeSeconds: 184,
    confidence: 78,
  },
  {
    id: "c3",
    customerName: "Tom Beck",
    channel: "messenger",
    state: "active",
    lastMessage: "Is the mild steel BA mid-pipe in stock at Oak Flats?",
    queueTimeSeconds: 46,
    confidence: 86,
  },
  {
    id: "c4",
    customerName: "Anon DM",
    channel: "instagram",
    state: "handed-off",
    lastMessage: "Need an ADR cert for an engineered exhaust — what's the wait?",
    queueTimeSeconds: 612,
    confidence: 42,
  },
  {
    id: "c5",
    customerName: "Karen W.",
    channel: "phone-voice",
    state: "resolved",
    lastMessage: "Booked in for Saturday 9 am — sorted.",
    queueTimeSeconds: 0,
    confidence: 95,
  },
]

// ── Escalation queue ───────────────────────────────────────────────────────
export const HERMES_ESCALATIONS: ReadonlyArray<EscalationQueueItem> = [
  {
    id: "esc_9183",
    subject: "Manta DPF warranty rattle · refund request $480",
    priority: "p1-critical",
    reason: "Refund > $200 AUD trigger · disputed warranty claim.",
    handlerName: "Bec Singh",
    handlerRole: "Front desk · manager",
    waitSeconds: 240,
  },
  {
    id: "esc_9184",
    subject: "After-hours emergency · Hilux on side of M1",
    priority: "p2-high",
    reason: "Vehicle stranded · customer requesting urgent tow info.",
    handlerName: "Sam Whittaker",
    handlerRole: "Workshop lead · on-call",
    waitSeconds: 96,
  },
  {
    id: "esc_9185",
    subject: "Engineered exhaust ADR cert · uncertain fitment",
    priority: "p3-watch",
    reason: "Confidence under 50% · missing variant data.",
    handlerName: "Jordan Riley",
    handlerRole: "Bay 2 tech",
    waitSeconds: 432,
  },
  {
    id: "esc_9186",
    subject: "Saturday late open request · public holiday",
    priority: "p4-routine",
    reason: "Outside published hours · customer wants confirmation.",
    handlerName: "Sophie Tan",
    handlerRole: "Front desk",
    waitSeconds: 1080,
  },
]

// ── Transcript ─────────────────────────────────────────────────────────────
export const HERMES_TRANSCRIPT_TURNS: ReadonlyArray<TranscriptTurn> = [
  {
    id: "t01",
    speaker: "system",
    authorName: "Session",
    timestamp: "10:14:00",
    text: "Session opened · channel = web-chat · customer = Mick Davis (cust_mick_davis_8821).",
  },
  {
    id: "t02",
    speaker: "customer",
    authorName: "Mick Davis",
    timestamp: "10:14:02",
    text: "G'day Hermes. Got a 2018 Hilux N80 with the long-range tank — what's the damage on a Manta 3in cat-back?",
  },
  {
    id: "t03",
    speaker: "tool",
    authorName: "quote.estimate",
    timestamp: "10:14:02",
    text: "Quote estimate invoked for Manta high-clearance cat-back on N80 long-range.",
    tool: {
      toolName: "quote.estimate",
      inputJson:
        '{\n  "vehicle": "Hilux N80",\n  "fitment": "long-range",\n  "sku": "manta-3in-cat-back-hc"\n}',
      outputJson:
        '{\n  "partsAud": 1495,\n  "labourHours": 2.5,\n  "labourAud": 200,\n  "totalIncGstAud": 1695\n}',
    },
  },
  {
    id: "t04",
    speaker: "agent",
    authorName: "Hermes",
    timestamp: "10:14:03",
    text: "Morning Mick. For the N80 with the 130L long-range you'll want the high-clearance variant. Out the door it's $1,695 fitted at our Oak Flats bays. Bay 2 is open Friday arvo — want me to pencil you in?",
    citations: [
      {
        index: 1,
        title: "Manta high-clearance cat-back · N80 fitment guide",
        url: "https://docs.mufflermen.com.au/fitment/hilux-n80-manta",
        snippet: "Step-by-step on the 12mm clearance offset required.",
      },
      {
        index: 2,
        title: "Workshop hours · Oak Flats NSW",
        url: "https://docs.mufflermen.com.au/policies/hours",
      },
    ],
  },
  {
    id: "t05",
    speaker: "customer",
    authorName: "Mick Davis",
    timestamp: "10:15:11",
    text: "Sweet, Friday arvo works. Around 1:30 if it's free.",
  },
  {
    id: "t06",
    speaker: "tool",
    authorName: "bookings.create",
    timestamp: "10:15:11",
    text: "Bay 2 booking attempt — Friday 1:30 pm AEST.",
    tool: {
      toolName: "bookings.create",
      inputJson:
        '{\n  "bay": "bay-2",\n  "slot": "2026-06-05T13:30:00+10:00",\n  "customerId": "cust_mick_davis_8821"\n}',
      outputJson: '{\n  "bookingId": "bk_44521",\n  "status": "confirmed"\n}',
    },
  },
  {
    id: "t07",
    speaker: "agent",
    authorName: "Hermes",
    timestamp: "10:15:13",
    text: "Locked in Bay 2 · Fri 1:30 pm. Calendar invite + email confirmation sent. Anything else I can pre-pull for the job?",
  },
]

// ── Hermes priority lanes for the escalation count strip ──────────────────
export const PRIORITY_LANES: ReadonlyArray<HermesPriority> = [
  "p1-critical",
  "p2-high",
  "p3-watch",
  "p4-routine",
]
