/**
 * Showcase fixtures for the collab-deep primitive pack.
 *
 * Workshop team co-editing the Falcon parts CMS page:
 *   - Daniel V. (red / pink cursor) — admin owner, just hit save
 *   - Mia P.    (teal / blue cursor) — title block
 *   - Tim H.    (amber cursor) — price field
 * Plus Brad, Jase, Hannah floating around. Voice room: "Bay floor".
 * Conflict on the description: 3 versions exist (base, Daniel's, Tim's).
 *
 * Values are deliberately stable so route screenshots stay deterministic.
 */

import type {
  AwarenessEntry,
  CollabUser,
  CommitPulseEvent,
  ConflictVersion,
  CursorTrailStep,
  DeepCursor,
  LiveEdit,
  LockZone,
  RemoteSelection,
  VoiceParticipant,
} from "../components/collab-deep"

/* ---------------- Users ---------------- */

export const USER_DANIEL: CollabUser = {
  id: "daniel-v",
  name: "Daniel V.",
  role: "Owner",
  status: "online",
  tone: "red",
  cursorTone: "pink",
}

export const USER_MIA: CollabUser = {
  id: "mia-p",
  name: "Mia P.",
  role: "Content",
  status: "online",
  tone: "teal",
  cursorTone: "blue",
}

export const USER_TIM: CollabUser = {
  id: "tim-h",
  name: "Tim H.",
  role: "Service mgr",
  status: "online",
  tone: "amber",
  cursorTone: "amber",
}

export const USER_BRAD: CollabUser = {
  id: "brad-s",
  name: "Brad S.",
  role: "Tech",
  status: "online",
  tone: "obsidian",
  cursorTone: "purple",
}

export const USER_JASE: CollabUser = {
  id: "jase-m",
  name: "Jase M.",
  role: "Tech",
  status: "idle",
  tone: "green",
  cursorTone: "green",
}

export const USER_HANNAH: CollabUser = {
  id: "hannah-k",
  name: "Hannah K.",
  role: "Marketing",
  status: "online",
  tone: "amber",
  cursorTone: "orange",
}

export const ALL_USERS: ReadonlyArray<CollabUser> = [
  USER_DANIEL,
  USER_MIA,
  USER_TIM,
  USER_BRAD,
  USER_JASE,
  USER_HANNAH,
]

/* ---------------- Cursors ---------------- */

export const DEEP_CURSORS: ReadonlyArray<DeepCursor> = [
  {
    id: "cursor-mia",
    user: USER_MIA,
    position: { x: 22, y: 18 },
    activity: "typing title",
  },
  {
    id: "cursor-tim",
    user: USER_TIM,
    position: { x: 74, y: 41 },
    activity: "editing price",
  },
  {
    id: "cursor-daniel",
    user: USER_DANIEL,
    position: { x: 51, y: 64 },
    activity: "reviewing description",
  },
  {
    id: "cursor-hannah",
    user: USER_HANNAH,
    position: { x: 86, y: 78 },
    activity: "scanning specs",
  },
  {
    id: "cursor-brad",
    user: USER_BRAD,
    position: { x: 14, y: 86 },
    activity: "watching",
  },
]

/* ---------------- Awareness ---------------- */

export const AWARENESS_ENTRIES: ReadonlyArray<AwarenessEntry> = [
  {
    id: "aware-mia",
    user: USER_MIA,
    focus: "Title block",
    qualifier: "Editing",
    durationLabel: "2m",
  },
  {
    id: "aware-tim",
    user: USER_TIM,
    focus: "Price · A$ 1,485",
    qualifier: "Editing",
    durationLabel: "38s",
  },
  {
    id: "aware-daniel",
    user: USER_DANIEL,
    focus: "Description",
    qualifier: "Reviewing",
    durationLabel: "1m",
  },
  {
    id: "aware-hannah",
    user: USER_HANNAH,
    focus: "Compatibility table",
    qualifier: "Reading",
    durationLabel: "12s",
  },
  {
    id: "aware-brad",
    user: USER_BRAD,
    focus: "Bay floor (audio)",
    qualifier: "Listening",
    durationLabel: "4m",
  },
]

/* ---------------- Conflict (description) ---------------- */

export const CONFLICT_FIELD = "Description"

export const CONFLICT_DOC = "Falcon parts page · /parts/falcon-fg-cat-back"

const BASE_DESCRIPTION =
  "Mandrel-bent 3-inch cat-back exhaust for the FG Falcon (2008–2014). 304 stainless throughout, twin tip rolled into the rear valance, OE-fit hangers."

const MINE_DESCRIPTION =
  "Mandrel-bent 3-inch cat-back exhaust for the FG Falcon (2008–2014). 304 stainless throughout with twin polished tips rolled into the rear valance — bolts straight to factory hangers, no cutting required.\n\nDyno-tuned at our Oak Flats bay for an honest 11kW peak gain and a deeper note off-throttle."

const THEIRS_DESCRIPTION =
  "Mandrel-bent 3-inch cat-back exhaust for the FG Falcon (2008–2014). T304 stainless with twin angle-cut tips, OE-style hangers.\n\nFitment confirmed on XR6 sedan + ute. Same hangers as the BF setup."

