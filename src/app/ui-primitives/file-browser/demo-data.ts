import type {
  FileItem,
  FileVersion,
  FolderSegment,
  TreeNode,
  UploadEntry,
} from "../components/file-browser"
import type { MediaAsset } from "../components/file-browser"

export const DEMO_OWNER = {
  id: "owner-tomas",
  name: "Tomas Wren",
}

export const DEMO_OWNER_2 = {
  id: "owner-aviva",
  name: "Aviva Quinn",
}

export const DEMO_OWNER_3 = {
  id: "owner-marin",
  name: "Marin Vaca",
}

export const DEMO_TREE: ReadonlyArray<TreeNode> = [
  {
    id: "root",
    name: "Workshop",
    children: [
      {
        id: "brand",
        name: "Brand",
        children: [
          { id: "brand-logo", name: "logo-set.svg", kind: "code" },
          { id: "brand-guide", name: "brand-guidelines.pdf", kind: "pdf" },
        ],
      },
      {
        id: "fleet",
        name: "Fleet",
        badge: 3,
        children: [
          { id: "fleet-photos", name: "Photos", kind: "image", children: [
            { id: "f-1", name: "ute-engine-side.jpg", kind: "image" },
            { id: "f-2", name: "muffler-cut-away.jpg", kind: "image" },
          ] },
          { id: "fleet-loom", name: "wire-loom.cad", kind: "cad" },
          { id: "fleet-render", name: "v6-render.glb", kind: "3d-model" },
        ],
      },
      {
        id: "media",
        name: "Media",
        children: [
          { id: "media-promo", name: "promo-cut.mp4", kind: "video" },
          { id: "media-jingle", name: "horn-jingle.wav", kind: "audio" },
        ],
      },
      {
        id: "ops",
        name: "Operations",
        children: [
          { id: "ops-sheet", name: "service-pricing.xlsx", kind: "sheet" },
          { id: "ops-deck", name: "Q3-review.pptx", kind: "slide" },
          { id: "ops-doc", name: "supplier-contract.docx", kind: "doc" },
        ],
      },
      {
        id: "archive",
        name: "Archive",
        children: [
          { id: "arch-old", name: "2024-batch.zip", kind: "archive" },
        ],
      },
    ],
  },
]

export const DEMO_FILES: ReadonlyArray<FileItem> = [
  {
    id: "file-engine",
    name: "ute-engine-side.jpg",
    kind: "image",
    size: 4_184_000,
    modified: "2 hours ago",
    owner: DEMO_OWNER,
    dimensions: { width: 2400, height: 1600 },
    properties: [
      { label: "Camera", value: "Sony A7R V" },
      { label: "Lens", value: "24-70 f/2.8" },
      { label: "ISO", value: "400" },
    ],
  },
  {
    id: "file-muffler",
    name: "muffler-cut-away.jpg",
    kind: "image",
    size: 2_840_000,
    modified: "Yesterday",
    owner: DEMO_OWNER_2,
    dimensions: { width: 1920, height: 1080 },
  },
  {
    id: "file-promo",
    name: "promo-cut.mp4",
    kind: "video",
    size: 184_700_000,
    modified: "3 days ago",
    owner: DEMO_OWNER,
    dimensions: { width: 3840, height: 2160 },
  },
  {
    id: "file-jingle",
    name: "horn-jingle.wav",
    kind: "audio",
    size: 18_320_000,
    modified: "Last week",
    owner: DEMO_OWNER_3,
  },
  {
    id: "file-render",
    name: "v6-render.glb",
    kind: "3d-model",
    size: 47_120_000,
    modified: "Last week",
    owner: DEMO_OWNER_2,
  },
  {
    id: "file-loom",
    name: "wire-loom.cad",
    kind: "cad",
    size: 9_180_000,
    modified: "Last week",
    owner: DEMO_OWNER,
  },
  {
    id: "file-guide",
    name: "brand-guidelines.pdf",
    kind: "pdf",
    size: 6_220_000,
    modified: "May 14",
    owner: DEMO_OWNER_2,
  },
  {
    id: "file-sheet",
    name: "service-pricing.xlsx",
    kind: "sheet",
    size: 480_000,
    modified: "May 12",
    owner: DEMO_OWNER_3,
  },
  {
    id: "file-deck",
    name: "Q3-review.pptx",
    kind: "slide",
    size: 22_800_000,
    modified: "May 9",
    owner: DEMO_OWNER_2,
  },
  {
    id: "file-contract",
    name: "supplier-contract.docx",
    kind: "doc",
    size: 760_000,
    modified: "May 1",
    owner: DEMO_OWNER,
  },
  {
    id: "file-archive",
    name: "2024-batch.zip",
    kind: "archive",
    size: 1_240_000_000,
    modified: "Mar 28",
    owner: DEMO_OWNER_3,
  },
  {
    id: "file-code",
    name: "logo-set.svg",
    kind: "code",
    size: 84_000,
    modified: "Apr 10",
    owner: DEMO_OWNER,
  },
]

