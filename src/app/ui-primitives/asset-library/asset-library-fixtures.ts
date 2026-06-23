/**
 * Realistic Oak Flats Mufflermen DAM fixtures for the asset-library
 * showcase routes. Pure data, no React imports.
 */

import type {
  ApprovalComment,
  ApprovalReviewer,
  AssetItem,
  AssetRendition,
  AssetSwatch,
  AssetTag,
  AssetTypeFilterCount,
  AssetUsage,
  AssetVersion,
  DamFolderNode,
  PreviewProperty,
  SmartCollectionCriterion,
} from "../components/asset-library"

const STAFF = {
  shane: { id: "shane", name: "Shane Mitchell" },
  rohan: { id: "rohan", name: "Rohan Patel" },
  ellis: { id: "ellis", name: "Ellis Murphy" },
  janelle: { id: "janelle", name: "Janelle Burke" },
}

export const DEMO_ASSETS: ReadonlyArray<AssetItem> = [
  {
    id: "asset-manta-catback",
    name: "Manta-cat-back-exhaust.jpg",
    kind: "image",
    dimensions: { width: 4096, height: 2560 },
    size: 6_240_000,
    license: "proprietary",
    ownerId: "shane",
  },
  {
    id: "asset-bay-2-tour",
    name: "Bay-2-tour-clip.mp4",
    kind: "video",
    dimensions: { width: 1920, height: 1080 },
    durationSec: 142,
    size: 184_000_000,
    license: "proprietary",
    ownerId: "ellis",
  },
  {
    id: "asset-rumble-loop",
    name: "Exhaust-rumble-loop.mp3",
    kind: "audio",
    durationSec: 32,
    size: 1_240_000,
    license: "cc-by",
    ownerId: "rohan",
  },
  {
    id: "asset-manta-3d",
    name: "Manta-3D-model.glb",
    kind: "3d-model",
    size: 24_400_000,
    license: "proprietary",
    ownerId: "shane",
  },
  {
    id: "asset-warranty-doc",
    name: "Warranty-T&Cs-2026.pdf",
    kind: "doc",
    size: 312_000,
    license: "proprietary",
    ownerId: "janelle",
  },
  {
    id: "asset-logo-mark",
    name: "Mufflermen-monogram.svg",
    kind: "vector",
    size: 18_400,
    license: "proprietary",
    ownerId: "janelle",
  },
  {
    id: "asset-dyno-anim",
    name: "Dyno-sweep-animation.json",
    kind: "animation",
    durationSec: 6,
    size: 86_000,
    license: "cc0",
    ownerId: "rohan",
  },
  {
    id: "asset-bay-photo-1",
    name: "Workshop-bay-1-overhead.jpg",
    kind: "image",
    dimensions: { width: 3840, height: 2160 },
    size: 4_120_000,
    license: "proprietary",
    ownerId: "ellis",
  },
  {
    id: "asset-customer-mark",
    name: "Customer-XR6-before-after.jpg",
    kind: "image",
    dimensions: { width: 2400, height: 1600 },
    size: 2_240_000,
    license: "editorial-only",
    ownerId: "shane",
  },
  {
    id: "asset-bg-loop",
    name: "Stock-garage-ambience.mp3",
    kind: "audio",
    durationSec: 88,
    size: 3_840_000,
    license: "royalty-free",
    ownerId: "rohan",
  },
  {
    id: "asset-tour-vid-b",
    name: "Tour-walkthrough-2026Q1.mp4",
    kind: "video",
    dimensions: { width: 2560, height: 1440 },
    durationSec: 218,
    size: 412_000_000,
    license: "proprietary",
    ownerId: "ellis",
  },
  {
    id: "asset-cad-manifold",
    name: "Header-manifold-cad.dwg",
    kind: "doc",
    size: 920_000,
    license: "proprietary",
    ownerId: "shane",
  },
]

