import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "live-broadcast",
  "title": "Live broadcast",
  "group": "Media",
  "summary": "14 live-streaming primitives — player, chat, polls, Q&A, RSVP/schedule/replay cards, host backstage + encoder-health control surfaces, reactions, donation tiers, raids, and a clip creator — sharing a common live-broadcast-types domain model.",
  "entries": [
    {
      "key": "live-broadcast/live-player",
      "family": "live-broadcast",
      "name": "LivePlayer",
      "label": "Live player",
      "description": "Broadcast video stage with state/health/viewer badges, host lower-third, optional overlay, and a control bar with play/mute, bitrate chip and bitrate sparkline.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/live-player",
      "tags": [
        "streaming",
        "video",
        "player"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/chat-panel",
      "family": "live-broadcast",
      "name": "ChatPanel",
      "label": "Chat panel",
      "description": "Live chat log with role/tier badges and pinned messages, a quick-reaction strip, and a composer with slow-mode/pause/cooldown locking.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/chat-panel",
      "tags": [
        "chat",
        "streaming",
        "moderation"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/rsvp-card",
      "family": "live-broadcast",
      "name": "RsvpCard",
      "label": "RSVP card",
      "description": "Upcoming-broadcast card with host, RSVP count and countdown, plus toggleable RSVP, reminder, add-to-calendar and share actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/rsvp-card",
      "tags": [
        "rsvp",
        "schedule",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/schedule-card",
      "family": "live-broadcast",
      "name": "ScheduleCard",
      "label": "Schedule card",
      "description": "Compact scheduled-broadcast card showing status chip, countdown, host, RSVP count and an add-to-calendar action, with a next-up highlight variant.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/schedule-card",
      "tags": [
        "schedule",
        "upcoming",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/replay-card",
      "family": "live-broadcast",
      "name": "ReplayCard",
      "label": "Replay card",
      "description": "Past-broadcast replay card with poster, play overlay, runtime/view-count chips, a seekable chapter list and a share action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/replay-card",
      "tags": [
        "replay",
        "vod",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/host-backstage-panel",
      "family": "live-broadcast",
      "name": "HostBackstagePanel",
      "label": "Host backstage panel",
      "description": "Host broadcast control deck with a phase-aware go-live/end button, host-mic and slow-mode toggles, and an ops queue for raised hands, mod reports and new supporters.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/host-backstage-panel",
      "tags": [
        "host",
        "controls",
        "moderation"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/viewer-list-row",
      "family": "live-broadcast",
      "name": "ViewerListRow",
      "label": "Viewer list row",
      "description": "List-item row for a single viewer showing avatar, handle, region, supporter-tier badge and watch duration, with optional host raise/kick/more actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/viewer-list-row",
      "tags": [
        "viewers",
        "row",
        "moderation"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/reactions-strip",
      "family": "live-broadcast",
      "name": "ReactionsStrip",
      "label": "Reactions strip",
      "description": "Decorative overlay that floats animated emoji reaction pulses from a left or right anchor, with screen-reader text per pulse.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/reactions-strip",
      "tags": [
        "reactions",
        "overlay",
        "motion"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/poll-card",
      "family": "live-broadcast",
      "name": "PollCard",
      "label": "Poll card",
      "description": "Interactive live-poll card with selectable options, percentage result bars, total-votes/countdown footer, and an optional host close control.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/poll-card",
      "tags": [
        "poll",
        "voting",
        "engagement"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/qna-queue-row",
      "family": "live-broadcast",
      "name": "QnaQueueRow",
      "label": "Q&A queue row",
      "description": "Q&A queue list row with an upvote control, asker meta, answered chip, and optional host pull-to-mic / mark-answered actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/qna-queue-row",
      "tags": [
        "qna",
        "queue",
        "engagement"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/donation-tier-card",
      "family": "live-broadcast",
      "name": "DonationTierCard",
      "label": "Donation tier card",
      "description": "Supporter-tier card showing tier glyph/label, price, supporter count, tagline, a checked perks list and a join/manage CTA, with a current-tier variant.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/donation-tier-card",
      "tags": [
        "donation",
        "membership",
        "pricing"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/stream-quality-panel",
      "family": "live-broadcast",
      "name": "StreamQualityPanel",
      "label": "Stream quality panel",
      "description": "Encoder-health monitor with a health badge, bitrate/dropped-frames/audio-level metrics, an audio segment meter, and a 24-sample bitrate sparkline.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/stream-quality-panel",
      "tags": [
        "monitoring",
        "encoder",
        "data-viz"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/raid-banner",
      "family": "live-broadcast",
      "name": "RaidBanner",
      "label": "Raid banner",
      "description": "Incoming-raid status banner showing the raiding channel, viewer count brought, optional message, and greet/dismiss host actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/raid-banner",
      "tags": [
        "raid",
        "notification",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "live-broadcast/clip-creator-card",
      "family": "live-broadcast",
      "name": "ClipCreatorCard",
      "label": "Clip creator card",
      "description": "Moment-clipper card with a poster, preset pre/post window radios (clamped 5-120s), and copy-link, download-MP4 and social share actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/live-broadcast",
      "routeHref": "/ui-primitives/live-broadcast/clip-creator-card",
      "tags": [
        "clip",
        "share",
        "social"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
