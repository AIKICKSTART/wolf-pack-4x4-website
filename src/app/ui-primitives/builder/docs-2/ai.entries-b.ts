/**
 * AI family doc entries — part B (citation pill → feedback thumbs).
 * Split from `ai.docs.ts` to keep each file under the 800-line cap.
 * READ-ONLY documentation; every design value references a `--primitive-*` token.
 */

import type { ComponentDocEntry } from "./types"

const COMPONENT_PATH = "@/app/ui-primitives/components/ai"

const citationPill: ComponentDocEntry = {
  key: "ai/citation-pill",
  importName: "CitationPill",
  name: "Citation pill",
  summary: "Numbered source pill linking out to a cited document with an optional snippet.",
  category: "AI",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/citation-pill",
  propsSchema: {
    fields: [
      { key: "index", type: "number", required: true, min: 1 },
      { key: "title", type: "string", required: true },
      { key: "url", type: "url", required: true },
      { key: "snippet", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "pill fill" },
    { token: "--primitive-line", category: "color", usage: "pill border" },
    { token: "--primitive-teal", category: "color", usage: "citation index accent" },
    { token: "--primitive-radius-pill", category: "radius", usage: "pill shape" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: {
    sampleProps: { index: 1, title: "Exhaust systems guide", url: "https://example.com" },
    background: "panel",
    aspectRatio: "16/4",
  },
  codeExample: {
    language: "tsx",
    caption: "A source citation.",
    code: `import { CitationPill } from "@/app/ui-primitives/components/ai"

export function Source() {
  return (
    <CitationPill
      index={1}
      title="Resonator vs muffler"
      url="https://mufflermen.au/guides/resonator"
      snippet="Resonators tune drone; mufflers cut volume."
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import CitationPill.", "Render inside the assistant bubble citations slot.", "Number sequentially from 1."],
    requires: ["ai/assistant-message-bubble"],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Tab focuses the link", "Enter follows it"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Truncates title with ellipsis.", tablet: "Unchanged.", desktop: "Shows snippet on hover/focus." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Generated from retrieval results."],
  },
  agent: {
    whenToUse: "Use to attribute assistant claims to sources.",
    steps: ["One pill per source.", "Keep index in sync with inline references."],
    pitfalls: ["Always supply an absolute url."],
  },
  tags: ["citation", "source", "rag"],
}

const stopRegenActions: ComponentDocEntry = {
  key: "ai/stop-regen-actions",
  importName: "StopRegenActions",
  name: "Stop / regenerate actions",
  summary: "Action row to stop streaming or regenerate/edit/copy a reply.",
  category: "AI",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/stop-regen",
  propsSchema: {
    fields: [
      { key: "streaming", type: "boolean", required: false, description: "Show Stop instead of Regenerate." },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "button surface" },
    { token: "--primitive-line", category: "color", usage: "button border" },
    { token: "--primitive-body", category: "color", usage: "button labels" },
    { token: "--primitive-radius-md", category: "radius", usage: "button corner" },
    { token: "--primitive-space-2", category: "space", usage: "gap between actions" },
  ],
  iconDependencies: [
    { name: "square", importPath: "lucide-react", usage: "stop action" },
    { name: "refresh-cw", importPath: "lucide-react", usage: "regenerate action" },
    { name: "pencil", importPath: "lucide-react", usage: "edit action" },
    { name: "copy", importPath: "lucide-react", usage: "copy action" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: { streaming: false }, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "Reply controls.",
    code: `import { StopRegenActions } from "@/app/ui-primitives/components/ai"

export function ReplyControls({ streaming }: { streaming: boolean }) {
  return (
    <StopRegenActions
      streaming={streaming}
      onStop={() => abort()}
      onRegenerate={() => regenerate()}
      onCopy={() => copy()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import StopRegenActions.", "Toggle streaming to swap Stop/Regenerate.", "Wire the handlers you support."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Tab between actions", "Enter/Space activate"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Actions stay in a single tappable row.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Runtime control row."],
  },
  agent: {
    whenToUse: "Use under the latest assistant turn for stop/regenerate/edit/copy.",
    steps: ["Bind streaming to the generation state.", "Only pass handlers you implement."],
    pitfalls: ["Show Stop only while streaming."],
  },
  tags: ["actions", "regenerate", "stop"],
}

const conversationRail: ComponentDocEntry = {
  key: "ai/conversation-rail",
  importName: "ConversationRail",
  name: "Conversation rail",
  summary: "Grouped sidebar of past conversations with an active item and a new-chat affordance.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/conversation-rail",
  propsSchema: {
    fields: [
      { key: "conversations", type: "array", required: true, description: "ConversationEntry list." },
      { key: "activeId", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-panel", category: "color", usage: "rail surface" },
    { token: "--primitive-field-hover", category: "color", usage: "row hover" },
    { token: "--primitive-red", category: "color", usage: "active item accent" },
    { token: "--primitive-muted", category: "color", usage: "group labels" },
    { token: "--primitive-radius-md", category: "radius", usage: "row corner" },
    { token: "--primitive-space-2", category: "space", usage: "row rhythm" },
  ],
  iconDependencies: [{ name: "plus", importPath: "lucide-react", usage: "new chat button" }],
  assetDependencies: [],
  previewConfig: { sampleProps: { activeId: "c1" }, background: "panel", aspectRatio: "3/4", thumbnailBreakpoint: "md" },
  codeExample: {
    language: "tsx",
    caption: "A conversation list with grouping.",
    code: `import { ConversationRail } from "@/app/ui-primitives/components/ai"

export function History() {
  return (
    <ConversationRail
      activeId="c1"
      conversations={[
        { group: "Today", items: [{ id: "c1", title: "Muffler quote" }] },
      ]}
      onSelect={(id) => open(id)}
      onNewChat={() => create()}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import ConversationRail.", "Group entries by ConversationGroup.", "Track activeId and handle onSelect/onNewChat."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Tab through rows + new-chat", "Enter selects"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: {
    mobile: "Collapse behind a drawer; render full-height when open.",
    tablet: "Narrow fixed rail.",
    desktop: "Persistent rail beside the transcript.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["App-shell navigation, not a content block."],
  },
  agent: {
    whenToUse: "Use as the left rail of a chat app to switch conversations.",
    steps: ["Build ConversationGroup[] from history.", "Mark the open thread as activeId."],
    pitfalls: ["Keep ids stable across renders to preserve selection."],
  },
  tags: ["sidebar", "history", "navigation"],
}

const tokenUsageChip: ComponentDocEntry = {
  key: "ai/token-usage-chip",
  importName: "TokenUsageChip",
  name: "Token usage chip",
  summary: "Compact used/budget meter with tabular numerals.",
  category: "AI",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/token-usage",
  propsSchema: {
    fields: [
      { key: "used", type: "number", required: true, min: 0 },
      { key: "budget", type: "number", required: true, min: 1 },
      { key: "label", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "chip fill" },
    { token: "--primitive-line", category: "color", usage: "chip border" },
    { token: "--primitive-teal", category: "color", usage: "healthy usage" },
    { token: "--primitive-amber", category: "color", usage: "near-budget warning" },
    { token: "--primitive-red", category: "color", usage: "over-budget alert" },
    { token: "--primitive-radius-pill", category: "radius", usage: "chip shape" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { used: 18240, budget: 32000, label: "Context" }, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "Context budget chip.",
    code: `import { TokenUsageChip } from "@/app/ui-primitives/components/ai"

export function Budget() {
  return <TokenUsageChip used={18240} budget={32000} label="Context" />
}`,
  },
  usageExamples: [],
  setupInstructions: { steps: ["Import TokenUsageChip.", "Pass used + budget; the fill colour shifts as it fills."] },
  accessibility: {
    requiresLabel: false,
    keyboard: [],
    visibleFocus: false,
    respectsReducedMotion: true,
    notes: ["Figures use tabular-nums for stable alignment."],
  },
  responsive: { mobile: "Compact pill.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Runtime metric."],
  },
  agent: {
    whenToUse: "Use to show context/token consumption near the composer.",
    steps: ["Pass live used + budget counts."],
    pitfalls: ["budget must be > 0."],
  },
  tags: ["usage", "meter", "tokens"],
}

const modelSelector: ComponentDocEntry = {
  key: "ai/model-selector",
  importName: "ModelSelector",
  name: "Model selector",
  summary: "Dropdown of models with tier, context window, and cost; closes on outside click / Escape.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/model-selector",
  propsSchema: {
    fields: [
      { key: "models", type: "array", required: true, description: "ModelOption list ({ id, name, tier, contextWindow, costPerMillion })." },
      { key: "selectedId", type: "string", required: true },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "trigger fill" },
    { token: "--primitive-panel-strong", category: "color", usage: "dropdown surface" },
    { token: "--primitive-line", category: "color", usage: "borders" },
    { token: "--primitive-red", category: "color", usage: "selected check accent" },
    { token: "--primitive-radius-md", category: "radius", usage: "trigger + menu corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [
    { name: "cpu", importPath: "lucide-react", usage: "model glyph" },
    { name: "chevron-down", importPath: "lucide-react", usage: "open caret" },
    { name: "check", importPath: "lucide-react", usage: "selected mark" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: { selectedId: "m1" }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "Pick the active model.",
    code: `"use client"

import { useState } from "react"
import { ModelSelector } from "@/app/ui-primitives/components/ai"

const MODELS = [
  { id: "opus", name: "Hermes Opus", tier: "opus" as const, contextWindow: "200K", costPerMillion: "$15" },
  { id: "haiku", name: "Hermes Haiku", tier: "haiku" as const, contextWindow: "200K", costPerMillion: "$1" },
]

export function ChooseModel() {
  const [id, setId] = useState("opus")
  return <ModelSelector models={MODELS} selectedId={id} onSelect={setId} />
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import ModelSelector.", "Provide a ModelOption[] and the selectedId.", "Handle onSelect."],
    notes: ["Client component; manages its own open state."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Enter/Space opens", "Escape closes", "Tab moves through options"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: {
    mobile: "Menu spans the trigger width.",
    tablet: "Unchanged.",
    desktop: "Anchored dropdown with per-model meta.",
  },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Interactive control for app shells."],
  },
  agent: {
    whenToUse: "Use to let the user switch the generating model.",
    steps: ["Feed the available models.", "Persist the chosen id."],
    pitfalls: ["selectedId must match a model id, or the first is used."],
  },
  tags: ["dropdown", "model", "select"],
}

const systemPromptEditor: ComponentDocEntry = {
  key: "ai/system-prompt-editor",
  importName: "SystemPromptEditor",
  name: "System prompt editor",
  summary: "Collapsible system-prompt textarea with reset-to-default and a character counter.",
  category: "AI",
  kind: "component",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/system-prompt",
  propsSchema: {
    fields: [
      { key: "defaultPrompt", type: "richtext", required: true },
      { key: "resetPrompt", type: "richtext", required: false, description: "Value the reset button restores to." },
      { key: "maxLength", type: "number", required: false, min: 1 },
      { key: "defaultOpen", type: "boolean", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "textarea surface" },
    { token: "--primitive-line", category: "color", usage: "border" },
    { token: "--primitive-body", category: "color", usage: "prompt text" },
    { token: "--primitive-muted", category: "color", usage: "counter + hint" },
    { token: "--primitive-radius-md", category: "radius", usage: "corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  previewConfig: { sampleProps: { defaultPrompt: "You are the Mufflermen assistant.", defaultOpen: true }, background: "panel", aspectRatio: "16/9" },
  codeExample: {
    language: "tsx",
    caption: "Edit the system prompt.",
    code: `import { SystemPromptEditor } from "@/app/ui-primitives/components/ai"

export function PromptSettings() {
  return (
    <SystemPromptEditor
      defaultPrompt="You are the Mufflermen workshop assistant."
      onChange={(value) => save(value)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import SystemPromptEditor.", "Provide defaultPrompt.", "Handle onChange to persist edits."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Toggle disclosure with Enter/Space", "Tab into the textarea"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Full-width textarea.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "component",
    draggable: true,
    acceptsChildren: false,
    notes: ["Settings control."],
  },
  agent: {
    whenToUse: "Use in chat settings to view/edit the system prompt.",
    steps: ["Seed defaultPrompt.", "Save onChange.", "Provide resetPrompt to enable reset."],
    pitfalls: ["maxLength must be positive if set."],
  },
  tags: ["settings", "prompt", "textarea"],
}

const feedbackThumbs: ComponentDocEntry = {
  key: "ai/feedback-thumbs",
  importName: "FeedbackThumbs",
  name: "Feedback thumbs",
  summary: "Thumbs up/down with an optional reason chooser on a down vote.",
  category: "AI",
  kind: "primitive",
  componentPath: COMPONENT_PATH,
  routeHref: "/ui-primitives/ai/feedback-thumbs",
  propsSchema: {
    fields: [
      { key: "initialVote", type: "enum", required: false, options: ["up", "down", "none"] },
      { key: "reasons", type: "array", required: false, description: "FeedbackReason list shown after a down vote." },
      { key: "ariaLabel", type: "string", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  tokenDependencies: [
    { token: "--primitive-field-bg", category: "color", usage: "button surface" },
    { token: "--primitive-green", category: "color", usage: "positive vote" },
    { token: "--primitive-red", category: "color", usage: "negative vote" },
    { token: "--primitive-radius-md", category: "radius", usage: "button corner" },
    { token: "--primitive-focus-ring", category: "color", usage: "focus ring" },
  ],
  iconDependencies: [
    { name: "thumbs-up", importPath: "lucide-react", usage: "positive vote" },
    { name: "thumbs-down", importPath: "lucide-react", usage: "negative vote" },
  ],
  assetDependencies: [],
  previewConfig: { sampleProps: { initialVote: "none" }, background: "panel", aspectRatio: "16/4" },
  codeExample: {
    language: "tsx",
    caption: "Reply feedback with reasons.",
    code: `import { FeedbackThumbs } from "@/app/ui-primitives/components/ai"

export function Rate() {
  return (
    <FeedbackThumbs
      reasons={[{ id: "wrong", label: "Incorrect" }, { id: "unsafe", label: "Unsafe" }]}
      onVoteChange={(vote) => record(vote)}
      onReasonChange={(reason) => record(reason)}
    />
  )
}`,
  },
  usageExamples: [],
  setupInstructions: {
    steps: ["Import FeedbackThumbs.", "Pass reasons to enable the down-vote reason picker.", "Handle onVoteChange / onReasonChange."],
  },
  accessibility: {
    requiresLabel: false,
    keyboard: ["Tab to each thumb", "Enter/Space vote"],
    visibleFocus: true,
    respectsReducedMotion: true,
  },
  responsive: { mobile: "Reason chips wrap.", tablet: "Unchanged.", desktop: "Unchanged." },
  cms: {
    cmsBlock: false,
    blockKind: "primitive",
    draggable: false,
    acceptsChildren: false,
    notes: ["Runtime feedback affordance."],
  },
  agent: {
    whenToUse: "Use under assistant replies to capture quality signal.",
    steps: ["Wire vote + reason to your analytics.", "Provide reasons relevant to your domain."],
    pitfalls: ["initialVote is one of up/down/none."],
  },
  tags: ["feedback", "rating", "thumbs"],
}


export const AI_ENTRIES_B: readonly ComponentDocEntry[] = [
  citationPill,
  stopRegenActions,
  conversationRail,
  tokenUsageChip,
  modelSelector,
  systemPromptEditor,
  feedbackThumbs,
]
