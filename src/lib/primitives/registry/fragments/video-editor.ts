import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "video-editor",
  "title": "Video editor",
  "group": "Media",
  "summary": "14 non-linear video-editing timeline primitives — tracks, clips, playhead/ruler, trim/razor tools, effects, transitions, speed ramps, color grading, audio waveforms, cue markers and subtitle cues — sharing a common video-editor-types model.",
  "entries": [
    {
      "key": "video-editor/timeline-track",
      "family": "video-editor",
      "name": "TimelineTrack",
      "label": "Timeline track",
      "description": "A timeline track row with kind glyph, label/meta header, mute/solo/lock chips and a lane that hosts clips, waveforms or subtitle cues.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/timeline-track",
      "tags": [
        "timeline",
        "track",
        "nle"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/clip-thumbnail-strip",
      "family": "video-editor",
      "name": "ClipThumbnailStrip",
      "label": "Clip thumbnail strip",
      "description": "A timeline clip rendered as a strip of frame thumbnails with a name/duration overlay and idle/selected/trimming/locked/muted states; becomes a button when selectable.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/clip-thumbnail-strip",
      "tags": [
        "clip",
        "thumbnail",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/playhead-cursor",
      "family": "video-editor",
      "name": "PlayheadCursor",
      "label": "Playhead cursor",
      "description": "A draggable playhead line positioned by time and pixels-per-second, exposing a timecode/frame chip and an ARIA slider for the current play position.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/playhead-cursor",
      "tags": [
        "playhead",
        "timecode",
        "slider"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/timeline-ruler",
      "family": "video-editor",
      "name": "TimelineRuler",
      "label": "Timeline ruler",
      "description": "A scrollable time ruler drawing major/minor second ticks plus preview frame sub-ticks, with a meta header showing duration, fps and an optional zoom chip.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/timeline-ruler",
      "tags": [
        "ruler",
        "timecode",
        "timeline"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/track-row-header",
      "family": "video-editor",
      "name": "TrackRowHeader",
      "label": "Track row header",
      "description": "The left-rail header for a track row with kind icon, short/long name and arm/mute/solo/lock control buttons (record-arm shown for audio).",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/track-row-header",
      "tags": [
        "track",
        "header",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/clip-trim-handles",
      "family": "video-editor",
      "name": "ClipTrimHandles",
      "label": "Clip trim handles",
      "description": "Left/right drag handles overlaid on a clip for trimming in/out points, with an active-side glow and a delta chip showing the trim offset in seconds and frames.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/clip-trim-handles",
      "tags": [
        "trim",
        "clip",
        "handles"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/razor-split-tool",
      "family": "video-editor",
      "name": "RazorSplitTool",
      "label": "Razor split tool",
      "description": "A blade cursor positioned over a track with a dashed cut line, a timecode chip and an optional confirm-split popover with a snap-to-frame toggle.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/razor-split-tool",
      "tags": [
        "razor",
        "split",
        "tool"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/effect-chip",
      "family": "video-editor",
      "name": "EffectChip",
      "label": "Effect chip",
      "description": "A toggleable effect pill (color/blur/stabilize/denoise/lut/audio-eq/audio-gate) with kind glyph, on/off switch and an optional parameters popover of slider controls.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/effect-chip",
      "tags": [
        "effect",
        "chip",
        "popover"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/transition-between-clips",
      "family": "video-editor",
      "name": "TransitionBetweenClips",
      "label": "Transition between clips",
      "description": "A between-clip transition marker (cut/cross-fade/dissolve/wipe) with an SVG glyph, kind label and duration chip, shown selected when highlighted.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/transition-between-clips",
      "tags": [
        "transition",
        "clip",
        "marker"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/speed-ramp-curve",
      "family": "video-editor",
      "name": "SpeedRampCurve",
      "label": "Speed ramp curve",
      "description": "An SVG speed-ramp editor plotting anchor points on a log-scaled 0.25x-4x curve with smooth beziers, a 1x midline and per-anchor speed labels.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/speed-ramp-curve",
      "tags": [
        "speed",
        "curve",
        "dataviz"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/color-grading-wheels",
      "family": "video-editor",
      "name": "ColorGradingWheels",
      "label": "Color grading wheels",
      "description": "A 3-way color grading panel with shadows/midtones/highlights wheels, each plotting a hue/saturation indicator and a lift level bar.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/color-grading-wheels",
      "tags": [
        "color",
        "grading",
        "wheels"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/audio-waveform-track",
      "family": "video-editor",
      "name": "AudioWaveformTrack",
      "label": "Audio waveform track",
      "description": "An audio track rendering a bar waveform from sample values with an optional selection overlay and a stereo L/R output level meter.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/audio-waveform-track",
      "tags": [
        "audio",
        "waveform",
        "meter"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/cue-marker",
      "family": "video-editor",
      "name": "CueMarkerPin",
      "label": "Cue marker pin",
      "description": "A numbered, tonally-colored cue marker pin positioned on the timeline by pixels-per-second, with a label chip and an optional note popover.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/cue-marker",
      "tags": [
        "cue",
        "marker",
        "annotation"
      ],
      "status": "captured"
    },
    {
      "key": "video-editor/subtitle-row",
      "family": "video-editor",
      "name": "SubtitleRow",
      "label": "Subtitle row",
      "description": "A subtitle track laying out numbered timed cues by percentage or pixels-per-second, each showing its index and caption text as an accessible list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/video-editor",
      "routeHref": "/ui-primitives/video-editor/subtitle-row",
      "tags": [
        "subtitle",
        "caption",
        "timeline"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
