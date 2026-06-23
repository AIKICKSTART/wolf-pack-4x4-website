/**
 * Token-group catalog barrel. Aggregates every {@link TokenGroupCatalog} into
 * one ordered list keyed by group.
 */
import type { TokenGroup, TokenGroupCatalog } from "../types";
import { COLOR_CATALOG } from "./color";
import { TYPOGRAPHY_CATALOG } from "./typography";
import { SPACING_CATALOG, RADIUS_CATALOG } from "./spacing-radius";
import { SHADOW_CATALOG, GLASS_CATALOG, NEUMORPHISM_CATALOG } from "./depth";
import { CARBON_CATALOG, METALLIC_CATALOG, CHROME_CATALOG } from "./brand";
import { MOTION_CATALOG, ICON_CATALOG } from "./motion-icon";
import {
  BUTTON_CATALOG,
  CARD_CATALOG,
  FORM_CATALOG,
  NAV_CATALOG,
} from "./components";

export {
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
};

/** Every group catalog in canonical display order. */
export const ALL_GROUP_CATALOGS: readonly TokenGroupCatalog[] = [
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
];

/** Group catalog lookup by {@link TokenGroup}. */
export const GROUP_CATALOG_BY_KEY: Readonly<
  Record<TokenGroup, TokenGroupCatalog>
> = ALL_GROUP_CATALOGS.reduce(
  (acc, catalog) => {
    acc[catalog.group] = catalog;
    return acc;
  },
  {} as Record<TokenGroup, TokenGroupCatalog>,
);
