import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "overlays",
  "title": "Overlays",
  "group": "Chrome",
  "summary": "14 overlay primitives — dialogs, sheets, lightboxes, command palette, popover, toast tray, loading veil and celebration modal — built on base-ui dialog/popover with a11y, reduced-motion and light/dark parity.",
  "entries": [
    {
      "key": "overlays/basic-dialog",
      "family": "overlays",
      "name": "BasicDialog",
      "label": "Basic dialog",
      "description": "Modal dialog with titled header, optional description, body slot, action footer, close button and sm/md/lg sizes.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/basic-dialog",
      "tags": [
        "dialog",
        "modal",
        "base-ui"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/confirm-dialog",
      "family": "overlays",
      "name": "ConfirmDialog",
      "label": "Confirm dialog",
      "description": "Confirm/cancel dialog with default or destructive variant, variant icon and a busy/working state on the confirm button.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/confirm-dialog",
      "tags": [
        "dialog",
        "confirm",
        "destructive"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/alert-dialog",
      "family": "overlays",
      "name": "AlertDialog",
      "label": "Alert dialog",
      "description": "Single-acknowledge alert dialog with a ringed icon and autofocused OK button, built on base-ui alert-dialog.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/alert-dialog",
      "tags": [
        "dialog",
        "alert",
        "acknowledge"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/side-sheet",
      "family": "overlays",
      "name": "SideSheet",
      "label": "Side sheet",
      "description": "Edge-anchored drawer (left/right, sm/md/lg width) with title, subtitle, scrollable body, footer and close.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/side-sheet",
      "tags": [
        "sheet",
        "drawer",
        "panel"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/bottom-sheet",
      "family": "overlays",
      "name": "BottomSheet",
      "label": "Bottom sheet",
      "description": "Bottom-anchored sheet with drag handle, header, body and footer at auto/half/full height.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/bottom-sheet",
      "tags": [
        "sheet",
        "mobile",
        "drawer"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/top-banner-sheet",
      "family": "overlays",
      "name": "TopBannerSheet",
      "label": "Top banner sheet",
      "description": "Top-docked announcement banner with info/warning/danger tone, tone stripe, icon, message, optional actions and dismiss.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/top-banner-sheet",
      "tags": [
        "banner",
        "announcement",
        "notification"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/full-takeover",
      "family": "overlays",
      "name": "FullTakeover",
      "label": "Full takeover",
      "description": "Full-screen takeover surface with eyebrow/title bar, optional toolbar, minimize and close controls.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/full-takeover",
      "tags": [
        "fullscreen",
        "takeover",
        "immersive"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/image-lightbox",
      "family": "overlays",
      "name": "ImageLightbox",
      "label": "Image lightbox",
      "description": "Gallery lightbox with arrow/keyboard navigation, zoom in/out, pointer panning, captions and a thumbnail strip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/image-lightbox",
      "tags": [
        "lightbox",
        "gallery",
        "zoom",
        "media"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/video-lightbox",
      "family": "overlays",
      "name": "VideoLightbox",
      "label": "Video lightbox",
      "description": "Video player overlay with controls and caption that swaps to a poster image when prefers-reduced-motion is set.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/video-lightbox",
      "tags": [
        "lightbox",
        "video",
        "media"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/wizard-modal",
      "family": "overlays",
      "name": "WizardModal",
      "label": "Wizard modal",
      "description": "Generic multi-step wizard dialog with a progress stepper, back/next/skip/finish controls and per-step content.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/wizard-modal",
      "tags": [
        "wizard",
        "stepper",
        "flow"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/command-modal",
      "family": "overlays",
      "name": "CommandModal",
      "label": "Command modal",
      "description": "Command-palette dialog with search filtering, sectioned listbox, recents, keyboard shortcuts and Kbd hints.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/command-modal",
      "tags": [
        "command-palette",
        "search",
        "shortcuts"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/popover-rich",
      "family": "overlays",
      "name": "PopoverRich",
      "label": "Rich popover",
      "description": "Trigger-anchored popover with arrow, header/body/footer slots and configurable placement, align and side offset.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/popover-rich",
      "tags": [
        "popover",
        "anchored",
        "base-ui"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/toast-tray",
      "family": "overlays",
      "name": "ToastTray",
      "label": "Toast tray",
      "description": "Stacked toast notifications with tone variants, auto-dismiss timers, optional action, six placements and spring motion.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/toast-tray",
      "tags": [
        "toast",
        "notification",
        "stack"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/loading-overlay",
      "family": "overlays",
      "name": "LoadingOverlay",
      "label": "Loading overlay",
      "description": "Animated loading veil (fixed or absolute) with a spinner, tone variants and optional message/detail text.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/loading-overlay",
      "tags": [
        "loading",
        "spinner",
        "veil"
      ],
      "status": "captured"
    },
    {
      "key": "overlays/confetti-modal",
      "family": "overlays",
      "name": "ConfettiModal",
      "label": "Confetti modal",
      "description": "Celebration dialog that fires a confetti cannon or burst on open, with medal motif, title, description and actions.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/overlays",
      "routeHref": "/ui-primitives/overlays/confetti-modal",
      "tags": [
        "celebration",
        "confetti",
        "success"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
