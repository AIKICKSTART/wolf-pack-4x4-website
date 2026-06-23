import type {
  BroadcastHost,
  BroadcastViewer,
  ChatMessage,
  ClipMoment,
  LivePoll,
  QnaQuestion,
  RaidEvent,
  ReactionPulse,
  ReplayBroadcast,
  ScheduledBroadcast,
  StreamHealthSnapshot,
  SupporterTierDescriptor,
} from "../components/live-broadcast"

export const HOSTS = {
  daniel: {
    id: "daniel-f",
    name: "Daniel F.",
    role: "Workshop Owner",
  },
  tim: {
    id: "tim",
    name: "Tim",
    role: "Lead Tech",
  },
  manta: {
    id: "manta-rep",
    name: "Manta · Joel C.",
    role: "Supplier Rep",
  },
  pacemaker: {
    id: "pacemaker-rep",
    name: "Pacemaker · Sarah R.",
    role: "Supplier Rep",
  },
} as const satisfies Record<string, BroadcastHost>

const buildBitrateHistory = (seed: number): ReadonlyArray<number> => {
  return Array.from({ length: 24 }, (_, idx) => {
    const wobble = Math.sin((idx + seed) * 0.6) * 350
    const drift = Math.cos((idx + seed) * 0.18) * 180
    return Math.round(6000 + wobble + drift)
  })
}

export const STREAM_HEALTH_STABLE: StreamHealthSnapshot = {
  bitrateKbps: 6080,
  resolutionLabel: "1080p60",
  fps: 60,
  droppedRatio: 0.0012,
  audioLevel: 0.62,
  health: "good",
  bitrateHistory: buildBitrateHistory(0.4),
}

export const STREAM_HEALTH_DEGRADED: StreamHealthSnapshot = {
  bitrateKbps: 4120,
  resolutionLabel: "720p60",
  fps: 58,
  droppedRatio: 0.018,
  audioLevel: 0.71,
  health: "degraded",
  bitrateHistory: buildBitrateHistory(2.7).map((v, i) => (i > 16 ? Math.round(v * 0.62) : v)),
}

export const STREAM_HEALTH_CRITICAL: StreamHealthSnapshot = {
  bitrateKbps: 1840,
  resolutionLabel: "720p30",
  fps: 28,
  droppedRatio: 0.064,
  audioLevel: 0.42,
  health: "critical",
  bitrateHistory: buildBitrateHistory(4.1).map((v, i) => Math.round(v * (i > 12 ? 0.32 : 0.8))),
}

export const SCHEDULED_DYNO_TUESDAY: ScheduledBroadcast = {
  id: "sched-dyno-tue",
  title: "Dyno Tuesday — Falcon GT-HO run",
  startsAt: "2026-06-02T19:00:00+10:00",
  localTimeLabel: "Tue 19:00 AEST",
  durationLabel: "~90 min",
  host: HOSTS.daniel,
  blurb:
    "Walking through a 351 Cleveland Falcon GT-HO on the rolling road. Live AFR + boost + dyno trace, taking viewer questions between pulls.",
  rsvpCount: 412,
}

export const SCHEDULED_MANTA_LAUNCH: ScheduledBroadcast = {
  id: "sched-manta-launch",
  title: "Manta supplier launch — 3.5\" v-band system",
  startsAt: "2026-06-12T18:30:00+10:00",
  localTimeLabel: "Fri 18:30 AEST",
  durationLabel: "~75 min",
  host: HOSTS.manta,
  blurb:
    "Manta walks the new 3.5\" v-band kit for VE/VF Commodore, Falcon BA-BF, Hilux N80. Live install demo on bay 2 with weld review.",
  rsvpCount: 1187,
  rsvped: true,
}

export const SCHEDULED_DPF_QA: ScheduledBroadcast = {
  id: "sched-dpf-qa",
  title: "Customer Q&A — DPF cleaning + delete legality",
  startsAt: "2026-06-19T19:00:00+10:00",
  localTimeLabel: "Fri 19:00 AEST",
  durationLabel: "~60 min",
  host: HOSTS.tim,
  blurb:
    "Tim covers the difference between DPF cleaning, regen flushes, and the NSW EPA position on deletes. Open Q&A throughout.",
  rsvpCount: 268,
}

