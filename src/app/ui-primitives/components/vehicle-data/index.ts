export {
  DTC_SEVERITY_LABEL,
  DTC_SEVERITY_TONE,
  DTC_SYSTEM_LABEL,
  TRANSMISSION_LABEL,
  DRIVE_LAYOUT_LABEL,
  FUEL_GRADE_LABEL,
  FUEL_GRADE_TONE,
  RECALL_STATUS_LABEL,
  RECALL_STATUS_TONE,
  FITMENT_STATUS_LABEL,
  FITMENT_STATUS_TONE,
  SERVICE_STATUS_LABEL,
  SERVICE_STATUS_TONE,
  MOD_LEGALITY_LABEL,
  MOD_LEGALITY_TONE,
  MOD_CATEGORY_LABEL,
  REGO_STATUS_LABEL,
  REGO_STATUS_TONE,
  daysBetween,
  formatAud,
  formatIsoDate,
  formatKm,
  formatShortIsoDate,
  padVin,
} from "./vehicle-data-types"
export type {
  DriveLayout,
  TransmissionType,
  FuelGrade,
  DtcSystem,
  DtcSeverity,
  RecallStatus,
  FitmentStatus,
  ServiceItemStatus,
  ModLegality,
  ModCategory,
  RegoStatus,
  ObdReadingKind,
  VehicleDataRef,
} from "./vehicle-data-types"

export { VinDecoderCard } from "./vin-decoder-card"
export type { VinDecodeResult } from "./vin-decoder-card"

export { ObdLiveReadout } from "./obd-live-readout"
export type { ObdLiveReadingFrame } from "./obd-live-readout"

export { FitmentValidator } from "./fitment-validator"
export type { FitmentEvaluation } from "./fitment-validator"

export { PartsCompatibilityMatrix } from "./parts-compatibility-matrix"
export type {
  CompatibilityVehicleColumn,
  CompatibilityPartRow,
} from "./parts-compatibility-matrix"

export { RecallLookupCard } from "./recall-lookup-card"
export type { RecallRecord } from "./recall-lookup-card"

export { ServiceIntervalTimeline } from "./service-interval-timeline"
export type { ServiceInterval } from "./service-interval-timeline"

export { TyreSpecPanel } from "./tyre-spec-panel"
export type { TyreAxleSpec } from "./tyre-spec-panel"

export { EngineBayDiagram } from "./engine-bay-diagram"
export type { EngineBayComponent } from "./engine-bay-diagram"

export { DiagnosticCodeRow } from "./diagnostic-code-row"

export { VinHistoryCard } from "./vin-history-card"
export type { VinHistoryEvent, VinHistoryFlag } from "./vin-history-card"

export { NswRegoLookup } from "./nsw-rego-lookup"

export { FuelGradeRow } from "./fuel-grade-row"
export type { FuelCompatibility } from "./fuel-grade-row"

export { TowCapacityTile } from "./tow-capacity-tile"

export { AftermarketModRow } from "./aftermarket-mod-row"
