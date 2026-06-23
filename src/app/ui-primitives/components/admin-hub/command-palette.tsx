"use client"

import { Command, History, Search, Sparkles } from "lucide-react"
import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react"

import { Kbd, KbdGroup } from "../primitives/kbd"
import {
  COMMAND_GROUP_LABEL,
  type CommandPaletteEntry,
  type CommandPaletteSuggestion,
} from "./admin-hub-types"

import styles from "./command-palette.module.css"

interface CommandPaletteProps {
  commands: ReadonlyArray<CommandPaletteEntry>
  recents?: ReadonlyArray<CommandPaletteEntry>
  suggestions?: ReadonlyArray<CommandPaletteSuggestion>
  /**
   * Whether the palette is open. When omitted, the palette renders as if open
   * in the static showcase context.
   */
  open?: boolean
  onOpenChange?: (open: boolean) => void
  /** Default query for the showcase. */
  defaultQuery?: string
  /** Bind Cmd/Ctrl+K to open. Defaults to true. */
  bindShortcut?: boolean
  className?: string
}

interface FlatItem {
  id: string
  label: string
  hint?: string
  shortcut?: ReadonlyArray<string>
  groupLabel: string
}

function flattenCommands(
  commands: ReadonlyArray<CommandPaletteEntry>,
): FlatItem[] {
  return commands.map((command) => ({
    id: command.id,
    label: command.label,
    hint: command.hint,
    shortcut: command.shortcut,
    groupLabel: COMMAND_GROUP_LABEL[command.group],
  }))
}

function filterCommands(
  items: ReadonlyArray<FlatItem>,
  query: string,
): FlatItem[] {
  if (query.trim().length === 0) return [...items]
  const needle = query.toLowerCase()
  return items.filter(
    (item) =>
      item.label.toLowerCase().includes(needle) ||
      (item.hint && item.hint.toLowerCase().includes(needle)),
  )
}

function groupCommands(
  items: ReadonlyArray<FlatItem>,
): ReadonlyArray<{ heading: string; items: FlatItem[] }> {
  const map = new Map<string, FlatItem[]>()
  for (const item of items) {
    const bucket = map.get(item.groupLabel) ?? []
    bucket.push(item)
    map.set(item.groupLabel, bucket)
  }
  return Array.from(map.entries()).map(([heading, items]) => ({
    heading,
    items,
  }))
}

