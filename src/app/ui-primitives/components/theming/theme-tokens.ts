import type { PrimitiveTokenName } from "../../builder/theme/token-names"
import type { StyleProfileId } from "../../builder/theme/profile-types"
import { writeProfile } from "../../builder/theme/profile-store"

export type ThemeTokenCategory = "color" | "surface" | "type" | "icon"
export type ThemeTokenSource = "foundations" | "surfaces" | "typography" | "icons"

export type ThemeTokenId =
  | "canvas"
  | "panel"
  | "panel-strong"
  | "line"
  | "line-strong"
  | "body"
  | "muted"
  | "text-strong"
  | "red"
  | "red-dark"
  | "amber"
  | "teal"
  | "green"
  | "icon-obsidian"
  | "font-display"
  | "font-display-alt"
  | "font-body"
  | "font-mono"
  | "font-mono-techno"

export type ThemePresetId =
  | "mufflermen-classic"
  | "classic-glass"
  | "performance-teal"
  | "heritage-cream"
  | "brutalist-mono"
  | "glacier"

export type ThemePresetTone = "dark" | "light"

export interface ThemeToken {
  id: ThemeTokenId
  label: string
  description: string
  category: ThemeTokenCategory
  source: ThemeTokenSource
}

export interface ThemePreset {
  id: ThemePresetId
  label: string
  description: string
  values: Record<ThemeTokenId, string>
}

export interface ThemePresetChangeDetail {
  presetId: ThemePresetId
}

export const THEME_PRESET_STORAGE_KEY = "ofm-primitives-theme-preset"
export const THEME_PRESET_CHANGE_EVENT = "ofm-primitives-theme-preset-change"
const PRIMITIVE_THEME_STORAGE_KEY = "ofm-primitives-theme"
const PRIMITIVE_THEME_CHANGE_EVENT = "ofm-primitives-theme-change"
const PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY = "ofm-primitives-theme-assignments-v3"
const PRIMITIVE_THEME_ASSIGNMENTS_CHANGE_EVENT = "ofm-primitives-theme-assignment-change"
const WINDOW_NAME_STATE_KEY = "__ofmPrimitiveThemeState"
const STORAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

type PrimitiveThemeAssignments = {
  system: "auto" | ThemePresetId
  light: ThemePresetId
  dark: ThemePresetId
}

const DEFAULT_THEME_ASSIGNMENTS: PrimitiveThemeAssignments = {
  system: "auto",
  light: "heritage-cream",
  dark: "mufflermen-classic",
}

/**
 * Map from token id to the CSS custom property name (`--primitive-*`).
 * The controller writes these onto the scoped wrapper element so the
 * entire subtree re-skins instantly.
 */
export const TOKEN_CSS_VAR: Record<ThemeTokenId, PrimitiveTokenName> = {
  canvas: "--primitive-canvas",
  panel: "--primitive-panel",
  "panel-strong": "--primitive-panel-strong",
  line: "--primitive-line",
  "line-strong": "--primitive-line-strong",
  body: "--primitive-body",
  muted: "--primitive-muted",
  "text-strong": "--primitive-text-strong",
  red: "--primitive-red",
  "red-dark": "--primitive-red-dark",
  amber: "--primitive-amber",
  teal: "--primitive-teal",
  green: "--primitive-green",
  "icon-obsidian": "--primitive-icon-obsidian",
  "font-display": "--primitive-font-display",
  "font-display-alt": "--primitive-font-display-alt",
  "font-body": "--primitive-font-body",
  "font-mono": "--primitive-font-mono",
  "font-mono-techno": "--primitive-font-mono-techno",
}

