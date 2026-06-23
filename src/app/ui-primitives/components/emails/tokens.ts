/**
 * Email-safe design tokens for transactional email templates.
 *
 * Email clients (Gmail, Outlook, Apple Mail) only reliably support a subset of
 * CSS. We expose plain hex values + font fallback strings so templates can
 * apply them inline. This file is the single swap point for brand tweaks that
 * propagate across every template in this folder.
 */

export const emailTokens = {
  // Brand
  red: "#e62028",
  redDark: "#a8141a",
  amber: "#ffc14f",
  teal: "#40bcff",
  green: "#37d67a",

  // Surfaces / lines / text — email-light by default (white-page convention)
  canvas: "#f4f2ee",
  panel: "#ffffff",
  panelMuted: "#fbfaf7",
  line: "#e5e1da",
  lineStrong: "#cfc8bd",
  body: "#1f2230",
  muted: "#6b7080",

  // Text colours for dark brand-bar / accent-fill contexts
  textOnDark: "#ffffff",
  textOnDarkMuted: "rgba(255,255,255,0.66)",

  // Status accents (lighter tints used inside white-paper layouts)
  redSoft: "#fde7e8",
  amberSoft: "#fff4d9",
  tealSoft: "#dff1ff",
  greenSoft: "#dff7e8",

  // Darkened status text — readable on the matching soft tint above
  tealText: "#0c5d8a",
  amberText: "#5a3f00",
  greenText: "#0f5b32",

  // Type stacks — keep web-safe fallbacks so Outlook does not break
  display:
    'Anton, "Arial Narrow", "Helvetica Neue Condensed", Impact, Arial, sans-serif',
  body_font:
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  mono:
    '"JetBrains Mono", "SF Mono", Menlo, Consolas, "Liberation Mono", monospace',
} as const

export type EmailTokens = typeof emailTokens
