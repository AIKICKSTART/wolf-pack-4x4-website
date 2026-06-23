"use client"

import type { CSSProperties, ElementType, KeyboardEvent, ReactNode } from "react"

import styles from "./card.module.css"

/**
 * Card — the universal premium surface container for the Oak Flats
 * Mufflermen UI-primitives system. Carbon & Red shared DNA: neumorphic
 * inset depth, metallic sheen, and a tone-driven accent edge.
 *
 * Variants:
 *  - panel    — flat machined panel on --primitive-card-bg + surface-shadow.
 *  - raised    — metallic-sheen lift on card-shadow (the hero surface).
 *  - glass    — translucent panel + subtle blur for overlays.
 *  - recessed — inset well (neumo inset) for nested/sunken content.
 *
 * The `tone` prop paints a left (or top) accent edge from the brand palette.
 * `interactive` adds a hover lift + card-hover-shadow and is keyboard-driven
 * when an `onActivate` handler is supplied.
 *
 * @example
 * <Card variant="raised" tone="red" padding="lg" interactive>
 *   <CardHeader title="Torque Spec" eyebrow="Diagnostics" />
 *   <p>Cylinder 3 reads 12% below baseline.</p>
 *   <CardFooter>
 *     <Button>Open job</Button>
 *   </CardFooter>
 * </Card>
 */

export type CardVariant = "panel" | "raised" | "glass" | "recessed"
export type CardTone = "red" | "amber" | "teal" | "green" | "neutral"
export type CardPadding = "sm" | "md" | "lg"
export type CardEdge = "left" | "top"

interface CardProps {
  /** Render element. Defaults to `div`. Use `article`/`section` for landmarks. */
  as?: ElementType
  variant?: CardVariant
  /** Accent edge colour, drawn as a left or top rule. Omit for no edge. */
  tone?: CardTone
  /** Which side the accent edge sits on. Defaults to `left`. */
  edge?: CardEdge
  padding?: CardPadding
  /** Hover lift + elevated shadow. Becomes keyboard/clickable with `onActivate`. */
  interactive?: boolean
  disabled?: boolean
  /** Activation handler for interactive cards (click + Enter/Space). */
  onActivate?: () => void
  /** Slot rendered above children (alt to <CardHeader>). */
  header?: ReactNode
  /** Slot rendered below children (alt to <CardFooter>). */
  footer?: ReactNode
  children?: ReactNode
  className?: string
  /** Accessible name when the card is interactive and has no text label. */
  "aria-label"?: string
}

type CardElementProps = {
  className?: string
  style?: CSSProperties
  role?: string
  tabIndex?: number
  onClick?: () => void
  onKeyDown?: (event: KeyboardEvent<HTMLElement>) => void
  "aria-disabled"?: boolean
  "aria-label"?: string
  children?: ReactNode
}

const VARIANT_CLASS: Record<CardVariant, string> = {
  panel: styles.panel,
  raised: styles.raised,
  glass: styles.glass,
  recessed: styles.recessed,
}

const TONE_VAR: Record<CardTone, string> = {
  red: "var(--primitive-red)",
  amber: "var(--primitive-amber)",
  teal: "var(--primitive-teal)",
  green: "var(--primitive-green)",
  neutral: "var(--primitive-line-strong)",
}

const PADDING_CLASS: Record<CardPadding, string> = {
  sm: styles.padSm,
  md: styles.padMd,
  lg: styles.padLg,
}

export function Card({
  as,
  variant = "panel",
  tone,
  edge = "left",
  padding = "md",
  interactive = false,
  disabled = false,
  onActivate,
  header,
  footer,
  children,
  className,
  "aria-label": ariaLabel,
}: CardProps) {
  const Component = (as ?? "div") as ElementType<CardElementProps>
  const isButtonLike = interactive && Boolean(onActivate) && !disabled

  const classes = [
    styles.card,
    VARIANT_CLASS[variant],
    PADDING_CLASS[padding],
    tone && styles.toned,
    tone && (edge === "top" ? styles.edgeTop : styles.edgeLeft),
    interactive && styles.interactive,
    disabled && styles.disabled,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isButtonLike) {
      return
    }
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onActivate?.()
    }
  }

  const interactiveProps = isButtonLike
    ? {
        role: "button" as const,
        tabIndex: 0,
        onClick: onActivate,
        onKeyDown: handleKeyDown,
        "aria-disabled": disabled || undefined,
      }
    : {}

  return (
    <Component
      className={classes}
      style={
        tone ? ({ "--card-tone": TONE_VAR[tone] } as CSSProperties) : undefined
      }
      aria-label={ariaLabel}
      {...interactiveProps}
    >
      {header && <div className={styles.headerSlot}>{header}</div>}
      {children}
      {footer && <div className={styles.footerSlot}>{footer}</div>}
    </Component>
  )
}

interface CardHeaderProps {
  /** Short uppercase eyebrow/kicker above the title. */
  eyebrow?: string
  title?: ReactNode
  /** Trailing slot (badge, menu, icon) aligned to the title row. */
  action?: ReactNode
  children?: ReactNode
  className?: string
}

export function CardHeader({
  eyebrow,
  title,
  action,
  children,
  className,
}: CardHeaderProps) {
  const classes = [styles.header, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div className={styles.headerText}>
        {eyebrow && <span className={styles.eyebrow}>{eyebrow}</span>}
        {title && <h3 className={styles.title}>{title}</h3>}
        {children}
      </div>
      {action && <div className={styles.headerAction}>{action}</div>}
    </div>
  )
}

interface CardFooterProps {
  children?: ReactNode
  /** Horizontal alignment of footer content. Defaults to `start`. */
  align?: "start" | "between" | "end"
  className?: string
}

const FOOTER_ALIGN_CLASS: Record<NonNullable<CardFooterProps["align"]>, string> =
  {
    start: styles.footerStart,
    between: styles.footerBetween,
    end: styles.footerEnd,
  }

export function CardFooter({
  children,
  align = "start",
  className,
}: CardFooterProps) {
  const classes = [styles.footer, FOOTER_ALIGN_CLASS[align], className]
    .filter(Boolean)
    .join(" ")

  return <div className={classes}>{children}</div>
}

export default Card
