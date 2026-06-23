"use client"

import styles from "./share-recording-modal.module.css"

import type { SharePrivacy } from "./screen-recorder-types"

interface ShareRecordingModalProps {
  /** Recording title shown in modal head. */
  recordingTitle: string
  /** Generated share URL. */
  shareUrl: string
  /** Embed snippet shown in the code block. */
  embedSnippet?: string
  /** Privacy setting controlled by the parent. */
  privacy: SharePrivacy
  /** Pre-filled email list (comma separated). */
  emailRecipients?: string
  /** Expiry date in ISO format (yyyy-mm-dd). */
  expiryDate?: string
  /** Optional copy callback. */
  onCopyUrl?: () => void
  /** Privacy change handler. */
  onPrivacyChange?: (next: SharePrivacy) => void
  /** Email field handler. */
  onEmailChange?: (next: string) => void
  /** Expiry field handler. */
  onExpiryChange?: (next: string) => void
  /** Modal close handler. */
  onClose?: () => void
  /** Modal heading id used for dialog labelling. */
  headingId?: string
}

const PRIVACY_OPTIONS: ReadonlyArray<{ key: SharePrivacy; label: string; copy: string }> = [
  { key: "private", label: "Private", copy: "Only Mufflermen staff with the link" },
  { key: "team", label: "Workshop team", copy: "Anyone signed into Oak Flats Mufflermen" },
  { key: "public-link", label: "Public link", copy: "Anyone with the URL — careful out there" },
]

export function ShareRecordingModal({
  recordingTitle,
  shareUrl,
  embedSnippet,
  privacy,
  emailRecipients = "",
  expiryDate = "2026-06-30",
  onCopyUrl,
  onPrivacyChange,
  onEmailChange,
  onExpiryChange,
  onClose,
  headingId = "share-recording-heading",
}: ShareRecordingModalProps) {
  const snippet = embedSnippet ?? `<iframe src="${shareUrl}" allow="autoplay; fullscreen" frameborder="0"></iframe>`

  return (
    <div className={styles.scrim}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby={headingId}
      >
        <header className={styles.head}>
          <div>
            <span className={styles.kicker}>Share recording</span>
            <h2 id={headingId} className={styles.title}>{recordingTitle}</h2>
          </div>
          <button
            type="button"
            className={styles.close}
            onClick={onClose}
            aria-label="Close share dialog"
          >
            <span aria-hidden="true">×</span>
          </button>
        </header>

        <div className={styles.body}>
          <div className={styles.urlRow}>
            <span className={styles.urlLabel}>Share URL</span>
            <div className={styles.urlChip}>
              <span className={styles.urlValue}>{shareUrl}</span>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={onCopyUrl}
                aria-label="Copy share URL"
              >
                <span aria-hidden="true">⧉</span> Copy
              </button>
            </div>
          </div>

          <fieldset className={styles.privacy}>
            <legend className={styles.fieldLabel}>Who can view</legend>
            {PRIVACY_OPTIONS.map((option) => {
              const selected = option.key === privacy
              return (
                <label
                  key={option.key}
                  className={[styles.radio, selected ? styles.radioSelected : ""].join(" ")}
                >
                  <input
                    type="radio"
                    name="share-privacy"
                    value={option.key}
                    checked={selected}
                    onChange={() => onPrivacyChange?.(option.key)}
                    className={styles.radioInput}
                  />
                  <span className={styles.radioDot} aria-hidden="true" />
                  <span className={styles.radioCopy}>
                    <span className={styles.radioLabel}>{option.label}</span>
                    <span className={styles.radioHint}>{option.copy}</span>
                  </span>
                </label>
              )
            })}
          </fieldset>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Send to team</span>
            <input
              type="text"
              className={styles.input}
              placeholder="brodie@mufflermen.com.au, kelsey@mufflermen.com.au"
              value={emailRecipients}
              onChange={(event) => onEmailChange?.(event.target.value)}
            />
          </label>

          <div className={styles.embedRow}>
            <span className={styles.fieldLabel}>Embed code</span>
            <pre className={styles.codeBlock}>
              <code>{snippet}</code>
            </pre>
          </div>

          <label className={styles.field}>
            <span className={styles.fieldLabel}>Link expires</span>
            <input
              type="date"
              className={styles.input}
              value={expiryDate}
              onChange={(event) => onExpiryChange?.(event.target.value)}
            />
          </label>
        </div>

        <footer className={styles.foot}>
          <button type="button" className={styles.cancelBtn} onClick={onClose}>
            Cancel
          </button>
          <button type="button" className={styles.shareBtn}>
            Share now
          </button>
        </footer>
      </div>
    </div>
  )
}
