"use client"

import { Bell } from "lucide-react"

import { EmailDigestPreview } from "./email-digest-preview"
import { PushNotificationPreview } from "./push-notification-preview"
import styles from "./notification-preview-modal.module.css"

export interface NotificationPreviewModalContent {
  emailSenderName: string
  emailSenderEmail?: string
  emailSubject: string
  emailPreheader?: string
  emailExcerpt: string
  emailTimestamp: string

  smsFrom: string
  smsBody: string

  pushAppName: string
  pushTitle: string
  pushBody: string
  pushTimestamp: string

  inappTitle: string
  inappTimestamp: string
}

interface NotificationPreviewModalProps {
  content: NotificationPreviewModalContent
  kicker?: string
  title?: string
  subtitle?: string
  className?: string
}

export function NotificationPreviewModal({
  content,
  kicker = "Channel preview",
  title = "Preview across channels",
  subtitle = "Here's how this notification appears in each delivery channel.",
  className,
}: NotificationPreviewModalProps) {
  const classes = [styles.modal, className].filter(Boolean).join(" ")

  return (
    <section className={classes} role="dialog" aria-labelledby="preview-modal-title">
      <header className={styles.header}>
        <span className={styles.kicker}>{kicker}</span>
        <h2 id="preview-modal-title" className={styles.title}>
          {title}
        </h2>
        <p className={styles.subtitle}>{subtitle}</p>
      </header>

      <div className={styles.grid}>
        <div className={styles.channel}>
          <div className={styles.channelHead}>
            <span className={styles.channelLabel}>Email</span>
            <span className={styles.channelTag} data-tone="email">
              Inbox
            </span>
          </div>
          <EmailDigestPreview
            senderName={content.emailSenderName}
            senderEmail={content.emailSenderEmail}
            subject={content.emailSubject}
            preheader={content.emailPreheader}
            excerpt={content.emailExcerpt}
            timestamp={content.emailTimestamp}
            unread
          />
        </div>

        <div className={styles.channel}>
          <div className={styles.channelHead}>
            <span className={styles.channelLabel}>SMS</span>
            <span className={styles.channelTag} data-tone="sms">
              160-char
            </span>
          </div>
          <div className={styles.smsPreview}>
            <span className={styles.smsAvatar} aria-hidden="true">
              SMS
            </span>
            <div className={styles.smsBody}>
              <span className={styles.smsFrom}>{content.smsFrom}</span>
              <p className={styles.smsText}>{content.smsBody}</p>
            </div>
          </div>
        </div>

        <div className={styles.channel}>
          <div className={styles.channelHead}>
            <span className={styles.channelLabel}>Push</span>
            <span className={styles.channelTag} data-tone="push">
              iOS / Android
            </span>
          </div>
          <PushNotificationPreview
            showToneSelector={false}
            content={{
              appName: content.pushAppName,
              title: content.pushTitle,
              body: content.pushBody,
              timestamp: content.pushTimestamp,
            }}
          />
        </div>

        <div className={styles.channel}>
          <div className={styles.channelHead}>
            <span className={styles.channelLabel}>In-app</span>
            <span className={styles.channelTag} data-tone="inapp">
              Toast
            </span>
          </div>
          <div className={styles.inappPreview}>
            <span className={styles.inappIcon} aria-hidden="true">
              <Bell size={16} strokeWidth={2.2} />
            </span>
            <div className={styles.inappBody}>
              <p>{content.inappTitle}</p>
              <small>{content.inappTimestamp}</small>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NotificationPreviewModal
