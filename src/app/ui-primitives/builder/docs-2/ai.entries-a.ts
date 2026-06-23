/**
 * AI family doc entries — part A (chat thread → tool call card).
 * Split from `ai.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./types"

const COMPONENT_PATH = "@/app/ui-primitives/components/ai"

const chatThread: ComponentDocEntry = {
  key: "ai/chat-thread",
  importName: "ChatThread",
  name: "Chat thread",
  summary: "Auto-scrolling transcript container with a polite live region and stick-to-bottom behaviour.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/chat-thread",
  propsSchema: {
    fields: [
      { key: "children", type: "json", required: true, description: "Message bubbles rendered as <ol> list items." },
      { key: "className", type: "string", required: false, description: "Optional extra class on the scroller." },
      { key: "ariaLabel", type: "string", required: false, description: "Accessible name for the log region. Defaults to \"Conversation transcript\"." },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "thread surface" },
    { token: "--primitive-line", category: "color", usage: "scroller hairline" },
    { token: "--primitive-space-4", category: "space", usage: "list rhythm between bubbles" },
    { token: "--primitive-focus-ring", category: "color", usage: "visible focus ring on the scrollable region" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: {
    sampleProps: { ariaLabel: "Conversation transcript" },
    background: "panel",
    aspectRatio: "3/4",
    thumbnailBreakpoint: "md",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    caption: "Wrap message bubbles in a scrolling transcript.",
    code: `import {
  ChatThread,
  UserMessageBubble,
  AssistantMessageBubble,
} from "@/app/ui-primitives/components/ai"

export function Transcript() {
  return (
    <ChatThread ariaLabel="Mufflermen support transcript">
      <UserMessageBubble timestamp="2:14 PM">
        My exhaust is droning at 90km/h.
      </UserMessageBubble>
      <AssistantMessageBubble timestamp="2:14 PM" modelName="Hermes">
        That usually points to a resonator. Want a quote?
      </AssistantMessageBubble>
    </ChatThread>
  )
}`,
  },
  usageExamples: [
    {
      title: "Streaming a reply",
      description: "Mark the assistant bubble streaming so the thread keeps the latest text in view.",
      example: {
        language: "tsx",
        code: `<ChatThread>
  <AssistantMessageBubble timestamp="now" streaming>
    {partialText}
  </AssistantMessageBubble>
</ChatThread>`,
      },
    },
  ],
  setupInstructions: {
    steps: [
      "Import ChatThread from the ai barrel.",
      "Render UserMessageBubble / AssistantMessageBubble as direct children (they are <li> rows).",
      "Append new bubbles to the children array; the thread auto-scrolls when the user is near the bottom.",
    ],
    requires: ["ai/user-message-bubble", "ai/assistant-message-bubble"],
    notes: ["The scroller stops auto-following once the user scrolls up past ~80px."],
  },
  accessibility: {
    role: "log",
    requiresLabel: false,
    keyboard: ["Tab focuses the scrollable region", "Arrow keys / PageUp / PageDown scroll the transcript"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["aria-live=\"polite\" + aria-relevant=\"additions\" announce new bubbles without interrupting."],
  },
  responsive: {
    mobile: "Full-width column; bubbles wrap and the scroller fills available height.",
    tablet: "Comfortable reading measure; rhythm unchanged.",
    desktop: "Constrain max width with a parent container for an ideal line length.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: true,
    notes: ["Container primitive — host for message bubbles rather than a standalone CMS block."],
  },
  agent: {
    whenToUse: "Use whenever you need a vertically scrolling conversation transcript that announces new messages.",
    steps: [
      "Render ChatThread once per conversation.",
      "Feed message bubble children in chronological order.",
      "Let the component own scroll position; do not set scrollTop manually.",
    ],
    pitfalls: [
      "Do not nest non-bubble elements directly — children become <ol> rows.",
      "Avoid forcing scroll; it breaks the stick-to-bottom heuristic.",
    ],
  },
  tags: ["chat", "transcript", "live-region"],
}

const userMessageBubble: ComponentDocEntry = {
  key: "ai/user-message-bubble",
  importName: "UserMessageBubble",
  name: "User message bubble",
  summary: "Right-aligned user turn with timestamp, optional edited flag, and attachment chips.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/user-message",
  propsSchema: {
    fields: [
      { key: "children", type: "richtext", required: true, description: "Message body." },
      { key: "timestamp", type: "string", required: true, description: "Display timestamp." },
      { key: "authorName", type: "string", required: false, description: "Defaults to \"You\"." },
      { key: "edited", type: "boolean", required: false, description: "Show an edited marker." },
      { key: "attachments", type: "array", required: false, description: "UserMessageAttachment list rendered as chips." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "bubble fill" },
    { token: "--primitive-body", category: "color", usage: "message text" },
    { token: "--primitive-muted", category: "color", usage: "timestamp + edited marker" },
    { token: "--primitive-radius-lg", category: "radius", usage: "bubble corner" },
    { token: "--primitive-space-3", category: "space", usage: "bubble padding rhythm" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: {
    sampleProps: { timestamp: "2:14 PM", edited: false },
    background: "panel",
    aspectRatio: "16/9",
    thumbnailBreakpoint: "sm",
  },
  codeExample: {
    language: "tsx",
    caption: "A user turn with an attachment.",
    code: `import { UserMessageBubble } from "@/app/ui-primitives/components/ai"

export function UserTurn() {
  return (
    <UserMessageBubble
      timestamp="2:14 PM"
      attachments={[{ id: "a1", name: "exhaust.jpg", kind: "image" }]}
    >
      Here is the photo of the rust.
    </UserMessageBubble>
  )
}`,
  },
  usageExamples: [
    {
      title: "Edited turn",
      description: "Flag a message the user revised.",
      example: { language: "tsx", code: `<UserMessageBubble timestamp="2:15 PM" edited>Updated question.</UserMessageBubble>` },
    },
  ],
  setupInstructions: {
    steps: ["Import UserMessageBubble.", "Render inside a ChatThread.", "Pass attachments only when present."],
    requires: ["ai/chat-thread"],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Attachment chips are focusable when interactive"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["Timestamp uses a <time> element."],
  },
  responsive: {
    mobile: "Bubble caps near full width and aligns right.",
    tablet: "Max bubble width tightens for readability.",
    desktop: "Right-aligned with comfortable gutter.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Authored by the chat runtime, not the visual CMS."],
  },
  agent: {
    whenToUse: "Use for every user-authored turn in a transcript.",
    steps: ["Render inside ChatThread.", "Always provide a timestamp.", "Map uploads to the attachments array."],
    pitfalls: ["Do not align it left — it is the user side of the conversation."],
  },
  tags: ["chat", "message", "user"],
}

const assistantMessageBubble: ComponentDocEntry = {
  key: "ai/assistant-message-bubble",
  importName: "AssistantMessageBubble",
  name: "Assistant message bubble",
  summary: "Left-aligned assistant turn with avatar, model label, streaming output region, citations, and feedback row.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/assistant-message",
  propsSchema: {
    fields: [
      { key: "children", type: "richtext", required: true, description: "Reply body." },
      { key: "timestamp", type: "string", required: true },
      { key: "authorName", type: "string", required: false, description: "Defaults to \"Mufflermen Assistant\"." },
      { key: "modelName", type: "string", required: false, description: "Model label shown in the header." },
      { key: "streaming", type: "boolean", required: false, description: "Render an aria-busy live output." },
      { key: "citations", type: "json", required: false, description: "Citation pills slot." },
      { key: "feedback", type: "json", required: false, description: "Custom feedback slot; defaults to thumbs." },
      { key: "showFeedbackRow", type: "boolean", required: false, description: "Defaults to true." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel-strong", category: "color", usage: "bubble fill" },
    { token: "--primitive-amber", category: "color", usage: "assistant avatar tone" },
    { token: "--primitive-body", category: "color", usage: "reply text" },
    { token: "--primitive-muted", category: "color", usage: "model label + timestamp" },
    { token: "--primitive-radius-lg", category: "radius", usage: "bubble corner" },
    { token: "--primitive-space-3", category: "space", usage: "internal rhythm" },
  ],
  iconDependencies: [
    { name: "thumbs-up", importPath: "lucide-react", usage: "default feedback affordance" },
    { name: "thumbs-down", importPath: "lucide-react", usage: "default feedback affordance" },
  ],
  assetDependencies: [],
  previewConfig: {
    sampleProps: { timestamp: "2:14 PM", modelName: "Hermes", streaming: false },
    background: "panel",
    aspectRatio: "16/9",
    thumbnailBreakpoint: "sm",
  },
  codeExample: {
    language: "tsx",
    caption: "Assistant reply with citations.",
    code: `import {
  AssistantMessageBubble,
  CitationPill,
} from "@/app/ui-primitives/components/ai"

export function AssistantTurn() {
  return (
    <AssistantMessageBubble
      timestamp="2:14 PM"
      modelName="Hermes"
      citations={
        <CitationPill index={1} title="Exhaust guide" url="https://example.com" />
      }
    >
      A resonator delete is the likely culprit.
    </AssistantMessageBubble>
  )
}`,
  },
  usageExamples: [
    {
      title: "Streaming reply",
      description: "Set streaming while tokens arrive so the body is announced as a live output.",
      example: { language: "tsx", code: `<AssistantMessageBubble timestamp="now" streaming>{partial}</AssistantMessageBubble>` },
    },
    {
      title: "Hide feedback",
      description: "Suppress the thumbs row for system/info turns.",
      example: { language: "tsx", code: `<AssistantMessageBubble timestamp="now" showFeedbackRow={false}>Done.</AssistantMessageBubble>` },
    },
  ],
  setupInstructions: {
    steps: [
      "Import AssistantMessageBubble.",
      "Render inside ChatThread.",
      "Pass citations / feedback via slots when needed.",
    ],
    requires: ["ai/chat-thread"],
    notes: ["When streaming is true the body is wrapped in an <output> with aria-busy."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Feedback buttons and citation pills are focusable"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["Streaming content is announced via aria-live=\"polite\"."],
  },
  responsive: {
    mobile: "Avatar + body stack tightly; bubble near full width.",
    tablet: "Reading measure tightens.",
    desktop: "Left-aligned with avatar gutter.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Produced by the chat runtime."],
  },
  agent: {
    whenToUse: "Use for every assistant-authored turn.",
    steps: ["Render inside ChatThread.", "Toggle streaming during generation.", "Attach CitationPill children via the citations slot."],
    pitfalls: ["Do not leave streaming true after generation completes."],
  },
  tags: ["chat", "message", "assistant", "streaming"],
}

const streamingIndicator: ComponentDocEntry = {
  key: "ai/streaming-indicator",
  importName: "StreamingIndicator",
  name: "Streaming indicator",
  summary: "Animated typing/working dots with a polite status label.",
  category: "AI",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/streaming-indicator",
  propsSchema: {
    fields: [
      { key: "label", type: "string", required: false, description: "Status text. Defaults to a generating message." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-muted", category: "color", usage: "dots + label" },
    { token: "--primitive-duration-slow", category: "motion", usage: "dot pulse cycle" },
    { token: "--primitive-ease-in-out", category: "motion", usage: "dot pulse easing" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { label: "Generating" }, background: "panel", aspectRatio: "4/1", animate: true },
  codeExample: {
    language: "tsx",
    caption: "Show while a reply is generating.",
    code: `import { StreamingIndicator } from "@/app/ui-primitives/components/ai"

export function Thinking() {
  return <StreamingIndicator label="Hermes is thinking" />
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import StreamingIndicator.", "Render while awaiting the first token."] },
  accessibility: {
    requiresLabel: false,
    keyboard: [],
    visibleFocus: false,
    respectsReducedMotion: true,
    notes: ["Dot animation is paused under prefers-reduced-motion; the label still conveys state."],
  },
  responsive: { mobile: "Inline pill scales with text.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Transient runtime indicator."],
  },
  agent: {
    whenToUse: "Use as a placeholder turn before the first streamed token.",
    steps: ["Mount when the request starts.", "Replace with an AssistantMessageBubble once tokens arrive."],
    pitfalls: ["Do not leave it mounted alongside the streamed bubble."],
  },
  tags: ["loading", "typing", "stream"],
}

const promptInput: ComponentDocEntry = {
  key: "ai/prompt-input",
  importName: "PromptInput",
  name: "Prompt input",
  summary: "Auto-growing composer with slash/attach tools, character counter, and ⌘/Ctrl+Enter submit.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/prompt-input",
  propsSchema: {
    fields: [
      { key: "value", type: "string", required: false, description: "Controlled value." },
      { key: "defaultValue", type: "string", required: false, description: "Uncontrolled initial value." },
      { key: "placeholder", type: "string", required: false },
      { key: "maxLength", type: "number", required: false, description: "Defaults to 4000.", min: 1 },
      { key: "disabled", type: "boolean", required: false },
      { key: "trailing", type: "json", required: false, description: "Trailing slot inside the field." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "composer surface" },
    { token: "--primitive-field-hover", category: "color", usage: "hover surface" },
    { token: "--primitive-line", category: "color", usage: "composer border" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
    { token: "--primitive-btn-primary-bg", category: "button", usage: "send button fill" },
    { token: "--primitive-btn-primary-fg", category: "button", usage: "send button text/icon" },
    { token: "--primitive-radius-lg", category: "radius", usage: "composer corner" },
    { token: "--primitive-space-3", category: "space", usage: "padding rhythm" },
  ],
  iconDependencies: [
    { name: "slash", importPath: "lucide-react", usage: "slash-command tool button" },
    { name: "paperclip", importPath: "lucide-react", usage: "attach tool button" },
    { name: "send-horizontal", importPath: "lucide-react", usage: "submit button" },
  ],
  assetDependencies: [],
  previewConfig: {
    sampleProps: { placeholder: "Ask the Mufflermen assistant…", defaultValue: "" },
    background: "panel",
    aspectRatio: "16/5",
  },
  codeExample: {
    language: "tsx",
    caption: "Controlled composer.",
    code: `"use client"

import { useState } from "react"
import { PromptInput } from "@/app/ui-primitives/components/ai"

export function Composer() {
  const [value, setValue] = useState("")
  return (
    <PromptInput
      value={value}
      onValueChange={setValue}
      onSubmit={(text) => send(text)}
      onSlashCommand={() => openSlashMenu()}
      onAttach={() => openFilePicker()}
    />
  )
}`,
  },
  usageExamples: [
    {
      title: "Uncontrolled",
      description: "Skip the value/onValueChange pair and read the value on submit.",
      example: { language: "tsx", code: `<PromptInput defaultValue="" onSubmit={(text) => send(text)} />` },
    },
  ],
  setupInstructions: {
    steps: [
      "Import PromptInput.",
      "Wire onSubmit (and onValueChange when controlled).",
      "Optionally handle onSlashCommand / onAttach.",
    ],
    notes: [
      "Pressing \"/\" on an empty field fires onSlashCommand.",
      "⌘/Ctrl+Enter submits when non-empty.",
      "Client component (\"use client\").",
    ],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["⌘/Ctrl+Enter submits", "\"/\" on empty input opens the slash menu", "Tab reaches tool + send buttons"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["Counter announces remaining characters via aria-live."],
  },
  responsive: {
    mobile: "Tools wrap below the textarea; send stays reachable by thumb.",
    tablet: "Single-row action bar.",
    desktop: "Roomy composer; textarea grows to a max height before scrolling.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Interactive input — registerable in app shells, not as a static content block."],
  },
  agent: {
    whenToUse: "Use as the message composer at the foot of any chat surface.",
    steps: ["Render below the transcript.", "Decide controlled vs uncontrolled.", "Handle onSubmit to dispatch the message."],
    pitfalls: ["Do not pass both value and defaultValue.", "Remember it is a client component."],
  },
  tags: ["composer", "input", "textarea"],
}

const suggestionChips: ComponentDocEntry = {
  key: "ai/suggestion-chips",
  importName: "SuggestionChips",
  name: "Suggestion chips",
  summary: "Keyboard-navigable row of starter-prompt chips with roving focus.",
  category: "AI",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/suggestion-chips",
  propsSchema: {
    fields: [
      { key: "chips", type: "array", required: true, description: "SuggestionChip list ({ id, label, prompt })." },
      { key: "ariaLabel", type: "string", required: false, description: "Defaults to \"Suggested prompts\"." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "chip fill" },
    { token: "--primitive-line", category: "color", usage: "chip border" },
    { token: "--primitive-body", category: "color", usage: "chip label" },
    { token: "--primitive-radius-pill", category: "radius", usage: "chip shape" },
    { token: "--primitive-space-2", category: "space", usage: "gap between chips" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: {
    sampleProps: { ariaLabel: "Suggested prompts" },
    background: "panel",
    aspectRatio: "16/4",
  },
  codeExample: {
    language: "tsx",
    caption: "Starter prompts that seed the composer.",
    code: `import { SuggestionChips } from "@/app/ui-primitives/components/ai"

export function Starters() {
  return (
    <SuggestionChips
      chips={[
        { id: "quote", label: "Get a quote", prompt: "I need a muffler quote." },
        { id: "book", label: "Book a service", prompt: "Book me in this week." },
      ]}
      onSelect={(chip) => sendPrompt(chip.prompt)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import SuggestionChips.", "Pass a chips array.", "Handle onSelect to seed the composer or send directly."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["ArrowLeft/ArrowRight move focus", "Home/End jump to ends", "Enter/Space activate"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: {
    mobile: "Chips wrap and remain tappable.",
    tablet: "Wrap as needed.",
    desktop: "Single row when space allows.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: true,
    acceptsChildren: false,
    notes: ["Content (chip labels/prompts) is owner-editable."],
  },
  agent: {
    whenToUse: "Use to offer canned starter prompts above an empty composer.",
    steps: ["Define chips with stable ids.", "On select, populate or submit the prompt."],
    pitfalls: ["Keep chip ids unique for roving focus to work."],
  },
  tags: ["chips", "prompts", "quick-actions"],
}

const toolCallCard: ComponentDocEntry = {
  key: "ai/tool-call-card",
  importName: "ToolCallCard",
  name: "Tool call card",
  summary: "Collapsible card showing a tool invocation with status, input/output JSON, and duration.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/tool-call-card",
  propsSchema: {
    fields: [
      { key: "toolName", type: "string", required: true },
      { key: "status", type: "enum", required: true, options: ["running", "done", "failed"] },
      { key: "inputJson", type: "string", required: true, description: "Stringified tool input." },
      { key: "outputJson", type: "string", required: false, description: "Stringified tool output." },
      { key: "durationMs", type: "number", required: false, min: 0 },
      { key: "defaultOpen", type: "boolean", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-card-bg", category: "color", usage: "card surface" },
    { token: "--primitive-line", category: "color", usage: "card border" },
    { token: "--primitive-green", category: "color", usage: "done status" },
    { token: "--primitive-amber", category: "color", usage: "running status" },
    { token: "--primitive-red", category: "color", usage: "failed status" },
    { token: "--primitive-radius-md", category: "radius", usage: "card corner" },
  ],
  iconDependencies: [
    { name: "wrench", importPath: "lucide-react", usage: "tool glyph" },
    { name: "loader-2", importPath: "lucide-react", usage: "running spinner" },
    { name: "check-circle-2", importPath: "lucide-react", usage: "done status" },
    { name: "alert-circle", importPath: "lucide-react", usage: "failed status" },
    { name: "chevron-right", importPath: "lucide-react", usage: "disclosure caret" },
  ],
  assetDependencies: [],
  previewConfig: {
    sampleProps: { toolName: "get_quote", status: "done", inputJson: "{}", durationMs: 412 },
    background: "panel",
    aspectRatio: "16/9",
  },
  codeExample: {
    language: "tsx",
    caption: "A completed tool call.",
    code: `import { ToolCallCard } from "@/app/ui-primitives/components/ai"

export function CallTrace() {
  return (
    <ToolCallCard
      toolName="lookup_part"
      status="done"
      inputJson={JSON.stringify({ sku: "MUF-204" })}
      outputJson={JSON.stringify({ inStock: true })}
      durationMs={318}
    />
  )
}`,
  },
  usageExamples: [
    {
      title: "Running state",
      description: "Show a spinner while the tool runs.",
      example: { language: "tsx", code: `<ToolCallCard toolName="search" status="running" inputJson="{}" defaultOpen />` },
    },
  ],
  setupInstructions: {
    steps: ["Import ToolCallCard.", "Stringify input/output JSON.", "Update status as the call progresses."],
    notes: ["Renders a native <details>/<summary> for disclosure."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Enter/Space on the summary toggles disclosure"],
    visibleFocus: true,
    respectsReducedMotion: true,
    notes: ["Spinner stops under prefers-reduced-motion; the status chip still conveys state."],
  },
  responsive: {
    mobile: "Header wraps; JSON scrolls horizontally inside its code block.",
    tablet: "Comfortable header row.",
    desktop: "Full header with duration on the right.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: false,
    acceptsChildren: false,
    notes: ["Runtime trace element, not authored content."],
  },
  agent: {
    whenToUse: "Use to surface agent/tool invocations inside a transcript.",
    steps: ["Map your tool result to status/input/output.", "Provide durationMs when known."],
    pitfalls: ["Pass JSON as strings, not objects."],
  },
  tags: ["tool", "agent", "trace", "json"],
}


export const AI_ENTRIES_A: readonly ComponentDocEntry[] = [
  chatThread,
  userMessageBubble,
  assistantMessageBubble,
  streamingIndicator,
  promptInput,
  suggestionChips,
  toolCallCard,
]
