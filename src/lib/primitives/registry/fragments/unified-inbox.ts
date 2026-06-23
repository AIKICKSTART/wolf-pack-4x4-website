import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "unified-inbox",
  "title": "Unified inbox",
  "group": "Operations",
  "summary": "14 omnichannel support-inbox widgets — multi-channel list, threaded conversation view, macro composer, assignment, sentiment/priority/tag controls, customer context, bulk actions, team presence, SLA countdown, auto-reply rules, merge modal, and channel connection status — sharing a UnifiedConversation/Teammate data model and tone/glyph const maps.",
  "entries": [
    {
      "key": "unified-inbox/multi-channel-list",
      "family": "unified-inbox",
      "name": "MultiChannelList",
      "label": "Multi-channel list",
      "description": "Searchable, channel-filtered conversation list rail with per-row channel badge, sentiment dot, and unread count.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/multi-channel-list",
      "tags": [
        "inbox",
        "list",
        "filter",
        "support"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/conversation-thread-view",
      "family": "unified-inbox",
      "name": "ConversationThreadView",
      "label": "Conversation thread view",
      "description": "Threaded message stream with channel-tagged inbound/outbound bubbles, author, timestamps, and read/delivered state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/conversation-thread-view",
      "tags": [
        "inbox",
        "thread",
        "messages",
        "support"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/composer-with-macros",
      "family": "unified-inbox",
      "name": "ComposerWithMacros",
      "label": "Composer with macros",
      "description": "Auto-sizing reply composer with canned-reply macro chips, variable-token insertion, char count, and Cmd/Ctrl+Enter send.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/composer-with-macros",
      "tags": [
        "inbox",
        "composer",
        "macros",
        "reply"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/assign-to-card",
      "family": "unified-inbox",
      "name": "AssignToCard",
      "label": "Assign to card",
      "description": "Teammate assignment card listing presence, role, and workload-vs-capacity bars with toggle-select and unassign.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/assign-to-card",
      "tags": [
        "inbox",
        "assignment",
        "team",
        "presence"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/sentiment-tag-strip",
      "family": "unified-inbox",
      "name": "SentimentTagStrip",
      "label": "Sentiment tag strip",
      "description": "Radiogroup of sentiment chips (positive/neutral/negative/upset) marking the AI-detected value and confirming an override.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/sentiment-tag-strip",
      "tags": [
        "inbox",
        "sentiment",
        "ai",
        "triage"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/priority-flag-row",
      "family": "unified-inbox",
      "name": "PriorityFlagRow",
      "label": "Priority flag row",
      "description": "Segmented priority toggle (low/normal/high/urgent) as a radiogroup driving SLA and escalation routing.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/priority-flag-row",
      "tags": [
        "inbox",
        "priority",
        "triage",
        "sla"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/customer-context-rail",
      "family": "unified-inbox",
      "name": "CustomerContextRail",
      "label": "Customer context rail",
      "description": "Customer profile sidebar with avatar, contact details, lifetime-value/job-count stats, and recent-jobs list in AUD.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/customer-context-rail",
      "tags": [
        "inbox",
        "customer",
        "context",
        "crm"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/bulk-action-bar",
      "family": "unified-inbox",
      "name": "BulkActionBar",
      "label": "Bulk action bar",
      "description": "Selection action bar showing selected count and assign/move/close/spam bulk actions with a dismiss control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/bulk-action-bar",
      "tags": [
        "inbox",
        "bulk",
        "actions",
        "selection"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/team-presence-rail",
      "family": "unified-inbox",
      "name": "TeamPresenceRail",
      "label": "Team presence rail",
      "description": "Read-only team roster rail summarizing online count and total load, with per-teammate presence chip and workload bar.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/team-presence-rail",
      "tags": [
        "inbox",
        "team",
        "presence",
        "workload"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/sla-countdown-tile",
      "family": "unified-inbox",
      "name": "SlaCountdownTile",
      "label": "SLA countdown tile",
      "description": "SLA status tile with remaining-time readout, progress bar, derived breach bucket, and a breach-alert escalation prompt.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/sla-countdown-tile",
      "tags": [
        "inbox",
        "sla",
        "countdown",
        "metric"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/auto-reply-rule-card",
      "family": "unified-inbox",
      "name": "AutoReplyRuleCard",
      "label": "Auto-reply rule card",
      "description": "Toggleable auto-reply rule card (out-of-hours/away/first-touch) with schedule summary, quoted body, and channel chips.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/auto-reply-rule-card",
      "tags": [
        "inbox",
        "automation",
        "auto-reply",
        "rules"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/merge-conversations-modal",
      "family": "unified-inbox",
      "name": "MergeConversationsModal",
      "label": "Merge conversations modal",
      "description": "Dialog to fold duplicate conversations into a primary thread with checkbox selection and a keep-full-history switch.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/merge-conversations-modal",
      "tags": [
        "inbox",
        "merge",
        "modal",
        "deduplicate"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/tag-manager-strip",
      "family": "unified-inbox",
      "name": "TagManagerStrip",
      "label": "Tag manager strip",
      "description": "Color-tag input with combobox autocomplete, keyboard add/remove, and tone auto-derived from the tag label.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/tag-manager-strip",
      "tags": [
        "inbox",
        "tags",
        "combobox",
        "labels"
      ],
      "status": "captured"
    },
    {
      "key": "unified-inbox/channel-status-row",
      "family": "unified-inbox",
      "name": "ChannelStatusRow",
      "label": "Channel status row",
      "description": "Connection-status cards per channel showing handle, last sync, connection-state chip, and a reconnect action when attention is needed.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/unified-inbox",
      "routeHref": "/ui-primitives/unified-inbox/channel-status-row",
      "tags": [
        "inbox",
        "channels",
        "connection",
        "status"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
