// Demo fixtures for the Torque command palette screen.
// "Torque" is the customer-facing name for the Mufflermen business assistant.
// (Dev note: internally this maps to the agent console formerly code-named differently;
// no customer-visible legacy name appears in any copy here.)

import {
  CalendarClock,
  Image as ImageIcon,
  PenSquare,
  Search,
  SquarePen,
} from "lucide-react"
import type { ReactNode } from "react"

import type {
  CommandModalItem,
  CommandModalSection,
} from "../../components/overlays"
import type { SuggestionGroup } from "../../components/search"

export interface QuickActionMeta {
  id: string
  group: string
  label: string
  hint: string
  shortcut: ReadonlyArray<string>
  icon: ReactNode
}

export interface RecentRun {
  id: string
  query: string
  timestamp: string
  occurredAt: string
  resultCount: number
}

const ICON_SIZE = 14
const ICON_STROKE = 2.2

/**
 * The five core Torque quick actions, grouped by the workflow they belong to.
 * Each is a real task the Oak Flats Muffler Men owner runs from the assistant.
 */
export const QUICK_ACTIONS: ReadonlyArray<QuickActionMeta> = [
  {
    id: "new-blog",
    group: "Create",
    label: "New blog post",
    hint: "Draft an exhaust/servicing article for mufflermen.com.au",
    shortcut: ["⌘", "B"],
    icon: <PenSquare size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  },
  {
    id: "generate-image",
    group: "Create",
    label: "Generate image",
    hint: "Brand-safe hero shot — Illawarra workshop, performance exhausts",
    shortcut: ["⌘", "G"],
    icon: <ImageIcon size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  },
  {
    id: "schedule-post",
    group: "Publish",
    label: "Schedule a post",
    hint: "Queue to the Oak Flats socials & newsletter",
    shortcut: ["⌘", "S"],
    icon: <CalendarClock size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  },
  {
    id: "update-page",
    group: "Publish",
    label: "Update a page",
    hint: "Edit Services, Locations or the Oak Flats workshop page",
    shortcut: ["⌘", "U"],
    icon: <SquarePen size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  },
  {
    id: "run-seo-audit",
    group: "Optimise",
    label: "Run SEO audit",
    hint: "Score Illawarra NSW landing pages & flag fixes",
    shortcut: ["⌘", "K"],
    icon: <Search size={ICON_SIZE} strokeWidth={ICON_STROKE} />,
  },
]

/** Recent commands the owner ran — surfaced when the palette query is empty. */
export const RECENT_RUNS: ReadonlyArray<RecentRun> = [
  {
    id: "recent-cat-back",
    query: "New blog post · “Cat-back vs axle-back for your Hilux”",
    timestamp: "Today · 08:42",
    occurredAt: "2026-05-29T08:42:00+10:00",
    resultCount: 1,
  },
  {
    id: "recent-schedule",
    query: "Schedule a post · winter servicing special",
    timestamp: "Yesterday · 16:05",
    occurredAt: "2026-05-28T16:05:00+10:00",
    resultCount: 3,
  },
  {
    id: "recent-audit",
    query: "Run SEO audit · “muffler repair Wollongong”",
    timestamp: "Tue · 11:18",
    occurredAt: "2026-05-27T11:18:00+10:00",
    resultCount: 12,
  },
]

/** Group the quick actions into the modal's sectioned listbox shape. */
export function buildCommandSections(
  onPick: (label: string) => void,
): ReadonlyArray<CommandModalSection> {
  const order: ReadonlyArray<string> = ["Create", "Publish", "Optimise"]
  return order.map((groupName) => {
    const items: ReadonlyArray<CommandModalItem> = QUICK_ACTIONS.filter(
      (action) => action.group === groupName,
    ).map((action) => ({
      id: action.id,
      label: action.label,
      hint: action.hint,
      icon: action.icon,
      shortcut: action.shortcut,
      onSelect: () => onPick(action.label),
    }))
    return { id: groupName.toLowerCase(), heading: groupName, items }
  })
}

/** Recents in the modal's item shape (label + relative-time hint). */
export function buildCommandRecents(
  onPick: (label: string) => void,
): ReadonlyArray<CommandModalItem> {
  const labelById: Record<string, string> = {
    "recent-cat-back": "New blog post",
    "recent-schedule": "Schedule a post",
    "recent-audit": "Run SEO audit",
  }
  return RECENT_RUNS.map((run) => ({
    id: run.id,
    label: run.query,
    hint: run.timestamp,
    onSelect: () => onPick(labelById[run.id] ?? "Recent command"),
  }))
}

/** Build the always-on inline preview groups for the SearchSuggestionList. */
export function buildSuggestionGroups(): ReadonlyArray<SuggestionGroup> {
  const byGroup = (groupName: string) =>
    QUICK_ACTIONS.filter((action) => action.group === groupName).map((action) => ({
      id: action.id,
      label: action.label,
      meta: action.hint,
      icon: action.icon,
    }))

  return [
    { id: "create", heading: "Create", kind: "custom", items: byGroup("Create") },
    { id: "publish", heading: "Publish", kind: "links", items: byGroup("Publish") },
    { id: "optimise", heading: "Optimise", kind: "popular", items: byGroup("Optimise") },
  ]
}
