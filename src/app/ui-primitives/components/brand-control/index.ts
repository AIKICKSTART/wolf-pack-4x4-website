/**
 * Brand-control primitive family barrel.
 *
 * Fourteen reusable primitives + shared types + mock data. Reuses
 * surfaces / primitives / theming / branding / data-display / charts /
 * motion / icons rather than duplicating their internals.
 */

export type {
  AccessibilityCheckId,
  AccessibilityCheckResult,
  AssetKind,
  AuditAction,
  AuditLogEntry,
  BrandAsset,
  BrandAssetVariant,
  BrandGuidelineRule,
  BrandToken,
  BrandTokenCategory,
  BrandTokenHistoryEntry,
  ChannelInfo,
  ContrastResult,
  ContrastVerdict,
  DeployStage,
  DeployStatus,
  GuidelineSection,
  MotionDurationToken,
  MotionEasingToken,
  OklchColor,
  PaletteSwatch,
  PermissionId,
  PermissionLevel,
  ReleaseChannel,
  RoleId,
  RoleMatrixCell,
  TeamMember,
  ThemeDeployment,
  TypographyPairing,
  UmbrellaImpactNode,
  UsageCoverageDatum,
} from "./brand-control-types"

export { TokenEditor } from "./token-editor"
export type { TokenEditorProps } from "./token-editor"

export { PaletteBuilder } from "./palette-builder"
export { TypographyPairingCard } from "./typography-pairing"
export { MotionSystemPanel } from "./motion-system-panel"
export { AssetCdnTile } from "./asset-cdn-tile"
export { RoleMatrix } from "./role-matrix"
export { TeamRosterCard } from "./team-roster-card"
export { AuditLogRow } from "./audit-log-row"
export { ThemeDeployPanel } from "./theme-deploy-panel"
export { BrandGuidelineCard } from "./brand-guideline-card"
export { UmbrellaImpactGraph } from "./umbrella-impact-graph"
export { UsageCoverageStrip } from "./usage-coverage-strip"
export { AccessibilityGateCard } from "./accessibility-gate-card"
export { ReleaseChannelPill } from "./release-channel-pill"

export {
  MOCK_A11Y_CHECKS,
  MOCK_ASSETS,
  MOCK_AUDIT,
  MOCK_CHANNELS,
  MOCK_COVERAGE,
  MOCK_DEPLOY,
  MOCK_DURATIONS,
  MOCK_EASINGS,
  MOCK_GUIDELINES,
  MOCK_PALETTE,
  MOCK_ROLE_MATRIX,
  MOCK_TEAM,
  MOCK_TOKEN_HISTORY,
  MOCK_TOKENS,
  MOCK_TYPE_PAIRINGS,
  MOCK_UMBRELLA_NODES,
} from "./_mock-data"