export const themeTokens: ReadonlyArray<ThemeToken> = [
  { id: "canvas", label: "Canvas", description: "Outer surface and page background base.", category: "surface", source: "foundations" },
  { id: "panel", label: "Panel", description: "Default raised panel fill inherited by surface primitives.", category: "surface", source: "surfaces" },
  { id: "panel-strong", label: "Panel strong", description: "Higher-contrast panel for modal, hero, and overlay shells.", category: "surface", source: "surfaces" },
  { id: "line", label: "Line", description: "Default divider and panel border.", category: "surface", source: "surfaces" },
  { id: "line-strong", label: "Line strong", description: "Emphasised border on interactive and selected surfaces.", category: "surface", source: "surfaces" },
  { id: "body", label: "Body text", description: "Default body copy colour.", category: "color", source: "foundations" },
  { id: "muted", label: "Muted text", description: "Captions, meta, and supporting labels.", category: "color", source: "typography" },
  { id: "text-strong", label: "Strong text", description: "Headlines, values, and high-emphasis labels.", category: "color", source: "typography" },
  { id: "red", label: "Primary red", description: "Primary brand accent that feeds metallic red paint.", category: "color", source: "foundations" },
  { id: "red-dark", label: "Red dark", description: "Pressed and depth tone for the primary accent.", category: "color", source: "surfaces" },
  { id: "amber", label: "Amber", description: "Warning, attention, and hot-state accent.", category: "color", source: "foundations" },
  { id: "teal", label: "Teal", description: "Information, HUD, focus, and diagnostic accent.", category: "color", source: "foundations" },
  { id: "green", label: "Green", description: "Success, ready, and online accent.", category: "color", source: "foundations" },
  { id: "icon-obsidian", label: "Icon obsidian", description: "Carbon and Red icon foreground against approved wells.", category: "icon", source: "icons" },
  { id: "font-display", label: "Display font", description: "Big headlines and section titles.", category: "type", source: "typography" },
  { id: "font-display-alt", label: "Display alt", description: "Secondary display face for controlled variety.", category: "type", source: "typography" },
  { id: "font-body", label: "Body font", description: "Default reading text and UI labels.", category: "type", source: "typography" },
  { id: "font-mono", label: "Mono", description: "Code, keyboard, telemetry, and counters.", category: "type", source: "typography" },
  { id: "font-mono-techno", label: "Mono techno", description: "Technical HUD mono alternate.", category: "type", source: "typography" },
]

const MUFFLERMEN_CLASSIC: ThemePreset = {
  id: "mufflermen-classic",
  label: "Mufflermen Classic",
  description: "Default Oak Flats palette — red / amber / teal on obsidian.",
  values: {
    canvas: "#050508",
    panel: "rgba(16, 16, 22, 0.82)",
    "panel-strong": "rgba(23, 24, 32, 0.96)",
    line: "rgba(255, 255, 255, 0.13)",
    "line-strong": "rgba(255, 255, 255, 0.22)",
    body: "#c7c9d0",
    muted: "#868b98",
    "text-strong": "#ffffff",
    red: "#e62028",
    "red-dark": "#a8141a",
    amber: "#ffc14f",
    teal: "#40bcff",
    green: "#37d67a",
    "icon-obsidian": "#f4f5fa",
    "font-display": "Anton, Impact, sans-serif",
    "font-display-alt": "Oswald, Anton, sans-serif",
    "font-body": "Inter, Arial, sans-serif",
    "font-mono": "\"JetBrains Mono\", monospace",
    "font-mono-techno": "\"JetBrains Mono\", monospace",
  },
}

const CLASSIC_GLASS: ThemePreset = {
  id: "classic-glass",
  label: "Classic Glass",
  description: "Attached classic light-glass workshop skin — dark shell, chrome frost, red signal.",
  values: {
    canvas: "#06070a",
    panel: "rgba(236, 238, 241, 0.72)",
    "panel-strong": "rgba(248, 249, 251, 0.9)",
    line: "rgba(25, 32, 42, 0.16)",
    "line-strong": "rgba(25, 32, 42, 0.28)",
    body: "#25303c",
    muted: "#6d7784",
    "text-strong": "#0d1420",
    red: "#e62028",
    "red-dark": "#9f151a",
    amber: "#d99b2e",
    teal: "#1b8da7",
    green: "#23865f",
    "icon-obsidian": "#111823",
    "font-display": "Anton, Impact, sans-serif",
    "font-display-alt": "Oswald, Anton, sans-serif",
    "font-body": "Inter, Arial, sans-serif",
    "font-mono": "\"JetBrains Mono\", monospace",
    "font-mono-techno": "\"JetBrains Mono\", monospace",
  },
}

