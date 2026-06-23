"use client"

import { Rocket } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  BlockTone,
  CtaPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const TONE_LABEL: Record<BlockTone, string> = {
  neutral: "Neutral",
  teal: "Teal",
  amber: "Amber",
  red: "Red",
  green: "Green",
  violet: "Violet",
}

const TONE_CLASS: Record<BlockTone, string> = {
  neutral: styles.toneNeutral,
  teal: styles.toneTeal,
  amber: styles.toneAmber,
  red: styles.toneRed,
  green: styles.toneGreen,
  violet: styles.toneViolet,
}

type CtaBlockProps = BlockPrimitiveProps<CtaPayload>

export function CtaBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: CtaBlockProps) {
  const headingId = useId()
  const isEdit = mode === "edit"
  const { heading, body, buttonLabel, buttonHref, tone, backgroundImageUrl } = data.payload

  const update = (next: Partial<CtaPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<CtaPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const toolbar = (
    <>
      <select
        className={styles.toolbarSelect}
        value={tone}
        onChange={(event) => update({ tone: event.target.value as BlockTone })}
        aria-label="CTA accent tone"
      >
        {(Object.keys(TONE_LABEL) as ReadonlyArray<BlockTone>).map((id) => (
          <option key={id} value={id}>
            {TONE_LABEL[id]}
          </option>
        ))}
      </select>
      <input
        type="text"
        className={styles.toolbarInput}
        value={buttonHref}
        onChange={(event) => update({ buttonHref: event.target.value })}
        placeholder="https://"
        aria-label="Button URL"
      />
      <input
        type="text"
        className={styles.toolbarInput}
        value={buttonLabel}
        onChange={(event) => update({ buttonLabel: event.target.value })}
        placeholder="Button label"
        aria-label="Button label"
      />
    </>
  )

  return (
    <BlockShell
      kind="Call to action"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={headingId}
    >
      <div
        className={`${styles.cta} ${TONE_CLASS[tone]}`}
        role="region"
        aria-labelledby={headingId}
        style={
          backgroundImageUrl
            ? {
                backgroundImage:
                  "linear-gradient(135deg, color-mix(in oklab, var(--primitive-canvas) 55%, transparent), color-mix(in oklab, var(--primitive-canvas) 20%, transparent))",
              }
            : undefined
        }
      >
        <h3
          className={`${styles.ctaHeading} ${isEdit ? styles.editable : ""} ${
            isEdit ? styles.editableActive : ""
          }`}
          id={headingId}
          contentEditable={isEdit}
          suppressContentEditableWarning
          onInput={
            isEdit
              ? (event) => update({ heading: event.currentTarget.textContent ?? "" })
              : undefined
          }
          role={isEdit ? "textbox" : undefined}
          aria-label="CTA heading"
        >
          {heading}
        </h3>
        <p
          className={`${styles.ctaBody} ${isEdit ? styles.editable : ""} ${
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
          aria-label="CTA body"
        >
          {body}
        </p>
        <a className={styles.ctaButton} href={buttonHref}>
          <Rocket size={14} aria-hidden="true" />
          {buttonLabel}
        </a>
      </div>
    </BlockShell>
  )
}

export function CtaBlockEdit(props: CtaBlockProps) {
  return <CtaBlock {...props} mode="edit" />
}
