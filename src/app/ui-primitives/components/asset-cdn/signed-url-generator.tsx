"use client"

import { useMemo, useState } from "react"

import {
  formatTtl,
  type SignedUrlAlgorithm,
  type SignedUrlConfig,
} from "./asset-cdn-types"

import styles from "./signed-url-generator.module.css"

interface SignedUrlGeneratorProps {
  defaultConfig?: SignedUrlConfig
  baseUrl?: string
  onChange?: (config: SignedUrlConfig) => void
  className?: string
}

const DEFAULT_CONFIG: SignedUrlConfig = {
  resource: "/assets/dyno/run-2604-04k.mp4",
  ttlSec: 3600,
  algorithm: "hmac-sha256",
  scope: "ip:bound",
}

const TTL_PRESETS: ReadonlyArray<{ label: string; sec: number }> = [
  { label: "5 m", sec: 300 },
  { label: "1 h", sec: 3600 },
  { label: "24 h", sec: 86_400 },
  { label: "7 d", sec: 604_800 },
]

const ALG_OPTIONS: ReadonlyArray<{ value: SignedUrlAlgorithm; label: string }> = [
  { value: "hmac-sha256", label: "HMAC-SHA256" },
  { value: "ed25519", label: "Ed25519" },
]

function pseudoSignature(input: string, alg: SignedUrlAlgorithm): string {
  // Deterministic mock signature — visual reference only, never used as real auth.
  let h1 = 0x811c9dc5
  for (let i = 0; i < input.length; i += 1) {
    h1 ^= input.charCodeAt(i)
    h1 = Math.imul(h1, 0x01000193) >>> 0
  }
  const seed = h1.toString(16).padStart(8, "0")
  const len = alg === "ed25519" ? 88 : 64
  let sig = seed
  while (sig.length < len) {
    h1 = Math.imul(h1 ^ sig.length, 0x01000193) >>> 0
    sig += h1.toString(16).padStart(8, "0")
  }
  return sig.slice(0, len)
}

export function SignedUrlGenerator({
  defaultConfig = DEFAULT_CONFIG,
  baseUrl = "https://cdn.mufflermen.com.au",
  onChange,
  className,
}: SignedUrlGeneratorProps) {
  const [config, setConfig] = useState<SignedUrlConfig>(defaultConfig)
  const [copied, setCopied] = useState<boolean>(false)

  const emit = (next: SignedUrlConfig) => {
    setConfig(next)
    onChange?.(next)
  }

  const signature = useMemo(
    () => pseudoSignature(`${config.resource}|${config.ttlSec}|${config.scope ?? ""}`, config.algorithm),
    [config.resource, config.ttlSec, config.scope, config.algorithm],
  )

  const expiresAt = useMemo(() => {
    return Math.floor(Date.UTC(2026, 4, 29, 12, 0, 0) / 1000) + config.ttlSec
  }, [config.ttlSec])

  const previewUrl = `${baseUrl}${config.resource}?exp=${expiresAt}&sig=${signature.slice(0, 12)}…`

  const handleCopy = () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    void navigator.clipboard.writeText(`${baseUrl}${config.resource}?exp=${expiresAt}&sig=${signature}`)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <section
      className={[styles.panel, className].filter(Boolean).join(" ")}
      aria-label="Signed URL generator"
    >
      <header className={styles.head}>
        <span className={styles.kicker}>CDN · Signed URL</span>
        <h3 className={styles.title}>Build a time-bound URL</h3>
      </header>

      <div className={styles.body}>
        <label className={styles.field}>
          <span className={styles.fieldLabel}>Resource path</span>
          <input
            className={styles.input}
            type="text"
            value={config.resource}
            spellCheck={false}
            onChange={(event) => emit({ ...config, resource: event.target.value })}
          />
        </label>

        <fieldset className={styles.fieldset}>
          <legend className={styles.fieldLabel}>TTL</legend>
          <div className={styles.toggleRow} role="radiogroup" aria-label="Time to live">
            {TTL_PRESETS.map((preset) => {
              const active = config.ttlSec === preset.sec
              return (
                <button
                  key={preset.sec}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={[styles.toggle, active ? styles.toggleOn : ""].filter(Boolean).join(" ")}
                  onClick={() => emit({ ...config, ttlSec: preset.sec })}
                >
                  {preset.label}
                </button>
              )
            })}
          </div>
          <span className={styles.helpInline}>
            URL expires in {formatTtl(config.ttlSec)}
          </span>
        </fieldset>

        <fieldset className={styles.fieldset}>
          <legend className={styles.fieldLabel}>Algorithm</legend>
          <div className={styles.toggleRow} role="radiogroup" aria-label="Signing algorithm">
            {ALG_OPTIONS.map((opt) => {
              const active = config.algorithm === opt.value
              return (
                <button
                  key={opt.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  className={[styles.toggle, active ? styles.toggleOn : ""].filter(Boolean).join(" ")}
                  onClick={() => emit({ ...config, algorithm: opt.value })}
                >
                  {opt.label}
                </button>
              )
            })}
          </div>
        </fieldset>

        <label className={styles.field}>
          <span className={styles.fieldLabel}>Scope</span>
          <input
            className={styles.input}
            type="text"
            value={config.scope ?? ""}
            placeholder="ip:bound, role:editor, …"
            onChange={(event) => emit({ ...config, scope: event.target.value })}
          />
        </label>
      </div>

      <div className={styles.outputRow}>
        <code className={styles.output} aria-label="Signed URL preview">
          {previewUrl}
        </code>
        <button
          type="button"
          className={styles.copy}
          onClick={handleCopy}
          aria-live="polite"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className={styles.sigStrip}>
        <span className={styles.sigLabel}>Signature</span>
        <code className={styles.sigBytes}>{signature}</code>
      </div>
    </section>
  )
}

export default SignedUrlGenerator
