"use client"

import { useId, useState, type FormEvent } from "react"

import styles from "./vehicle-intake-form.module.css"

export type VehicleFuel = "petrol" | "diesel" | "hybrid" | "ev"

export interface VehicleIntakeFormValues {
  rego: string
  make: string
  model: string
  year: string
  engine: string
  body: string
  fuel: VehicleFuel
  notes: string
}

interface VehicleIntakeFormProps {
  onSubmit?: (data: FormData) => void
  defaultValues?: Partial<VehicleIntakeFormValues>
}

const MAKES: ReadonlyArray<string> = [
  "Holden",
  "Ford",
  "Toyota",
  "Nissan",
  "Mazda",
  "Subaru",
  "Mitsubishi",
  "BMW",
]
const YEARS: ReadonlyArray<string> = ["2024", "2022", "2020", "2018", "2014", "2010", "2005", "1999"]
const ENGINES: ReadonlyArray<string> = ["1.6 L", "2.0 L", "2.5 L", "3.0 L", "3.5 L", "5.0 L V8"]
const BODIES: ReadonlyArray<string> = ["Sedan", "Hatch", "Wagon", "Ute", "SUV", "Van"]

const FUEL_OPTIONS: ReadonlyArray<{ id: VehicleFuel; label: string; glyph: string }> = [
  { id: "petrol", label: "Petrol", glyph: "P" },
  { id: "diesel", label: "Diesel", glyph: "D" },
  { id: "hybrid", label: "Hybrid", glyph: "H" },
  { id: "ev", label: "EV", glyph: "⚡" },
]

const PHOTO_SLOTS: ReadonlyArray<{ id: string; label: string }> = [
  { id: "underbody", label: "Underbody" },
  { id: "rear", label: "Rear tip" },
  { id: "muffler", label: "Current muffler" },
  { id: "engine", label: "Engine bay" },
]

export function VehicleIntakeForm({ onSubmit, defaultValues }: VehicleIntakeFormProps) {
  const regoId = useId()
  const makeId = useId()
  const modelId = useId()
  const yearId = useId()
  const engineId = useId()
  const bodyId = useId()
  const notesId = useId()
  const notesHelpId = useId()

  const [fuel, setFuel] = useState<VehicleFuel>(defaultValues?.fuel ?? "petrol")
  const [photos, setPhotos] = useState<Record<string, boolean>>({})
  const [lookupHit, setLookupHit] = useState<string | null>(null)

  const togglePhoto = (id: string) => {
    setPhotos((current) => ({ ...current, [id]: !current[id] }))
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    onSubmit?.(data)
  }

  const handleLookup = () => {
    setLookupHit("Holden VE Commodore · 2010 · 3.6 L · Sedan")
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <header className={styles.head}>
        <span className={styles.eyebrow}>03 / Vehicle intake</span>
        <h2 className={styles.title}>Tell us about the vehicle</h2>
        <p className={styles.lede}>
          Run a quick lookup, then confirm the details so we can match the right cat-back.
        </p>
      </header>

      <div className={styles.lookupRow}>
        <div className={styles.field}>
          <label htmlFor={regoId} className={styles.label}>
            Rego plate
          </label>
          <input
            id={regoId}
            name="rego"
            type="text"
            required
            maxLength={6}
            placeholder="OFM 042"
            defaultValue={defaultValues?.rego}
            className={`${styles.input} ${styles.regoInput}`}
          />
          {lookupHit ? (
            <span className={styles.help} role="status">
              Match · {lookupHit}
            </span>
          ) : (
            <span className={styles.help}>NSW plate format · 6 chars max.</span>
          )}
        </div>
        <button type="button" className={styles.lookupBtn} onClick={handleLookup}>
          Lookup
        </button>
      </div>

      <fieldset className={styles.cascade}>
        <legend className={styles.label}>Vehicle profile</legend>

        <div className={styles.field}>
          <label htmlFor={makeId} className={styles.label}>
            Make
          </label>
          <select
            id={makeId}
            name="make"
            required
            defaultValue={defaultValues?.make ?? MAKES[0]}
            className={styles.select}
          >
            {MAKES.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor={modelId} className={styles.label}>
            Model
          </label>
          <input
            id={modelId}
            name="model"
            type="text"
            required
            placeholder="Commodore"
            defaultValue={defaultValues?.model}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label htmlFor={yearId} className={styles.label}>
            Year
          </label>
          <select
            id={yearId}
            name="year"
            required
            defaultValue={defaultValues?.year ?? YEARS[0]}
            className={styles.select}
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor={engineId} className={styles.label}>
            Engine
          </label>
          <select
            id={engineId}
            name="engine"
            required
            defaultValue={defaultValues?.engine ?? ENGINES[0]}
            className={styles.select}
          >
            {ENGINES.map((e) => (
              <option key={e} value={e}>
                {e}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field} style={{ gridColumn: "1 / -1" }}>
          <label htmlFor={bodyId} className={styles.label}>
            Body
          </label>
          <select
            id={bodyId}
            name="body"
            required
            defaultValue={defaultValues?.body ?? BODIES[0]}
            className={styles.select}
          >
            {BODIES.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend className={styles.label}>Fuel type</legend>
        <div className={styles.fuelRow} role="radiogroup" aria-label="Fuel type">
          {FUEL_OPTIONS.map((option) => {
            const isOn = fuel === option.id
            return (
              <label
                key={option.id}
                className={`${styles.fuelChip} ${isOn ? styles.fuelChipOn : ""}`}
              >
                <input
                  type="radio"
                  name="fuel"
                  value={option.id}
                  checked={isOn}
                  onChange={() => setFuel(option.id)}
                />
                <span aria-hidden="true">{option.glyph}</span>
                <span>{option.label}</span>
              </label>
            )
          })}
        </div>
      </fieldset>

      <fieldset style={{ border: 0, margin: 0, padding: 0 }}>
        <legend className={styles.label}>Photo tray</legend>
        <div className={styles.photoGrid}>
          {PHOTO_SLOTS.map((slot) => {
            const filled = Boolean(photos[slot.id])
            return (
              <button
                key={slot.id}
                type="button"
                className={`${styles.photoSlot} ${filled ? styles.photoSlotFilled : ""}`}
                onClick={() => togglePhoto(slot.id)}
                aria-pressed={filled}
              >
                <span className={styles.photoLabel}>{slot.label}</span>
                <span className={styles.photoState}>
                  {filled ? "Attached" : "Tap to add"}
                </span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className={styles.field}>
        <label htmlFor={notesId} className={styles.label}>
          Notes
        </label>
        <textarea
          id={notesId}
          name="notes"
          rows={4}
          placeholder="Anything we should know about the vehicle, e.g. lowered, drone complaints, dual-tip preference."
          defaultValue={defaultValues?.notes}
          aria-describedby={notesHelpId}
          className={styles.textarea}
        />
        <span id={notesHelpId} className={styles.help}>
          Optional — the workshop reads every note before quoting.
        </span>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryBtn}>
          Lock vehicle
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </form>
  )
}
