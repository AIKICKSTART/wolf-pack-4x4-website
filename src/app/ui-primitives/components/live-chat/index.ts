/* Public barrel for the live-chat operator console primitives. */

export type {
  OperatorStatus,
  ChatOutcome,
  SentimentBucket,
  SentimentScore,
  QueueRisk,
  OperatorTeam,
  TransferTarget,
} from "./live-chat-types"
export {
  OPERATOR_STATUS_LABEL,
  OPERATOR_STATUS_TONE,
  OPERATOR_STATUS_HINT,
  CHAT_OUTCOME_LABEL,
  CHAT_OUTCOME_TONE,
  QUEUE_RISK_LABEL,
  QUEUE_RISK_TONE,
  SENTIMENT_BUCKET_LABEL,
  SENTIMENT_BUCKET_TONE,
  bucketForSentiment,
  riskForWaitMinutes,
} from "./live-chat-types"

export { ChatQueueInbox } from "./chat-queue-inbox"
export type {
  ChatQueueInboxProps,
  ChatQueueItem,
  QueueFilter,
} from "./chat-queue-inbox"

export { ActiveChatWindow } from "./active-chat-window"
export type { ActiveChatMessage } from "./active-chat-window"

export { OperatorStatusPill } from "./operator-status-pill"

export { QuickRepliesMacroPanel } from "./quick-replies-macro-panel"
export type { QuickReplyShortcut } from "./quick-replies-macro-panel"

export { CustomerContextCard } from "./customer-context-card"
export type { CustomerCartItem } from "./customer-context-card"

export { CoBrowsingScreenViewer } from "./co-browsing-screen-viewer"

export { SentimentIndicator } from "./sentiment-indicator"

export { TransferChatModal } from "./transfer-chat-modal"
export type {
  TransferOperator,
  TransferTeamOption,
} from "./transfer-chat-modal"

export { WrapUpForm } from "./wrap-up-form"
export type { WrapUpPayload } from "./wrap-up-form"

export { ChatVolumeGauge } from "./chat-volume-gauge"

export { ChatSlaTimerChip } from "./chat-sla-timer-chip"

export { MultiChatTabs } from "./multi-chat-tabs"
export type { MultiChatTab } from "./multi-chat-tabs"

export { OperatorTeamPresence } from "./operator-team-presence"
export type { PresenceOperator } from "./operator-team-presence"

export { KbSnippetSuggester } from "./kb-snippet-suggester"
export type { KbSnippet } from "./kb-snippet-suggester"
