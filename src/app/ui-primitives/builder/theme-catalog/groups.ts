/**
 * Group metadata — labels + descriptions for each {@link TokenGroup}.
 * The control panel renders one tab/accordion per group.
 */
import type { TokenGroup } from "./types";

export interface GroupMeta {
  readonly group: TokenGroup;
  readonly label: string;
  readonly description: string;
  /** Display order in the panel (lower = earlier). */
  readonly order: number;
}

export const GROUP_META: Readonly<Record<TokenGroup, GroupMeta>> = {
  Color: {
    group: "Color",
    label: "Color",
    description:
      "Brand, text, surface, line, field, and accent colors. Themed light/dark.",
    order: 1,
  },
  Typography: {
    group: "Typography",
    label: "Typography",
    description:
      "Font families, the fluid + fixed type scale, weights, line-heights, and tracking.",
    order: 2,
  },
  Spacing: {
    group: "Spacing",
    label: "Spacing",
    description: "The px-exact spacing scale used for padding, margin, and gap rhythm.",
    order: 3,
  },
  Radius: {
    group: "Radius",
    label: "Radius",
    description: "Corner-radius scale from sharp to pill and round.",
    order: 4,
  },
  Shadow: {
    group: "Shadow",
    label: "Shadow",
    description: "Elevation shadows, surface shadows, and outline depth.",
    order: 5,
  },
  Glass: {
    group: "Glass",
    label: "Glass",
    description: "Translucent glass fills and shimmer used for layered surfaces.",
    order: 6,
  },
  Neumorphism: {
    group: "Neumorphism",
    label: "Neumorphism",
    description: "Soft inset light/dark layers that give controls a pressed-relief feel.",
    order: 7,
  },
  Carbon: {
    group: "Carbon",
    label: "Carbon fibre",
    description: "Twill carbon-weave texture layered under surfaces for the brand body.",
    order: 8,
  },
  Metallic: {
    group: "Metallic",
    label: "Metallic paint",
    description: "Clearcoat metallic-paint gradients (red, amber, black) + sheen.",
    order: 9,
  },
  Chrome: {
    group: "Chrome",
    label: "Chrome / shell",
    description:
      "Dashboard + sidebar backgrounds, footer, control surfaces, and texture strokes.",
    order: 10,
  },
  Motion: {
    group: "Motion",
    label: "Motion",
    description: "Transition durations and easing curves. Respects prefers-reduced-motion.",
    order: 11,
  },
  Icon: {
    group: "Icon",
    label: "Iconography",
    description: "Icon size scale, stroke width, and icon color.",
    order: 12,
  },
  Button: {
    group: "Button",
    label: "Button DNA",
    description:
      "Primary (metallic-red) + secondary (carbon) button background, foreground, shadow, radius.",
    order: 13,
  },
  Card: {
    group: "Card",
    label: "Card",
    description: "Card background, border, and shadow surfaces.",
    order: 14,
  },
  Form: {
    group: "Form",
    label: "Form fields",
    description: "Field backgrounds, hover/strong states, and focus ring.",
    order: 15,
  },
  Nav: {
    group: "Nav",
    label: "Navigation",
    description: "Nav item surfaces, hover/active states, and borders.",
    order: 16,
  },
};

/** All groups in display order. */
export const GROUP_ORDER: readonly TokenGroup[] = Object.values(GROUP_META)
  .slice()
  .sort((a, b) => a.order - b.order)
  .map((g) => g.group);
