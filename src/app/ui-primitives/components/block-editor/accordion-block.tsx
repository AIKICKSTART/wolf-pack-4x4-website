"use client"

import { ChevronDown, Expand, Minus } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  AccordionEntry,
  AccordionPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

type AccordionBlockProps = BlockPrimitiveProps<AccordionPayload>

export function AccordionBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: AccordionBlockProps) {
  const titleId = useId()
  const isEdit = mode === "edit"
  const { title, entries } = data.payload

  const update = (next: Partial<AccordionPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<AccordionPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const handleToggle = (id: string): void => {
    update({
      entries: entries.map((entry) =>
        entry.id === id ? { ...entry, open: !entry.open } : entry,
      ),
    })
  }

  const setAll = (open: boolean): void => {
    update({ entries: entries.map((entry: AccordionEntry) => ({ ...entry, open })) })
  }

  const toolbar = (
    <>
      <button type="button" className={styles.toolbarBtn} onClick={() => setAll(true)}>
        <Expand size={12} aria-hidden="true" /> Expand all
      </button>
      <button type="button" className={styles.toolbarBtn} onClick={() => setAll(false)}>
        <Minus size={12} aria-hidden="true" /> Collapse all
      </button>
    </>
  )

  return (
    <BlockShell
      kind="Accordion"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={titleId}
    >
      <header className={styles.accordionHead}>
        <h3
          className={`${styles.accordionTitle} ${isEdit ? styles.editable : ""} ${
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
          aria-label="Accordion title"
        >
          {title}
        </h3>
      </header>
      <div
        className={styles.accordion}
        role="region"
        aria-label={`${title} accordion`}
      >
        {entries.map((entry) => (
          <article
            key={entry.id}
            className={`${styles.accordionItem} ${
              entry.open ? styles.accordionItemOpen : ""
            }`}
          >
            <button
              type="button"
              className={styles.accordionToggle}
              aria-expanded={entry.open}
              aria-controls={`${entry.id}-body`}
              onClick={() => handleToggle(entry.id)}
            >
              <span>{entry.question}</span>
              <ChevronDown
                className={styles.accordionChevron}
                size={16}
                aria-hidden="true"
              />
            </button>
            <div
              id={`${entry.id}-body`}
              className={styles.accordionBody}
              hidden={!entry.open}
            >
              {entry.answer}
            </div>
          </article>
        ))}
      </div>
    </BlockShell>
  )
}

export function AccordionBlockEdit(props: AccordionBlockProps) {
  return <AccordionBlock {...props} mode="edit" />
}
