/**
 * Style profiles + theme context for the Mufflermen CMS builder.
 *
 * - {@link ThemeProvider} applies the active profile (and any per-scope
 *   overrides) by writing `--primitive-*` custom properties as inline style on
 *   a wrapper element. Switching profile re-themes every descendant that
 *   consumes the tokens — no component edits needed. The choice persists to
 *   localStorage.
 * - {@link useStyleProfile} reads/sets the active profile and scope overrides.
 * - {@link STYLE_PROFILES} are the five token-override maps.
 *
 * Everything is token-driven: profiles reference only `--primitive-*` tokens
 * (or `color-mix(... var(--primitive-*) ...)`), never raw design literals.
 */

export { ThemeProvider, type ThemeProviderProps } from "./theme-provider"
export {
  useStyleProfile,
  StyleProfileContext,
  type StyleProfileContextValue,
} from "./theme-context"

export {
  STYLE_PROFILES,
  STYLE_PROFILES_BY_ID,
  DEFAULT_PROFILE_ID,
  resolveProfile,
  carbonPro,
  glassGarage,
  neoWorkshop,
  motorsport,
  cleanLight,
} from "./profiles"

export type {
  StyleProfile,
  StyleProfileId,
  StyleProfileScheme,
  TokenOverrideMap,
  ScopeOverrides,
} from "./profile-types"

export {
  PRIMITIVE_TOKEN_NAMES,
  isPrimitiveTokenName,
  type PrimitiveTokenName,
} from "./token-names"
