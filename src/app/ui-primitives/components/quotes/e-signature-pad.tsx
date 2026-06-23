"use client"

import { PenLine, Type, Upload, RotateCcw, X } from "lucide-react"
import { useState, type ChangeEvent } from "react"

import type { SignatureMethod } from "./quote-types"
import styles from "./e-signature-pad.module.css"

interface ESignaturePadProps {
  signerName: string
  defaultMethod?: SignatureMethod
  onSign?: (payload: { method: SignatureMethod; value: string; binding: boolean }) => void
}

const METHOD_OPTIONS: ReadonlyArray<{ value: SignatureMethod; label: string; icon: React.ReactNode }> = [
  { value: "typed", label: "Type", icon: <Type size={14} aria-hidden="true" /> },
  { value: "drawn", label: "Draw", icon: <PenLine size={14} aria-hidden="true" /> },
  { value: "uploaded", label: "Upload", icon: <Upload size={14} aria-hidden="true" /> },
]

export function ESignaturePad({
  signerName,
  defaultMethod = "typed",
  onSign,
}: ESignaturePadProps) {
  const [method, setMethod] = useState<SignatureMethod>(defaultMethod)
  const [typedValue, setTypedValue] = useState<string>(signerName)
  const [drawn, setDrawn] = useState<boolean>(false)
  const [uploadedName, setUploadedName] = useState<string>("")
  const [binding, setBinding] = useState<boolean>(false)

  const previewValue =
    method === "typed"
      ? typedValue
      : method === "drawn"
      ? drawn
        ? "Signature drawn"
        : ""
      : uploadedName

  const canSign = previewValue.trim() !== "" && binding

  const handleUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setUploadedName(file.name)
    }
  }

  const handleSign = () => {
    if (!canSign) {
      return
    }
    onSign?.({ method, value: previewValue, binding })
  }

  return (
    <form
      className={styles.pad}
      role="form"
      aria-labelledby="signature-pad-title"
      onSubmit={(event) => {
        event.preventDefault()
        handleSign()
      }}
    >
      <header className={styles.head}>
        <span className={styles.kicker}>Signature</span>
        <h3 id="signature-pad-title" className={styles.title}>Sign as {signerName}</h3>
      </header>
      <div className={styles.tabs} role="tablist" aria-label="Signature method">
        {METHOD_OPTIONS.map((option) => (
          <button
            type="button"
            key={option.value}
            role="tab"
            aria-selected={method === option.value}
            className={[styles.tab, method === option.value && styles.tabActive]
              .filter(Boolean)
              .join(" ")}
            onClick={() => setMethod(option.value)}
          >
            {option.icon}
            {option.label}
          </button>
        ))}
      </div>
      <div className={styles.preview} aria-live="polite">
        {method === "typed" && (
          <input
            type="text"
            className={styles.typedInput}
            value={typedValue}
            placeholder="Type your full name"
            aria-label="Typed signature"
            onChange={(event) => setTypedValue(event.target.value)}
          />
        )}
        {method === "drawn" && (
          <button
            type="button"
            className={styles.drawSurface}
            aria-label={drawn ? "Drawn signature captured" : "Tap to record drawn signature"}
            onClick={() => setDrawn(true)}
          >
            {drawn ? (
              <span className={styles.drawnMark}>~~ {signerName} ~~</span>
            ) : (
              <span className={styles.drawHint}>Draw signature in this area</span>
            )}
          </button>
        )}
        {method === "uploaded" && (
          <label className={styles.upload}>
            <input
              type="file"
              accept="image/*"
              className={styles.uploadInput}
              onChange={handleUpload}
            />
            <Upload size={18} aria-hidden="true" />
            <span>{uploadedName || "Choose signature image (PNG / JPG)"}</span>
          </label>
        )}
      </div>
      <div className={styles.actions}>
        <button
          type="button"
          className={styles.action}
          aria-label="Clear signature"
          onClick={() => {
            setTypedValue("")
            setDrawn(false)
            setUploadedName("")
          }}
        >
          <X size={14} aria-hidden="true" /> Clear
        </button>
        <button
          type="button"
          className={styles.action}
          aria-label="Restore default name"
          onClick={() => {
            setTypedValue(signerName)
            setDrawn(false)
            setUploadedName("")
          }}
        >
          <RotateCcw size={14} aria-hidden="true" /> Reset
        </button>
      </div>
      <label className={styles.binding}>
        <input
          type="checkbox"
          className={styles.bindingInput}
          checked={binding}
          onChange={(event) => setBinding(event.target.checked)}
        />
        <span className={styles.bindingMark} aria-hidden="true" />
        <span>I accept this electronic signature as legally binding under Australian law.</span>
      </label>
      <button type="submit" className={styles.sign} disabled={!canSign}>
        Accept &amp; sign quote
      </button>
    </form>
  )
}

export default ESignaturePad
