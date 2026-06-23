import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "social-scheduler",
  "title": "Social scheduler",
  "group": "Marketing",
  "summary": "Muffler Pulse — 14 Postiz-style social scheduling, listening, and approval primitives (cross-platform composer, queue calendar, AI caption studio, analytics, heatmap, repurpose pipeline, media binder, approvals, webhooks, mention inbox) sharing a typed envelope across eight social platforms.",
  "entries": [
    {
      "key": "social-scheduler/cross-platform-composer",
      "family": "social-scheduler",
      "name": "CrossPlatformComposer",
      "label": "Cross-platform composer",
      "description": "Single caption editor that fans out per-platform variants with character counters and live previews; platform toggles produce PreparedVariant objects on schedule.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/cross-platform-composer",
      "tags": [
        "composer",
        "multi-platform",
        "scheduling"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/queue-calendar",
      "family": "social-scheduler",
      "name": "QueueCalendar",
      "label": "Queue calendar",
      "description": "Month/week/day grid of scheduled post chips with drag-to-reschedule and arrow-key keyboard rescheduling.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/queue-calendar",
      "tags": [
        "calendar",
        "drag-drop",
        "scheduling"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/account-connector-card",
      "family": "social-scheduler",
      "name": "AccountConnectorCard",
      "label": "Account connector card",
      "description": "Connected-account tile showing handle, OAuth status, follower count, token expiry, scopes, and a conditional reconnect CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/account-connector-card",
      "tags": [
        "oauth",
        "account",
        "connection"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/caption-ai-studio",
      "family": "social-scheduler",
      "name": "CaptionAiStudio",
      "label": "Caption AI studio",
      "description": "AI caption generator with voice presets and tone/length/hook sliders, a draft output panel, and a tappable suggested-hashtag pool emitting CaptionAiState.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/caption-ai-studio",
      "tags": [
        "ai",
        "caption",
        "sliders"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/post-card",
      "family": "social-scheduler",
      "name": "PostCard",
      "label": "Post card",
      "description": "Scheduled-post card with platform pills, formatted schedule time, preview text, status badge, and an engagement footer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/post-card",
      "tags": [
        "post",
        "card",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/hashtag-strategy-panel",
      "family": "social-scheduler",
      "name": "HashtagStrategyPanel",
      "label": "Hashtag strategy panel",
      "description": "Grouped hashtag strategy (branded/trending/community/local) with per-tag reach estimates plus trend and competition signals.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/hashtag-strategy-panel",
      "tags": [
        "hashtags",
        "strategy",
        "reach"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/engagement-analytics-strip",
      "family": "social-scheduler",
      "name": "EngagementAnalyticsStrip",
      "label": "Engagement strip",
      "description": "Likes/comments/shares/saves metric strip with per-metric trend sparklines, signed 7-day deltas, and an overall engagement rate.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/engagement-analytics-strip",
      "tags": [
        "analytics",
        "engagement",
        "sparkline"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/audience-growth-chart",
      "family": "social-scheduler",
      "name": "AudienceGrowthChart",
      "label": "Audience growth chart",
      "description": "Multi-series SVG line chart of follower trajectory per platform with gridlines, legend, and current value plus 30-day delta stats.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/audience-growth-chart",
      "tags": [
        "chart",
        "audience",
        "growth"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/best-time-heatmap",
      "family": "social-scheduler",
      "name": "BestTimeHeatmap",
      "label": "Best time heatmap",
      "description": "Day-by-hour engagement-intensity heatmap with a highlighted peak posting window callout.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/best-time-heatmap",
      "tags": [
        "heatmap",
        "timing",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/repurpose-flow",
      "family": "social-scheduler",
      "name": "RepurposeFlow",
      "label": "Repurpose flow",
      "description": "Ordered content-repurposing pipeline (blog, thread, reel, carousel, shorts, newsletter) with per-stage state, owner, and ETA.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/repurpose-flow",
      "tags": [
        "pipeline",
        "repurpose",
        "workflow"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/media-binder",
      "family": "social-scheduler",
      "name": "MediaBinder",
      "label": "Media binder",
      "description": "Attached-media tray listing assets with thumbnail, file metadata, duration, and per-platform aspect-ratio fit chips (ok/crop/fail).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/media-binder",
      "tags": [
        "media",
        "assets",
        "aspect-ratio"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/approval-stage-tracker",
      "family": "social-scheduler",
      "name": "ApprovalStageTracker",
      "label": "Approval stage tracker",
      "description": "Multi-stage approval workflow list showing each stage's owner, state (pending/current/approved/rejected), note, and completion time.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/approval-stage-tracker",
      "tags": [
        "approval",
        "workflow",
        "review"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/webhook-event-log",
      "family": "social-scheduler",
      "name": "WebhookEventLog",
      "label": "Webhook event log",
      "description": "Live-tail log of incoming platform webhook events (likes spike, mention, DM, token refresh, post published/failed) with platform and severity.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/webhook-event-log",
      "tags": [
        "webhook",
        "events",
        "log"
      ],
      "status": "captured"
    },
    {
      "key": "social-scheduler/mention-inbox-row",
      "family": "social-scheduler",
      "name": "MentionInboxRow",
      "label": "Mention inbox row",
      "description": "Unified social-inbox row for a mention/comment/DM/reply with author avatar, sentiment chip, relative timestamp, and reply/thread actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/social-scheduler",
      "routeHref": "/ui-primitives/social-scheduler/mention-inbox-row",
      "tags": [
        "inbox",
        "mention",
        "sentiment"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
