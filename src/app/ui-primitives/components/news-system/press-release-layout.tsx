import { AtSign, Phone } from "lucide-react"

import { formatAbsoluteDate, type PressReleaseSection } from "./news-types"

import styles from "./press-release-layout.module.css"

export interface PressReleaseContact {
  name: string
  role: string
  email: string
  phone: string
}

export interface PressReleaseLayoutProps {
  dateline: string
  location: string
  title: string
  standfirst: string
  sections: ReadonlyArray<PressReleaseSection>
  contact: PressReleaseContact
  label?: string
  className?: string
}

export function PressReleaseLayout({
  dateline,
  location,
  title,
  standfirst,
  sections,
  contact,
  label = "Press release",
  className,
}: PressReleaseLayoutProps) {
  const classes = [styles.release, className].filter(Boolean).join(" ")

  return (
    <article className={classes}>
      <header className={styles.header}>
        <span className={styles.label}>{label}</span>
        <p className={styles.dateline}>
          <span className={styles.location}>{location}</span>
          <span className={styles.datelineDot} aria-hidden="true">
            —
          </span>
          <time dateTime={dateline}>For immediate release · {formatAbsoluteDate(dateline)}</time>
        </p>
        <h2 className={styles.title}>{title}</h2>
        <p className={styles.standfirst}>{standfirst}</p>
      </header>

      <div className={styles.body}>
        {sections.map((section) => (
          <section key={section.heading} className={styles.section}>
            <h3 className={styles.sectionHeading}>{section.heading}</h3>
            {section.body.map((paragraph, idx) => (
              <p key={idx} className={styles.paragraph}>
                {paragraph}
              </p>
            ))}
          </section>
        ))}
      </div>

      <footer className={styles.footer}>
        <span className={styles.footerTitle}>Media contact</span>
        <div className={styles.contact}>
          <span className={styles.contactName}>{contact.name}</span>
          <span className={styles.contactRole}>{contact.role}</span>
        </div>
        <div className={styles.contactLinks}>
          <a className={styles.contactLink} href={`mailto:${contact.email}`}>
            <AtSign size={14} strokeWidth={2.2} aria-hidden="true" />
            {contact.email}
          </a>
          <a className={styles.contactLink} href={`tel:${contact.phone.replace(/[^\d+]/g, "")}`}>
            <Phone size={14} strokeWidth={2.2} aria-hidden="true" />
            {contact.phone}
          </a>
        </div>
        <span className={styles.ends} aria-hidden="true">
          # # #
        </span>
      </footer>
    </article>
  )
}

export default PressReleaseLayout