const PERFORMANCE_TEAL: ThemePreset = {
  id: "performance-teal",
  label: "Performance Teal",
  description: "Teal-forward dyno-shop palette — cooler surfaces, electric accents.",
  values: {
    canvas: "#04101a",
    panel: "rgba(10, 28, 44, 0.86)",
    "panel-strong": "rgba(14, 38, 60, 0.96)",
    line: "rgba(120, 220, 255, 0.18)",
    "line-strong": "rgba(120, 220, 255, 0.32)",
    body: "#cfe6f6",
    muted: "#7ea4b8",
    "text-strong": "#f4fbff",
    red: "#ff5566",
    "red-dark": "#b32a3c",
    amber: "#ffd166",
    teal: "#22d3ee",
    green: "#34e0a1",
    "icon-obsidian": "#f4fbff",
    "font-display": "Anton, Impact, sans-serif",
    "font-display-alt": "Oswald, Anton, sans-serif",
    "font-body": "Inter, Arial, sans-serif",
    "font-mono": "\"JetBrains Mono\", monospace",
    "font-mono-techno": "\"JetBrains Mono\", monospace",
  },
}

const HERITAGE_CREAM: ThemePreset = {
  id: "heritage-cream",
  label: "Heritage Cream",
  description: "Warm cream and oxblood — period-correct heritage muffler shop.",
  values: {
    canvas: "#f4ecd8",
    panel: "rgba(248, 240, 222, 0.94)",
    "panel-strong": "rgba(238, 228, 206, 0.98)",
    line: "rgba(60, 30, 20, 0.18)",
    "line-strong": "rgba(60, 30, 20, 0.34)",
    body: "#2a1d12",
    muted: "#7a614a",
    "text-strong": "#1f140d",
    red: "#7a1f1f",
    "red-dark": "#4a0f0f",
    amber: "#c08a2e",
    teal: "#3d7a7a",
    green: "#557d35",
    "icon-obsidian": "#2a1d12",
    "font-display": "\"Playfair Display\", Georgia, serif",
    "font-display-alt": "Georgia, \"Times New Roman\", serif",
    "font-body": "Georgia, \"Times New Roman\", serif",
    "font-mono": "\"Courier New\", monospace",
    "font-mono-techno": "\"Courier New\", monospace",
  },
}

const BRUTALIST_MONO: ThemePreset = {
  id: "brutalist-mono",
  label: "Brutalist Mono",
  description: "Concrete greys with a single acid yellow accent.",
  values: {
    canvas: "#1a1a1a",
    panel: "rgba(38, 38, 38, 0.94)",
    "panel-strong": "rgba(52, 52, 52, 0.98)",
    line: "rgba(255, 255, 255, 0.18)",
    "line-strong": "rgba(255, 255, 255, 0.36)",
    body: "#dcdcdc",
    muted: "#8a8a8a",
    "text-strong": "#ffffff",
    red: "#f6ff00",
    "red-dark": "#c9d300",
    amber: "#ffffff",
    teal: "#bababa",
    green: "#f6ff00",
    "icon-obsidian": "#eeeeee",
    "font-display": "\"JetBrains Mono\", monospace",
    "font-display-alt": "\"JetBrains Mono\", monospace",
    "font-body": "\"JetBrains Mono\", monospace",
    "font-mono": "\"JetBrains Mono\", monospace",
    "font-mono-techno": "\"JetBrains Mono\", monospace",
  },
}

const GLACIER: ThemePreset = {
  id: "glacier",
  label: "Glacier",
  description: "Icy cyan, cobalt and chrome — clinical and bright.",
  values: {
    canvas: "#e8f4f8",
    panel: "rgba(255, 255, 255, 0.92)",
    "panel-strong": "rgba(248, 252, 254, 0.98)",
    line: "rgba(30, 80, 140, 0.16)",
    "line-strong": "rgba(30, 80, 140, 0.32)",
    body: "#0a1f3d",
    muted: "#5a7892",
    "text-strong": "#071832",
    red: "#0b6ec9",
    "red-dark": "#08487f",
    amber: "#00b4d8",
    teal: "#48cae4",
    green: "#06b6a4",
    "icon-obsidian": "#0a1f3d",
    "font-display": "Inter, Arial, sans-serif",
    "font-display-alt": "Inter, Arial, sans-serif",
    "font-body": "Inter, Arial, sans-serif",
    "font-mono": "\"JetBrains Mono\", monospace",
    "font-mono-techno": "\"JetBrains Mono\", monospace",
  },
}

