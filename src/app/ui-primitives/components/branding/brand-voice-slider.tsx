"use client"

import { useId, useState, type ChangeEvent } from "react"

import styles from "./brand-voice-slider.module.css"

export interface BrandVoiceAxis {
  id: string
  leftLabel: string
  rightLabel: string
  defaultValue: number
  helper: string
}

export interface BrandVoiceSliderProps {
  axes: ReadonlyArray<BrandVoiceAxis>
}

interface AxisState {
  [key: string]: number
}

export function BrandVoiceSlider({ axes }: BrandVoiceSliderProps) {
  const initial: AxisState = axes.reduce<AxisState>((acc, axis) => {
    acc[axis.id] = axis.defaultValue
    return acc
  }, {})
  const [values, setValues] = useState<AxisState>(initial)

  const handleChange = (id: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const next = Number(event.target.value)
    setValues((current) => ({ ...current, [id]: next }))
  }

  return (
    <section className={styles.wrapper} aria-label="Brand voice axes">
      <header className={styles.head}>
        <span className={styles.kicker}>Voice axes</span>
        <h3 className={styles.title}>Calibrate the brand tone</h3>
        <p className={styles.lede}>
          Move each slider to where the brand sits on its voice spectrum. Use the captured values as written
          guidance for copywriters and AI prompts.
        </p>
      </header>
      <div className={styles.axes}>
        {axes.map((axis) => (
          <Slider
            key={axis.id}
            axis={axis}
            value={values[axis.id] ?? axis.defaultValue}
            onChange={handleChange(axis.id)}
          />
        ))}
      </div>
    </section>
  )
}

interface SliderProps {
  axis: BrandVoiceAxis
  value: number
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

function Slider({ axis, value, onChange }: SliderProps) {
  const inputId = useId()
  return (
    <div className={styles.axis}>
      <div className={styles.axisLabels}>
        <span>{axis.leftLabel}</span>
        <span>{axis.rightLabel}</span>
      </div>
      <input
        id={inputId}
        type="range"
        min={0}
        max={100}
        step={1}
        value={value}
        onChange={onChange}
        className={styles.input}
        aria-label={`${axis.leftLabel} to ${axis.rightLabel}`}
      />
      <div className={styles.axisFooter}>
        <span className={styles.axisValue}>{`${value}%`}</span>
        <span className={styles.axisHelper}>{axis.helper}</span>
      </div>
    </div>
  )
}
