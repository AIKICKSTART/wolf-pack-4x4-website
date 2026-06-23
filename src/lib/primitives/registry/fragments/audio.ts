import type { PrimitiveFamilyManifest } from "../types"

const manifest: PrimitiveFamilyManifest = {
  "family": "audio",
  "title": "Audio",
  "group": "Media",
  "summary": "13 audio primitives — full and mini players, voice memo recorder, SVG waveform, volume slider, output-device selector and chip, now-playing card, queue list, podcast episode card, chapter markers, loading state, exhaust dyno clip preview, and animated equalizer bars.",
  "entries": [
    {
      "key": "audio/audio-player",
      "family": "audio",
      "name": "AudioPlayer",
      "label": "Audio player",
      "description": "Full-featured player with waveform scrubber, transport (prev/play/next), volume slider, mute, and optional output-device selector; tolerates a missing src by disabling controls.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/player",
      "tags": [
        "player",
        "transport",
        "waveform",
        "controls"
      ],
      "status": "captured"
    },
    {
      "key": "audio/mini-audio-player",
      "family": "audio",
      "name": "MiniAudioPlayer",
      "label": "Mini audio player",
      "description": "Compact inline player: single play/pause button, track title, compact waveform, and current/total time readout.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/mini-player",
      "tags": [
        "player",
        "compact",
        "inline"
      ],
      "status": "captured"
    },
    {
      "key": "audio/voice-memo-recorder",
      "family": "audio",
      "name": "VoiceMemoRecorder",
      "label": "Voice memo recorder",
      "description": "Record/stop/discard/save voice-memo surface with a live animated spike waveform, elapsed-vs-max timer, and idle/recording/stopped status states.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/voice-memo",
      "tags": [
        "recorder",
        "voice",
        "memo",
        "waveform"
      ],
      "status": "captured"
    },
    {
      "key": "audio/audio-waveform",
      "family": "audio",
      "name": "AudioWaveform",
      "label": "Audio waveform",
      "description": "SVG amplitude-bar waveform with played/unplayed split driven by a 0–1 progress value; compact or detailed variant, tonal accent, and a generated placeholder when no samples are given.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/waveform",
      "tags": [
        "waveform",
        "svg",
        "visualization"
      ],
      "status": "captured"
    },
    {
      "key": "audio/volume-slider",
      "family": "audio",
      "name": "VolumeSlider",
      "label": "Volume slider",
      "description": "Accessible 0–1 range volume control with percent chip, optional embedded mute toggle, and horizontal or vertical orientation.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/volume-slider",
      "tags": [
        "volume",
        "slider",
        "control"
      ],
      "status": "captured"
    },
    {
      "key": "audio/speaker-selector",
      "family": "audio",
      "name": "SpeakerSelector",
      "label": "Speaker selector",
      "description": "Popover listbox for choosing an audio output device; trigger shows the active device's icon and label, options list devices with subtitles and a selected marker.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/speaker-selector",
      "tags": [
        "output",
        "device",
        "selector",
        "popover"
      ],
      "status": "captured"
    },
    {
      "key": "audio/audio-device-chip",
      "family": "audio",
      "name": "AudioDeviceChip",
      "label": "Audio device chip",
      "description": "Compact chip showing an output device's icon, label, and kind/subtitle; becomes a switch button when an onSwitch handler is provided and marks the active device.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/device-chip",
      "tags": [
        "device",
        "chip",
        "output"
      ],
      "status": "captured"
    },
    {
      "key": "audio/now-playing-card",
      "family": "audio",
      "name": "NowPlayingCard",
      "label": "Now playing card",
      "description": "Album-art now-playing card with progress bar, time readout, transport controls, and a like toggle; simulates progress when no audio source is wired.",
      "kind": "widget",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/now-playing",
      "tags": [
        "now-playing",
        "card",
        "transport",
        "cover-art"
      ],
      "status": "captured"
    },
    {
      "key": "audio/audio-queue-list",
      "family": "audio",
      "name": "AudioQueueList",
      "label": "Audio queue list",
      "description": "Ordered up-next track list with index, drag handle, title/artist, duration, active-row highlight, and optional remove buttons.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/queue",
      "tags": [
        "queue",
        "playlist",
        "list"
      ],
      "status": "captured"
    },
    {
      "key": "audio/podcast-episode-card",
      "family": "audio",
      "name": "PodcastEpisodeCard",
      "label": "Podcast episode card",
      "description": "Episode card with cover thumbnail, show name, title, description, duration/published meta, add-to-queue action, and an expandable chapter list.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/podcast-episode",
      "tags": [
        "podcast",
        "episode",
        "card",
        "chapters"
      ],
      "status": "captured"
    },
    {
      "key": "audio/audio-chapter-markers",
      "family": "audio",
      "name": "AudioChapterMarkers",
      "label": "Audio chapter markers",
      "description": "Timeline rail of chapter segments with a positioned playhead and clickable jump-to-chapter markers that surface a quote-bubble tooltip with title and timestamp.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/chapter-markers",
      "tags": [
        "chapters",
        "timeline",
        "markers",
        "navigation"
      ],
      "status": "captured"
    },
    {
      "key": "audio/audio-loading-state",
      "family": "audio",
      "name": "AudioLoadingState",
      "label": "Audio loading state",
      "description": "Buffering status surface pairing animated equalizer bars with a kicker, title, and detail copy under role=status.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/loading",
      "tags": [
        "loading",
        "buffering",
        "status",
        "equalizer"
      ],
      "status": "captured"
    },
    {
      "key": "audio/exhaust-sound-preview",
      "family": "audio",
      "name": "ExhaustSoundPreview",
      "label": "Exhaust sound preview",
      "description": "Brand-specific exhaust dyno-clip preview: play/pause, compact waveform with progress, and loudness (dB) and pipe-diameter chips; mock-animates progress when no src is wired.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/exhaust-sound",
      "tags": [
        "exhaust",
        "preview",
        "automotive",
        "waveform"
      ],
      "status": "captured"
    },
    {
      "key": "audio/equalizer-bars",
      "family": "audio",
      "name": "EqualizerBars",
      "label": "Equalizer bars",
      "description": "Animated CSS equalizer of 4–16 staggered bars with active/idle states and a tonal accent; decorative or labelled for assistive tech.",
      "kind": "primitive",
      "importPath": "@/app/ui-primitives/components/audio",
      "routeHref": "/ui-primitives/audio/equalizer",
      "tags": [
        "equalizer",
        "animation",
        "visualization"
      ],
      "status": "captured"
    }
  ]
}

export default manifest
