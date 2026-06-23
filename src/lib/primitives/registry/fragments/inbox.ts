import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "inbox",
  "title": "Inbox",
  "group": "Operations",
  "summary": "14 conversation/messaging primitives — list rail, header, message bubbles and groups, attachments (voice/image/file), reactions, threads, pinned bar, unread divider, and read receipts — for an operations inbox surface.",
  "entries": [
    {
      "key": "inbox/conversation-list-rail",
      "family": "inbox",
      "name": "ConversationListRail",
      "label": "Conversation list rail",
      "description": "Searchable, filterable sidebar list of conversations with avatars, unread badges, and presence.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/conversation-list",
      "tags": [
        "conversations",
        "sidebar",
        "search"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/conversation-header",
      "family": "inbox",
      "name": "ConversationHeader",
      "label": "Conversation header",
      "description": "Header bar showing the participant identity, presence, role, and call/video/pin/mute/archive actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/conversation-header",
      "tags": [
        "header",
        "presence",
        "actions"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/message-bubble",
      "family": "inbox",
      "name": "MessageBubble",
      "label": "Message bubble",
      "description": "Chat bubble with sender alignment, content, timestamp, delivery status, reactions, and quick-react tray.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/message-bubble",
      "tags": [
        "message",
        "chat",
        "reactions"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/message-group",
      "family": "inbox",
      "name": "MessageGroup",
      "label": "Message group",
      "description": "Author-grouped stack of message bubbles with avatar, name, role, and group timestamp header.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/message-group",
      "tags": [
        "message",
        "grouping",
        "thread"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/typing-indicator",
      "family": "inbox",
      "name": "TypingIndicator",
      "label": "Typing indicator",
      "description": "Live status row showing an animated three-dot bubble while a participant is typing.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/typing-indicator",
      "tags": [
        "typing",
        "presence",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/reply-composer",
      "family": "inbox",
      "name": "ReplyComposer",
      "label": "Reply composer",
      "description": "Auto-sizing reply textarea with emoji/attach/mention actions, @-mention picker, and cmd+enter send.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/reply-composer",
      "tags": [
        "composer",
        "input",
        "mentions"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/voice-memo-bubble",
      "family": "inbox",
      "name": "VoiceMemoBubble",
      "label": "Voice memo bubble",
      "description": "Voice message bubble with play button, audio waveform, duration, and optional caption.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/voice-memo",
      "tags": [
        "voice",
        "audio",
        "attachment"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/image-attachment-bubble",
      "family": "inbox",
      "name": "ImageAttachmentBubble",
      "label": "Image attachment bubble",
      "description": "Image attachment bubble with thumbnail (or tinted placeholder), expand control, filename overlay, and caption.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/image-attachment",
      "tags": [
        "image",
        "attachment",
        "media"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/file-attachment-bubble",
      "family": "inbox",
      "name": "FileAttachmentBubble",
      "label": "File attachment bubble",
      "description": "File attachment bubble with type icon, filename, size, extension pill, upload progress, and download action.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/file-attachment",
      "tags": [
        "file",
        "attachment",
        "download"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/reaction-picker",
      "family": "inbox",
      "name": "ReactionPicker",
      "label": "Reaction picker",
      "description": "Popover emoji reaction picker with a default set, expandable extra reactions, and keyboard dismissal.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/reaction-picker",
      "tags": [
        "reactions",
        "emoji",
        "popover"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/thread-reply-row",
      "family": "inbox",
      "name": "ThreadReplyRow",
      "label": "Thread reply row",
      "description": "Expandable thread summary row with reply count, stacked replier avatars, last-reply time, and nested panel.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/thread-reply",
      "tags": [
        "thread",
        "replies",
        "expandable"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/pinned-message-bar",
      "family": "inbox",
      "name": "PinnedMessageBar",
      "label": "Pinned message bar",
      "description": "Horizontally scrollable carousel of pinned message cards with prev/next controls and jump-to action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/pinned-bar",
      "tags": [
        "pinned",
        "carousel",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/unread-divider",
      "family": "inbox",
      "name": "UnreadDivider",
      "label": "Unread divider",
      "description": "Separator pill marking the boundary of unread messages with an optional unread count.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/unread-divider",
      "tags": [
        "unread",
        "divider",
        "separator"
      ],
      "status": "captured"
    },
    {
      "key": "inbox/read-receipt-row",
      "family": "inbox",
      "name": "ReadReceiptRow",
      "label": "Read receipt row",
      "description": "Row showing who has read a message via stacked reader avatars, a +N overflow, and the latest read time.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/inbox",
      "routeHref": "/ui-primitives/inbox/read-receipts",
      "tags": [
        "read-receipts",
        "presence",
        "avatars"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
