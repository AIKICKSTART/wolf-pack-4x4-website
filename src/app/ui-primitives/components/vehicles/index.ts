export {
  VEHICLE_STATUS_LABEL,
  VEHICLE_STATUS_TONE,
  FUEL_LABEL,
  TYRE_LABEL,
  ECU_SEVERITY_LABEL,
  ECU_SEVERITY_TONE,
  INSURANCE_COVER_LABEL,
  ROADWORTHY_LABEL,
  daysUntil,
  formatOdometer,
  formatRego,
} from "./vehicles-types"
export type {
  VehicleStatus,
  VehicleStatusTone,
  FuelType,
  TyrePosition,
  EcuSeverity,
  InsuranceCoverType,
  RoadworthyStatus,
  AxleSide,
  VehicleRef,
} from "./vehicles-types"

export { VehicleCardFleet } from "./vehicle-card-fleet"
export { VinDecoderStrip } from "./vin-decoder-strip"
export type { VinDecoderFields } from "./vin-decoder-strip"
export { ServiceHistoryTimeline } from "./service-history-timeline"
export type { ServiceHistoryEntry, ServiceKind } from "./service-history-timeline"
export { MileageTracker } from "./mileage-tracker"
export { RegistrationExpiryChip } from "./registration-expiry-chip"
export { InsuranceCard } from "./insurance-card"
export { RoadworthyCertificateCard } from "./roadworthy-certificate-card"
export { FuelLogRow } from "./fuel-log-row"
export { TyreConditionDiagram } from "./tyre-condition-diagram"
export type { TyreReading } from "./tyre-condition-diagram"
export { BrakePadLifeMeter } from "./brake-pad-life-meter"
export type { BrakePadAxleReading } from "./brake-pad-life-meter"
export { TelematicsChip } from "./telematics-chip"
export type { TelematicsReading } from "./telematics-chip"
export { EcuDiagnosticCodeRow } from "./ecu-diagnostic-code-row"
export { RecallNotificationBanner } from "./recall-notification-banner"
export type { RecallSeverity } from "./recall-notification-banner"
export { FleetUtilizationGauge } from "./fleet-utilization-gauge"
export type { FleetBreakdown } from "./fleet-utilization-gauge"
