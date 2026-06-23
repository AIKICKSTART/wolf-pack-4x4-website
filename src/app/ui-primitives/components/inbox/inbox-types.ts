/**
 * Shared types for the inbox / human-to-human messaging primitives.
 *
 * These primitives are visual references; primitives tolerate missing
 * media and avatar sources gracefully.
 */

export type PresenceState = "online" | "away" | "busy" | "offline"

export type MessageStatus = "sending" | "sent" | "delivered" | "read"

export type ConversationFilter =
  | "all"
  | "unread"
  | "mentions"
  | "customers"
  | "team"

export type SenderRole = "team" | "customer"

export type MessageSender = "me" | "other"

export type MessageKind =
  | "text"
  | "voice"
  | "image"
  | "file"

export interface InboxPerson {
  id: string
  name: string
  /** Optional avatar src. Avatar falls back to initials when omitted. */
  avatar?: string
  /** Presence shown in conversation header + rail row. */
  presence?: PresenceState
  /** Short role label rendered as a chip. */
  role?: string
  /** Whether the person is a customer or a team member. */
  kind?: SenderRole
}

export interface Conversation {
  id: string
  /** Display participant (1:1) or group name. */
  participant: InboxPerson
  lastMessagePreview: string
  lastMessageAt: string
  unreadCount?: number
  /** Whether the conversation is currently selected. */
  active?: boolean
  /** True when the last message mentions the viewer. */
  hasMention?: boolean
  /** True when the participant is a customer (filter target). */
  isCustomer?: boolean
  /** Optional pinned flag, used for sorting hints by the consumer. */
  pinned?: boolean
}

export interface ReactionEmoji {
  /** Stable identifier for the reaction. */
  id: string
  /** Display emoji glyph. */
  glyph: string
  /** Accessible label for screen readers. */
  label: string
}

export interface MessageReaction extends ReactionEmoji {
  /** Reaction count from peers. */
  count: number
  /** Whether the viewer added the reaction. */
  mine?: boolean
}

export interface MessageAttachment {
  id: string
  /** Original filename including extension. */
  name: string
  /** Bytes pretty-printed (e.g. "2.3 MB"). */
  size: string
}

export interface ThreadReplySummary {
  /** Number of replies in the thread. */
  count: number
  /** ISO timestamp of last reply. */
  lastReplyAt: string
  /** Avatars of recent repliers (up to 3). */
  repliers: ReadonlyArray<InboxPerson>
}

export interface PinnedMessage {
  id: string
  author: InboxPerson
  preview: string
  pinnedAt: string
}

export interface ReadReceipt {
  id: string
  reader: InboxPerson
  readAt: string
}

/**
 * Minimal generic message shape used by composition demos. Individual
 * bubble primitives accept their own typed props for clarity.
 */
export interface Message {
  id: string
  sender: MessageSender
  author: InboxPerson
  content: string
  timestamp: string
  kind?: MessageKind
  status?: MessageStatus
  reactions?: ReadonlyArray<MessageReaction>
  thread?: ThreadReplySummary
}
