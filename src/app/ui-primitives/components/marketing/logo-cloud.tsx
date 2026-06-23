import type { ReactNode } from "react"

import { Reveal } from "../motion"

import styles from "./logo-cloud.module.css"

export interface LogoCloudEntry {
  id: string
  /** Brand name used for accessible label. */
  name: string
  /** Inline SVG mark — hand-drawn abstract brand glyph. */
  mark: ReactNode
}

export interface LogoCloudProps {
  kicker?: string
  heading?: string
  body?: string
  entries: ReadonlyArray<LogoCloudEntry>
  className?: string
}

export function LogoCloud({
  kicker,
  heading,
  body,
  entries,
  className,
}: LogoCloudProps) {
  const classes = [styles.section, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={heading ?? "Partner logos"}>
      {(kicker || heading || body) && (
        <header className={styles.header}>
          {kicker ? <span className={styles.kicker}>{kicker}</span> : null}
          {heading ? <h2 className={styles.heading}>{heading}</h2> : null}
          {body ? <p className={styles.body}>{body}</p> : null}
        </header>
      )}

      <ul className={styles.cloud} aria-label="Partner brand marks">
        {entries.map((entry, index) => (
          <Reveal
            key={entry.id}
            as="li"
            from="fade"
            delay={index * 60}
            className={styles.entry}
          >
            <span className={styles.mark} role="img" aria-label={entry.name}>
              {entry.mark}
            </span>
            <span className={styles.name}>{entry.name}</span>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}

export default LogoCloud
