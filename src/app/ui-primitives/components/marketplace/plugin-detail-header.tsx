"use client"

import type { ReactNode } from "react"

import styles from "./plugin-detail-header.module.css"

export type PluginDetailTabId =
  | "overview"
  | "permissions"
  | "pricing"
  | "reviews"
  | "changelog"

export interface PluginDetailTab {
  id: PluginDetailTabId
  label: string
  href?: string
}

export interface PluginDetailHeaderProps {
  name: string
  author: string
  tagline: string
  installSlot?: ReactNode
  logo?: ReactNode
  tabs?: ReadonlyArray<PluginDetailTab>
  activeTab?: PluginDetailTabId
  onTabSelect?: (id: PluginDetailTabId) => void
  className?: string
}

const DEFAULT_TABS: ReadonlyArray<PluginDetailTab> = [
  { id: "overview", label: "Overview" },
  { id: "permissions", label: "Permissions" },
  { id: "pricing", label: "Pricing" },
  { id: "reviews", label: "Reviews" },
  { id: "changelog", label: "Changelog" },
]

function FallbackLogo({ name }: { name: string }) {
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase()
  return (
    <svg viewBox="0 0 56 56" width="44" height="44" role="img" aria-label={`${name} logo`}>
      <rect
        x="3"
        y="3"
        width="50"
        height="50"
        rx="11"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
      <text
        x="28"
        y="36"
        textAnchor="middle"
        fontFamily="var(--primitive-font-display)"
        fontSize="22"
        fontWeight="700"
        fill="currentColor"
      >
        {initials}
      </text>
    </svg>
  )
}

export function PluginDetailHeader({
  name,
  author,
  tagline,
  installSlot,
  logo,
  tabs = DEFAULT_TABS,
  activeTab = "overview",
  onTabSelect,
  className,
}: PluginDetailHeaderProps) {
  const classes = [styles.header, className].filter(Boolean).join(" ")

  return (
    <header className={classes}>
      <div className={styles.identity}>
        <div className={styles.logo} aria-hidden="true">
          {logo ?? <FallbackLogo name={name} />}
        </div>
        <div className={styles.copy}>
          <span className={styles.byline}>By {author}</span>
          <h1 className={styles.title}>{name}</h1>
          <p className={styles.tagline}>{tagline}</p>
        </div>
        {installSlot && <div className={styles.actionSlot}>{installSlot}</div>}
      </div>

      <div className={styles.tabs} role="tablist" aria-label={`${name} sections`}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTab
          if (onTabSelect) {
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={styles.tab}
                onClick={() => onTabSelect(tab.id)}
              >
                {tab.label}
              </button>
            )
          }
          return (
            <a
              key={tab.id}
              className={styles.tab}
              role="tab"
              aria-selected={isActive}
              href={tab.href ?? `#${tab.id}`}
            >
              {tab.label}
            </a>
          )
        })}
      </div>
    </header>
  )
}

export default PluginDetailHeader
