import { Avatar } from "../primitives/avatar"
import { Chip } from "../primitives/chip"

import type {
  WelcomeHeroCta,
  WelcomeHeroOwner,
  WelcomeHeroStat,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./welcome-hero.module.css"

export interface WelcomeHeroProps {
  /** Eyebrow label rendered above the headline. */
  kicker: string
  /** Tenant trading name eg "Illawarra Tyres & Brakes". */
  tenantName: string
  /** Big personalised headline eg "G'day Sarah — welcome aboard". */
  headline: string
  /** Supporting paragraph. */
  body: string
  /** Owner / primary admin block. */
  owner: WelcomeHeroOwner
  /** Optional 3-up stat row. */
  stats?: ReadonlyArray<WelcomeHeroStat>
  /** Optional pair of CTAs (primary + ghost). */
  ctas?: ReadonlyArray<WelcomeHeroCta>
  /** Hint copy rendered next to the logo placeholder. */
  logoHint?: string
  className?: string
}

export function WelcomeHero({
  kicker,
  tenantName,
  headline,
  body,
  owner,
  stats,
  ctas,
  logoHint = "Logo placeholder — upload yours next",
  className,
}: WelcomeHeroProps) {
  const classes = [shell.shell, styles.hero, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Welcome ${tenantName}`}>
      <header className={styles.head}>
        <div className={styles.eyebrowRow}>
          <span className={shell.kicker}>{kicker}</span>
          <Chip label={tenantName} tone="red" />
        </div>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.body}>{body}</p>
      </header>

      <div className={styles.identityRow}>
        <figure
          className={styles.logo}
          aria-label={`${tenantName} logo placeholder`}
        >
          <svg viewBox="0 0 84 84" width="56" height="56" aria-hidden="true">
            <defs>
              <linearGradient id="welcome-logo-bg" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 18%, transparent)" />
                <stop offset="100%" stopColor="color-mix(in srgb, var(--primitive-text-strong) 2%, transparent)" />
              </linearGradient>
            </defs>
            <rect
              x="4"
              y="4"
              width="76"
              height="76"
              rx="16"
              fill="url(#welcome-logo-bg)"
              stroke="color-mix(in srgb, var(--primitive-text-strong) 18%, transparent)"
            />
            <path
              d="M22 56 L22 28 L30 28 L42 44 L54 28 L62 28 L62 56 L54 56 L54 40 L44 54 L40 54 L30 40 L30 56 Z"
              fill="var(--primitive-text-strong)"
              opacity="0.86"
            />
          </svg>
          <figcaption className={styles.logoCaption}>{logoHint}</figcaption>
        </figure>
        <div className={styles.ownerCard}>
          <Avatar
            name={owner.name}
            tone="red"
            size="lg"
            status="online"
          />
          <div className={styles.ownerCopy}>
            <span className={styles.ownerName}>{owner.name}</span>
            <span className={styles.ownerRole}>{owner.role}</span>
            <span className={styles.ownerHint}>
              Signed in as <strong>{owner.initials}</strong>
            </span>
          </div>
        </div>
      </div>

      {stats && stats.length > 0 ? (
        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCell}>
              <dt>{stat.label}</dt>
              <dd className={shell.tabular}>{stat.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {ctas && ctas.length > 0 ? (
        <footer className={styles.ctaRow}>
          {ctas.map((cta) => (
            <a
              key={cta.label}
              className={[
                shell.button,
                cta.intent === "primary" ? shell.buttonPrimary : shell.buttonGhost,
              ].join(" ")}
              href={cta.href ?? "#"}
              aria-disabled={cta.href ? undefined : "true"}
            >
              {cta.label}
              <span aria-hidden="true">→</span>
            </a>
          ))}
        </footer>
      ) : null}
    </article>
  )
}

export default WelcomeHero
