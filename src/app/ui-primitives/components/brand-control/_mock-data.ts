/**
 * Oak Flats Mufflermen brand-control mock data.
 *
 * Every record reflects the real Oak Flats workshop world — Daniel (founder),
 * Mia (brand), Ben (parts), Tim (workshop), plus contractors. Tokens map to
 * the actual `--primitive-*` variables the rest of the primitive family
 * already consumes.
 */

import type {
  AccessibilityCheckResult,
  AuditLogEntry,
  BrandAsset,
  BrandGuidelineRule,
  BrandToken,
  BrandTokenHistoryEntry,
  ChannelInfo,
  MotionDurationToken,
  MotionEasingToken,
  PaletteSwatch,
  RoleMatrixCell,
  TeamMember,
  ThemeDeployment,
  TypographyPairing,
  UmbrellaImpactNode,
  UsageCoverageDatum,
} from "./brand-control-types"

// ─────────────────────────────────────────────────────────────────────────
// Tokens
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_TOKENS: ReadonlyArray<BrandToken> = [
  {
    id: "red",
    label: "Signal Red",
    category: "color",
    value: "#E62028",
    cssVar: "--primitive-red",
    description: "Primary OFM signal red — used on CTAs, alerts, and the knight badge.",
    consumers: 184,
  },
  {
    id: "amber",
    label: "Workshop Amber",
    category: "color",
    value: "#FF9A1F",
    cssVar: "--primitive-amber",
    description: "Bay lighting amber — hot states, warnings, attention pulses.",
    consumers: 96,
  },
  {
    id: "teal",
    label: "Diagnostic Teal",
    category: "color",
    value: "#27D6CB",
    cssVar: "--primitive-teal",
    description: "Scan / HUD / info accent.",
    consumers: 142,
  },
  {
    id: "green",
    label: "Pass Green",
    category: "color",
    value: "#3FE07A",
    cssVar: "--primitive-green",
    description: "Pass, ready, online.",
    consumers: 78,
  },
  {
    id: "canvas",
    label: "Obsidian Canvas",
    category: "color",
    value: "#050508",
    cssVar: "--primitive-canvas",
    description: "Outer page surface.",
    consumers: 52,
  },
  {
    id: "radius-sm",
    label: "Radius — Small",
    category: "radius",
    value: "6px",
    cssVar: "--primitive-radius-sm",
    consumers: 64,
  },
  {
    id: "radius-md",
    label: "Radius — Medium",
    category: "radius",
    value: "12px",
    cssVar: "--primitive-radius-md",
    consumers: 88,
  },
  {
    id: "space-3",
    label: "Space — 12",
    category: "spacing",
    value: "12px",
    cssVar: "--primitive-space-3",
    consumers: 142,
  },
  {
    id: "space-4",
    label: "Space — 16",
    category: "spacing",
    value: "16px",
    cssVar: "--primitive-space-4",
    consumers: 168,
  },
  {
    id: "shadow-card",
    label: "Card shadow",
    category: "shadow",
    value: "0 18px 38px rgba(0,0,0,0.32)",
    cssVar: "--primitive-shadow-card",
    consumers: 122,
  },
  {
    id: "font-display",
    label: "Display font",
    category: "font",
    value: "Anton",
    cssVar: "--primitive-font-display",
    consumers: 36,
  },
  {
    id: "font-body",
    label: "Body font",
    category: "font",
    value: "Inter",
    cssVar: "--primitive-font-body",
    consumers: 220,
  },
]

export const MOCK_TOKEN_HISTORY: ReadonlyArray<BrandTokenHistoryEntry> = [
  {
    id: "h1",
    tokenId: "amber",
    before: "#FFA63F",
    after: "#FF9A1F",
    changedAt: "2026-05-28T14:12:00Z",
    changedBy: "Mia",
  },
  {
    id: "h2",
    tokenId: "red",
    before: "#D81E25",
    after: "#E62028",
    changedAt: "2026-05-24T09:48:00Z",
    changedBy: "Daniel",
  },
  {
    id: "h3",
    tokenId: "teal",
    before: "#22C0B6",
    after: "#27D6CB",
    changedAt: "2026-05-19T16:31:00Z",
    changedBy: "Mia",
  },
  {
    id: "h4",
    tokenId: "radius-md",
    before: "10px",
    after: "12px",
    changedAt: "2026-05-12T08:04:00Z",
    changedBy: "Daniel",
  },
]

