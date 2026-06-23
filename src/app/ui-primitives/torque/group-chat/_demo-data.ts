/**
 * Demo fixtures for the Torque group chat & @mention routing surface.
 *
 * Customer-visible identity is "Torque — your Mufflermen business assistant".
 * (Dev note: the back-end agent console this maps to is internally codenamed
 *  elsewhere; that codename must never appear in customer-visible copy.)
 *
 * Scenario: the owner of Oak Flats Muffler Men runs a single room where Torque's
 * sub-agents — @blog, @social, @seo and @workshop — collaborate on a coordinated
 * "pre-winter exhaust check" push across the Illawarra. The owner @mentions an
 * agent, that agent picks up the task, others chime in on threaded replies.
 */

import type { CollabUser } from "../../components/collab-deep"
import type {
  ActivityFeedItem,
  StatusBadgeTone,
} from "../../components/data-display"
import type { SuggestionChip } from "../../components/ai"

/** Brand assistant name shown to the owner everywhere on this surface. */
export const TORQUE_NAME = "Torque" as const

/** Stable room title for the header + activity copy. */
export const ROOM_TITLE = "Pre-winter exhaust push — Oak Flats" as const

/** A Torque sub-agent participant in the room. */
export interface AgentParticipant {
  user: CollabUser
  /** The @handle owners type to route a task to this agent. */
  handle: string
  /** Short job description shown in the rail. */
  job: string
  /** Live status label + tone for the rail badge. */
  presence: "active" | "drafting" | "idle"
  /** What the agent is doing right now (rail subline + awareness strip). */
  doing: string
}

/**
 * Owner of the business. Drives the room. Red tone matches the brand and keeps
 * their bubble visually distinct from the agent panels.
 */
export const OWNER: CollabUser = {
  id: "owner-daniel",
  name: "Daniel",
  role: "Owner · Oak Flats",
  status: "online",
  tone: "red",
  cursorTone: "pink",
}

/**
 * The four Torque sub-agents. Each is a distinct collaborator with its own tone
 * so mention chips, avatars and presence rings stay consistent across the room.
 */
export const AGENTS: ReadonlyArray<AgentParticipant> = [
  {
    user: {
      id: "agent-blog",
      name: "Torque Blog",
      role: "Content agent",
      status: "online",
      tone: "amber",
      cursorTone: "amber",
    },
    handle: "@blog",
    job: "Long-form posts for the site",
    presence: "drafting",
    doing: "Drafting the winter undercar-check article",
  },
  {
    user: {
      id: "agent-social",
      name: "Torque Social",
      role: "Social agent",
      status: "online",
      tone: "teal",
      cursorTone: "blue",
    },
    handle: "@social",
    job: "Facebook, Instagram & Google posts",
    presence: "active",
    doing: "Lining up the Thursday 7am posts",
  },
  {
    user: {
      id: "agent-seo",
      name: "Torque SEO",
      role: "Search agent",
      status: "online",
      tone: "green",
      cursorTone: "green",
    },
    handle: "@seo",
    job: "Local search & service pages",
    presence: "idle",
    doing: "Watching ‘exhaust repairs Wollongong’ ranking",
  },
  {
    user: {
      id: "agent-workshop",
      name: "Torque Workshop",
      role: "Bookings agent",
      status: "online",
      tone: "obsidian",
      cursorTone: "purple",
    },
    handle: "@workshop",
    job: "Diary, quotes & job cards",
    presence: "active",
    doing: "Holding 6 free-check slots for Thursday",
  },
]

/** Quick lookup by id for thread authors / reply authors. */
export const PARTICIPANT_BY_ID: Readonly<Record<string, CollabUser>> = {
  [OWNER.id]: OWNER,
  ...Object.fromEntries(AGENTS.map((agent) => [agent.user.id, agent.user])),
}

/** All collaborators for the presence avatar stack (owner first). */
export const ROOM_USERS: ReadonlyArray<CollabUser> = [
  OWNER,
  ...AGENTS.map((agent) => agent.user),
]

/** Map a rail presence label to a StatusBadge tone + display label. */
export const PRESENCE_BADGE: Readonly<
  Record<AgentParticipant["presence"], { tone: StatusBadgeTone; label: string }>
> = {
  active: { tone: "success", label: "Active" },
  drafting: { tone: "warn", label: "Drafting" },
  idle: { tone: "neutral", label: "Idle" },
}

/**
 * A token in an assistant turn — either plain text or an @mention chip that
 * routes the following work to a specific agent.
 */
export type MessageToken =
  | { kind: "text"; value: string }
  | { kind: "mention"; handle: string; agentId: string }

/** A routed turn in the group transcript. */
export interface GroupTurn {
  id: string
  authorId: string
  timestamp: string
  /** Mixed text + @mention chips. */
  tokens: ReadonlyArray<MessageToken>
}

