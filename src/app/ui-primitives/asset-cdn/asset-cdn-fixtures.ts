import type {
  AssetVersionRow,
  BulkJob,
  CacheInvalidation,
  ImagePreset,
  ImageTransform,
  PurgePath,
  QuotaTile,
  RegionTelemetry,
  SignedUrlConfig,
  VideoTranscodeJob,
} from "../components/asset-cdn"

/** Default image transform — Manta hero crop. */
export const DEMO_IMAGE_TRANSFORM: ImageTransform = {
  width: 2400,
  height: 1350,
  format: "avif",
  quality: 76,
  fit: "cover",
  focal: { x: 62, y: 38 },
}

/** Default signed URL — dyno video private share. */
export const DEMO_SIGNED_URL_CONFIG: SignedUrlConfig = {
  resource: "/assets/dyno/run-2604-04k.mp4",
  ttlSec: 3600,
  algorithm: "hmac-sha256",
  scope: "ip:bound",
}

export const DEMO_VIDEO_TRANSCODE_JOBS: ReadonlyArray<VideoTranscodeJob> = [
  {
    id: "vt-manta-001",
    source: "/dyno/manta-2604-source.mov",
    profile: "social-vertical",
    codec: "h264",
    status: "encoding",
    progress: 64,
    etaSec: 92,
  },
  {
    id: "vt-camaro-014",
    source: "/dyno/camaro-2602-source.mov",
    profile: "youtube-hd",
    codec: "h265",
    status: "uploading",
    progress: 91,
    etaSec: 28,
  },
  {
    id: "vt-monaro-008",
    source: "/dyno/monaro-2600-source.mov",
    profile: "dyno-loop",
    codec: "av1",
    status: "complete",
    progress: 100,
    etaSec: 0,
    outputSize: 42_800_000,
  },
  {
    id: "vt-hk-024",
    source: "/dyno/hk-belmont-source.mov",
    profile: "hero-cinema",
    codec: "h265",
    status: "queued",
    progress: 0,
    etaSec: 480,
  },
  {
    id: "vt-corolla-090",
    source: "/dyno/corolla-ke55-source.mov",
    profile: "thumbnail-still",
    codec: "h264",
    status: "failed",
    progress: 38,
    etaSec: -1,
  },
]

export const DEMO_CACHE_INVALIDATIONS: ReadonlyArray<CacheInvalidation> = [
  {
    id: "ci-001",
    pattern: "/assets/heroes/*",
    scope: "global",
    strategy: "hard-purge",
    issuedAt: "2026-05-29T11:42:00Z",
    affectedCount: 184,
  },
  {
    id: "ci-002",
    pattern: "/assets/brand/manta-mark-*.svg",
    scope: "edge",
    strategy: "soft-purge",
    issuedAt: "2026-05-29T10:18:00Z",
    affectedCount: 22,
  },
  {
    id: "ci-003",
    pattern: "tag:dyno-cycle-2604",
    scope: "regional",
    strategy: "tag-purge",
    issuedAt: "2026-05-29T09:05:00Z",
    affectedCount: 612,
  },
]

export const DEMO_REGIONS: ReadonlyArray<RegionTelemetry> = [
  { region: "syd", label: "Sydney", hitRate: 96.8, throughput: 4_280_000_000, latencyMs: 18, pops: 6 },
  { region: "mel", label: "Melbourne", hitRate: 94.2, throughput: 1_840_000_000, latencyMs: 22, pops: 4 },
  { region: "per", label: "Perth", hitRate: 88.4, throughput: 620_000_000, latencyMs: 38, pops: 2 },
  { region: "akl", label: "Auckland", hitRate: 82.9, throughput: 410_000_000, latencyMs: 44, pops: 2 },
  { region: "sin", label: "Singapore", hitRate: 78.1, throughput: 280_000_000, latencyMs: 62, pops: 3 },
  { region: "lax", label: "Los Angeles", hitRate: 64.2, throughput: 92_000_000, latencyMs: 184, pops: 2 },
  { region: "fra", label: "Frankfurt", hitRate: 58.6, throughput: 38_000_000, latencyMs: 248, pops: 1 },
  { region: "iad", label: "Ashburn", hitRate: 41.4, throughput: 26_000_000, latencyMs: 268, pops: 1 },
]

export const DEMO_VERSIONS: ReadonlyArray<AssetVersionRow> = [
  {
    id: "v-018",
    label: "v18.2",
    publishedAt: "2026-05-29T11:10:00Z",
    author: "j.kowalski",
    size: 1_842_000,
    note: "Cinematic colour grade · 2026 catalogue",
    current: true,
  },
  {
    id: "v-017",
    label: "v18.1",
    publishedAt: "2026-05-28T16:24:00Z",
    author: "j.kowalski",
    size: 1_804_000,
    note: "Warmer shadow recovery pass",
  },
  {
    id: "v-016",
    label: "v18.0",
    publishedAt: "2026-05-26T09:02:00Z",
    author: "renders/replicate",
    size: 1_762_000,
    note: "Initial Replicate render export",
  },
  {
    id: "v-015",
    label: "v17.4",
    publishedAt: "2026-05-22T13:48:00Z",
    author: "d.fleuren",
    size: 1_614_000,
    note: "Pre-launch beauty pass — locked off frame",
  },
  {
    id: "v-014",
    label: "v17.3",
    publishedAt: "2026-05-19T21:30:00Z",
    author: "ci/pipeline",
    size: 1_590_000,
    note: "Auto-rebuild after watermark policy change",
  },
]

