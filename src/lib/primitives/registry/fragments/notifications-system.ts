import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "notifications-system",
  "title": "Notifications system",
  "group": "System",
  "summary": "14 notification primitives — toast stack/card, banners, push permission, channel-matrix preferences, snooze, digest scheduler, sound presets, do-not-disturb, notification center, priority/escalation rules, quiet-hours pill, message templates, and delivery reporting.",
  "entries": [
    {
      "key": "notifications-system/toast-stack",
      "family": "notifications-system",
      "name": "ToastStack",
      "label": "Toast stack",
      "description": "Placement-anchored stack of toasts with a collapse/expand control that shows N latest and an overflow toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/toast-stack",
      "tags": [
        "toast",
        "stack",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/toast-card",
      "family": "notifications-system",
      "name": "ToastCard",
      "label": "Toast card",
      "description": "Single tone-coded toast (info/success/warning/danger) with optional action, dismiss, meta line, and an rAF countdown bar.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/toast-card",
      "tags": [
        "toast",
        "alert",
        "countdown"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/banner-strip",
      "family": "notifications-system",
      "name": "BannerStrip",
      "label": "Banner strip",
      "description": "Full-width dismissible banner with announcement/alert/promo/maintenance variants, icon, message, and optional CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/banner-strip",
      "tags": [
        "banner",
        "announcement",
        "dismissible"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/push-permission-card",
      "family": "notifications-system",
      "name": "PushPermissionCard",
      "label": "Push permission card",
      "description": "Push opt-in card with benefit list and prompt/granted/denied states driving allow/decline actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/push-permission-card",
      "tags": [
        "push",
        "permission",
        "opt-in"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/preference-panel",
      "family": "notifications-system",
      "name": "PreferencePanel",
      "label": "Preference panel",
      "description": "Per-event channel-matrix table of toggle switches routing each event to in-app/email/SMS/push channels.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/preference-panel",
      "tags": [
        "preferences",
        "matrix",
        "channels"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/snooze-controller",
      "family": "notifications-system",
      "name": "SnoozeController",
      "label": "Snooze controller",
      "description": "Radiogroup of snooze-duration chips with an active resumes-at status row and a wake-up clear action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/snooze-controller",
      "tags": [
        "snooze",
        "timer",
        "mute"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/digest-scheduler",
      "family": "notifications-system",
      "name": "DigestScheduler",
      "label": "Digest scheduler",
      "description": "Daily/weekly digest config with weekday picker, send-time, timezone select, and a live recipients summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/digest-scheduler",
      "tags": [
        "digest",
        "schedule",
        "cadence"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/sound-preset-row",
      "family": "notifications-system",
      "name": "SoundPresetRow",
      "label": "Sound preset row",
      "description": "Selectable sound-preset radio row with a user-initiated audio preview (never auto-plays) and silent-preset handling.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/sound-preset-row",
      "tags": [
        "sound",
        "preview",
        "preset"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/do-not-disturb-card",
      "family": "notifications-system",
      "name": "DoNotDisturbCard",
      "label": "Do not disturb card",
      "description": "DND scheduler with enable switch, weekday selection, and a quiet-from/resume-at time window with a live summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/do-not-disturb-card",
      "tags": [
        "dnd",
        "schedule",
        "quiet"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/notification-center-panel",
      "family": "notifications-system",
      "name": "NotificationCenterPanel",
      "label": "Notification center panel",
      "description": "Dialog inbox with search, all/unread/alerts tabs, day-grouped items, unread count, and mark-all-read.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/notification-center-panel",
      "tags": [
        "inbox",
        "center",
        "feed"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/priority-rule-row",
      "family": "notifications-system",
      "name": "PriorityRuleRow",
      "label": "Priority rule row",
      "description": "Escalation rule row: if-unread-for-minutes then action (escalate/page/email/SMS) with an enable toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/priority-rule-row",
      "tags": [
        "escalation",
        "rule",
        "priority"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/quiet-hours-pill",
      "family": "notifications-system",
      "name": "QuietHoursPill",
      "label": "Quiet hours pill",
      "description": "Compact status pill showing quiet-hours active/inactive/scheduled state with window, days, and an edit affordance.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/quiet-hours-pill",
      "tags": [
        "quiet-hours",
        "status",
        "pill"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/event-template-card",
      "family": "notifications-system",
      "name": "EventTemplateCard",
      "label": "Event template card",
      "description": "Per-event/channel message-template editor with optional subject, body textarea, and insertable merge tags.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/event-template-card",
      "tags": [
        "template",
        "merge-tags",
        "editor"
      ],
      "status": "captured"
    },
    {
      "key": "notifications-system/delivery-report-row",
      "family": "notifications-system",
      "name": "DeliveryReportRow",
      "label": "Delivery report row",
      "description": "Delivery-log row showing status (queued→clicked/failed/bounced), channel, recipient, latency, attempts, and retry.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications-system",
      "routeHref": "/ui-primitives/notifications-system/delivery-report-row",
      "tags": [
        "delivery",
        "report",
        "status"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