export const themePresets: ReadonlyArray<ThemePreset> = [
  MUFFLERMEN_CLASSIC,
  CLASSIC_GLASS,
  PERFORMANCE_TEAL,
  HERITAGE_CREAM,
  BRUTALIST_MONO,
  GLACIER,
]

export const DEFAULT_PRESET_ID: ThemePresetId = "mufflermen-classic"

export const THEME_PRESET_STYLE_PROFILE: Readonly<Record<ThemePresetId, StyleProfileId>> = {
  "mufflermen-classic": "carbon-pro",
  "classic-glass": "glass-garage",
  "performance-teal": "motorsport",
  "heritage-cream": "clean-light",
  "brutalist-mono": "neo-workshop",
  glacier: "clean-light",
}

export const STYLE_PROFILE_THEME_PRESET: Readonly<Record<StyleProfileId, ThemePresetId>> = {
  "carbon-pro": "mufflermen-classic",
  "glass-garage": "classic-glass",
  "neo-workshop": "brutalist-mono",
  motorsport: "performance-teal",
  "clean-light": "heritage-cream",
}

export function getStyleProfileForThemePreset(id: ThemePresetId): StyleProfileId {
  return THEME_PRESET_STYLE_PROFILE[id]
}

export function getThemePresetForStyleProfile(id: StyleProfileId): ThemePresetId {
  return STYLE_PROFILE_THEME_PRESET[id]
}

export function getPreset(id: ThemePresetId): ThemePreset {
  const found = themePresets.find((preset) => preset.id === id)
  if (!found) {
    return MUFFLERMEN_CLASSIC
  }
  return found
}

export function isThemePresetId(value: unknown): value is ThemePresetId {
  return typeof value === "string" && themePresets.some((preset) => preset.id === value)
}

export function getThemePresetTone(id: ThemePresetId): ThemePresetTone {
  return id === "classic-glass" || id === "heritage-cream" || id === "glacier" ? "light" : "dark"
}

export function readStoredThemePresetId(fallback: ThemePresetId = DEFAULT_PRESET_ID): ThemePresetId {
  if (typeof window === "undefined") {
    return fallback
  }

  try {
    const saved = window.sessionStorage.getItem(THEME_PRESET_STORAGE_KEY)
    if (isThemePresetId(saved)) {
      return saved
    }
  } catch {
    // Continue to persistent fallbacks.
  }

  try {
    const saved = window.localStorage.getItem(THEME_PRESET_STORAGE_KEY)
    if (isThemePresetId(saved)) {
      return saved
    }
  } catch {
    // Continue to the cookie fallback for browsers or previews with disabled storage.
  }

  const cookiePreset = readCookieValue(THEME_PRESET_STORAGE_KEY)
  if (isThemePresetId(cookiePreset)) {
    return cookiePreset
  }

  const windowPreset = readWindowNameValue(THEME_PRESET_STORAGE_KEY)
  return isThemePresetId(windowPreset) ? windowPreset : fallback
}

