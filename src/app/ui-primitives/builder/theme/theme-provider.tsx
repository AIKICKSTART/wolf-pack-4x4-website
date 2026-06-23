"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react"

import {
  StyleProfileContext,
  type StyleProfileContextValue,
} from "./theme-context"
import type {
  ScopeOverrides,
  StyleProfileId,
  TokenOverrideMap,
} from "./profile-types"
import { isPrimitiveTokenName } from "./token-names"
import {
  DEFAULT_PROFILE_ID,
  STYLE_PROFILES,
  resolveProfile,
} from "./profiles"
import {
  getProfileServerSnapshot,
  getProfileSnapshot,
  subscribeProfile,
  writeProfile,
} from "./profile-store"

const THEME_ATTR = "data-primitive-theme"

export interface ThemeProviderProps {
  children: ReactNode
  /**
   * Profile to start from before any persisted choice is read. Useful for
   * SSR/preview surfaces that want a known first paint. Defaults to the
   * house profile.
   */
  defaultProfileId?: StyleProfileId
  /**
   * When true, skip reading/writing localStorage (e.g. an isolated preview
   * pane that should not clobber the user's saved choice).
   */
  disablePersistence?: boolean
  /**
   * Extra class names on the wrapper element (it already carries the
   * primitives `.dashboard` scope contract via consumers, but the wrapper is
   * a plain div so callers can style placement).
   */
  className?: string
}

/**
 * Drives the document-level colour scheme so the primitives CSS can swap its
 * base token values (the light palette is keyed on
 * `html[data-primitive-theme="light"]`). Returns a cleanup that restores the
 * prior value so a preview that mounts/unmounts never strands the document in
 * the wrong scheme.
 */
function applyDocumentScheme(scheme: "light" | "dark"): () => void {
  if (typeof document === "undefined") return () => {}
  const root = document.documentElement
  const previous = root.getAttribute(THEME_ATTR)
  root.setAttribute(THEME_ATTR, scheme)
  return () => {
    if (previous === null) {
      root.removeAttribute(THEME_ATTR)
    } else {
      root.setAttribute(THEME_ATTR, previous)
    }
  }
}

/** Folds a list of override maps into one validated CSS style object. */
function buildStyle(
  base: TokenOverrideMap,
  scopes: ScopeOverrides,
): CSSProperties {
  const merged: Record<string, string> = {}
  const apply = (map: TokenOverrideMap): void => {
    for (const [name, value] of Object.entries(map)) {
      if (value !== undefined && isPrimitiveTokenName(name)) {
        merged[name] = value
      }
    }
  }
  apply(base)
  for (const scopeMap of Object.values(scopes)) {
    apply(scopeMap)
  }
  // CSS custom properties are valid CSSProperties keys at runtime; the cast
  // bridges the typed surface without resorting to `any`.
  return merged as CSSProperties
}

/**
 * Applies the active style profile (plus any per-scope overrides) by writing
 * the matching `--primitive-*` custom properties as inline style on a wrapper
 * element. Switching profile re-themes every descendant that consumes the
 * tokens — no component edits required. The choice persists to localStorage.
 */
export function ThemeProvider({
  children,
  defaultProfileId = DEFAULT_PROFILE_ID,
  disablePersistence = false,
  className,
}: ThemeProviderProps) {
  // Persisted selection (app-level), read SSR-safely via an external store so
  // no effect is needed to hydrate it. Cross-tab `storage` events flow through.
  const storedId = useSyncExternalStore(
    subscribeProfile,
    getProfileSnapshot,
    getProfileServerSnapshot,
  )

  // Local selection used only for isolated preview instances that must not
  // touch (or read) the shared persisted choice.
  const [localId, setLocalId] = useState<StyleProfileId>(defaultProfileId)

  const profileId = disablePersistence ? localId : storedId
  const [scopeOverrides, setScopeOverrides] = useState<ScopeOverrides>({})

  const profile = useMemo(() => resolveProfile(profileId), [profileId])

  // App-level providers drive the document scheme so the primitives CSS can
  // swap its base palette (light/dark parity). Isolated preview instances
  // leave the document untouched and rely on their wrapper overrides only.
  // This effect syncs an external system (a DOM attribute), not React state.
  useEffect(() => {
    if (disablePersistence) return
    return applyDocumentScheme(profile.scheme === "light" ? "light" : "dark")
  }, [disablePersistence, profile.scheme])

  const setProfile = useCallback(
    (id: StyleProfileId) => {
      const next = resolveProfile(id).id
      if (disablePersistence) {
        setLocalId(next)
      } else {
        writeProfile(next, true)
      }
    },
    [disablePersistence],
  )

  const setScopeOverride = useCallback(
    (scope: string, tokens: TokenOverrideMap) => {
      setScopeOverrides((prev) => ({ ...prev, [scope]: tokens }))
    },
    [],
  )

  const clearScopeOverride = useCallback((scope: string) => {
    setScopeOverrides((prev) => {
      if (!(scope in prev)) return prev
      const next = { ...prev }
      delete next[scope]
      return next
    })
  }, [])

  const style = useMemo(
    () => buildStyle(profile.tokens, scopeOverrides),
    [profile, scopeOverrides],
  )

  const contextValue = useMemo<StyleProfileContextValue>(
    () => ({
      profile,
      profileId: profile.id,
      setProfile,
      profiles: STYLE_PROFILES,
      scopeOverrides,
      setScopeOverride,
      clearScopeOverride,
    }),
    [profile, setProfile, scopeOverrides, setScopeOverride, clearScopeOverride],
  )

  return (
    <StyleProfileContext.Provider value={contextValue}>
      <div
        className={className}
        style={style}
        data-style-profile={profile.id}
        data-style-scheme={profile.scheme}
      >
        {children}
      </div>
    </StyleProfileContext.Provider>
  )
}
