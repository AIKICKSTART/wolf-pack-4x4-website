/**
 * Motion + Icon token controls. Both groups are theme-agnostic (shared).
 * Motion durations are ms sliders; easings are select presets. Icon sizes are
 * px sliders; stroke is a unitless slider.
 *
 * All motion is gated by prefers-reduced-motion in the consuming CSS — these
 * tokens set the duration/easing, never force animation on.
 */
import type { SelectOption, TokenGroupCatalog } from "../types";

const EASING_OPTIONS: readonly SelectOption[] = [
  { label: "Ease out", value: "cubic-bezier(0.16, 1, 0.3, 1)" },
  { label: "Ease in-out", value: "cubic-bezier(0.65, 0, 0.35, 1)" },
  { label: "Standard", value: "cubic-bezier(0.2, 0, 0, 1)" },
  { label: "Linear", value: "linear" },
];

export const MOTION_CATALOG: TokenGroupCatalog = {
  group: "Motion",
  label: "Motion",
  description:
    "Transition durations and easing curves. Respects prefers-reduced-motion.",
  tokens: [
    {
      token: "--primitive-duration-instant",
      label: "Duration instant",
      description: "Snappiest transition (80ms).",
      group: "Motion",
      control: { kind: "slider", min: 0, max: 300, step: 10, unit: "ms" },
      default: "80ms",
      scope: "shared",
      affects: ["all"],
    },
    {
      token: "--primitive-duration-fast",
      label: "Duration fast",
      description: "Fast UI transition (150ms).",
      group: "Motion",
      control: { kind: "slider", min: 0, max: 400, step: 10, unit: "ms" },
      default: "150ms",
      scope: "shared",
      affects: ["all"],
    },
    {
      token: "--primitive-duration-normal",
      label: "Duration normal",
      description: "Default transition (240ms).",
      group: "Motion",
      control: { kind: "slider", min: 0, max: 600, step: 10, unit: "ms" },
      default: "240ms",
      scope: "shared",
      affects: ["all"],
    },
    {
      token: "--primitive-duration-slow",
      label: "Duration slow",
      description: "Deliberate transition (360ms).",
      group: "Motion",
      control: { kind: "slider", min: 0, max: 800, step: 10, unit: "ms" },
      default: "360ms",
      scope: "shared",
      affects: ["all"],
    },
    {
      token: "--primitive-duration-slower",
      label: "Duration slower",
      description: "Slowest scripted transition (600ms).",
      group: "Motion",
      control: { kind: "slider", min: 0, max: 1200, step: 20, unit: "ms" },
      default: "600ms",
      scope: "shared",
      affects: ["all"],
    },
    {
      token: "--primitive-ease-out",
      label: "Ease out",
      description: "Decelerating easing for entrances.",
      group: "Motion",
      control: { kind: "select", options: EASING_OPTIONS },
      default: "cubic-bezier(0.16, 1, 0.3, 1)",
      scope: "shared",
      affects: ["all"],
    },
    {
      token: "--primitive-ease-in-out",
      label: "Ease in-out",
      description: "Symmetric easing for moves.",
      group: "Motion",
      control: { kind: "select", options: EASING_OPTIONS },
      default: "cubic-bezier(0.65, 0, 0.35, 1)",
      scope: "shared",
      affects: ["all"],
    },
    {
      token: "--primitive-ease-standard",
      label: "Ease standard",
      description: "Material-style standard easing.",
      group: "Motion",
      control: { kind: "select", options: EASING_OPTIONS },
      default: "cubic-bezier(0.2, 0, 0, 1)",
      scope: "shared",
      affects: ["all"],
    },
  ],
};

export const ICON_CATALOG: TokenGroupCatalog = {
  group: "Icon",
  label: "Iconography",
  description: "Icon size scale, stroke width, and icon color.",
  tokens: [
    {
      token: "--primitive-icon-xs",
      label: "Icon xs",
      description: "Smallest icon size (12px).",
      group: "Icon",
      control: { kind: "slider", min: 8, max: 24, step: 1, unit: "px" },
      default: "12px",
      scope: "shared",
      affects: ["icons"],
    },
    {
      token: "--primitive-icon-sm",
      label: "Icon sm",
      description: "Small icon size (14px).",
      group: "Icon",
      control: { kind: "slider", min: 10, max: 28, step: 1, unit: "px" },
      default: "14px",
      scope: "shared",
      affects: ["icons"],
    },
    {
      token: "--primitive-icon-md",
      label: "Icon md",
      description: "Default icon size (16px).",
      group: "Icon",
      control: { kind: "slider", min: 12, max: 32, step: 1, unit: "px" },
      default: "16px",
      scope: "shared",
      affects: ["icons"],
    },
    {
      token: "--primitive-icon-lg",
      label: "Icon lg",
      description: "Large icon size (20px).",
      group: "Icon",
      control: { kind: "slider", min: 16, max: 40, step: 1, unit: "px" },
      default: "20px",
      scope: "shared",
      affects: ["icons"],
    },
    {
      token: "--primitive-icon-xl",
      label: "Icon xl",
      description: "Extra-large icon size (24px).",
      group: "Icon",
      control: { kind: "slider", min: 18, max: 48, step: 1, unit: "px" },
      default: "24px",
      scope: "shared",
      affects: ["icons"],
    },
    {
      token: "--primitive-icon-2xl",
      label: "Icon 2xl",
      description: "Largest icon size (32px).",
      group: "Icon",
      control: { kind: "slider", min: 24, max: 64, step: 1, unit: "px" },
      default: "32px",
      scope: "shared",
      affects: ["icons"],
    },
    {
      token: "--primitive-icon-stroke",
      label: "Icon stroke",
      description: "Lucide icon stroke width.",
      group: "Icon",
      control: { kind: "slider", min: 1, max: 3, step: 0.25, unit: "" },
      default: "1.75",
      scope: "shared",
      affects: ["icons"],
    },
  ],
};
