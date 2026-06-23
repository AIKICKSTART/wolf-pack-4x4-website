/**
 * Shared demo data for the comments primitives showcase routes.
 *
 * Authentic Mufflermen workshop scenarios — bay techs, foremen, parts
 * runners, customers. Not wired to anything; purely visual reference.
 */

import type {
  ActivityEvent,
  AnnotationPinRecord,
  CommentAuthor,
  CommentRecord,
  CommentThreadRecord,
  MentionTarget,
} from "../components/comments"

export const PEOPLE: Record<string, CommentAuthor> = {
  jordan: { id: "p-jordan", name: "Jordan McKee", role: "Foreman" },
  kara: { id: "p-kara", name: "Kara Patel", role: "Bay 3 Tech" },
  marcus: { id: "p-marcus", name: "Marcus Wirth", role: "Parts Runner" },
  rita: { id: "p-rita", name: "Rita Velasquez", role: "Service Manager" },
  taj: { id: "p-taj", name: "Taj Halford", role: "Welder" },
  lila: { id: "p-lila", name: "Lila Okafor", role: "Designer" },
  brian: { id: "p-brian", name: "Brian Quan", role: "Owner" },
}

export const MENTION_CANDIDATES: ReadonlyArray<MentionTarget> = [
  { id: "p-jordan", kind: "user", name: "Jordan McKee", qualifier: "Foreman" },
  { id: "p-kara", kind: "user", name: "Kara Patel", qualifier: "Bay 3" },
  { id: "p-marcus", kind: "user", name: "Marcus Wirth", qualifier: "Parts" },
  { id: "p-rita", kind: "user", name: "Rita Velasquez", qualifier: "Service" },
  { id: "p-taj", kind: "user", name: "Taj Halford", qualifier: "Welder" },
  { id: "t-floor", kind: "team", name: "Floor crew", qualifier: "All bays" },
  { id: "t-customer", kind: "team", name: "Customer success" },
  { id: "r-foreman", kind: "role", name: "Foreman on shift" },
  { id: "r-leadtech", kind: "role", name: "Lead technician" },
]

export const ROOT_COMMENT: CommentRecord = {
  id: "c-root",
  author: PEOPLE.jordan,
  body: "We need ADR clarification before quoting this Hilux retrofit — the rear bracket clearance is 4mm under spec when we route over the tow bar.",
  timestamp: "10:14a",
  status: "open",
  reactions: [
    { emoji: "lightbulb", count: 3 },
    { emoji: "question", count: 1, mine: true },
  ],
  replies: [
    {
      id: "r-1",
      author: PEOPLE.kara,
      body: "Confirmed on Bay 3 lift — spacer kit would push it back to 8mm clear. Pricing impact ~$48.",
      timestamp: "10:18a",
      reactions: [{ emoji: "like", count: 2 }],
    },
    {
      id: "r-2",
      author: PEOPLE.marcus,
      body: "Spacers in stock, two sets on shelf 12B.",
      timestamp: "10:22a",
    },
  ],
}

export const RESOLVED_COMMENT: CommentRecord = {
  id: "c-resolved",
  author: PEOPLE.rita,
  body: "Final quote includes the spacer kit + 30 mins extra labour. Customer signed off.",
  timestamp: "Tue 4:02p",
  status: "resolved",
  resolutionNote: "ADR-compliant route locked in. Logged in job notes.",
}

