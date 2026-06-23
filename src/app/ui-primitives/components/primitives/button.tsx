"use client"

import { Loader2 } from "lucide-react"
import type { ButtonHTMLAttributes, ReactNode } from "react"

import styles from "./button.module.css"

/**
 * Button — the core action primitive of the Oak Flats Mufflermen system.
 *
 * Carbon & Red DNA: metallic-red primary, machined-black secondary, line-border
 * ghost, red danger, and field-bg subtle. Token-only styling gives automatic
 * light/dark parity. Press translates 1px; focus uses the shared focus ring.
 *
 * @example
 * <Button variant="primary" leadingIcon={<Wrench />}>Book a service</Button>
 * <Button variant="ghost" size="sm" trailingIcon={<ArrowRight />}>Details</Button>
 * <Button variant="danger" loading>Removing…</Button>
 * <Button variant="secondary" fullWidth>View all jobs</Button>
 *
 * @example
 * <IconButton variant="subtle" aria-label="Open menu" icon={<Menu />} />
 */

export type ButtonVariant = "primary" | "secondary" | "ghost" | "danger" | "subtle"
export type ButtonSize = "sm" | "md" | "lg"

const VARIANT_CLASS: Record<ButtonVariant, string> = {
  primary: styles.primary,
  secondary: styles.secondary,
  ghost: styles.ghost,
  danger: styles.danger,
  subtle: styles.subtle,
}

const SIZE_CLASS: Record<ButtonSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

interface ButtonOwnProps {
  variant?: ButtonVariant
  size?: ButtonSize
  leadingIcon?: ReactNode
  trailingIcon?: ReactNode
  loading?: boolean
  fullWidth?: boolean
  className?: string
}

export interface ButtonProps
  extends ButtonOwnProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className"> {
  children: ReactNode
}

export function Button({
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  loading = false,
  fullWidth = false,
  className,
  children,
  type = "button",
  disabled,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading
  const classes = [
    styles.root,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    fullWidth && styles.fullWidth,
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      {loading && (
        <span className={styles.spinner} aria-hidden="true">
          <Loader2 size={16} strokeWidth={2.2} />
        </span>
      )}
      <span className={styles.content}>
        {leadingIcon && (
          <span className={styles.icon} aria-hidden="true">
            {leadingIcon}
          </span>
        )}
        <span className={styles.label}>{children}</span>
        {trailingIcon && (
          <span className={styles.icon} aria-hidden="true">
            {trailingIcon}
          </span>
        )}
      </span>
    </button>
  )
}

interface IconButtonOwnProps {
  variant?: ButtonVariant
  size?: ButtonSize
  icon: ReactNode
  loading?: boolean
  className?: string
}

export interface IconButtonProps
  extends IconButtonOwnProps,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children"> {
  "aria-label": string
}

export function IconButton({
  variant = "secondary",
  size = "md",
  icon,
  loading = false,
  className,
  type = "button",
  disabled,
  ...rest
}: IconButtonProps) {
  const isDisabled = disabled || loading
  const classes = [
    styles.root,
    styles.iconOnly,
    VARIANT_CLASS[variant],
    SIZE_CLASS[size],
    loading && styles.loading,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <button
      type={type}
      className={classes}
      disabled={isDisabled}
      aria-busy={loading || undefined}
      data-loading={loading || undefined}
      {...rest}
    >
      {loading ? (
        <span className={styles.spinner} aria-hidden="true">
          <Loader2 size={16} strokeWidth={2.2} />
        </span>
      ) : (
        <span className={styles.icon} aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
}

export default Button
