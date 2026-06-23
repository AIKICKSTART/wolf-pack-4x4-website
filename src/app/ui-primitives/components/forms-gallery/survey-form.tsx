"use client"

import { useId, useMemo, useState, type FormEvent } from "react"

import { ProgressLinear } from "../primitives/progress-linear"

import styles from "./survey-form.module.css"

export interface SurveyFormValues {
  recommendation: number
  improvements: string[]
  rankedReasons: string[]
  notes: string
  satisfaction: number
}

interface SurveyFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<SurveyFormValues>
}

const IMPROVEMENT_OPTIONS: ReadonlyArray<string> = [
  "Faster quotes",
  "Online booking",
  "Live job tracking",
  "Lounge upgrades",
  "Mobile mechanic",
  "Loaner vehicle",
]

const DEFAULT_RANK: ReadonlyArray<string> = [
  "Workmanship quality",
  "Turnaround time",
  "Price transparency",
  "Communication",
]

const TOTAL_QUESTIONS = 5

export function SurveyForm({ onSubmit, defaultValues }: SurveyFormProps) {
  const notesId = useId()
  const satisfactionLabelId = useId()

  const [recommendation, setRecommendation] = useState<number>(
    defaultValues?.recommendation ?? 0,
  )
  const [improvements, setImprovements] = useState<string[]>(
    defaultValues?.improvements ?? [],
  )
  const [ranked, setRanked] = useState<string[]>(
    defaultValues?.rankedReasons ?? [...DEFAULT_RANK],
  )
  const [satisfaction, setSatisfaction] = useState<number>(
    defaultValues?.satisfaction ?? 70,
  )
  const [notesText, setNotesText] = useState<string>(defaultValues?.notes ?? "")

  const answered = useMemo(() => {
    let count = 0
    if (recommendation > 0) count += 1
    if (improvements.length > 0) count += 1
    count += 1
    if (notesText.trim().length > 0) count += 1
    count += 1
    return count
  }, [recommendation, improvements.length, notesText])

  const progressPercent = Math.round((answered / TOTAL_QUESTIONS) * 100)

  const toggleImprovement = (option: string) => {
    setImprovements((current) =>
      current.includes(option)
        ? current.filter((item) => item !== option)
        : [...current, option],
    )
  }

  const moveRank = (index: number, dir: -1 | 1) => {
    const next = [...ranked]
    const target = index + dir
    if (target < 0 || target >= next.length) return
    const tmp = next[index]
    next[index] = next[target]
    next[target] = tmp
    setRanked(next)
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    data.set("recommendation", String(recommendation))
    data.set("satisfaction", String(satisfaction))
    improvements.forEach((item) => data.append("improvements", item))
    ranked.forEach((item) => data.append("rankedReasons", item))
    onSubmit?.(data)
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <div className={styles.progressWrap}>
        <div className={styles.progressTop}>
          <span className={styles.progressLabel}>Survey progress</span>
          <output className={styles.progressValue} aria-live="polite">
            {answered}/{TOTAL_QUESTIONS} · {progressPercent}%
          </output>
        </div>
        <ProgressLinear
          value={answered}
          max={TOTAL_QUESTIONS}
          tone="green"
          variant="segmented"
          segments={TOTAL_QUESTIONS}
        />
      </div>

      <header className={styles.head}>
        <span className={styles.eyebrow}>07 / Workshop survey</span>
        <h2 className={styles.title}>Help us tune the workshop</h2>
        <p className={styles.lede}>
          Five short questions. Two minutes. Everything stays anonymous.
        </p>
      </header>

      <fieldset className={styles.question} style={{ border: 0 }}>
        <div className={styles.questionHead}>
          <legend className={styles.questionLabel}>How likely to recommend Oak Flats?</legend>
          <span className={styles.questionTag}>1 – 10 scale</span>
        </div>
        <div className={styles.scaleRow} role="radiogroup" aria-label="Recommendation score">
          {Array.from({ length: 10 }, (_, idx) => idx + 1).map((value) => {
            const isOn = recommendation === value
            return (
              <label
                key={value}
                className={`${styles.scaleCell} ${isOn ? styles.scaleCellOn : ""}`}
              >
                <input
                  type="radio"
                  name="recommendation"
                  value={value}
                  checked={isOn}
                  onChange={() => setRecommendation(value)}
                />
                {value}
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset className={styles.question} style={{ border: 0 }}>
        <div className={styles.questionHead}>
          <legend className={styles.questionLabel}>What would you most like us to improve?</legend>
          <span className={styles.questionTag}>Select any</span>
        </div>
        <div className={styles.chipRow}>
          {IMPROVEMENT_OPTIONS.map((option) => {
            const isOn = improvements.includes(option)
            return (
              <button
                key={option}
                type="button"
                aria-pressed={isOn}
                className={`${styles.chip} ${isOn ? styles.chipOn : ""}`}
                onClick={() => toggleImprovement(option)}
              >
                {option}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className={styles.question}>
        <div className={styles.questionHead}>
          <span className={styles.questionLabel}>Rank what matters most</span>
          <span className={styles.questionTag}>Reorder</span>
        </div>
        <ol className={styles.rankList}>
          {ranked.map((item, idx) => (
            <li key={item} className={styles.rankItem}>
              <span className={styles.rankNumber} aria-hidden="true">
                {idx + 1}
              </span>
              <span className={styles.rankLabel}>{item}</span>
              <span className={styles.rankCtrls}>
                <button
                  type="button"
                  className={styles.rankBtn}
                  onClick={() => moveRank(idx, -1)}
                  disabled={idx === 0}
                  aria-label={`Move ${item} up`}
                >
                  ↑
                </button>
                <button
                  type="button"
                  className={styles.rankBtn}
                  onClick={() => moveRank(idx, 1)}
                  disabled={idx === ranked.length - 1}
                  aria-label={`Move ${item} down`}
                >
                  ↓
                </button>
              </span>
            </li>
          ))}
        </ol>
      </div>

      <div className={styles.question}>
        <label htmlFor={notesId} className={styles.questionLabel}>
          Anything specific you want to share?
        </label>
        <textarea
          id={notesId}
          name="notes"
          rows={3}
          placeholder="Type freely…"
          value={notesText}
          onChange={(event) => setNotesText(event.target.value)}
          className={styles.textarea}
        />
      </div>

      <div className={styles.question}>
        <div className={styles.sliderWrap} aria-labelledby={satisfactionLabelId}>
          <div className={styles.sliderTop}>
            <span id={satisfactionLabelId} className={styles.questionLabel}>
              How satisfied overall?
            </span>
            <output className={styles.sliderValue} aria-live="polite">
              {satisfaction}
            </output>
          </div>
          <input
            type="range"
            name="satisfaction"
            min={0}
            max={100}
            value={satisfaction}
            onChange={(event) => setSatisfaction(Number(event.target.value))}
            aria-labelledby={satisfactionLabelId}
            className={styles.slider}
          />
          <div className={styles.sliderTop}>
            <span className={styles.sliderLabel}>Not at all</span>
            <span className={styles.sliderLabel}>Workshop legend</span>
          </div>
        </div>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn}>
          Submit survey
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
