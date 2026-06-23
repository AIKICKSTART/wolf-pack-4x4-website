/* Shared types for the observability cockpit primitive system. */

import type { StatusTone } from "../status-page/status-types"

export type Severity = "info" | "warn" | "error" | "critical"

export type LogSeverity = "debug" | "info" | "warn" | "error" | "fatal"

export type SpanKind = "server" | "client" | "internal" | "producer" | "consumer"

export type AnomalyKind = "spike" | "dip" | "flat" | "drift"

export type SyntheticOutcome = "pass" | "fail" | "timeout" | "degraded"

export type IncidentImpact = "none" | "minor" | "major" | "outage"

export type AlertRuleState = "ok" | "pending" | "alerting" | "no-data"

export type CorrelationStrength =
  | "very-negative"
  | "negative"
  | "weak-negative"
  | "neutral"
  | "weak-positive"
  | "positive"
  | "very-positive"

export type ServiceId =
  | "quotes-api"
  | "parts-catalogue"
  | "workshop-scheduler"
  | "quote-pdf"
  | "edge"
  | "customer-sms"
  | "payment-gateway"

export const SEVERITY_LABEL: Record<Severity, string> = {
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  critical: "CRITICAL",
}

export const SEVERITY_TONE: Record<Severity, StatusTone> = {
  info: "teal",
  warn: "amber",
  error: "red",
  critical: "red",
}

export const LOG_SEVERITY_LABEL: Record<LogSeverity, string> = {
  debug: "DEBUG",
  info: "INFO",
  warn: "WARN",
  error: "ERROR",
  fatal: "FATAL",
}

export const LOG_SEVERITY_TONE: Record<LogSeverity, StatusTone> = {
  debug: "neutral",
  info: "teal",
  warn: "amber",
  error: "red",
  fatal: "red",
}

export const ALERT_RULE_STATE_LABEL: Record<AlertRuleState, string> = {
  ok: "OK",
  pending: "Pending",
  alerting: "Alerting",
  "no-data": "No data",
}

export const ALERT_RULE_STATE_TONE: Record<AlertRuleState, StatusTone> = {
  ok: "green",
  pending: "amber",
  alerting: "red",
  "no-data": "neutral",
}

export const ANOMALY_KIND_LABEL: Record<AnomalyKind, string> = {
  spike: "Spike",
  dip: "Dip",
  flat: "Flat-line",
  drift: "Drift",
}

export const ANOMALY_KIND_TONE: Record<AnomalyKind, StatusTone> = {
  spike: "red",
  dip: "amber",
  flat: "violet",
  drift: "teal",
}

export const SYNTHETIC_OUTCOME_LABEL: Record<SyntheticOutcome, string> = {
  pass: "Pass",
  fail: "Fail",
  timeout: "Timeout",
  degraded: "Degraded",
}

export const SYNTHETIC_OUTCOME_TONE: Record<SyntheticOutcome, StatusTone> = {
  pass: "green",
  fail: "red",
  timeout: "amber",
  degraded: "amber",
}

export const INCIDENT_IMPACT_LABEL: Record<IncidentImpact, string> = {
  none: "No impact",
  minor: "Minor",
  major: "Major",
  outage: "Outage",
}

export const INCIDENT_IMPACT_TONE: Record<IncidentImpact, StatusTone> = {
  none: "neutral",
  minor: "teal",
  major: "amber",
  outage: "red",
}

export const SERVICE_LABEL: Record<ServiceId, string> = {
  "quotes-api": "quotes-api",
  "parts-catalogue": "parts-catalogue",
  "workshop-scheduler": "workshop-scheduler",
  "quote-pdf": "quote-pdf",
  edge: "edge",
  "customer-sms": "customer-sms",
  "payment-gateway": "payment-gateway",
}