export function CommandPalette({
  commands,
  recents = [],
  suggestions = [],
  open: openProp,
  onOpenChange,
  defaultQuery = "",
  bindShortcut = true,
  className,
}: CommandPaletteProps) {
  const [internalOpen, setInternalOpen] = useState<boolean>(true)
  const open = openProp ?? internalOpen
  const [query, setQuery] = useState<string>(defaultQuery)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const listId = useId()

  const flatItems = useMemo(() => flattenCommands(commands), [commands])
  const filtered = useMemo(() => filterCommands(flatItems, query), [flatItems, query])
  const grouped = useMemo(() => groupCommands(filtered), [filtered])

  const setOpen = useCallback(
    (next: boolean) => {
      if (openProp === undefined) {
        setInternalOpen(next)
      }
      onOpenChange?.(next)
    },
    [openProp, onOpenChange],
  )

  useEffect(() => {
    if (!bindShortcut) return
    const handler = (event: globalThis.KeyboardEvent) => {
      const isMod = event.metaKey || event.ctrlKey
      if (isMod && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen(!open)
      }
      if (event.key === "Escape") {
        setOpen(false)
      }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  }, [bindShortcut, open, setOpen])

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus({ preventScroll: true })
    }
  }, [open])

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value)
    setActiveIndex(0)
  }

  const handleListKey = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowDown") {
      event.preventDefault()
      setActiveIndex((prev) => Math.min(prev + 1, Math.max(0, filtered.length - 1)))
    }
    if (event.key === "ArrowUp") {
      event.preventDefault()
      setActiveIndex((prev) => Math.max(0, prev - 1))
    }
    if (event.key === "Enter") {
      event.preventDefault()
      const target = filtered[activeIndex]
      if (target) {
        setOpen(false)
      }
    }
  }

  const showRecents = query.trim().length === 0 && recents.length > 0
  const showSuggestions = query.trim().length === 0 && suggestions.length > 0
  const activeId =
    filtered.length > 0 ? `cmd-${filtered[Math.min(activeIndex, filtered.length - 1)].id}` : undefined

  return (
    <section
      className={[styles.palette, open ? styles.open : styles.closed, className]
        .filter(Boolean)
        .join(" ")}
      aria-label="Command palette"
    >
      <header className={styles.head}>
        <Search size={16} strokeWidth={2.2} aria-hidden="true" className={styles.searchIcon} />
        <input
          ref={inputRef}
          className={styles.input}
          type="search"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          placeholder="Search commands, jump to, create…"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleListKey}
          aria-controls={listId}
          aria-expanded={open}
          aria-autocomplete="list"
          aria-activedescendant={activeId}
          aria-haspopup="listbox"
        />
        <span className={styles.shortcut} aria-hidden="true">
          <KbdGroup separator="">
            <Kbd size="sm">⌘</Kbd>
            <Kbd size="sm">K</Kbd>
          </KbdGroup>
        </span>
      </header>

      <div id={listId} role="listbox" aria-label="Commands" className={styles.list}>
        {showSuggestions && (
          <section className={styles.section} aria-label="AI suggestions">
            <h4 className={styles.sectionHead}>
              <Sparkles size={11} strokeWidth={2.2} aria-hidden="true" />
              Hermes suggests
            </h4>
            <ul className={styles.sectionList}>
              {suggestions.map((suggestion) => (
                <li
                  key={suggestion.id}
                  role="option"
                  tabIndex={-1}
                  aria-selected="false"
                  className={[styles.item, styles.itemSuggestion].join(" ")}
                >
                  <span className={styles.itemBody}>
                    <span className={styles.itemLabel}>{suggestion.label}</span>
                    <span className={styles.itemHint}>{suggestion.reason}</span>
                  </span>
                  {suggestion.shortcut && (
                    <span className={styles.itemShortcut} aria-hidden="true">
                      <KbdGroup separator="">
                        {suggestion.shortcut.map((key, idx) => (
                          <Kbd key={`${suggestion.id}-${idx}`} size="sm">
                            {key}
                          </Kbd>
                        ))}
                      </KbdGroup>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {showRecents && (
          <section className={styles.section} aria-label="Recent commands">
            <h4 className={styles.sectionHead}>
              <History size={11} strokeWidth={2.2} aria-hidden="true" />
              Recent
            </h4>
            <ul className={styles.sectionList}>
              {recents.map((recent) => (
                <li
                  key={`recent-${recent.id}`}
                  role="option"
                  tabIndex={-1}
                  aria-selected="false"
                  className={styles.item}
                >
                  <span className={styles.itemBody}>
                    <span className={styles.itemLabel}>{recent.label}</span>
                    {recent.hint && <span className={styles.itemHint}>{recent.hint}</span>}
                  </span>
                  {recent.shortcut && (
                    <span className={styles.itemShortcut} aria-hidden="true">
                      <KbdGroup separator="">
                        {recent.shortcut.map((key, idx) => (
                          <Kbd key={`${recent.id}-${idx}`} size="sm">
                            {key}
                          </Kbd>
                        ))}
                      </KbdGroup>
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </section>
        )}

        {grouped.map((group) => (
          <section
            key={group.heading}
            className={styles.section}
            aria-label={group.heading}
          >
            <h4 className={styles.sectionHead}>
              <Command size={11} strokeWidth={2.2} aria-hidden="true" />
              {group.heading}
            </h4>
            <ul className={styles.sectionList}>
              {group.items.map((item) => {
                const isActive = filtered[activeIndex]?.id === item.id
                return (
                  <li
                    id={`cmd-${item.id}`}
                    key={item.id}
                    role="option"
                    tabIndex={-1}
                    aria-selected={isActive}
                    className={[styles.item, isActive ? styles.itemActive : ""]
                      .filter(Boolean)
                      .join(" ")}
                  >
                    <span className={styles.itemBody}>
                      <span className={styles.itemLabel}>{item.label}</span>
                      {item.hint && <span className={styles.itemHint}>{item.hint}</span>}
                    </span>
                    {item.shortcut && (
                      <span className={styles.itemShortcut} aria-hidden="true">
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
                )
              })}
            </ul>
          </section>
        ))}

        {grouped.length === 0 && !showRecents && !showSuggestions && (
          <p className={styles.empty} aria-live="polite">
            No commands match <strong>&ldquo;{query}&rdquo;</strong>
          </p>
        )}
      </div>

      <footer className={styles.foot}>
        <span className={styles.footHint}>
          <KbdGroup separator="">
            <Kbd size="sm">↑</Kbd>
            <Kbd size="sm">↓</Kbd>
          </KbdGroup>
          navigate
        </span>
        <span className={styles.footHint}>
          <Kbd size="sm">Enter</Kbd>
          select
        </span>
        <span className={styles.footHint}>
          <Kbd size="sm">Esc</Kbd>
          close
        </span>
      </footer>
    </section>
  )
}

export default CommandPalette
