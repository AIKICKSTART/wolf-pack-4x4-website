/**
 * Props schema + editable-field descriptors for a block.
 *
 * A block's component takes typed props. `propsSchema` describes the *shape* of
 * those props for validation and editor UI generation; `editableFields` is the
 * curated subset the CMS surfaces to a non-technical owner, with editor hints.
 *
 * This is a lightweight descriptor format — not a full JSON-Schema engine — so
 * the model stays dependency-free. Validation is structural and runs against
 * untrusted (deserialised / form) input.
 */

/** Primitive value kinds a prop can hold. */
export type PropValueType =
  | "string"
  | "number"
  | "boolean"
  | "enum"
  | "color-token"
  | "richtext"
  | "url"
  | "image"
  | "icon"
  | "json"
  | "array"
  | "object"

/** A serialisable prop value. */
export type PropValue =
  | string
  | number
  | boolean
  | null
  | readonly PropValue[]
  | { readonly [key: string]: PropValue }

/** A bag of props keyed by name. */
export type PropsRecord = Readonly<Record<string, PropValue>>

/** One field in a block's props schema. */
export interface PropSchemaField {
  /** Prop name as the component expects it. */
  key: string
  type: PropValueType
  /** Whether the prop must be present for the block to render. */
  required: boolean
  /** Allowed values when `type === "enum"`. */
  options?: readonly string[]
  /** Inclusive numeric bounds when `type === "number"`. */
  min?: number
  max?: number
  /** Element schema when `type === "array"`. */
  items?: PropSchemaField
  /** Nested fields when `type === "object"`. */
  fields?: readonly PropSchemaField[]
  /** One-line author-facing description. */
  description?: string
}

/** A block's full props schema. */
export interface PropsSchema {
  fields: readonly PropSchemaField[]
}

/** UI control used to edit a field in the CMS. */
export type EditorControl =
  | "text"
  | "textarea"
  | "richtext"
  | "number"
  | "toggle"
  | "select"
  | "color-token"
  | "image-picker"
  | "icon-picker"
  | "url"
  | "repeater"
  | "group"

/**
 * A field exposed to the owner in the visual editor. Points at a path within
 * the block's props (dot/bracket notation for nested) and carries the control
 * hint + label the editor renders.
 */
export interface EditableField {
  /** Path into the props object, e.g. "cta.label" or "items[].title". */
  path: string
  label: string
  control: EditorControl
  /** Mirror of the schema type, for validation at edit time. */
  valueType: PropValueType
  options?: readonly string[]
  /** Help text shown beneath the control. */
  hint?: string
  /** Whether the owner may leave it blank. */
  optional?: boolean
}

/** Result of structural validation of a props bag against a schema. */
export interface PropsValidationResult {
  valid: boolean
  errors: readonly string[]
}

function validateField(field: PropSchemaField, value: PropValue | undefined, path: string): string[] {
  const errors: string[] = []
  if (value === undefined || value === null) {
    if (field.required) {
      errors.push(`${path}: required`)
    }
    return errors
  }

  switch (field.type) {
    case "string":
    case "richtext":
    case "url":
    case "image":
    case "icon":
    case "color-token":
      if (typeof value !== "string") {
        errors.push(`${path}: expected string`)
      }
      break
    case "number":
      if (typeof value !== "number") {
        errors.push(`${path}: expected number`)
      } else {
        if (field.min !== undefined && value < field.min) {
          errors.push(`${path}: below min ${field.min}`)
        }
        if (field.max !== undefined && value > field.max) {
          errors.push(`${path}: above max ${field.max}`)
        }
      }
      break
    case "boolean":
      if (typeof value !== "boolean") {
        errors.push(`${path}: expected boolean`)
      }
      break
    case "enum":
      if (typeof value !== "string" || !field.options?.includes(value)) {
        errors.push(`${path}: not one of ${field.options?.join(", ") ?? ""}`)
      }
      break
    case "array":
      if (!Array.isArray(value)) {
        errors.push(`${path}: expected array`)
      } else if (field.items) {
        value.forEach((item, i) => {
          errors.push(...validateField(field.items as PropSchemaField, item, `${path}[${i}]`))
        })
      }
      break
    case "object":
      if (typeof value !== "object" || Array.isArray(value)) {
        errors.push(`${path}: expected object`)
      } else if (field.fields) {
        const record = value as Record<string, PropValue>
        for (const sub of field.fields) {
          errors.push(...validateField(sub, record[sub.key], `${path}.${sub.key}`))
        }
      }
      break
    case "json":
      break
  }
  return errors
}

/** Structurally validate a props bag against a schema. Pure, no throwing. */
export function validateProps(schema: PropsSchema, props: PropsRecord): PropsValidationResult {
  const errors: string[] = []
  for (const field of schema.fields) {
    errors.push(...validateField(field, props[field.key], field.key))
  }
  return { valid: errors.length === 0, errors }
}
