"use client"

import { Monitor, Moon, Sun, type LucideIcon } from "lucide-react"
import { useEffect, useSyncExternalStore } from "react"

import {
  THEME_PRESET_CHANGE_EVENT,
  THEME_PRESET_STORAGE_KEY,
  getPreset,
  getStyleProfileForThemePreset,
  getThemePresetTone,
  isThemePresetId,
  readStoredThemePresetId,
  themePresets,
  type ThemePresetChangeDetail,
  type ThemePresetId,
} from "./components/theming/theme-tokens"
import { writeProfile } from "./builder/theme/profile-store"
import styles from "./ui-primitives.module.css"

type PrimitiveThemeChoice = "system" | "light" | "dark"
type PrimitiveThemeTone = "light" | "dark"
type SystemThemeAssignment = "auto" | ThemePresetId

interface PrimitiveThemeAssignments {
  system: SystemThemeAssignment
  light: ThemePresetId
  dark: ThemePresetId
}

const storageKey = "ofm-primitives-theme"
const themeChangeEvent = "ofm-primitives-theme-change"
const assignmentStorageKey = "ofm-primitives-theme-assignments-v3"
const assignmentChangeEvent = "ofm-primitives-theme-assignment-change"
const defaultThemeChoice: PrimitiveThemeChoice = "dark"
const windowNameStateKey = "__ofmPrimitiveThemeState"
const documentThemeScopeKey = "__ofmPrimitiveThemeScopeCount"
const storageCookieMaxAge = 60 * 60 * 24 * 365
let fallbackThemeChoice: PrimitiveThemeChoice = defaultThemeChoice
let cachedAssignmentsKey = ""
let cachedAssignments: PrimitiveThemeAssignments
let documentThemeRestoreTimer: number | null = null
const defaultTonePreset: Record<PrimitiveThemeTone, ThemePresetId> = {
  light: "heritage-cream",
  dark: "mufflermen-classic",
}
const defaultAssignments: PrimitiveThemeAssignments = {
  system: "auto",
  ...defaultTonePreset,
}
cachedAssignments = defaultAssignments

const themeOptions: Array<{ value: PrimitiveThemeChoice; label: string; Icon: LucideIcon }> = [
  { value: "system", label: "System", Icon: Monitor },
  { value: "light", label: "Light mode", Icon: Sun },
  { value: "dark", label: "Dark mode", Icon: Moon },
]

function isThemeChoice(value: string | null): value is PrimitiveThemeChoice {
  return value === "system" || value === "light" || value === "dark"
}

function resolveTheme(choice: PrimitiveThemeChoice, prefersLight: boolean) {
  if (choice !== "system") {
    return choice
  }

  return prefersLight ? "light" : "dark"
}

function applyDocumentTheme(choice: PrimitiveThemeChoice, resolvedTheme: PrimitiveThemeTone) {
  const root = document.documentElement

  if (root.dataset.primitivePreviousDark === undefined) {
    root.dataset.primitivePreviousDark = root.classList.contains("dark") ? "1" : "0"
  }

  root.dataset.primitiveTheme = resolvedTheme
  root.dataset.primitiveThemeChoice = choice
  root.style.colorScheme = resolvedTheme
  root.classList.toggle("dark", resolvedTheme === "dark")
}

function readStoredThemeAssignments(): PrimitiveThemeAssignments {
  if (typeof window === "undefined") {
    return defaultAssignments
  }

  const saved =
    readStorageValue(assignmentStorageKey) ??
    readCookieValue(assignmentStorageKey) ??
    readWindowNameValue(assignmentStorageKey)

  const cacheKey = saved ?? "__default__"
  if (cacheKey === cachedAssignmentsKey) {
    return cachedAssignments
  }

  cachedAssignmentsKey = cacheKey
  cachedAssignments = normalizeAssignments(parseAssignments(saved))
  return cachedAssignments
}

function parseAssignments(value: string | null): unknown {
  if (!value) {
    return null
  }

  try {
    return JSON.parse(value) as unknown
  } catch {
    return null
  }
}

