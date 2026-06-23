import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "pwa-shell",
  "title": "PWA shell",
  "group": "Chrome",
  "summary": "14 installable-PWA chrome surfaces for the workshop crew app — install prompt, offline strip, pull-to-refresh, splash, sync queue, biometric unlock, update banner, network meter, permission pre-prompt, home tile, shortcut jump-list, share-target receiver, orientation prompt and wake-lock toggle. iOS/Android-aware with aria-live, reduced-motion and tabular-nums metrics.",
  "entries": [
    {
      "key": "pwa-shell/install-prompt-card",
      "family": "pwa-shell",
      "name": "InstallPromptCard",
      "label": "Install prompt card",
      "description": "Add-to-home-screen prompt with platform-aware steps (iOS Safari share-sheet vs Android Chrome install) plus install and dismiss actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/install-prompt-card",
      "tags": [
        "pwa",
        "install",
        "onboarding"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/offline-indicator-strip",
      "family": "pwa-shell",
      "name": "OfflineIndicatorStrip",
      "label": "Offline indicator strip",
      "description": "Top-of-screen connectivity strip with online/offline/syncing/degraded states, pending-change count and aria-live retry.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/offline-indicator-strip",
      "tags": [
        "pwa",
        "connectivity",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/pull-to-refresh-loader",
      "family": "pwa-shell",
      "name": "PullToRefreshLoader",
      "label": "Pull-to-refresh loader",
      "description": "Refresh bowl with an SVG progress ring driven by a 0-1 progress value, plus idle/armed/loading hint states.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/pull-to-refresh-loader",
      "tags": [
        "pwa",
        "gesture",
        "loader"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/splash-screen",
      "family": "pwa-shell",
      "name": "SplashScreen",
      "label": "Splash screen",
      "description": "Branded boot screen with monogram logo, tagline, version/region footer and a boot-progress bar showing the current step.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/splash-screen",
      "tags": [
        "pwa",
        "boot",
        "branding"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/sync-status-tile",
      "family": "pwa-shell",
      "name": "SyncStatusTile",
      "label": "Sync status tile",
      "description": "Sync dashboard tile with per-entity pending rows, total queued count, last/next sync times and a retry-now CTA across idle/syncing/error/offline states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/sync-status-tile",
      "tags": [
        "pwa",
        "sync",
        "dashboard"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/biometric-unlock-card",
      "family": "pwa-shell",
      "name": "BiometricUnlockCard",
      "label": "Biometric unlock card",
      "description": "Touch ID / Face ID / fingerprint unlock prompt with crew avatar, scanning/success/error states and a PIN-dot fallback.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/biometric-unlock-card",
      "tags": [
        "pwa",
        "auth",
        "biometric"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/update-available-banner",
      "family": "pwa-shell",
      "name": "UpdateAvailableBanner",
      "label": "Update available banner",
      "description": "Service-worker update banner with a reload CTA, release-age meta, optional snooze and a changelog bullet list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/update-available-banner",
      "tags": [
        "pwa",
        "update",
        "service-worker"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/network-quality-meter",
      "family": "pwa-shell",
      "name": "NetworkQualityMeter",
      "label": "Network quality meter",
      "description": "Signal-bar meter for offline/2G/3G/4G/5G/Wi-Fi tiers with tabular-nums latency, down and up throughput metrics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/network-quality-meter",
      "tags": [
        "pwa",
        "network",
        "metrics"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/permission-modal",
      "family": "pwa-shell",
      "name": "PermissionModal",
      "label": "Permission modal",
      "description": "Pre-prompt dialog for camera/mic/location/notifications/contacts/storage with per-kind rationale, benefit list and allow/deny actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/permission-modal",
      "tags": [
        "pwa",
        "permissions",
        "dialog"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/home-screen-tile",
      "family": "pwa-shell",
      "name": "HomeScreenTile",
      "label": "Home-screen tile",
      "description": "iOS-widget-style quick-action button tile with icon, badge counter, tone variants and inline trend metrics.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/home-screen-tile",
      "tags": [
        "pwa",
        "tile",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/app-shortcut-row",
      "family": "pwa-shell",
      "name": "AppShortcutRow",
      "label": "App shortcut row",
      "description": "Jump-list of in-app shortcut actions rendered as tappable buttons or links with icon, label, hint and tone.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/app-shortcut-row",
      "tags": [
        "pwa",
        "shortcuts",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/share-target-card",
      "family": "pwa-shell",
      "name": "ShareTargetCard",
      "label": "Share target card",
      "description": "Web Share Target receiver with caption + word/char count, optional media preview and toggleable channel chips before sharing.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/share-target-card",
      "tags": [
        "pwa",
        "share",
        "media"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/device-orientation-prompt",
      "family": "pwa-shell",
      "name": "DeviceOrientationPrompt",
      "label": "Device orientation prompt",
      "description": "Rotate-to-landscape/portrait hint with an animated arc-and-phone glyph, copy and optional stay-as-is dismiss.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/device-orientation-prompt",
      "tags": [
        "pwa",
        "orientation",
        "hint"
      ],
      "status": "captured"
    },
    {
      "key": "pwa-shell/wake-lock-toggle",
      "family": "pwa-shell",
      "name": "WakeLockToggle",
      "label": "Wake lock toggle",
      "description": "Keep-screen-on switch (role=switch, aria-checked) with status icon, helper copy and a battery-cost-per-hour pill.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/pwa-shell",
      "routeHref": "/ui-primitives/pwa-shell/wake-lock-toggle",
      "tags": [
        "pwa",
        "wake-lock",
        "toggle"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
