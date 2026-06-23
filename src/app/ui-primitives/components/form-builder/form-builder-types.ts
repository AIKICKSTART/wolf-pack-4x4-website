/** Shared types for the visual form builder primitives. */

export type FormFieldType =
  | "short-text"
  | "long-text"
  | "email"
  | "phone"
  | "number"
  | "currency"
  | "date"
  | "dropdown"
  | "multi-select"
  | "rating"
  | "file-upload"
  | "signature"
  | "address"
  | "payment"
  | "yes-no"

export type FormFieldTone =
  | "red"
  | "amber"
  | "teal"
  | "green"
  | "violet"
  | "neutral"

export type LogicOperator =
  | "equals"
  | "not-equals"
  | "contains"
  | "greater-than"
  | "less-than"
  | "is-empty"
  | "is-not-empty"

export type LogicAction = "show" | "hide" | "skip" | "require"

export type EmbedMode = "inline" | "popup" | "slider" | "fullscreen"

export type FormTheme = "minimal" | "workshop-dark" | "editorial-light" | "brutalist"

export type ValidationRuleKind =
  | "required"
  | "regex"
  | "min-length"
  | "max-length"
  | "min-value"
  | "max-value"
  | "file-size"
  | "file-type"
  | "email-format"
  | "phone-format"

export interface ValidationRule {
  id: string
  kind: ValidationRuleKind
  label: string
  /** Display value e.g. "2 MB", "^[A-Z]" — visual reference only. */
  hint?: string
  enabled: boolean
}

export interface LogicRule {
  id: string
  sourceField: string
  operator: LogicOperator
  value: string
  action: LogicAction
  targetField: string
}

export interface FormBuilderField {
  id: string
  type: FormFieldType
  label: string
  placeholder?: string
  required?: boolean
  /** Default value displayed in the inspector — adapts shape by type. */
  defaultValue?: string
  /** Visual chips / options for dropdown / multi-select / rating / yes-no etc. */
  options?: ReadonlyArray<string>
  help?: string
}

export interface FormBuilderPage {
  id: string
  title: string
  fieldCount: number
}

export interface FormThemePreset {
  id: FormTheme
  name: string
  description: string
  /** Foreground swatch for the mini preview tile. */
  ink: string
  /** Background swatch for the mini preview tile. */
  paper: string
  /** Accent swatch for the mini preview tile. */
  accent: string
}

export interface SubmissionDropOff {
  /** Field id or label as displayed on the axis. */
  field: string
  /** Percentage 0-100 of respondents who completed this field. */
  completion: number
}
