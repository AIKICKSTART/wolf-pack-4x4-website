"use client"

import {
  CircleAlert,
  CircleCheck,
  Info,
  Lightbulb,
  X,
} from "lucide-react"
import { useId, useState } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  CalloutKind,
  CalloutPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const KIND_LABEL: Record<CalloutKind, string> = {
  info: "Info",
  warning: "Warning",
  tip: "Tip",
  danger: "Danger",
}

const KIND_CLASS: Record<CalloutKind, string> = {
  info: styles.calloutInfo,
  warning: styles.calloutWarning,
  tip: styles.calloutTip,
  danger: styles.calloutDanger,
}

const KIND_ICON: Record<CalloutKind, typeof Info> = {
  info: Info,
  warning: CircleAlert,
  tip: Lightbulb,
  danger: CircleCheck,
}

type CalloutBlockProps = BlockPrimitiveProps<CalloutPayload>

export function CalloutBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: CalloutBlockProps) {
  const titleId = useId()
  const [dismissed, setDismissed] = useState(false)
  const isEdit = mode === "edit"
  const { kind, title, body, dismissible } = data.payload
  const Icon = KIND_ICON[kind]

  const update = (next: Partial<CalloutPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<CalloutPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const toolbar = (
    <>
      {(Object.keys(KIND_LABEL) as ReadonlyArray<CalloutKind>).map((id) => (
        <button
          key={id}
          type="button"
          className={`${styles.toolbarBtn} ${
            id === kind ? styles.toolbarBtnActive : ""
          }`}
          aria-pressed={id === kind}
          onClick={() => update({ kind: id })}
        >
          {KIND_LABEL[id]}
        </button>
      ))}
      <button
        type="button"
        className={`${styles.toolbarBtn} ${dismissible ? styles.toolbarBtnActive : ""}`}
        aria-pressed={dismissible}
        onClick={() => update({ dismissible: !dismissible })}
      >
        Dismissible
      </button>
    </>
  )

  if (dismissed && mode !== "edit") {
    return null
  }

  return (
    <BlockShell
      kind="Callout"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={titleId}
    >
      <div
        className={`${styles.callout} ${KIND_CLASS[kind]}`}
        role="note"
        aria-labelledby={titleId}
      >
        <span className={styles.calloutIcon} aria-hidden="true">
          <Icon size={16} />
        </span>
        <div>
          <h4
            className={`${styles.calloutTitle} ${isEdit ? styles.editable : ""} ${
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
            aria-label="Callout title"
          >
            {title}
          </h4>
          <p
            className={`${styles.calloutBody} ${isEdit ? styles.editable : ""} ${
              isEdit ? styles.editableActive : ""
            }`}
            contentEditable={isEdit}
            suppressContentEditableWarning
            onInput={
              isEdit
                ? (event) => update({ body: event.currentTarget.textContent ?? "" })
                : undefined
            }
            role={isEdit ? "textbox" : undefined}
            aria-multiline="true"
            aria-label="Callout body"
          >
            {body}
          </p>
        </div>
        {dismissible ? (
          <button
            type="button"
            className={styles.calloutDismiss}
            aria-label={`Dismiss ${KIND_LABEL[kind]} callout`}
            onClick={() => setDismissed(true)}
          >
            <X size={12} aria-hidden="true" />
          </button>
        ) : null}
      </div>
    </BlockShell>
  )
}

export function CalloutBlockEdit(props: CalloutBlockProps) {
  return <CalloutBlock {...props} mode="edit" />
}
