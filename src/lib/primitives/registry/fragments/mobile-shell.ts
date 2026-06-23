import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "mobile-shell",
  "title": "Mobile shell",
  "group": "Chrome",
  "summary": "16 iOS/Android-style mobile chrome primitives — device frame, status/app bars, bottom nav, tabs, drawers, action/modal sheets, FAB, segmented + chip controls, toast, loading bar, pull-to-refresh, and swipe-action rows — for composing app-shell previews.",
  "entries": [
    {
      "key": "mobile-shell/mobile-viewport",
      "family": "mobile-shell",
      "name": "MobileViewport",
      "label": "Mobile viewport",
      "description": "Phone-frame wrapper with notch, speaker, camera and home indicator that renders children inside a safe-area screen; dark/light tone.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/viewport",
      "tags": [
        "device-frame",
        "preview",
        "shell"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/top-app-bar",
      "family": "mobile-shell",
      "name": "TopAppBar",
      "label": "Top app bar",
      "description": "Mobile header with title/subtitle, optional back button or leading slot, trailing actions, and solid/transparent compact variants.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/top-app-bar",
      "tags": [
        "header",
        "navigation",
        "appbar"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/bottom-nav-bar",
      "family": "mobile-shell",
      "name": "BottomNavBar",
      "label": "Bottom nav bar",
      "description": "Bottom tab navigation with icons, labels, badges and an animated pill/underline indicator that springs between active items.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/bottom-nav",
      "tags": [
        "navigation",
        "tabs",
        "bottom"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/tab-indicator-strip",
      "family": "mobile-shell",
      "name": "TabIndicatorStrip",
      "label": "Tab indicator strip",
      "description": "Horizontal tablist with per-tab counts and an animated sliding underline indicator; start/center aligned, roving tabindex.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/tab-strip",
      "tags": [
        "tabs",
        "indicator",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/mobile-drawer",
      "family": "mobile-shell",
      "name": "MobileDrawer",
      "label": "Mobile drawer",
      "description": "Left side-drawer dialog with backdrop, Escape-to-close, swipe-to-dismiss pointer drag, and optional footer; narrow/default widths.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/drawer",
      "tags": [
        "drawer",
        "dialog",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/action-sheet",
      "family": "mobile-shell",
      "name": "ActionSheet",
      "label": "Action sheet",
      "description": "iOS-style bottom action sheet listing labelled items with optional icon/description/destructive tone, plus a cancel button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/action-sheet",
      "tags": [
        "action-sheet",
        "menu",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/pull-to-refresh",
      "family": "mobile-shell",
      "name": "PullToRefresh",
      "label": "Pull to refresh",
      "description": "Progress-driven pull-to-refresh indicator with idle/armed/loading states, rotating arrow that flips to a spinner, reduced-motion aware.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/pull-to-refresh",
      "tags": [
        "refresh",
        "gesture",
        "progress"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/mobile-toast",
      "family": "mobile-shell",
      "name": "MobileToast",
      "label": "Mobile toast",
      "description": "Status toast with info/success/warning/error tone icons, title/description, optional action and dismiss button, aria-live polite.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/toast",
      "tags": [
        "toast",
        "notification",
        "feedback"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/mobile-loading-bar",
      "family": "mobile-shell",
      "name": "MobileLoadingBar",
      "label": "Mobile loading bar",
      "description": "Top-edge progressbar in indeterminate or determinate mode with red/amber/teal tone and scaleX-driven fill.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/loading-bar",
      "tags": [
        "loading",
        "progress",
        "indicator"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/modal-sheet",
      "family": "mobile-shell",
      "name": "ModalSheet",
      "label": "Modal sheet",
      "description": "Bottom modal sheet dialog with peek/half/full snap heights, grab handle, title/description, body and optional footer; Escape-to-close.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/modal-sheet",
      "tags": [
        "sheet",
        "modal",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/mobile-status-bar",
      "family": "mobile-shell",
      "name": "MobileStatusBar",
      "label": "Mobile status bar",
      "description": "Faux device status bar with time, signal/Wi-Fi and battery SVG glyphs and carrier label (5G/4G/LTE/Wi-Fi); light/dark tone.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/status-bar",
      "tags": [
        "status-bar",
        "device",
        "chrome"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/fab",
      "family": "mobile-shell",
      "name": "Fab",
      "label": "Floating action button",
      "description": "Floating action button in icon or extended (icon+label) variant with red/amber/teal/neutral tone and bottom-right/left/center positioning.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/fab",
      "tags": [
        "fab",
        "action",
        "button"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/segmented-ios",
      "family": "mobile-shell",
      "name": "SegmentedIos",
      "label": "Segmented control",
      "description": "iOS-style segmented radiogroup with an animated sliding pill behind the active option; sm/md sizes, roving tabindex.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/segmented",
      "tags": [
        "segmented",
        "control",
        "toggle"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/chip-filter-row",
      "family": "mobile-shell",
      "name": "ChipFilterRow",
      "label": "Chip filter row",
      "description": "Scrollable row of toggleable filter chips with optional counts and a clear-all chip when filters are active; aria-pressed state.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/chip-filter",
      "tags": [
        "chips",
        "filter",
        "control"
      ],
      "status": "captured"
    },
    {
      "key": "mobile-shell/swipe-action-row",
      "family": "mobile-shell",
      "name": "SwipeActionRow",
      "label": "Swipe action row",
      "description": "List row revealing toned leading/trailing swipe actions with icon+label, showing rest or demo-leading/demo-trailing reveal states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/mobile-shell",
      "routeHref": "/ui-primitives/mobile-shell/swipe-actions",
      "tags": [
        "swipe",
        "list",
        "actions"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
