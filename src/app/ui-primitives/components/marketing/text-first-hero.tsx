import type { ReactNode } from "react"

import styles from "./text-first-hero.module.css"

export type TextFirstHeroLayout = "left-aligned" | "centered" | "split-credit"

export interface TextFirstHeroAction {
  label: string
  href: string
  tone?: "red" | "chrome" | "ghost"
}

export interface TextFirstHeroTrustItem {
  label: string
  value: string
}

export interface TextFirstHeroProps {
  kicker: string
  headline: ReactNode
  subhead: string
  primaryAction: TextFirstHeroAction
  secondaryAction?: TextFirstHeroAction
  trust?: ReadonlyArray<TextFirstHeroTrustItem>
  layout?: TextFirstHeroLayout
  /** Right-aligned credit text used in the `split-credit` layout. */
  credit?: string
  className?: string
  routeHeader?: boolean
}

const LAYOUT_CLASS: Record<TextFirstHeroLayout, string> = {
  "left-aligned": styles.layoutLeft,
  centered: styles.layoutCentered,
  "split-credit": styles.layoutSplit,
}

const TONE_CLASS: Record<NonNullable<TextFirstHeroAction["tone"]>, string> = {
  red: styles.toneRed,
  chrome: styles.toneChrome,
  ghost: styles.toneGhost,
}

function Action({ action }: { action: TextFirstHeroAction }) {
  const toneClass = TONE_CLASS[action.tone ?? "red"]
  return (
    <a className={`${styles.action} ${toneClass}`} href={action.href}>
      <span>{action.label}</span>
      <span className={styles.arrow} aria-hidden="true" />
    </a>
  )
}

export function TextFirstHero({
  kicker,
  headline,
  subhead,
  primaryAction,
  secondaryAction,
  trust,
  layout = "left-aligned",
  credit,
  className,
  routeHeader = false,
}: TextFirstHeroProps) {
  const classes = [styles.hero, LAYOUT_CLASS[layout], className]
    .filter(Boolean)
    .join(" ")

  return (
    <section
      className={classes}
      aria-label="Hero"
      data-ui-primitive-route-header={routeHeader ? "true" : undefined}
    >
      <div className={styles.copy}>
        <span className={styles.kicker}>{kicker}</span>
        <h1 className={styles.headline}>{headline}</h1>
        <p className={styles.subhead}>{subhead}</p>
        <div className={styles.actions}>
          <Action action={primaryAction} />
          {secondaryAction ? <Action action={secondaryAction} /> : null}
        </div>
        {trust && trust.length > 0 ? (
          <ul className={styles.trust} aria-label="Trust indicators">
            {trust.map((item) => (
              <li key={item.label}>
                <strong>{item.value}</strong>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {layout === "split-credit" && credit ? (
        <aside className={styles.credit} aria-label="Credit">
          <span>{credit}</span>
        </aside>
      ) : null}
    </section>
  )
}

export default TextFirstHero