// ─────────────────────────────────────────────────────────────────────────
// Palette
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_PALETTE: ReadonlyArray<PaletteSwatch> = [
  {
    id: "red",
    label: "Signal Red",
    hex: "#E62028",
    oklch: { l: 0.58, c: 0.22, h: 27 },
    role: "primary",
  },
  {
    id: "amber",
    label: "Workshop Amber",
    hex: "#FF9A1F",
    oklch: { l: 0.74, c: 0.18, h: 62 },
    role: "warning",
  },
  {
    id: "teal",
    label: "Diagnostic Teal",
    hex: "#27D6CB",
    oklch: { l: 0.79, c: 0.13, h: 190 },
    role: "secondary",
  },
  {
    id: "green",
    label: "Pass Green",
    hex: "#3FE07A",
    oklch: { l: 0.81, c: 0.18, h: 148 },
    role: "success",
  },
  {
    id: "canvas",
    label: "Obsidian Canvas",
    hex: "#050508",
    oklch: { l: 0.06, c: 0.01, h: 270 },
    role: "surface",
  },
  {
    id: "body",
    label: "Body text",
    hex: "#C7C9D0",
    oklch: { l: 0.81, c: 0.01, h: 260 },
    role: "text",
  },
]

// ─────────────────────────────────────────────────────────────────────────
// Typography
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_TYPE_PAIRINGS: ReadonlyArray<TypographyPairing> = [
  {
    id: "anton-inter",
    label: "Anton × Inter (default)",
    displayFamily: "Anton, Impact, sans-serif",
    displaySample: "OAK FLATS MUFFLERMEN",
    bodyFamily: "Inter, Arial, sans-serif",
    bodySample:
      "Built for Illawarra workshops since 1987. Custom exhaust, brakes, ECU tuning — done once, done right.",
    rationale:
      "Anton's condensed badge weight reads as workshop signage. Inter at 13/1.55 carries every body surface without competing.",
    tags: ["default", "signage", "ui"],
  },
  {
    id: "anton-mono",
    label: "Anton × JetBrains Mono",
    displayFamily: "Anton, Impact, sans-serif",
    displaySample: "DYNO BAY · BOOK NOW",
    bodyFamily: '"JetBrains Mono", monospace',
    bodySample:
      "350 awkW · 0–100 in 4.8s · AFR 11.8 → 12.3 — log archived to vehicle file.",
    rationale: "Telemetry surfaces want JetBrains Mono for tabular numerics.",
    tags: ["telemetry", "diagnostics"],
  },
  {
    id: "heritage",
    label: "Playfair × Georgia (Heritage)",
    displayFamily: '"Playfair Display", Georgia, serif',
    displaySample: "Oak Flats Mufflers, Est. 1987",
    bodyFamily: 'Georgia, "Times New Roman", serif',
    bodySample:
      "Four decades of welds and witness marks. The heritage pairing for anniversary print and signage.",
    rationale: "Period-correct heritage moments — anniversary print, plaque copy.",
    tags: ["heritage", "print"],
  },
]

// ─────────────────────────────────────────────────────────────────────────
// Motion tokens
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_DURATIONS: ReadonlyArray<MotionDurationToken> = [
  { id: "instant", label: "Instant", ms: 80 },
  { id: "fast", label: "Fast", ms: 180 },
  { id: "normal", label: "Normal", ms: 280 },
  { id: "slow", label: "Slow", ms: 480 },
  { id: "epic", label: "Epic", ms: 920 },
]

export const MOCK_EASINGS: ReadonlyArray<MotionEasingToken> = [
  { id: "standard", label: "Standard", bezier: [0.16, 1, 0.3, 1] },
  { id: "soft", label: "Soft", bezier: [0.45, 0.05, 0.55, 0.95] },
  { id: "snappy", label: "Snappy", bezier: [0.65, 0, 0.35, 1] },
  { id: "muffler", label: "Muffler torque", bezier: [0.22, 1.4, 0.36, 1] },
]

// ─────────────────────────────────────────────────────────────────────────
// Assets
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_ASSETS: ReadonlyArray<BrandAsset> = [
  {
    id: "knight-badge",
    name: "Knight badge — primary",
    kind: "logo",
    cdnPath: "/brand/logos/knight-badge.svg",
    bytes: 18_240,
    usageCount: 184,
    variants: [
      { id: "svg", label: "SVG", format: "svg", bytes: 18_240 },
      { id: "png-2x", label: "PNG @2x", format: "png", bytes: 84_120 },
      { id: "webp", label: "WebP", format: "webp", bytes: 32_412 },
    ],
    uploadedAt: "2026-05-04T11:20:00Z",
    uploadedBy: "Mia",
  },
  {
    id: "wordmark",
    name: "OFM wordmark",
    kind: "wordmark",
    cdnPath: "/brand/logos/wordmark.svg",
    bytes: 6_840,
    usageCount: 96,
    variants: [
      { id: "svg", label: "SVG", format: "svg", bytes: 6_840 },
      { id: "png", label: "PNG", format: "png", bytes: 32_120 },
    ],
    uploadedAt: "2026-05-02T09:48:00Z",
    uploadedBy: "Mia",
  },
  {
    id: "monogram",
    name: "OFM monogram (favicon)",
    kind: "monogram",
    cdnPath: "/brand/logos/monogram-ofm.svg",
    bytes: 1_320,
    usageCount: 42,
    variants: [
      { id: "svg", label: "SVG", format: "svg", bytes: 1_320 },
      { id: "ico-32", label: "ICO 32", format: "png", bytes: 4_120 },
    ],
    uploadedAt: "2026-05-02T09:50:00Z",
    uploadedBy: "Mia",
  },
  {
    id: "pattern-carbon",
    name: "Carbon-fibre pattern",
    kind: "pattern",
    cdnPath: "/brand/patterns/carbon.svg",
    bytes: 4_640,
    usageCount: 24,
    variants: [
      { id: "svg", label: "SVG tile", format: "svg", bytes: 4_640 },
    ],
    uploadedAt: "2026-04-20T15:12:00Z",
    uploadedBy: "Daniel",
  },
]

