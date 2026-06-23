/**
 * Shared types for the asset-library (DAM) primitive family.
 *
 * The asset library deals with rich media: imagery, video clips, audio loops,
 * documents, 3D models, animations, and vector files. Tone, license, and
 * rendition vocabulary is kept here so cards, chips, and preview panes stay
 * in sync.
 */

export type AssetKind =
  | "image"
  | "video"
  | "audio"
  | "doc"
  | "3d-model"
  | "animation"
  | "vector"

export type AssetTone = "red" | "amber" | "teal" | "green" | "neutral"

export type LicenseType =
  | "cc0"
  | "cc-by"
  | "proprietary"
  | "royalty-free"
  | "editorial-only"

export type RenditionPreset =
  | "original"
  | "web"
  | "thumbnail"
  | "square"
  | "4k"

export type ApprovalStep = "draft" | "review" | "approved" | "published"

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "middle-left"
  | "middle-center"
  | "middle-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

export interface AssetOwner {
  id: string
  name: string
  avatar?: string
}

export interface AssetTag {
  id: string
  name: string
  /** Hex (#RRGGBB) — surface-driven tint for the chip. */
  color: string
  count?: number
}

export interface AssetSwatch {
  hex: string
  /** Semantic role (e.g. "primary", "accent"). */
  role: string
}

export interface AssetVersion {
  id: string
  label: string
  uploader: AssetOwner
  timestamp: string
  comment: string
  thumb?: string
  current?: boolean
}

export interface AssetUsage {
  id: string
  surface: string
  path: string
  lastModified: string
}

export interface ApprovalReviewer extends AssetOwner {
  step: ApprovalStep
}

export interface ApprovalComment {
  id: string
  author: AssetOwner
  timestamp: string
  body: string
}

export interface SmartCollectionCriterion {
  id: string
  label: string
}

export interface AssetRendition {
  id: string
  preset: RenditionPreset
  width: number
  height: number
  /** Bytes. */
  size: number
  format: string
  thumb?: string
}

export interface AssetItem {
  id: string
  name: string
  kind: AssetKind
  thumb?: string
  /** Pixel dimensions for visual media. */
  dimensions?: { width: number; height: number }
  /** Duration in seconds (video / audio). */
  durationSec?: number
  license: LicenseType
  ownerId?: string
  /** Bytes. */
  size?: number
}

export const ASSET_KIND_LABEL: Record<AssetKind, string> = {
  image: "Image",
  video: "Video",
  audio: "Audio",
  doc: "Doc",
  "3d-model": "3D Model",
  animation: "Animation",
  vector: "Vector",
}

export const ASSET_KIND_GLYPH: Record<AssetKind, string> = {
  image: "▢",
  video: "▶",
  audio: "♪",
  doc: "≡",
  "3d-model": "◇",
  animation: "✦",
  vector: "△",
}

export const LICENSE_LABEL: Record<LicenseType, string> = {
  cc0: "CC0",
  "cc-by": "CC-BY",
  proprietary: "Proprietary",
  "royalty-free": "Royalty-free",
  "editorial-only": "Editorial only",
}

export const LICENSE_TONE: Record<LicenseType, AssetTone> = {
  cc0: "green",
  "cc-by": "teal",
  proprietary: "red",
  "royalty-free": "amber",
  "editorial-only": "neutral",
}

export const LICENSE_DESCRIPTION: Record<LicenseType, string> = {
  cc0: "Public domain — free for any use, no attribution required.",
  "cc-by": "Creative Commons Attribution — credit the creator.",
  proprietary: "Owned by Oak Flats Mufflermen — internal use only.",
  "royalty-free": "Licensed stock — no recurring fees, attribution optional.",
  "editorial-only": "Editorial use only — no commercial publication.",
}

export const APPROVAL_STEP_LABEL: Record<ApprovalStep, string> = {
  draft: "Draft",
  review: "In review",
  approved: "Approved",
  published: "Published",
}

export const APPROVAL_STEP_ORDER: ReadonlyArray<ApprovalStep> = [
  "draft",
  "review",
  "approved",
  "published",
]

export const RENDITION_LABEL: Record<RenditionPreset, string> = {
  original: "Original",
  web: "Web",
  thumbnail: "Thumbnail",
  square: "Square",
  "4k": "4K",
}

export const WATERMARK_POSITION_ORDER: ReadonlyArray<WatermarkPosition> = [
  "top-left",
  "top-center",
  "top-right",
  "middle-left",
  "middle-center",
  "middle-right",
  "bottom-left",
  "bottom-center",
  "bottom-right",
]

export function formatBytes(bytes: number): string {
  if (bytes >= 1_000_000_000) return `${(bytes / 1_000_000_000).toFixed(1)} GB`
  if (bytes >= 1_000_000) return `${(bytes / 1_000_000).toFixed(1)} MB`
  if (bytes >= 1_000) return `${(bytes / 1_000).toFixed(0)} KB`
  return `${bytes} B`
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
    .toString()
    .padStart(2, "0")
  return `${m}:${s}`
}

export function formatDimensions(width: number, height: number): string {
  return `${width} × ${height}`
}
