"use client"

import { Search } from "lucide-react"
import { useId, useState, type ChangeEvent, type KeyboardEvent, type ReactNode } from "react"

import { Kbd, KbdGroup } from "./kbd"
import styles from "./command-bar.module.css"

export interface CommandItem {
  id: string
  label: string
  hint?: string
  icon?: ReactNode
  shortcut?: string[]
  onSelect?: () => void
}

export interface CommandSection {
  id: string
  heading: string
  items: CommandItem[]
}

interface CommandBarProps {
  placeholder?: string
  query?: string
  defaultQuery?: string
  onQueryChange?: (value: string) => void
  onSelect?: (item: CommandItem) => void
  sections: CommandSection[]
  footerHint?: ReactNode
  emptyState?: ReactNode
  className?: string
}

export function CommandBar({
  placeholder = "Search commands…",
  query: controlledQuery,
  defaultQuery = "",
  onQueryChange,
  onSelect,
  sections,
  footerHint,
  emptyState,
  className,
}: CommandBarProps) {
  const [internalQuery, setInternalQuery] = useState(defaultQuery)
  const query = controlledQuery ?? internalQuery
  const listboxId = useId()

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    if (controlledQuery === undefined) {
      setInternalQuery(value)
    }
    onQueryChange?.(value)
  }

  const flatItems = sections.flatMap((section) => section.items)
  const visibleSections = query.trim().length === 0
    ? sections
    : sections
        .map((section) => ({
          ...section,
          items: section.items.filter((item) =>
            item.label.toLowerCase().includes(query.toLowerCase()),
          ),
        }))
        .filter((section) => section.items.length > 0)

  const isEmpty = visibleSections.length === 0

  const handleItemKey = (event: KeyboardEvent<HTMLLIElement>, item: CommandItem) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      onSelect?.(item)
      item.onSelect?.()
    }
  }

  const classes = [styles.bar, className].filter(Boolean).join(" ")

  return (
    <div className={classes}>
      <div className={styles.head}>
        <Search size={16} strokeWidth={2.2} className={styles.searchIcon} aria-hidden="true" />
        <input
          className={styles.input}
          type="search"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
          aria-controls={listboxId}
          aria-expanded={true}
          aria-autocomplete="list"
          aria-haspopup="listbox"
        />
        <KbdGroup separator="">
          <Kbd size="sm">Esc</Kbd>
        </KbdGroup>
      </div>
      <div className={styles.divider} aria-hidden="true" />
      <ul id={listboxId} role="listbox" className={styles.list}>
        {isEmpty && (
          <li className={styles.empty} aria-live="polite">
            {emptyState ?? (
              <span>
                No matches for <strong>&ldquo;{query}&rdquo;</strong>
              </span>
            )}
          </li>
        )}
        {!isEmpty &&
          visibleSections.map((section) => (
            <li key={section.id} className={styles.sectionItem}>
              <div className={styles.sectionHeading}>{section.heading}</div>
              <ul className={styles.sectionList} role="group" aria-label={section.heading}>
                {section.items.map((item) => (
                  <li
                    key={item.id}
                    role="option"
                    tabIndex={0}
                    aria-selected="false"
                    className={styles.item}
                    onClick={() => {
                      onSelect?.(item)
                      item.onSelect?.()
                    }}
                    onKeyDown={(event) => handleItemKey(event, item)}
                  >
                    <span className={styles.itemIcon} aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className={styles.itemLabel}>
                      <span className={styles.itemTitle}>{item.label}</span>
                      {item.hint && <span className={styles.itemHint}>{item.hint}</span>}
                    </span>
                    {item.shortcut && item.shortcut.length > 0 && (
                      <span className={styles.itemShortcut}>
                        <KbdGroup separator="">
                          {item.shortcut.map((key, index) => (
                            <Kbd key={`${item.id}-${index}`} size="sm">
                              {key}
                            </Kbd>
                          ))}
                        </KbdGroup>
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </li>
          ))}
      </ul>
      {footerHint && (
        <footer className={styles.foot}>
          <span className={styles.footCount}>{flatItems.length} commands</span>
          <span className={styles.footHint}>{footerHint}</span>
        </footer>
      )}
    </div>
  )
}

export default CommandBar
