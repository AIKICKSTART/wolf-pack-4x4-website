/**
 * Shared types for the asset-cdn primitive family.
 *
 * The Oak Flats Mufflermen CDN sits between the DAM (digital asset library)
 * and the public marketing surfaces. Imagery is reshaped through Cloudflare
 * image transforms; video is transcoded through Replicate workers; bandwidth
 * and storage roll up against a 1.2 TB / month quota. Vocabulary is shared
 * across cards, rows, panels, and confirmation modals so every primitive
 * speaks the same language.
 */

export type CdnTone = "red" | "amber" | "teal" | "green" | "neutral"

export type ImageFormat = "auto" | "avif" | "webp" | "jpeg" | "png"

export type ImageFit = "cover" | "contain" | "scale-down" | "crop" | "pad"

export type VideoCodec = "h264" | "h265" | "vp9" | "av1"

export type VideoProfile =
  | "social-vertical"
  | "youtube-hd"
  | "dyno-loop"
  | "hero-cinema"
  | "thumbnail-still"

export type TranscodeStatus =
  | "queued"
  | "encoding"
  | "uploading"
  | "complete"
  | "failed"

export type CacheScope = "edge" | "regional" | "origin-pull" | "global"

export type InvalidationStrategy = "soft-purge" | "hard-purge" | "tag-purge"

export type SignedUrlAlgorithm = "hmac-sha256" | "ed25519"

export type RegionCode = "syd" | "mel" | "per" | "akl" | "sin" | "lax" | "fra" | "iad"

export type QuotaResource = "bandwidth" | "storage" | "image-ops" | "video-min"

export type LazyLoadStrategy = "lqip" | "blur-up" | "sketch" | "dominant-color"

export type AssetBucket =
  | "brand"
  | "vehicle-frames"
  | "dyno-videos"
  | "schematics"
  | "merch"

export type PresetCategory =
  | "thumbnail"
  | "hero"
  | "og-image"
  | "card"
  | "avatar"
  | "splash"

export type BulkJobKind =
  | "reformat"
  | "rewatermark"
  | "regenerate-renditions"
  | "purge-folder"
  | "rebuild-lqip"

export type BulkJobStatus = "queued" | "running" | "paused" | "complete" | "failed"

export interface FocalPoint {
  /** 0-100, percent from left. */
  x: number
  /** 0-100, percent from top. */
  y: number
}

export interface ImageTransform {
  width: number
  height: number
  format: ImageFormat
  /** 1-100. */
  quality: number
  fit: ImageFit
  focal: FocalPoint
}

export interface VideoTranscodeJob {
  id: string
  /** Source asset path or DAM id. */
  source: string
  profile: VideoProfile
  codec: VideoCodec
  status: TranscodeStatus
  /** 0-100. */
  progress: number
  /** Seconds remaining. */
  etaSec: number
  /** Bytes. */
  outputSize?: number
}

export interface SignedUrlConfig {
  resource: string
  /** Time-to-live in seconds. */
  ttlSec: number
  algorithm: SignedUrlAlgorithm
  /** Optional inline policy. */
  scope?: string
}

export interface CacheInvalidation {
  id: string
  /** Glob / path pattern, e.g. /assets/heroes/*. */
  pattern: string
  scope: CacheScope
  strategy: InvalidationStrategy
  /** ISO timestamp. */
  issuedAt: string
  /** Affected path count. */
  affectedCount: number
}

export interface RegionTelemetry {
  region: RegionCode
  label: string
  /** 0-100 cache-hit rate. */
  hitRate: number
  /** Bytes/sec. */
  throughput: number
  /** Avg latency ms. */
  latencyMs: number
  /** Edge node count. */
  pops: number
}

export interface AssetVersionRow {
  id: string
  label: string
  /** ISO timestamp. */
  publishedAt: string
  /** Editor or system name. */
  author: string
  /** Bytes. */
  size: number
  /** Short note. */
  note: string
  /** Marks the live version. */
  current?: boolean
}

export interface QuotaTile {
  resource: QuotaResource
  /** Bytes (bandwidth/storage), ops (image), minutes (video). */
  used: number
  /** Same unit as used. */
  limit: number
  /** ISO timestamp of cycle end. */
  cycleEnds: string
  /** Latest delta vs prior cycle (signed percent). */
  deltaPct: number
}

export interface MimeRule {
  id: string
  /** RFC mime type or wildcard, e.g. image/*, video/mp4. */
  pattern: string
  allow: boolean
  /** Optional max bytes. */
  maxBytes?: number
  note?: string
}

export interface ImagePreset {
  id: string
  category: PresetCategory
  label: string
  description: string
  transform: ImageTransform
  /** Sample assets touching this preset. */
  usageCount: number
}

export interface BulkJob {
  id: string
  kind: BulkJobKind
  status: BulkJobStatus
  /** 0-100. */
  progress: number
  /** Total items. */
  total: number
  /** Items done. */
  done: number
  /** Items failed. */
  failed: number
  /** Seconds remaining. */
  etaSec: number
  startedAt: string
}

export interface LazyLoadConfig {
  strategy: LazyLoadStrategy
  /** 0-100 — placeholder blur radius. */
  blurRadius: number
  /** 0-100 — placeholder fade-in opacity. */
  fadeOpacity: number
  /** Edge / origin trigger margin in pixels. */
  rootMarginPx: number
  /** Optional dominant colour seed. */
  dominantHex?: string
}

export interface PurgePath {
  pattern: string
  /** Approx number of affected URLs. */
  affected: number
  bucket: AssetBucket
}

export const IMAGE_FORMAT_LABEL: Record<ImageFormat, string> = {
  auto: "Auto",
  avif: "AVIF",
  webp: "WebP",
  jpeg: "JPEG",
  png: "PNG",
}

