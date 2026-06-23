/**
 * Per-LEVEL control groupings.
 *
 * The control panel exposes the same token catalog at five progressively
 * narrower scopes. Overrides cascade down: a page override beats a section
 * override beats an individual-instance override beats a component-set
 * override beats the global default. Each level writes its overrides to a
 * different CSS scope (see {@link CssScope}).
 */
import type { ControlLevel, ControlLevelSpec } from "./types";

export const CONTROL_LEVELS: readonly ControlLevelSpec[] = [
  {
    level: "global",
    label: "Global tokens",
    description:
      "Edit a `--primitive-*` token once and re-theme the entire system. Writes to the dashboard root.",
    groups: [
      "Color",
      "Typography",
      "Spacing",
      "Radius",
      "Shadow",
      "Glass",
      "Neumorphism",
      "Carbon",
      "Metallic",
      "Chrome",
      "Motion",
      "Icon",
      "Button",
      "Card",
      "Form",
      "Nav",
    ],
    cssScope: "dashboard-root",
    inheritsFrom: null,
  },
  {
    level: "component-set",
    label: "Component set",
    description:
      "Override tokens for one family/set of primitives (e.g. all buttons, all cards). Scoped to a set wrapper.",
    groups: ["Button", "Card", "Form", "Nav", "Icon", "Radius", "Shadow", "Color"],
    cssScope: "component-set-scope",
    inheritsFrom: "global",
  },
  {
    level: "individual",
    label: "Individual primitive",
    description:
      "Override tokens on a single primitive instance via inline style. Narrowest component-level scope.",
    groups: ["Color", "Radius", "Shadow", "Spacing", "Typography", "Icon", "Motion"],
    cssScope: "instance-style",
    inheritsFrom: "component-set",
  },
  {
    level: "section",
    label: "Section",
    description:
      "Re-theme a section of a page (hero, gallery, pricing). Scoped to the section element.",
    groups: [
      "Color",
      "Spacing",
      "Radius",
      "Typography",
      "Glass",
      "Carbon",
      "Metallic",
      "Chrome",
    ],
    cssScope: "section-scope",
    inheritsFrom: "global",
  },
  {
    level: "page",
    label: "Page",
    description:
      "Theme an entire page distinctly from the global default. Scoped to the page root.",
    groups: [
      "Color",
      "Typography",
      "Spacing",
      "Radius",
      "Shadow",
      "Glass",
      "Carbon",
      "Metallic",
      "Chrome",
      "Motion",
    ],
    cssScope: "page-scope",
    inheritsFrom: "global",
  },
];

/** Lookup a level spec by its key. */
export const CONTROL_LEVEL_BY_KEY: Readonly<
  Record<ControlLevel, ControlLevelSpec>
> = CONTROL_LEVELS.reduce(
  (acc, spec) => {
    acc[spec.level] = spec;
    return acc;
  },
  {} as Record<ControlLevel, ControlLevelSpec>,
);
