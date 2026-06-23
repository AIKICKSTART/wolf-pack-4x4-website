/* Connectors primitive family — OAuth, API keys, webhooks, rate limits, sync. */

export type {
  ConnectorStatus,
  ConnectorCategory,
  OAuthProviderId,
  ApiKeyProviderId,
  WebhookEventTone,
  SyncCadence,
  ConnectorAuditAction,
} from "./connectors-types"

export {
  CONNECTOR_STATUS_LABEL,
  CONNECTOR_STATUS_TONE,
  WEBHOOK_EVENT_TONE,
  SYNC_CADENCE_LABEL,
  CONNECTOR_CATEGORY_LABEL,
  CONNECTOR_AUDIT_ACTION_LABEL,
  CONNECTOR_AUDIT_ACTION_TONE,
  maskSecret,
} from "./connectors-types"

export { OAuthConnectCard } from "./oauth-connect-card"
export type { OAuthConnectCardProps } from "./oauth-connect-card"

export { ApiKeyVaultRow } from "./api-key-vault-row"
export type { ApiKeyVaultRowProps } from "./api-key-vault-row"

export { WebhookConfigCard } from "./webhook-config-card"
export type { WebhookConfigCardProps, WebhookEventOption } from "./webhook-config-card"

export { RateLimitGauge } from "./rate-limit-gauge"
export type { RateLimitGaugeProps } from "./rate-limit-gauge"

export { RetryPolicyCard } from "./retry-policy-card"
export type { RetryPolicyCardProps } from "./retry-policy-card"

export { IntegrationHealthTile } from "./integration-health-tile"
export type { IntegrationHealthTileProps } from "./integration-health-tile"

export { EventRelayTable } from "./event-relay-table"
export type { EventRelayTableProps, EventRelayEntry } from "./event-relay-table"

export { ScopePermissionGrid } from "./scope-permission-grid"
export type {
  ScopePermissionGridProps,
  ScopePermissionEntry,
  ScopePermissionLevel,
} from "./scope-permission-grid"

export { ProviderDirectoryCard } from "./provider-directory-card"
export type { ProviderDirectoryCardProps } from "./provider-directory-card"

export { DataMappingRow } from "./data-mapping-row"
export type { DataMappingRowProps, DataMappingTransform } from "./data-mapping-row"

export { SyncScheduleCard } from "./sync-schedule-card"
export type { SyncScheduleCardProps } from "./sync-schedule-card"

export { ConnectionTestResult } from "./connection-test-result"
export type { ConnectionTestResultProps, ConnectionTestStatus } from "./connection-test-result"

export { QuotaPurchaseCard } from "./quota-purchase-card"
export type { QuotaPurchaseCardProps, QuotaTier } from "./quota-purchase-card"

export { AuditTrailRow } from "./audit-trail-row"
export type { AuditTrailRowProps } from "./audit-trail-row"
