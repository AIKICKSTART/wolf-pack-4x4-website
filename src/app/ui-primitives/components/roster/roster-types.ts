/**
 * Shared types for the technician roster + shifts + certifications primitives.
 * Pure type module — no runtime imports.
 */

export type ShiftStatus =
  | "on-shift"
  | "on-break"
  | "off-shift"
  | "annual-leave"
  | "sick-leave"
  | "training"

export type LeaveType =
  | "annual"
  | "sick"
  | "long-service"
  | "rdo"
  | "carer"

export type CertificationLevel =
  | "novice"
  | "competent"
  | "proficient"
  | "master"

export type BayId = "bay-1" | "bay-2" | "bay-3" | "bay-4"

export interface TechnicianRef {
  id: string
  name: string
  /** Role description like "Apprentice Y3" or "Workshop Manager". */
  role: string
  avatarSrc?: string
}

export const SHIFT_STATUS_LABEL: Record<ShiftStatus, string> = {
  "on-shift": "On shift",
  "on-break": "On break",
  "off-shift": "Off shift",
  "annual-leave": "Annual leave",
  "sick-leave": "Sick leave",
  training: "Training",
}

export const LEAVE_TYPE_LABEL: Record<LeaveType, string> = {
  annual: "Annual",
  sick: "Sick",
  "long-service": "Long-service",
  rdo: "RDO",
  carer: "Carer",
}

export const CERTIFICATION_LEVEL_LABEL: Record<CertificationLevel, string> = {
  novice: "Novice",
  competent: "Competent",
  proficient: "Proficient",
  master: "Master",
}

export const BAY_LABEL: Record<BayId, string> = {
  "bay-1": "Bay 1",
  "bay-2": "Bay 2",
  "bay-3": "Bay 3",
  "bay-4": "Bay 4",
}
