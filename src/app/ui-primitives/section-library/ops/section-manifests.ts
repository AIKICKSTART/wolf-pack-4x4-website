/**
 * BlockManifests for the Operations section group.
 *
 * Each section exports a design-time `BlockManifest` so the CMS canvas can drag
 * it: editableFields (owner-facing copy + CTA), tokenDependencies (the central
 * --primitive-* tokens the section reads — token-driven only), previewConfig,
 * codeExample and setupInstructions. Pure data; no design literals.
 */

import type { BlockManifest } from "../../builder/model"

/* Shared editable fields — every Ops section exposes the same copy + CTA set. */
const SHARED_EDITABLE_FIELDS: BlockManifest["editableFields"] = [
  { path: "kicker", label: "Eyebrow", control: "text", valueType: "string", optional: true },
  { path: "title", label: "Heading", control: "text", valueType: "string" },
  { path: "lede", label: "Supporting copy", control: "textarea", valueType: "string", optional: true },
  {
    path: "ctaLabel",
    label: "Button label",
    control: "text",
    valueType: "string",
    hint: "Primary CTA — uses the metallic red→amber button tokens.",
    optional: true,
  },
  { path: "ctaHref", label: "Button link", control: "url", valueType: "url", optional: true },
]

/* CTA / button DNA tokens shared by every section's primary action. */
const BUTTON_TOKENS: BlockManifest["tokenDependencies"] = [
  { token: "--primitive-btn-primary-bg", category: "button", usage: "primary CTA background (metallic red)" },
  { token: "--primitive-btn-primary-fg", category: "button", usage: "primary CTA text" },
  { token: "--primitive-btn-primary-hover-bg", category: "button", usage: "primary CTA hover (metallic amber)" },
  { token: "--primitive-btn-primary-hover-fg", category: "button", usage: "primary CTA hover text" },
  { token: "--primitive-btn-primary-shadow", category: "button", usage: "primary CTA clearcoat shadow" },
  { token: "--primitive-btn-primary-hover-shadow", category: "button", usage: "primary CTA hover shadow" },
  { token: "--primitive-btn-secondary-bg", category: "button", usage: "secondary CTA carbon body" },
  { token: "--primitive-btn-secondary-fg", category: "button", usage: "secondary CTA text" },
  { token: "--primitive-btn-secondary-border", category: "button", usage: "secondary CTA hairline" },
  { token: "--primitive-btn-radius", category: "button", usage: "CTA corner radius" },
]

/* Shell + texture tokens shared by every section surface. */
const SHELL_TOKENS: BlockManifest["tokenDependencies"] = [
  { token: "--primitive-panel", category: "color", usage: "section surface base" },
  { token: "--primitive-glass-soft", category: "color", usage: "section surface highlight" },
  { token: "--primitive-line", category: "color", usage: "section + panel hairlines" },
  { token: "--primitive-text-strong", category: "color", usage: "section heading" },
  { token: "--primitive-body", category: "color", usage: "section body copy" },
  { token: "--primitive-muted", category: "color", usage: "labels + meta" },
  { token: "--primitive-red", category: "color", usage: "eyebrow accent" },
  { token: "--primitive-carbon-weave", category: "texture", usage: "carbon-fibre atmosphere under the surface" },
  { token: "--primitive-metallic-red", category: "texture", usage: "eyebrow marker" },
  { token: "--primitive-surface-shadow", category: "shadow", usage: "section depth" },
  { token: "--primitive-radius-xl", category: "radius", usage: "section corner" },
  { token: "--primitive-radius-lg", category: "radius", usage: "inner panel corners" },
  { token: "--primitive-space-8", category: "space", usage: "section padding" },
  { token: "--primitive-space-5", category: "space", usage: "panel gap rhythm" },
  { token: "--primitive-font-display", category: "typography", usage: "section heading face" },
  { token: "--primitive-font-body", category: "typography", usage: "body copy face" },
  { token: "--primitive-font-mono", category: "typography", usage: "labels + chips" },
  { token: "--primitive-h2", category: "typography", usage: "heading size" },
  { token: "--primitive-duration-fast", category: "motion", usage: "CTA + control transitions" },
  { token: "--primitive-ease-out", category: "motion", usage: "CTA + control easing" },
]

/* ------------------------------------------------------------------ *
 * Dashboard command
 * ------------------------------------------------------------------ */

