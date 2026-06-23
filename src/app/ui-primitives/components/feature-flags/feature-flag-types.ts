/* Shared types for the feature-flags primitive system. */

export type FlagEnvironment = "dev" | "staging" | "prod"

export type FlagTone = "red" | "amber" | "teal" | "green" | "neutral"

export type FlagSubject =
  | "user"
  | "workspace"
  | "role"
  | "geo"
  | "device"

export type FlagOperator =
  | "is"
  | "is-not"
  | "in"
  | "starts-with"
  | "regex"

export type FlagStatusForEnv =
  | "on"
  | "off"
  | "ramping"
  | "killed"

export type RolloutSnap = 0 | 25 | 50 | 75 | 100

export const SUBJECT_LABEL: Record<FlagSubject, string> = {
  user: "User",
  workspace: "Workspace",
  role: "Role",
  geo: "Geo",
  device: "Device",
}

export const OPERATOR_LABEL: Record<FlagOperator, string> = {
  is: "is",
  "is-not": "is not",
  in: "in",
  "starts-with": "starts with",
  regex: "regex",
}

export const ENVIRONMENT_LABEL: Record<FlagEnvironment, string> = {
  dev: "Development",
  staging: "Staging",
  prod: "Production",
}

export const ENVIRONMENT_SHORT: Record<FlagEnvironment, string> = {
  dev: "DEV",
  staging: "STG",
  prod: "PRD",
}

export const ENVIRONMENT_TONE: Record<FlagEnvironment, FlagTone> = {
  dev: "teal",
  staging: "amber",
  prod: "red",
}

export const STATUS_TONE: Record<FlagStatusForEnv, FlagTone> = {
  on: "green",
  off: "neutral",
  ramping: "amber",
  killed: "red",
}

export const STATUS_LABEL: Record<FlagStatusForEnv, string> = {
  on: "On",
  off: "Off",
  ramping: "Ramping",
  killed: "Killed",
}
