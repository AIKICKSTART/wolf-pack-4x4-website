"use client"

/**
 * Field — the shared form-control DNA for the Oak Flats Mufflermen UI primitives.
 *
 * `Field` is the wrapper: it renders the label, optional hint, optional error,
 * and wires `htmlFor` / `id` / `aria-describedby` / `aria-invalid` down to the
 * control it wraps via context — so the control inherits a11y plumbing without
 * prop-drilling. `Input` and `Textarea` are the recessed, token-styled controls
 * (carbon-recessed well, teal focus ring, red error border) in sizes sm|md|lg.
 *
 * The error message replaces the hint and flips the control to its invalid state.
 *
 * @example
 * ```tsx
 * <Field label="Rego" hint="Plate as printed" required>
 *   <Input placeholder="ABC-123" />
 * </Field>
 *
 * <Field label="Notes" error="Tell us what the car is doing">
 *   <Textarea rows={4} />
 * </Field>
 *
 * // Standalone (no Field) — pass id/size directly:
 * <Input id="vin" size="lg" aria-label="VIN" />
 * ```
 */

import {
  createContext,
  forwardRef,
  useContext,
  useId,
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  type TextareaHTMLAttributes,
} from "react"

import styles from "./field.module.css"

export type FieldSize = "sm" | "md" | "lg"

interface FieldContextValue {
  controlId: string
  describedById?: string
  invalid: boolean
  required: boolean
}

const FieldContext = createContext<FieldContextValue | null>(null)

const SIZE_CLASS: Record<FieldSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

interface FieldProps {
  label: string
  children: ReactNode
  hint?: string
  error?: string
  required?: boolean
  htmlFor?: string
  className?: string
}

export function Field({
  label,
  children,
  hint,
  error,
  required = false,
  htmlFor,
  className,
}: FieldProps) {
  const generatedId = useId()
  const controlId = htmlFor ?? generatedId
  const invalid = Boolean(error)
  const message = error ?? hint
  const describedById = message ? `${controlId}-message` : undefined

  const classes = [styles.field, invalid && styles.fieldInvalid, className]
    .filter(Boolean)
    .join(" ")

  return (
    <FieldContext.Provider
      value={{ controlId, describedById, invalid, required }}
    >
      <div className={classes}>
        <label className={styles.label} htmlFor={controlId}>
          <span className={styles.labelText}>{label}</span>
          {required && (
            <span className={styles.required} aria-hidden="true">
              *
            </span>
          )}
        </label>

        {children}

        {message && (
          <p
            id={describedById}
            className={[styles.message, invalid && styles.error]
              .filter(Boolean)
              .join(" ")}
            role={invalid ? "alert" : undefined}
          >
            {message}
          </p>
        )}
      </div>
    </FieldContext.Provider>
  )
}

interface ControlSharedProps {
  size?: FieldSize
  invalid?: boolean
  className?: string
}

function useControlBinding(
  size: FieldSize,
  explicitInvalid: boolean | undefined,
  className: string | undefined,
  base: string,
) {
  const ctx = useContext(FieldContext)
  const invalid = explicitInvalid ?? ctx?.invalid ?? false

  const classes = [base, SIZE_CLASS[size], invalid && styles.controlInvalid, className]
    .filter(Boolean)
    .join(" ")

  return {
    id: ctx?.controlId,
    classes,
    invalid,
    describedById: ctx?.describedById,
    required: ctx?.required,
  }
}

export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size">,
    ControlSharedProps {}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { size = "md", invalid: invalidProp, className, id, required, "aria-describedby": ariaDescribedBy, ...rest },
  ref,
) {
  const binding = useControlBinding(size, invalidProp, className, styles.input)
  const describedBy = [ariaDescribedBy, binding.describedById].filter(Boolean).join(" ") || undefined

  return (
    <span className={styles.well} data-invalid={binding.invalid || undefined}>
      <input
        ref={ref}
        id={id ?? binding.id}
        className={binding.classes}
        aria-invalid={binding.invalid || undefined}
        aria-describedby={describedBy}
        required={required ?? binding.required}
        {...rest}
      />
    </span>
  )
})

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>,
    ControlSharedProps {}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { size = "md", invalid: invalidProp, className, id, required, "aria-describedby": ariaDescribedBy, style, ...rest },
    ref,
  ) {
    const binding = useControlBinding(size, invalidProp, className, styles.textarea)
    const describedBy = [ariaDescribedBy, binding.describedById].filter(Boolean).join(" ") || undefined

    return (
      <span className={styles.well} data-invalid={binding.invalid || undefined}>
        <textarea
          ref={ref}
          id={id ?? binding.id}
          className={binding.classes}
          aria-invalid={binding.invalid || undefined}
          aria-describedby={describedBy}
          required={required ?? binding.required}
          style={style as CSSProperties}
          {...rest}
        />
      </span>
    )
  },
)

export default Field