// ─────────────────────────────────────────────────────────────────────────
// People / Roles / Audit
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_TEAM: ReadonlyArray<TeamMember> = [
  {
    id: "daniel",
    name: "Daniel Fleuren",
    roleId: "founder",
    email: "daniel@oakflatsmufflers.com.au",
    avatarInitial: "DF",
    lastActive: "Active now",
    scope: ["tokens", "assets", "deploy", "audit"],
  },
  {
    id: "mia",
    name: "Mia Tran",
    roleId: "brand",
    email: "mia@oakflatsmufflers.com.au",
    avatarInitial: "MT",
    lastActive: "12 minutes ago",
    scope: ["tokens", "assets", "publish"],
  },
  {
    id: "ben",
    name: "Ben Hartley",
    roleId: "parts",
    email: "ben@oakflatsmufflers.com.au",
    avatarInitial: "BH",
    lastActive: "1 hour ago",
    scope: ["assets.read"],
  },
  {
    id: "tim",
    name: "Tim Walsh",
    roleId: "workshop",
    email: "tim@oakflatsmufflers.com.au",
    avatarInitial: "TW",
    lastActive: "Yesterday",
    scope: ["assets.read"],
  },
  {
    id: "kira",
    name: "Kira Patel",
    roleId: "contractor",
    email: "kira@studiokira.co",
    avatarInitial: "KP",
    lastActive: "3 days ago",
    scope: ["assets.upload"],
  },
]

export const MOCK_ROLE_MATRIX: ReadonlyArray<RoleMatrixCell> = [
  // founder
  { roleId: "founder", permissionId: "tokens.edit", level: "admin" },
  { roleId: "founder", permissionId: "assets.upload", level: "admin" },
  { roleId: "founder", permissionId: "theme.deploy", level: "admin" },
  { roleId: "founder", permissionId: "brand.publish", level: "admin" },
  { roleId: "founder", permissionId: "audit.read", level: "admin" },
  // brand
  { roleId: "brand", permissionId: "tokens.edit", level: "write" },
  { roleId: "brand", permissionId: "assets.upload", level: "write" },
  { roleId: "brand", permissionId: "theme.deploy", level: "read" },
  { roleId: "brand", permissionId: "brand.publish", level: "write" },
  { roleId: "brand", permissionId: "audit.read", level: "read" },
  // parts
  { roleId: "parts", permissionId: "tokens.edit", level: "none" },
  { roleId: "parts", permissionId: "assets.upload", level: "read" },
  { roleId: "parts", permissionId: "theme.deploy", level: "none" },
  { roleId: "parts", permissionId: "brand.publish", level: "none" },
  { roleId: "parts", permissionId: "audit.read", level: "read" },
  // workshop
  { roleId: "workshop", permissionId: "tokens.edit", level: "none" },
  { roleId: "workshop", permissionId: "assets.upload", level: "read" },
  { roleId: "workshop", permissionId: "theme.deploy", level: "none" },
  { roleId: "workshop", permissionId: "brand.publish", level: "none" },
  { roleId: "workshop", permissionId: "audit.read", level: "read" },
  // contractor — inherits assets.upload from brand
  { roleId: "contractor", permissionId: "tokens.edit", level: "none" },
  { roleId: "contractor", permissionId: "assets.upload", level: "inherit", inheritedFrom: "brand" },
  { roleId: "contractor", permissionId: "theme.deploy", level: "none" },
  { roleId: "contractor", permissionId: "brand.publish", level: "none" },
  { roleId: "contractor", permissionId: "audit.read", level: "none" },
]

