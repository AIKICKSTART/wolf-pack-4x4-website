import type {
  SuccessHeroStat,
  SuccessNextStep,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./success-state-card.module.css"

export interface SuccessStateCardProps {
  /** Eyebrow eg "Onboarding / Complete". */
  kicker: string
  /** Big headline eg "Illawarra TB is live." */
  headline: string
  /** Supporting paragraph below the headline. */
  body: string
  /** Optional 3-up stats. */
  stats?: ReadonlyArray<SuccessHeroStat>
  /** Recommended next steps. */
  nextSteps: ReadonlyArray<SuccessNextStep>
  /** Optional primary CTA. */
  primaryCtaLabel?: string
  primaryCtaHref?: string
  /** Optional secondary CTA. */
  secondaryCtaLabel?: string
  secondaryCtaHref?: string
  className?: string
}

export function SuccessStateCard({
  kicker,
  headline,
  body,
  stats,
  nextSteps,
  primaryCtaLabel = "Open workshop dashboard",
  primaryCtaHref,
  secondaryCtaLabel = "Invite a teammate",
  secondaryCtaHref,
  className,
}: SuccessStateCardProps) {
  const classes = [shell.shell, shell.toneGreen, styles.card, className]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={headline}>
      <span className={styles.confettiLayer} aria-hidden="true">
        {Array.from({ length: 32 }, (_, index) => index).map((index) => (
          <span
            key={index}
            className={styles.confettiPiece}
            data-index={index}
          />
        ))}
      </span>

      <header className={styles.head}>
        <span className={styles.medal} aria-hidden="true">
          <svg viewBox="0 0 64 64" width="44" height="44">
            <defs>
              <linearGradient id="success-medal" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primitive-green)" />
                <stop offset="100%" stopColor="color-mix(in srgb, var(--primitive-green) 55%, black)" />
              </linearGradient>
            </defs>
            <circle cx="32" cy="32" r="22" fill="url(#success-medal)" stroke="var(--primitive-text-strong)" strokeWidth="2" />
            <path
              d="M22 32 L28 38 L42 24"
              stroke="var(--primitive-text-strong)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <span className={shell.kicker}>{kicker}</span>
        <h2 className={styles.headline}>{headline}</h2>
        <p className={styles.body}>{body}</p>
      </header>

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

      <section className={styles.next} aria-label="Next steps">
        <span className={shell.sectionLabel}>What&apos;s next</span>
        <ul className={styles.nextList}>
          {nextSteps.map((step) => (
            <li key={step.id}>
              <a
                className={styles.nextStep}
                href={step.href ?? "#"}
                aria-disabled={step.href ? undefined : "true"}
              >
                <span className={styles.nextGlyph} aria-hidden="true">
                  {step.glyph}
                </span>
                <span className={styles.nextCopy}>
                  <span className={styles.nextLabel}>{step.label}</span>
                  <span className={styles.nextDescription}>{step.description}</span>
                </span>
                <span className={styles.nextArrow} aria-hidden="true">→</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <footer className={styles.foot}>
        {secondaryCtaLabel ? (
          <a
            className={[shell.button, shell.buttonGhost].join(" ")}
            href={secondaryCtaHref ?? "#"}
            aria-disabled={secondaryCtaHref ? undefined : "true"}
          >
            {secondaryCtaLabel}
          </a>
        ) : null}
        <a
          className={[shell.button, shell.buttonPrimary, shell.toneGreen].join(" ")}
          href={primaryCtaHref ?? "#"}
          aria-disabled={primaryCtaHref ? undefined : "true"}
        >
          {primaryCtaLabel}
          <span aria-hidden="true">→</span>
        </a>
      </footer>
    </article>
  )
}

export default SuccessStateCard
