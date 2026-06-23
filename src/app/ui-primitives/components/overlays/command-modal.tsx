"use client"

import autoAnimate from "@formkit/auto-animate"
import { Dialog as BaseDialog } from "@base-ui/react/dialog"
import { Clock, Search } from "lucide-react"
import {
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ReactNode,
} from "react"

import { Kbd, KbdGroup } from "../primitives/kbd"
import styles from "./command-modal.module.css"

export interface CommandModalItem {
  id: string
  label: string
  hint?: string
  icon?: ReactNode
  shortcut?: ReadonlyArray<string>
  onSelect: () => void
}

export interface CommandModalSection {
  id: string
  heading: string
  items: ReadonlyArray<CommandModalItem>
}

interface CommandModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  placeholder?: string
  sections: ReadonlyArray<CommandModalSection>
  recents?: ReadonlyArray<CommandModalItem>
  footerHint?: ReactNode
}

function reducedMotionEnabled(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

export function CommandModal({
  open,
  onOpenChange,
  placeholder = "Type a command…",
  sections,
  recents = [],
  footerHint,
}: CommandModalProps) {
  const [query, setQuery] = useState<string>("")
  const [prevOpen, setPrevOpen] = useState<boolean>(open)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listRef = useRef<HTMLUListElement | null>(null)
  const listboxId = useId()

  if (open !== prevOpen) {
    setPrevOpen(open)
    if (open) {
      setQuery("")
    }
  }

  useEffect(() => {
    if (open) {
      const id = window.setTimeout(() => inputRef.current?.focus(), 30)
      return () => window.clearTimeout(id)
    }
    return undefined
  }, [open])

  useEffect(() => {
    const node = listRef.current
    if (!node || reducedMotionEnabled()) {
      return
    }
    autoAnimate(node, { duration: 200, easing: "ease-out" })
  }, [])

  const trimmed = query.trim().toLowerCase()

  const filteredSections = useMemo(() => {
    if (trimmed.length === 0) {
      return sections
    }
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => item.label.toLowerCase().includes(trimmed)),
      }))
      .filter((section) => section.items.length > 0)
  }, [sections, trimmed])

  const showRecents = trimmed.length === 0 && recents.length > 0
  const isEmpty = filteredSections.length === 0 && !showRecents

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
  }

  const handleItemKey = (
    event: KeyboardEvent<HTMLLIElement>,
    item: CommandModalItem,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault()
      item.onSelect()
      onOpenChange(false)
    }
  }

  const handleSelect = (item: CommandModalItem) => {
    item.onSelect()
    onOpenChange(false)
  }

  return (
    <BaseDialog.Root open={open} onOpenChange={onOpenChange}>
      <BaseDialog.Portal>
        <BaseDialog.Backdrop className={styles.backdrop} />
        <BaseDialog.Popup className={styles.popup}>
          <BaseDialog.Title className={styles.srOnly}>Command palette</BaseDialog.Title>
          <header className={styles.head}>
            <Search size={16} strokeWidth={2.2} className={styles.searchIcon} aria-hidden="true" />
            <input
              ref={inputRef}
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
            />
            <KbdGroup separator="">
              <Kbd size="sm">Esc</Kbd>
            </KbdGroup>
          </header>
          <div className={styles.divider} aria-hidden="true" />
          <ul id={listboxId} ref={listRef} role="listbox" className={styles.list}>
            {showRecents && (
              <li className={styles.sectionItem}>
                <div className={styles.sectionHeading}>
                  <Clock size={12} strokeWidth={2.4} aria-hidden="true" /> Recent
                </div>
                <ul className={styles.sectionList} role="group" aria-label="Recent commands">
                  {recents.map((item) => (
                    <li
                      key={`recent-${item.id}`}
                      role="option"
                      tabIndex={0}
                      aria-selected="false"
                      className={styles.item}
                      onClick={() => handleSelect(item)}
                      onKeyDown={(event) => handleItemKey(event, item)}
                    >
                      <span className={styles.itemIcon} aria-hidden="true">
                        {item.icon ?? <Clock size={14} strokeWidth={2.2} />}
                      </span>
                      <span className={styles.itemLabel}>
                        <span className={styles.itemTitle}>{item.label}</span>
                        {item.hint && <span className={styles.itemHint}>{item.hint}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            )}
            {isEmpty && (
              <li className={styles.empty} aria-live="polite">
                No matches for <strong>&ldquo;{query}&rdquo;</strong>
              </li>
            )}
            {filteredSections.map((section) => (
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
                      onClick={() => handleSelect(item)}
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
                            {item.shortcut.map((key, idx) => (
                              <Kbd key={`${item.id}-${idx}`} size="sm">
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
              <span className={styles.footHint}>{footerHint}</span>
            </footer>
          )}
        </BaseDialog.Popup>
      </BaseDialog.Portal>
    </BaseDialog.Root>
  )
}

export default CommandModal
