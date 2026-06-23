/**
 * Shared types for the pwa-shell primitive family.
 *
 * These primitives target the Mufflermen workshop crew app and the
 * customer-facing PWA. Australian English copy throughout.
 */

export type PwaPlatform = "ios" | "android"

export type PwaNetworkQuality = "offline" | "2g" | "3g" | "4g" | "5g" | "wifi"

export type PwaTone = "neutral" | "teal" | "amber" | "red" | "green"

export type PwaConnectivityState = "online" | "offline" | "syncing" | "degraded"

export type PwaBiometricKind = "touch" | "face" | "fingerprint"

export type PwaPermissionKind =
  | "camera"
  | "microphone"
  | "location"
  | "notifications"
  | "contacts"
  | "storage"

export type PwaPermissionStatus = "prompt" | "granted" | "denied"

export type PwaShortcutTone = "neutral" | "red" | "amber" | "teal"

export interface PwaSyncEntity {
  id: string
  label: string
  pending: number
  lastSyncedAt: string
}

export interface PwaShortcutAction {
  id: string
  label: string
  hint?: string
  icon?: import("react").ReactNode
  tone?: PwaShortcutTone
  href?: string
}

export interface PwaHomeTileMetric {
  label: string
  value: string
  trend?: "up" | "down" | "flat"
}

export interface PwaShareChannel {
  id: string
  label: string
  icon?: import("react").ReactNode
  recipient?: string
}

export interface PwaShareMedia {
  kind: "image" | "video" | "file"
  label: string
  size?: string
  thumbnail?: string
}
