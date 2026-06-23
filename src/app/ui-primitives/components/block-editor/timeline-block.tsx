"use client"

import { Calendar, Plus } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  BlockTone,
  TimelineEvent,
  TimelinePayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const TONE_CLASS: Record<BlockTone, string> = {
  neutral: styles.toneNeutral,
  teal: styles.toneTeal,
  amber: styles.toneAmber,
  red: styles.toneRed,
  green: styles.toneGreen,
  violet: styles.toneViolet,
}

type TimelineBlockProps = BlockPrimitiveProps<TimelinePayload>

export function TimelineBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: TimelineBlockProps) {
  const titleId = useId()
  const isEdit = mode === "edit"
  const { title, events } = data.payload

  const update = (next: Partial<TimelinePayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<TimelinePayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const handleAdd = (): void => {
    const id = `e-${events.length + 1}-${Date.now().toString(36)}`
    const nextEvent: TimelineEvent = {
      id,
      date: String(new Date().getFullYear()),
      label: "New milestone",
      description: "—",
      granularity: "year",
      tone: "teal",
    }
    update({ events: [...events, nextEvent] })
  }

  const toolbar = (
    <>
      <button type="button" className={styles.toolbarBtn} onClick={handleAdd}>
        <Plus size={12} aria-hidden="true" /> Event
      </button>
      <button type="button" className={styles.toolbarBtn} aria-label="Filter by granularity">
        <Calendar size={12} aria-hidden="true" /> Year · Month · Event
      </button>
    </>
  )

  return (
    <BlockShell
      kind="Timeline"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={titleId}
    >
      <h3
        className={`${styles.checklistTitle} ${isEdit ? styles.editable : ""} ${
          isEdit ? styles.editableActive : ""
        }`}
        id={titleId}
        contentEditable={isEdit}
        suppressContentEditableWarning
        onInput={
          isEdit
            ? (event) => update({ title: event.currentTarget.textContent ?? "" })
            : undefined
        }
        role={isEdit ? "textbox" : undefined}
        aria-label="Timeline title"
      >
        {title}
      </h3>
      <ol className={styles.timeline} aria-label="Timeline events">
        {events.map((event) => (
          <li
            key={event.id}
            className={`${styles.timelineEvent} ${TONE_CLASS[event.tone]}`}
          >
            <span className={styles.timelineDate}>
              {event.date} · {event.granularity}
            </span>
            <p className={styles.timelineLabel}>{event.label}</p>
            <p className={styles.timelineDescription}>{event.description}</p>
          </li>
        ))}
      </ol>
    </BlockShell>
  )
}

export function TimelineBlockEdit(props: TimelineBlockProps) {
  return <TimelineBlock {...props} mode="edit" />
}
