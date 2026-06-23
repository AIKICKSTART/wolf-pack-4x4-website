/**
 * Shared mock data for the workflow engine showcase scenes.
 *
 * Mufflermen-flavoured deterministic automations — quote follow-ups,
 * roadworthy expiry SMS, refund approvals, customer welcome, recall
 * outreach. Visual reference only — no real runtime behaviour.
 */

import type {
  AuditTrailEntry,
  EngineEdge,
  EngineStep,
  ErrorHandlerAction,
  FanOutLane,
  RunTraceSpan,
  WorkflowTemplate,
} from "../components/workflow-engine"

/* ------------------------------------------------------------------ */
/* Quote follow-up day-3 nudge — primary canvas + run-trace scenario   */
/* ------------------------------------------------------------------ */

export const QUOTE_FOLLOWUP_STEPS: ReadonlyArray<EngineStep> = [
  {
    kind: "trigger",
    id: "t1",
    x: 40,
    y: 80,
    title: "Quote sent",
    subtitle: "Shopify · quote.created",
    status: "passed",
    trigger: "event",
  },
  {
    kind: "wait",
    id: "s2",
    x: 240,
    y: 80,
    title: "Wait 3 business days",
    subtitle: "Skip weekends · AEST",
    status: "passed",
    durationLabel: "3d",
  },
  {
    kind: "decision",
    id: "s3",
    x: 440,
    y: 80,
    title: "Customer responded?",
    subtitle: "expr: quote.lastReplyAt > sent",
    status: "passed",
    expression: "quote.lastReplyAt > quote.sentAt",
  },
  {
    kind: "action",
    id: "s4",
    x: 660,
    y: 16,
    title: "Send follow-up SMS",
    subtitle: "Twilio · sms.send",
    status: "running",
    service: "twilio.sms",
  },
  {
    kind: "action",
    id: "s5",
    x: 660,
    y: 156,
    title: "Mark already engaged",
    subtitle: "CRM · note.append",
    status: "idle",
    service: "crm.note",
  },
  {
    kind: "wait",
    id: "s6",
    x: 880,
    y: 16,
    title: "Wait 2 days",
    subtitle: "Until 09:00 AEST",
    status: "idle",
    durationLabel: "2d",
  },
  {
    kind: "decision",
    id: "s7",
    x: 1080,
    y: 16,
    title: "Replied?",
    subtitle: "expr: customer.responded",
    status: "idle",
    expression: "customer.responded",
  },
  {
    kind: "end",
    id: "e1",
    x: 1300,
    y: 16,
    title: "Won quote",
    subtitle: "Move to booking",
    status: "idle",
  },
  {
    kind: "end",
    id: "e2",
    x: 1300,
    y: 156,
    title: "Quote stale",
    subtitle: "Archive · no further outreach",
    status: "idle",
  },
]

export const QUOTE_FOLLOWUP_STEPS_IDLE: ReadonlyArray<EngineStep> =
  QUOTE_FOLLOWUP_STEPS.map((step) => ({ ...step, status: "idle" }))

export const QUOTE_FOLLOWUP_STEPS_FAILED: ReadonlyArray<EngineStep> =
  QUOTE_FOLLOWUP_STEPS.map((step) => {
    if (step.id === "s4") {
      return { ...step, status: "failed" }
    }
    if (step.id === "t1" || step.id === "s2" || step.id === "s3") {
      return { ...step, status: "passed" }
    }
    return { ...step, status: "idle" }
  })

export const QUOTE_FOLLOWUP_EDGES: ReadonlyArray<EngineEdge> = [
  { id: "e-t1-s2", from: "t1", to: "s2" },
  { id: "e-s2-s3", from: "s2", to: "s3" },
  { id: "e-s3-s4", from: "s3", to: "s4", label: "no", tone: "amber" },
  { id: "e-s3-s5", from: "s3", to: "s5", label: "yes", tone: "green" },
  { id: "e-s4-s6", from: "s4", to: "s6" },
  { id: "e-s6-s7", from: "s6", to: "s7" },
  { id: "e-s7-e1", from: "s7", to: "e1", label: "yes", tone: "green" },
  { id: "e-s7-e2", from: "s7", to: "e2", label: "no", tone: "red", dashed: true },
]

/* ------------------------------------------------------------------ */
/* Triggers                                                            */
/* ------------------------------------------------------------------ */

