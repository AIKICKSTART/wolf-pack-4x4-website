import type { ReactNode } from "react"

import { ButtonDnaLink } from "../button-dna-link"
import styles from "./auth-shell.module.css"

export type AuthShellTone = "red" | "amber" | "teal"

export interface AuthShellProps {
  kicker: string
  headline: string
  tagline: string
  tone?: AuthShellTone
  region?: string
  version?: string
  brandFooter?: ReactNode
  brandBodySlot?: ReactNode
  children: ReactNode
}

const TONE_CLASS: Record<AuthShellTone, string> = {
  red: "",
  amber: styles.toneAmber,
  teal: styles.toneTeal,
}

export function AuthShell({
  kicker,
  headline,
  tagline,
  tone = "red",
  region = "Sydney · AU",
  version = "v2.0 · primitives",
  brandFooter,
  brandBodySlot,
  children,
}: AuthShellProps) {
  const classes = [styles.shell, TONE_CLASS[tone]].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label="Authentication">
      <aside className={styles.brandPane}>
        <header className={styles.brandHead}>
          <span className={styles.brandLockup}>
            <span className={styles.brandBadge} aria-hidden="true">
              OFM
            </span>
            <span>Oak Flats Mufflermen</span>
          </span>
          <span className={styles.brandStatus}>Workshop live</span>
        </header>

        <div className={styles.brandBody}>
          <span className={styles.kicker}>{kicker}</span>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.tagline}>{tagline}</p>
          {brandBodySlot ? <div className={styles.brandFootSlot}>{brandBodySlot}</div> : null}
        </div>

        <footer className={styles.brandFoot}>
          <span>{region}</span>
          <span>{brandFooter ?? version}</span>
          <ButtonDnaLink className={styles.buttonDnaLink} />
        </footer>
      </aside>

      <main className={styles.formPane}>
        <div className={styles.formInner}>{children}</div>
      </main>
    </section>
  )
}

export default AuthShell