export const CONFLICT_VERSIONS: ReadonlyArray<ConflictVersion> = [
  {
    id: "conflict-base",
    source: "base",
    timestamp: "8m ago",
    body: BASE_DESCRIPTION,
  },
  {
    id: "conflict-mine",
    source: "mine",
    author: USER_DANIEL,
    timestamp: "12s ago",
    body: MINE_DESCRIPTION,
    stats: { added: 32, removed: 4 },
  },
  {
    id: "conflict-theirs",
    source: "theirs",
    author: USER_TIM,
    timestamp: "4s ago",
    body: THEIRS_DESCRIPTION,
    stats: { added: 18, removed: 6 },
  },
]

/* ---------------- Locks ---------------- */

export const LOCK_PRICE: LockZone = {
  id: "lock-price",
  label: "Price · RRP",
  holder: USER_TIM,
  reason: "editing",
  since: "38s ago",
}

export const LOCK_HERO: LockZone = {
  id: "lock-hero",
  label: "Hero image · 2400×1600",
  holder: USER_HANNAH,
  reason: "rendering",
  since: "1m ago",
}

export const LOCK_EXPORT: LockZone = {
  id: "lock-export",
  label: "PDF export · Q2 catalogue",
  holder: USER_DANIEL,
  reason: "exporting",
  since: "12s ago",
}

/* ---------------- Live edits ---------------- */

export const LIVE_EDIT_TITLE: LiveEdit = {
  id: "edit-title",
  fieldLabel: "Title",
  user: USER_MIA,
  preview: "Falcon FG cat-back · 3 inch",
}

export const LIVE_EDIT_PRICE: LiveEdit = {
  id: "edit-price",
  fieldLabel: "Price",
  user: USER_TIM,
  preview: "A$ 1,485",
}

export const LIVE_EDIT_SHIPPING: LiveEdit = {
  id: "edit-shipping",
  fieldLabel: "Shipping rules",
  user: USER_HANNAH,
  preview: "Free Wollongong → Bowral",
}

/* ---------------- Selections ---------------- */

export const SELECTION_TITLE: RemoteSelection = {
  id: "sel-title",
  user: USER_MIA,
  selectionLabel: "Falcon FG cat-back · 3 inch",
  charCount: 28,
}

export const SELECTION_PARA: RemoteSelection = {
  id: "sel-para",
  user: USER_TIM,
  selectionLabel: "T304 stainless with twin angle-cut tips",
  charCount: 41,
}

export const SELECTION_BULLET: RemoteSelection = {
  id: "sel-bullet",
  user: USER_DANIEL,
  selectionLabel: "Dyno-tuned at our Oak Flats bay",
  charCount: 33,
}

/* ---------------- Cursor trails ---------------- */

export const CURSOR_TRAILS: ReadonlyArray<CursorTrailStep> = [
  {
    id: "trail-mia",
    user: USER_MIA,
    samples: [
      { x: 8, y: 86 },
      { x: 14, y: 72 },
      { x: 22, y: 56 },
      { x: 28, y: 38 },
      { x: 26, y: 22 },
      { x: 22, y: 18 },
    ],
  },
  {
    id: "trail-tim",
    user: USER_TIM,
    samples: [
      { x: 92, y: 10 },
      { x: 86, y: 22 },
      { x: 80, y: 30 },
      { x: 76, y: 38 },
      { x: 74, y: 41 },
    ],
  },
  {
    id: "trail-daniel",
    user: USER_DANIEL,
    samples: [
      { x: 50, y: 8 },
      { x: 56, y: 20 },
      { x: 60, y: 34 },
      { x: 58, y: 48 },
      { x: 54, y: 58 },
      { x: 51, y: 64 },
    ],
  },
  {
    id: "trail-hannah",
    user: USER_HANNAH,
    samples: [
      { x: 96, y: 56 },
      { x: 92, y: 64 },
      { x: 90, y: 72 },
      { x: 88, y: 76 },
      { x: 86, y: 78 },
    ],
  },
]

/* ---------------- Commit pulses ---------------- */

export const COMMIT_EVENTS: ReadonlyArray<CommitPulseEvent> = [
  {
    id: "evt-1",
    label: "Bumped meta title",
    user: USER_MIA,
    timestamp: "3m ago",
    delta: "+8 / -2",
  },
  {
    id: "evt-2",
    label: "Set RRP to A$ 1,485",
    user: USER_TIM,
    timestamp: "2m ago",
    delta: "+1 / -1",
  },
  {
    id: "evt-3",
    label: "Added hero image hangers shot",
    user: USER_HANNAH,
    timestamp: "1m ago",
    delta: "+24 / -0",
  },
  {
    id: "evt-4",
    label: "Reworked description",
    user: USER_DANIEL,
    timestamp: "12s ago",
    delta: "+32 / -4",
  },
  {
    id: "evt-5",
    label: "Saved",
    user: USER_DANIEL,
    timestamp: "just now",
  },
]

/* ---------------- Voice room ---------------- */

export const VOICE_PARTICIPANTS: ReadonlyArray<VoiceParticipant> = [
  {
    id: "voice-mia",
    user: USER_MIA,
    state: "speaking",
    level: 78,
  },
  {
    id: "voice-tim",
    user: USER_TIM,
    state: "listening",
    level: 12,
  },
  {
    id: "voice-daniel",
    user: USER_DANIEL,
    state: "speaking",
    level: 55,
  },
  {
    id: "voice-brad",
    user: USER_BRAD,
    state: "raised-hand",
  },
  {
    id: "voice-jase",
    user: USER_JASE,
    state: "muted",
  },
]

/* ---------------- Misc ---------------- */

export const VIEWER_SAMPLE: ReadonlyArray<CollabUser> = [
  USER_MIA,
  USER_TIM,
  USER_HANNAH,
  USER_BRAD,
]
