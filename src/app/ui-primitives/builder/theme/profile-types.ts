import type { PrimitiveTokenName } from "./token-names"

/**
 * A token-override map: a partial record from `--primitive-*` token names to
 * the value the active style profile assigns them.
 *
 * Values must stay token-driven — they reference other `--primitive-*` tokens,
 * use `color-mix(... var(--primitive-*) ...)`, or set a scale/keyword that the
 * design system already defines. No raw design literals belong here.
 */
export type TokenOverrideMap = Partial<Record<PrimitiveTokenName, string>>

/** Stable identifiers for the five Mufflermen style profiles. */
export type StyleProfileId =
  | "carbon-pro"
  | "glass-garage"
  | "neo-workshop"
  | "motorsport"
  | "clean-light"

/**
 * The colour scheme a profile drives. The primitives CSS swaps light/dark
 * values via `html[data-primitive-theme]`, so a profile declares which scheme
 * it expects so the provider can set that attribute alongside the overrides.
 */
export type StyleProfileScheme = "dark" | "light"

/** A named, self-contained style profile expressed purely as token overrides. */
export interface StyleProfile {
  readonly id: StyleProfileId
  readonly name: string
  readonly description: string
  /** Colour scheme the override map is tuned for. */
  readonly scheme: StyleProfileScheme
  /** The token-override map applied when this profile is active. */
  readonly tokens: TokenOverrideMap
}

/**
 * Per-scope overrides layered on top of the active profile. Keyed by an
 * arbitrary scope id (e.g. a block id in the CMS builder) so a single region
 * can re-theme without affecting the rest of the tree. The provider merges
 * these after the base profile, last-write-wins.
 */
export type ScopeOverrides = Record<string, TokenOverrideMap>
