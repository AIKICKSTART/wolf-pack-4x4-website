"use client"

import { Check, Copy } from "lucide-react"
import { useId, useState } from "react"

import {
  PACKAGE_MANAGER_LABEL,
  buildInstallCommand,
  type PackageManager,
} from "./dev-experience-types"
import styles from "./sdk-install-snippet.module.css"

const ORDER: ReadonlyArray<PackageManager> = ["npm", "pnpm", "yarn", "bun"]

export interface SdkInstallSnippetProps {
  /** Package identifier rendered after the install verb. */
  packageName: string
  /** Default tab. */
  defaultManager?: PackageManager
  /** Optional title shown in the header strip. */
  title?: string
  /** Optional className passthrough. */
  className?: string
}

export function SdkInstallSnippet({
  packageName,
  defaultManager = "pnpm",
  title = "Install the SDK",
  className,
}: SdkInstallSnippetProps) {
  const [manager, setManager] = useState<PackageManager>(defaultManager)
  const [copied, setCopied] = useState<PackageManager | null>(null)
  const tablistId = useId()
  const command = buildInstallCommand(manager, packageName)

  const handleCopy = async (target: PackageManager): Promise<void> => {
    if (typeof navigator === "undefined" || !navigator.clipboard) {
      return
    }
    try {
      await navigator.clipboard.writeText(buildInstallCommand(target, packageName))
      setCopied(target)
      window.setTimeout(() => setCopied((prev) => (prev === target ? null : prev)), 1500)
    } catch {
      setCopied(null)
    }
  }

  const classes = [styles.snippet, className].filter(Boolean).join(" ")

  return (
    <section className={classes} aria-label={title}>
      <header className={styles.head}>
        <span className={styles.kicker}>Install</span>
        <span className={styles.title}>{title}</span>
        <code className={styles.package}>{packageName}</code>
      </header>
      <div
        className={styles.tablist}
        role="tablist"
        aria-label="Package manager"
        id={tablistId}
      >
        {ORDER.map((pm) => {
          const active = pm === manager
          return (
            <button
              key={pm}
              type="button"
              role="tab"
              aria-selected={active}
              aria-controls={`${tablistId}-panel`}
              tabIndex={active ? 0 : -1}
              className={`${styles.tab} ${active ? styles.tabActive : ""}`}
              onClick={() => setManager(pm)}
            >
              {PACKAGE_MANAGER_LABEL[pm]}
            </button>
          )
        })}
      </div>
      <div
        className={styles.panel}
        role="tabpanel"
        id={`${tablistId}-panel`}
        aria-label={`${PACKAGE_MANAGER_LABEL[manager]} install command`}
      >
        <span className={styles.prompt} aria-hidden="true">
          $
        </span>
        <code className={styles.command}>{command}</code>
        <button
          type="button"
          className={`${styles.copy} ${copied === manager ? styles.copyDone : ""}`}
          onClick={() => handleCopy(manager)}
          aria-label={copied === manager ? "Copied install command" : "Copy install command"}
        >
          {copied === manager ? (
            <Check size={13} strokeWidth={2.4} aria-hidden="true" />
          ) : (
            <Copy size={13} strokeWidth={2.2} aria-hidden="true" />
          )}
          <span>{copied === manager ? "Copied" : "Copy"}</span>
        </button>
      </div>
      <span className={styles.statusLine} role="status" aria-live="polite">
        {copied === manager
          ? `${PACKAGE_MANAGER_LABEL[manager]} command copied to clipboard.`
          : ""}
      </span>
    </section>
  )
}

export default SdkInstallSnippet
