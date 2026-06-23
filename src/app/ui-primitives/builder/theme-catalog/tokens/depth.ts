/**
 * Depth token controls — Shadow, Glass, and Neumorphism groups.
 *
 * Shadow / surface-shadow tokens are composite box-shadow values, edited as
 * color/preset strings (shown via a select of shipped presets so the panel
 * stays token-driven without hardcoding raw shadows in product code). Glass +
 * Neumorphism tokens are translucent color layers.
 */
import type { TokenGroupCatalog } from "../types";

export const SHADOW_CATALOG: TokenGroupCatalog = {
  group: "Shadow",
  label: "Shadow",
  description: "Elevation shadows, surface shadows, and outline depth.",
  tokens: [
    {
      token: "--primitive-shadow-soft",
      label: "Shadow soft",
      description: "Standard soft drop shadow for raised surfaces.",
      group: "Shadow",
      control: {
        kind: "select",
        options: [
          { label: "Soft (dark)", value: "0 24px 52px rgba(0, 0, 0, 0.32)" },
          { label: "Soft (light)", value: "0 22px 46px rgba(58, 72, 80, 0.14)" },
          { label: "None", value: "none" },
        ],
      },
      default: "0 24px 52px rgba(0, 0, 0, 0.32)",
      lightDefault: "0 22px 46px rgba(58, 72, 80, 0.14)",
      scope: "themed",
      affects: ["panels", "cards"],
    },
    {
      token: "--primitive-shadow-deep",
      label: "Shadow deep",
      description: "Deep elevation shadow for modals / floating layers.",
      group: "Shadow",
      control: {
        kind: "select",
        options: [
          { label: "Deep (dark)", value: "0 52px 120px rgba(0, 0, 0, 0.55)" },
          { label: "Deep (light)", value: "0 44px 92px rgba(49, 61, 68, 0.18)" },
          { label: "None", value: "none" },
        ],
      },
      default: "0 52px 120px rgba(0, 0, 0, 0.55)",
      lightDefault: "0 44px 92px rgba(49, 61, 68, 0.18)",
      scope: "themed",
      affects: ["overlays", "panels"],
    },
    {
      token: "--primitive-surface-shadow",
      label: "Surface shadow",
      description: "Inset highlight + drop combo for resting surfaces.",
      group: "Shadow",
      control: {
        kind: "select",
        options: [
          {
            label: "Surface (dark)",
            value:
              "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 22px 70px rgba(0, 0, 0, 0.28)",
          },
          { label: "None", value: "none" },
        ],
      },
      default:
        "inset 0 1px 0 rgba(255, 255, 255, 0.08), 0 22px 70px rgba(0, 0, 0, 0.28)",
      scope: "themed",
      affects: ["panels", "cards"],
    },
    {
      token: "--primitive-surface-hover-shadow",
      label: "Surface hover shadow",
      description: "Lift shadow on surface hover.",
      group: "Shadow",
      control: {
        kind: "select",
        options: [
          {
            label: "Hover (dark)",
            value:
              "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 30px 80px rgba(0, 0, 0, 0.4)",
          },
          { label: "None", value: "none" },
        ],
      },
      default:
        "inset 0 1px 0 rgba(255, 255, 255, 0.12), 0 30px 80px rgba(0, 0, 0, 0.4)",
      scope: "themed",
      affects: ["panels", "cards"],
    },
    {
      token: "--primitive-shadow-outline",
      label: "Shadow outline",
      description: "Subtle dark outline color used in layered shadows.",
      group: "Shadow",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(0, 0, 0, 0.42)",
      lightDefault: "rgba(67, 82, 91, 0.22)",
      scope: "themed",
      affects: ["panels", "cards"],
    },
  ],
};

export const GLASS_CATALOG: TokenGroupCatalog = {
  group: "Glass",
  label: "Glass",
  description: "Translucent glass fills and shimmer used for layered surfaces.",
  tokens: [
    {
      token: "--primitive-glass-soft",
      label: "Glass soft",
      description: "Soft translucent glass fill.",
      group: "Glass",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(255, 255, 255, 0.05)",
      lightDefault: "rgba(255, 255, 255, 0.58)",
      scope: "themed",
      affects: ["panels", "controls"],
    },
    {
      token: "--primitive-glass-strong",
      label: "Glass strong",
      description: "Stronger frosted-glass fill.",
      group: "Glass",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(255, 255, 255, 0.1)",
      lightDefault: "rgba(255, 255, 255, 0.84)",
      scope: "themed",
      affects: ["panels", "controls"],
    },
    {
      token: "--primitive-shimmer-base",
      label: "Shimmer base",
      description: "Resting tone of the loading shimmer.",
      group: "Glass",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(255, 255, 255, 0.045)",
      lightDefault: "rgba(100, 116, 124, 0.13)",
      scope: "themed",
      affects: ["controls"],
    },
    {
      token: "--primitive-shimmer-peak",
      label: "Shimmer peak",
      description: "Highlight crest of the loading shimmer.",
      group: "Glass",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(255, 255, 255, 0.12)",
      lightDefault: "rgba(255, 255, 255, 0.76)",
      scope: "themed",
      affects: ["controls"],
    },
  ],
};

export const NEUMORPHISM_CATALOG: TokenGroupCatalog = {
  group: "Neumorphism",
  label: "Neumorphism",
  description:
    "Soft inset light/dark layers that give controls a pressed-relief feel.",
  tokens: [
    {
      token: "--primitive-neumo-light",
      label: "Neumo light",
      description: "Light edge of the soft inset relief.",
      group: "Neumorphism",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(255, 255, 255, 0.07)",
      lightDefault: "rgba(255, 255, 255, 0.92)",
      scope: "themed",
      affects: ["controls", "fields", "nav"],
    },
    {
      token: "--primitive-neumo-dark",
      label: "Neumo dark",
      description: "Dark edge of the soft inset relief.",
      group: "Neumorphism",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(0, 0, 0, 0.34)",
      lightDefault: "rgba(75, 90, 98, 0.2)",
      scope: "themed",
      affects: ["controls", "fields", "nav"],
    },
  ],
};
