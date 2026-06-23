import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "hermes-agent",
  "title": "Hermes agent",
  "group": "AI",
  "summary": "14 control-plane primitives for the Hermes AI customer-service agent: live conversation chat/transcript surfaces, run-step timelines, tool palette, knowledge-source sync rows, persona/prompt editors, safety-filter and cost-budget dashboards, automation rules, and human-handoff/escalation queue surfaces.",
  "entries": [
    {
      "key": "hermes-agent/agent-chat-panel",
      "family": "hermes-agent",
      "name": "AgentChatPanel",
      "label": "Agent chat panel",
      "description": "Live Hermes conversation surface composing customer/agent message bubbles with citation pills, tool-call traces, streaming indicator, channel chips, and a prompt composer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/agent-chat-panel",
      "tags": [
        "chat",
        "agent",
        "conversation",
        "ai"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/run-timeline",
      "family": "hermes-agent",
      "name": "RunTimeline",
      "label": "Run timeline",
      "description": "Ordered timeline of agent run steps (plan/tool/reflection/response/handoff) with per-step status, payload, timing, and token/cost/duration summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/run-timeline",
      "tags": [
        "timeline",
        "trace",
        "agent",
        "observability"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/tool-palette",
      "family": "hermes-agent",
      "name": "ToolPalette",
      "label": "Tool palette",
      "description": "Grid of agent tools showing per-tool enabled state, 24h usage, p50 latency, failure rate, and a usage-trend sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/tool-palette",
      "tags": [
        "tools",
        "dashboard",
        "metrics",
        "agent"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/automation-rule-card",
      "family": "hermes-agent",
      "name": "AutomationRuleCard",
      "label": "Automation rule card",
      "description": "Controllable trigger/condition/action automation rule card with an on/off toggle, run stats, success rate, and recent run-history chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/automation-rule-card",
      "tags": [
        "automation",
        "rules",
        "toggle",
        "agent"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/knowledge-source-row",
      "family": "hermes-agent",
      "name": "KnowledgeSourceRow",
      "label": "Knowledge source row",
      "description": "List row for a connected knowledge source (CMS/Drive/feed/transcripts/Shopify) showing sync status, record count, sync progress, and re-sync/configure actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/knowledge-source-row",
      "tags": [
        "knowledge",
        "rag",
        "sync",
        "row"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/persona-editor",
      "family": "hermes-agent",
      "name": "PersonaEditor",
      "label": "Persona editor",
      "description": "Persona configuration surface with system-prompt textarea, tone-profile chips, refusal/guardrail rules, workshop-hours grid, and escalation paths.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/persona-editor",
      "tags": [
        "persona",
        "prompt",
        "config",
        "guardrails"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/handoff-card",
      "family": "hermes-agent",
      "name": "HandoffCard",
      "label": "Handoff card",
      "description": "Agent-to-human handoff card showing reason, channel/priority chips, assignee avatar/role, SLA accept-by countdown, and an accept action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/handoff-card",
      "tags": [
        "handoff",
        "escalation",
        "sla",
        "agent"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/evaluation-rubric-grid",
      "family": "hermes-agent",
      "name": "EvaluationRubricGrid",
      "label": "Evaluation rubric grid",
      "description": "Per-run quality scoring table across accuracy/tone/safety/resolution axes with score bars, overall average, and a graded summary chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/evaluation-rubric-grid",
      "tags": [
        "evaluation",
        "rubric",
        "scoring",
        "data-viz"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/prompt-template-card",
      "family": "hermes-agent",
      "name": "PromptTemplateCard",
      "label": "Prompt template card",
      "description": "Versioned prompt-template card rendering the template body with highlighted {{tokens}}, test-case pass/fail list, and a win-rate trend sparkline.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/prompt-template-card",
      "tags": [
        "prompt",
        "template",
        "testing",
        "versioning"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/cost-budget-panel",
      "family": "hermes-agent",
      "name": "CostBudgetPanel",
      "label": "Cost budget panel",
      "description": "Token-spend dashboard with a radial burn gauge, spent/budget/projected stats, segmented burn-rate bar, and an hourly-spend bar chart.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/cost-budget-panel",
      "tags": [
        "cost",
        "budget",
        "tokens",
        "data-viz"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/safety-filter-strip",
      "family": "hermes-agent",
      "name": "SafetyFilterStrip",
      "label": "Safety filter strip",
      "description": "Pre/post safety-filter pipeline strip showing each filter's phase, 24h hit count, and hit rate, plus an inspected/blocked/escalated summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/safety-filter-strip",
      "tags": [
        "safety",
        "moderation",
        "guardrails",
        "pipeline"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/live-conversation-row",
      "family": "hermes-agent",
      "name": "LiveConversationRow",
      "label": "Live conversation row",
      "description": "Selectable conversation list row with customer avatar/status, channel and state chips, last-message preview, queue time, and optional confidence chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/live-conversation-row",
      "tags": [
        "conversation",
        "queue",
        "row",
        "inbox"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/escalation-queue-card",
      "family": "hermes-agent",
      "name": "EscalationQueueCard",
      "label": "Escalation queue card",
      "description": "Priority-sorted escalation queue listing each item's priority/reason/wait-time and assigned handler, with an open/breached/resolved summary strip and empty state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/escalation-queue-card",
      "tags": [
        "escalation",
        "queue",
        "sla",
        "agent"
      ],
      "status": "improved"
    },
    {
      "key": "hermes-agent/transcript-viewer",
      "family": "hermes-agent",
      "name": "TranscriptViewer",
      "label": "Transcript viewer",
      "description": "Read-only conversation transcript with speaker-colored turns, expandable tool-call payloads, inline citation pills, and a duration/outcome header.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/hermes-agent",
      "routeHref": "/ui-primitives/hermes-agent/transcript-viewer",
      "tags": [
        "transcript",
        "conversation",
        "citations",
        "read-only"
      ],
      "status": "improved"
    }
  ]
}

export default manifest
