"use client"

import { Calculator, Calendar, FileText, Hammer, Search, Wrench } from "lucide-react"
import { useMemo, useState } from "react"

import { CommandModal } from "../../components/overlays"
import type { CommandModalItem, CommandModalSection } from "../../components/overlays"
import styles from "../overlays.module.css"

export function CommandModalDemo() {
  const [open, setOpen] = useState<boolean>(false)
  const [picked, setPicked] = useState<string>("")

  const sections = useMemo<ReadonlyArray<CommandModalSection>>(() => {
    const choose = (label: string) => () => setPicked(`Picked · ${label}`)
    return [
      {
        id: "jobs",
        heading: "Jobs",
        items: [
          {
            id: "open-2415",
            label: "Open ticket 2415 · CHV-184",
            hint: "Bay 04 · sign-off pending",
            icon: <Wrench size={14} strokeWidth={2.2} />,
            shortcut: ["⌘", "1"],
            onSelect: choose("Open ticket 2415"),
          },
          {
            id: "open-2416",
            label: "Open ticket 2416 · BJ-441",
            hint: "Bay 02 · awaiting parts",
            icon: <Wrench size={14} strokeWidth={2.2} />,
            shortcut: ["⌘", "2"],
            onSelect: choose("Open ticket 2416"),
          },
          {
            id: "new-ticket",
            label: "New job ticket",
            icon: <Hammer size={14} strokeWidth={2.2} />,
            shortcut: ["⌘", "N"],
            onSelect: choose("New job ticket"),
          },
        ],
      },
      {
        id: "quotes",
        heading: "Quotes",
        items: [
          {
            id: "quote-build",
            label: "Build a new quote",
            icon: <Calculator size={14} strokeWidth={2.2} />,
            shortcut: ["⌘", "Q"],
            onSelect: choose("Build a new quote"),
          },
          {
            id: "quote-tax",
            label: "Generate tax invoice",
            icon: <FileText size={14} strokeWidth={2.2} />,
            shortcut: ["⌘", "I"],
            onSelect: choose("Generate tax invoice"),
          },
        ],
      },
      {
        id: "schedule",
        heading: "Schedule",
        items: [
          {
            id: "today",
            label: "Today's bay schedule",
            icon: <Calendar size={14} strokeWidth={2.2} />,
            shortcut: ["⌘", "T"],
            onSelect: choose("Today's bay schedule"),
          },
          {
            id: "next-week",
            label: "Next week roster",
            icon: <Calendar size={14} strokeWidth={2.2} />,
            onSelect: choose("Next week roster"),
          },
        ],
      },
    ]
  }, [])

  const recents = useMemo<ReadonlyArray<CommandModalItem>>(
    () => [
      {
        id: "recent-1",
        label: "Open ticket 2415 · CHV-184",
        hint: "Yesterday · 16:08",
        onSelect: () => setPicked("Picked · recent ticket 2415"),
      },
      {
        id: "recent-2",
        label: "Build a new quote",
        hint: "Yesterday · 15:42",
        onSelect: () => setPicked("Picked · recent quote builder"),
      },
    ],
    [],
  )

  return (
    <div className={styles.stage}>
      <div className={styles.stageRow}>
        <button type="button" className={styles.primaryBtn} onClick={() => setOpen(true)}>
          <Search size={14} strokeWidth={2.4} aria-hidden="true" /> Open command palette
        </button>
        {picked && <span className={styles.statusPill}>{picked}</span>}
      </div>
      <span className={styles.stageHelp}>Trigger · click the button</span>

      <CommandModal
        open={open}
        onOpenChange={setOpen}
        placeholder="Search jobs, quotes, schedule…"
        sections={sections}
        recents={recents}
        footerHint="↵ to select · ↑↓ to navigate · Esc to dismiss"
      />
    </div>
  )
}
