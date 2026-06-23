"use client"

import { Check, Copy } from "lucide-react"
import { useState } from "react"

import styles from "./code-block.module.css"

interface CodeBlockProps {
  code: string
  language?: string
  showLineNumbers?: boolean
  fileName?: string
  caption?: string
  className?: string
  maxHeight?: number
}

export function CodeBlock({
  code,
  language = "text",
  showLineNumbers = true,
  fileName,
  caption,
  className,
  maxHeight = 360,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const lines = code.replace(/\n$/, "").split("\n")
  const labelLanguage = language.toUpperCase()

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  const classes = [styles.block, className].filter(Boolean).join(" ")

  return (
    <figure className={classes}>
      <header className={styles.head}>
        <div className={styles.headMeta}>
          <span className={styles.language}>{labelLanguage}</span>
          {fileName && <span className={styles.fileName}>{fileName}</span>}
        </div>
        <button
          type="button"
          className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Copied" : "Copy code"}
        >
          {copied ? (
            <Check size={13} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Copy size={13} strokeWidth={2.2} aria-hidden="true" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </header>
      <div className={styles.scroll} style={{ maxHeight }}>
        <pre
          className={styles.pre}
          aria-label={fileName ? `${fileName} (${labelLanguage})` : `${labelLanguage} code`}
        >
          <code className={styles.code}>
            {lines.map((line, index) => (
              <span key={index} className={styles.line}>
                {showLineNumbers && (
                  <span className={styles.lineNumber} aria-hidden="true">
                    {index + 1}
                  </span>
                )}
                <span className={styles.lineText}>{line.length === 0 ? " " : line}</span>
              </span>
            ))}
          </code>
        </pre>
        <span className={styles.fade} aria-hidden="true" />
      </div>
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  )
}

export default CodeBlock
