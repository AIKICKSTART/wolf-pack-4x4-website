/**
 * Demo data for the Torque file browser screen.
 *
 * Realistic Oak Flats Muffler Men asset library — fitment photos, fabrication
 * CAD, customer handover packs, supplier datasheets and marketing media that
 * the workshop owner manages day to day. All figures are plausible byte sizes
 * and Illawarra NSW dates so the tabular columns line up under tabular-nums.
 */

import type {
  FileItem,
  FileOwner,
  FolderSegment,
  TreeNode,
  UploadEntry,
  FileVersion,
} from "../../components/file-browser"

// --- Owners -------------------------------------------------------------

const DANIEL: FileOwner = { id: "daniel", name: "Daniel F." }
const JESS: FileOwner = { id: "jess", name: "Jess R." }
const PETE: FileOwner = { id: "pete", name: "Pete K." }
const TORQUE: FileOwner = { id: "torque", name: "Torque" }

// --- Folder tree --------------------------------------------------------

export const FOLDER_TREE: ReadonlyArray<TreeNode> = [
  {
    id: "workshop",
    name: "Workshop assets",
    children: [
      {
        id: "fitment-photos",
        name: "Fitment photos",
        badge: 24,
        children: [
          { id: "hilux-28", name: "Hilux 2.8 cat-back", kind: "image" },
          { id: "ranger-raptor", name: "Ranger Raptor system", kind: "image" },
          { id: "falcon-gtho", name: "Falcon GT-HO restos", kind: "image" },
        ],
      },
      {
        id: "fabrication",
        name: "Fabrication CAD",
        badge: 6,
        children: [
          { id: "mandrel-bends", name: "Mandrel bend library", kind: "cad" },
          { id: "v-band-flanges", name: "V-band flange specs", kind: "cad" },
        ],
      },
      {
        id: "bay-footage",
        name: "Bay footage",
        children: [{ id: "dyno-runs", name: "Dyno run captures", kind: "video" }],
      },
    ],
  },
  {
    id: "customers",
    name: "Customer handover",
    badge: 3,
    children: [
      { id: "handover-packs", name: "Handover packs", kind: "pdf" },
      { id: "warranty", name: "Warranty + compliance", kind: "doc" },
      { id: "invoices", name: "Fitted-price invoices", kind: "sheet" },
    ],
  },
  {
    id: "marketing",
    name: "Marketing media",
    children: [
      { id: "hero-shots", name: "Hero shots", kind: "image" },
      { id: "social", name: "Social cut-downs", kind: "video" },
      { id: "datasheets", name: "Supplier datasheets", kind: "pdf" },
    ],
  },
]

export const DEFAULT_EXPANDED: ReadonlyArray<string> = [
  "workshop",
  "fitment-photos",
]

// --- Breadcrumb ---------------------------------------------------------

export const BREADCRUMB_SEGMENTS: ReadonlyArray<FolderSegment> = [
  { id: "library", name: "Asset library", href: "#" },
  { id: "workshop", name: "Workshop assets", href: "#" },
  { id: "fitment-photos", name: "Fitment photos" },
]

// --- File list ----------------------------------------------------------