export const QUOTE_TRIGGER_PAYLOAD = `{
  "event": "quote.created",
  "quote": {
    "id": "QT-48291",
    "customer": "Mick Bramley",
    "vehicle": "Nissan Patrol Y61 · 1KW-9P3",
    "total": 1480.0,
    "sentAt": "2026-05-25T09:14:00+10:00"
  }
}`

export const RWC_TRIGGER_PAYLOAD = `{
  "schedule": "0 9 * * *",
  "scope": "rego.expiry <= now+7d",
  "window": "rolling 7 days",
  "tz": "Australia/Sydney"
}`

export const REFUND_TRIGGER_PAYLOAD = `{
  "event": "refund.requested",
  "refund": {
    "id": "RF-1138",
    "quote": "QT-48127",
    "customer": "Jess Calabro",
    "amount": 285.00,
    "reason": "Customer-cancelled · already paid"
  }
}`

/* ------------------------------------------------------------------ */
/* Run history                                                         */
/* ------------------------------------------------------------------ */

export const QUOTE_RUN_HISTORY = [
  {
    runId: "RUN-48291",
    startedAt: "2026-05-29 09:14",
    triggerKind: "event" as const,
    triggerLabel: "Quote sent · QT-48291",
    status: "running" as const,
    durationMs: 192_000,
    stepsCompleted: 4,
    stepsTotal: 7,
    finalStepLabel: "Send follow-up SMS",
  },
  {
    runId: "RUN-48289",
    startedAt: "2026-05-29 08:42",
    triggerKind: "event" as const,
    triggerLabel: "Quote sent · QT-48289",
    status: "passed" as const,
    durationMs: 4_320_000,
    stepsCompleted: 7,
    stepsTotal: 7,
    finalStepLabel: "Won quote",
  },
  {
    runId: "RUN-48285",
    startedAt: "2026-05-28 16:18",
    triggerKind: "event" as const,
    triggerLabel: "Quote sent · QT-48285",
    status: "failed" as const,
    durationMs: 51_000,
    stepsCompleted: 3,
    stepsTotal: 7,
    finalStepLabel: "Send follow-up SMS",
  },
  {
    runId: "RUN-48281",
    startedAt: "2026-05-28 12:04",
    triggerKind: "event" as const,
    triggerLabel: "Quote sent · QT-48281",
    status: "cancelled" as const,
    durationMs: 28_000,
    stepsCompleted: 2,
    stepsTotal: 7,
    finalStepLabel: "Customer responded?",
  },
  {
    runId: "RUN-48274",
    startedAt: "2026-05-28 09:01",
    triggerKind: "event" as const,
    triggerLabel: "Quote sent · QT-48274",
    status: "passed" as const,
    durationMs: 8_640_000,
    stepsCompleted: 7,
    stepsTotal: 7,
    finalStepLabel: "Quote stale",
  },
  {
    runId: "RUN-48270",
    startedAt: "2026-05-27 17:55",
    triggerKind: "manual" as const,
    triggerLabel: "Eddie · replay QT-48184",
    status: "waiting" as const,
    durationMs: 720_000,
    stepsCompleted: 5,
    stepsTotal: 7,
    finalStepLabel: "Manager approval",
  },
]

/* ------------------------------------------------------------------ */
/* Manual approval — refund over $200                                  */
/* ------------------------------------------------------------------ */

export const REFUND_APPROVAL = {
  kicker: "Refund > $200",
  title: "Approve Mick's refund · RF-1138",
  approverName: "Eddie Vrahnos",
  approverRole: "Workshop manager · Oak Flats",
  approverInitials: "EV",
  reason:
    "Customer cancelled day-of-fit after the quote was already paid. Twin cat-back was unboxed. Eddie inspects → if no damage, approve full refund; otherwise restocking fee.",
  amount: 285.0,
  requestedAtLabel: "2026-05-29 09:14",
  expiresInMs: 4 * 60 * 60 * 1000,
} as const

/* ------------------------------------------------------------------ */
/* Fan-out — new customer welcome triple-tap                           */
/* ------------------------------------------------------------------ */

export const WELCOME_FAN_OUT_LANES: ReadonlyArray<FanOutLane> = [
  {
    id: "lane-sms",
    label: "SMS · welcome",
    service: "Twilio · sms.send",
    status: "passed",
    runtimeMs: 1_240,
  },
  {
    id: "lane-email",
    label: "Email · welcome series #1",
    service: "Mailgun · transactional",
    status: "passed",
    runtimeMs: 2_180,
  },
  {
    id: "lane-card",
    label: "Loyalty card · provision",
    service: "Loyalty · card.create",
    status: "running",
    runtimeMs: 3_460,
  },
  {
    id: "lane-crm",
    label: "CRM · mark VIP-eligible",
    service: "CRM · contact.update",
    status: "idle",
    runtimeMs: 420,
  },
]

