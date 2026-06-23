"use client"

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react"
import type { CSSProperties, ReactNode } from "react"

import styles from "./theme-controller.module.css"
import {
  DEFAULT_PRESET_ID,
  THEME_PRESET_CHANGE_EVENT,
  THEME_PRESET_STORAGE_KEY,
  getPreset,
  presetToValues,
  readStoredThemePresetId,
  storeThemePresetId,
  TOKEN_CSS_VAR,
  themeTokens,
  type ThemePresetId,
  type ThemeTokenId,
} from "./theme-tokens"

interface ThemeControllerContextValue {
  currentPresetId: ThemePresetId
  values: Readonly<Record<ThemeTokenId, string>>
  setPreset: (id: ThemePresetId) => void
  setToken: (id: ThemeTokenId, value: string) => void
  resetTokens: () => void
}

const ThemeControllerContext = createContext<ThemeControllerContextValue | null>(null)

function subscribePreset(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === THEME_PRESET_STORAGE_KEY) {
      listener()
    }
  }

  window.addEventListener(THEME_PRESET_CHANGE_EVENT, listener)
  window.addEventListener("storage", handleStorage)

  return () => {
    window.removeEventListener(THEME_PRESET_CHANGE_EVENT, listener)
    window.removeEventListener("storage", handleStorage)
  }
}

interface ThemeControllerProps {
  children: ReactNode
  initialPresetId?: ThemePresetId
  className?: string
  syncGlobalPreset?: boolean
}

export function ThemeController({
  children,
  initialPresetId = DEFAULT_PRESET_ID,
  className,
  syncGlobalPreset = true,
}: ThemeControllerProps) {
  const globalPresetId = useSyncExternalStore(
    subscribePreset,
    () => readStoredThemePresetId(initialPresetId),
    () => initialPresetId,
  )
  const [localPresetId, setLocalPresetId] = useState<ThemePresetId>(initialPresetId)
  const [tokenOverrides, setTokenOverrides] = useState<Partial<Record<ThemeTokenId, string>>>({})
  const currentPresetId = syncGlobalPreset ? globalPresetId : localPresetId
  const values = useMemo<Record<ThemeTokenId, string>>(
    () => ({ ...presetToValues(getPreset(currentPresetId)), ...tokenOverrides }),
    [currentPresetId, tokenOverrides],
  )

  const setPreset = useCallback((id: ThemePresetId) => {
    setTokenOverrides({})
    if (syncGlobalPreset) {
      storeThemePresetId(id)
    } else {
      setLocalPresetId(id)
    }
  }, [syncGlobalPreset])

  const setToken = useCallback((id: ThemeTokenId, value: string) => {
    setTokenOverrides((current) => ({ ...current, [id]: value }))
  }, [])

  const resetTokens = useCallback(() => {
    setTokenOverrides({})
  }, [])

  const inlineStyle = useMemo<CSSProperties>(() => {
    const style: Record<string, string> = {}
    for (const token of themeTokens) {
      style[TOKEN_CSS_VAR[token.id]] = values[token.id]
    }
    return style as CSSProperties
  }, [values])

  const contextValue = useMemo<ThemeControllerContextValue>(
    () => ({ currentPresetId, values, setPreset, setToken, resetTokens }),
    [currentPresetId, values, setPreset, setToken, resetTokens],
  )

  const wrapperClass = [styles.root, className].filter(Boolean).join(" ")

  return (
    <ThemeControllerContext.Provider value={contextValue}>
      <div
        className={wrapperClass}
        style={inlineStyle}
        data-theme-preset={currentPresetId}
        suppressHydrationWarning
      >
        {children}
      </div>
    </ThemeControllerContext.Provider>
  )
}

export function useThemeController(): ThemeControllerContextValue {
  const ctx = useContext(ThemeControllerContext)
  if (!ctx) {
    throw new Error("useThemeController must be used inside <ThemeController>")
  }
  return ctx
}
