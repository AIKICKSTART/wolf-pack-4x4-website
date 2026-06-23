import type {
  ApprovalStage,
  AudiencePoint,
  AudienceSeries,
  BestTimeCell,
  CalendarDay,
  CaptionPreset,
  ConnectedAccount,
  HashtagDescriptor,
  HashtagGroup,
  MediaBinderItem,
  MentionInboxItem,
  PlatformDescriptor,
  PostEngagement,
  RepurposeStage,
  ScheduledPost,
  SocialPlatform,
  WebhookEvent,
} from "../components/social-scheduler"

/**
 * Mock data for the Muffler Pulse social-scheduler family.
 * All handles and content reflect real Oak Flats Mufflermen channels.
 */

export const PLATFORMS: ReadonlyArray<PlatformDescriptor> = [
  {
    key: "instagram",
    label: "Instagram",
    handle: "@mufflermen.au",
    charLimit: 2200,
    aspectRatios: ["1:1", "4:5", "9:16"],
    tone: "red",
    mark: "IG",
  },
  {
    key: "facebook",
    label: "Facebook",
    handle: "@MufflerMen",
    charLimit: 5000,
    aspectRatios: ["1:1", "16:9", "4:5"],
    tone: "teal",
    mark: "FB",
  },
  {
    key: "tiktok",
    label: "TikTok",
    handle: "@mufflermenwollongong",
    charLimit: 2200,
    aspectRatios: ["9:16"],
    tone: "neutral",
    mark: "TT",
  },
  {
    key: "x",
    label: "X",
    handle: "@MufflerMenAU",
    charLimit: 280,
    aspectRatios: ["16:9", "1:1"],
    tone: "neutral",
    mark: "X",
  },
  {
    key: "linkedin",
    label: "LinkedIn",
    handle: "@oak-flats-mufflermen",
    charLimit: 3000,
    aspectRatios: ["16:9", "1:1"],
    tone: "teal",
    mark: "LI",
  },
  {
    key: "youtube",
    label: "YouTube",
    handle: "@MufflerMenAU",
    charLimit: 5000,
    aspectRatios: ["16:9", "9:16"],
    tone: "red",
    mark: "YT",
  },
  {
    key: "threads",
    label: "Threads",
    handle: "@mufflermen.au",
    charLimit: 500,
    aspectRatios: ["1:1", "4:5"],
    tone: "neutral",
    mark: "TH",
  },
  {
    key: "bluesky",
    label: "Bluesky",
    handle: "@mufflermen.bsky.social",
    charLimit: 300,
    aspectRatios: ["16:9", "1:1"],
    tone: "teal",
    mark: "BS",
  },
]

export const SAMPLE_HASHTAGS: ReadonlyArray<string> = [
  "#IllawarraExhaust",
  "#WollongongMechanic",
  "#MufflerMen",
  "#4WDExhaust",
  "#DynoTuesday",
]

export const HASHTAG_POOL: ReadonlyArray<HashtagDescriptor> = [
  { tag: "#IllawarraExhaust", reach: 84_200, trend: "up", competition: "low" },
  { tag: "#WollongongMechanic", reach: 168_000, trend: "up", competition: "med" },
  { tag: "#MufflerMen", reach: 22_400, trend: "flat", competition: "low" },
  { tag: "#4WDExhaust", reach: 412_000, trend: "up", competition: "high" },
  { tag: "#DynoTuesday", reach: 56_800, trend: "up", competition: "low" },
  { tag: "#NSWMotorsport", reach: 248_000, trend: "flat", competition: "high" },
  { tag: "#OakFlats", reach: 9_200, trend: "down", competition: "low" },
  { tag: "#TurboLife", reach: 1_180_000, trend: "up", competition: "high" },
]

