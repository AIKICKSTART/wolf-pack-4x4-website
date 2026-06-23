import type { StyleProfileId } from "./profile-types"
import { DEFAULT_PROFILE_ID, resolveProfile } from "./profiles"

/**
 * A tiny external store for the persisted style-profile selection, designed for
 * `useSyncExternalStore`. Reading client-only state (localStorage) through an
 * external store keeps the provider effect-free and SSR-safe: the server
 * snapshot is the default profile, the client snapshot is the persisted choice,
 * and `cross-tab` `storage` events keep multiple tabs in sync.
 */

export const STYLE_PROFILE_STORAGE_KEY = "mufflermen.style-profile"
export const STYLE_PROFILE_CHANGE_EVENT = "mufflermen.style-profile-change"

const WINDOW_NAME_STATE_KEY = "__ofmPrimitiveThemeState"
const STORAGE_COOKIE_MAX_AGE = 60 * 60 * 24 * 365

type Listener = () => void

const listeners = new Set<Listener>()

/** Last value handed out, so `getSnapshot` stays referentially stable. */
let cachedId: StyleProfileId = DEFAULT_PROFILE_ID
let cacheReady = false

function readStored(): StyleProfileId {
  if (typeof window === "undefined") return DEFAULT_PROFILE_ID

  try {
    const raw = window.localStorage.getItem(STYLE_PROFILE_STORAGE_KEY)
    if (raw) return resolveProfile(raw).id
  } catch {}

  try {
    const raw = window.sessionStorage.getItem(STYLE_PROFILE_STORAGE_KEY)
    if (raw) return resolveProfile(raw).id
  } catch {}

  return resolveProfile(
    readCookieValue(STYLE_PROFILE_STORAGE_KEY) ?? readWindowNameValue(STYLE_PROFILE_STORAGE_KEY),
  ).id
}

function emit(): void {
  for (const listener of listeners) listener()
}

/** Subscribes to selection changes (this tab + cross-tab `storage` events). */
export function subscribeProfile(listener: Listener): () => void {
  listeners.add(listener)
  const onStorage = (event: StorageEvent): void => {
    if (event.key === STYLE_PROFILE_STORAGE_KEY) {
      cacheReady = false
      emit()
    }
  }
  const onProfileChange = (): void => {
    cacheReady = false
    emit()
  }
  if (typeof window !== "undefined") {
    window.addEventListener("storage", onStorage)
    window.addEventListener(STYLE_PROFILE_CHANGE_EVENT, onProfileChange)
  }
  return () => {
    listeners.delete(listener)
    if (typeof window !== "undefined") {
      window.removeEventListener("storage", onStorage)
      window.removeEventListener(STYLE_PROFILE_CHANGE_EVENT, onProfileChange)
    }
  }
}

/** Client snapshot — the persisted selection, cached for referential stability. */
export function getProfileSnapshot(): StyleProfileId {
  if (!cacheReady) {
    cachedId = readStored()
    cacheReady = true
  }
  return cachedId
}

/** Server snapshot — always the default so SSR markup is deterministic. */
export function getProfileServerSnapshot(): StyleProfileId {
  return DEFAULT_PROFILE_ID
}

/** Persists a new selection and notifies subscribers in this tab. */
export function writeProfile(id: StyleProfileId, enabled: boolean): void {
  const next = resolveProfile(id).id
  cachedId = next
  cacheReady = true
  if (enabled && typeof window !== "undefined") {
    try {
      window.localStorage.setItem(STYLE_PROFILE_STORAGE_KEY, next)
    } catch {}
    try {
      window.sessionStorage.setItem(STYLE_PROFILE_STORAGE_KEY, next)
    } catch {}
    writeCookieValue(STYLE_PROFILE_STORAGE_KEY, next)
    writeWindowNameValue(STYLE_PROFILE_STORAGE_KEY, next)
    window.dispatchEvent(new CustomEvent(STYLE_PROFILE_CHANGE_EVENT, { detail: { profileId: next } }))
  }
  emit()
}

export function readStoredStyleProfileId(fallback: StyleProfileId = DEFAULT_PROFILE_ID): StyleProfileId {
  const profileId = readStored()
  return profileId ?? fallback
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

  document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; path=/; max-age=${STORAGE_COOKIE_MAX_AGE}; SameSite=Lax`
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

    const primitiveState = (parsed as Record<string, unknown>)[WINDOW_NAME_STATE_KEY]
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
      rootState[WINDOW_NAME_STATE_KEY] && typeof rootState[WINDOW_NAME_STATE_KEY] === "object"
        ? (rootState[WINDOW_NAME_STATE_KEY] as Record<string, string>)
        : {}

    primitiveState[name] = value
    rootState[WINDOW_NAME_STATE_KEY] = primitiveState
    window.name = JSON.stringify(rootState)
  } catch {
    window.name = JSON.stringify({ [WINDOW_NAME_STATE_KEY]: { [name]: value } })
  }
}
