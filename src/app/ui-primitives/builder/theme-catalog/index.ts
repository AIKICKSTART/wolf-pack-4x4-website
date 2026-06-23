/**
 * THEME-CONTROL TOKEN CATALOG — public barrel.
 *
 * Pure data + types that drive the visual theme control panel. Every entry maps
 * a central `--primitive-*` token (defined in `ui-primitives.module.css`) to a
 * human label, group, control widget, default, scope, and affected surfaces.
 * The catalog is also organized by control LEVEL (global → component-set →
 * individual → section → page).
 *
 * No UI, no React, no runtime side effects — consumers (the control panel) read
 * this metadata to render controls and write overrides back to the CSS cascade.
 */

// ---- Types ----
export type {
  TokenGroup,
  ControlKind,
  ControlSpec,
  ColorControlSpec,
  SliderControlSpec,
  SelectControlSpec,
  ToggleControlSpec,
  SelectOption,
  SliderUnit,
  SurfaceTarget,
  TokenScope,
  TokenControl,
  ControlLevel,
  ControlLevelSpec,
  CssScope,
  TokenGroupCatalog,
} from "./types";

// ---- Group + level + surface metadata ----
export { GROUP_META, GROUP_ORDER } from "./groups";
export type { GroupMeta } from "./groups";
export { CONTROL_LEVELS, CONTROL_LEVEL_BY_KEY } from "./levels";
export { SURFACE_META } from "./surfaces";
export type { SurfaceMeta } from "./surfaces";

// ---- Per-group token catalogs ----
export {
  ALL_GROUP_CATALOGS,
  GROUP_CATALOG_BY_KEY,
  COLOR_CATALOG,
  TYPOGRAPHY_CATALOG,
  SPACING_CATALOG,
  RADIUS_CATALOG,
  SHADOW_CATALOG,
  GLASS_CATALOG,
  NEUMORPHISM_CATALOG,
  CARBON_CATALOG,
  METALLIC_CATALOG,
  CHROME_CATALOG,
  MOTION_CATALOG,
  ICON_CATALOG,
  BUTTON_CATALOG,
  CARD_CATALOG,
  FORM_CATALOG,
  NAV_CATALOG,
} from "./tokens";

import type {
  ControlLevel,
  TokenControl,
  TokenGroup,
  TokenGroupCatalog,
} from "./types";
import { CONTROL_LEVEL_BY_KEY } from "./levels";
import { ALL_GROUP_CATALOGS, GROUP_CATALOG_BY_KEY } from "./tokens";

/**
 * Every controllable token, flattened across all groups in display order.
 */
export const ALL_TOKEN_CONTROLS: readonly TokenControl[] =
  ALL_GROUP_CATALOGS.flatMap((catalog) => catalog.tokens);

/**
 * Token-control lookup by token name, e.g. `TOKEN_CONTROL_BY_NAME["--primitive-red"]`.
 */
export const TOKEN_CONTROL_BY_NAME: Readonly<Record<string, TokenControl>> =
  ALL_TOKEN_CONTROLS.reduce<Record<string, TokenControl>>((acc, control) => {
    acc[control.token] = control;
    return acc;
  }, {});

/** Total count of controllable tokens — handy for panel headers / tests. */
export const TOKEN_CONTROL_COUNT: number = ALL_TOKEN_CONTROLS.length;

/**
 * The group catalogs surfaced at a given control level, in the level's order.
 * Returns one {@link TokenGroupCatalog} per group the level exposes.
 */
export function getCatalogsForLevel(
  level: ControlLevel,
): readonly TokenGroupCatalog[] {
  const spec = CONTROL_LEVEL_BY_KEY[level];
  return spec.groups.map((group: TokenGroup) => GROUP_CATALOG_BY_KEY[group]);
}

/**
 * The flattened token controls available at a given control level.
 */
export function getTokenControlsForLevel(
  level: ControlLevel,
): readonly TokenControl[] {
  return getCatalogsForLevel(level).flatMap((catalog) => catalog.tokens);
}