export const HASHTAG_GROUPS: ReadonlyArray<HashtagGroup> = [
  {
    id: "branded",
    label: "Branded",
    category: "branded",
    tone: "red",
    hashtags: [
      { tag: "#MufflerMen", reach: 22_400, trend: "flat", competition: "low" },
      { tag: "#OakFlatsMufflermen", reach: 4_600, trend: "up", competition: "low" },
      { tag: "#MufflermenDynoTues", reach: 7_800, trend: "up", competition: "low" },
    ],
  },
  {
    id: "trending",
    label: "Trending performance",
    category: "trending",
    tone: "amber",
    hashtags: [
      { tag: "#TurboLife", reach: 1_180_000, trend: "up", competition: "high" },
      { tag: "#DynoTuesday", reach: 56_800, trend: "up", competition: "low" },
      { tag: "#4WDExhaust", reach: 412_000, trend: "up", competition: "high" },
      { tag: "#NSWMotorsport", reach: 248_000, trend: "flat", competition: "high" },
    ],
  },
  {
    id: "community",
    label: "Community / local",
    category: "community",
    tone: "teal",
    hashtags: [
      { tag: "#IllawarraExhaust", reach: 84_200, trend: "up", competition: "low" },
      { tag: "#WollongongMechanic", reach: 168_000, trend: "up", competition: "med" },
      { tag: "#OakFlats", reach: 9_200, trend: "down", competition: "low" },
      { tag: "#ShellharbourMakers", reach: 14_400, trend: "up", competition: "low" },
    ],
  },
]

export const CAPTION_PRESETS: ReadonlyArray<CaptionPreset> = [
  {
    id: "workshop-tape",
    label: "Workshop tape",
    description: "Time-lapse style — Daniel narrating bay action.",
    sample: "300ZX Twin Turbo on the hoist. Custom 3\" stainless cat-back fab'd in-house, mandrel bent, TIG welded. The bark hits different. ",
  },
  {
    id: "before-after",
    label: "Before / after",
    description: "Cinematic reveal — peak crunch on the swap.",
    sample: "Before: tired factory tin can. After: hand-rolled 2.5\" sports system with twin tips. Same Hilux, different attitude. ",
  },
  {
    id: "dyno-results",
    label: "Dyno results",
    description: "Numbers-led — torque curves, RWKW headlines.",
    sample: "Dyno Tuesday: 254rwkw and 612Nm on the 200 Series. Quiet at idle, brutal at the top end. Curve in the carousel. ",
  },
  {
    id: "suburb-spotlight",
    label: "Suburb spotlight",
    description: "Local hero — a mate from Helensburgh / Berkeley / Albion Park.",
    sample: "Big thanks to Mick from Albion Park for trusting us with his ’78 LX hatch. New extractors, twin 2.5\" system, Lukey rears. Old school, new soundtrack. ",
  },
  {
    id: "supplier-drop",
    label: "Supplier drop",
    description: "Restock announcement with brand authority.",
    sample: "Fresh stock arrived: Manta 4WD systems for 200 Series, Hilux N80, Ranger PX. Backed by Manta's lifetime warranty. Book the bay today. ",
  },
]

export function buildScheduledPosts(): ReadonlyArray<ScheduledPost> {
  return [
    {
      id: "p-300zx-fab",
      title: "300ZX twin-turbo cat-back fab time-lapse",
      scheduledFor: "2026-06-02T09:30:00+10:00",
      status: "scheduled",
      platforms: ["instagram", "tiktok", "facebook"],
      preview:
        "Quiet at idle, brutal at the top end. Custom 3\" stainless mandrel bent, TIG welded. Time-lapse below.",
      engagement: { likes: 1840, comments: 96, shares: 142, saves: 312, rate: 0.084 },
      approver: "Mia (brand)",
      mediaIds: ["m-300zx-1", "m-300zx-2"],
    },
    {
      id: "p-dyno-tuesday-200",
      title: "Dyno Tuesday: 200 Series — 254rwkw / 612Nm",
      scheduledFor: "2026-06-02T17:00:00+10:00",
      status: "in-review",
      platforms: ["instagram", "facebook", "x", "linkedin"],
      preview:
        "254rwkw and 612Nm on Dave's 200 Series. Curve in the carousel. Booked for tow rig duty this weekend.",
      engagement: { likes: 420, comments: 28, shares: 18, saves: 54, rate: 0.031 },
      approver: "Daniel (admin)",
    },
    {
      id: "p-hilux-before-after",
      title: "Hilux N80 before / after reveal",
      scheduledFor: "2026-06-03T08:00:00+10:00",
      status: "draft",
      platforms: ["instagram", "tiktok"],
      preview:
        "Factory tin can → hand-rolled 2.5\" twin-tip. Same ute, different attitude. Posting at 8am for tradies' coffee scroll.",
    },
    {
      id: "p-suburb-mick",
      title: "Suburb spotlight: Mick's ’78 LX from Albion Park",
      scheduledFor: "2026-05-30T19:00:00+10:00",
      status: "published",
      platforms: ["instagram", "facebook", "youtube"],
      preview:
        "New extractors, twin 2.5\" system, Lukey rears. Old school, new soundtrack. Cheers Mick.",
      engagement: { likes: 2640, comments: 188, shares: 86, saves: 412, rate: 0.092 },
    },
    {
      id: "p-manta-restock",
      title: "Manta 4WD restock announcement",
      scheduledFor: "2026-05-29T11:00:00+10:00",
      status: "published",
      platforms: ["facebook", "linkedin", "x"],
      preview:
        "Fresh Manta stock landed — 200 Series, Hilux N80, Ranger PX. Lifetime warranty. Book the bay this week.",
      engagement: { likes: 312, comments: 14, shares: 22, saves: 48, rate: 0.009 },
    },
    {
      id: "p-token-expired-x",
      title: "X token expired — repost prep",
      scheduledFor: "2026-06-04T12:00:00+10:00",
      status: "failed",
      platforms: ["x"],
      preview:
        "Auth token rotated. Reconnect required before this fires.",
    },
  ]
}

