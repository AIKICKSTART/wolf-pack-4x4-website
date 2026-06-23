import type { ReactNode } from "react"

import styles from "./footer-megamap.module.css"

export interface FooterMegamapLink {
  label: string
  href: string
}

export interface FooterMegamapColumn {
  id: string
  heading: string
  links: ReadonlyArray<FooterMegamapLink>
}

export interface FooterMegamapContactDetail {
  label: string
  value: string
  href?: string
}

export interface FooterMegamapSocial {
  id: string
  label: string
  href: string
  icon: ReactNode
}

export interface FooterMegamapRegion {
  code: string
  label: string
}

export interface FooterMegamapProps {
  brand: ReactNode
  description: string
  columns: ReadonlyArray<FooterMegamapColumn>
  contact: ReadonlyArray<FooterMegamapContactDetail>
  socials?: ReadonlyArray<FooterMegamapSocial>
  legal: string
  legalLinks?: ReadonlyArray<FooterMegamapLink>
  regions?: ReadonlyArray<FooterMegamapRegion>
  selectedRegion?: string
  className?: string
}

export function FooterMegamap({
  brand,
  description,
  columns,
  contact,
  socials,
  legal,
  legalLinks,
  regions,
  selectedRegion,
  className,
}: FooterMegamapProps) {
  const classes = [styles.footer, className].filter(Boolean).join(" ")

  return (
    <footer className={classes} aria-label="Site footer">
      <div className={styles.top}>
        <section className={styles.brand} aria-label="Brand">
          <div className={styles.brandMark}>{brand}</div>
          <p className={styles.brandBody}>{description}</p>
          {regions && regions.length > 0 ? (
            <label className={styles.regionField}>
              <span className={styles.regionLabel}>Region</span>
              <select className={styles.regionSelect} defaultValue={selectedRegion ?? regions[0]?.code}>
                {regions.map((region) => (
                  <option key={region.code} value={region.code}>
                    {region.label}
                  </option>
                ))}
              </select>
            </label>
          ) : null}
        </section>

        <nav className={styles.sitemap} aria-label="Sitemap">
          {columns.map((column) => (
            <div key={column.id} className={styles.column}>
              <h3 className={styles.columnHeading}>{column.heading}</h3>
              <ul>
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href}>{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <section className={styles.contact} aria-label="Contact">
          <h3 className={styles.columnHeading}>Workshop contact</h3>
          <ul>
            {contact.map((detail) => (
              <li key={detail.label}>
                <span>{detail.label}</span>
                {detail.href ? (
                  <a href={detail.href}>{detail.value}</a>
                ) : (
                  <strong>{detail.value}</strong>
                )}
              </li>
            ))}
          </ul>
          {socials && socials.length > 0 ? (
            <nav aria-label="Social links" className={styles.socials}>
              {socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  className={styles.socialBtn}
                  aria-label={social.label}
                >
                  <span aria-hidden="true">{social.icon}</span>
                </a>
              ))}
            </nav>
          ) : null}
        </section>
      </div>

      <div className={styles.bottom}>
        <small className={styles.legal}>{legal}</small>
        {legalLinks && legalLinks.length > 0 ? (
          <nav aria-label="Legal" className={styles.legalNav}>
            {legalLinks.map((link, index) => (
              <a key={link.label} href={link.href}>
                {link.label}
                {index < legalLinks.length - 1 ? (
                  <span className={styles.legalDivider} aria-hidden="true">
                    /
                  </span>
                ) : null}
              </a>
            ))}
          </nav>
        ) : null}
      </div>
    </footer>
  )
}

export default FooterMegamap