export const dashboardCommandManifest: BlockManifest = {
  type: "ops/dashboard-command",
  name: "Dashboard command",
  category: "Operations",
  kind: "section",
  version: "1.0.0",
  summary:
    "Workshop command deck — headline metrics, four telemetry tiles with sparkline trends, a live bay-status board and an activity feed.",
  componentPath: "@/app/ui-primitives/section-library/ops/dashboard-command-section",
  importName: "DashboardCommandSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "title", type: "string", required: false },
      { key: "lede", type: "string", required: false },
      { key: "ctaLabel", type: "string", required: false },
      { key: "ctaHref", type: "url", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  defaultProps: {
    kicker: "Workshop command",
    title: "Run the floor at a glance",
    lede: "Every bay, booking and dollar in one live surface — the Oak Flats Mufflermen command deck.",
    ctaLabel: "Open full dashboard",
    ctaHref: "/ui-primitives/dashboards",
  },
  editableFields: SHARED_EDITABLE_FIELDS,
  tokenDependencies: [
    ...SHELL_TOKENS,
    ...BUTTON_TOKENS,
    { token: "--primitive-green", category: "color", usage: "live indicator" },
    { token: "--primitive-card-bg", category: "color", usage: "metric + panel surface" },
    { token: "--primitive-card-shadow", category: "shadow", usage: "panel depth" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: [
    { breakpoint: "xs", stack: true, span: 1 },
    { breakpoint: "md", stack: true, span: 2 },
    { breakpoint: "lg", span: 4 },
    { breakpoint: "2xl", span: 4 },
  ],
  accessibilityRules: {
    role: "region",
    requiresLabel: true,
    keyboardOperable: true,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel: 2,
    notes: ["Live activity feed uses aria-live=polite from the ActivityFeed primitive."],
  },
  seoRules: { contributesHeading: true, indexable: true },
  conversionGoal: {
    id: "open-dashboard",
    label: "Open the operations dashboard",
    action: "navigate",
    eventName: "ops_dashboard_open",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: { title: "Run the floor at a glance" },
    aspectRatio: "16/9",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { DashboardCommandSection } from "@/app/ui-primitives/section-library/ops/dashboard-command-section"',
      "",
      "export function Page() {",
      "  return <DashboardCommandSection title=\"Run the floor at a glance\" />",
      "}",
    ].join("\n"),
    caption: "Drop the command deck onto any operations page.",
  },
  setupInstructions: {
    steps: [
      "Render inside the .dashboard token scope (the ui-primitives layout provides it).",
      "Override copy + CTA via props; all values fall back to Mufflermen defaults.",
      "Theme switches automatically via the central --primitive-* tokens.",
    ],
    notes: ["Composes dashboards, data-display and charts primitives — no new components."],
  },
  tags: ["operations", "dashboard", "telemetry", "metrics", "mufflermen"],
}

/* ------------------------------------------------------------------ *
 * Agent workflow
 * ------------------------------------------------------------------ */

export const agentWorkflowManifest: BlockManifest = {
  type: "ops/agent-workflow",
  name: "Agent workflow",
  category: "Operations",
  kind: "section",
  version: "1.0.0",
  summary:
    "Hermes run inspector — the live customer conversation, the step-by-step run timeline and the tool palette with usage telemetry.",
  componentPath: "@/app/ui-primitives/section-library/ops/agent-workflow-section",
  importName: "AgentWorkflowSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "title", type: "string", required: false },
      { key: "lede", type: "string", required: false },
      { key: "ctaLabel", type: "string", required: false },
      { key: "ctaHref", type: "url", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  defaultProps: {
    kicker: "Hermes agent",
    title: "One message, the whole job done",
    lede: "Watch Hermes quote a cat-back, check parts and hold a fitting slot — every step traced.",
    ctaLabel: "Open Hermes console",
    ctaHref: "/ui-primitives/hermes-agent",
  },
  editableFields: SHARED_EDITABLE_FIELDS,
  tokenDependencies: [
    ...SHELL_TOKENS,
    ...BUTTON_TOKENS,
    { token: "--primitive-amber", category: "color", usage: "tools-live chip accent" },
    { token: "--primitive-field-bg", category: "color", usage: "meta chip surface" },
    { token: "--primitive-radius-pill", category: "radius", usage: "meta chips" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  allowedChildren: [],
  responsiveRules: [
    { breakpoint: "xs", stack: true, span: 1 },
    { breakpoint: "lg", span: 2 },
    { breakpoint: "2xl", span: 2 },
  ],
  accessibilityRules: {
    role: "region",
    requiresLabel: true,
    keyboardOperable: true,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel: 2,
    notes: ["Chat panel + run timeline carry their own a11y semantics from the hermes-agent family."],
  },
  seoRules: { contributesHeading: true, indexable: true },
  conversionGoal: {
    id: "open-hermes",
    label: "Open the Hermes console",
    action: "navigate",
    eventName: "ops_hermes_open",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: { title: "One message, the whole job done" },
    aspectRatio: "16/9",
    background: "panel",
    thumbnailBreakpoint: "lg",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { AgentWorkflowSection } from "@/app/ui-primitives/section-library/ops/agent-workflow-section"',
      "",
      "export function Page() {",
      "  return <AgentWorkflowSection title=\"One message, the whole job done\" />",
      "}",
    ].join("\n"),
    caption: "Show the agent run inspector on a marketing or ops page.",
  },
  setupInstructions: {
    steps: [
      "Render inside the .dashboard token scope.",
      "Supply your own run + chat fixtures by editing the section if real data is wired.",
      "CTA inherits the metallic red→amber button DNA automatically.",
    ],
    notes: ["Composes the hermes-agent primitives (AgentChatPanel, RunTimeline, ToolPalette)."],
  },
  tags: ["operations", "agent", "hermes", "ai", "workflow", "mufflermen"],
}

/* ------------------------------------------------------------------ *
 * CMS editor
 * ------------------------------------------------------------------ */

export const cmsEditorManifest: BlockManifest = {
  type: "ops/cms-editor",
  name: "CMS editor",
  category: "Operations",
  kind: "section",
  version: "1.0.0",
  summary:
    "Editorial block composition — a guarantee callout, a pre-appointment checklist and a quote CTA, exactly as the owner mixes them in the visual CMS.",
  componentPath: "@/app/ui-primitives/section-library/ops/cms-editor-section",
  importName: "CmsEditorSection",
  propsSchema: {
    fields: [
      { key: "kicker", type: "string", required: false },
      { key: "title", type: "string", required: false },
      { key: "lede", type: "string", required: false },
      { key: "ctaLabel", type: "string", required: false },
      { key: "ctaHref", type: "url", required: false },
      { key: "className", type: "string", required: false },
    ],
  },
  defaultProps: {
    kicker: "Content blocks",
    title: "Build the page, block by block",
    lede: "The same editorial blocks the owner drags onto a Mufflermen page — composed and on-brand.",
    ctaLabel: "Open the page builder",
    ctaHref: "/ui-primitives/cms",
  },
  editableFields: SHARED_EDITABLE_FIELDS,
  tokenDependencies: [
    ...SHELL_TOKENS,
    ...BUTTON_TOKENS,
    { token: "--primitive-teal", category: "color", usage: "block label accent" },
  ],
  iconDependencies: [],
  assetDependencies: [],
  allowedChildren: [
    { kind: "primitive", types: ["callout", "checklist", "cta"], min: 1 },
  ],
  responsiveRules: [
    { breakpoint: "xs", stack: true, span: 1 },
    { breakpoint: "lg", span: 2 },
    { breakpoint: "2xl", span: 2 },
  ],
  accessibilityRules: {
    role: "region",
    requiresLabel: true,
    keyboardOperable: true,
    visibleFocus: true,
    respectsReducedMotion: true,
    headingLevel: 2,
    notes: ["Each block primitive carries its own heading + dismiss/checkbox semantics."],
  },
  seoRules: { contributesHeading: true, indexable: true },
  conversionGoal: {
    id: "open-page-builder",
    label: "Open the CMS page builder",
    action: "navigate",
    eventName: "ops_cms_open",
    emphasisToken: "--primitive-btn-primary-bg",
  },
  previewConfig: {
    sampleProps: { title: "Build the page, block by block" },
    aspectRatio: "4/3",
    background: "panel",
    thumbnailBreakpoint: "md",
    animate: false,
  },
  codeExample: {
    language: "tsx",
    code: [
      'import { CmsEditorSection } from "@/app/ui-primitives/section-library/ops/cms-editor-section"',
      "",
      "export function Page() {",
      "  return <CmsEditorSection title=\"Build the page, block by block\" />",
      "}",
    ].join("\n"),
    caption: "Composes block-editor primitives in render mode; same blocks accept mode=\"edit\".",
  },
  setupInstructions: {
    steps: [
      "Render inside the .dashboard token scope.",
      "Swap the block fixtures for real BlockData<T> envelopes when wiring the CMS.",
      "Switch any block to mode=\"edit\" to surface inline editing in the canvas.",
    ],
    requires: ["callout", "checklist", "cta"],
    notes: ["Composes the block-editor primitives (CalloutBlock, ChecklistBlock, CtaBlock)."],
  },
  tags: ["operations", "cms", "content", "blocks", "editor", "mufflermen"],
}

/** All three Operations section manifests, in showcase order. */
export const OPS_SECTION_MANIFESTS: ReadonlyArray<BlockManifest> = [
  dashboardCommandManifest,
  agentWorkflowManifest,
  cmsEditorManifest,
]