const mention = (handle: string, agentId: string): MessageToken => ({
  kind: "mention",
  handle,
  agentId,
})
const text = (value: string): MessageToken => ({ kind: "text", value })

/** The owner's opening brief that @mentions @blog and @social. */
export const OWNER_BRIEF: GroupTurn = {
  id: "turn-brief",
  authorId: OWNER.id,
  timestamp: "7:52 AM",
  tokens: [
    text("Morning team — cold snap's coming and people start hearing their exhausts. "),
    mention("@blog", "agent-blog"),
    text(" write a short pre-winter undercar-check post, and "),
    mention("@social", "agent-social"),
    text(" turn it into a couple of socials. Keep it Oak Flats, no hype."),
  ],
}

/** A nested reply inside a threaded conversation on a turn. */
export interface ThreadReply {
  id: string
  authorId: string
  body: string
  timestamp: string
}

/** A threaded discussion anchored to one of the agent turns. */
export interface RoomThread {
  pinNumber: number
  title: string
  rootAuthorId: string
  rootBody: string
  rootTimestamp: string
  status: "open" | "resolved" | "reopened"
  replies: ReadonlyArray<ThreadReply>
}

/** The threaded back-and-forth that hangs off @social's draft turn. */
export const SOCIAL_THREAD: RoomThread = {
  pinNumber: 3,
  title: "Reach across the Illawarra?",
  rootAuthorId: OWNER.id,
  rootBody:
    "Looks great. Can we make sure it reads like we cover Wollongong and Shellharbour too, not just Oak Flats?",
  rootTimestamp: "7:58 AM",
  status: "open",
  replies: [
    {
      id: "reply-social",
      authorId: "agent-social",
      body: "On it — adding ‘servicing the whole Illawarra’ to both captions and tagging the Wollongong locality.",
      timestamp: "7:58 AM",
    },
    {
      id: "reply-seo",
      authorId: "agent-seo",
      body: "I'll mirror that on the service-area page so the social copy and the site agree. ‘exhaust repairs Wollongong’ is page 2 — worth the push.",
      timestamp: "7:59 AM",
    },
  ],
}

/** Live "who is working on what" entries for the awareness strip. */
export const AWARENESS = AGENTS.map((agent, index) => ({
  id: `aware-${agent.user.id}`,
  user: agent.user,
  focus: agent.doing,
  qualifier: agent.presence === "drafting" ? "Drafting" : agent.presence === "active" ? "Working" : "Watching",
  durationLabel: ["2m", "1m", "5m", "just now"][index] ?? "1m",
}))

/** Room activity feed — joins, hand-offs and saves. */
export const ROOM_ACTIVITY: ReadonlyArray<ActivityFeedItem> = [
  {
    id: "act-route-blog",
    title: "Routed to @blog",
    description: "Daniel mentioned @blog to draft the pre-winter undercar-check post.",
    timestamp: "7:52 AM",
    tone: "info",
    actor: { name: "Daniel" },
  },
  {
    id: "act-blog-draft",
    title: "@blog saved a draft",
    description: "“Hearing your exhaust this winter?” — 320 words, ready for review.",
    timestamp: "7:55 AM",
    tone: "success",
    actor: { name: "Torque Blog" },
  },
  {
    id: "act-route-social",
    title: "Handed off to @social",
    description: "@blog passed the draft to @social for Facebook + Instagram.",
    timestamp: "7:56 AM",
    tone: "info",
    actor: { name: "Torque Blog" },
  },
  {
    id: "act-workshop-hold",
    title: "@workshop held 6 slots",
    description: "Reserved free pre-winter checks for Thursday so the posts have a real offer.",
    timestamp: "7:57 AM",
    tone: "success",
    actor: { name: "Torque Workshop" },
  },
  {
    id: "act-thread-open",
    title: "Daniel opened a thread",
    description: "Asked @social to widen reach to Wollongong & Shellharbour.",
    timestamp: "7:58 AM",
    tone: "warn",
    actor: { name: "Daniel" },
  },
]

/** Composer suggestions — each pre-fills an @mention routing prompt. */
export const MENTION_SUGGESTIONS: ReadonlyArray<SuggestionChip> = [
  {
    id: "sg-social",
    label: "Schedule with @social",
    prompt: "@social schedule the Facebook and Instagram posts for Thursday 7am.",
  },
  {
    id: "sg-seo",
    label: "Brief @seo",
    prompt: "@seo update the Wollongong service-area page to match the new posts.",
  },
  {
    id: "sg-workshop",
    label: "Open the diary with @workshop",
    prompt: "@workshop add a ‘free pre-winter check’ option to the online booking diary.",
  },
  {
    id: "sg-blog",
    label: "Tweak with @blog",
    prompt: "@blog add a short paragraph on why winter is the worst time for a blown joint.",
  },
]
