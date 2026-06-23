"use client"

import { useId, useMemo, useState, type ChangeEvent, type FormEvent } from "react"
import { ScanLine, Check } from "lucide-react"

import { Chip } from "../primitives/chip"
import { Kbd } from "../primitives/kbd"

import { padVin, TRANSMISSION_LABEL, type TransmissionType } from "./vehicle-data-types"
import styles from "./vin-decoder-card.module.css"

const VIN_LENGTH = 17

export interface VinDecodeResult {
  year: number
  make: string
  model: string
  engine: string
  transmission: TransmissionType
  origin: string
  bodyStyle: string
}

interface VinDecoderCardProps {
  /** Default VIN to render in the entry field. */
  defaultVin?: string
  /** Pre-decoded result rendered after the operator submits the VIN. */
  result?: VinDecodeResult
  /** Override the "decoded by" label rendered in the meta strip. */
  decodedBy?: string
  className?: string
}

function ValueChip({ label, value }: { label: string; value: string }) {
  return (
    <div className={styles.value}>
      <dt>{label}</dt>
      <dd>{value}</dd>
    </div>
  )
}

export function VinDecoderCard({
  defaultVin = "",
  result,
  decodedBy = "Oak Flats Mufflermen · NEVDIS",
  className,
}: VinDecoderCardProps) {
  const inputId = useId()
  const [draft, setDraft] = useState(defaultVin)
  const [decoded, setDecoded] = useState<VinDecodeResult | null>(result ?? null)
  const [submitted, setSubmitted] = useState(false)

  const display = useMemo(() => padVin(draft || (decoded ? defaultVin : "")), [draft, decoded, defaultVin])
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const charactersTyped = draft.replace(/\s+/g, "").length

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setDraft(event.target.value.toUpperCase().slice(0, VIN_LENGTH))
    if (submitted) {
      setSubmitted(false)
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (result) {
      setDecoded(result)
      setSubmitted(true)
    }
  }

  return (
    <section className={classes} aria-label="VIN decoder">
      <header className={styles.head}>
        <span className={styles.kicker}>VIN decoder · NEVDIS feed</span>
        <h2 className={styles.title}>Identify the vehicle</h2>
      </header>

      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label} htmlFor={inputId}>
          17-character VIN
        </label>
        <div className={styles.field}>
          <ScanLine size={16} strokeWidth={2.2} aria-hidden="true" className={styles.fieldIcon} />
          <input
            id={inputId}
            type="text"
            inputMode="text"
            autoComplete="off"
            spellCheck={false}
            maxLength={VIN_LENGTH}
            value={draft}
            onChange={handleChange}
            placeholder="JT12ZBR45N0028894"
            className={styles.input}
            aria-describedby={`${inputId}-meta`}
          />
          <button type="submit" className={styles.submit}>
            <span>Decode</span>
          </button>
        </div>
        <p id={`${inputId}-meta`} className={styles.meta}>
          {charactersTyped} / {VIN_LENGTH} characters · {decodedBy}
        </p>
      </form>

      <ol className={styles.code} aria-label="VIN characters">
        {display.split("").map((char, index) => (
          <li key={`${char}-${index}`} className={styles.codeCell}>
            <Kbd size="sm">{char}</Kbd>
          </li>
        ))}
      </ol>

      {decoded ? (
        <div className={styles.result} aria-live="polite">
          <div className={styles.resultHead}>
            <span className={styles.statusGlyph} aria-hidden="true">
              <Check size={14} strokeWidth={2.4} />
            </span>
            <span>
              Decoded · {submitted ? "match locked" : "preview"}
            </span>
            <Chip
              label={`${decoded.year} ${decoded.make}`}
              tone="teal"
              className={styles.headChip}
            />
          </div>
          <dl className={styles.fields}>
            <ValueChip label="Year" value={String(decoded.year)} />
            <ValueChip label="Make" value={decoded.make} />
            <ValueChip label="Model" value={decoded.model} />
            <ValueChip label="Body" value={decoded.bodyStyle} />
            <ValueChip label="Engine" value={decoded.engine} />
            <ValueChip label="Trans." value={TRANSMISSION_LABEL[decoded.transmission]} />
            <ValueChip label="Origin" value={decoded.origin} />
          </dl>
        </div>
      ) : (
        <p className={styles.empty}>
          Submit the VIN to pull a NEVDIS record with year, make, model, engine,
          transmission, body style, and assembly origin.
        </p>
      )}
    </section>
  )
}

export default VinDecoderCard
