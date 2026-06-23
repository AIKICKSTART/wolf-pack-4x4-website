import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "support",
  "title": "Support",
  "group": "Operations",
  "summary": "14 helpdesk primitives — tickets, SLA timers, conversation threads, CSAT/NPS surveys, triage rules, knowledge-base suggestions, and AI reply assistance — sharing a tone/status/priority/channel token system.",
  "entries": [
    {
      "key": "support/ticket-row",
      "family": "support",
      "name": "TicketRow",
      "label": "Ticket row",
      "description": "Summary card for one support ticket showing id, subject, customer avatar, status chip, priority chip, SLA timer, and assignee/updated meta.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/ticket-row",
      "tags": [
        "ticket",
        "helpdesk",
        "list-item"
      ],
      "status": "captured"
    },
    {
      "key": "support/ticket-priority-chip",
      "family": "support",
      "name": "TicketPriorityChip",
      "label": "Ticket priority chip",
      "description": "Tone-coded priority badge (P0..P3) with short or long label variant and a critical-state accent.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/ticket-priority-chip",
      "tags": [
        "ticket",
        "priority",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "support/support-conversation-thread",
      "family": "support",
      "name": "SupportConversationThread",
      "label": "Conversation thread",
      "description": "Ordered list of ticket messages, each with author/role, channel and visibility chips, timestamp, and public vs internal styling.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/support-conversation-thread",
      "tags": [
        "conversation",
        "thread",
        "messages"
      ],
      "status": "captured"
    },
    {
      "key": "support/internal-note-composer",
      "family": "support",
      "name": "InternalNoteComposer",
      "label": "Internal note composer",
      "description": "Auto-sizing private-note textarea with @-mention picker and Cmd/Ctrl+Enter save, marked not visible to the customer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/internal-note-composer",
      "tags": [
        "note",
        "mention",
        "composer"
      ],
      "status": "captured"
    },
    {
      "key": "support/macro-picker",
      "family": "support",
      "name": "MacroPicker",
      "label": "Macro picker",
      "description": "Searchable list of canned-reply macros with a live preview pane showing body, variable placeholders, and an insert action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/macro-picker",
      "tags": [
        "macro",
        "canned-reply",
        "picker"
      ],
      "status": "captured"
    },
    {
      "key": "support/sla-timer-chip",
      "family": "support",
      "name": "SlaTimerChip",
      "label": "SLA timer chip",
      "description": "Live-region chip that buckets and formats SLA remaining minutes, showing time-left or a breached state.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/sla-timer-chip",
      "tags": [
        "sla",
        "timer",
        "badge"
      ],
      "status": "captured"
    },
    {
      "key": "support/ticket-status-workflow",
      "family": "support",
      "name": "TicketStatusWorkflow",
      "label": "Ticket status workflow",
      "description": "Stepper of ordered ticket statuses marking past/current steps plus a footer of allowed next-state transitions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/ticket-status-workflow",
      "tags": [
        "status",
        "workflow",
        "stepper"
      ],
      "status": "captured"
    },
    {
      "key": "support/csat-score-card",
      "family": "support",
      "name": "CsatScoreCard",
      "label": "CSAT score card",
      "description": "Customer-satisfaction summary with average score, star rating, per-rating distribution bars, and an optional excerpted comment.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/csat-score-card",
      "tags": [
        "csat",
        "metrics",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "support/nps-survey-card",
      "family": "support",
      "name": "NpsSurveyCard",
      "label": "NPS survey card",
      "description": "Interactive 0-10 NPS survey with promoter/passive/detractor bucketing, optional comment, prior-score trend chip, and submit handling.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/nps-survey-card",
      "tags": [
        "nps",
        "survey",
        "feedback"
      ],
      "status": "captured"
    },
    {
      "key": "support/linked-articles-suggester",
      "family": "support",
      "name": "LinkedArticlesSuggester",
      "label": "Linked articles suggester",
      "description": "Side panel listing knowledge-base article suggestions with match-score chips and an open-in-side-pane action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/linked-articles-suggester",
      "tags": [
        "knowledge-base",
        "suggestions",
        "articles"
      ],
      "status": "captured"
    },
    {
      "key": "support/customer-profile-sidebar",
      "family": "support",
      "name": "CustomerProfileSidebar",
      "label": "Customer profile sidebar",
      "description": "Aside summarising a customer: avatar, contact links, AUD lifetime value, vehicles, prior tickets, and internal notes.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/customer-profile-sidebar",
      "tags": [
        "customer",
        "profile",
        "sidebar"
      ],
      "status": "captured"
    },
    {
      "key": "support/multi-channel-inbox",
      "family": "support",
      "name": "MultiChannelInbox",
      "label": "Multi-channel inbox",
      "description": "Tabbed inbox shell with per-channel counts, toggleable filter chips, and a children-rendered ticket-list pane.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/multi-channel-inbox",
      "tags": [
        "inbox",
        "channels",
        "tabs"
      ],
      "status": "captured"
    },
    {
      "key": "support/triage-rules-card",
      "family": "support",
      "name": "TriageRulesCard",
      "label": "Triage rule card",
      "description": "If/then/and card describing a triage rule's condition, route, set-priority, optional tags, enabled state, and match count.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/triage-rules-card",
      "tags": [
        "triage",
        "rule",
        "automation"
      ],
      "status": "captured"
    },
    {
      "key": "support/ai-suggested-reply-card",
      "family": "support",
      "name": "AiSuggestedReplyCard",
      "label": "AI suggested reply card",
      "description": "AI reply suggestion with confidence chip, optional rationale and source, and Use/Refine/Reject action buttons.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/support",
      "routeHref": "/ui-primitives/support/ai-suggested-reply-card",
      "tags": [
        "ai",
        "reply",
        "assist"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
