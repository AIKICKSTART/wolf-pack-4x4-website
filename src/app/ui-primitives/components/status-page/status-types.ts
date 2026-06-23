/* Shared types for the status-page + observability primitive system. */

export type ServiceStatus =
  | "operational"
  | "degraded"
  | "partial-outage"
  | "major-outage"
  | "maintenance"

export type IncidentSeverity = "sev1" | "sev2" | "sev3" | "sev4"

export type IncidentStage =
  | "investigating"
  | "identified"
  | "monitoring"
  | "resolved"

export type RegionId =
  | "au-east-1"
  | "au-west-1"
  | "us-east-1"
  | "us-west-1"
  | "eu-central-1"
  | "apac-1"

export type StatusTone = "red" | "amber" | "teal" | "green" | "neutral" | "violet"

export type SyntheticCheckOutcome = "pass" | "fail" | "timeout"

export type MaintenancePhase = "scheduled" | "in-progress" | "completed"

export type AlertAckState = "firing" | "acknowledged" | "resolved"

export const SERVICE_STATUS_LABEL: Record<ServiceStatus, string> = {
  operational: "Operational",
  degraded: "Degraded performance",
  "partial-outage": "Partial outage",
  "major-outage": "Major outage",
  maintenance: "Maintenance",
}

export const SERVICE_STATUS_TONE: Record<ServiceStatus, StatusTone> = {
  operational: "green",
  degraded: "amber",
  "partial-outage": "amber",
  "major-outage": "red",
  maintenance: "teal",
}

export const INCIDENT_SEVERITY_LABEL: Record<IncidentSeverity, string> = {
  sev1: "SEV1",
  sev2: "SEV2",
  sev3: "SEV3",
  sev4: "SEV4",
}

export const INCIDENT_SEVERITY_TONE: Record<IncidentSeverity, StatusTone> = {
  sev1: "red",
  sev2: "amber",
  sev3: "teal",
  sev4: "neutral",
}

export const INCIDENT_STAGE_LABEL: Record<IncidentStage, string> = {
  investigating: "Investigating",
  identified: "Identified",
  monitoring: "Monitoring",
  resolved: "Resolved",
}

export const REGION_LABEL: Record<RegionId, string> = {
  "au-east-1": "AU-East-1 · Sydney",
  "au-west-1": "AU-West-1 · Perth",
  "us-east-1": "US-East-1 · N. Virginia",
  "us-west-1": "US-West-1 · Oregon",
  "eu-central-1": "EU-Central-1 · Frankfurt",
  "apac-1": "APAC-1 · Singapore",
}

export const REGION_SHORT: Record<RegionId, string> = {
  "au-east-1": "AU-EAST",
  "au-west-1": "AU-WEST",
  "us-east-1": "US-EAST",
  "us-west-1": "US-WEST",
  "eu-central-1": "EU-CENTRAL",
  "apac-1": "APAC",
}

export const MAINTENANCE_PHASE_LABEL: Record<MaintenancePhase, string> = {
  scheduled: "Scheduled",
  "in-progress": "In progress",
  completed: "Completed",
}

export const MAINTENANCE_PHASE_TONE: Record<MaintenancePhase, StatusTone> = {
  scheduled: "teal",
  "in-progress": "amber",
  completed: "neutral",
}

export const ALERT_ACK_LABEL: Record<AlertAckState, string> = {
  firing: "Firing",
  acknowledged: "Acknowledged",
  resolved: "Resolved",
}

export const ALERT_ACK_TONE: Record<AlertAckState, StatusTone> = {
  firing: "red",
  acknowledged: "amber",
  resolved: "green",
}

export const SYNTHETIC_OUTCOME_TONE: Record<SyntheticCheckOutcome, StatusTone> = {
  pass: "green",
  fail: "red",
  timeout: "amber",
}
