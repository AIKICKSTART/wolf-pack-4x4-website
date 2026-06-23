import type { ReactNode } from "react"

import { sectionIcon, type SectionIconName } from "../icons"

import styles from "./cta-section.module.css"

export interface CtaSectionAction {
  label: string
  href: string
  /** "primary" uses the metallic-red→amber button DNA; "ghost" is the carbon outline. */
  variant?: "primary" | "ghost"
}

export interface CtaSectionAssurance {
  icon: SectionIconName
  label: string
}

export interface CtaSectionProps {
  kicker: string
  heading: ReactNode
  body: string
  primaryAction: CtaSectionAction
  secondaryAction?: CtaSectionAction
  /** Short trust line items shown beneath the actions. */
  assurances?: ReadonlyArray<CtaSectionAssurance>
  /** Visual treatment of the panel surface. */
  tone?: "carbon" | "metallic"
  className?: string
}

const TONE_CLASS: Record<NonNullable<CtaSectionProps["tone"]>, string> = {
  carbon: styles.toneCarbon,
  metallic: styles.toneMetallic,
}

function ActionLink({ action }: { action: CtaSectionAction }) {
  const variant = action.variant ?? "primary"
  const variantClass = variant === "primary" ? styles.actionPrimary : styles.actionGhost
  return (
    <a className={`${styles.action} ${variantClass}`} href={action.href}>
      <span>{action.label}</span>
      <span className={styles.actionIcon} aria-hidden="true">
        {sectionIcon("arrow")}
      </span>
    </a>
  )
}

/**
 * Conversion CTA banner — a high-emphasis "book your fit-up" panel with a
 * metallic-red primary CTA (amber on hover), an optional carbon outline
 * secondary, and a row of trust assurances. Token-driven; light/dark via tokens.
 */
export function CtaSection({
  kicker,
  heading,
  body,
  primaryAction,
  secondaryAction,
  assurances,
  tone = "carbon",
  className,
}: CtaSectionProps) {
  const classes = [styles.section, TONE_CLASS[tone], className]
    .filter(Boolean)
    .join(" ")

  return (
    <section className={classes} aria-labelledby="cta-heading">
      <div className={styles.glow} aria-hidden="true" />
      <div className={styles.inner}>
        <p className={styles.kicker}>{kicker}</p>
        <h2 id="cta-heading" className={styles.heading}>
          {heading}
        </h2>
        <p className={styles.body}>{body}</p>

        <div className={styles.actions}>
          <ActionLink action={primaryAction} />
          {secondaryAction ? <ActionLink action={secondaryAction} /> : null}
        </div>

        {assurances && assurances.length > 0 ? (
          <ul className={styles.assurances} aria-label="What you can count on">
            {assurances.map((item) => (
              <li key={item.label} className={styles.assurance}>
                <span className={styles.assuranceIcon} aria-hidden="true">
                  {sectionIcon(item.icon)}
                </span>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

export default CtaSection
