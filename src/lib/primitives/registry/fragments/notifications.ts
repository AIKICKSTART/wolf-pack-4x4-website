import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "notifications",
  "title": "Notifications",
  "group": "System",
  "summary": "14 notification primitives spanning alert surfaces (bell, popover, card, history timeline) and delivery-preference controls (read-state, snooze, quiet hours, channel matrix, rule builder, subscribe) plus channel previews and an unsubscribe template.",
  "entries": [
    {
      "key": "notifications/notification-bell",
      "family": "notifications",
      "name": "NotificationBell",
      "label": "Notification bell",
      "description": "Bell icon button with an unread count badge (red/amber tone), max-cap formatting, and a pulse dot, exposing aria-live unread status.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/bell",
      "tags": [
        "bell",
        "badge",
        "unread"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/notification-popover",
      "family": "notifications",
      "name": "NotificationPopover",
      "label": "Notification popover",
      "description": "Dialog popover listing recent notifications with all/unread/mentions tabs, mark-all-read, auto-animated list, and a see-all footer link.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/popover",
      "tags": [
        "popover",
        "feed",
        "tabs"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/notification-card",
      "family": "notifications",
      "name": "NotificationCard",
      "label": "Notification card",
      "description": "Article-style notification row with actor avatar or tone glyph, kicker/title/excerpt, action buttons, and an embedded read-state toggle.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/card",
      "tags": [
        "card",
        "actions",
        "read-state"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/notification-history-timeline",
      "family": "notifications",
      "name": "NotificationHistoryTimeline",
      "label": "History timeline",
      "description": "Date-grouped notification history region with per-group total/unread counts and tone-dotted rows with timestamps.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/history-timeline",
      "tags": [
        "timeline",
        "history",
        "grouped"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/read-state-toggle",
      "family": "notifications",
      "name": "ReadStateToggle",
      "label": "Read-state toggle",
      "description": "Controlled or uncontrolled aria-pressed button that flips a notification between read and unread.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/read-state-toggle",
      "tags": [
        "toggle",
        "read",
        "unread"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/snooze-controls",
      "family": "notifications",
      "name": "SnoozeControls",
      "label": "Snooze controls",
      "description": "Radiogroup of snooze duration presets (1 hour, tomorrow, next week, custom) with a custom date/time picker and live status summary.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/snooze",
      "tags": [
        "snooze",
        "presets",
        "schedule"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/quiet-hours-scheduler",
      "family": "notifications",
      "name": "QuietHoursScheduler",
      "label": "Quiet hours scheduler",
      "description": "Quiet-hours config with day chips, a start/end time window, and toggleable break-through exceptions, emitting a structured value on change.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/quiet-hours",
      "tags": [
        "quiet-hours",
        "schedule",
        "preferences"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/channel-matrix",
      "family": "notifications",
      "name": "ChannelMatrix",
      "label": "Channel matrix",
      "description": "Event-type by channel (email/sms/push/in-app/slack) toggle grid table for managing per-event delivery preferences.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/channel-matrix",
      "tags": [
        "matrix",
        "channels",
        "preferences"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/notification-rule-builder",
      "family": "notifications",
      "name": "NotificationRuleBuilder",
      "label": "Rule builder",
      "description": "Sentence-style rule composer (when event / send to channel / after delay / unless condition) with dropdown slots and a live preview.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/rule-builder",
      "tags": [
        "rule",
        "automation",
        "builder"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/subscribe-toggle",
      "family": "notifications",
      "name": "SubscribeToggle",
      "label": "Subscribe toggle",
      "description": "Bell/bell-off subscribe button in sm/md/lg sizes with an animated icon and aria-pressed state, controlled or uncontrolled.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/subscribe",
      "tags": [
        "subscribe",
        "toggle",
        "bell"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/push-notification-preview",
      "family": "notifications",
      "name": "PushNotificationPreview",
      "label": "Push preview",
      "description": "Mock push notification card with iOS/Android/lock-screen tone selector, app icon initials, title, body, and timestamp.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/push-preview",
      "tags": [
        "push",
        "preview",
        "mobile"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/email-digest-preview",
      "family": "notifications",
      "name": "EmailDigestPreview",
      "label": "Email digest preview",
      "description": "Inbox-style email row preview with sender avatar/initials, subject, preheader, excerpt, tags, unread state, and a star button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/email-digest",
      "tags": [
        "email",
        "preview",
        "inbox"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/notification-preview-modal",
      "family": "notifications",
      "name": "NotificationPreviewModal",
      "label": "Preview modal",
      "description": "Multi-channel preview dialog showing the same notification rendered as email, SMS, push, and in-app toast in one grid.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/preview-modal",
      "tags": [
        "preview",
        "multi-channel",
        "modal"
      ],
      "status": "captured"
    },
    {
      "key": "notifications/unsubscribe-page-template",
      "family": "notifications",
      "name": "UnsubscribePageTemplate",
      "label": "Unsubscribe template",
      "description": "Full-surface unsubscribe confirmation page with list/email context, re-subscribe and manage-preferences actions, and a footnote.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/notifications",
      "routeHref": "/ui-primitives/notifications/unsubscribe-template",
      "tags": [
        "unsubscribe",
        "template",
        "page"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
