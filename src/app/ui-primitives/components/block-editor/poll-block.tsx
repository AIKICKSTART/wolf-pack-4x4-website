"use client"

import { BarChart, Plus, Users } from "lucide-react"
import { useId } from "react"

import { ProgressLinear } from "../primitives"

import { BlockShell } from "./block-shell"
import type {
  BlockData,
  BlockPrimitiveProps,
  PollChoice,
  PollPayload,
} from "./block-editor-types"
import styles from "./block-editor.module.css"

type ProgressToneLocal = "amber" | "teal" | "green" | "red"
const TONES: ReadonlyArray<ProgressToneLocal> = ["amber", "teal", "green", "red"]

type PollBlockProps = BlockPrimitiveProps<PollPayload>

export function PollBlock({
  data,
  mode = "render",
  error,
  onChange,
  className,
}: PollBlockProps) {
  const questionId = useId()
  const isEdit = mode === "edit"
  const { question, choices, totalVotes, multiSelect, closesAt } = data.payload
  const live = Math.max(totalVotes, choices.reduce((sum, c) => sum + c.votes, 0))

  const update = (next: Partial<PollPayload>): void => {
    if (!onChange) {
      return
    }
    const updated: BlockData<PollPayload> = {
      ...data,
      payload: { ...data.payload, ...next },
      version: data.version + 1,
      updatedAt: new Date().toISOString(),
    }
    onChange(updated)
  }

  const handleAddChoice = (): void => {
    const id = `c-${choices.length + 1}-${Date.now().toString(36)}`
    const next: PollChoice = { id, label: "New option", votes: 0 }
    update({ choices: [...choices, next] })
  }

  const handleQuestionInput = (event: React.FormEvent<HTMLElement>): void => {
    update({ question: event.currentTarget.textContent ?? "" })
  }

  const toolbar = (
    <>
      <button
        type="button"
        className={`${styles.toolbarBtn} ${multiSelect ? styles.toolbarBtnActive : ""}`}
        aria-pressed={multiSelect}
        onClick={() => update({ multiSelect: !multiSelect })}
      >
        <Users size={12} aria-hidden="true" /> Multi
      </button>
      <button
        type="button"
        className={styles.toolbarBtn}
        onClick={handleAddChoice}
      >
        <Plus size={12} aria-hidden="true" /> Option
      </button>
      <button type="button" className={styles.toolbarBtn} aria-label="Open chart preview">
        <BarChart size={12} aria-hidden="true" /> Live
      </button>
    </>
  )

  return (
    <BlockShell
      kind="Poll"
      mode={mode}
      error={error}
      toolbar={toolbar}
      className={className}
      ariaLabelledBy={questionId}
    >
      <h3
        className={`${styles.pollQuestion} ${isEdit ? styles.editable : ""} ${
          isEdit ? styles.editableActive : ""
        }`}
        id={questionId}
        contentEditable={isEdit}
        suppressContentEditableWarning
        onInput={isEdit ? handleQuestionInput : undefined}
        role={isEdit ? "textbox" : undefined}
        aria-label="Poll question"
        spellCheck={isEdit}
      >
        {question}
      </h3>
      <div className={styles.pollChoices} role="list" aria-label="Poll choices">
        {choices.map((choice, idx) => {
          const tone = TONES[idx % TONES.length] ?? "amber"
          const pct = live > 0 ? Math.round((choice.votes / live) * 100) : 0
          return (
            <div key={choice.id} className={styles.pollChoice} role="listitem">
              <div className={styles.pollChoiceHead}>
                <span>{choice.label}</span>
                <span className={styles.pollChoiceVotes}>
                  {choice.votes.toLocaleString("en-AU")} · {pct}%
                </span>
              </div>
              <ProgressLinear
                value={pct}
                max={100}
                tone={tone}
                variant="solid"
                label={`${choice.label} share`}
              />
            </div>
          )
        })}
      </div>
      <div className={styles.pollMeta}>
        <span>{live.toLocaleString("en-AU")} votes</span>
        <span>
          {multiSelect ? "Multi-select" : "Single choice"}
          {closesAt ? ` · closes ${closesAt}` : ""}
        </span>
      </div>
    </BlockShell>
  )
}

export function PollBlockEdit(props: PollBlockProps) {
  return <PollBlock {...props} mode="edit" />
}

