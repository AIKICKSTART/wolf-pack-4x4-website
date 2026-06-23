export { KpiTile } from "./kpi-tile"
export { QuickActionGrid } from "./quick-action-grid"
export { SystemStatusBanner } from "./system-status-banner"
export { ActivityFeedRow } from "./activity-feed-row"
export { CommandPalette } from "./command-palette"
export { PinnedBoard } from "./pinned-board"
export { RoleSwitcher } from "./role-switcher"
export { TenantSwitcher } from "./tenant-switcher"
export { WeeklyBriefingCard } from "./weekly-briefing-card"
export { TeamPulseStrip } from "./team-pulse-strip"
export { QuickGlanceRow } from "./quick-glance-row"
export { SystemTourLauncher } from "./system-tour-launcher"
export { FeatureSpotlightCard } from "./feature-spotlight-card"
export { DailySummaryCard } from "./daily-summary-card"

export type {
  ActivityRow,
  ActivitySurface,
  ActivityVerb,
  AdminRole,
  AdminTone,
  AdminTour,
  AdminUser,
  BriefingItem,
  BriefingItemKind,
  CommandPaletteEntry,
  CommandPaletteSuggestion,
  DailySummary,
  DailySummaryItem,
  FeatureSpotlight,
  GlanceMetric,
  KpiDelta,
  KpiPeriod,
  KpiTileData,
  PinnedWidget,
  PinnedWidgetKind,
  QuickActionItem,
  RoleId,
  SystemHealth,
  SystemStatusEntry,
  TeamPresence,
  TeamPulseMember,
  Tenant,
  TourStep,
  WeeklyBriefing,
} from "./admin-hub-types"

export {
  ACTIVITY_SURFACE_LABEL,
  ACTIVITY_VERB_LABEL,
  BRIEFING_KIND_LABEL,
  BRIEFING_KIND_TONE,
  COMMAND_GROUP_LABEL,
  KPI_PERIOD_LABEL,
  PRESENCE_LABEL,
  PRESENCE_TONE,
  ROLE_LABEL,
  SYSTEM_HEALTH_LABEL,
  SYSTEM_HEALTH_TONE,
  adminToneToAvatar,
  adminToneToChip,
  adminToneToRadial,
  adminToneToSpark,
  adminToneToVar,
  presenceToAvatarStatus,
} from "./admin-hub-types"
