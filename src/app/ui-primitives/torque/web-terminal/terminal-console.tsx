"use client"

import { CornerDownLeft, Lock, TerminalSquare } from "lucide-react"
import { useId, useRef, useState, type KeyboardEvent } from "react"

import { StatusBadge } from "@/app/ui-primitives/components/data-display/status-badge-grid"
import { CodeBlock } from "@/app/ui-primitives/components/primitives/code-block"
import { Kbd, KbdGroup } from "@/app/ui-primitives/components/primitives/kbd"
import { OutputPreviewPane } from "@/app/ui-primitives/components/dev-experience"

import styles from "./web-terminal.module.css"
import { SUGGESTED_COMMANDS, type TerminalSession } from "./_demo-data"

interface TerminalConsoleProps {
  sessions: ReadonlyArray<TerminalSession>
}

/**
 * Read-only operator console: monospaced scrollback + session tabs + run
 * status + a disabled prompt input. No real shell is attached — the input is
 * inert by design (operator-only safety framing).
 */
export function TerminalConsole({ sessions }: TerminalConsoleProps) {
  const tablistId = useId()
  const [activeId, setActiveId] = useState<string>(sessions[0]?.id ?? "")
  const active = sessions.find((s) => s.id === activeId) ?? sessions[0]
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([])

  // WAI-ARIA APG Tabs keyboard pattern: ArrowLeft/ArrowRight move between tabs
  // (wrapping at the ends), Home/End jump to the first/last tab. Selection
  // follows focus, and focus is moved to the newly selected tab.
  const handleTabKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const currentIndex = sessions.findIndex((s) => s.id === active.id)
    if (currentIndex < 0) {
      return
    }

    const lastIndex = sessions.length - 1
    let nextIndex = currentIndex

    switch (event.key) {
      case "ArrowRight":
        nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1
        break
      case "ArrowLeft":
        nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1
        break
      case "Home":
        nextIndex = 0
        break
      case "End":
        nextIndex = lastIndex
        break
      default:
        return
    }

    event.preventDefault()
    const nextSession = sessions[nextIndex]
    if (!nextSession) {
      return
    }
    setActiveId(nextSession.id)
    tabRefs.current[nextIndex]?.focus()
  }

  if (!active) {
    return null
  }

  return (
    <section className={styles.console} aria-label="Torque operator console">
      <div className={styles.windowBar}>
        <span className={styles.trafficLights} aria-hidden="true">
          <span className={styles.light} data-tone="red" />
          <span className={styles.light} data-tone="amber" />
          <span className={styles.light} data-tone="green" />
        </span>
        <span className={styles.windowTitle}>
          <TerminalSquare size={13} strokeWidth={2.2} aria-hidden="true" />
          Torque operator console
        </span>
        <span className={styles.windowFlag}>
          <Lock size={11} strokeWidth={2.4} aria-hidden="true" />
          read-only
        </span>
      </div>

      <div
        className={styles.tabs}
        role="tablist"
        aria-label="Operator sessions"
        id={tablistId}
        onKeyDown={handleTabKeyDown}
      >
        {sessions.map((session, index) => {
          const selected = session.id === active.id
          return (
            <button
              key={session.id}
              ref={(node) => {
                tabRefs.current[index] = node
              }}
              type="button"
              role="tab"
              aria-selected={selected}
              aria-controls={`${tablistId}-${session.id}`}
              tabIndex={selected ? 0 : -1}
              className={`${styles.tab} ${selected ? styles.tabActive : ""}`}
              onClick={() => setActiveId(session.id)}
            >
              <span className={styles.tabDot} data-tone={session.statusTone} aria-hidden="true" />
              <span className={styles.tabLabel}>{session.label}</span>
            </button>
          )
        })}
      </div>

      <div
        className={styles.body}
        role="tabpanel"
        id={`${tablistId}-${active.id}`}
        aria-label={`${active.label} session`}
      >
        <header className={styles.sessionHead}>
          <span className={styles.sessionHost}>{active.host}</span>
          <StatusBadge tone={active.statusTone} size="sm" shape="pill" label={active.statusLabel} />
        </header>

        <CodeBlock
          code={active.transcript}
          language="bash"
          fileName="scrollback"
          showLineNumbers={false}
          maxHeight={360}
          caption="Canned transcript — no live process is attached to this demo."
          className={styles.scrollback}
        />

        <div className={styles.runDetail}>
          <span className={styles.runDetailLabel}>Run detail</span>
          <OutputPreviewPane streams={active.streams} />
        </div>

        {/* Inert prompt: this is a read-only demo, the field never executes. */}
        <form
          className={styles.promptRow}
          aria-label="Command input (disabled in demo)"
          onSubmit={(event) => event.preventDefault()}
        >
          <span className={styles.promptGlyph} aria-hidden="true">
            oakflats@ofm-prod:~/torque$
          </span>
          <input
            type="text"
            className={styles.promptInput}
            placeholder="Command entry is disabled in this operator-only demo"
            aria-label="Command entry (disabled in this read-only demo)"
            disabled
            readOnly
          />
          <span className={styles.promptHint}>
            <KbdGroup size="sm">
              <Kbd size="sm">Enter</Kbd>
            </KbdGroup>
            <CornerDownLeft size={12} strokeWidth={2.2} aria-hidden="true" />
          </span>
        </form>

        <div className={styles.suggestions} aria-label="Recent commands">
          <span className={styles.suggestionsLabel}>Recent</span>
          <ul className={styles.suggestionsList}>
            {SUGGESTED_COMMANDS.map((command) => (
              <li key={command} className={styles.suggestion}>
                <code>{command}</code>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default TerminalConsole