/* ------------------------------------------------------------------ */
/* Error handler — Twilio SMS retries                                  */
/* ------------------------------------------------------------------ */

export const SMS_ERROR_ACTIONS: ReadonlyArray<ErrorHandlerAction> = [
  {
    id: "act-1",
    kind: "retry",
    label: "Retry · exponential backoff",
    target: "twilio.sms.send · max 3 · base 30s",
    hits7d: 14,
  },
  {
    id: "act-2",
    kind: "catch",
    label: "Catch carrier-blocked",
    target: "regex /CarrierUnreachable/",
    hits7d: 3,
  },
  {
    id: "act-3",
    kind: "alert",
    label: "Alert Eddie via PagerDuty",
    target: "PagerDuty · oncall-workshop",
    hits7d: 1,
  },
  {
    id: "act-4",
    kind: "compensate",
    label: "Queue manual call-back",
    target: "Inbox · call.queue",
    hits7d: 1,
  },
]

/* ------------------------------------------------------------------ */
/* Variable explorer — refund flow                                     */
/* ------------------------------------------------------------------ */

export const REFUND_VAR_ROWS = [
  {
    source: "trigger.refund.id",
    sourceKind: "trigger" as const,
    type: "string" as const,
    target: "step3.input.refundId",
    sample: "RF-1138",
    required: true,
  },
  {
    source: "trigger.refund.amount",
    sourceKind: "trigger" as const,
    type: "currency" as const,
    target: "step2.input.amount",
    sample: "A$285.00",
    required: true,
  },
  {
    source: "trigger.refund.customer",
    sourceKind: "trigger" as const,
    type: "string" as const,
    target: "step4.input.recipient",
    sample: "Jess Calabro",
  },
  {
    source: "constant.gst",
    sourceKind: "constant" as const,
    type: "number" as const,
    target: "step3.input.gstRate",
    sample: "0.10",
  },
  {
    source: "context.workshopTz",
    sourceKind: "context" as const,
    type: "string" as const,
    target: "step5.input.timezone",
    sample: "Australia/Sydney",
  },
  {
    source: "secret.stripeKey",
    sourceKind: "secret" as const,
    type: "string" as const,
    target: "step6.input.apiKey",
    sample: "sk_live_•••",
    required: true,
  },
  {
    source: "step2.output.approved",
    sourceKind: "step" as const,
    type: "boolean" as const,
    target: "step3.input.guard",
    sample: "true",
    required: true,
  },
]

/* ------------------------------------------------------------------ */
/* Run trace — refund flow                                              */
/* ------------------------------------------------------------------ */

export const REFUND_TRACE_SPANS: ReadonlyArray<RunTraceSpan> = [
  {
    id: "sp-1",
    label: "Trigger · refund.requested",
    service: "Webhook · /hooks/refund",
    status: "passed",
    startOffsetMs: 0,
    durationMs: 90,
    message: "Body validated · RF-1138 · A$285.00",
    level: "info",
  },
  {
    id: "sp-2",
    label: "Decision · amount > 200",
    service: "expr: refund.amount > 200",
    status: "passed",
    startOffsetMs: 120,
    durationMs: 18,
    message: "Branch · YES · escalate to manager",
    level: "info",
  },
  {
    id: "sp-3",
    label: "Approval · manager gate",
    service: "Manual · Eddie Vrahnos",
    status: "passed",
    startOffsetMs: 220,
    durationMs: 18_400,
    message: "Approved by Eddie · note: pack inspected, no damage",
    level: "info",
  },
  {
    id: "sp-4",
    label: "Action · Stripe refund",
    service: "Stripe · refunds.create",
    status: "passed",
    startOffsetMs: 18_700,
    durationMs: 642,
  },
  {
    id: "sp-5",
    label: "Action · notify customer",
    service: "Twilio · sms.send",
    status: "failed",
    startOffsetMs: 19_400,
    durationMs: 4_120,
    message: "Twilio 503 · CarrierUnreachable · scheduled retry in 30s",
    level: "warn",
  },
  {
    id: "sp-6",
    label: "Action · audit log",
    service: "Loki · log.append",
    status: "passed",
    startOffsetMs: 23_650,
    durationMs: 86,
  },
]

