import type { ReactNode } from "react"

import styles from "./state-not-found.module.css"

export interface StateNotFoundRoute {
  code: string
  label: string
  href: string
}

export interface StateNotFoundProps {
  headline?: string
  message?: string
  errorCode?: string
  routeHint?: string
  suggestedRoutes?: ReadonlyArray<StateNotFoundRoute>
  primaryAction?: ReactNode
  secondaryAction?: ReactNode
}

const DEFAULT_ROUTES: ReadonlyArray<StateNotFoundRoute> = [
  { code: "01", label: "Workshop dashboard", href: "/ui-primitives" },
  { code: "02", label: "Quote a job", href: "/quote" },
  { code: "03", label: "Find a fitment slot", href: "/bookings" },
]

export function StateNotFound({
  headline = "Off the map",
  message = "The page you were chasing has rolled off the lift. Could be a bad link, an old bookmark, or a part number that retired with the last shop refit.",
  errorCode = "404 · ROUTE NOT FOUND",
  routeHint,
  suggestedRoutes = DEFAULT_ROUTES,
  primaryAction,
  secondaryAction,
}: StateNotFoundProps) {
  return (
    <article className={styles.surface} aria-labelledby="state-not-found-heading">
      <figure className={styles.figure}>
        <svg
          className={styles.illustration}
          viewBox="0 0 320 240"
          aria-hidden="true"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="nfBody" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#5b6470" />
              <stop offset="48%" stopColor="#1a1d24" />
              <stop offset="100%" stopColor="#0c0e12" />
            </linearGradient>
            <linearGradient id="nfChrome" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4f7fb" />
              <stop offset="60%" stopColor="#4a525d" />
              <stop offset="100%" stopColor="#171c24" />
            </linearGradient>
            <radialGradient id="nfTip" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="var(--primitive-amber)" />
              <stop offset="42%" stopColor="#7c4513" />
              <stop offset="100%" stopColor="#0c0a08" />
            </radialGradient>
          </defs>
          {/* Ground shadow */}
          <ellipse cx="160" cy="208" rx="118" ry="10" fill="#000" opacity="0.42" />
          {/* Muffler body — rotated, askew */}
          <g transform="translate(56 96) rotate(-9 132 38)">
            <rect x="20" y="0" width="220" height="78" rx="38" fill="url(#nfBody)" stroke="#0a0c10" strokeWidth="2" />
            <rect x="20" y="0" width="220" height="22" rx="38" fill="var(--primitive-text-strong)" opacity="0.08" />
            {/* Banding */}
            <line x1="78" y1="0" x2="78" y2="78" stroke="#0a0c10" strokeWidth="2" opacity="0.55" />
            <line x1="138" y1="0" x2="138" y2="78" stroke="#0a0c10" strokeWidth="2" opacity="0.55" />
            <line x1="198" y1="0" x2="198" y2="78" stroke="#0a0c10" strokeWidth="2" opacity="0.55" />
            {/* Inlet pipe */}
            <rect x="-20" y="22" width="42" height="34" rx="6" fill="url(#nfChrome)" stroke="#0a0c10" strokeWidth="2" />
            {/* Outlet pipe with tip */}
            <rect x="238" y="22" width="46" height="34" rx="6" fill="url(#nfChrome)" stroke="#0a0c10" strokeWidth="2" />
            <ellipse cx="284" cy="39" rx="6" ry="14" fill="url(#nfTip)" />
            {/* Subtle hanger */}
            <line x1="130" y1="0" x2="130" y2="-22" stroke="#3a414c" strokeWidth="3" strokeLinecap="round" />
            <circle cx="130" cy="-26" r="4" fill="#3a414c" />
          </g>
          {/* Question mark floating above */}
          <g transform="translate(214 28)">
            <circle cx="0" cy="0" r="34" fill="var(--primitive-red)" opacity="0.16" />
            <circle cx="0" cy="0" r="22" fill="#0c0e12" stroke="var(--primitive-red)" strokeWidth="2" />
            <path
              d="M -7 -7 Q -7 -16 0 -16 Q 8 -16 8 -8 Q 8 -2 0 2 L 0 8"
              stroke="var(--primitive-amber)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
            />
            <circle cx="0" cy="13" r="2.4" fill="var(--primitive-amber)" />
          </g>
          {/* Sparks / dotted motion lines */}
          <g stroke="var(--primitive-teal)" strokeWidth="1.4" strokeLinecap="round" opacity="0.62">
            <line x1="32" y1="118" x2="40" y2="118" />
            <line x1="22" y1="132" x2="34" y2="132" />
            <line x1="14" y1="148" x2="28" y2="148" />
            <line x1="294" y1="76" x2="302" y2="68" />
            <line x1="284" y1="60" x2="290" y2="50" />
          </g>
        </svg>
        <figcaption className={styles.caption}>Last seen rolling toward Bay 3</figcaption>
      </figure>

      <div className={styles.body}>
        <span className={styles.code}>{errorCode}</span>
        <h1 id="state-not-found-heading" className={styles.headline}>
          {headline}
        </h1>
        <p className={styles.message}>{message}</p>
        {routeHint ? (
          <p className={styles.message} style={{ color: "var(--primitive-muted)" }}>
            <strong style={{ color: "var(--primitive-amber)" }}>Tried path:</strong> <code>{routeHint}</code>
          </p>
        ) : null}
        {suggestedRoutes.length > 0 ? (
          <ul className={styles.routesList} aria-label="Suggested routes">
            {suggestedRoutes.map((route) => (
              <li key={route.href}>
                <span aria-hidden="true">{route.code}</span>
                <span>{route.label}</span>
                <code>{route.href}</code>
              </li>
            ))}
          </ul>
        ) : null}
        {(primaryAction || secondaryAction) && (
          <div className={styles.actions}>
            {primaryAction}
            {secondaryAction}
          </div>
        )}
      </div>
    </article>
  )
}

export default StateNotFound
