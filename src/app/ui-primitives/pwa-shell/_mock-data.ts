import type {
  PwaShareChannel,
  PwaShortcutAction,
  PwaSyncEntity,
} from "../components/pwa-shell"

export const CREW_SYNC_ENTITIES: ReadonlyArray<PwaSyncEntity> = [
  { id: "jobs", label: "Bay jobs", pending: 4, lastSyncedAt: "4m ago" },
  { id: "parts", label: "Parts movements", pending: 12, lastSyncedAt: "9m ago" },
  { id: "photos", label: "VIN photos", pending: 2, lastSyncedAt: "11m ago" },
]

export const QUIET_SYNC_ENTITIES: ReadonlyArray<PwaSyncEntity> = [
  { id: "jobs", label: "Bay jobs", pending: 0, lastSyncedAt: "Just now" },
  { id: "parts", label: "Parts movements", pending: 0, lastSyncedAt: "1m ago" },
  { id: "photos", label: "VIN photos", pending: 0, lastSyncedAt: "Just now" },
]

export const ERROR_SYNC_ENTITIES: ReadonlyArray<PwaSyncEntity> = [
  { id: "jobs", label: "Bay jobs", pending: 6, lastSyncedAt: "23m ago" },
  { id: "parts", label: "Parts movements", pending: 18, lastSyncedAt: "31m ago" },
  { id: "photos", label: "VIN photos", pending: 3, lastSyncedAt: "27m ago" },
]

interface CrewShortcutSeed {
  id: string
  label: string
  hint: string
  tone: PwaShortcutAction["tone"]
  iconKey: "scan" | "queue" | "parts" | "call" | "quote" | "punch"
}

export const CREW_SHORTCUTS: ReadonlyArray<CrewShortcutSeed> = [
  {
    id: "scan-vin",
    label: "Scan VIN",
    hint: "Tap camera · attach to job",
    tone: "red",
    iconKey: "scan",
  },
  {
    id: "next-bay",
    label: "Next bay",
    hint: "Move queue forward",
    tone: "teal",
    iconKey: "queue",
  },
  {
    id: "parts-in",
    label: "Parts arrived",
    hint: "Scan back-dock receipts",
    tone: "amber",
    iconKey: "parts",
  },
  {
    id: "call-customer",
    label: "Call customer",
    hint: "Dial from last touched job",
    tone: "neutral",
    iconKey: "call",
  },
]

export const CUSTOMER_SHORTCUTS: ReadonlyArray<CrewShortcutSeed> = [
  {
    id: "quote",
    label: "Get a quote",
    hint: "Snap a pic of your exhaust",
    tone: "red",
    iconKey: "quote",
  },
  {
    id: "book",
    label: "Book the bay",
    hint: "Oak Flats · Wollongong",
    tone: "teal",
    iconKey: "queue",
  },
  {
    id: "track",
    label: "Track my job",
    hint: "Live updates from the workshop",
    tone: "amber",
    iconKey: "punch",
  },
]

export const SHARE_CHANNELS: ReadonlyArray<PwaShareChannel> = [
  {
    id: "front-counter",
    label: "Front counter",
    recipient: "Bex on reception",
  },
  {
    id: "bay-2",
    label: "Bay 2 crew",
    recipient: "Roo, Macca, Tatts",
  },
  {
    id: "supplier",
    label: "Supplier",
    recipient: "Manta Exhaust · Smithfield",
  },
  {
    id: "customer-sms",
    label: "Customer SMS",
    recipient: "Holden VE Ute · ABC123",
  },
]

export const PWA_PRIMITIVE_INDEX = [
  {
    index: "01",
    title: "Install prompt card",
    href: "/ui-primitives/pwa-shell/install-prompt-card",
    description:
      "Add-to-home-screen prompt with platform-aware steps. iOS Safari share-sheet path or Android Chrome install banner.",
  },
  {
    index: "02",
    title: "Offline indicator strip",
    href: "/ui-primitives/pwa-shell/offline-indicator-strip",
    description:
      "Top-of-screen connectivity strip with online, offline, syncing and degraded variants. Aria-live announcements.",
  },
  {
    index: "03",
    title: "Pull-to-refresh loader",
    href: "/ui-primitives/pwa-shell/pull-to-refresh-loader",
    description:
      "Bouncy refresh bowl with progress ring, armed-state colour shift and hint text. Reduced-motion respected.",
  },
  {
    index: "04",
    title: "Splash screen",
    href: "/ui-primitives/pwa-shell/splash-screen",
    description:
      "Branded boot screen with monogram logo, version, region tag and boot-progress bar with current step.",
  },
  {
    index: "05",
    title: "Sync status tile",
    href: "/ui-primitives/pwa-shell/sync-status-tile",
    description:
      "Pending-change count, per-entity sync rows and retry CTA. Idle, syncing and error states.",
  },
  {
    index: "06",
    title: "Biometric unlock card",
    href: "/ui-primitives/pwa-shell/biometric-unlock-card",
    description:
      "Touch ID, Face ID or fingerprint prompt with crew avatar, status hint and PIN fallback dots.",
  },
  {
    index: "07",
    title: "Update available banner",
    href: "/ui-primitives/pwa-shell/update-available-banner",
    description:
      "Service-worker update banner with reload CTA, release age and optional changelog bullets.",
  },
  {
    index: "08",
    title: "Network quality meter",
    href: "/ui-primitives/pwa-shell/network-quality-meter",
    description:
      "Connection bars (offline · 2G · 3G · 4G · 5G/Wi-Fi) with latency, down and up metrics in tabular-nums.",
  },
  {
    index: "09",
    title: "Permission modal",
    href: "/ui-primitives/pwa-shell/permission-modal",
    description:
      "Pre-prompt modal for camera, mic, location, notifications, contacts and storage with rationale + benefits.",
  },
  {
    index: "10",
    title: "Home-screen tile",
    href: "/ui-primitives/pwa-shell/home-screen-tile",
    description:
      "iOS-widget-style quick-action tile with badge counter and inline metrics. Tone variants.",
  },
  {
    index: "11",
    title: "App shortcut row",
    href: "/ui-primitives/pwa-shell/app-shortcut-row",
    description:
      "Jump-list of in-app shortcuts — Scan VIN, Next bay, Parts arrived, Call customer. Tap or link.",
  },
  {
    index: "12",
    title: "Share target card",
    href: "/ui-primitives/pwa-shell/share-target-card",
    description:
      "Receiver UI for the Web Share Target API. Caption, optional media preview and channel chips.",
  },
  {
    index: "13",
    title: "Device orientation prompt",
    href: "/ui-primitives/pwa-shell/device-orientation-prompt",
    description:
      "Animated rotate-to-landscape hint with arc cue. Reduced-motion shows static rotated phone.",
  },
  {
    index: "14",
    title: "Wake lock toggle",
    href: "/ui-primitives/pwa-shell/wake-lock-toggle",
    description:
      "Keep-screen-on toggle with status chip and battery-cost-per-hour pill. Role=switch + aria-checked.",
  },
] as const

export const FULL_MOBILE_HREF = "/ui-primitives/pwa-shell/full-mobile"
