"use client"

import { Copy, Link2 } from "lucide-react"
import { useState } from "react"

import { Chip } from "../primitives/chip"
import type { ChipTone } from "../primitives/chip"
import type { ShareLinkScope } from "./realtime-collab-types"
import { SHARE_SCOPE_LABEL } from "./realtime-collab-types"
import styles from "./collab-share-link-generator.module.css"

interface CollabShareLinkGeneratorProps {
  /** Share URL displayed in the input. */
  url: string
  /** Permission scope granted by the link. */
  scope: ShareLinkScope
  /** Available scopes the viewer may switch between. */
  scopes?: ReadonlyArray<ShareLinkScope>
  /** Human-formatted expiry label e.g. "Expires in 7 days". */
  expiryLabel?: string
  /** Scope-change handler. */
  onScopeChange?: (scope: ShareLinkScope) => void
  /** Copy handler. Falls back to navigator.clipboard if omitted. */
  onCopy?: (url: string) => void
  className?: string
}

const SCOPE_TONE: Record<ShareLinkScope, ChipTone> = {
  view: "neutral",
  comment: "teal",
  edit: "amber",
  admin: "red",
}

const DEFAULT_SCOPES: ReadonlyArray<ShareLinkScope> = [
  "view",
  "comment",
  "edit",
  "admin",
]

export function CollabShareLinkGenerator({
  url,
  scope,
  scopes = DEFAULT_SCOPES,
  expiryLabel,
  onScopeChange,
  onCopy,
  className,
}: CollabShareLinkGeneratorProps) {
  const [copied, setCopied] = useState(false)
  const classes = [styles.card, className].filter(Boolean).join(" ")

  const handleCopy = () => {
    if (onCopy) {
      onCopy(url)
    } else if (
      typeof navigator !== "undefined" &&
      typeof navigator.clipboard?.writeText === "function"
    ) {
      void navigator.clipboard.writeText(url).catch(() => undefined)
    }
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className={classes} role="group" aria-label="Share link">
      <header className={styles.head}>
        <span className={styles.kicker}>Share link</span>
        <span className={styles.iconWrap} aria-hidden="true">
          <Link2 size={14} strokeWidth={2.4} />
        </span>
      </header>

      <div className={styles.linkRow}>
        <input
          className={styles.input}
          value={url}
          readOnly
          aria-label="Share link URL"
        />
        <button
          type="button"
          className={styles.copyBtn}
          onClick={handleCopy}
          aria-label={copied ? "Link copied" : "Copy share link"}
        >
          <Copy size={14} strokeWidth={2.4} aria-hidden="true" />
          {copied ? "Copied" : "Copy"}
        </button>
      </div>

      <div className={styles.scopeRow} role="radiogroup" aria-label="Link permission">
        {scopes.map((current) => (
          <Chip
            key={current}
            label={SHARE_SCOPE_LABEL[current]}
            tone={SCOPE_TONE[current]}
            selected={current === scope}
            onSelect={() => onScopeChange?.(current)}
          />
        ))}
      </div>

      {expiryLabel && (
        <footer className={styles.foot}>
          <span className={styles.expiry}>{expiryLabel}</span>
        </footer>
      )}
    </div>
  )
}

export default CollabShareLinkGenerator
