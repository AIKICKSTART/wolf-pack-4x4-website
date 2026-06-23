import type { ReactNode } from "react"

import styles from "./social-proof-strip.module.css"

export interface SocialProofMark {
  label: string
  icon?: ReactNode
}

export interface SocialProofStripProps {
  label?: string
  marks?: SocialProofMark[]
  className?: string
}

const TRUST_MARK_SVGS: ReactNode[] = [
  <svg key="anchor" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="5" r="2.2" />
    <path d="M10 7.4v9.6M6 12h8M4 13.5c0 2.4 2.7 4.5 6 4.5s6-2.1 6-4.5" />
  </svg>,
  <svg key="cog" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="2.4" />
    <path d="M10 3v2M10 15v2M17 10h-2M5 10H3M14.95 5.05l-1.42 1.42M6.47 13.53l-1.42 1.42M14.95 14.95l-1.42-1.42M6.47 6.47L5.05 5.05" />
  </svg>,
  <svg key="bolt" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M11 2 4 11h5l-1 7 7-9h-5z" />
  </svg>,
  <svg key="shield" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <path d="M10 2 3.5 4.4V10c0 4 3 6.8 6.5 8 3.5-1.2 6.5-4 6.5-8V4.4z" />
    <path d="m7 10 2 2 4-4" strokeLinecap="round" />
  </svg>,
  <svg key="badge" viewBox="0 0 20 20" width="20" height="20" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round">
    <circle cx="10" cy="9" r="4.4" />
    <path d="M6.8 12.5 5.5 18l4.5-2.4L14.5 18l-1.3-5.5" strokeLinecap="round" />
  </svg>,
]

const DEFAULT_MARKS: SocialProofMark[] = [
  { label: "Boddington Auto", icon: TRUST_MARK_SVGS[0] },
  { label: "Coastal Fleet Co.", icon: TRUST_MARK_SVGS[1] },
  { label: "South Shore Tow", icon: TRUST_MARK_SVGS[2] },
  { label: "Hinterland Hire", icon: TRUST_MARK_SVGS[3] },
  { label: "Albion Yard", icon: TRUST_MARK_SVGS[4] },
]

export function SocialProofStrip({
  label = "Trusted by workshops across the Illawarra",
  marks = DEFAULT_MARKS,
  className,
}: SocialProofStripProps) {
  const classes = [styles.strip, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={label}>
      <span className={styles.label}>{label}</span>
      <ul className={styles.row}>
        {marks.map((mark, index) => (
          <li key={`${mark.label}-${index}`} className={styles.mark}>
            {mark.icon ? <span className={styles.markIcon}>{mark.icon}</span> : null}
            <span>{mark.label}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default SocialProofStrip
