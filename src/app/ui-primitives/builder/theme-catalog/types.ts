/**
 * Theme-control token catalog — type contracts.
 *
 * This module defines the metadata shapes that drive the visual control panel.
 * It is PURE DATA + TYPES — no UI, no runtime side effects. Every controllable
 * design value maps to a central `--primitive-*` token defined in
 * `src/app/ui-primitives/ui-primitives.module.css` (the `.dashboard` block).
 *
 * The control panel reads this catalog to render the right control for each
 * token (color picker, slider, select, toggle), seed it with the token's
 * default, and know which surfaces re-theme when the value changes.
 *
 * Token-driven only: defaults here are the literal CSS values currently set on
 * the tokens, recorded so the control panel can show/reset to the shipped
 * value. They are descriptive metadata, never an alternate source of truth —
 * the live cascade always reads the CSS variable.
 */

/**
 * Top-level groups the control panel uses to bucket tokens into tabs/sections.
 * Mirrors the families called out in the tokenization contract.
 */
export type TokenGroup =
  | "Color"
  | "Typography"
  | "Spacing"
  | "Radius"
  | "Shadow"
  | "Glass"
  | "Neumorphism"
  | "Carbon"
  | "Metallic"
  | "Chrome"
  | "Motion"
  | "Icon"
  | "Button"
  | "Card"
  | "Form"
  | "Nav";

/**
 * The kind of control widget the panel renders for a token. Discriminated on
 * `kind` so consumers can exhaustively switch without `any`.
 */
export type ControlKind = ControlSpec["kind"];

/** A color-swatch + picker control (hex/rgba editable). */
export interface ColorControlSpec {
  readonly kind: "color";
  /**
   * `true` when the token's value is a translucent layer / gradient rather than
   * a flat solid, so the panel can offer an alpha or gradient-aware editor.
   */
  readonly supportsAlpha?: boolean;
}

/** A numeric slider with explicit bounds + unit. */
export interface SliderControlSpec {
  readonly kind: "slider";
  readonly min: number;
  readonly max: number;
  readonly step: number;
  /** CSS unit appended to the slider value, e.g. `"px"`, `"ms"`, `"rem"`, `""`. */
  readonly unit: SliderUnit;
}

/** CSS units a slider can emit. Empty string = unitless (e.g. line-height). */
export type SliderUnit = "px" | "ms" | "rem" | "em" | "%" | "";

/** A discrete choice control. */
export interface SelectControlSpec {
  readonly kind: "select";
  readonly options: readonly SelectOption[];
}

/** A boolean on/off control. */
export interface ToggleControlSpec {
  readonly kind: "toggle";
  /** Value applied when on / off — keeps the toggle token-driven. */
  readonly onValue: string;
  readonly offValue: string;
}

/** One option in a {@link SelectControlSpec}. */
export interface SelectOption {
  readonly label: string;
  /** The CSS value (or token reference) applied when chosen. */
  readonly value: string;
}

/** Union of all control specs. Discriminated on `kind`. */
export type ControlSpec =
  | ColorControlSpec
  | SliderControlSpec
  | SelectControlSpec
  | ToggleControlSpec;

/**
 * The render surfaces a token influences. Lets the panel preview "what will
 * change" and scope edits. These are coarse UI regions, not component names.
 */
export type SurfaceTarget =
  | "canvas"
  | "panels"
  | "cards"
  | "sidebar"
  | "nav"
  | "footer"
  | "controls"
  | "fields"
  | "buttons"
  | "icons"
  | "typography"
  | "meters"
  | "code"
  | "overlays"
  | "focus"
  | "media"
  | "tables"
  | "all";

/**
 * Whether a token's value is theme-dependent (differs light vs dark) or shared.
 * The contract states sizes/space/radius/motion/icon are theme-agnostic while
 * color/surface tokens carry both themes.
 */
export type TokenScope = "themed" | "shared";

/** A single controllable token entry in the catalog. */
export interface TokenControl {
  /** The CSS custom property name, e.g. `"--primitive-red"`. */
  readonly token: `--primitive-${string}`;
  /** Human-facing label shown in the panel, e.g. `"Brand red"`. */
  readonly label: string;
  /** Short helper text explaining what the token does. */
  readonly description: string;
  /** The group bucket this token belongs to. */
  readonly group: TokenGroup;
  /** The control widget + its configuration. */
  readonly control: ControlSpec;
  /**
   * The token's current shipped default. For themed tokens this is the dark
   * (canonical) value; {@link lightDefault} carries the light override.
   */
  readonly default: string;
  /** Light-theme default when the token is themed. Omitted for shared tokens. */
  readonly lightDefault?: string;
  /** Whether the value is theme-dependent or shared across themes. */
  readonly scope: TokenScope;
  /** Surfaces re-themed when this token changes. */
  readonly affects: readonly SurfaceTarget[];
}

/**
 * The per-LEVEL control levels. The panel exposes the same token catalog at
 * progressively narrower scopes; this enumerates the scopes from broadest to
 * narrowest.
 */
export type ControlLevel =
  | "global"
  | "component-set"
  | "individual"
  | "section"
  | "page";

/**
 * Describes one control level: which groups it exposes and how overrides cascade.
 */
export interface ControlLevelSpec {
  readonly level: ControlLevel;
  readonly label: string;
  readonly description: string;
  /** Groups surfaced at this level, in display order. */
  readonly groups: readonly TokenGroup[];
  /**
   * The CSS scope an override at this level writes to — informs whether the
   * panel sets a variable on `:root`/`.dashboard`, a component-set wrapper, a
   * single primitive instance, a section element, or a page root.
   */
  readonly cssScope: CssScope;
  /** Level this one inherits from (overrides cascade down). `null` = root. */
  readonly inheritsFrom: ControlLevel | null;
}

/** Where a level's overrides are written in the cascade. */
export type CssScope =
  | "dashboard-root"
  | "component-set-scope"
  | "instance-style"
  | "section-scope"
  | "page-scope";

/** A named group of token controls for one {@link TokenGroup}. */
export interface TokenGroupCatalog {
  readonly group: TokenGroup;
  readonly label: string;
  readonly description: string;
  readonly tokens: readonly TokenControl[];
}