function normalizeAssignments(value: unknown): PrimitiveThemeAssignments {
  if (!value || typeof value !== "object") {
    return defaultAssignments
  }

  const record = value as Record<string, unknown>
  const light = isThemePresetId(record.light) && getThemePresetTone(record.light) === "light"
    ? record.light
    : defaultTonePreset.light
  const dark = isThemePresetId(record.dark) && getThemePresetTone(record.dark) === "dark"
    ? record.dark
    : defaultTonePreset.dark
  const system = record.system === "auto" || isThemePresetId(record.system) ? record.system : defaultAssignments.system

  return { system, light, dark }
}

function readStorageValue(key: string): string | null {
  try {
    const saved = window.sessionStorage.getItem(key)
    if (saved) {
      return saved
    }
  } catch {}

  try {
    const saved = window.localStorage.getItem(key)
    if (saved) {
      return saved
    }
  } catch {}

  return null
}

function getAssignedPresetId(
  choice: PrimitiveThemeChoice,
  prefersLight: boolean,
  assignments: PrimitiveThemeAssignments,
): ThemePresetId {
  if (choice === "system" && assignments.system !== "auto") {
    return assignments.system
  }

  return assignments[resolveTheme(choice, prefersLight)]
}

function syncPreset(presetId: ThemePresetId) {
  writeProfile(getStyleProfileForThemePreset(presetId), true)

  const currentPreset = readStoredThemePresetId()
  if (currentPreset === presetId) {
    return
  }

  try {
    window.localStorage.setItem(THEME_PRESET_STORAGE_KEY, presetId)
  } catch {}

  try {
    window.sessionStorage.setItem(THEME_PRESET_STORAGE_KEY, presetId)
  } catch {}

  writeCookieValue(THEME_PRESET_STORAGE_KEY, presetId)
  writeWindowNameValue(THEME_PRESET_STORAGE_KEY, presetId)
  window.dispatchEvent(
    new CustomEvent<ThemePresetChangeDetail>(THEME_PRESET_CHANGE_EVENT, {
      detail: { presetId },
    }),
  )
}

function saveAssignments(assignments: PrimitiveThemeAssignments) {
  const serialized = JSON.stringify(assignments)

  try {
    window.localStorage.setItem(assignmentStorageKey, serialized)
  } catch {}

  try {
    window.sessionStorage.setItem(assignmentStorageKey, serialized)
  } catch {}

  writeCookieValue(assignmentStorageKey, serialized)
  writeWindowNameValue(assignmentStorageKey, serialized)
  window.dispatchEvent(new Event(assignmentChangeEvent))
}

function setAssignedPreset(
  slot: keyof PrimitiveThemeAssignments,
  value: SystemThemeAssignment,
  current: PrimitiveThemeAssignments,
) {
  if (slot !== "system" && (!isThemePresetId(value) || getThemePresetTone(value) !== slot)) {
    return
  }

  if (slot === "system" && value !== "auto" && !isThemePresetId(value)) {
    return
  }

  saveAssignments({ ...current, [slot]: value })
}

function restoreDocumentTheme() {
  const root = document.documentElement
  const previousDark = root.dataset.primitivePreviousDark

  if (previousDark === "1") {
    root.classList.add("dark")
  } else if (previousDark === "0") {
    root.classList.remove("dark")
  }

  delete root.dataset.primitiveTheme
  delete root.dataset.primitiveThemeChoice
  delete root.dataset.primitivePreviousDark
  root.style.colorScheme = ""
}

function retainDocumentThemeScope() {
  if (typeof window === "undefined") {
    return () => undefined
  }

  const state = window as unknown as Window & Record<string, unknown>
  if (documentThemeRestoreTimer !== null) {
    window.clearTimeout(documentThemeRestoreTimer)
    documentThemeRestoreTimer = null
  }

  const currentCount = typeof state[documentThemeScopeKey] === "number" ? state[documentThemeScopeKey] : 0
  state[documentThemeScopeKey] = currentCount + 1

  return () => {
    const nextCount = Math.max(
      0,
      (typeof state[documentThemeScopeKey] === "number" ? state[documentThemeScopeKey] : 1) - 1,
    )
    state[documentThemeScopeKey] = nextCount

    if (documentThemeRestoreTimer !== null) {
      window.clearTimeout(documentThemeRestoreTimer)
    }

    documentThemeRestoreTimer = window.setTimeout(() => {
      documentThemeRestoreTimer = null
      if (state[documentThemeScopeKey] === 0) {
        restoreDocumentTheme()
      }
    }, 800)
  }
}

