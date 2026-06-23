import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "live-chat",
  "title": "Live chat operator console",
  "group": "Operations",
  "summary": "14 live-chat operator console primitives — queue inbox, active chat window, status pills, macros, customer context, co-browsing, sentiment, transfer/wrap-up dialogs, volume gauge, SLA chip, multi-chat tabs, team presence, and KB suggester — sharing a live-chat-types tone/status vocabulary.",
  "entries": [
    {
      "key": "live-chat/chat-queue-inbox",
      "family": "live-chat",
      "name": "ChatQueueInbox",
      "label": "Chat queue inbox",
      "description": "Filterable pending-chat queue (mine/unassigned/at-risk) with per-row avatar, wait time, preview and SLA risk chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/chat-queue-inbox",
      "tags": [
        "queue",
        "inbox",
        "sla"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/active-chat-window",
      "family": "live-chat",
      "name": "ActiveChatWindow",
      "label": "Active chat window",
      "description": "Live conversation surface with visitor header, message-bubble transcript, typing indicator and a reply composer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/active-chat-window",
      "tags": [
        "chat",
        "transcript",
        "composer"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/operator-status-pill",
      "family": "live-chat",
      "name": "OperatorStatusPill",
      "label": "Operator status pill",
      "description": "Toned availability pill (available/away/in-wrap/busy/offline) with pulsing dot, label, hint and optional status-menu trigger.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/operator-status-pill",
      "tags": [
        "status",
        "presence",
        "pill"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/quick-replies-macro-panel",
      "family": "live-chat",
      "name": "QuickRepliesMacroPanel",
      "label": "Quick replies + macros",
      "description": "Macro insertion panel wrapping a MacroPicker with pinned quick-reply shortcut chips for fast canned responses.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/quick-replies-macro-panel",
      "tags": [
        "macros",
        "shortcuts",
        "replies"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/customer-context-card",
      "family": "live-chat",
      "name": "CustomerContextCard",
      "label": "Customer context card",
      "description": "Visitor profile card showing identity, current page, cart contents with AUD total, and past-chat/open-ticket stats.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/customer-context-card",
      "tags": [
        "customer",
        "context",
        "cart"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/co-browsing-screen-viewer",
      "family": "live-chat",
      "name": "CoBrowsingScreenViewer",
      "label": "Co-browsing screen viewer",
      "description": "Read-only mock browser frame mirroring the visitor's screen with URL bar, skeleton canvas, pointer indicator and request-control action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/co-browsing-screen-viewer",
      "tags": [
        "co-browsing",
        "screen-share",
        "viewer"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/sentiment-indicator",
      "family": "live-chat",
      "name": "SentimentIndicator",
      "label": "Sentiment indicator",
      "description": "Radial-meter sentiment read (-100..100) bucketed with tone chip, score line and recent-shift trend glyph.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/sentiment-indicator",
      "tags": [
        "sentiment",
        "meter",
        "trend"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/transfer-chat-modal",
      "family": "live-chat",
      "name": "TransferChatModal",
      "label": "Transfer chat modal",
      "description": "Dialog to hand a chat to another operator or team, with availability rows, load counts, transfer-with-context toggle and a hand-off note.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/transfer-chat-modal",
      "tags": [
        "transfer",
        "modal",
        "routing"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/wrap-up-form",
      "family": "live-chat",
      "name": "WrapUpForm",
      "label": "Wrap-up form",
      "description": "Post-chat dialog to categorise the outcome, tag the chat, add notes and optionally email a transcript before closing.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/wrap-up-form",
      "tags": [
        "wrap-up",
        "form",
        "outcome"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/chat-volume-gauge",
      "family": "live-chat",
      "name": "ChatVolumeGauge",
      "label": "Chat volume gauge",
      "description": "Team-load radial gauge showing chats in progress vs capacity with utilisation percent, queue length and next-pickup ETA chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/chat-volume-gauge",
      "tags": [
        "volume",
        "gauge",
        "capacity"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/chat-sla-timer-chip",
      "family": "live-chat",
      "name": "ChatSlaTimerChip",
      "label": "Chat SLA timer chip",
      "description": "Compact SLA countdown chip for first/next-response or resolution targets, wrapping the shared SlaTimerChip with a kind label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/chat-sla-timer-chip",
      "tags": [
        "sla",
        "timer",
        "chip"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/multi-chat-tabs",
      "family": "live-chat",
      "name": "MultiChatTabs",
      "label": "Multi-chat tabs",
      "description": "Tablist of concurrent active chats with avatar, context, unread badge, per-tab close and an optional new-chat affordance.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/multi-chat-tabs",
      "tags": [
        "tabs",
        "multitasking",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/operator-team-presence",
      "family": "live-chat",
      "name": "OperatorTeamPresence",
      "label": "Operator team presence",
      "description": "Roster panel listing operators with status-mapped avatars, role caption and per-operator load/capacity with near/over states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/operator-team-presence",
      "tags": [
        "presence",
        "team",
        "roster"
      ],
      "status": "captured"
    },
    {
      "key": "live-chat/kb-snippet-suggester",
      "family": "live-chat",
      "name": "KbSnippetSuggester",
      "label": "KB snippet suggester",
      "description": "Ranked knowledge-base article suggestions with match-score chip, category/read-time meta, preview and insert/open actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-chat",
      "routeHref": "/ui-primitives/live-chat/kb-snippet-suggester",
      "tags": [
        "knowledge-base",
        "suggestions",
        "macros"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
