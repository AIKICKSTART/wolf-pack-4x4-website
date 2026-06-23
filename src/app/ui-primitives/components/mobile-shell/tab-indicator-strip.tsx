"use client"

import { motion } from "framer-motion"

import styles from "./tab-indicator-strip.module.css"

export interface TabStripEntry {
  id: string
  label: string
  count?: number
}

interface TabIndicatorStripProps {
  tabs: ReadonlyArray<TabStripEntry>
  activeId: string
  onSelect: (id: string) => void
  align?: "start" | "center"
  className?: string
}

const STRIP_LAYOUT_ID = "mufflermen-tab-strip-bar"

export function TabIndicatorStrip({
  tabs,
  activeId,
  onSelect,
  align = "start",
  className,
}: TabIndicatorStripProps) {
  const classes = [
    styles.strip,
    align === "center" ? styles.alignCenter : styles.alignStart,
    className,
  ]
    .filter(Boolean)
    .join(" ")

  return (
    <div className={classes}>
      <div role="tablist" aria-label="Section tabs" className={styles.track}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeId
          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              className={[styles.tab, isActive ? styles.tabActive : ""].filter(Boolean).join(" ")}
              onClick={() => onSelect(tab.id)}
            >
              <span className={styles.tabLabel}>{tab.label}</span>
              {typeof tab.count === "number" ? (
                <span className={styles.tabCount}>{tab.count}</span>
              ) : null}
              {isActive ? (
                <motion.span
                  layoutId={STRIP_LAYOUT_ID}
                  className={styles.indicator}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              ) : null}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default TabIndicatorStrip
