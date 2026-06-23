/* Barrel — Compliance + governance + privacy primitives. */

export type {
  ComplianceFramework,
  ComplianceStatus,
  ComplianceTone,
  DsrRequestType,
  EncryptionAlgo,
  KeyManagementBacking,
  IncidentSeverity,
  LegalBasis,
} from "./compliance-types"
export {
  FRAMEWORK_LABEL,
  FRAMEWORK_SHORT,
  STATUS_LABEL,
  STATUS_TONE,
  DSR_LABEL,
  DSR_DESCRIPTION,
  ENCRYPTION_LABEL,
  KEY_MGMT_LABEL,
  SEVERITY_LABEL,
  SEVERITY_TONE,
  LEGAL_BASIS_LABEL,
} from "./compliance-types"

export { ComplianceDashboard } from "./compliance-dashboard"
export type {
  ComplianceDashboardProps,
  ComplianceDashboardSummary,
} from "./compliance-dashboard"

export { FrameworkStatusCard } from "./framework-status-card"
export type { FrameworkStatusCardProps } from "./framework-status-card"

export { DataProcessingRecord } from "./data-processing-record"
export type { DataProcessingRecordProps } from "./data-processing-record"

export { DpaViewer } from "./dpa-viewer"
export type { DpaViewerProps, DpaClauseSummary } from "./dpa-viewer"

export { SubprocessorList } from "./subprocessor-list"
export type {
  SubprocessorListProps,
  SubprocessorRow,
  SubprocessorLocation,
  DpiaStatus,
} from "./subprocessor-list"

export { ConsentManagementBanner } from "./consent-management-banner"
export type {
  ConsentManagementBannerProps,
  ConsentCategory,
  ConsentCategoryKey,
  ConsentState,
} from "./consent-management-banner"

export { DsrRequestForm } from "./dsr-request-form"
export type {
  DsrRequestFormProps,
  DsrScopeOption,
  DsrSubmission,
} from "./dsr-request-form"

export { RetentionScheduleEditor } from "./retention-schedule-editor"
export type {
  RetentionScheduleEditorProps,
  RetentionRule,
  DurationUnit,
  DisposalMethod,
} from "./retention-schedule-editor"

export { EncryptionStatusIndicator } from "./encryption-status-indicator"
export type { EncryptionStatusIndicatorProps } from "./encryption-status-indicator"

export { PentestResultsCard } from "./pentest-results-card"
export type {
  PentestResultsCardProps,
  PentestFindingsCount,
} from "./pentest-results-card"

export { VulnerabilityDisclosureCard } from "./vulnerability-disclosure-card"
export type { VulnerabilityDisclosureCardProps } from "./vulnerability-disclosure-card"

export { PolicyVersionDiff } from "./policy-version-diff"
export type {
  PolicyVersionDiffProps,
  PolicyDiffLine,
  DiffLineKind,
} from "./policy-version-diff"

export { SecurityPostureScore } from "./security-posture-score"
export type {
  SecurityPostureScoreProps,
  PostureFactor,
  PostureFactorTone,
} from "./security-posture-score"

export { IncidentDisclosureBanner } from "./incident-disclosure-banner"
export type {
  IncidentDisclosureBannerProps,
  IncidentTimelineStep,
  IncidentTimelineStatus,
} from "./incident-disclosure-banner"
