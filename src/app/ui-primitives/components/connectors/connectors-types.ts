/* Shared types for the connectors primitive family. */

import type { StatusTone } from "../status-page/status-types"

export type ConnectorStatus =
  | "connected"
  | "warning"
  | "error"
  | "disconnected"
  | "pending"
  | "syncing"

export type ConnectorCategory =
  | "social"
  | "payments"
  | "accounting"
  | "communications"
  | "commerce"
  | "ai"
  | "infrastructure"
  | "email"
  | "calendar"

export type OAuthProviderId =
  | "google"
  | "meta"
  | "tiktok"
  | "x"
  | "linkedin"
  | "stripe"
  | "xero"
  | "shopify"
  | "twilio"

export type ApiKeyProviderId =
  | "replicate"
  | "openai"
  | "anthropic"
  | "mailgun"
  | "resend"
  | "cloudflare"
  | "hostinger"

export type WebhookEventTone = "delivered" | "failed" | "retrying" | "skipped"

export type SyncCadence =
  | "realtime"
  | "5min"
  | "15min"
  | "hourly"
  | "daily"
  | "weekly"
  | "manual"

export type ConnectorAuditAction =
  | "connect"
  | "disconnect"
  | "rotate"
  | "sync"
  | "scope-change"
  | "key-reveal"
  | "webhook-replay"

export const CONNECTOR_STATUS_LABEL: Record<ConnectorStatus, string> = {
  connected: "Connected",
  warning: "Warning",
  error: "Error",
  disconnected: "Disconnected",
  pending: "Pending",
  syncing: "Syncing",
}

export const CONNECTOR_STATUS_TONE: Record<ConnectorStatus, StatusTone> = {
  connected: "green",
  warning: "amber",
  error: "red",
  disconnected: "neutral",
  pending: "violet",
  syncing: "teal",
}

export const WEBHOOK_EVENT_TONE: Record<WebhookEventTone, StatusTone> = {
  delivered: "green",
  failed: "red",
  retrying: "amber",
  skipped: "neutral",
}

export const SYNC_CADENCE_LABEL: Record<SyncCadence, string> = {
  realtime: "Realtime",
  "5min": "Every 5 minutes",
  "15min": "Every 15 minutes",
  hourly: "Hourly",
  daily: "Daily",
  weekly: "Weekly",
  manual: "Manual",
}

export const CONNECTOR_CATEGORY_LABEL: Record<ConnectorCategory, string> = {
  social: "Social",
  payments: "Payments",
  accounting: "Accounting",
  communications: "Comms",
  commerce: "Commerce",
  ai: "AI",
  infrastructure: "Infra",
  email: "Email",
  calendar: "Calendar",
}

export const CONNECTOR_AUDIT_ACTION_LABEL: Record<ConnectorAuditAction, string> = {
  connect: "Connected",
  disconnect: "Disconnected",
  rotate: "Rotated",
  sync: "Synced",
  "scope-change": "Scopes updated",
  "key-reveal": "Key revealed",
  "webhook-replay": "Webhook replayed",
}

export const CONNECTOR_AUDIT_ACTION_TONE: Record<ConnectorAuditAction, StatusTone> = {
  connect: "green",
  disconnect: "neutral",
  rotate: "violet",
  sync: "teal",
  "scope-change": "amber",
  "key-reveal": "amber",
  "webhook-replay": "teal",
}

/** Mask a secret value, keeping the last `keep` characters visible. */
export function maskSecret(value: string, keep = 4): string {
  if (value.length <= keep) {
    return "*".repeat(Math.max(8, value.length))
  }
  const visible = value.slice(-keep)
  const hidden = Math.max(8, value.length - keep)
  return `${"*".repeat(hidden)}${visible}`
}
