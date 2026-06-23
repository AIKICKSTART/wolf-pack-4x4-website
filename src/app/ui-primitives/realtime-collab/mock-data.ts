/**
 * Shared Oak Flats Mufflermen mock collaborators + events used across the
 * realtime-collab sub-routes + full-room composition.
 *
 * Co-editing Quote #Q-1408 — 2019 Hilux 2.8L exhaust replacement.
 */
import type {
  CollabActivityEntry,
  CollabReadReceipt,
  CollabUser,
} from "../components/realtime-collab"

export const MARCUS: CollabUser = {
  id: "u-marcus",
  name: "Marcus Halverson",
  role: "Owner",
  status: "online",
  tone: "teal",
  cursorTone: "blue",
  timezone: "Australia/Sydney",
}

export const SOPHIE: CollabUser = {
  id: "u-sophie",
  name: "Sophie Tan",
  role: "Workshop Manager",
  status: "online",
  tone: "amber",
  cursorTone: "amber",
  timezone: "Australia/Sydney",
}

export const JORDAN: CollabUser = {
  id: "u-jordan",
  name: "Jordan Pace",
  role: "Apprentice",
  status: "idle",
  tone: "green",
  cursorTone: "green",
  timezone: "Australia/Perth",
}

export const BEC: CollabUser = {
  id: "u-bec",
  name: "Bec Lawson",
  role: "Front Desk",
  status: "online",
  tone: "red",
  cursorTone: "pink",
  timezone: "Australia/Sydney",
}

export const DANIEL: CollabUser = {
  id: "u-daniel",
  name: "Daniel Fleuren",
  role: "Software",
  status: "busy",
  tone: "obsidian",
  cursorTone: "purple",
  timezone: "Australia/Sydney",
}

export const COLLABORATORS: ReadonlyArray<CollabUser> = [
  MARCUS,
  SOPHIE,
  JORDAN,
  BEC,
  DANIEL,
]

export const ACTIVITY_EVENTS: ReadonlyArray<CollabActivityEntry> = [
  {
    id: "act-1",
    actor: SOPHIE,
    kind: "edited",
    description: "Updated labour rate to $148/hr on row 3",
    target: "Labour line 3",
    timestamp: "Just now",
  },
  {
    id: "act-2",
    actor: JORDAN,
    kind: "commented",
    description: "Asked about Magnaflow vs Vibrant on row 5",
    target: "Parts line 5",
    timestamp: "12s ago",
  },
  {
    id: "act-3",
    actor: BEC,
    kind: "joined",
    description: "Joined the quote room from front desk",
    timestamp: "1m ago",
  },
  {
    id: "act-4",
    actor: MARCUS,
    kind: "added",
    description: "Added catalytic converter to parts list",
    target: "Parts line 4",
    timestamp: "2m ago",
  },
  {
    id: "act-5",
    actor: SOPHIE,
    kind: "resolved",
    description: "Resolved comment thread on warranty period",
    target: "Notes",
    timestamp: "4m ago",
  },
  {
    id: "act-6",
    actor: DANIEL,
    kind: "shared",
    description: "Generated a view-only share link",
    timestamp: "8m ago",
  },
]

export const READ_RECEIPTS: ReadonlyArray<CollabReadReceipt> = [
  { id: "rr-marcus", reader: MARCUS, seenAt: "Just now" },
  { id: "rr-sophie", reader: SOPHIE, seenAt: "5s ago" },
  { id: "rr-jordan", reader: JORDAN, seenAt: "28s ago" },
  { id: "rr-bec", reader: BEC, seenAt: "1m ago" },
]
