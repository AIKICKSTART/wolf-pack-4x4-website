"use client"

import { useId, useRef, useState, type KeyboardEvent } from "react"

import { CATEGORY_TONE, type NewsCategory, type NewsCategoryTab, type NewsTone } from "./news-types"

import styles from "./news-category-tabs.module.css"

const TONE_CLASS: Record<NewsTone, string> = {
  red: styles.toneRed,
  amber: styles.toneAmber,
  teal: styles.toneTeal,
  green: styles.toneGreen,
  neutral: styles.toneNeutral,
}

export interface NewsCategoryTabsProps {
  tabs: ReadonlyArray<NewsCategoryTab>
  /** Optional "All" tab prepended to the list. */
  includeAll?: boolean
  allLabel?: string
  defaultCategory?: NewsCategory | "all"
  onChange?: (category: NewsCategory | "all") => void
  className?: string
}

type TabValue = NewsCategory | "all"

interface ResolvedTab {
  value: TabValue
  label: string
  count: number
  tone: NewsTone
}

export function NewsCategoryTabs({
  tabs,
  includeAll = true,
  allLabel = "All news",
  defaultCategory = includeAll ? "all" : tabs[0]?.category,
  onChange,
  className,
}: NewsCategoryTabsProps) {
  const baseId = useId()
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([])

  const resolved: ResolvedTab[] = [
    ...(includeAll
      ? [
          {
            value: "all" as const,
            label: allLabel,
            count: tabs.reduce((sum, t) => sum + t.count, 0),
            tone: "red" as NewsTone,
          },
        ]
      : []),
    ...tabs.map((t) => ({
      value: t.category as TabValue,
      label: t.label,
      count: t.count,
      tone: CATEGORY_TONE[t.category],
    })),
  ]

  const [active, setActive] = useState<TabValue>(defaultCategory ?? resolved[0]?.value ?? "all")

  function select(value: TabValue) {
    setActive(value)
    onChange?.(value)
  }

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>, index: number) {
    const last = resolved.length - 1
    let next = index
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = index === last ? 0 : index + 1
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = index === 0 ? last : index - 1
    else if (event.key === "Home") next = 0
    else if (event.key === "End") next = last
    else return

    event.preventDefault()
    const target = resolved[next]
    select(target.value)
    buttonRefs.current[next]?.focus()
  }

  const classes = [styles.tabs, className].filter(Boolean).join(" ")

  return (
    <div
      className={classes}
      role="tablist"
      aria-label="News categories"
      onKeyDown={(event) => {
        const focusedIndex = buttonRefs.current.findIndex((el) => el === document.activeElement)
        if (focusedIndex >= 0) handleKeyDown(event, focusedIndex)
      }}
    >
      {resolved.map((tab, index) => {
        const isActive = tab.value === active
        return (
          <button
            key={tab.value}
            ref={(el) => {
              buttonRefs.current[index] = el
            }}
            type="button"
            role="tab"
            id={`${baseId}-tab-${tab.value}`}
            aria-selected={isActive}
            tabIndex={isActive ? 0 : -1}
            className={[styles.tab, TONE_CLASS[tab.tone]].join(" ")}
            data-active={isActive}
            onClick={() => select(tab.value)}
          >
            <span className={styles.tabLabel}>{tab.label}</span>
            <span className={styles.count}>{tab.count}</span>
          </button>
        )
      })}
    </div>
  )
}

export default NewsCategoryTabs