export function storeThemePresetId(id: ThemePresetId): void {
  if (typeof window === "undefined") {
    return
  }

  const presetTone = getThemePresetTone(id)

  try {
    window.localStorage.setItem(THEME_PRESET_STORAGE_KEY, id)
    window.localStorage.setItem(PRIMITIVE_THEME_STORAGE_KEY, presetTone)
  } catch {}

  try {
    window.sessionStorage.setItem(THEME_PRESET_STORAGE_KEY, id)
    window.sessionStorage.setItem(PRIMITIVE_THEME_STORAGE_KEY, presetTone)
  } catch {}

  writeCookieValue(THEME_PRESET_STORAGE_KEY, id)
  writeCookieValue(PRIMITIVE_THEME_STORAGE_KEY, presetTone)
  writeWindowNameValue(THEME_PRESET_STORAGE_KEY, id)
  writeWindowNameValue(PRIMITIVE_THEME_STORAGE_KEY, presetTone)
  storeThemeAssignment(presetTone, id)
  writeProfile(getStyleProfileForThemePreset(id), true)
  window.dispatchEvent(new Event(PRIMITIVE_THEME_CHANGE_EVENT))
  window.dispatchEvent(
    new CustomEvent<ThemePresetChangeDetail>(THEME_PRESET_CHANGE_EVENT, {
      detail: { presetId: id },
    }),
  )
}

function readThemeAssignments(): PrimitiveThemeAssignments {
  const raw =
    readStorageValue(PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY) ??
    readCookieValue(PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY) ??
    readWindowNameValue(PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY)

  try {
    const parsed = raw ? (JSON.parse(raw) as unknown) : null
    if (!parsed || typeof parsed !== "object") {
      return DEFAULT_THEME_ASSIGNMENTS
    }

    const record = parsed as Record<string, unknown>
    const light =
      isThemePresetId(record.light) && getThemePresetTone(record.light) === "light"
        ? record.light
        : DEFAULT_THEME_ASSIGNMENTS.light
    const dark =
      isThemePresetId(record.dark) && getThemePresetTone(record.dark) === "dark"
        ? record.dark
        : DEFAULT_THEME_ASSIGNMENTS.dark
    const system =
      record.system === "auto" || isThemePresetId(record.system)
        ? record.system
        : DEFAULT_THEME_ASSIGNMENTS.system

    return { system, light, dark }
  } catch {
    return DEFAULT_THEME_ASSIGNMENTS
  }
}

function storeThemeAssignment(tone: ThemePresetTone, presetId: ThemePresetId): void {
  const assignments = { ...readThemeAssignments(), [tone]: presetId }
  const serialized = JSON.stringify(assignments)

  try {
    window.localStorage.setItem(PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY, serialized)
  } catch {}

  try {
    window.sessionStorage.setItem(PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY, serialized)
  } catch {}

  writeCookieValue(PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY, serialized)
  writeWindowNameValue(PRIMITIVE_THEME_ASSIGNMENTS_STORAGE_KEY, serialized)
  window.dispatchEvent(new Event(PRIMITIVE_THEME_ASSIGNMENTS_CHANGE_EVENT))
}

/**
 * Set every CSS custom property from a preset on the target element.
 * Scoped — never touches `:root` or `.dashboard`.
 */
export function applyTheme(target: HTMLElement, preset: ThemePreset): void {
  for (const token of themeTokens) {
    const value = preset.values[token.id]
    target.style.setProperty(TOKEN_CSS_VAR[token.id], value)
  }
}

/**
 * Set one token on the target. Used by inline color/font pickers.
 */
export function applyTokenValue(target: HTMLElement, id: ThemeTokenId, value: string): void {
  target.style.setProperty(TOKEN_CSS_VAR[id], value)
}

/**
 * Build a plain object of `{ tokenId: cssValue }` from a preset.
 * Used as the initial state for the controller.
 */
export function presetToValues(preset: ThemePreset): Record<ThemeTokenId, string> {
  return { ...preset.values }
}

