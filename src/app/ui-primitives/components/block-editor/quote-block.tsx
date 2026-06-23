"use client"

import { Quote, User } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  QuotePayload,
  QuoteVariant,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const VARIANT_LABEL: Record<QuoteVariant, string> = {
  plain: "Plain",
  image: "With image",
}

type QuoteBlockProps = BlockPrimitiveProps<QuotePayload>

export function QuoteBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: QuoteBlockProps) {
  const quoteId = useId()
  const { variant, text, author, citation, imageAlt } = data.payload
  const isEdit = mode === "edit"
  const initials = author
    .split(" ")
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase()

  const update = (next: Partial<QuotePayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<QuotePayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const toolbar = (
    <>
      {(Object.keys(VARIANT_LABEL) as ReadonlyArray<QuoteVariant>).map((id) => (
        <button
          key={id}
          type="button"
          className={`${styles.toolbarBtn} ${
            id === variant ? styles.toolbarBtnActive : ""
          }`}
          aria-pressed={id === variant}
          onClick={() => update({ variant: id })}
        >
          {id === "plain" ? (
            <Quote size={12} aria-hidden="true" />
          ) : (
            <User size={12} aria-hidden="true" />
          )}
          {VARIANT_LABEL[id]}
        </button>
      ))}
      <input
        type="text"
        className={styles.toolbarInput}
        value={citation ?? ""}
        onChange={(event) => update({ citation: event.target.value })}
        placeholder="Citation"
        aria-label="Citation"
      />
    </>
  )

  return (
    <BlockShell
      kind="Quote"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={quoteId}
    >
      <figure
        className={`${styles.quoteBody} ${
          variant === "image" ? styles.quoteBodyImage : ""
        }`}
      >
        {variant === "image" ? (
          <div
            className={styles.quoteImage}
            role="img"
            aria-label={imageAlt ?? `${author} portrait`}
          >
            {initials || <User size={28} aria-hidden="true" />}
          </div>
        ) : null}
        <div>
          <blockquote
            className={`${styles.quoteText} ${isEdit ? styles.editable : ""} ${
              isEdit ? styles.editableActive : ""
            }`}
            id={quoteId}
            contentEditable={isEdit}
            suppressContentEditableWarning
            onInput={
              isEdit
                ? (event) => update({ text: event.currentTarget.textContent ?? "" })
                : undefined
            }
            role={isEdit ? "textbox" : undefined}
            aria-multiline="true"
            aria-label="Quote text"
            spellCheck={isEdit}
          >
            “{text}”
          </blockquote>
          <figcaption className={styles.quoteAuthor}>
            <span className={styles.quoteAuthorName}>{author}</span>
            {citation ? <>· {citation}</> : null}
          </figcaption>
        </div>
      </figure>
    </BlockShell>
  )
}

export function QuoteBlockEdit(props: QuoteBlockProps) {
  return <QuoteBlock {...props} mode="edit" />
}