export function buildAccounts(): ReadonlyArray<ConnectedAccount> {
  return [
    {
      id: "acc-ig",
      platform: "instagram",
      handle: "@mufflermen.au",
      displayName: "Oak Flats Mufflermen",
      followerCount: 18_240,
      status: "connected",
      lastSyncedAt: "2026-05-29T08:14:00+10:00",
      expiresAt: "2026-08-12T00:00:00+10:00",
      scopes: ["read", "publish", "insights"],
    },
    {
      id: "acc-fb",
      platform: "facebook",
      handle: "@MufflerMen",
      displayName: "Mufflermen Wollongong",
      followerCount: 12_460,
      status: "connected",
      lastSyncedAt: "2026-05-29T08:12:00+10:00",
      expiresAt: "2026-09-04T00:00:00+10:00",
      scopes: ["pages_manage_posts", "pages_read_engagement"],
    },
    {
      id: "acc-tt",
      platform: "tiktok",
      handle: "@mufflermenwollongong",
      displayName: "Mufflermen Wollongong",
      followerCount: 42_180,
      status: "expiring",
      lastSyncedAt: "2026-05-29T06:48:00+10:00",
      expiresAt: "2026-06-04T00:00:00+10:00",
      scopes: ["video.publish", "user.info.basic"],
    },
    {
      id: "acc-x",
      platform: "x",
      handle: "@MufflerMenAU",
      displayName: "Mufflermen AU",
      followerCount: 3_140,
      status: "expired",
      lastSyncedAt: "2026-05-27T16:02:00+10:00",
      scopes: ["tweet.write", "users.read"],
    },
    {
      id: "acc-li",
      platform: "linkedin",
      handle: "@oak-flats-mufflermen",
      displayName: "Oak Flats Mufflermen Pty Ltd",
      followerCount: 1_840,
      status: "connected",
      lastSyncedAt: "2026-05-29T07:22:00+10:00",
      expiresAt: "2026-07-15T00:00:00+10:00",
      scopes: ["w_organization_social", "r_organization_social"],
    },
    {
      id: "acc-yt",
      platform: "youtube",
      handle: "@MufflerMenAU",
      displayName: "Mufflermen AU",
      followerCount: 8_960,
      status: "connected",
      lastSyncedAt: "2026-05-29T08:01:00+10:00",
      expiresAt: "2026-10-22T00:00:00+10:00",
      scopes: ["youtube.upload", "youtube.readonly"],
    },
    {
      id: "acc-th",
      platform: "threads",
      handle: "@mufflermen.au",
      displayName: "Mufflermen AU",
      followerCount: 2_360,
      status: "reconnecting",
      lastSyncedAt: "2026-05-29T08:30:00+10:00",
      scopes: ["threads_basic", "threads_content_publish"],
    },
    {
      id: "acc-bs",
      platform: "bluesky",
      handle: "@mufflermen.bsky.social",
      displayName: "Mufflermen",
      followerCount: 620,
      status: "error",
      lastSyncedAt: "2026-05-28T18:20:00+10:00",
      scopes: ["app.bsky.feed.post"],
    },
  ]
}

