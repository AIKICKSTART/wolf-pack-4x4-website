/** Shared types for the Mufflermen forms-platform primitives. */

import type { FormFieldType } from "../form-builder/form-builder-types"

export type FormsPlatformTone =
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "violet"
  | "neutral"

export type SubmissionStatus =
  | "new"
  | "reviewing"
  | "approved"
  | "rejected"
  | "spam"
  | "archived"

export type SpamDefence = "honeypot" | "turnstile" | "rate-limit" | "captcha-v3"

export type SpamDefenceState = "armed" | "disabled" | "warning"

export type ConditionalLogicAction =
  | "show"
  | "hide"
  | "require"
  | "skip-page"
  | "jump-to"

export type ConditionalLogicOperator =
  | "equals"
  | "not-equals"
  | "contains"
  | "is-empty"
  | "is-not-empty"
  | "greater-than"
  | "less-than"

export type WizardStepState = "complete" | "current" | "upcoming" | "skipped"

export type FileScanState = "queued" | "scanning" | "clean" | "infected"

export type NotificationChannel = "email" | "sms" | "slack" | "webhook"

export type NotificationTrigger =
  | "on-submit"
  | "on-payment"
  | "on-approval"
  | "on-rejection"
  | "on-file-uploaded"

export type ExportFormat = "csv" | "json" | "xls" | "pdf"

export type WebhookStatus = "delivered" | "retrying" | "failed" | "paused"

export type PublishMode = "inline-embed" | "popup" | "share-link" | "qr-code"

export type FunnelStage = "started" | "halfway" | "submitted" | "abandoned"

export interface FormBuilderPaletteItem {
  /** Stable id used as drag handle key. */
  id: string
  /** Inspector + canvas display label. */
  label: string
  /** Field type drives the icon swatch. */
  type: FormFieldType
  /** Optional muted hint. */
  hint?: string
}

export interface FormBuilderPaletteSection {
  id: string
  title: string
  items: ReadonlyArray<FormBuilderPaletteItem>
}

export interface FormBuilderCanvasField {
  id: string
  type: FormFieldType
  label: string
  required?: boolean
  /** Display-only value shown beneath the row. */
  helperText?: string
  /** Tone hint for the row outline. */
  tone?: FormsPlatformTone
}

export interface FieldConfigOption {
  id: string
  label: string
  value: string
}

export interface FieldConfigDraft {
  id: string
  label: string
  type: FormFieldType
  placeholder?: string
  helperText?: string
  defaultValue?: string
  required: boolean
  options?: ReadonlyArray<FieldConfigOption>
}

export interface SubmissionInboxEntry {
  id: string
  formName: string
  submitter: string
  submitterEmail?: string
  submittedAt: string
  status: SubmissionStatus
  /** Short preview of the first answer. */
  preview: string
  /** Optional currency amount when the form took payment. */
  amount?: string
  /** Whether the submission has unread audit notes. */
  unread?: boolean
}

export interface SpamShieldRule {
  id: string
  defence: SpamDefence
  label: string
  state: SpamDefenceState
  /** Rolling 24h block count. */
  blocked: number
  hint?: string
}

export interface PaymentFieldDraft {
  id: string
  label: string
  amountAud: number
  /** Tip-line label shown beneath the Stripe element. */
  tipLabel?: string
  /** Tip percentage chips. */
  tipPercents?: ReadonlyArray<number>
  /** Whether tipping is enabled in the embedded form. */
  tippingEnabled?: boolean
  /** Cardholder name field captured alongside the card. */
  captureCardholder?: boolean
  /** Display-only Stripe publishable key prefix e.g. "pk_live_…". */
  stripeKey?: string
}

export interface UploadedFileEntry {
  id: string
  name: string
  sizeLabel: string
  progress: number
  scanState: FileScanState
  /** Optional MIME-style label. */
  kind?: string
}

export interface ConditionalLogicCondition {
  id: string
  sourceField: string
  operator: ConditionalLogicOperator
  value: string
}

export interface ConditionalLogicRule {
  id: string
  /** Display title for the rule. */
  label: string
  conditions: ReadonlyArray<ConditionalLogicCondition>
  /** "All" or "Any" gate. */
  match: "all" | "any"
  action: ConditionalLogicAction
  targetField: string
  /** Whether the rule is currently armed. */
  enabled: boolean
}

export interface FormWizardStep {
  id: string
  index: number
  title: string
  state: WizardStepState
  /** 0-100 percent complete for the current step. */
  progress?: number
  /** Field count surfaced in the meta line. */
  fieldCount?: number
}

export interface SubmissionAnswerRow {
  id: string
  label: string
  value: string
  /** Optional secondary line e.g. file size, currency. */
  meta?: string
  /** Whether this answer was flagged in review. */
  flagged?: boolean
}

export interface SubmissionAuditEvent {
  id: string
  timestamp: string
  actor: string
  message: string
  tone?: FormsPlatformTone
}

export interface NotificationRule {
  id: string
  trigger: NotificationTrigger
  channel: NotificationChannel
  /** Recipient handle — email / number / Slack channel. */
  recipient: string
  /** Template / message hint. */
  templateLabel: string
  enabled: boolean
}

export interface DataExportPreset {
  id: string
  label: string
  format: ExportFormat
  /** Estimated row count for the current range. */
  rowsEstimate: number
}

export interface DataExportRange {
  /** ISO-style label e.g. "2026-05-01". */
  from: string
  to: string
  /** Short caption e.g. "Last 28 days". */
  caption?: string
}

export interface WebhookTrigger {
  id: string
  endpoint: string
  event: NotificationTrigger
  status: WebhookStatus
  /** Last delivery timestamp label. */
  lastDelivery: string
  /** Pretty-printed JSON sample. */
  samplePayload: string
  /** Most recent retry attempt count. */
  retries?: number
}

export interface FormPublishTarget {
  id: PublishMode
  label: string
  description: string
}

export interface FunnelStageDatum {
  stage: FunnelStage
  label: string
  count: number
  /** Percent of starters surviving to this stage. */
  retentionPct: number
}
