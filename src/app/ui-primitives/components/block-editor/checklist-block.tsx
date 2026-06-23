"use client"

import { Check, Plus } from "lucide-react"
import { useId, useMemo } from "react"

import { ProgressLinear } from "../primitives"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  ChecklistItem,
  ChecklistPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

type ChecklistBlockProps = BlockPrimitiveProps<ChecklistPayload>

export function ChecklistBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: ChecklistBlockProps) {
  const titleId = useId()
  const isEdit = mode === "edit"
  const { title, items } = data.payload

  const done = useMemo(() => items.filter((item) => item.done).length, [items])
  const ratio = items.length > 0 ? Math.round((done / items.length) * 100) : 0

  const update = (next: Partial<ChecklistPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<ChecklistPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const handleToggle = (id: string): void => {
    update({
      items: items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    })
  }

  const handleAdd = (): void => {
    const id = `i-${items.length + 1}-${Date.now().toString(36)}`
    const nextItem: ChecklistItem = { id, label: "New task", done: false }
    update({ items: [...items, nextItem] })
  }

  const toolbar = (
    <>
      <button type="button" className={styles.toolbarBtn} onClick={handleAdd}>
        <Plus size={12} aria-hidden="true" /> Item
      </button>
    </>
  )

  return (
    <BlockShell
      kind="Checklist"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={titleId}
    >
      <header className={styles.checklistHead}>
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
          aria-label="Checklist title"
        >
          {title}
        </h3>
        <span className={styles.checklistMeter}>
          {done} / {items.length}
        </span>
      </header>
      <ProgressLinear
        value={ratio}
        max={100}
        tone="green"
        variant="solid"
        label={`${ratio}% complete`}
      />
      <ul className={styles.checklist} aria-label={`${items.length} checklist items`}>
        {items.map((item) => (
          <li key={item.id} className={styles.checklistRow}>
            <button
              type="button"
              className={styles.checklistBox}
              role="checkbox"
              aria-checked={item.done}
              aria-label={`Toggle ${item.label}`}
              onClick={() => handleToggle(item.id)}
            >
              {item.done ? <Check size={12} aria-hidden="true" /> : null}
            </button>
            <span
              className={`${styles.checklistLabel} ${
                item.done ? styles.checklistLabelDone : ""
              }`}
            >
              {item.label}
            </span>
          </li>
        ))}
      </ul>
    </BlockShell>
  )
}

export function ChecklistBlockEdit(props: ChecklistBlockProps) {
  return <ChecklistBlock {...props} mode="edit" />
}