export const FILES: ReadonlyArray<FileItem> = [
  {
    id: "hilux-redback-fitted",
    name: "hilux-2.8-redback-3in-fitted.webp",
    kind: "image",
    size: 4_280_000,
    modified: "2026-05-28",
    owner: DANIEL,
    thumb: "/media/workshop-performance-exhaust.webp",
    dimensions: { width: 2400, height: 1600 },
    properties: [
      { label: "Vehicle", value: "Toyota Hilux 2.8L 1GD-FTV" },
      { label: "System", value: "Redback 3\" cat-back, 304 stainless" },
      { label: "Bay", value: "Bay 2 — hoist 1" },
      { label: "Noise", value: "89.1 dB(A) static (NSW EPA legal)" },
    ],
  },
  {
    id: "ranger-raptor-rear",
    name: "ranger-raptor-rear-quad-tips.webp",
    kind: "image",
    size: 3_910_000,
    modified: "2026-05-27",
    owner: JESS,
    thumb: "/media/exhaust-pipes-tips.webp",
    dimensions: { width: 2200, height: 1467 },
    properties: [
      { label: "Vehicle", value: "Ford Ranger Raptor" },
      { label: "Finish", value: "Black ceramic-coated tips" },
    ],
  },
  {
    id: "complete-systems-grid",
    name: "complete-exhaust-systems-bench.webp",
    kind: "image",
    size: 5_640_000,
    modified: "2026-05-26",
    owner: PETE,
    thumb: "/media/complete-exhaust-systems.webp",
    dimensions: { width: 2560, height: 1440 },
  },
  {
    id: "fabrication-jig",
    name: "fabrication-bay-tig-weld.webp",
    kind: "image",
    size: 3_120_000,
    modified: "2026-05-25",
    owner: PETE,
    thumb: "/media/fabrication-service-one.webp",
    dimensions: { width: 2048, height: 1365 },
  },
  {
    id: "team-bay",
    name: "oak-flats-muffler-men-crew.webp",
    kind: "image",
    size: 2_870_000,
    modified: "2026-05-22",
    owner: JESS,
    thumb: "/media/oak-flats-muffler-men-team.webp",
    dimensions: { width: 2000, height: 1333 },
  },
  {
    id: "dyno-capture",
    name: "bay3-dyno-run-hilux-pull.mp4",
    kind: "video",
    size: 184_500_000,
    modified: "2026-05-21",
    owner: DANIEL,
    properties: [
      { label: "Length", value: "0:48" },
      { label: "Codec", value: "H.264 1080p60" },
    ],
  },
  {
    id: "mandrel-cad",
    name: "mandrel-bend-library-3in.step",
    kind: "cad",
    size: 12_640_000,
    modified: "2026-05-19",
    owner: PETE,
    properties: [
      { label: "Format", value: "STEP AP242" },
      { label: "Tube OD", value: "76.2 mm (3\")" },
    ],
  },
  {
    id: "handover-pack",
    name: "customer-handover-pack-template.pdf",
    kind: "pdf",
    size: 1_340_000,
    modified: "2026-05-18",
    owner: TORQUE,
    properties: [
      { label: "Pages", value: "4" },
      { label: "Includes", value: "Warranty, care guide, invoice" },
    ],
  },
  {
    id: "fitted-prices",
    name: "fitted-price-list-2026-q2.xlsx",
    kind: "sheet",
    size: 286_000,
    modified: "2026-05-15",
    owner: DANIEL,
    properties: [{ label: "Rows", value: "142 SKUs" }],
  },
  {
    id: "redback-datasheet",
    name: "redback-hilux-2.8-datasheet.pdf",
    kind: "pdf",
    size: 962_000,
    modified: "2026-05-12",
    owner: TORQUE,
  },
]

// --- Version history (for the previewed hero image) ---------------------

export const VERSIONS: ReadonlyArray<FileVersion> = [
  {
    id: "v3",
    label: "v3 · Colour-graded hero",
    author: JESS,
    timestamp: "2026-05-28",
    summary: "Warm grade + Mufflermen red push for the locations page banner.",
    delta: 420_000,
    current: true,
  },
  {
    id: "v2",
    label: "v2 · Cropped 3:2",
    author: DANIEL,
    timestamp: "2026-05-27",
    summary: "Recropped to 3:2 and bumped the tips into frame.",
    delta: -180_000,
  },
  {
    id: "v1",
    label: "v1 · Bay 2 raw capture",
    author: PETE,
    timestamp: "2026-05-26",
    summary: "Straight off the bay phone, Hilux on hoist 1.",
  },
]

// --- Upload queue -------------------------------------------------------

export const UPLOADS: ReadonlyArray<UploadEntry> = [
  {
    id: "u1",
    name: "ranger-wildtrak-twin-loop.webp",
    size: 4_180_000,
    kind: "image",
    progress: 64,
    speed: 2_400_000,
    status: "uploading",
  },
  {
    id: "u2",
    name: "bay2-tig-fillet-detail.webp",
    size: 3_020_000,
    kind: "image",
    progress: 38,
    speed: 1_900_000,
    status: "uploading",
  },
  {
    id: "u3",
    name: "magnaflow-mid-pipe-409.step",
    size: 9_640_000,
    kind: "cad",
    progress: 0,
    speed: 0,
    status: "queued",
  },
  {
    id: "u4",
    name: "warranty-recat-checklist.pdf",
    size: 740_000,
    kind: "pdf",
    progress: 0,
    speed: 0,
    status: "queued",
  },
  {
    id: "u5",
    name: "hilux-handover-2026-05-28.pdf",
    size: 1_310_000,
    kind: "pdf",
    progress: 100,
    speed: 0,
    status: "done",
  },
]