export const THREAD_LIST: ReadonlyArray<CommentThreadRecord> = [
  {
    id: "t-1",
    title: "Rear bracket clearance under tow bar",
    pinNumber: 1,
    status: "open",
    author: PEOPLE.jordan,
    excerpt:
      "Need ADR clarification before quoting — rear bracket clears tow bar by 4mm only.",
    timestamp: "10:14a",
    replyCount: 2,
    hasMention: true,
  },
  {
    id: "t-2",
    title: "Bay 3 lift retrofit — power outlet relocation",
    pinNumber: 2,
    status: "open",
    author: PEOPLE.kara,
    excerpt: "Move 32A outlet 800mm west so the lift arm clears in full extension.",
    timestamp: "9:46a",
    replyCount: 5,
  },
  {
    id: "t-3",
    title: "Parts runner door swing collision",
    pinNumber: 3,
    status: "open",
    author: PEOPLE.marcus,
    excerpt: "Aisle 4 door clips the parts trolley when both bays are loaded.",
    timestamp: "Tue 3:11p",
    replyCount: 1,
  },
  {
    id: "t-4",
    title: "Customer waiting area glare",
    pinNumber: 4,
    status: "resolved",
    author: PEOPLE.rita,
    excerpt:
      "Afternoon sun reflecting off the showroom glass. Tinting film ordered.",
    timestamp: "Mon 4:25p",
    replyCount: 3,
  },
  {
    id: "t-5",
    title: "Welder fume hood routing",
    pinNumber: 5,
    status: "open",
    author: PEOPLE.taj,
    excerpt: "Jordan, please double-check the bracket clearance for the fume hood arm.",
    timestamp: "Wed 9:02a",
    replyCount: 4,
    hasMention: true,
  },
  {
    id: "t-6",
    title: "Roller door safety strip retrofit",
    pinNumber: 6,
    status: "open",
    author: PEOPLE.brian,
    excerpt: "WHS audit flagged Door 2 — sensor strip needs replacing this week.",
    timestamp: "Wed 10:48a",
    replyCount: 2,
  },
]

export const FLOORPLAN_PINS: ReadonlyArray<AnnotationPinRecord> = [
  {
    id: "pin-1",
    number: 1,
    status: "open",
    position: { x: 22, y: 34 },
    label: "Rear bracket clearance",
  },
  {
    id: "pin-2",
    number: 2,
    status: "open",
    position: { x: 46, y: 28 },
    label: "Bay 3 lift outlet",
  },
  {
    id: "pin-3",
    number: 3,
    status: "open",
    position: { x: 70, y: 52 },
    label: "Aisle 4 door swing",
  },
  {
    id: "pin-4",
    number: 4,
    status: "resolved",
    position: { x: 84, y: 18 },
    label: "Waiting area glare",
  },
  {
    id: "pin-5",
    number: 5,
    status: "open",
    position: { x: 14, y: 70 },
    label: "Welder fume hood arm",
  },
  {
    id: "pin-6",
    number: 6,
    status: "reopened",
    position: { x: 58, y: 78 },
    label: "Roller door 2 sensor",
  },
]

export const ACTIVITY: ReadonlyArray<ActivityEvent> = [
  {
    id: "a-1",
    actor: PEOPLE.jordan,
    kind: "commented",
    description: "opened a thread",
    threadTitle: "Rear bracket clearance under tow bar",
    timestamp: "10:14a",
  },
  {
    id: "a-2",
    actor: PEOPLE.kara,
    kind: "replied",
    description: "confirmed measurement",
    threadTitle: "Rear bracket clearance under tow bar",
    timestamp: "10:18a",
  },
  {
    id: "a-3",
    actor: PEOPLE.marcus,
    kind: "annotated",
    description: "dropped a pin in Bay 3",
    threadTitle: "Parts runner door swing",
    timestamp: "10:24a",
  },
  {
    id: "a-4",
    actor: PEOPLE.taj,
    kind: "mentioned",
    description: "tagged Jordan",
    threadTitle: "Welder fume hood routing",
    timestamp: "Wed 9:02a",
  },
  {
    id: "a-5",
    actor: PEOPLE.rita,
    kind: "resolved",
    description: "closed thread with note",
    threadTitle: "Customer waiting area glare",
    timestamp: "Mon 4:25p",
  },
  {
    id: "a-6",
    actor: PEOPLE.brian,
    kind: "reopened",
    description: "flagged from WHS audit",
    threadTitle: "Roller door 2 sensor strip",
    timestamp: "Wed 10:48a",
  },
  {
    id: "a-7",
    actor: PEOPLE.lila,
    kind: "liked",
    description: "loved Kara's proposal",
    threadTitle: "Bay 3 lift retrofit",
    timestamp: "9:51a",
  },
]
