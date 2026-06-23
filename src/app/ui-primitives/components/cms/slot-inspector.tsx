"use client"

import { AlertTriangle, Image as ImageIcon, Minus, Plus } from "lucide-react"
import { useState, type CSSProperties } from "react"

import type { SlotField, SlotGroup } from "./cms-types"

import styles from "./slot-inspector.module.css"

export interface SlotInspectorProps {
  /** Display name for the currently selected block. */
  blockName: string
  blockCategory: string
  blockSummary?: string
  groups: ReadonlyArray<SlotGroup>
  loading?: boolean
  error?: string
  className?: string
}

interface FieldState {
  text: Record<string, string>
  number: Record<string, number>
  toggle: Record<string, boolean>
}

function buildInitialState(groups: ReadonlyArray<SlotGroup>): FieldState {
  const state: FieldState = { text: {}, number: {}, toggle: {} }
  groups.forEach((group) => {
    group.fields.forEach((field) => {
      if (field.kind === "toggle") {
        state.toggle[field.id] = Boolean(field.value)
      } else if (field.kind === "number") {
        state.number[field.id] = Number(field.value)
      } else {
        state.text[field.id] = String(field.value)
      }
    })
  })
  return state
}

function FieldRow({
  field,
  state,
  onChangeText,
  onChangeNumber,
  onToggle,
}: {
  field: SlotField
  state: FieldState
  onChangeText: (id: string, value: string) => void
  onChangeNumber: (id: string, value: number) => void
  onToggle: (id: string, value: boolean) => void
}) {
  if (field.kind === "toggle") {
    const value = state.toggle[field.id]
    return (
      <div className={styles.fieldRow}>
        <div className={styles.toggleRow}>
          <label className={styles.label} htmlFor={field.id}>
            {field.label}
            {field.required ? <span className={styles.required}>REQ</span> : null}
          </label>
          <button
            type="button"
            id={field.id}
            className={`${styles.toggle} ${value ? styles.toggleOn : ""}`}
            role="switch"
            aria-checked={value}
            aria-label={`${field.label} toggle`}
            onClick={() => onToggle(field.id, !value)}
          />
        </div>
        {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
      </div>
    )
  }

  const label = (
    <label className={styles.label} htmlFor={field.id}>
      {field.label}
      {field.required ? <span className={styles.required}>REQ</span> : null}
    </label>
  )

  if (field.kind === "textarea") {
    return (
      <div className={styles.fieldRow}>
        {label}
        <textarea
          id={field.id}
          className={styles.textarea}
          value={state.text[field.id]}
          onChange={(event) => onChangeText(field.id, event.target.value)}
          aria-required={field.required}
        />
        {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
      </div>
    )
  }

  if (field.kind === "color") {
    const value = state.text[field.id]
    const swatchStyle: CSSProperties = { "--slot-color": value } as CSSProperties
    return (
      <div className={styles.fieldRow}>
        {label}
        <div className={styles.colorRow}>
          <span className={styles.swatch} style={swatchStyle} aria-hidden="true" />
          <input
            id={field.id}
            type="text"
            className={styles.input}
            value={value}
            onChange={(event) => onChangeText(field.id, event.target.value)}
            aria-required={field.required}
          />
        </div>
        {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
      </div>
    )
  }

  if (field.kind === "number") {
    const value = state.number[field.id]
    return (
      <div className={styles.fieldRow}>
        {label}
        <div className={styles.numberRow}>
          <input
            id={field.id}
            type="number"
            className={styles.input}
            value={value}
            onChange={(event) =>
              onChangeNumber(field.id, Number(event.target.value))
            }
            aria-required={field.required}
          />
          <button
            type="button"
            className={styles.numberBtn}
            aria-label={`Decrease ${field.label}`}
            onClick={() => onChangeNumber(field.id, value - 1)}
          >
            <Minus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={styles.numberBtn}
            aria-label={`Increase ${field.label}`}
            onClick={() => onChangeNumber(field.id, value + 1)}
          >
            <Plus size={12} strokeWidth={2.4} aria-hidden="true" />
          </button>
        </div>
        {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
      </div>
    )
  }

  if (field.kind === "image") {
    return (
      <div className={styles.fieldRow}>
        {label}
        <div className={styles.imageRow}>
          <span className={styles.imageThumb} aria-hidden="true">
            <ImageIcon size={20} strokeWidth={2} />
          </span>
          <div className={styles.imageMeta}>
            <span className={styles.imageName}>{state.text[field.id]}</span>
            <span className={styles.imageHint}>Tap to replace</span>
          </div>
        </div>
        {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
      </div>
    )
  }

  if (field.kind === "select" && field.options) {
    return (
      <div className={styles.fieldRow}>
        {label}
        <select
          id={field.id}
          className={styles.select}
          value={state.text[field.id]}
          onChange={(event) => onChangeText(field.id, event.target.value)}
          aria-required={field.required}
        >
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
      </div>
    )
  }

  return (
    <div className={styles.fieldRow}>
      {label}
      <input
        id={field.id}
        type="text"
        className={styles.input}
        value={state.text[field.id]}
        onChange={(event) => onChangeText(field.id, event.target.value)}
        aria-required={field.required}
      />
      {field.hint ? <p className={styles.hint}>{field.hint}</p> : null}
    </div>
  )
}

export function SlotInspector({
  blockName,
  blockCategory,
  blockSummary,
  groups,
  loading = false,
  error,
  className,
}: SlotInspectorProps) {
  const [state, setState] = useState<FieldState>(() => buildInitialState(groups))

  const updateText = (id: string, value: string) => {
    setState((current) => ({
      ...current,
      text: { ...current.text, [id]: value },
    }))
  }
  const updateNumber = (id: string, value: number) => {
    setState((current) => ({
      ...current,
      number: { ...current.number, [id]: value },
    }))
  }
  const updateToggle = (id: string, value: boolean) => {
    setState((current) => ({
      ...current,
      toggle: { ...current.toggle, [id]: value },
    }))
  }

  const classes = [styles.inspector, className].filter(Boolean).join(" ")

  if (error) {
    return (
      <aside className={classes} aria-label="Slot inspector">
        <header className={styles.header}>
          <span className={styles.kicker}>Slot inspector · {blockCategory}</span>
          <span className={styles.title}>{blockName}</span>
        </header>
        <div className={styles.error} role="alert">
          <AlertTriangle size={20} strokeWidth={2} aria-hidden="true" />
          <strong>Inspector failed to load</strong>
          <span>{error}</span>
        </div>
        <footer className={styles.footer}>
          <span>Auto-save off · changes paused</span>
        </footer>
      </aside>
    )
  }

  if (loading) {
    return (
      <aside className={classes} aria-label="Slot inspector">
        <header className={styles.header}>
          <span className={styles.kicker}>Slot inspector</span>
          <span className={styles.title}>Loading block props…</span>
        </header>
        <div className={styles.empty}>Reticulating splines</div>
        <footer className={styles.footer}>
          <span>Auto-save · syncing</span>
        </footer>
      </aside>
    )
  }

  return (
    <aside className={classes} aria-label="Slot inspector">
      <header className={styles.header}>
        <span className={styles.kicker}>Slot inspector · {blockCategory}</span>
        <span className={styles.title}>{blockName}</span>
        {blockSummary ? <p className={styles.summary}>{blockSummary}</p> : null}
      </header>

      <div className={styles.body}>
        {groups.map((group) => (
          <section key={group.id} className={styles.group} aria-label={group.label}>
            <span className={styles.groupLabel}>{group.label}</span>
            {group.fields.map((field) => (
              <FieldRow
                key={field.id}
                field={field}
                state={state}
                onChangeText={updateText}
                onChangeNumber={updateNumber}
                onToggle={updateToggle}
              />
            ))}
          </section>
        ))}
      </div>

      <footer className={styles.footer}>
        <span>Auto-save · synced 14s ago</span>
        <span>{groups.reduce((sum, g) => sum + g.fields.length, 0)} fields</span>
      </footer>
    </aside>
  )
}

export default SlotInspector
