import type { CSSProperties, ReactNode } from "react"

import styles from "./section-heading.module.css"

/**
 * SectionHeading — the shared section header used on every Oak Flats page.
 *
 * Mono uppercase amber-tinted kicker with a leading gradient rule, a
 * display-font uppercase title (fluid by `size`), an optional body
 * description, and an optional right-aligned `actions` slot. Token-only
 * styling gives automatic light/dark parity within the Carbon & Red DNA.
 *
 * @example
 * <SectionHeading
 *   kicker="Workshop"
 *   title="Active Job Board"
 *   description="Live status across every bay, updated as technicians clock work."
 *   align="left"
 *   size="md"
 *   actions={<button className="btn-primary">New job</button>}
 * />
 */

export type SectionHeadingAlign = "left" | "center"
export type SectionHeadingSize = "sm" | "md" | "lg"

interface SectionHeadingProps {
  /** Required headline. Rendered in the display font, uppercased. */
  title: string
  /** Optional mono uppercase eyebrow above the title, with a leading rule. */
  kicker?: string
  /** Optional supporting body copy under the title. */
  description?: ReactNode
  /** Optional right-aligned controls (buttons, links). Ignored when `align="center"`. */
  actions?: ReactNode
  /** Text + layout alignment. @default "left" */
  align?: SectionHeadingAlign
  /** Title scale step. @default "md" */
  size?: SectionHeadingSize
  /** Heading level for the rendered title element. @default 2 */
  level?: 2 | 3 | 4
  /** Optional id for the title — useful for `aria-labelledby` on the section. */
  titleId?: string
  className?: string
}

const SIZE_CLASS: Record<SectionHeadingSize, string> = {
  sm: styles.sizeSm,
  md: styles.sizeMd,
  lg: styles.sizeLg,
}

const ALIGN_CLASS: Record<SectionHeadingAlign, string> = {
  left: styles.alignLeft,
  center: styles.alignCenter,
}

export function SectionHeading({
  title,
  kicker,
  description,
  actions,
  align = "left",
  size = "md",
  level = 2,
  titleId,
  className,
}: SectionHeadingProps) {
  const classes = [styles.root, SIZE_CLASS[size], ALIGN_CLASS[align], className]
    .filter(Boolean)
    .join(" ")

  // Actions are only meaningful in the left-aligned title/actions grid.
  const showActions = align === "left" && Boolean(actions)

  const TitleTag = `h${level}` as "h2" | "h3" | "h4"

  return (
    <header
      className={classes}
      style={{ "--heading-cols": showActions ? "1fr auto" : "1fr" } as CSSProperties}
    >
      <div className={styles.lede}>
        {kicker && <span className={styles.kicker}>{kicker}</span>}
        <TitleTag id={titleId} className={styles.title}>
          {title}
        </TitleTag>
        {description && <p className={styles.description}>{description}</p>}
      </div>
      {showActions && <div className={styles.actions}>{actions}</div>}
    </header>
  )
}

export default SectionHeading