function makeCalendarPosts(): ReadonlyArray<CalendarDay> {
  const days: CalendarDay[] = []
  const WEEKDAYS: ReadonlyArray<string> = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
  const POSTS_BY_DAY: Record<number, ReadonlyArray<{ id: string; title: string; hour: number; minute: number; platforms: ReadonlyArray<SocialPlatform>; status: ScheduledPost["status"] }>> = {
    3: [
      { id: "cal-p-1", title: "Manta restock", hour: 11, minute: 0, platforms: ["facebook", "x"], status: "published" },
    ],
    5: [
      { id: "cal-p-2", title: "Suburb spotlight: Mick", hour: 19, minute: 0, platforms: ["instagram", "facebook"], status: "published" },
    ],
    9: [
      { id: "cal-p-3", title: "300ZX fab", hour: 9, minute: 30, platforms: ["instagram", "tiktok"], status: "scheduled" },
      { id: "cal-p-4", title: "Dyno Tuesday 200", hour: 17, minute: 0, platforms: ["facebook", "linkedin"], status: "in-review" },
    ],
    10: [
      { id: "cal-p-5", title: "Hilux reveal", hour: 8, minute: 0, platforms: ["instagram", "tiktok"], status: "draft" },
    ],
    11: [
      { id: "cal-p-6", title: "X retry post", hour: 12, minute: 0, platforms: ["x"], status: "failed" },
    ],
    16: [
      { id: "cal-p-7", title: "Supplier feature: Pacemaker", hour: 14, minute: 0, platforms: ["instagram", "youtube"], status: "scheduled" },
    ],
    23: [
      { id: "cal-p-8", title: "Dyno Tuesday: turbo Patrol", hour: 17, minute: 0, platforms: ["instagram", "facebook"], status: "scheduled" },
    ],
  }

  // Build 35-cell month grid starting on a Monday, dates 1..30 with overflow.
  const startOffset = 2 // leading from previous month
  for (let i = 0; i < 35; i += 1) {
    const dayNumber = i - startOffset + 1
    const outsideMonth = dayNumber < 1 || dayNumber > 30
    const today = dayNumber === 9
    const date = `2026-06-${String(Math.max(1, Math.min(30, dayNumber))).padStart(2, "0")}`
    const weekday = WEEKDAYS[i % 7]
    const posts = POSTS_BY_DAY[dayNumber] ?? []
    days.push({
      date: outsideMonth ? `${date}-out${i}` : date,
      weekday,
      dayNumber: outsideMonth
        ? dayNumber < 1
          ? 30 + dayNumber
          : dayNumber - 30
        : dayNumber,
      outsideMonth,
      isToday: today,
      posts,
    })
  }
  return days
}

export const CALENDAR_DAYS: ReadonlyArray<CalendarDay> = makeCalendarPosts()

export const POST_ENGAGEMENT: PostEngagement = {
  likes: 2640,
  comments: 188,
  shares: 86,
  saves: 412,
  rate: 0.092,
}

export const ENGAGEMENT_TRENDS = {
  likes: [120, 180, 220, 320, 410, 540, 720] as ReadonlyArray<number>,
  comments: [12, 14, 22, 28, 36, 48, 64] as ReadonlyArray<number>,
  shares: [4, 6, 9, 11, 14, 18, 24] as ReadonlyArray<number>,
  saves: [22, 38, 56, 84, 120, 168, 220] as ReadonlyArray<number>,
} as const

export const ENGAGEMENT_DELTAS = {
  likes: 0.184,
  comments: 0.142,
  shares: 0.092,
  saves: 0.216,
} as const

function buildAudiencePoints(
  start: number,
  step: number,
  jitter: number,
  count: number,
): ReadonlyArray<AudiencePoint> {
  const points: AudiencePoint[] = []
  let value = start
  for (let i = 0; i < count; i += 1) {
    value += step + (Math.sin(i * 0.6) * jitter)
    points.push({
      date: `2026-05-${String(i + 1).padStart(2, "0")}`,
      followers: Math.round(value),
    })
  }
  return points
}

export const AUDIENCE_SERIES: ReadonlyArray<AudienceSeries> = [
  {
    platform: "instagram",
    current: 18_240,
    delta30d: 624,
    points: buildAudiencePoints(17_600, 22, 18, 30),
  },
  {
    platform: "tiktok",
    current: 42_180,
    delta30d: 2_140,
    points: buildAudiencePoints(40_040, 72, 60, 30),
  },
  {
    platform: "facebook",
    current: 12_460,
    delta30d: 124,
    points: buildAudiencePoints(12_320, 5, 8, 30),
  },
  {
    platform: "youtube",
    current: 8_960,
    delta30d: 312,
    points: buildAudiencePoints(8_640, 11, 12, 30),
  },
]

