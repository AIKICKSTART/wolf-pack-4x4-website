"use client"

import { useCallback, useState } from "react"

import type {
  ShareChannel,
  SharePermission,
  SharePermissionEntry,
} from "./reports-deep-types"
import styles from "./share-report-card.module.css"

interface ShareReportCardProps {
  readonly title: string
  readonly publicUrl: string
  readonly embedSnippet: string
  readonly entries: ReadonlyArray<SharePermissionEntry>
  readonly initialChannel?: ShareChannel
  readonly initialPermission?: SharePermission
  readonly className?: string
}

const CHANNEL_LABEL: Record<ShareChannel, string> = {
  link: "Public link",
  embed: "Embed iframe",
  email: "Email recipients",
  slack: "Slack channel",
}

const CHANNEL_GLYPH: Record<ShareChannel, string> = {
  link: "↗",
  embed: "</>",
  email: "@",
  slack: "#",
}

const PERMISSION_LABEL: Record<SharePermission, string> = {
  view: "Can view",
  comment: "Can comment",
  edit: "Can edit",
  admin: "Admin",
}

const PERMISSION_CLASS: Record<SharePermission, string> = {
  view: styles.permView,
  comment: styles.permComment,
  edit: styles.permEdit,
  admin: styles.permAdmin,
}

export function ShareReportCard({
  title,
  publicUrl,
  embedSnippet,
  entries,
  initialChannel = "link",
  initialPermission = "view",
  className,
}: ShareReportCardProps) {
  const [channel, setChannel] = useState<ShareChannel>(initialChannel)
  const [permission, setPermission] = useState<SharePermission>(initialPermission)
  const [copied, setCopied] = useState<boolean>(false)

  const handleSelectChannel = useCallback((next: ShareChannel) => () => {
    setChannel(next)
  }, [])

  const handleSelectPermission = useCallback((next: SharePermission) => () => {
    setPermission(next)
  }, [])

  const handleCopy = useCallback(() => {
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }, [])

  const channels: ReadonlyArray<ShareChannel> = ["link", "embed", "email", "slack"]
  const permissions: ReadonlyArray<SharePermission> = ["view", "comment", "edit", "admin"]

  const classes = [styles.card, className].filter(Boolean).join(" ")

  return (
    <article className={classes} aria-label={`Share: ${title}`}>
      <header className={styles.head}>
        <span className={styles.kicker}>Share report</span>
        <h3 className={styles.title}>{title}</h3>
      </header>

      <div className={styles.channels} role="tablist" aria-label="Share channel">
        {channels.map((entry) => (
          <button
            key={entry}
            type="button"
            role="tab"
            aria-selected={channel === entry}
            className={`${styles.channelBtn} ${channel === entry ? styles.channelActive : ""}`.trim()}
            onClick={handleSelectChannel(entry)}
          >
            <span aria-hidden="true" className={styles.channelGlyph}>
              {CHANNEL_GLYPH[entry]}
            </span>
            {CHANNEL_LABEL[entry]}
          </button>
        ))}
      </div>

      <div className={styles.payload} role="tabpanel">
        {channel === "link" ? (
          <div className={styles.linkRow}>
            <code className={styles.linkValue} aria-label="Public URL">
              {publicUrl}
            </code>
            <button type="button" className={styles.copyBtn} onClick={handleCopy}>
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        ) : channel === "embed" ? (
          <div className={styles.embedRow}>
            <pre className={styles.embedSnippet} aria-label="Embed code">
              {embedSnippet}
            </pre>
            <button type="button" className={styles.copyBtn} onClick={handleCopy}>
              {copied ? "Copied ✓" : "Copy"}
            </button>
          </div>
        ) : channel === "email" ? (
          <div className={styles.emailRow}>
            <label className={styles.emailLabel}>
              <span>Recipients</span>
              <input
                type="email"
                multiple
                placeholder="ops@oakflats-mufflermen.com.au, finance@…"
                className={styles.emailInput}
                aria-label="Email recipients"
              />
            </label>
            <button type="button" className={styles.copyBtn}>
              Send
            </button>
          </div>
        ) : (
          <div className={styles.slackRow}>
            <label className={styles.emailLabel}>
              <span>Slack channel</span>
              <input
                type="text"
                placeholder="#workshop-ops"
                className={styles.emailInput}
                aria-label="Slack channel"
              />
            </label>
            <button type="button" className={styles.copyBtn}>
              Post
            </button>
          </div>
        )}
      </div>

      <div className={styles.permissions}>
        <span className={styles.sectionLabel}>Default permission</span>
        <div className={styles.permPicker} role="radiogroup" aria-label="Default permission">
          {permissions.map((entry) => (
            <button
              key={entry}
              type="button"
              role="radio"
              aria-checked={permission === entry}
              className={`${styles.permBtn} ${permission === entry ? styles.permBtnActive : ""}`.trim()}
              onClick={handleSelectPermission(entry)}
            >
              {PERMISSION_LABEL[entry]}
            </button>
          ))}
        </div>
      </div>

      <div className={styles.access}>
        <span className={styles.sectionLabel}>Access list</span>
        <ul className={styles.accessList}>
          {entries.map((entry) => (
            <li key={entry.id} className={styles.accessRow}>
              <span className={styles.accessName}>{entry.label}</span>
              <span
                className={`${styles.permChip} ${PERMISSION_CLASS[entry.permission]}`}
              >
                {PERMISSION_LABEL[entry.permission]}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </article>
  )
}

export default ShareReportCard
