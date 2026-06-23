import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "realtime-collab",
  "title": "Realtime collaboration",
  "group": "Operations",
  "summary": "15 live-collaboration primitives — presence stacks, multi-cursor/reaction overlays, typing/lock/conflict banners, activity feeds, room cards/panels, share links, timezone chips and a doc version bar — sharing a common CollabUser/PresenceStatus type surface.",
  "entries": [
    {
      "key": "realtime-collab/presence-avatar-stack",
      "family": "realtime-collab",
      "name": "PresenceAvatarStack",
      "label": "Presence avatar stack",
      "description": "Overlapping avatars of online collaborators with status-tinted borders and a +N overflow chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/presence-avatar-stack",
      "tags": [
        "presence",
        "avatars",
        "online"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/multi-cursor-overlay",
      "family": "realtime-collab",
      "name": "MultiCursorOverlay",
      "label": "Multi-cursor overlay",
      "description": "Stage overlay rendering multiple tone-colored collaborator cursors with name labels at percentage positions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/multi-cursor-overlay",
      "tags": [
        "cursors",
        "overlay",
        "live"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/live-typing-indicator",
      "family": "realtime-collab",
      "name": "LiveTypingIndicator",
      "label": "Live typing indicator",
      "description": "Animated dot bubble showing who is currently typing, with optional field and doc context.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/live-typing-indicator",
      "tags": [
        "typing",
        "presence",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/field-lock-banner",
      "family": "realtime-collab",
      "name": "FieldLockBanner",
      "label": "Field lock banner",
      "description": "Status banner showing which collaborator holds a field lock, with an optional request-release action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/field-lock-banner",
      "tags": [
        "lock",
        "editing",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/presence-activity-feed",
      "family": "realtime-collab",
      "name": "PresenceActivityFeed",
      "label": "Presence activity feed",
      "description": "Live collaboration event stream mapping join/comment/edit/share events into a toned ActivityFeed.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/presence-activity-feed",
      "tags": [
        "activity",
        "feed",
        "events"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/collab-room-card",
      "family": "realtime-collab",
      "name": "CollabRoomCard",
      "label": "Collab room card",
      "description": "Glass-surface card summarizing a collaboration room with kind badge, last-edited meta, presence stack and open CTA.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/collab-room-card",
      "tags": [
        "room",
        "card",
        "presence"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/online-status-dot",
      "family": "realtime-collab",
      "name": "OnlineStatusDot",
      "label": "Online status dot",
      "description": "Sized presence dot (online/idle/offline/busy) with optional pulse and inline status label.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/online-status-dot",
      "tags": [
        "status",
        "presence",
        "indicator"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/read-receipt-trail",
      "family": "realtime-collab",
      "name": "ReadReceiptTrail",
      "label": "Read receipt trail",
      "description": "Ordered list of reader avatars with seen-at times and an overflow chip showing who has viewed.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/read-receipt-trail",
      "tags": [
        "receipts",
        "seen",
        "avatars"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/co-edit-conflict-banner",
      "family": "realtime-collab",
      "name": "CoEditConflictBanner",
      "label": "Co-edit conflict banner",
      "description": "Alert banner comparing your value against a collaborator's with keep-mine, keep-theirs and merge actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/co-edit-conflict-banner",
      "tags": [
        "conflict",
        "merge",
        "banner"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/live-reaction-pop",
      "family": "realtime-collab",
      "name": "LiveReactionPop",
      "label": "Live reaction pop",
      "description": "Positioned emoji reaction burst with the reactor's name chip, tinted by cursor tone.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/live-reaction-pop",
      "tags": [
        "reaction",
        "emoji",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/room-participants-panel",
      "family": "realtime-collab",
      "name": "RoomParticipantsPanel",
      "label": "Room participants panel",
      "description": "Glass-surface panel listing room participants with avatars, status dots, roles, focus areas and a leave action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/room-participants-panel",
      "tags": [
        "participants",
        "panel",
        "room"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/collab-share-link-generator",
      "family": "realtime-collab",
      "name": "CollabShareLinkGenerator",
      "label": "Collab share link generator",
      "description": "Copyable share-link card with scope radio chips (view/comment/edit/admin) and an optional expiry label.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/collab-share-link-generator",
      "tags": [
        "share",
        "link",
        "permissions"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/time-zone-indicator-chip",
      "family": "realtime-collab",
      "name": "TimeZoneIndicatorChip",
      "label": "Time zone indicator chip",
      "description": "Chip showing a collaborator's local time, timezone shortname and relative offset from the viewer.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/time-zone-indicator-chip",
      "tags": [
        "timezone",
        "chip",
        "presence"
      ],
      "status": "captured"
    },
    {
      "key": "realtime-collab/live-doc-version-indicator",
      "family": "realtime-collab",
      "name": "LiveDocVersionIndicator",
      "label": "Live doc version indicator",
      "description": "Status bar showing version label, save/sync state (saved/saving/dirty/offline) and live collaborator count.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/realtime-collab",
      "routeHref": "/ui-primitives/realtime-collab/live-doc-version-indicator",
      "tags": [
        "version",
        "save-state",
        "sync"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