function readStoredTheme(): PrimitiveThemeChoice {
  if (typeof window === "undefined") {
    return defaultThemeChoice
  }

  try {
    const savedChoice = window.sessionStorage.getItem(storageKey)
    if (isThemeChoice(savedChoice)) {
      return savedChoice
    }
  } catch {
    // Continue to persistent fallbacks.
  }

  try {
    const savedChoice = window.localStorage.getItem(storageKey)
    if (isThemeChoice(savedChoice)) {
      return savedChoice
    }
  } catch {
    // Cookie fallback keeps theme mode stable when storage is disabled.
  }

  const savedCookieChoice = readCookieValue(storageKey)
  if (isThemeChoice(savedCookieChoice)) {
    return savedCookieChoice
  }

  const savedWindowChoice = readWindowNameValue(storageKey)
  return isThemeChoice(savedWindowChoice) ? savedWindowChoice : fallbackThemeChoice
}

function subscribeTheme(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === assignmentStorageKey) {
      listener()
    }
  }

  window.addEventListener("storage", handleStorage)
  window.addEventListener(themeChangeEvent, listener)
  window.addEventListener(assignmentChangeEvent, listener)

  return () => {
    window.removeEventListener("storage", handleStorage)
    window.removeEventListener(themeChangeEvent, listener)
    window.removeEventListener(assignmentChangeEvent, listener)
  }
}

function saveTheme(choice: PrimitiveThemeChoice) {
  fallbackThemeChoice = choice

  try {
    window.localStorage.setItem(storageKey, choice)
  } catch {
    // Theme persistence is optional; the in-memory control still works.
  }

  try {
    window.sessionStorage.setItem(storageKey, choice)
  } catch {}

  writeCookieValue(storageKey, choice)
  writeWindowNameValue(storageKey, choice)
  window.dispatchEvent(new Event(themeChangeEvent))
}

function readPrefersLight() {
  if (typeof window === "undefined") {
    return false
  }

  return window.matchMedia("(prefers-color-scheme: light)").matches
}

function subscribeColorScheme(listener: () => void) {
  if (typeof window === "undefined") {
    return () => undefined
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)")
  mediaQuery.addEventListener("change", listener)

  return () => {
    mediaQuery.removeEventListener("change", listener)
  }
}

function readCookieValue(name: string): string | null {
  if (typeof document === "undefined") {
    return null
  }

  const prefix = `${encodeURIComponent(name)}=`
  const match = document.cookie
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(prefix))

  return match ? decodeURIComponent(match.slice(prefix.length)) : null
}

