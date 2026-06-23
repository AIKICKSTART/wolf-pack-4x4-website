/**
 * Demo data for the Platform channels screen.
 *
 * Realistic Oak Flats Muffler Men (Illawarra NSW) connected-channel fixtures:
 * the messaging channels Torque answers customers on (Telegram, Discord, web
 * chat, SMS, email), their live health, the channel marketplace for adding more,
 * the Telegram-bot setup (token + authorised crew + test connection), per-channel
 * routing rules, and a connect/disconnect audit trail. All copy is production
 * language for the real workshop.
 *
 * Brand note (dev-only): the customer-facing assistant is always "Torque". The
 * legacy internal codename is never surfaced in any string below.
 */

import type { IntegrationStatus } from "../../components/account/integration-tile"
import type { ConnectorStatus } from "../../components/connectors/connectors-types"
import type { ConnectorCategory } from "../../components/connectors/connectors-types"
import type { ConnectorAuditAction } from "../../components/connectors/connectors-types"
import type { ConnectionTestStatus } from "../../components/connectors/connection-test-result"
import type { ProviderDirectoryCardProps } from "../../components/connectors/provider-directory-card"
import type { WebhookEventOption } from "../../components/connectors/webhook-config-card"
import type { NotificationRule } from "../../components/forms-platform/forms-platform-types"

export const BUSINESS_NAME = "Oak Flats Muffler Men"
export const BUSINESS_REGION = "Illawarra · NSW South Coast"
export const WORKSPACE_SLUG = "oak-flats-muffler-men"

/* -- Connected channels grid ------------------------------------------------ */

/** A connected messaging channel surfaced as an IntegrationTile. */
export interface ChannelTile {
  id: string
  name: string
  description: string
  category: string
  status: IntegrationStatus
  glyph: string
  lastSync?: string
  scopes: ReadonlyArray<string>
}

export const CHANNELS: ReadonlyArray<ChannelTile> = [
  {
    id: "telegram",
    name: "Telegram bot",
    description:
      "Torque answers exhaust enquiries and books jobs in the @OakFlatsMufflerMen Telegram chat, 24/7.",
    category: "Messaging",
    status: "connected",
    glyph: "TG",
    lastSync: "40 sec ago",
    scopes: ["Messages · read/send", "Inline replies", "Webhook updates"],
  },
  {
    id: "webchat",
    name: "Website live chat",
    description:
      "The chat bubble on mufflermen.com.au — quotes, booking links and parts questions from site visitors.",
    category: "On-site",
    status: "connected",
    glyph: "WC",
    lastSync: "1 min ago",
    scopes: ["Visitor sessions", "Lead capture", "Booking handoff"],
  },
  {
    id: "sms",
    name: "SMS · Twilio",
    description:
      "Two-way texts from the Oak Flats number — 'car's ready' alerts and booking confirmations the team can reply to.",
    category: "Messaging",
    status: "connected",
    glyph: "SM",
    lastSync: "6 min ago",
    scopes: ["SMS · send/receive", "Number · +61 2 4297"],
  },
  {
    id: "email",
    name: "Email inbox",
    description:
      "service@ enquiries land in Torque, get a first reply drafted, and route to Jess for anything that needs a human.",
    category: "Inbox",
    status: "connected",
    glyph: "EM",
    lastSync: "3 min ago",
    scopes: ["IMAP · read", "SMTP · send", "Auto-draft"],
  },
  {
    id: "discord",
    name: "Discord community",
    description:
      "The Illawarra build-and-tune Discord — Torque posts dyno days and answers fitment questions in #exhaust-talk.",
    category: "Community",
    status: "setup",
    glyph: "DC",
    scopes: ["Channel · post", "Slash commands", "Member · read"],
  },
  {
    id: "messenger",
    name: "Facebook Messenger",
    description:
      "Replies stalled — Meta access token expired on 27 May. Reconnect to resume answering Facebook page messages.",
    category: "Social",
    status: "error",
    glyph: "FB",
    scopes: ["Page messages", "Quick replies"],
  },
]

/* -- Channel health row ----------------------------------------------------- */

export interface ChannelHealth {
  id: string
  provider: string
  monogram: string
  status: ConnectorStatus
  lastSync: string
  errorRate: number
  errorRateSeries: ReadonlyArray<number>
  throughput?: string
}

