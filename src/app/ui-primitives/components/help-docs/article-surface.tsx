"use client"

import type { ReactNode } from "react"

import styles from "./article-surface.module.css"

export interface ArticleAuthor {
  name: string
  role: string
  avatarInitials: string
}

interface ArticleSurfaceProps {
  title: string
  category?: string
  author: ArticleAuthor
  publishedAt: string
  publishedIso: string
  updatedAt?: string
  updatedIso?: string
  readMinutes: number
  toc?: ReactNode
  children: ReactNode
  onHelpful?: () => void
  onNotHelpful?: () => void
}

export function ArticleSurface({
  title,
  category,
  author,
  publishedAt,
  publishedIso,
  updatedAt,
  updatedIso,
  readMinutes,
  toc,
  children,
  onHelpful,
  onNotHelpful,
}: ArticleSurfaceProps) {
  return (
    <article className={styles.article} aria-labelledby="article-title">
      <header className={styles.head}>
        {category && <span className={styles.kicker}>{category}</span>}
        <h1 id="article-title" className={styles.title}>
          {title}
        </h1>
        <div className={styles.meta}>
          <div className={styles.byline}>
            <span className={styles.avatar} aria-hidden="true">
              {author.avatarInitials}
            </span>
            <div className={styles.bylineCopy}>
              <strong>{author.name}</strong>
              <span>{author.role}</span>
            </div>
          </div>
          <dl className={styles.metaList}>
            <div>
              <dt>Published</dt>
              <dd>
                <time dateTime={publishedIso}>{publishedAt}</time>
              </dd>
            </div>
            {updatedAt && updatedIso && (
              <div>
                <dt>Updated</dt>
                <dd>
                  <time dateTime={updatedIso}>{updatedAt}</time>
                </dd>
              </div>
            )}
            <div>
              <dt>Read</dt>
              <dd>{readMinutes} min</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className={styles.body}>
        {toc && <aside className={styles.aside}>{toc}</aside>}
        <div className={styles.prose}>{children}</div>
      </div>

      <footer className={styles.feedback}>
        <span className={styles.feedbackLabel}>Was this article helpful?</span>
        <div className={styles.feedbackActions}>
          <button type="button" className={styles.feedbackBtn} onClick={onHelpful}>
            Yes, it helped
          </button>
          <button type="button" className={styles.feedbackBtn} onClick={onNotHelpful}>
            No, I need more
          </button>
        </div>
      </footer>
    </article>
  )
}

export default ArticleSurface
