/**
 * Shared marketplace primitive types.
 *
 * Every plugin/extension primitive in this folder references these literal-union
 * types so that tone, status, and surface vocabulary is identical across the
 * card grid, sidebar, detail header, compatibility matrix, and install flow.
 */

export type InstallState =
  | "install"
  | "installing"
  | "installed"
  | "update-available"
  | "uninstall"

export type PluginCategory =
  | "crm"
  | "email"
  | "forms"
  | "analytics"
  | "marketing"
  | "payments"
  | "workflow"
  | "devtools"
  | "ai"
  | "telephony"
  | "compliance"
  | "productivity"

export type PricingTier = "free" | "pro" | "enterprise" | "pay-per-use"

export type PermissionScope =
  | "read-data"
  | "write-data"
  | "send-email"
  | "access-webhooks"
  | "run-on-schedule"

export type PermissionSensitivity = "low" | "medium" | "high"

export type CompatibilitySurface =
  | "site"
  | "mufflerpulse"
  | "hermes"
  | "api"
  | "cli"

export type CompatibilityCell = "supported" | "partial" | "unsupported"

export type MomentumDirection = "up" | "down" | "flat"

export const PLUGIN_CATEGORY_LABEL: Record<PluginCategory, string> = {
  crm: "CRM",
  email: "Email",
  forms: "Forms",
  analytics: "Analytics",
  marketing: "Marketing",
  payments: "Payments",
  workflow: "Workflow",
  devtools: "DevTools",
  ai: "AI",
  telephony: "Telephony",
  compliance: "Compliance",
  productivity: "Productivity",
}

export const PRICING_TIER_LABEL: Record<PricingTier, string> = {
  free: "Free",
  pro: "Pro",
  enterprise: "Enterprise",
  "pay-per-use": "Pay-per-use",
}

export const PERMISSION_LABEL: Record<PermissionScope, string> = {
  "read-data": "Read data",
  "write-data": "Write data",
  "send-email": "Send email",
  "access-webhooks": "Access webhooks",
  "run-on-schedule": "Run on schedule",
}

export const PERMISSION_SENSITIVITY: Record<PermissionScope, PermissionSensitivity> = {
  "read-data": "low",
  "write-data": "high",
  "send-email": "medium",
  "access-webhooks": "high",
  "run-on-schedule": "medium",
}

export const COMPATIBILITY_SURFACE_LABEL: Record<CompatibilitySurface, string> = {
  site: "mufflermen.com.au",
  mufflerpulse: "Mufflerpulse",
  hermes: "Hermes",
  api: "API",
  cli: "CLI",
}