export const CHANNEL_HEALTH: ReadonlyArray<ChannelHealth> = [
  {
    id: "telegram",
    provider: "Telegram bot",
    monogram: "TG",
    status: "connected",
    lastSync: "40s ago",
    errorRate: 0.0008,
    errorRateSeries: [0.002, 0.001, 0.003, 0.0009, 0.0012, 0.0008, 0.0006, 0.0008],
    throughput: "18 msg/min",
  },
  {
    id: "webchat",
    provider: "Website live chat",
    monogram: "WC",
    status: "connected",
    lastSync: "1m ago",
    errorRate: 0.0015,
    errorRateSeries: [0.001, 0.0018, 0.0012, 0.0024, 0.0016, 0.0011, 0.0014, 0.0015],
    throughput: "9 chats/hr",
  },
  {
    id: "sms",
    provider: "SMS · Twilio",
    monogram: "SM",
    status: "warning",
    lastSync: "6m ago",
    errorRate: 0.018,
    errorRateSeries: [0.004, 0.006, 0.009, 0.012, 0.016, 0.021, 0.019, 0.018],
    throughput: "120 / day",
  },
  {
    id: "messenger",
    provider: "Facebook Messenger",
    monogram: "FB",
    status: "error",
    lastSync: "2d ago",
    errorRate: 0.41,
    errorRateSeries: [0.02, 0.05, 0.11, 0.2, 0.33, 0.4, 0.42, 0.41],
    throughput: "stalled",
  },
]

/* -- Add a channel (marketplace) -------------------------------------------- */

export interface ChannelDirectoryItem {
  id: string
  provider: string
  monogram: string
  description: string
  category: ConnectorCategory
  installs: number
  verifiedLabel?: string
  installed?: boolean
  accent: NonNullable<ProviderDirectoryCardProps["accent"]>
}

export const CHANNEL_DIRECTORY: ReadonlyArray<ChannelDirectoryItem> = [
  {
    id: "whatsapp",
    provider: "WhatsApp Business",
    monogram: "WA",
    description: "Answer enquiries and send booking reminders on WhatsApp from the workshop number.",
    category: "communications",
    installs: 8400,
    verifiedLabel: "Verified",
    accent: "green",
  },
  {
    id: "instagram-dm",
    provider: "Instagram DMs",
    monogram: "IG",
    description: "Turn build-reel DMs into quotes — Torque replies and books straight from Instagram.",
    category: "social",
    installs: 6120,
    verifiedLabel: "Verified",
    accent: "violet",
  },
  {
    id: "google-bm",
    provider: "Google Business chat",
    monogram: "GB",
    description: "Reply to 'Message' taps from the Oak Flats Google listing without leaving Torque.",
    category: "communications",
    installs: 3240,
    accent: "blue",
  },
  {
    id: "messenger-add",
    provider: "Facebook Messenger",
    monogram: "FB",
    description: "Answer Facebook page messages with the same quote and booking flow as every channel.",
    category: "social",
    installs: 9800,
    verifiedLabel: "Verified",
    installed: true,
    accent: "blue",
  },
  {
    id: "voice",
    provider: "Voice line (beta)",
    monogram: "VL",
    description: "An AI receptionist for the workshop phone — takes details and drops bookings on the board.",
    category: "communications",
    installs: 740,
    accent: "amber",
  },
]

/* -- Telegram bot setup ----------------------------------------------------- */

export const TELEGRAM_BOT = {
  source: "Telegram · @OakFlatsMufflerMen",
  endpoint: "https://torque.app/oak-flats-muffler-men/telegram/webhook",
  /** Bot token — masked in the field by default, revealable. */
  botToken: "7843201995:AAH9Qk-OakFlatsMufflerMen-Torque-x9Lm2",
} as const

/** Telegram update types the bot subscribes to. */
export const TELEGRAM_UPDATE_EVENTS: ReadonlyArray<WebhookEventOption> = [
  {
    id: "message",
    label: "Incoming messages",
    code: "telegram.message",
    defaultEnabled: true,
  },
  {
    id: "callback",
    label: "Button taps",
    code: "telegram.callback_query",
    defaultEnabled: true,
  },
  {
    id: "edited",
    label: "Edited messages",
    code: "telegram.edited_message",
  },
  {
    id: "member",
    label: "Chat member updates",
    code: "telegram.chat_member",
    defaultEnabled: true,
  },
]

/** Crew authorised to operate / handover from the Telegram bot. */
export interface AuthorisedUser {
  id: string
  name: string
  handle: string
  role: string
  initials: string
  isAdmin: boolean
}

