import { ProgressRadial } from "../primitives/progress-radial"

import {
  DEPLOY_CHECKLIST_TONE,
  type DeployChecklistItem,
} from "./system-onboarding-types"
import shell from "./system-onboarding.module.css"
import styles from "./first-deploy-tile.module.css"

export interface FirstDeployTileProps {
  /** Eyebrow eg "Step 6 / Deploy". */
  kicker: string
  /** Big title eg "Launch your workshop". */
  title: string
  /** Supporting paragraph below the title. */
  description: string
  /** Items in the pre-launch checklist. */
  checklist: ReadonlyArray<DeployChecklistItem>
  /** Optional target URL eg "https://illawarra-tb.mufflermen.com.au". */
  targetUrl?: string
  /** Optional environment chip eg "production". */
  environment?: string
  /** Primary CTA label eg "Launch · go live". */
  deployLabel?: string
  /** Optional deploy href. */
  deployHref?: string
  className?: string
}

const TONE_CLASS = {
  red: shell.toneRed,
  amber: shell.toneAmber,
  teal: shell.toneTeal,
  green: shell.toneGreen,
  neutral: shell.toneNeutral,
  violet: shell.toneViolet,
} as const

const CHECKLIST_LABEL = {
  todo: "Pending",
  ready: "Ready",
  running: "Running",
  deployed: "Live",
} as const

function computeReadiness(items: ReadonlyArray<DeployChecklistItem>): number {
  if (items.length === 0) return 0
  const done = items.filter(
    (item) => item.state === "ready" || item.state === "deployed",
  ).length
  return Math.round((done / items.length) * 100)
}

export function FirstDeployTile({
  kicker,
  title,
  description,
  checklist,
  targetUrl,
  environment = "production",
  deployLabel = "Launch · go live",
  deployHref,
  className,
}: FirstDeployTileProps) {
  const readiness = computeReadiness(checklist)
  const cleared = readiness === 100
  const classes = [
    shell.shell,
    cleared ? shell.toneGreen : shell.toneAmber,
    styles.tile,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <article className={classes} aria-label={title}>
      <header className={styles.head}>
        <div className={shell.identity}>
          <span className={shell.kicker}>{kicker}</span>
          <h2 className={shell.title}>{title}</h2>
          <p className={shell.subtitle}>{description}</p>
        </div>
        <div className={styles.gauge}>
          <ProgressRadial
            value={readiness}
            tone={cleared ? "green" : "amber"}
            size="lg"
            thickness={7}
            showLabel
            label={`Deploy readiness — ${readiness} percent`}
          />
        </div>
      </header>

      <dl className={styles.meta}>
        <div>
          <dt>Environment</dt>
          <dd className={shell.mono}>{environment}</dd>
        </div>
        <div>
          <dt>Target URL</dt>
          <dd className={[styles.url, shell.mono].join(" ")}>
            {targetUrl ?? "—"}
          </dd>
        </div>
      </dl>

      <ul className={styles.checklist}>
        {checklist.map((item) => {
          const tone = DEPLOY_CHECKLIST_TONE[item.state]
          return (
            <li key={item.id} className={[styles.checkItem, TONE_CLASS[tone]].join(" ")}>
              <span className={styles.checkGlyph} aria-hidden="true">
                {item.state === "deployed" ? (
                  <svg viewBox="0 0 14 14" width="14" height="14">
                    <path
                      d="M2 8 L6 12 L12 4"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                ) : item.state === "running" ? (
                  <svg viewBox="0 0 14 14" width="14" height="14">
                    <circle
                      cx="7"
                      cy="7"
                      r="4.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      fill="none"
                      strokeDasharray="14 14"
                    />
                  </svg>
                ) : item.state === "ready" ? (
                  <svg viewBox="0 0 14 14" width="14" height="14">
                    <circle
                      cx="7"
                      cy="7"
                      r="4.5"
                      fill="currentColor"
                    />
                  </svg>
                ) : (
                  <svg viewBox="0 0 14 14" width="14" height="14">
                    <circle
                      cx="7"
                      cy="7"
                      r="4.5"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      fill="none"
                    />
                  </svg>
                )}
              </span>
              <span className={styles.checkLabel}>{item.label}</span>
              <span className={[shell.chip, TONE_CLASS[tone]].join(" ")}>
                {CHECKLIST_LABEL[item.state]}
              </span>
            </li>
          )
        })}
      </ul>

      <footer className={styles.foot}>
        <a
          className={[
            shell.button,
            shell.buttonPrimary,
            cleared ? shell.toneGreen : shell.toneAmber,
          ].join(" ")}
          href={cleared ? deployHref ?? "#" : undefined}
          aria-disabled={cleared ? undefined : "true"}
          data-disabled={cleared ? undefined : "true"}
        >
          {cleared ? deployLabel : "Resolve checklist to launch"}
          {cleared ? <span aria-hidden="true">→</span> : null}
        </a>
      </footer>
    </article>
  )
}

export default FirstDeployTile