export function presetToCssVariables(preset: ThemePreset): Record<string, string> {
  const values = preset.values
  const cssVars: Record<string, string> = {}

  for (const token of themeTokens) {
    cssVars[TOKEN_CSS_VAR[token.id]] = values[token.id]
  }

  const foreground = values["text-strong"]
  const primaryForeground = readableTextOnHex(values.red)
  const accentForeground = readableTextOnHex(values.amber)

  return {
    ...cssVars,
    "--background": values.canvas,
    "--foreground": foreground,
    "--card": values["panel-strong"],
    "--card-foreground": foreground,
    "--popover": values["panel-strong"],
    "--popover-foreground": foreground,
    "--primary": values.red,
    "--primary-foreground": primaryForeground,
    "--secondary": values.panel,
    "--secondary-foreground": foreground,
    "--muted": values.panel,
    "--muted-foreground": values.muted,
    "--accent": values.amber,
    "--accent-foreground": accentForeground,
    "--destructive": values.red,
    "--border": values.line,
    "--input": values["line-strong"],
    "--ring": values.teal,
    "--primitive-dashboard-background":
      "linear-gradient(90deg, color-mix(in oklab, var(--primitive-body) 8%, transparent) 1px, transparent 1px) 0 0 / 64px 64px, " +
      "radial-gradient(circle at 82% 8%, color-mix(in oklab, var(--primitive-red) 22%, transparent), transparent 28rem), " +
      "radial-gradient(circle at 14% 82%, color-mix(in oklab, var(--primitive-teal) 14%, transparent), transparent 34rem), " +
      "linear-gradient(135deg, var(--primitive-canvas) 0%, color-mix(in oklab, var(--primitive-canvas) 82%, var(--primitive-panel-strong)) 52%, var(--primitive-canvas) 100%)",
    "--primitive-sidebar-background":
      "radial-gradient(circle at 0 0, color-mix(in oklab, var(--primitive-amber) 16%, transparent), transparent 28%), " +
      "radial-gradient(circle at 100% 0, color-mix(in oklab, var(--primitive-teal) 14%, transparent), transparent 26%), " +
      "linear-gradient(180deg, color-mix(in oklab, var(--primitive-panel-strong) 88%, transparent), color-mix(in oklab, var(--primitive-panel) 58%, transparent)), " +
      "color-mix(in oklab, var(--primitive-canvas) 86%, transparent)",
    "--primitive-nav-border": values.line,
    "--primitive-nav-surface":
      "linear-gradient(180deg, color-mix(in oklab, var(--primitive-panel-strong) 70%, transparent), color-mix(in oklab, var(--primitive-panel) 58%, transparent))",
    "--primitive-nav-hover-surface":
      "linear-gradient(180deg, color-mix(in oklab, var(--primitive-panel-strong) 92%, transparent), color-mix(in oklab, var(--primitive-panel) 76%, transparent))",
    "--primitive-nav-active-surface":
      "linear-gradient(135deg, color-mix(in oklab, var(--primitive-red) 18%, transparent), transparent 70%), " +
      "linear-gradient(180deg, color-mix(in oklab, var(--primitive-panel-strong) 92%, transparent), color-mix(in oklab, var(--primitive-panel) 72%, transparent))",
    "--primitive-footer-surface":
      "linear-gradient(180deg, color-mix(in oklab, var(--primitive-panel-strong) 86%, transparent), color-mix(in oklab, var(--primitive-panel) 62%, transparent))",
    "--primitive-control-surface":
      "linear-gradient(180deg, color-mix(in oklab, var(--primitive-panel-strong) 74%, transparent), color-mix(in oklab, var(--primitive-panel) 64%, transparent))",
    "--primitive-control-active":
      "linear-gradient(180deg, color-mix(in oklab, var(--primitive-panel-strong) 86%, transparent), color-mix(in oklab, var(--primitive-red) 18%, transparent))",
    "--primitive-meter-track": "color-mix(in oklab, var(--primitive-muted) 18%, transparent)",
    "--primitive-text-on-accent": primaryForeground,
    "--primitive-surface-1": values.panel,
    "--primitive-surface-2": values["panel-strong"],
    "--primitive-surface-3": "color-mix(in oklab, var(--primitive-panel-strong) 72%, transparent)",
    "--primitive-surface-hover": "color-mix(in oklab, var(--primitive-panel-strong) 88%, transparent)",
    "--primitive-field-bg": "color-mix(in oklab, var(--primitive-panel-strong) 62%, transparent)",
    "--primitive-field-hover": "color-mix(in oklab, var(--primitive-panel-strong) 78%, transparent)",
    "--primitive-field-strong": "color-mix(in oklab, var(--primitive-panel-strong) 92%, transparent)",
    "--primitive-recessed": "color-mix(in oklab, var(--primitive-canvas) 76%, var(--primitive-panel))",
    "--primitive-code-bg": "color-mix(in oklab, var(--primitive-canvas) 92%, black)",
    "--primitive-code-fg": foreground,
    "--primitive-focus-ring": values.teal,
    "--primitive-focus-shadow": "0 0 0 3px color-mix(in oklab, var(--primitive-teal) 26%, transparent)",
    "--primitive-shimmer-base": "color-mix(in oklab, var(--primitive-muted) 12%, transparent)",
    "--primitive-shimmer-peak": "color-mix(in oklab, var(--primitive-text-strong) 14%, transparent)",
    "--primitive-line-muted": "color-mix(in oklab, var(--primitive-line) 62%, transparent)",
    "--primitive-shadow-outline": "color-mix(in oklab, black 32%, transparent)",
    "--primitive-overlay": "color-mix(in oklab, var(--primitive-canvas) 74%, transparent)",
    "--primitive-media-overlay": "color-mix(in oklab, black 48%, transparent)",
    "--primitive-shadow-raised": "var(--primitive-shadow-soft)",
    "--primitive-shadow-inset":
      "inset 1px 1px 0 var(--primitive-neumo-light), inset -12px -12px 20px var(--primitive-neumo-dark)",
    "--primitive-texture-stroke": "color-mix(in oklab, var(--primitive-body) 7%, transparent)",
    "--primitive-card-bg": "var(--primitive-control-surface)",
    "--primitive-card-border": values.line,
    "--primitive-card-shadow": "var(--primitive-surface-shadow)",
    "--primitive-card-hover-shadow": "var(--primitive-surface-hover-shadow)",
  }
}