export const DEMO_FOLDER_TREE: ReadonlyArray<DamFolderNode> = [
  {
    id: "folder-root",
    name: "Mufflermen DAM",
    count: 412,
    children: [
      {
        id: "folder-hero",
        name: "Hero Imagery",
        count: 84,
        children: [
          { id: "folder-hero-manta", name: "Manta family", count: 38 },
          { id: "folder-hero-customer", name: "Customer hero shots", count: 22 },
          { id: "folder-hero-product", name: "Product hero shots", count: 24 },
        ],
      },
      {
        id: "folder-workshop",
        name: "Workshop Photography",
        count: 126,
        dragTarget: true,
        children: [
          { id: "folder-workshop-bay-1", name: "Bay 1", count: 42 },
          { id: "folder-workshop-bay-2", name: "Bay 2", count: 38 },
          { id: "folder-workshop-bay-3", name: "Bay 3 / dyno", count: 46 },
        ],
      },
      {
        id: "folder-stories",
        name: "Customer Stories",
        count: 56,
        children: [
          { id: "folder-stories-xr6", name: "XR6 builds", count: 18 },
          { id: "folder-stories-classic", name: "Classics restoration", count: 26 },
          { id: "folder-stories-fleet", name: "Fleet & trade", count: 12 },
        ],
      },
      {
        id: "folder-product",
        name: "Product Catalogue",
        count: 86,
      },
      {
        id: "folder-audio",
        name: "Audio Library",
        count: 22,
      },
      {
        id: "folder-3d",
        name: "3D Models",
        count: 18,
      },
      {
        id: "folder-archive",
        name: "Archive",
        count: 20,
      },
    ],
  },
]

export const DEMO_TAGS: ReadonlyArray<AssetTag> = [
  { id: "tag-manta", name: "manta", color: "#e62028", count: 64 },
  { id: "tag-workshop", name: "workshop", color: "#ffc14f", count: 126 },
  { id: "tag-customer", name: "customer-story", color: "#40bcff", count: 38 },
  { id: "tag-hero", name: "hero-image", color: "#37d67a", count: 24 },
  { id: "tag-product", name: "product-catalogue", color: "#a07bff", count: 86 },
  { id: "tag-warranty", name: "warranty", color: "#ff7da3", count: 12 },
  { id: "tag-dyno", name: "dyno-runs", color: "#9fb1c1", count: 18 },
]

export const DEMO_DUPLICATE_SUGGESTIONS: ReadonlyArray<{
  id: string
  names: ReadonlyArray<string>
}> = [
  { id: "dup-1", names: ["customer-story", "customer_story"] },
  { id: "dup-2", names: ["workshop", "shop"] },
]

export const DEMO_SWATCHES: ReadonlyArray<AssetSwatch> = [
  { hex: "#0a0d10", role: "primary" },
  { hex: "#e62028", role: "accent" },
  { hex: "#ffc14f", role: "highlight" },
  { hex: "#3e4452", role: "midtone" },
  { hex: "#dde5ec", role: "rim light" },
]

export const DEMO_VERSIONS: ReadonlyArray<AssetVersion> = [
  {
    id: "ver-1",
    label: "v1 — Initial upload",
    uploader: STAFF.ellis,
    timestamp: "Mar 18, 09:42",
    comment: "Raw exhaust photo on Bay 2 lift, before colour grade.",
  },
  {
    id: "ver-2",
    label: "v2 — Colour graded",
    uploader: STAFF.shane,
    timestamp: "Mar 19, 14:08",
    comment: "Warm grade applied, lifted shadows on header pipe.",
  },
  {
    id: "ver-3",
    label: "v3 — Retouch",
    uploader: STAFF.shane,
    timestamp: "Mar 21, 11:30",
    comment: "Removed cable on lift platform, cleaned up rim reflection.",
  },
  {
    id: "ver-4",
    label: "v4 — Final crop",
    uploader: STAFF.janelle,
    timestamp: "Mar 22, 16:50",
    comment: "Cropped to 16:10 for hero slot. Current production asset.",
    current: true,
  },
]

export const DEMO_TYPE_COUNTS: ReadonlyArray<AssetTypeFilterCount> = [
  { kind: "image", count: 214 },
  { kind: "video", count: 38 },
  { kind: "audio", count: 22 },
  { kind: "doc", count: 64 },
  { kind: "3d-model", count: 18 },
  { kind: "animation", count: 12 },
  { kind: "vector", count: 44 },
]

