"use client"

import { useState } from "react"

import { Avatar } from "../primitives/avatar"
import type { ActivityVerb } from "./crm-types"
import styles from "./crm-activity-row.module.css"

interface CrmActivityRowProps {
  id: string
  actorName: string
  actorAvatarSrc?: string
  verb: ActivityVerb
  summary: string
  timestamp: string
  timestampIso?: string
  durationMinutes?: number
  transcript?: string
  className?: string
}

const VERB_LABEL: Record<ActivityVerb, string> = {
  called: "Called",
  emailed: "Emailed",
  met: "Met",
  noted: "Noted",
  quoted: "Quoted",
  booked: "Booked",
}

const VERB_GLYPH: Record<ActivityVerb, string> = {
  called: "☎",
  emailed: "✉",
  met: "⚑",
  noted: "✎",
  quoted: "$",
  booked: "▣",
}

function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes}m`
  }
  const hours = Math.floor(minutes / 60)
  const rest = minutes % 60
  return rest === 0 ? `${hours}h` : `${hours}h ${rest}m`
}

export function CrmActivityRow({
  id,
  actorName,
  actorAvatarSrc,
  verb,
  summary,
  timestamp,
  timestampIso,
  durationMinutes,
  transcript,
  className,
}: CrmActivityRowProps) {
  const [expanded, setExpanded] = useState(false)
  const classes = [styles.row, className].filter(Boolean).join(" ")
  const canExpand = Boolean(transcript)

  return (
    <article
      className={classes}
      data-activity-id={id}
      data-verb={verb}
      data-expanded={expanded ? "true" : "false"}
      aria-label={`${actorName} ${VERB_LABEL[verb].toLowerCase()}: ${summary}`}
    >
      <Avatar name={actorName} src={actorAvatarSrc} size="sm" tone="obsidian" />

      <div className={styles.body}>
        <div className={styles.head}>
          <span className={styles.actor}>{actorName}</span>
          <span className={styles.verb} data-verb={verb}>
            <span aria-hidden="true">{VERB_GLYPH[verb]}</span>
            <span>{VERB_LABEL[verb]}</span>
          </span>
          {durationMinutes !== undefined ? (
            <span className={styles.duration}>{formatDuration(durationMinutes)}</span>
          ) : null}
          <time className={styles.timestamp} dateTime={timestampIso ?? timestamp}>
            {timestamp}
          </time>
        </div>

        <p className={styles.summary}>{summary}</p>

        {expanded && transcript ? (
          <p className={styles.transcript}>{transcript}</p>
        ) : null}
      </div>

      {canExpand ? (
        <button
          type="button"
          className={styles.toggle}
          onClick={() => setExpanded((prev) => !prev)}
          aria-expanded={expanded}
          aria-controls={`transcript-${id}`}
        >
          {expanded ? "Hide" : "Expand"}
        </button>
      ) : null}
    </article>
  )
}

export default CrmActivityRow