function readableTextOnHex(hex: string): string {
  const match = /^#?([0-9a-f]{6})$/i.exec(hex.trim())
  if (!match) {
    return "#ffffff"
  }

  const red = Number.parseInt(match[1].slice(0, 2), 16) / 255
  const green = Number.parseInt(match[1].slice(2, 4), 16) / 255
  const blue = Number.parseInt(match[1].slice(4, 6), 16) / 255
  const toLinear = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
  const luminance = 0.2126 * toLinear(red) + 0.7152 * toLinear(green) + 0.0722 * toLinear(blue)

  return luminance > 0.5 ? "#101010" : "#ffffff"
}

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null
  }

  const prefix = `${encodeURIComponent(name)}=`
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))

  return match ? decodeURIComponent(match.slice(prefix.length)) : null
}

function writeCookieValue(name: string, value: string): void {
  if (typeof document === "undefined") {
    return
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${STORAGE_COOKIE_MAX_AGE}; SameSite=Lax`
}

function readWindowNameValue(name: string): string | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const parsed = JSON.parse(window.name || "{}") as unknown
    if (!parsed || typeof parsed !== "object") {
      return null
    }

    const primitiveState = (parsed as Record<string, unknown>)[WINDOW_NAME_STATE_KEY]
    if (!primitiveState || typeof primitiveState !== "object") {
      return null
    }

    const value = (primitiveState as Record<string, unknown>)[name]
    return typeof value === "string" ? value : null
  } catch {
    return null
  }
}

function writeWindowNameValue(name: string, value: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    const parsed = JSON.parse(window.name || "{}") as unknown
    const rootState = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {}
    const primitiveState =
      rootState[WINDOW_NAME_STATE_KEY] && typeof rootState[WINDOW_NAME_STATE_KEY] === "object"
        ? (rootState[WINDOW_NAME_STATE_KEY] as Record<string, string>)
        : {}

    primitiveState[name] = value
    rootState[WINDOW_NAME_STATE_KEY] = primitiveState
    window.name = JSON.stringify(rootState)
  } catch {
    window.name = JSON.stringify({ [WINDOW_NAME_STATE_KEY]: { [name]: value } })
  }
}

function readStorageValue(name: string): string | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const saved = window.sessionStorage.getItem(name)
    if (saved) return saved
  } catch {}

  try {
    const saved = window.localStorage.getItem(name)
    if (saved) return saved
  } catch {}

  return null
}