export const DEMO_SMART_COLLECTION_CRITERIA: ReadonlyArray<SmartCollectionCriterion> = [
  { id: "cri-tag", label: "tag: customer-story" },
  { id: "cri-kind", label: "kind: image OR video" },
  { id: "cri-modified", label: "modified ≤ 90 days" },
  { id: "cri-license", label: "license ≠ editorial-only" },
]

export const DEMO_PREVIEW_PROPERTIES: ReadonlyArray<PreviewProperty> = [
  { label: "Camera", value: "Sony A7R V" },
  { label: "Lens", value: "24-70mm f/2.8 GM II" },
  { label: "Shutter", value: "1/160s" },
  { label: "Aperture", value: "f/4.0" },
  { label: "ISO", value: "400" },
  { label: "Captured", value: "Mar 18, 2026 — Bay 2" },
  { label: "Photographer", value: "Ellis Murphy" },
]

export const DEMO_LINKED_COLLECTIONS: ReadonlyArray<string> = [
  "Hero Imagery",
  "Manta family",
  "Mar 2026 launch",
]

export const DEMO_USAGES: ReadonlyArray<AssetUsage> = [
  {
    id: "use-1",
    surface: "mufflermen.com.au",
    path: "/parts/exhaust/manta-cat-back",
    lastModified: "Mar 24, 2026",
  },
  {
    id: "use-2",
    surface: "Mufflerpulse",
    path: "Issue #42 — Manta launch cover",
    lastModified: "Mar 22, 2026",
  },
  {
    id: "use-3",
    surface: "Email",
    path: "Mar newsletter — hero block",
    lastModified: "Mar 19, 2026",
  },
  {
    id: "use-4",
    surface: "Hermes",
    path: "Workflow: new-product-launch / step 3",
    lastModified: "Mar 18, 2026",
  },
]

const APPROVAL_REVIEWERS: ReadonlyArray<ApprovalReviewer> = [
  { ...STAFF.janelle, step: "review" },
  { ...STAFF.shane, step: "approved" },
  { ...STAFF.rohan, step: "review" },
]

const APPROVAL_THREAD: ReadonlyArray<ApprovalComment> = [
  {
    id: "ac-1",
    author: STAFF.janelle,
    timestamp: "Mar 22, 09:14",
    body: "Crop looks sharper but the highlight on the rim is clipping a touch — can we dial it back 6% before final approval?",
  },
  {
    id: "ac-2",
    author: STAFF.shane,
    timestamp: "Mar 22, 10:02",
    body: "Pulled exposure 4 stops on the rim mask only. Pushing v5 in a sec.",
  },
  {
    id: "ac-3",
    author: STAFF.rohan,
    timestamp: "Mar 22, 12:48",
    body: "Approved on my side. Audio team has the matching rumble loop slotted for the launch reel.",
  },
]

export const DEMO_APPROVAL = {
  reviewers: APPROVAL_REVIEWERS,
  thread: APPROVAL_THREAD,
}

export const DEMO_RENDITIONS: ReadonlyArray<AssetRendition> = [
  {
    id: "rend-original",
    preset: "original",
    width: 4096,
    height: 2560,
    size: 6_240_000,
    format: "jpg",
  },
  {
    id: "rend-4k",
    preset: "4k",
    width: 3840,
    height: 2160,
    size: 4_180_000,
    format: "webp",
  },
  {
    id: "rend-web",
    preset: "web",
    width: 1920,
    height: 1080,
    size: 312_000,
    format: "webp",
  },
  {
    id: "rend-square",
    preset: "square",
    width: 1080,
    height: 1080,
    size: 184_000,
    format: "webp",
  },
  {
    id: "rend-thumb",
    preset: "thumbnail",
    width: 320,
    height: 200,
    size: 24_000,
    format: "webp",
  },
]

export const DEMO_HERO_ASSET = DEMO_ASSETS[0]
