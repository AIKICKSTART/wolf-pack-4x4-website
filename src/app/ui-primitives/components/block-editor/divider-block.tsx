"use client"

import { Sparkles } from "lucide-react"
import { useId } from "react"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  DividerPayload,
  DividerVariant,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

const VARIANT_LABEL: Record<DividerVariant, string> = {
  line: "Line",
  dot: "Dots",
  icon: "Icon",
  wave: "Wave",
  zigzag: "Zigzag",
}

type DividerBlockProps = BlockPrimitiveProps<DividerPayload>

function DividerBody({
  variant,
  label,
}: {
  variant: DividerVariant
  label?: string
}) {
  if (variant === "line") {
    return (
      <div className={styles.divider}>
        <span className={styles.dividerLineSeg} aria-hidden="true" />
        {label ? <span className={styles.dividerLabel}>{label}</span> : null}
        <span className={styles.dividerLineSeg} aria-hidden="true" />
      </div>
    )
  }
  if (variant === "dot") {
    return (
      <div className={styles.dividerDots} aria-hidden="true">
        {Array.from({ length: 5 }).map((_, idx) => (
          <span key={idx} className={styles.dividerDot} />
        ))}
      </div>
    )
  }
  if (variant === "icon") {
    return (
      <div className={styles.divider}>
        <span className={styles.dividerLineSeg} aria-hidden="true" />
        <span className={styles.dividerIcon}>
          <Sparkles size={16} aria-hidden="true" />
        </span>
        <span className={styles.dividerLineSeg} aria-hidden="true" />
      </div>
    )
  }
  if (variant === "wave") {
    return <div className={styles.dividerWave} aria-hidden="true" />
  }
  return <div className={styles.dividerZigzag} aria-hidden="true" />
}

export function DividerBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: DividerBlockProps) {
  const labelId = useId()
  const { variant, label } = data.payload

  const update = (next: Partial<DividerPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<DividerPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const toolbar = (
    <>
      {(Object.keys(VARIANT_LABEL) as ReadonlyArray<DividerVariant>).map((id) => (
        <button
          key={id}
          type="button"
          className={`${styles.toolbarBtn} ${
            id === variant ? styles.toolbarBtnActive : ""
          }`}
          aria-pressed={id === variant}
          onClick={() => update({ variant: id })}
        >
          {VARIANT_LABEL[id]}
        </button>
      ))}
      <input
        type="text"
        className={styles.toolbarInput}
        value={label ?? ""}
        onChange={(event) => update({ label: event.target.value })}
        placeholder="Optional label"
        aria-label="Divider label"
      />
    </>
  )

  return (
    <BlockShell
      kind="Divider"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={labelId}
    >
      <span className={styles.toolbarLabel} id={labelId} hidden>
        {VARIANT_LABEL[variant]} divider
      </span>
      <div role="separator" aria-orientation="horizontal">
        <DividerBody variant={variant} label={label} />
      </div>
    </BlockShell>
  )
}

export function DividerBlockEdit(props: DividerBlockProps) {
  return <DividerBlock {...props} mode="edit" />
}
