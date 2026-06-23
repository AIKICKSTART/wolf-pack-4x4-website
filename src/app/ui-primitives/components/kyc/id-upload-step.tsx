"use client"

import { useId, useState, type ChangeEvent } from "react"

import type { DocumentKind, FileConstraint } from "./kyc-types"
import styles from "./id-upload-step.module.css"

type Side = "front" | "back"

type SidePreview = {
  front: string | null
  back: string | null
}

export interface IdUploadStepProps {
  /** Eyebrow label, e.g. "Step 01 / Identity". */
  kicker: string
  /** Big headline, e.g. "Upload your driver licence". */
  title: string
  /** Document kind drives the SVG frame outline (licence vs passport). */
  documentKind: DocumentKind
  /** File constraint chips listed beneath the uploaders. */
  constraints: ReadonlyArray<FileConstraint>
  /** Percentage 0-100 for the in-flight verification meter. */
  verificationProgress: number
  /** Status label rendered next to the progress meter. */
  verificationLabel: string
  /** Click handler for the "use camera" CTA. */
  onUseCamera?: () => void
  className?: string
}

const FRAME_LABEL: Record<DocumentKind, string> = {
  "drivers-licence": "NSW driver licence",
  passport: "Australian passport",
  medicare: "Medicare card",
  "proof-of-address": "Proof of address",
  "company-extract": "Company extract",
  "trust-deed": "Trust deed",
}

function clampPercent(value: number): number {
  if (Number.isNaN(value)) return 0
  if (value < 0) return 0
  if (value > 100) return 100
  return Math.round(value)
}

export function IdUploadStep({
  kicker,
  title,
  documentKind,
  constraints,
  verificationProgress,
  verificationLabel,
  onUseCamera,
  className,
}: IdUploadStepProps) {
  const headingId = useId()
  const [previews, setPreviews] = useState<SidePreview>({
    front: null,
    back: null,
  })

  const percent = clampPercent(verificationProgress)
  const classes = [styles.card, className].filter(Boolean).join(" ")
  const showBack =
    documentKind === "drivers-licence" || documentKind === "medicare"

  const handleSelect =
    (side: Side) => (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      setPreviews((prev) => ({
        ...prev,
        [side]: file ? file.name : null,
      }))
    }

  return (
    <section
      className={classes}
      aria-labelledby={headingId}
      data-document-kind={documentKind}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>{kicker}</span>
        <h3 id={headingId} className={styles.title}>
          {title}
        </h3>
      </header>

      <figure className={styles.frame} aria-hidden="true">
        <svg viewBox="0 0 240 152" width="100%" height="100%" role="presentation">
          <defs>
            <linearGradient id="kycIdSheen" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="color-mix(in oklab, var(--primitive-amber) 32%, transparent)" />
              <stop offset="100%" stopColor="color-mix(in oklab, var(--primitive-teal) 18%, transparent)" />
            </linearGradient>
          </defs>
          <rect
            x="12"
            y="12"
            width="216"
            height="128"
            rx={documentKind === "passport" ? 4 : 10}
            fill="var(--primitive-recessed)"
            stroke="color-mix(in oklab, var(--primitive-text-strong) 16%, transparent)"
            strokeDasharray="4 4"
          />
          <rect
            x="22"
            y="22"
            width="68"
            height="86"
            rx="4"
            fill="url(#kycIdSheen)"
            opacity="0.42"
          />
          <line x1="104" y1="30" x2="216" y2="30" stroke="color-mix(in oklab, var(--primitive-text-strong) 20%, transparent)" />
          <line x1="104" y1="46" x2="200" y2="46" stroke="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
          <line x1="104" y1="60" x2="216" y2="60" stroke="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
          <line x1="104" y1="74" x2="180" y2="74" stroke="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
          <line x1="104" y1="88" x2="200" y2="88" stroke="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)" />
          <rect
            x="22"
            y="118"
            width="196"
            height="14"
            rx="2"
            fill="color-mix(in oklab, var(--primitive-text-strong) 4%, transparent)"
            stroke="color-mix(in oklab, var(--primitive-text-strong) 12%, transparent)"
          />
        </svg>
        <figcaption className={styles.frameCaption}>
          {FRAME_LABEL[documentKind]}
        </figcaption>
      </figure>

      <fieldset className={styles.uploadGroup}>
        <legend className={styles.legend}>Document images</legend>
        <div className={styles.uploadRow}>
          <label className={styles.uploader} htmlFor={`${headingId}-front`}>
            <span className={styles.uploadLabel}>Front</span>
            <span className={styles.uploadHint}>
              {previews.front ?? "Drop or browse"}
            </span>
            <input
              id={`${headingId}-front`}
              type="file"
              accept="image/png,image/jpeg,application/pdf"
              className={styles.fileInput}
              onChange={handleSelect("front")}
            />
          </label>
          {showBack ? (
            <label className={styles.uploader} htmlFor={`${headingId}-back`}>
              <span className={styles.uploadLabel}>Back</span>
              <span className={styles.uploadHint}>
                {previews.back ?? "Drop or browse"}
              </span>
              <input
                id={`${headingId}-back`}
                type="file"
                accept="image/png,image/jpeg,application/pdf"
                className={styles.fileInput}
                onChange={handleSelect("back")}
              />
            </label>
          ) : null}
        </div>
      </fieldset>

      <ul className={styles.constraints}>
        {constraints.map((c) => (
          <li key={c.label} className={styles.constraintChip}>
            {c.label}
          </li>
        ))}
      </ul>

      <div className={styles.foot}>
        <button
          type="button"
          className={styles.cameraCta}
          onClick={onUseCamera}
        >
          <span aria-hidden="true">◉</span>
          Use camera
        </button>
        <div className={styles.progressBlock}>
          <div className={styles.progressRow}>
            <span className={styles.progressLabel}>{verificationLabel}</span>
            <span className={styles.progressValue}>{percent}%</span>
          </div>
          <div
            className={styles.progressTrack}
            role="progressbar"
            aria-label="Verification progress"
            aria-valuenow={percent}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <span
              className={styles.progressFill}
              style={{ width: `${percent}%` }}
              aria-hidden="true"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default IdUploadStep