export const REPLAY_BROADCASTS: ReadonlyArray<ReplayBroadcast> = [
  {
    id: "replay-1",
    title: "Dyno Tuesday — Hilux N80 3\" turbo back",
    airedAt: "2026-05-13T19:00:00+10:00",
    airedLabel: "Aired 13 May 2026",
    runtimeLabel: "1h 24m",
    viewCount: 4180,
    host: HOSTS.tim,
    chapters: [
      { id: "ch-1", title: "Build sheet walkthrough", startSeconds: 0, startLabel: "0:00" },
      { id: "ch-2", title: "Dyno baseline pulls", startSeconds: 720, startLabel: "12:00" },
      { id: "ch-3", title: "AFR tune adjustments", startSeconds: 1980, startLabel: "33:00" },
      { id: "ch-4", title: "Customer Q&A", startSeconds: 3540, startLabel: "59:00" },
      { id: "ch-5", title: "Final pull + outro", startSeconds: 4680, startLabel: "1:18:00" },
    ],
  },
  {
    id: "replay-2",
    title: "Pacemaker headers — fitment + flow bench",
    airedAt: "2026-04-29T18:30:00+10:00",
    airedLabel: "Aired 29 April 2026",
    runtimeLabel: "58 min",
    viewCount: 2310,
    host: HOSTS.pacemaker,
    chapters: [
      { id: "ch-1", title: "Pacemaker lineup overview", startSeconds: 0, startLabel: "0:00" },
      { id: "ch-2", title: "Flow bench results", startSeconds: 540, startLabel: "9:00" },
      { id: "ch-3", title: "Live install on VE V8", startSeconds: 1860, startLabel: "31:00" },
    ],
  },
  {
    id: "replay-3",
    title: "Caravan supplier walkthrough — Manta diesel",
    airedAt: "2026-04-08T18:00:00+10:00",
    airedLabel: "Aired 8 April 2026",
    runtimeLabel: "1h 12m",
    viewCount: 1640,
    host: HOSTS.manta,
    chapters: [
      { id: "ch-1", title: "Manta cat-back overview", startSeconds: 0, startLabel: "0:00" },
      { id: "ch-2", title: "DPF-back vs full system", startSeconds: 1260, startLabel: "21:00" },
      { id: "ch-3", title: "Tow rig live install", startSeconds: 2520, startLabel: "42:00" },
    ],
  },
]

export const VIEWERS: ReadonlyArray<BroadcastViewer> = [
  {
    id: "v-1",
    handle: "BoostedBA_Jake",
    region: "Wollongong NSW",
    watchSeconds: 4220,
    tier: "pit-boss",
  },
  {
    id: "v-2",
    handle: "DieselDad_Mick",
    region: "Albury NSW",
    watchSeconds: 3805,
    tier: "inner-circle",
  },
  {
    id: "v-3",
    handle: "VF_Holden_Loz",
    region: "Penrith NSW",
    watchSeconds: 2940,
    tier: "workshop-crew",
  },
  {
    id: "v-4",
    handle: "FalconChrisGT",
    region: "Bendigo VIC",
    watchSeconds: 1820,
    tier: "platinum",
  },
  {
    id: "v-5",
    handle: "HiluxKenny",
    region: "Coffs Harbour NSW",
    watchSeconds: 1240,
  },
  {
    id: "v-6",
    handle: "ApprenticeAsh",
    region: "Wollongong NSW",
    watchSeconds: 880,
    tier: "workshop-crew",
    isFlagged: true,
  },
  {
    id: "v-7",
    handle: "ManiacManny",
    region: "Cairns QLD",
    watchSeconds: 410,
  },
]

export const CHAT_MESSAGES: ReadonlyArray<ChatMessage> = [
  {
    id: "m-pinned",
    timestamp: "19:00 AEST",
    author: "Daniel F.",
    role: "host",
    content: "Pinned: dyno booked till 21:00 — Falcon GT-HO baseline pulls first, customer Q&A 20:30.",
    isPinned: true,
  },
  {
    id: "m-1",
    timestamp: "19:04",
    author: "BoostedBA_Jake",
    role: "viewer",
    tier: "pit-boss",
    content: "Right on time, my BA's screaming for an extractor upgrade after watching last week.",
    reaction: "muffler-flame",
  },
  {
    id: "m-2",
    timestamp: "19:05",
    author: "Tim",
    role: "moderator",
    content: "Welcome in everyone — Daniel's strapping it down, we'll be live with the first pull in 4 min.",
  },
  {
    id: "m-3",
    timestamp: "19:06",
    author: "VF_Holden_Loz",
    role: "viewer",
    tier: "workshop-crew",
    content: "Will you guys cover the 3.5\" twin or just single 3\" today?",
  },
  {
    id: "m-4",
    timestamp: "19:07",
    author: "FalconChrisGT",
    role: "viewer",
    tier: "platinum",
    content: "Setting Apple Watch reminder for the dyno graph drop 📈",
    reaction: "dyno",
  },
  {
    id: "m-5",
    timestamp: "19:08",
    author: "DieselDad_Mick",
    role: "viewer",
    tier: "inner-circle",
    content: "Wagga checking in. Beer cracked, ready for it.",
    reaction: "aussie-flag",
  },
  {
    id: "m-6",
    timestamp: "19:08",
    author: "Daniel F.",
    role: "host",
    content: "Loz — twin 3\" today on the GT-HO, single 3\" rig is next week's Q&A.",
  },
  {
    id: "m-7",
    timestamp: "19:09",
    author: "HiluxKenny",
    role: "viewer",
    content: "Any chance of seeing the DPF cleaning rig in the background? 🙏",
  },
]