export const DEMO_QUOTAS: ReadonlyArray<QuotaTile> = [
  {
    resource: "bandwidth",
    used: 936_000_000_000,
    limit: 1_200_000_000_000,
    cycleEnds: "2026-06-01T00:00:00Z",
    deltaPct: 8.4,
  },
  {
    resource: "storage",
    used: 412_000_000_000,
    limit: 600_000_000_000,
    cycleEnds: "2026-06-01T00:00:00Z",
    deltaPct: 3.2,
  },
  {
    resource: "image-ops",
    used: 2_842_000,
    limit: 5_000_000,
    cycleEnds: "2026-06-01T00:00:00Z",
    deltaPct: -2.1,
  },
  {
    resource: "video-min",
    used: 184,
    limit: 480,
    cycleEnds: "2026-06-01T00:00:00Z",
    deltaPct: 0,
  },
]

export const DEMO_PRESETS: ReadonlyArray<ImagePreset> = [
  {
    id: "p-thumb-square",
    category: "thumbnail",
    label: "Catalogue thumb",
    description: "Square thumb for vehicle catalogue grids — sharp focal point on the badge.",
    transform: { width: 320, height: 320, format: "webp", quality: 78, fit: "cover", focal: { x: 50, y: 48 } },
    usageCount: 1842,
  },
  {
    id: "p-hero-16x9",
    category: "hero",
    label: "Cinematic hero 16:9",
    description: "Bay-display hero crop with letterboxed focal on the manta's bonnet.",
    transform: { width: 2880, height: 1620, format: "avif", quality: 82, fit: "cover", focal: { x: 56, y: 38 } },
    usageCount: 184,
  },
  {
    id: "p-og-card",
    category: "og-image",
    label: "OG card",
    description: "Open Graph card with text-safe zone reserved for the headline.",
    transform: { width: 1200, height: 630, format: "jpeg", quality: 86, fit: "cover", focal: { x: 42, y: 50 } },
    usageCount: 96,
  },
  {
    id: "p-card-standard",
    category: "card",
    label: "Service card",
    description: "Page card for service tiles — softer crop favouring tools and chrome.",
    transform: { width: 720, height: 480, format: "webp", quality: 80, fit: "cover", focal: { x: 50, y: 60 } },
    usageCount: 642,
  },
  {
    id: "p-avatar-128",
    category: "avatar",
    label: "Avatar 128",
    description: "Round avatar for crew profiles and inbox surfaces.",
    transform: { width: 128, height: 128, format: "webp", quality: 84, fit: "cover", focal: { x: 50, y: 36 } },
    usageCount: 318,
  },
  {
    id: "p-splash-vertical",
    category: "splash",
    label: "Splash 9:16",
    description: "Mobile splash screen — full-bleed manta over the workshop floor.",
    transform: { width: 1080, height: 1920, format: "avif", quality: 78, fit: "cover", focal: { x: 50, y: 30 } },
    usageCount: 42,
  },
]

export const DEMO_BULK_JOBS: ReadonlyArray<BulkJob> = [
  {
    id: "bp-2604-001",
    kind: "regenerate-renditions",
    status: "running",
    progress: 62,
    total: 1842,
    done: 1142,
    failed: 8,
    etaSec: 412,
    startedAt: "2026-05-29T10:48:00Z",
  },
  {
    id: "bp-brand-008",
    kind: "rewatermark",
    status: "paused",
    progress: 41,
    total: 612,
    done: 252,
    failed: 0,
    etaSec: 0,
    startedAt: "2026-05-29T08:20:00Z",
  },
  {
    id: "bp-archive-014",
    kind: "purge-folder",
    status: "queued",
    progress: 0,
    total: 12_840,
    done: 0,
    failed: 0,
    etaSec: 1820,
    startedAt: "2026-05-29T11:42:00Z",
  },
  {
    id: "bp-lqip-002",
    kind: "rebuild-lqip",
    status: "complete",
    progress: 100,
    total: 4218,
    done: 4218,
    failed: 0,
    etaSec: 0,
    startedAt: "2026-05-28T22:10:00Z",
  },
  {
    id: "bp-fmt-019",
    kind: "reformat",
    status: "failed",
    progress: 28,
    total: 884,
    done: 248,
    failed: 32,
    etaSec: -1,
    startedAt: "2026-05-29T07:12:00Z",
  },
]

export const DEMO_PURGE_PATHS: ReadonlyArray<PurgePath> = [
  { pattern: "/assets/heroes/manta-*.{webp,avif}", affected: 184, bucket: "brand" },
  { pattern: "/assets/dyno/2604/*.mp4", affected: 28, bucket: "dyno-videos" },
  { pattern: "/assets/vehicles/holden/manta/v18/*", affected: 412, bucket: "vehicle-frames" },
  { pattern: "/og/manta-launch-*.jpg", affected: 6, bucket: "brand" },
]
