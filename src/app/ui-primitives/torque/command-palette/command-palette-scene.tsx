"use client"

import { CornerDownLeft, Search, Sparkles } from "lucide-react"
import { useCallback, useEffect, useMemo, useState } from "react"

import { CommandModal } from "../../components/overlays"
import { Kbd, KbdGroup } from "../../components/primitives/kbd"
import { SearchHistoryRow, SearchSuggestionList } from "../../components/search"
import type { SuggestionGroup, SuggestionItem } from "../../components/search"

import styles from "./command-palette.module.css"
import {
  buildCommandRecents,
  buildCommandSections,
  buildSuggestionGroups,
  RECENT_RUNS,
} from "./_demo-data"

const PALETTE_PLACEHOLDER = "Ask Torque or run an action — new blog, schedule, SEO audit…"

/**
 * Keyboard hints shown in the legend strip. `keys` render through KbdGroup so
 * the visual treatment matches the in-palette shortcuts.
 */
const KEY_HINTS: ReadonlyArray<{ keys: ReadonlyArray<string>; label: string }> = [
  { keys: ["⌘", "K"], label: "Open Torque" },
  { keys: ["↑", "↓"], label: "Move" },
  { keys: ["↵"], label: "Run action" },
  { keys: ["Esc"], label: "Dismiss" },
]

export function CommandPaletteScene() {
  const [open, setOpen] = useState<boolean>(false)
  const [lastRun, setLastRun] = useState<string>("")
  const [recallHint, setRecallHint] = useState<string>("")

  const handlePick = useCallback((label: string) => {
    setLastRun(label)
  }, [])

  const sections = useMemo(() => buildCommandSections(handlePick), [handlePick])
  const recents = useMemo(() => buildCommandRecents(handlePick), [handlePick])
  const suggestionGroups = useMemo<ReadonlyArray<SuggestionGroup>>(
    () => buildSuggestionGroups(),
    [],
  )

  // Global ⌘K / Ctrl+K opens the palette — the canonical command-palette gesture.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  const handleSuggestionSelect = useCallback(
    (item: SuggestionItem) => {
      handlePick(item.label)
    },
    [handlePick],
  )

  return (
    <div className={styles.scene}>
      {/* App-surface backdrop the palette floats over: the Torque assistant bar. */}
      <section className={styles.surface} aria-label="Torque assistant workspace">
        <header className={styles.brandBar}>
          {/* Placeholder circular Torque avatar — the real mascot lands later. */}
          <span className={styles.avatar} aria-hidden="true">
            T
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>Torque</span>
            <span className={styles.brandRole}>Your Mufflermen business assistant</span>
          </span>
          <span className={styles.brandStatus}>
            <span className={styles.statusDot} aria-hidden="true" />
            Oak Flats · Illawarra NSW
          </span>
        </header>

        {/*
          The trigger is a plain <button> that opens the palette. The search
          affordance inside it is a NON-INTERACTIVE styled stand-in (spans only —
          no nested <form> or <input>), so the button stays valid + a11y-clean.
          The palette opens three ways: this button, the ⌘K/Ctrl+K shortcut, and
          recalling a recent run below.
        */}
        <button
          type="button"
          className={styles.trigger}
          onClick={() => setOpen(true)}
          aria-haspopup="dialog"
          aria-keyshortcuts="Meta+K Control+K"
          aria-label="Open the Torque command palette"
        >
          <span className={styles.triggerIcon} aria-hidden="true">
            <Search size={18} strokeWidth={2.2} />
          </span>
          <span className={styles.triggerLabel}>{PALETTE_PLACEHOLDER}</span>
          <span className={styles.triggerHint} aria-hidden="true">
            <KbdGroup separator="">
              <Kbd size="sm">⌘</Kbd>
              <Kbd size="sm">K</Kbd>
            </KbdGroup>
          </span>
        </button>

        <p className={styles.lede}>
          One bar to run the workshop&rsquo;s content. Draft an exhaust write-up, schedule a
          servicing special, refresh a Locations page, or audit how Oak Flats Muffler Men ranks
          for &ldquo;muffler repair Wollongong&rdquo; — Torque lines up every action and your
          recent runs.
        </p>
      </section>

      {/* Always-on preview so the screen reads as a real surface before the modal opens. */}
      <div className={styles.preview}>
        <section className={styles.actions} aria-label="Torque quick actions">
          <header className={styles.colHead}>
            <Sparkles size={14} strokeWidth={2.4} aria-hidden="true" />
            <h2 className={styles.colTitle}>Quick actions</h2>
            <span className={styles.colCount}>{suggestionGroups.length} groups</span>
          </header>
          <SearchSuggestionList
            groups={suggestionGroups}
            onSelect={handleSuggestionSelect}
            ariaLabel="Torque quick actions"
          />
        </section>

        <section className={styles.recents} aria-label="Recent Torque commands">
          <header className={styles.colHead}>
            <h2 className={styles.colTitle}>Recent</h2>
            <span className={styles.colCount}>{RECENT_RUNS.length} runs</span>
          </header>
          <div className={styles.recentList}>
            {RECENT_RUNS.map((run) => (
              <SearchHistoryRow
                key={run.id}
                query={run.query}
                timestamp={run.timestamp}
                occurredAt={run.occurredAt}
                resultCount={run.resultCount}
                onRecall={(query) => {
                  setRecallHint(query)
                  setOpen(true)
                }}
              />
            ))}
          </div>
          {recallHint ? (
            <p className={styles.recallNote} role="status">
              Re-running <span className={styles.recallQuery}>{recallHint}</span>
            </p>
          ) : null}
        </section>
      </div>

      {/* Keyboard legend + the live status of the last action. */}
      <footer className={styles.legend}>
        <ul className={styles.hintList}>
          {KEY_HINTS.map((hint) => (
            <li key={hint.label} className={styles.hint}>
              <KbdGroup separator="">
                {hint.keys.map((key) => (
                  <Kbd key={key} size="sm">
                    {key}
                  </Kbd>
                ))}
              </KbdGroup>
              <span className={styles.hintLabel}>{hint.label}</span>
            </li>
          ))}
        </ul>
        <p className={styles.runStatus} role="status" aria-live="polite">
          {lastRun ? (
            <>
              <CornerDownLeft size={13} strokeWidth={2.4} aria-hidden="true" />
              Ran <span className={styles.runLabel}>{lastRun}</span>
            </>
          ) : (
            <span className={styles.runIdle}>No action run yet</span>
          )}
        </p>
      </footer>

      <CommandModal
        open={open}
        onOpenChange={setOpen}
        placeholder={PALETTE_PLACEHOLDER}
        sections={sections}
        recents={recents}
        footerHint="↵ to run · ↑↓ to move · Esc to dismiss"
      />
    </div>
  )
}