export const REACTION_PULSES: ReadonlyArray<ReactionPulse> = [
  { id: "r-1", kind: "muffler-flame", fromHandle: "BoostedBA_Jake" },
  { id: "r-2", kind: "wrench", fromHandle: "Tim" },
  { id: "r-3", kind: "dyno", fromHandle: "FalconChrisGT" },
  { id: "r-4", kind: "smoke", fromHandle: "DieselDad_Mick" },
  { id: "r-5", kind: "aussie-flag", fromHandle: "HiluxKenny" },
  { id: "r-6", kind: "muffler-flame", fromHandle: "VF_Holden_Loz" },
  { id: "r-7", kind: "wrench", fromHandle: "ApprenticeAsh" },
  { id: "r-8", kind: "dyno", fromHandle: "ManiacManny" },
]

export const POLL_OPEN: LivePoll = {
  id: "poll-open",
  question: "Which exhaust tone should we run on Mick's Hilux at the next dyno session?",
  options: [
    { id: "burble", label: "Deep low burble", votes: 312 },
    { id: "raspy", label: "Raspy mid", votes: 187 },
    { id: "snarl", label: "V8 snarl crackle", votes: 421 },
    { id: "stealth", label: "Stealth quiet", votes: 64 },
  ],
  selectedOptionId: "snarl",
  secondsLeft: 45,
}

export const POLL_CLOSED: LivePoll = {
  id: "poll-closed",
  question: "Best supplier for high-flow cats?",
  options: [
    { id: "manta", label: "Manta", votes: 624 },
    { id: "xforce", label: "X-Force", votes: 312 },
    { id: "pacemaker", label: "Pacemaker", votes: 280 },
  ],
  selectedOptionId: "manta",
  isClosed: true,
}

export const QNA_QUESTIONS: ReadonlyArray<QnaQuestion> = [
  {
    id: "q-1",
    asker: "BoostedBA_Jake",
    question: "How does the v-band cat-back hold up after 12 months of weekly thrash?",
    upvotes: 84,
    askedAt: "12 min ago",
  },
  {
    id: "q-2",
    asker: "DieselDad_Mick",
    question: "What's the realistic gain on a stock-tune Hilux from a 3\" turbo-back system?",
    upvotes: 62,
    upvoted: true,
    askedAt: "9 min ago",
  },
  {
    id: "q-3",
    asker: "VF_Holden_Loz",
    question: "Can you explain the difference between cat-back and axle-back for tone vs flow?",
    upvotes: 41,
    askedAt: "6 min ago",
    isAnswered: true,
  },
  {
    id: "q-4",
    asker: "ApprenticeAsh",
    question: "What welder do you guys use for stainless? I keep blueing my joins.",
    upvotes: 28,
    askedAt: "3 min ago",
  },
]

export const TIERS: ReadonlyArray<SupporterTierDescriptor> = [
  {
    tier: "workshop-crew",
    label: "Workshop Crew",
    priceLabel: "$5/mo",
    tagline: "Get the basics — Dyno Tuesday access + crew badge in chat.",
    perks: [
      "Bronze badge in chat",
      "Dyno Tuesday replays for 30 days",
      "Monthly supplier deal email",
    ],
    supporterCount: 318,
  },
  {
    tier: "inner-circle",
    label: "Inner Circle",
    priceLabel: "$15/mo",
    tagline: "All replays + monthly supplier launches + private Discord bay.",
    perks: [
      "Silver badge + tier chip",
      "Unlimited replay library",
      "Monthly supplier launch invite",
      "Private Discord channel",
    ],
    supporterCount: 142,
    isCurrent: true,
  },
  {
    tier: "pit-boss",
    label: "Pit Boss",
    priceLabel: "$50/mo",
    tagline: "Front-of-stack Q&A priority + early access to build threads.",
    perks: [
      "Gold badge + Pit Boss icon",
      "Pinned Q&A priority",
      "Early access to build threads",
      "Quarterly workshop hat drop",
    ],
    supporterCount: 38,
  },
  {
    tier: "platinum",
    label: "Platinum",
    priceLabel: "$150/mo",
    tagline: "Quarterly bay visit + name engraved on the dyno cell wall.",
    perks: [
      "Teal Platinum badge",
      "Quarterly Oak Flats bay visit",
      "Name engraved on dyno wall",
      "Direct line to Daniel",
    ],
    supporterCount: 6,
  },
]

export const RAID_EVENT: RaidEvent = {
  id: "raid-1",
  fromChannel: "Diesel Mafia Garage",
  fromHandle: "@dieselmafia_garage",
  viewerCount: 1840,
  message: "Bringing the convoy across from the diesel stream — go easy on the lads!",
}

export const CLIP_MOMENT: ClipMoment = {
  id: "clip-falcon-peak",
  label: "Falcon GT-HO peak boost @ 6,200 RPM",
  windowSeconds: 30,
  capturedAt: "20:14:42 AEST",
  creator: "BoostedBA_Jake",
}
