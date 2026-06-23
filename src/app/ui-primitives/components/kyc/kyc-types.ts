// Shared KYC/verification type definitions for primitives in this folder.
// Keep this file declaration-only — no runtime side effects.

export type KycStepId =
  | "identity"
  | "address"
  | "business"
  | "owners"
  | "tax"
  | "bank"

export type DocumentKind =
  | "drivers-licence"
  | "passport"
  | "medicare"
  | "proof-of-address"
  | "company-extract"
  | "trust-deed"

export type VerificationStatus =
  | "pending"
  | "under-review"
  | "approved"
  | "rejected"
  | "requires-additional-info"

export type RiskLevel = "low" | "medium" | "high" | "manual-review"

export type SanctionsStatus = "clear" | "hit" | "review"

export type BusinessStructure =
  | "sole-trader"
  | "pty-ltd"
  | "partnership"
  | "trust"

export type ResidencyCountry = "AU" | "NZ" | "US" | "UK" | "OTHER"

export interface ReviewerRef {
  id: string
  name: string
  team: string
}

export interface FileConstraint {
  /** Human readable constraint, e.g. "PDF/JPG/PNG, ≤ 10 MB". */
  label: string
}

export const STEP_LABEL: Record<KycStepId, string> = {
  identity: "Identity",
  address: "Address",
  business: "Business",
  owners: "Beneficial owners",
  tax: "Tax",
  bank: "Bank",
}

export const STATUS_LABEL: Record<VerificationStatus, string> = {
  pending: "Pending",
  "under-review": "Under review",
  approved: "Approved",
  rejected: "Rejected",
  "requires-additional-info": "Action required",
}

export const RISK_LABEL: Record<RiskLevel, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
  "manual-review": "Manual review",
}

export const BUSINESS_STRUCTURE_LABEL: Record<BusinessStructure, string> = {
  "sole-trader": "Sole trader",
  "pty-ltd": "Pty Ltd",
  partnership: "Partnership",
  trust: "Trust",
}

export const SANCTIONS_STATUS_LABEL: Record<SanctionsStatus, string> = {
  clear: "Clear",
  hit: "Hit",
  review: "Review",
}