export const MOCK_AUDIT: ReadonlyArray<AuditLogEntry> = [
  {
    id: "a1",
    actor: "Mia",
    action: "edit",
    resource: "token",
    resourceLabel: "--primitive-amber",
    timestamp: "2026-05-28T14:12:00Z",
    diff: { before: "#FFA63F", after: "#FF9A1F" },
  },
  {
    id: "a2",
    actor: "Mia",
    action: "publish",
    resource: "guideline",
    resourceLabel: "Logo clearspace rules",
    timestamp: "2026-05-28T14:04:00Z",
  },
  {
    id: "a3",
    actor: "Daniel",
    action: "deploy",
    resource: "theme",
    resourceLabel: "Spring 2026 staging → production",
    timestamp: "2026-05-26T08:42:00Z",
  },
  {
    id: "a4",
    actor: "Kira",
    action: "upload",
    resource: "asset",
    resourceLabel: "Knight badge — outline variant",
    timestamp: "2026-05-25T17:18:00Z",
  },
  {
    id: "a5",
    actor: "Daniel",
    action: "rollback",
    resource: "theme",
    resourceLabel: "Halted: Heritage Cream rollout",
    timestamp: "2026-05-23T11:30:00Z",
  },
]

// ─────────────────────────────────────────────────────────────────────────
// Theme deploy
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_DEPLOY: ThemeDeployment = {
  id: "deploy-spring",
  themeLabel: "Spring 2026 amber",
  stage: "staging",
  status: "rolling",
  rolloutPct: 42,
  changedTokenIds: ["amber", "red", "radius-md"],
  startedAt: "2026-05-29T06:08:00Z",
  promotedBy: "Daniel",
}

export const MOCK_CHANNELS: ReadonlyArray<ChannelInfo> = [
  { id: "alpha", label: "Alpha", version: "v0.92.0", diffCount: 24, description: "Internal — workshop laptops only." },
  { id: "beta", label: "Beta", version: "v0.91.0", diffCount: 8, description: "Brand + select customer accounts." },
  { id: "production", label: "Production", version: "v0.90.4", diffCount: 0, description: "Public oakflatsmufflers.com.au" },
]

// ─────────────────────────────────────────────────────────────────────────
// Accessibility
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_A11Y_CHECKS: ReadonlyArray<AccessibilityCheckResult> = [
  {
    id: "contrast",
    label: "Contrast (WCAG AA)",
    verdict: "pass",
    passing: 14,
    total: 14,
    note: "All body and CTA pairs ≥ 4.5:1.",
  },
  {
    id: "focus",
    label: "Focus visible",
    verdict: "pass",
    passing: 38,
    total: 38,
  },
  {
    id: "motion",
    label: "Reduced motion",
    verdict: "warn",
    passing: 23,
    total: 26,
    note: "3 hero loops still ignore prefers-reduced-motion.",
  },
  {
    id: "aria",
    label: "ARIA",
    verdict: "pass",
    passing: 162,
    total: 162,
  },
]

// ─────────────────────────────────────────────────────────────────────────
// Brand guidelines
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_GUIDELINES: ReadonlyArray<BrandGuidelineRule> = [
  {
    id: "logo-clearspace",
    section: "logo",
    title: "Clearspace = ½ badge height",
    body: "Always leave a buffer equal to half the knight badge height around every lockup. Never crowd the badge with copy or other marks.",
  },
  {
    id: "voice-direct",
    section: "voice",
    title: "Direct, never robotic",
    body: "We talk like a workshop foreman — confident, specific, no jargon for jargon's sake. Avoid 'leverage', 'solutions', 'best-in-class'.",
  },
  {
    id: "do-amber",
    section: "do",
    title: "Use amber for hot states only",
    body: "Reserve Workshop Amber for warnings, hot temps, attention pulses. It signals 'look here'.",
  },
  {
    id: "dont-tilt",
    section: "dont",
    title: "Don't tilt or italicise the knight badge",
    body: "The badge is always upright. No drop shadows, no 3D, no rainbow gradients.",
  },
]

// ─────────────────────────────────────────────────────────────────────────
// Umbrella impact + coverage
// ─────────────────────────────────────────────────────────────────────────

export const MOCK_UMBRELLA_NODES: ReadonlyArray<UmbrellaImpactNode> = [
  { id: "buttons", label: "ActionButton family", consumers: 38, tone: "red" },
  { id: "cards", label: "Surface cards", consumers: 74, tone: "amber" },
  { id: "telemetry", label: "Telemetry HUD", consumers: 32, tone: "teal" },
  { id: "chrome", label: "App chrome", consumers: 14, tone: "neutral" },
  { id: "charts", label: "Charts + sparklines", consumers: 26, tone: "green" },
]

export const MOCK_COVERAGE: ReadonlyArray<UsageCoverageDatum> = [
  { family: "Surfaces", adopted: 18, total: 18 },
  { family: "Primitives", adopted: 22, total: 24 },
  { family: "Charts", adopted: 7, total: 8 },
  { family: "Forms", adopted: 18, total: 24 },
  { family: "Icons", adopted: 64, total: 78 },
  { family: "Branding", adopted: 14, total: 14 },
]
