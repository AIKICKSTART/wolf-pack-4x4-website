import { Fragment } from "react"

import styles from "./legal-fineprint.module.css"

export interface LegalFineprintLink {
  label: string
  href: string
}

export interface LegalFineprintProps {
  prefix?: string
  links?: LegalFineprintLink[]
  className?: string
}

const DEFAULT_PREFIX = "By continuing, you accept the Mufflermen"
const DEFAULT_LINKS: LegalFineprintLink[] = [
  { label: "Terms of Service", href: "#terms" },
  { label: "Privacy Policy", href: "#privacy" },
  { label: "Cookie Notice", href: "#cookies" },
]

export function LegalFineprint({
  prefix = DEFAULT_PREFIX,
  links = DEFAULT_LINKS,
  className,
}: LegalFineprintProps) {
  const classes = [styles.fineprint, className].filter(Boolean).join(" ")

  return (
    <small className={classes}>
      {prefix}{" "}
      {links.map((link, index) => {
        const isLast = index === links.length - 1
        const isSecondLast = index === links.length - 2
        return (
          <Fragment key={link.href}>
            <a className={styles.link} href={link.href}>
              {link.label}
            </a>
            {!isLast && (
              <span className={styles.separator} aria-hidden="true">
                {isSecondLast ? " and " : " · "}
              </span>
            )}
          </Fragment>
        )
      })}
      .
    </small>
  )
}

export default LegalFineprint
