import type {
  AudioChapter,
  AudioOutputDevice,
  AudioTrack,
} from "../components/audio/audio-types"
import type { PodcastEpisode } from "../components/audio/podcast-episode-card"

/**
 * Build a deterministic waveform of `count` samples between 0–1 using the
 * `seed` to vary the shape. The values are deterministic so server rendering
 * matches client rendering without hydration drift.
 */
function buildWaveform(count: number, seed: number): ReadonlyArray<number> {
  return Array.from({ length: count }, (_, index) => {
    const base = Math.sin((index + seed) * 0.32) * 0.32
    const swell = Math.sin(seed + index * 0.11) * 0.28
    const grit = Math.sin((index * 0.7 + seed * 1.3)) * 0.18
    return Math.max(0.08, Math.min(0.98, 0.5 + base + swell + grit))
  })
}

export const DEMO_TRACK: AudioTrack = {
  id: "track-mainline",
  title: "Mainline Drive",
  artist: "Oak Flats Mufflermen",
  album: "Workshop Sessions Vol. 4",
  src: "/media/exhaust-bypass.mp3",
  duration: 214,
  waveform: buildWaveform(96, 11),
  tone: "red",
}

export const DEMO_NOW_PLAYING: AudioTrack = {
  id: "track-now-playing",
  title: "GT350 Dyno Pull",
  artist: "Track Diary",
  album: "Built On Welder Sparks",
  duration: 184,
  waveform: buildWaveform(96, 4),
  tone: "amber",
}

export const DEMO_MINI_TRACK: AudioTrack = {
  id: "track-mini",
  title: "Bay 4 Walkthrough",
  artist: "Foreman handoff",
  duration: 47,
  waveform: buildWaveform(48, 19),
  tone: "teal",
}

export const DEMO_QUEUE: ReadonlyArray<AudioTrack> = [
  {
    id: "q-1",
    title: "Idle stumble diagnosis",
    artist: "Bay 2",
    duration: 92,
    waveform: buildWaveform(40, 3),
    tone: "red",
  },
  {
    id: "q-2",
    title: "Sub frame torque sequence",
    artist: "Service notes",
    duration: 162,
    waveform: buildWaveform(40, 5),
    tone: "amber",
  },
  {
    id: "q-3",
    title: "Customer voicemail — Holden VF",
    artist: "Reception",
    duration: 38,
    waveform: buildWaveform(40, 7),
    tone: "teal",
  },
  {
    id: "q-4",
    title: "Dyno run #4 — full pull",
    artist: "Track diary",
    duration: 248,
    waveform: buildWaveform(40, 9),
    tone: "red",
  },
  {
    id: "q-5",
    title: "Apprentice safety brief",
    artist: "Shift open",
    duration: 105,
    waveform: buildWaveform(40, 13),
    tone: "green",
  },
]

export const DEMO_DEVICES: ReadonlyArray<AudioOutputDevice> = [
  {
    id: "dev-macbook",
    label: "MacBook Speakers",
    kind: "speakers",
    active: true,
    subtitle: "Internal · 2.0",
  },
  {
    id: "dev-airpods",
    label: "AirPods Pro",
    kind: "bluetooth",
    subtitle: "Bluetooth · 82%",
  },
  {
    id: "dev-yamaha",
    label: "Yamaha YHT-3076",
    kind: "av-receiver",
    subtitle: "HDMI ARC",
  },
  {
    id: "dev-bt-receiver",
    label: "Bluetooth Receiver",
    kind: "bluetooth",
    subtitle: "Workshop ceiling",
  },
]

export const DEMO_CHAPTERS: ReadonlyArray<AudioChapter> = [
  { id: "ch-1", start: 0, end: 38, title: "Intro & shop diary" },
  { id: "ch-2", start: 38, end: 92, title: "Diagnosing the rattle" },
  { id: "ch-3", start: 92, end: 148, title: "Cat-back swap" },
  { id: "ch-4", start: 148, end: 210, title: "Dyno result reveal" },
]

export const DEMO_EPISODE: PodcastEpisode = {
  id: "ep-mufflermen-027",
  title: "Episode 27 — Tuning the Coyote for street and track",
  show: "Workshop Bench Tape",
  durationSeconds: 3284,
  publishedRelative: "Released 3 days ago",
  description:
    "Daniel walks Jay through the GT350 build sheet — supercharger swap, IRS upgrade, and how the Mufflermen team dialled the dyno to 612 hp at the rear wheels.",
  chapters: DEMO_CHAPTERS,
}

export const DEMO_EXHAUST_WAVEFORM = buildWaveform(56, 17)