export const TELEGRAM_AUTHORISED_USERS: ReadonlyArray<AuthorisedUser> = [
  {
    id: "u-dan",
    name: "Daniel Carmody",
    handle: "@dan_oakflats",
    role: "Owner",
    initials: "DC",
    isAdmin: true,
  },
  {
    id: "u-jess",
    name: "Jess Hartley",
    handle: "@jess_bookings",
    role: "Bookings & accounts",
    initials: "JH",
    isAdmin: true,
  },
  {
    id: "u-macca",
    name: "Mark “Macca” Ellison",
    handle: "@macca_bay1",
    role: "Bay manager",
    initials: "ME",
    isAdmin: false,
  },
  {
    id: "u-davo",
    name: "Dave “Davo” Nguyen",
    handle: "@davo_exhaust",
    role: "Technician · Bay 2",
    initials: "DN",
    isAdmin: false,
  },
]

/** Test-connection result for the Telegram bot. */
export const TELEGRAM_TEST: {
  endpoint: string
  status: ConnectionTestStatus
  statusCode: number
  latencyMs: number
  testedAt: string
  region: string
  samplePayload: string
} = {
  endpoint: "POST https://api.telegram.org/bot.../getMe",
  status: "ok",
  statusCode: 200,
  latencyMs: 186,
  testedAt: "29 May 2026 · 9:14am AEST",
  region: "AU-East · Sydney",
  samplePayload: `{
  "ok": true,
  "result": {
    "id": 7843201995,
    "is_bot": true,
    "first_name": "Torque · Oak Flats Muffler Men",
    "username": "OakFlatsMufflerMen",
    "can_join_groups": true,
    "can_read_all_group_messages": false,
    "supports_inline_queries": true
  }
}`,
}

/* -- Per-channel routing ---------------------------------------------------- */

export const ROUTING_RULES: ReadonlyArray<NotificationRule> = [
  {
    id: "r-quote-email",
    trigger: "on-submit",
    channel: "email",
    recipient: "service@mufflermen.com.au",
    templateLabel: "Quote received · auto-draft",
    enabled: true,
  },
  {
    id: "r-booking-sms",
    trigger: "on-approval",
    channel: "sms",
    recipient: "Customer mobile + bay crew",
    templateLabel: "Booking confirmed · car ready",
    enabled: true,
  },
  {
    id: "r-handover-slack",
    trigger: "on-rejection",
    channel: "slack",
    recipient: "#oak-flats-front-desk",
    templateLabel: "Needs a human · escalate to Jess",
    enabled: true,
  },
  {
    id: "r-fleet-webhook",
    trigger: "on-submit",
    channel: "webhook",
    recipient: "torque.app/.../fleet-board",
    templateLabel: "Fleet enquiry → workshop board",
    enabled: false,
  },
]

/* -- Audit trail ------------------------------------------------------------ */

export interface ChannelAuditEntry {
  id: string
  action: ConnectorAuditAction
  connector: string
  actor: string
  actorInitials: string
  ip?: string
  occurredAt: string
  note?: string
}

export const CHANNEL_AUDIT: ReadonlyArray<ChannelAuditEntry> = [
  {
    id: "a-tg-connect",
    action: "connect",
    connector: "Telegram bot",
    actor: "Daniel Carmody",
    actorInitials: "DC",
    ip: "203.0.113.18",
    occurredAt: "28 May 2026 · 4:52pm",
    note: "Connected @OakFlatsMufflerMen and set the production webhook.",
  },
  {
    id: "a-tg-scope",
    action: "scope-change",
    connector: "Telegram bot",
    actor: "Daniel Carmody",
    actorInitials: "DC",
    ip: "203.0.113.18",
    occurredAt: "28 May 2026 · 4:55pm",
    note: "Enabled button taps and chat-member updates.",
  },
  {
    id: "a-sms-sync",
    action: "sync",
    connector: "SMS · Twilio",
    actor: "Torque",
    actorInitials: "T",
    occurredAt: "29 May 2026 · 9:02am",
    note: "Delivery rate dipped — flagged for review.",
  },
  {
    id: "a-fb-disconnect",
    action: "disconnect",
    connector: "Facebook Messenger",
    actor: "Jess Hartley",
    actorInitials: "JH",
    ip: "203.0.113.42",
    occurredAt: "27 May 2026 · 11:18am",
    note: "Meta token expired — disconnected pending reconnect.",
  },
]
