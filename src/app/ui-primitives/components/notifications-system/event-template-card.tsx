"use client"

import { Eye, FileText, Hash } from "lucide-react"
import { useId, useState } from "react"

import type {
  EventTemplateValue,
  NotificationChannelId,
} from "./notifications-system-types"
import styles from "./notifications-system.module.css"

interface EventTemplateCardProps {
  initialValue: EventTemplateValue
  eventLabel: string
  channelLabel: string
  onChange?: (value: EventTemplateValue) => void
  onPreview?: (value: EventTemplateValue) => void
  className?: string
}

const CHANNEL_HAS_SUBJECT: Record<NotificationChannelId, boolean> = {
  "in-app": true,
  email: true,
  sms: false,
  "push-web": true,
  "push-mobile": true,
}

export function EventTemplateCard({
  initialValue,
  eventLabel,
  channelLabel,
  onChange,
  onPreview,
  className,
}: EventTemplateCardProps) {
  const [value, setValue] = useState<EventTemplateValue>(initialValue)
  const subjectId = useId()
  const bodyId = useId()

  const update = (next: Partial<EventTemplateValue>) => {
    const merged: EventTemplateValue = { ...value, ...next }
    setValue(merged)
    onChange?.(merged)
  }

  const insertTag = (tag: string) => {
    update({ body: `${value.body}{{${tag}}}` })
  }

  const showSubject = CHANNEL_HAS_SUBJECT[value.channel]

  const classes = [styles.templateCard, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={`${eventLabel} template`}>
      <header className={styles.templateHead}>
        <span className={styles.templateIcon} aria-hidden="true">
          <FileText size={14} strokeWidth={2.4} />
        </span>
        <div className={styles.templateTitleWrap}>
          <p className={styles.templateKicker}>Template</p>
          <h3 className={styles.templateTitle}>
            {eventLabel}
            <span className={styles.templateChannel}>· {channelLabel}</span>
          </h3>
        </div>
        {onPreview && (
          <button
            type="button"
            className={styles.templatePreview}
            onClick={() => onPreview(value)}
            aria-label="Preview template"
          >
            <Eye size={13} strokeWidth={2.4} aria-hidden="true" />
            Preview
          </button>
        )}
      </header>

      {showSubject && (
        <div className={styles.templateField}>
          <label className={styles.templateFieldLabel} htmlFor={subjectId}>
            Subject line
          </label>
          <input
            id={subjectId}
            type="text"
            className={styles.templateInput}
            value={value.subject}
            onChange={(event) => update({ subject: event.target.value })}
          />
        </div>
      )}

      <div className={styles.templateField}>
        <label className={styles.templateFieldLabel} htmlFor={bodyId}>
          Message body
        </label>
        <textarea
          id={bodyId}
          rows={4}
          className={styles.templateTextarea}
          value={value.body}
          onChange={(event) => update({ body: event.target.value })}
        />
      </div>

      <div className={styles.templateTagRow}>
        <span className={styles.templateTagLabel}>Merge tags</span>
        <div className={styles.templateTags}>
          {value.mergeTags.map((tag) => (
            <button
              key={tag}
              type="button"
              className={styles.templateTag}
              onClick={() => insertTag(tag)}
              aria-label={`Insert merge tag ${tag}`}
            >
              <Hash size={10} strokeWidth={2.4} aria-hidden="true" />
              <span>{tag}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}

export default EventTemplateCard
