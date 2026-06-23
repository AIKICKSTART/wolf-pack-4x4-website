"use client"

import { useState } from "react"

import { CodeBlock } from "../primitives/code-block"

import styles from "./share-survey-modal.module.css"

interface ShareSurveyModalProps {
  /** Survey display title in the modal heading. */
  surveyTitle: string
  /** Public URL chip rendered at the top of the modal. */
  publicUrl: string
  /** Optional QR caption — when omitted the QR block is hidden. */
  qrCaption?: string
  /** Override the embed snippet — defaults to a typical script. */
  embedSnippet?: string
  /** Pre-filled distribution email row default. */
  emailDefault?: string
  /** Render the modal in the open state when true. */
  open?: boolean
  className?: string
}

export function ShareSurveyModal({
  surveyTitle,
  publicUrl,
  qrCaption,
  embedSnippet,
  emailDefault = "team@mufflermen.com.au",
  open = true,
  className,
}: ShareSurveyModalProps) {
  const [copied, setCopied] = useState<boolean>(false)
  const snippet =
    embedSnippet ??
    `<script src="https://surveys.mufflermen.com.au/embed.js" data-survey="${slugFromUrl(publicUrl)}" async></script>`

  if (!open) return null

  const classes = [styles.shell, className].filter(Boolean).join(" ")

  return (
    <div className={styles.scrim} aria-hidden="false">
      <div
        className={classes}
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-survey-title"
      >
        <header className={styles.head}>
          <div className={styles.headBody}>
            <span className={styles.kicker}>Share</span>
            <h2 id="share-survey-title" className={styles.title}>
              {surveyTitle}
            </h2>
          </div>
          <button type="button" className={styles.close} aria-label="Close share dialog">
            <svg viewBox="0 0 14 14" width="12" height="12" aria-hidden="true">
              <path d="M3 3l8 8M11 3l-8 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
            </svg>
          </button>
        </header>

        <section className={styles.section}>
          <span className={styles.sectionLabel}>Public link</span>
          <div className={styles.urlRow}>
            <span className={styles.urlChip}>{publicUrl}</span>
            <button
              type="button"
              className={styles.copyBtn}
              onClick={() => setCopied(true)}
              aria-label="Copy public link"
            >
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </section>

        <section className={styles.section}>
          <span className={styles.sectionLabel}>Embed</span>
          <CodeBlock code={snippet} language="html" fileName="survey-embed.html" maxHeight={120} />
        </section>

        <section className={styles.section}>
          <span className={styles.sectionLabel}>Email distribution</span>
          <div className={styles.emailRow}>
            <label className={styles.srOnly} htmlFor="share-survey-emails">
              Recipient emails
            </label>
            <input
              id="share-survey-emails"
              type="text"
              className={styles.emailInput}
              defaultValue={emailDefault}
              placeholder="Comma-separated emails"
            />
            <button type="button" className={styles.sendBtn}>
              Send invites
            </button>
          </div>
        </section>

        {qrCaption ? (
          <section className={styles.section}>
            <span className={styles.sectionLabel}>QR code</span>
            <div className={styles.qrRow}>
              <div className={styles.qrBlock} aria-label="Mock QR code">
                {QR_MATRIX.map((row, rowIdx) => (
                  <div key={rowIdx} className={styles.qrRow2}>
                    {row.split("").map((cell, cellIdx) => (
                      <span
                        key={cellIdx}
                        className={cell === "1" ? styles.qrCellOn : styles.qrCellOff}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                ))}
              </div>
              <p className={styles.qrCaption}>{qrCaption}</p>
            </div>
          </section>
        ) : null}
      </div>
    </div>
  )
}

function slugFromUrl(url: string): string {
  const last = url.split("/").filter(Boolean).pop() ?? "survey"
  return last
}

const QR_MATRIX: ReadonlyArray<string> = [
  "1111111011010101111111",
  "1000001000111011000001",
  "1011101011001011011101",
  "1011101011110001011101",
  "1011101000100111011101",
  "1000001011001011000001",
  "1111111010101011111111",
  "0000000010110100000000",
  "1010111101001110111110",
  "0101100110111001010011",
  "1100101100010010111100",
  "1011010111101010100101",
  "0110011001000111011010",
  "0000000010110010110001",
  "1111111011001011011001",
  "1000001011110101010011",
  "1011101010110010111100",
  "1011101000011110100101",
  "1011101001010101110010",
  "1000001011111001010101",
  "1111111010010110110011",
  "0011010111010100110101",
]
