import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "collab-deep",
  "title": "Collaboration (deep)",
  "group": "Operations",
  "summary": "14 real-time multiplayer-collaboration overlays and widgets — presence cursors, avatar stacks, comment pins/threads, conflict merge, awareness, lock zones, follow mode, live-edit and selection indicators, cursor trails, commit pulse, screen share and voice room — all tinted per-collaborator from a shared CursorTone palette.",
  "entries": [
    {
      "key": "collab-deep/presence-cursor",
      "family": "collab-deep",
      "name": "PresenceCursor",
      "label": "Presence cursor",
      "description": "Floating remote-collaborator cursor pointer with a tinted name label, positioned by percentage on a stage.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/presence-cursor",
      "tags": [
        "presence",
        "cursor",
        "realtime"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/presence-avatar-stack",
      "family": "collab-deep",
      "name": "PresenceAvatarStack",
      "label": "Presence avatar stack",
      "description": "Overlapping avatar stack of online collaborators with per-user tinted halos, overflow chip, and a polite live region.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/presence-avatar-stack",
      "tags": [
        "presence",
        "avatars",
        "stack"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/comment-overlay-pin",
      "family": "collab-deep",
      "name": "CommentOverlayPin",
      "label": "Comment overlay pin",
      "description": "Anchored numbered canvas comment pin tinted to its author, status-aware (open/resolved/reopened) with reply badge and tooltip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/comment-overlay-pin",
      "tags": [
        "comments",
        "pin",
        "annotation"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/comment-thread-popover",
      "family": "collab-deep",
      "name": "CommentThreadPopover",
      "label": "Comment thread popover",
      "description": "Anchored dialog showing a root comment, threaded replies, a status chip, and a reply composer.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/comment-thread-popover",
      "tags": [
        "comments",
        "thread",
        "popover"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/version-conflict-modal",
      "family": "collab-deep",
      "name": "VersionConflictModal",
      "label": "Version conflict modal",
      "description": "Three-way diff modal comparing Original / Yours / Theirs versions with keep-mine, keep-theirs, and merge actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/version-conflict-modal",
      "tags": [
        "conflict",
        "merge",
        "diff"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/awareness-strip",
      "family": "collab-deep",
      "name": "AwarenessStrip",
      "label": "Awareness strip",
      "description": "Horizontal strip listing who is focused on what, with tinted avatars, qualifiers, and duration labels.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/awareness-strip",
      "tags": [
        "awareness",
        "presence",
        "focus"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/lock-zone-overlay",
      "family": "collab-deep",
      "name": "LockZoneOverlay",
      "label": "Lock zone overlay",
      "description": "Translucent scrim over a section locked by another collaborator, showing holder avatar, lock reason, and an optional hint ribbon.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/lock-zone-overlay",
      "tags": [
        "lock",
        "overlay",
        "permissions"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/follow-mode-pill",
      "family": "collab-deep",
      "name": "FollowModePill",
      "label": "Follow mode pill",
      "description": "Floating status pill indicating the viewer is following a collaborator, with a stop-following affordance.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/follow-mode-pill",
      "tags": [
        "follow",
        "presence",
        "pill"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/live-edit-indicator",
      "family": "collab-deep",
      "name": "LiveEditIndicator",
      "label": "Live edit indicator",
      "description": "Pulsing indicator overlaid on a live field showing who is editing it, with optional preview text and a compact mode.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/live-edit-indicator",
      "tags": [
        "live-edit",
        "presence",
        "indicator"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/selection-highlight-bar",
      "family": "collab-deep",
      "name": "SelectionHighlightBar",
      "label": "Selection highlight bar",
      "description": "Tinted bar showing what text a remote collaborator has selected, with name flag and optional character count.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/selection-highlight-bar",
      "tags": [
        "selection",
        "highlight",
        "realtime"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/cursor-trail-rail",
      "family": "collab-deep",
      "name": "CursorTrailRail",
      "label": "Cursor trail rail",
      "description": "SVG heat-trail visualization of recent cursor paths per collaborator, with a tinted legend showing point counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/cursor-trail-rail",
      "tags": [
        "cursor",
        "trail",
        "dataviz"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/commit-pulse-strip",
      "family": "collab-deep",
      "name": "CommitPulseStrip",
      "label": "Commit pulse strip",
      "description": "Horizontal strip of recent commit/save events with pulsing dots, author avatars, timestamps, and deltas.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/commit-pulse-strip",
      "tags": [
        "activity",
        "commits",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/screen-share-card",
      "family": "collab-deep",
      "name": "ScreenShareCard",
      "label": "Screen share card",
      "description": "Card surfacing an in-progress screen share with mock window preview, presenter, live/starting/paused state, viewer roster, and join action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/screen-share-card",
      "tags": [
        "screen-share",
        "presence",
        "card"
      ],
      "status": "captured"
    },
    {
      "key": "collab-deep/voice-room-tile",
      "family": "collab-deep",
      "name": "VoiceRoomTile",
      "label": "Voice room tile",
      "description": "Audio room tile with active-speaker rings, per-participant voice state (speaking/muted/listening/raised-hand), listener count, and a join/leave toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/collab-deep",
      "routeHref": "/ui-primitives/collab-deep/voice-room-tile",
      "tags": [
        "voice",
        "audio",
        "room"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