function buildHeatmap(): ReadonlyArray<BestTimeCell> {
  const cells: BestTimeCell[] = []
  for (let day = 0; day < 7; day += 1) {
    for (let hour = 0; hour < 24; hour += 1) {
      // Trade-focused: morning, lunch, evening peaks.
      const earlyMorning = hour >= 6 && hour <= 9 ? 0.55 : 0
      const lunch = hour >= 11 && hour <= 13 ? 0.5 : 0
      const evening = hour >= 17 && hour <= 21 ? 0.7 : 0
      const weekendBoost = day >= 5 && hour >= 8 && hour <= 11 ? 0.2 : 0
      const dyno = day === 1 && hour === 17 ? 0.9 : 0 // Dyno Tuesday
      const noise = (Math.sin(day * 0.7 + hour * 0.3) + 1) * 0.06
      const score = Math.min(1, earlyMorning + lunch + evening + weekendBoost + dyno + noise)
      cells.push({ day, hour, score })
    }
  }
  return cells
}

export const HEATMAP_CELLS: ReadonlyArray<BestTimeCell> = buildHeatmap()

export const REPURPOSE_STAGES: ReadonlyArray<RepurposeStage> = [
  {
    id: "rs-blog",
    surface: "blog",
    label: "300ZX cat-back fab build log",
    state: "ready",
    owner: "Daniel",
    note: "1,400 word build log with 12 in-bay shots. Approved for indexable publish.",
    eta: "Today 14:00",
  },
  {
    id: "rs-thread",
    surface: "thread",
    label: "7-tweet build thread",
    state: "in-progress",
    owner: "Mia",
    note: "Hook, four progress shots, dyno teaser, CTA. Drafted from blog skeleton.",
    eta: "Tomorrow 09:00",
  },
  {
    id: "rs-reel",
    surface: "reel",
    label: "Vertical 32s reel cut",
    state: "queued",
    owner: "Jordan",
    note: "Pull TIG + mandrel bend clips. Audio: lo-fi guitar bed (cleared).",
    eta: "Wed 11:00",
  },
  {
    id: "rs-carousel",
    surface: "carousel",
    label: "8-slide IG carousel",
    state: "scheduled",
    owner: "Mia",
    note: "Slide 1 hook · slides 2–7 stepwise · slide 8 CTA.",
    eta: "Thu 17:00",
  },
  {
    id: "rs-shorts",
    surface: "shorts",
    label: "YT Shorts edit",
    state: "blocked",
    owner: "Jordan",
    note: "Awaiting brand-safe audio swap — original track flagged on YouTube.",
  },
]

export const MEDIA_BINDER_ITEMS: ReadonlyArray<MediaBinderItem> = [
  {
    id: "m-300zx-1",
    fileName: "300zx-tig-weld.mp4",
    kind: "video",
    durationSeconds: 32,
    aspectRatio: "9:16",
    sizeMB: 24.6,
    placeholder: "9:16",
    fit: {
      instagram: "ok",
      tiktok: "ok",
      youtube: "warn",
      facebook: "warn",
      x: "fail",
      linkedin: "warn",
    },
  },
  {
    id: "m-300zx-2",
    fileName: "300zx-cat-back-hero.jpg",
    kind: "image",
    aspectRatio: "4:5",
    sizeMB: 4.2,
    placeholder: "4:5",
    fit: {
      instagram: "ok",
      facebook: "ok",
      linkedin: "ok",
      tiktok: "warn",
      x: "ok",
    },
  },
  {
    id: "m-dyno-1",
    fileName: "dyno-200series-curve.png",
    kind: "image",
    aspectRatio: "16:9",
    sizeMB: 2.8,
    placeholder: "16:9",
    fit: {
      x: "ok",
      facebook: "ok",
      linkedin: "ok",
      youtube: "ok",
      instagram: "warn",
      tiktok: "fail",
    },
  },
  {
    id: "m-hilux-1",
    fileName: "hilux-before-after.mp4",
    kind: "reel",
    durationSeconds: 15,
    aspectRatio: "9:16",
    sizeMB: 18.4,
    placeholder: "REEL",
    fit: {
      instagram: "ok",
      tiktok: "ok",
      youtube: "warn",
      facebook: "warn",
    },
  },
]

export const APPROVAL_STAGES: ReadonlyArray<ApprovalStage> = [
  {
    id: "ap-draft",
    label: "Draft",
    owner: "Mia (brand)",
    state: "approved",
    completedAt: "2026-05-29T07:14:00+10:00",
    note: "Initial caption + 3 hashtag groups drafted.",
  },
  {
    id: "ap-admin",
    label: "Daniel review",
    owner: "Daniel (admin)",
    state: "approved",
    completedAt: "2026-05-29T08:02:00+10:00",
    note: "Aviator on the headline. Approved with one hashtag swap.",
  },
  {
    id: "ap-brand",
    label: "Brand pass",
    owner: "Mia (brand)",
    state: "current",
    note: "Pending final brand voice check before queue.",
  },
  {
    id: "ap-scheduled",
    label: "Scheduled",
    owner: "Muffler Pulse",
    state: "pending",
  },
]

