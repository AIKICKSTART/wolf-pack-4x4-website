import Image from "next/image"

import {
  CompassRoseIcon,
  EnvelopeTrailIcon,
  ExhaustPipeIcon,
  MufflerIcon,
  PhoneRingIcon,
  ShieldTickIcon,
  SpannerIcon,
} from "../../icons"
import { Reveal } from "../../motion/reveal"
import type {
  ChromeBrandConfig,
  ChromeContactDetail,
  ChromeNavItem,
  ChromeSocialLink,
} from "../chrome-types"

import styles from "./footer-megamap-grand.module.css"

export interface FooterMegamapGrandColumn {
  id: string
  heading: string
  links: ReadonlyArray<ChromeNavItem>
}

export interface FooterMegamapGrandProps {
  brand: ChromeBrandConfig
  tagline: string
  columns: ReadonlyArray<FooterMegamapGrandColumn>
  newsletter: {
    heading: string
    description: string
    inputPlaceholder: string
    submitLabel: string
  }
  socials: ReadonlyArray<ChromeSocialLink>
  contact: ReadonlyArray<ChromeContactDetail>
  legal: string
  legalLinks: ReadonlyArray<ChromeNavItem>
  className?: string
}

export function FooterMegamapGrand({
  brand,
  tagline,
  columns,
  newsletter,
  socials,
  contact,
  legal,
  legalLinks,
  className,
}: FooterMegamapGrandProps) {
  const classes = [styles.footer, className].filter(Boolean).join(" ")

  return (
    <footer role="contentinfo" aria-label="Site footer" className={classes}>
      <Reveal as="div" from="below" distance={18}>
        <div className={styles.brandStrip}>
          <div className={styles.brandLockup}>
            <Image
              src={brand.logoSrc}
              alt={brand.logoAlt}
              width={64}
              height={64}
              className={styles.brandImg}
            />
            <div>
              <strong className={styles.brandWordmark}>{brand.wordmark}</strong>
              <span className={styles.brandTagline}>{tagline}</span>
            </div>
          </div>

          <form className={styles.newsletter} aria-label="Newsletter signup">
            <h3>{newsletter.heading}</h3>
            <p>{newsletter.description}</p>
            <div className={styles.newsletterRow}>
              <input
                type="email"
                className={styles.newsletterInput}
                placeholder={newsletter.inputPlaceholder}
                aria-label="Email address"
                required
              />
              <button type="submit" className={styles.newsletterBtn}>
                <EnvelopeTrailIcon size={14} tone="currentColor" />
                {newsletter.submitLabel}
              </button>
            </div>
          </form>
        </div>
      </Reveal>

      <nav className={styles.sitemap} aria-label="Sitemap">
        {columns.map((column) => (
          <div key={column.id} className={styles.col}>
            <h4>{column.heading}</h4>
            <ul>
              {column.links.map((link) => (
                <li key={link.id}>
                  <a href={link.href}>
                    <SpannerIcon size={12} tone="currentColor" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className={styles.socialRow}>
        <ul className={styles.socialList}>
          {socials.map((social) => {
            const Icon = SOCIAL_ICON[social.id] ?? MufflerIcon
            return (
              <li key={social.id}>
                <a href={social.href} className={styles.socialBtn} aria-label={social.label}>
                  <Icon size={18} tone="currentColor" />
                </a>
              </li>
            )
          })}
        </ul>

        <div className={styles.contactRow}>
          {contact.map((detail) => (
            <div key={detail.label}>
              <span>{detail.label}</span>
              {detail.href ? (
                <strong>
                  <a href={detail.href}>{detail.value}</a>
                </strong>
              ) : (
                <strong>{detail.value}</strong>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.legalRow}>
        <small>{legal}</small>
        <nav aria-label="Legal">
          {legalLinks.map((link) => (
            <a key={link.id} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  )
}

const SOCIAL_ICON: Record<string, typeof MufflerIcon> = {
  about: CompassRoseIcon,
  exhaust: ExhaustPipeIcon,
  shield: ShieldTickIcon,
  phone: PhoneRingIcon,
}

export default FooterMegamapGrand
