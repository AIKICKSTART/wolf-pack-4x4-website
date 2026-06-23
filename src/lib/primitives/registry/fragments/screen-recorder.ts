import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "screen-recorder",
  "title": "Screen recorder",
  "group": "Media",
  "summary": "14 screen-recording capture primitives — start control, mode/device/region pickers, live recording controls, webcam bubble, audio metering, post-capture preview, trimming, annotation, watermark, transcript status and a share modal — sharing a screen-recorder-types vocabulary.",
  "entries": [
    {
      "key": "screen-recorder/start-record-button",
      "family": "screen-recorder",
      "name": "StartRecordButton",
      "label": "Start record button",
      "description": "Pulsing record button with ring/core animation that swaps glyph and copy across idle/arming/countdown/recording states, plus a live countdown digit.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/start-record-button",
      "tags": [
        "recording",
        "control",
        "button"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/record-mode-picker",
      "family": "screen-recorder",
      "name": "RecordModePicker",
      "label": "Record mode picker",
      "description": "Radio-group of mode tiles (screen+camera, screen-only, camera-only, audio-only) each with a glyph preview and descriptive subtitle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/record-mode-picker",
      "tags": [
        "recording",
        "picker",
        "mode"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/recording-controls",
      "family": "screen-recorder",
      "name": "RecordingControls",
      "label": "Recording controls",
      "description": "Toolbar with REC/PAUSED indicator, live elapsed timer, pause/resume/stop/cancel buttons and a storage-quota chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/recording-controls",
      "tags": [
        "recording",
        "toolbar",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/recording-timer-pill",
      "family": "screen-recorder",
      "name": "RecordingTimerPill",
      "label": "Recording timer pill",
      "description": "Floating or inline REC status pill showing HH:MM:SS elapsed with a pulsing dot and optional upload-bandwidth chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/recording-timer-pill",
      "tags": [
        "recording",
        "timer",
        "status"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/webcam-bubble",
      "family": "screen-recorder",
      "name": "WebcamBubble",
      "label": "Webcam bubble",
      "description": "Picture-in-picture webcam preview over a mock screen with position radio-grid, size slider and mirror toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/webcam-bubble",
      "tags": [
        "recording",
        "webcam",
        "pip"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/recording-region-selector",
      "family": "screen-recorder",
      "name": "RecordingRegionSelector",
      "label": "Recording region selector",
      "description": "Stage with a dimmed capture region, eight resize handles, crosshair and resolution/fps chips for selecting the recorded area.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/recording-region-selector",
      "tags": [
        "recording",
        "region",
        "capture"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/audio-level-meter",
      "family": "screen-recorder",
      "name": "AudioLevelMeter",
      "label": "Audio level meter",
      "description": "Dual-channel L/R input meter with dB tick scale, peak-hold dots, clipping alert and a mute toggle.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/audio-level-meter",
      "tags": [
        "recording",
        "audio",
        "meter"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/after-record-preview",
      "family": "screen-recorder",
      "name": "AfterRecordPreview",
      "label": "After-record preview",
      "description": "Post-capture review card with a video player well, duration/size/format metadata and retake/trim/save-and-share actions.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/after-record-preview",
      "tags": [
        "recording",
        "preview",
        "playback"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/transcript-generation-status",
      "family": "screen-recorder",
      "name": "TranscriptGenerationStatus",
      "label": "Transcript generation status",
      "description": "Status card for queued/processing/ready/failed transcription with ETA, language and word-count chips plus open/retry actions.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/transcript-generation-status",
      "tags": [
        "transcript",
        "status",
        "ai"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/share-recording-modal",
      "family": "screen-recorder",
      "name": "ShareRecordingModal",
      "label": "Share recording modal",
      "description": "Modal dialog to share a recording with copyable URL, privacy radio options, team email field, embed snippet and link-expiry date.",
      "kind": "section",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/share-recording-modal",
      "tags": [
        "recording",
        "share",
        "modal"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/recording-watermark-badge",
      "family": "screen-recorder",
      "name": "RecordingWatermarkBadge",
      "label": "Recording watermark badge",
      "description": "Brand watermark preview over a mock scene with position radio chips and an opacity slider.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/recording-watermark-badge",
      "tags": [
        "recording",
        "watermark",
        "branding"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/recorded-clip-trim-handles",
      "family": "screen-recorder",
      "name": "RecordedClipTrimHandles",
      "label": "Recorded clip trim handles",
      "description": "Scrub strip with thumbnail cells, draggable start/end trim handles, playhead and a kept/removed duration chip.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/recorded-clip-trim-handles",
      "tags": [
        "recording",
        "trim",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/live-annotation-overlay",
      "family": "screen-recorder",
      "name": "LiveAnnotationOverlay",
      "label": "Live annotation overlay",
      "description": "On-canvas annotation surface with SVG pen/arrow/box/text marks plus a tool radio-group, colour swatches and a clear-frame action.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/live-annotation-overlay",
      "tags": [
        "recording",
        "annotation",
        "overlay"
      ],
      "status": "captured"
    },
    {
      "key": "screen-recorder/device-source-selector",
      "family": "screen-recorder",
      "name": "DeviceSourceSelector",
      "label": "Device source selector",
      "description": "Grid of microphone/speaker/camera select dropdowns with detected-source subtitles and test-mic / test-camera buttons.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/screen-recorder",
      "routeHref": "/ui-primitives/screen-recorder/device-source-selector",
      "tags": [
        "recording",
        "device",
        "selector"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
