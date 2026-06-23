"use client"

import { Check, Copy, Package } from "lucide-react"
import { useState } from "react"

import {
  PACKAGE_MANAGER_LABEL,
  type PackageManager,
} from "./api-explorer-types"

import styles from "./sdk-install-card.module.css"

export type InstallSnippets = Partial<Record<PackageManager, string>>

interface SdkInstallCardProps {
  /** Pretty SDK name. */
  name: string
  /** Brief description rendered under the heading. */
  description?: string
  /** Map of package manager → install snippet. */
  snippets: InstallSnippets
  /** Override the initial active manager. */
  defaultManager?: PackageManager
  className?: string
}

const ORDER: ReadonlyArray<PackageManager> = ["npm", "pnpm", "yarn", "pip", "composer"]

function pickInitial(snippets: InstallSnippets, preferred?: PackageManager): PackageManager {
  if (preferred && snippets[preferred]) {
    return preferred
  }
  for (const mgr of ORDER) {
    if (snippets[mgr]) {
      return mgr
    }
  }
  return "npm"
}

export function SdkInstallCard({
  name,
  description,
  snippets,
  defaultManager,
  className,
}: SdkInstallCardProps) {
  const available = ORDER.filter((mgr) => snippets[mgr] !== undefined)
  const [active, setActive] = useState<PackageManager>(pickInitial(snippets, defaultManager))
  const [copied, setCopied] = useState(false)
  const command = snippets[active] ?? ""
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleCopy = async () => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(command)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1500)
    } catch {
      setCopied(false)
    }
  }

  return (
    <article className={classes} aria-label={`Install ${name}`}>
      <header className={styles.head}>
        <span className={styles.icon} aria-hidden="true">
          <Package size={14} strokeWidth={2.4} />
        </span>
        <div className={styles.headText}>
          <span className={styles.kicker}>Install</span>
          <h3 className={styles.title}>{name}</h3>
          {description && <p className={styles.desc}>{description}</p>}
        </div>
      </header>

      <div className={styles.strip} role="tablist" aria-label="Package manager">
        {available.map((mgr) => (
          <button
            key={mgr}
            type="button"
            role="tab"
            aria-selected={mgr === active}
            className={`${styles.tab} ${mgr === active ? styles.tabActive : ""}`}
            onClick={() => setActive(mgr)}
          >
            {PACKAGE_MANAGER_LABEL[mgr]}
          </button>
        ))}
      </div>

      <div className={styles.snippet}>
        <code className={styles.command}>
          <span className={styles.prompt} aria-hidden="true">
            $
          </span>
          {command}
        </code>
        <button
          type="button"
          className={`${styles.copyBtn} ${copied ? styles.copyBtnDone : ""}`}
          onClick={handleCopy}
          aria-label={copied ? "Copied install command" : "Copy install command"}
        >
          {copied ? (
            <Check size={12} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Copy size={12} strokeWidth={2.4} aria-hidden="true" />
          )}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>
    </article>
  )
}

export default SdkInstallCard