export const DEMO_BREADCRUMB: ReadonlyArray<FolderSegment> = [
  { id: "root", name: "Workshop", href: "#" },
  { id: "fleet", name: "Fleet", href: "#" },
  { id: "photos", name: "Photos", href: "#" },
  { id: "2026", name: "2026", href: "#" },
  { id: "may", name: "May", href: "#" },
  { id: "engine-bay", name: "Engine bay" },
]

export const DEMO_UPLOADS: ReadonlyArray<UploadEntry> = [
  {
    id: "u-1",
    name: "muffler-bracket-render.png",
    size: 8_240_000,
    kind: "image",
    progress: 64,
    speed: 720_000,
    status: "uploading",
  },
  {
    id: "u-2",
    name: "drone-flyover.mp4",
    size: 482_000_000,
    kind: "video",
    progress: 18,
    speed: 1_240_000,
    status: "uploading",
  },
  {
    id: "u-3",
    name: "queued-clip.mov",
    size: 64_000_000,
    kind: "video",
    progress: 0,
    speed: 0,
    status: "queued",
  },
  {
    id: "u-4",
    name: "v8-block.glb",
    size: 22_400_000,
    kind: "3d-model",
    progress: 100,
    speed: 0,
    status: "done",
  },
  {
    id: "u-5",
    name: "supplier-statement.pdf",
    size: 920_000,
    kind: "pdf",
    progress: 100,
    speed: 0,
    status: "done",
  },
]

export const DEMO_VERSIONS: ReadonlyArray<FileVersion> = [
  {
    id: "v-5",
    label: "v5",
    author: DEMO_OWNER,
    timestamp: "2 hours ago",
    summary: "Recovered exposure detail in shadow regions, retouched chrome.",
    delta: 320_000,
    current: true,
  },
  {
    id: "v-4",
    label: "v4",
    author: DEMO_OWNER_2,
    timestamp: "Yesterday",
    summary: "Cropped 3:2 for hero slot, exported AVIF.",
    delta: -180_000,
  },
  {
    id: "v-3",
    label: "v3",
    author: DEMO_OWNER,
    timestamp: "May 14",
    summary: "Initial colour grade pass, contrast bump.",
    delta: 90_000,
  },
  {
    id: "v-2",
    label: "v2",
    author: DEMO_OWNER_3,
    timestamp: "May 13",
    summary: "RAW conversion, white balance adjusted to 5200K.",
  },
  {
    id: "v-1",
    label: "v1",
    author: DEMO_OWNER_3,
    timestamp: "May 12",
    summary: "Original import from camera.",
  },
]

export const DEMO_MEDIA: ReadonlyArray<MediaAsset> = [
  {
    id: "m-1",
    src: "/media/mufflermen-logo.png",
    name: "Mufflermen — workshop mark",
    caption: "Master lockup used on every shopfront asset.",
    dimensions: { width: 1200, height: 800 },
    meta: [
      { label: "Format", value: "PNG" },
      { label: "Use", value: "Hero / banner" },
    ],
  },
  {
    id: "m-2",
    src: "/media/brand/mufflermen-logo-icon-512.png",
    name: "Mufflermen — icon mark",
    caption: "Stand-alone icon used as profile + favicon.",
    dimensions: { width: 512, height: 512 },
    meta: [
      { label: "Format", value: "PNG 512px" },
      { label: "Use", value: "Profile / icon" },
    ],
  },
  {
    id: "m-3",
    src: "/media/mufflermen-logo.png",
    name: "Mufflermen — alt crop",
    caption: "Reserved framing for square placements.",
    dimensions: { width: 800, height: 800 },
  },
]