/* ------------------------------------------------------------------ */
/* Audit trail — quote follow-up                                       */
/* ------------------------------------------------------------------ */

export const QUOTE_AUDIT_ENTRIES: ReadonlyArray<AuditTrailEntry> = [
  {
    id: "ev-1",
    event: "edited",
    actor: "Daniel Fleuren",
    actorRole: "Platform · Verridian",
    timestamp: "2026-05-29 09:18 AEST",
    summary:
      "Tightened day-3 nudge expression — now requires customer.lastReplyAt > sentAt instead of any open event.",
    versionTag: "v3.2",
  },
  {
    id: "ev-2",
    event: "approved",
    actor: "Eddie Vrahnos",
    actorRole: "Workshop manager",
    timestamp: "2026-05-29 09:02 AEST",
    summary: "Approved v3.2 review checklist — flow safe to roll out.",
    versionTag: "v3.2",
  },
  {
    id: "ev-3",
    event: "published",
    actor: "Daniel Fleuren",
    actorRole: "Platform · Verridian",
    timestamp: "2026-05-29 08:47 AEST",
    summary: "Published v3.2 → production. Old runs continue on v3.1.",
    versionTag: "v3.2",
  },
  {
    id: "ev-4",
    event: "edited",
    actor: "Hermes",
    actorRole: "AI assist · draft mode",
    timestamp: "2026-05-28 22:11 AEST",
    summary:
      "Drafted day-5 nudge variant. Pending human review — currently disabled.",
    versionTag: "v3.2-draft",
  },
  {
    id: "ev-5",
    event: "reverted",
    actor: "Eddie Vrahnos",
    actorRole: "Workshop manager",
    timestamp: "2026-05-26 17:35 AEST",
    summary:
      "Reverted v3.1 nudge timing back to 3 days after the post-fit feedback came in too eager at 24h.",
    versionTag: "v3.1",
  },
  {
    id: "ev-6",
    event: "created",
    actor: "Daniel Fleuren",
    actorRole: "Platform · Verridian",
    timestamp: "2026-05-12 14:02 AEST",
    summary: "Workflow created. Initial v1 — single SMS nudge at day 7.",
    versionTag: "v1.0",
  },
]

/* ------------------------------------------------------------------ */
/* Template library                                                    */
/* ------------------------------------------------------------------ */

export const WORKSHOP_TEMPLATES: ReadonlyArray<WorkflowTemplate> = [
  {
    id: "tpl-quote-followup",
    title: "Quote follow-up · day 3 nudge",
    summary:
      "Wait 3 business days after a quote is sent, branch on customer engagement, SMS reminder if quiet.",
    category: "Sales",
    iconKind: "quote",
    steps: 7,
    installCount: 184,
    tone: "teal",
    recommended: true,
  },
  {
    id: "tpl-rwc-expiry",
    title: "Roadworthy expiry SMS · T-7d",
    summary:
      "Daily 9am cron scans rego.expiry. Send SMS 7 days out, escalate to Hermes if no booking is made.",
    category: "Compliance",
    iconKind: "compliance",
    steps: 5,
    installCount: 96,
    tone: "amber",
  },
  {
    id: "tpl-refund-over-200",
    title: "Refund > $200 → manager approval",
    summary:
      "Refund webhook triggers a manager gate when amount exceeds A$200. Approves to Stripe, notifies customer.",
    category: "Finance",
    iconKind: "refund",
    steps: 6,
    installCount: 67,
    tone: "green",
    recommended: true,
  },
  {
    id: "tpl-customer-welcome",
    title: "New customer welcome",
    summary:
      "Fan-out SMS + email + loyalty card provisioning on first booking. Marks contact VIP-eligible.",
    category: "Customer success",
    iconKind: "welcome",
    steps: 4,
    installCount: 142,
    tone: "violet",
  },
  {
    id: "tpl-recall-hit",
    title: "Recall hit → SMS reach-out",
    summary:
      "When a vehicle in our system matches a published recall, SMS the customer with workshop callback.",
    category: "Service",
    iconKind: "recall",
    steps: 5,
    installCount: 41,
    tone: "red",
  },
  {
    id: "tpl-pdi-checklist",
    title: "PDI checklist playbook",
    summary:
      "Pre-delivery inspection sequence — bay assignment, parts pull, multi-tech sign-off, customer hand-off.",
    category: "Workshop ops",
    iconKind: "playbook",
    steps: 9,
    installCount: 73,
    tone: "neutral",
  },
]
