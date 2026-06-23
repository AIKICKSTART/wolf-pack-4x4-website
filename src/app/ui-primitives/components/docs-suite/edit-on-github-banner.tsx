import type { DocsCommitInfo } from "./docs-suite-types"

import styles from "./edit-on-github-banner.module.css"

interface EditOnGithubBannerProps {
  repo: string
  editHref: string
  commit: DocsCommitInfo
  ctaLabel?: string
}

export function EditOnGithubBanner({
  repo,
  editHref,
  commit,
  ctaLabel = "Edit on GitHub",
}: EditOnGithubBannerProps) {
  return (
    <aside className={styles.banner} aria-label="Edit this page on GitHub">
      <div className={styles.body}>
        <span className={styles.lead}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M12 2C6.48 2 2 6.58 2 12.25c0 4.53 2.87 8.37 6.84 9.72.5.1.68-.22.68-.49l-.01-1.71c-2.78.62-3.37-1.36-3.37-1.36-.45-1.18-1.11-1.49-1.11-1.49-.9-.63.07-.62.07-.62 1 .07 1.53 1.05 1.53 1.05.89 1.56 2.34 1.11 2.91.85.09-.66.35-1.11.63-1.37-2.22-.26-4.56-1.14-4.56-5.07 0-1.12.39-2.04 1.03-2.76-.1-.26-.45-1.3.1-2.71 0 0 .84-.28 2.75 1.05a9.4 9.4 0 0 1 2.5-.35c.85 0 1.7.12 2.5.35 1.91-1.33 2.75-1.05 2.75-1.05.55 1.41.2 2.45.1 2.71.64.72 1.03 1.64 1.03 2.76 0 3.94-2.35 4.81-4.59 5.06.36.32.68.94.68 1.9l-.01 2.81c0 .27.18.6.69.49C19.13 20.62 22 16.77 22 12.25 22 6.58 17.52 2 12 2z" />
          </svg>
          GitHub source
        </span>
        <div className={styles.commit}>
          <span className={styles.repo}>{repo}</span>
          <span className={styles.sha} aria-label={`Commit ${commit.sha}`}>
            {commit.sha.slice(0, 7)}
          </span>
          <span className={styles.author}>
            <span className={styles.avatar} aria-hidden="true">
              {commit.authorInitials}
            </span>
            {commit.authorName}
          </span>
          <span className={styles.time}>
            <time dateTime={commit.committedIso}>{commit.committedAt}</time>
          </span>
        </div>
        <p className={styles.message}>{commit.message}</p>
      </div>
      <a
        className={styles.cta}
        href={editHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`${ctaLabel} — opens GitHub in a new tab`}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
          <path d="M4 20h4l10-10-4-4L4 16z" strokeLinejoin="round" />
          <path d="M14 6 18 10" strokeLinecap="round" />
        </svg>
        {ctaLabel}
      </a>
    </aside>
  )
}

export default EditOnGithubBanner