export const WEBHOOK_EVENTS: ReadonlyArray<WebhookEvent> = [
  {
    id: "wh-1",
    platform: "instagram",
    kind: "likes_spike",
    summary: "+312 likes in last 12 minutes on suburb spotlight reel.",
    receivedAt: "2026-05-29T08:42:00+10:00",
    severity: "success",
    payload: { delta: 312, window: "12m" },
  },
  {
    id: "wh-2",
    platform: "tiktok",
    kind: "share_burst",
    summary: "Cat-back fab time-lapse crossed 1.2k shares.",
    receivedAt: "2026-05-29T08:36:00+10:00",
    severity: "success",
    payload: { shares: 1200 },
  },
  {
    id: "wh-3",
    platform: "x",
    kind: "post_failed",
    summary: "Auth token expired. Manta restock thread did not fire.",
    receivedAt: "2026-05-29T08:30:00+10:00",
    severity: "error",
  },
  {
    id: "wh-4",
    platform: "facebook",
    kind: "comment",
    summary: "New comment from Lance W on Dyno Tuesday post.",
    receivedAt: "2026-05-29T08:14:00+10:00",
    severity: "info",
  },
  {
    id: "wh-5",
    platform: "linkedin",
    kind: "post_published",
    summary: "200 Series build retrospective went live.",
    receivedAt: "2026-05-29T07:58:00+10:00",
    severity: "info",
  },
  {
    id: "wh-6",
    platform: "tiktok",
    kind: "token_refresh",
    summary: "Token refresh window opens in 6 days.",
    receivedAt: "2026-05-29T07:30:00+10:00",
    severity: "warn",
  },
  {
    id: "wh-7",
    platform: "youtube",
    kind: "mention",
    summary: "Tagged in a build round-up by @aussie4wdscene.",
    receivedAt: "2026-05-29T06:22:00+10:00",
    severity: "info",
  },
  {
    id: "wh-8",
    platform: "instagram",
    kind: "dm",
    summary: "DM from Mick R asking about Hilux N80 fitment.",
    receivedAt: "2026-05-29T06:01:00+10:00",
    severity: "info",
  },
]

export const MENTION_INBOX: ReadonlyArray<MentionInboxItem> = [
  {
    id: "mi-1",
    platform: "instagram",
    authorHandle: "@lance.wilson",
    authorName: "Lance Wilson",
    body: "Mate that 300ZX sounds savage. What back boxes did you run?",
    kind: "comment",
    sentiment: "positive",
    receivedAt: "2026-05-29T08:42:00+10:00",
    unread: true,
    context: "300ZX twin-turbo cat-back fab time-lapse",
  },
  {
    id: "mi-2",
    platform: "facebook",
    authorHandle: "@helensburgh.4wd",
    authorName: "Mick Russell",
    body: "Booking my Hilux in next month — happy to drive up from Helensburgh.",
    kind: "dm",
    sentiment: "positive",
    receivedAt: "2026-05-29T08:14:00+10:00",
    unread: true,
  },
  {
    id: "mi-3",
    platform: "tiktok",
    authorHandle: "@dyno.dave.81",
    authorName: "Dave Hopkins",
    body: "254rwkw is wild, no way that's a stock manifold.",
    kind: "comment",
    sentiment: "neutral",
    receivedAt: "2026-05-29T07:58:00+10:00",
  },
  {
    id: "mi-4",
    platform: "x",
    authorHandle: "@aussiehoonscene",
    authorName: "Aussie Hoon Scene",
    body: "Quote was 30% higher than two other shops in the area. Worth shopping around.",
    kind: "mention",
    sentiment: "negative",
    receivedAt: "2026-05-29T07:32:00+10:00",
  },
  {
    id: "mi-5",
    platform: "youtube",
    authorHandle: "@aussie4wdscene",
    authorName: "Aussie 4WD Scene",
    body: "Featured your 200 Series build in our weekly round-up. Cheers!",
    kind: "mention",
    sentiment: "positive",
    receivedAt: "2026-05-29T06:22:00+10:00",
    context: "200 Series build retrospective",
  },
]
