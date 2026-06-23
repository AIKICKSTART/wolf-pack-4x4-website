import type { ReactNode } from "react"

import styles from "./brand-guidelines-page-template.module.css"

export interface BrandGuidelinesSection {
  id: string
  number: string
  title: string
  description: string
  content: ReactNode
}

export interface BrandGuidelinesPageTemplateProps {
  workmark: string
  tagline: string
  versionLabel: string
  intro: string
  sections: ReadonlyArray<BrandGuidelinesSection>
}

export function BrandGuidelinesPageTemplate({
  workmark,
  tagline,
  versionLabel,
  intro,
  sections,
}: BrandGuidelinesPageTemplateProps) {
  return (
    <article className={styles.book}>
      <header className={styles.cover}>
        <span className={styles.coverKicker}>{versionLabel}</span>
        <h1 className={styles.coverTitle}>{workmark}</h1>
        <p className={styles.coverTagline}>{tagline}</p>
        <p className={styles.intro}>{intro}</p>
      </header>

      <nav className={styles.toc} aria-label="Table of contents">
        <span className={styles.tocLabel}>Inside this guide</span>
        <ol className={styles.tocList}>
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <span>{section.number}</span>
                {section.title}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={styles.chapter}
          aria-labelledby={`${section.id}-title`}
        >
          <header className={styles.chapterHead}>
            <span className={styles.chapterNumber}>{section.number}</span>
            <div>
              <h2 id={`${section.id}-title`} className={styles.chapterTitle}>
                {section.title}
              </h2>
              <p className={styles.chapterDescription}>{section.description}</p>
            </div>
          </header>
          <div className={styles.chapterBody}>{section.content}</div>
        </section>
      ))}

      <footer className={styles.colophon}>
        <span>Guideline owner</span>
        <strong>Oak Flats Mufflermen Workshop · Brand &amp; Identity</strong>
        <span>Document {versionLabel}</span>
      </footer>
    </article>
  )
}
