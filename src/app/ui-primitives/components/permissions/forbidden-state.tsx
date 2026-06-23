import type { ReactNode } from "react"

import styles from "./forbidden-state.module.css"

interface ForbiddenStateProps {
  /** Permission the user attempted to use, e.g. `invoices.approve`. */
  missingPermission: string
  /** Human-readable label for the action they tried. */
  attemptedAction: string
  /** Their current role label. */
  currentRole: string
  /** Required role label or pattern. */
  requiredRole: string
  /** Optional headline override. */
  headline?: string
  /** Optional message override. */
  message?: string
  /** Slot for the "Request access" CTA. */
  requestAccessAction?: ReactNode
  /** Slot for the "Switch role" link. */
  switchRoleAction?: ReactNode
}

export function ForbiddenState({
  missingPermission,
  attemptedAction,
  currentRole,
  requiredRole,
  headline = "No clearance for this bay",
  message = "Your current role does not include the permission needed for this action. Request elevated access or switch to a workspace where you have it.",
  requestAccessAction,
  switchRoleAction,
}: ForbiddenStateProps) {
  return (
    <article
      className={styles.surface}
      role="alert"
      aria-labelledby="forbidden-state-heading"
    >
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 240 240"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="fbBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3a414c" />
              <stop offset="50%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0a0c10" />
            </linearGradient>
            <linearGradient id="fbStripe" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#ffc14f" />
              <stop offset="100%" stopColor="#e62028" />
            </linearGradient>
          </defs>
          <ellipse cx="120" cy="222" rx="78" ry="6" fill="#000" opacity="0.36" />

          {/* shield outline */}
          <g className={styles.shieldSpin}>
            <path
              d="M120 32 L196 60 V128 Q196 178 120 212 Q44 178 44 128 V60 Z"
              fill="url(#fbBody)"
              stroke="#0a0c10"
              strokeWidth="2"
            />
            <path
              d="M120 32 L196 60 V128 Q196 178 120 212 Q44 178 44 128 V60 Z"
              fill="none"
              stroke="rgba(255,255,255,0.06)"
              strokeWidth="6"
            />
          </g>

          {/* hazard stripes */}
          <g className={styles.stripes}>
            <rect x="64" y="98" width="112" height="14" fill="url(#fbStripe)" opacity="0.7" transform="rotate(-12 120 105)" />
            <rect x="64" y="124" width="112" height="14" fill="url(#fbStripe)" opacity="0.5" transform="rotate(-12 120 131)" />
          </g>

          {/* forbidden sign */}
          <g>
            <circle cx="120" cy="118" r="32" fill="#0a0c10" stroke="#e62028" strokeWidth="5" />
            <line x1="98" y1="140" x2="142" y2="96" stroke="#e62028" strokeWidth="5" strokeLinecap="round" />
          </g>
        </svg>
        <figcaption className={styles.caption}>403 — Access denied</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>FORBIDDEN · CODE 403</span>
        <h1 id="forbidden-state-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.message}>{message}</p>

        <dl className={styles.facts}>
          <div className={styles.fact}>
            <dt>You tried</dt>
            <dd>{attemptedAction}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Missing permission</dt>
            <dd>
              <code>{missingPermission}</code>
            </dd>
          </div>
          <div className={styles.fact}>
            <dt>Your role</dt>
            <dd>{currentRole}</dd>
          </div>
          <div className={styles.fact}>
            <dt>Required role</dt>
            <dd>{requiredRole}</dd>
          </div>
        </dl>

        {(requestAccessAction || switchRoleAction) && (
          <div className={styles.actions}>
            {requestAccessAction}
            {switchRoleAction}
          </div>
        )}
      </div>
    </article>
  )
}

export default ForbiddenState
