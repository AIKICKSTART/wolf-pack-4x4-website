import type { PrimitiveFamilyManifest } from "../types"

const importPath = "@/app/ui-primitives/components/states"

const manifest: PrimitiveFamilyManifest = {
  family: "states",
  title: "States",
  group: "Foundations",
  summary:
    "Full-surface state screens (404, 500, maintenance, locked, payment, region-blocked, empty, offline, slow, coming-soon, success) — bespoke Mufflermen illustrations with semantic roles and reduced-motion fallbacks.",
  entries: [
    {
      key: "states/not-found",
      family: "states",
      name: "StateNotFound",
      label: "Not found (404)",
      description:
        "Full-surface 404 screen with an askew muffler illustration, floating question-mark badge, and a suggested-routes list.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/not-found",
      tags: ["404", "error", "empty-state", "navigation"],
      status: "improved",
    },
    {
      key: "states/server-error",
      family: "states",
      name: "StateServerError",
      label: "Server error (500)",
      description:
        "Full-surface 500 alert with a snapped-exhaust blast illustration, alert strip, and optional incident id / occurred-at line.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/server-error",
      tags: ["500", "error", "incident", "alert"],
      status: "improved",
    },
    {
      key: "states/maintenance",
      family: "states",
      name: "StateMaintenance",
      label: "Maintenance (503)",
      description:
        "Full-surface maintenance screen with a spinning brake-rotor + crossed-wrenches illustration, hazard band, and a service-window pair.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/maintenance",
      tags: ["503", "maintenance", "downtime", "schedule"],
      status: "improved",
    },
    {
      key: "states/account-locked",
      family: "states",
      name: "StateAccountLocked",
      label: "Account locked (423)",
      description:
        "Full-surface account-hold alert with a padlock-over-brake-rotor illustration, a reasons list, and optional account reference.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/account-locked",
      tags: ["423", "auth", "locked", "security"],
      status: "improved",
    },
    {
      key: "states/payment-required",
      family: "states",
      name: "StatePaymentRequired",
      label: "Payment required (402)",
      description:
        "Full-surface 402 screen with a receipt + chrome 'payment due' ribbon and a plan card listing price, cadence, and inclusions.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/payment-required",
      tags: ["402", "billing", "upgrade", "paywall"],
      status: "improved",
    },
    {
      key: "states/region-blocked",
      family: "states",
      name: "StateRegionBlocked",
      label: "Region blocked (451)",
      description:
        "Full-surface 451 geo-block alert with a slashed-compass illustration, detected-region line, a supported-regions grid, and a VPN note.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/region-blocked",
      tags: ["451", "geo", "blocked", "region"],
      status: "improved",
    },
    {
      key: "states/empty-inbox",
      family: "states",
      name: "StateEmptyInbox",
      label: "Empty inbox",
      description:
        "Full-surface 'all caught up' empty state with an open-envelope-with-tick illustration and a trio of inbox stats.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/empty-inbox",
      tags: ["empty-state", "inbox", "zero-state", "stats"],
      status: "improved",
    },
    {
      key: "states/empty-results",
      family: "states",
      name: "StateEmptyResults",
      label: "Empty results",
      description:
        "Full-surface no-results empty state with a magnifying-glass-over-blueprint illustration, an echoed query, and suggestion chips.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/empty-results",
      tags: ["empty-state", "search", "no-results", "suggestions"],
      status: "improved",
    },
    {
      key: "states/offline",
      family: "states",
      name: "StateOffline",
      label: "Offline",
      description:
        "Full-surface offline status with a struck-through signal-tower illustration, retry-count and last-online meta, and a cached-data note.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/offline",
      tags: ["offline", "network", "connection", "retry"],
      status: "improved",
    },
    {
      key: "states/slow-connection",
      family: "states",
      name: "StateSlowConnection",
      label: "Slow connection",
      description:
        "Full-surface degraded-network status with a tortoise-in-a-buffering-ring illustration, ping/throughput/mode meters, and a lite-mode toggle.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/slow-connection",
      tags: ["slow", "network", "latency", "lite-mode"],
      status: "improved",
    },
    {
      key: "states/coming-soon",
      family: "states",
      name: "StateComingSoon",
      label: "Coming soon",
      description:
        "Full-surface prelaunch status with a covered-car illustration, a countdown grid, and a controlled waitlist email form.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/coming-soon",
      tags: ["coming-soon", "prelaunch", "countdown", "waitlist"],
      status: "improved",
    },
    {
      key: "states/success-confirmed",
      family: "states",
      name: "StateSuccessConfirmed",
      label: "Success confirmed",
      description:
        "Full-surface success screen with a chequered-flag + tick illustration, a summary list, and an optional confetti burst on mount.",
      kind: "section",
      importPath,
      routeHref: "/ui-primitives/states/success-confirmed",
      tags: ["success", "confirmation", "confetti", "celebrate"],
      status: "improved",
    },
  ],
}

export default manifest
