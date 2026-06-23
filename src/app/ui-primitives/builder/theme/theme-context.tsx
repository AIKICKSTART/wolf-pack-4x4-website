"use client"

import { createContext, useContext } from "react"

import type {
  ScopeOverrides,
  StyleProfile,
  StyleProfileId,
  TokenOverrideMap,
} from "./profile-types"

/** Public shape exposed by {@link useStyleProfile}. */
export interface StyleProfileContextValue {
  /** The currently active profile (fully resolved, never undefined). */
  readonly profile: StyleProfile
  /** Id of the active profile (convenience accessor). */
  readonly profileId: StyleProfileId
  /** Switch the active profile by id; persists to localStorage. */
  setProfile: (id: StyleProfileId) => void
  /** All selectable profiles, in display order. */
  readonly profiles: readonly StyleProfile[]
  /** Per-scope token overrides currently layered on top of the profile. */
  readonly scopeOverrides: ScopeOverrides
  /** Merge (or replace) the override map for a named scope. */
  setScopeOverride: (scope: string, tokens: TokenOverrideMap) => void
  /** Remove all overrides for a named scope. */
  clearScopeOverride: (scope: string) => void
}

export const StyleProfileContext = createContext<StyleProfileContextValue | null>(null)

/**
 * Reads the active style profile and its mutators. Must be called within a
 * {@link ThemeProvider}; throws otherwise so misuse fails loudly.
 */
export function useStyleProfile(): StyleProfileContextValue {
  const value = useContext(StyleProfileContext)
  if (value === null) {
    throw new Error("useStyleProfile must be used within a <ThemeProvider>.")
  }
  return value
}
