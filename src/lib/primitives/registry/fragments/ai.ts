import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "ai",
  "title": "AI conversation",
  "group": "AI",
  "summary": "14 chat/assistant primitives — message bubbles, thread, streaming, prompt composer, tool calls, citations, model + system-prompt controls, token usage, feedback — for building an AI conversation surface.",
  "entries": [
    {
      "key": "ai/chat-thread",
      "family": "ai",
      "name": "ChatThread",
      "label": "Chat thread",
      "description": "Auto-scrolling conversation log (role=\"log\", aria-live) that sticks to the bottom unless the user scrolls up, wrapping message children in an ordered list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/chat-thread",
      "tags": [
        "chat",
        "scroll",
        "transcript"
      ],
      "status": "captured"
    },
    {
      "key": "ai/user-message-bubble",
      "family": "ai",
      "name": "UserMessageBubble",
      "label": "User message bubble",
      "description": "Right-aligned user message bubble with timestamp, optional edited badge, and a list of file attachments.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/user-message",
      "tags": [
        "chat",
        "message",
        "attachments"
      ],
      "status": "captured"
    },
    {
      "key": "ai/assistant-message-bubble",
      "family": "ai",
      "name": "AssistantMessageBubble",
      "label": "Assistant message bubble",
      "description": "Assistant message bubble with avatar, model/author header, optional streaming output region, citations slot, and a thumbs-up/down feedback row.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/assistant-message",
      "tags": [
        "chat",
        "message",
        "assistant",
        "streaming"
      ],
      "status": "captured"
    },
    {
      "key": "ai/streaming-indicator",
      "family": "ai",
      "name": "StreamingIndicator",
      "label": "Streaming indicator",
      "description": "Animated typing indicator with three dots and a blinking caret, exposed as a live status region.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/streaming-indicator",
      "tags": [
        "loading",
        "streaming",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "ai/prompt-input",
      "family": "ai",
      "name": "PromptInput",
      "label": "Prompt input",
      "description": "Auto-growing prompt composer with controlled/uncontrolled value, char counter, Cmd/Ctrl+Enter submit, slash-command and attach actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/prompt-input",
      "tags": [
        "input",
        "composer",
        "textarea",
        "form"
      ],
      "status": "captured"
    },
    {
      "key": "ai/suggestion-chips",
      "family": "ai",
      "name": "SuggestionChips",
      "label": "Suggestion chips",
      "description": "Keyboard-navigable strip of numbered suggested-prompt chips that fire an onSelect callback with the chosen prompt.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/suggestion-chips",
      "tags": [
        "prompts",
        "chips",
        "suggestions"
      ],
      "status": "captured"
    },
    {
      "key": "ai/tool-call-card",
      "family": "ai",
      "name": "ToolCallCard",
      "label": "Tool call card",
      "description": "Collapsible details card showing a tool invocation's name, running/done/failed status, duration, and JSON input/output via CodeBlock.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/tool-call-card",
      "tags": [
        "tool-call",
        "json",
        "status",
        "collapsible"
      ],
      "status": "captured"
    },
    {
      "key": "ai/citation-pill",
      "family": "ai",
      "name": "CitationPill",
      "label": "Citation pill",
      "description": "Numbered inline citation link to an external source with a hover/focus popover (QuoteBubble) showing title, snippet, and URL.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/citation-pill",
      "tags": [
        "citation",
        "source",
        "link",
        "popover"
      ],
      "status": "captured"
    },
    {
      "key": "ai/stop-regen-actions",
      "family": "ai",
      "name": "StopRegenActions",
      "label": "Stop / regenerate actions",
      "description": "Response action toolbar with stop, regenerate, edit, and copy buttons that enable/disable based on streaming state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/stop-regen",
      "tags": [
        "actions",
        "toolbar",
        "regenerate",
        "stop"
      ],
      "status": "captured"
    },
    {
      "key": "ai/conversation-rail",
      "family": "ai",
      "name": "ConversationRail",
      "label": "Conversation rail",
      "description": "Sidebar listing past conversations grouped by recency (today/yesterday/week/older) with a new-chat button and hover-revealed previews.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/conversation-rail",
      "tags": [
        "sidebar",
        "history",
        "conversations",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "ai/token-usage-chip",
      "family": "ai",
      "name": "TokenUsageChip",
      "label": "Token usage chip",
      "description": "Compact meter chip showing tokens used against a budget with a fill bar and calm/amber/red tone thresholds.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/token-usage",
      "tags": [
        "tokens",
        "usage",
        "meter",
        "budget"
      ],
      "status": "captured"
    },
    {
      "key": "ai/model-selector",
      "family": "ai",
      "name": "ModelSelector",
      "label": "Model selector",
      "description": "Dropdown listbox for picking an AI model, showing tier badge, context window, and cost-per-million stats with outside-click/Escape dismissal.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/model-selector",
      "tags": [
        "model",
        "dropdown",
        "listbox",
        "selector"
      ],
      "status": "captured"
    },
    {
      "key": "ai/system-prompt-editor",
      "family": "ai",
      "name": "SystemPromptEditor",
      "label": "System prompt editor",
      "description": "Collapsible panel for editing the assistant's system prompt with a char counter, dirty/baseline state, and reset-to-default action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/system-prompt",
      "tags": [
        "system-prompt",
        "editor",
        "settings",
        "collapsible"
      ],
      "status": "captured"
    },
    {
      "key": "ai/feedback-thumbs",
      "family": "ai",
      "name": "FeedbackThumbs",
      "label": "Feedback thumbs",
      "description": "Thumbs up/down feedback control with a confetti burst on upvote and an optional reason radiogroup shown on downvote.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/ai",
      "routeHref": "/ui-primitives/ai/feedback-thumbs",
      "tags": [
        "feedback",
        "rating",
        "thumbs",
        "confetti"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
