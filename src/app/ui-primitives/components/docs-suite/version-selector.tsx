"use client"

import { useCallback, useEffect, useId, useRef, useState } from "react"

import type { DocsVersion, DocsVersionId } from "./docs-suite-types"

import styles from "./version-selector.module.css"

interface VersionSelectorProps {
  versions: ReadonlyArray<DocsVersion>
  value: DocsVersionId
  onChange: (id: DocsVersionId) => void
  label?: string
}

export function VersionSelector({
  versions,
  value,
  onChange,
  label = "Version",
}: VersionSelectorProps) {
  const [open, setOpen] = useState<boolean>(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const triggerRef = useRef<HTMLButtonElement | null>(null)
  const panelId = useId()

  const active = versions.find((v) => v.id === value) ?? versions[0]

  useEffect(() => {
    if (!open) {
      return
    }
    const handleDown = (event: MouseEvent | TouchEvent) => {
      const node = rootRef.current
      const target = event.target as Node | null
      if (node && target && !node.contains(target)) {
        setOpen(false)
      }
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener("mousedown", handleDown)
    document.addEventListener("touchstart", handleDown)
    document.addEventListener("keydown", handleKey)
    return () => {
      document.removeEventListener("mousedown", handleDown)
      document.removeEventListener("touchstart", handleDown)
      document.removeEventListener("keydown", handleKey)
    }
  }, [open])

  const select = useCallback(
    (id: DocsVersionId) => {
      onChange(id)
      setOpen(false)
      triggerRef.current?.focus()
    },
    [onChange],
  )

  if (!active) {
    return null
  }

  return (
    <div ref={rootRef} className={styles.root}>
      <button
        ref={triggerRef}
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={`${label}, currently ${active.label}`}
        onClick={() => setOpen((prev) => !prev)}
      >
        <span className={styles.triggerLabel}>{label}</span>
        <span className={styles.triggerValue}>
          {active.label}
          {active.isBreaking ? <span className={styles.breakingBadge}>Breaking</span> : null}
        </span>
        <svg
          className={[styles.chev, open ? styles.chevOpen : ""].filter(Boolean).join(" ")}
          viewBox="0 0 24 24"
          width="12"
          height="12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.4"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open ? (
        <ul
          id={panelId}
          className={styles.panel}
          role="listbox"
          aria-label={`${label} options`}
          tabIndex={-1}
        >
          {versions.map((version) => {
            const isActive = version.id === value
            return (
              <li key={version.id}>
                <button
                  type="button"
                  className={[styles.option, isActive ? styles.optionActive : ""]
                    .filter(Boolean)
                    .join(" ")}
                  role="option"
                  aria-selected={isActive}
                  onClick={() => select(version.id)}
                >
                  <span
                    className={[styles.dot, version.isCurrent ? styles.dotCurrent : ""]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden="true"
                  />
                  <span className={styles.optionMain}>
                    <span className={styles.optionLabel}>{version.label}</span>
                    <span className={styles.optionReleased}>
                      Released <time dateTime={version.releasedIso}>{version.releasedAt}</time>
                    </span>
                  </span>
                  {version.isBreaking ? (
                    <span className={styles.breakingBadge}>Breaking</span>
                  ) : null}
                </button>
              </li>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default VersionSelector
