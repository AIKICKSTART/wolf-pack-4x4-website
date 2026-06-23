"use client"

import { Check, ChevronDown, Cpu } from "lucide-react"
import { useEffect, useRef, useState } from "react"

import styles from "./model-selector.module.css"

export type ModelTier = "opus" | "sonnet" | "haiku" | "flash" | "mini"

export interface ModelOption {
  id: string
  name: string
  tier: ModelTier
  contextWindow: string
  costPerMillion: string
  description?: string
}

interface ModelSelectorProps {
  models: ReadonlyArray<ModelOption>
  selectedId: string
  onSelect: (id: string) => void
  className?: string
}

const TIER_LABEL: Record<ModelTier, string> = {
  opus: "Opus",
  sonnet: "Sonnet",
  haiku: "Haiku",
  flash: "Flash",
  mini: "Mini",
}

export function ModelSelector({
  models,
  selectedId,
  onSelect,
  className,
}: ModelSelectorProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement | null>(null)
  const selected = models.find((m) => m.id === selectedId) ?? models[0]

  useEffect(() => {
    if (!open) {
      return
    }
    const handlePointer = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("mousedown", handlePointer)
    window.addEventListener("keydown", handleKey)
    return () => {
      window.removeEventListener("mousedown", handlePointer)
      window.removeEventListener("keydown", handleKey)
    }
  }, [open])

  const classes = [styles.root, className].filter(Boolean).join(" ")

  return (
    <div ref={rootRef} className={classes}>
      <button
        type="button"
        className={styles.trigger}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        <span className={styles.triggerIcon} aria-hidden="true">
          <Cpu size={14} strokeWidth={2.2} aria-hidden="true" />
        </span>
        <span className={styles.triggerMeta}>
          <span className={styles.triggerLabel}>Model</span>
          <span className={styles.triggerName}>{selected.name}</span>
        </span>
        <span className={styles.tierBadge} data-tier={selected.tier}>
          {TIER_LABEL[selected.tier]}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2.2}
          className={`${styles.caret} ${open ? styles.caretOpen : ""}`}
          aria-hidden="true"
        />
      </button>

      {open && (
        <ul className={styles.menu} role="listbox" aria-label="Model options">
          {models.map((option) => {
            const isSelected = option.id === selectedId
            return (
              <li key={option.id} role="option" aria-selected={isSelected}>
                <button
                  type="button"
                  className={styles.option}
                  onClick={() => {
                    onSelect(option.id)
                    setOpen(false)
                  }}
                >
                  <span className={styles.optionMain}>
                    <span className={styles.optionName}>{option.name}</span>
                    <span className={styles.optionTier} data-tier={option.tier}>
                      {TIER_LABEL[option.tier]}
                    </span>
                    {isSelected && (
                      <Check
                        size={13}
                        strokeWidth={2.4}
                        className={styles.checkmark}
                        aria-hidden="true"
                      />
                    )}
                  </span>
                  {option.description && (
                    <span className={styles.optionDesc}>{option.description}</span>
                  )}
                  <span className={styles.optionStats}>
                    <span className={styles.statChip}>{option.contextWindow} ctx</span>
                    <span className={styles.statChip}>{option.costPerMillion} / 1M</span>
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ModelSelector
