"use client";

/**
 * The token-override controller for the theme panel.
 *
 * Wraps {@link useStyleProfile} so every control edit writes the central
 * `--primitive-*` token through the ThemeProvider's scope-override channel
 * (which sets the matching CSS custom property on the provider wrapper). The
 * panel NEVER hardcodes a value onto a component — it only re-points a token,
 * and the cascade re-themes every descendant.
 *
 * Edits are keyed to one named scope per control LEVEL so different levels can
 * carry independent override maps that all cascade through the same provider.
 */
import { useCallback, useMemo } from "react";

import { useStyleProfile } from "../../builder/theme";
import type {
  PrimitiveTokenName,
  TokenOverrideMap,
} from "../../builder/theme";
import type { ControlLevel } from "../../builder/theme-catalog";

/** Stable scope id for a control level's overrides. */
export function scopeIdForLevel(level: ControlLevel): string {
  return `theme-panel/${level}`;
}

export interface TokenOverridesController {
  /** Current override map for the active level (token name -> value). */
  readonly overrides: TokenOverrideMap;
  /** Total number of tokens currently overridden across all panel scopes. */
  readonly totalOverrideCount: number;
  /** Set (or replace) one token's override for the active level. */
  setToken: (token: PrimitiveTokenName, value: string) => void;
  /** Remove one token's override, reverting it to the inherited value. */
  resetToken: (token: PrimitiveTokenName) => void;
  /** Remove every override for the active level. */
  resetLevel: () => void;
  /** Remove every override across all panel levels. */
  resetAll: () => void;
  /** The current value of a token if overridden at this level. */
  valueOf: (token: PrimitiveTokenName) => string | undefined;
  /** Whether a token currently carries an override at this level. */
  isOverridden: (token: PrimitiveTokenName) => boolean;
}

const PANEL_SCOPE_PREFIX = "theme-panel/";

/**
 * Manage the override map for one control level through the ThemeProvider.
 * Must be used inside a {@link ThemeProvider}.
 */
export function useTokenOverrides(
  level: ControlLevel,
): TokenOverridesController {
  const { scopeOverrides, setScopeOverride, clearScopeOverride } =
    useStyleProfile();

  const scope = scopeIdForLevel(level);
  const overrides = useMemo<TokenOverrideMap>(
    () => scopeOverrides[scope] ?? {},
    [scopeOverrides, scope],
  );

  const totalOverrideCount = useMemo(() => {
    let count = 0;
    for (const [key, map] of Object.entries(scopeOverrides)) {
      if (key.startsWith(PANEL_SCOPE_PREFIX)) {
        count += Object.keys(map).length;
      }
    }
    return count;
  }, [scopeOverrides]);

  const setToken = useCallback(
    (token: PrimitiveTokenName, value: string) => {
      setScopeOverride(scope, { ...overrides, [token]: value });
    },
    [setScopeOverride, scope, overrides],
  );

  const resetToken = useCallback(
    (token: PrimitiveTokenName) => {
      if (!(token in overrides)) return;
      const next: TokenOverrideMap = { ...overrides };
      delete next[token];
      if (Object.keys(next).length === 0) {
        clearScopeOverride(scope);
        return;
      }
      setScopeOverride(scope, next);
    },
    [overrides, setScopeOverride, clearScopeOverride, scope],
  );

  const resetLevel = useCallback(() => {
    clearScopeOverride(scope);
  }, [clearScopeOverride, scope]);

  const resetAll = useCallback(() => {
    for (const key of Object.keys(scopeOverrides)) {
      if (key.startsWith(PANEL_SCOPE_PREFIX)) {
        clearScopeOverride(key);
      }
    }
  }, [scopeOverrides, clearScopeOverride]);

  const valueOf = useCallback(
    (token: PrimitiveTokenName) => overrides[token],
    [overrides],
  );

  const isOverridden = useCallback(
    (token: PrimitiveTokenName) => token in overrides,
    [overrides],
  );

  return {
    overrides,
    totalOverrideCount,
    setToken,
    resetToken,
    resetLevel,
    resetAll,
    valueOf,
    isOverridden,
  };
}