function writeCookieValue(name: string, value: string): void {
  if (typeof document === "undefined") {
    return
  }

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${storageCookieMaxAge}; SameSite=Lax`
}

function readWindowNameValue(name: string): string | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const parsed = JSON.parse(window.name || "{}") as unknown
    if (!parsed || typeof parsed !== "object") {
      return null
    }

    const primitiveState = (parsed as Record<string, unknown>)[windowNameStateKey]
    if (!primitiveState || typeof primitiveState !== "object") {
      return null
    }

    const value = (primitiveState as Record<string, unknown>)[name]
    return typeof value === "string" ? value : null
  } catch {
    return null
  }
}

function writeWindowNameValue(name: string, value: string): void {
  if (typeof window === "undefined") {
    return
  }

  try {
    const parsed = JSON.parse(window.name || "{}") as unknown
    const rootState = parsed && typeof parsed === "object" ? (parsed as Record<string, unknown>) : {}
    const primitiveState =
      rootState[windowNameStateKey] && typeof rootState[windowNameStateKey] === "object"
        ? (rootState[windowNameStateKey] as Record<string, string>)
        : {}

    primitiveState[name] = value
    rootState[windowNameStateKey] = primitiveState
    window.name = JSON.stringify(rootState)
  } catch {
    window.name = JSON.stringify({ [windowNameStateKey]: { [name]: value } })
  }
}

export function PrimitiveThemeToggle() {
  const choice = useSyncExternalStore(
    subscribeTheme,
    readStoredTheme,
    (): PrimitiveThemeChoice => defaultThemeChoice,
  )
  const assignments = useSyncExternalStore(
    subscribeTheme,
    readStoredThemeAssignments,
    (): PrimitiveThemeAssignments => defaultAssignments,
  )
  const prefersLight = useSyncExternalStore(subscribeColorScheme, readPrefersLight, () => false)
  const activeThemeLabel = themeOptions.find((option) => option.value === choice)?.label ?? "System"
  const assignedPresetId = getAssignedPresetId(choice, prefersLight, assignments)
  const resolvedTheme = getThemePresetTone(assignedPresetId)
  const resolvedThemeLabel = resolvedTheme === "light" ? "Light" : "Dark"
  const assignedPresetLabel = getPreset(assignedPresetId).label
  const assignmentSlot = choice === "system" ? "system" : resolvedTheme
  const AssignmentIcon = assignmentSlot === "system" ? Monitor : assignmentSlot === "light" ? Sun : Moon
  const assignmentValue = assignmentSlot === "system" ? assignments.system : assignments[assignmentSlot]
  const assignmentOptions =
    assignmentSlot === "system"
      ? themePresets
      : themePresets.filter((preset) => getThemePresetTone(preset.id) === assignmentSlot)

  useEffect(retainDocumentThemeScope, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: light)")

    const applyTheme = () => {
      const assignedPresetId = getAssignedPresetId(choice, mediaQuery.matches, assignments)
      const resolvedTheme = getThemePresetTone(assignedPresetId)
      applyDocumentTheme(choice, resolvedTheme)
      syncPreset(assignedPresetId)
    }

    applyTheme()

    if (choice !== "system") {
      return undefined
    }

    mediaQuery.addEventListener("change", applyTheme)
    return () => {
      mediaQuery.removeEventListener("change", applyTheme)
    }
  }, [assignments, choice])

  return (
    <div className={styles.themePanel} aria-label="Primitive theme">
      <div className={styles.themePanelHeader}>
        <span>Theme</span>
        <strong>{choice === "system" ? `System / ${resolvedThemeLabel}` : activeThemeLabel}</strong>
      </div>
      <div className={styles.themeSwitcher} role="group" aria-label="Primitive color theme">
        {themeOptions.map(({ value, label, Icon }) => (
          <button
            key={value}
            type="button"
            className={`${styles.themeOption} ${choice === value ? styles.themeOptionActive : ""}`}
            aria-label={
              value === "system"
                ? `Use system primitive theme, currently ${resolvedThemeLabel.toLowerCase()}`
                : `Use ${label.toLowerCase()} primitive theme`
            }
            aria-pressed={choice === value}
            title={
              value === "system"
                ? `System: ${assignedPresetLabel}`
                : `${label}: ${getPreset(assignments[value]).label}`
            }
            onClick={() => {
              saveTheme(value)
            }}
            data-theme-choice={value}
          >
            <Icon aria-hidden="true" />
            <span className={styles.themeOptionLabel}>{label}</span>
          </button>
        ))}
      </div>
      <div className={styles.themeAssignmentGrid} aria-label="Assigned theme preset">
        <label className={styles.themeAssignment}>
          <AssignmentIcon aria-hidden="true" />
          <select
            aria-label={`Theme assigned to ${assignmentSlot} switch`}
            value={assignmentValue}
            onChange={(event) => {
              if (assignmentSlot === "system") {
                setAssignedPreset("system", event.currentTarget.value as SystemThemeAssignment, assignments)
                return
              }

              setAssignedPreset(assignmentSlot, event.currentTarget.value as ThemePresetId, assignments)
            }}
          >
            {assignmentSlot === "system" ? <option value="auto">Auto</option> : null}
            {assignmentOptions.map((preset) => (
              <option key={preset.id} value={preset.id}>
                {preset.label}
              </option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}
