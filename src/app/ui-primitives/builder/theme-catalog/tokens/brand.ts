/**
 * Brand-DNA token controls — Carbon, Metallic, and Chrome groups.
 *
 * Carbon-weave + metallic gradients are composite background-images, exposed as
 * presets (select) or an on/off layer (toggle) so the panel stays token-driven.
 * Chrome groups the shell-surface backgrounds (dashboard, sidebar, footer,
 * control surfaces) + the texture stroke.
 */
import type { TokenGroupCatalog } from "../types";

export const CARBON_CATALOG: TokenGroupCatalog = {
  group: "Carbon",
  label: "Carbon fibre",
  description:
    "Twill carbon-weave texture layered under surfaces for the brand body.",
  tokens: [
    {
      token: "--primitive-carbon-weave",
      label: "Carbon weave",
      description: "Twill carbon-fibre weave background-image layered under surfaces.",
      group: "Carbon",
      control: {
        kind: "toggle",
        onValue:
          "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.022) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.34) 0 1px, transparent 1px 3px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.22) 0 3px, transparent 3px 6px), linear-gradient(135deg, #0a0b10 0%, #050609 52%, #0b0c12 100%)",
        offValue: "none",
      },
      default:
        "repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.022) 0 1px, transparent 1px 3px), repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.34) 0 1px, transparent 1px 3px), repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.22) 0 3px, transparent 3px 6px), linear-gradient(135deg, #0a0b10 0%, #050609 52%, #0b0c12 100%)",
      scope: "shared",
      affects: ["panels", "cards", "buttons"],
    },
    {
      token: "--primitive-carbon-weave-size",
      label: "Carbon weave size",
      description: "Background-size tuple controlling weave tightness.",
      group: "Carbon",
      control: {
        kind: "select",
        options: [
          { label: "Tight (6px)", value: "6px 6px, 6px 6px, 6px 6px, 100% 100%" },
          { label: "Medium (8px)", value: "8px 8px, 8px 8px, 8px 8px, 100% 100%" },
          { label: "Wide (12px)", value: "12px 12px, 12px 12px, 12px 12px, 100% 100%" },
        ],
      },
      default: "6px 6px, 6px 6px, 6px 6px, 100% 100%",
      scope: "shared",
      affects: ["panels", "cards", "buttons"],
    },
  ],
};

export const METALLIC_CATALOG: TokenGroupCatalog = {
  group: "Metallic",
  label: "Metallic paint",
  description: "Clearcoat metallic-paint gradients (red, amber, black) + sheen.",
  tokens: [
    {
      token: "--primitive-metallic-red",
      label: "Metallic red",
      description: "Clearcoat metallic-red paint gradient (primary button body).",
      group: "Metallic",
      control: { kind: "color", supportsAlpha: true },
      default:
        "linear-gradient(180deg, color-mix(in oklab, var(--primitive-red) 78%, white) 0%, var(--primitive-red) 44%, var(--primitive-red-dark) 100%)",
      scope: "themed",
      affects: ["buttons"],
    },
    {
      token: "--primitive-metallic-amber",
      label: "Metallic amber",
      description: "Clearcoat metallic-amber paint gradient (button hover body).",
      group: "Metallic",
      control: { kind: "color", supportsAlpha: true },
      default:
        "linear-gradient(180deg, color-mix(in oklab, var(--primitive-amber) 70%, white) 0%, var(--primitive-amber) 46%, color-mix(in oklab, var(--primitive-amber) 72%, black) 100%)",
      scope: "themed",
      affects: ["buttons"],
    },
    {
      token: "--primitive-metallic-black",
      label: "Metallic black",
      description: "Painted-metal black gradient (secondary button body).",
      group: "Metallic",
      control: { kind: "color", supportsAlpha: true },
      default: "linear-gradient(180deg, #23252e 0%, #14151b 48%, #0a0b10 100%)",
      scope: "shared",
      affects: ["buttons"],
    },
    {
      token: "--primitive-metallic-sheen",
      label: "Metallic sheen",
      description: "Clearcoat top-highlight sheen layered over metal.",
      group: "Metallic",
      control: { kind: "color", supportsAlpha: true },
      default:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.34) 0%, rgba(255, 255, 255, 0.06) 42%, transparent 60%)",
      scope: "shared",
      affects: ["buttons"],
    },
  ],
};

export const CHROME_CATALOG: TokenGroupCatalog = {
  group: "Chrome",
  label: "Chrome / shell",
  description:
    "Dashboard + sidebar backgrounds, footer, control surfaces, and texture strokes.",
  tokens: [
    {
      token: "--primitive-dashboard-background",
      label: "Dashboard background",
      description: "Composite grid + radial-glow background image for the canvas.",
      group: "Chrome",
      control: { kind: "color", supportsAlpha: true },
      default:
        "linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px) 0 0 / 64px 64px, radial-gradient(circle at 82% 8%, rgba(230, 32, 40, 0.22), transparent 28rem), radial-gradient(circle at 14% 82%, rgba(64, 188, 255, 0.11), transparent 34rem), linear-gradient(135deg, #040407 0%, #0c0d13 52%, #07080d 100%)",
      scope: "themed",
      affects: ["canvas"],
    },
    {
      token: "--primitive-sidebar-background",
      label: "Sidebar background",
      description: "Layered radial + linear sidebar background.",
      group: "Chrome",
      control: { kind: "color", supportsAlpha: true },
      default:
        "radial-gradient(circle at 0 0, rgba(255, 193, 79, 0.08), transparent 28%), radial-gradient(circle at 100% 0, rgba(64, 188, 255, 0.08), transparent 26%), linear-gradient(180deg, rgba(255, 255, 255, 0.075), rgba(255, 255, 255, 0.012)), rgba(5, 5, 8, 0.78)",
      scope: "themed",
      affects: ["sidebar"],
    },
    {
      token: "--primitive-footer-surface",
      label: "Footer surface",
      description: "Footer panel surface fill.",
      group: "Chrome",
      control: { kind: "color", supportsAlpha: true },
      default:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.018)), rgba(255, 255, 255, 0.03)",
      scope: "themed",
      affects: ["footer"],
    },
    {
      token: "--primitive-control-surface",
      label: "Control surface",
      description: "Resting fill for controls (buttons, chips, toggles).",
      group: "Chrome",
      control: { kind: "color", supportsAlpha: true },
      default:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.065), rgba(255, 255, 255, 0.016)), rgba(255, 255, 255, 0.025)",
      scope: "themed",
      affects: ["controls", "cards"],
    },
    {
      token: "--primitive-control-active",
      label: "Control active",
      description: "Active / pressed fill for controls.",
      group: "Chrome",
      control: { kind: "color", supportsAlpha: true },
      default:
        "linear-gradient(180deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.045)), rgba(230, 32, 40, 0.18)",
      scope: "themed",
      affects: ["controls"],
    },
    {
      token: "--primitive-texture-stroke",
      label: "Texture stroke",
      description: "Faint hairline texture overlay color.",
      group: "Chrome",
      control: { kind: "color", supportsAlpha: true },
      default: "rgba(255, 255, 255, 0.025)",
      lightDefault: "rgba(15, 25, 38, 0.055)",
      scope: "themed",
      affects: ["panels", "canvas"],
    },
    {
      token: "--primitive-icon-obsidian",
      label: "Icon color",
      description: "Default icon ink color.",
      group: "Chrome",
      control: { kind: "color" },
      default: "#f4f5fa",
      lightDefault: "#1a252c",
      scope: "themed",
      affects: ["icons"],
    },
  ],
};
