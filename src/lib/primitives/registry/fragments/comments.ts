import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "comments",
  "title": "Comments &amp; annotations",
  "group": "Content",
  "summary": "14 collaboration primitives for threaded comments, inline document annotations, pin overlays, reactions, mentions, and activity feeds — sharing a common comment/author/thread type envelope.",
  "entries": [
    {
      "key": "comments/activity-stream",
      "family": "comments",
      "name": "ActivityStream",
      "label": "Activity stream",
      "description": "Chronological feed of comment events (commented, replied, resolved, mentioned, liked, annotated) with per-verb icons, actor avatars, and timestamps.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/activity-stream",
      "tags": [
        "activity",
        "feed",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "comments/annotation-pin",
      "family": "comments",
      "name": "AnnotationPin",
      "label": "Annotation pin",
      "description": "Numbered, absolutely-positioned pin button with status styling, selected state, and optional hover tooltip for marking a point on a surface.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/annotation-pin",
      "tags": [
        "annotation",
        "pin",
        "marker"
      ],
      "status": "captured"
    },
    {
      "key": "comments/comment-bubble",
      "family": "comments",
      "name": "CommentBubble",
      "label": "Comment bubble",
      "description": "Single comment card with author avatar, role, timestamp, body, reaction tray, reply action, kebab menu, and resolved badge.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/comment-bubble",
      "tags": [
        "comment",
        "card",
        "thread"
      ],
      "status": "captured"
    },
    {
      "key": "comments/comment-composer",
      "family": "comments",
      "name": "CommentComposer",
      "label": "Comment composer",
      "description": "Textarea-based comment input with @-mention picker, debounced draft autosave indicator, attach/emoji actions, and Cmd/Ctrl+Enter submit.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/comment-composer",
      "tags": [
        "composer",
        "input",
        "mention"
      ],
      "status": "captured"
    },
    {
      "key": "comments/comment-subscription-row",
      "family": "comments",
      "name": "CommentSubscriptionRow",
      "label": "Subscription row",
      "description": "Follower avatar stack with overflow chip and a subscribe/unsubscribe bell toggle for a comment thread.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/subscription-row",
      "tags": [
        "subscription",
        "followers",
        "notify"
      ],
      "status": "captured"
    },
    {
      "key": "comments/editor-inline-comments",
      "family": "comments",
      "name": "EditorInlineComments",
      "label": "Editor inline comments",
      "description": "Document prose surface that highlights commented substring ranges inline with hover tooltips showing the comment author, status, and body.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/editor-inline",
      "tags": [
        "editor",
        "inline",
        "annotation"
      ],
      "status": "captured"
    },
    {
      "key": "comments/inline-comment-thread",
      "family": "comments",
      "name": "InlineCommentThread",
      "label": "Inline comment thread",
      "description": "Threaded comment composition: pin badge, title, resolve toggle, root comment bubble, reply cards, and a slotted composer.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/inline-thread",
      "tags": [
        "thread",
        "comment",
        "replies"
      ],
      "status": "captured"
    },
    {
      "key": "comments/mention-picker",
      "family": "comments",
      "name": "MentionPicker",
      "label": "Mention picker",
      "description": "Searchable, keyboard-navigable listbox of mention candidates (user/team/role) that emits a mention token on selection.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/mention-picker",
      "tags": [
        "mention",
        "picker",
        "autocomplete"
      ],
      "status": "captured"
    },
    {
      "key": "comments/pin-marker-overlay",
      "family": "comments",
      "name": "PinMarkerOverlay",
      "label": "Pin marker overlay",
      "description": "Wraps a target surface (image/SVG/canvas) with an optional coordinate grid and a layer of positioned AnnotationPin markers.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/pin-marker-overlay",
      "tags": [
        "overlay",
        "annotation",
        "pins"
      ],
      "status": "captured"
    },
    {
      "key": "comments/reaction-tray",
      "family": "comments",
      "name": "ReactionTray",
      "label": "Reaction tray",
      "description": "Row of emoji reaction toggle buttons with live counts and a pressed state for the current user's own reactions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/reaction-tray",
      "tags": [
        "reactions",
        "emoji",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "comments/reply-card",
      "family": "comments",
      "name": "ReplyCard",
      "label": "Reply card",
      "description": "Compact nested reply card with author avatar, name, timestamp, body, and a reaction tray.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/reply-card",
      "tags": [
        "reply",
        "comment",
        "nested"
      ],
      "status": "captured"
    },
    {
      "key": "comments/resolve-toggle",
      "family": "comments",
      "name": "ResolveToggle",
      "label": "Resolve toggle",
      "description": "Mark-resolved / reopen toggle button with an optional expandable resolution-note panel.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/resolve-toggle",
      "tags": [
        "resolve",
        "toggle",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "comments/sticky-note",
      "family": "comments",
      "name": "StickyNote",
      "label": "Sticky note",
      "description": "Tone-coloured (yellow/pink/teal/amber) sticky note card with author, body, context/timestamp footer, and a drag handle affordance.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/sticky-note",
      "tags": [
        "sticky",
        "note",
        "annotation"
      ],
      "status": "captured"
    },
    {
      "key": "comments/thread-side-panel",
      "family": "comments",
      "name": "ThreadSidePanel",
      "label": "Thread side panel",
      "description": "Filterable (open/resolved/@me) sidebar list of comment threads with pin badges, excerpts, mention markers, and reply counts.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/comments",
      "routeHref": "/ui-primitives/comments/thread-side-panel",
      "tags": [
        "threads",
        "panel",
        "sidebar"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
