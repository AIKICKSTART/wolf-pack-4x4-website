/* Public barrel for the unified-inbox primitives. */

export type {
  AutoReplyKind,
  BulkAction,
  ChannelConnectionState,
  ColorTag,
  MacroChip,
  MacroVariable,
  UnifiedChannel,
  UnifiedConversation,
  UnifiedCustomerProfile,
  UnifiedPresence,
  UnifiedPriority,
  UnifiedRecentJob,
  UnifiedSentiment,
  UnifiedTeammate,
  UnifiedThreadMessage,
} from "./unified-inbox-types"

export {
  AUTO_REPLY_KIND_LABEL,
  BULK_ACTION_LABEL,
  CHANNEL_CONNECTION_LABEL,
  CHANNEL_CONNECTION_TONE,
  CHANNEL_GLYPH,
  CHANNEL_LABEL,
  CHANNEL_TONE,
  PRESENCE_LABEL,
  PRESENCE_TONE,
  PRIORITY_LABEL,
  PRIORITY_TONE,
  SENTIMENT_LABEL,
  SENTIMENT_TONE,
  formatAud,
  formatSlaRemaining,
} from "./unified-inbox-types"

export { MultiChannelList } from "./multi-channel-list"

export { ConversationThreadView } from "./conversation-thread-view"

export { ComposerWithMacros } from "./composer-with-macros"

export { AssignToCard } from "./assign-to-card"

export { SentimentTagStrip } from "./sentiment-tag-strip"

export { PriorityFlagRow } from "./priority-flag-row"

export { CustomerContextRail } from "./customer-context-rail"

export { BulkActionBar } from "./bulk-action-bar"

export { TeamPresenceRail } from "./team-presence-rail"

export { SlaCountdownTile } from "./sla-countdown-tile"

export { AutoReplyRuleCard } from "./auto-reply-rule-card"

export { MergeConversationsModal } from "./merge-conversations-modal"

export { TagManagerStrip } from "./tag-manager-strip"

export { ChannelStatusRow } from "./channel-status-row"
export type { ChannelStatusEntry } from "./channel-status-row"