export const IMAGE_FIT_LABEL: Record<ImageFit, string> = {
  cover: "Cover",
  contain: "Contain",
  "scale-down": "Scale-down",
  crop: "Crop",
  pad: "Pad",
}

export const VIDEO_PROFILE_LABEL: Record<VideoProfile, string> = {
  "social-vertical": "Social 9:16",
  "youtube-hd": "YouTube 1080p",
  "dyno-loop": "Dyno loop",
  "hero-cinema": "Hero cinematic",
  "thumbnail-still": "Thumb still",
}

export const VIDEO_PROFILE_RESOLUTION: Record<VideoProfile, string> = {
  "social-vertical": "1080×1920",
  "youtube-hd": "1920×1080",
  "dyno-loop": "1280×720",
  "hero-cinema": "3840×1620",
  "thumbnail-still": "640×360",
}

export const VIDEO_CODEC_LABEL: Record<VideoCodec, string> = {
  h264: "H.264",
  h265: "HEVC",
  vp9: "VP9",
  av1: "AV1",
}

export const TRANSCODE_STATUS_LABEL: Record<TranscodeStatus, string> = {
  queued: "Queued",
  encoding: "Encoding",
  uploading: "Uploading",
  complete: "Complete",
  failed: "Failed",
}

export const TRANSCODE_STATUS_TONE: Record<TranscodeStatus, CdnTone> = {
  queued: "neutral",
  encoding: "teal",
  uploading: "amber",
  complete: "green",
  failed: "red",
}

export const CACHE_SCOPE_LABEL: Record<CacheScope, string> = {
  edge: "Edge",
  regional: "Regional",
  "origin-pull": "Origin pull",
  global: "Global",
}

export const INVALIDATION_STRATEGY_LABEL: Record<InvalidationStrategy, string> = {
  "soft-purge": "Soft purge",
  "hard-purge": "Hard purge",
  "tag-purge": "Tag purge",
}

export const INVALIDATION_STRATEGY_TONE: Record<InvalidationStrategy, CdnTone> = {
  "soft-purge": "amber",
  "hard-purge": "red",
  "tag-purge": "teal",
}

export const REGION_LABEL: Record<RegionCode, string> = {
  syd: "Sydney",
  mel: "Melbourne",
  per: "Perth",
  akl: "Auckland",
  sin: "Singapore",
  lax: "Los Angeles",
  fra: "Frankfurt",
  iad: "Ashburn",
}

export const REGION_COUNTRY: Record<RegionCode, string> = {
  syd: "AU",
  mel: "AU",
  per: "AU",
  akl: "NZ",
  sin: "SG",
  lax: "US",
  fra: "DE",
  iad: "US",
}

export const QUOTA_LABEL: Record<QuotaResource, string> = {
  bandwidth: "Bandwidth",
  storage: "Storage",
  "image-ops": "Image ops",
  "video-min": "Video minutes",
}

export const BULK_KIND_LABEL: Record<BulkJobKind, string> = {
  reformat: "Reformat",
  rewatermark: "Rewatermark",
  "regenerate-renditions": "Renditions",
  "purge-folder": "Purge folder",
  "rebuild-lqip": "Rebuild LQIP",
}

export const BULK_STATUS_TONE: Record<BulkJobStatus, CdnTone> = {
  queued: "neutral",
  running: "teal",
  paused: "amber",
  complete: "green",
  failed: "red",
}

export const LAZY_STRATEGY_LABEL: Record<LazyLoadStrategy, string> = {
  lqip: "LQIP",
  "blur-up": "Blur-up",
  sketch: "Sketch",
  "dominant-color": "Dominant colour",
}

export const PRESET_CATEGORY_LABEL: Record<PresetCategory, string> = {
  thumbnail: "Thumbnail",
  hero: "Hero",
  "og-image": "OG image",
  card: "Card",
  avatar: "Avatar",
  splash: "Splash",
}

export const BUCKET_LABEL: Record<AssetBucket, string> = {
  brand: "Brand assets",
  "vehicle-frames": "Vehicle frames",
  "dyno-videos": "Dyno videos",
  schematics: "Schematics",
  merch: "Merch",
}

export function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000_000_000) return `${(bytes / 1_000_000_000_000).toFixed(2)} TB`
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(2)} GB`
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

export function formatThroughput(bytesPerSec: number): string {
  if (bytesPerSec >= 1_000_000_000) {
    return `${(bytesPerSec / 1_000_000_000).toFixed(2)} GB/s`
  }
  if (bytesPerSec >= 1_000_000) {
    return `${(bytesPerSec / 1_000_000).toFixed(1)} MB/s`
  }
  if (bytesPerSec >= 1_000) {
    return `${(bytesPerSec / 1_000).toFixed(0)} KB/s`
  }
  return `${bytesPerSec} B/s`
}

export function formatEta(seconds: number): string {
  if (seconds < 0) return "—"
  if (seconds < 60) return `${seconds}s`
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")
  if (m < 60) return `${m}:${s}`
  const h = Math.floor(m / 60)
  const mm = (m % 60).toString().padStart(2, "0")
  return `${h}h ${mm}m`
}

export function formatTtl(seconds: number): string {
  if (seconds < 60) return `${seconds}s`
  if (seconds < 3600) return `${Math.round(seconds / 60)} min`
  if (seconds < 86_400) return `${Math.round(seconds / 3600)} hr`
  return `${Math.round(seconds / 86_400)} d`
}

export function formatPercent(value: number, fractionDigits = 0): string {
  return `${value.toFixed(fractionDigits)}%`
}

export function formatDimensions(width: number, height: number): string {
  return `${width}×${height}`
}
